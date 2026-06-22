// Officieel speelschema van de WK 2026 knockout-fase.
// Bron: FIFA-speelschema (wedstrijdnummers #73 t/m #104).
//
// De sleutels zijn de interne bracket-match-id's uit src/lib/bracket.ts
// (r32-0..15, r16-0..7, kw-0..3, hf-0/1, finale). De wedstrijdnummers (`no`)
// zijn de officiële FIFA-nummers; `kickoff` staat in Nederlandse tijd
// (CEST = UTC+2) als ISO-string met offset, zodat we 'm naar elke tijdzone
// kunnen omrekenen. De 3e/4e-plaats-wedstrijd (#103) zit niet in de bracket.

export type CityKey =
  | 'LA' | 'HOU' | 'BOS' | 'MTY' | 'DAL' | 'NYNJ' | 'MEX' | 'ATL'
  | 'SF' | 'SEA' | 'TOR' | 'VAN' | 'MIA' | 'KC' | 'PHI';

export interface KnockoutScheduleEntry {
  /** Officieel FIFA-wedstrijdnummer (#73..#104). */
  no: number;
  /** Aftrap in Nederlandse tijd (CEST, UTC+2) als ISO-string met offset. */
  kickoff: string;
  /** Speelstad (sleutel naar CITY_NAMES). */
  city: CityKey;
}

// matchId → schedule. Zie src/lib/bracket.ts voor de afleiding van de id's.
export const KNOCKOUT_SCHEDULE: Record<string, KnockoutScheduleEntry> = {
  // ── Ronde van 32 (#73–#88) ──
  'r32-0':  { no: 73, kickoff: '2026-06-28T21:00:00+02:00', city: 'LA' },
  'r32-1':  { no: 75, kickoff: '2026-06-30T03:00:00+02:00', city: 'MTY' },
  'r32-2':  { no: 74, kickoff: '2026-06-29T22:30:00+02:00', city: 'BOS' },
  'r32-3':  { no: 77, kickoff: '2026-06-30T23:00:00+02:00', city: 'NYNJ' },
  'r32-4':  { no: 83, kickoff: '2026-07-03T01:00:00+02:00', city: 'TOR' },
  'r32-5':  { no: 84, kickoff: '2026-07-02T21:00:00+02:00', city: 'LA' },
  'r32-6':  { no: 81, kickoff: '2026-07-02T02:00:00+02:00', city: 'SEA' },
  'r32-7':  { no: 82, kickoff: '2026-07-01T22:00:00+02:00', city: 'SF' },
  'r32-8':  { no: 76, kickoff: '2026-06-29T19:00:00+02:00', city: 'HOU' },
  'r32-9':  { no: 78, kickoff: '2026-06-30T19:00:00+02:00', city: 'DAL' },
  'r32-10': { no: 79, kickoff: '2026-07-01T03:00:00+02:00', city: 'MEX' },
  'r32-11': { no: 80, kickoff: '2026-07-01T18:00:00+02:00', city: 'ATL' },
  'r32-12': { no: 86, kickoff: '2026-07-04T00:00:00+02:00', city: 'MIA' },
  'r32-13': { no: 88, kickoff: '2026-07-03T20:00:00+02:00', city: 'DAL' },
  'r32-14': { no: 85, kickoff: '2026-07-03T05:00:00+02:00', city: 'VAN' },
  'r32-15': { no: 87, kickoff: '2026-07-04T03:30:00+02:00', city: 'KC' },
  // ── Laatste 16 (#89–#96) ──
  'r16-0':  { no: 90, kickoff: '2026-07-04T19:00:00+02:00', city: 'HOU' },
  'r16-1':  { no: 89, kickoff: '2026-07-04T23:00:00+02:00', city: 'PHI' },
  'r16-2':  { no: 93, kickoff: '2026-07-06T21:00:00+02:00', city: 'DAL' },
  'r16-3':  { no: 94, kickoff: '2026-07-07T02:00:00+02:00', city: 'SEA' },
  'r16-4':  { no: 91, kickoff: '2026-07-05T22:00:00+02:00', city: 'NYNJ' },
  'r16-5':  { no: 92, kickoff: '2026-07-06T02:00:00+02:00', city: 'MEX' },
  'r16-6':  { no: 95, kickoff: '2026-07-07T18:00:00+02:00', city: 'ATL' },
  'r16-7':  { no: 96, kickoff: '2026-07-07T22:00:00+02:00', city: 'VAN' },
  // ── Kwartfinale (#97–#100) ──
  'kw-0':   { no: 97,  kickoff: '2026-07-09T22:00:00+02:00', city: 'BOS' },
  'kw-1':   { no: 98,  kickoff: '2026-07-10T21:00:00+02:00', city: 'LA' },
  'kw-2':   { no: 99,  kickoff: '2026-07-11T23:00:00+02:00', city: 'MIA' },
  'kw-3':   { no: 100, kickoff: '2026-07-12T03:00:00+02:00', city: 'KC' },
  // ── Halve finale (#101–#102) ──
  'hf-0':   { no: 101, kickoff: '2026-07-14T21:00:00+02:00', city: 'DAL' },
  'hf-1':   { no: 102, kickoff: '2026-07-15T21:00:00+02:00', city: 'ATL' },
  // ── Finale (#104) ──
  'finale': { no: 104, kickoff: '2026-07-19T21:00:00+02:00', city: 'NYNJ' },
};

