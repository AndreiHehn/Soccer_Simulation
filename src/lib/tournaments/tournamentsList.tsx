import type { Tournament } from "../types";

import PremierLeague_logo from "../../assets/icons/league logos/Premier_League_logo.png";
import LaLiga_logo from "../../assets/icons/league logos/LaLiga_logo.png";
import SerieA_logo from "../../assets/icons/league logos/SerieA_logo.png";
import Bundesliga_logo from "../../assets/icons/league logos/Bundesliga_logo.png";
import Ligue1_logo from "../../assets/icons/league logos/Ligue1_logo.png";
import Brasileirão_logo from "../../assets/icons/league logos/Brasileirão_logo.png";

export const TournamentsList: Tournament[] = [
  {
    id: "premier_league",
    name: "Premier League",
    logo: PremierLeague_logo,
    primaryColor: "#37003C",
    secondaryColor: "#8252FF",
    backgroundColor: "#37003C",
    textColor: "#FFFFFF",
    teams: 20,
  },
  {
    id: "la_liga",
    name: "La Liga",
    logo: LaLiga_logo,
    primaryColor: "#ff4a44",
    secondaryColor: "#ff4a44",
    backgroundColor: "#FFFFFF",
    textColor: "#08237F",
    teams: 20,
  },
  {
    id: "serie_a",
    name: "Serie A",
    logo: SerieA_logo,
    primaryColor: "#0C8CFF",
    secondaryColor: "#00F4E6",
    backgroundColor: "#FFFFFF",
    textColor: "#0C8CFF",
    teams: 20,
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    logo: Bundesliga_logo,
    primaryColor: "#D10214",
    secondaryColor: "#D10214",
    backgroundColor: "#0A141A",
    textColor: "#FFFFFF",
    teams: 18,
  },
  {
    id: "ligue_1",
    name: "Ligue 1",
    logo: Ligue1_logo,
    primaryColor: "#0061FE",
    secondaryColor: "#0061FE",
    backgroundColor: "#0d2534",
    textColor: "#FFFFFF",
    teams: 18,
  },
  {
    id: "brasileirao",
    name: "Brasileirão",
    logo: Brasileirão_logo,
    primaryColor: "#C7FF00",
    secondaryColor: "#2b16c7",
    backgroundColor: "#150942",
    textColor: "#FFFFFF",
    teams: 20,
  },
];
