// WK 2026 — definitieve loting (5 dec 2025, playoff-winnaars ingevuld eind maart 2026).
// 48 teams, 12 groepen van 4. Bron: bevestigde groepsindeling.
// Namen NL-first met Engelse fallback voor de latere SEO-flip.
//
// `strength` is een RUWE placeholder-heuristiek voor de "voorgevuld"-toggle,
// GEEN officiële rating. Vervang door eloratings.net voor modus B.

import type { Team, GroupId } from '../lib/types';

export const TEAMS: Team[] = [
  // Groep A
  { id: 'MEX', name: 'Mexico',        nameEn: 'Mexico',        group: 'A', isHost: true, strength: 1820 },
  { id: 'KOR', name: 'Zuid-Korea',    nameEn: 'South Korea',   group: 'A', strength: 1810 },
  { id: 'RSA', name: 'Zuid-Afrika',   nameEn: 'South Africa',  group: 'A', strength: 1640 },
  { id: 'CZE', name: 'Tsjechië',      nameEn: 'Czechia',       group: 'A', strength: 1700 },
  // Groep B
  { id: 'CAN', name: 'Canada',        nameEn: 'Canada',        group: 'B', isHost: true, strength: 1760 },
  { id: 'SUI', name: 'Zwitserland',   nameEn: 'Switzerland',   group: 'B', strength: 1850 },
  { id: 'QAT', name: 'Qatar',         nameEn: 'Qatar',         group: 'B', strength: 1700 },
  { id: 'BIH', name: 'Bosnië en Herzegovina', nameEn: 'Bosnia and Herzegovina', group: 'B', strength: 1720 },
  // Groep C
  { id: 'BRA', name: 'Brazilië',      nameEn: 'Brazil',        group: 'C', strength: 2040 },
  { id: 'MAR', name: 'Marokko',       nameEn: 'Morocco',       group: 'C', strength: 1900 },
  { id: 'SCO', name: 'Schotland',     nameEn: 'Scotland',      group: 'C', strength: 1740 },
  { id: 'HAI', name: 'Haïti',         nameEn: 'Haiti',         group: 'C', strength: 1600 },
  // Groep D
  { id: 'USA', name: 'Verenigde Staten', nameEn: 'United States', group: 'D', isHost: true, strength: 1800 },
  { id: 'PAR', name: 'Paraguay',      nameEn: 'Paraguay',      group: 'D', strength: 1740 },
  { id: 'AUS', name: 'Australië',     nameEn: 'Australia',     group: 'D', strength: 1760 },
  { id: 'TUR', name: 'Turkije',       nameEn: 'Türkiye',       group: 'D', strength: 1790 },
  // Groep E
  { id: 'GER', name: 'Duitsland',     nameEn: 'Germany',       group: 'E', strength: 1960 },
  { id: 'ECU', name: 'Ecuador',       nameEn: 'Ecuador',       group: 'E', strength: 1850 },
  { id: 'CIV', name: 'Ivoorkust',     nameEn: 'Ivory Coast',   group: 'E', strength: 1800 },
  { id: 'CUW', name: 'Curaçao',       nameEn: 'Curaçao',       group: 'E', strength: 1600 },
  // Groep F
  { id: 'NED', name: 'Nederland',     nameEn: 'Netherlands',   group: 'F', strength: 1950 },
  { id: 'JPN', name: 'Japan',         nameEn: 'Japan',         group: 'F', strength: 1850 },
  { id: 'TUN', name: 'Tunesië',       nameEn: 'Tunisia',       group: 'F', strength: 1720 },
  { id: 'SWE', name: 'Zweden',        nameEn: 'Sweden',        group: 'F', strength: 1800 },
  // Groep G
  { id: 'BEL', name: 'België',        nameEn: 'Belgium',       group: 'G', strength: 1920 },
  { id: 'IRN', name: 'Iran',          nameEn: 'Iran',          group: 'G', strength: 1790 },
  { id: 'EGY', name: 'Egypte',        nameEn: 'Egypt',         group: 'G', strength: 1780 },
  { id: 'NZL', name: 'Nieuw-Zeeland', nameEn: 'New Zealand',   group: 'G', strength: 1600 },
  // Groep H
  { id: 'ESP', name: 'Spanje',        nameEn: 'Spain',         group: 'H', strength: 2080 },
  { id: 'URU', name: 'Uruguay',       nameEn: 'Uruguay',       group: 'H', strength: 1900 },
  { id: 'KSA', name: 'Saoedi-Arabië', nameEn: 'Saudi Arabia',  group: 'H', strength: 1680 },
  { id: 'CPV', name: 'Kaapverdië',    nameEn: 'Cape Verde',    group: 'H', strength: 1620 },
  // Groep I
  { id: 'FRA', name: 'Frankrijk',     nameEn: 'France',        group: 'I', strength: 2050 },
  { id: 'SEN', name: 'Senegal',       nameEn: 'Senegal',       group: 'I', strength: 1860 },
  { id: 'NOR', name: 'Noorwegen',     nameEn: 'Norway',        group: 'I', strength: 1830 },
  { id: 'IRQ', name: 'Irak',          nameEn: 'Iraq',          group: 'I', strength: 1650 },
  // Groep J
  { id: 'ARG', name: 'Argentinië',    nameEn: 'Argentina',     group: 'J', strength: 2060 },
  { id: 'AUT', name: 'Oostenrijk',    nameEn: 'Austria',       group: 'J', strength: 1840 },
  { id: 'ALG', name: 'Algerije',      nameEn: 'Algeria',       group: 'J', strength: 1750 },
  { id: 'JOR', name: 'Jordanië',      nameEn: 'Jordan',        group: 'J', strength: 1650 },
  // Groep K
  { id: 'POR', name: 'Portugal',      nameEn: 'Portugal',      group: 'K', strength: 2010 },
  { id: 'COL', name: 'Colombia',      nameEn: 'Colombia',      group: 'K', strength: 1900 },
  { id: 'UZB', name: 'Oezbekistan',   nameEn: 'Uzbekistan',    group: 'K', strength: 1700 },
  { id: 'COD', name: 'DR Congo',      nameEn: 'DR Congo',      group: 'K', strength: 1720 },
  // Groep L
  { id: 'ENG', name: 'Engeland',      nameEn: 'England',       group: 'L', strength: 2020 },
  { id: 'CRO', name: 'Kroatië',       nameEn: 'Croatia',       group: 'L', strength: 1900 },
  { id: 'PAN', name: 'Panama',        nameEn: 'Panama',        group: 'L', strength: 1690 },
  { id: 'GHA', name: 'Ghana',         nameEn: 'Ghana',         group: 'L', strength: 1740 },
];

