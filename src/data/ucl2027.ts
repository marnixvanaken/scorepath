export interface UCLClub {
  id: string;
  name: string;
  nameEn: string;
  flagCode: string; // ISO 3166-1 alpha-2 voor flagcdn.com (bijv. 'nl', 'gb-eng', 'xk')
  eci: number;      // Euro Club Index score (referentie)
  uefaCC: number;   // UEFA club coefficient — bepaalt de seeding in elke kwalificatieronde
}

export interface UCLTie {
  id: string;
  home: UCLClub;  // eerste getrokken = thuisspeler heenwedstrijd
  away: UCLClub;
  firstLeg?: string;   // datumlabel heenwedstrijd (alleen bij vaste loting)
  secondLeg?: string;  // datumlabel terugwedstrijd (alleen bij vaste loting)
}

export type UCLPath = 'champions' | 'league';

// Politieke restricties: paren van ISO-landcodes die nooit tegen elkaar mogen
// Bron: UEFA Executive Committee besluit, bevestigd CAS 15 juli 2022
export const POLITICAL_RESTRICTIONS: [string, string][] = [
  ['am', 'az'],      // Armenië – Azerbeidzjan
  ['gi', 'es'],      // Gibraltar – Spanje
  ['xk', 'ba'],      // Kosovo – Bosnië-Herzegovina
  ['xk', 'rs'],      // Kosovo – Servië
  ['ua', 'ru'],      // Oekraïne – Rusland (Rusland geschorst)
  ['ua', 'by'],      // Oekraïne – Wit-Rusland
];

export function hasRestriction(a: UCLClub, b: UCLClub): boolean {
  return POLITICAL_RESTRICTIONS.some(
    ([x, y]) =>
      (a.flagCode === x && b.flagCode === y) ||
      (a.flagCode === y && b.flagCode === x)
  );
}

// ─── Q1 2026/27 (Champions Path) ─────────────────────────────────────────────
// Coëfficiënten = 2026 UEFA club coefficients (seeding-bron).
// Bron: wikipedia.org/wiki/2026–27_UEFA_Champions_League_qualifying

export const Q1_SEEDED: UCLClub[] = [
  { id: 'SHR', name: 'Shamrock Rovers',      nameEn: 'Shamrock Rovers',      flagCode: 'ie',     eci: 1484, uefaCC: 19.375 },
  { id: 'KUP', name: 'KuPS',                 nameEn: 'KuPS Kuopio',          flagCode: 'fi',     eci: 1560, uefaCC: 14.000 },
  { id: 'DRI', name: 'Drita',                nameEn: 'FC Drita',             flagCode: 'xk',     eci: 1093, uefaCC: 13.625 },
  { id: 'LIN', name: 'Lincoln Red Imps',     nameEn: 'Lincoln Red Imps',     flagCode: 'gi',     eci: 912,  uefaCC: 13.500 },
  { id: 'BOR', name: 'Borac Banja Luka',     nameEn: 'Borac Banja Luka',     flagCode: 'ba',     eci: 1875, uefaCC: 13.125 },
  { id: 'VIK', name: 'Víkingur Reykjavík',   nameEn: 'Víkingur Reykjavík',   flagCode: 'is',     eci: 1522, uefaCC: 11.750 },
  { id: 'KAI', name: 'Kairat',               nameEn: 'FC Kairat',            flagCode: 'kz',     eci: 1758, uefaCC: 11.000 },
  { id: 'UNI', name: 'Univ. Craiova',        nameEn: 'Universitatea Craiova',flagCode: 'ro',     eci: 2161, uefaCC: 10.500 },
  { id: 'RIG', name: 'Riga FC',              nameEn: 'Riga FC',              flagCode: 'lv',     eci: 1344, uefaCC: 10.500 },
  { id: 'KI',  name: 'KÍ',                   nameEn: 'KÍ Klaksvík',          flagCode: 'fo',     eci: 1218, uefaCC: 10.500 },
  { id: 'FLO', name: 'Flora',                nameEn: 'FC Flora Tallinn',     flagCode: 'ee',     eci: 912,  uefaCC: 10.000 },
  { id: 'LAR', name: 'Larne',                nameEn: 'Larne FC',             flagCode: 'gb-nir', eci: 933,  uefaCC: 9.000  },
  { id: 'PET', name: 'Petrocub',             nameEn: 'Petrocub Hîncești',    flagCode: 'md',     eci: 1410, uefaCC: 9.000  },
  { id: 'TNS', name: 'The New Saints',       nameEn: 'The New Saints',       flagCode: 'gb-wls', eci: 995,  uefaCC: 9.000  },
];

