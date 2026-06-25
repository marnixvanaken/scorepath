'use client';

import { motion } from 'motion/react';
import type { MatchResult, GroupId } from '@/lib/types';
import { teamById, GROUP_COLORS, getTeamName } from '@/data/worldcup2026';
import { getResultForMatch, type InputMode } from '@/hooks/useSimulatorState';
import { useParams } from 'next/navigation';
import { Flag } from './Flag';
import { useMessages } from '@/hooks/useMessages';

interface Props {
  group: GroupId;
  homeId: string;
  awayId: string;
  results: MatchResult[];
  inputMode: InputMode;
  onResult: (r: MatchResult) => void;
}

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 shrink-0">
      <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z"/>
    </svg>
  );
}

// Vaste grid: [slot(10px)] [vlag] [naam flex-1] [score/inputs] [naam flex-1] [vlag]
const ROW_GRID = 'grid items-center gap-x-2 py-2 px-2';
const GRID_COLS = { gridTemplateColumns: '10px 32px 1fr auto 1fr 32px' };

export function MatchInputRow({ group, homeId, awayId, results, inputMode, onResult }: Props) {
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const home = teamById(homeId)!;
  const away = teamById(awayId)!;
  const current = getResultForMatch(results, group, homeId, awayId);
  const groupColor = GROUP_COLORS[group];
  const isNed = (id: string) => id === 'NED';

  function handleGoal(side: 'home' | 'away', value: string) {
    const n = parseInt(value, 10);
    if (isNaN(n) || n < 0 || n > 20) return;
    const base = current ?? { group, homeId, awayId };
    onResult({ ...base, [side === 'home' ? 'homeGoals' : 'awayGoals']: n, outcome: undefined });
  }

  function handleOutcome(o: 'H' | 'D' | 'A') {
    onResult({ group, homeId, awayId, outcome: o });
  }

  const nameCls = (id: string) =>
    `text-[14px] font-semibold uppercase tracking-wide truncate ${isNed(id) ? 'text-orange-400' : 'text-slate-200'}`;

  const homeName = <span className={`${nameCls(homeId)} text-right`}>{getTeamName(home, lang)}</span>;
  const awayName = <span className={nameCls(awayId)}>{getTeamName(away, lang)}</span>;

  if (current?.locked) {
    return (
      <div className={`${ROW_GRID} opacity-75`} style={GRID_COLS}>
        <LockIcon />
        <Flag teamId={homeId} size={32} />
        {homeName}
        <div className="flex items-center gap-1">
          <span className="w-11 h-11 flex items-center justify-center text-base font-bold tabular-nums text-slate-300 bg-panel rounded border border-themed">
            {current.homeGoals}
          </span>
          <span className="text-slate-600 text-[11px]">–</span>
          <span className="w-11 h-11 flex items-center justify-center text-base font-bold tabular-nums text-slate-300 bg-panel rounded border border-themed">
            {current.awayGoals}
          </span>
        </div>
        {awayName}
        <Flag teamId={awayId} size={32} />
      </div>
    );
  }

  const homeGoals = current?.homeGoals;
  const awayGoals = current?.awayGoals;
  const outcome = current?.outcome;

  // Exact: numeric score inputs — font-size 1rem (16px) prevents iOS auto-zoom
  const inputCls = 'w-11 h-11 bg-panel border border-themed rounded text-center font-bold tabular-nums text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent transition-colors';

  const scoreArea = inputMode === 'exact' ? (
    <div className="flex items-center gap-1">
      <input
        type="number" min={0} max={20} inputMode="numeric"
        value={homeGoals ?? ''}
        onChange={(e) => handleGoal('home', e.target.value)}
        placeholder="–"
        className={inputCls}
        style={{ fontSize: '1rem', lineHeight: 1, '--tw-ring-color': groupColor } as React.CSSProperties}
        onFocus={(e) => { e.currentTarget.style.borderColor = groupColor; e.currentTarget.select(); }}
        onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
        onWheel={(e) => e.currentTarget.blur()}
        aria-label={`${getTeamName(home, lang)} ${msg.table.goalsLabel}`}
      />
      <span className="text-slate-600 text-[11px]">–</span>
      <input
        type="number" min={0} max={20} inputMode="numeric"
        value={awayGoals ?? ''}
        onChange={(e) => handleGoal('away', e.target.value)}
        placeholder="–"
        className={inputCls}
        style={{ fontSize: '1rem', lineHeight: 1 }}
        onFocus={(e) => { e.currentTarget.style.borderColor = groupColor; e.currentTarget.select(); }}
        onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
        onWheel={(e) => e.currentTarget.blur()}
        aria-label={`${getTeamName(away, lang)} ${msg.table.goalsLabel}`}
      />
    </div>
  ) : (
    <div className="flex items-center gap-0.5" role="group" aria-label={`${homeId} vs ${awayId}`}>
      {(['H', 'D', 'A'] as const).map((o) => {
        // 1/X/2 notation (TOTO-stijl)
        const label = o === 'H' ? '1' : o === 'D' ? 'X' : '2';
        const active = outcome === o;
        return (
          <motion.button
            key={o} whileTap={{ scale: 0.9 }}
            onClick={() => handleOutcome(o)}
            aria-pressed={active}
            className={`w-11 h-11 rounded text-[13px] font-bold transition-all ${
              active ? 'text-white' : 'bg-panel text-slate-500 hover:text-slate-200'
            }`}
            style={active ? { backgroundColor: o === 'H' ? groupColor : o === 'D' ? '#475569' : '#7f1d1d' } : {}}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <div className={ROW_GRID} style={GRID_COLS}>
      <span />
      <Flag teamId={homeId} size={32} />
      {homeName}
      {scoreArea}
      {awayName}
      <Flag teamId={awayId} size={32} />
    </div>
  );
}
