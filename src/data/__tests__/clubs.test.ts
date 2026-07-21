import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { clubs, register, MEMBERSHIPS, COMPETITIONS, getClub, countryName } from '@/data/clubs';
import rawUefa from '../../../data/uefa.json';

describe('clubs dataset', () => {
  it('has a substantial, unique set of clubs', () => {
    expect(clubs.length).toBeGreaterThanOrEqual(400);
    const ids = new Set(clubs.map((c) => c.id));
    expect(ids.size).toBe(clubs.length);
  });

  it('only uses valid uefa values', () => {
    for (const c of clubs) {
      if (c.uefa !== undefined) {
        expect(['UCL', 'UEL', 'UECL'], c.id).toContain(c.uefa);
      }
    }
    // CL en EL hebben directe deelnemers; de UECL-league-phase kan tot de
    // loting (eind augustus) leeg zijn omdat álle 36 tickets via de
    // kwalificatie lopen.
    const present = new Set(clubs.map((c) => c.uefa).filter(Boolean));
    expect(present.has('UCL')).toBe(true);
    expect(present.has('UEL')).toBe(true);
  });

  it('references only active clubs in uefa.json', () => {
    const active = new Set(clubs.map((c) => c.id));
    for (const comp of ['UCL', 'UEL', 'UECL'] as const) {
      for (const id of rawUefa[comp]) {
        expect(active.has(id), `${comp}: ${id} is geen actieve club`).toBe(true);
      }
    }
  });

  it('covers all competitions in the metadata map', () => {
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

  it('points every crest at a bundled logo that actually exists', () => {
    for (const c of clubs) {
      if (c.crest !== null) {
        expect(c.crest, c.id).toBe(`/logos/${c.id}.png`);
        expect(existsSync(join(process.cwd(), 'public', c.crest)), `${c.id}: ${c.crest} missing on disk`).toBe(true);
      }
    }
  });

  it('has crests for the vast majority of clubs (promovendi may lag until the logo repo rolls)', () => {
    const withCrest = clubs.filter((c) => c.crest !== null).length;
    expect(withCrest / clubs.length).toBeGreaterThan(0.85);
  });

  it('has consistent memberships: valid register ids, one competition per club, season labels', () => {
    const registerIds = new Set(register.map((c) => c.id));
    const seen = new Set<string>();
    for (const [comp, membership] of Object.entries(MEMBERSHIPS)) {
      expect(COMPETITIONS[comp], `onbekende competitie ${comp}`).toBeDefined();
      expect(membership.season, comp).toMatch(/^\d{4}(\/\d{2})?$/);
      expect(membership.clubs.length, comp).toBeGreaterThanOrEqual(10);
      for (const id of membership.clubs) {
        expect(registerIds.has(id), `${comp}: ${id} niet in register`).toBe(true);
        expect(seen.has(id), `${id} zit in twee competities`).toBe(false);
        seen.add(id);
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

  it('fields a full 24-club Championship as an English tier-2 competition', () => {
    const elc = clubs.filter((c) => c.competition === 'ELC');
    expect(elc.length).toBe(24);
    for (const c of elc) expect(c.tier, c.id).toBe(2);
    // Welshe clubs spelen in het Engelse systeem maar houden hun eigen land.
    const welsh = elc.filter((c) => c.country === 'gb-wls').map((c) => c.id).sort();
    expect(welsh).toEqual(['en-cardiff-city', 'en-swansea-city', 'en-wrexham']);
    // Uit de Premier League gedegradeerde clubs houden hun football-data-id.
    expect(getClub('en-west-ham')?.competition).toBe('ELC');
    expect(clubs.find((c) => c.id === 'en-west-ham')?.fdId).not.toBeNull();
  });

  it('fields the German second tier (2. Bundesliga) with 18 clubs', () => {
    const bl2 = clubs.filter((c) => c.competition === 'BL2');
    expect(bl2.length).toBe(18);
    for (const c of bl2) {
      expect(c.tier, c.id).toBe(2);
      expect(c.country, c.id).toBe('de');
    }
    // Uit de Bundesliga gedegradeerde clubs houden hun football-data-id.
    expect(clubs.find((c) => c.id === 'de-wolfsburg')?.competition).toBe('BL2');
    expect(clubs.find((c) => c.id === 'de-wolfsburg')?.fdId).not.toBeNull();
  });

  it('fields the Brazilian Série A as a calendar-year top division', () => {
    const bsa = clubs.filter((c) => c.competition === 'BSA');
    expect(bsa.length).toBe(20);
    for (const c of bsa) {
      expect(c.tier, c.id).toBe(1);
      expect(c.country, c.id).toBe('br');
      expect(c.lat, c.id).toBeLessThan(6); // zuidelijk halfrond / equator
    }
    expect(MEMBERSHIPS.BSA.season).toBe('2026'); // kalenderjaar, geen 2026/27
    expect(countryName('br', 'nl')).toBe('Brazilië');
  });

  it('fields the Argentine Primera División with 30 calendar-year clubs', () => {
    const arp = clubs.filter((c) => c.competition === 'ARP');
    expect(arp.length).toBe(30);
    for (const c of arp) {
      expect(c.tier, c.id).toBe(1);
      expect(c.country, c.id).toBe('ar');
      expect(c.lat, c.id).toBeLessThan(-20); // Argentinië ligt diep op het zuidelijk halfrond
    }
    expect(MEMBERSHIPS.ARP.season).toBe('2026');
    // Gelijknamige clubs blijven onderscheiden op id.
    expect(getClub('ar-independiente')?.name).toBe('Independiente');
    expect(getClub('ar-independiente-rivadavia')?.name).toBe('Independiente Rivadavia');
  });

  it('fields Liga MX with 18 clubs on the northern hemisphere', () => {
    const lmx = clubs.filter((c) => c.competition === 'LMX');
    expect(lmx.length).toBe(18);
    for (const c of lmx) {
      expect(c.tier, c.id).toBe(1);
      expect(c.country, c.id).toBe('mx');
      expect(c.lng, c.id).toBeLessThan(-85); // Mexico ligt ruim ten westen
    }
    // Drie clubs delen Estadio Banorte (Azteca); de dup-stadion-nudge in
    // clubMap spreidt overlappende markers.
    const azteca = lmx.filter((c) => c.stadium.name === 'Estadio Banorte');
    expect(azteca.map((c) => c.id).sort()).toEqual(['mx-america', 'mx-atlante', 'mx-cruz-azul']);
  });

  it('fields MLS across the USA and Canada with 30 clubs', () => {
    const mls = clubs.filter((c) => c.competition === 'MLS');
    expect(mls.length).toBe(30);
    for (const c of mls) {
      expect(c.tier, c.id).toBe(1);
      expect(['us', 'ca'], c.id).toContain(c.country);
    }
    // De drie Canadese clubs houden hun eigen land.
    const canadian = mls.filter((c) => c.country === 'ca').map((c) => c.id).sort();
    expect(canadian).toEqual(['ca-montreal', 'ca-toronto', 'ca-vancouver']);
    expect(countryName('us', 'nl')).toBe('Verenigde Staten');
    expect(countryName('ca', 'en')).toBe('Canada');
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