export const Q1_UNSEEDED: UCLClub[] = [
  { id: 'ESC', name: 'Inter d\'Escaldes',    nameEn: 'Inter Club d\'Escaldes',flagCode: 'ad',    eci: 637,  uefaCC: 7.500  },
  { id: 'LEV', name: 'Levski Sofia',         nameEn: 'Levski Sofia',          flagCode: 'bg',    eci: 2016, uefaCC: 7.000  },
  { id: 'ARR', name: 'Ararat-Armenia',       nameEn: 'FC Ararat-Armenia',     flagCode: 'am',    eci: 1402, uefaCC: 7.000  },
  { id: 'SAB', name: 'Sabah FK',             nameEn: 'Sabah FK',              flagCode: 'az',    eci: 1787, uefaCC: 6.000  },
  { id: 'KZG', name: 'Kauno Žalgiris',       nameEn: 'Kauno Žalgiris',        flagCode: 'lt',    eci: 1113, uefaCC: 6.000  },
  { id: 'SUT', name: 'Sutjeska',             nameEn: 'FK Sutjeska',           flagCode: 'me',    eci: 1094, uefaCC: 6.000  },
  { id: 'ETO', name: 'ETO Győr',             nameEn: 'ETO Győr',              flagCode: 'hu',    eci: 1881, uefaCC: 5.437  },
  { id: 'IBM', name: 'Iberia 1999',          nameEn: 'FC Iberia 1999',        flagCode: 'ge',    eci: 1342, uefaCC: 5.000  },
  { id: 'EGN', name: 'Egnatia',              nameEn: 'KF Egnatia',            flagCode: 'al',    eci: 1122, uefaCC: 4.500  },
  { id: 'FLR', name: 'Floriana',             nameEn: 'Floriana FC',           flagCode: 'mt',    eci: 1057, uefaCC: 4.000  },
  { id: 'TRE', name: 'Tre Fiori',            nameEn: 'Tre Fiori',             flagCode: 'sm',    eci: 264,  uefaCC: 2.500  },
  { id: 'VAR', name: 'Vardar',               nameEn: 'FK Vardar',             flagCode: 'mk',    eci: 1099, uefaCC: 1.551  },
  { id: 'MLV', name: 'ML Vitebsk',           nameEn: 'FC ML Vitebsk',         flagCode: 'by',    eci: 1296, uefaCC: 1.325  },
  { id: 'ATB', name: 'Atert Bissen',         nameEn: 'Atert Bissen',          flagCode: 'lu',    eci: 400,  uefaCC: 1.325  },
];

export const Q1_ALL: UCLClub[] = [...Q1_SEEDED, ...Q1_UNSEEDED];

// ─── Directe instappers per ronde ────────────────────────────────────────────
// Let op unieke ID's: Celje (CLJ) ≠ Celtic (CEL); Víkingur (VIK) ≠ Viking FK (VFK).

// Q2 Champions Path — 10 directe instappers (samen met 14 Q1-winnaars = 24)
export const Q2_CP_DIRECT: UCLClub[] = [
  { id: 'RSB', name: 'Rode Ster Belgrado',   nameEn: 'Red Star Belgrade',    flagCode: 'rs', eci: 2347, uefaCC: 46.500 },
  { id: 'DZG', name: 'Dinamo Zagreb',        nameEn: 'Dinamo Zagreb',        flagCode: 'hr', eci: 2435, uefaCC: 46.500 },
  { id: 'SLO', name: 'Slovan Bratislava',    nameEn: 'Slovan Bratislava',    flagCode: 'sk', eci: 1936, uefaCC: 36.000 },
  { id: 'LEP', name: 'Lech Poznań',          nameEn: 'Lech Poznań',          flagCode: 'pl', eci: 2243, uefaCC: 27.250 },
  { id: 'CLJ', name: 'Celje',                nameEn: 'NK Celje',             flagCode: 'si', eci: 1926, uefaCC: 23.000 },
  { id: 'OMO', name: 'Omonia Nicosia',       nameEn: 'Omonia Nicosia',       flagCode: 'cy', eci: 2381, uefaCC: 21.250 },
  { id: 'HBS', name: 'Hapoel Be\'er Sheva',  nameEn: 'Hapoel Be\'er Sheva',  flagCode: 'il', eci: 2220, uefaCC: 14.000 },
  { id: 'AGF', name: 'AGF',                  nameEn: 'AGF Aarhus',           flagCode: 'dk', eci: 2297, uefaCC: 8.421  },
  { id: 'THU', name: 'Thun',                 nameEn: 'FC Thun',              flagCode: 'ch', eci: 1939, uefaCC: 6.940  },
  { id: 'MJA', name: 'Mjällby',              nameEn: 'Mjällby AIF',          flagCode: 'se', eci: 2043, uefaCC: 5.925  },
];