/** Snelle opzoektabel matchId → FIFA-wedstrijdnummer. */
export const KNOCKOUT_MATCH_NO: Record<string, number> = Object.fromEntries(
  Object.entries(KNOCKOUT_SCHEDULE).map(([id, e]) => [id, e.no]),
);

// Speelsteden, gelokaliseerd. Namen die in alle talen gelijk zijn herhalen we
// bewust zodat de lookup uniform blijft.
export const CITY_NAMES: Record<CityKey, { nl: string; en: string; es: string }> = {
  LA:   { nl: 'Los Angeles',          en: 'Los Angeles',          es: 'Los Ángeles' },
  HOU:  { nl: 'Houston',              en: 'Houston',              es: 'Houston' },
  BOS:  { nl: 'Boston',               en: 'Boston',               es: 'Boston' },
  MTY:  { nl: 'Monterrey',            en: 'Monterrey',            es: 'Monterrey' },
  DAL:  { nl: 'Dallas',               en: 'Dallas',               es: 'Dallas' },
  NYNJ: { nl: 'New York/New Jersey',  en: 'New York/New Jersey',  es: 'Nueva York/Nueva Jersey' },
  MEX:  { nl: 'Mexico-Stad',          en: 'Mexico City',          es: 'Ciudad de México' },
  ATL:  { nl: 'Atlanta',              en: 'Atlanta',              es: 'Atlanta' },
  SF:   { nl: 'San Francisco',        en: 'San Francisco',        es: 'San Francisco' },
  SEA:  { nl: 'Seattle',              en: 'Seattle',              es: 'Seattle' },
  TOR:  { nl: 'Toronto',              en: 'Toronto',              es: 'Toronto' },
  VAN:  { nl: 'Vancouver',            en: 'Vancouver',            es: 'Vancouver' },
  MIA:  { nl: 'Miami',                en: 'Miami',                es: 'Miami' },
  KC:   { nl: 'Kansas City',          en: 'Kansas City',          es: 'Kansas City' },
  PHI:  { nl: 'Philadelphia',         en: 'Philadelphia',         es: 'Filadelfia' },
};

export function getCityName(city: CityKey, lang: string): string {
  const c = CITY_NAMES[city];
  if (!c) return city;
  if (lang === 'en') return c.en;
  if (lang === 'es') return c.es;
  return c.nl;
}

export interface TimezoneOption {
  /** IANA-tijdzone-id. */
  id: string;
  nl: string;
  en: string;
  es: string;
}

/** Standaard: Nederlandse tijd (zomertijd = CEST). */
export const DEFAULT_TZ = 'Europe/Amsterdam';

export const TIMEZONES: TimezoneOption[] = [
  { id: 'Europe/Amsterdam',    nl: 'Nederland (CEST)',     en: 'Netherlands (CEST)',  es: 'Países Bajos (CEST)' },
  { id: 'Europe/London',       nl: 'VK (BST)',             en: 'UK (BST)',            es: 'RU (BST)' },
  { id: 'America/New_York',    nl: 'New York (ET)',        en: 'New York (ET)',       es: 'Nueva York (ET)' },
  { id: 'America/Chicago',     nl: 'Chicago (CT)',         en: 'Chicago (CT)',        es: 'Chicago (CT)' },
  { id: 'America/Denver',      nl: 'Denver (MT)',          en: 'Denver (MT)',         es: 'Denver (MT)' },
  { id: 'America/Los_Angeles', nl: 'Los Angeles (PT)',     en: 'Los Angeles (PT)',    es: 'Los Ángeles (PT)' },
  { id: 'America/Mexico_City', nl: 'Mexico-Stad (CT)',     en: 'Mexico City (CT)',    es: 'Ciudad de México (CT)' },
];

export function getTimezoneLabel(tz: TimezoneOption, lang: string): string {
  if (lang === 'en') return tz.en;
  if (lang === 'es') return tz.es;
  return tz.nl;
}

const LOCALE_TAGS: Record<string, string> = { nl: 'nl-NL', en: 'en-GB', es: 'es-ES' };

/**
 * Formatteer een aftrap-instant naar de gekozen tijdzone en taal.
 * Geeft losse datum- en tijd-strings terug (24-uurs, zoals het FIFA-schema).
 */
export function formatKickoff(
  iso: string,
  timeZone: string,
  lang: string,
): { date: string; time: string } {
  const d = new Date(iso);
  const locale = LOCALE_TAGS[lang] ?? 'nl-NL';
  const date = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone }).format(d);
  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone }).format(d);
  return { date, time };
}
