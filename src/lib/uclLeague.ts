// League phase 2026/27 — loting (constraint-solver), simulatie en eindstand.
// 36 clubs, 4 potten van 9. Elke club speelt 8 wedstrijden: 2 tegen elke pot
// (incl. eigen pot), 1 thuis + 1 uit per pot-paar → 4 thuis / 4 uit.
// Restricties: geen duel tussen clubs van dezelfde bond (flagCode), en max 2
// tegenstanders uit dezelfde bond per club.

import { shuffled, simulateMatch, winProbECI, type UCLClub, type PottedClub } from '@/data/ucl2027';

export interface LeagueMatch {
  homeId: string;
  awayId: string;
}

export type Goals = Record<string, [number, number]>; // matchKey → [thuis, uit]

export interface LeagueStanding {
  clubId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export function matchKey(m: LeagueMatch): string {
  return `${m.homeId}-${m.awayId}`;
}

// ─── Loting ──────────────────────────────────────────────────────────────────

type OppCount = Record<string, Record<string, number>>; // clubId → bond → aantal

function bondCount(o: OppCount, id: string, bond: string): number {
  return o[id]?.[bond] ?? 0;
}
function incBond(o: OppCount, id: string, bond: string): void {
  o[id][bond] = bondCount(o, id, bond) + 1;
}

function canPair(a: UCLClub, b: UCLClub, o: OppCount): boolean {
  if (a.flagCode === b.flagCode) return false; // zelfde bond verboden
  if (bondCount(o, a.id, b.flagCode) >= 2) return false; // max 2 uit dezelfde bond
  if (bondCount(o, b.id, a.flagCode) >= 2) return false;
  return true;
}

interface Edge {
  a: UCLClub;
  b: UCLClub;
  key: string;
}

const pairKey = (p1: number, p2: number) => (p1 < p2 ? `${p1}-${p2}` : `${p2}-${p1}`);

// Eén greedy poging: bouw alle 144 duels op met MRV (kies steeds de meest
// beperkte openstaande behoefte). Faalt direct (null) zodra een behoefte geen
// geldige partner meer heeft — goedkoop, zodat restarts snel zijn.
function buildMatches(potsByIndex: UCLClub[][]): Edge[] | null {
  const potOf: Record<string, number> = {};
  potsByIndex.forEach((pot, idx) => pot.forEach((c) => (potOf[c.id] = idx)));
  const all = potsByIndex.flat();

  const need: Record<string, number[]> = {}; // clubId → [pot0..3] resterende behoefte
  const o: OppCount = {};
  for (const c of all) {
    need[c.id] = [2, 2, 2, 2];
    o[c.id] = {};
  }
  const usedPair = new Set<string>();
  const pid = (x: string, y: string) => (x < y ? `${x}|${y}` : `${y}|${x}`);

  const partnersFor = (c: UCLClub, p: number): UCLClub[] =>
    potsByIndex[p].filter(
      (q) =>
        q.id !== c.id &&
        need[q.id][potOf[c.id]] > 0 &&
        !usedPair.has(pid(c.id, q.id)) &&
        canPair(c, q, o)
    );

  const edges: Edge[] = [];
  const TOTAL = (all.length * 8) / 2; // 144

  while (edges.length < TOTAL) {
    // MRV: vind de openstaande (club, pot)-behoefte met de minste partners
    let best: { c: UCLClub; p: number; parts: UCLClub[] } | null = null;
    for (const c of all) {
      for (let p = 0; p < 4; p++) {
        if (need[c.id][p] <= 0) continue;
        const parts = partnersFor(c, p);
        if (parts.length === 0) return null; // dead end → restart
        if (best === null || parts.length < best.parts.length) best = { c, p, parts };
        if (best.parts.length === 1) break;
      }
      if (best && best.parts.length === 1) break;
    }
    if (best === null) break; // niets meer open

    const { c, p, parts } = best;
    const q = parts[Math.floor(Math.random() * parts.length)];
    need[c.id][p]--;
    need[q.id][potOf[c.id]]--;
    usedPair.add(pid(c.id, q.id));
    incBond(o, c.id, q.flagCode);
    incBond(o, q.id, c.flagCode);
    edges.push({ a: c, b: q, key: pairKey(potOf[c.id], p) });
  }

  return edges;
}

// Oriënteert de ongerichte duels van elke pot-paring langs cykels → 1 thuis / 1
// uit per club per paring (dus 4 thuis / 4 uit totaal).
function orient(edges: Edge[]): LeagueMatch[] {
  const groups: Record<string, { a: UCLClub; b: UCLClub }[]> = {};
  for (const e of edges) (groups[e.key] ??= []).push({ a: e.a, b: e.b });

  const out: LeagueMatch[] = [];
  for (const key of Object.keys(groups)) {
    const g = groups[key];
    const inc: Record<string, number[]> = {}; // clubId → edge-indices
    g.forEach((e, idx) => {
      (inc[e.a.id] ??= []).push(idx);
      (inc[e.b.id] ??= []).push(idx);
    });
    const used = new Array(g.length).fill(false);
    for (let s = 0; s < g.length; s++) {
      if (used[s]) continue;
      let edgeIdx = s;
      let curId = g[s].a.id;
      while (edgeIdx !== -1 && !used[edgeIdx]) {
        used[edgeIdx] = true;
        const e = g[edgeIdx];
        const toNode = e.a.id === curId ? e.b : e.a;
        out.push({ homeId: curId, awayId: toNode.id });
        curId = toNode.id;
        const next = inc[curId].find((idx) => !used[idx]);
        edgeIdx = next ?? -1;
      }
    }
  }
  return out;
}

// Trekt een volledig league-phase-schema (144 duels) via greedy-MRV met
// goedkope restarts. Elke poging faalt direct bij een dead end.
export function drawLeaguePhase(potted: PottedClub[]): LeagueMatch[] {
  const pots = [1, 2, 3, 4].map((p) => potted.filter((x) => x.pot === p).map((x) => x.club));

  for (let attempt = 0; attempt < 20000; attempt++) {
    const edges = buildMatches(pots);
    if (edges) return orient(edges);
  }
  throw new Error('League phase loting kon geen geldig schema vinden');
}

// ─── Simulatie & eindstand ───────────────────────────────────────────────────

export function clubMapOf(potted: PottedClub[]): Map<string, UCLClub> {
  return new Map(potted.map((pc) => [pc.club.id, pc.club]));
}

// Simuleert alle duels op ECI → goals per matchKey.
export function simulateLeague(schedule: LeagueMatch[], clubs: Map<string, UCLClub>): Goals {
  const goals: Goals = {};
  for (const m of schedule) {
    const home = clubs.get(m.homeId)!;
    const away = clubs.get(m.awayId)!;
    goals[matchKey(m)] = simulateMatch(home, away);
  }
  return goals;
}

// Berekent de eindstand (36 rijen) uit schema + goals. Tiebreak: punten →
// doelsaldo → doelpunten → uefaCC → id (deterministisch).
export function computeLeagueTable(
  potted: PottedClub[],
  schedule: LeagueMatch[],
  goals: Goals
): LeagueStanding[] {
  const table = new Map<string, LeagueStanding>();
  for (const pc of potted) {
    table.set(pc.club.id, {
      clubId: pc.club.id,
      played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0,
    });
  }

  for (const m of schedule) {
    const g = goals[matchKey(m)];
    if (!g) continue;
    const [hg, ag] = g;
    const home = table.get(m.homeId)!;
    const away = table.get(m.awayId)!;
    home.played++; away.played++;
    home.gf += hg; home.ga += ag;
    away.gf += ag; away.ga += hg;
    if (hg > ag) { home.won++; home.points += 3; away.lost++; }
    else if (hg < ag) { away.won++; away.points += 3; home.lost++; }
    else { home.drawn++; away.drawn++; home.points++; away.points++; }
  }

  for (const s of table.values()) s.gd = s.gf - s.ga;

  const cc = new Map(potted.map((pc) => [pc.club.id, pc.club.uefaCC]));
  return [...table.values()].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    const ca = cc.get(a.clubId) ?? 0;
    const cb = cc.get(b.clubId) ?? 0;
    if (cb !== ca) return cb - ca;
    return a.clubId.localeCompare(b.clubId);
  });
}

