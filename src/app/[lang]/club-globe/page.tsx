import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';
import { alternatesFor, ogLocaleFields, ogImages, globePath } from '@/lib/routes';
import { clubs } from '@/data/clubs';
import { SiteHeader } from '@/components/SiteHeader';
import GlobeFeature from '@/app/club-globe/GlobeFeature';

export async function generateMetadata(props: PageProps<'/[lang]/club-globe'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const m = getMessages(locale).globe;
  const alternates = alternatesFor(globePath, locale);

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

export default async function GlobePage(props: PageProps<'/[lang]/club-globe'>) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const msg = getMessages(lang);

  return (
    <div className="h-dvh flex flex-col overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <SiteHeader lang={lang} width="max-w-none" />
      <main className="flex-1 min-h-0 relative">
        <GlobeFeature clubs={clubs} m={msg.globe} locale={lang} />
      </main>
    </div>
  );
}
