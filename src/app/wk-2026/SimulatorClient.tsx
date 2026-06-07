'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useSimulatorState, type InputMode } from '@/hooks/useSimulatorState';
import { useKnockoutState } from '@/hooks/useKnockoutState';
import { useTiebreakState } from '@/hooks/useTiebreakState';
import { computeAllGroups, rankThirdPlaced, getQualifiers } from '@/lib/standings';
import { encodeResults } from '@/lib/serialization';
import { encodeKnockout } from '@/lib/bracket';
import { GROUP_IDS } from '@/data/worldcup2026';
import { GroupCard } from '@/components/GroupCard';
import { ThirdPlacePanel } from '@/components/ThirdPlacePanel';
import { SimulatorHeader } from '@/components/SimulatorHeader';
import { BracketView } from '@/components/BracketView';
import { EmptyState } from '@/components/EmptyState';
import { TeamPickerButton } from '@/components/TeamPickerButton';

type View = 'groepsfase' | 'bracket';

export default function SimulatorClient({ initialMode }: { initialMode: InputMode }) {
  const { results, inputMode, liveStatus, setResult, setInputMode, reset, prefill, refreshLive } = useSimulatorState(initialMode);
  const { kr, pick, resetKnockout } = useKnockoutState();
  const [tbState, tbActions] = useTiebreakState();
  const [view, setView] = useState<View>('groepsfase');

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
  const qualifiers = useMemo(
    () => getQualifiers(results, {}, manualOrder),
    [results, manualOrder],
  );

  const encodedS = useMemo(() => encodeResults(results), [results]);
  const encodedK = useMemo(() => encodeKnockout(kr), [kr]);

  return (
    <div className="min-h-dvh" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <SimulatorHeader
        inputMode={inputMode}
        liveStatus={liveStatus}
        view={view}
        onViewChange={setView}
        onInputModeChange={setInputMode}
        onReset={reset}
        onPrefill={prefill}
        onRefreshLive={refreshLive}
      />

      <main className="max-w-7xl mx-auto px-3 py-4 pb-8">
        {view === 'groepsfase' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.length === 0 && <EmptyState onPrefill={prefill} />}
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
                />
              ))}
            </div>
            <div className="mt-4">
              <ThirdPlacePanel
                thirds={thirds}
                results={results}
                manualOrders={tbState.manualOrders}
                onSetManualOrder={tbActions.setManualOrder}
                onClearManual={tbActions.clearManual}
              />
            </div>
          </>
        ) : (
          <div className="rounded-xl p-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
                Klik op een team om door te laten gaan
              </span>
              <div className="flex items-center gap-2">
                <TeamPickerButton s={encodedS} k={encodedK} />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={resetKnockout}
                  className="text-[10px] transition-opacity hover:opacity-70"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  Reset
                </motion.button>
              </div>
            </div>
            <BracketView qualifiers={qualifiers} kr={kr} onPick={pick} />
          </div>
        )}
      </main>
    </div>
  );
}
