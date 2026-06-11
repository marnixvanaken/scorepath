import { describe, it, expect } from 'vitest';
import { computeGroupStandings, rankThirdPlaced, computeAllGroups } from '../standings';
import type { MatchResult, GroupId } from '../types';

// Helper: build a minimal MatchResult
function m(group: GroupId, homeId: string, awayId: string, hg: number, ag: number): MatchResult {
  return { group, homeId, awayId, homeGoals: hg, awayGoals: ag };
}

describe('computeGroupStandings', () => {
  const teams = ['AAA', 'BBB', 'CCC', 'DDD'];

  it('awards 3 points for a win and 0 for a loss', () => {
    const results: MatchResult[] = [m('A', 'AAA', 'BBB', 2, 0)];
    const standings = computeGroupStandings(teams, results);
    const aaa = standings.find((s) => s.teamId === 'AAA')!;
    const bbb = standings.find((s) => s.teamId === 'BBB')!;
    expect(aaa.points).toBe(3);
    expect(aaa.won).toBe(1);
    expect(bbb.points).toBe(0);
    expect(bbb.lost).toBe(1);
  });

  it('awards 1 point each for a draw', () => {
    const results: MatchResult[] = [m('A', 'AAA', 'BBB', 1, 1)];
    const standings = computeGroupStandings(teams, results);
    const aaa = standings.find((s) => s.teamId === 'AAA')!;
    const bbb = standings.find((s) => s.teamId === 'BBB')!;
    expect(aaa.points).toBe(1);
    expect(bbb.points).toBe(1);
    expect(aaa.drawn).toBe(1);
  });

  it('sorts by goal difference as tiebreaker after points', () => {
    // AAA and BBB both 3pts; AAA won 3-0, BBB won 1-0 — AAA has better GD
    const results: MatchResult[] = [
      m('A', 'AAA', 'CCC', 3, 0), // AAA wins, GD +3
      m('A', 'BBB', 'DDD', 1, 0), // BBB wins, GD +1
    ];
    const standings = computeGroupStandings(teams, results);
    expect(standings[0].teamId).toBe('AAA');
    expect(standings[1].teamId).toBe('BBB');
  });

  it('uses head-to-head as tiebreaker for 3-way tie', () => {
    // Each team beats the next in a cycle but has same overall pts/GD/GF
    // AAA beats BBB, BBB beats CCC, CCC beats AAA (all 1-0)
    const results: MatchResult[] = [
      m('A', 'AAA', 'BBB', 1, 0),
      m('A', 'BBB', 'CCC', 1, 0),
      m('A', 'CCC', 'AAA', 1, 0),
      m('A', 'DDD', 'AAA', 0, 0), // draw, no effect on 3-way
      m('A', 'DDD', 'BBB', 0, 0),
      m('A', 'DDD', 'CCC', 0, 0),
    ];
    const standings = computeGroupStandings(teams, results);
    // All three have 4pts, 1 GD, 1 GF — H2H within the trio is also cyclic (same)
    // Falls through to strength/id deterministic fallback
    const topThree = new Set(standings.slice(0, 3).map((s) => s.teamId));
    expect(topThree.has('AAA')).toBe(true);
    expect(topThree.has('BBB')).toBe(true);
    expect(topThree.has('CCC')).toBe(true);
    expect(standings[3].teamId).toBe('DDD');
  });

  it('counts points correctly in quick mode (no goals)', () => {
    const results: MatchResult[] = [
      { group: 'A', homeId: 'AAA', awayId: 'BBB', outcome: 'H' },
      { group: 'A', homeId: 'CCC', awayId: 'DDD', outcome: 'D' },
    ];
    const standings = computeGroupStandings(teams, results);
    const aaa = standings.find((s) => s.teamId === 'AAA')!;
    const bbb = standings.find((s) => s.teamId === 'BBB')!;
    const ccc = standings.find((s) => s.teamId === 'CCC')!;
    expect(aaa.points).toBe(3);
    expect(bbb.points).toBe(0);
    expect(ccc.points).toBe(1);
    // GF/GA stay 0 in quick mode
    expect(aaa.gf).toBe(0);
    expect(aaa.hasScores).toBe(false);
  });
});

describe('rankThirdPlaced', () => {
  it('marks exactly 8 teams as advancing', () => {
    // Build a minimal allGroups with all 12 groups, each with 4 standings
    const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'] as GroupId[];
    const allGroups = Object.fromEntries(
      groups.map((g, i) => [
        g,
        [
          { teamId: `${g}1`, played: 3, won: 3, drawn: 0, lost: 0, gf: 6, ga: 0, gd: 6, points: 9, hasScores: true },
          { teamId: `${g}2`, played: 3, won: 2, drawn: 0, lost: 1, gf: 4, ga: 2, gd: 2, points: 6, hasScores: true },
          { teamId: `${g}3`, played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 4, gd: -2, points: 3 - i, hasScores: true },
          { teamId: `${g}4`, played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 6, gd: -6, points: 0, hasScores: true },
        ],
      ])
    ) as ReturnType<typeof computeAllGroups>;

    const thirds = rankThirdPlaced(allGroups);
    expect(thirds).toHaveLength(12);
    const advancing = thirds.filter((t) => t.advances);
    const notAdvancing = thirds.filter((t) => !t.advances);
    expect(advancing).toHaveLength(8);
    expect(notAdvancing).toHaveLength(4);
  });
});

describe('serialization round-trip', () => {
  it('encodes and decodes results losslessly', async () => {
    const { encodeResults, decodeResults } = await import('../serialization');
    const results: MatchResult[] = [
      m('A', 'MEX', 'KOR', 2, 1),
      m('A', 'CZE', 'RSA', 0, 0),
      { group: 'B', homeId: 'CAN', awayId: 'BIH', outcome: 'A' },
    ];
    const encoded = encodeResults(results);
    const decoded = decodeResults(encoded);

    const find = (r: MatchResult[], g: GroupId, h: string, a: string) =>
      r.find((x) => x.group === g && x.homeId === h && x.awayId === a);

    const mex = find(decoded, 'A', 'MEX', 'KOR')!;
    expect(mex.homeGoals).toBe(2);
    expect(mex.awayGoals).toBe(1);

    const cze = find(decoded, 'A', 'CZE', 'RSA')!;
    expect(cze.homeGoals).toBe(0);
    expect(cze.awayGoals).toBe(0);

    const can = find(decoded, 'B', 'CAN', 'BIH')!;
    expect(can.outcome).toBe('A');
    expect(can.homeGoals).toBeUndefined();
  });
});
