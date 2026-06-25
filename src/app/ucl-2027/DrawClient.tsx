'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  seedPool,
  drawTies,
  simulateTie,
  buildFixedTies,
  hasFixedDraw,
  clubById,
  FIXED_DRAW_DATE,
  ROUND_BY_ID,
  ROUNDS,
  STAGES,
  SELECTABLE_BY_STAGE,
  entryStageOf,
  finalizeLeaguePots,
  type UCLClub,
  type UCLTie,
  type RoundDef,
  type StageKey,
  type PottedClub,
} from '@/data/ucl2027';
import {
  drawLeaguePhase,
  simulateLeague,
  computeLeagueTable,
  clubMapOf,
  matchKey,
  qualificationBand,
  initKnockout,
  setKnockoutWinner,
  resimKnockout,
  type LeagueMatch,
  type Goals,
  type KnockoutState,
} from '@/lib/uclLeague';
import { encodeCard, type CardMatch } from '@/lib/uclCard';
import { ClubFlag } from '@/components/ClubFlag';
import { UCLBracket } from '@/components/UCLBracket';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useParams } from 'next/navigation';
import { uclT } from '@/data/uclI18n';

function useUclT() {
  const p = useParams();
  const lang = typeof p?.lang === 'string' ? p.lang : 'nl';
  return { t: (s: string) => uclT(s, lang), lang };
}

