import { describe, it, expect } from 'vitest';
import { mapFdTeamMatches, type FdTeamMatch } from '@/lib/footballDataMapper';

function match(overrides: Partial<FdTeamMatch>): FdTeamMatch {
  return {
    id: 1,
    utcDate: '2026-08-01T12:00:00Z',
    status: 'SCHEDULED',
    competition: { name: 'Eredivisie' },
    homeTeam: { id: 678, shortName: 'Ajax' },
    awayTeam: { id: 674, shortName: 'PSV' },
    ...overrides,
  };
}

describe('mapFdTeamMatches', () => {
  it('keeps only scheduled/timed matches', () => {
    const { matches } = mapFdTeamMatches(
      {
        matches: [
          match({ id: 1, status: 'FINISHED' }),
          match({ id: 2, status: 'SCHEDULED' }),
          match({ id: 3, status: 'TIMED' }),
          match({ id: 4, status: 'IN_PLAY' }),
        ],
      },
      678,
    );
    expect(matches.map((m) => m.id)).toEqual([2, 3]);
  });

  it('sorts by date and caps at the limit', () => {
    const { matches } = mapFdTeamMatches(
      {
        matches: [1, 2, 3, 4, 5, 6, 7].map((n) =>
          match({ id: n, utcDate: `2026-08-0${8 - n}T12:00:00Z` }),
        ),
      },
      678,
    );
    expect(matches).toHaveLength(5);
    expect(matches[0].utcDate <= matches[1].utcDate).toBe(true);
  });

  it('marks home and away correctly and falls back to full names', () => {
    const { matches } = mapFdTeamMatches(
      {
        matches: [
          match({ id: 1, homeTeam: { id: 678, shortName: 'Ajax' }, awayTeam: { id: 674, name: 'PSV Eindhoven', shortName: undefined } }),
          match({ id: 2, homeTeam: { id: 674, shortName: 'PSV' }, awayTeam: { id: 678, shortName: 'Ajax' } }),
        ],
      },
      678,
    );
    expect(matches[0].isHome).toBe(true);
    expect(matches[0].away).toBe('PSV Eindhoven');
    expect(matches[1].isHome).toBe(false);
  });

  it('returns empty for missing matches', () => {
    expect(mapFdTeamMatches({}, 678).matches).toEqual([]);
  });
});
