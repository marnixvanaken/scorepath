import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { decodeResults } from '@/lib/serialization';
import { decodeKnockout } from '@/lib/bracket';
import { computeAllGroups, rankThirdPlaced, getQualifiers } from '@/lib/standings';
import { traceRoute, resultLabel, type RouteRound } from '@/lib/route';
import { TEAMS } from '@/data/worldcup2026';
import { flagUrl } from '@/data/flags';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ShareResultButton } from './ShareResultButton';

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const teamId = Array.isArray(params.team) ? params.team[0] : params.team;
  const s = Array.isArray(params.s) ? params.s[0] : params.s;
  const k = Array.isArray(params.k) ? params.k[0] : params.k;

  if (!teamId || !s) redirect('/wk-2026');

  const team = TEAMS.find((t) => t.id === teamId);
  if (!team) redirect('/wk-2026');

  const results = decodeResults(s);
  const kr = k ? decodeKnockout(k) : {};
  const allGroups = computeAllGroups(results, {}, {});
  const thirds = rankThirdPlaced(allGroups);
  const qualifiers = getQualifiers(results, {}, {});
  const route = traceRoute(teamId, qualifiers, kr);

  if (route.result === 'niet-gekwalificeerd') {
    redirect(`/wk-2026?s=${s}`);
  }

  const flag = flagUrl(teamId, 40);
  const finalResult = resultLabel(route.result);
  const isChampion = route.result === 'kampioen';
  const backUrl = `/wk-2026?s=${s}${k ? `&k=${k}` : ''}`;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>

      {/* ── NAV ── */}
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link
              href={backUrl}
              className="text-xs font-bold tracking-widest uppercase transition-opacity opacity-40 hover:opacity-70"
              style={{ color: 'var(--fg)' }}
            >
              ← Terug
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <section className="px-6 pt-12 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-40">
            De route · WK 2026
          </p>
          <div className="flex items-center gap-4 mb-2">
            {flag && (
              <span className="overflow-hidden rounded-sm" style={{ border: '1px solid var(--border)' }}>
                <Image src={flag} alt={team.name} width={36} height={24} unoptimized />
              </span>
            )}
            <h1 className="font-display text-5xl sm:text-6xl leading-none" style={{ color: 'var(--fg)' }}>
              {team.name.toUpperCase()}
            </h1>
          </div>
          {route.qualifiedFrom && (
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              Gekwalificeerd via {route.qualifiedFrom}
            </p>
          )}
        </div>
      </section>

      {/* ── ROUTE ── */}
      <section className="px-6 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-0" style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {route.rounds.map((round, i) => (
              <RouteRow
                key={round.round}
                round={round}
                isLast={i === route.rounds.length - 1}
              />
            ))}
          </div>

          {/* Result summary */}
          <div
            className="mt-4 p-6 rounded-lg"
            style={{
              background: isChampion ? 'var(--gold)' : '#1A1A1A',
              color: isChampion ? '#000' : 'var(--fg)',
            }}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-6xl sm:text-8xl leading-none">{finalResult.toUpperCase()}</span>
            </div>
            <p className="text-sm font-bold opacity-60 tracking-widest uppercase">
              {team.name} · WK 2026
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href={`/wk-2026/card?team=${teamId}&s=${s}${k ? `&k=${k}` : ''}`}
              className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--cta)' }}
            >
              MAAK KAART →
            </Link>
            <ShareResultButton />
            <Link
              href={backUrl}
              className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-opacity hover:opacity-70"
              style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)' }}
            >
              TERUG
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
            scorepath.app · WK 2026
          </p>
        </div>
      </footer>

    </div>
  );
}

function RouteRow({ round, isLast }: { round: RouteRound; isLast: boolean }) {
  const won = round.won;
  const pending = won === null;

  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        background: 'var(--bg-card)',
        opacity: pending ? 0.5 : 1,
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className="text-[10px] font-bold tracking-widest uppercase shrink-0 w-24"
          style={{ color: 'var(--fg-subtle)' }}
        >
          {round.label}
        </span>
        <span className="font-bold text-sm" style={{ color: 'var(--fg)' }}>
          vs {round.opponentId ? round.opponentLabel.replace(/^[12]e Gr\. /, '') : round.opponentLabel}
        </span>
      </div>
      <span
        className="font-display text-2xl leading-none shrink-0"
        style={{ color: pending ? 'var(--fg-subtle)' : won ? 'var(--gold)' : 'var(--cta)' }}
      >
        {pending ? '—' : won ? '✓' : '✗'}
      </span>
    </div>
  );
}
