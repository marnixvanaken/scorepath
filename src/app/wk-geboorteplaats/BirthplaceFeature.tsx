'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Player } from '@/data/players';
import { haversine } from '@/lib/haversine';
import type { Messages } from '@/i18n/types';
import { Flag } from '@/components/Flag';

const PlayerMap = dynamic(() => import('./PlayerMap'), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

interface GeocodeSuggestion {
  name: string;
  lat: number;
  lon: number;
}

interface UserPos {
  lat: number;
  lon: number;
  name: string;
}

interface PlayerWithDistance extends Player {
  distance: number;
}

function MapPlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[--bg] text-[--fg] opacity-60 text-sm">
      Kaart laden…
    </div>
  );
}

function positionLabel(pos: string, m: Messages['birthplace']): string {
  switch (pos) {
    case 'GK': return m.posGK;
    case 'DF': return m.posDF;
    case 'MF': return m.posMF;
    case 'FW': return m.posFW;
    default: return pos;
  }
}

interface Props {
  players: Player[];
  m: Messages['birthplace'];
}

export default function BirthplaceFeature({ players, m }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userPos, setUserPos] = useState<UserPos | null>(null);
  const [results, setResults] = useState<PlayerWithDistance[]>([]);
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);
  const [showAllOnMap, setShowAllOnMap] = useState(true);
  const [error, setError] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error();
      const data: GeocodeSuggestion[] = await res.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch {
      setError(true);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function selectSuggestion(s: GeocodeSuggestion) {
    setQuery(s.name);
    setShowSuggestions(false);
    setSuggestions([]);

    const pos: UserPos = { lat: s.lat, lon: s.lon, name: s.name };
    setUserPos(pos);
    setHighlightedIdx(null);

    const ranked = players
      .map((p) => ({ ...p, distance: haversine(s.lat, s.lon, p.lat, p.lon) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
    setResults(ranked);
  }

  const nearest = results[0] ?? null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[--fg] leading-tight">{m.title}</h1>
        <p className="mt-2 text-[--fg] opacity-70 text-sm">{m.subtitle}</p>
      </div>

      {/* Search input */}
      <div ref={containerRef} className="relative">
        <label className="block text-xs font-semibold text-[--fg] opacity-60 uppercase tracking-wide mb-1">
          {m.inputLabel}
        </label>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={m.inputPlaceholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[--fg] placeholder:text-[--fg]/40 focus:outline-none focus:border-[--cta]/60 transition-colors text-sm"
          autoComplete="off"
          spellCheck={false}
        />
        {isLoading && (
          <span className="absolute right-3 top-1/2 translate-y-1 text-xs text-[--fg]/50">
            {m.searching}
          </span>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-50 left-0 right-0 mt-1 bg-[#1a1f2e] border border-white/10 rounded-lg shadow-xl overflow-hidden">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm text-[--fg] hover:bg-white/10 transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectSuggestion(s);
                  }}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && query.length >= 2 && suggestions.length === 0 && !showSuggestions && (
          <p className="mt-1 text-xs text-[--fg]/50">{m.noResults}</p>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm">{m.error}</p>
      )}

      {/* Empty state */}
      {!userPos && !error && (
        <p className="text-[--fg]/50 text-sm">{m.emptyHint}</p>
      )}

      {/* Result: nearest player card */}
      {nearest && userPos && (
        <div>
          <h2 className="text-xs font-semibold text-[--fg] opacity-60 uppercase tracking-wide mb-2">
            {m.nearest}
          </h2>
          <div
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-[--cta]/40 transition-colors"
            onClick={() => setHighlightedIdx(0)}
          >
            <Flag teamId={nearest.teamCode} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-[--fg] truncate">{nearest.name}</span>
                <span className="text-[--cta] font-mono font-bold text-sm shrink-0">
                  {Math.round(nearest.distance).toLocaleString()} {m.distanceKm}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-[--fg]/60">
                <span>{m.cardTeam}: <span className="text-[--fg]/90">{nearest.team}</span></span>
                <span>·</span>
                <span>{m.cardPosition}: <span className="text-[--fg]/90">{positionLabel(nearest.position, m)}</span></span>
              </div>
              <div className="mt-0.5 text-xs text-[--fg]/60">
                {m.cardBirthplace}: <span className="text-[--fg]/80">{nearest.birthplace}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      {userPos && results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-[--fg] opacity-60 uppercase tracking-wide">
              {m.top5}
            </h2>
            <button
              type="button"
              onClick={() => setShowAllOnMap((v) => !v)}
              className="text-xs text-[--cta] hover:underline transition"
            >
              {showAllOnMap ? m.hideTop5 : m.showTop5}
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10" style={{ height: 300 }}>
            <PlayerMap
              userPos={userPos}
              results={showAllOnMap ? results : [results[0]]}
              highlightedIdx={highlightedIdx}
              osmAttrib={m.osmAttrib}
              loadingMap={m.loadingMap}
            />
          </div>
        </div>
      )}

      {/* Top 5 list */}
      {results.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-[--fg] opacity-60 uppercase tracking-wide mb-2">
            {m.top5}
          </h2>
          <ol className="space-y-2">
            {results.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setHighlightedIdx(i === highlightedIdx ? null : i)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors border ${
                    highlightedIdx === i
                      ? 'border-[--cta]/60 bg-[--cta]/10'
                      : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: i === 0 ? '#10b981' : '#374151', color: 'white' }}
                  >
                    {i + 1}
                  </span>
                  <Flag teamId={p.teamCode} size={20} />
                  <span className="flex-1 text-sm text-[--fg] font-medium truncate">{p.name}</span>
                  <span className="text-xs text-[--fg]/60 shrink-0">
                    {positionLabel(p.position, m)}
                  </span>
                  <span className="text-xs text-[--cta] font-mono font-semibold shrink-0">
                    {Math.round(p.distance).toLocaleString()} {m.distanceKm}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* OSM attribution footer */}
      <footer className="text-center text-xs text-[--fg]/30 pt-4 border-t border-white/5">
        {m.osmAttrib} · <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[--fg]/60 transition-colors"
        >
          openstreetmap.org
        </a>
      </footer>
    </div>
  );
}
