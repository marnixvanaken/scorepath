import { describe, it, expect } from 'vitest';
import {
  encodeKnockout,
  decodeKnockout,
  buildBracket,
  type KnockoutResults,
} from '../bracket';
import type { Qualifiers, ThirdPlaceRank, GroupId } from '../types';

// Standaard qualifiers: sterkste team wint elke groep.
// Groepen: A–L met telkens dezelfde volgorde als in worldcup2026.ts
const WINNERS: { group: GroupId; teamId: string }[] = [
  { group: 'A', teamId: 'MEX' },
  { group: 'B', teamId: 'SUI' },
  { group: 'C', teamId: 'BRA' },
  { group: 'D', teamId: 'USA' },
  { group: 'E', teamId: 'GER' },
  { group: 'F', teamId: 'NED' },
  { group: 'G', teamId: 'BEL' },
  { group: 'H', teamId: 'ESP' },
  { group: 'I', teamId: 'FRA' },
  { group: 'J', teamId: 'ARG' },
  { group: 'K', teamId: 'POR' },
  { group: 'L', teamId: 'ENG' },
];

const RUNNERS_UP: { group: GroupId; teamId: string }[] = [
  { group: 'A', teamId: 'KOR' },
  { group: 'B', teamId: 'CAN' },
  { group: 'C', teamId: 'MAR' },
  { group: 'D', teamId: 'TUR' },
  { group: 'E', teamId: 'ECU' },
  { group: 'F', teamId: 'JPN' },
  { group: 'G', teamId: 'IRN' },
  { group: 'H', teamId: 'URU' },
  { group: 'I', teamId: 'NOR' },
  { group: 'J', teamId: 'AUT' },
  { group: 'K', teamId: 'COL' },
  { group: 'L', teamId: 'CRO' },
];

// Combinatie "EFGHIJKL" → slots "EJIFHGLK"
// tp-volgorde: E(CIV), J(JOR), I(IRQ), F(SWE), H(KSA), G(EGY), L(GHA), K(UZB)
function mkThird(group: GroupId, teamId: string, rank: number): ThirdPlaceRank {
  return { group, teamId, rank, advances: true, played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 3, gd: 0, points: 4, hasScores: false };
}

const BEST_THIRDS: ThirdPlaceRank[] = [
  mkThird('E', 'CIV', 1),
  mkThird('F', 'SWE', 2),
  mkThird('G', 'EGY', 3),
  mkThird('H', 'KSA', 4),
  mkThird('I', 'IRQ', 5),
  mkThird('J', 'JOR', 6),
  mkThird('K', 'UZB', 7),
  mkThird('L', 'GHA', 8),
];

const QUALIFIERS: Qualifiers = {
  winners: WINNERS,
  runnersUp: RUNNERS_UP,
  bestThirds: BEST_THIRDS,
};

// Knock-out picks: slot1 wint altijd (sterkste team wint).
// Geeft een volledig ingevulde KnockoutResults.
function allSlot1Wins(): KnockoutResults {
  const kr: KnockoutResults = {};
  for (let i = 0; i < 16; i++) kr[`r32-${i}`] = 1;
  for (let i = 0; i < 8;  i++) kr[`r16-${i}`] = 1;
  for (let i = 0; i < 4;  i++) kr[`kw-${i}`]  = 1;
  kr['hf-0'] = 1;
  kr['hf-1'] = 1;
  kr['finale'] = 1;
  return kr;
}

// ─── encode / decode round-trip ──────────────────────────────────────────────

describe('encodeKnockout / decodeKnockout', () => {
  it('produceert exact 31 tekens', () => {
    expect(encodeKnockout({}).length).toBe(31);
    expect(encodeKnockout(allSlot1Wins()).length).toBe(31);
  });

  it('lege kr → enkel underscores → decode geeft lege object', () => {
    const encoded = encodeKnockout({});
    expect(encoded).toBe('_'.repeat(31));
    expect(decodeKnockout(encoded)).toEqual({});
  });

  it('volledige slot1-overwinningen round-trip', () => {
    const kr = allSlot1Wins();
    expect(decodeKnockout(encodeKnockout(kr))).toEqual(kr);
  });

  it('volledige slot2-overwinningen round-trip', () => {
    const kr: KnockoutResults = {};
    for (let i = 0; i < 16; i++) kr[`r32-${i}`] = 2;
    for (let i = 0; i < 8;  i++) kr[`r16-${i}`] = 2;
    for (let i = 0; i < 4;  i++) kr[`kw-${i}`]  = 2;
    kr['hf-0'] = 2;
    kr['hf-1'] = 2;
    kr['finale'] = 2;
    expect(decodeKnockout(encodeKnockout(kr))).toEqual(kr);
  });

  it('gedeeltelijk ingevulde bracket round-trip', () => {
    const kr: KnockoutResults = { 'r32-0': 1, 'r32-3': 2, 'r16-0': 1 };
    const decoded = decodeKnockout(encodeKnockout(kr));
    expect(decoded['r32-0']).toBe(1);
    expect(decoded['r32-3']).toBe(2);
    expect(decoded['r16-0']).toBe(1);
    expect(decoded['r32-1']).toBeUndefined();
  });

  it('negeert ongeldige encoded string (te kort)', () => {
    expect(decodeKnockout('_'.repeat(10))).toEqual({});
  });

  it('negeert lege string', () => {
    expect(decodeKnockout('')).toEqual({});
  });

  it('alleen finale ingevuld', () => {
    const kr: KnockoutResults = { finale: 1 };
    const decoded = decodeKnockout(encodeKnockout(kr));
    expect(decoded['finale']).toBe(1);
    expect(Object.keys(decoded).filter((k) => k !== 'finale').length).toBe(0);
  });
});

