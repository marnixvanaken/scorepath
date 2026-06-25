'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Reorder, useDragControls } from 'motion/react';
import type { ThirdPlaceRank, GroupId } from '@/lib/types';
import type { MatchResult } from '@/lib/types';
import { teamById, getTeamName } from '@/data/worldcup2026';
import { useParams } from 'next/navigation';
import { isGroupComplete } from '@/lib/standings';
import { tieGroupKey } from '@/hooks/useTiebreakState';
import { Flag } from './Flag';
import { useMessages } from '@/hooks/useMessages';
import type { InputMode } from '@/hooks/useSimulatorState';

interface Props {
  thirds: ThirdPlaceRank[];
  results: MatchResult[];
  inputMode: InputMode;
  manualOrders: Record<string, string[]>;
  onSetManualOrder: (key: string, order: string[]) => void;
  onClearManual: (key: string) => void;
  dragOrders: Record<GroupId, string[]>;
  thirdsDragOrder: GroupId[];
  onThirdsDragChange: (order: GroupId[]) => void;
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

function ThirdsDragItem({
  groupId, idx, dragOrders,
}: {
  groupId: GroupId;
  idx: number;
  dragOrders: Record<GroupId, string[]>;
}) {
  const controls = useDragControls();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const teamId = dragOrders[groupId]?.[2];
  const team = teamId ? teamById(teamId) : null;
  const through = idx < 8;

  return (
    <Reorder.Item
      value={groupId}
      dragListener={false}
      dragControls={controls}
      className={`flex items-center gap-2 px-3 py-2 select-none ${
        idx === 8 ? 'border-t-2 border-dashed border-slate-700/60' : idx > 0 ? 'border-t border-white/5' : ''
      }`}
    >
      <span className={`text-[11px] font-black w-4 text-right tabular-nums shrink-0 ${through ? 'text-[#C9A843]' : 'text-slate-600'}`}>{idx + 1}</span>
      <span className={`text-[11px] font-bold w-4 shrink-0 ${through ? 'text-[#C9A843]' : 'text-slate-600'}`}>{groupId}</span>
      {teamId && <Flag teamId={teamId} size={13} />}
      <span className={`text-[12px] font-semibold uppercase tracking-wide flex-1 truncate ${through ? 'text-[#E2C46A]' : 'text-slate-500'}`}>
        {team ? getTeamName(team, lang) : (teamId ?? '—')}
      </span>
      <div
        onPointerDown={(e) => { e.preventDefault(); controls.start(e); }}
        style={{ touchAction: 'none', cursor: 'grab' }}
        className="p-1.5 -m-1.5 shrink-0 active:cursor-grabbing"
        aria-hidden
      >
        <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className="text-slate-600">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
        </svg>
      </div>
    </Reorder.Item>
  );
}

export function ThirdPlacePanel({
  thirds, results, inputMode, manualOrders, onSetManualOrder, onClearManual,
  dragOrders, thirdsDragOrder, onThirdsDragChange,
}: Props) {
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const sorted = [...thirds].sort((a, b) => a.rank - b.rank);
  const boundary = findBoundaryTie(sorted, results);

  return (
    <section
      className="bg-card rounded-xl shadow-lg shadow-black/40 overflow-hidden"
      style={{ border: '1px solid rgba(201,168,67,0.35)' }}
    >
      {/* Header */}
      <div className="flex items-baseline gap-3 px-3 py-2.5" style={{ borderBottom: '1px solid rgba(201,168,67,0.2)' }}>
        <h2 className="text-sm font-black text-white">{msg.thirds.title}</h2>
        <span className="text-[11px] text-slate-500">{msg.thirds.subtitle}</span>
      </div>

      {/* Drag mode: versleep groepen om top 8 te kiezen */}
      {inputMode === 'drag' ? (
        <>
          <p className="text-[11px] text-slate-500 px-3 pt-2 pb-1">{msg.thirds.dragNote}</p>
          <Reorder.Group
            axis="y"
            values={thirdsDragOrder}
            onReorder={onThirdsDragChange}
            className="flex flex-col py-1"
          >
            {thirdsDragOrder.map((groupId, idx) => (
              <ThirdsDragItem
                key={groupId}
                groupId={groupId as GroupId}
                idx={idx}
                dragOrders={dragOrders}
              />
            ))}
          </Reorder.Group>
        </>
      ) : (
      <>
      {/* Table — horizontaal scrollbaar op mobiel */}
      <div className="overflow-x-auto">
      <div className="min-w-[420px]">

      {/* Table header */}
      <div className="grid grid-cols-[1.5rem_1.5rem_1fr_repeat(8,_1.75rem)] gap-x-0.5 px-3 py-1 bg-panel text-xs font-semibold text-slate-600 uppercase tracking-wider">
        <span className="text-center">#</span>
        <span>Gr</span>
        <span>{msg.table.club}</span>
        <span className="text-center">{msg.table.played}</span>
        <span className="text-center">{msg.table.won}</span>
        <span className="text-center">{msg.table.drawn}</span>
        <span className="text-center">{msg.table.lost}</span>
        <span className="text-center">{msg.table.gf}</span>
        <span className="text-center">{msg.table.ga}</span>
        <span className="text-center">{msg.table.gd}</span>
        <span className="text-center font-bold text-slate-500">{msg.table.points}</span>
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
            ? 'text-[#E2C46A]'
            : 'text-slate-500';

          const ptsCls = isLast8 ? 'text-[#C9A843] font-bold' : 'text-slate-400';

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
                className={`grid grid-cols-[1.5rem_1.5rem_1fr_repeat(8,_1.75rem)] gap-x-0.5 px-3 py-1.5 items-center text-xs ${rowBg} ${i > 0 && !isCutoff ? 'border-t border-white/5' : ''}`}
                style={rowStyle}
              >
                <span className="text-center tabular-nums text-slate-600">{t.rank}</span>
                <span className={`font-bold ${isLast8 ? 'text-[#C9A843]' : 'text-slate-500'}`}>{t.group}</span>
                <span className={`flex items-center gap-1 font-semibold min-w-0 ${nameCls}`}>
                  <Flag teamId={t.teamId} size={14} />
                  <span className="truncate uppercase tracking-wide">{team ? getTeamName(team, lang) : t.teamId}</span>
                </span>
                <span className="text-center tabular-nums text-slate-500">{t.played}</span>
                <span className="text-center tabular-nums text-slate-500">{t.won}</span>
                <span className="text-center tabular-nums text-slate-500">{t.drawn}</span>
                <span className="text-center tabular-nums text-slate-500">{t.lost}</span>
                <span className="text-center tabular-nums text-slate-500">{t.hasScores ? t.gf : '–'}</span>
                <span className="text-center tabular-nums text-slate-500">{t.hasScores ? t.ga : '–'}</span>
                <span className={`text-center tabular-nums font-medium ${t.gd > 0 ? 'text-emerald-500' : t.gd < 0 ? 'text-red-500' : 'text-slate-600'}`}>
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
          <div className="border-t border-[#C9A843]/20 bg-[#C9A843]/5 px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#E2C46A] flex items-center gap-1.5">
                <span className="text-[#C9A843]">⚠</span>
                {msg.thirds.boundaryTie}
              </span>
              {manualOrders[key] && (
                <button
                  onClick={() => onClearManual(key)}
                  className="text-[11px] text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {msg.tiebreak.clear}
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
                    <span className={`text-[11px] font-bold w-5 text-right tabular-nums ${isThrough ? 'text-[#C9A843]' : 'text-slate-600'}`}>
                      {LABELS[absPos]}
                    </span>
                    <div className={`flex items-center gap-1.5 flex-1 rounded px-2 py-1 min-w-0 ${isThrough ? 'bg-[#C9A843]/10' : 'bg-slate-800/40'}`}>
                      <Flag teamId={teamId} size={13} />
                      <span className={`text-[11px] font-semibold uppercase tracking-wide truncate ${isThrough ? 'text-[#E2C46A]' : 'text-slate-500'}`}>
                        {team ? getTeamName(team, lang) : teamId}
                      </span>
                      <span className="text-[11px] text-slate-600 ml-auto shrink-0">
                        {isThrough ? msg.thirds.through : msg.thirds.out}
                      </span>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="w-5 h-5 rounded bg-slate-700 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[11px] transition-colors"
                        aria-label={msg.tiebreak.up}
                      >▲</button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === currentOrder.length - 1}
                        className="w-5 h-5 rounded bg-slate-700 disabled:opacity-20 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-[11px] transition-colors"
                        aria-label={msg.tiebreak.down}
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
      <div className="flex items-center gap-4 px-3 py-2 text-[11px] text-slate-600" style={{ borderTop: '1px solid rgba(201,168,67,0.2)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-[#C9A843] shrink-0" />
          {msg.thirds.best8}
        </span>
        <span className="text-slate-500">{msg.thirds.cutoff}</span>
        <span className="text-slate-500 ml-auto">{msg.thirds.tiebreakNote}</span>
      </div>
      </>
      )}
    </section>
  );
}
