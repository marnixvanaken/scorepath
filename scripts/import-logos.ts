#!/usr/bin/env node
/**
 * scripts/import-logos.ts
 *
 * One-off script: copy club logos from a local checkout of
 * https://github.com/luukhopman/football-logos into public/logos/{clubId}.png
 * and point each club's `crest` in data/clubs.json at the local file.
 *
 * Run:   git clone --depth 1 https://github.com/luukhopman/football-logos.git /tmp/football-logos
 *        npx tsx scripts/import-logos.ts /tmp/football-logos
 *
 * The mapping below is explicit (source filename -> our club id) so a rename
 * upstream fails loudly here instead of silently mismatching a crest.
 * Re-run after promotion/relegation once data/clubs.json is refreshed.
 */

import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'logos');
const CLUBS_FILE = path.join(ROOT, 'data', 'clubs.json');

// League folder in the source repo -> { source filename (without .png) -> club id }
const MAPPING: Record<string, Record<string, string>> = {
  'Netherlands - Eredivisie': {
    'AZ Alkmaar': 'nl-az',
    'Ajax Amsterdam': 'nl-ajax',
    'Excelsior Rotterdam': 'nl-excelsior',
    'FC Groningen': 'nl-groningen',
    'FC Utrecht': 'nl-utrecht',
    'FC Volendam': 'nl-volendam',
    'Feyenoord Rotterdam': 'nl-feyenoord',
    'Fortuna Sittard': 'nl-fortuna-sittard',
    'Go Ahead Eagles': 'nl-go-ahead-eagles',
    'Heracles Almelo': 'nl-heracles',
    'NAC Breda': 'nl-nac-breda',
    'NEC Nijmegen': 'nl-nec',
    'PEC Zwolle': 'nl-pec-zwolle',
    'PSV Eindhoven': 'nl-psv',
    'SC Heerenveen': 'nl-heerenveen',
    'SC Telstar': 'nl-telstar',
    'Sparta Rotterdam': 'nl-sparta-rotterdam',
    'Twente Enschede FC': 'nl-twente',
  },
  'England - Premier League': {
    'AFC Bournemouth': 'en-bournemouth',
    'Arsenal FC': 'en-arsenal',
    'Aston Villa': 'en-aston-villa',
    'Brentford FC': 'en-brentford',
    'Brighton & Hove Albion': 'en-brighton',
    'Burnley FC': 'en-burnley',
    'Chelsea FC': 'en-chelsea',
    'Crystal Palace': 'en-crystal-palace',
    'Everton FC': 'en-everton',
    'Fulham FC': 'en-fulham',
    'Leeds United': 'en-leeds-united',
    'Liverpool FC': 'en-liverpool',
    'Manchester City': 'en-manchester-city',
    'Manchester United': 'en-manchester-united',
    'Newcastle United': 'en-newcastle',
    'Nottingham Forest': 'en-nottingham-forest',
    'Sunderland AFC': 'en-sunderland',
    'Tottenham Hotspur': 'en-tottenham',
    'West Ham United': 'en-west-ham',
    'Wolverhampton Wanderers': 'en-wolverhampton',
  },
  'Spain - LaLiga': {
    'Athletic Bilbao': 'es-athletic',
    'Atlético de Madrid': 'es-atletico-madrid',
    'CA Osasuna': 'es-osasuna',
    'Celta de Vigo': 'es-celta',
    'Deportivo Alavés': 'es-alaves',
    'Elche CF': 'es-elche',
    'FC Barcelona': 'es-barcelona',
    'Getafe CF': 'es-getafe',
    'Girona FC': 'es-girona',
    'Levante UD': 'es-levante',
    'RCD Espanyol Barcelona': 'es-espanyol',
    'RCD Mallorca': 'es-mallorca',
    'Rayo Vallecano': 'es-rayo-vallecano',
    'Real Betis Balompié': 'es-betis',
    'Real Madrid': 'es-real-madrid',
    'Real Oviedo': 'es-oviedo',
    'Real Sociedad': 'es-real-sociedad',
    'Sevilla FC': 'es-sevilla',
    'Valencia CF': 'es-valencia',
    'Villarreal CF': 'es-villarreal',
  },
  'Germany - Bundesliga': {
    '1.FC Heidenheim 1846': 'de-heidenheim',
    '1.FC Köln': 'de-koln',
    '1.FC Union Berlin': 'de-union-berlin',
    '1.FSV Mainz 05': 'de-mainz',
    'Bayer 04 Leverkusen': 'de-leverkusen',
    'Bayern Munich': 'de-bayern',
    'Borussia Dortmund': 'de-dortmund',
    'Borussia Mönchengladbach': 'de-monchengladbach',
    'Eintracht Frankfurt': 'de-frankfurt',
    'FC Augsburg': 'de-augsburg',
    'FC St. Pauli': 'de-st-pauli',
    'Hamburger SV': 'de-hamburg',
    'RB Leipzig': 'de-leipzig',
    'SC Freiburg': 'de-freiburg',
    'SV Werder Bremen': 'de-bremen',
    'TSG 1899 Hoffenheim': 'de-hoffenheim',
    'VfB Stuttgart': 'de-stuttgart',
    'VfL Wolfsburg': 'de-wolfsburg',
  },
  'Italy - Serie A': {
    'AC Milan': 'it-milan',
    'ACF Fiorentina': 'it-fiorentina',
    'AS Roma': 'it-roma',
    'Atalanta BC': 'it-atalanta',
    'Bologna FC 1909': 'it-bologna',
    'Cagliari Calcio': 'it-cagliari',
    'Como 1907': 'it-como',
    'Genoa CFC': 'it-genoa',
    'Hellas Verona': 'it-verona',
    'Inter Milan': 'it-inter',
    'Juventus FC': 'it-juventus',
    'Parma Calcio 1913': 'it-parma',
    'Pisa Sporting Club': 'it-pisa',
    'SS Lazio': 'it-lazio',
    'SSC Napoli': 'it-napoli',
    'Torino FC': 'it-torino',
    'US Cremonese': 'it-cremonese',
    'US Lecce': 'it-lecce',
    'US Sassuolo': 'it-sassuolo',
    'Udinese Calcio': 'it-udinese',
  },
  'France - Ligue 1': {
    'AJ Auxerre': 'fr-auxerre',
    'AS Monaco': 'fr-monaco',
    'Angers SCO': 'fr-angers',
    'FC Lorient': 'fr-lorient',
    'FC Metz': 'fr-metz',
    'FC Nantes': 'fr-nantes',
    'FC Toulouse': 'fr-toulouse',
    'LOSC Lille': 'fr-lille',
    'Le Havre AC': 'fr-le-havre',
    'OGC Nice': 'fr-nice',
    'Olympique Lyon': 'fr-lyon',
    'Olympique Marseille': 'fr-marseille',
    'Paris FC': 'fr-paris-fc',
    'Paris Saint-Germain': 'fr-psg',
    'RC Lens': 'fr-lens',
    'RC Strasbourg Alsace': 'fr-strasbourg',
    'Stade Brestois 29': 'fr-brest',
    'Stade Rennais FC': 'fr-rennes',
  },
};

