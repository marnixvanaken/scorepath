// Gedeelde bestandsnaam -> club-id-resolutie voor de football-logos-repo.
// Gebruikt door scripts/import-logos.ts en scripts/season-rollover.ts, zodat
// beide gegarandeerd dezelfde ids afleiden. De zes oorspronkelijke competities
// hebben handgecureerde ids (expliciete mapping); de overige competities
// gebruiken automatische slug-afleiding met een landvoorvoegsel.

export const EXPLICIT_MAPPING: Record<string, Record<string, string>> = {
  'Netherlands - Eredivisie': {
    'AZ Alkmaar': 'nl-az',
    'Ajax Amsterdam': 'nl-ajax',
    'Excelsior Rotterdam': 'nl-excelsior',
    'FC Groningen': 'nl-groningen',
    'FC Utrecht': 'nl-utrecht',
    'FC Volendam': 'nl-volendam',
    'Feyenoord Rotterdam': 'nl-feyenoord',
    'Fortuna Sittard': 'nl-fortuna-sittard',
    'Go Ahead Eagles': 'nl-go-ahead-eagles',
    'Heracles Almelo': 'nl-heracles',
    'NAC Breda': 'nl-nac-breda',
    'NEC Nijmegen': 'nl-nec',
    'PEC Zwolle': 'nl-pec-zwolle',
    'PSV Eindhoven': 'nl-psv',
    'SC Heerenveen': 'nl-heerenveen',
    'SC Telstar': 'nl-telstar',
    'Sparta Rotterdam': 'nl-sparta-rotterdam',
    'Twente Enschede FC': 'nl-twente',
  },
  'England - Premier League': {
    'AFC Bournemouth': 'en-bournemouth',
    'Arsenal FC': 'en-arsenal',
    'Aston Villa': 'en-aston-villa',
    'Brentford FC': 'en-brentford',
    'Brighton & Hove Albion': 'en-brighton',
    'Burnley FC': 'en-burnley',
    'Chelsea FC': 'en-chelsea',
    'Crystal Palace': 'en-crystal-palace',
    'Everton FC': 'en-everton',
    'Fulham FC': 'en-fulham',
    'Leeds United': 'en-leeds-united',
    'Liverpool FC': 'en-liverpool',
    'Manchester City': 'en-manchester-city',
    'Manchester United': 'en-manchester-united',
    'Newcastle United': 'en-newcastle',
    'Nottingham Forest': 'en-nottingham-forest',
    'Sunderland AFC': 'en-sunderland',
    'Tottenham Hotspur': 'en-tottenham',
    'West Ham United': 'en-west-ham',
    'Wolverhampton Wanderers': 'en-wolverhampton',
  },
  'Spain - LaLiga': {
    'Athletic Bilbao': 'es-athletic',
    'Atlético de Madrid': 'es-atletico-madrid',
    'CA Osasuna': 'es-osasuna',
    'Celta de Vigo': 'es-celta',
    'Deportivo Alavés': 'es-alaves',
    'Elche CF': 'es-elche',
    'FC Barcelona': 'es-barcelona',
    'Getafe CF': 'es-getafe',
    'Girona FC': 'es-girona',
    'Levante UD': 'es-levante',
    'RCD Espanyol Barcelona': 'es-espanyol',
    'RCD Mallorca': 'es-mallorca',
    'Rayo Vallecano': 'es-rayo-vallecano',
    'Real Betis Balompié': 'es-betis',
    'Real Madrid': 'es-real-madrid',
    'Real Oviedo': 'es-oviedo',
    'Real Sociedad': 'es-real-sociedad',
    'Sevilla FC': 'es-sevilla',
    'Valencia CF': 'es-valencia',
    'Villarreal CF': 'es-villarreal',
  },
  'Germany - Bundesliga': {
    '1.FC Heidenheim 1846': 'de-heidenheim',
    '1.FC Köln': 'de-koln',
    '1.FC Union Berlin': 'de-union-berlin',
    '1.FSV Mainz 05': 'de-mainz',
    'Bayer 04 Leverkusen': 'de-leverkusen',
    'Bayern Munich': 'de-bayern',
    'Borussia Dortmund': 'de-dortmund',
    'Borussia Mönchengladbach': 'de-monchengladbach',
    'Eintracht Frankfurt': 'de-frankfurt',
    'FC Augsburg': 'de-augsburg',
    'FC St. Pauli': 'de-st-pauli',
    'Hamburger SV': 'de-hamburg',
    'RB Leipzig': 'de-leipzig',
    'SC Freiburg': 'de-freiburg',
    'SV Werder Bremen': 'de-bremen',
    'TSG 1899 Hoffenheim': 'de-hoffenheim',
    'VfB Stuttgart': 'de-stuttgart',
    'VfL Wolfsburg': 'de-wolfsburg',
  },
  'Italy - Serie A': {
    'AC Milan': 'it-milan',
    'ACF Fiorentina': 'it-fiorentina',
    'AS Roma': 'it-roma',
    'Atalanta BC': 'it-atalanta',
    'Bologna FC 1909': 'it-bologna',
    'Cagliari Calcio': 'it-cagliari',
    'Como 1907': 'it-como',
    'Genoa CFC': 'it-genoa',
    'Hellas Verona': 'it-verona',
    'Inter Milan': 'it-inter',
    'Juventus FC': 'it-juventus',
    'Parma Calcio 1913': 'it-parma',
    'Pisa Sporting Club': 'it-pisa',
    'SS Lazio': 'it-lazio',
    'SSC Napoli': 'it-napoli',
    'Torino FC': 'it-torino',
    'US Cremonese': 'it-cremonese',
    'US Lecce': 'it-lecce',
    'US Sassuolo': 'it-sassuolo',
    'Udinese Calcio': 'it-udinese',
  },
  'France - Ligue 1': {
    'AJ Auxerre': 'fr-auxerre',
    'AS Monaco': 'fr-monaco',
    'Angers SCO': 'fr-angers',
    'FC Lorient': 'fr-lorient',
    'FC Metz': 'fr-metz',
    'FC Nantes': 'fr-nantes',
    'FC Toulouse': 'fr-toulouse',
    'LOSC Lille': 'fr-lille',
    'Le Havre AC': 'fr-le-havre',
    'OGC Nice': 'fr-nice',
    'Olympique Lyon': 'fr-lyon',
    'Olympique Marseille': 'fr-marseille',
    'Paris FC': 'fr-paris-fc',
    'Paris Saint-Germain': 'fr-psg',
    'RC Lens': 'fr-lens',
    'RC Strasbourg Alsace': 'fr-strasbourg',
    'Stade Brestois 29': 'fr-brest',
    'Stade Rennais FC': 'fr-rennes',
  },
};

