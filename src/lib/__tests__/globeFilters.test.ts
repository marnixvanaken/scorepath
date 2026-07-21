import { describe, it, expect } from 'vitest';
import type { Club } from '@/data/clubs';
import { filterClubs, parseGlobeFilters, applyGlobeFilters, isDefault, DEFAULT_FILTERS } from '@/lib/globeFilters';

function club(id: string, tier: number, capacity: number | null, competition?: string, uefa?: Club['uefa']): Club {
  const record: Club = {
    id, name: id, country: 'nl', city: 'X', competition: competition ?? (tier === 1 ? 'ED' : 'KKD'), tier,
    lat: 52, lng: 5, stadium: { name: 'S', capacity }, fdId: null, crest: null,
  };
  if (uefa) record.uefa = uefa;
  return record;
}

const clubs = [
  club('a', 1, 55000, 'ED', 'UCL'),
  club('b', 1, 12000, 'PL'),
  club('c', 2, 20000),
  club('d', 2, null),
];

describe('filterClubs', () => {
  it('returns everything on defaults', () => {
    expect(filterClubs(clubs, DEFAULT_FILTERS)).toHaveLength(4);
  });

  it('filters by tier', () => {
    expect(filterClubs(clubs, { ...DEFAULT_FILTERS, tier: 2 }).map((c) => c.id)).toEqual(['c', 'd']);
  });

  it('filters by minimum capacity and drops unknown capacities', () => {
    expect(filterClubs(clubs, { ...DEFAULT_FILTERS, minCapacity: 15000 }).map((c) => c.id)).toEqual(['a', 'c']);
  });

  it('combines tier and capacity', () => {
    expect(filterClubs(clubs, { ...DEFAULT_FILTERS, tier: 1, minCapacity: 30000 }).map((c) => c.id)).toEqual(['a']);
  });

  it('filters by competition and uefa participation', () => {
    expect(filterClubs(clubs, { ...DEFAULT_FILTERS, competition: 'PL' }).map((c) => c.id)).toEqual(['b']);
    expect(filterClubs(clubs, { ...DEFAULT_FILTERS, uefa: 'UCL' }).map((c) => c.id)).toEqual(['a']);
    expect(filterClubs(clubs, { ...DEFAULT_FILTERS, uefa: 'UEL' })).toHaveLength(0);
  });
});

describe('parse/apply round-trip', () => {
  it('round-trips through URL params', () => {
    const filters = { tier: 2, minCapacity: 10000, competition: 'KKD', uefa: 'UCL' as const };
    const params = applyGlobeFilters(new URLSearchParams('club=nl-ajax'), filters);
    expect(params.get('club')).toBe('nl-ajax');
    expect(parseGlobeFilters(params)).toEqual(filters);
  });

  it('clears params for default filters', () => {
    const params = applyGlobeFilters(new URLSearchParams('tier=2&cap=10000&comp=PL&uefa=UEL'), DEFAULT_FILTERS);
    expect(params.toString()).toBe('');
  });

  it('falls back to defaults on garbage', () => {
    const parsed = parseGlobeFilters(new URLSearchParams('tier=banaan&cap=-5&comp=XX&uefa=FIFA'));
    expect(parsed).toEqual(DEFAULT_FILTERS);
    expect(isDefault(parsed)).toBe(true);
  });
});
