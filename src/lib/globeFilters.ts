import type { Club } from '@/data/clubs';

// Filterlogica voor de club-globe. Puur en URL-serialiseerbaar zodat
// filters deelbaar zijn (?tier=1&cap=30000) en los testbaar.

export interface GlobeFilters {
  /** null = alle niveaus */
  tier: number | null;
  /** minimale stadioncapaciteit; null = geen ondergrens */
  minCapacity: number | null;
}

export const DEFAULT_FILTERS: GlobeFilters = { tier: null, minCapacity: null };

export const CAPACITY_PRESETS = [10000, 30000, 50000] as const;

export function filterClubs(clubs: Club[], filters: GlobeFilters): Club[] {
  return clubs.filter((c) => {
    if (filters.tier !== null && c.tier !== filters.tier) return false;
    if (filters.minCapacity !== null) {
      // Onbekende capaciteit telt niet mee zodra er een ondergrens actief is.
      if (c.stadium.capacity === null || c.stadium.capacity < filters.minCapacity) return false;
    }
    return true;
  });
}

export function isDefault(filters: GlobeFilters): boolean {
  return filters.tier === null && filters.minCapacity === null;
}

// Onzin-waarden vallen stil terug op de default (deelbare URLs blijven werken).
export function parseGlobeFilters(params: URLSearchParams): GlobeFilters {
  const tierRaw = params.get('tier');
  const capRaw = params.get('cap');
  const tier = tierRaw !== null && /^\d+$/.test(tierRaw) ? Number(tierRaw) : null;
  const cap = capRaw !== null && /^\d+$/.test(capRaw) ? Number(capRaw) : null;
  return {
    tier: tier !== null && tier >= 1 && tier <= 9 ? tier : null,
    minCapacity: cap !== null && cap > 0 ? cap : null,
  };
}

// Muteert de meegegeven params zodat bestaande parameters (bv. ?club=)
// behouden blijven.
export function applyGlobeFilters(params: URLSearchParams, filters: GlobeFilters): URLSearchParams {
  if (filters.tier !== null) params.set('tier', String(filters.tier));
  else params.delete('tier');
  if (filters.minCapacity !== null) params.set('cap', String(filters.minCapacity));
  else params.delete('cap');
  return params;
}
