import { buildBracket, type KnockoutResults } from './bracket';
import type { Qualifiers } from './types';

export type RoundKey = 'r32' | 'r16' | 'qf' | 'sf' | 'final';

export interface RouteRound {
  round: RoundKey;
  label: string;
  opponentId: string | null;
  opponentLabel: string;
  won: boolean | null; // null = niet gespeeld
}

export interface TeamRoute {
  teamId: string;
  qualifiedFrom: string | null; // "Gr. A (1e)" etc.
  rounds: RouteRound[];
  /** Hoe ver kwamen ze: r32 t/m 'kampioen' */
  result: RoundKey | 'kampioen' | 'niet-gekwalificeerd';
}

const ROUND_LABELS: Record<RoundKey, string> = {
  r32: 'Ronde van 32',
  r16: 'Ronde van 16',
  qf:  'Kwartfinale',
  sf:  'Halve finale',
  final: 'Finale',
};

export function traceRoute(
  teamId: string,
  qualifiers: Qualifiers,
  kr: KnockoutResults,
): TeamRoute {
  const bracket = buildBracket(qualifiers, kr);

  const roundSeries: { key: RoundKey; matches: ReturnType<typeof buildBracket>['r32'] }[] = [
    { key: 'r32',   matches: bracket.r32 },
    { key: 'r16',   matches: bracket.r16 },
    { key: 'qf',    matches: bracket.qf },
    { key: 'sf',    matches: bracket.sf },
    { key: 'final', matches: [bracket.final] },
  ];

  // Find qualifying info
  const w = qualifiers.winners.find((x) => x.teamId === teamId);
  const r = qualifiers.runnersUp.find((x) => x.teamId === teamId);
  const t = qualifiers.bestThirds.find((x) => x.teamId === teamId);
  let qualifiedFrom: string | null = null;
  if (w) qualifiedFrom = `Gr. ${w.group} (1e)`;
  else if (r) qualifiedFrom = `Gr. ${r.group} (2e)`;
  else if (t) qualifiedFrom = `Gr. ${t.group} (3e #${t.rank})`;
  else return { teamId, qualifiedFrom: null, rounds: [], result: 'niet-gekwalificeerd' };

  const rounds: RouteRound[] = [];
  let result: TeamRoute['result'] = 'r32';

  for (const { key, matches } of roundSeries) {
    const match = matches.find(
      (m) => m.slot1.teamId === teamId || m.slot2.teamId === teamId,
    );
    if (!match) break;

    const isSlot1 = match.slot1.teamId === teamId;
    const opponent = isSlot1 ? match.slot2 : match.slot1;
    const picked = kr[match.id];

    let won: boolean | null = null;
    if (picked !== undefined) {
      won = isSlot1 ? picked === 1 : picked === 2;
    }

    rounds.push({
      round: key,
      label: ROUND_LABELS[key],
      opponentId: opponent.teamId,
      opponentLabel: opponent.label,
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

  return { teamId, qualifiedFrom, rounds, result };
}

export function resultLabel(result: TeamRoute['result']): string {
  if (result === 'kampioen') return 'Kampioen';
  if (result === 'final') return 'Finalist';
  if (result === 'sf') return 'Top 4';
  if (result === 'qf') return 'Kwartfinalist';
  if (result === 'r16') return 'Ronde van 16';
  if (result === 'r32') return 'Uitgeschakeld';
  return 'Niet gekwalificeerd';
}
