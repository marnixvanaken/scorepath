'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { LOCALES } from '@/i18n';

const LOCALE_META: Record<string, { flag: string; label: string }> = {
  nl: { flag: '🇳🇱', label: 'NL' },
  en: { flag: '🇬🇧', label: 'EN' },
  es: { flag: '🇪🇸', label: 'ES' },
};

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = typeof params?.lang === 'string' ? params.lang : 'nl';

  function hrefFor(lang: string) {
    if (!pathname) return `/${lang}`;
    // Replace the current locale segment with the new one
    const withoutLang = pathname.replace(/^\/(nl|en|es)(\/|$)/, '/');
    return `/${lang}${withoutLang === '/' ? '' : withoutLang}`;
  }

  return (
    <div className="flex items-center gap-0.5" aria-label="Select language">
      {LOCALES.map((lang) => {
        const meta = LOCALE_META[lang];
        const isActive = lang === currentLang;
        return (
          <Link
            key={lang}
            href={hrefFor(lang)}
            aria-label={meta.label}
            aria-current={isActive ? 'true' : undefined}
            className={`flex items-center gap-1 px-2 min-h-[36px] rounded-md text-[11px] font-bold tracking-wider transition-colors ${
              isActive
                ? 'c-fg bg-white/10'
                : 'c-fg-subtle hover:c-fg hover:bg-white/5'
            }`}
          >
            <span aria-hidden="true">{meta.flag}</span>
            {meta.label}
          </Link>
        );
      })}
    </div>
  );
}
