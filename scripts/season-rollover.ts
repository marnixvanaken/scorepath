#!/usr/bin/env node
/**
 * scripts/season-rollover.ts
 *
 * Seizoenswissel-gereedschap voor de club-globe. Vergelijkt een verse
 * checkout van https://github.com/luukhopman/football-logos met
 * data/memberships.json en rapporteert per competitie de mutaties:
 *
 *   - clubs in de repo maar niet in het lidmaatschap  -> promovendi
 *   - clubs in het lidmaatschap maar niet in de repo  -> degradanten
 *   - promovendi zonder registerrecord               -> handwerk-TODO
 *   - bestanden zonder id-mapping (zes v1-competities) -> TODO in logoIds.ts
 *
 * Met --write worden lidmaatschappen bijgewerkt voor competities waarvan
 * ÁLLE repo-clubs naar een bekend registerrecord resolven (anders alleen
 * rapportage; eerst registerrecords aanvullen, daarna opnieuw draaien).
 * Logo's daarna verversen met: npx tsx scripts/import-logos.ts <checkout>
 *
 * Run:   git clone --depth 1 https://github.com/luukhopman/football-logos /tmp/fl
 *        npx tsx scripts/season-rollover.ts /tmp/fl [--write] [--season 2027/28]
 *
 * Let op:
 * - Kalenderjaar-competities (Eliteserien, Allsvenskan) rollen in de winter;
 *   geef dan --season 2027 mee en draai alleen voor die competities zodra de
 *   repo hun nieuwe seizoen bevat.
 * - data/uefa.json heeft een eigen levenscyclus: de league phases van
 *   CL/EL/UECL liggen pas eind augustus vast — dit script wijst je erop
 *   maar wijzigt dat bestand bewust niet.
 */

import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fileToId } from './logoIds';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REGISTER_FILE = path.join(ROOT, 'data', 'clubs.json');
const MEMBERSHIPS_FILE = path.join(ROOT, 'data', 'memberships.json');

// Repo-map -> competitiecode. De id-resolutie zelf (bestandsnaam -> club-id)
// loopt via scripts/logoIds.ts, zodat dit script gegarandeerd dezelfde ids
// afleidt als scripts/import-logos.ts — inclusief de handgecureerde ids van
// de zes oorspronkelijke competities.
const LEAGUE_FOLDERS: Record<string, string> = {
  'Netherlands - Eredivisie': 'ED',
  'England - Premier League': 'PL',
  'Spain - LaLiga': 'PD',
  'Germany - Bundesliga': 'BL1',
  'Italy - Serie A': 'SA',
  'France - Ligue 1': 'FL1',
  'Austria - Bundesliga': 'AT1',
  'Belgium - Jupiler Pro League': 'BE1',
  'Bulgaria - efbet Liga': 'BG1',
  'Croatia - SuperSport HNL': 'HR1',
  'Czech Republic - Chance Liga': 'CZ1',
  'Denmark - Superliga': 'DK1',
  'Greece - Super League 1': 'GR1',
  "Israel - Ligat ha'Al": 'IL1',
  'Norway - Eliteserien': 'NO1',
  'Poland - PKO BP Ekstraklasa': 'PL1',
  'Portugal - Liga Portugal': 'PPL',
  'Romania - SuperLiga': 'RO1',
  'Russia - Premier Liga': 'RU1',
  'Scotland - Scottish Premiership': 'SC1',
  'Serbia - Super liga Srbije': 'RS1',
  'Sweden - Allsvenskan': 'SE1',
  'Switzerland - Super League': 'CH1',
  'Türkiye - Süper Lig': 'TR1',
  'Ukraine - Premier Liga': 'UA1',
};

interface Membership { season: string; clubs: string[] }

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const seasonIdx = args.indexOf('--season');
  const season = seasonIdx >= 0 ? args[seasonIdx + 1] : null;
  const sourceRoot = args.find((a) => !a.startsWith('--') && a !== season);

  if (!sourceRoot || !existsSync(path.join(sourceRoot, 'logos'))) {
    console.error('Gebruik: npx tsx scripts/season-rollover.ts /pad/naar/football-logos [--write] [--season 2027/28]');
    process.exit(1);
  }

  const register = JSON.parse(await fs.readFile(REGISTER_FILE, 'utf8')) as { id: string }[];
  const registerIds = new Set(register.map((c) => c.id));
  const memberships = JSON.parse(await fs.readFile(MEMBERSHIPS_FILE, 'utf8')) as Record<string, Membership>;

  let todo = 0;
  let updated = 0;
  for (const [folder, code] of Object.entries(LEAGUE_FOLDERS)) {
    const dir = path.join(sourceRoot, 'logos', folder);
    if (!existsSync(dir)) {
      console.warn(`⚠ ${code}: map "${folder}" ontbreekt in de checkout`);
      continue;
    }
    const repoIds: string[] = [];
    const unmapped: string[] = [];
    for (const entry of await fs.readdir(dir)) {
      if (!entry.endsWith('.png')) continue;
      const id = fileToId(folder, entry.replace(/\.png$/, ''));
      if (id) repoIds.push(id);
      else unmapped.push(entry);
    }
    const current = new Set(memberships[code]?.clubs ?? []);
    const incoming = repoIds.filter((id) => !current.has(id));
    const outgoing = [...current].filter((id) => !repoIds.includes(id));
    const unresolved = incoming.filter((id) => !registerIds.has(id));

    if (incoming.length === 0 && outgoing.length === 0 && unmapped.length === 0) {
      console.log(`= ${code}: ongewijzigd (${current.size} clubs, seizoen ${memberships[code].season})`);
      continue;
    }
    console.log(`~ ${code}: +${incoming.length} promovendi [${incoming.join(', ')}], -${outgoing.length} degradanten [${outgoing.join(', ')}]`);
    for (const file of unmapped) {
      console.log(`  ✗ TODO id-mapping voor "${folder}/${file}" (EXPLICIT_MAPPING in scripts/logoIds.ts)`);
      todo++;
    }
    for (const id of unresolved) {
      console.log(`  ✗ TODO registerrecord voor ${id} (stad/stadion/coördinaten in data/clubs.json)`);
      todo++;
    }

    if (write && unresolved.length === 0 && unmapped.length === 0) {
      memberships[code] = { season: season ?? memberships[code].season, clubs: [...repoIds].sort() };
      updated++;
      console.log(`  ✓ lidmaatschap bijgewerkt (${repoIds.length} clubs)`);
    } else if (write) {
      console.log(`  ⤫ overgeslagen: eerst mapping/registerrecords aanvullen`);
    }
  }

  if (write && updated > 0) {
    await fs.writeFile(MEMBERSHIPS_FILE, JSON.stringify(memberships, null, 1) + '\n');
    console.log(`\n${updated} lidmaatschap(pen) geschreven naar data/memberships.json.`);
    console.log(`Vergeet niet: npx tsx scripts/import-logos.ts ${sourceRoot} (logo's) en npm run test.`);
  }
  console.log(`\nHerinnering: data/uefa.json (CL/EL/UECL) heeft een eigen cyclus — league phases liggen eind augustus vast.`);
  if (todo > 0) process.exit(2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
