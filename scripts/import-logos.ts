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
import { EXPLICIT_MAPPING as MAPPING, AUTO_LEAGUES, slugify } from './logoIds';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'logos');
const CLUBS_FILE = path.join(ROOT, 'data', 'clubs.json');

// De bestandsnaam -> club-id-resolutie (expliciete mapping + auto-slug)
// staat in scripts/logoIds.ts en wordt gedeeld met scripts/season-rollover.ts.

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

  // Auto-afgeleide competities: id = '{prefix}-{slug(bestandsnaam)}'.
  for (const [league, prefix] of Object.entries(AUTO_LEAGUES)) {
    const dir = path.join(sourceRoot, 'logos', league);
    if (!existsSync(dir)) {
      problems.push(`missing league folder: ${league}`);
      continue;
    }
    for (const entry of await fs.readdir(dir)) {
      if (!entry.endsWith('.png')) continue;
      const clubId = `${prefix}-${slugify(entry.replace(/\.png$/, ''))}`;
      if (!clubIds.has(clubId)) {
        problems.push(`no club record for ${league}/${entry} (verwacht id ${clubId})`);
        continue;
      }
      await fs.copyFile(path.join(dir, entry), path.join(OUT_DIR, `${clubId}.png`));
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
