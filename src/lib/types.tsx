export interface Tournament {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  teams: number;
  defaultTeams: string[];
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
}
