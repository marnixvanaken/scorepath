import { describe, it, expect } from 'vitest';
import {
  ROUNDS,
  ROUND_BY_ID,
  seedPool,
  drawTies,
  simulateTie,
  hasRestriction,
  finalizeLeaguePots,
  LP_POT1,
  LP_POT2,
  LP_POT3_FIXED,
  LP_POT34_FIXED,
  LP_POT4_FIXED,
  type UCLClub,
  type RoundDef,
} from '@/data/ucl2027';
import {
  drawLeaguePhase,
  computeLeagueTable,
  simulateLeague,
  clubMapOf,
  matchKey,
  qualificationBand,
  drawPlayoffs,
  buildR16,
  pairWinners,
  initKnockout,
  setKnockoutWinner,
  knockoutChampion,
  type KnockoutTie,
} from '@/lib/uclLeague';
import { encodeCard, decodeCard, cardOutcome, cardIsChampion, type CardMatch } from '@/lib/uclCard';

// Simuleer de hele kwalificatie automatisch (zoals bij instap op een latere stage)
// en geef de 7 play-off-winnaars terug.
function autoQualify(): UCLClub[] {
  const winners: Record<string, UCLClub[]> = {};
  for (const def of ROUNDS) {
    const pool: UCLClub[] = [...def.direct, ...(def.feedsFrom ? winners[def.feedsFrom] : [])];
    const { seeded, unseeded } = seedPool(pool);
    const ties = drawTies(seeded, unseeded, def.id);
    winners[def.id] = ties.map((t) => simulateTie(t));
  }
  return [...winners['po-cp'], ...winners['po-lp']];
}

// Simuleer een complete kwalificatie: per ronde loten + willekeurig winnaars kiezen,
// winnaars doorsturen. Verifieer aantallen, restricties en de uniekheid van ID's.
function simulate() {
  const winners: Record<string, UCLClub[]> = {};
  const tieCounts: Record<string, number> = {};
  const restrictionViolations: string[] = [];

  for (const def of ROUNDS) {
    const pool: UCLClub[] = [
      ...def.direct,
      ...(def.feedsFrom ? winners[def.feedsFrom] : []),
    ];
    const { seeded, unseeded } = seedPool(pool);
    const ties = drawTies(seeded, unseeded, def.id);
    tieCounts[def.id] = ties.length;
    for (const t of ties) {
      if (hasRestriction(t.home, t.away)) {
        restrictionViolations.push(`${def.id}: ${t.home.name} vs ${t.away.name}`);
      }
    }
    // willekeurige winnaar per duel
    winners[def.id] = ties.map((t) => (Math.random() > 0.5 ? t.home : t.away));
  }
  return { winners, tieCounts, restrictionViolations };
}

