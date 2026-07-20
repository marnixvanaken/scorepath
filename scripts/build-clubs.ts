#!/usr/bin/env node
/**
 * scripts/build-clubs.ts
 *
 * One-off script: build data/clubs.json — the club dataset for the globe.
 * Combines two sources on top of the existing snapshot:
 *
 *   1. football-data.org (needs FOOTBALL_DATA_API_KEY): team ids, crest
 *      URLs and official names for the six covered competitions
 *      (DED, PL, PD, BL1, SA, FL1). Skipped when the key is absent —
 *      existing fdId/crest values in data/clubs.json are then preserved.
 *   2. Wikidata SPARQL (keyless): stadium, coordinates, capacity and city
 *      for all seven competitions, including the Keuken Kampioen Divisie
 *      which football-data.org's free tier does not cover.
 *
 * Run:   npx tsx scripts/build-clubs.ts
 *   or:  npm run build-clubs
 * Cache: .cache/  (delete to force refresh; gitignored)
 *
 * The committed data/clubs.json is a snapshot; it does NOT update itself.
 * Re-run after promotion/relegation or to verify/refresh fd ids and crests.
 *
 * Hand-fixes go in data/clubs-overrides.json (same shape as a club record,
 * matched on `id`; merged last, wins over both sources). Clubs found in
 * only one source are reported in data/clubs-missing.json for curation.
 */

import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const CACHE_DIR = path.join(ROOT, '.cache');
const OUT_FILE = path.join(DATA_DIR, 'clubs.json');
const OVERRIDES_FILE = path.join(DATA_DIR, 'clubs-overrides.json');
const MISSING_FILE = path.join(DATA_DIR, 'clubs-missing.json');

const FD_KEY = process.env.FOOTBALL_DATA_API_KEY ?? '';
const UA = 'ScorepathClubGlobe/1.0 (https://scorepath.app)';

// ─── Competitions ─────────────────────────────────────────────────────────────

interface CompetitionDef {
  code: string;          // internal code, also used in Club.competition
  fdCode: string | null; // football-data.org competition code; null = not covered
  wikidataId: string;    // league item, membership via P118
  country: string;       // flagcdn-style country code (matches UCLClub.flagCode)
  tier: number;
}

