import type { Team, GroupId } from '../lib/types';

export const TEAMS: Team[] = [
  // Groep A
  { id: 'MEX', name: 'Mexico',        nameEn: 'Mexico',                    nameEs: 'México',                    group: 'A', isHost: true, strength: 1820 },
  { id: 'RSA', name: 'Zuid-Afrika',   nameEn: 'South Africa',              nameEs: 'Sudáfrica',                 group: 'A', strength: 1640 },
  { id: 'KOR', name: 'Zuid-Korea',    nameEn: 'South Korea',               nameEs: 'Corea del Sur',             group: 'A', strength: 1810 },
  { id: 'CZE', name: 'Tsjechië',      nameEn: 'Czechia',                   nameEs: 'República Checa',           group: 'A', strength: 1700 },
  // Groep B
  { id: 'CAN', name: 'Canada',        nameEn: 'Canada',                    nameEs: 'Canadá',                    group: 'B', isHost: true, strength: 1760 },
  { id: 'BIH', name: 'Bosnië en Herzegovina', nameEn: 'Bosnia and Herzegovina', nameEs: 'Bosnia y Herzegovina', group: 'B', strength: 1720 },
  { id: 'QAT', name: 'Qatar',         nameEn: 'Qatar',                     nameEs: 'Catar',                     group: 'B', strength: 1700 },
  { id: 'SUI', name: 'Zwitserland',   nameEn: 'Switzerland',               nameEs: 'Suiza',                     group: 'B', strength: 1850 },
  // Groep C
  { id: 'BRA', name: 'Brazilië',      nameEn: 'Brazil',                    nameEs: 'Brasil',                    group: 'C', strength: 2040 },
  { id: 'MAR', name: 'Marokko',       nameEn: 'Morocco',                   nameEs: 'Marruecos',                 group: 'C', strength: 1900 },
  { id: 'HAI', name: 'Haïti',         nameEn: 'Haiti',                     nameEs: 'Haití',                     group: 'C', strength: 1600 },
  { id: 'SCO', name: 'Schotland',     nameEn: 'Scotland',                  nameEs: 'Escocia',                   group: 'C', strength: 1740 },
  // Groep D
  { id: 'USA', name: 'Verenigde Staten', nameEn: 'United States',          nameEs: 'Estados Unidos',            group: 'D', isHost: true, strength: 1800 },
  { id: 'PAR', name: 'Paraguay',      nameEn: 'Paraguay',                  nameEs: 'Paraguay',                  group: 'D', strength: 1740 },
  { id: 'AUS', name: 'Australië',     nameEn: 'Australia',                 nameEs: 'Australia',                 group: 'D', strength: 1760 },
  { id: 'TUR', name: 'Turkije',       nameEn: 'Türkiye',                   nameEs: 'Turquía',                   group: 'D', strength: 1790 },
  // Groep E
  { id: 'GER', name: 'Duitsland',     nameEn: 'Germany',                   nameEs: 'Alemania',                  group: 'E', strength: 1960 },
  { id: 'CUW', name: 'Curaçao',       nameEn: 'Curaçao',                   nameEs: 'Curazao',                   group: 'E', strength: 1600 },
  { id: 'CIV', name: 'Ivoorkust',     nameEn: 'Ivory Coast',               nameEs: 'Costa de Marfil',           group: 'E', strength: 1800 },
  { id: 'ECU', name: 'Ecuador',       nameEn: 'Ecuador',                   nameEs: 'Ecuador',                   group: 'E', strength: 1850 },
  // Groep F
  { id: 'NED', name: 'Nederland',     nameEn: 'Netherlands',               nameEs: 'Países Bajos',              group: 'F', strength: 1950 },
  { id: 'JPN', name: 'Japan',         nameEn: 'Japan',                     nameEs: 'Japón',                     group: 'F', strength: 1850 },
  { id: 'SWE', name: 'Zweden',        nameEn: 'Sweden',                    nameEs: 'Suecia',                    group: 'F', strength: 1800 },
  { id: 'TUN', name: 'Tunesië',       nameEn: 'Tunisia',                   nameEs: 'Túnez',                     group: 'F', strength: 1720 },
  // Groep G
  { id: 'BEL', name: 'België',        nameEn: 'Belgium',                   nameEs: 'Bélgica',                   group: 'G', strength: 1920 },
  { id: 'EGY', name: 'Egypte',        nameEn: 'Egypt',                     nameEs: 'Egipto',                    group: 'G', strength: 1780 },
  { id: 'IRN', name: 'Iran',          nameEn: 'Iran',                      nameEs: 'Irán',                      group: 'G', strength: 1790 },
  { id: 'NZL', name: 'Nieuw-Zeeland', nameEn: 'New Zealand',               nameEs: 'Nueva Zelanda',             group: 'G', strength: 1600 },
  // Groep H
  { id: 'ESP', name: 'Spanje',        nameEn: 'Spain',                     nameEs: 'España',                    group: 'H', strength: 2080 },
  { id: 'CPV', name: 'Kaapverdië',    nameEn: 'Cape Verde',                nameEs: 'Cabo Verde',                group: 'H', strength: 1620 },
  { id: 'KSA', name: 'Saoedi-Arabië', nameEn: 'Saudi Arabia',              nameEs: 'Arabia Saudita',            group: 'H', strength: 1680 },
  { id: 'URU', name: 'Uruguay',       nameEn: 'Uruguay',                   nameEs: 'Uruguay',                   group: 'H', strength: 1900 },
  // Groep I
  { id: 'FRA', name: 'Frankrijk',     nameEn: 'France',                    nameEs: 'Francia',                   group: 'I', strength: 2050 },
  { id: 'SEN', name: 'Senegal',       nameEn: 'Senegal',                   nameEs: 'Senegal',                   group: 'I', strength: 1860 },
  { id: 'IRQ', name: 'Irak',          nameEn: 'Iraq',                      nameEs: 'Irak',                      group: 'I', strength: 1650 },
  { id: 'NOR', name: 'Noorwegen',     nameEn: 'Norway',                    nameEs: 'Noruega',                   group: 'I', strength: 1830 },
  // Groep J
  { id: 'ARG', name: 'Argentinië',    nameEn: 'Argentina',                 nameEs: 'Argentina',                 group: 'J', strength: 2060 },
  { id: 'ALG', name: 'Algerije',      nameEn: 'Algeria',                   nameEs: 'Argelia',                   group: 'J', strength: 1750 },
  { id: 'AUT', name: 'Oostenrijk',    nameEn: 'Austria',                   nameEs: 'Austria',                   group: 'J', strength: 1840 },
  { id: 'JOR', name: 'Jordanië',      nameEn: 'Jordan',                    nameEs: 'Jordania',                  group: 'J', strength: 1650 },
  // Groep K
  { id: 'POR', name: 'Portugal',      nameEn: 'Portugal',                  nameEs: 'Portugal',                  group: 'K', strength: 2010 },
  { id: 'COD', name: 'DR Congo',      nameEn: 'DR Congo',                  nameEs: 'Rep. Dem. del Congo',       group: 'K', strength: 1720 },
  { id: 'UZB', name: 'Oezbekistan',   nameEn: 'Uzbekistan',                nameEs: 'Uzbekistán',                group: 'K', strength: 1700 },
  { id: 'COL', name: 'Colombia',      nameEn: 'Colombia',                  nameEs: 'Colombia',                  group: 'K', strength: 1900 },
  // Groep L
  { id: 'ENG', name: 'Engeland',      nameEn: 'England',                   nameEs: 'Inglaterra',                group: 'L', strength: 2020 },
  { id: 'CRO', name: 'Kroatië',       nameEn: 'Croatia',                   nameEs: 'Croacia',                   group: 'L', strength: 1900 },
  { id: 'GHA', name: 'Ghana',         nameEn: 'Ghana',                     nameEs: 'Ghana',                     group: 'L', strength: 1740 },
  { id: 'PAN', name: 'Panama',        nameEn: 'Panama',                    nameEs: 'Panamá',                    group: 'L', strength: 1690 },
];

export const GROUP_IDS: GroupId[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export const GROUP_COLORS: Record<GroupId, string> = {
  A: '#3CBF5E',
  B: '#E03A3A',
  C: '#E8923A',
  D: '#3A5FBF',
  E: '#6A3ABF',
  F: '#B5D400',
  G: '#D43AAF',
  H: '#3AB8BF',
  I: '#8B3ABF',
  J: '#7B3A9F',
  K: '#E06A3A',
  L: '#3A8FE0',
};

export const teamsByGroup = (g: GroupId): Team[] =>
  TEAMS.filter((t) => t.group === g);

export const teamById = (id: string): Team | undefined =>
  TEAMS.find((t) => t.id === id);

export function getTeamName(team: Team, lang: string): string {
  if (lang === 'en') return team.nameEn;
  if (lang === 'es') return team.nameEs;
  return team.name;
}

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