export type Band = 'r16' | 'playoff' | 'out';

// Eindpositie (0-based) → kwalificatieband: 1-8 R16, 9-24 play-off, 25-36 uit.
export function qualificationBand(rankIndex: number): Band {
  if (rankIndex < 8) return 'r16';
  if (rankIndex < 24) return 'playoff';
  return 'out';
}

// ─── Knockout (na de league phase) ───────────────────────────────────────────
// Vaste bracket (Annex B). KO play-offs: posities 9-24. R16: top 8 geseed tegen
// de play-off-winnaars. QF/SF/finale: vaste boom (aangrenzende paren).
// Bron: 2024/25 UEFA Champions League knockout phase (Wikipedia).

export interface KnockoutTie {
  id: string;
  homeId: string; // beter geplaatst (lagere rank) — speelt de returnwedstrijd thuis
  awayId: string;
  homeRank: number; // meegedragen seeding-positie (1..36); lager = beter
  awayRank: number;
  band?: number; // alleen voor KO play-off-duels (0..3)
}

export type KnockoutRoundId = 'kopo' | 'r16' | 'qf' | 'sf' | 'final';

export const KNOCKOUT_TITLES: Record<KnockoutRoundId, string> = {
  kopo: 'Knockout play-offs',
  r16: 'Achtste finales',
  qf: 'Kwartfinales',
  sf: 'Halve finales',
  final: 'Finale',
};

