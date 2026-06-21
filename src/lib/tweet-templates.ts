import { players } from '@/data/players';
import { TEAMS } from '@/data/worldcup2026';

const BASE_EN = 'https://www.scorepath.nl/en';
const BASE_NL = 'https://www.scorepath.nl/nl';

const teamNameEnMap: Record<string, string> = Object.fromEntries(TEAMS.map((t) => [t.id, t.nameEn]));
const teamNameNlMap: Record<string, string> = Object.fromEntries(TEAMS.map((t) => [t.id, t.name]));
// Engelse landsnaam (zoals in players.json) → Nederlandse landsnaam
const enToNl: Record<string, string> = Object.fromEntries(TEAMS.map((t) => [t.nameEn, t.name]));

export interface MatchDay {
  homeId: string;
  awayId: string;
  homeGoals: number;
  awayGoals: number;
}

function teamEn(id: string): string { return teamNameEnMap[id] ?? id; }
function teamNl(id: string): string { return teamNameNlMap[id] ?? id; }
function countryNl(en: string): string { return enToNl[en] ?? en; }

function dayIndex(): number {
  return Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000);
}

// "a, b & c"  /  "a, b en c"
function joinList(arr: string[], lang: 'nl' | 'en'): string {
  if (arr.length <= 1) return arr[0] ?? '';
  const last = arr[arr.length - 1];
  const head = arr.slice(0, -1).join(', ');
  return `${head} ${lang === 'nl' ? 'en' : '&'} ${last}`;
}

// ─── Diaspora-analyse ─────────────────────────────────────────────────────────
// Spelers geboren in een ander land dan waarvoor ze uitkomen — een van de meest
// gedeelde WK-verhalen. We normaliseren landen zodat bijv. Glasgow→Schotland
// (zelfde land) géén diaspora is.

function normCountry(c: string): string {
  if (['England', 'Scotland', 'Wales', 'Northern Ireland', 'United Kingdom'].includes(c)) return 'UK';
  if (['United States', 'USA'].includes(c)) return 'USA';
  if (['Czech Republic', 'Czechia'].includes(c)) return 'Czechia';
  if (['Ivory Coast', "Côte d'Ivoire"].includes(c)) return 'CIV';
  if (['DR Congo', 'Democratic Republic of the Congo'].includes(c)) return 'COD';
  if (['Turkey', 'Türkiye'].includes(c)) return 'TUR';
  if (['Netherlands', 'Kingdom of the Netherlands'].includes(c)) return 'NED';
  return c;
}

interface DiasporaCity {
  city: string;
  countryEn: string;
  teamsEn: string[];
  count: number;
  isDutch: boolean;
}

function diasporaCities(): DiasporaCity[] {
  const map: Record<string, { countryEn: string; teams: Set<string>; count: number }> = {};
  for (const p of players) {
    if (!p.country || !p.team) continue;
    if (normCountry(p.country) === normCountry(p.team)) continue; // zelfde land = geen diaspora
    const key = `${p.birthplace}|${p.country}`;
    if (!map[key]) map[key] = { countryEn: p.country, teams: new Set(), count: 0 };
    map[key].teams.add(p.team);
    map[key].count += 1;
  }
  return Object.entries(map)
    .map(([key, v]) => ({
      city: key.split('|')[0],
      countryEn: v.countryEn,
      teamsEn: [...v.teams],
      count: v.count,
      isDutch: v.countryEn === 'Netherlands',
    }))
    .filter((c) => c.count >= 3) // alleen sterke, deelbare verhalen
    .sort((a, b) => b.count - a.count);
}

// Kiest een diaspora-stad. NL-account roteert door Nederlandse steden (lokale haak),
// EN-account door de top internationale steden. Rotatie per dag voor variatie.
function pickDiasporaCity(forDutch: boolean): DiasporaCity {
  const all = diasporaCities();
  const pool = forDutch
    ? all.filter((c) => c.isDutch)
    : all.slice(0, 6);
  const list = pool.length > 0 ? pool : all.slice(0, 6);
  return list[dayIndex() % list.length];
}

// ─── Speeldag-recap: uitslagen verpakt in de race om de beste nummers 3 ─────────

function biggestResult(matches: MatchDay[], lang: 'nl' | 'en'): string | null {
  let best: MatchDay | null = null;
  let bestDiff = -1;
  for (const m of matches) {
    const diff = Math.abs(m.homeGoals - m.awayGoals);
    if (diff > bestDiff) { bestDiff = diff; best = m; }
  }
  if (!best || bestDiff < 2) return null;
  const name = lang === 'nl' ? teamNl : teamEn;
  const winner = best.homeGoals > best.awayGoals ? name(best.homeId) : name(best.awayId);
  return lang === 'nl'
    ? `Klap van de dag: ${winner} won met ${best.homeGoals}–${best.awayGoals}.`
    : `Result of the day: ${winner} won it ${best.homeGoals}–${best.awayGoals}.`;
}

