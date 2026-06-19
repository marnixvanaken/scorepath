import type { MatchResult, GroupId } from './types';

// football-data.org TLA-codes die afwijken van onze team-IDs
const TLA_OVERRIDES: Record<string, string> = {
  SAU: 'KSA', // Saudi Arabia
  DRC: 'COD', // DR Congo
  CTA: 'CPV', // Cape Verde (fallback)
};

function normalizeTla(tla: string): string {
  return TLA_OVERRIDES[tla] ?? tla;
}

function normalizeGroup(raw: string | null): GroupId | null {
  if (!raw) return null;
  const m = raw.match(/^GROUP_([A-L])$/);
  return m ? (m[1] as GroupId) : null;
}

interface FdScore {
  fullTime: { home: number | null; away: number | null };
}

interface FdMatch {
  status: string;
  group: string | null;
  homeTeam: { tla: string };
  awayTeam: { tla: string };
  score: FdScore;
}

export interface LiveMatchResult extends MatchResult {
  locked: boolean;
}

export interface LiveResultsResponse {
  results: LiveMatchResult[];
  hasActiveMatch: boolean;
}

// Handmatig bevestigde uitslagen voor wedstrijden die de API niet teruggeeft
const STATIC_PLAYED: Array<Omit<LiveMatchResult, 'locked'>> = [
  { group: 'E', homeId: 'GER', awayId: 'CUW', homeGoals: 7, awayGoals: 1 },
  { group: 'H', homeId: 'KSA', awayId: 'URU', homeGoals: 1, awayGoals: 1 },
];

export function mapFdResponse(data: { matches?: FdMatch[] }): LiveResultsResponse {
  const matches = data.matches ?? [];
  const results: LiveMatchResult[] = [];

  for (const m of matches) {
    if (m.status === 'SCHEDULED' || m.status === 'TIMED' || m.status === 'POSTPONED') continue;

    const group = normalizeGroup(m.group);
    if (!group) continue;

    const homeId = normalizeTla(m.homeTeam.tla);
    const awayId = normalizeTla(m.awayTeam.tla);
    const { home, away } = m.score.fullTime;

    if (typeof home !== 'number' || typeof away !== 'number') continue;

    results.push({
      group,
      homeId,
      awayId,
      homeGoals: home,
      awayGoals: away,
      locked: m.status === 'FINISHED',
    });
  }

  // Voeg statische resultaten toe voor wedstrijden die de API mist
  const apiKeys = new Set(results.map((r) => `${r.group}:${r.homeId}:${r.awayId}`));
  for (const s of STATIC_PLAYED) {
    if (!apiKeys.has(`${s.group}:${s.homeId}:${s.awayId}`)) {
      results.push({ ...s, locked: true });
    }
  }

  const hasActiveMatch = matches.some(
    (m) => m.status === 'IN_PLAY' || m.status === 'PAUSED'
  );

  return { results, hasActiveMatch };
}
