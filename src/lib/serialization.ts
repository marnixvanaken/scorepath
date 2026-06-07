import type { MatchResult, GroupId } from './types';
import { GROUP_IDS, groupFixtures } from '../data/worldcup2026';

// Fixed order: 12 groups × 6 fixtures = 72 matches, total 144 chars (2 per match).
// Encoding per match:
//   "__" = not played
//   "H_" = quick outcome home win
//   "D_" = quick outcome draw
//   "A_" = quick outcome away win
//   "{h}{a}" = exact score, hex digit each (0-9, a=10, b=11 ...)

const MATCH_ORDER: { group: GroupId; homeId: string; awayId: string }[] =
  GROUP_IDS.flatMap((g) =>
    groupFixtures(g).map(({ homeId, awayId }) => ({ group: g, homeId, awayId }))
  );

function encodeGoal(n: number): string {
  return n.toString(16); // hex: 0-9 then a-f
}

function decodeGoal(c: string): number {
  return parseInt(c, 16);
}

export function encodeResults(results: MatchResult[]): string {
  const map = new Map<string, MatchResult>();
  for (const r of results) {
    map.set(`${r.group}:${r.homeId}:${r.awayId}`, r);
  }

  return MATCH_ORDER.map(({ group, homeId, awayId }) => {
    const r = map.get(`${group}:${homeId}:${awayId}`);
    if (!r) return '__';

    if (typeof r.homeGoals === 'number' && typeof r.awayGoals === 'number') {
      return encodeGoal(r.homeGoals) + encodeGoal(r.awayGoals);
    }
    if (r.outcome === 'H') return 'H_';
    if (r.outcome === 'D') return 'D_';
    if (r.outcome === 'A') return 'A_';
    return '__';
  }).join('');
}

export function decodeResults(encoded: string): MatchResult[] {
  if (!encoded || encoded.length !== MATCH_ORDER.length * 2) return [];

  const results: MatchResult[] = [];

  for (let i = 0; i < MATCH_ORDER.length; i++) {
    const { group, homeId, awayId } = MATCH_ORDER[i];
    const chunk = encoded.slice(i * 2, i * 2 + 2);

    if (chunk === '__') continue;

    if (chunk === 'H_') {
      results.push({ group, homeId, awayId, outcome: 'H' });
    } else if (chunk === 'D_') {
      results.push({ group, homeId, awayId, outcome: 'D' });
    } else if (chunk === 'A_') {
      results.push({ group, homeId, awayId, outcome: 'A' });
    } else {
      const homeGoals = decodeGoal(chunk[0]);
      const awayGoals = decodeGoal(chunk[1]);
      if (!isNaN(homeGoals) && !isNaN(awayGoals)) {
        results.push({ group, homeId, awayId, homeGoals, awayGoals });
      }
    }
  }

  return results;
}
