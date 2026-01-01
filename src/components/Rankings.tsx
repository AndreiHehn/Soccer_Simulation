import { Container } from "../styles/Rankings";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/context";
import { UEFA_Ranking } from "../lib/rankings/uefa_ranking";

import { PremierLeagueList } from "../lib/tournaments/PremierLeague";
import { LaLigaList } from "../lib/tournaments/LaLiga";
import { SerieAList } from "../lib/tournaments/SerieA";
import { BundesligaList } from "../lib/tournaments/Bundesliga";
import { Ligue1List } from "../lib/tournaments/Ligue1";
import { EredivisieList } from "../lib/tournaments/Eredivisie";
import { LigaPortugalList } from "../lib/tournaments/LigaPortugal";
import { RestOfEuropeList } from "../lib/tournaments/RestOfEurope";
import { BrasileirãoList } from "../lib/tournaments/Brasileirão";
import { SouthAmericaList } from "../lib/tournaments/SouthAmerica";
import type { Team } from "../lib/types";
import { CONMEBOL_Ranking } from "../lib/rankings/conmebol_ranking";

const europeFlags = import.meta.glob(
  "../assets/icons/country flags/europe/*_flag.png",
  {
    eager: true,
    import: "default",
  }
);

const southAmericaFlags = import.meta.glob(
  "../assets/icons/country flags/south_america/*_flag.png",
  {
    eager: true,
    import: "default",
  }
);

export default function Rankings() {
  const Uefa_TeamsList = [
    ...PremierLeagueList,
    ...LaLigaList,
    ...SerieAList,
    ...BundesligaList,
    ...Ligue1List,
    ...EredivisieList,
    ...LigaPortugalList,
    ...RestOfEuropeList,
  ];
  const CONMEBOL_TeamsList = [...BrasileirãoList, ...SouthAmericaList];
  const { t } = useTranslation();
  const { selectedTournament, theme } = useContext(AppContext);
  const navbarItems = ["UEFA", "CONMEBOL"];
  const [localRanking, setLocalRanking] = useState<string>("UEFA");
  const [activeList, setActiveList] = useState<Team[]>(Uefa_TeamsList);
  const [activeRanking, setActiveRanking] = useState<string[]>(UEFA_Ranking);

  useEffect(() => {
    if (localRanking == "UEFA") {
      setActiveList(Uefa_TeamsList);
      setActiveRanking(UEFA_Ranking);
    }
    if (localRanking == "CONMEBOL") {
      setActiveList(CONMEBOL_TeamsList);
      setActiveRanking(CONMEBOL_Ranking);
    }
  }, [localRanking]);

  return (
    <Container
      primaryColor={
        selectedTournament != null
          ? selectedTournament.backgroundColor
          : theme == "app"
          ? "#3e926c"
          : "#43554d"
      }
      secondaryColor={
        selectedTournament != null
          ? selectedTournament.secondaryColor
          : "#FFFFFF"
      }
      textColor={
        selectedTournament != null ? selectedTournament.textColor : "#FFFFFF"
      }
    >
      <nav className="rankings-nav">
        {navbarItems.map((rank) => (
          <div
            key={rank}
            className="active-ranking"
            onClick={() => setLocalRanking(rank)}
          >
            <h3 className="rank-name">{t(rank)}</h3>
            {localRanking == rank && <hr className="selected-ranking" />}
          </div>
        ))}
      </nav>
      <div className="ranking">
        {activeRanking.map((teamName, index) => {
          const teamData = activeList.find((team) => team.name === teamName);
          const flagPath =
            localRanking == "UEFA"
              ? `../assets/icons/country flags/europe/${teamData?.league}_flag.png`
              : `../assets/icons/country flags/south_america/${teamData?.league}_flag.png`;
          const flagSrc =
            localRanking == "UEFA"
              ? europeFlags[flagPath]
              : southAmericaFlags[flagPath];
          const logoSrc = teamData?.logo ?? "";

          return (
            <div key={teamName} className="team-ranking">
              <h2 className="team-position">{index + 1}</h2>

              <img src={logoSrc} alt={teamName} className="team-logo" />

              <h2 className="team-name">{teamName}</h2>
              <img
                className="flag"
                src={flagSrc as string}
                alt="country-flag"
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
