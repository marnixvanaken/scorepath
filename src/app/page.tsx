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
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>

      {/* ── NAV ── */}
      <nav className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-xs font-bold tracking-widest uppercase transition-opacity opacity-40 hover:opacity-70"
              style={{ color: 'var(--fg)' }}
            >
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="flex-1 flex flex-col justify-center px-6 pt-16 pb-12">
        <div className="max-w-5xl mx-auto w-full">

          {/* Label */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6 opacity-40">
            WK 2026 · 11 juni — 19 juli
          </p>

          {/* Giant display titel */}
          <h1
            className="font-display leading-none mb-8"
            style={{ fontSize: 'clamp(5rem, 18vw, 14rem)', color: 'var(--fg)' }}
          >
            WK<br />
            <span style={{ color: 'var(--cta)' }}>2026</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-xl sm:text-2xl font-bold leading-snug mb-4 max-w-lg"
            style={{ color: 'var(--fg)' }}
          >
            Vul de uitslagen in.<br />
            Zie wie doorgaat naar de knockout-fase.
          </p>
          <p className="text-sm mb-10 max-w-md" style={{ color: 'var(--fg-muted)' }}>
            48 teams, 12 groepen, exacte FIFA-tiebreakers. Deel je scenario via één link. Geen account nodig.
          </p>

          {/* CTA */}
          <CTALink href="/wk-2026" />
        </div>
      </section>

      {/* ── 3-STAP BAR ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div
          className="max-w-5xl mx-auto grid grid-cols-3"
          style={{ '--divide-color': 'var(--border)' } as React.CSSProperties}
        >
          {[
            { num: '01', label: 'INVULLEN', sub: 'Vul uitslagen in per groep' },
            { num: '02', label: 'SIMULEREN', sub: 'Zie wie doorgaat in de bracket' },
            { num: '03', label: 'DELEN', sub: 'Deel je scenario via één link' },
          ].map(({ num, label, sub }, i) => (
            <div
              key={num}
              className="px-6 py-5 flex items-center gap-4"
              style={{ borderLeft: i > 0 ? '1px solid var(--border)' : undefined }}
            >
              <span className="font-display text-3xl leading-none shrink-0" style={{ color: 'var(--cta)' }}>{num}</span>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--fg)' }}>{label}</p>
                <p className="text-xs mt-0.5 hidden sm:block" style={{ color: 'var(--fg-subtle)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 sm:gap-16 text-center">
          {[
            { value: '48', label: 'teams' },
            { value: '12', label: 'groepen' },
            { value: '104', label: 'wedstrijden' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl sm:text-3xl" style={{ color: 'var(--fg)' }}>{value}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>
            <Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link>
            <span>·</span>
            <Link href="/wk-2026" className="hover:opacity-70 transition-opacity">Simulator</Link>
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
      className="inline-flex items-center gap-3 font-display text-xl tracking-widest px-8 py-4 rounded-sm text-white transition-opacity hover:opacity-90 active:opacity-80"
      style={{ background: 'var(--cta)' }}
    >
      OPEN SIMULATOR
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