// Q2 League Path — 4 directe instappers
export const Q2_LP_DIRECT: UCLClub[] = [
  { id: 'FEN', name: 'Fenerbahçe',           nameEn: 'Fenerbahçe',           flagCode: 'tr',     eci: 2812, uefaCC: 57.750 },
  { id: 'STG', name: 'Sturm Graz',           nameEn: 'Sturm Graz',           flagCode: 'at',     eci: 2124, uefaCC: 28.000 },
  { id: 'HOM', name: 'Hearts',               nameEn: 'Heart of Midlothian',  flagCode: 'gb-sct', eci: 1993, uefaCC: 11.500 },
  { id: 'GOR', name: 'Górnik Zabrze',        nameEn: 'Górnik Zabrze',        flagCode: 'pl',     eci: 2003, uefaCC: 9.350  },
];

// Q3 League Path — 6 directe instappers (samen met 2 Q2-LP-winnaars = 8)
export const Q3_LP_DIRECT: UCLClub[] = [
  { id: 'LYO', name: 'Olympique Lyon',       nameEn: 'Olympique Lyonnais',   flagCode: 'fr', eci: 3077, uefaCC: 65.750 },
  { id: 'BOG', name: 'Bodø/Glimt',           nameEn: 'FK Bodø/Glimt',        flagCode: 'no', eci: 2727, uefaCC: 64.000 },
  { id: 'OLY', name: 'Olympiakos',           nameEn: 'Olympiacos',           flagCode: 'gr', eci: 2830, uefaCC: 62.250 },
  { id: 'USG', name: 'Union SG',             nameEn: 'Union Saint-Gilloise', flagCode: 'be', eci: 2968, uefaCC: 48.000 },
  { id: 'SPA', name: 'Sparta Praag',         nameEn: 'Sparta Prague',        flagCode: 'cz', eci: 2465, uefaCC: 38.250 },
  { id: 'NEC', name: 'NEC',                  nameEn: 'NEC Nijmegen',         flagCode: 'nl', eci: 2228, uefaCC: 13.585 },
];

// Play-off Champions Path — 4 directe instappers (samen met 6 Q3-CP-winnaars = 10)
export const PO_CP_DIRECT: UCLClub[] = [
  { id: 'CEL', name: 'Celtic',               nameEn: 'Celtic',               flagCode: 'gb-sct', eci: 2512, uefaCC: 44.000 },
  { id: 'AEK', name: 'AEK Athene',           nameEn: 'AEK Athens',           flagCode: 'gr',     eci: 2636, uefaCC: 24.000 },
  { id: 'LAS', name: 'LASK',                 nameEn: 'LASK',                 flagCode: 'at',     eci: 2017, uefaCC: 21.000 },
  { id: 'VFK', name: 'Viking FK',            nameEn: 'Viking FK',            flagCode: 'no',     eci: 2322, uefaCC: 8.247  },
];

// ─── Loting-engine ───────────────────────────────────────────────────────────

// Fisher-Yates shuffle
export function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Verdeelt een pool in geseed (sterkste helft) en ongeseed op basis van UEFA-coëfficiënt.
// Bij oneven aantal komt de extra club in de geseede helft.
export function seedPool(clubs: UCLClub[]): { seeded: UCLClub[]; unseeded: UCLClub[] } {
  const sorted = [...clubs].sort((a, b) => b.uefaCC - a.uefaCC);
  const half = Math.ceil(sorted.length / 2);
  return { seeded: sorted.slice(0, half), unseeded: sorted.slice(half) };
}

// Koppelt elke geseede club aan een ongeseede tegenstander zonder politieke restrictie.
// Restrictie-bewuste backtracking: vindt gegarandeerd een geldige toewijzing als die bestaat.
function assignPairs(seeded: UCLClub[], unseeded: UCLClub[]): [UCLClub, UCLClub][] | null {
  const s = shuffled(seeded);
  const u = shuffled(unseeded);
  const used = new Array(u.length).fill(false);
  const opp: UCLClub[] = new Array(s.length);

  const backtrack = (i: number): boolean => {
    if (i === s.length) return true;
    for (let j = 0; j < u.length; j++) {
      if (!used[j] && !hasRestriction(s[i], u[j])) {
        used[j] = true;
        opp[i] = u[j];
        if (backtrack(i + 1)) return true;
        used[j] = false;
      }
    }
    return false;
  };

  return backtrack(0) ? s.map((club, i) => [club, opp[i]]) : null;
}

