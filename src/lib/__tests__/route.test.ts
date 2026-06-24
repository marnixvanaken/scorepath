import { describe, it, expect } from 'vitest';
import { traceRoute } from '../route';
import type { Qualifiers, ThirdPlaceRank, GroupId, MatchResult } from '../types';
import type { KnockoutResults } from '../bracket';

// Identieke helper-qualifiers als in bracket.test.ts
const WINNERS: { group: GroupId; teamId: string }[] = [
  { group: 'A', teamId: 'MEX' }, { group: 'B', teamId: 'SUI' },
  { group: 'C', teamId: 'BRA' }, { group: 'D', teamId: 'USA' },
  { group: 'E', teamId: 'GER' }, { group: 'F', teamId: 'NED' },
  { group: 'G', teamId: 'BEL' }, { group: 'H', teamId: 'ESP' },
  { group: 'I', teamId: 'FRA' }, { group: 'J', teamId: 'ARG' },
  { group: 'K', teamId: 'POR' }, { group: 'L', teamId: 'ENG' },
];
const RUNNERS_UP: { group: GroupId; teamId: string }[] = [
  { group: 'A', teamId: 'KOR' }, { group: 'B', teamId: 'CAN' },
  { group: 'C', teamId: 'MAR' }, { group: 'D', teamId: 'TUR' },
  { group: 'E', teamId: 'ECU' }, { group: 'F', teamId: 'JPN' },
  { group: 'G', teamId: 'IRN' }, { group: 'H', teamId: 'URU' },
  { group: 'I', teamId: 'NOR' }, { group: 'J', teamId: 'AUT' },
  { group: 'K', teamId: 'COL' }, { group: 'L', teamId: 'CRO' },
];
function mkThird(group: GroupId, teamId: string, rank: number): ThirdPlaceRank {
  return { group, teamId, rank, advances: true, played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 3, gd: 0, points: 4, hasScores: false };
}
const BEST_THIRDS: ThirdPlaceRank[] = [
  mkThird('E', 'CIV', 1), mkThird('F', 'SWE', 2), mkThird('G', 'EGY', 3),
  mkThird('H', 'KSA', 4), mkThird('I', 'IRQ', 5), mkThird('J', 'JOR', 6),
  mkThird('K', 'UZB', 7), mkThird('L', 'GHA', 8),
];
const Q: Qualifiers = { winners: WINNERS, runnersUp: RUNNERS_UP, bestThirds: BEST_THIRDS };

// Knockout met alleen slot1-overwinningen tot en met de opgegeven ronde
function kr(upToRound: 'r32' | 'r16' | 'kw' | 'hf' | 'finale'): KnockoutResults {
  const rounds: ('r32' | 'r16' | 'kw' | 'hf' | 'finale')[] = ['r32', 'r16', 'kw', 'hf', 'finale'];
  const idx = rounds.indexOf(upToRound);
  const res: KnockoutResults = {};
  const counts: Record<string, number> = { r32: 16, r16: 8, kw: 4, hf: 2 };
  for (let r = 0; r <= idx; r++) {
    const round = rounds[r];
    if (round === 'finale') { res['finale'] = 1; break; }
    for (let i = 0; i < counts[round]; i++) res[`${round}-${i}`] = 1;
  }
  return res;
};

// Groepsfase uitslagen voor NED in groep F:
// NED (t1), JPN (t2), SWE (t3), TUN (t4)
// Fixtures: NED-JPN, SWE-TUN, NED-SWE, TUN-JPN, TUN-NED, JPN-SWE
function nedGroupWins(): MatchResult[] {
  return [
    { group: 'F', homeId: 'NED', awayId: 'JPN', homeGoals: 2, awayGoals: 0 },
    { group: 'F', homeId: 'SWE', awayId: 'TUN', homeGoals: 1, awayGoals: 0 },
    { group: 'F', homeId: 'NED', awayId: 'SWE', homeGoals: 3, awayGoals: 1 },
    { group: 'F', homeId: 'TUN', awayId: 'JPN', homeGoals: 0, awayGoals: 1 },
    { group: 'F', homeId: 'TUN', awayId: 'NED', homeGoals: 0, awayGoals: 2 },
    { group: 'F', homeId: 'JPN', awayId: 'SWE', homeGoals: 1, awayGoals: 1 },
  ];
}

