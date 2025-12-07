import { useTranslation } from "react-i18next";
import { Container } from "../styles/Tournament";
import { useContext, useState, useMemo, useEffect } from "react";
import { AppContext } from "../lib/context";
import { TeamSelector } from "./TeamSelector";
import Matchday from "./Matchday";
import { Button } from "../generic/Button";
import Standings from "./Standings";
import ArrowLeft from "../assets/icons/arrowLeftIcon.svg?react";
import ArrowRight from "../assets/icons/arrowRightIcon.svg?react";
import DoubleArrowLeft from "../assets/icons/doubleArrowLeftIcon.svg?react";
import DoubleArrowRight from "../assets/icons/doubleArrowRightIcon.svg?react";

// importa listas de times
import { PremierLeagueList } from "../lib/tournaments/PremierLeague";
import { LaLigaList } from "../lib/tournaments/LaLiga";
import { SerieAList } from "../lib/tournaments/SerieA";
import { BundesligaList } from "../lib/tournaments/Bundesliga";
import { Ligue1List } from "../lib/tournaments/Ligue1";
import { BrasileirãoList } from "../lib/tournaments/Brasileirão";
import { EredivisieList } from "../lib/tournaments/Eredivisie";
import { LigaPortugalList } from "../lib/tournaments/LigaPortugal";
import { RestOfEuropeList } from "../lib/tournaments/RestOfEurope";
import { EuropaLeagueChampionsList } from "../lib/tournaments/PossibleChampions";
import EuropaLeagueLogo from "../assets/icons/league logos/EuropaLeague_logo.png";
import {
  balanceHomeAway,
  generateFirstLeg,
  generateSecondLeg,
  shuffleRounds,
} from "../lib/functions";
import CardStatistics from "./CardStatistics";
import { ChampionsLeagueTeams } from "../lib/tournamentsInfo";

const flags = import.meta.glob(
  "../assets/icons/country flags/europe/*_flag.png",
  {
    eager: true,
    import: "default",
  }
);

