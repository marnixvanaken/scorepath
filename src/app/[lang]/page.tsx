import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME } from '@/lib/siteConfig';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';
import { alternatesFor, ogLocaleFields, ogImages, simulatorPath } from '@/lib/routes';

export async function generateMetadata(props: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const msg = getMessages(locale);

  const descriptions: Record<string, string> = {
    nl: 'Gratis WK 2026 simulator: speel alle 104 wedstrijden, 48 teams en 12 groepen na met de échte FIFA-regels en deel je scenario via één link.',
    en: 'Free 2026 World Cup simulator: play out all 104 matches, 48 teams and 12 groups with the real FIFA rules and share your scenario via one link.',
    es: 'Simulador gratuito del Mundial 2026: juega los 104 partidos, 48 selecciones y 12 grupos con las reglas reales de la FIFA y comparte tu escenario con un enlace.',
  };
  const description = descriptions[locale] ?? descriptions.nl;

  return {
    title: { absolute: `${msg.header.title} · ${SITE_NAME}` },
    description,
    openGraph: {
      title: `${SITE_NAME} — ${msg.header.title}`,
      description,
      ...ogLocaleFields(locale),
      type: 'website',
      siteName: SITE_NAME,
      url: alternatesFor((l) => `/${l}`, locale).canonical,
      images: ogImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${msg.header.title}`,
      description,
      images: ogImages(locale).map((i) => i.url),
    },
    alternates: alternatesFor((l) => `/${l}`, locale),
  };
}

export default async function HomePage(props: PageProps<'/[lang]'> & {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const params = await props.searchParams;
  const s = params.s;
  if (s) {
    const encoded = Array.isArray(s) ? s[0] : s;
    redirect(`${simulatorPath(lang)}?s=${encoded}`);
  }

  const msg = getMessages(lang);

  return (
    <div className="min-h-dvh flex flex-col bg-themed">

      <nav className="px-6 sm:px-10 py-5 border-b border-themed">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/blog`}
              className="c-fg text-sm font-bold tracking-widest uppercase transition-opacity opacity-40 hover:opacity-70"
            >
              {msg.nav.blog}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <section className="flex-1 flex flex-col justify-center px-6 sm:px-10 pt-16 pb-16">
        <div className="max-w-5xl mx-auto w-full">

          <h1 className="font-display leading-[0.88] mb-10 flex items-end gap-3 sm:gap-5">
            <span
              className="c-fg-muted"
              style={{ fontSize: 'clamp(4.5rem, 14vw, 10rem)' }}
            >
              {lang === 'es' ? 'MUNDIAL' : 'WK'}
            </span>
            <span
              className="text-[#D93B1F]"
              style={{ fontSize: 'clamp(4.5rem, 14vw, 10rem)' }}
            >
              2026
            </span>
          </h1>

          <p
            className="c-fg font-bold leading-snug mb-5 max-w-xl"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            {msg.home.tagline1}<br />
            {msg.home.tagline2}
          </p>

          <p
            className="c-fg-muted mb-12 max-w-lg leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}
          >
            {msg.home.description}
          </p>

          <CTALink href={simulatorPath(lang)} label={msg.home.openSimulator} />
        </div>
      </section>

      <section className="border-t border-b border-themed">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3">
          {[
            { num: '01', label: msg.home.step01Label, sub: msg.home.step01Sub },
            { num: '02', label: msg.home.step02Label, sub: msg.home.step02Sub },
            { num: '03', label: msg.home.step03Label, sub: msg.home.step03Sub },
          ].map(({ num, label, sub }, i) => (
            <div
              key={num}
              className={`px-6 sm:px-8 py-5 sm:py-7 flex items-center gap-5 border-themed ${i > 0 ? 'border-t sm:border-t sm:border-l-0' : ''}`}
            >
              <span
                className="c-cta font-display leading-none shrink-0"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}
              >
                {num}
              </span>
              <div>
                <p className="c-fg text-sm font-bold tracking-widest uppercase">{label}</p>
                <p className="c-fg-subtle text-xs mt-1 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="c-fg-subtle flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
            <Link href={`/${lang}/blog`} className="hover:opacity-70 transition-opacity">{msg.nav.blog}</Link>
            <span>·</span>
            <Link href={simulatorPath(lang)} className="hover:opacity-70 transition-opacity">{msg.nav.simulator}</Link>
            <span>·</span>
            <Link href={`/${lang}/about`} className="hover:opacity-70 transition-opacity">{msg.nav.about}</Link>
            <span>·</span>
            <Link href={`/${lang}/privacy`} className="hover:opacity-70 transition-opacity">{msg.nav.privacy}</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function CTALink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-4 font-display tracking-widest text-white bg-[#D93B1F] hover:bg-[#C42F15] transition-colors active:opacity-80"
      style={{
        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        padding: 'clamp(1rem, 2vw, 1.4rem) clamp(1.5rem, 4vw, 3rem)',
        borderRadius: '0 12px 0 12px',
      }}
    >
      {label}
      <svg
        style={{ width: 'clamp(18px, 2.5vw, 26px)', height: 'clamp(18px, 2.5vw, 26px)' }}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
