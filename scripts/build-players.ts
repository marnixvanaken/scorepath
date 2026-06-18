#!/usr/bin/env node
/**
 * scripts/build-players.ts
 *
 * One-off script: fetch 2026 FIFA World Cup squads from Wikipedia, then
 * resolve each player's birthplace coordinates via Wikidata (P19 + P625)
 * with a Nominatim/OpenStreetMap fallback for missing coordinates.
 *
 * Run:   npx tsx scripts/build-players.ts
 *   or:  npm run build-players
 * Cache: .cache/  (delete to force refresh; gitignored)
 *
 * Re-run after squad changes (injuries, late call-ups) to refresh the data.
 * The committed data/players.json is a snapshot; it does NOT update itself.
 *
 * To hand-fix players, add entries to data/players-overrides.json.
 * The `id` field must match (format: "{TEAMCODE}-{slug}").
 * Overrides are merged last and win over all resolved data.
 *
 * No API keys required: Wikipedia + Wikidata + Nominatim are all keyless.
 * Nominatim is rate-limited to ≤1 req/s per their usage policy.
 */

import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const CACHE_DIR = path.join(ROOT, '.cache');

// ─── Types ────────────────────────────────────────────────────────────────────

type Position = 'GK' | 'DF' | 'MF' | 'FW';

interface RawPlayer {
  name: string;
  wikiTitle: string;
  team: string;
  teamCode: string;
  position: Position;
  dob: string; // YYYY-MM-DD or ''
}

export interface Player {
  id: string;
  name: string;
  team: string;
  teamCode: string;
  position: string;
  birthplace: string;
  country: string;
  lat: number;
  lon: number;
}

