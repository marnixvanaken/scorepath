import rawRegister from '../../data/clubs.json';
import rawMemberships from '../../data/memberships.json';
import rawUefa from '../../data/uefa.json';

// Clubdata voor de globe, in drie lagen (elk een gecommit snapshot):
// - data/clubs.json        het clubREGISTER: identiteit/stadion/coords, seizoensloos
// - data/memberships.json  per competitie: eigen seizoenslabel + club-ids
//                          (competities rollen onafhankelijk: Eredivisie in de
//                          zomer, Eliteserien/Allsvenskan per kalenderjaar)
// - data/uefa.json         CL/EL/UECL-deelname met eigen levenscyclus
// Runtime worden ze hier samengevoegd tot hetzelfde Club-shape als voorheen.
// Verversen: scripts/season-rollover.ts + scripts/build-clubs.ts.
export interface ClubRecord {
  id: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  stadium: { name: string; capacity: number | null };
  fdId: number | null;
  crest: string | null;
  colors?: [string, string];
  wikidataId?: string;
}

export interface Club {
  id: string;              // '{iso2}-{slug}', e.g. 'nl-ajax'
  name: string;
  country: string;         // flagcdn-style code ('nl', 'gb-eng', ...), like UCLClub.flagCode
  city: string;
  competition: string;     // key of COMPETITIONS
  tier: number;            // professional level within the country (1, 2, ...)
  lat: number;             // stadium coordinates
  lng: number;
  stadium: { name: string; capacity: number | null };
  fdId: number | null;     // football-data.org team id; null ⇒ no fixtures
  crest: string | null;    // crest URL; null ⇒ generated initials badge
  /** Europese deelname dit seizoen (league phase), indien van toepassing. */
  uefa?: 'UCL' | 'UEL' | 'UECL';
  colors?: [string, string];
  wikidataId?: string;
}

export const UEFA_LABELS: Record<string, string> = {
  UCL: 'Champions League',
  UEL: 'Europa League',
  UECL: 'Conference League',
};

export interface CompetitionMeta {
  country: string;
  tier: number;
  label: string; // official competition name, not localized
}

export const COMPETITIONS: Record<string, CompetitionMeta> = {
  ED:  { country: 'nl',     tier: 1, label: 'Eredivisie' },
  KKD: { country: 'nl',     tier: 2, label: 'Keuken Kampioen Divisie' },
  PL:  { country: 'gb-eng', tier: 1, label: 'Premier League' },
  ELC: { country: 'gb-eng', tier: 2, label: 'Championship' },
  PD:  { country: 'es',     tier: 1, label: 'LaLiga' },
  SD:  { country: 'es',     tier: 2, label: 'LaLiga Hypermotion' },
  BL1: { country: 'de',     tier: 1, label: 'Bundesliga' },
  BL2: { country: 'de',     tier: 2, label: '2. Bundesliga' },
  SA:  { country: 'it',     tier: 1, label: 'Serie A' },
  SB:  { country: 'it',     tier: 2, label: 'Serie B' },
  FL1: { country: 'fr',     tier: 1, label: 'Ligue 1' },
  FL2: { country: 'fr',     tier: 2, label: 'Ligue 2' },
  AT1: { country: 'at',     tier: 1, label: 'Bundesliga (AT)' },
  BE1: { country: 'be',     tier: 1, label: 'Jupiler Pro League' },
  BG1: { country: 'bg',     tier: 1, label: 'efbet Liga' },
  HR1: { country: 'hr',     tier: 1, label: 'SuperSport HNL' },
  CZ1: { country: 'cz',     tier: 1, label: 'Chance Liga' },
  DK1: { country: 'dk',     tier: 1, label: 'Superliga' },
  GR1: { country: 'gr',     tier: 1, label: 'Super League 1' },
  IL1: { country: 'il',     tier: 1, label: "Ligat ha'Al" },
  NO1: { country: 'no',     tier: 1, label: 'Eliteserien' },
  PL1: { country: 'pl',     tier: 1, label: 'Ekstraklasa' },
  PPL: { country: 'pt',     tier: 1, label: 'Liga Portugal' },
  RO1: { country: 'ro',     tier: 1, label: 'SuperLiga' },
  RU1: { country: 'ru',     tier: 1, label: 'Premier Liga (RU)' },
  SC1: { country: 'gb-sct', tier: 1, label: 'Scottish Premiership' },
  RS1: { country: 'rs',     tier: 1, label: 'Super liga Srbije' },
  SE1: { country: 'se',     tier: 1, label: 'Allsvenskan' },
  CH1: { country: 'ch',     tier: 1, label: 'Super League (CH)' },
  TR1: { country: 'tr',     tier: 1, label: 'Super Lig' },
  UA1: { country: 'ua',     tier: 1, label: 'Premier Liga (UA)' },
  BSA: { country: 'br',     tier: 1, label: 'Brasileirão Série A' },
  ARP: { country: 'ar',     tier: 1, label: 'Liga Profesional (AR)' },
  LMX: { country: 'mx',     tier: 1, label: 'Liga MX' },
  MLS: { country: 'us',     tier: 1, label: 'Major League Soccer' },
};

interface Membership {
  season: string;
  clubs: string[];
}

export const register: ClubRecord[] = rawRegister as ClubRecord[];
export const MEMBERSHIPS: Record<string, Membership> = rawMemberships as Record<string, Membership>;

interface UefaData {
  season: string;
  UCL: string[];
  UEL: string[];
  UECL: string[];
}
export const UEFA_SEASON = (rawUefa as UefaData).season;

const registerById = new Map(register.map((c) => [c.id, c]));
const uefaById = new Map<string, Club['uefa']>();
for (const comp of ['UCL', 'UEL', 'UECL'] as const) {
  for (const id of (rawUefa as UefaData)[comp]) uefaById.set(id, comp);
}

// Join: alleen clubs met een actueel competitie-lidmaatschap verschijnen;
// registerrecords zonder lidmaatschap (bv. gedegradeerd uit ons bereik)
// blijven bewaard voor toekomstige seizoenen.
export const clubs: Club[] = Object.entries(MEMBERSHIPS).flatMap(([competition, membership]) =>
  membership.clubs.map((id) => {
    const record = registerById.get(id);
    if (!record) throw new Error(`membership ${competition} verwijst naar onbekend club-id ${id}`);
    const uefa = uefaById.get(id);
    return { ...record, competition, tier: COMPETITIONS[competition]?.tier ?? 1, ...(uefa ? { uefa } : {}) };
  }),
);

const byId = new Map(clubs.map((c) => [c.id, c]));

export function getClub(id: string): Club | undefined {
  return byId.get(id);
}

// Country display names. Intl.DisplayNames covers ISO codes; football uses
// a few non-ISO flag codes (home nations) that need explicit labels.
const NON_ISO_COUNTRY: Record<string, Record<string, string>> = {
  'gb-eng': { nl: 'Engeland', en: 'England', es: 'Inglaterra' },
  'gb-sct': { nl: 'Schotland', en: 'Scotland', es: 'Escocia' },
  'gb-wls': { nl: 'Wales', en: 'Wales', es: 'Gales' },
  'gb-nir': { nl: 'Noord-Ierland', en: 'Northern Ireland', es: 'Irlanda del Norte' },
};

export function countryName(code: string, locale: string): string {
  const special = NON_ISO_COUNTRY[code]?.[locale] ?? NON_ISO_COUNTRY[code]?.en;
  if (special) return special;
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}
