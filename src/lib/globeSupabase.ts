/**
 * Optionele Supabase-bron voor de club-globe (fase 2, wereldwijde schaal).
 *
 * De globe leest standaard uit de statische JSON (`@/data/clubs`) — snel en
 * zonder runtime-database. Wanneer Supabase is ingericht (schema uit
 * supabase/migration_globe.sql, gevuld met `npm run sync-globe`), kan de globe
 * in plaats daarvan de actuele opstelling live uit Supabase halen, zodat een
 * seizoenswissel of de UEFA-loting zichtbaar wordt zonder redeploy.
 *
 * `fetchGlobeClubs()` geeft `null` terug als Supabase niet is geconfigureerd of
 * de query faalt; de aanroeper valt dan terug op de gebundelde `clubs`.
 */
import { createClient } from '@supabase/supabase-js';
import type { Club } from '@/data/clubs';

export interface CompetitionRow {
  code: string;
  country: string;
  tier: number;
  label: string;
  current_season: string;
}
export interface ClubRow {
  id: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  stadium_name: string;
  stadium_capacity: number | null;
  fd_id: number | null;
  crest: string | null;
}
export interface MembershipRow {
  competition: string;
  season: string;
  club_id: string;
}
export interface UefaRow {
  season: string;
  tournament: 'UCL' | 'UEL' | 'UECL';
  club_id: string;
}

/**
 * Zuivere join van de databaserijen naar de runtime `Club[]`-vorm — dezelfde
 * shape en semantiek als de statische join in `@/data/clubs`. Alleen clubs uit
 * het actuele seizoen van hun competitie (season === current_season) doen mee.
 */
export function mapRowsToClubs(
  competitions: CompetitionRow[],
  clubs: ClubRow[],
  memberships: MembershipRow[],
  uefa: UefaRow[],
): Club[] {
  const compByCode = new Map(competitions.map((c) => [c.code, c]));
  const clubById = new Map(clubs.map((c) => [c.id, c]));
  const uefaByClub = new Map(uefa.map((u) => [u.club_id, u.tournament]));

  const result: Club[] = [];
  for (const m of memberships) {
    const comp = compByCode.get(m.competition);
    if (!comp || m.season !== comp.current_season) continue; // alleen de actuele opstelling
    const rec = clubById.get(m.club_id);
    if (!rec) continue;
    const uefaTag = uefaByClub.get(m.club_id);
    result.push({
      id: rec.id,
      name: rec.name,
      country: rec.country,
      city: rec.city,
      competition: m.competition,
      tier: comp.tier,
      lat: rec.lat,
      lng: rec.lng,
      stadium: { name: rec.stadium_name, capacity: rec.stadium_capacity },
      fdId: rec.fd_id,
      crest: rec.crest,
      ...(uefaTag ? { uefa: uefaTag } : {}),
    });
  }
  return result;
}

/**
 * Haalt de actuele opstelling live uit Supabase. Geeft `null` bij ontbrekende
 * configuratie of een fout, zodat de aanroeper terugvalt op de statische data.
 */
export async function fetchGlobeClubs(): Promise<Club[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const supabase = createClient(url, key);
    const [competitions, clubs, memberships, uefa] = await Promise.all([
      supabase.from('globe_competitions').select('code,country,tier,label,current_season'),
      supabase.from('globe_clubs').select('id,name,country,city,lat,lng,stadium_name,stadium_capacity,fd_id,crest'),
      supabase.from('globe_memberships').select('competition,season,club_id'),
      supabase.from('globe_uefa').select('season,tournament,club_id'),
    ]);
    if (competitions.error || clubs.error || memberships.error || uefa.error) return null;
    if (!competitions.data?.length || !clubs.data?.length) return null;

    return mapRowsToClubs(
      competitions.data as CompetitionRow[],
      clubs.data as ClubRow[],
      memberships.data as MembershipRow[],
      (uefa.data ?? []) as UefaRow[],
    );
  } catch {
    return null;
  }
}