// Loting van een ronde: geseed vs ongeseed, restricties gerespecteerd.
// idPrefix maakt de duel-id's uniek per ronde (bijv. 'q2-cp').
export function drawTies(seeded: UCLClub[], unseeded: UCLClub[], idPrefix: string): UCLTie[] {
  const pairs = assignPairs(seeded, unseeded);
  const toTie = (a: UCLClub, b: UCLClub, i: number): UCLTie => {
    const aIsHome = Math.random() > 0.5;
    return { id: `${idPrefix}-${i}`, home: aIsHome ? a : b, away: aIsHome ? b : a };
  };

  if (pairs) return pairs.map(([a, b], i) => toTie(a, b, i));

  // Fallback: geen geldige restrictie-vrije toewijzing gevonden (mag niet voorkomen
  // met de huidige data) — koppel willekeurig zonder restrictiecheck.
  const s = shuffled(seeded);
  const u = shuffled(unseeded);
  return s.map((club, i) => toTie(club, u[i], i));
}

// ─── Rondestructuur ──────────────────────────────────────────────────────────
// Bron: 2026–27 UEFA Champions League qualifying (Wikipedia).
// Pool van een ronde = directe instappers + winnaars van feedsFrom.

export interface RoundDef {
  id: string;
  stage: 'Q1' | 'Q2' | 'Q3' | 'PO';
  path: UCLPath;
  titleNl: string;
  direct: UCLClub[];
  feedsFrom?: string;
  winnersLabel: string; // korte omschrijving van waar de winnaars heen gaan
}

export const ROUNDS: RoundDef[] = [
  { id: 'q1',    stage: 'Q1', path: 'champions', titleNl: 'Eerste kwalificatieronde', direct: Q1_ALL,        winnersLabel: '14 clubs gaan door naar Q2' },
  { id: 'q2-cp', stage: 'Q2', path: 'champions', titleNl: 'Champions Path',           direct: Q2_CP_DIRECT,  feedsFrom: 'q1',    winnersLabel: '12 clubs gaan door naar Q3' },
  { id: 'q2-lp', stage: 'Q2', path: 'league',    titleNl: 'League Path',              direct: Q2_LP_DIRECT,  winnersLabel: '2 clubs gaan door naar Q3' },
  { id: 'q3-cp', stage: 'Q3', path: 'champions', titleNl: 'Champions Path',           direct: [],            feedsFrom: 'q2-cp', winnersLabel: '6 clubs gaan door naar de play-off' },
  { id: 'q3-lp', stage: 'Q3', path: 'league',    titleNl: 'League Path',              direct: Q3_LP_DIRECT,  feedsFrom: 'q2-lp', winnersLabel: '4 clubs gaan door naar de play-off' },
  { id: 'po-cp', stage: 'PO', path: 'champions', titleNl: 'Champions Path',           direct: PO_CP_DIRECT,  feedsFrom: 'q3-cp', winnersLabel: '5 clubs naar de league phase' },
  { id: 'po-lp', stage: 'PO', path: 'league',    titleNl: 'League Path',              direct: [],            feedsFrom: 'q3-lp', winnersLabel: '2 clubs naar de league phase' },
];

export type StageKey = 'Q1' | 'Q2' | 'Q3' | 'PO' | 'LP';

// roundIds leeg voor LP: de league phase is geen geseed-vs-ongeseed-loting maar
// een aparte fase (zie src/lib/uclLeague.ts) en wordt apart in de UI afgehandeld.
export const STAGES: { key: StageKey; label: string; roundIds: string[] }[] = [
  { key: 'Q1', label: 'Q1',           roundIds: ['q1'] },
  { key: 'Q2', label: 'Q2',           roundIds: ['q2-cp', 'q2-lp'] },
  { key: 'Q3', label: 'Q3',           roundIds: ['q3-cp', 'q3-lp'] },
  { key: 'PO', label: 'Play-off',     roundIds: ['po-cp', 'po-lp'] },
  { key: 'LP', label: 'League phase',  roundIds: [] },
];

export const ROUND_BY_ID: Record<string, RoundDef> = Object.fromEntries(
  ROUNDS.map((r) => [r.id, r])
);