// KO play-off-banden op basis van league-phase-posities (1-based).
const KOPO_BANDS = [
  { seeded: [9, 10], unseeded: [23, 24] },
  { seeded: [11, 12], unseeded: [21, 22] },
  { seeded: [13, 14], unseeded: [19, 20] },
  { seeded: [15, 16], unseeded: [17, 18] },
];

// R16-bracketvolgorde (seed-nummers) zodat seeds 1 en 2 elkaar pas in de finale
// kunnen treffen: aangrenzende paren vormen de kwartfinales.
const R16_SEED_ORDER = [1, 8, 3, 5, 4, 6, 2, 7];

// Welke KO play-off-band een seed treft: 1/2 → band IV (idx 3), 3/4 → III, enz.
const BAND_OF_SEED: Record<number, number> = { 1: 3, 2: 3, 3: 2, 4: 2, 5: 1, 6: 1, 7: 0, 8: 0 };

// Carried rank van een winnaar = de beste (laagste) positie uit het duel: een
// underdog die een hoger geplaatste uitschakelt, neemt diens seeding-positie over.
function carriedRank(tie: KnockoutTie): number {
  return Math.min(tie.homeRank, tie.awayRank);
}

// Loot de 8 KO play-off-duels uit de eindstand (orderedIds = clubIds 1..36).
// Thuis = geseed (posities 9-16), speelt de returnwedstrijd thuis.
export function drawPlayoffs(orderedIds: string[]): KnockoutTie[] {
  const ties: KnockoutTie[] = [];
  KOPO_BANDS.forEach((band, bi) => {
    const seeded = shuffled(band.seeded);
    const unseeded = shuffled(band.unseeded);
    seeded.forEach((sPos, j) => {
      const uPos = unseeded[j];
      ties.push({
        id: `kopo-${bi}-${j}`,
        homeId: orderedIds[sPos - 1],
        awayId: orderedIds[uPos - 1],
        homeRank: sPos,
        awayRank: uPos,
        band: bi,
      });
    });
  });
  return ties;
}

// Bouwt de 8 R16-duels: elke seed (1-8) tegen een play-off-winnaar uit de
// gekoppelde band (willekeurig toegewezen), in vaste bracketvolgorde.
export function buildR16(
  kopoTies: KnockoutTie[],
  winners: Record<string, string>,
  seeds: string[] // clubIds van posities 1..8
): KnockoutTie[] {
  // winnaars per band, met meegedragen rank (= de geseede positie 9-16)
  const byBand: Record<number, { id: string; rank: number }[]> = { 0: [], 1: [], 2: [], 3: [] };
  for (const t of kopoTies) byBand[t.band!].push({ id: winners[t.id], rank: carriedRank(t) });
  for (const b of [0, 1, 2, 3]) byBand[b] = shuffled(byBand[b]);

  const idx: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const tieForSeed: Record<number, KnockoutTie> = {};
  for (let n = 1; n <= 8; n++) {
    const opp = byBand[BAND_OF_SEED[n]][idx[BAND_OF_SEED[n]]++];
    tieForSeed[n] = {
      id: `r16-seed${n}`,
      homeId: seeds[n - 1], // seed (1-8) is beter geplaatst → thuis terug
      awayId: opp.id,
      homeRank: n,
      awayRank: opp.rank,
    };
  }
  return R16_SEED_ORDER.map((n, slot) => ({ ...tieForSeed[n], id: `r16-${slot}` }));
}

// Generieke volgende ronde: koppel winnaars van aangrenzende duels. De beter
// geplaatste (lagere carried rank) speelt thuis. In de finale (idPrefix 'final')
// is de winnaar van HF1 administratief de thuisploeg.
export function pairWinners(
  prevTies: KnockoutTie[],
  winners: Record<string, string>,
  idPrefix: string
): KnockoutTie[] {
  const ws = prevTies.map((t) => ({ id: winners[t.id], rank: carriedRank(t) }));
  const out: KnockoutTie[] = [];
  for (let i = 0; i < ws.length; i += 2) {
    const a = ws[i];
    const b = ws[i + 1];
    const aHome = idPrefix === 'final' ? true : a.rank <= b.rank;
    const home = aHome ? a : b;
    const away = aHome ? b : a;
    out.push({
      id: `${idPrefix}-${i / 2}`,
      homeId: home.id,
      awayId: away.id,
      homeRank: home.rank,
      awayRank: away.rank,
    });
  }
  return out;
}

