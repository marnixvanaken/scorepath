import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TEAMS } from '@/data/worldcup2026';
import { CardActions } from './CardActions';

export default async function CardPage({
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

  const ogParams = new URLSearchParams();
  ogParams.set('team', teamId);
  ogParams.set('s', s);
  if (k) ogParams.set('k', k);
  const ogUrl = `/api/og?${ogParams.toString()}`;

  const resultUrl = `/wk-2026/result?${ogParams.toString()}`;
  const backUrl = `/wk-2026?s=${s}${k ? `&k=${k}` : ''}`;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>

      {/* ── NAV ── */}
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link
              href={resultUrl}
              className="text-xs font-bold tracking-widest uppercase transition-opacity opacity-40 hover:opacity-70"
              style={{ color: 'var(--fg)' }}
            >
              ← Route
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── CARD PREVIEW ── */}
      <section className="flex-1 flex flex-col items-center px-6 pt-12 pb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-40">
          Jouw kaart · {team.name}
        </p>

        {/* Card image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogUrl}
          alt={`${team.name} WK 2026 kaart`}
          className="w-full max-w-sm rounded-lg shadow-xl"
          style={{ border: '1px solid var(--border)' }}
        />

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <CardActions ogUrl={ogUrl} teamName={team.name} />
          <Link
            href={resultUrl}
            className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
          >
            BEKIJK ROUTE
          </Link>
          <Link
            href={backUrl}
            className="px-6 py-3 text-sm font-bold tracking-widest uppercase rounded-sm transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)' }}
          >
            TERUG
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
            scorepath.app
          </p>
        </div>
      </footer>

    </div>
  );
}
