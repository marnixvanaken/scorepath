import Link from 'next/link';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { getMessages } from '@/i18n';
import { simulatorPath, birthplacePath, uclPath } from '@/lib/routes';

/**
 * Shared site header for the marketing/content pages (home, blog, about,
 * privacy). One source of truth: logo → home, consistent nav, and the language
 * + theme toggles on every page (previously only the home page had them).
 * `width` matches the page's content column.
 */
export function SiteHeader({
  lang,
  width = 'max-w-5xl',
}: {
  lang: string;
  width?: string;
}) {
  const msg = getMessages(lang);
  const links = [
    { href: simulatorPath(lang), label: msg.nav.simulator, hideMobile: false },
    { href: uclPath(lang), label: msg.nav.ucl, hideMobile: true },
    { href: birthplacePath(lang), label: msg.nav.birthplace, hideMobile: true },
    { href: `/${lang}/blog`, label: msg.nav.blog, hideMobile: false },
  ];

  return (
    <header className="px-6 sm:px-10 py-4 border-b border-themed">
      <div className={`${width} mx-auto flex items-center justify-between gap-4`}>
        <Link href={`/${lang}`} aria-label={msg.header.backToHome} className="shrink-0">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`c-fg text-xs font-bold tracking-widest uppercase transition-opacity opacity-70 hover:opacity-100 ${l.hideMobile ? 'hidden sm:inline' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