function TopNav() {
  return (
    <nav className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

type RoundPhase = 'pre' | 'drawing' | 'drawn';

interface RoundState {
  phase: RoundPhase;
  ties: UCLTie[];
  revealed: number;
  winners: Record<string, string>; // tieId → clubId
}

interface LeagueState {
  phase: 'pre' | 'drawn';
  potted: PottedClub[];
  schedule: LeagueMatch[];
  goals: Goals;
}

function pathAccent(def: RoundDef): string {
  return def.path === 'league' ? '#6aa3ff' : '#C9A843';
}

// Rondecode voor MijnKaart: 'q2-cp' → 'q2', knockout-ids ongewijzigd.
function cardRoundOf(roundId: string): string {
  if (roundId.startsWith('q2')) return 'q2';
  if (roundId.startsWith('q3')) return 'q3';
  if (roundId.startsWith('po')) return 'po';
  return roundId; // q1, kopo, r16, qf, sf, final
}

const stageIndexOf = (key: StageKey) => STAGES.findIndex((s) => s.key === key);

const stageIsFixed = (stage: (typeof STAGES)[number]) =>
  stage.key !== 'LP' && stage.roundIds.length > 0 && stage.roundIds.every(hasFixedDraw);

// Zoekt de gekozen winnaar (als club) van een duel over alle reeds bekende rondes.
// Gebruikt om { winner: tieId }-slots in een vaste loting op te lossen.
function winnerClubFrom(
  state: Record<string, RoundState>,
  tieId: string
): UCLClub | undefined {
  for (const rs of Object.values(state)) {
    const wid = rs.winners[tieId];
    if (wid) return clubById(wid);
  }
  return undefined;
}

// Bouwt de duels van één ronde: vaste loting (Q1/Q2) of willekeurige trekking.
function buildRoundTies(
  rid: string,
  resolved: Record<string, RoundState>,
  winnersLocal: (feedsFrom: string) => UCLClub[]
): UCLTie[] {
  if (hasFixedDraw(rid)) {
    return buildFixedTies(rid, (tieId) => winnerClubFrom(resolved, tieId));
  }
  const def = ROUND_BY_ID[rid];
  const pool = [...def.direct, ...(def.feedsFrom ? winnersLocal(def.feedsFrom) : [])];
  const { seeded, unseeded } = seedPool(pool);
  return drawTies(seeded, unseeded, rid);
}

// Auto-simuleer een reeks kwalificatierondes (op ECI). Gebruikt voor de rondes
// vóór het instappunt van de gekozen club.
function autoSimRounds(roundIds: string[]): Record<string, RoundState> {
  const acc: Record<string, RoundState> = {};
  const winnersLocal = (rid: string): UCLClub[] => {
    const rs = acc[rid];
    return rs.ties.map((t) => (t.home.id === rs.winners[t.id] ? t.home : t.away));
  };
  for (const rid of roundIds) {
    const ties = buildRoundTies(rid, acc, winnersLocal);
    const winners: Record<string, string> = {};
    for (const t of ties) winners[t.id] = simulateTie(t).id;
    acc[rid] = { phase: 'drawn', ties, revealed: ties.length, winners };
  }
  return acc;
}

// Zet een vaste-loting-stage meteen klaar (statisch, geen loting-animatie): bouw
// de duels op, winnaars nog leeg zodat de gebruiker ze zelf kiest of simuleert.
function buildFixedStage(
  stage: (typeof STAGES)[number],
  prev: Record<string, RoundState>
): Record<string, RoundState> {
  const next = { ...prev };
  for (const rid of stage.roundIds) {
    if (next[rid]) continue;
    const ties = buildFixedTies(rid, (tieId) => winnerClubFrom(next, tieId));
    next[rid] = { phase: 'drawn', ties, revealed: ties.length, winners: {} };
  }
  return next;
}

export default function DrawClient({ lang }: { lang: string }) {
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [stageIdx, setStageIdx] = useState(0);
  const [entryIdx, setEntryIdx] = useState(0);
  const [rounds, setRounds] = useState<Record<string, RoundState>>({});
  const [league, setLeague] = useState<LeagueState | null>(null);

  const winnersOf = useCallback(
    (roundId: string): UCLClub[] => {
      const rs = rounds[roundId];
      if (!rs) return [];
      return rs.ties
        .filter((t) => rs.winners[t.id])
        .map((t) => (t.home.id === rs.winners[t.id] ? t.home : t.away));
    },
    [rounds]
  );

  const poolFor = useCallback(
    (def: RoundDef): UCLClub[] => [
      ...def.direct,
      ...(def.feedsFrom ? winnersOf(def.feedsFrom) : []),
    ],
    [winnersOf]
  );

  // Fan kiest een club → instappunt bepaald; eerdere rondes auto-gesimuleerd.
  const selectClub = useCallback((clubId: string) => {
    const entry = entryStageOf(clubId);
    const idx = stageIndexOf(entry);
    const earlierRoundIds = STAGES.slice(0, idx).flatMap((s) => s.roundIds);
    let base = autoSimRounds(earlierRoundIds);
    // Vaste-loting-instapronde (Q1/Q2) staat meteen statisch klaar.
    if (stageIsFixed(STAGES[idx])) base = buildFixedStage(STAGES[idx], base);
    setRounds(base);
    setLeague(null);
    setEntryIdx(idx);
    setStageIdx(idx);
    setSelectedClubId(clubId);
  }, []);

  // Volgende stage. Bij een vaste-loting-stage worden de duels meteen klaargezet.
  const goToStage = useCallback((nextIdx: number) => {
    setStageIdx(nextIdx);
    const stage = STAGES[nextIdx];
    if (stageIsFixed(stage)) setRounds((prev) => buildFixedStage(stage, prev));
  }, []);

  const drawStage = useCallback(() => {
    const stage = STAGES[stageIdx];
    stage.roundIds.forEach((roundId) => {
      const def = ROUND_BY_ID[roundId];
      const { seeded, unseeded } = seedPool(poolFor(def));
      const ties = drawTies(seeded, unseeded, roundId);
      setRounds((prev) => ({
        ...prev,
        [roundId]: { phase: 'drawing', ties, revealed: 0, winners: {} },
      }));
      ties.forEach((_, i) => {
        setTimeout(() => {
          setRounds((prev) => {
            const rs = prev[roundId];
            if (!rs) return prev;
            const revealed = i + 1;
            return {
              ...prev,
              [roundId]: {
                ...rs,
                revealed,
                phase: revealed === ties.length ? 'drawn' : 'drawing',
              },
            };
          });
        }, i * 110 + 80);
      });
    });
  }, [stageIdx, poolFor]);

  const pickWinner = useCallback((roundId: string, tieId: string, clubId: string) => {
    setRounds((prev) => {
      const rs = prev[roundId];
      if (!rs) return prev;
      return {
        ...prev,
        [roundId]: { ...rs, winners: { ...rs.winners, [tieId]: clubId } },
      };
    });
  }, []);

  // Simuleer alle duels van één ronde op ECI (winnaars blijven overschrijfbaar).
  const simulateRound = useCallback((roundId: string) => {
    setRounds((prev) => {
      const rs = prev[roundId];
      if (!rs) return prev;
      const winners: Record<string, string> = {};
      for (const t of rs.ties) winners[t.id] = simulateTie(t).id;
      return { ...prev, [roundId]: { ...rs, winners } };
    });
  }, []);

  const reset = useCallback(() => {
    setSelectedClubId(null);
    setRounds({});
    setLeague(null);
    setKnockout(null);
    setKoTab('table');
    setStageIdx(0);
    setEntryIdx(0);
  }, []);

  // ─── League phase acties ───────────────────────────────────────────────────

  const [knockout, setKnockout] = useState<KnockoutState | null>(null);
  const [koTab, setKoTab] = useState<'table' | 'bracket'>('table');

  const leaguePotted = useMemo(() => {
    if (STAGES[stageIdx].key !== 'LP') return null;
    if (league) return league.potted;
    return finalizeLeaguePots([...winnersOf('po-cp'), ...winnersOf('po-lp')]);
  }, [stageIdx, league, winnersOf]);

  const drawLeague = useCallback(() => {
    const potted = finalizeLeaguePots([...winnersOf('po-cp'), ...winnersOf('po-lp')]);
    const schedule = drawLeaguePhase(potted);
    const goals = simulateLeague(schedule, clubMapOf(potted));
    setLeague({ phase: 'drawn', potted, schedule, goals });
    setKnockout(null);
    setKoTab('table');
  }, [winnersOf]);

  const resimLeague = useCallback(() => {
    setLeague((prev) =>
      prev ? { ...prev, goals: simulateLeague(prev.schedule, clubMapOf(prev.potted)) } : prev
    );
    setKnockout(null);
  }, []);

  const overrideMatch = useCallback((key: string, goals: [number, number]) => {
    setLeague((prev) => (prev ? { ...prev, goals: { ...prev.goals, [key]: goals } } : prev));
    setKnockout(null);
  }, []);

  const startKnockout = useCallback(() => {
    if (!league) return;
    const table = computeLeagueTable(league.potted, league.schedule, league.goals);
    setKnockout(initKnockout(table.map((s) => s.clubId), clubMapOf(league.potted)));
    setKoTab('bracket');
  }, [league]);

  const pickKO = useCallback(
    (roundId: string, tieId: string, clubId: string) => {
      setKnockout((prev) =>
        prev && league ? setKnockoutWinner(prev, roundId, tieId, clubId, clubMapOf(league.potted)) : prev
      );
    },
    [league]
  );

  const resimKO = useCallback(() => {
    setKnockout((prev) => (prev && league ? resimKnockout(prev, clubMapOf(league.potted)) : prev));
  }, [league]);

  // MijnKaart-link: alle wedstrijden van de gekozen club door het hele toernooi.
  const cardHref = useMemo(() => {
    if (!selectedClubId) return `/${lang}/ucl-2027`;
    const matches: CardMatch[] = [];
    for (const def of ROUNDS) {
      const rs = rounds[def.id];
      if (!rs) continue;
      const tie = rs.ties.find((t) => t.home.id === selectedClubId || t.away.id === selectedClubId);
      if (!tie || !rs.winners[tie.id]) continue;
      const oppId = tie.home.id === selectedClubId ? tie.away.id : tie.home.id;
      matches.push({ round: cardRoundOf(def.id), oppId, res: rs.winners[tie.id] === selectedClubId ? 'W' : 'L' });
    }
    if (league) {
      for (const mt of league.schedule) {
        if (mt.homeId !== selectedClubId && mt.awayId !== selectedClubId) continue;
        const g = league.goals[matchKey(mt)];
        if (!g) continue;
        const isHome = mt.homeId === selectedClubId;
        matches.push({
          round: 'lp',
          oppId: isHome ? mt.awayId : mt.homeId,
          res: isHome ? `${g[0]}-${g[1]}` : `${g[1]}-${g[0]}`,
        });
      }
    }
    if (knockout) {
      for (const rid of knockout.order) {
        const r = knockout.rounds[rid];
        const tie = r.ties.find((t) => t.homeId === selectedClubId || t.awayId === selectedClubId);
        if (!tie || !r.winners[tie.id]) continue;
        const oppId = tie.homeId === selectedClubId ? tie.awayId : tie.homeId;
        matches.push({ round: rid, oppId, res: r.winners[tie.id] === selectedClubId ? 'W' : 'L' });
      }
    }
    const enc = encodeCard(matches);
    return `/${lang}/ucl-2027/card?team=${selectedClubId}${enc ? `&m=${enc}` : ''}`;
  }, [selectedClubId, rounds, league, knockout, lang]);

  // ─── Render ────────────────────────────────────────────────────────────────

  if (!selectedClubId) {
    return <ClubPicker onSelect={selectClub} />;
  }

  const stage = STAGES[stageIdx];
  const isLeague = stage.key === 'LP';

  const stageDrawn = stage.roundIds.every((id) => rounds[id] && rounds[id].phase !== 'pre');
  const stageComplete = stage.roundIds.every((id) => {
    const rs = rounds[id];
    return rs && rs.phase === 'drawn' && rs.ties.every((t) => rs.winners[t.id]);
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />
      <header className="bg-[var(--bg-card)] border-b border-[#C9A843]/30 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#C9A843] uppercase tracking-widest">
              Champions League 2026/27
            </p>
            <h1 className="text-2xl font-bold tracking-wide leading-tight flex items-center gap-2">
              <SelectedClubBadge clubId={selectedClubId} />
            </h1>
          </div>
          <button
            onClick={reset}
            className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2 rounded border border-[var(--border)] hover:border-white/30"
          >
            Andere club
          </button>
        </div>
        <StageStepper current={stageIdx} entry={entryIdx} />
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {isLeague && knockout && koTab === 'bracket' && leaguePotted && (
          <UCLBracket
            knockout={knockout}
            selectedClubId={selectedClubId}
            cardHref={cardHref}
            onPick={pickKO}
            onResim={resimKO}
            onBack={() => setKoTab('table')}
          />
        )}

        {isLeague && !(knockout && koTab === 'bracket') && leaguePotted && (
          <LeaguePhaseView
            potted={leaguePotted}
            league={league}
            selectedClubId={selectedClubId}
            hasKnockout={!!knockout}
            onDraw={drawLeague}
            onResim={resimLeague}
            onOverride={overrideMatch}
            onStartKnockout={startKnockout}
            onShowBracket={() => setKoTab('bracket')}
          />
        )}

        {!isLeague && !stageDrawn && (
          <PreStage stage={stage} poolFor={poolFor} selectedClubId={selectedClubId} onDraw={drawStage} />
        )}

        {!isLeague && stageDrawn && (
          <div className="space-y-10">
            {stage.roundIds.map((roundId) => (
              <PathDraw
                key={roundId}
                def={ROUND_BY_ID[roundId]}
                state={rounds[roundId]}
                selectedClubId={selectedClubId}
                onPick={(tieId, clubId) => pickWinner(roundId, tieId, clubId)}
                onSimulate={() => simulateRound(roundId)}
              />
            ))}
          </div>
        )}

        {!isLeague && stageComplete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <p className="text-sm text-slate-400">Alle winnaars gekozen voor {stage.label}.</p>
            <button
              onClick={() => goToStage(stageIdx + 1)}
              className="px-8 py-3 bg-[var(--cta)] hover:opacity-90 text-white font-bold text-sm uppercase tracking-widest rounded transition-colors"
            >
              Naar {STAGES[stageIdx + 1].label} →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Club-keuze (instappunt) ─────────────────────────────────────────────────

function ClubPicker({ onSelect }: { onSelect: (clubId: string) => void }) {
  const { t } = useUclT();
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <TopNav />
      <header className="bg-[var(--bg-card)] border-b border-[#C9A843]/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-xs font-semibold text-[#C9A843] uppercase tracking-widest">
            Champions League 2026/27
          </p>
          <h1 className="text-3xl font-bold tracking-wide leading-tight mt-1">{t('Kies jouw club')}</h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            {t('Je stapt in op de ronde waar jouw club begint. Alle eerdere rondes worden automatisch gesimuleerd. Kies bijvoorbeeld een Q1-club voor de hele weg, of een league-phase-club om meteen bij de 36 te beginnen.')}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {[...SELECTABLE_BY_STAGE].reverse().map((group) => (
          <section key={group.key}>
            <h2 className="text-sm font-bold text-[#C9A843] uppercase tracking-widest mb-1">
              {t(group.label)}
            </h2>
            <p className="text-xs text-slate-500 mb-3">{t('Instappen bij')} {t(group.label)}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {[...group.clubs]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((club) => (
                  <button
                    key={club.id}
                    onClick={() => onSelect(club.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--bg-card)] border border-transparent hover:bg-white/10 hover:border-[#C9A843]/40 transition-colors text-left"
                  >
                    <ClubFlag code={club.flagCode} size={22} />
                    <span className="text-sm font-medium truncate">{club.name}</span>
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function SelectedClubBadge({ clubId }: { clubId: string }) {
  const club = useMemo(() => {
    for (const g of SELECTABLE_BY_STAGE) {
      const found = g.clubs.find((c) => c.id === clubId);
      if (found) return found;
    }
    return null;
  }, [clubId]);
  const { t } = useUclT();
  if (!club) return <>{t('Kwalificatie')}</>;
  return (
    <span className="flex items-center gap-2">
      <ClubFlag code={club.flagCode} size={24} />
      {club.name}
    </span>
  );
}

// ─── Stage-stepper ───────────────────────────────────────────────────────────

function StageStepper({ current, entry }: { current: number; entry: number }) {
  const { t } = useUclT();
  return (
    <div className="max-w-6xl mx-auto px-4 pb-3">
      <div className="flex items-center gap-2 flex-wrap">
        {STAGES.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const auto = i < entry; // gesimuleerd vóór instap
          return (
            <div key={s.key} className="flex items-center gap-2">
              <span
                className={[
                  'text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors',
                  active
                    ? 'bg-[#C9A843] text-[#001D62] border-[#C9A843]'
                    : done
                    ? 'text-[#C9A843] border-[#C9A843]/40'
                    : 'text-slate-500 border-[var(--border)]',
                ].join(' ')}
                title={auto ? t('Automatisch gesimuleerd') : undefined}
              >
                {done ? '✓ ' : ''}
                {t(s.label)}
                {auto ? ' ⚡' : ''}
              </span>
              {i < STAGES.length - 1 && <span className="text-slate-600">·</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Pre-draw kwalificatie ───────────────────────────────────────────────────

function PreStage({
  stage,
  poolFor,
  selectedClubId,
  onDraw,
}: {
  stage: (typeof STAGES)[number];
  poolFor: (def: RoundDef) => UCLClub[];
  selectedClubId: string;
  onDraw: () => void;
}) {
  const { t } = useUclT();
  return (
    <div className="space-y-10">
      {stage.roundIds.map((roundId) => {
        const def = ROUND_BY_ID[roundId];
        const pool = poolFor(def);
        const { seeded, unseeded } = seedPool(pool);
        const accent = pathAccent(def);
        return (
          <section key={roundId}>
            <RoundHeading def={def} subtitle={`${seeded.length} ${t('duels')} — ${pool.length} ${t('clubs')}`} accent={accent} />
            <div className="grid grid-cols-2 gap-4">
              <PotColumn title={t('Geseed')} clubs={seeded} accent={accent} selectedClubId={selectedClubId} />
              <PotColumn title={t('Ongeseed')} clubs={unseeded} accent={undefined} selectedClubId={selectedClubId} />
            </div>
          </section>
        );
      })}

      <div className="flex flex-col items-center gap-2 pt-2">
        <p className="text-sm text-slate-400">
          {t('Loting per pad, politieke restricties worden automatisch gerespecteerd.')}
        </p>
        <button
          onClick={onDraw}
          className="px-8 py-3 bg-[var(--cta)] hover:opacity-90 text-white font-bold text-sm uppercase tracking-widest rounded transition-colors"
        >
          {t('Loting uitvoeren')}
        </button>
      </div>
    </div>
  );
}

function RoundHeading({ def, subtitle, accent }: { def: RoundDef; subtitle: string; accent: string }) {
  const { t } = useUclT();
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>
        {t(def.titleNl)}
      </h2>
      <span className="text-xs text-slate-500">{subtitle}</span>
    </div>
  );
}

function PotColumn({
  title,
  clubs,
  accent,
  selectedClubId,
}: {
  title: string;
  clubs: UCLClub[];
  accent?: string;
  selectedClubId: string;
}) {
  return (
    <div>
      <h3
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={accent ? { color: accent } : { color: '#94a3b8' }}
      >
        {title}
      </h3>
      <div className="space-y-1.5">
        {clubs.map((club) => {
          const me = club.id === selectedClubId;
          return (
            <div
              key={club.id}
              className={[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg',
                me ? 'bg-[#C9A843]/20 ring-1 ring-[#C9A843]/50' : 'bg-[var(--bg-card)]',
              ].join(' ')}
            >
              <ClubFlag code={club.flagCode} size={22} />
              <span className="text-sm font-medium truncate">{club.name}</span>
              <span className="ml-auto text-xs text-slate-500 shrink-0 tabular-nums">{club.uefaCC.toFixed(3)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Getrokken duels kwalificatie ────────────────────────────────────────────

function PathDraw({
  def,
  state,
  selectedClubId,
  onPick,
  onSimulate,
}: {
  def: RoundDef;
  state: RoundState;
  selectedClubId: string;
  onPick: (tieId: string, clubId: string) => void;
  onSimulate: () => void;
}) {
  const accent = pathAccent(def);
  const drawDate = FIXED_DRAW_DATE[def.id];
  const { t } = useUclT();
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-3 min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-widest shrink-0" style={{ color: accent }}>
            {t(def.titleNl)}
          </h2>
          <span className="text-xs text-slate-500 truncate">
            {drawDate ? `${t('Officiële loting')} · ${drawDate} — ` : ''}
            {state.ties.length} {t('duels — klik op de winnaar')}
          </span>
        </div>
        <button
          onClick={onSimulate}
          className="shrink-0 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded transition-colors c-fg-muted hover:c-fg"
          style={{ border: '1px solid var(--border)' }}
        >
          ⚡ {t('Simuleer')}
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {state.ties.map((tie, i) => (
          <motion.div
            key={tie.id}
            initial={{ opacity: 0, y: 10 }}
            animate={i < state.revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <TieCard
              tie={tie}
              index={i + 1}
              accent={accent}
              winnerId={state.winners[tie.id]}
              selectedClubId={selectedClubId}
              onPick={onPick}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TieCard({
  tie,
  index,
  accent,
  winnerId,
  selectedClubId,
  onPick,
}: {
  tie: UCLTie;
  index: number;
  accent: string;
  winnerId?: string;
  selectedClubId: string;
  onPick: (tieId: string, clubId: string) => void;
}) {
  const involvesMe = tie.home.id === selectedClubId || tie.away.id === selectedClubId;
  return (
    <div
      className="rounded-xl border overflow-hidden bg-[var(--bg-card)]"
      style={{ borderColor: involvesMe ? `${accent}80` : 'rgba(255,255,255,0.1)' }}
    >
      <div className="px-4 py-2.5 bg-[var(--bg-panel)] flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 font-semibold shrink-0">
          Duel {index}
          {tie.firstLeg && (
            <span className="ml-2 font-normal text-slate-600">
              heen {tie.firstLeg} · terug {tie.secondLeg}
            </span>
          )}
        </span>
        {winnerId && (
          <span className="text-xs text-right" style={{ color: accent }}>
            {(tie.home.id === winnerId ? tie.home : tie.away).name} ✓
          </span>
        )}
      </div>
      <div className="p-3.5 space-y-2">
        <TeamBtn
          club={tie.home}
          label="Thuis"
          accent={accent}
          picked={winnerId === tie.home.id}
          eliminated={winnerId === tie.away.id}
          me={tie.home.id === selectedClubId}
          onPick={() => onPick(tie.id, tie.home.id)}
        />
        <div className="text-center text-xs text-slate-600 font-semibold tracking-widest">vs</div>
        <TeamBtn
          club={tie.away}
          label="Uit"
          accent={accent}
          picked={winnerId === tie.away.id}
          eliminated={winnerId === tie.home.id}
          me={tie.away.id === selectedClubId}
          onPick={() => onPick(tie.id, tie.away.id)}
        />
      </div>
    </div>
  );
}

function TeamBtn({
  club,
  label,
  accent,
  picked,
  eliminated,
  me,
  onPick,
}: {
  club: UCLClub;
  label: string;
  accent: string;
  picked: boolean;
  eliminated: boolean;
  me: boolean;
  onPick: () => void;
}) {
  const { t } = useUclT();
  return (
    <button
      onClick={onPick}
      style={picked ? { backgroundColor: `${accent}22`, borderColor: `${accent}80` } : undefined}
      className={[
        'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all text-left border',
        picked
          ? ''
          : eliminated
          ? 'opacity-25 bg-[var(--bg-card)] border-transparent'
          : 'bg-[var(--bg-card)] border-transparent hover:bg-white/10 hover:border-white/20',
      ].join(' ')}
    >
      <ClubFlag code={club.flagCode} size={22} />
      <span className="flex-1 truncate">
        {club.name}
        {me && <span className="ml-2 text-[11px] uppercase tracking-widest text-[#C9A843]">{t('jouw club')}</span>}
      </span>
      <span className="text-xs text-slate-500 shrink-0">{t(label)}</span>
    </button>
  );
}

// ─── League phase ────────────────────────────────────────────────────────────

function LeaguePhaseView({
  potted,
  league,
  selectedClubId,
  hasKnockout,
  onDraw,
  onResim,
  onOverride,
  onStartKnockout,
  onShowBracket,
}: {
  potted: PottedClub[];
  league: LeagueState | null;
  selectedClubId: string;
  hasKnockout: boolean;
  onDraw: () => void;
  onResim: () => void;
  onOverride: (key: string, goals: [number, number]) => void;
  onStartKnockout: () => void;
  onShowBracket: () => void;
}) {
  if (!league || league.phase !== 'drawn') {
    return <LeaguePots potted={potted} selectedClubId={selectedClubId} onDraw={onDraw} />;
  }
  return (
    <LeagueTable
      league={league}
      selectedClubId={selectedClubId}
      hasKnockout={hasKnockout}
      onResim={onResim}
      onOverride={onOverride}
      onStartKnockout={onStartKnockout}
      onShowBracket={onShowBracket}
    />
  );
}

function LeaguePots({
  potted,
  selectedClubId,
  onDraw,
}: {
  potted: PottedClub[];
  selectedClubId: string;
  onDraw: () => void;
}) {
  const { t } = useUclT();
  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#C9A843]">{t('League phase')}</h2>
        <span className="text-xs text-slate-500">{t('36 clubs — 4 potten')}</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((p) => (
          <div key={p}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-slate-400">{t('Pot')} {p}</h3>
            <div className="space-y-1.5">
              {potted
                .filter((x) => x.pot === p)
                .map(({ club }) => {
                  const me = club.id === selectedClubId;
                  return (
                    <div
                      key={club.id}
                      className={[
                        'flex items-center gap-2.5 px-3 py-2 rounded-lg',
                        me ? 'bg-[#C9A843]/20 ring-1 ring-[#C9A843]/50' : 'bg-[var(--bg-card)]',
                      ].join(' ')}
                    >
                      <ClubFlag code={club.flagCode} size={20} />
                      <span className="text-sm font-medium truncate">{club.name}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2 pt-8">
        <p className="text-sm text-slate-400">
          {t('Elke club speelt 8 wedstrijden (2 per pot). Landenrestricties worden afgedwongen.')}
        </p>
        <button
          onClick={onDraw}
          className="px-8 py-3 bg-[var(--cta)] hover:opacity-90 text-white font-bold text-sm uppercase tracking-widest rounded transition-colors"
        >
          {t('League Phase loting uitvoeren')}
        </button>
      </div>
    </div>
  );
}

const BAND_STYLE: Record<string, { bar: string; label: string }> = {
  r16: { bar: '#2bb673', label: 'Achtste finales' },
  playoff: { bar: '#6aa3ff', label: 'Knockout play-offs' },
  out: { bar: '#64748b', label: 'Uitgeschakeld' },
};

function LeagueTable({
  league,
  selectedClubId,
  hasKnockout,
  onResim,
  onOverride,
  onStartKnockout,
  onShowBracket,
}: {
  league: LeagueState;
  selectedClubId: string;
  hasKnockout: boolean;
  onResim: () => void;
  onOverride: (key: string, goals: [number, number]) => void;
  onStartKnockout: () => void;
  onShowBracket: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(selectedClubId);
  const clubs = useMemo(() => clubMapOf(league.potted), [league.potted]);
  const table = useMemo(
    () => computeLeagueTable(league.potted, league.schedule, league.goals),
    [league.potted, league.schedule, league.goals]
  );
  const { t, lang } = useUclT();
  const cols = lang === 'en' ? ['P', 'W', 'D', 'L'] : lang === 'es' ? ['PJ', 'G', 'E', 'P'] : ['G', 'W', 'G', 'V'];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#C9A843]">{t('Eindstand league phase')}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={hasKnockout ? onShowBracket : onStartKnockout}
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded bg-[var(--cta)] hover:opacity-90 text-white transition-colors"
          >
            {hasKnockout ? t('Toon knockout →') : t('Naar de knockout →')}
          </button>
          <button
            onClick={onResim}
            className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded border border-white/15 hover:border-white/40 text-slate-300 hover:text-white transition-colors"
          >
            ↻ {t('Opnieuw simuleren')}
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4 text-xs flex-wrap">
        {Object.entries(BAND_STYLE).map(([k, v]) => (
          <span key={k} className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: v.bar }} />
            {t(v.label)}
          </span>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="grid grid-cols-[2rem_1fr_repeat(5,2rem)_2.5rem] gap-1 px-3 py-2 text-[11px] uppercase tracking-widest text-slate-500 bg-[var(--bg-panel)]">
          <span>#</span>
          <span>{t('Club')}</span>
          <span className="text-center">{cols[0]}</span>
          <span className="text-center">{cols[1]}</span>
          <span className="text-center">{cols[2]}</span>
          <span className="text-center">{cols[3]}</span>
          <span className="text-center">+/−</span>
          <span className="text-center">{t('Ptn')}</span>
        </div>
        {table.map((s, i) => {
          const club = clubs.get(s.clubId)!;
          const band = qualificationBand(i);
          const me = s.clubId === selectedClubId;
          const isOpen = expanded === s.clubId;
          return (
            <div key={s.clubId}>
              <button
                onClick={() => setExpanded(isOpen ? null : s.clubId)}
                className={[
                  'w-full grid grid-cols-[2rem_1fr_repeat(5,2rem)_2.5rem] gap-1 px-3 py-2 items-center text-sm border-l-2 text-left transition-colors',
                  me ? 'bg-[#C9A843]/15' : 'hover:bg-[var(--bg-card)]',
                ].join(' ')}
                style={{ borderLeftColor: BAND_STYLE[band].bar }}
              >
                <span className="text-slate-500 tabular-nums">{i + 1}</span>
                <span className="flex items-center gap-2 min-w-0">
                  <ClubFlag code={club.flagCode} size={18} />
                  <span className="truncate">{club.name}</span>
                  {me && <span className="text-[11px] uppercase tracking-widest text-[#C9A843]">{t('jij')}</span>}
                </span>
                <span className="text-center tabular-nums text-slate-400">{s.played}</span>
                <span className="text-center tabular-nums">{s.won}</span>
                <span className="text-center tabular-nums">{s.drawn}</span>
                <span className="text-center tabular-nums">{s.lost}</span>
                <span className="text-center tabular-nums text-slate-400">{s.gd > 0 ? `+${s.gd}` : s.gd}</span>
                <span className="text-center tabular-nums font-bold">{s.points}</span>
              </button>
              {isOpen && (
                <ClubFixtures clubId={s.clubId} league={league} clubs={clubs} onOverride={onOverride} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClubFixtures({
  clubId,
  league,
  clubs,
  onOverride,
}: {
  clubId: string;
  league: LeagueState;
  clubs: Map<string, UCLClub>;
  onOverride: (key: string, goals: [number, number]) => void;
}) {
  const fixtures = league.schedule.filter((m) => m.homeId === clubId || m.awayId === clubId);
  const { t } = useUclT();
  return (
    <div className="bg-black/30 px-3 py-3 space-y-1.5 border-l-2 border-[#C9A843]/30">
      {fixtures.map((m) => {
        const isHome = m.homeId === clubId;
        const oppId = isHome ? m.awayId : m.homeId;
        const opp = clubs.get(oppId)!;
        const key = matchKey(m);
        const [hg, ag] = league.goals[key] ?? [0, 0];
        const myGoals = isHome ? hg : ag;
        const oppGoals = isHome ? ag : hg;
        const result: 'W' | 'D' | 'L' = myGoals > oppGoals ? 'W' : myGoals < oppGoals ? 'L' : 'D';
        const resColor = result === 'W' ? '#2bb673' : result === 'L' ? '#ef4444' : '#94a3b8';
        return (
          <div key={key} className="flex items-center gap-3 text-sm">
            <span className="text-[11px] w-7 shrink-0 uppercase text-slate-500">{isHome ? t('Thuis') : t('Uit')}</span>
            <ClubFlag code={opp.flagCode} size={18} />
            <span className="flex-1 truncate text-slate-300">{opp.name}</span>
            <span className="tabular-nums font-semibold w-12 text-center" style={{ color: resColor }}>
              {myGoals}–{oppGoals}
            </span>
            <div className="flex gap-1 shrink-0">
              <OverrideBtn label="W" active={result === 'W'} onClick={() => onOverride(key, isHome ? [1, 0] : [0, 1])} />
              <OverrideBtn label="X" active={result === 'D'} onClick={() => onOverride(key, [1, 1])} />
              <OverrideBtn label="V" active={result === 'L'} onClick={() => onOverride(key, isHome ? [0, 1] : [1, 0])} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OverrideBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-6 h-6 rounded text-[11px] font-bold transition-colors',
        active ? 'bg-[#C9A843] text-[#001D62]' : 'bg-white/10 text-slate-400 hover:bg-white/20',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