// ─── Wedstrijdsimulatie op ECI ───────────────────────────────────────────────
// Seeding loopt op uefaCC, maar de voorspelde uitkomst van een duel loopt op ECI
// (betere sterktemaat). S = schaal: groter ⇒ minder vaak verrassingen.

const ECI_SCALE = 350;

export function winProbECI(a: UCLClub, b: UCLClub): number {
  return 1 / (1 + Math.pow(10, (b.eci - a.eci) / ECI_SCALE));
}

// Kiest een winnaar van een tweeluik op basis van ECI-kans.
export function simulateTie(tie: UCLTie): UCLClub {
  return Math.random() < winProbECI(tie.home, tie.away) ? tie.home : tie.away;
}

// Poisson-trekking (Knuth) voor een doelpuntenaantal.
function poisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

const HOME_ADV = 60; // ECI-punten thuisvoordeel

// Simuleert een league-phase-wedstrijd → [thuisdoelpunten, uitdoelpunten].
// Verwachte doelpunten schalen met het ECI-verschil; thuisploeg krijgt voordeel.
export function simulateMatch(home: UCLClub, away: UCLClub): [number, number] {
  const diff = home.eci + HOME_ADV - away.eci;
  const base = 1.35;
  const clamp = (x: number) => Math.min(4.5, Math.max(0.15, x));
  const lh = clamp(base * Math.pow(10, diff / 600));
  const la = clamp(base * Math.pow(10, -diff / 600));
  return [poisson(lh), poisson(la)];
}

// ─── League phase — clubs & potten ───────────────────────────────────────────
// 36 clubs in 4 potten van 9. 29 directe deelnemers (hieronder) + 7 play-off-
// winnaars (5 Champions Path + 2 League Path) die de "Pot 3/4"-groep aanvullen.
// Coëfficiënten door gebruiker aangeleverd; ECI uit tournaments/ucl-2027.md.
// flagCode dient tevens als bondscode voor de landenrestrictie.

export const LP_POT1: UCLClub[] = [
  { id: 'BAY', name: 'Bayern München',       nameEn: 'Bayern Munich',        flagCode: 'de',     eci: 4249, uefaCC: 147.500 },
  { id: 'RMA', name: 'Real Madrid',          nameEn: 'Real Madrid',          flagCode: 'es',     eci: 4032, uefaCC: 144.500 },
  { id: 'PSG', name: 'Paris Saint-Germain',  nameEn: 'Paris Saint-Germain',  flagCode: 'fr',     eci: 4108, uefaCC: 132.000 },
  { id: 'LIV', name: 'Liverpool',            nameEn: 'Liverpool',            flagCode: 'gb-eng', eci: 3795, uefaCC: 130.000 },
  { id: 'INT', name: 'Inter',                nameEn: 'Inter Milan',          flagCode: 'it',     eci: 3742, uefaCC: 127.000 },
  { id: 'MCI', name: 'Manchester City',      nameEn: 'Manchester City',      flagCode: 'gb-eng', eci: 4219, uefaCC: 125.500 },
  { id: 'ARS', name: 'Arsenal',              nameEn: 'Arsenal',              flagCode: 'gb-eng', eci: 4332, uefaCC: 119.000 },
  { id: 'BAR', name: 'Barcelona',            nameEn: 'Barcelona',            flagCode: 'es',     eci: 4132, uefaCC: 113.250 },
  { id: 'ATM', name: 'Atlético Madrid',      nameEn: 'Atlético Madrid',      flagCode: 'es',     eci: 3576, uefaCC: 104.750 },
];

export const LP_POT2: UCLClub[] = [
  { id: 'BVB', name: 'Borussia Dortmund',    nameEn: 'Borussia Dortmund',    flagCode: 'de',     eci: 3497, uefaCC: 100.750 },
  { id: 'ROM', name: 'AS Roma',              nameEn: 'Roma',                 flagCode: 'it',     eci: 3233, uefaCC: 97.750  },
  { id: 'SCP', name: 'Sporting CP',          nameEn: 'Sporting CP',          flagCode: 'pt',     eci: 3356, uefaCC: 84.000  },
  { id: 'AVL', name: 'Aston Villa',          nameEn: 'Aston Villa',          flagCode: 'gb-eng', eci: 3777, uefaCC: 83.000  },
  { id: 'POR', name: 'FC Porto',             nameEn: 'Porto',                flagCode: 'pt',     eci: 3190, uefaCC: 80.750  },
  { id: 'MUN', name: 'Manchester United',    nameEn: 'Manchester United',    flagCode: 'gb-eng', eci: 3682, uefaCC: 76.500  },
  { id: 'BRU', name: 'Club Brugge',          nameEn: 'Club Brugge',          flagCode: 'be',     eci: 3055, uefaCC: 75.250  },
  { id: 'BET', name: 'Real Betis',           nameEn: 'Real Betis',           flagCode: 'es',     eci: 3116, uefaCC: 74.500  },
  { id: 'PSV', name: 'PSV',                  nameEn: 'PSV Eindhoven',        flagCode: 'nl',     eci: 3090, uefaCC: 71.250  },
];