// Simuleert de winnaar van een knockoutduel op ECI, met licht thuisvoordeel
// voor de beter geplaatste (thuis) ploeg.
export function simulateKnockoutWinner(tie: KnockoutTie, clubs: Map<string, UCLClub>): string {
  const home = clubs.get(tie.homeId)!;
  const away = clubs.get(tie.awayId)!;
  const boosted: UCLClub = { ...home, eci: home.eci + 40 };
  return Math.random() < winProbECI(boosted, away) ? tie.homeId : tie.awayId;
}

// ─── Knockout-state (sim + override) ─────────────────────────────────────────

export interface KnockoutRound {
  ties: KnockoutTie[];
  winners: Record<string, string>; // tieId → clubId
}

export interface KnockoutState {
  orderedIds: string[]; // eindstand league phase (posities 1..36)
  rounds: Record<string, KnockoutRound>;
  order: KnockoutRoundId[];
}

function autoSimRound(ties: KnockoutTie[], clubs: Map<string, UCLClub>): Record<string, string> {
  const w: Record<string, string> = {};
  for (const t of ties) w[t.id] = simulateKnockoutWinner(t, clubs);
  return w;
}

const roundComplete = (r: KnockoutRound) => r.ties.every((t) => r.winners[t.id]);

// Vult zolang de laatste ronde compleet is de volgende ronde aan (auto-gesimuleerd).
export function completeKnockout(state: KnockoutState, clubs: Map<string, UCLClub>): KnockoutState {
  let s = state;
  for (;;) {
    const last = s.order[s.order.length - 1];
    const lr = s.rounds[last];
    if (!roundComplete(lr)) break;
    let nextId: KnockoutRoundId | null = null;
    let ties: KnockoutTie[] = [];
    if (last === 'kopo') {
      nextId = 'r16';
      ties = buildR16(lr.ties, lr.winners, s.orderedIds.slice(0, 8));
    } else if (last === 'r16') {
      nextId = 'qf';
      ties = pairWinners(lr.ties, lr.winners, 'qf');
    } else if (last === 'qf') {
      nextId = 'sf';
      ties = pairWinners(lr.ties, lr.winners, 'sf');
    } else if (last === 'sf') {
      nextId = 'final';
      ties = pairWinners(lr.ties, lr.winners, 'final');
    }
    if (!nextId) break;
    s = {
      ...s,
      order: [...s.order, nextId],
      rounds: { ...s.rounds, [nextId]: { ties, winners: autoSimRound(ties, clubs) } },
    };
  }
  return s;
}

// Start de knockout vanuit de eindstand: loot de play-offs en simuleer de hele
// bracket tot een kampioen.
export function initKnockout(orderedIds: string[], clubs: Map<string, UCLClub>): KnockoutState {
  const kopo = drawPlayoffs(orderedIds);
  const state: KnockoutState = {
    orderedIds,
    order: ['kopo'],
    rounds: { kopo: { ties: kopo, winners: autoSimRound(kopo, clubs) } },
  };
  return completeKnockout(state, clubs);
}

// Override: zet handmatig een winnaar; latere rondes worden herbouwd en opnieuw
// gesimuleerd.
export function setKnockoutWinner(
  state: KnockoutState,
  roundId: string,
  tieId: string,
  clubId: string,
  clubs: Map<string, UCLClub>
): KnockoutState {
  const ri = state.order.indexOf(roundId as KnockoutRoundId);
  if (ri === -1) return state;
  const keptOrder = state.order.slice(0, ri + 1);
  const rounds: Record<string, KnockoutRound> = {};
  for (const id of keptOrder) rounds[id] = state.rounds[id];
  rounds[roundId] = { ...rounds[roundId], winners: { ...rounds[roundId].winners, [tieId]: clubId } };
  return completeKnockout({ ...state, order: keptOrder, rounds }, clubs);
}

// Simuleer de hele bracket opnieuw (zelfde play-off-loting, nieuwe uitslagen).
export function resimKnockout(state: KnockoutState, clubs: Map<string, UCLClub>): KnockoutState {
  const kopoTies = state.rounds['kopo'].ties;
  const fresh: KnockoutState = {
    orderedIds: state.orderedIds,
    order: ['kopo'],
    rounds: { kopo: { ties: kopoTies, winners: autoSimRound(kopoTies, clubs) } },
  };
  return completeKnockout(fresh, clubs);
}

// Kampioen (clubId) als de finale gespeeld is.
export function knockoutChampion(state: KnockoutState): string | null {
  const fin = state.rounds['final'];
  if (!fin) return null;
  return fin.winners[fin.ties[0]?.id] ?? null;
}
