import type { GroupId, Qualifiers } from './types';

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

// R32 seedings (approximate — FIFA matrix for 3rd-place TBD)
// 12 winners vs runners-up: cross-group pairings
// 4 matches among 8 best thirds: TBD
const R32_SOURCES: [string, string][] = [
  // Sectie A → KW-1 → HF-1
  ['w:A', 'r:B'], ['w:C', 'r:D'],
  ['w:B', 'r:A'], ['w:D', 'r:C'],
  // Sectie B → KW-2 → HF-1
  ['w:E', 'r:F'], ['w:G', 'r:H'],
  ['w:F', 'r:E'], ['w:H', 'r:G'],
  // Sectie C → KW-3 → HF-2
  ['w:I', 'r:J'], ['w:K', 'r:L'],
  ['w:J', 'r:I'], ['w:L', 'r:K'],
  // Sectie D → KW-4 → HF-2 (nummers 3 — TBD)
  ['t:1', 't:2'], ['t:3', 't:4'],
  ['t:5', 't:6'], ['t:7', 't:8'],
];

function resolveSlot(source: string, q: Qualifiers): BracketSlot {
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
  const n = parseInt(value) - 1;
  const t = q.bestThirds[n];
  return { teamId: t?.teamId ?? null, label: `3e #${value}` };
}

function empty(id: string, l1: string, l2: string): BracketMatch {
  return { id, slot1: { teamId: null, label: l1 }, slot2: { teamId: null, label: l2 } };
}

// Given an array of matches and knockout results, propagate winners downstream.
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
  const r32 = R32_SOURCES.map(([s1, s2], i) => ({
    id: `r32-${i}`,
    slot1: resolveSlot(s1, q),
    slot2: resolveSlot(s2, q),
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
