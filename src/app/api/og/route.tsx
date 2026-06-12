import { ImageResponse } from 'next/og';
import { decodeResults } from '@/lib/serialization';
import { decodeKnockout } from '@/lib/bracket';
import { getQualifiers } from '@/lib/standings';
import { traceRoute, type TeamRoute, type QualifiedPosition } from '@/lib/route';
import { TEAMS, teamById, getTeamName } from '@/data/worldcup2026';
import { FLAG_CODE, flagUrl } from '@/data/flags';
import { getMessages } from '@/i18n';
import type { Messages } from '@/i18n';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

/** Gelokaliseerd groot uitkomstlabel op basis van route.result. */
function resultText(result: TeamRoute['result'], r: Messages['ogCard']['wc']['result']): string {
  switch (result) {
    case 'kampioen': return r.champion;
    case 'final':    return r.final;
    case 'sf':       return r.sf;
    case 'qf':       return r.qf;
    case 'r16':      return r.r16;
    case 'r32':      return r.r32;
    default:         return r.group; // 'groep' of 'niet-gekwalificeerd'
  }
}

/** Gelokaliseerde kwalificatie-ondertitel ("1e in poule E"). */
function qualifiedText(
  position: QualifiedPosition,
  group: string,
  q: Messages['ogCard']['wc']['qualified'],
): string {
  const tpl = position === 'winner' ? q.winner : position === 'runnerUp' ? q.runnerUp : q.third;
  return tpl.replace('{group}', group);
}

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
  const lang = searchParams.get('lang') ?? 'nl';
  const msg = getMessages(lang);
  const oc = msg.ogCard;

  const team = TEAMS.find((t) => t.id === teamId);
  if (!team || !s) {
    return new Response('Not found', { status: 404 });
  }

  const results = decodeResults(s);
  const kr = k ? decodeKnockout(k) : {};
  const qualifiers = getQualifiers(results, {}, {});
  const route = traceRoute(teamId, qualifiers, kr, results);
  const label = resultText(route.result, oc.wc.result);
  const isChampion = route.result === 'kampioen';

  const ROUND_SHORT: Record<string, string> = {
    groep: oc.wc.round.group,
    r32:   oc.wc.round.r32,
    r16:   oc.wc.round.r16,
    qf:    oc.wc.round.qf,
    sf:    oc.wc.round.sf,
    final: oc.wc.round.final,
  };
  const vsLabel = msg.match.vs.toUpperCase();

  const flagCode = FLAG_CODE[teamId];
  const flagSrc = flagCode ? `https://flagcdn.com/w320/${flagCode}.png` : null;

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
          width: 1800,
          height: 2700,
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: BODY,
          padding: '120px 144px 96px',
        }}
      >
        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 96 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: MUTED, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: BODY }}>
              SCOREPATH · {oc.wc.header}
            </span>
            {route.qualifiedPosition && route.qualifiedGroup && (
              <span style={{ fontSize: 36, color: MUTED, fontFamily: BODY }}>
                {qualifiedText(route.qualifiedPosition, route.qualifiedGroup, oc.wc.qualified)}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 24 }}>
            {stars > 0 && (
              <div style={{ display: 'flex', gap: 12, width: 192, justifyContent: 'center' }}>
                {Array.from({ length: stars }).map((_, i) => (
                  <svg key={i} width="42" height="42" viewBox="0 0 24 24" fill={GOLD}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            )}
            {flagSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={flagSrc} alt="" width={192} height={129} style={{ borderRadius: '0 18px 0 18px', border: `3px solid ${BORDER}` }} />
            )}
          </div>
        </div>

        {/* ── Team name ── */}
        <div style={{ display: 'flex', marginBottom: 12 }}>
          <span style={{ fontSize: 168, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: '-1.5px', fontFamily: DISPLAY }}>
            {getTeamName(team, lang).toUpperCase()}
          </span>
        </div>

        {/* ── Result label ── */}
        <div style={{ display: 'flex', marginBottom: 84 }}>
          <span style={{ fontSize: 228, fontWeight: 900, color: isChampion ? GOLD : RED, lineHeight: 1, fontFamily: DISPLAY }}>
            {label.toUpperCase()}
          </span>
        </div>

        {/* ── Divider ── */}
        <div style={{ width: '100%', height: 3, background: BORDER, marginBottom: 60 }} />

        {/* ── Route rows ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {route.rounds.map((round, i) => {
            const { won, draw, score } = round;
            const pending = won === null && !draw;
            const isGroup = round.round === 'groep';
            const oppFlagSrc = round.opponentId ? flagUrl(round.opponentId, 160) : '';
            const oppTeam = round.opponentId ? teamById(round.opponentId) : undefined;
            const oppName = oppTeam ? getTeamName(oppTeam, lang) : round.opponentLabel;

            return (
              <div
                key={`${round.round}-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '33px 48px',
                  background: isGroup ? PANEL : CARD,
                  borderBottom: `3px solid ${BORDER}`,
                  opacity: pending ? 0.45 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 42 }}>
                  <span style={{ fontSize: 27, fontWeight: 700, color: MUTED, letterSpacing: '0.15em', width: 144, fontFamily: BODY }}>
                    {ROUND_SHORT[round.round] ?? round.round.toUpperCase()}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    {round.opponentId && oppFlagSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={oppFlagSrc}
                        alt=""
                        width={66}
                        height={45}
                        style={{ borderRadius: '0 9px 0 9px', border: `3px solid ${BORDER}` }}
                      />
                    )}
                    <span style={{ fontSize: 39, fontWeight: 700, color: INK, fontFamily: BODY }}>
                      {vsLabel} {oppName.toUpperCase()}
                    </span>
                  </div>
                  {score && (
                    <span style={{ fontSize: 33, color: MUTED, fontFamily: BODY }}>
                      {score}
                    </span>
                  )}
                </div>
                {pending ? (
                  <span style={{ fontSize: 48, color: MUTED, fontFamily: BODY }}>—</span>
                ) : (
                  <div style={{
                    width: 84, height: 84, borderRadius: 12,
                    background: draw ? '#475569' : won ? '#166534' : RED,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 39, fontWeight: 700, fontFamily: BODY,
                  }}>
                    {draw ? 'X' : won ? 'W' : 'L'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{ display: 'flex', marginTop: 60, paddingTop: 48, borderTop: `3px solid ${BORDER}`, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: BODY }}>
            scorepath.nl
          </span>
          <span style={{ fontSize: 30, color: MUTED, fontFamily: BODY }}>
            {oc.footer}
          </span>
        </div>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: 1800, height: 2700, fonts } as any,
  );

  return new Response(img.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store',
    },
  });
}
