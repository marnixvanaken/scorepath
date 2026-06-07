import type { LiveMatchResult } from './footballDataMapper';

// Eerste speelronde per groep (wedstrijden 1 & 2 uit groupFixtures)
// Alleen voor development/test — verwijder zodra echte data beschikbaar is
export const FIRST_ROUND_TEST_DATA: LiveMatchResult[] = [
  // Groep A
  { group: 'A', homeId: 'MEX', awayId: 'KOR', homeGoals: 2, awayGoals: 1, locked: true },
  { group: 'A', homeId: 'RSA', awayId: 'CZE', homeGoals: 0, awayGoals: 3, locked: true },
  // Groep B
  { group: 'B', homeId: 'CAN', awayId: 'SUI', homeGoals: 1, awayGoals: 1, locked: true },
  { group: 'B', homeId: 'QAT', awayId: 'BIH', homeGoals: 1, awayGoals: 2, locked: true },
  // Groep C
  { group: 'C', homeId: 'BRA', awayId: 'MAR', homeGoals: 3, awayGoals: 0, locked: true },
  { group: 'C', homeId: 'SCO', awayId: 'HAI', homeGoals: 2, awayGoals: 0, locked: true },
  // Groep D
  { group: 'D', homeId: 'USA', awayId: 'PAR', homeGoals: 1, awayGoals: 0, locked: true },
  { group: 'D', homeId: 'AUS', awayId: 'TUR', homeGoals: 2, awayGoals: 2, locked: true },
  // Groep E
  { group: 'E', homeId: 'GER', awayId: 'ECU', homeGoals: 4, awayGoals: 1, locked: true },
  { group: 'E', homeId: 'CIV', awayId: 'CUW', homeGoals: 3, awayGoals: 1, locked: true },
  // Groep F
  { group: 'F', homeId: 'NED', awayId: 'JPN', homeGoals: 2, awayGoals: 1, locked: true },
  { group: 'F', homeId: 'TUN', awayId: 'SWE', homeGoals: 0, awayGoals: 1, locked: true },
  // Groep G
  { group: 'G', homeId: 'BEL', awayId: 'IRN', homeGoals: 2, awayGoals: 0, locked: true },
  { group: 'G', homeId: 'EGY', awayId: 'NZL', homeGoals: 1, awayGoals: 0, locked: true },
  // Groep H
  { group: 'H', homeId: 'ESP', awayId: 'URU', homeGoals: 3, awayGoals: 1, locked: true },
  { group: 'H', homeId: 'KSA', awayId: 'CPV', homeGoals: 2, awayGoals: 1, locked: true },
  // Groep I
  { group: 'I', homeId: 'FRA', awayId: 'SEN', homeGoals: 2, awayGoals: 1, locked: true },
  { group: 'I', homeId: 'NOR', awayId: 'IRQ', homeGoals: 3, awayGoals: 0, locked: true },
  // Groep J
  { group: 'J', homeId: 'ARG', awayId: 'AUT', homeGoals: 2, awayGoals: 0, locked: true },
  { group: 'J', homeId: 'ALG', awayId: 'JOR', homeGoals: 1, awayGoals: 1, locked: true },
  // Groep K
  { group: 'K', homeId: 'POR', awayId: 'COL', homeGoals: 2, awayGoals: 2, locked: true },
  { group: 'K', homeId: 'UZB', awayId: 'COD', homeGoals: 1, awayGoals: 0, locked: true },
  // Groep L
  { group: 'L', homeId: 'ENG', awayId: 'CRO', homeGoals: 3, awayGoals: 0, locked: true },
  { group: 'L', homeId: 'PAN', awayId: 'GHA', homeGoals: 1, awayGoals: 2, locked: true },
];
