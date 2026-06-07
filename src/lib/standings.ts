// Standings-engine voor WK 2026 — het correctheids-hart van modus A.
// Pure functies, geen UI, geen side effects. Makkelijk te unit-testen.
//
// FIFA-tiebreakervolgorde (groepsfase), in deze vololgorde toegepast:
//   1. Meeste punten (alle groepswedstrijden)
//   2. Doelsaldo (alle groepswedstrijden)
//   3. Meest gescoorde doelpunten (alle groepswedstrijden)
//   -- als ploegen daarna nog gelijk staan, alleen onderling (subgroep): --
//   4. Punten in onderlinge duels
//   5. Doelsaldo in onderlinge duels
//   6. Doelpunten in onderlinge duels
//   7. Fair-play-score   <-- nog niet gemodelleerd (geen kaartendata)
//   8. Loting            <-- hier: deterministische fallback (strength, dan id)
//
// Let op: zolang een ploeg alleen W/G/V-uitslagen heeft (geen goals), zijn
// stap 2/3/5/6 niet betekenisvol en val je sneller terug op de fallback.

import type { GroupId, MatchResult, Standing, ThirdPlaceRank, Qualifiers } from './types';
import { GROUP_IDS, teamsByGroup, teamById, groupFixtures } from '../data/worldcup2026';

function emptyStanding(teamId: string): Standing {
  return { teamId, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, hasScores: false };
}

/** Leidt de uitslag ('H'|'D'|'A') af uit goals, of valt terug op het outcome-veld. */
function resolveOutcome(r: MatchResult): 'H' | 'D' | 'A' | null {
  if (typeof r.homeGoals === 'number' && typeof r.awayGoals === 'number') {
    if (r.homeGoals > r.awayGoals) return 'H';
    if (r.homeGoals < r.awayGoals) return 'A';
    return 'D';
  }
  return r.outcome ?? null;
}

function applyResult(table: Map<string, Standing>, r: MatchResult): void {
  const o = resolveOutcome(r);
  if (!o) return; // nog niet ingevuld
  const home = table.get(r.homeId);
  const away = table.get(r.awayId);
  if (!home || !away) return;

  const hasGoals = typeof r.homeGoals === 'number' && typeof r.awayGoals === 'number';
  home.played++; away.played++;
  if (hasGoals) {
    home.hasScores = true; away.hasScores = true;
    home.gf += r.homeGoals!; home.ga += r.awayGoals!;
    away.gf += r.awayGoals!; away.ga += r.homeGoals!;
  }
  if (o === 'H') { home.won++; home.points += 3; away.lost++; }
  else if (o === 'A') { away.won++; away.points += 3; home.lost++; }
  else { home.drawn++; away.drawn++; home.points++; away.points++; }
}

/** Mini-tabel op basis van alléén de duels binnen `teamIds`. */
function headToHead(teamIds: string[], results: MatchResult[]): Map<string, Standing> {
  const set = new Set(teamIds);
  const sub = new Map(teamIds.map((id) => [id, emptyStanding(id)]));
  for (const r of results) {
    if (set.has(r.homeId) && set.has(r.awayId)) applyResult(sub, r);
  }
  return sub;
}

function byOverall(a: Standing, b: Standing): number {
  if (b.points !== a.points) return b.points - a.points;
  if (b.gd !== a.gd) return b.gd - a.gd;
  return b.gf - a.gf;
}

/**
 * Sorteer een groep met de volledige FIFA-volgorde.
 * @param teamIds        de (4) ploegen in de groep
 * @param results        alle uitslagen van die groep
 * @param fairPlay       fair-play-scores per teamId (negatief = meer kaarten)
 * @param manualOrder    handmatige volgorde voor resterende gelijkstand (teamId → positie 0..3)
 */
