'use client';

import { useMemo } from 'react';
import type { GroupId, MatchResult, Standing } from '@/lib/types';
import { groupFixtures, GROUP_COLORS, teamById, getTeamName } from '@/data/worldcup2026';
import { useMessages } from '@/hooks/useMessages';
import { useParams } from 'next/navigation';
import { MatchInputRow } from './MatchInputRow';
import { StandingsTable } from './StandingsTable';
import { TiebreakPanel } from './TiebreakPanel';
import { type InputMode } from '@/hooks/useSimulatorState';
import { findTiedGroups } from '@/lib/tiebreak';
import { isGroupComplete } from '@/lib/standings';
import { Reorder, useDragControls } from 'motion/react';
import { Flag } from './Flag';

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
  dragOrder: string[];
  onDragOrderChange: (order: string[]) => void;
}

function DragHandle({ controls }: { controls: ReturnType<typeof useDragControls> }) {
  return (
    <div
      onPointerDown={(e) => { e.preventDefault(); controls.start(e); }}
      style={{ touchAction: 'none', cursor: 'grab' }}
      className="p-1.5 -m-1.5 shrink-0 active:cursor-grabbing"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="text-slate-600">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
      </svg>
    </div>
  );
}

function RankDragItem({ teamId, idx, lang }: { teamId: string; idx: number; lang: string }) {
  const controls = useDragControls();
  const team = teamById(teamId);
  const through = idx <= 1;

  return (
    <Reorder.Item
      value={teamId}
      dragListener={false}
      dragControls={controls}
      className={`flex items-center gap-2 px-3 py-2.5 select-none ${idx > 0 ? 'border-t border-white/5' : ''}`}
    >
      <span className={`text-[11px] font-black w-3 shrink-0 tabular-nums ${through ? 'text-[#C9A843]' : 'text-slate-600'}`}>
        {idx + 1}
      </span>
      <Flag teamId={teamId} size={16} />
      <span className={`text-[13px] font-semibold uppercase tracking-wide flex-1 truncate ${through ? 'text-slate-200' : 'text-slate-500'}`}>
        {team ? getTeamName(team, lang) : teamId}
      </span>
      <DragHandle controls={controls} />
    </Reorder.Item>
  );
}

export function GroupCard({
  group, standings, results, inputMode, bestThirdIds, onResult,
  manualOrders, onSetManualOrder, onClearManual,
  dragOrder, onDragOrderChange,
}: Props) {
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const fixtures = groupFixtures(group);
  const groupResults = results.filter((r) => r.group === group);
  const complete = isGroupComplete(results, group);
  const tiedGroups = complete ? findTiedGroups(standings, groupResults) : [];
  const color = GROUP_COLORS[group];

  const filledCount = groupResults.filter(
    (r) => r.locked || r.outcome !== undefined || (r.homeGoals !== undefined && r.awayGoals !== undefined)
  ).length;
  const totalFixtures = fixtures.length;

  const isDrag = inputMode === 'drag';

  // All 4 teams in this group, derived from fixtures
  const allTeams = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const { homeId, awayId } of fixtures) {
      if (!seen.has(homeId)) { seen.add(homeId); result.push(homeId); }
      if (!seen.has(awayId)) { seen.add(awayId); result.push(awayId); }
    }
    return result;
  }, [fixtures]);

  const allPicked = dragOrder.length === allTeams.length && allTeams.length > 0;

  function handlePickTeam(teamId: string) {
    if (dragOrder.includes(teamId)) {
      onDragOrderChange(dragOrder.filter((id) => id !== teamId));
    } else {
      onDragOrderChange([...dragOrder, teamId]);
    }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden flex shadow-xl shadow-black/40"
      style={{ border: `2px solid ${color}50` }}
    >
      {/* Gekleurde linkstrip */}
      <div
        className="flex flex-col items-center justify-start pt-3 pb-2 w-10 shrink-0 gap-2"
        style={{ backgroundColor: color }}
      >
        <span className="font-display text-3xl leading-none text-white">
          {group}
        </span>
        {!isDrag && (complete ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" aria-label="Compleet">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span className="text-[10px] font-bold text-white/70 tabular-nums leading-none">
            {filledCount}/{totalFixtures}
          </span>
        ))}
      </div>

      {/* Kaartinhoud */}
      <div className="flex-1 bg-card flex flex-col min-w-0">
        {isDrag ? (
          /* ── Volgorde mode ── */
          <>
            {/* Team tiles: klik in volgorde */}
            <div className="flex gap-1.5 px-2 pt-2 pb-1.5">
              {allTeams.map((teamId) => {
                const rank = dragOrder.indexOf(teamId);
                const isPicked = rank >= 0;
                return (
                  <button
                    key={teamId}
                    onClick={() => handlePickTeam(teamId)}
                    className={`relative flex-1 min-w-0 flex flex-col items-center gap-1 py-3 rounded-lg transition-all select-none active:scale-95 ${
                      isPicked ? 'opacity-35' : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    {isPicked && (
                      <span className="absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center rounded-sm text-[10px] font-black text-black" style={{ backgroundColor: '#C9A843' }}>
                        {rank + 1}
                      </span>
                    )}
                    <Flag teamId={teamId} size={40} />
                    <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase leading-none">
                      {teamId}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/5 mx-2" />

            {/* Ranglijst */}
            {allPicked ? (
              <Reorder.Group
                axis="y"
                values={dragOrder}
                onReorder={onDragOrderChange}
                className="flex flex-col py-1"
              >
                {dragOrder.map((teamId, idx) => (
                  <RankDragItem key={teamId} teamId={teamId} idx={idx} lang={lang} />
                ))}
              </Reorder.Group>
            ) : (
              <div className="flex flex-col py-1">
                {[0, 1, 2, 3].map((i) => {
                  const teamId = dragOrder[i];
                  const through = i <= 1;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-3 py-2.5 ${i > 0 ? 'border-t border-white/5' : ''}`}
                    >
                      <span className={`text-[11px] font-black w-3 shrink-0 tabular-nums ${through && teamId ? 'text-[#C9A843]' : 'text-slate-600'}`}>
                        {i + 1}
                      </span>
                      {teamId ? (
                        <>
                          <Flag teamId={teamId} size={16} />
                          <span className={`text-[13px] font-semibold uppercase tracking-wide flex-1 truncate ${through ? 'text-slate-200' : 'text-slate-500'}`}>
                            {(() => { const t = teamById(teamId); return t ? getTeamName(t, lang) : teamId; })()}
                          </span>
                        </>
                      ) : (
                        <div className="h-px flex-1 bg-white/10" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <p className="text-[10px] text-slate-500 px-3 pb-2 pt-1">
              {allPicked
                ? msg.simulator.dragHint
                : `${msg.simulator.dragClickOrder} (${dragOrder.length}/4)`}
            </p>
          </>
        ) : (
          /* ── Exact / Winnaar mode ── */
          <>
            <div className="flex flex-col divide-y divide-white/5 px-1">
              {fixtures.map(({ homeId, awayId }) => (
                <MatchInputRow
                  key={`${homeId}-${awayId}`}
                  group={group} homeId={homeId} awayId={awayId}
                  results={results} inputMode={inputMode} onResult={onResult}
                />
              ))}
            </div>

            <div className="px-2 pb-3">
              <StandingsTable standings={standings} bestThirdIds={bestThirdIds} groupColor={color} />
            </div>

            <TiebreakPanel
              tiedGroups={tiedGroups}
              manualOrders={manualOrders}
              onSetManualOrder={onSetManualOrder}
              onClearManual={onClearManual}
            />
          </>
        )}
      </div>
    </div>
  );
}
