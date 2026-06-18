import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { players as allPlayers } from '@/data/players';
import { FLAG_CODE } from '@/data/flags';
import { getMessages } from '@/i18n';

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
  const lang = sp.get('lang') ?? 'nl';
  const msg = getMessages(lang);
  const m = msg.birthplace;

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

  function posLabel(pos: string): string {
    switch (pos) {
      case 'GK': return lang === 'nl' ? 'Keeper' : lang === 'es' ? 'Portero' : 'Goalkeeper';
      case 'DF': return lang === 'nl' ? 'Verdediger' : lang === 'es' ? 'Defensa' : 'Defender';
      case 'MF': return lang === 'nl' ? 'Middenvelder' : lang === 'es' ? 'Centrocampista' : 'Midfielder';
      case 'FW': return lang === 'nl' ? 'Aanvaller' : lang === 'es' ? 'Delantero' : 'Forward';
      default: return pos;
    }
  }

  const W = 1080;
  const H = 1350;

  const img = new ImageResponse(
    (
      <div style={{ width: W, height: H, background: BG, display: 'flex', flexDirection: 'column', fontFamily: BODY, padding: '60px 72px 52px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: MUTED, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: BODY }}>
              SCOREPATH · {lang === 'nl' ? 'WK 2026' : lang === 'es' ? 'MUNDIAL 2026' : 'WORLD CUP 2026'}
            </span>
            <span style={{ fontSize: 46, fontWeight: 900, color: INK, fontFamily: DISPLAY, lineHeight: 1, letterSpacing: '0.02em' }}>
              {m.cardTagline.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 3, background: BORDER, marginBottom: 20 }} />

        {/* Player rows */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
          {rows.map((row, i) => {
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
                {/* Rank */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: isFirst ? GOLD : BORDER,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isFirst ? 'white' : MUTED,
                  fontSize: 20, fontWeight: 700, fontFamily: BODY, flexShrink: 0,
                }}>
                  {i + 1}
                </div>

                {/* Flag */}
                {flagSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={flagSrc} alt="" width={60} height={40} style={{ borderRadius: '0 6px 0 6px', border: `1.5px solid ${BORDER}`, flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 60, height: 40, flexShrink: 0, background: BORDER, borderRadius: '0 6px 0 6px' }} />
                )}

                {/* Name + meta */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: INK, fontFamily: BODY, lineHeight: 1 }}>{row.name}</span>
                  <span style={{ fontSize: 17, color: MUTED, fontFamily: BODY, lineHeight: 1 }}>{row.team} · {posLabel(row.position)}</span>
                  <span style={{ fontSize: 15, color: MUTED, fontFamily: BODY, lineHeight: 1, opacity: 0.75 }}>{row.birthplace}</span>
                </div>

                {/* Distance */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: isFirst ? RED : INK, fontFamily: DISPLAY, lineHeight: 1 }}>
                    {row.distance.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 17, color: MUTED, fontFamily: BODY }}>{m.distanceKm}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', marginTop: 20, paddingTop: 20, borderTop: `2px solid ${BORDER}`, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', fontFamily: BODY }}>scorepath.nl</span>
          <span style={{ fontSize: 20, color: MUTED, fontFamily: BODY }}>{msg.ogCard.footer}</span>
        </div>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: W, height: H, fonts } as any,
  );

  return new Response(img.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
  });
}