// Pot 3 — 7 vaste clubs (de overige 2 plekken komen uit de 3/4-groep)
export const LP_POT3_FIXED: UCLClub[] = [
  { id: 'FEY', name: 'Feyenoord',            nameEn: 'Feyenoord',            flagCode: 'nl',     eci: 2592, uefaCC: 71.000  },
  { id: 'LIL', name: 'Lille',                nameEn: 'Lille',                flagCode: 'fr',     eci: 3084, uefaCC: 68.750  },
  { id: 'NAP', name: 'Napoli',               nameEn: 'Napoli',               flagCode: 'it',     eci: 3321, uefaCC: 63.000  },
  { id: 'RBL', name: 'RB Leipzig',           nameEn: 'RB Leipzig',           flagCode: 'de',     eci: 3247, uefaCC: 61.000  },
  { id: 'VIL', name: 'Villarreal',           nameEn: 'Villarreal',           flagCode: 'es',     eci: 3139, uefaCC: 59.000  },
  { id: 'SHA', name: 'Shakhtar Donetsk',     nameEn: 'Shakhtar Donetsk',     flagCode: 'ua',     eci: 2591, uefaCC: 56.250  },
  { id: 'GAL', name: 'Galatasaray',          nameEn: 'Galatasaray',          flagCode: 'tr',     eci: 2899, uefaCC: 53.500  },
];

// "Pot 3/4"-groep — vaste clubs; samen met de 7 PO-winnaars 9 clubs.
// Top 2 op uefaCC vullen Pot 3, de onderste 7 vullen Pot 4.
export const LP_POT34_FIXED: UCLClub[] = [
  { id: 'SLA', name: 'Slavia Praag',         nameEn: 'Slavia Prague',        flagCode: 'cz',     eci: 2754, uefaCC: 44.000  },
  { id: 'STU', name: 'VfB Stuttgart',        nameEn: 'VfB Stuttgart',        flagCode: 'de',     eci: 3153, uefaCC: 27.500  },
];

// Pot 4 — 2 vaste clubs (de overige 7 plekken komen uit de 3/4-groep)
export const LP_POT4_FIXED: UCLClub[] = [
  { id: 'COM', name: 'Como',                 nameEn: 'Como',                 flagCode: 'it',     eci: 2764, uefaCC: 19.989  },
  { id: 'LEN', name: 'Lens',                 nameEn: 'Lens',                 flagCode: 'fr',     eci: 3114, uefaCC: 16.699  },
];

export interface PottedClub {
  club: UCLClub;
  pot: number; // 1..4
}

// Maakt de definitieve 36-club potindeling. poWinners = 7 play-off-winnaars
// (5 Champions Path + 2 League Path); zij vullen samen met de vaste 3/4-clubs
// de resterende plekken in Pot 3 (top 2 op coëfficiënt) en Pot 4 (onderste 7).
export function finalizeLeaguePots(poWinners: UCLClub[]): PottedClub[] {
  const group = [...LP_POT34_FIXED, ...poWinners].sort((a, b) => b.uefaCC - a.uefaCC);
  const toPot3 = group.slice(0, 2);
  const toPot4 = group.slice(2);
  return [
    ...LP_POT1.map((club) => ({ club, pot: 1 })),
    ...LP_POT2.map((club) => ({ club, pot: 2 })),
    ...LP_POT3_FIXED.map((club) => ({ club, pot: 3 })),
    ...toPot3.map((club) => ({ club, pot: 3 })),
    ...LP_POT4_FIXED.map((club) => ({ club, pot: 4 })),
    ...toPot4.map((club) => ({ club, pot: 4 })),
  ];
}

// ─── Club → instapronde ──────────────────────────────────────────────────────
// Welke stage een gekozen club instapt (fan kiest club aan de voorkant).
// Q1-clubs starten in Q1, NEC in Q3, PSG in de league phase, enz.

