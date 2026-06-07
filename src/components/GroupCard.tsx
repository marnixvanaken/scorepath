'use client';

import type { GroupId, MatchResult, Standing } from '@/lib/types';
import { groupFixtures, GROUP_COLORS } from '@/data/worldcup2026';
import { MatchInputRow } from './MatchInputRow';
import { StandingsTable } from './StandingsTable';
import { TiebreakPanel } from './TiebreakPanel';
import { type InputMode } from '@/hooks/useSimulatorState';
import { findTiedGroups } from '@/lib/tiebreak';
import { isGroupComplete } from '@/lib/standings';

interface Props {
  group: GroupId;
  standings: Standing[];
  results: MatchResult[];
  inputMode: InputMode;
  bestThirdIds: Set<string>;
  onResult: (r: MatchResult) => void;
  manualOrders: Record<string, string[]>;
  onSetManualOrder: (key: string, order: string[]) => void;
  onClearManual: (key: string) => void;
}

export function GroupCard({
  group, standings, results, inputMode, bestThirdIds, onResult,
  manualOrders, onSetManualOrder, onClearManual,
}: Props) {
  const fixtures = groupFixtures(group);
  const groupResults = results.filter((r) => r.group === group);
  const complete = isGroupComplete(results, group);
  const tiedGroups = complete ? findTiedGroups(standings, groupResults) : [];
  const color = GROUP_COLORS[group];

  const filledCount = groupResults.filter(
    (r) => r.locked || r.outcome !== undefined || (r.homeGoals !== undefined && r.awayGoals !== undefined)
  ).length;
  const totalFixtures = fixtures.length;

  return (
    <div
      className="rounded-2xl overflow-hidden flex shadow-xl shadow-black/40"
      style={{ border: `2px solid ${color}50` }}
    >
      {/* Gekleurde linkstrip met groepletter + voortgang */}
      <div
        className="flex flex-col items-center justify-start pt-3 pb-2 w-10 shrink-0 gap-2"
        style={{ backgroundColor: color }}
      >
        <span className="font-display text-3xl leading-none text-white">
          {group}
        </span>
        {complete ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" aria-label="Compleet">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span className="text-[9px] font-bold text-white/70 tabular-nums leading-none">
            {filledCount}/{totalFixtures}
          </span>
        )}
      </div>

      {/* Kaartinhoud */}
      <div className="flex-1 bg-[--color-wk-card] flex flex-col min-w-0">
        {/* Wedstrijden */}
        <div className="flex flex-col divide-y divide-white/5 px-1">
          {fixtures.map(({ homeId, awayId }) => (
            <MatchInputRow
              key={`${homeId}-${awayId}`}
              group={group} homeId={homeId} awayId={awayId}
              results={results} inputMode={inputMode} onResult={onResult}
            />
          ))}
        </div>

        {/* Stand */}
        <div className="px-2 pb-3">
          <StandingsTable standings={standings} bestThirdIds={bestThirdIds} groupColor={color} />
        </div>

        <TiebreakPanel
          tiedGroups={tiedGroups}
          manualOrders={manualOrders}
          onSetManualOrder={onSetManualOrder}
          onClearManual={onClearManual}
        />
      </div>
    </div>
  );
}
