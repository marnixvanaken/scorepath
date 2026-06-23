import Link from 'next/link';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TEAMS } from '@/data/worldcup2026';
import { CardViewer } from '@/app/wk-2026/card/CardViewer';
import { isLocale, getMessages, DEFAULT_LOCALE } from '@/i18n';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import { simulatorPath, birthplacePath } from '@/lib/routes';

export async function generateMetadata(
  props: PageProps<'/[lang]/wk-2026/card'> & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const params = await props.searchParams;
  const teamId = Array.isArray(params.team) ? params.team[0] : params.team;
  const s = Array.isArray(params.s) ? params.s[0] : params.s;
  const k = Array.isArray(params.k) ? params.k[0] : params.k;

  const team = teamId && s ? TEAMS.find((t) => t.id === teamId) : null;
  if (!team || !s) return { title: `${SITE_NAME} · WK 2026` };

  const ogParams = new URLSearchParams({ team: teamId!, s, lang: locale });
  if (k) ogParams.set('k', k);
  const ogImageUrl = `${SITE_URL}/api/og?${ogParams.toString()}`;

  const title = `${team.name} · WK 2026 · ${SITE_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [{ url: ogImageUrl, width: 1800, height: 2700, alt: `${team.name} WK 2026 route` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: [ogImageUrl],
    },
  };
}

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

  if (!teamId || !s) redirect(simulatorPath(lang));
  const team = TEAMS.find((t) => t.id === teamId);
  if (!team) redirect(simulatorPath(lang));

  const ogParams = new URLSearchParams();
  ogParams.set('team', teamId);
  ogParams.set('s', s);
  if (k) ogParams.set('k', k);
  ogParams.set('lang', lang);
  const ogUrl = `/api/og?${ogParams.toString()}`;

  const bracketParams = new URLSearchParams();
  bracketParams.set('s', s);
  if (k) bracketParams.set('k', k);
  bracketParams.set('lang', lang);
  const bracketUrl = `/api/og/bracket?${bracketParams.toString()}`;

  const backUrl = `${simulatorPath(lang)}?s=${s}${k ? `&k=${k}` : ''}`;

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

        <CardViewer ogUrl={ogUrl} bracketUrl={bracketUrl} teamName={team.name} />

        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <Link
            href={backUrl}
            className="px-6 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)', borderRadius: '0 8px 0 8px' }}
          >
            {msg.card.back}
          </Link>
        </div>
      </section>

      {/* Birthplace cross-promo */}
      <section className="px-6 py-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs font-bold tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--fg-subtle)' }}>
          {msg.home.birthplaceTitle}
        </p>
        <Link
          href={birthplacePath(lang)}
          className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ border: '1px solid var(--cta)', color: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
        >
          {msg.home.openBirthplace}
        </Link>
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
