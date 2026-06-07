'use client';

import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSimulatorState, type InputMode } from '@/hooks/useSimulatorState';
import { useKnockoutState } from '@/hooks/useKnockoutState';
import { useTiebreakState } from '@/hooks/useTiebreakState';
import { computeAllGroups, rankThirdPlaced, getQualifiers } from '@/lib/standings';
import { encodeResults } from '@/lib/serialization';
import { encodeKnockout } from '@/lib/bracket';
import { GROUP_IDS, GROUP_IDS as ALL_GROUPS, groupFixtures, teamById } from '@/data/worldcup2026';
import type { GroupId, Qualifiers, ThirdPlaceRank } from '@/lib/types';
import { NL } from '@/i18n/nl';
import { GroupCard } from '@/components/GroupCard';
import { ThirdPlacePanel } from '@/components/ThirdPlacePanel';
import { SimulatorHeader } from '@/components/SimulatorHeader';
import { BracketView } from '@/components/BracketView';
import { EmptyState } from '@/components/EmptyState';
import { TeamPickerButton } from '@/components/TeamPickerButton';

type View = 'groepsfase' | 'knockout';

function getGroupTeams(g: GroupId): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const { homeId, awayId } of groupFixtures(g)) {
    if (!seen.has(homeId)) { seen.add(homeId); result.push(homeId); }
    if (!seen.has(awayId)) { seen.add(awayId); result.push(awayId); }
  }
  return result;
}

function getDragQualifiers(
  dragOrders: Record<GroupId, string[]>,
  thirdsDragOrder: GroupId[],
): Qualifiers {
  const winners = GROUP_IDS.map((g) => ({ group: g, teamId: dragOrders[g]?.[0] ?? '' }));
  const runnersUp = GROUP_IDS.map((g) => ({ group: g, teamId: dragOrders[g]?.[1] ?? '' }));
  const bestThirds: ThirdPlaceRank[] = thirdsDragOrder.slice(0, 8).map((g, i) => ({
    teamId: dragOrders[g]?.[2] ?? '',
    group: g,
    rank: i + 1,
    advances: true,
    played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, hasScores: false,
  })).filter((t) => t.teamId !== '');
  return { winners, runnersUp, bestThirds };
}

