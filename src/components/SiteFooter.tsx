import Link from 'next/link';
import { Logo } from './Logo';
import { getMessages } from '@/i18n';
import { SITE_NAME } from '@/lib/siteConfig';
import { simulatorPath } from '@/lib/routes';

/**
 * Shared site footer for the marketing/content pages (home, about, blog,
 * privacy). One source of truth for footer chrome: themed border, consistent
 * padding, logo + nav + copyright. `width` matches the page's content column.
 */
export function SiteFooter({
  lang,
  width = 'max-w-5xl',
}: {
  lang: string;
  width?: string;
}) {
  const msg = getMessages(lang);
  const links = [
    { href: `/${lang}/blog`, label: msg.nav.blog },
    { href: simulatorPath(lang), label: msg.nav.simulator },
    { href: `/${lang}/about`, label: msg.nav.about },
    { href: `/${lang}/privacy`, label: msg.nav.privacy },
  ];

  return (
    <footer className="border-t border-themed px-6 sm:px-10 py-6">
      <div className={`${width} mx-auto flex flex-col sm:flex-row items-center justify-between gap-3`}>
        <Logo size="sm" />
        <nav className="c-fg-muted flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-bold tracking-widest uppercase">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:opacity-70 transition-opacity">
              {l.label}
            </Link>
          ))}
        </nav>
        <span className="c-fg-subtle text-xs whitespace-nowrap">
          © {new Date().getFullYear()} {SITE_NAME}
        </span>
      </div>
    </footer>
  );
}
