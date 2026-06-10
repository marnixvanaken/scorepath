import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n';
import { SIMULATOR_SLUG, SIMULATOR_PHYSICAL_SLUG, BLOG_SLUGS } from '@/lib/routes';

const NL_COUNTRIES = new Set(['NL', 'BE', 'SR']);
const ES_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC',
  'BO', 'PY', 'UY', 'CR', 'PA', 'HN', 'GT', 'SV',
  'DO', 'CU', 'NI', 'PR', 'GQ',
]);

function getPreferredLocale(request: NextRequest): string {
  // 1. Eerder gemaakte keuze (cookie)
  const cookiePref = request.cookies.get('locale-pref')?.value;
  if (cookiePref && isLocale(cookiePref)) return cookiePref;

  // 2. Land op basis van IP (Vercel-header, gratis, geen logging)
  const country = request.headers.get('x-vercel-ip-country')?.toUpperCase() ?? '';
  if (NL_COUNTRIES.has(country)) return 'nl';
  if (ES_COUNTRIES.has(country)) return 'es';
  if (country) return 'en';

  // 3. Accept-Language header als fallback
  const acceptLang = request.headers.get('accept-language') ?? '';
  for (const part of acceptLang.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase();
    const lang = tag.split('-')[0];
    if (isLocale(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Host-consistentie: 301 apex (scorepath.nl) -> www.scorepath.nl ──
  // Definitieve canonieke redirect hoort op DNS/hosting-niveau te staan; dit is
  // een defensieve fallback zodat de canonieke host altijd www is.
  const host = request.headers.get('host') ?? '';
  if (host === 'scorepath.nl') {
    const url = request.nextUrl.clone();
    url.host = 'www.scorepath.nl';
    url.port = '';
    return NextResponse.redirect(url, { status: 301 });
  }

  const segs = pathname.split('/').filter(Boolean);
  const maybeLang = segs[0];

  // ── Reeds gelokaliseerde paden: slug-redirects/rewrites ──
  if (isLocale(maybeLang)) {
    const lang = maybeLang as Locale;
    const rest = segs.slice(1);

    // Simulator: oude/foute slug -> 301 naar gelokaliseerde slug
    if (rest[0] === SIMULATOR_PHYSICAL_SLUG && lang !== 'nl') {
      const url = request.nextUrl.clone();
      url.pathname = `/${lang}/${SIMULATOR_SLUG[lang]}${rest.length > 1 ? '/' + rest.slice(1).join('/') : ''}`;
      return NextResponse.redirect(url, { status: 301 });
    }
    // Simulator: gelokaliseerde slug -> intern rewrite naar fysieke route
    if (lang !== 'nl' && rest[0] === SIMULATOR_SLUG[lang]) {
      const url = request.nextUrl.clone();
      url.pathname = `/${lang}/${SIMULATOR_PHYSICAL_SLUG}${rest.length > 1 ? '/' + rest.slice(1).join('/') : ''}`;
      return NextResponse.rewrite(url);
    }

    // Blog: oude (canonieke nl-)slug onder en/es -> 301 naar gelokaliseerde slug
    if (rest[0] === 'blog' && rest[1]) {
      const localized = BLOG_SLUGS[rest[1]]?.[lang];
      if (localized && localized !== rest[1]) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lang}/blog/${localized}`;
        return NextResponse.redirect(url, { status: 301 });
      }
    }

    return;
  }

  // Redirect oude /wk-2026 URLs naar /nl/wk-2026 (querystring behouden)
  const legacyPaths = ['/wk-2026', '/blog', '/privacy', '/start'];
  const matchesLegacy = legacyPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (matchesLegacy) {
    request.nextUrl.pathname = `/nl${pathname}`;
    return NextResponse.redirect(request.nextUrl, { status: 301 });
  }

  // Redirect root naar voorkeurstaal
  if (pathname === '/') {
    const locale = getPreferredLocale(request);
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
};