// ─── buildBracket varianten ───────────────────────────────────────────────────

describe('buildBracket', () => {
  it('leeg bracket: alle slots TBD zonder kr', () => {
    const { r32, r16, qf, sf, final } = buildBracket(QUALIFIERS, {});
    // Alle r32-teams moeten gevuld zijn (qualifiers zijn volledig)
    expect(r32).toHaveLength(16);
    for (const m of r32) {
      expect(m.slot1.teamId ?? m.slot1.label).toBeTruthy();
      expect(m.slot2.teamId ?? m.slot2.label).toBeTruthy();
    }
    // R16 t/m finale: slots zijn TBD (geen kr)
    for (const m of r16) {
      expect(m.slot1.teamId).toBeNull();
      expect(m.slot2.teamId).toBeNull();
    }
    for (const m of qf)  { expect(m.slot1.teamId).toBeNull(); }
    for (const m of sf)  { expect(m.slot1.teamId).toBeNull(); }
    expect(final.slot1.teamId).toBeNull();
  });

  it('r32 slot1-winnaars → r16 correct ingevuld', () => {
    const kr: KnockoutResults = {};
    for (let i = 0; i < 16; i++) kr[`r32-${i}`] = 1;

    const { r32, r16 } = buildBracket(QUALIFIERS, kr);
    // r16-0 = winnaar r32-0 vs winnaar r32-1
    expect(r16[0].slot1.teamId).toBe(r32[0].slot1.teamId);
    expect(r16[0].slot2.teamId).toBe(r32[1].slot1.teamId);
    // r16-7 = winnaar r32-14 vs winnaar r32-15
    expect(r16[7].slot1.teamId).toBe(r32[14].slot1.teamId);
    expect(r16[7].slot2.teamId).toBe(r32[15].slot1.teamId);
  });

  it('volledig ingevulde bracket: finale heeft een winnaar', () => {
    const { final } = buildBracket(QUALIFIERS, allSlot1Wins());
    // Finale slot1 en slot2 moeten teams bevatten
    expect(final.slot1.teamId).not.toBeNull();
    expect(final.slot2.teamId).not.toBeNull();
    // finale-winnaar: slot1 wint → finale slot1 is de kampioenskandidaat
    expect(final.slot1.teamId).toBeTruthy();
  });

  it('gedeeltelijke bracket: onopgeloste wedstrijden bevatten label', () => {
    // Alleen r32-0 ingevuld
    const { r16 } = buildBracket(QUALIFIERS, { 'r32-0': 1 });
    // r16-0.slot1 = winnaar r32-0 (een team)
    expect(r16[0].slot1.teamId).not.toBeNull();
    // r16-0.slot2 = winnaar r32-1 (TBD, want r32-1 niet ingevuld)
    expect(r16[0].slot2.teamId).toBeNull();
    expect(r16[0].slot2.label).toMatch(/W/);
  });

  it('NED als groepswinnaar F staat in r32', () => {
    const { r32 } = buildBracket(QUALIFIERS, {});
    const nedMatch = r32.find(
      (m) => m.slot1.teamId === 'NED' || m.slot2.teamId === 'NED',
    );
    expect(nedMatch).toBeDefined();
  });

  it('best-third team staat in r32 via tp-slot', () => {
    const { r32 } = buildBracket(QUALIFIERS, {});
    // CIV (E, tp:0) staat in r32-10 als slot2 (vs MEX)
    const civMatch = r32.find(
      (m) => m.slot1.teamId === 'CIV' || m.slot2.teamId === 'CIV',
    );
    expect(civMatch).toBeDefined();
  });

  it('alle r32-matches hebben unieke IDs', () => {
    const { r32 } = buildBracket(QUALIFIERS, {});
    const ids = r32.map((m) => m.id);
    expect(new Set(ids).size).toBe(16);
  });

  it('propagatie houdt downstream TBD bij incomplete bracket', () => {
    // Vul r32 en r16 in, laat kw leeg
    const kr: KnockoutResults = {};
    for (let i = 0; i < 16; i++) kr[`r32-${i}`] = 1;
    for (let i = 0; i < 8;  i++) kr[`r16-${i}`] = 1;
    const { qf, sf, final } = buildBracket(QUALIFIERS, kr);
    // kw niet ingevuld → sf en finale zijn TBD
    for (const m of qf)  { expect(m.slot1.teamId).not.toBeNull(); } // kw gevuld via r16
    for (const m of sf)  { expect(m.slot1.teamId).toBeNull(); }     // hf nog TBD
    expect(final.slot1.teamId).toBeNull();
  });
});