export default function Tournament() {
  const { t } = useTranslation();

  const {
    selectedTournament,
    tournamentStep,
    setTournamentStep,
    setSelectedTeams,
    selectedTeams,
    setResetAllTeams,
    setLoadDefaultTeams,
    matchdayNumber,
    setMatchdayNumber,
    setSelectedLogos,
    setTeams,
    setConfirmTeams,
    activeTournament,
    scheduleRef,
    Q1Teams,
  } = useContext(AppContext);

  const [, setSelectedTeam] = useState("");
  const selectedCount = selectedTeams.filter(Boolean).length;
  const [navbarItems, setNavbarItems] = useState(Array<string>);

  const ChampionsLeagueList = [
    ...PremierLeagueList,
    ...LaLigaList,
    ...SerieAList,
    ...BundesligaList,
    ...Ligue1List,
    ...EredivisieList,
    ...LigaPortugalList,
    ...RestOfEuropeList,
  ];

  const teams = useMemo(() => {
    if (!selectedTournament) return [];

    switch (selectedTournament.id) {
      case "premier_league":
        return PremierLeagueList;
      case "la_liga":
        return LaLigaList;
      case "serie_a":
        return SerieAList;
      case "bundesliga":
        return BundesligaList;
      case "ligue_1":
        return Ligue1List;
      case "eredivisie":
        return EredivisieList;
      case "liga_portugal":
        return LigaPortugalList;
      case "brasileirao":
        return BrasileirãoList;
      case "uefa_champions_league":
        return ChampionsLeagueList;
      default:
        return [];
    }
  }, [selectedTournament]);

  useEffect(() => {
    setTeams(teams);
  }, [teams, setTeams]);

  useEffect(() => {
    if (selectedTournament?.name == "Champions League") {
      setNavbarItems([
        "Teams Selection",
        "Qualifying Rounds",
        "Standings",
        "Knockout Stage",
        "Statistics",
      ]);
    } else {
      setNavbarItems(["Teams Selection", "Matches", "Standings", "Statistics"]);
    }
  }, [selectedTournament]);

  useMemo(() => {
    setSelectedTeam("");
  }, []);

  function handleSelectTeam(index: number, teamId: string) {
    const selected = teams.find((t) => t.id === teamId);
    const teamName = selected ? selected.name : "";
    const teamLogo = selected ? selected.logo : "";

    setSelectedTeams((prev) => {
      const updated = [...prev];
      updated[index] = teamName;
      return updated;
    });

    setSelectedLogos((prev) => {
      const updated = [...prev];
      updated[index] = teamLogo;
      return updated;
    });
  }

  function PreviousMatchday() {
    if (matchdayNumber > 1) {
      setMatchdayNumber(matchdayNumber - 1);
    }
  }

  function NextMatchday() {
    if (selectedTournament) {
      if (matchdayNumber < (selectedTournament.teams - 1) * 2) {
        setMatchdayNumber(matchdayNumber + 1);
      }
    }
  }

  function expandCountries(countryTeams: Record<string, number>) {
    const result: string[] = [];

    Object.entries(countryTeams).forEach(([country, qty]) => {
      for (let i = 0; i < qty; i++) result.push(country);
    });

    return result;
  }

  const countrySlots = expandCountries(ChampionsLeagueTeams);

  useEffect(() => {
    if (activeTournament && selectedTeams.length > 1) {
      const firstLeg = generateFirstLeg(selectedTeams);

      shuffleRounds(firstLeg);
      firstLeg.forEach((r) => shuffleRounds(r));
      balanceHomeAway(firstLeg);

      const secondLeg = generateSecondLeg(firstLeg);

      scheduleRef.current = [...firstLeg, ...secondLeg];
    }
  }, [activeTournament]);

  return (
    <Container
      tournamentName={selectedTournament?.name ?? ""}
      secondaryColor={selectedTournament?.secondaryColor ?? "#FFF"}
      tertiaryColor={selectedTournament?.tertiaryColor ?? "#FFF"}
      backgroundColor={selectedTournament?.backgroundColor ?? "#FFF"}
      textColor={selectedTournament?.textColor ?? "#FFF"}
    >
      <nav className="steps-nav">
        {navbarItems.map((step) => (
          <div
            key={step}
            className={`step ${tournamentStep === step ? "active" : ""} ${
              selectedTournament &&
              step !== "Teams Selection" &&
              !activeTournament
                ? "disabled"
                : ""
            }`}
            onClick={() =>
              selectedCount === selectedTournament?.teams &&
              setTournamentStep(step)
            }
          >
            <h3 className="step-name">{t(step)}</h3>
            <hr className="selected-step" />
          </div>
        ))}
      </nav>

      {tournamentStep === "Teams Selection" && selectedTournament && (
        <>
          <section className="teams-selection">
            {selectedTournament.name === "Champions League" && (
              <div className="team-slot">
                <img
                  src={EuropaLeagueLogo}
                  className="team-flag"
                  alt="europa-league-champion"
                />

                <TeamSelector
                  selectedTournament={selectedTournament}
                  selectedTeam={selectedTeams[0]}
                  onSelectTeam={(teamId) => handleSelectTeam(0, teamId)}
                  teams={EuropaLeagueChampionsList}
                  disabledTeams={selectedTeams.filter((_, i) => i !== 0)}
                />
              </div>
            )}
            {[...Array(selectedTournament.teams - 1)].map((_, i) => {
              const index = i + 1;
              const country = countrySlots[index];
              const countryTeams = teams.filter((t) => t.league === country); // Only for Champions League

              // Flag correta mapeada dinamicamente
              const flagPath = `../assets/icons/country flags/europe/${country}_flag.png`;
              const flagSrc = flags[flagPath];

              return (
                <div key={index} className="team-slot">
                  {selectedTournament.name == "Champions League" && (
                    <img
                      src={flagSrc as string}
                      className="team-flag"
                      alt={country}
                    />
                  )}

                  <TeamSelector
                    selectedTournament={selectedTournament}
                    selectedTeam={selectedTeams[index]}
                    onSelectTeam={(teamId) => handleSelectTeam(index, teamId)}
                    teams={
                      selectedTournament.name == "Champions League"
                        ? countryTeams
                        : teams
                    }
                    disabledTeams={selectedTeams.filter((_, i) => i !== index)}
                  />
                </div>
              );
            })}
          </section>

          <footer className="footer-buttons">
            <Button
              color="gray"
              borderRadius="6px"
              height="35px"
              functionButton={() => setConfirmTeams(true)}
              disabled={
                selectedCount !== selectedTournament.teams || activeTournament
              }
            >
              {t("Generate Tournament")}
            </Button>

            <Button
              color="gray"
              borderRadius="6px"
              height="35px"
              functionButton={() => setLoadDefaultTeams(true)}
              disabled={activeTournament}
            >
              {t("Load 2025/2026")}
            </Button>

            <Button
              color="gray"
              borderRadius="6px"
              height="35px"
              functionButton={() => setResetAllTeams(true)}
              disabled={selectedCount < 1}
            >
              {t("Reset Teams")}
            </Button>
          </footer>
        </>
      )}

      {tournamentStep == "Qualifying Rounds" &&
        selectedTournament?.name == "Champions League" && (
          <>
            <div>
              {Q1Teams.map((team) => (
                <h4>{team}</h4>
              ))}
            </div>
          </>
        )}

      {tournamentStep === "Matches" && selectedTournament && (
        <>
          {activeTournament && (
            <nav className="matchday">
              <div
                className={`previous-matchday ${
                  matchdayNumber === 1 ? "inactive" : ""
                }`}
                onClick={() => setMatchdayNumber(1)}
              >
                <DoubleArrowLeft />
              </div>

              <div
                className={`previous-matchday ${
                  matchdayNumber === 1 ? "inactive" : ""
                }`}
                onClick={PreviousMatchday}
              >
                <ArrowLeft />
              </div>

              <h3 className="matchday-number">
                {t("Matchday")} {matchdayNumber < 10 && "0"}
                {matchdayNumber}
              </h3>

              <div
                className={`next-matchday ${
                  matchdayNumber === (selectedTournament.teams - 1) * 2
                    ? "inactive"
                    : ""
                }`}
                onClick={NextMatchday}
              >
                <ArrowRight />
              </div>

              <div
                className={`next-matchday ${
                  matchdayNumber === (selectedTournament.teams - 1) * 2
                    ? "inactive"
                    : ""
                }`}
                onClick={() =>
                  setMatchdayNumber((selectedTournament.teams - 1) * 2)
                }
              >
                <DoubleArrowRight />
              </div>
            </nav>
          )}

          <div className="matches">
            <Matchday />
          </div>
        </>
      )}

      {tournamentStep === "Standings" && selectedTournament && <Standings />}

      {tournamentStep === "Statistics" && selectedTournament && (
        <article className="cards">
          <CardStatistics cardTitle="Goals Forward" orderBy="goalsFor" />
          <CardStatistics cardTitle="Goals Against" orderBy="goalsAgainst" />
          <CardStatistics
            cardTitle="Goals Difference"
            orderBy="goalDifference"
          />
        </article>
      )}
    </Container>
  );
}
