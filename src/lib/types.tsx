export interface Tournament {
  id: string;
  name: string;
  logo: string;
  type: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  backgroundColor: string;
  textColor: string;
  teams: number;
  relegated?: number;
  qualified?: number[];
  defaultTeams: string[];
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
}

export interface TeamStats {
  team: string;
  logo: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  lastFive: string[];
}
