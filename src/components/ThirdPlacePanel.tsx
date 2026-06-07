'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { ThirdPlaceRank, GroupId } from '@/lib/types';
import type { MatchResult } from '@/lib/types';
import { teamById } from '@/data/worldcup2026';
import { isGroupComplete } from '@/lib/standings';
import { tieGroupKey } from '@/hooks/useTiebreakState';
import { Flag } from './Flag';
import { NL } from '@/i18n/nl';

interface Props {
  thirds: ThirdPlaceRank[];
  results: MatchResult[];
  manualOrders: Record<string, string[]>;
  onSetManualOrder: (key: string, order: string[]) => void;
  onClearManual: (key: string) => void;
}

// Vindt de groep teams die gelijkstaan rondom de grens (rank 8/9).
// Geeft null als er geen gelijkstand is of de relevante groepen nog niet compleet zijn.
function findBoundaryTie(
  thirds: ThirdPlaceRank[],
  results: MatchResult[],
): { teamIds: string[]; positions: number[] } | null {
  if (thirds.length < 9) return null;

  // Vind alle teams rondom rank 8 met identieke stats
  const ref = thirds[7]; // rank 8 (0-indexed 7)
  const tied = thirds.filter(
    (t) => t.points === ref.points && t.gd === ref.gd && t.gf === ref.gf,
  );

  // Alleen relevant als de gelijkstand de grens raakt (8e én 9e positie beide erin)
  const positions = tied.map((t) => thirds.indexOf(t));
  const crossesBoundary = positions.some((p) => p <= 7) && positions.some((p) => p >= 8);
  if (!crossesBoundary) return null;

  // Controleer of alle groepen van de gelijkstaande teams compleet zijn
  const allComplete = tied.every((t) => isGroupComplete(results, t.group as GroupId));
  if (!allComplete) return null;

  return { teamIds: tied.map((t) => t.teamId), positions };
}

