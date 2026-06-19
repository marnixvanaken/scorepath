import { players } from '@/data/players';
import { TEAMS } from '@/data/worldcup2026';

const BASE_URL = 'https://www.scorepath.nl/en';

// Team name lookup by ID
const teamNameMap: Record<string, string> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t.nameEn])
);

interface MatchDay {
  homeId: string;
  awayId: string;
  homeGoals: number;
  awayGoals: number;
}

function teamName(id: string): string {
  return teamNameMap[id] ?? id;
}

// Picks a city based on the day of year so it rotates predictably
function cityOfTheDay(): { city: string; country: string; count: number; teams: string[] } {
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
    teams: [...entry[1].teams].map((code) => teamNameMap[code] ?? code),
  };
}

// WK match day recap — up to 8 results per day
export function matchDayRecap(matches: MatchDay[], dayLabel: string): string {
  const lines = matches.map((m) => `${teamName(m.homeId)} ${m.homeGoals}–${m.awayGoals} ${teamName(m.awayId)}`);

  // Rotate between CTA and no-CTA
  const includeCTA = new Date().getDate() % 2 === 0;

  const intro = [
    `⚽ ${dayLabel} wrapped. Here's what happened:`,
    `Full day at #WC2026. Results:`,
    `${dayLabel} done. Here we go 👇`,
    `Another day of #WorldCup2026 football:`,
  ][new Date().getDay() % 4];

  const hashtags = '#WC2026 #WorldCup2026 #FIFAWorldCup';

  const body = [intro, '', ...lines, '', hashtags].join('\n');

  if (includeCTA) {
    return [body, '', `Who's making it out of the groups? Simulate it →\n${BASE_URL}/wk-2026`].join('\n');
  }
  return body;
}

// Daily birthplace city spotlight
export function birthplaceCitySpotlight(): string {
  const { city, country, count, teams } = cityOfTheDay();

  const teamMention = teams.length === 1
    ? `representing ${teams[0]}`
    : `from ${teams.slice(0, 3).join(', ')}${teams.length > 3 ? ' and more' : ''}`;

  const variants = [
    `🌍 ${count} players at #WC2026 were born in ${city}, ${country} — ${teamMention}.\n\nFind the World Cup players born near you 👇\n${BASE_URL}/wk-geboorteplaats\n\n#WorldCup2026 #${city.replace(/\s/g, '')} #Football`,
    `📍 ${city}, ${country} — ${count} #WC2026 players call this their birthplace.\n\nDiscover which players grew up near you →\n${BASE_URL}/wk-geboorteplaats\n\n#WorldCup2026 #Football`,
    `Did you know? ${count} players at #WorldCup2026 were born in ${city}.\n\nSee every WC player mapped to their birthplace →\n${BASE_URL}/wk-geboorteplaats\n\n#WC2026 #${country.replace(/\s/g, '')}`,
  ];

  return variants[new Date().getDate() % variants.length];
}

// "Can X still win?" post — used after group stage or knockout rounds
export function canStillWinPost(teamId: string): string {
  const name = teamName(teamId);
  const includeCTA = true;

  const body = `Can ${name} still win #WC2026? 🤔\n\nRun the bracket yourself and find out →\n${BASE_URL}/wk-2026\n\n#WorldCup2026 #${name.replace(/\s/g, '')}`;
  return body;
}
