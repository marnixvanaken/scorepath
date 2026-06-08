import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, isLocale } from '@/i18n';

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

  // Check if the path already starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Redirect old /wk-2026 URLs to /nl/wk-2026 (preserve query params)
  const legacyPaths = ['/wk-2026', '/blog', '/privacy', '/start'];
  const matchesLegacy = legacyPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (matchesLegacy) {
    request.nextUrl.pathname = `/nl${pathname}`;
    return NextResponse.redirect(request.nextUrl, { status: 301 });
  }

  // Redirect root to preferred locale
  if (pathname === '/') {
    const locale = getPreferredLocale(request);
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
};
