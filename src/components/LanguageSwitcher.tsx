'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { LOCALES } from '@/i18n';
import { translatePath } from '@/lib/routes';

const LOCALE_META: Record<string, { flag: string; label: string }> = {
  nl: { flag: '🇳🇱', label: 'NL' },
  en: { flag: '🇬🇧', label: 'EN' },
  es: { flag: '🇪🇸', label: 'ES' },
};

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = typeof params?.lang === 'string' ? params.lang : 'nl';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', onOutside);
      document.addEventListener('touchstart', onOutside, { passive: true });
    }
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside as EventListener);
    };
  }, [open]);

  function hrefFor(lang: string) {
    if (!pathname) return `/${lang}`;
    return translatePath(pathname, lang);
  }

  const current = LOCALE_META[currentLang] ?? LOCALE_META.nl;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2 min-h-[36px] rounded-md text-[11px] font-bold tracking-wider c-fg-subtle hover:c-fg transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true">{current.flag}</span>
        {current.label}
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="dropdown absolute right-0 top-full mt-1 z-30 rounded-xl shadow-xl overflow-hidden"
            style={{ minWidth: '6.5rem' }}
            role="listbox"
          >
            {LOCALES.map((lang) => {
              const meta = LOCALE_META[lang];
              const isActive = lang === currentLang;
              return (
                <Link
                  key={lang}
                  href={hrefFor(lang)}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    document.cookie = `locale-pref=${lang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-bold transition-opacity hover:opacity-70 ${
                    isActive ? 'c-fg' : 'c-fg-subtle'
                  }`}
                >
                  <span aria-hidden="true">{meta.flag}</span>
                  {meta.label}
                  {isActive && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
