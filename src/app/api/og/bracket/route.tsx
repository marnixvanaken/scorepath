import { ImageResponse } from 'next/og';
import { decodeResults } from '@/lib/serialization';
import { decodeKnockout, buildBracket, type BracketMatch, type BracketSlot, type KnockoutResults } from '@/lib/bracket';
import { computeAllGroups, getQualifiers } from '@/lib/standings';
import { FLAG_CODE, flagUrl } from '@/data/flags';
import { KNOCKOUT_SCHEDULE, getCityName, formatKickoff, DEFAULT_TZ } from '@/data/knockoutSchedule';
import { getMessages } from '@/i18n';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// Instagram Stories: 1080×1920
const W       = 1080;
const H_CARD  = 1920;
const H       = 53;   // verticale eenheid per slot-paar (bepaalt kolom-uitlijning)
const SLOT_H  = 38;   // hoogte van één team-rij binnen een wedstrijd
const META_H  = 28;   // hoogte van de schema-regel boven elke wedstrijd
const COL_W   = 160;
const COL_GAP = 10;
const PAD_X   = 120;   // (1080 - 5×160 - 4×10) / 2
const HEADER  = 115;
const COL_LBL = 48;
const FOOTER  = 61;    // 115+48+1696+61 = 1920 ✓

const BG           = '#F2EDE4';
const INK          = '#0D0D0D';
const MUTED        = '#9B8E82';
const BORDER       = '#E0D8CC';
const PANEL        = '#EDE8DF';
const MATCH_BORDER = '#9B8E82';  // darker border so pairs are clearly grouped
const WIN_BG       = '#14532d';
const WIN_FG       = '#86efac';
const LOS_FG       = '#999990';
const TBD_BG       = '#FFFFFF';
const GOLD         = '#A8852A';

