import Link from 'next/link';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TEAMS } from '@/data/worldcup2026';
import { CardActions } from '@/app/wk-2026/card/CardActions';
import { isLocale, getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';

export default async function CardPage(
  props: PageProps<'/[lang]/wk-2026/card'> & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const msg = getMessages(lang);

  const params = await props.searchParams;
  const teamId = Array.isArray(params.team) ? params.team[0] : params.team;
  const s = Array.isArray(params.s) ? params.s[0] : params.s;
  const k = Array.isArray(params.k) ? params.k[0] : params.k;

  if (!teamId || !s) redirect(`/${lang}/wk-2026`);
  const team = TEAMS.find((t) => t.id === teamId);
  if (!team) redirect(`/${lang}/wk-2026`);

  const ogParams = new URLSearchParams();
  ogParams.set('team', teamId);
  ogParams.set('s', s);
  if (k) ogParams.set('k', k);
  const ogUrl = `/api/og?${ogParams.toString()}`;

  const bracketParams = new URLSearchParams();
  bracketParams.set('s', s);
  if (k) bracketParams.set('k', k);
  const bracketUrl = `/api/og/bracket?${bracketParams.toString()}`;

  const backUrl = `/${lang}/wk-2026?s=${s}${k ? `&k=${k}` : ''}`;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>

      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center px-6 pt-12 pb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-40">
          {team.name.toUpperCase()}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogUrl}
          alt={`${team.name} WK 2026`}
          className="w-full max-w-sm rounded-lg shadow-xl"
          style={{ border: '1px solid var(--border)' }}
        />

        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <CardActions ogUrl={ogUrl} bracketUrl={bracketUrl} teamName={team.name} />
          <Link
            href={backUrl}
            className="px-6 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)', borderRadius: '0 8px 0 8px' }}
          >
            {msg.card.back}
          </Link>
        </div>
      </section>

      <footer className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
            {SITE_NAME.toLowerCase()}.nl
          </p>
        </div>
      </footer>

    </div>
  );
}
