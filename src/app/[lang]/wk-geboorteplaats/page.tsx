import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';
import { alternatesFor, ogLocaleFields, ogImages, birthplacePath } from '@/lib/routes';
import { players } from '@/data/players';
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

  const m = getMessages(lang).birthplace;

  return <BirthplaceFeature players={players} m={m} />;
}
