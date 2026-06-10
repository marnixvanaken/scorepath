import { getFaq } from '@/data/faq';
import { isLocale, DEFAULT_LOCALE } from '@/i18n';

const HEADING: Record<string, string> = {
  nl: 'Veelgestelde vragen',
  en: 'Frequently asked questions',
  es: 'Preguntas frecuentes',
};

// Server-component: rendert de FAQ als native <details> zodat de inhoud altijd in
// de DOM staat (SEO) en zonder client-JS in/uit te klappen is.
export function FaqSection({ lang }: { lang: string }) {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const faq = getFaq(locale);

  return (
    <section className="bg-themed c-fg border-t border-themed" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 id="faq-heading" className="font-display text-2xl sm:text-3xl mb-6 c-fg">
          {HEADING[locale] ?? HEADING.nl}
        </h2>
        <div className="flex flex-col gap-2">
          {faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold c-fg select-none">
                {item.q}
                <svg
                  className="shrink-0 transition-transform group-open:rotate-180"
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed c-fg-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
