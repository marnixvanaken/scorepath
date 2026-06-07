'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { TiedGroup } from '@/lib/tiebreak';
import { tieGroupKey } from '@/hooks/useTiebreakState';
import { teamById } from '@/data/worldcup2026';
import { Flag } from './Flag';

interface Props {
  tiedGroups: TiedGroup[];
  manualOrders: Record<string, string[]>;
  onSetManualOrder: (groupKey: string, orderedTeamIds: string[]) => void;
  onClearManual: (groupKey: string) => void;
}

const POSITION_LABELS = ['1e', '2e', '3e', '4e'];
const POSITION_COLORS = ['text-emerald-400', 'text-emerald-400', 'text-[--color-wk-gold]', 'text-slate-500'];

export function TiebreakPanel({ tiedGroups, manualOrders, onSetManualOrder, onClearManual }: Props) {
  const [open, setOpen] = useState(true);
  const relevant = tiedGroups.filter((g) => g.affectsQualification);
  if (relevant.length === 0) return null;

  return (
    <div className="mt-2 rounded-lg border border-[--color-wk-gold]/25 bg-[--color-wk-gold]/5 overflow-hidden">
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[--color-wk-gold] text-[11px]">⚠</span>
        <span className="text-xs font-bold text-[--color-wk-gold-lt] flex-1 uppercase tracking-wide">
          Gelijkstand — kies volgorde
        </span>
        <span className="text-slate-500 text-[10px]">{open ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-3 pb-3 flex flex-col gap-3">
              {relevant.map((group) => {
                const key = tieGroupKey(group.teamIds);
                const currentOrder = manualOrders[key] ?? group.teamIds;

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
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-slate-400">
                        Positie {group.positions.map((p) => POSITION_LABELS[p]).join(' & ')} gelijk —{' '}
                        <span className="text-[--color-wk-gold]">
                          {group.positions.some((p) => p >= 2)
                            ? 'bepaalt wie naar nummers 3 gaat'
                            : 'bepaalt bracketpositie'}
                        </span>
                      </span>
                      {manualOrders[key] && (
                        <button
                          onClick={() => onClearManual(key)}
                          className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors ml-2 shrink-0"
                        >
                          Wissen
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {currentOrder.map((teamId, idx) => {
                        const pos = group.positions[0] + idx;
                        const team = teamById(teamId);
                        return (
                          <div key={teamId} className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold w-4 text-right tabular-nums shrink-0 ${POSITION_COLORS[pos]}`}>
                              {POSITION_LABELS[pos]}
                            </span>
                            <div className="flex items-center gap-1.5 flex-1 bg-[--color-wk-card] rounded px-2 py-1.5 min-w-0">
                              <Flag teamId={teamId} size={14} />
                              <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wide truncate">
                                {team?.name ?? teamId}
                              </span>
                            </div>
                            <div className="flex gap-0.5 shrink-0">
                              <button
                                onClick={() => moveUp(idx)}
                                disabled={idx === 0}
                                className="w-6 h-6 rounded bg-slate-700/80 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[10px] transition-colors"
                                aria-label="Omhoog"
                              >▲</button>
                              <button
                                onClick={() => moveDown(idx)}
                                disabled={idx === currentOrder.length - 1}
                                className="w-6 h-6 rounded bg-slate-700/80 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[10px] transition-colors"
                                aria-label="Omlaag"
                              >▼</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
