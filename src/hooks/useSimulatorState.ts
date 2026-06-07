'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { MatchResult, GroupId } from '@/lib/types';
import type { LiveMatchResult } from '@/lib/footballDataMapper';
import { encodeResults, decodeResults } from '@/lib/serialization';
import { prefillResults } from '@/lib/prefill';

export type InputMode = 'exact' | 'winner' | 'drag';
export type LiveStatus = 'idle' | 'loading' | 'error';

export interface SimulatorState {
  results: MatchResult[];
  lockedKeys: Set<string>;
  inputMode: InputMode;
  liveStatus: LiveStatus;
  setResult: (r: MatchResult) => void;
  setInputMode: (mode: InputMode) => void;
  reset: () => void;
  prefill: () => void;
  refreshLive: () => void;
}

function matchKey(r: { group: GroupId; homeId: string; awayId: string }) {
  return `${r.group}:${r.homeId}:${r.awayId}`;
}

function readUrlState(): MatchResult[] {
  if (typeof window === 'undefined') return [];
  const params = new URLSearchParams(window.location.search);
  const s = params.get('s');
  if (!s) return [];
  return decodeResults(s);
}

function writeUrlState(results: MatchResult[]) {
  // Encode alleen gebruikersvoorspellingen (geen echte gespeelde uitslagen)
  const userResults = results.filter((r) => !r.locked);
  const encoded = encodeResults(userResults);
  const url = new URL(window.location.href);
  if (userResults.length === 0) {
    url.searchParams.delete('s');
  } else {
    url.searchParams.set('s', encoded);
  }
  window.history.replaceState(null, '', url.toString());
}

export function useSimulatorState(initialMode: InputMode = 'drag'): SimulatorState {
  const [results, setResults] = useState<MatchResult[]>([]);
  const [lockedKeys, setLockedKeys] = useState<Set<string>>(new Set());
  const [inputMode, setInputMode] = useState<InputMode>(initialMode);
  const [liveStatus, setLiveStatus] = useState<LiveStatus>('idle');
  const [hasActiveMatch, setHasActiveMatch] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setResults(readUrlState());
  }, []);

  const syncUrl = useCallback((next: MatchResult[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => writeUrlState(next), 300);
  }, []);

  const applyLiveResults = useCallback((liveResults: LiveMatchResult[]) => {
    const newLockedKeys = new Set(
      liveResults.filter((r) => r.locked).map(matchKey)
    );
    setLockedKeys(newLockedKeys);

    setResults((prev) => {
      const map = new Map<string, MatchResult>();
      // Gebruikersresultaten eerst (niet-locked)
      for (const r of prev) {
        if (!r.locked) map.set(matchKey(r), r);
      }
      // Live resultaten eroverheen (locked overschrijven gebruikersinvoer)
      for (const r of liveResults) {
        map.set(matchKey(r), r);
      }
      return [...map.values()];
    });
  }, []);

  const fetchLive = useCallback(async () => {
    setLiveStatus('loading');
    try {
      const res = await fetch('/api/live-results');
      if (!res.ok) throw new Error('fetch mislukt');
      const data = await res.json();
      setHasActiveMatch(data.hasActiveMatch ?? false);
      applyLiveResults(data.results ?? []);
      setLiveStatus('idle');
    } catch {
      setLiveStatus('error');
    }
  }, [applyLiveResults]);

  // Fetch bij laden
  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  // Poll elke 60s zolang er een actieve wedstrijd is
  useEffect(() => {
    if (!hasActiveMatch) return;
    const id = setInterval(fetchLive, 60_000);
    return () => clearInterval(id);
  }, [hasActiveMatch, fetchLive]);

  const setResult = useCallback(
    (r: MatchResult) => {
      if (lockedKeys.has(matchKey(r))) return; // geblokkeerd
      setResults((prev) => {
        const idx = prev.findIndex(
          (x) => x.group === r.group && x.homeId === r.homeId && x.awayId === r.awayId
        );
        const next =
          idx >= 0
            ? [...prev.slice(0, idx), r, ...prev.slice(idx + 1)]
            : [...prev, r];
        syncUrl(next);
        return next;
      });
    },
    [lockedKeys, syncUrl]
  );

  const reset = useCallback(() => {
    // Behoud gespeelde wedstrijden, verwijder alleen gebruikersvoorspellingen
    setResults((prev) => prev.filter((r) => r.locked));
    syncUrl([]);
  }, [syncUrl]);

  const prefill = useCallback(() => {
    setResults((prev) => {
      const lockedResults = prev.filter((r) => r.locked);
      const prefilled = prefillResults();
      const map = new Map<string, MatchResult>();
      for (const r of prefilled) map.set(matchKey(r), r);
      for (const r of lockedResults) map.set(matchKey(r), r); // locked wint altijd
      const next = [...map.values()];
      syncUrl(next);
      return next;
    });
  }, [syncUrl]);

  return {
    results,
    lockedKeys,
    inputMode,
    liveStatus,
    setResult,
    setInputMode,
    reset,
    prefill,
    refreshLive: fetchLive,
  };
}

export function getResultForMatch(
  results: MatchResult[],
  group: GroupId,
  homeId: string,
  awayId: string
): MatchResult | undefined {
  return results.find(
    (r) => r.group === group && r.homeId === homeId && r.awayId === awayId
  );
}
