import { buildBracket, type KnockoutResults } from './bracket';
import type { Qualifiers, GroupId, MatchResult } from './types';
import { groupFixtures, teamById } from '@/data/worldcup2026';

export type RoundKey = 'groep' | 'r32' | 'r16' | 'qf' | 'sf' | 'final';

export interface RouteRound {
  round: RoundKey;
  label: string;
  opponentId: string | null;
  opponentLabel: string;
  won: boolean | null; // null = TBD
  draw?: boolean;
  score?: string;
}

export type QualifiedPosition = 'winner' | 'runnerUp' | 'third';

export interface TeamRoute {
  teamId: string;
  qualifiedFrom: string | null; // "1e in poule A" etc. (NL, voor legacy gebruik)
  qualifiedPosition: QualifiedPosition | null; // gestructureerd, voor lokalisatie
  qualifiedGroup: GroupId | null;
  rounds: RouteRound[];
  result: RoundKey | 'kampioen' | 'niet-gekwalificeerd';
}

const ROUND_LABELS: Record<RoundKey, string> = {
  groep: 'Groepsfase',
  r32:   'Ronde van 32',
  r16:   'Laatste 16',
  qf:    'Kwartfinale',
  sf:    'Halve finale',
  final: 'Finale',
};

export function traceRoute(
  teamId: string,
  qualifiers: Qualifiers,
  kr: KnockoutResults,
  matchResults: MatchResult[] = [],
): TeamRoute {
  const bracket = buildBracket(qualifiers, kr);

  const w = qualifiers.winners.find((x) => x.teamId === teamId);
  const r = qualifiers.runnersUp.find((x) => x.teamId === teamId);
  const t = qualifiers.bestThirds.find((x) => x.teamId === teamId);

  let qualifiedFrom: string | null = null;
  let qualifiedPosition: QualifiedPosition | null = null;
  let group: GroupId | null = null;

  if (w)      { qualifiedFrom = `1e in poule ${w.group}`; qualifiedPosition = 'winner';   group = w.group; }
  else if (r) { qualifiedFrom = `2e in poule ${r.group}`; qualifiedPosition = 'runnerUp'; group = r.group; }
  else if (t) { qualifiedFrom = `3e in poule ${t.group}`; qualifiedPosition = 'third';    group = t.group; }
  else        { return { teamId, qualifiedFrom: null, qualifiedPosition: null, qualifiedGroup: null, rounds: [], result: 'niet-gekwalificeerd' }; }

  const rounds: RouteRound[] = [];

  // ── Groepsfase matches ────────────────────────────────────────────────────
  if (group) {
    const fixtures = groupFixtures(group);
    for (const fixture of fixtures) {
      if (fixture.homeId !== teamId && fixture.awayId !== teamId) continue;

      const opponentId = fixture.homeId === teamId ? fixture.awayId : fixture.homeId;
      const opponentTeam = teamById(opponentId);
      const res = matchResults.find(
        (m) => m.group === group && m.homeId === fixture.homeId && m.awayId === fixture.awayId,
      );

      let won: boolean | null = null;
      let draw = false;
      let score: string | undefined;

      if (res) {
        const isHome = fixture.homeId === teamId;
        if (res.homeGoals !== undefined && res.awayGoals !== undefined) {
          const hg = res.homeGoals;
          const ag = res.awayGoals;
          score = isHome ? `${hg}–${ag}` : `${ag}–${hg}`;
          if (hg === ag)      { draw = true; }
          else if (isHome)    { won = hg > ag; }
          else                { won = ag > hg; }
        } else if (res.outcome) {
          if (res.outcome === 'D')    { draw = true; }
          else if (res.outcome === 'H') { won = isHome; }
          else                          { won = !isHome; }
        }
      }

      rounds.push({
        round: 'groep',
        label: ROUND_LABELS['groep'],
        opponentId,
        opponentLabel: opponentTeam?.name ?? opponentId,
        won,
        draw,
        score,
      });
    }
  }

  // ── Knockout rounds ───────────────────────────────────────────────────────
  const roundSeries: { key: Exclude<RoundKey, 'groep'>; matches: ReturnType<typeof buildBracket>['r32'] }[] = [
    { key: 'r32',   matches: bracket.r32 },
    { key: 'r16',   matches: bracket.r16 },
    { key: 'qf',    matches: bracket.qf },
    { key: 'sf',    matches: bracket.sf },
    { key: 'final', matches: [bracket.final] },
  ];

  let result: TeamRoute['result'] = 'r32';

  for (const { key, matches } of roundSeries) {
    const match = matches.find(
      (m) => m.slot1.teamId === teamId || m.slot2.teamId === teamId,
    );
    if (!match) break;

    const isSlot1 = match.slot1.teamId === teamId;
    const opponent = isSlot1 ? match.slot2 : match.slot1;
    const picked = kr[match.id];

    const opponentName = opponent.teamId
      ? (teamById(opponent.teamId)?.name ?? opponent.label)
      : opponent.label;

    let won: boolean | null = null;
    if (picked !== undefined) {
      won = isSlot1 ? picked === 1 : picked === 2;
    }

    rounds.push({
      round: key,
      label: ROUND_LABELS[key],
      opponentId: opponent.teamId,
      opponentLabel: opponentName,
      won,
    });

    if (won === false) {
      result = key;
      break;
    }
    if (won === true) {
      result = key === 'final' ? 'kampioen' : key;
    }
  }

  return { teamId, qualifiedFrom, qualifiedPosition, qualifiedGroup: group, rounds, result };
}

export function resultLabel(result: TeamRoute['result']): string {
  if (result === 'kampioen') return 'Winnaar';
  if (result === 'final')    return 'Finale';
  if (result === 'sf')       return 'Halve finale';
  if (result === 'qf')       return 'Kwartfinale';
  if (result === 'r16')      return 'Laatste 16';
  if (result === 'r32')      return 'Ronde van 32';
  if (result === 'groep')    return 'Groepsfase';
  return 'Groepsfase';
}
