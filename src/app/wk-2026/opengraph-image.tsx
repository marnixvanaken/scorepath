import { ImageResponse } from 'next/og';

export const alt = 'WK 2026 Simulator — ScorePath';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
        {/* Orange left bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '8px', background: '#FF6B00', display: 'flex' }} />

        {/* Top orange accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF6B00, transparent)', display: 'flex' }} />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 80px 80px 100px',
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', marginBottom: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#FF6B00', letterSpacing: '4px', textTransform: 'uppercase', display: 'flex' }}>
              SCOREPATH · WK 2026
            </span>
          </div>

          {/* Main heading */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '36px' }}>
            <span style={{ fontSize: '80px', fontWeight: 900, color: '#ffffff', lineHeight: '1.0', letterSpacing: '-3px', display: 'flex' }}>
              Jouw bracket.
            </span>
            <span style={{ fontSize: '80px', fontWeight: 900, color: '#FF6B00', lineHeight: '1.0', letterSpacing: '-3px', display: 'flex' }}>
              Jouw scenario.
            </span>
          </div>

          {/* Orange divider */}
          <div style={{ width: '52px', height: '4px', background: '#FF6B00', marginBottom: '32px', borderRadius: '2px', display: 'flex' }} />

          {/* Tagline */}
          <div style={{ fontSize: '22px', color: '#444', fontWeight: 400, display: 'flex' }}>
            Vul alle groepsuitslagen in — zie live wie doorgaat.
          </div>
        </div>

        {/* Right: stats */}
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
          {[
            { num: '48', label: 'Teams' },
            { num: '12', label: 'Groepen' },
            { num: '104', label: 'Duels' },
          ].map(({ num, label }) => (
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
