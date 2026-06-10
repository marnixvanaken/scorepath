import { ImageResponse } from 'next/og';
import { LOCALES, isLocale, DEFAULT_LOCALE } from '@/i18n';

// Fallback OG-image voor ALLE pagina's onder /[lang] (homepage, blog, artikelen,
// simulator). De dynamische scenario-kaarten (api/og) blijven hun eigen image houden.
export const alt = 'ScorePath — World Cup 2026 Simulator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const COPY: Record<string, { heading: string; tagline: string; stats: [string, string][] }> = {
  nl: {
    heading: 'WK 2026',
    tagline: 'Vul de uitslagen in. Zie live wie doorgaat.',
    stats: [['48', 'Teams'], ['12', 'Groepen'], ['104', 'Duels']],
  },
  en: {
    heading: 'World Cup 2026',
    tagline: 'Fill in the results. See live who advances.',
    stats: [['48', 'Teams'], ['12', 'Groups'], ['104', 'Matches']],
  },
  es: {
    heading: 'Mundial 2026',
    tagline: 'Rellena los resultados. Ve quién avanza.',
    stats: [['48', 'Selecciones'], ['12', 'Grupos'], ['104', 'Partidos']],
  },
};

export default async function OGImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const copy = COPY[locale] ?? COPY.nl;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '8px', background: '#FF6B00', display: 'flex' }} />

        <div style={{ position: 'absolute', top: 60, right: 60, display: 'flex', flexDirection: 'column', gap: '32px', opacity: 0.06 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '60px', height: '4px', background: 'white', borderRadius: '2px', display: 'flex' }} />
              <div style={{ width: '4px', height: '80px', background: 'white', borderRadius: '2px', display: 'flex' }} />
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 80px 80px 100px',
            flex: 1,
            gap: '0px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0px', marginBottom: '44px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#555', letterSpacing: '5px', textTransform: 'uppercase', display: 'flex' }}>
                Score
              </span>
              <span style={{ fontSize: '56px', fontWeight: 900, color: '#ffffff', letterSpacing: '-2px', lineHeight: '1', display: 'flex' }}>
                Path
              </span>
            </div>
          </div>

          <div style={{ width: '52px', height: '4px', background: '#FF6B00', marginBottom: '40px', borderRadius: '2px', display: 'flex' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '72px', fontWeight: 900, lineHeight: '1.0', letterSpacing: '-3px', marginBottom: '24px' }}>
            <span style={{ color: '#ffffff', display: 'flex' }}>{copy.heading}&nbsp;</span>
            <span style={{ color: '#FF6B00', display: 'flex' }}>Simulator</span>
          </div>

          <div style={{ fontSize: '24px', color: '#444', fontWeight: 400, display: 'flex' }}>
            {copy.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '80px 90px 80px 0',
            gap: '32px',
          }}
        >
          {copy.stats.map(([num, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '56px', fontWeight: 900, color: '#FF6B00', lineHeight: '1', letterSpacing: '-2px', display: 'flex' }}>
                {num}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#2a2a2a', letterSpacing: '4px', textTransform: 'uppercase', display: 'flex' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
