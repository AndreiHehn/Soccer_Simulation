/* eslint-disable @typescript-eslint/no-explicit-any */
import { PremierLeagueList } from "../lib/tournaments/PremierLeague";
import { LaLigaList } from "../lib/tournaments/LaLiga";

export const TournamentTeamsMap: Record<string, any[]> = {
  "Premier League": PremierLeagueList,
  "La Liga": LaLigaList,
};
