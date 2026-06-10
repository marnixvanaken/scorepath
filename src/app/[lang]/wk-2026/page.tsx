import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SimulatorClient from '@/app/wk-2026/SimulatorClient';
import type { InputMode } from '@/hooks/useSimulatorState';
import { isLocale, DEFAULT_LOCALE } from '@/i18n';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import { alternatesFor, ogLocaleFields, ogImages, simulatorPath } from '@/lib/routes';
import { FaqSection } from '@/components/FaqSection';
import { getFaq } from '@/data/faq';

export async function generateMetadata(props: PageProps<'/[lang]/wk-2026'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;

  const titles: Record<string, string> = {
    nl: 'WK 2026 Simulator',
    en: 'World Cup 2026 Simulator',
    es: 'Simulador Mundial 2026',
  };
  // Volledige, unieke descriptions per taal (≤ ~155 tekens) met de USP's.
  const descriptions: Record<string, string> = {
    nl: 'Speel het WK 2026 na: vul 104 wedstrijden van 48 teams in, zie live met de FIFA-tiebreakers wie doorgaat en deel je bracket via één link. Gratis.',
    en: 'Simulate the 2026 World Cup: enter 104 matches across 48 teams, see live who advances with FIFA tiebreakers and share your bracket via one link. Free.',
    es: 'Simula el Mundial 2026: rellena 104 partidos de 48 selecciones, ve en directo quién avanza con los desempates FIFA y comparte tu cuadro con un enlace. Gratis.',
  };
  const title = titles[locale] ?? titles.nl;
  const description = descriptions[locale] ?? descriptions.nl;
  const alternates = alternatesFor(simulatorPath, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title: `${SITE_NAME} — ${title}`,
      description,
      ...ogLocaleFields(locale),
      type: 'website',
      url: alternates.canonical,
      siteName: SITE_NAME,
      images: ogImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${title}`,
      description,
      images: ogImages(locale).map((i) => i.url),
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    url: `${SITE_URL}${simulatorPath(lang)}`,
    mainEntity: getFaq(lang).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <SimulatorClient initialMode={initialMode} initialView={initialView} />
      <FaqSection lang={lang} />
    </>
  );
}
