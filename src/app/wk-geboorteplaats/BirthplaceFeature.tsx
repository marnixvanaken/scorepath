'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Player } from '@/data/players';
import { haversine } from '@/lib/haversine';
import { flagUrl } from '@/data/flags';
import type { Messages } from '@/i18n/types';

const PlayerMap = dynamic(() => import('./PlayerMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-white/5">
      <Spinner />
    </div>
  ),
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

function Spinner() {
  return (
    <span
      className="inline-block w-5 h-5 rounded-full border-2 border-white/20 border-t-[--cta] animate-spin"
      aria-hidden="true"
    />
  );
}

// Directe <img> rendering — geen next/image of useParams nodig
function FlagImg({ teamCode, size = 24 }: { teamCode: string; size?: number }) {
  const cdnWidth = size > 48 ? 160 : 80;
  const src = flagUrl(teamCode, cdnWidth);
  const h = Math.round(size * 0.67);
  if (!src) {
    return (
      <span
        className="inline-block shrink-0 bg-slate-700"
        style={{ width: size, height: h, borderRadius: '0 4px 0 4px' }}
      />
    );
  }
  return (
    <span
      className="inline-block shrink-0 overflow-hidden border border-white/20"
      style={{ width: size, height: h, borderRadius: '0 4px 0 4px' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={teamCode}
        width={size}
        height={h}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </span>
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
  locale: string;
}

export default function BirthplaceFeature({ players, m, locale }: Props) {
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
  const justSelectedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return; }
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}&lang=${locale}`);
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
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
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
    justSelectedRef.current = true;
    setQuery(s.name);
    setShowSuggestions(false);
    setSuggestions([]);
    inputRef.current?.blur();

    const pos: UserPos = { lat: s.lat, lon: s.lon, name: s.name };
    setUserPos(pos);
    setHighlightedIdx(null);

    const ranked = players
      .map((p) => ({ ...p, distance: haversine(s.lat, s.lon, p.lat, p.lon) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
    setResults(ranked);
  }

  function clearInput() {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setUserPos(null);
    setResults([]);
    setHighlightedIdx(null);
    setError(false);
    inputRef.current?.focus();
  }

  const nearest = results[0] ?? null;

  const cardUrl = results.length > 0
    ? `/${locale}/wk-geboorteplaats/card?${results.slice(0, 10).map((p, i) => `p${i + 1}=${encodeURIComponent(p.id)}&d${i + 1}=${Math.round(p.distance)}`).join('&')}`
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-12 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[--fg] leading-snug">{m.title}</h1>
        <p className="text-[--fg]/60 text-sm leading-relaxed">{m.subtitle}</p>
      </div>

      {/* Search input */}
      <div ref={containerRef} className="relative">
        <label className="block text-xs font-semibold text-[--fg]/50 uppercase tracking-widest mb-2">
          {m.inputLabel}
        </label>

        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[--fg]/40 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--cta)';
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
            placeholder={m.inputPlaceholder}
            className="w-full rounded-xl pl-11 pr-12 py-3.5 text-base text-[--fg] placeholder:text-[--fg]/40 focus:outline-none transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--border-strong)',
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <Spinner />
            ) : query.length > 0 ? (
              <button
                type="button"
                onClick={clearInput}
                aria-label="Wis zoekopdracht"
                className="w-7 h-7 flex items-center justify-center rounded-full text-[--fg]/50 hover:text-[--fg] hover:bg-white/10 transition-colors"
              >
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute z-50 left-0 right-0 mt-1.5 rounded-xl shadow-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '2px solid var(--border-strong)' }}
          >
            {suggestions.map((s, i) => (
              <li key={i} style={i > 0 ? { borderTop: '1px solid var(--border)' } : undefined}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-4 text-base text-[--fg] transition-colors flex items-center gap-3"
                  style={{ background: 'transparent' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-panel)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}
                  onTouchEnd={(e) => { e.preventDefault(); selectSuggestion(s); }}
                >
                  <svg className="w-3.5 h-3.5 text-[--fg]/30 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 21s-8-5.5-8-11a8 8 0 0 1 16 0c0 5.5-8 11-8 11z"/><circle cx="12" cy="10" r="2.5"/>
                  </svg>
                  <span className="truncate">{s.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && query.length >= 2 && suggestions.length === 0 && !showSuggestions && (
          <p className="mt-2 text-sm text-[--fg]/40">{m.noResults}</p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{m.error}</p>}

      {/* Empty state */}
      {!userPos && !error && (
        <div className="flex items-start gap-3 text-[--fg]/40 text-sm py-2">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
          </svg>
          {m.emptyHint}
        </div>
      )}

      {/* #1 hero card */}
      {nearest && userPos && (
        <div>
          <p className="text-xs font-semibold text-[--fg]/50 uppercase tracking-widest mb-3">{m.nearest}</p>
          <button
            type="button"
            onClick={() => setHighlightedIdx(0)}
            className="w-full text-left bg-gradient-to-br from-white/8 to-white/3 border border-white/15 hover:border-[--cta]/50 rounded-2xl p-5 transition-all"
          >
            <div className="flex items-center gap-4">
              <FlagImg teamCode={nearest.teamCode} size={52} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-lg text-[--fg] leading-tight">{nearest.name}</span>
                  <span className="text-[--cta] font-mono font-bold text-base shrink-0 tabular-nums">
                    {Math.round(nearest.distance).toLocaleString()} {m.distanceKm}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-[--fg]/60">
                  <span>{nearest.team}</span>
                  <span>·</span>
                  <span>{positionLabel(nearest.position, m)}</span>
                </div>
                <div className="mt-1 text-sm text-[--fg]/50 truncate">
                  {nearest.birthplace}
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {cardUrl && (
        <div className="flex justify-center">
          <Link
            href={cardUrl}
            className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--cta)', borderRadius: '0 8px 0 8px' }}
          >
            {m.myCard}
            <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* Top 10 list */}
      {results.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[--fg]/50 uppercase tracking-widest mb-3">{m.top5}</p>
          <ol className="space-y-1.5">
            {results.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setHighlightedIdx(i === highlightedIdx ? null : i)}
                  className={`w-full flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-all border ${
                    highlightedIdx === i
                      ? 'border-[--cta]/50 bg-[--cta]/10'
                      : 'border-transparent bg-white/5 hover:bg-white/10 active:bg-white/15'
                  }`}
                >
                  {/* Rank badge */}
                  <span
                    className="w-7 h-7 mt-0.5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 tabular-nums"
                    style={{
                      background: i === 0 ? '#10b981' : '#1e2535',
                      color: i === 0 ? 'white' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Flag */}
                  <span className="mt-1 shrink-0">
                    <FlagImg teamCode={p.teamCode} size={24} />
                  </span>

                  {/* Name + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[--fg] truncate">{p.name}</span>
                      <span className="text-sm text-[--cta] font-mono font-semibold shrink-0 tabular-nums">
                        {Math.round(p.distance).toLocaleString()} {m.distanceKm}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-[--fg]/50 flex gap-2 flex-wrap">
                      <span>{p.team}</span>
                      <span>·</span>
                      <span>{positionLabel(p.position, m)}</span>
                      <span>·</span>
                      <span className="truncate">{p.birthplace}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Map */}
      {userPos && results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-[--fg]/50 uppercase tracking-widest">Kaart</p>
            <button
              type="button"
              onClick={() => setShowAllOnMap((v) => !v)}
              className="text-xs text-[--cta]/80 hover:text-[--cta] transition-colors"
            >
              {showAllOnMap ? m.hideTop5 : m.showTop5}
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: 280 }}>
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

      {/* OSM attribution */}
      <footer className="text-center text-xs text-[--fg]/25 pt-2">
        {m.osmAttrib} ·{' '}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[--fg]/50 transition-colors"
        >
          openstreetmap.org
        </a>
      </footer>
    </div>
  );
}
