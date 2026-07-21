'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Club } from '@/data/clubs';
import type { Messages } from '@/i18n/types';
import { filterClubs, parseGlobeFilters, applyGlobeFilters, type GlobeFilters } from '@/lib/globeFilters';
import { isWebGLAvailable } from './webgl';
import ClubPanel from './ClubPanel';
import GlobeFiltersBar from './GlobeFilters';
import ClubListFallback from './ClubListFallback';

export type GlobeMessages = Messages['globe'];

const ClubGlobe = dynamic(() => import('./ClubGlobe'), {
  ssr: false,
  loading: () => <GlobeLoading />,
});

function GlobeLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div
        className="h-8 w-8 rounded-full border-2 animate-spin"
        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--cta)' }}
      />
    </div>
  );
}

interface GlobeFeatureProps {
  clubs: Club[];
  m: GlobeMessages;
  locale: string;
}

export default function GlobeFeature({ clubs, m, locale }: GlobeFeatureProps) {
  // null = nog niet geprobed (eerste client-render), daarna true/false.
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clubById = useMemo(() => new Map(clubs.map((c) => [c.id, c])), [clubs]);

  // De URL is de bron van waarheid voor selectie (?club=) en filters
  // (?tier=&cap=) — deelbaar en deep-linkbaar; onzin valt terug op default.
  const filters = useMemo(() => parseGlobeFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const filteredClubs = useMemo(() => filterClubs(clubs, filters), [clubs, filters]);
  const visibleIds = useMemo(
    () => (filteredClubs.length === clubs.length ? null : new Set(filteredClubs.map((c) => c.id))),
    [filteredClubs, clubs],
  );

  const rawSelected = clubById.get(searchParams.get('club') ?? '') ?? null;
  // Weggefilterde selectie telt niet: paneel dicht, param ruimen we op.
  const selectedClub = rawSelected && (visibleIds === null || visibleIds.has(rawSelected.id)) ? rawSelected : null;

  const replaceParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      // window.location i.p.v. de useSearchParams-snapshot: bij twee snelle
      // filterklikken zou de tweede anders de eerste overschrijven.
      const params = new URLSearchParams(window.location.search);
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const setSelected = useCallback(
    (id: string | null) => {
      replaceParams((params) => {
        if (id) params.set('club', id);
        else params.delete('club');
      });
    },
    [replaceParams],
  );

  const setFilters = useCallback(
    (next: GlobeFilters) => {
      replaceParams((params) => {
        applyGlobeFilters(params, next);
        // Valt de huidige selectie buiten het nieuwe filter, ruim die op.
        const selected = params.get('club');
        if (selected) {
          const club = clubById.get(selected);
          if (!club || !filterClubs([club], next).length) params.delete('club');
        }
      });
    },
    [replaceParams, clubById],
  );

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  if (webgl === false) {
    return (
      <div className="absolute inset-0 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 pt-4">
          <GlobeFiltersBar filters={filters} onChange={setFilters} shownCount={filteredClubs.length} m={m} />
        </div>
        {/* De filterbalk is absoluut gepositioneerd; ruimte vrijhouden. */}
        <div className="pt-16">
          <ClubListFallback clubs={filteredClubs} m={m} onSelect={(id) => setSelected(id)} />
        </div>
        <ClubPanel club={selectedClub} m={m} locale={locale} onClose={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <p className="sr-only">{m.globeHint}</p>
      {webgl && (
        <ClubGlobe
          clubs={clubs}
          visibleIds={visibleIds}
          selectedId={selectedClub?.id ?? null}
          onClubClick={(id) => setSelected(id)}
        />
      )}
      {webgl === null && <GlobeLoading />}
      <GlobeFiltersBar filters={filters} onChange={setFilters} shownCount={filteredClubs.length} m={m} />
      <ClubPanel club={selectedClub} m={m} locale={locale} onClose={() => setSelected(null)} />
    </div>
  );
}
