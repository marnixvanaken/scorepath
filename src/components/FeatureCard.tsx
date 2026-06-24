import Link from 'next/link';

// Kleurschema van een feature-kaart. Elk onderdeel (CL, WK, geboorteplaats)
// heeft zijn eigen herkenbare kleur, in dezelfde kaartvorm.
export interface CardScheme {
  gradient: string;   // achtergrond-gradient van de kaart
  eyebrow: string;    // kleur van het kopje boven de titel
  buttonBg: string;   // achtergrond van de CTA-knop
  buttonText: string; // tekstkleur van de CTA-knop
  shadow: string;     // kleur van de slagschaduw
}

export const CARD_SCHEMES: Record<'ucl' | 'wc' | 'birthplace', CardScheme> = {
  // Champions League — diep nachtblauw met goud.
  ucl: {
    gradient: 'linear-gradient(135deg, #001D62 0%, #0A2A7A 55%, #001142 100%)',
    eyebrow: '#C9A843',
    buttonBg: '#C9A843',
    buttonText: '#001D62',
    shadow: 'rgba(0, 29, 98, 0.7)',
  },
  // WK 2026 — toernooirood.
  wc: {
    gradient: 'linear-gradient(135deg, #D93B1F 0%, #B0240F 55%, #7A1608 100%)',
    eyebrow: '#FFD9A8',
    buttonBg: '#FFFFFF',
    buttonText: '#B0240F',
    shadow: 'rgba(176, 36, 15, 0.55)',
  },
  // Geboorteplaats — kaart-/locatiegroen.
  birthplace: {
    gradient: 'linear-gradient(135deg, #0E7C66 0%, #0A5E50 55%, #063D34 100%)',
    eyebrow: '#A6ECD3',
    buttonBg: '#A6ECD3',
    buttonText: '#063D34',
    shadow: 'rgba(10, 94, 80, 0.55)',
  },
};

export interface FeatureCardProps {
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  scheme: CardScheme;
}

// Uitgelicht, gekleurd kaartje dat naar een ander onderdeel van de site linkt.
// Server-component (puur presentatie); werkt in zowel light- als dark-thema
// doordat de kaart zijn eigen donkere oppervlak heeft.
export function FeatureCard({ href, eyebrow, title, desc, cta, scheme }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden px-6 sm:px-10 py-10 sm:py-14 transition-transform hover:-translate-y-0.5"
      style={{
        borderRadius: '0 28px 0 28px',
        background: scheme.gradient,
        boxShadow: `0 20px 60px -25px ${scheme.shadow}`,
      }}
    >
      <p
        className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
        style={{ color: scheme.eyebrow }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-white font-bold leading-snug mb-4 max-w-xl"
        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
      >
        {title}
      </h2>
      <p
        className="mb-8 max-w-lg leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}
      >
        {desc}
      </p>
      <span
        className="inline-flex items-center gap-4 font-display tracking-widest transition-opacity group-hover:opacity-90"
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          padding: 'clamp(0.8rem, 1.5vw, 1.1rem) clamp(1.2rem, 3vw, 2.4rem)',
          borderRadius: '0 12px 0 12px',
          background: scheme.buttonBg,
          color: scheme.buttonText,
        }}
      >
        {cta}
        <svg
          style={{ width: 'clamp(16px, 2vw, 22px)', height: 'clamp(16px, 2vw, 22px)' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
