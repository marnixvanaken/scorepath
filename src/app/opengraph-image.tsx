import { ImageResponse } from 'next/og';

export const alt = 'ScorePath — WK 2026 Simulator';
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

        {/* Decorative bracket lines — top right corner */}
        <div style={{ position: 'absolute', top: 60, right: 60, display: 'flex', flexDirection: 'column', gap: '32px', opacity: 0.06 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '60px', height: '4px', background: 'white', borderRadius: '2px', display: 'flex' }} />
              <div style={{ width: '4px', height: '80px', background: 'white', borderRadius: '2px', display: 'flex' }} />
            </div>
          ))}
        </div>

        {/* Left: main content */}
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
          {/* ScorePath wordmark */}
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

          {/* Orange divider */}
          <div style={{ width: '52px', height: '4px', background: '#FF6B00', marginBottom: '40px', borderRadius: '2px', display: 'flex' }} />

          {/* Main heading */}
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '72px', fontWeight: 900, lineHeight: '1.0', letterSpacing: '-3px', marginBottom: '24px' }}>
            <span style={{ color: '#ffffff', display: 'flex' }}>WK 2026&nbsp;</span>
            <span style={{ color: '#FF6B00', display: 'flex' }}>Simulator</span>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: '24px', color: '#444', fontWeight: 400, display: 'flex' }}>
            Vul de uitslagen in. Zie live wie doorgaat.
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