export function ThirdPlacePanel({ thirds, results, manualOrders, onSetManualOrder, onClearManual }: Props) {
  const sorted = [...thirds].sort((a, b) => a.rank - b.rank);
  const boundary = findBoundaryTie(sorted, results);

  return (
    <section
      className="bg-[--color-wk-card] rounded-xl shadow-lg shadow-black/40 overflow-hidden"
      style={{ border: '1px solid rgba(201,168,67,0.35)' }}
    >
      {/* Header */}
      <div className="flex items-baseline gap-3 px-3 py-2.5" style={{ borderBottom: '1px solid rgba(201,168,67,0.2)' }}>
        <h2 className="text-sm font-black text-white">{NL.thirds.title}</h2>
        <span className="text-[10px] text-slate-500">{NL.thirds.subtitle}</span>
      </div>

      {/* Table — horizontaal scrollbaar op mobiel */}
      <div className="overflow-x-auto">
      <div className="min-w-[420px]">

      {/* Table header */}
      <div className="grid grid-cols-[1.5rem_1.5rem_1fr_repeat(8,_1.75rem)] gap-x-0.5 px-3 py-1 bg-[--color-wk-panel] text-[9px] font-semibold text-slate-600 uppercase tracking-wider">
        <span className="text-center">#</span>
        <span>Gr</span>
        <span>{NL.table.club}</span>
        <span className="text-center">{NL.table.played}</span>
        <span className="text-center">{NL.table.won}</span>
        <span className="text-center">{NL.table.drawn}</span>
        <span className="text-center">{NL.table.lost}</span>
        <span className="text-center">{NL.table.gf}</span>
        <span className="text-center">{NL.table.ga}</span>
        <span className="text-center">{NL.table.gd}</span>
        <span className="text-center font-bold text-slate-500">{NL.table.points}</span>
      </div>

      {/* Rows */}
      <AnimatePresence mode="popLayout" initial={false}>
        {sorted.map((t, i) => {
          const team = teamById(t.teamId);
          const isNed = t.teamId === 'NED';
          const isLast8 = t.advances;
          const isCutoff = i === 8; // grens na 8e (0-indexed), dus tussen rank 8 en 9

          const rowBg = 'border-l-2';
          const rowStyle: React.CSSProperties = isLast8
            ? { borderLeftColor: 'rgba(201,168,67,1)', backgroundColor: 'rgba(201,168,67,0.06)' }
            : { borderLeftColor: 'transparent' };

          const nameCls = isNed
            ? 'text-orange-400'
            : isLast8
            ? 'text-[--color-wk-gold-lt]'
            : 'text-slate-500';

          const ptsCls = isLast8 ? 'text-[--color-wk-gold] font-bold' : 'text-slate-400';

          return (
            <motion.div
              key={t.teamId}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            >
              {isCutoff && (
                <div className="border-t-2 border-dashed border-slate-700/60 mx-3 my-0" />
              )}
              <div
                className={`grid grid-cols-[1.5rem_1.5rem_1fr_repeat(8,_1.75rem)] gap-x-0.5 px-3 py-1.5 items-center text-[11px] ${rowBg} ${i > 0 && !isCutoff ? 'border-t border-white/5' : ''}`}
                style={rowStyle}
              >
                {t.rank <= 3 ? (
                  <span className="text-center text-[11px]" title={`Rank ${t.rank}`}>
                    {t.rank === 1 ? '🥇' : t.rank === 2 ? '🥈' : '🥉'}
                  </span>
                ) : (
                  <span className="text-center tabular-nums text-slate-600 text-[9px]">{t.rank}</span>
                )}
                <span className={`text-[9px] font-bold ${isLast8 ? 'text-[--color-wk-gold]' : 'text-slate-700'}`}>{t.group}</span>
                <span className={`flex items-center gap-1 font-semibold min-w-0 ${nameCls}`}>
                  <Flag teamId={t.teamId} size={14} />
                  <span className="truncate uppercase tracking-wide">{team?.name ?? t.teamId}</span>
                </span>
                <span className="text-center tabular-nums text-slate-500">{t.played}</span>
                <span className="text-center tabular-nums text-slate-500">{t.won}</span>
                <span className="text-center tabular-nums text-slate-500">{t.drawn}</span>
                <span className="text-center tabular-nums text-slate-500">{t.lost}</span>
                <span className="text-center tabular-nums text-slate-500">{t.hasScores ? t.gf : '–'}</span>
                <span className="text-center tabular-nums text-slate-500">{t.hasScores ? t.ga : '–'}</span>
                <span className={`text-center tabular-nums text-[10px] font-medium ${t.gd > 0 ? 'text-emerald-500' : t.gd < 0 ? 'text-red-500' : 'text-slate-600'}`}>
                  {t.played > 0 ? (t.gd > 0 ? `+${t.gd}` : t.gd) : '–'}
                </span>
                <span className={`text-center tabular-nums font-bold ${ptsCls}`}>{t.points}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      </div>{/* min-w */}
      </div>{/* overflow-x-auto */}

      {/* Boundary tiebreaker */}
      {boundary && (() => {
        const key = tieGroupKey(boundary.teamIds);
        const currentOrder = manualOrders[key] ?? boundary.teamIds;
        const LABELS = ['1e', '2e', '3e', '4e', '5e', '6e', '7e', '8e', '9e', '10e', '11e', '12e'];

        function moveUp(idx: number) {
          if (idx === 0) return;
          const next = [...currentOrder];
          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
          onSetManualOrder(key, next);
        }
        function moveDown(idx: number) {
          if (idx === currentOrder.length - 1) return;
          const next = [...currentOrder];
          [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
          onSetManualOrder(key, next);
        }

        return (
          <div className="border-t border-[--color-wk-gold]/20 bg-[--color-wk-gold]/5 px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[--color-wk-gold-lt] flex items-center gap-1.5">
                <span className="text-[--color-wk-gold]">⚠</span>
                Gelijkstand op de grens — kies wie doorgaat
              </span>
              {manualOrders[key] && (
                <button
                  onClick={() => onClearManual(key)}
                  className="text-[9px] text-slate-600 hover:text-slate-400 transition-colors"
                >
                  Wissen
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {currentOrder.map((teamId, idx) => {
                const absPos = boundary.positions[0] + idx; // 0-indexed rank
                const isThrough = absPos < 8;
                const team = teamById(teamId);
                return (
                  <div key={teamId} className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold w-5 text-right tabular-nums ${isThrough ? 'text-[--color-wk-gold]' : 'text-slate-600'}`}>
                      {LABELS[absPos]}
                    </span>
                    <div className={`flex items-center gap-1.5 flex-1 rounded px-2 py-1 min-w-0 ${isThrough ? 'bg-[--color-wk-gold]/10' : 'bg-slate-800/40'}`}>
                      <Flag teamId={teamId} size={13} />
                      <span className={`text-[11px] font-semibold uppercase tracking-wide truncate ${isThrough ? 'text-[--color-wk-gold-lt]' : 'text-slate-500'}`}>
                        {team?.name ?? teamId}
                      </span>
                      <span className="text-[9px] text-slate-600 ml-auto shrink-0">
                        {isThrough ? '✓ door' : '✗ uit'}
                      </span>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="w-5 h-5 rounded bg-slate-700 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[10px] transition-colors"
                        aria-label="Omhoog"
                      >▲</button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === currentOrder.length - 1}
                        className="w-5 h-5 rounded bg-slate-700 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[10px] transition-colors"
                        aria-label="Omlaag"
                      >▼</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Legend */}
      <div className="flex items-center gap-4 px-3 py-2 text-[9px] text-slate-600" style={{ borderTop: '1px solid rgba(201,168,67,0.2)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-[--color-wk-gold] shrink-0" />
          Beste 8 door naar R32
        </span>
        <span className="text-slate-700">– – –  cutoff</span>
        <span className="text-slate-700 ml-auto">Tiebreak: Ptn → +/- → DV | Fair play niet meegenomen</span>
      </div>
    </section>
  );
}
