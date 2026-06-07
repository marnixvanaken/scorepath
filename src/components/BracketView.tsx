'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import type { BracketMatch, KnockoutResults } from '@/lib/bracket';
import type { Qualifiers } from '@/lib/types';
import { buildBracket } from '@/lib/bracket';
import { teamById } from '@/data/worldcup2026';
import { Flag } from './Flag';

// ── Atoms ────────────────────────────────────────────────────────────────────

interface SlotProps {
  slot: BracketMatch['slot1'];
  slotNum: 1 | 2;
  matchId: string;
  winner: 1 | 2 | undefined;
  onPick: (matchId: string, slot: 1 | 2) => void;
}

function TeamSlot({ slot, slotNum, matchId, winner, onPick }: SlotProps) {
  const team = slot.teamId ? teamById(slot.teamId) : null;
  const isNed = slot.teamId === 'NED';
  const isWinner = winner === slotNum;
  const isLoser = winner !== undefined && winner !== slotNum;
  const canPick = !!slot.teamId;

  return (
    <motion.button
      whileTap={canPick ? { scale: 0.97 } : undefined}
      onClick={() => canPick && onPick(matchId, slotNum)}
      disabled={!canPick}
      aria-pressed={isWinner}
      className={`flex items-center gap-1.5 h-[26px] px-2 w-full text-left transition-colors min-w-0 ${
        canPick ? 'cursor-pointer' : 'cursor-default'
      } ${
        isWinner
          ? 'bg-emerald-900/60'
          : isLoser
          ? 'opacity-25'
          : canPick
          ? 'hover:bg-white/5'
          : ''
      }`}
    >
      {slot.teamId ? (
        <>
          <Flag teamId={slot.teamId} size={13} />
          <span className={`text-[11px] font-semibold uppercase tracking-wide truncate leading-none flex-1 ${
            isNed ? 'text-orange-400' : isWinner ? 'text-emerald-300' : 'text-slate-200'
          }`}>
            {team?.name ?? slot.teamId}
          </span>
          {isWinner && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400 shrink-0" aria-hidden>
              <polyline points="20 6 9 17 4 12" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round"/>
            </svg>
          )}
        </>
      ) : (
        <span className="text-[10px] text-slate-600 truncate leading-none font-bold uppercase tracking-wider">{slot.label}</span>
      )}
    </motion.button>
  );
}

function MatchBox({
  match,
  highlight,
  kr,
  onPick,
}: {
  match: BracketMatch;
  highlight?: boolean;
  kr: KnockoutResults;
  onPick: (matchId: string, slot: 1 | 2) => void;
}) {
  const known = match.slot1.teamId || match.slot2.teamId;
  const winner = kr[match.id];
  return (
    <div className={`w-[10rem] shrink-0 overflow-hidden border ${
      highlight
        ? 'border-[--color-wk-gold] bg-[--color-wk-card]'
        : known
        ? 'border-[--color-wk-gold]/35 bg-[--color-wk-card]'
        : 'border-[--color-wk-gold]/10 bg-[--color-wk-panel]/50'
    }`} style={{ borderRadius: '0 6px 0 6px' }}>
      <TeamSlot slot={match.slot1} slotNum={1} matchId={match.id} winner={winner} onPick={onPick} />
      <div className="border-t border-white/5" />
      <TeamSlot slot={match.slot2} slotNum={2} matchId={match.id} winner={winner} onPick={onPick} />
    </div>
  );
}

// ── Connector: vertic line + 2 horizontal branches ───────────────────────────

function Connector() {
  return <div className="shrink-0 self-stretch" style={{ width: 10 }} />;
}

// ── BracketGroup: 2 left children → connector → 1 right child ─────────────

function BG({ a, b, right, gap = 6 }: {
  a: React.ReactNode;
  b: React.ReactNode;
  right: React.ReactNode;
  gap?: number;
}) {
  return (
    <div className="flex items-stretch">
      <div className="flex flex-col" style={{ gap }}>
        {a}
        {b}
      </div>
      <Connector />
      <div className="flex items-center">
        {right}
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

const ROUNDS = ['R32', '1/16e finale', 'Kwartfinale', 'Halve finale', 'Finale'];
const COL_W = 160;
const CONN_W = 10;

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  qualifiers: Qualifiers;
  kr: KnockoutResults;
  onPick: (matchId: string, slot: 1 | 2) => void;
}

export function BracketView({ qualifiers, kr, onPick }: Props) {
  const { r32, r16, qf, sf, final } = useMemo(
    () => buildBracket(qualifiers, kr),
    [qualifiers, kr],
  );

  function mk(m: BracketMatch) {
    const hasNed = m.slot1.teamId === 'NED' || m.slot2.teamId === 'NED';
    return <MatchBox key={m.id} match={m} highlight={hasNed} kr={kr} onPick={onPick} />;
  }

  function branch(r32i: number, r16i: number, qfi: number) {
    return (
      <BG gap={6}
        a={<BG gap={6} a={mk(r32[r32i])} b={mk(r32[r32i + 1])} right={mk(r16[r16i])} />}
        b={<BG gap={6} a={mk(r32[r32i + 2])} b={mk(r32[r32i + 3])} right={mk(r16[r16i + 1])} />}
        right={mk(qf[qfi])}
      />
    );
  }

  const colOffsets = ROUNDS.map((_, ri) => ri * (COL_W + CONN_W));

  return (
    <div className="overflow-x-auto pb-2">
      {/* Round labels */}
      <div className="relative h-5 mb-2 min-w-max" style={{ paddingLeft: 12 }}>
        {ROUNDS.map((label, ri) => (
          <span
            key={label}
            className="absolute text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
            style={{ left: 12 + colOffsets[ri], width: COL_W, textAlign: 'center' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Hint */}
      <p className="text-[10px] text-slate-300 px-3 mb-2">
        Klik op een team om de winnaar te kiezen — klik opnieuw om te wissen.
      </p>

      {/* Tree */}
      <div className="inline-block px-3">
        <BG gap={12}
          a={
            <BG gap={8}
              a={branch(0, 0, 0)}
              b={branch(4, 2, 1)}
              right={mk(sf[0])}
            />
          }
          b={
            <BG gap={8}
              a={branch(8, 4, 2)}
              b={branch(12, 6, 3)}
              right={mk(sf[1])}
            />
          }
          right={mk(final)}
        />
      </div>

      <p className="text-[9px] text-slate-400 px-3 mt-3 italic">
        * Sectie D (nummers 3): volgorde indicatief — officiële FIFA-matrix volgt.
      </p>
    </div>
  );
}
