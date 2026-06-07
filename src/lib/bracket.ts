import type { GroupId, Qualifiers } from './types';
import { THIRD_PLACE_SLOTS } from '@/data/knockoutCombinations';

// matchId → 1 (slot1 wins) | 2 (slot2 wins)
export type KnockoutResults = Record<string, 1 | 2>;

// Compact encoding: 31 chars, one per match (r32×16 + r16×8 + qf×4 + sf×2 + final×1)
// '1'=slot1 wins, '2'=slot2 wins, '_'=TBD
const KNOCKOUT_IDS = [
  ...Array.from({ length: 16 }, (_, i) => `r32-${i}`),
  ...Array.from({ length: 8 }, (_, i) => `r16-${i}`),
  ...Array.from({ length: 4 }, (_, i) => `kw-${i}`),
  'hf-0', 'hf-1',
  'finale',
];

export function encodeKnockout(kr: KnockoutResults): string {
  return KNOCKOUT_IDS.map((id) => {
    const v = kr[id];
    return v === 1 ? '1' : v === 2 ? '2' : '_';
  }).join('');
}

export function decodeKnockout(s: string): KnockoutResults {
  const kr: KnockoutResults = {};
  if (!s || s.length !== KNOCKOUT_IDS.length) return kr;
  for (let i = 0; i < KNOCKOUT_IDS.length; i++) {
    if (s[i] === '1') kr[KNOCKOUT_IDS[i]] = 1;
    else if (s[i] === '2') kr[KNOCKOUT_IDS[i]] = 2;
  }
  return kr;
}

export interface BracketSlot {
  teamId: string | null;
  label: string;
}

export interface BracketMatch {
  id: string;
  slot1: BracketSlot;
  slot2: BracketSlot;
}

// Official R32 pairings — source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage
//
// Fixed slots:  w:X = 1e Gr.X, r:X = 2e Gr.X
// Variable slots: tp:N = column N (0-based) from the combinations table
//   Column order: [1A, 1B, 1D, 1E, 1G, 1I, 1K, 1L]
//   Corresponding R32 matches: [M79, M85, M81, M74, M82, M77, M87, M80]
//
// Bracket flow:
//   r32[0-3]  → r16[0-1] → kw[0] ─┐
//   r32[4-7]  → r16[2-3] → kw[1] ─┴→ hf[0]
//   r32[8-11] → r16[4-5] → kw[2] ─┐
//   r32[12-15]→ r16[6-7] → kw[3] ─┴→ hf[1]
const R32_SOURCES: [string, string][] = [
  // Sectie 1 → R16 M89/M90 → KW M97 → HF M101
  ['r:A', 'r:B'],   // M73: 2A vs 2B
  ['w:F', 'r:C'],   // M75: 1F vs 2C
  ['w:E', 'tp:3'],  // M74: 1E vs 3rd (combinations col 4)
  ['w:I', 'tp:5'],  // M77: 1I vs 3rd (combinations col 6)
  // Sectie 2 → R16 M93/M94 → KW M98 → HF M101
  ['r:K', 'r:L'],   // M83: 2K vs 2L
  ['w:H', 'r:J'],   // M84: 1H vs 2J
  ['w:D', 'tp:2'],  // M81: 1D vs 3rd (combinations col 3)
  ['w:G', 'tp:4'],  // M82: 1G vs 3rd (combinations col 5)
  // Sectie 3 → R16 M91/M92 → KW M99 → HF M102
  ['w:C', 'r:F'],   // M76: 1C vs 2F
  ['r:E', 'r:I'],   // M78: 2E vs 2I
  ['w:A', 'tp:0'],  // M79: 1A vs 3rd (combinations col 1)
  ['w:L', 'tp:7'],  // M80: 1L vs 3rd (combinations col 8)
  // Sectie 4 → R16 M95/M96 → KW M100 → HF M102
  ['w:J', 'r:H'],   // M86: 1J vs 2H
  ['r:D', 'r:G'],   // M88: 2D vs 2G
  ['w:B', 'tp:1'],  // M85: 1B vs 3rd (combinations col 2)
  ['w:K', 'tp:6'],  // M87: 1K vs 3rd (combinations col 7)
];

function resolveSlot(source: string, q: Qualifiers, thirdSlots: string): BracketSlot {
  const [type, value] = source.split(':');
  const g = value as GroupId;
  if (type === 'w') {
    const t = q.winners.find((x) => x.group === g);
    return { teamId: t?.teamId ?? null, label: `1e Gr. ${g}` };
  }
  if (type === 'r') {
    const t = q.runnersUp.find((x) => x.group === g);
    return { teamId: t?.teamId ?? null, label: `2e Gr. ${g}` };
  }
  // tp:N — look up in the combinations table
  const n = parseInt(value);
  const groupLetter = thirdSlots[n] as GroupId | undefined;
  if (groupLetter) {
    const t = q.bestThirds.find((x) => x.group === groupLetter);
    return { teamId: t?.teamId ?? null, label: `3e Gr. ${groupLetter}` };
  }
  return { teamId: null, label: `3e #${n + 1}` };
}

function empty(id: string, l1: string, l2: string): BracketMatch {
  return { id, slot1: { teamId: null, label: l1 }, slot2: { teamId: null, label: l2 } };
}

function propagate(
  prev: BracketMatch[],
  ids: string[],
  kr: KnockoutResults,
  labelFn: (i: number) => [string, string],
): BracketMatch[] {
  return Array.from({ length: prev.length / 2 }, (_, i) => {
    const a = prev[i * 2];
    const b = prev[i * 2 + 1];
    const winA = kr[a.id] ? (kr[a.id] === 1 ? a.slot1 : a.slot2) : null;
    const winB = kr[b.id] ? (kr[b.id] === 1 ? b.slot1 : b.slot2) : null;
    const [l1, l2] = labelFn(i);
    return {
      id: ids[i],
      slot1: winA ?? { teamId: null, label: l1 },
      slot2: winB ?? { teamId: null, label: l2 },
    };
  });
}

export function buildBracket(q: Qualifiers, kr: KnockoutResults = {}) {
  const thirdKey = [...q.bestThirds].map((t) => t.group).sort().join('');
  const thirdSlots = THIRD_PLACE_SLOTS[thirdKey] ?? '';

  const r32 = R32_SOURCES.map(([s1, s2], i) => ({
    id: `r32-${i}`,
    slot1: resolveSlot(s1, q, thirdSlots),
    slot2: resolveSlot(s2, q, thirdSlots),
  }));

  const r16 = propagate(
    r32,
    Array.from({ length: 8 }, (_, i) => `r16-${i}`),
    kr,
    (i) => [`W R32-${i * 2 + 1}`, `W R32-${i * 2 + 2}`],
  );

  const qf = propagate(
    r16,
    Array.from({ length: 4 }, (_, i) => `kw-${i}`),
    kr,
    (i) => [`W 1/16-${i * 2 + 1}`, `W 1/16-${i * 2 + 2}`],
  );

  const sf = propagate(
    qf,
    ['hf-0', 'hf-1'],
    kr,
    (i) => [`W KW-${i * 2 + 1}`, `W KW-${i * 2 + 2}`],
  );

  const [finalMatch] = propagate(
    sf,
    ['finale'],
    kr,
    () => ['W HF-1', 'W HF-2'],
  );

  return { r32, r16, qf, sf, final: finalMatch };
}
