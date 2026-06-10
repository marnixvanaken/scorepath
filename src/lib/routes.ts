import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n';
import { SITE_URL } from '@/lib/siteConfig';

// ── Gelokaliseerde slugs ──────────────────────────────────────────────
// De simulatorpagina heeft per taal een eigen, betekenisvolle slug.
export const SIMULATOR_SLUG: Record<Locale, string> = {
  nl: 'wk-2026',
  en: 'world-cup-2026',
  es: 'mundial-2026',
};

// Fysieke routesegment in de app-router voor de simulator (= de nl-slug).
// en/es worden via de proxy gerewrite naar dit segment.
export const SIMULATOR_PHYSICAL_SLUG = SIMULATOR_SLUG.nl;

// Blog: canonieke slug (= nl-slug, tevens content-key) -> gelokaliseerde slug per taal.
export const BLOG_SLUGS: Record<string, Record<Locale, string>> = {
  'drie-legendes-wk-2026': {
    nl: 'drie-legendes-wk-2026',
    en: 'three-legends-world-cup-2026',
    es: 'tres-leyendas-mundial-2026',
  },
  'vs-iran-wk-2026': {
    nl: 'vs-iran-wk-2026',
    en: 'usa-iran-world-cup-2026',
    es: 'eeuu-iran-mundial-2026',
  },
  'mbappe-jaagt-klose': {
    nl: 'mbappe-jaagt-klose',
    en: 'mbappe-chases-klose',
    es: 'mbappe-persigue-klose',
  },
  'messi-meeste-wk-wedstrijden': {
    nl: 'messi-meeste-wk-wedstrijden',
    en: 'messi-most-world-cup-matches',
    es: 'messi-mas-partidos-mundial',
  },
  'yamal-euro-wk-dubbel': {
    nl: 'yamal-euro-wk-dubbel',
    en: 'yamal-euro-world-cup-double',
    es: 'yamal-doblete-euro-mundial',
  },
  'oudste-coach-wk-2026': {
    nl: 'oudste-coach-wk-2026',
    en: 'oldest-coach-world-cup-2026',
    es: 'entrenador-mas-veterano-mundial-2026',
  },
  'courtois-clean-sheets': {
    nl: 'courtois-clean-sheets',
    en: 'courtois-clean-sheets',
    es: 'courtois-porterias-a-cero',
  },
  'messi-vrije-trappen-rivelino': {
    nl: 'messi-vrije-trappen-rivelino',
    en: 'messi-free-kicks-rivelino',
    es: 'messi-tiros-libres-rivelino',
  },
  'tim-payne-viral-wk': {
    nl: 'tim-payne-viral-wk',
    en: 'tim-payne-viral-world-cup',
    es: 'tim-payne-viral-mundial',
  },
};

function toLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

// ── Pad-helpers ───────────────────────────────────────────────────────
export function simulatorPath(locale: string): string {
  const l = toLocale(locale);
  return `/${l}/${SIMULATOR_SLUG[l]}`;
}

export function localizedBlogSlug(canonical: string, locale: string): string {
  const l = toLocale(locale);
  return BLOG_SLUGS[canonical]?.[l] ?? canonical;
}

export function blogPath(locale: string, canonical: string): string {
  const l = toLocale(locale);
  return `/${l}/blog/${localizedBlogSlug(canonical, l)}`;
}

// Reverse: gegeven een taal + slug uit de URL -> canonieke slug (of null).
export function canonicalBlogSlug(locale: string, slug: string): string | null {
  const l = toLocale(locale);
  for (const [canonical, map] of Object.entries(BLOG_SLUGS)) {
    if (map[l] === slug) return canonical;
  }
  return null;
}

// Resolve een inkomende blog-slug (in welke taal dan ook) naar de canonieke key.
// Valt terug op de slug zelf zodat dynamische (Supabase-)posts blijven werken.
export function resolveBlogSlug(locale: string, slug: string): string {
  return canonicalBlogSlug(locale, slug) ?? slug;
}

// ── hreflang / og:locale ──────────────────────────────────────────────
export const HREFLANG: Record<Locale, string> = { nl: 'nl-NL', en: 'en-US', es: 'es-ES' };
export const OG_LOCALE: Record<Locale, string> = { nl: 'nl_NL', en: 'en_US', es: 'es_ES' };

// Bouwt canonical + languages (incl. x-default -> en) voor metadata.alternates.
export function alternatesFor(
  pathFor: (l: Locale) => string,
  currentLocale: string,
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE_URL}${pathFor(l)}`;
  languages['x-default'] = `${SITE_URL}${pathFor('en')}`;
  return { canonical: `${SITE_URL}${pathFor(toLocale(currentLocale))}`, languages };
}

// og:locale + og:locale:alternate velden voor openGraph.
export function ogLocaleFields(locale: string): { locale: string; alternateLocale: string[] } {
  const l = toLocale(locale);
  return {
    locale: OG_LOCALE[l],
    alternateLocale: LOCALES.filter((other) => other !== l).map((other) => OG_LOCALE[other]),
  };
}

// ── Taalwisselaar: vertaal een volledig pad naar een andere taal ──────
export function translatePath(pathname: string, toLocaleValue: string): string {
  const to = toLocale(toLocaleValue);
  const segs = pathname.split('/').filter(Boolean); // [lang, ...rest]
  const fromLang = segs[0];
  const rest = segs.slice(1);
  if (rest.length === 0) return `/${to}`;

  // Simulator (incl. subpaden zoals /card)
  if (isLocale(fromLang) && rest[0] === SIMULATOR_SLUG[fromLang]) {
    const tail = rest.slice(1);
    return `/${to}/${SIMULATOR_SLUG[to]}${tail.length ? '/' + tail.join('/') : ''}`;
  }

  // Blog-artikel
  if (rest[0] === 'blog' && rest[1]) {
    const canonical = isLocale(fromLang) ? canonicalBlogSlug(fromLang, rest[1]) : null;
    if (canonical) return `/${to}/blog/${localizedBlogSlug(canonical, to)}`;
  }

  // Overig (blog-index, privacy, about): alleen taalprefix wisselen
  return `/${to}/${rest.join('/')}`;
}