export default function SimulatorClient({ initialMode, initialView = 'groepsfase' }: { initialMode: InputMode; initialView?: 'groepsfase' | 'knockout' }) {
  const { results, inputMode, liveStatus, setResult, setInputMode, reset, prefill, refreshLive } = useSimulatorState(initialMode);
  const { kr, pick, resetKnockout, prefillKnockout } = useKnockoutState();
  const [tbState, tbActions] = useTiebreakState();
  const [view, setView] = useState<View>(initialView);
  const [confirmReset, setConfirmReset] = useState(false);

  const [groupDragOrders, setGroupDragOrders] = useState<Record<GroupId, string[]>>(() =>
    Object.fromEntries(GROUP_IDS.map((g) => [g, getGroupTeams(g)])) as Record<GroupId, string[]>
  );
  const [thirdsDragOrder, setThirdsDragOrder] = useState<GroupId[]>([...GROUP_IDS]);

  const setGroupDragOrder = useCallback((g: GroupId, order: string[]) => {
    setGroupDragOrders((prev) => ({ ...prev, [g]: order }));
  }, []);

  function handleResetRequest() {
    setConfirmReset(true);
  }

  function handleResetConfirm() {
    reset();
    resetKnockout();
    setConfirmReset(false);
  }

  const manualOrder = useMemo(
    () => Object.fromEntries(
      Object.values(tbState.manualOrders).flatMap((order) => order.map((id, i) => [id, i]))
    ),
    [tbState.manualOrders],
  );

  const allGroups = useMemo(
    () => computeAllGroups(results, {}, manualOrder),
    [results, manualOrder],
  );

  const thirds = useMemo(() => rankThirdPlaced(allGroups), [allGroups]);
  const bestThirdIds = useMemo(
    () => new Set(thirds.filter((t) => t.advances).map((t) => t.teamId)),
    [thirds],
  );

  const qualifiers = useMemo(() => {
    if (inputMode === 'drag') return getDragQualifiers(groupDragOrders, thirdsDragOrder);
    return getQualifiers(results, {}, manualOrder);
  }, [inputMode, results, manualOrder, groupDragOrders, thirdsDragOrder]);

  const encodedS = useMemo(() => encodeResults(results), [results]);
  const encodedK = useMemo(() => encodeKnockout(kr), [kr]);

  return (
    <div className="min-h-dvh bg-themed c-fg">
      <SimulatorHeader
        inputMode={inputMode}
        liveStatus={liveStatus}
        view={view}
        onViewChange={setView}
        onReset={handleResetRequest}
        onPrefill={prefill}
        onPrefillKnockout={() => prefillKnockout(qualifiers)}
        onRefreshLive={refreshLive}
      />

      {/* Reset bevestigingsbalk */}
      <AnimatePresence>
        {confirmReset && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="overflow-hidden bg-red-950/80 border-b border-red-900/60"
          >
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
              <span className="text-[12px] text-red-300 font-semibold">Alle ingevoerde data wissen?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-[12px] min-h-[36px] px-3 rounded bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
                >
                  Annuleer
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="text-[12px] min-h-[36px] px-3 rounded bg-red-700 text-white font-semibold hover:bg-red-600 transition-colors"
                >
                  Wissen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-3 py-4 pb-8">
        {view === 'groepsfase' ? (
          <>
            {/* Mode selector */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold c-fg-subtle uppercase tracking-widest shrink-0">Modus</span>
              <div className="input-mode-toggle flex rounded-lg p-0.5 gap-0.5" role="group" aria-label="Invoermodus">
                {(['exact', 'winner', 'drag'] as InputMode[]).map((mode) => (
                  <motion.button
                    key={mode}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInputMode(mode)}
                    aria-pressed={inputMode === mode}
                    className={`px-3 min-h-[36px] flex items-center rounded-md text-xs font-semibold transition-all ${inputMode === mode ? 'mode-active c-fg' : 'c-fg-subtle'}`}
                  >
                    {NL.modes[mode]}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.length === 0 && inputMode !== 'drag' && <EmptyState onPrefill={prefill} />}
              {GROUP_IDS.map((g) => (
                <GroupCard
                  key={g}
                  group={g}
                  standings={allGroups[g]}
                  results={results}
                  inputMode={inputMode}
                  bestThirdIds={bestThirdIds}
                  onResult={setResult}
                  manualOrders={tbState.manualOrders}
                  onSetManualOrder={tbActions.setManualOrder}
                  onClearManual={tbActions.clearManual}
                  dragOrder={groupDragOrders[g] ?? []}
                  onDragOrderChange={(order) => setGroupDragOrder(g, order)}
                />
              ))}
            </div>
            <div className="mt-4">
              <ThirdPlacePanel
                thirds={thirds}
                results={results}
                inputMode={inputMode}
                manualOrders={tbState.manualOrders}
                onSetManualOrder={tbActions.setManualOrder}
                onClearManual={tbActions.clearManual}
                dragOrders={groupDragOrders}
                thirdsDragOrder={thirdsDragOrder}
                onThirdsDragChange={setThirdsDragOrder}
              />
            </div>

            {/* Knock-out CTA */}
            <div className="mt-8 flex justify-center">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setView('knockout'); }}
                className="inline-flex items-center gap-3 font-display tracking-widest text-white bg-[#D93B1F] hover:bg-[#C42F15] active:opacity-80 transition-colors"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                  borderRadius: '0 12px 0 12px',
                }}
              >
                KNOCK-OUT FASE
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </>
        ) : (
          <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="text-[11px] leading-5" style={{ color: 'var(--fg-muted)' }}>
                Klik op een team om het door te laten gaan — klik opnieuw om te wissen.{' '}
                <strong style={{ color: 'var(--fg-subtle)' }}>Simuleer</strong>
                <span style={{ color: 'var(--fg-subtle)' }}> vult automatisch in. </span>
                <strong style={{ color: 'var(--fg-subtle)' }}>Reset</strong>
                <span style={{ color: 'var(--fg-subtle)' }}> wist alle keuzes.</span>
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => prefillKnockout(qualifiers)}
                  className="text-[11px] px-2 py-1 rounded transition-opacity hover:opacity-70 font-semibold"
                  style={{ color: 'var(--fg-muted)', background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
                >
                  Simuleer
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={resetKnockout}
                  className="text-[11px] transition-opacity hover:opacity-70"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  Reset
                </motion.button>
              </div>
            </div>
            <BracketView qualifiers={qualifiers} kr={kr} onPick={pick} encodedS={encodedS} encodedK={encodedK} />
          </div>
        )}
      </main>
    </div>
  );
}
