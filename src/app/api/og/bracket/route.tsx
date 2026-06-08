import { ImageResponse } from 'next/og';
import { decodeResults } from '@/lib/serialization';
import { decodeKnockout, buildBracket, type BracketMatch, type KnockoutResults } from '@/lib/bracket';
import { computeAllGroups, getQualifiers } from '@/lib/standings';
import { teamById } from '@/data/worldcup2026';
import { flagUrl } from '@/data/flags';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// Instagram Stories: 1080×1920
const W       = 1080;
const H_CARD  = 1920;
const H       = 53;        // height of one team slot; 32×53 = 1696 = bracket area
const PAD_X   = 21;        // (1080 - 5*198 - 4*12) / 2 = 21
const COL_W   = 198;
const COL_GAP = 12;
const HEADER  = 115;       // logo + title
const COL_LBL = 48;        // round label row height
const FOOTER  = 61;        // 115+48+1696+61 = 1920 ✓

const BG     = '#F2EDE4';
const INK    = '#0D0D0D';
const MUTED  = '#9B8E82';
const BORDER = '#E0D8CC';
const PANEL  = '#EDE8DF';
const WIN_BG = '#14532d';
const WIN_FG = '#86efac';
const LOS_FG = '#888880';
const TBD_BG = '#F8F5F0';
const GOLD   = '#A8852A';

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

// padding above/below the 2 team slots within a match group
function topPad(roundIdx: number): number {
  return Math.floor(((Math.pow(2, roundIdx) - 1) * H) / 2);
}

function slotName(match: BracketMatch, slot: 1 | 2): string {
  const s = slot === 1 ? match.slot1 : match.slot2;
  const raw = s.teamId ? (teamById(s.teamId)?.name ?? s.label) : s.label;
  return raw.length > 11 ? raw.slice(0, 10) + '…' : raw;
}

function renderColumn(
  matches: BracketMatch[],
  kr: KnockoutResults,
  roundIdx: number,
  BODY: string,
) {
  const groupH = Math.pow(2, roundIdx + 1) * H;
  const pad    = topPad(roundIdx);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: COL_W }}>
      {matches.map((match, mi) => {
        const winner = kr[match.id];
        const s1Won  = winner === 1;
        const s2Won  = winner === 2;
        const s1Lost = winner === 2;
        const s2Lost = winner === 1;

        const renderSlot = (slot: 1 | 2) => {
          const sd = slot === 1 ? match.slot1 : match.slot2;
          const won  = slot === 1 ? s1Won  : s2Won;
          const lost = slot === 1 ? s1Lost : s2Lost;
          const name = slotName(match, slot);
          const flag = sd.teamId ? flagUrl(sd.teamId, 40) : '';

          return (
            <div style={{
              height: H,
              width: COL_W,
              display: 'flex',
              alignItems: 'center',
              padding: '0 7px',
              gap: 5,
              background: won ? WIN_BG : TBD_BG,
              borderBottom: `1px solid ${BORDER}`,
              borderRight: `1px solid ${BORDER}`,
            }}>
              {flag ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={flag} width={20} height={14} style={{ borderRadius: '0 2px 0 2px', flexShrink: 0 }} alt="" />
              ) : (
                <div style={{ width: 20, height: 14, background: BORDER, borderRadius: 2, flexShrink: 0 }} />
              )}
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: won ? WIN_FG : lost ? LOS_FG : INK,
                fontFamily: BODY,
                overflow: 'hidden',
              }}>
                {name}
              </span>
            </div>
          );
        };

        return (
          <div
            key={`${match.id}-${mi}`}
            style={{
              height: groupH,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingTop: pad,
              paddingBottom: pad,
            }}
          >
            {renderSlot(1)}
            {renderSlot(2)}
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

  if (!s) return new Response('Not found', { status: 404 });

  const results  = decodeResults(s);
  const kr       = k ? decodeKnockout(k) : {};
  const allGroups = computeAllGroups(results, {}, {});
  const qualifiers = getQualifiers(results, {}, {});
  const bracket  = buildBracket(qualifiers, kr);

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

  const finalWinner = (() => {
    const w = kr[bracket.final.id];
    if (!w) return null;
    const slot = w === 1 ? bracket.final.slot1 : bracket.final.slot2;
    return slot.teamId ? (teamById(slot.teamId)?.name ?? slot.label) : slot.label;
  })();

  const rounds: { label: string; matches: BracketMatch[]; idx: number }[] = [
    { label: 'R32',  matches: bracket.r32,    idx: 0 },
    { label: 'R16',  matches: bracket.r16,    idx: 1 },
    { label: 'KW',   matches: bracket.qf,     idx: 2 },
    { label: 'HF',   matches: bracket.sf,     idx: 3 },
    { label: 'FIN',  matches: [bracket.final], idx: 4 },
  ];

  const img = new ImageResponse(
    (
      <div style={{
        width: W,
        height: H_CARD,
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: BODY,
      }}>
        {/* ── Header ── */}
        <div style={{
          height: HEADER,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${PAD_X}px`,
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: INK, letterSpacing: '0.1em', fontFamily: DISPLAY }}>
              WK 2026
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: BODY }}>
              KNOCK-OUT BRACKET
            </span>
          </div>
          {finalWinner && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={GOLD}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: GOLD, fontFamily: BODY, letterSpacing: '0.05em' }}>
                {finalWinner.toUpperCase()}
              </span>
            </div>
          )}
          {!finalWinner && (
            <span style={{ fontSize: 11, color: MUTED, fontFamily: BODY }}>scorepath.nl</span>
          )}
        </div>

        {/* ── Column labels ── */}
        <div style={{
          height: COL_LBL,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${PAD_X}px`,
          gap: COL_GAP,
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
        <div style={{
          flex: 1,
          display: 'flex',
          padding: `0 ${PAD_X}px`,
          gap: COL_GAP,
          overflow: 'hidden',
        }}>
          {rounds.map((r) => (
            <div key={r.label} style={{ display: 'flex', flexDirection: 'column' }}>
              {renderColumn(r.matches, kr, r.idx, BODY)}
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{
          height: FOOTER,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: `1px solid ${BORDER}`,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: BODY }}>
            scorepath.nl · WK 2026
          </span>
        </div>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { width: W, height: H_CARD, fonts } as any,
  );

  return new Response(img.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store',
    },
  });
}