const WC_TITLES: Record<string, number> = {
  BRA: 5, GER: 4, ARG: 3, FRA: 2, URU: 2, ENG: 1, ESP: 1,
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

function shortId(s: BracketSlot): string {
  if (s.teamId) return s.teamId;
  const m = s.label.match(/([12])e.*?([A-L])/);
  if (m) return m[1] + m[2];
  return '?';
}

function StarRow({ count, size }: { count: number; size: number }) {
  return (
    <div style={{ display: 'flex', gap: size * 0.3, justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={GOLD}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function renderColumn(
  matches: BracketMatch[],
  kr: KnockoutResults,
  roundIdx: number,
  BODY: string,
  lang: string,
) {
  const groupH = Math.pow(2, roundIdx + 1) * H;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: COL_W }}>
      {matches.map((match, mi) => {
        const winner = kr[match.id];

        const renderSlot = (slot: 1 | 2) => {
          const sd   = slot === 1 ? match.slot1 : match.slot2;
          const won  = winner === slot;
          const lost = winner !== undefined && winner !== slot;
          const flag = sd.teamId ? flagUrl(sd.teamId, 40) : '';
          const code = shortId(sd);

          return (
            <div style={{
              height: SLOT_H,
              width: COL_W,
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: 5,
              background: won ? WIN_BG : TBD_BG,
            }}>
              {flag ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={flag} width={20} height={14} style={{ borderRadius: '0 2px 0 2px', flexShrink: 0 }} alt="" />
              ) : (
                <div style={{ width: 20, height: 14, background: BORDER, borderRadius: 2, flexShrink: 0 }} />
              )}
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: won ? WIN_FG : lost ? LOS_FG : INK,
                fontFamily: BODY,
              }}>
                {code}
              </span>
            </div>
          );
        };

        // Schema-regel boven elke wedstrijd: #nummer · datum · tijd / speelstad.
        // Tijd in Nederlandse tijd (CEST) — de gedeelde kaart is een momentopname.
        const sched = KNOCKOUT_SCHEDULE[match.id];
        const meta = sched ? (
          <div style={{ height: META_H, width: COL_W, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: GOLD, fontFamily: BODY }}>#{sched.no}</span>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: BODY }}>
                {(() => { const { date, time } = formatKickoff(sched.kickoff, DEFAULT_TZ, lang); return `${date} · ${time}`; })()}
              </span>
            </div>
            <span style={{ fontSize: 9, color: MUTED, fontFamily: BODY, marginTop: 1 }}>
              {getCityName(sched.city, lang)}
            </span>
          </div>
        ) : null;

        // Alle rondes (incl. finale) renderen identiek: schema-regel + paar,
        // verticaal gecentreerd. De kampioensvlag staat los rechtsboven (zie GET).
        return (
          <div
            key={`${match.id}-${mi}`}
            style={{
              height: groupH,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {meta}
            <div style={{
              border: `2px solid ${MATCH_BORDER}`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {renderSlot(1)}
              <div style={{ height: 1, background: MATCH_BORDER }} />
              {renderSlot(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const s = searchParams.get('s') ?? '';
  const k = searchParams.get('k') ?? '';
  const lang = searchParams.get('lang') ?? 'nl';
  const oc = getMessages(lang).ogCard;

  if (!s) return new Response('Not found', { status: 404 });

  const results    = decodeResults(s);
  const kr         = k ? decodeKnockout(k) : {};
  const allGroups  = computeAllGroups(results, {}, {});
  const qualifiers = getQualifiers(results, {}, {});
  const bracket    = buildBracket(qualifiers, kr);

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

  const finalWinnerSlot = kr[bracket.final.id];
  const finalWinnerId   = finalWinnerSlot
    ? ((finalWinnerSlot === 1 ? bracket.final.slot1 : bracket.final.slot2).teamId ?? null)
    : null;
  const finalWinnerCode = finalWinnerId ?? (finalWinnerSlot
    ? shortId(finalWinnerSlot === 1 ? bracket.final.slot1 : bracket.final.slot2)
    : null);

  // Kampioen-banner rechtsboven: bestaande WK-titels + deze (gesimuleerde) titel.
  const champStars = finalWinnerCode ? (finalWinnerId ? (WC_TITLES[finalWinnerId] ?? 0) + 1 : 1) : 0;
  const champFlag  = finalWinnerId && FLAG_CODE[finalWinnerId]
    ? `https://flagcdn.com/w320/${FLAG_CODE[finalWinnerId]}.png`
    : null;

  const rounds: { label: string; matches: BracketMatch[]; idx: number }[] = [
    { label: oc.bracket.round.r32,   matches: bracket.r32,     idx: 0 },
    { label: oc.bracket.round.r16,   matches: bracket.r16,     idx: 1 },
    { label: oc.bracket.round.qf,    matches: bracket.qf,      idx: 2 },
    { label: oc.bracket.round.sf,    matches: bracket.sf,      idx: 3 },
    { label: oc.bracket.round.final, matches: [bracket.final], idx: 4 },
  ];

  const img = new ImageResponse(
    (
      <div style={{
        width: W, height: H_CARD, background: BG,
        display: 'flex', flexDirection: 'column', fontFamily: BODY,
        position: 'relative',
      }}>
        {/* ── Header ── */}
        <div style={{
          height: HEADER,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `0 ${PAD_X}px`,
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: INK, letterSpacing: '0.05em', fontFamily: DISPLAY }}>
              {oc.bracket.header}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: BODY }}>
              {oc.bracket.subtitle}
            </span>
          </div>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: BODY }}>scorepath.nl</span>
        </div>

        {/* ── Column labels ── */}
        <div style={{
          height: COL_LBL,
          display: 'flex', alignItems: 'center',
          padding: `0 ${PAD_X}px`, gap: COL_GAP,
          background: PANEL,
          borderBottom: `1px solid ${BORDER}`,
        }}>
          {rounds.map((r) => (
            <div key={r.label} style={{ width: COL_W, display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: '0.18em', fontFamily: BODY }}>
                {r.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bracket columns ── */}
        <div style={{ height: H * 32, display: 'flex', padding: `0 ${PAD_X}px`, gap: COL_GAP }}>
          {rounds.map((r) => renderColumn(r.matches, kr, r.idx, BODY, lang))}
        </div>

        {/* ── Footer ── */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderTop: `1px solid ${BORDER}`,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: BODY }}>
            scorepath.nl · {oc.bracket.header}
          </span>
        </div>

        {/* ── Kampioen-banner: één vlag rechtsboven, sterren gecentreerd erboven ── */}
        {finalWinnerCode ? (
          <div style={{
            position: 'absolute',
            top: 210,
            right: PAD_X,
            width: 230,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}>
            <StarRow count={champStars} size={18} />
            {champFlag ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={champFlag}
                alt=""
                width={200}
                height={134}
                style={{ borderRadius: '0 14px 0 14px', border: `3px solid ${GOLD}` }}
              />
            ) : (
              <div style={{
                width: 200, height: 134, background: PANEL, border: `3px solid ${GOLD}`,
                borderRadius: '0 14px 0 14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 40, fontWeight: 700, color: INK, fontFamily: BODY,
              }}>
                {finalWinnerCode}
              </div>
            )}
            <span style={{ fontSize: 15, fontWeight: 700, color: GOLD, letterSpacing: '0.18em', fontFamily: BODY }}>
              {oc.wc.result.champion.toUpperCase()}
            </span>
          </div>
        ) : null}
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: W, height: H_CARD, fonts } as any,
  );

  return new Response(img.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
  });
}
