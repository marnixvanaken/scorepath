#!/usr/bin/env node
/**
 * scripts/sync-globe-supabase.ts
 *
 * Duwt de statische club-globe-data (data/clubs.json + memberships.json +
 * uefa.json + de COMPETITIONS-metadata) naar Supabase, in het schema uit
 * supabase/migration_globe.sql. Idempotent: upsert op de primary keys en
 * verwijder verweesde lidmaatschap-/uefa-rijen achteraf.
 *
 * Vereist: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (schrijft via
 * de service_role key, die RLS omzeilt). Zonder die vars stopt het script met
 * een uitleg in plaats van te crashen.
 *
 * Run:   npm run sync-globe
 * Eerst: draai supabase/migration_globe.sql in de Supabase SQL-editor.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPETITIONS, MEMBERSHIPS, register } from '../src/data/clubs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

interface UefaFile {
  season: string;
  UCL: string[];
  UEL: string[];
  UECL: string[];
}

async function upsertChunked<T>(
  supabase: SupabaseClient,
  table: string,
  rows: T[],
  onConflict?: string,
): Promise<void> {
  const CHUNK = 500;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from(table).upsert(slice as never, onConflict ? { onConflict } : undefined);
    if (error) throw new Error(`upsert ${table} mislukt: ${error.message}`);
  }
}

async function main(): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      'Supabase-omgeving ontbreekt.\n' +
        '  1. Draai supabase/migration_globe.sql in de Supabase SQL-editor.\n' +
        '  2. Zet NEXT_PUBLIC_SUPABASE_URL en SUPABASE_SERVICE_ROLE_KEY in je omgeving.\n' +
        '  3. Draai opnieuw: npm run sync-globe',
    );
    process.exit(1);
  }
  const supabase = createClient(url, key);

  const uefa = JSON.parse(await fs.readFile(path.join(ROOT, 'data', 'uefa.json'), 'utf8')) as UefaFile;

  // 1. Competities (met actueel seizoen uit de lidmaatschappen).
  const competitionRows = Object.entries(COMPETITIONS).map(([code, meta]) => ({
    code,
    country: meta.country,
    tier: meta.tier,
    label: meta.label,
    current_season: MEMBERSHIPS[code]?.season ?? '',
  }));
  await upsertChunked(supabase, 'globe_competitions', competitionRows, 'code');

  // 2. Clubregister.
  const clubRows = register.map((c) => ({
    id: c.id,
    name: c.name,
    country: c.country,
    city: c.city,
    lat: c.lat,
    lng: c.lng,
    stadium_name: c.stadium.name,
    stadium_capacity: c.stadium.capacity,
    fd_id: c.fdId,
    crest: c.crest,
  }));
  await upsertChunked(supabase, 'globe_clubs', clubRows, 'id');

  // 3. Lidmaatschappen (vervang de actuele seizoensrijen per competitie).
  const membershipRows = Object.entries(MEMBERSHIPS).flatMap(([competition, m]) =>
    m.clubs.map((club_id) => ({ competition, season: m.season, club_id })),
  );
  await upsertChunked(supabase, 'globe_memberships', membershipRows, 'competition,season,club_id');

  // 4. UEFA-deelname.
  const uefaRows = (['UCL', 'UEL', 'UECL'] as const).flatMap((tournament) =>
    uefa[tournament].map((club_id) => ({ season: uefa.season, tournament, club_id })),
  );
  if (uefaRows.length) {
    await upsertChunked(supabase, 'globe_uefa', uefaRows, 'season,tournament,club_id');
  }

  // Opruimen: verwijder lidmaatschap-/uefa-rijen die niet meer in de JSON staan
  // (bv. na een seizoenswissel), zodat Supabase de bron exact volgt.
  const keepMembership = new Set(membershipRows.map((r) => `${r.competition}|${r.season}|${r.club_id}`));
  const { data: dbMemberships } = await supabase.from('globe_memberships').select('competition,season,club_id');
  for (const row of dbMemberships ?? []) {
    if (!keepMembership.has(`${row.competition}|${row.season}|${row.club_id}`)) {
      await supabase
        .from('globe_memberships')
        .delete()
        .match({ competition: row.competition, season: row.season, club_id: row.club_id });
    }
  }

  const keepUefa = new Set(uefaRows.map((r) => `${r.season}|${r.tournament}|${r.club_id}`));
  const { data: dbUefa } = await supabase.from('globe_uefa').select('season,tournament,club_id');
  for (const row of dbUefa ?? []) {
    if (!keepUefa.has(`${row.season}|${row.tournament}|${row.club_id}`)) {
      await supabase
        .from('globe_uefa')
        .delete()
        .match({ season: row.season, tournament: row.tournament, club_id: row.club_id });
    }
  }

  console.log(
    `Gesynchroniseerd naar Supabase: ${competitionRows.length} competities, ` +
      `${clubRows.length} clubs, ${membershipRows.length} lidmaatschappen, ${uefaRows.length} UEFA-rijen.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