const ENTRY_STAGE_BY_ID: Record<string, StageKey> = (() => {
  const map: Record<string, StageKey> = {};
  // Kwalificatie: directe instappers bepalen de instapronde van die ronde.
  for (const def of ROUNDS) {
    for (const club of def.direct) map[club.id] = def.stage;
  }
  // League phase: 29 directe deelnemers.
  for (const club of [
    ...LP_POT1, ...LP_POT2, ...LP_POT3_FIXED, ...LP_POT34_FIXED, ...LP_POT4_FIXED,
  ]) {
    map[club.id] = 'LP';
  }
  return map;
})();

export interface SelectableClub {
  club: UCLClub;
  entry: StageKey;
}

// Alle clubs die een fan kan kiezen, gegroepeerd per instapronde (voor de selector).
export const SELECTABLE_BY_STAGE: { key: StageKey; label: string; clubs: UCLClub[] }[] = [
  { key: 'Q1', label: 'Q1', clubs: Q1_ALL },
  { key: 'Q2', label: 'Q2', clubs: [...Q2_CP_DIRECT, ...Q2_LP_DIRECT] },
  { key: 'Q3', label: 'Q3', clubs: Q3_LP_DIRECT },
  { key: 'PO', label: 'Play-off', clubs: PO_CP_DIRECT },
  { key: 'LP', label: 'League phase', clubs: [...LP_POT1, ...LP_POT2, ...LP_POT3_FIXED, ...LP_POT34_FIXED, ...LP_POT4_FIXED] },
];

export function entryStageOf(clubId: string): StageKey {
  return ENTRY_STAGE_BY_ID[clubId] ?? 'Q1';
}

// ─── Europacup I / Champions League-titels ───────────────────────────────────
// Aantal gewonnen Europacup I / Champions League-finales (stand na seizoen 2025/26).
// PSG won 2024/25 én 2025/26 → 2. Alleen clubs met ≥1 titel; overige clubs = 0.
export const EUROPEAN_CUP_TITLES: Record<string, number> = {
  RMA: 15, BAY: 6, LIV: 6, BAR: 5, INT: 3, MUN: 3, PSG: 2, POR: 2,
  MCI: 1, BVB: 1, PSV: 1, FEY: 1, AVL: 1, CEL: 1, RSB: 1,
};

export function titlesOf(clubId: string): number {
  return EUROPEAN_CUP_TITLES[clubId] ?? 0;
}

// Alle clubs in het toernooi (kwalificatie + league phase), uniek op id.
export const ALL_CLUBS: UCLClub[] = (() => {
  const seen = new Map<string, UCLClub>();
  for (const c of [
    ...Q1_ALL, ...Q2_CP_DIRECT, ...Q2_LP_DIRECT, ...Q3_LP_DIRECT, ...PO_CP_DIRECT,
    ...LP_POT1, ...LP_POT2, ...LP_POT3_FIXED, ...LP_POT34_FIXED, ...LP_POT4_FIXED,
  ]) {
    if (!seen.has(c.id)) seen.set(c.id, c);
  }
  return [...seen.values()];
})();

const CLUB_BY_ID: Record<string, UCLClub> = Object.fromEntries(ALL_CLUBS.map((c) => [c.id, c]));

export function clubById(id: string): UCLClub | undefined {
  return CLUB_BY_ID[id];
}

// ─── Vaste loting (reeds verrichte trekkingen) ───────────────────────────────
// Q1: geloot 16 juni 2026 — alle duels met concrete clubs.
// Q2: geloot 17 juni 2026 — bracket waarin slots verwijzen naar Q1-winnaars.
// Een slot is óf een directe instapper ({ club }) óf de winnaar van een eerder
// duel ({ winner: tieId }). "Winner of match N" uit de UEFA-tabel = Q1-duel N,
// in deze code 0-geïndexeerd als 'q1-(N-1)'.

export type TieSlot = { club: string } | { winner: string };

export interface FixedTie {
  id: string;
  home: TieSlot;   // Team 1 in de UEFA-tabel = thuis in de heenwedstrijd
  away: TieSlot;
  firstLeg: string;
  secondLeg: string;
}

// Datum van de loting per ronde (voor het "officiële loting"-label in de UI).
export const FIXED_DRAW_DATE: Record<string, string> = {
  q1: '16 juni 2026',
  'q2-cp': '17 juni 2026',
  'q2-lp': '17 juni 2026',
};

