// Kerntypes voor de WK 2026 simulator (modus A: what-if).
// Framework-onafhankelijk — werkt in React/Next/Svelte/vanilla TS.

export type GroupId =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export interface Team {
  /** Korte FIFA-achtige code, bijv. "NED". Gebruikt als stabiele id. */
  id: string;
  /** Weergavenaam (NL-first). */
  name: string;
  /** Engelse naam. */
  nameEn: string;
  /** Spaanse naam. */
  nameEs: string;
  group: GroupId;
  isHost?: boolean;
  /**
   * Ruwe sterkte-heuristiek (~Elo-schaal) ALLEEN voor de "voorgevuld"-toggle.
   * Dit is GEEN officiële data. Vervang door echte ratings van eloratings.net
   * voordat je modus B (Monte Carlo) serieus neemt.
   */
  strength: number;
}

/** Uitslag van één groepswedstrijd. */
export interface MatchResult {
  group: GroupId;
  homeId: string;
  awayId: string;
  /**
   * Exacte modus: vul homeGoals + awayGoals.
   * Snelle modus (W/G/V): laat goals weg en zet alleen `outcome`.
   * Bij exacte uitslag wordt `outcome` genegeerd (afgeleid uit de goals).
   */
  homeGoals?: number;
  awayGoals?: number;
  /** Alleen gebruikt als goals ontbreken. 'H' = thuiswinst, 'D' = gelijk, 'A' = uitwinst. */
  outcome?: 'H' | 'D' | 'A';
  /** True als de wedstrijd officieel gespeeld is (van football-data.org). Niet te bewerken door gebruiker. */
  locked?: boolean;
}

export interface Standing {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  /** goals for / against. Blijft 0 zolang er alleen W/G/V-uitslagen zijn. */
  gf: number;
  ga: number;
  gd: number;
  points: number;
  /** Of er voor deze ploeg minstens één uitslag met echte goals is ingevuld. */
  hasScores: boolean;
}

export interface ThirdPlaceRank extends Standing {
  group: GroupId;
  /** Positie 1..12 in de ranglijst van alle nummers 3. */
  rank: number;
  /** True voor de 8 die doorgaan naar de Round of 32. */
  advances: boolean;
}

export interface Qualifiers {
  winners: { group: GroupId; teamId: string }[];   // 12
  runnersUp: { group: GroupId; teamId: string }[];  // 12
  bestThirds: ThirdPlaceRank[];                      // 8 met advances=true
}
