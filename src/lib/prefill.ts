import type { MatchResult, GroupId } from './types';
import { GROUP_IDS, groupFixtures } from '../data/worldcup2026';

// Voorspellingen op basis van bookmaker-odds (native-stats.org) voor speelronde 1 van
// groepen A–F, en teamkwaliteit/ranking voor de overige 62 wedstrijden.
// Sleutel = "homeId:awayId" zoals gegenereerd door groupFixtures().
const PREDICTIONS: Record<string, [number, number]> = {
  // ── Groep A: MEX KOR RSA CZE ──────────────────────────────────────────────
  'MEX:KOR': [2, 1], // MEX gastland, iets sterker
  'RSA:CZE': [0, 2], // CZE duidelijk beter
  'MEX:RSA': [2, 0], // odds MEX 1.47 (native-stats)
  'CZE:KOR': [1, 1], // odds KOR-CZE 2.63/3.17/2.68 — nagenoeg gelijk
  'CZE:MEX': [0, 2], // MEX wint
  'KOR:RSA': [2, 0], // KOR klasse boven RSA

  // ── Groep B: CAN SUI QAT BIH ──────────────────────────────────────────────
  'CAN:SUI': [1, 2], // SUI veel sterker
  'QAT:BIH': [0, 1], // QAT odds 10.42 = zwak; BIH wint
  'CAN:QAT': [2, 0], // CAN wint makkelijk
  'BIH:SUI': [0, 2], // SUI wint
  'BIH:CAN': [0, 1], // odds CAN 1.78 (native-stats); CAN wint
  'SUI:QAT': [3, 0], // odds SUI 1.28 / QAT 10.42 (native-stats)

  // ── Groep C: BRA MAR SCO HAI ──────────────────────────────────────────────
  'BRA:MAR': [2, 0], // odds BRA 1.59 (native-stats)
  'SCO:HAI': [2, 0], // odds SCO 1.41 als uitploeg (native-stats: HAI thuis); SCO wint
  'BRA:SCO': [2, 0], // BRA dominant
  'HAI:MAR': [0, 2], // MAR wint
  'HAI:BRA': [0, 4], // BRA klasse
  'MAR:SCO': [2, 1], // MAR sterk op eigen kracht

  // ── Groep D: USA PAR AUS TUR ──────────────────────────────────────────────
  'USA:PAR': [1, 0], // odds USA 1.96 (native-stats); nipt
  'AUS:TUR': [0, 1], // odds TUR 1.82 (native-stats); TUR wint
  'USA:AUS': [2, 1], // USA wint
  'TUR:PAR': [2, 1], // TUR wint
  'TUR:USA': [0, 1], // USA wint in slotfase
  'PAR:AUS': [1, 1], // gelijkspel

  // ── Groep E: GER ECU CIV CUW ──────────────────────────────────────────────
  'GER:ECU': [3, 1], // GER klasse
  'CIV:CUW': [3, 0], // CIV veel sterker
  'GER:CIV': [2, 0], // GER wint
  'CUW:ECU': [0, 2], // ECU wint
  'CUW:GER': [0, 4], // odds GER 1.03 / CUW 43.67 (native-stats)
  'ECU:CIV': [1, 1], // gelijkspel

  // ── Groep F: NED JPN TUN SWE ──────────────────────────────────────────────
  'NED:JPN': [2, 1], // odds NED 1.98 / JPN 3.54 (native-stats)
  'TUN:SWE': [0, 2], // SWE sterker
  'NED:TUN': [3, 0], // NED dominant
  'SWE:JPN': [1, 1], // gelijkspel
  'SWE:NED': [0, 2], // NED wint
  'JPN:TUN': [2, 0], // JPN wint

  // ── Groep G: BEL IRN EGY NZL ──────────────────────────────────────────────
  'BEL:IRN': [2, 0],
  'EGY:NZL': [2, 0],
  'BEL:EGY': [2, 0],
  'NZL:IRN': [0, 1],
  'NZL:BEL': [0, 3],
  'IRN:EGY': [1, 1],

  // ── Groep H: ESP URU KSA CPV ──────────────────────────────────────────────
  'ESP:URU': [2, 1], // ESP wereldklasse
  'KSA:CPV': [2, 1],
  'ESP:KSA': [4, 0],
  'CPV:URU': [0, 3],
  'CPV:ESP': [0, 4],
  'URU:KSA': [2, 0],

  // ── Groep I: FRA SEN NOR IRQ ──────────────────────────────────────────────
  'FRA:SEN': [2, 0],
  'NOR:IRQ': [3, 0], // Haaland
  'FRA:NOR': [2, 1], // NOR sterk maar FRA beter
  'IRQ:SEN': [0, 2],
  'IRQ:FRA': [0, 4],
  'SEN:NOR': [1, 2], // NOR wint

  // ── Groep J: ARG AUT ALG JOR ──────────────────────────────────────────────
  'ARG:AUT': [2, 0], // ARG wereldkampioen
  'ALG:JOR': [2, 0],
  'ARG:ALG': [2, 0],
  'JOR:AUT': [0, 2],
  'JOR:ARG': [0, 3],
  'AUT:ALG': [1, 0],

  // ── Groep K: POR COL UZB COD ──────────────────────────────────────────────
  'POR:COL': [2, 1],
  'UZB:COD': [1, 1],
  'POR:UZB': [3, 0],
  'COD:COL': [0, 2],
  'COD:POR': [0, 3],
  'COL:UZB': [2, 0],

  // ── Groep L: ENG CRO PAN GHA ──────────────────────────────────────────────
  'ENG:CRO': [2, 0],
  'PAN:GHA': [0, 1],
  'ENG:PAN': [3, 0],
  'GHA:CRO': [0, 1],
  'GHA:ENG': [0, 2],
  'CRO:PAN': [2, 0],
};

export function prefillResults(): MatchResult[] {
  const results: MatchResult[] = [];

  for (const g of GROUP_IDS) {
    for (const { homeId, awayId } of groupFixtures(g)) {
      const prediction = PREDICTIONS[`${homeId}:${awayId}`];
      if (!prediction) continue;
      results.push({
        group: g as GroupId,
        homeId,
        awayId,
        homeGoals: prediction[0],
        awayGoals: prediction[1],
      });
    }
  }

  return results;
}
