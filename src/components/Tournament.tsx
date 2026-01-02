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
import {
  EuropaLeagueChampionsList,
  LibertadoresChampionsList,
  SudamericanaChampionsList,
} from "../lib/tournaments/PossibleChampions";
import { SouthAmericaList } from "../lib/tournaments/SouthAmerica";

// importa logos dos campeonatos
import EuropaLeagueLogo from "../assets/icons/league logos/EuropaLeague_logo.png";
import LibertadoresLogo from "../assets/icons/league logos/Libertadores_logo.png";
import SudamericanaLogo from "../assets/icons/league logos/Sudamericana_logo.png";

import {
  balanceHomeAway,
  generateFirstLeg,
  generateSecondLeg,
  shuffleRounds,
} from "../lib/functions";
import CardStatistics from "./CardStatistics";
import {
  ChampionsLeagueTeams,
  LibertadoresTeams,
} from "../lib/tournamentsInfo";
import QualifyingRound from "./QualifyingRound";

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
  } = useContext(AppContext);

  const [, setSelectedTeam] = useState("");
  const selectedCount = selectedTeams.filter(Boolean).length;
  const [matchesPerPhase, setMatchesPerPhase] = useState([10, 15, 10, 7]);

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

  const LibertadoresList = [...BrasileirãoList, ...SouthAmericaList];

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
      case "libertadores":
        return LibertadoresList;
      default:
        return [];
    }
  }, [selectedTournament]);

  useEffect(() => {
    setTeams(teams);
  }, [teams, setTeams]);

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

  function expandPhasedCountries(
    phasedTeams: Record<string, Record<string, number>>,
    phaseOrder: string[]
  ) {
    const result: string[] = [];

    phaseOrder.forEach((phase) => {
      const countries = phasedTeams[phase];
      if (!countries) return;

      Object.entries(countries).forEach(([country, qty]) => {
        for (let i = 0; i < qty; i++) result.push(country);
      });
    });

    return result;
  }

  const countrySlots = useMemo(() => {
    if (!selectedTournament) return [];

    if (selectedTournament.name === "Champions League") {
      return expandPhasedCountries(ChampionsLeagueTeams, [
        "FinalStage",
        "Playoff",
        "Q3",
        "Q2",
        "Q1",
      ]);
    }

    if (selectedTournament.name === "Libertadores") {
      return expandPhasedCountries(LibertadoresTeams, [
        "FinalStage",
        "Q2",
        "Q1",
      ]);
    }

    return [];
  }, [selectedTournament]);

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

  useEffect(() => {
    if (selectedTournament) {
      if (selectedTournament.name == "Champions League") {
        setMatchesPerPhase([10, 15, 10, 7]);
      } else if (selectedTournament.name == "Libertadores") {
        setMatchesPerPhase([3, 8, 4]);
      } else {
        setMatchesPerPhase([]);
      }
    }
  }, [selectedTournament]);

  function renderSlots(start: number, end: number) {
    return countrySlots.slice(start, end).map((country, i) => {
      const index = start + i;

      const countryTeams = teams.filter((t) => t.league === country);

      const flagPath =
        selectedTournament?.name === "Champions League"
          ? `../assets/icons/country flags/europe/${country}_flag.png`
          : `../assets/icons/country flags/south_america/${country}_flag.png`;

      const flagSrc =
        selectedTournament?.name === "Champions League"
          ? europeFlags[flagPath]
          : southAmericaFlags[flagPath];

      return (
        <div key={index} className="team-slot">
          {selectedTournament?.type === "Continental" && (
            <img src={flagSrc as string} className="team-flag" alt={country} />
          )}

          <TeamSelector
            selectedTournament={selectedTournament}
            selectedTeam={selectedTeams[index]}
            onSelectTeam={(teamId) => handleSelectTeam(index, teamId)}
            teams={countryTeams}
            disabledTeams={selectedTeams.filter((_, i) => i !== index)}
          />
        </div>
      );
    });
  }

  const phaseRanges = useMemo(() => {
    if (!selectedTournament) return [];

    if (selectedTournament.name === "Champions League") {
      return [
        {
          label: t("League Phase"),
          start: 1,
          end: 29,
        },
        {
          label: t("Playoff"),
          start: 29,
          end: 33,
        },
        {
          label: t("3rd Qualifying"),
          start: 33,
          end: 38,
        },
        {
          label: t("2nd Qualifying"),
          start: 38,
          end: 54,
        },
        {
          label: t("1st Qualifying"),
          start: 54,
          end: countrySlots.length,
        },
      ];
    }

    if (selectedTournament.name === "Libertadores") {
      return [
        {
          label: t("Group Stage"),
          start: 2,
          end: 28,
        },
        {
          label: t("2nd Qualifying"),
          start: 28,
          end: 41,
        },
        {
          label: t("1st Qualifying"),
          start: 41,
          end: countrySlots.length,
        },
      ];
    }

    return [];
  }, [selectedTournament, countrySlots, t]);

  return (
    <Container
      tournamentName={selectedTournament?.name ?? ""}
      secondaryColor={selectedTournament?.secondaryColor ?? "#FFF"}
      tertiaryColor={selectedTournament?.tertiaryColor ?? "#FFF"}
      backgroundColor={selectedTournament?.backgroundColor ?? "#FFF"}
      textColor={selectedTournament?.textColor ?? "#FFF"}
    >
      <nav className="steps-nav">
        {selectedTournament?.navbarItems.map((step) => (
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
            {selectedTournament.type === "Continental" ? (
              phaseRanges.map((phase) => (
                <>
                  <h3 className="phase-title">{phase.label}</h3>
                  <section key={phase.label} className="phase-block">
                    {phase.label === "Group Stage" &&
                      selectedTournament.name === "Libertadores" && (
                        <>
                          <div className="team-slot">
                            <img
                              src={LibertadoresLogo}
                              className="team-flag"
                              alt="libertadores-champion"
                            />

                            <TeamSelector
                              selectedTournament={selectedTournament}
                              selectedTeam={selectedTeams[0]}
                              onSelectTeam={(teamId) =>
                                handleSelectTeam(0, teamId)
                              }
                              teams={LibertadoresChampionsList}
                              disabledTeams={selectedTeams.filter(
                                (_, i) => i !== 0
                              )}
                            />
                          </div>

                          <div className="team-slot">
                            <img
                              src={SudamericanaLogo}
                              className="team-flag"
                              alt="sudamericana-champion"
                            />

                            <TeamSelector
                              selectedTournament={selectedTournament}
                              selectedTeam={selectedTeams[1]}
                              onSelectTeam={(teamId) =>
                                handleSelectTeam(1, teamId)
                              }
                              teams={SudamericanaChampionsList}
                              disabledTeams={selectedTeams.filter(
                                (_, i) => i !== 1
                              )}
                            />
                          </div>
                        </>
                      )}
                    {selectedTournament.name === "Champions League" &&
                      phase.label == "League Phase" && (
                        <div className="team-slot">
                          <img
                            src={EuropaLeagueLogo}
                            className="team-flag"
                            alt="europa-league-champion"
                          />

                          <TeamSelector
                            selectedTournament={selectedTournament}
                            selectedTeam={selectedTeams[0]}
                            onSelectTeam={(teamId) =>
                              handleSelectTeam(0, teamId)
                            }
                            teams={EuropaLeagueChampionsList}
                            disabledTeams={selectedTeams.filter(
                              (_, i) => i !== 0
                            )}
                          />
                        </div>
                      )}

                    {renderSlots(phase.start, phase.end)}
                  </section>
                </>
              ))
            ) : (
              // 🔽 LIGAS NACIONAIS
              <section className="phase-block">
                {[...Array(selectedTournament.teams)].map((_, index) => (
                  <div key={index} className="team-slot">
                    <TeamSelector
                      selectedTournament={selectedTournament}
                      selectedTeam={selectedTeams[index]}
                      onSelectTeam={(teamId) => handleSelectTeam(index, teamId)}
                      teams={teams}
                      disabledTeams={selectedTeams.filter(
                        (_, i) => i !== index
                      )}
                    />
                  </div>
                ))}
              </section>
            )}
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
        selectedTournament?.type == "Continental" && (
          <>
            <QualifyingRound
              phases={selectedTournament?.qualifyingPhases ?? []}
              matchesPerPhase={matchesPerPhase}
              twoLegs
            ></QualifyingRound>
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