export const FIXED_TIES: Record<string, FixedTie[]> = {
  // Q1 — 14 duels, geloot 16 juni 2026.
  q1: [
    { id: 'q1-0',  home: { club: 'SAB' }, away: { club: 'TNS' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-1',  home: { club: 'FLR' }, away: { club: 'SHR' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-2',  home: { club: 'FLO' }, away: { club: 'IBM' }, firstLeg: '8 jul',  secondLeg: '14 jul' },
    { id: 'q1-3',  home: { club: 'LIN' }, away: { club: 'ESC' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-4',  home: { club: 'TRE' }, away: { club: 'LAR' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-5',  home: { club: 'ARR' }, away: { club: 'RIG' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-6',  home: { club: 'VAR' }, away: { club: 'KUP' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-7',  home: { club: 'KZG' }, away: { club: 'DRI' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-8',  home: { club: 'MLV' }, away: { club: 'UNI' }, firstLeg: '8 jul',  secondLeg: '15 jul' },
    { id: 'q1-9',  home: { club: 'PET' }, away: { club: 'EGN' }, firstLeg: '8 jul',  secondLeg: '15 jul' },
    { id: 'q1-10', home: { club: 'BOR' }, away: { club: 'LEV' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-11', home: { club: 'VIK' }, away: { club: 'ETO' }, firstLeg: '7 jul',  secondLeg: '14 jul' },
    { id: 'q1-12', home: { club: 'KAI' }, away: { club: 'SUT' }, firstLeg: '8 jul',  secondLeg: '15 jul' },
    { id: 'q1-13', home: { club: 'KI'  }, away: { club: 'ATB' }, firstLeg: '7 jul',  secondLeg: '15 jul' },
  ],

  // Q2 Champions Path — 12 duels, geloot 17 juni 2026.
  // 10 directe instappers + 14 Q1-winnaars.
  'q2-cp': [
    { id: 'q2-cp-0',  home: { club: 'MJA' },       away: { winner: 'q1-3' },  firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-1',  home: { winner: 'q1-4' },    away: { club: 'RSB' },     firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-2',  home: { winner: 'q1-0' },    away: { winner: 'q1-6' },  firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-3',  home: { winner: 'q1-13' },   away: { winner: 'q1-7' },  firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-4',  home: { club: 'AGF' },       away: { club: 'LEP' },     firstLeg: '21 jul',    secondLeg: '28/29 jul' },
    { id: 'q2-cp-5',  home: { winner: 'q1-5' },    away: { winner: 'q1-1' },  firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-6',  home: { winner: 'q1-10' },   away: { winner: 'q1-8' },  firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-7',  home: { club: 'OMO' },       away: { winner: 'q1-12' }, firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-8',  home: { club: 'THU' },       away: { club: 'DZG' },     firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-9',  home: { winner: 'q1-11' },   away: { club: 'HBS' },     firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-10', home: { winner: 'q1-2' },    away: { club: 'SLO' },     firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-cp-11', home: { winner: 'q1-9' },    away: { club: 'CLJ' },     firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
  ],

  // Q2 League Path — 2 duels, geloot 17 juni 2026. Vier directe instappers.
  'q2-lp': [
    { id: 'q2-lp-0', home: { club: 'FEN' }, away: { club: 'GOR' }, firstLeg: '21/22 jul', secondLeg: '28/29 jul' },
    { id: 'q2-lp-1', home: { club: 'STG' }, away: { club: 'HOM' }, firstLeg: '21 jul',    secondLeg: '28 jul' },
  ],
};

// Bouwt de duels van een vaste-loting-ronde. winnerClub lost een
// { winner: tieId }-slot op naar de gekozen winnaar van dat duel. Duels waarvan
// een slot nog niet bekend is (winnaar nog niet gekozen) worden overgeslagen.
export function buildFixedTies(
  roundId: string,
  winnerClub: (tieId: string) => UCLClub | undefined
): UCLTie[] {
  const resolve = (s: TieSlot): UCLClub | undefined =>
    'club' in s ? clubById(s.club) : winnerClub(s.winner);
  const ties: UCLTie[] = [];
  for (const d of FIXED_TIES[roundId] ?? []) {
    const home = resolve(d.home);
    const away = resolve(d.away);
    if (!home || !away) continue;
    ties.push({ id: d.id, home, away, firstLeg: d.firstLeg, secondLeg: d.secondLeg });
  }
  return ties;
}

export const hasFixedDraw = (roundId: string): boolean => roundId in FIXED_TIES;
