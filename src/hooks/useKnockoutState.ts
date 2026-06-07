'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { encodeKnockout, decodeKnockout, type KnockoutResults } from '@/lib/bracket';

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

  return { kr, pick, resetKnockout };
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
