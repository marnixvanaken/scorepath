import { ImageResponse } from 'next/og';
import { decodeResults } from '@/lib/serialization';
import { decodeKnockout } from '@/lib/bracket';
import { computeAllGroups, getQualifiers } from '@/lib/standings';
import { traceRoute, resultLabel } from '@/lib/route';
import { TEAMS } from '@/data/worldcup2026';
import { FLAG_CODE, flagUrl } from '@/data/flags';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const ROUND_SHORT: Record<string, string> = {
  groep: 'GROEP',
  r32:   'R32',
  r16:   'R16',
  qf:    'KW',
  sf:    'HF',
  final: 'FINALE',
};

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

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const teamId = searchParams.get('team') ?? '';
  const s = searchParams.get('s') ?? '';
  const k = searchParams.get('k') ?? '';

  const team = TEAMS.find((t) => t.id === teamId);
  if (!team || !s) {
    return new Response('Not found', { status: 404 });
  }

  const results = decodeResults(s);
  const kr = k ? decodeKnockout(k) : {};
  const allGroups = computeAllGroups(results, {}, {});
  const qualifiers = getQualifiers(results, {}, {});
  const route = traceRoute(teamId, qualifiers, kr, results);
  const label = resultLabel(route.result);
  const isChampion = route.result === 'kampioen';

  const flagCode = FLAG_CODE[teamId];
  const flagSrc = flagCode ? `https://flagcdn.com/w80/${flagCode}.png` : null;

  // Load fonts (best-effort — fallback to system sans if unavailable)
  const [bebasFont, barlowFont] = await Promise.all([
    loadFont('Bebas Neue', 400),
    loadFont('Barlow Condensed', 700),
  ]);

  type FontDef = { name: string; data: ArrayBuffer; weight: number; style: 'normal' };
  const fonts: FontDef[] = [];
  if (bebasFont)  fonts.push({ name: 'Bebas',  data: bebasFont,  weight: 400, style: 'normal' });
  if (barlowFont) fonts.push({ name: 'Barlow', data: barlowFont, weight: 700, style: 'normal' });

  const DISPLAY = bebasFont ? 'Bebas, sans-serif' : 'sans-serif';
  const BODY    = barlowFont ? 'Barlow, sans-serif' : 'sans-serif';

  const WC_TITLES: Record<string, number> = {
    BRA: 5, GER: 4, ARG: 3, FRA: 2, URU: 2, ENG: 1, ESP: 1,
  };
  const stars = isChampion ? (WC_TITLES[teamId] ?? 0) + 1 : 0;

  const BG     = '#F2EDE4';
  const INK    = '#0D0D0D';
  const RED    = '#D93B1F';
  const GOLD   = '#A8852A';
  const MUTED  = '#9B8E82';
  const CARD   = '#FFFFFF';
  const BORDER = '#E0D8CC';
  const PANEL  = '#EDE8DF';

  const img = new ImageResponse(
    (
      <div
        style={{
          width: 600,
          height: 900,
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: BODY,
          padding: '40px 48px 32px',
        }}
      >
        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: BODY }}>
              SCOREPATH · WK 2026
            </span>
            {route.qualifiedFrom && (
              <span style={{ fontSize: 12, color: MUTED, fontFamily: BODY }}>
                {route.qualifiedFrom}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            {stars > 0 && (
              <div style={{ display: 'flex', gap: 4, width: 64, justifyContent: 'center' }}>
                {Array.from({ length: stars }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={GOLD}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            )}
            {flagSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={flagSrc} alt="" width={64} height={43} style={{ borderRadius: '0 6px 0 6px', border: `1px solid ${BORDER}` }} />
            )}
          </div>
        </div>

        {/* ── Team name ── */}
        <div style={{ display: 'flex', marginBottom: 4 }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: '-0.5px', fontFamily: DISPLAY }}>
            {team.name.toUpperCase()}
          </span>
        </div>

        {/* ── Result label ── */}
        <div style={{ display: 'flex', marginBottom: 28 }}>
          <span style={{ fontSize: 76, fontWeight: 900, color: isChampion ? GOLD : RED, lineHeight: 1, fontFamily: DISPLAY }}>
            {label.toUpperCase()}
          </span>
        </div>

        {/* ── Divider ── */}
        <div style={{ width: '100%', height: 1, background: BORDER, marginBottom: 20 }} />

        {/* ── Route rows ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {route.rounds.map((round, i) => {
            const { won, draw, score } = round;
            const pending = won === null && !draw;
            const isGroup = round.round === 'groep';

            return (
              <div
                key={`${round.round}-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 16px',
                  background: isGroup ? PANEL : CARD,
                  borderBottom: `1px solid ${BORDER}`,
                  opacity: pending ? 0.45 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: MUTED, letterSpacing: '0.15em', width: 48, fontFamily: BODY }}>
                    {ROUND_SHORT[round.round] ?? round.round.toUpperCase()}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {round.opponentId && (() => {
                      const oppFlag = flagUrl(round.opponentId, 40);
                      return oppFlag ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={oppFlag}
                          alt=""
                          width={22}
                          height={15}
                          style={{ borderRadius: '0 3px 0 3px', border: `1px solid ${BORDER}` }}
                        />
                      ) : null;
                    })()}
                    <span style={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: BODY }}>
                      VS {round.opponentLabel.toUpperCase()}
                    </span>
                  </div>
                  {score && (
                    <span style={{ fontSize: 11, color: MUTED, fontFamily: BODY }}>
                      {score}
                    </span>
                  )}
                </div>
                {pending ? (
                  <span style={{ fontSize: 16, color: MUTED, fontFamily: BODY }}>—</span>
                ) : (
                  <div style={{
                    width: 28, height: 28, borderRadius: 4,
                    background: draw ? '#475569' : won ? '#166534' : RED,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 13, fontWeight: 700, fontFamily: BODY,
                  }}>
                    {draw ? 'X' : won ? 'W' : 'L'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{ display: 'flex', marginTop: 20, paddingTop: 16, borderTop: `1px solid ${BORDER}`, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: BODY }}>
            scorepath.nl
          </span>
          <span style={{ fontSize: 10, color: MUTED, fontFamily: BODY }}>
            Maak jouw scenario op scorepath.nl
          </span>
        </div>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: 600, height: 900, fonts } as any,
  );

  return new Response(img.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store',
    },
  });
}
