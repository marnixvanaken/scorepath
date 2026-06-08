import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SimulatorClient from '@/app/wk-2026/SimulatorClient';
import type { InputMode } from '@/hooks/useSimulatorState';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';

export async function generateMetadata(props: PageProps<'/[lang]/wk-2026'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const msg = getMessages(locale);

  const titles: Record<string, string> = {
    nl: 'WK 2026 Simulator',
    en: 'World Cup 2026 Simulator',
    es: 'Simulador Mundial 2026',
  };

  return {
    title: titles[locale] ?? titles.nl,
    description: msg.header.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${locale}/wk-2026`,
      languages: {
        'nl-NL': `${SITE_URL}/nl/wk-2026`,
        'en-US': `${SITE_URL}/en/wk-2026`,
        'es-ES': `${SITE_URL}/es/wk-2026`,
      },
    },
    openGraph: {
      title: `${SITE_NAME} — ${titles[locale] ?? titles.nl}`,
      description: msg.header.subtitle,
      url: `${SITE_URL}/${locale}/wk-2026`,
      siteName: SITE_NAME,
    },
  };
}

export default async function SimulatorPage(
  props: PageProps<'/[lang]/wk-2026'> & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const params = await props.searchParams;
  const rawMode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const initialMode: InputMode =
    rawMode === 'winner' || rawMode === 'quick' ? 'winner'
    : rawMode === 'drag' ? 'drag'
    : 'drag';
  const rawView = Array.isArray(params.view) ? params.view[0] : params.view;
  const initialView = rawView === 'knockout' ? 'knockout' : 'groepsfase';

  return <SimulatorClient initialMode={initialMode} initialView={initialView} />;
}
