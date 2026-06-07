'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { encodeKnockout, decodeKnockout, buildBracket, type KnockoutResults } from '@/lib/bracket';
import { teamById } from '@/data/worldcup2026';
import type { Qualifiers } from '@/lib/types';

function readUrl(): KnockoutResults {
  if (typeof window === 'undefined') return {};
  const k = new URLSearchParams(window.location.search).get('k');
  return k ? decodeKnockout(k) : {};
}

function writeUrl(kr: KnockoutResults) {
  const url = new URL(window.location.href);
  const encoded = encodeKnockout(kr);
  if (Object.keys(kr).length === 0) {
    url.searchParams.delete('k');
  } else {
    url.searchParams.set('k', encoded);
  }
  window.history.replaceState(null, '', url.toString());
}

export function useKnockoutState() {
  const [kr, setKr] = useState<KnockoutResults>({});
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setKr(readUrl()); }, []);

  const sync = useCallback((next: KnockoutResults) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => writeUrl(next), 300);
  }, []);

  const pick = useCallback((matchId: string, slot: 1 | 2) => {
    setKr((prev) => {
      // Toggle off if same slot clicked again
      const next = { ...prev };
      if (prev[matchId] === slot) {
        delete next[matchId];
      } else {
        // Invalidate all downstream matches when this pick changes
        invalidateDownstream(matchId, next);
        next[matchId] = slot;
      }
      sync(next);
      return next;
    });
  }, [sync]);

  const resetKnockout = useCallback(() => {
    setKr({});
    sync({});
  }, [sync]);

  // Auto-fill bracket: pick the team with the higher strength rating in each match
  const prefillKnockout = useCallback((qualifiers: Qualifiers) => {
    const bracket = buildBracket(qualifiers, {});
    const rounds = [bracket.r32, bracket.r16, bracket.qf, bracket.sf, [bracket.final]];
    const roundKeys = ['r32', 'r16', 'kw', 'hf', 'finale'];
    const next: KnockoutResults = {};

    for (let ri = 0; ri < rounds.length; ri++) {
      const matches = rounds[ri];
      const key = roundKeys[ri];
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const t1 = match.slot1.teamId ? teamById(match.slot1.teamId) : null;
        const t2 = match.slot2.teamId ? teamById(match.slot2.teamId) : null;
        if (!t1 && !t2) continue;
        const id = key === 'finale' ? 'finale' : `${key}-${i}`;
        if (t1 && t2) {
          next[id] = t1.strength >= t2.strength ? 1 : 2;
        } else if (t1) {
          next[id] = 1;
        } else if (t2) {
          next[id] = 2;
        }
        // Rebuild bracket with current picks to propagate winners to next round
        if (ri < rounds.length - 1) {
          const updated = buildBracket(qualifiers, next);
          rounds[ri + 1] = ri === 0 ? updated.r16
            : ri === 1 ? updated.qf
            : ri === 2 ? updated.sf
            : [updated.final];
        }
      }
    }

    setKr(next);
    sync(next);
  }, [sync]);

  return { kr, pick, resetKnockout, prefillKnockout };
}

// When a result changes, clear all results that depend on it downstream.
// r32[i] → r16[⌊i/2⌋] → kw[⌊r16idx/2⌋] → hf[⌊kwIdx/2⌋] → finale
function invalidateDownstream(matchId: string, kr: KnockoutResults) {
  const chain = getDownstreamChain(matchId);
  for (const id of chain) {
    delete kr[id];
  }
}

function getDownstreamChain(matchId: string): string[] {
  const chain: string[] = [];
  let current = matchId;
  while (true) {
    const next = nextMatch(current);
    if (!next) break;
    chain.push(next);
    current = next;
  }
  return chain;
}

function nextMatch(matchId: string): string | null {
  const [round, idx] = matchId.split('-');
  const i = parseInt(idx);
  const next = Math.floor(i / 2);
  if (round === 'r32') return `r16-${next}`;
  if (round === 'r16') return `kw-${next}`;
  if (round === 'kw')  return `hf-${next}`;
  if (round === 'hf')  return 'finale';
  return null;
}
