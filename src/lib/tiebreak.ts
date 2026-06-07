import type { GroupId, MatchResult, Standing } from './types';
import { teamById } from '../data/worldcup2026';

export interface TiedGroup {
  teamIds: string[];
  positions: number[];   // 0-indexed positions in the standings
  affectsQualification: boolean; // raakt positie 2 of 3 (grens direct/thirds/uit)
}

// Fair play score per team: gele kaart -1, directe rode kaart -4, etc.
export interface FairPlayCards {
  yellow: number;
  directRed: number;
}

export function fairPlayScore(cards: FairPlayCards): number {
  return cards.yellow * -1 + cards.directRed * -4;
}

// Vergelijk twee teams ZONDER fallback (strength/id).
// Geeft 0 als teams echt gelijk zijn na alle echte criteria.
export function compareWithoutFallback(
  a: Standing,
  b: Standing,
  allResults: MatchResult[],
  fairPlayScores: Record<string, number>,
): number {
  // 1-3: overall
  if (b.points !== a.points) return b.points - a.points;
  if (b.gd !== a.gd) return b.gd - a.gd;
  if (b.gf !== a.gf) return b.gf - a.gf;

  // 4-6: head-to-head
  const ids = [a.teamId, b.teamId];
  const set = new Set(ids);
  const h2hMap = new Map(ids.map((id) => [id, { pts: 0, gd: 0, gf: 0 }]));
  for (const r of allResults) {
    if (!set.has(r.homeId) || !set.has(r.awayId)) continue;
    const hg = r.homeGoals;
    const ag = r.awayGoals;
    if (typeof hg !== 'number' || typeof ag !== 'number') {
      const o = r.outcome;
      if (!o) continue;
      const home = h2hMap.get(r.homeId)!;
      const away = h2hMap.get(r.awayId)!;
      if (o === 'H') { home.pts += 3; }
      else if (o === 'A') { away.pts += 3; }
      else { home.pts++; away.pts++; }
    } else {
      const home = h2hMap.get(r.homeId)!;
      const away = h2hMap.get(r.awayId)!;
      const gd = hg - ag;
      home.gf += hg; home.gd += gd; away.gf += ag; away.gd -= gd;
      if (hg > ag) home.pts += 3;
      else if (ag > hg) away.pts += 3;
      else { home.pts++; away.pts++; }
    }
  }
  const ha = h2hMap.get(a.teamId)!;
  const hb = h2hMap.get(b.teamId)!;
  if (hb.pts !== ha.pts) return hb.pts - ha.pts;
  if (hb.gd !== ha.gd) return hb.gd - ha.gd;
  if (hb.gf !== ha.gf) return hb.gf - ha.gf;

  // 7: fair play
  const fpA = fairPlayScores[a.teamId] ?? 0;
  const fpB = fairPlayScores[b.teamId] ?? 0;
  if (fpA !== fpB) return fpB - fpA; // hogere score (minder negatief) = beter

  return 0; // echte gelijkstand
}

// Vindt groepen van gelijkstaande teams in de al-gesorteerde standings.
export function findTiedGroups(
  standings: Standing[],
  results: MatchResult[],
  fairPlayScores: Record<string, number> = {},
): TiedGroup[] {
  const groups: TiedGroup[] = [];
  let i = 0;

  while (i < standings.length) {
    let j = i + 1;
    while (
      j < standings.length &&
      compareWithoutFallback(standings[i], standings[j], results, fairPlayScores) === 0
    ) {
      j++;
    }
    if (j > i + 1) {
      const positions = Array.from({ length: j - i }, (_, k) => i + k);
      groups.push({
        teamIds: standings.slice(i, j).map((s) => s.teamId),
        positions,
        // Raakt positie 2 (index 1) of positie 3 (index 2) → kwalificatiegrens
        affectsQualification: positions.some((p) => p === 1 || p === 2),
      });
    }
    i = j;
  }

  return groups;
}
