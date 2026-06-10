import type { Metadata } from 'next';
import { Bebas_Neue, Barlow_Condensed } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { Toaster } from '@/components/Toaster';
import { CookieBanner } from '@/components/CookieBanner';
import { LOCALES, DEFAULT_LOCALE, isLocale, getHtmlLang } from '@/i18n';
import { alternatesFor, ogLocaleFields, ogImages } from '@/lib/routes';

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
      ...ogLocaleFields(locale),
      type: 'website',
      siteName: SITE_NAME,
      url: `${SITE_URL}/${locale}`,
      images: ogImages(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${ogTitle}`,
      description,
      images: ogImages(locale).map((i) => i.url),
    },
    alternates: alternatesFor((l) => `/${l}`, locale),
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
        <CookieBanner />
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
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}var _cc=null;try{_cc=localStorage.getItem('cookie-consent');}catch(e){}gtag('consent','default',{'analytics_storage':_cc==='granted'?'granted':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':_cc?0:800});gtag('js',new Date());gtag('config','G-XMHT2LS1P6');`,
          }}
        />
      </body>
    </html>
  );
}
