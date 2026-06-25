import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

// Reference page — not for search engines, not in the nav/sitemap.
export const metadata: Metadata = {
  title: 'Design System · ScorePath',
  robots: { index: false, follow: false },
};

// Canonical tokens — keep in sync with src/app/globals.css + docs/DESIGN-SYSTEM.md
const COLORS: { name: string; dark: string; light: string; role: string }[] = [
  { name: '--bg', dark: '#080808', light: '#F2EDE4', role: 'App background' },
  { name: '--bg-card', dark: '#0D0D0D', light: '#FFFFFF', role: 'Card surface' },
  { name: '--bg-panel', dark: '#0A0A0A', light: '#EDE8DF', role: 'Panel / inset' },
  { name: '--border', dark: '#1A1A1A', light: '#E0D8CC', role: 'Border / divider' },
  { name: '--border-strong', dark: '#2A2A2A', light: '#CFC5B5', role: 'Emphasis border' },
  { name: '--fg', dark: '#F2F2F2', light: '#0D0D0D', role: 'Primary text' },
  { name: '--fg-muted', dark: '#94A3B8', light: '#6B6158', role: 'Secondary text' },
  { name: '--fg-subtle', dark: '#475569', light: '#9B8E82', role: 'Tertiary text' },
  { name: '--cta', dark: '#D93B1F', light: '#D93B1F', role: 'Primary action' },
  { name: '--cta-hover', dark: '#E8351E', light: '#C42F15', role: 'Action hover' },
  { name: '--gold', dark: '#C9A843', light: '#A8852A', role: 'Brand accent' },
  { name: '--gold-lt', dark: '#E2C46A', light: '#C9A843', role: 'Gold (light)' },
];

const TYPE_SCALE: { name: string; cls: string; style?: React.CSSProperties; sample: string }[] = [
  { name: 'display-hero', cls: 'font-display c-fg leading-none', style: { fontSize: 'clamp(2.5rem, 8vw, 5rem)' }, sample: 'WK 2026' },
  { name: 'display-lg', cls: 'font-display c-fg leading-none', style: { fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }, sample: 'Halve finale' },
  { name: 'title (text-xl)', cls: 'text-xl font-bold c-fg', sample: 'Card / page title' },
  { name: 'body (text-sm)', cls: 'text-sm c-fg-muted', sample: 'Default body copy in Barlow Condensed.' },
  { name: 'label (text-xs)', cls: 'text-xs font-bold uppercase tracking-widest c-fg-subtle', sample: 'Button · table header' },
  { name: 'meta (11px, min)', cls: 'text-[11px] c-fg-subtle', sample: 'Secondary metadata — 11px floor' },
];

const RADII: { name: string; value: string }[] = [
  { name: '--radius-sm', value: '0 6px 0 6px' },
  { name: '--radius-md', value: '0 10px 0 10px' },
  { name: '--radius-lg', value: '0 12px 0 12px' },
];

const BADGES: { label: string; cls: string }[] = [
  { label: '✓ Through', cls: 'bg-emerald-500/15 text-emerald-400' },
  { label: '? Bubble', cls: 'bg-amber-500/15 text-amber-400' },
  { label: '✗ Out', cls: 'bg-red-500/15 text-red-400' },
  { label: '✓ Confirmed', cls: '' },
];

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div className="mb-5">
        <h2 className="font-display text-2xl c-fg leading-none">{title}</h2>
        {hint && <p className="text-xs c-fg-subtle mt-1">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

export default async function DesignSystemPage(props: PageProps<'/[lang]/design'>) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  return (
    <div className="min-h-dvh flex flex-col bg-themed">
      <SiteHeader lang={lang} />

      <main className="flex-1 px-6 sm:px-10 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest c-cta mb-2">ScorePath</p>
          <h1 className="font-display text-4xl sm:text-5xl c-fg mb-3">Design System</h1>
          <p className="c-fg-muted text-sm max-w-xl leading-relaxed mb-12">
            Living reference for the canonical tokens. Toggle the theme (top-right) to see
            dark / light values. Source of truth: <code className="c-gold">globals.css</code> +{' '}
            <code className="c-gold">docs/DESIGN-SYSTEM.md</code>.
          </p>

          {/* Colors */}
          <Section title="Colors" hint="Use the token (CSS var / themed utility) — never hardcode hex.">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {COLORS.map((c) => (
                <div key={c.name} className="border border-themed overflow-hidden" style={{ borderRadius: '0 6px 0 6px', background: 'var(--bg-card)' }}>
                  <div className="h-14 w-full" style={{ background: `var(${c.name})`, borderBottom: '1px solid var(--border)' }} />
                  <div className="p-2.5">
                    <code className="text-[11px] font-bold c-fg block">{c.name}</code>
                    <p className="text-[11px] c-fg-subtle mt-0.5">{c.role}</p>
                    <p className="text-[11px] c-fg-muted mt-1 tabular-nums">{c.dark} · {c.light}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Typography */}
          <Section title="Typography" hint="Bebas Neue (display) + Barlow Condensed (UI). Minimum readable size: 11px.">
            <div className="flex flex-col gap-5">
              {TYPE_SCALE.map((t) => (
                <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-themed pb-4">
                  <code className="text-[11px] c-fg-subtle shrink-0 w-40">{t.name}</code>
                  <span className={t.cls} style={t.style}>{t.sample}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Radius */}
          <Section title="Radius" hint='The signature asymmetric "notch": 0 R 0 R.'>
            <div className="flex flex-wrap gap-5">
              {RADII.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div className="w-24 h-16" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: r.value }} />
                  <code className="text-[11px] c-fg-subtle">{r.name}</code>
                  <code className="text-[11px] c-fg-muted">{r.value}</code>
                </div>
              ))}
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Buttons">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 font-display tracking-widest text-white px-6 py-3" style={{ background: 'var(--cta)', borderRadius: '0 12px 0 12px' }}>
                Primary CTA
              </span>
              <span className="inline-flex items-center gap-2 font-display tracking-widest px-6 py-3" style={{ border: '2px solid var(--cta)', color: 'var(--cta)', borderRadius: '0 10px 0 10px' }}>
                Secondary
              </span>
              <span className="ctrl-btn c-fg-muted inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg">
                Control
              </span>
            </div>
          </Section>

          {/* Badges */}
          <Section title="Status badges" hint="Always pair color with a glyph (✓ / ? / ✗) — never colour alone.">
            <div className="flex flex-wrap gap-3">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className={`text-[11px] font-bold px-2 py-1 rounded leading-none ${b.cls}`}
                  style={b.cls ? undefined : { backgroundColor: '#C9A84326', color: 'var(--gold)' }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </Section>

          {/* Card */}
          <Section title="Card">
            <div className="max-w-sm p-5 bg-card border border-themed" style={{ borderRadius: '0 12px 0 12px' }}>
              <p className="text-xs font-bold uppercase tracking-widest c-gold mb-2">Card surface</p>
              <h3 className="text-xl font-bold c-fg mb-1">bg-card + border-themed</h3>
              <p className="text-sm c-fg-muted leading-relaxed">
                Standard content container. Theme-aware surface and border, notch radius.
              </p>
            </div>
          </Section>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