const COMPETITIONS: CompetitionDef[] = [
  { code: 'ED',  fdCode: 'DED', wikidataId: 'Q83380',  country: 'nl',     tier: 1 },
  { code: 'KKD', fdCode: null,  wikidataId: 'Q336176', country: 'nl',     tier: 2 },
  { code: 'PL',  fdCode: 'PL',  wikidataId: 'Q9448',   country: 'gb-eng', tier: 1 },
  { code: 'PD',  fdCode: 'PD',  wikidataId: 'Q324867', country: 'es',     tier: 1 },
  { code: 'BL1', fdCode: 'BL1', wikidataId: 'Q82595',  country: 'de',     tier: 1 },
  { code: 'SA',  fdCode: 'SA',  wikidataId: 'Q15804',  country: 'it',     tier: 1 },
  { code: 'FL1', fdCode: 'FL1', wikidataId: 'Q13394',  country: 'fr',     tier: 1 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Club {
  id: string;
  name: string;
  country: string;
  city: string;
  competition: string;
  tier: number;
  lat: number;
  lng: number;
  stadium: { name: string; capacity: number | null };
  fdId: number | null;
  crest: string | null;
  colors?: [string, string];
  wikidataId?: string;
}

interface FdTeam {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest?: string;
  venue?: string;
}

interface WdClub {
  wikidataId: string;
  name: string;
  stadium: string | null;
  lat: number | null;
  lng: number | null;
  capacity: number | null;
  city: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function cachedFetch(cacheKey: string, url: string, init: RequestInit): Promise<string> {
  const file = path.join(CACHE_DIR, cacheKey);
  if (existsSync(file)) return fs.readFile(file, 'utf8');
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const body = await res.text();
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(file, body);
  return body;
}

// Normalize a club name for cross-source matching.
function normalize(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\b(fc|afc|cf|ac|as|ss|ssc|us|rc|rcd|cd|sd|sc|bv|vv|sv|tsg|vfl|vfb|rb|ogc|losc|stade|club|de|le|1\.|1899|1900|04|05|09)\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Known cross-source name mismatches (normalized fd name -> normalized wd name).
const ALIASES: Record<string, string> = {
  psveindhoven: 'psv',
  internazionalemilano: 'internazionale',
  wolverhamptonwanderers: 'wolverhampton',
  brightonhovealbion: 'brightonhove',
  borussiamonchengladbach: 'monchengladbach',
  bayer04leverkusen: 'bayerleverkusen',
  parissaintgermain: 'parissaintgermain',
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const countryIso2: Record<string, string> = {
  nl: 'nl', 'gb-eng': 'en', es: 'es', de: 'de', it: 'it', fr: 'fr',
};

// ─── Sources ──────────────────────────────────────────────────────────────────

async function fetchFdTeams(comp: CompetitionDef): Promise<FdTeam[]> {
  if (!comp.fdCode || !FD_KEY) return [];
  const body = await cachedFetch(
    `fd-${comp.fdCode}.json`,
    `https://api.football-data.org/v4/competitions/${comp.fdCode}/teams`,
    { headers: { 'X-Auth-Token': FD_KEY, 'User-Agent': UA } },
  );
  const json = JSON.parse(body) as { teams?: FdTeam[] };
  return json.teams ?? [];
}

async function fetchWikidataClubs(comp: CompetitionDef): Promise<WdClub[]> {
  const sparql = `
    SELECT ?club ?clubLabel ?venueLabel ?coord ?capacity ?cityLabel WHERE {
      ?club wdt:P118 wd:${comp.wikidataId} .
      OPTIONAL {
        ?club wdt:P115 ?venue .
        OPTIONAL { ?venue wdt:P625 ?coord . }
        OPTIONAL { ?venue wdt:P1083 ?capacity . }
        OPTIONAL { ?venue wdt:P131 ?city . }
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en,nl". }
    }`;
  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}&format=json`;
  const body = await cachedFetch(`wd-${comp.code}.json`, url, {
    headers: { Accept: 'application/sparql-results+json', 'User-Agent': UA },
  });
  type Binding = Record<string, { value: string } | undefined>;
  const rows = (JSON.parse(body) as { results: { bindings: Binding[] } }).results.bindings;

  // A club can appear multiple times (several venues/cities); keep the row
  // with the largest capacity, which is virtually always the main stadium.
  const byId = new Map<string, WdClub>();
  for (const row of rows) {
    const wikidataId = row.club!.value.split('/').pop()!;
    let lat: number | null = null;
    let lng: number | null = null;
    const wkt = row.coord?.value; // "Point(lng lat)"
    const m = wkt?.match(/Point\(([-\d.]+) ([-\d.]+)\)/);
    if (m) { lng = Number(m[1]); lat = Number(m[2]); }
    const club: WdClub = {
      wikidataId,
      name: row.clubLabel?.value ?? wikidataId,
      stadium: row.venueLabel?.value ?? null,
      lat, lng,
      capacity: row.capacity ? Math.round(Number(row.capacity.value)) : null,
      city: row.cityLabel?.value ?? null,
    };
    const prev = byId.get(wikidataId);
    if (!prev || (club.capacity ?? 0) > (prev.capacity ?? 0)) byId.set(wikidataId, club);
  }
  return [...byId.values()];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const existing: Club[] = existsSync(OUT_FILE)
    ? (JSON.parse(await fs.readFile(OUT_FILE, 'utf8')) as Club[])
    : [];
  const existingById = new Map(existing.map((c) => [c.id, c]));
  const overrides: Partial<Club>[] = existsSync(OVERRIDES_FILE)
    ? (JSON.parse(await fs.readFile(OVERRIDES_FILE, 'utf8')) as Partial<Club>[])
    : [];

  if (!FD_KEY) {
    console.warn('FOOTBALL_DATA_API_KEY not set — skipping football-data.org; existing fdId/crest values are preserved.');
  }

  const clubs: Club[] = [];
  const missing: { competition: string; source: string; name: string }[] = [];

  for (const comp of COMPETITIONS) {
    const [fdTeams, wdClubs] = [await fetchFdTeams(comp), await fetchWikidataClubs(comp)];
    const fdByNorm = new Map<string, FdTeam>();
    for (const t of fdTeams) {
      for (const n of [t.name, t.shortName ?? '']) {
        const norm = ALIASES[normalize(n)] ?? normalize(n);
        if (norm) fdByNorm.set(norm, t);
      }
    }

    for (const wd of wdClubs) {
      const norm = ALIASES[normalize(wd.name)] ?? normalize(wd.name);
      const fd = fdByNorm.get(norm) ?? null;
      if (fd) fdByNorm.delete(norm);
      const id = `${countryIso2[comp.country]}-${slugify(fd?.shortName ?? wd.name)}`;
      const prev = existingById.get(id);
      const club: Club = {
        id,
        name: fd?.shortName ?? fd?.name ?? wd.name,
        country: comp.country,
        city: wd.city ?? prev?.city ?? '',
        competition: comp.code,
        tier: comp.tier,
        lat: wd.lat ?? prev?.lat ?? NaN,
        lng: wd.lng ?? prev?.lng ?? NaN,
        stadium: {
          name: wd.stadium ?? prev?.stadium.name ?? '',
          capacity: wd.capacity ?? prev?.stadium.capacity ?? null,
        },
        fdId: fd?.id ?? prev?.fdId ?? null,
        // Bundled logos (scripts/import-logos.ts) win over remote fd crests.
        crest: prev?.crest?.startsWith('/logos/') ? prev.crest : fd?.crest ?? prev?.crest ?? null,
        wikidataId: wd.wikidataId,
      };
      if (prev?.colors) club.colors = prev.colors;
      if (Number.isNaN(club.lat) || !club.stadium.name) {
        missing.push({ competition: comp.code, source: 'wikidata-incomplete', name: wd.name });
      }
      clubs.push(club);
    }

    // fd teams that no Wikidata club matched.
    for (const t of fdByNorm.values()) {
      if (!clubs.some((c) => c.fdId === t.id)) {
        missing.push({ competition: comp.code, source: 'fd-unmatched', name: t.name });
      }
    }
    console.log(`${comp.code}: ${wdClubs.length} clubs from Wikidata, ${fdTeams.length} from football-data.org`);
  }

  // Overrides win over everything; they can also add whole clubs.
  for (const o of overrides) {
    if (!o.id) continue;
    const i = clubs.findIndex((c) => c.id === o.id);
    if (i >= 0) clubs[i] = { ...clubs[i], ...o, stadium: { ...clubs[i].stadium, ...o.stadium } };
    else clubs.push(o as Club);
  }

  const complete = clubs.filter((c) => !Number.isNaN(c.lat) && c.stadium.name);
  complete.sort((a, b) => a.competition.localeCompare(b.competition) || a.name.localeCompare(b.name));

  await fs.writeFile(OUT_FILE, JSON.stringify(complete, null, 1) + '\n');
  await fs.writeFile(MISSING_FILE, JSON.stringify(missing, null, 2) + '\n');
  console.log(`Wrote ${complete.length} clubs to ${OUT_FILE}; ${missing.length} issues in ${MISSING_FILE}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
