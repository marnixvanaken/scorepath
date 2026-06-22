'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { Standing } from '@/lib/types';
import { teamById, getTeamName } from '@/data/worldcup2026';
import { CONFIRMED_QUALIFIED } from '@/lib/bracket';
import { useParams } from 'next/navigation';
import { Flag } from './Flag';
import { Tooltip } from './Tooltip';
import { useMessages } from '@/hooks/useMessages';

interface Props {
  standings: Standing[];
  bestThirdIds: Set<string>;
  groupColor?: string;
}

export function StandingsTable({ standings, bestThirdIds, groupColor }: Props) {
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const groupComplete = standings.length === 4 && standings.every((s) => s.played === 3);

  return (
    <div className="mt-3 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1.25rem_1fr_repeat(5,_1.5rem)] px-1.5 py-1 bg-panel/80 text-xs font-semibold text-slate-600 uppercase tracking-wider">
        <span />
        <span>{msg.table.club}</span>
        <Tooltip text={msg.table.playedFull} className="text-center">{msg.table.played}</Tooltip>
        <Tooltip text={msg.table.wonFull} className="text-center">{msg.table.won}</Tooltip>
        <Tooltip text={msg.table.lostFull} className="text-center">{msg.table.lost}</Tooltip>
        <Tooltip text={msg.table.gdFull} className="text-center">{msg.table.gd}</Tooltip>
        <Tooltip text={msg.table.pointsFull} className="text-center font-bold text-slate-500">{msg.table.points}</Tooltip>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {standings.map((s, i) => {
          const team = teamById(s.teamId);
          const advances = i < 2 || (i === 2 && bestThirdIds.has(s.teamId));
          const isNed = s.teamId === 'NED';
          // Landen die in werkelijkheid al geplaatst zijn (GER/MEX/USA). Tonen we
          // als gouden vinkje zolang de groep nog niet volledig is gesimuleerd;
          // daarna nemen de normale ✓/?/✗-badges het over.
          const isConfirmed = !groupComplete && CONFIRMED_QUALIFIED.has(s.teamId);

          const statusBar = advances ? 'border-l-2' : 'border-l-2 border-transparent';
          const statusBarStyle = advances ? { borderLeftColor: groupColor ?? '#22c55e' } : {};

          const nameCls = isNed ? 'text-orange-400' : advances ? 'text-slate-100' : 'text-slate-500';
          const ptsCls = advances ? 'font-bold' : 'text-slate-400';

          return (
            <motion.div
              key={s.teamId}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              className={`grid grid-cols-[1.25rem_1fr_repeat(5,_1.5rem)] px-2 py-2 items-center text-[13px] ${statusBar} ${i > 0 ? 'border-t border-white/5' : ''}`}
              style={statusBarStyle}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold tabular-nums shrink-0 ${
                  i < 2 ? 'text-white' : i === 2 ? 'bg-amber-500/20 text-amber-400' : 'text-slate-600'
                }`}
                style={i < 2 ? { backgroundColor: groupColor ?? '#22c55e' } : undefined}
              >
                {i + 1}
              </span>
              <span className={`flex items-center gap-1.5 font-semibold min-w-0 ${nameCls}`}>
                <Flag teamId={s.teamId} size={26} />
                <span className="truncate uppercase text-[13px] tracking-wide">{team ? getTeamName(team, lang) : s.teamId}</span>
                {isConfirmed && (
                  <Tooltip text={msg.status.confirmed}>
                    <span
                      className="shrink-0 text-[11px] font-bold px-1 py-0.5 rounded leading-none flex items-center"
                      style={{ backgroundColor: '#C9A84326', color: '#C9A843' }}
                      aria-label={msg.status.confirmed}
                    >
                      ✓
                    </span>
                  </Tooltip>
                )}
                {groupComplete && (
                  <span className={`shrink-0 text-[11px] font-bold px-1 py-0.5 rounded leading-none ${
                    i < 2
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : i === 2
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-slate-700/50 text-slate-600'
                  }`}>
                    {i < 2 ? '✓' : i === 2 ? '?' : '✗'}
                  </span>
                )}
              </span>
              <span className="text-center tabular-nums text-slate-500">{s.played}</span>
              <span className="text-center tabular-nums text-slate-500">{s.won}</span>
              <span className="text-center tabular-nums text-slate-500">{s.lost}</span>
              <span className={`text-center tabular-nums text-[11px] ${s.gd > 0 ? 'text-emerald-500' : s.gd < 0 ? 'text-red-500' : 'text-slate-600'}`}>
                {s.played > 0 ? (s.gd > 0 ? `+${s.gd}` : s.gd) : '–'}
              </span>
              <span className={`text-center tabular-nums font-bold ${ptsCls}`}>{s.points}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
