import { players } from '@/data/players';
import { TEAMS } from '@/data/worldcup2026';

const BASE_EN = 'https://www.scorepath.nl/en';
const BASE_NL = 'https://www.scorepath.nl/nl';

const teamNameEnMap: Record<string, string> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t.nameEn])
);
const teamNameNlMap: Record<string, string> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t.name])
);

export interface MatchDay {
  homeId: string;
  awayId: string;
  homeGoals: number;
  awayGoals: number;
}

function teamEn(id: string): string { return teamNameEnMap[id] ?? id; }
function teamNl(id: string): string { return teamNameNlMap[id] ?? id; }

// Deterministic city rotation based on day of year
function cityOfTheDay(): { city: string; country: string; count: number; teamsEn: string[]; teamsNl: string[] } {
  const cityMap: Record<string, { country: string; playerIds: string[]; teams: Set<string> }> = {};

  for (const p of players) {
    if (!cityMap[p.birthplace]) {
      cityMap[p.birthplace] = { country: p.country, playerIds: [], teams: new Set() };
    }
    cityMap[p.birthplace].playerIds.push(p.id);
    cityMap[p.birthplace].teams.add(p.teamCode);
  }

  const eligible = Object.entries(cityMap)
    .filter(([, v]) => v.playerIds.length >= 3)
    .sort((a, b) => b[1].playerIds.length - a[1].playerIds.length);

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const entry = eligible[dayOfYear % eligible.length];

  return {
    city: entry[0],
    country: entry[1].country,
    count: entry[1].playerIds.length,
    teamsEn: [...entry[1].teams].map((c) => teamNameEnMap[c] ?? c),
    teamsNl: [...entry[1].teams].map((c) => teamNameNlMap[c] ?? c),
  };
}

// ─── @ScorepathEN (English) ───────────────────────────────────────────────────

export function matchDayRecapEn(matches: MatchDay[], dayLabel: string): string {
  const lines = matches.map((m) => `${teamEn(m.homeId)} ${m.homeGoals}–${m.awayGoals} ${teamEn(m.awayId)}`);
  const includeCTA = new Date().getDate() % 2 === 0;

  const intro = [
    `⚽ ${dayLabel} wrapped. Here's what happened:`,
    `Full day at #WC2026. Results:`,
    `${dayLabel} done. Here we go 👇`,
    `Another day of #WorldCup2026 football:`,
  ][new Date().getDay() % 4];

  const body = [intro, '', ...lines, '', '#WC2026 #WorldCup2026 #FIFAWorldCup'].join('\n');

  if (includeCTA) {
    return [body, '', `Who's making it out of the groups? Simulate it →\n${BASE_EN}/wk-2026`].join('\n');
  }
  return body;
}

export function birthplaceSpotlightEn(): string {
  const { city, country, count, teamsEn } = cityOfTheDay();
  const mention = teamsEn.length === 1
    ? `representing ${teamsEn[0]}`
    : `from ${teamsEn.slice(0, 3).join(', ')}${teamsEn.length > 3 ? ' and more' : ''}`;

  const variants = [
    `🌍 ${count} players at #WC2026 were born in ${city}, ${country} — ${mention}.\n\nFind the World Cup players born near you 👇\n${BASE_EN}/wk-geboorteplaats\n\n#WorldCup2026 #${city.replace(/\s/g, '')} #Football`,
    `📍 ${city}, ${country} — ${count} #WC2026 players call this their birthplace.\n\nDiscover which players grew up near you →\n${BASE_EN}/wk-geboorteplaats\n\n#WorldCup2026 #Football`,
    `Did you know? ${count} players at #WorldCup2026 were born in ${city}.\n\nSee every WC player mapped to their birthplace →\n${BASE_EN}/wk-geboorteplaats\n\n#WC2026 #${country.replace(/\s/g, '')}`,
  ];

  return variants[new Date().getDate() % variants.length];
}

export function canStillWinEn(teamId: string): string {
  const name = teamEn(teamId);
  return `Can ${name} still win #WC2026? 🤔\n\nRun the bracket yourself and find out →\n${BASE_EN}/wk-2026\n\n#WorldCup2026 #${name.replace(/\s/g, '')}`;
}