interface WikidataEntity {
  id?: string;
  missing?: string;
  labels?: Record<string, { language: string; value: string }>;
  claims?: Record<
    string,
    Array<{
      mainsnak?: {
        snaktype: string;
        datavalue?: { value: unknown; type: string };
      };
    }>
  >;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function readCache(file: string): Promise<unknown> {
  try {
    return JSON.parse(await fs.readFile(file, 'utf-8'));
  } catch {
    return undefined;
  }
}

async function writeCache(file: string, data: unknown) {
  await ensureDir(path.dirname(file));
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()
    .slice(0, 60);
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

const UA =
  'ScorePath/1.0 (https://scorepath.app; WK2026 player birthplace feature; noreply@scorepath.app)';

async function fetchJson(url: string, extraHeaders: Record<string, string> = {}): Promise<unknown> {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json', ...extraHeaders },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

// Nominatim must be called at ≤1 req/s
let lastNominatimMs = 0;
async function nominatimDelay() {
  const wait = 1150 - (Date.now() - lastNominatimMs);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastNominatimMs = Date.now();
}

// ─── Wikipedia scraping ───────────────────────────────────────────────────────

async function fetchSquadsWikitext(): Promise<string> {
  const cacheFile = path.join(CACHE_DIR, 'wikipedia', 'squads-wikitext.json');
  const cached = await readCache(cacheFile);
  if (typeof cached === 'string') {
    console.log('  (using cached wikitext)');
    return cached;
  }
  console.log('  Fetching Wikipedia squads page…');
  const url =
    'https://en.wikipedia.org/w/api.php?action=parse&page=2026+FIFA+World+Cup+squads&prop=wikitext&format=json&formatversion=2';
  const data = (await fetchJson(url)) as { parse?: { wikitext?: string } };
  const wikitext = data?.parse?.wikitext;
  if (!wikitext) throw new Error('No wikitext returned from Wikipedia');
  await writeCache(cacheFile, wikitext);
  return wikitext;
}

function parseDob(text: string): string {
  const m = text.match(
    /\{\{(?:birth[- ]date(?:[- ]and[- ]age)?|bda|dob)\|(\d{4})\|(\d{1,2})\|(\d{1,2})/i,
  );
  if (!m) return '';
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
}

function extractWikilink(text: string): { title: string; display: string } | null {
  const m = text.match(/\[\[([^|\]]+?)(?:\|([^\]]+?))?\]\]/);
  if (!m) return null;
  return { title: m[1].trim(), display: (m[2] ?? m[1]).trim() };
}

function normPos(raw: string): Position {
  const s = raw.trim().toUpperCase().replace(/[^A-Z]/g, '');
  if (s.startsWith('G')) return 'GK';
  if (s.startsWith('D')) return 'DF';
  if (s.startsWith('M')) return 'MF';
  if (s.startsWith('F') || s.startsWith('A') || s.startsWith('W')) return 'FW';
  return 'MF';
}

/**
 * Extract sortname display text: {{sortname|First|Last}} → "First Last"
 * or {{sortname|First|Last|Redirect}} → "First Last"
 */
function extractSortname(text: string): { title: string; display: string } | null {
  const m = text.match(/\{\{sortname\|([^|{}]+)\|([^|{}]+)/i);
  if (!m) return null;
  const display = `${m[1].trim()} ${m[2].trim()}`;
  return { title: display, display };
}

function parseSquadsWikitext(wikitext: string): RawPlayer[] {
  const players: RawPlayer[] = [];
  const seen = new Set<string>();

  // Split on level-2 headings: lines starting with exactly "== ... =="
  const sectionRe = /\n(==\s*[^=].*?[^=]\s*==)\n/g;
  const parts: Array<{ header: string; start: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = sectionRe.exec(wikitext)) !== null) {
    parts.push({ header: m[1], start: m.index });
  }

  function addPlayer(
    raw: Omit<RawPlayer, 'id'>,
    key: string,
  ) {
    if (seen.has(key)) return;
    seen.add(key);
    players.push(raw);
  }

  for (let si = 0; si < parts.length; si++) {
    const { header } = parts[si];
    const bodyStart = parts[si].start;
    const bodyEnd = si + 1 < parts.length ? parts[si + 1].start : wikitext.length;
    const body = wikitext.slice(bodyStart, bodyEnd);

    // Extract FIFA team code from {{fb|XXX}} / {{nat|XXX}} / {{flagicon|XXX}}
    const codeM = header.match(
      /\{\{(?:fb|nat|flagicon|flag|flagcountry)\|([A-Z]{2,4})\b/i,
    );
    if (!codeM) continue;
    const teamCode = codeM[1].toUpperCase();

    // Extract team display name from the first [[...]] link in the header
    const nameLinkM = header.match(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/);
    const team = nameLinkM
      ? nameLinkM[1]
          .replace(/\s*national\s*(?:association\s*)?football\s*team/i, '')
          .trim()
      : teamCode;

    const countBefore = players.length;

    // ── Pattern 1: {{nat fs player|…}} or {{nat fs p|…}} ──────────────────
    const natFsRe =
      /\{\{nat fs (?:player|p)\s*\|([^}]*)\}\}/gi;
    let mr: RegExpExecArray | null;
    while ((mr = natFsRe.exec(body)) !== null) {
      const args = mr[1];
      const posM = args.match(/\bpos\s*=\s*([^|\n]+)/i);
      const nameM = args.match(/\bname\s*=\s*([^|\n]+)/i);
      const ageM = args.match(/\bage\s*=\s*([^|\n]+)/i);
      if (!nameM) continue;
      const link =
        extractWikilink(nameM[1]) ??
        extractSortname(nameM[1]) ?? {
          title: nameM[1].trim(),
          display: nameM[1].trim(),
        };
      const cleanDisplay = link.display.replace(/\[\[.*?\]\]/g, '').trim() || link.title;
      addPlayer(
        {
          name: cleanDisplay,
          wikiTitle: link.title,
          team,
          teamCode,
          position: posM ? normPos(posM[1]) : 'MF',
          dob: ageM ? parseDob(ageM[1]) : '',
        },
        `${teamCode}::${link.title}`,
      );
    }

    // ── Pattern 2: wikitable rows (| No || POS || [[Name]] || {{dob|…}} ) ──
    if (players.length === countBefore) {
      for (const line of body.split('\n')) {
        if (!line.startsWith('|')) continue;
        if (/^\|[\s-]*$/.test(line) || line.startsWith('|}') || line.startsWith('|+'))
          continue;

        const cells = line.split(/\|\|/).map((c) => c.replace(/^\|/, '').trim());
        if (cells.length < 4) continue;

        // First cell should be a jersey number
        const jersey = cells[0].replace(/[^0-9]/g, '');
        if (!/^\d+$/.test(jersey) || +jersey > 99) continue;

        const posCell = cells[1];
        const nameCell = cells[2];
        const dobCell = cells[3];

        const link =
          extractWikilink(nameCell) ??
          extractSortname(nameCell);
        if (!link) continue;

        addPlayer(
          {
            name: link.display,
            wikiTitle: link.title,
            team,
            teamCode,
            position: normPos(posCell),
            dob: parseDob(dobCell),
          },
          `${teamCode}::${link.title}`,
        );
      }
    }
  }

  return players;
}

// ─── Wikidata batch helpers ───────────────────────────────────────────────────

/** Get Wikidata Q-IDs for Wikipedia article titles (≤50 per request). */
async function batchGetQids(titles: string[]): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const toFetch: string[] = [];

  for (const title of titles) {
    const cf = path.join(CACHE_DIR, 'qids', `${encodeURIComponent(title)}.json`);
    const cached = await readCache(cf);
    if (typeof cached === 'string') {
      result.set(title, cached);
    } else if (cached !== null) {
      // undefined = not cached yet; null = explicitly "no Q-ID"
      toFetch.push(title);
    }
  }

  for (let i = 0; i < toFetch.length; i += 50) {
    const batch = toFetch.slice(i, i + 50);
    const titlesParam = batch.map((t) => t.replace(/ /g, '_')).join('|');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titlesParam)}&prop=pageprops&ppprop=wikibase_item&format=json&formatversion=2`;
    const data = (await fetchJson(url)) as {
      query?: { pages?: Array<{ title?: string; pageprops?: { wikibase_item?: string } }> };
    };

    for (const page of data?.query?.pages ?? []) {
      const qid = page.pageprops?.wikibase_item ?? null;
      const rawTitle = (page.title ?? '').replace(/_/g, ' ');
      const origTitle = batch.find(
        (t) => t.replace(/_/g, ' ') === rawTitle,
      ) ?? rawTitle;
      const cf = path.join(CACHE_DIR, 'qids', `${encodeURIComponent(origTitle)}.json`);
      await writeCache(cf, qid);
      if (qid) result.set(origTitle, qid);
    }

    if (i + 50 < toFetch.length) await new Promise((r) => setTimeout(r, 400));
  }

  return result;
}

/** Fetch Wikidata entities for a list of Q-IDs (≤50 per request). */
async function batchGetEntities(qids: string[]): Promise<Map<string, WikidataEntity>> {
  const result = new Map<string, WikidataEntity>();
  const toFetch: string[] = [];

  for (const qid of qids) {
    const cf = path.join(CACHE_DIR, 'entities', `${qid}.json`);
    const cached = await readCache(cf);
    if (cached && typeof cached === 'object' && !Array.isArray(cached)) {
      result.set(qid, cached as WikidataEntity);
    } else if (cached !== null) {
      toFetch.push(qid);
    }
  }

  for (let i = 0; i < toFetch.length; i += 50) {
    const batch = toFetch.slice(i, i + 50);
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${batch.join('%7C')}&props=claims%7Clabels&languages=en&format=json`;
    const data = (await fetchJson(url)) as {
      entities?: Record<string, WikidataEntity>;
    };

    for (const [qid, entity] of Object.entries(data?.entities ?? {})) {
      const cf = path.join(CACHE_DIR, 'entities', `${qid}.json`);
      if (entity.missing !== undefined) {
        await writeCache(cf, null);
        continue;
      }
      result.set(qid, entity);
      await writeCache(cf, entity);
    }

    if (i + 50 < toFetch.length) await new Promise((r) => setTimeout(r, 500));
  }

  return result;
}

function claimQid(entity: WikidataEntity, prop: string): string | null {
  const snak = entity.claims?.[prop]?.[0]?.mainsnak;
  if (snak?.snaktype !== 'value') return null;
  return (snak.datavalue?.value as { id?: string })?.id ?? null;
}

function claimCoords(
  entity: WikidataEntity,
  prop: string,
): { lat: number; lon: number } | null {
  const snak = entity.claims?.[prop]?.[0]?.mainsnak;
  if (snak?.snaktype !== 'value') return null;
  const v = snak.datavalue?.value as { latitude?: number; longitude?: number } | undefined;
  if (v?.latitude == null || v?.longitude == null) return null;
  return { lat: v.latitude, lon: v.longitude };
}

// ─── Nominatim fallback ───────────────────────────────────────────────────────

interface NominatimResult {
  birthplace: string;
  country: string;
  lat: number;
  lon: number;
}

async function geocodeNominatim(query: string): Promise<NominatimResult | null> {
  const key = query.toLowerCase().trim();
  const cf = path.join(CACHE_DIR, 'nominatim', `${encodeURIComponent(key)}.json`);
  const cached = await readCache(cf);
  if (cached !== undefined) return (cached as NominatimResult) ?? null;

  await nominatimDelay();
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`;
  const rows = (await fetchJson(url)) as Array<{
    lat?: string;
    lon?: string;
    address?: { country?: string; city?: string; town?: string; village?: string };
  }>;

  if (!rows.length || !rows[0].lat) {
    await writeCache(cf, null);
    return null;
  }

  const r = rows[0];
  const result: NominatimResult = {
    birthplace: r.address?.city ?? r.address?.town ?? r.address?.village ?? query,
    country: r.address?.country ?? '',
    lat: parseFloat(r.lat!),
    lon: parseFloat(r.lon!),
  };
  await writeCache(cf, result);
  return result;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await ensureDir(DATA_DIR);
  await ensureDir(CACHE_DIR);

  // ── 1. Parse Wikipedia squads ──────────────────────────────────────────────
  console.log('\n══ Step 1: Parse Wikipedia squads ══');
  const wikitext = await fetchSquadsWikitext();
  const rawPlayers = parseSquadsWikitext(wikitext);
  const teamCodes = new Set(rawPlayers.map((p) => p.teamCode));
  console.log(`  Parsed ${rawPlayers.length} players from ${teamCodes.size} teams`);
  if (teamCodes.size < 48) {
    console.warn(
      `  ⚠ Expected 48 teams, got ${teamCodes.size}. Codes: ${[...teamCodes].sort().join(', ')}`,
    );
  }

  // ── 2. Load overrides ──────────────────────────────────────────────────────
  const overridesPath = path.join(DATA_DIR, 'players-overrides.json');
  const overrides: Player[] = existsSync(overridesPath)
    ? (JSON.parse(await fs.readFile(overridesPath, 'utf-8')) as Player[])
    : [];
  const overrideMap = new Map(overrides.map((o) => [o.id, o]));
  console.log(`  Loaded ${overrides.length} overrides`);

  // ── 3. Batch-resolve Wikipedia titles → Wikidata Q-IDs ────────────────────
  console.log('\n══ Step 2: Resolve Wikipedia → Wikidata Q-IDs ══');
  const uniqueTitles = [...new Set(rawPlayers.map((p) => p.wikiTitle))];
  process.stdout.write(`  ${uniqueTitles.length} unique titles…`);
  const qidMap = await batchGetQids(uniqueTitles);
  console.log(` resolved ${qidMap.size}`);

  // ── 4. Batch-fetch player entities → P19 (birthplace Q-IDs) ───────────────
  console.log('\n══ Step 3: Fetch player entities (P19 birthplace) ══');
  const playerQids = [...new Set([...qidMap.values()])];
  process.stdout.write(`  ${playerQids.length} player Q-IDs…`);
  const playerEntities = await batchGetEntities(playerQids);
  console.log(` fetched ${playerEntities.size}`);

  const birthplaceQidMap = new Map<string, string>(); // playerQid → birthplaceQid
  for (const [qid, entity] of playerEntities) {
    const bpQid = claimQid(entity, 'P19');
    if (bpQid) birthplaceQidMap.set(qid, bpQid);
  }

  // ── 5. Batch-fetch birthplace entities → P625 + P17 ───────────────────────
  console.log('\n══ Step 4: Fetch birthplace entities (P625 coords + P17 country) ══');
  const uniqueBpQids = [...new Set([...birthplaceQidMap.values()])];
  process.stdout.write(`  ${uniqueBpQids.length} birthplace entities…`);
  const bpEntities = await batchGetEntities(uniqueBpQids);
  console.log(` fetched ${bpEntities.size}`);

  // ── 6. Batch-fetch country entities → labels ───────────────────────────────
  const countryQids = [...new Set(
    [...bpEntities.values()].map((e) => claimQid(e, 'P17')).filter(Boolean) as string[],
  )];
  const countryEntities = await batchGetEntities(countryQids);

  // ── 7. Assemble players ────────────────────────────────────────────────────
  console.log('\n══ Step 5: Assemble players + Nominatim fallback ══');
  const players: Player[] = [];
  const missing: RawPlayer[] = [];

  for (const raw of rawPlayers) {
    const id = `${raw.teamCode}-${slugify(raw.wikiTitle || raw.name)}`;

    if (overrideMap.has(id)) {
      players.push({ ...overrideMap.get(id)!, id });
      continue;
    }

    const playerQid = qidMap.get(raw.wikiTitle);
    const bpQid = playerQid ? birthplaceQidMap.get(playerQid) : undefined;
    const bpEntity = bpQid ? bpEntities.get(bpQid) : undefined;
    const coords = bpEntity ? claimCoords(bpEntity, 'P625') : null;
    const birthplaceLabel = bpEntity?.labels?.['en']?.value ?? '';
    const countryQid = bpEntity ? claimQid(bpEntity, 'P17') : null;
    const country = countryQid
      ? (countryEntities.get(countryQid)?.labels?.['en']?.value ?? '')
      : '';

    if (coords) {
      players.push({
        id,
        name: raw.name,
        team: raw.team,
        teamCode: raw.teamCode,
        position: raw.position,
        birthplace: birthplaceLabel,
        country,
        lat: coords.lat,
        lon: coords.lon,
      });
      continue;
    }

    // Nominatim fallback: try to geocode the birthplace label (from Wikidata)
    // or skip if we have no label to work with.
    if (birthplaceLabel) {
      process.stdout.write(`  Nominatim: "${birthplaceLabel}" for ${raw.name}…`);
      const geo = await geocodeNominatim(birthplaceLabel);
      if (geo) {
        console.log(' ✓');
        players.push({
          id,
          name: raw.name,
          team: raw.team,
          teamCode: raw.teamCode,
          position: raw.position,
          birthplace: birthplaceLabel,
          country: geo.country || country,
          lat: geo.lat,
          lon: geo.lon,
        });
        continue;
      }
      console.log(' ✗');
    }

    missing.push(raw);
  }

  // ── 8. Write output ────────────────────────────────────────────────────────
  console.log('\n══ Step 6: Write output ══');
  await fs.writeFile(
    path.join(DATA_DIR, 'players.json'),
    JSON.stringify(players, null, 2),
    'utf-8',
  );
  await fs.writeFile(
    path.join(DATA_DIR, 'players-missing.json'),
    JSON.stringify(missing, null, 2),
    'utf-8',
  );
  console.log(`  data/players.json         (${players.length} players)`);
  console.log(`  data/players-missing.json (${missing.length} players)`);

  // ── 9. Stats + sample ─────────────────────────────────────────────────────
  const total = rawPlayers.length;
  const pct = total > 0 ? Math.round((players.length / total) * 100) : 0;
  console.log(`\n══ Coverage ══`);
  console.log(`  Resolved: ${players.length}/${total} (${pct}%)`);
  console.log(`  Missing:  ${missing.length}/${total}`);

  console.log('\n── Sample (first 10 resolved players) ──');
  players.slice(0, 10).forEach((p) => {
    console.log(
      `  ${p.name.padEnd(28)} ${p.teamCode.padEnd(4)} ${p.birthplace}, ${p.country}`,
    );
  });

  if (missing.length) {
    console.log('\n── Missing players ──');
    missing.forEach((p) => {
      const reason = !qidMap.get(p.wikiTitle)
        ? 'no Wikidata Q-ID'
        : !birthplaceQidMap.get(qidMap.get(p.wikiTitle)!)
          ? 'no P19 birthplace'
          : 'no P625 coords';
      console.log(`  ${p.name.padEnd(28)} ${p.teamCode.padEnd(4)} (${reason})`);
    });
    console.log('\n  → Add entries to data/players-overrides.json to fix these.');
  }
}

main().catch((err) => {
  console.error('\nFatal:', err);
  process.exit(1);
});
