import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import type React from 'react';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const s = params.s;
  if (s) {
    const encoded = Array.isArray(s) ? s[0] : s;
    redirect(`/wk-2026?s=${encoded}`);
  }

  return (
    <div className="min-h-dvh flex flex-col bg-themed">

      {/* ── NAV ── */}
      <nav className="px-6 sm:px-10 py-5 border-b border-themed">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="c-fg text-sm font-bold tracking-widest uppercase transition-opacity opacity-40 hover:opacity-70"
            >
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="flex-1 flex flex-col justify-center px-6 sm:px-10 pt-16 pb-16">
        <div className="max-w-5xl mx-auto w-full">

          {/* Giant display titel */}
          <h1 className="font-display leading-[0.88] mb-10 flex items-end gap-3 sm:gap-5">
            <span
              className="c-fg-muted"
              style={{ fontSize: 'clamp(4.5rem, 14vw, 10rem)' }}
            >
              WK
            </span>
            <span
              className="text-[#D93B1F]"
              style={{ fontSize: 'clamp(4.5rem, 14vw, 10rem)' }}
            >
              2026
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="c-fg font-bold leading-snug mb-5 max-w-xl"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            Vul de uitslagen in.<br />
            Zie wie doorgaat naar de knockout-fase.
          </p>

          <p
            className="c-fg-muted mb-12 max-w-lg leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}
          >
            104 wedstrijden. 48 teams. 12 groepen, exacte FIFA-regels. Deel je scenario via één link.
          </p>

          {/* CTA */}
          <CTALink href="/wk-2026" />
        </div>
      </section>

      {/* ── 3-STAP BAR ── */}
      <section className="border-t border-b border-themed">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3">
          {[
            { num: '01', label: 'INVULLEN', sub: 'Vul uitslagen in per groep' },
            { num: '02', label: 'SIMULEREN', sub: 'Zie wie doorgaat in de bracket' },
            { num: '03', label: 'DELEN', sub: 'Deel je scenario via één link' },
          ].map(({ num, label, sub }, i) => (
            <div
              key={num}
              className={`px-6 sm:px-8 py-5 sm:py-7 flex items-center gap-5 border-themed ${i > 0 ? 'border-t sm:border-t sm:border-l-0' : ''}`}
            >
              <span
                className="c-cta font-display leading-none shrink-0"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}
              >
                {num}
              </span>
              <div>
                <p className="c-fg text-sm font-bold tracking-widest uppercase">{label}</p>
                <p className="c-fg-subtle text-xs mt-1 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 sm:px-10 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="c-fg-subtle flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
            <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
            <span>·</span>
            <Link href="/wk-2026" className="hover:opacity-70 transition-opacity">Simulator</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function CTALink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-4 font-display tracking-widest text-white bg-[#D93B1F] hover:bg-[#C42F15] transition-colors active:opacity-80"
      style={{
        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        padding: 'clamp(1rem, 2vw, 1.4rem) clamp(1.5rem, 4vw, 3rem)',
        borderRadius: '0 12px 0 12px',
      }}
    >
      OPEN SIMULATOR
      <svg
        style={{ width: 'clamp(18px, 2.5vw, 26px)', height: 'clamp(18px, 2.5vw, 26px)' }}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
