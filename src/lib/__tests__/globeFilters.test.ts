import { describe, it, expect } from 'vitest';
import type { Club } from '@/data/clubs';
import { filterClubs, parseGlobeFilters, applyGlobeFilters, isDefault, DEFAULT_FILTERS } from '@/lib/globeFilters';

function club(id: string, tier: number, capacity: number | null): Club {
  return {
    id, name: id, country: 'nl', city: 'X', competition: tier === 1 ? 'ED' : 'KKD', tier,
    lat: 52, lng: 5, stadium: { name: 'S', capacity }, fdId: null, crest: null,
  };
}

const clubs = [club('a', 1, 55000), club('b', 1, 12000), club('c', 2, 20000), club('d', 2, null)];

describe('filterClubs', () => {
  it('returns everything on defaults', () => {
    expect(filterClubs(clubs, DEFAULT_FILTERS)).toHaveLength(4);
  });

  it('filters by tier', () => {
    expect(filterClubs(clubs, { tier: 2, minCapacity: null }).map((c) => c.id)).toEqual(['c', 'd']);
  });

  it('filters by minimum capacity and drops unknown capacities', () => {
    expect(filterClubs(clubs, { tier: null, minCapacity: 15000 }).map((c) => c.id)).toEqual(['a', 'c']);
  });

  it('combines tier and capacity', () => {
    expect(filterClubs(clubs, { tier: 1, minCapacity: 30000 }).map((c) => c.id)).toEqual(['a']);
  });
});

describe('parse/apply round-trip', () => {
  it('round-trips through URL params', () => {
    const params = applyGlobeFilters(new URLSearchParams('club=nl-ajax'), { tier: 2, minCapacity: 10000 });
    expect(params.get('club')).toBe('nl-ajax');
    expect(parseGlobeFilters(params)).toEqual({ tier: 2, minCapacity: 10000 });
  });

  it('clears params for default filters', () => {
    const params = applyGlobeFilters(new URLSearchParams('tier=2&cap=10000'), DEFAULT_FILTERS);
    expect(params.toString()).toBe('');
  });

  it('falls back to defaults on garbage', () => {
    const parsed = parseGlobeFilters(new URLSearchParams('tier=banaan&cap=-5'));
    expect(parsed).toEqual(DEFAULT_FILTERS);
    expect(isDefault(parsed)).toBe(true);
  });
});
