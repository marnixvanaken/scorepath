import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { players as allPlayers } from '@/data/players';
import { FLAG_CODE } from '@/data/flags';

export const runtime = 'edge';

async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)' } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;
    return fetch(url).then((r) => r.arrayBuffer());
  } catch { return null; }
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const from = sp.get('from') ?? 'Swolgen';
  const variant = sp.get('v') ?? 'A';

  const rows: { name: string; team: string; position: string; teamCode: string; distance: number; birthplace: string }[] = [];
  for (let i = 1; i <= 10; i++) {
    const id = sp.get(`p${i}`);
    const d = parseInt(sp.get(`d${i}`) ?? '0', 10);
    if (!id) continue;
    const player = allPlayers.find((p) => p.id === id);
    if (!player) continue;
    rows.push({ name: player.name, team: player.team, position: player.position, teamCode: player.teamCode, distance: d, birthplace: player.birthplace });
  }

  if (rows.length === 0) return new Response('Not found', { status: 404 });

  const [bebasFont, barlowFont] = await Promise.all([
    loadFont('Bebas Neue', 400),
    loadFont('Barlow Condensed', 700),
  ]);

  type FontDef = { name: string; data: ArrayBuffer; weight: number; style: 'normal' };
  const fonts: FontDef[] = [];
  if (bebasFont) fonts.push({ name: 'Bebas', data: bebasFont, weight: 400, style: 'normal' });
  if (barlowFont) fonts.push({ name: 'Barlow', data: barlowFont, weight: 700, style: 'normal' });

  const DISPLAY = bebasFont ? 'Bebas, sans-serif' : 'sans-serif';
  const BODY    = barlowFont ? 'Barlow, sans-serif' : 'sans-serif';

  const BG     = '#F2EDE4';
  const INK    = '#0D0D0D';
  const RED    = '#D93B1F';
  const MUTED  = '#9B8E82';
  const BORDER = '#E0D8CC';
  const PANEL  = '#EDE8DF';
  const GOLD   = '#10b981';

  function posLabel(pos: string) {
    switch (pos) {
      case 'GK': return 'Keeper';
      case 'DF': return 'Verdediger';
      case 'MF': return 'Middenvelder';
      case 'FW': return 'Aanvaller';
      default: return pos;
    }
  }

  const W = 1080;
  const H = 1350;

  // Shared player rows JSX
  const playerRows = rows.map((row, i) => {
    const flagCode = FLAG_CODE[row.teamCode];
    const flagSrc = flagCode ? `https://flagcdn.com/w160/${flagCode}.png` : null;
    const isFirst = i === 0;
    return (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '14px 20px',
          background: isFirst ? PANEL : BG,
          borderBottom: `1.5px solid ${BORDER}`,
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: isFirst ? GOLD : BORDER,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isFirst ? 'white' : MUTED,
          fontSize: 20, fontWeight: 700, fontFamily: BODY, flexShrink: 0,
        }}>
          {i + 1}
        </div>
        {flagSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={flagSrc} alt="" width={60} height={40} style={{ borderRadius: '0 6px 0 6px', border: `1.5px solid ${BORDER}`, flexShrink: 0 }} />
        ) : (
          <div style={{ width: 60, height: 40, flexShrink: 0, background: BORDER, borderRadius: '0 6px 0 6px' }} />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: INK, fontFamily: BODY, lineHeight: 1 }}>{row.name}</span>
          <span style={{ fontSize: 17, color: MUTED, fontFamily: BODY, lineHeight: 1 }}>{row.team} · {posLabel(row.position)}</span>
          <span style={{ fontSize: 15, color: MUTED, fontFamily: BODY, lineHeight: 1, opacity: 0.75 }}>{row.birthplace}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: isFirst ? RED : INK, fontFamily: DISPLAY, lineHeight: 1 }}>
            {row.distance.toLocaleString()}
          </span>
          <span style={{ fontSize: 17, color: MUTED, fontFamily: BODY }}>km</span>
        </div>
      </div>
    );
  });

  const footer = (
    <div style={{ display: 'flex', marginTop: 20, paddingTop: 20, borderTop: `2px solid ${BORDER}`, alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', fontFamily: BODY }}>scorepath.nl</span>
      <span style={{ fontSize: 20, color: MUTED, fontFamily: BODY }}>Maak jouw kaart op scorepath.nl</span>
    </div>
  );

  let jsx: React.ReactElement;

  if (variant === 'A') {
    // Variant A: Geboren in [locatie] als subtitel onder de tagline
    jsx = (
      <div style={{ width: W, height: H, background: BG, display: 'flex', flexDirection: 'column', fontFamily: BODY, padding: '60px 72px 52px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: MUTED, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: BODY }}>
            SCOREPATH · WK 2026
          </span>
          <span style={{ fontSize: 46, fontWeight: 900, color: INK, fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.02em' }}>
            TOP 10 DICHTSTBIJZIJNDE WK-SPELERS
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 20, color: RED, fontFamily: BODY, fontWeight: 700 }}>📍</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: RED, fontFamily: BODY, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Geboren in {from}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', height: 3, background: BORDER, marginBottom: 20 }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>{playerRows}</div>
        {footer}
      </div>
    );
  } else if (variant === 'B') {
    // Variant B: Locatie als prominente badge boven de rijen
    jsx = (
      <div style={{ width: W, height: H, background: BG, display: 'flex', flexDirection: 'column', fontFamily: BODY, padding: '60px 72px 52px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: MUTED, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: BODY }}>
              SCOREPATH · WK 2026
            </span>
            <span style={{ fontSize: 46, fontWeight: 900, color: INK, fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.02em' }}>
              TOP 10 DICHTSTBIJZIJNDE WK-SPELERS
            </span>
          </div>
          {/* Location badge top-right */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2,
            padding: '10px 18px', background: INK, borderRadius: '0 12px 0 12px',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: GOLD, fontFamily: BODY, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Geboren in
            </span>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.04em' }}>
              {from.toUpperCase()}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', height: 3, background: BORDER, marginBottom: 20 }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>{playerRows}</div>
        {footer}
      </div>
    );
  } else if (variant === 'C') {
    // Variant C: "Jouw WK-kaart" als hoofdtitel, locatie als subtitle + grote locatienaam
    jsx = (
      <div style={{ width: W, height: H, background: BG, display: 'flex', flexDirection: 'column', fontFamily: BODY, padding: '60px 72px 52px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: MUTED, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: BODY }}>
            SCOREPATH · WK 2026
          </span>
          <span style={{ fontSize: 58, fontWeight: 900, color: INK, fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.02em' }}>
            JOUW WK-KAART
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
            <span style={{ fontSize: 18, color: MUTED, fontFamily: BODY, fontWeight: 700 }}>Geboren in</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: RED, fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.04em' }}>
              {from.toUpperCase()}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', height: 3, background: RED, marginBottom: 20, opacity: 0.4 }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>{playerRows}</div>
        {footer}
      </div>
    );
  } else {
    // Variant D: Grote geboorteplaats als HERO boven de lijst — minimalistische splitscreen-stijl
    jsx = (
      <div style={{ width: W, height: H, background: BG, display: 'flex', flexDirection: 'column', fontFamily: BODY }}>
        {/* Hero header band */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '40px 72px 32px',
          background: INK,
        }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: GOLD, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: BODY, marginBottom: 8 }}>
            SCOREPATH · WK 2026
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
            <span style={{ fontSize: 72, fontWeight: 900, color: '#FFFFFF', fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.02em' }}>
              {from.toUpperCase()}
            </span>
          </div>
          <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.45)', fontFamily: BODY, fontWeight: 700, marginTop: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Top 10 dichtstbijzijnde WK-spelers
          </span>
        </div>

        {/* Player rows */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0, padding: '12px 0 0' }}>
          {rows.map((row, i) => {
            const flagCode = FLAG_CODE[row.teamCode];
            const flagSrc = flagCode ? `https://flagcdn.com/w160/${flagCode}.png` : null;
            const isFirst = i === 0;
            return (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '12px 72px',
                  background: isFirst ? PANEL : BG,
                  borderBottom: `1.5px solid ${BORDER}`,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: isFirst ? GOLD : BORDER,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isFirst ? 'white' : MUTED,
                  fontSize: 18, fontWeight: 700, fontFamily: BODY, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                {flagSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={flagSrc} alt="" width={56} height={37} style={{ borderRadius: '0 5px 0 5px', border: `1.5px solid ${BORDER}`, flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 56, height: 37, flexShrink: 0, background: BORDER }} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: INK, fontFamily: BODY, lineHeight: 1 }}>{row.name}</span>
                  <span style={{ fontSize: 16, color: MUTED, fontFamily: BODY, lineHeight: 1 }}>{row.team} · {posLabel(row.position)} · {row.birthplace}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                  <span style={{ fontSize: 30, fontWeight: 700, color: isFirst ? RED : INK, fontFamily: DISPLAY, lineHeight: 1 }}>
                    {row.distance.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 15, color: MUTED, fontFamily: BODY }}>km</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', padding: '16px 72px', borderTop: `2px solid ${BORDER}`, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', fontFamily: BODY }}>scorepath.nl</span>
          <span style={{ fontSize: 18, color: MUTED, fontFamily: BODY }}>Maak jouw kaart op scorepath.nl</span>
        </div>
      </div>
    );
  }

  const img = new ImageResponse(
    jsx,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: W, height: H, fonts } as any,
  );

  return new Response(img.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
  });
}
