import { describe, it, expect } from 'vitest';
import { synthesizeDragResults } from '@/lib/dragResults';
import { encodeResults, decodeResults } from '@/lib/serialization';
import { decodeKnockout } from '@/lib/bracket';
import { getQualifiers } from '@/lib/standings';
import { traceRoute, resultLabel } from '@/lib/route';
import { GROUP_IDS, teamsByGroup } from '@/data/worldcup2026';
import type { GroupId } from '@/lib/types';

function defaultDragOrders(): Record<GroupId, string[]> {
  return Object.fromEntries(
    GROUP_IDS.map((g) => [g, teamsByGroup(g).map((t) => t.id)]),
  ) as Record<GroupId, string[]>;
}

describe('synthesizeDragResults', () => {
  it('reproduces the dragged group order via the standings engine', () => {
    const dragOrders = defaultDragOrders();
    // Reverse group A so the order is non-trivial w.r.t. strength.
    dragOrders['A'] = [...dragOrders['A']].reverse();

    const results = synthesizeDragResults(dragOrders, [...GROUP_IDS]);
    const q = getQualifiers(results, {}, {});

    for (const g of GROUP_IDS) {
      const winner = q.winners.find((w) => w.group === g)!;
      const runnerUp = q.runnersUp.find((w) => w.group === g)!;
      expect(winner.teamId).toBe(dragOrders[g][0]);
      expect(runnerUp.teamId).toBe(dragOrders[g][1]);
    }
  });

  it('ranks the best thirds by the dragged thirds order', () => {
    const dragOrders = defaultDragOrders();
    // Put group L first in the thirds order -> its #3 must rank #1 and advance.
    const thirdsOrder: GroupId[] = ['L', ...GROUP_IDS.filter((g) => g !== 'L')];

    const results = synthesizeDragResults(dragOrders, thirdsOrder);
    const q = getQualifiers(results, {}, {});

    const advancingGroups = q.bestThirds.map((t) => t.group);
    expect(advancingGroups[0]).toBe('L');
    // The 4 groups dropped at the back of thirdsOrder must not advance.
    for (const g of thirdsOrder.slice(8)) {
      expect(advancingGroups).not.toContain(g);
    }
  });

  it('makes a dragged group winner come out as champion through the encoded URL', () => {
    // Reproduce the reported scenario: CUW dragged 1st in group E, then picked
    // through the bracket. The share URL only carries s + k.
    const dragOrders = defaultDragOrders();
    dragOrders['E'] = ['CUW', ...teamsByGroup('E').map((t) => t.id).filter((id) => id !== 'CUW')];

    const s = encodeResults(synthesizeDragResults(dragOrders, [...GROUP_IDS]));
    const k = '1111111111111111212212122111121';

    // Exactly what /api/og does:
    const q = getQualifiers(decodeResults(s), {}, {});
    const route = traceRoute('CUW', q, decodeKnockout(k), decodeResults(s));

    expect(route.result).toBe('kampioen');
    expect(resultLabel(route.result)).toBe('Winnaar');
  });

  it('produces no scorelines for a champion that is a group winner', () => {
    const dragOrders = defaultDragOrders();
    dragOrders['E'] = ['CUW', ...teamsByGroup('E').map((t) => t.id).filter((id) => id !== 'CUW')];

    const results = synthesizeDragResults(dragOrders, [...GROUP_IDS]);
    const q = getQualifiers(results, {}, {});
    const route = traceRoute('CUW', q, decodeKnockout('1111111111111111212212122111121'), results);

    const groupRows = route.rounds.filter((r) => r.round === 'groep');
    expect(groupRows).toHaveLength(3);
    for (const row of groupRows) expect(row.score).toBeUndefined();
  });
});