export const AUTO_LEAGUES: Record<string, string> = {
  'Austria - Bundesliga': 'at',
  'Belgium - Jupiler Pro League': 'be',
  'Bulgaria - efbet Liga': 'bg',
  'Croatia - SuperSport HNL': 'hr',
  'Czech Republic - Chance Liga': 'cz',
  'Denmark - Superliga': 'dk',
  'Greece - Super League 1': 'gr',
  "Israel - Ligat ha'Al": 'il',
  'Norway - Eliteserien': 'no',
  'Poland - PKO BP Ekstraklasa': 'pl',
  'Portugal - Liga Portugal': 'pt',
  'Romania - SuperLiga': 'ro',
  'Russia - Premier Liga': 'ru',
  'Scotland - Scottish Premiership': 'sct',
  'Serbia - Super liga Srbije': 'rs',
  'Sweden - Allsvenskan': 'se',
  'Switzerland - Super League': 'ch',
  'Türkiye - Süper Lig': 'tr',
  'Ukraine - Premier Liga': 'ua',
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Resolve een logobestandsnaam (zonder .png) naar een club-id, of null als
// de map niet bekend is.
export function fileToId(folder: string, file: string): string | null {
  const explicit = EXPLICIT_MAPPING[folder]?.[file];
  if (explicit) return explicit;
  const prefix = AUTO_LEAGUES[folder];
  if (!prefix) return null;
  return `${prefix}-${slugify(file)}`;
}
