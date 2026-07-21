import type { Club } from '@/data/clubs';
import { COMPETITIONS } from '@/data/clubs';

// Filterlogica voor de club-globe. Puur en URL-serialiseerbaar zodat
// filters deelbaar zijn (?tier=1&cap=30000&comp=PL&uefa=UCL) en los testbaar.

export type UefaComp = 'UCL' | 'UEL' | 'UECL';

export interface GlobeFilters {
  /** null = alle niveaus */
  tier: number | null;
  /** minimale stadioncapaciteit; null = geen ondergrens */
  minCapacity: number | null;
  /** competitiecode uit COMPETITIONS; null = alle competities */
  competition: string | null;
  /** Europese deelname dit seizoen; null = geen filter */
  uefa: UefaComp | null;
}

export const DEFAULT_FILTERS: GlobeFilters = { tier: null, minCapacity: null, competition: null, uefa: null };

export const CAPACITY_PRESETS = [10000, 30000, 50000] as const;
export const UEFA_COMPS: UefaComp[] = ['UCL', 'UEL', 'UECL'];

export function filterClubs(clubs: Club[], filters: GlobeFilters): Club[] {
  return clubs.filter((c) => {
    if (filters.tier !== null && c.tier !== filters.tier) return false;
    if (filters.competition !== null && c.competition !== filters.competition) return false;
    if (filters.uefa !== null && c.uefa !== filters.uefa) return false;
    if (filters.minCapacity !== null) {
      // Onbekende capaciteit telt niet mee zodra er een ondergrens actief is.
      if (c.stadium.capacity === null || c.stadium.capacity < filters.minCapacity) return false;
    }
    return true;
  });
}

export function isDefault(filters: GlobeFilters): boolean {
  return filters.tier === null && filters.minCapacity === null && filters.competition === null && filters.uefa === null;
}

// Onzin-waarden vallen stil terug op de default (deelbare URLs blijven werken).
export function parseGlobeFilters(params: URLSearchParams): GlobeFilters {
  const tierRaw = params.get('tier');
  const capRaw = params.get('cap');
  const compRaw = params.get('comp');
  const uefaRaw = params.get('uefa');
  const tier = tierRaw !== null && /^\d+$/.test(tierRaw) ? Number(tierRaw) : null;
  const cap = capRaw !== null && /^\d+$/.test(capRaw) ? Number(capRaw) : null;
  return {
    tier: tier !== null && tier >= 1 && tier <= 9 ? tier : null,
    minCapacity: cap !== null && cap > 0 ? cap : null,
    competition: compRaw !== null && compRaw in COMPETITIONS ? compRaw : null,
    uefa: uefaRaw !== null && (UEFA_COMPS as string[]).includes(uefaRaw) ? (uefaRaw as UefaComp) : null,
  };
}

// Muteert de meegegeven params zodat bestaande parameters (bv. ?club=)
// behouden blijven.
export function applyGlobeFilters(params: URLSearchParams, filters: GlobeFilters): URLSearchParams {
  if (filters.tier !== null) params.set('tier', String(filters.tier));
  else params.delete('tier');
  if (filters.minCapacity !== null) params.set('cap', String(filters.minCapacity));
  else params.delete('cap');
  if (filters.competition !== null) params.set('comp', filters.competition);
  else params.delete('comp');
  if (filters.uefa !== null) params.set('uefa', filters.uefa);
  else params.delete('uefa');
  return params;
}