describe('UCL 2027 kwalificatieketen', () => {
  it('alle club-ID\'s zijn uniek over alle pools', () => {
    const ids = ROUNDS.flatMap((r) => r.direct.map((c) => c.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('elke ronde produceert de juiste aantallen duels en winnaars (100 runs)', () => {
    for (let run = 0; run < 100; run++) {
      const { winners, tieCounts, restrictionViolations } = simulate();
      expect(restrictionViolations).toEqual([]);
      expect(tieCounts['q1']).toBe(14);
      expect(tieCounts['q2-cp']).toBe(12);
      expect(tieCounts['q2-lp']).toBe(2);
      expect(tieCounts['q3-cp']).toBe(6);
      expect(tieCounts['q3-lp']).toBe(4);
      expect(tieCounts['po-cp']).toBe(5);
      expect(tieCounts['po-lp']).toBe(2);
      // 5 Champions Path + 2 League Path winnaars naar de league phase
      expect(winners['po-cp'].length).toBe(5);
      expect(winners['po-lp'].length).toBe(2);
    }
  });

  it('pool-grootte klopt per ronde (winnaars + directe instappers)', () => {
    const { winners } = simulate();
    const poolSize = (def: RoundDef) =>
      def.direct.length + (def.feedsFrom ? winners[def.feedsFrom].length : 0);
    expect(poolSize(ROUND_BY_ID['q2-cp'])).toBe(24); // 14 + 10
    expect(poolSize(ROUND_BY_ID['q3-lp'])).toBe(8); // 2 + 6
    expect(poolSize(ROUND_BY_ID['po-cp'])).toBe(10); // 6 + 4
  });
});

describe('UCL 2027 league phase', () => {
  it('auto-kwalificatie levert exact 7 winnaars en een 36-club pool', () => {
    const poWinners = autoQualify();
    expect(poWinners.length).toBe(7);
    const potted = finalizeLeaguePots(poWinners);
    expect(potted.length).toBe(36);
    // 9 per pot
    for (const p of [1, 2, 3, 4]) {
      expect(potted.filter((x) => x.pot === p).length).toBe(9);
    }
    // unieke clubs
    expect(new Set(potted.map((x) => x.club.id)).size).toBe(36);
  });

  it('league-phase-loting respecteert alle restricties (40 runs)', () => {
    for (let run = 0; run < 40; run++) {
      const potted = finalizeLeaguePots(autoQualify());
      const schedule = drawLeaguePhase(potted);
      expect(schedule.length).toBe(144);

      const potOf: Record<string, number> = {};
      const bondOf: Record<string, string> = {};
      for (const pc of potted) {
        potOf[pc.club.id] = pc.pot;
        bondOf[pc.club.id] = pc.club.flagCode;
      }

      const opp: Record<string, string[]> = {};
      const home: Record<string, number> = {};
      const away: Record<string, number> = {};
      const perPot: Record<string, Record<number, number>> = {};
      const seenPair = new Set<string>();
      for (const pc of potted) {
        opp[pc.club.id] = [];
        home[pc.club.id] = 0;
        away[pc.club.id] = 0;
        perPot[pc.club.id] = { 1: 0, 2: 0, 3: 0, 4: 0 };
      }

      for (const m of schedule) {
        // geen dubbele duels tussen hetzelfde paar
        const pid = m.homeId < m.awayId ? `${m.homeId}|${m.awayId}` : `${m.awayId}|${m.homeId}`;
        expect(seenPair.has(pid)).toBe(false);
        seenPair.add(pid);

        opp[m.homeId].push(m.awayId);
        opp[m.awayId].push(m.homeId);
        home[m.homeId]++;
        away[m.awayId]++;
        perPot[m.homeId][potOf[m.awayId]]++;
        perPot[m.awayId][potOf[m.homeId]]++;
        // geen duel binnen dezelfde bond
        expect(bondOf[m.homeId]).not.toBe(bondOf[m.awayId]);
      }

      for (const pc of potted) {
        const id = pc.club.id;
        expect(opp[id].length).toBe(8); // 8 wedstrijden
        expect(home[id]).toBe(4); // 4 thuis
        expect(away[id]).toBe(4); // 4 uit
        for (const p of [1, 2, 3, 4]) expect(perPot[id][p]).toBe(2); // 2 per pot
        // max 2 tegenstanders uit dezelfde bond
        const bondTally: Record<string, number> = {};
        for (const oId of opp[id]) bondTally[bondOf[oId]] = (bondTally[bondOf[oId]] ?? 0) + 1;
        for (const cnt of Object.values(bondTally)) expect(cnt).toBeLessThanOrEqual(2);
      }
    }
  }, 30000);

  it('eindstand heeft 36 rijen en banden 8/16/12', () => {
    const potted = finalizeLeaguePots(autoQualify());
    const schedule = drawLeaguePhase(potted);
    const goals = simulateLeague(schedule, clubMapOf(potted));
    const table = computeLeagueTable(potted, schedule, goals);
    expect(table.length).toBe(36);
    // elke club 8 gespeeld
    for (const s of table) expect(s.played).toBe(8);
    const bands = table.map((_, i) => qualificationBand(i));
    expect(bands.filter((b) => b === 'r16').length).toBe(8);
    expect(bands.filter((b) => b === 'playoff').length).toBe(16);
    expect(bands.filter((b) => b === 'out').length).toBe(12);
    // goals-keys matchen het schema
    expect(Object.keys(goals).length).toBe(144);
    expect(goals[matchKey(schedule[0])]).toBeDefined();
  });
});

describe('UCL 2027 knockout', () => {
  // 36 club-ID's als "eindstand" (volgorde = positie 1..36)
  const ordered = () => finalizeLeaguePots(autoQualify()).map((p) => p.club.id);

  // willekeurige winnaars kiezen voor een set duels
  const simWinners = (ties: KnockoutTie[]): Record<string, string> => {
    const w: Record<string, string> = {};
    for (const t of ties) w[t.id] = Math.random() > 0.5 ? t.homeId : t.awayId;
    return w;
  };

  it('KO play-offs: 8 duels, juiste banden (geseed 9-16 vs ongeseed 17-24)', () => {
    const ids = ordered();
    const pos = new Map(ids.map((id, i) => [id, i + 1])); // clubId → positie
    const ties = drawPlayoffs(ids);
    expect(ties.length).toBe(8);
    const expectBands = [
      { seeded: [9, 10], unseeded: [23, 24] },
      { seeded: [11, 12], unseeded: [21, 22] },
      { seeded: [13, 14], unseeded: [19, 20] },
      { seeded: [15, 16], unseeded: [17, 18] },
    ];
    for (const t of ties) {
      const b = expectBands[t.band!];
      expect(b.seeded).toContain(pos.get(t.homeId)); // thuis = geseed
      expect(b.unseeded).toContain(pos.get(t.awayId)); // uit = ongeseed
    }
    // 2 duels per band
    for (let bi = 0; bi < 4; bi++) expect(ties.filter((t) => t.band === bi).length).toBe(2);
  });

  it('R16: elke seed treft een winnaar uit de gekoppelde band; bracketvolgorde [1,8,3,5,4,6,2,7]', () => {
    const ids = ordered();
    const seeds = ids.slice(0, 8);
    const kopo = drawPlayoffs(ids);
    const winners = simWinners(kopo);
    const bandOfWinner: Record<string, number> = {};
    for (const t of kopo) bandOfWinner[winners[t.id]] = t.band!;

    const r16 = buildR16(kopo, winners, seeds);
    expect(r16.length).toBe(8);

    const bandOfSeed: Record<number, number> = { 1: 3, 2: 3, 3: 2, 4: 2, 5: 1, 6: 1, 7: 0, 8: 0 };
    const order: number[] = [];
    for (const tie of r16) {
      const seedNo = seeds.indexOf(tie.homeId) + 1; // home = seed
      expect(seedNo).toBeGreaterThanOrEqual(1);
      order.push(seedNo);
      expect(bandOfWinner[tie.awayId]).toBe(bandOfSeed[seedNo]); // juiste band
    }
    expect(order).toEqual([1, 8, 3, 5, 4, 6, 2, 7]);
  });

  it('volledige knockout produceert precies één kampioen', () => {
    const ids = ordered();
    const seeds = ids.slice(0, 8);
    const kopo = drawPlayoffs(ids);
    const r16 = buildR16(kopo, simWinners(kopo), seeds);
    const r16w = simWinners(r16);
    const qf = pairWinners(r16, r16w, 'qf');
    expect(qf.length).toBe(4);
    const sf = pairWinners(qf, simWinners(qf), 'sf');
    expect(sf.length).toBe(2);
    const fin = pairWinners(sf, simWinners(sf), 'final');
    expect(fin.length).toBe(1);
    const champ = simWinners(fin)[fin[0].id];
    expect([fin[0].homeId, fin[0].awayId]).toContain(champ);
  });

  it('initKnockout simuleert tot precies één kampioen; override herbouwt downstream', () => {
    const potted = finalizeLeaguePots(autoQualify());
    const ids = potted.map((p) => p.club.id);
    const fullMap = clubMapOf(potted);
    let state = initKnockout(ids, fullMap);
    expect(state.order).toEqual(['kopo', 'r16', 'qf', 'sf', 'final']);
    expect(knockoutChampion(state)).toBeTruthy();

    // override: kies in de finale de andere finalist → kampioen verandert mee
    const fin = state.rounds['final'].ties[0];
    const other = state.rounds['final'].winners[fin.id] === fin.homeId ? fin.awayId : fin.homeId;
    state = setKnockoutWinner(state, 'final', fin.id, other, fullMap);
    expect(knockoutChampion(state)).toBe(other);
  });

  it('seeding-overname: underdog die hoger geplaatste verslaat draagt diens positie mee', () => {
    const potted = finalizeLeaguePots(autoQualify());
    const ids = potted.map((p) => p.club.id);
    const fullMap = clubMapOf(potted);
    const state = initKnockout(ids, fullMap);
    // forceer in een R16-duel de uitploeg (slechtere rank) als winnaar en check QF-thuis
    const r16 = state.rounds['r16'];
    const tie = r16.ties[0];
    const next = setKnockoutWinner(state, 'r16', tie.id, tie.awayId, fullMap);
    // de winnaar zit in de QF; zijn meegedragen rank = min(homeRank, awayRank) = homeRank
    const qf = next.rounds['qf'];
    const inQf = qf.ties.find((t) => t.homeId === tie.awayId || t.awayId === tie.awayId)!;
    const side = inQf.homeId === tie.awayId ? inQf.homeRank : inQf.awayRank;
    expect(side).toBe(Math.min(tie.homeRank, tie.awayRank));
  });
});

describe('MijnKaart-serialisatie', () => {
  it('encode/decode round-trip', () => {
    const matches: CardMatch[] = [
      { round: 'q1', oppId: 'ETO', res: 'W' },
      { round: 'lp', oppId: 'PSG', res: '2-1' },
      { round: 'final', oppId: 'RMA', res: 'W' },
    ];
    const enc = encodeCard(matches);
    expect(enc).not.toContain(' ');
    expect(decodeCard(enc)).toEqual(matches);
  });

  it('uitkomst + kampioen-detectie', () => {
    expect(cardOutcome({ round: 'lp', oppId: 'X', res: '3-0' })).toBe('W');
    expect(cardOutcome({ round: 'lp', oppId: 'X', res: '1-1' })).toBe('D');
    expect(cardOutcome({ round: 'r16', oppId: 'X', res: 'L' })).toBe('L');
    expect(cardIsChampion([{ round: 'final', oppId: 'X', res: 'W' }])).toBe(true);
    expect(cardIsChampion([{ round: 'final', oppId: 'X', res: 'L' }])).toBe(false);
    expect(cardIsChampion([{ round: 'sf', oppId: 'X', res: 'W' }])).toBe(false);
  });

  it('lege string → lege lijst', () => {
    expect(decodeCard('')).toEqual([]);
  });
});

// de vaste pot-aantallen kloppen los van de PO-winnaars
describe('league-phase data-integriteit', () => {
  it('vaste pot-samenstelling', () => {
    expect(LP_POT1.length).toBe(9);
    expect(LP_POT2.length).toBe(9);
    expect(LP_POT3_FIXED.length).toBe(7);
    expect(LP_POT34_FIXED.length).toBe(2);
    expect(LP_POT4_FIXED.length).toBe(2);
    // 9 + 9 + 7 + 2 + 2 = 29 directe deelnemers
    const all = [...LP_POT1, ...LP_POT2, ...LP_POT3_FIXED, ...LP_POT34_FIXED, ...LP_POT4_FIXED];
    expect(all.length).toBe(29);
    expect(new Set(all.map((c) => c.id)).size).toBe(29);
  });
});
