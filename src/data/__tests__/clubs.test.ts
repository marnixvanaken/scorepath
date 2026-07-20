import { describe, it, expect } from 'vitest';
import { clubs, COMPETITIONS, getClub, countryName } from '@/data/clubs';

describe('clubs dataset', () => {
  it('has a substantial, unique set of clubs', () => {
    expect(clubs.length).toBeGreaterThanOrEqual(130);
    const ids = new Set(clubs.map((c) => c.id));
    expect(ids.size).toBe(clubs.length);
  });

  it('covers all seven v1 competitions', () => {
    const present = new Set(clubs.map((c) => c.competition));
    for (const code of Object.keys(COMPETITIONS)) {
      expect(present.has(code), `competition ${code} missing`).toBe(true);
    }
  });

  it('has valid coordinates and tiers', () => {
    for (const c of clubs) {
      expect(c.lat, c.id).toBeGreaterThanOrEqual(-90);
      expect(c.lat, c.id).toBeLessThanOrEqual(90);
      expect(c.lng, c.id).toBeGreaterThanOrEqual(-180);
      expect(c.lng, c.id).toBeLessThanOrEqual(180);
      expect(c.tier, c.id).toBe(COMPETITIONS[c.competition].tier);
    }
  });

  it('has a stadium name and sane capacity for every club', () => {
    for (const c of clubs) {
      expect(c.stadium.name.length, c.id).toBeGreaterThan(0);
      if (c.stadium.capacity !== null) {
        expect(c.stadium.capacity, c.id).toBeGreaterThan(1000);
        expect(c.stadium.capacity, c.id).toBeLessThan(120000);
      }
    }
  });

  it('only uses football-data.org crest URLs, consistent with fdId', () => {
    for (const c of clubs) {
      if (c.crest !== null) {
        expect(c.crest, c.id).toMatch(/^https:\/\/crests\.football-data\.org\//);
        expect(c.fdId, `${c.id} has a crest but no fdId`).not.toBeNull();
      }
    }
  });

  it('marks KKD clubs as tier 2 without football-data coverage', () => {
    const kkd = clubs.filter((c) => c.competition === 'KKD');
    expect(kkd.length).toBeGreaterThanOrEqual(18);
    for (const c of kkd) {
      expect(c.tier, c.id).toBe(2);
      expect(c.fdId, c.id).toBeNull();
    }
  });

  it('looks up clubs by id', () => {
    expect(getClub('nl-ajax')?.name).toBe('Ajax');
    expect(getClub('bestaat-niet')).toBeUndefined();
  });

  it('localizes country names including non-ISO football codes', () => {
    expect(countryName('nl', 'nl')).toBe('Nederland');
    expect(countryName('gb-eng', 'nl')).toBe('Engeland');
    expect(countryName('gb-eng', 'es')).toBe('Inglaterra');
    expect(countryName('mc', 'en')).toBe('Monaco');
  });
});
