import { describe, it, expect } from 'vitest';
import {
  mapRowsToClubs,
  type CompetitionRow,
  type ClubRow,
  type MembershipRow,
  type UefaRow,
} from '@/lib/globeSupabase';

const competitions: CompetitionRow[] = [
  { code: 'ED', country: 'nl', tier: 1, label: 'Eredivisie', current_season: '2026/27' },
  { code: 'SB', country: 'it', tier: 2, label: 'Serie B', current_season: '2026/27' },
];
const clubs: ClubRow[] = [
  { id: 'nl-ajax', name: 'Ajax', country: 'nl', city: 'Amsterdam', lat: 52.3, lng: 4.9, stadium_name: 'Johan Cruijff ArenA', stadium_capacity: 55000, fd_id: 678, crest: '/logos/nl-ajax.png' },
  { id: 'it-palermo', name: 'Palermo', country: 'it', city: 'Palermo', lat: 38.1, lng: 13.3, stadium_name: 'Renzo Barbera', stadium_capacity: 36349, fd_id: null, crest: '/logos/it-palermo.png' },
];

describe('mapRowsToClubs', () => {
  it('joins current-season memberships into the runtime Club shape', () => {
    const memberships: MembershipRow[] = [
      { competition: 'ED', season: '2026/27', club_id: 'nl-ajax' },
      { competition: 'SB', season: '2026/27', club_id: 'it-palermo' },
    ];
    const result = mapRowsToClubs(competitions, clubs, memberships, []);
    expect(result).toHaveLength(2);
    const ajax = result.find((c) => c.id === 'nl-ajax')!;
    expect(ajax.competition).toBe('ED');
    expect(ajax.tier).toBe(1);
    expect(ajax.stadium).toEqual({ name: 'Johan Cruijff ArenA', capacity: 55000 });
    expect(ajax.uefa).toBeUndefined();
    expect(result.find((c) => c.id === 'it-palermo')!.tier).toBe(2);
  });

  it('excludes memberships from a non-current season', () => {
    const memberships: MembershipRow[] = [
      { competition: 'ED', season: '2025/26', club_id: 'nl-ajax' }, // oud seizoen
      { competition: 'SB', season: '2026/27', club_id: 'it-palermo' },
    ];
    const result = mapRowsToClubs(competitions, clubs, memberships, []);
    expect(result.map((c) => c.id)).toEqual(['it-palermo']);
  });

  it('tags UEFA participation when present', () => {
    const memberships: MembershipRow[] = [{ competition: 'ED', season: '2026/27', club_id: 'nl-ajax' }];
    const uefa: UefaRow[] = [{ season: '2026/27', tournament: 'UCL', club_id: 'nl-ajax' }];
    expect(mapRowsToClubs(competitions, clubs, memberships, uefa)[0].uefa).toBe('UCL');
  });

  it('skips rows referencing an unknown club or competition', () => {
    const memberships: MembershipRow[] = [
      { competition: 'ED', season: '2026/27', club_id: 'bestaat-niet' },
      { competition: 'XX', season: '2026/27', club_id: 'nl-ajax' },
    ];
    expect(mapRowsToClubs(competitions, clubs, memberships, [])).toHaveLength(0);
  });
});
