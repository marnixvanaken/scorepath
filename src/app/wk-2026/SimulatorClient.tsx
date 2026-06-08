'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSimulatorState, type InputMode } from '@/hooks/useSimulatorState';
import { useKnockoutState } from '@/hooks/useKnockoutState';
import { useTiebreakState } from '@/hooks/useTiebreakState';
import { computeAllGroups, rankThirdPlaced, getQualifiers, isGroupComplete } from '@/lib/standings';
import { encodeResults } from '@/lib/serialization';
import { encodeKnockout, buildBracket } from '@/lib/bracket';
import { prefillResults } from '@/lib/prefill';
import { GROUP_IDS, groupFixtures, teamById } from '@/data/worldcup2026';
import type { GroupId, Qualifiers, ThirdPlaceRank } from '@/lib/types';
import { useMessages } from '@/hooks/useMessages';
import { GroupCard } from '@/components/GroupCard';
import { ThirdPlacePanel } from '@/components/ThirdPlacePanel';
import { SimulatorHeader } from '@/components/SimulatorHeader';
import { BracketView } from '@/components/BracketView';
import { EmptyState } from '@/components/EmptyState';
import { TeamPickerButton } from '@/components/TeamPickerButton';
import { CompletionModal } from '@/components/CompletionModal';

type View = 'groepsfase' | 'knockout';

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
  const t = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const router = useRouter();
  const { results, inputMode, liveStatus, setResult, setInputMode, reset, prefill, refreshLive } = useSimulatorState(initialMode);
  const { kr, pick, resetKnockout, prefillKnockout } = useKnockoutState();
  const [tbState, tbActions] = useTiebreakState();
  const [view, setView] = useState<View>(initialView);
  const [confirmReset, setConfirmReset] = useState(false);

  // Popup state
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showKnockoutModal, setShowKnockoutModal] = useState(false);
  const groupModalFired = useRef(false);
  const knockoutModalFired = useRef(false);

  // dragOrders start empty; filled as user clicks teams in Volgorde mode
  const [groupDragOrders, setGroupDragOrders] = useState<Record<GroupId, string[]>>(
    () => Object.fromEntries(GROUP_IDS.map((g) => [g, [] as string[]])) as Record<GroupId, string[]>
  );
  const [thirdsDragOrder, setThirdsDragOrder] = useState<GroupId[]>([...GROUP_IDS]);

  const setGroupDragOrder = useCallback((g: GroupId, order: string[]) => {
    setGroupDragOrders((prev) => ({ ...prev, [g]: order }));
  }, []);

  // Simuleer in Volgorde-modus: vul dragOrders in op basis van willekeurige simulatie
  const simulateDrag = useCallback(() => {
    const prefilled = prefillResults();
    const groups = computeAllGroups(prefilled, {}, {});
    GROUP_IDS.forEach((g) => {
      const standing = groups[g];
      if (standing?.length) {
        setGroupDragOrder(g, standing.map((s) => s.teamId));
      }
    });
  }, [setGroupDragOrder]);

  function handleResetRequest() {
    setConfirmReset(true);
  }

  function handleResetConfirm() {
    reset();
    resetKnockout();
    setGroupDragOrders(Object.fromEntries(GROUP_IDS.map((g) => [g, [] as string[]])) as Record<GroupId, string[]>);
    setConfirmReset(false);
    groupModalFired.current = false;
    knockoutModalFired.current = false;
    setShowGroupModal(false);
    setShowKnockoutModal(false);
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

  // Groepsfase voltooid?
  const groupStageComplete = useMemo(() => {
    if (inputMode === 'drag') return GROUP_IDS.every((g) => (groupDragOrders[g]?.length ?? 0) === 4);
    return GROUP_IDS.every((g) => isGroupComplete(results, g));
  }, [inputMode, groupDragOrders, results]);

  // Knockout-winnaar
  const knockoutWinner = useMemo(() => {
    const { final: fm } = buildBracket(qualifiers, kr);
    const slot = kr[fm.id];
    if (!slot) return null;
    return (slot === 1 ? fm.slot1.teamId : fm.slot2.teamId) ?? null;
  }, [qualifiers, kr]);

  // Trigger groepsfase-popup
  useEffect(() => {
    if (view === 'groepsfase' && groupStageComplete && !groupModalFired.current) {
      groupModalFired.current = true;
      setShowGroupModal(true);
    } else if (!groupStageComplete) {
      groupModalFired.current = false;
    }
  }, [groupStageComplete, view]);

  // Trigger knockout-popup
  useEffect(() => {
    if (view === 'knockout' && knockoutWinner && !knockoutModalFired.current) {
      knockoutModalFired.current = true;
      setShowKnockoutModal(true);
    } else if (!knockoutWinner) {
      knockoutModalFired.current = false;
    }
  }, [knockoutWinner, view]);

  return (
    <div className="min-h-dvh bg-themed c-fg">
      <SimulatorHeader
        liveStatus={liveStatus}
        view={view}
        onViewChange={setView}
        onReset={handleResetRequest}
        onPrefill={inputMode === 'drag' ? simulateDrag : prefill}
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
              <span className="text-[12px] text-red-300 font-semibold">{t.simulator.confirmTitle}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-[12px] min-h-[36px] px-3 rounded bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
                >
                  {t.simulator.cancel}
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="text-[12px] min-h-[36px] px-3 rounded bg-red-700 text-white font-semibold hover:bg-red-600 transition-colors"
                >
                  {t.simulator.clear}
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
              <span className="text-xs font-bold c-fg-subtle uppercase tracking-widest shrink-0">{t.simulator.modeLabel}</span>
              <div className="input-mode-toggle flex rounded-lg p-0.5 gap-0.5" role="group" aria-label={t.simulator.inputModeLabel}>
                {(['exact', 'winner', 'drag'] as InputMode[]).map((mode) => (
                  <motion.button
                    key={mode}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInputMode(mode)}
                    aria-pressed={inputMode === mode}
                    className={`px-3 min-h-[36px] flex items-center rounded-md text-xs font-semibold transition-all ${inputMode === mode ? 'mode-active c-fg' : 'c-fg-subtle'}`}
                  >
                    {t.modes[mode]}
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
                {t.simulator.knockoutPhase}
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
                {t.simulator.knockoutHint}{' '}
                <strong style={{ color: 'var(--fg-subtle)' }}>{t.header.prefillKnockout}</strong>
                <span style={{ color: 'var(--fg-subtle)' }}> {t.simulator.prefillAutomatic} </span>
                <strong style={{ color: 'var(--fg-subtle)' }}>{t.header.reset}</strong>
                <span style={{ color: 'var(--fg-subtle)' }}> {t.simulator.resetClearsAll}</span>
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => prefillKnockout(qualifiers)}
                  className="text-[11px] px-2 py-1 rounded transition-opacity hover:opacity-70 font-semibold"
                  style={{ color: 'var(--fg-muted)', background: 'var(--bg-panel)', border: '1px solid var(--border)' }}
                >
                  {t.header.prefillKnockout}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={resetKnockout}
                  className="text-[11px] px-2 py-1 rounded font-semibold transition-opacity hover:opacity-70 text-white bg-red-700 hover:bg-red-600"
                >
                  {t.header.reset}
                </motion.button>
              </div>
            </div>
            <BracketView qualifiers={qualifiers} kr={kr} onPick={pick} encodedS={encodedS} encodedK={encodedK} />
          </div>
        )}
      </main>

      {/* Groepsfase voltooid */}
      <CompletionModal
        visible={showGroupModal}
        title={t.modal.groupComplete}
        description={t.modal.groupCompleteDesc}
        primaryLabel={t.modal.toKnockout}
        secondaryLabel={t.modal.back}
        onPrimary={() => {
          setShowGroupModal(false);
          setView('knockout');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onClose={() => setShowGroupModal(false)}
      />

      {/* Knockout-winnaar */}
      <CompletionModal
        visible={showKnockoutModal}
        title={t.modal.knockoutComplete}
        description={t.modal.knockoutCompleteDesc}
        primaryLabel={t.modal.toCard}
        secondaryLabel={t.modal.back}
        teamId={knockoutWinner}
        onPrimary={() => {
          if (!knockoutWinner) return;
          const cardHref = `/${lang}/wk-2026/card?team=${knockoutWinner}&s=${encodedS}${encodedK ? `&k=${encodedK}` : ''}`;
          router.push(cardHref);
        }}
        onClose={() => setShowKnockoutModal(false)}
      />
    </div>
  );
}