interface ClubRecord {
  id: string;
  tier: number;
  crest: string | null;
  [key: string]: unknown;
}

async function main(): Promise<void> {
  const sourceRoot = process.argv[2];
  if (!sourceRoot || !existsSync(path.join(sourceRoot, 'logos'))) {
    console.error('Usage: npx tsx scripts/import-logos.ts /path/to/football-logos-checkout');
    process.exit(1);
  }

  const clubs = JSON.parse(await fs.readFile(CLUBS_FILE, 'utf8')) as ClubRecord[];
  const clubIds = new Set(clubs.map((c) => c.id));
  await fs.mkdir(OUT_DIR, { recursive: true });

  let copied = 0;
  const problems: string[] = [];
  for (const [league, files] of Object.entries(MAPPING)) {
    for (const [file, clubId] of Object.entries(files)) {
      const src = path.join(sourceRoot, 'logos', league, `${file}.png`);
      if (!clubIds.has(clubId)) {
        problems.push(`unknown club id ${clubId} (from "${file}")`);
        continue;
      }
      if (!existsSync(src)) {
        problems.push(`missing source file: ${league}/${file}.png`);
        continue;
      }
      await fs.copyFile(src, path.join(OUT_DIR, `${clubId}.png`));
      copied++;
    }
  }

  // Point crests at the copied files; clubs without a logo keep their value.
  for (const club of clubs) {
    if (existsSync(path.join(OUT_DIR, `${club.id}.png`))) {
      club.crest = `/logos/${club.id}.png`;
    }
  }
  await fs.writeFile(CLUBS_FILE, `[\n${clubs.map((c) => JSON.stringify(c)).join(',\n')}\n]\n`);

  const withoutLogo = clubs.filter((c) => c.tier === 1 && !c.crest).map((c) => c.id);
  console.log(`Copied ${copied} logos to ${OUT_DIR} and updated ${CLUBS_FILE}.`);
  if (withoutLogo.length) console.warn('Tier-1 clubs without a logo:', withoutLogo.join(', '));
  if (problems.length) {
    problems.forEach((p) => console.error('PROBLEM:', p));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
