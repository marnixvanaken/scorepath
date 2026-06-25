'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useMessages } from '@/hooks/useMessages';
import type { TiedGroup } from '@/lib/tiebreak';
import { tieGroupKey } from '@/hooks/useTiebreakState';
import { teamById, getTeamName } from '@/data/worldcup2026';
import { useParams } from 'next/navigation';
import { Flag } from './Flag';

interface Props {
  tiedGroups: TiedGroup[];
  manualOrders: Record<string, string[]>;
  onSetManualOrder: (groupKey: string, orderedTeamIds: string[]) => void;
  onClearManual: (groupKey: string) => void;
}

// Position labels are locale-aware — accessed via msg.tiebreak.positions
const POSITION_COLORS = ['text-emerald-400', 'text-emerald-400', 'text-[#C9A843]', 'text-slate-500'];

export function TiebreakPanel({ tiedGroups, manualOrders, onSetManualOrder, onClearManual }: Props) {
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const [open, setOpen] = useState(true);
  const relevant = tiedGroups.filter((g) => g.affectsQualification);
  if (relevant.length === 0) return null;

  return (
    <div className="mt-2 rounded-lg border border-[#C9A843]/25 bg-[#C9A843]/5 overflow-hidden">
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[#C9A843] text-[11px]">⚠</span>
        <span className="text-xs font-bold text-[#E2C46A] flex-1 uppercase tracking-wide">
          {msg.tiebreak.title}
        </span>
        <span className="text-slate-500 text-[11px]">{open ? '▲' : '▼'}</span>
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
                      <span className="text-[11px] text-slate-400">
                        {msg.tiebreak.positionPrefix}{' '}
                        {group.positions.map((p) => msg.tiebreak.positions[p] ?? (p + 1)).join(' & ')}{' '}
                        {msg.tiebreak.positionSuffix}{' '}
                        <span className="text-[#C9A843]">
                          {group.positions.some((p) => p >= 2)
                            ? msg.tiebreak.affectsThirds
                            : msg.tiebreak.affectsBracket}
                        </span>
                      </span>
                      {manualOrders[key] && (
                        <button
                          onClick={() => onClearManual(key)}
                          className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors ml-2 shrink-0"
                        >
                          {msg.tiebreak.clear}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {currentOrder.map((teamId, idx) => {
                        const pos = group.positions[0] + idx;
                        const team = teamById(teamId);
                        return (
                          <div key={teamId} className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold w-4 text-right tabular-nums shrink-0 ${POSITION_COLORS[pos]}`}>
                              {msg.tiebreak.positions[pos]}
                            </span>
                            <div className="flex items-center gap-1.5 flex-1 bg-card rounded px-2 py-1.5 min-w-0">
                              <Flag teamId={teamId} size={14} />
                              <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wide truncate">
                                {team ? getTeamName(team, lang) : teamId}
                              </span>
                            </div>
                            <div className="flex gap-0.5 shrink-0">
                              <button
                                onClick={() => moveUp(idx)}
                                disabled={idx === 0}
                                className="w-6 h-6 rounded bg-slate-700/80 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[11px] transition-colors"
                                aria-label={msg.tiebreak.up}
                              >▲</button>
                              <button
                                onClick={() => moveDown(idx)}
                                disabled={idx === currentOrder.length - 1}
                                className="w-6 h-6 rounded bg-slate-700/80 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[11px] transition-colors"
                                aria-label={msg.tiebreak.down}
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
