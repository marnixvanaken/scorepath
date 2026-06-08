import type { Metadata } from 'next';
import { Bebas_Neue, Barlow_Condensed } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { Toaster } from '@/components/Toaster';
import { LOCALES, DEFAULT_LOCALE, isLocale, getHtmlLang } from '@/i18n';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<'/[lang]'>
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const ogLocale = locale === 'nl' ? 'nl_NL' : locale === 'es' ? 'es_ES' : 'en_US';

  const descriptions: Record<string, string> = {
    nl: 'Vul de groepsuitslagen in en zie live wie doorgaat naar de knockout-fase van het WK 2026.',
    en: 'Fill in the group results and see live who advances to the knockout stage of the 2026 World Cup.',
    es: 'Rellena los resultados de grupo y ve en tiempo real quién avanza a la fase eliminatoria del Mundial 2026.',
  };
  const description = descriptions[locale] ?? descriptions.nl;

  const titles: Record<string, string> = {
    nl: 'WK 2026 Simulator',
    en: 'World Cup 2026 Simulator',
    es: 'Simulador Mundial 2026',
  };
  const ogTitle = titles[locale] ?? titles.nl;

  const alternateLocales: Record<string, string> = {
    nl: 'nl_NL',
    en: 'en_US',
    es: 'es_ES',
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
    description,
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: '/icon.svg',
    },
    openGraph: {
      title: `${SITE_NAME} — ${ogTitle}`,
      description,
      locale: ogLocale,
      alternateLocale: Object.entries(alternateLocales)
        .filter(([l]) => l !== locale)
        .map(([, v]) => v),
      type: 'website',
      siteName: SITE_NAME,
      url: `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${ogTitle}`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l === 'nl' ? 'nl-NL' : l === 'en' ? 'en-US' : 'es-ES', `${SITE_URL}/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const htmlLang = getHtmlLang(locale);

  return (
    <html
      lang={htmlLang}
      className={`${bebasNeue.variable} ${barlowCondensed.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-ui">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.dataset.theme='light';}else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.dataset.theme='light';}}catch(e){}})();`,
          }}
        />
        {children}
        <Toaster />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1392037508470232"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XMHT2LS1P6"
          strategy="beforeInteractive"
        />
        <Script
          id="ga4-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});gtag('js',new Date());gtag('config','G-XMHT2LS1P6');`,
          }}
        />
      </body>
    </html>
  );
}