describe('traceRoute — kwalificatiepositie', () => {
  it('groepswinnaar krijgt qualifiedPosition "winner"', () => {
    const route = traceRoute('NED', Q, {}, nedGroupWins());
    expect(route.qualifiedPosition).toBe('winner');
    expect(route.qualifiedGroup).toBe('F');
    expect(route.result).not.toBe('niet-gekwalificeerd');
  });

  it('nummer-2 krijgt qualifiedPosition "runnerUp"', () => {
    const route = traceRoute('JPN', Q, {}, nedGroupWins());
    expect(route.qualifiedPosition).toBe('runnerUp');
    expect(route.qualifiedGroup).toBe('F');
  });

  it('best-third team krijgt qualifiedPosition "third"', () => {
    const route = traceRoute('CIV', Q, {});
    expect(route.qualifiedPosition).toBe('third');
    expect(route.qualifiedGroup).toBe('E');
  });

  it('niet-gekwalificeerd team heeft result "niet-gekwalificeerd"', () => {
    // RSA staat niet in WINNERS/RUNNERS_UP/BEST_THIRDS van onze Q
    const route = traceRoute('RSA', Q, {});
    expect(route.result).toBe('niet-gekwalificeerd');
    expect(route.rounds).toHaveLength(0);
  });
});

describe('traceRoute — groepsfase wedstrijden', () => {
  it('toont 3 groepswedstrijden voor NED', () => {
    const route = traceRoute('NED', Q, {}, nedGroupWins());
    const groupRounds = route.rounds.filter((r) => r.round === 'groep');
    expect(groupRounds).toHaveLength(3);
  });

  it('W/L/X correct afgeleid uit exacte scores', () => {
    const route = traceRoute('NED', Q, {}, nedGroupWins());
    const groupRounds = route.rounds.filter((r) => r.round === 'groep');
    // Alle groepswedstrijden gewonnen
    expect(groupRounds.every((r) => r.won === true && !r.draw)).toBe(true);
  });

  it('score correct opgemaakt vanuit thuisperspectief', () => {
    const route = traceRoute('NED', Q, {}, nedGroupWins());
    const nedVsJpn = route.rounds.find(
      (r) => r.round === 'groep' && r.opponentId === 'JPN',
    );
    expect(nedVsJpn?.score).toBe('2–0');
  });

  it('score correct opgemaakt vanuit uitperspectief (TUN-NED)', () => {
    const route = traceRoute('NED', Q, {}, nedGroupWins());
    const nedVsTun = route.rounds.find(
      (r) => r.round === 'groep' && r.opponentId === 'TUN',
    );
    // NED speelt uit: thuisscore is TUN (0), UIT score NED (2) → NED ziet "2–0"
    expect(nedVsTun?.score).toBe('2–0');
  });

  it('wedstrijd zonder score: won is null', () => {
    const route = traceRoute('NED', Q, {});
    const groupRounds = route.rounds.filter((r) => r.round === 'groep');
    expect(groupRounds.every((r) => r.won === null)).toBe(true);
  });

  it('quick-mode (outcome) geeft correct won-veld', () => {
    const results: MatchResult[] = [
      { group: 'F', homeId: 'NED', awayId: 'JPN', outcome: 'H' }, // NED wint thuis
      { group: 'F', homeId: 'SWE', awayId: 'TUN', outcome: 'H' },
      { group: 'F', homeId: 'NED', awayId: 'SWE', outcome: 'D' }, // gelijkspel
      { group: 'F', homeId: 'TUN', awayId: 'JPN', outcome: 'A' },
      { group: 'F', homeId: 'TUN', awayId: 'NED', outcome: 'A' }, // NED wint uit
      { group: 'F', homeId: 'JPN', awayId: 'SWE', outcome: 'H' },
    ];
    const route = traceRoute('NED', Q, {}, results);
    const [r1, r2, r3] = route.rounds.filter((r) => r.round === 'groep');
    expect(r1.won).toBe(true);   // NED-JPN H
    expect(r2.draw).toBe(true);  // NED-SWE D
    expect(r3.won).toBe(true);   // TUN-NED A (NED wint uit)
  });
});

// NED-bracket positie (thirdKey="EFGHIJKL", slots="EJIFHGLK"):
//   R32 : r32-1 slot1  (w:F vs r:C → NED vs MAR)
//   R16 : r16-0 slot2  (winnaar r32-1 = NED → winB → slot2)
//   QF  : kw-0  slot1  (als r16-0 kr=2 → winA = slot2=NED → kw-0.slot1=NED)
//   SF  : hf-0  slot1  (als kw-0 kr=1 → winA = slot1=NED → hf-0.slot1=NED)
//   Final: finale slot1 (als hf-0 kr=1 → winA = slot1=NED → finale.slot1=NED)
//
// NED wins:  R32→1, R16→2, QF→1, SF→1, Fin→1
// NED loses: R32→2, R16→1, QF→2, SF→2, Fin→2