export function matchDayRecapEn(matches: MatchDay[]): string {
  const lines = matches.map((m) => `${teamEn(m.homeId)} ${m.homeGoals}–${m.awayGoals} ${teamEn(m.awayId)}`);
  const hooks = [
    `Matchday done 🔥 The race for the 8 best third-placed spots just got tighter.`,
    `Another day at #WC2026 — and the group tables are getting messy 👀`,
    `Full-time across the board. The Round of 32 picture is taking shape 🧩`,
  ];
  const hook = hooks[dayIndex() % hooks.length];
  const big = biggestResult(matches, 'en');
  const parts = [hook];
  if (big) parts.push('', big);
  parts.push('', ...lines, '', `Who sneaks through? Run the table →\n${BASE_EN}/wk-2026`, '', `#WC2026 #WorldCup2026`);
  return parts.join('\n');
}

export function matchDayRecapNl(matches: MatchDay[]): string {
  const lines = matches.map((m) => `${teamNl(m.homeId)} ${m.homeGoals}–${m.awayGoals} ${teamNl(m.awayId)}`);
  const hooks = [
    `Speeldag erop 🔥 De strijd om de 8 beste nummers 3 wordt met de minuut spannender.`,
    `Weer een dag #WK2026 — en de poules worden een gekkenhuis 👀`,
    `Alles gespeeld. Het plaatje voor de Round of 32 begint vorm te krijgen 🧩`,
  ];
  const hook = hooks[dayIndex() % hooks.length];
  const big = biggestResult(matches, 'nl');
  const parts = [hook];
  if (big) parts.push('', big);
  parts.push('', ...lines, '', `Wie kruipt door het oog van de naald? →\n${BASE_NL}/wk-2026`, '', `#WK2026 #Voetbal`);
  return parts.join('\n');
}

// ─── Diaspora-spotlight (vervangt de oude geboorteplaats-post) ──────────────────

export function birthplaceSpotlightEn(): string {
  const c = pickDiasporaCity(false);
  const teams = joinList(c.teamsEn, 'en');
  const variants = [
    `${c.count} players at #WC2026 were born in ${c.city} 🌍 — and not one of them plays for ${c.countryEn}.\n\nThey're representing ${teams}.\n\nThis is what makes the World Cup beautiful. See where every player was really born →\n${BASE_EN}/wk-geboorteplaats\n\n#WorldCup2026`,
    `Born in ${c.city}, playing for the world 🌍\n\n${c.count} #WC2026 players from ${c.city} (${c.countryEn}) suit up for ${teams}.\n\nFind the players born near you →\n${BASE_EN}/wk-geboorteplaats\n\n#WorldCup2026 #Football`,
  ];
  return variants[dayIndex() % variants.length];
}

export function birthplaceSpotlightNl(): string {
  const c = pickDiasporaCity(true);
  const teamsNl = joinList(c.teamsEn.map(countryNl), 'nl');
  const cityCountryNl = countryNl(c.countryEn);
  const variants = [
    `${c.count} WK-spelers zijn geboren in ${c.city} 🌍 — maar geen één komt uit voor ${cityCountryNl}.\n\nZe spelen voor ${teamsNl}.\n\nDit maakt het WK zo mooi. Ontdek welke spelers uit jouw stad komen →\n${BASE_NL}/wk-geboorteplaats\n\n#WK2026 #Voetbal`,
    `Geboren in ${c.city}, maar niet in dat elftal 🌍\n\n${c.count} WK-spelers uit ${c.city} komen uit voor ${teamsNl}.\n\nWelke WK-spelers zijn geboren bij jou in de buurt? →\n${BASE_NL}/wk-geboorteplaats\n\n#WK2026 #Voetbal`,
  ];
  return variants[dayIndex() % variants.length];
}

// ─── Aankondiging beste nummers 3 ───────────────────────────────────────────────

export function bestThirdsAnnouncementNl(): string {
  const variants = [
    `🚨 Nieuw in de simulator: je kunt nu de strijd om de 8 beste nummers 3 helemaal zelf naspelen.\n\n4 punten genoeg? Of komt jouw land met 3 nog door op doelsaldo? Vul de poules in en zie de ranglijst live 👇\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`,
    `Het format waar iedereen over struikelt: de 8 beste nummers 3. 🤯\n\nWij hebben 'm nu in de simulator zitten — vul de uitslagen in en zie meteen wie dat laatste ticket naar de Round of 32 pakt.\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`,
  ];
  return variants[dayIndex() % variants.length];
}

export function bestThirdsAnnouncementEn(): string {
  const variants = [
    `🚨 New in the simulator: you can now play out the race for the 8 best third-placed teams yourself.\n\n4 points enough? Or does your team sneak through on goal difference with 3? Fill in the groups and watch the ranking live 👇\n${BASE_EN}/wk-2026\n\n#WC2026 #WorldCup2026`,
    `The format everyone's confused about: the 8 best third-placed teams. 🤯\n\nIt's now live in our simulator — fill in the results and instantly see who grabs that last Round of 32 ticket.\n${BASE_EN}/wk-2026\n\n#WC2026 #WorldCup2026`,
  ];
  return variants[dayIndex() % variants.length];
}

export function canStillWinNl(teamId: string): string {
  const name = teamNl(teamId);
  return `Kan ${name} het #WK2026 nog winnen? 🤔\n\nDoe de simulatie zelf →\n${BASE_NL}/wk-2026\n\n#WK2026 #Voetbal`;
}

export function canStillWinEn(teamId: string): string {
  const name = teamEn(teamId);
  return `Can ${name} still win #WC2026? 🤔\n\nRun the bracket yourself →\n${BASE_EN}/wk-2026\n\n#WorldCup2026`;
}
