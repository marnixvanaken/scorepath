import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { clubById } from '@/data/ucl2027';
import { CardActions } from '@/app/ucl-2027/card/CardActions';
import { isLocale } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';

export default async function UCLCardPage(props: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const params = await props.searchParams;
  const teamId = Array.isArray(params.team) ? params.team[0] : params.team;
  const m = Array.isArray(params.m) ? params.m[0] : params.m;

  if (!teamId) redirect(`/${lang}/ucl-2027`);
  const club = clubById(teamId);
  if (!club) redirect(`/${lang}/ucl-2027`);

  const ogParams = new URLSearchParams();
  ogParams.set('team', teamId);
  if (m) ogParams.set('m', m);
  ogParams.set('lang', lang);
  const ogUrl = `/api/og/ucl?${ogParams.toString()}`;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <ThemeToggle />
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center px-6 pt-12 pb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-40">
          {club.name.toUpperCase()} · CHAMPIONS LEAGUE 2026/27
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogUrl}
          alt={`${club.name} Champions League 2026/27`}
          className="w-full max-w-sm rounded-lg shadow-xl"
          style={{ border: '1px solid var(--border)' }}
        />

        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <CardActions ogUrl={ogUrl} teamName={club.name} />
          <Link
            href={`/${lang}/ucl-2027`}
            className="px-6 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--fg-subtle)', borderRadius: '0 8px 0 8px' }}
          >
            Terug
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
