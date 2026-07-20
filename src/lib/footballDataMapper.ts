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

  const hasActiveMatch = matches.some(
    (m) => m.status === 'IN_PLAY' || m.status === 'PAUSED'
  );

  return { results, hasActiveMatch };
}

// ── Aankomende wedstrijden per team (club-globe) ──────────────────────

export interface FdTeamMatch {
  id: number;
  utcDate: string;
  status: string;
  competition?: { name?: string };
  homeTeam: { id?: number; name?: string; shortName?: string };
  awayTeam: { id?: number; name?: string; shortName?: string };
}

export interface ClubMatch {
  id: number;
  utcDate: string;
  competition: string;
  home: string;
  away: string;
  /** true als het opgevraagde team thuis speelt */
  isHome: boolean;
}

export interface ClubMatchesResponse {
  matches: ClubMatch[];
}

export function mapFdTeamMatches(
  data: { matches?: FdTeamMatch[] },
  fdId: number,
  limit = 5,
): ClubMatchesResponse {
  const matches = (data.matches ?? [])
    .filter((m) => m.status === 'SCHEDULED' || m.status === 'TIMED')
    .sort((a, b) => a.utcDate.localeCompare(b.utcDate))
    .slice(0, limit)
    .map((m) => ({
      id: m.id,
      utcDate: m.utcDate,
      competition: m.competition?.name ?? '',
      home: m.homeTeam.shortName ?? m.homeTeam.name ?? '',
      away: m.awayTeam.shortName ?? m.awayTeam.name ?? '',
      isHome: m.homeTeam.id === fdId,
    }));

  return { matches };
}
