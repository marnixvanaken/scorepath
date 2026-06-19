import type { MatchResult, GroupId } from './types';
import { GROUP_IDS, groupFixtures } from '../data/worldcup2026';

// Voorspellingen op basis van bookmaker-odds (native-stats.org) voor speelronde 1 van
// groepen A–F, en teamkwaliteit/ranking voor de overige 62 wedstrijden.
// Sleutel = "homeId:awayId" zoals gegenereerd door groupFixtures().
const PREDICTIONS: Record<string, [number, number]> = {
  // ── Groep A: MEX RSA KOR CZE ──────────────────────────────────────────────
  'MEX:RSA': [2, 0], // MEX gastland, wint van RSA
  'KOR:CZE': [1, 1], // nagenoeg gelijk
  'MEX:KOR': [2, 1], // MEX iets sterker
  'CZE:RSA': [2, 0], // CZE duidelijk beter
  'CZE:MEX': [0, 2], // MEX wint
  'RSA:KOR': [0, 2], // KOR klasse boven RSA

  // ── Groep B: CAN BIH QAT SUI ──────────────────────────────────────────────
  'CAN:BIH': [1, 0], // CAN wint thuis
  'QAT:SUI': [0, 3], // SUI veel sterker
  'CAN:QAT': [2, 0], // CAN wint makkelijk
  'SUI:BIH': [2, 0], // SUI wint
  'SUI:CAN': [2, 1], // SUI sterker
  'BIH:QAT': [1, 0], // BIH wint

  // ── Groep C: BRA MAR HAI SCO ──────────────────────────────────────────────
  'BRA:MAR': [2, 0], // odds BRA 1.59 (native-stats)
  'HAI:SCO': [0, 2], // SCO wint
  'BRA:HAI': [4, 0], // BRA klasse
  'SCO:MAR': [1, 2], // MAR sterk
  'SCO:BRA': [0, 2], // BRA dominant
  'MAR:HAI': [2, 0], // MAR wint

  // ── Groep D: USA PAR AUS TUR ──────────────────────────────────────────────
  'USA:PAR': [1, 0], // odds USA 1.96 (native-stats); nipt
  'AUS:TUR': [0, 1], // odds TUR 1.82 (native-stats); TUR wint
  'USA:AUS': [2, 1], // USA wint
  'TUR:PAR': [2, 1], // TUR wint
  'TUR:USA': [0, 1], // USA wint in slotfase
  'PAR:AUS': [1, 1], // gelijkspel

  // ── Groep E: GER CUW CIV ECU ──────────────────────────────────────────────
  'GER:CUW': [7, 1], // gespeeld: 7-1
  'CIV:ECU': [1, 1], // gelijkspel
  'GER:CIV': [2, 0], // GER wint
  'ECU:CUW': [2, 0], // ECU wint
  'ECU:GER': [1, 3], // GER klasse
  'CUW:CIV': [0, 3], // CIV veel sterker

  // ── Groep F: NED JPN SWE TUN ──────────────────────────────────────────────
  'NED:JPN': [2, 1], // odds NED 1.98 / JPN 3.54 (native-stats)
  'SWE:TUN': [2, 0], // SWE sterker
  'NED:SWE': [2, 0], // NED wint
  'TUN:JPN': [0, 2], // JPN wint
  'TUN:NED': [0, 3], // NED dominant
  'JPN:SWE': [1, 1], // gelijkspel

  // ── Groep G: BEL EGY IRN NZL ──────────────────────────────────────────────
  'BEL:EGY': [2, 0],
  'IRN:NZL': [1, 0],
  'BEL:IRN': [2, 0],
  'NZL:EGY': [0, 2],
  'NZL:BEL': [0, 3],
  'EGY:IRN': [1, 1],

  // ── Groep H: ESP CPV KSA URU ──────────────────────────────────────────────
  'ESP:CPV': [4, 0],
  'KSA:URU': [1, 1], // gespeeld: 1-1
  'ESP:KSA': [4, 0],
  'URU:CPV': [3, 0],
  'URU:ESP': [1, 2], // ESP wereldklasse
  'CPV:KSA': [1, 2],

  // ── Groep I: FRA SEN IRQ NOR ──────────────────────────────────────────────
  'FRA:SEN': [2, 0],
  'IRQ:NOR': [0, 3], // Haaland
  'FRA:IRQ': [4, 0],
  'NOR:SEN': [2, 1], // NOR wint
  'NOR:FRA': [1, 2], // NOR sterk maar FRA beter
  'SEN:IRQ': [2, 0],

  // ── Groep J: ARG ALG AUT JOR ──────────────────────────────────────────────
  'ARG:ALG': [2, 0],
  'AUT:JOR': [2, 0],
  'ARG:AUT': [2, 0], // ARG wereldkampioen
  'JOR:ALG': [0, 2],
  'JOR:ARG': [0, 3],
  'ALG:AUT': [0, 1],

  // ── Groep K: POR COD UZB COL ──────────────────────────────────────────────
  'POR:COD': [3, 0],
  'UZB:COL': [0, 2],
  'POR:UZB': [3, 0],
  'COL:COD': [2, 0],
  'COL:POR': [1, 2],
  'COD:UZB': [1, 1],

  // ── Groep L: ENG CRO GHA PAN ──────────────────────────────────────────────
  'ENG:CRO': [2, 0],
  'GHA:PAN': [1, 0],
  'ENG:GHA': [2, 0],
  'PAN:CRO': [0, 2],
  'PAN:ENG': [0, 3],
  'CRO:GHA': [1, 0],
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