export const GROUP_IDS: GroupId[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];

// WK 2026-geïnspireerde kleur per poule (gebaseerd op officieel groepsoverzicht)
export const GROUP_COLORS: Record<GroupId, string> = {
  A: '#3CBF5E', // groen
  B: '#E03A3A', // rood
  C: '#E8923A', // oranje
  D: '#3A5FBF', // koningsblauw
  E: '#6A3ABF', // paars
  F: '#B5D400', // limoen
  G: '#D43AAF', // roze/magenta
  H: '#3AB8BF', // teal
  I: '#8B3ABF', // middenpurper
  J: '#7B3A9F', // dieppurper
  K: '#E06A3A', // diep oranje
  L: '#3A8FE0', // lichtblauw
};

export const teamsByGroup = (g: GroupId): Team[] =>
  TEAMS.filter((t) => t.group === g);

export const teamById = (id: string): Team | undefined =>
  TEAMS.find((t) => t.id === id);

/**
 * De 6 wedstrijden van een groep van 4 (enkele halve competitie).
 * Volgorde is een nette default; echte speeldata/tijden kun je later
 * uit een API (bijv. football-data.org) toevoegen.
 */
export function groupFixtures(g: GroupId): { homeId: string; awayId: string }[] {
  const [t1, t2, t3, t4] = teamsByGroup(g).map((t) => t.id);
  return [
    { homeId: t1, awayId: t2 },
    { homeId: t3, awayId: t4 },
    { homeId: t1, awayId: t3 },
    { homeId: t4, awayId: t2 },
    { homeId: t4, awayId: t1 },
    { homeId: t2, awayId: t3 },
  ];
}
