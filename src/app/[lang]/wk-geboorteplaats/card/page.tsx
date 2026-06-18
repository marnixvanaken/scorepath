import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { isLocale, getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';
import { birthplacePath } from '@/lib/routes';
import { BirthplaceCardActions } from '@/app/wk-geboorteplaats/BirthplaceCardActions';

export default async function BirthplaceCardPage(
  props: PageProps<'/[lang]/wk-geboorteplaats/card'> & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const msg = getMessages(lang);
  const m = msg.birthplace;

  const params = await props.searchParams;
  function getParam(key: string): string {
    const v = params[key];
    return (Array.isArray(v) ? v[0] : v) ?? '';
  }

  const playerIds = [1, 2, 3, 4, 5].map((i) => getParam(`p${i}`)).filter(Boolean);
  if (playerIds.length === 0) redirect(birthplacePath(lang));

  const ogParams = new URLSearchParams();
  [1, 2, 3, 4, 5].forEach((i) => {
    const pid = getParam(`p${i}`);
    const dist = getParam(`d${i}`);
    if (pid) { ogParams.set(`p${i}`, pid); ogParams.set(`d${i}`, dist || '0'); }
  });
  ogParams.set('lang', lang);
  const ogUrl = `/api/og/birthplace?${ogParams.toString()}`;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href={`/${lang}`}><Logo size="sm" /></Link>
          <ThemeToggle />
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center px-6 pt-12 pb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8 opacity-40">
          {m.cardTagline.toUpperCase()}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogUrl}
          alt={m.cardTagline}
          className="w-full max-w-sm rounded-lg shadow-xl"
          style={{ border: '1px solid var(--border)' }}
        />

        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <BirthplaceCardActions ogUrl={ogUrl} />
          <Link
            href={birthplacePath(lang)}
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