// ─── @LaatsteMan1998 (Dutch) ──────────────────────────────────────────────────

export function matchDayRecapNl(matches: MatchDay[], dayLabel: string): string {
  const lines = matches.map((m) => `${teamNl(m.homeId)} ${m.homeGoals}–${m.awayGoals} ${teamNl(m.awayId)}`);
  const includeCTA = new Date().getDate() % 2 !== 0;

  const intro = [
    `Dag ${dayLabel} zit erop. De uitslagen:`,
    `Weer een speeldag WK 2026 achter de rug 👇`,
    `Dit was het vandaag op het #WK2026:`,
    `Alle uitslagen van vandaag:`,
  ][new Date().getDay() % 4];

  const body = [intro, '', ...lines, '', '#WK2026 #Voetbal #FIFAWorldCup'].join('\n');

  if (includeCTA) {
    return [body, '', `Wie haalt de kwartfinale? Simuleer het zelf →\n${BASE_NL}/wk-2026`].join('\n');
  }
  return body;
}

export function birthplaceSpotlightNl(): string {
  const { city, country, count, teamsNl } = cityOfTheDay();
  const mention = teamsNl.length === 1
    ? `voor ${teamsNl[0]}`
    : `bij ${teamsNl.slice(0, 3).join(', ')}${teamsNl.length > 3 ? ' en meer' : ''}`;

  const variants = [
    `🌍 ${count} WK-spelers zijn geboren in ${city}, ${country} — ${mention}.\n\nWelke WK-spelers komen uit jouw buurt? →\n${BASE_NL}/wk-geboorteplaats\n\n#WK2026 #Voetbal`,
    `📍 ${city} leverde ${count} spelers aan het #WK2026. Wist je dat?\n\nZoek spelers bij jou in de buurt →\n${BASE_NL}/wk-geboorteplaats\n\n#WK2026`,
    `Wist je dat ${count} spelers op het #WK2026 zijn geboren in ${city}?\n\nBekijk alle WK-spelers op de kaart →\n${BASE_NL}/wk-geboorteplaats\n\n#Voetbal #WK2026`,
  ];

  return variants[new Date().getDate() % variants.length];
}

export function canStillWinNl(teamId: string): string {
  const name = teamNl(teamId);
  return `Kan ${name} het #WK2026 nog winnen? 🤔\n\nDoe de simulatie zelf →\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`;
}

// Aankondiging van de "beste nummers 3"-feature in de simulator.
// Speelt in op het hete hangijzer vlak voor het einde van de groepsfase.
export function bestThirdsAnnouncementNl(): string {
  const variants = [
    `🚨 Nieuw in de simulator: je kunt nu de strijd om de 8 beste nummers 3 helemaal zelf naspelen.\n\n4 punten genoeg? Of komt jouw land met 3 nog door op doelsaldo? Vul de poules in en zie de ranglijst live 👇\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`,
    `Het format waar iedereen over struikelt: de 8 beste nummers 3. 🤯\n\nWij hebben 'm nu in de simulator zitten — vul de uitslagen in en zie meteen wie dat laatste ticket naar de Round of 32 pakt.\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`,
    `Wie wordt straks een van de 8 beste nummers 3? 👀\n\nSpeel de groepsfase zelf na en check de complete ranglijst — inclusief alle tiebreakers, precies volgens de FIFA-regels.\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`,
  ];
  return variants[new Date().getDate() % variants.length];
}

export function bestThirdsAnnouncementEn(): string {
  const variants = [
    `🚨 New in the simulator: you can now play out the race for the 8 best third-placed teams yourself.\n\n4 points enough? Or does your team sneak through on goal difference with 3? Fill in the groups and watch the ranking live 👇\n${BASE_EN}/wk-2026\n\n#WC2026 #WorldCup2026`,
    `The format everyone's confused about: the 8 best third-placed teams. 🤯\n\nIt's now live in our simulator — fill in the results and instantly see who grabs that last Round of 32 ticket.\n${BASE_EN}/wk-2026\n\n#WC2026 #WorldCup2026`,
  ];
  return variants[new Date().getDate() % variants.length];
}
