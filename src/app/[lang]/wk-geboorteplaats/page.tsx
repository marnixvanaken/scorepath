import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';
import { alternatesFor, ogLocaleFields, ogImages, birthplacePath, simulatorPath, uclPath } from '@/lib/routes';
import { players } from '@/data/players';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { FeatureCard, CARD_SCHEMES } from '@/components/FeatureCard';
import BirthplaceFeature from '@/app/wk-geboorteplaats/BirthplaceFeature';

export async function generateMetadata(props: PageProps<'/[lang]/wk-geboorteplaats'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const m = getMessages(locale).birthplace;
  const alternates = alternatesFor(birthplacePath, locale);

  return {
    title: m.title,
    description: m.subtitle,
    alternates,
    openGraph: {
      title: `${SITE_NAME} — ${m.title}`,
      description: m.subtitle,
      ...ogLocaleFields(locale),
      type: 'website',
      url: alternates.canonical,
      siteName: SITE_NAME,
      images: ogImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${m.title}`,
      description: m.subtitle,
      images: ogImages(locale).map((i) => i.url),
    },
  };
}

export default async function BirthplacePage(props: PageProps<'/[lang]/wk-geboorteplaats'>) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const msg = getMessages(lang);
  const m = msg.birthplace;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href={`/${lang}`}>
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={simulatorPath(lang)}
              className="text-sm font-bold tracking-widest uppercase transition-opacity opacity-40 hover:opacity-70"
              style={{ color: 'var(--fg)' }}
            >
              {msg.nav.simulator}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <BirthplaceFeature players={players} m={m} locale={lang} />
        <section className="px-6 py-14 sm:py-16" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
            <FeatureCard
              href={uclPath(lang)}
              eyebrow={msg.home.uclEyebrow}
              title={msg.home.uclTitle}
              desc={msg.home.uclDesc}
              cta={msg.home.openUcl}
              scheme={CARD_SCHEMES.ucl}
            />
            <FeatureCard
              href={simulatorPath(lang)}
              eyebrow={msg.home.wcEyebrow}
              title={msg.home.wcTitle}
              desc={msg.home.wcDesc}
              cta={msg.home.openSimulator}
              scheme={CARD_SCHEMES.wc}
            />
          </div>
        </section>
      </main>

      <footer className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
            <Link href={`/${lang}/blog`} className="transition-opacity hover:opacity-70">{msg.nav.blog}</Link>
            <span>·</span>
            <Link href={simulatorPath(lang)} className="transition-opacity hover:opacity-70">{msg.nav.simulator}</Link>
            <span>·</span>
            <Link href={`/${lang}/about`} className="transition-opacity hover:opacity-70">{msg.nav.about}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
