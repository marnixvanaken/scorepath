import { ImageResponse } from 'next/og';
import { decodeResults } from '@/lib/serialization';
import { decodeKnockout } from '@/lib/bracket';
import { computeAllGroups, getQualifiers } from '@/lib/standings';
import { traceRoute, resultLabel } from '@/lib/route';
import { TEAMS } from '@/data/worldcup2026';
import { FLAG_CODE } from '@/data/flags';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const ROUND_LABELS: Record<string, string> = {
  r32:   'R32',
  r16:   'R16',
  qf:    'KW',
  sf:    'HF',
  final: 'FINALE',
};

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
  const route = traceRoute(teamId, qualifiers, kr);
  const label = resultLabel(route.result);
  const isChampion = route.result === 'kampioen';

  const flagCode = FLAG_CODE[teamId];
  const flagSrc = flagCode ? `https://flagcdn.com/w80/${flagCode}.png` : null;

  const BG = '#F2EDE4';
  const INK = '#0D0D0D';
  const RED = '#D93B1F';
  const GOLD = '#A8852A';
  const MUTED = '#9B8E82';
  const CARD = '#FFFFFF';
  const BORDER = '#E0D8CC';

  return new ImageResponse(
    (
      <div
        style={{
          width: 600,
          height: 900,
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          padding: 48,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              SCOREPATH · WK 2026
            </span>
            <span style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>
              {route.qualifiedFrom ?? ''}
            </span>
          </div>
          {flagSrc && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={flagSrc} alt="" width={56} height={38} style={{ borderRadius: 3, border: `1px solid ${BORDER}` }} />
          )}
        </div>

        {/* Team name */}
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: '-1px' }}>
            {team.name.toUpperCase()}
          </span>
        </div>

        {/* Result label */}
        <div style={{ display: 'flex', marginBottom: 36 }}>
          <span style={{ fontSize: 80, fontWeight: 900, color: isChampion ? GOLD : RED, lineHeight: 1 }}>
            {label.toUpperCase()}
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: BORDER, marginBottom: 24 }} />

        {/* Route rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {route.rounds.map((round) => {
            const won = round.won;
            return (
              <div
                key={round.round}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  background: CARD,
                  borderBottom: `1px solid ${BORDER}`,
                  opacity: won === null ? 0.4 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: MUTED, letterSpacing: '0.15em', width: 52 }}>
                    {ROUND_LABELS[round.round] ?? round.round.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>
                    vs {round.opponentId ? round.opponentLabel.replace(/^[12]e Gr\. /, '') : round.opponentLabel}
                  </span>
                </div>
                <span style={{ fontSize: 22, fontWeight: 900, color: won === null ? MUTED : won ? GOLD : RED }}>
                  {won === null ? '—' : won ? '✓' : '✗'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', marginTop: 'auto', paddingTop: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            scorepath.app
          </span>
          <span style={{ fontSize: 11, color: MUTED }}>Maak jouw scenario op scorepath.app</span>
        </div>
      </div>
    ),
    { width: 600, height: 900 },
  );
}
