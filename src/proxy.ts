import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, isLocale } from '@/i18n';

function getPreferredLocale(request: NextRequest): string {
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
