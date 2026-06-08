'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import type { BracketMatch, KnockoutResults } from '@/lib/bracket';
import type { Qualifiers } from '@/lib/types';
import { buildBracket } from '@/lib/bracket';
import { teamById, getTeamName } from '@/data/worldcup2026';
import { Flag } from './Flag';
import { useMessages } from '@/hooks/useMessages';

interface SlotProps {
  slot: BracketMatch['slot1'];
  slotNum: 1 | 2;
  matchId: string;
  winner: 1 | 2 | undefined;
  onPick: (matchId: string, slot: 1 | 2) => void;
}

function TeamSlot({ slot, slotNum, matchId, winner, onPick }: SlotProps) {
  const team = slot.teamId ? teamById(slot.teamId) : null;
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
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
      className={`flex items-center gap-1 h-[60px] px-1.5 flex-1 min-w-0 transition-colors ${
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
          <span className={`text-[12px] font-semibold uppercase tracking-wide truncate leading-none flex-1 ${
            isNed ? 'text-orange-400' : isWinner ? 'text-emerald-300' : 'text-slate-200'
          }`}>
            {team ? getTeamName(team, lang) : slot.teamId}
          </span>
          {isWinner && (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400 shrink-0" aria-hidden>
              <polyline points="20 6 9 17 4 12" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round"/>
            </svg>
          )}
        </>
      ) : (
        <span className="text-[11px] text-slate-600 truncate leading-none font-bold uppercase tracking-wider">{slot.label}</span>
      )}
    </motion.button>
  );
}

function MatchBox({
  match,
  highlight,
  kr,
  onPick,
  className = 'w-[11rem] shrink-0',
}: {
  match: BracketMatch;
  highlight?: boolean;
  kr: KnockoutResults;
  onPick: (matchId: string, slot: 1 | 2) => void;
  className?: string;
}) {
  const known = match.slot1.teamId || match.slot2.teamId;
  const winner = kr[match.id];
  return (
    <div className={`${className} overflow-hidden border ${
      highlight
        ? 'border-[#C9A843] bg-card'
        : known
        ? 'border-[#C9A843]/35 bg-card'
        : 'border-[#C9A843]/10 bg-[#0A0A0A]/50'
    }`} style={{ borderRadius: '0 6px 0 6px' }}>
      <div className="flex items-stretch">
        <TeamSlot slot={match.slot1} slotNum={1} matchId={match.id} winner={winner} onPick={onPick} />
        <div className="border-l border-white/5 shrink-0" />
        <TeamSlot slot={match.slot2} slotNum={2} matchId={match.id} winner={winner} onPick={onPick} />
      </div>
    </div>
  );
}

function MobileRound({
  label,
  matches,
  single,
  kr,
  onPick,
}: {
  label: string;
  matches: BracketMatch[];
  single?: boolean;
  kr: KnockoutResults;
  onPick: (matchId: string, slot: 1 | 2) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1.5">
        {label}
      </p>
      {single ? (
        <div className="px-3">
          <MatchBox
            match={matches[0]}
            highlight={matches[0].slot1.teamId === 'NED' || matches[0].slot2.teamId === 'NED'}
            kr={kr}
            onPick={onPick}
            className="w-full"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 px-3">
          {matches.map((m) => (
            <MatchBox
              key={m.id}
              match={m}
              highlight={m.slot1.teamId === 'NED' || m.slot2.teamId === 'NED'}
              kr={kr}
              onPick={onPick}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}

const WC_TITLES: Record<string, number> = {
  BRA: 5, GER: 4, ARG: 3, FRA: 2, URU: 2, ENG: 1, ESP: 1,
};

function WinnerBanner({ teamId, encodedS, encodedK }: { teamId: string; encodedS: string; encodedK: string }) {
  const team = teamById(teamId);
  const msg = useMessages();
  const params = useParams();
  const lang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const stars = (WC_TITLES[teamId] ?? 0) + 1;
  const cardHref = `/${lang}/wk-2026/card?team=${teamId}&s=${encodedS}${encodedK ? `&k=${encodedK}` : ''}`;

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-3 mt-2 mb-4 flex flex-col items-center gap-4 border border-[#C9A843]/30 bg-card rounded-xl py-8 px-4"
      style={{ borderRadius: '0 12px 0 12px' }}
    >
      <div className="flex gap-1.5 flex-wrap justify-center">
        {Array.from({ length: stars }).map((_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#C9A843]" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <Flag teamId={teamId} size={120} />
      <p className="text-lg font-bold uppercase tracking-widest text-slate-100 text-center">
        {team ? getTeamName(team, lang) : teamId}
      </p>
      <div className="w-full flex flex-col gap-2.5">
        <Link
          href={cardHref}
          className="w-full py-3.5 text-center font-bold text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#D93B1F', borderRadius: '0 10px 0 10px' }}
        >
          {msg.bracket.myCard}
        </Link>
        <button
          onClick={handleShare}
          className="w-full py-3.5 font-bold text-sm uppercase tracking-widest transition-colors hover:bg-[#D93B1F]/10"
          style={{ border: '2px solid #D93B1F', color: '#D93B1F', borderRadius: '0 10px 0 10px', background: 'transparent' }}
        >
          {msg.bracket.shareLink}
        </button>
      </div>
    </motion.div>
  );
}

function Connector() {
  return <div className="shrink-0 self-stretch" style={{ width: 10 }} />;
}

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

// Round labels are localized via useMessages() in BracketView
const COL_W = 176;
const CONN_W = 10;

interface Props {
  qualifiers: Qualifiers;
  kr: KnockoutResults;
  onPick: (matchId: string, slot: 1 | 2) => void;
  encodedS: string;
  encodedK: string;
}

export function BracketView({ qualifiers, kr, onPick, encodedS, encodedK }: Props) {
  const msg = useMessages();
  const rounds = [msg.bracket.r32, msg.bracket.r16, msg.bracket.qf, msg.bracket.sf, msg.bracket.final];
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

  const colOffsets = rounds.map((_, ri) => ri * (COL_W + CONN_W));

  const finalWinnerSlot = kr[final.id];
  const finalWinnerId = finalWinnerSlot
    ? (finalWinnerSlot === 1 ? final.slot1.teamId : final.slot2.teamId) ?? null
    : null;

  return (
    <>
      {/* ── Mobile (< 640px): verticale scroll per ronde ── */}
      <div className="sm:hidden flex flex-col gap-4 py-2">
        <MobileRound label={rounds[0]} matches={r32}     kr={kr} onPick={onPick} />
        <MobileRound label={rounds[1]} matches={r16}     kr={kr} onPick={onPick} />
        <MobileRound label={rounds[2]} matches={qf}      kr={kr} onPick={onPick} />
        <MobileRound label={rounds[3]} matches={sf}      kr={kr} onPick={onPick} />
        <MobileRound label={rounds[4]} matches={[final]} kr={kr} onPick={onPick} single />
        <AnimatePresence>
          {finalWinnerId && <WinnerBanner key={finalWinnerId} teamId={finalWinnerId} encodedS={encodedS} encodedK={encodedK} />}
        </AnimatePresence>
      </div>

      {/* ── Desktop (≥ 640px): horizontale boom ── */}
      <div className="hidden sm:block overflow-x-auto pb-2">
        <div className="relative h-5 mb-2 min-w-max" style={{ paddingLeft: 12 }}>
          {rounds.map((label, ri) => (
            <span
              key={label}
              className="absolute text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
              style={{ left: 12 + colOffsets[ri], width: COL_W, textAlign: 'center' }}
            >
              {label}
            </span>
          ))}
        </div>

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
      </div>
    </>
  );
}
