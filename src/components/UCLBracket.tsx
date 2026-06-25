'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { clubById, titlesOf } from '@/data/ucl2027';
import {
  knockoutChampion,
  KNOCKOUT_TITLES,
  type KnockoutState,
  type KnockoutTie,
} from '@/lib/uclLeague';
import { uclT } from '@/data/uclI18n';
import { ClubFlag } from './ClubFlag';

const GOLD = '#C9A843';

function useUclT() {
  const p = useParams();
  const lang = typeof p?.lang === 'string' ? p.lang : 'nl';
  return { t: (s: string) => uclT(s, lang), lang };
}

interface Props {
  knockout: KnockoutState;
  selectedClubId: string;
  cardHref: string;
  onPick: (roundId: string, tieId: string, clubId: string) => void;
  onResim: () => void;
  onBack: () => void;
}

function TeamSlot({
  clubId,
  matchId,
  roundId,
  isHome,
  winnerId,
  selectedClubId,
  onPick,
}: {
  clubId: string;
  matchId: string;
  roundId: string;
  isHome: boolean;
  winnerId?: string;
  selectedClubId: string;
  onPick: (roundId: string, tieId: string, clubId: string) => void;
}) {
  const { t } = useUclT();
  const club = clubById(clubId);
  const decided = !!winnerId;
  const isWinner = winnerId === clubId;
  const isLoser = decided && !isWinner;
  const me = clubId === selectedClubId;

  return (
    <button
      onClick={() => onPick(roundId, matchId, clubId)}
      className={`flex items-center gap-1.5 h-[34px] px-2 flex-1 min-w-0 transition-colors text-left ${
        isWinner ? 'bg-emerald-900/50' : isLoser ? 'opacity-30' : 'hover:bg-white/5'
      }`}
      style={me && !isLoser ? { boxShadow: `inset 0 0 0 1px ${GOLD}` } : undefined}
    >
      <ClubFlag code={club?.flagCode ?? 'eu'} size={14} />
      <span
        className={`text-[12px] font-semibold truncate leading-none flex-1 ${
          isWinner ? 'text-emerald-300' : 'c-fg'
        }`}
      >
        {club?.name ?? clubId}
      </span>
      {!isHome && <span className="text-[11px] opacity-40 shrink-0">{t('uit')}</span>}
      {isWinner && (
        <svg width="9" height="9" viewBox="0 0 24 24" className="text-emerald-400 shrink-0" aria-hidden>
          <polyline points="20 6 9 17 4 12" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function MatchBox({
  tie,
  roundId,
  winnerId,
  selectedClubId,
  onPick,
  className = 'w-[12rem] shrink-0',
}: {
  tie: KnockoutTie;
  roundId: string;
  winnerId?: string;
  selectedClubId: string;
  onPick: (roundId: string, tieId: string, clubId: string) => void;
  className?: string;
}) {
  const involvesMe = tie.homeId === selectedClubId || tie.awayId === selectedClubId;
  return (
    <div
      className={`${className} overflow-hidden border`}
      style={{
        borderRadius: '0 6px 0 6px',
        background: 'var(--bg-card)',
        borderColor: involvesMe ? GOLD : 'var(--border)',
      }}
    >
      <TeamSlot clubId={tie.homeId} matchId={tie.id} roundId={roundId} isHome winnerId={winnerId} selectedClubId={selectedClubId} onPick={onPick} />
      <div style={{ borderTop: '1px solid var(--border)' }} />
      <TeamSlot clubId={tie.awayId} matchId={tie.id} roundId={roundId} isHome={false} winnerId={winnerId} selectedClubId={selectedClubId} onPick={onPick} />
    </div>
  );
}

function Connector() {
  return <div className="shrink-0 self-stretch" style={{ width: 10 }} />;
}

function BG({ a, b, right, gap = 6 }: { a: React.ReactNode; b: React.ReactNode; right: React.ReactNode; gap?: number }) {
  return (
    <div className="flex items-stretch">
      <div className="flex flex-col" style={{ gap }}>
        {a}
        {b}
      </div>
      <Connector />
      <div className="flex items-center">{right}</div>
    </div>
  );
}

const COL_W = 192;
const CONN_W = 10;

export function UCLBracket({ knockout, selectedClubId, cardHref, onPick, onResim, onBack }: Props) {
  const { t } = useUclT();
  const championId = knockoutChampion(knockout);

  const win = (roundId: string, tie: KnockoutTie) => knockout.rounds[roundId]?.winners[tie.id];
  const r16 = knockout.rounds['r16']?.ties ?? [];
  const qf = knockout.rounds['qf']?.ties ?? [];
  const sf = knockout.rounds['sf']?.ties ?? [];
  const final = knockout.rounds['final']?.ties ?? [];
  const kopo = knockout.rounds['kopo']?.ties ?? [];

  const mk = (roundId: string, tie: KnockoutTie, className?: string) => (
    <MatchBox
      key={tie.id}
      tie={tie}
      roundId={roundId}
      winnerId={win(roundId, tie)}
      selectedClubId={selectedClubId}
      onPick={onPick}
      className={className}
    />
  );

  const treeReady = r16.length === 8 && qf.length === 4 && sf.length === 2 && final.length === 1;

  const branch = (r16i: number, qfi: number) => (
    <BG gap={6} a={mk('r16', r16[r16i])} b={mk('r16', r16[r16i + 1])} right={mk('qf', qf[qfi])} />
  );

  const desktopCols = ['Achtste finales', 'Kwartfinales', 'Halve finales', 'Finale'];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-sm font-bold uppercase tracking-widest c-gold">Knockout</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onResim}
            className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded transition-colors c-fg-muted hover:c-fg"
            style={{ border: '1px solid var(--border)' }}
          >
            ↻ {t('Opnieuw simuleren')}
          </button>
          <button
            onClick={onBack}
            className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded transition-colors c-fg-muted hover:c-fg"
            style={{ border: '1px solid var(--border)' }}
          >
            ← {t('Eindstand')}
          </button>
        </div>
      </div>

      {/* Knockout play-offs */}
      {kopo.length > 0 && (
        <section className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest c-fg-muted mb-2">
            {t(KNOCKOUT_TITLES.kopo)} <span className="opacity-50">{t('— winnaars stromen door naar de achtste finales')}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {kopo.map((t2) => mk('kopo', t2, 'w-full'))}
          </div>
        </section>
      )}

      {treeReady && (
        <>
          {/* Mobile: gestapelde rondes */}
          <div className="sm:hidden flex flex-col gap-5">
            {(
              [
                ['r16', r16],
                ['qf', qf],
                ['sf', sf],
                ['final', final],
              ] as [string, KnockoutTie[]][]
            ).map(([rid, ties]) => (
              <div key={rid}>
                <p className="text-[11px] font-bold uppercase tracking-widest c-fg-muted mb-1.5">
                  {t(KNOCKOUT_TITLES[rid as keyof typeof KNOCKOUT_TITLES])}
                </p>
                <div className="flex flex-col gap-1.5">{ties.map((tie) => mk(rid, tie, 'w-full'))}</div>
              </div>
            ))}
          </div>

          {/* Desktop: horizontale boom */}
          <div className="hidden sm:block overflow-x-auto pb-2">
            <div className="relative h-5 mb-2 min-w-max" style={{ paddingLeft: 12 }}>
              {desktopCols.map((label, ri) => (
                <span
                  key={label}
                  className="absolute text-[11px] font-bold uppercase tracking-widest c-fg-muted whitespace-nowrap"
                  style={{ left: 12 + ri * (COL_W + CONN_W), width: COL_W, textAlign: 'center' }}
                >
                  {t(label)}
                </span>
              ))}
            </div>
            <div className="inline-block px-3">
              <BG
                gap={14}
                a={<BG gap={10} a={branch(0, 0)} b={branch(2, 1)} right={mk('sf', sf[0])} />}
                b={<BG gap={10} a={branch(4, 2)} b={branch(6, 3)} right={mk('sf', sf[1])} />}
                right={mk('final', final[0])}
              />
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {championId && (
          <WinnerBanner key={championId} clubId={championId} cardHref={cardHref} />
        )}
      </AnimatePresence>
    </div>
  );
}

function WinnerBanner({ clubId, cardHref }: { clubId: string; cardHref: string }) {
  const { t } = useUclT();
  const club = clubById(clubId);
  const trophies = titlesOf(clubId) + 1; // historische titels + deze winst

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mt-8 flex flex-col items-center gap-4 py-8 px-4"
      style={{ border: `1px solid ${GOLD}55`, background: 'var(--bg-card)', borderRadius: '0 12px 0 12px' }}
    >
      <p className="text-xs font-bold uppercase tracking-widest c-gold">{t('Winnaar Champions League 2026/27')}</p>
      <ClubFlag code={club?.flagCode ?? 'eu'} size={96} />
      <p className="text-2xl font-bold uppercase tracking-widest c-fg text-center">{club?.name ?? clubId}</p>
      <div className="flex gap-1.5 flex-wrap justify-center">
        {Array.from({ length: trophies }).map((_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="c-gold" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p className="text-xs c-fg-muted">{trophies} {t(trophies === 1 ? 'Europacup I/CL-titel' : 'Europacup I/CL-titels')}</p>
      <div className="w-full max-w-xs flex flex-col gap-2.5 mt-2">
        <Link
          href={cardHref}
          className="w-full py-3 text-center font-bold text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--cta)', borderRadius: '0 10px 0 10px' }}
        >
          {t('Mijn kaart')}
        </Link>
        <button
          onClick={handleShare}
          className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-colors"
          style={{ border: '2px solid var(--cta)', color: 'var(--cta)', borderRadius: '0 10px 0 10px', background: 'transparent' }}
        >
          {t('Deel link')}
        </button>
      </div>
    </motion.div>
  );
}