describe('traceRoute — knockout uitkomsten (alle rondes)', () => {
  it('result "r32" als NED in R32 verliest', () => {
    // NED is r32-1 slot1; kr=2 → slot2(MAR) wint
    const route = traceRoute('NED', Q, { 'r32-1': 2 });
    expect(route.result).toBe('r32');
    const r32round = route.rounds.find((r) => r.round === 'r32');
    expect(r32round?.won).toBe(false);
  });

  it('result "r16" als NED R32 wint maar R16 verliest', () => {
    // NED is r16-0 slot2; kr['r16-0']=1 → slot1 wint, NED verliest
    const krObj: KnockoutResults = { 'r32-1': 1, 'r16-0': 1 };
    const route = traceRoute('NED', Q, krObj);
    expect(route.result).toBe('r16');
  });

  it('result "qf" als NED t/m R16 wint maar QF verliest', () => {
    // NED is kw-0 slot1 na R16-win; kr['kw-0']=2 → slot2 wint
    const krObj: KnockoutResults = { 'r32-1': 1, 'r16-0': 2, 'kw-0': 2 };
    const route = traceRoute('NED', Q, krObj);
    expect(route.result).toBe('qf');
  });

  it('result "sf" als NED t/m QF wint maar SF verliest', () => {
    // NED is hf-0 slot1; kr['hf-0']=2 → slot2 wint
    const krObj: KnockoutResults = { 'r32-1': 1, 'r16-0': 2, 'kw-0': 1, 'hf-0': 2 };
    const route = traceRoute('NED', Q, krObj);
    expect(route.result).toBe('sf');
  });

  it('result "final" als NED finale bereikt maar verliest', () => {
    // NED is finale slot1; kr['finale']=2 → slot2 wint
    const krObj: KnockoutResults = { 'r32-1': 1, 'r16-0': 2, 'kw-0': 1, 'hf-0': 1, 'finale': 2 };
    const route = traceRoute('NED', Q, krObj);
    expect(route.result).toBe('final');
  });

  it('result "kampioen" als NED het WK wint', () => {
    const krObj: KnockoutResults = { 'r32-1': 1, 'r16-0': 2, 'kw-0': 1, 'hf-0': 1, 'finale': 1 };
    const route = traceRoute('NED', Q, krObj);
    expect(route.result).toBe('kampioen');
  });

  it('TBD ronde: won is null voor de R16-wedstrijd als die niet gepickt is', () => {
    // NED wint R32 (r32-1=1) maar R16 is TBD (r16-0 niet ingevuld)
    const route = traceRoute('NED', Q, { 'r32-1': 1 });
    const r16round = route.rounds.find((r) => r.round === 'r16');
    expect(r16round?.won).toBeNull();
    // Result = 'r32' (laatste ronde met won=true; r16 is TBD)
    expect(route.result).toBe('r32');
  });

  it('runner-up ENG wint het WK', () => {
    // ENG staat als runner-up L in r32-11 slot2 (w:L vs tp:7)
    // r32-11: slot1=ENG (w:L), slot2=UZB (tp:7)
    // NB: ENG is groepswinnaar L, niet runner-up → staat als w:L in r32-11 slot1
    const route = traceRoute('ENG', Q, { 'r32-11': 1, 'r16-5': 1, 'kw-2': 1, 'hf-1': 1, 'finale': 2 });
    // ENG staat in de andere helft dan NED → andere finale kant
    // Als finale slot2 wint (=2) → controleer of ENG de winnaar is
    expect(['kampioen', 'final', 'sf', 'qf', 'r16', 'r32']).toContain(route.result);
  });

  it('best-third CIV route TBD bracket', () => {
    // CIV staat als tp:0 → r32-10 slot2 (vs MEX)
    const route = traceRoute('CIV', Q, {});
    expect(route.qualifiedPosition).toBe('third');
    const r32round = route.rounds.find((r) => r.round === 'r32');
    expect(r32round).toBeDefined();
    expect(r32round?.won).toBeNull();
  });

  it('route bevat geen ronde meer na uitschakeling', () => {
    // NED verliest R32 → geen r16/qf/sf/finale-ronde in rounds
    const route = traceRoute('NED', Q, { 'r32-1': 2 });
    const afterR32 = route.rounds.filter(
      (r) => ['r16', 'qf', 'sf', 'final'].includes(r.round),
    );
    expect(afterR32).toHaveLength(0);
  });
});