export function computeGroupStandings(
  teamIds: string[],
  results: MatchResult[],
  fairPlay: Record<string, number> = {},
  manualOrder: Record<string, number> = {},
): Standing[] {
  const table = new Map(teamIds.map((id) => [id, emptyStanding(id)]));
  for (const r of results) applyResult(table, r);
  for (const s of table.values()) s.gd = s.gf - s.ga;

  const standings = [...table.values()];

  // Pre-compute tied groups (based on overall pts/gd/gf) for H2H lookup
  const overallKey = (s: Standing) => `${s.points}|${s.gd}|${s.gf}`;
  const h2hByKey = new Map<string, Map<string, Standing>>();
  const buckets = new Map<string, string[]>();
  for (const s of standings) {
    const k = overallKey(s);
    buckets.set(k, [...(buckets.get(k) ?? []), s.teamId]);
  }
  for (const [k, ids] of buckets) {
    if (ids.length > 1) {
      const sub = headToHead(ids, results);
      for (const s of sub.values()) s.gd = s.gf - s.ga;
      h2hByKey.set(k, sub);
    }
  }

  standings.sort((a, b) => {
    // 1-3: overall
    const overall = byOverall(a, b);
    if (overall !== 0) return overall;

    // 4-6: head-to-head
    const h2h = h2hByKey.get(overallKey(a));
    if (h2h) {
      const ha = h2h.get(a.teamId)!;
      const hb = h2h.get(b.teamId)!;
      const sub = byOverall(ha, hb);
      if (sub !== 0) return sub;
    }

    // 7: fair play
    const fpA = fairPlay[a.teamId] ?? 0;
    const fpB = fairPlay[b.teamId] ?? 0;
    if (fpA !== fpB) return fpB - fpA;

    // 8: handmatige volgorde (gebruikerskeuze, proxy voor loting)
    const moA = manualOrder[a.teamId];
    const moB = manualOrder[b.teamId];
    if (moA !== undefined && moB !== undefined) return moA - moB;
    if (moA !== undefined) return -1;
    if (moB !== undefined) return 1;

    // 9: deterministisch (strength → id) zodat UI stabiel blijft
    const ta = teamById(a.teamId);
    const tb = teamById(b.teamId);
    if (ta && tb && tb.strength !== ta.strength) return tb.strength - ta.strength;
    return a.teamId.localeCompare(b.teamId);
  });

  return standings;
}

/** True als alle 6 wedstrijden in de groep een uitslag hebben. */
export function isGroupComplete(results: MatchResult[], group: GroupId): boolean {
  return groupFixtures(group).every(({ homeId, awayId }) =>
    results.some(
      (r) =>
        r.group === group &&
        r.homeId === homeId &&
        r.awayId === awayId &&
        (typeof r.homeGoals === 'number' || r.outcome !== undefined),
    ),
  );
}

/** Bereken alle 12 groepen in één keer. Geeft een map GroupId -> Standing[]. */
export function computeAllGroups(
  results: MatchResult[],
  fairPlay: Record<string, number> = {},
  manualOrder: Record<string, number> = {},
): Record<GroupId, Standing[]> {
  const out = {} as Record<GroupId, Standing[]>;
  for (const g of GROUP_IDS) {
    const ids = teamsByGroup(g).map((t) => t.id);
    const groupResults = results.filter((r) => r.group === g);
    out[g] = computeGroupStandings(ids, groupResults, fairPlay, manualOrder);
  }
  return out;
}

/**
 * Rangschik de 12 nummers 3 en markeer de 8 die doorgaan naar de Round of 32.
 * FIFA gebruikt: punten -> doelsaldo -> doelpunten -> fair play -> loting.
 */
export function rankThirdPlaced(allGroups: Record<GroupId, Standing[]>): ThirdPlaceRank[] {
  const thirds = GROUP_IDS
    .map((g) => {
      const s = allGroups[g][2]; // index 2 = nummer 3
      return s ? { ...s, group: g } : null;
    })
    .filter((x): x is Standing & { group: GroupId } => x !== null);

  thirds.sort((a, b) => {
    const overall = byOverall(a, b);
    if (overall !== 0) return overall;
    const ta = teamById(a.teamId);
    const tb = teamById(b.teamId);
    if (ta && tb && tb.strength !== ta.strength) return tb.strength - ta.strength;
    return a.teamId.localeCompare(b.teamId);
  });

  return thirds.map((s, i) => ({ ...s, rank: i + 1, advances: i < 8 }));
}

/** 12 groepswinnaars + 12 nummers 2 + 8 beste nummers 3 = 32 ploegen. */
export function getQualifiers(
  results: MatchResult[],
  fairPlay: Record<string, number> = {},
  manualOrder: Record<string, number> = {},
): Qualifiers {
  const allGroups = computeAllGroups(results, fairPlay, manualOrder);
  const winners = GROUP_IDS.map((g) => ({ group: g, teamId: allGroups[g][0].teamId }));
  const runnersUp = GROUP_IDS.map((g) => ({ group: g, teamId: allGroups[g][1].teamId }));
  const bestThirds = rankThirdPlaced(allGroups).filter((t) => t.advances);
  return { winners, runnersUp, bestThirds };
}

// LET OP — knockout (Round of 32 -> finale):
// FIFA gebruikt een vaste matrix die bepaalt wélke groep-nummer-3 in wélk
// R32-duel komt, afhankelijk van wélke 8 van de 12 nummers 3 doorgaan
// (er zijn C(12,8)=495 combinaties). Die officiële tabel zetten we apart vast
// vóór launch; pas dán is de bracket "echt" en niet benaderd. Tot die tijd
// stopt deze engine bij de 32 gekwalificeerde ploegen.
