import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig';
import { isLocale, DEFAULT_LOCALE, getMessages } from '@/i18n';
import { alternatesFor, ogLocaleFields, ogImages } from '@/lib/routes';

export async function generateMetadata(props: PageProps<'/[lang]/about'>): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const msg = getMessages(locale);
  const title = msg.about.pageTitle;
  const description = msg.about.pageDescription;
  const alternates = alternatesFor((l) => `/${l}/about`, locale);
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

export default async function AboutPage(props: PageProps<'/[lang]/about'>) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const msg = getMessages(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: 'admin@scorepath.nl',
    description: msg.about.pageDescription,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
  };

  return (
    <div className="min-h-screen flex flex-col bg-themed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <header className="px-6 sm:px-10 py-5 border-b border-themed">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${lang}`}><Logo size="sm" /></Link>
        </div>
      </header>

      <main className="flex-1 px-6 sm:px-10 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl mb-6 c-fg">{msg.about.pageTitle}</h1>

          <p className="c-fg-muted leading-relaxed mb-8">{msg.about.intro}</p>

          <h2 className="font-bold text-lg c-fg mb-2">{msg.about.howTitle}</h2>
          <p className="c-fg-muted leading-relaxed mb-8">{msg.about.how}</p>

          <h2 className="font-bold text-lg c-fg mb-2">{msg.about.editorialTitle}</h2>
          <p className="c-fg-muted leading-relaxed mb-8">{msg.about.editorial}</p>

          <h2 className="font-bold text-lg c-fg mb-2">{msg.about.contactTitle}</h2>
          <p className="c-fg-muted leading-relaxed">
            {msg.about.contact.split('admin@scorepath.nl')[0]}
            <a href="mailto:admin@scorepath.nl" className="c-cta underline">admin@scorepath.nl</a>
            {msg.about.contact.split('admin@scorepath.nl')[1] ?? ''}
          </p>
        </div>
      </main>

      <footer className="border-t border-themed px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="c-fg-subtle flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase">
            <Link href={`/${lang}/privacy`} className="hover:opacity-70 transition-opacity">{msg.nav.privacy}</Link>
            <span>·</span>
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
