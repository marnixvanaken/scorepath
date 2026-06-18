import rawPlayers from '../../data/players.json';

export interface Player {
  id: string;
  name: string;
  team: string;
  teamCode: string;
  position: string;
  birthplace: string;
  country: string;
  lat: number;
  lon: number;
}

export const players: Player[] = rawPlayers as Player[];
