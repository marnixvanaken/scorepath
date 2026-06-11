import { ImageResponse } from 'next/og';
import { clubById, titlesOf } from '@/data/ucl2027';
import { decodeCard, cardOutcome, cardIsChampion, CARD_ROUND_LABEL } from '@/lib/uclCard';
import type { NextRequest } from 'next/server';

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
  } catch {
    return null;
  }
}

const flagUrl = (code: string, w: number) => `https://flagcdn.com/w${w}/${code.toLowerCase()}.png`;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const teamId = searchParams.get('team') ?? '';
  const m = searchParams.get('m') ?? '';

  const club = clubById(teamId);
  if (!club) return new Response('Not found', { status: 404 });

  const matches = decodeCard(m);
  const champion = cardIsChampion(matches);
  const lastRound = matches.length ? matches[matches.length - 1].round : '';
  const titles = titlesOf(teamId) + (champion ? 1 : 0);

  const [bebasFont, barlowFont] = await Promise.all([
    loadFont('Bebas Neue', 400),
    loadFont('Barlow Condensed', 700),
  ]);
  type FontDef = { name: string; data: ArrayBuffer; weight: number; style: 'normal' };
  const fonts: FontDef[] = [];
  if (bebasFont) fonts.push({ name: 'Bebas', data: bebasFont, weight: 400, style: 'normal' });
  if (barlowFont) fonts.push({ name: 'Barlow', data: barlowFont, weight: 700, style: 'normal' });
  const DISPLAY = bebasFont ? 'Bebas, sans-serif' : 'sans-serif';
  const BODY = barlowFont ? 'Barlow, sans-serif' : 'sans-serif';

  const BG = '#F2EDE4';
  const INK = '#0D0D0D';
  const RED = '#D93B1F';
  const GOLD = '#A8852A';
  const MUTED = '#9B8E82';
  const CARD = '#FFFFFF';
  const BORDER = '#E0D8CC';

  const label = champion ? 'KAMPIOEN' : (CARD_ROUND_LABEL[lastRound] ?? '').toUpperCase();

  // Dynamische rijhoogte: de rijen krijgen een vast verticaal budget en schalen
  // mee met het aantal duels, zodat de kaart nooit langer wordt dan het canvas
  // (en niets wordt afgeknipt), ongeacht hoe lang de toernooiweg is.
  const n = matches.length || 1;
  const ROWS_BUDGET = 1600;
  const rowH = Math.min(132, ROWS_BUDGET / n);
  const s = rowH / 132; // schaalfactor 0..1 voor de rij-inhoud

  // Sterren altijd op één rij houden (constante headerhoogte): bij veel titels
  // krimpen de sterren zodat ze samen binnen de breedte van de vlag-kolom passen.
  const STAR_GAP = 8;
  const STAR_MAX = 40;
  const starSize = titles > 0
    ? Math.max(14, Math.min(STAR_MAX, Math.floor((360 - (titles - 1) * STAR_GAP) / titles)))
    : 0;

  const img = new ImageResponse(
    (
      <div style={{ width: 1800, height: 2700, background: BG, display: 'flex', flexDirection: 'column', fontFamily: BODY, padding: '120px 144px 96px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 56 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: MUTED, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            SCOREPATH · CHAMPIONS LEAGUE 2026/27
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            {titles > 0 && (
              <div style={{ display: 'flex', gap: STAR_GAP, justifyContent: 'center' }}>
                {Array.from({ length: titles }).map((_, i) => (
                  <svg key={i} width={starSize} height={starSize} viewBox="0 0 24 24" fill={GOLD}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flagUrl(club.flagCode, 320)} alt="" width={192} height={129} style={{ borderRadius: '0 18px 0 18px', border: `3px solid ${BORDER}` }} />
          </div>
        </div>

        {/* Club name */}
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <span style={{ fontSize: 150, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: '-1.5px', fontFamily: DISPLAY }}>
            {club.name.toUpperCase()}
          </span>
        </div>

        {/* Result label */}
        {label && (
          <div style={{ display: 'flex', marginBottom: 48 }}>
            <span style={{ fontSize: 200, fontWeight: 900, color: champion ? GOLD : RED, lineHeight: 1, fontFamily: DISPLAY }}>
              {label}
            </span>
          </div>
        )}

        <div style={{ width: '100%', height: 3, background: BORDER, marginBottom: 40 }} />

        {/* Match rows */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {matches.map((mt, i) => {
            const opp = clubById(mt.oppId);
            const outcome = cardOutcome(mt);
            const showScore = mt.res.includes('-');
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: rowH, padding: `0 40px`, background: CARD, borderBottom: `${Math.max(2, Math.round(3 * s))}px solid ${BORDER}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 36 * s }}>
                  <span style={{ fontSize: 26 * s, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', width: 280 * s }}>
                    {(CARD_ROUND_LABEL[mt.round] ?? mt.round).toUpperCase()}
                  </span>
                  {opp && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={flagUrl(opp.flagCode, 160)} alt="" width={66 * s} height={45 * s} style={{ borderRadius: '0 9px 0 9px', border: `${Math.max(2, Math.round(3 * s))}px solid ${BORDER}` }} />
                  )}
                  <span style={{ fontSize: 38 * s, fontWeight: 700, color: INK }}>
                    {(opp?.name ?? mt.oppId).toUpperCase()}
                  </span>
                  {showScore && <span style={{ fontSize: 32 * s, color: MUTED }}>{mt.res}</span>}
                </div>
                <div style={{ width: 80 * s, height: 80 * s, borderRadius: 12 * s, background: outcome === 'D' ? '#475569' : outcome === 'W' ? '#166534' : RED, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 38 * s, fontWeight: 700 }}>
                  {outcome === 'D' ? 'X' : outcome}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', marginTop: 48, paddingTop: 40, borderTop: `3px solid ${BORDER}`, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase' }}>scorepath.nl</span>
          <span style={{ fontSize: 30, color: MUTED }}>Maak jouw scenario op scorepath.nl</span>
        </div>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: 1800, height: 2700, fonts } as any,
  );

  return new Response(img.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
  });
}
