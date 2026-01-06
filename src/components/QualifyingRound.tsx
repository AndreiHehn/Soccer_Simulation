import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/QualifyingRound";
import { AppContext } from "../lib/context";
import ArrowLeft from "../assets/icons/arrowLeftIcon.svg?react";
import ArrowRight from "../assets/icons/arrowRightIcon.svg?react";
import Match from "./Match";
import { useTranslation } from "react-i18next";
import { Button } from "../generic/Button";
import { CONMEBOL_Ranking } from "../lib/rankings/conmebol_ranking";

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
import { SouthAmericaList } from "../lib/tournaments/SouthAmerica";

interface Props {
  phases: string[];
  matchesPerPhase: number[];
  twoLegs?: boolean;
}

interface MatchResult {
  home?: number;
  away?: number;
}

interface PhaseState {
  matches: string[];
  results: Record<number, MatchResult>;
  winners: Record<number, string | null>;
}

export default function QualifyingRound({
  phases,
  matchesPerPhase,
  twoLegs,
}: Props) {
  const {
    selectedTournament,
    Q1Teams,
    selectedLogos,
    selectedTeams,
    setQ2Teams,
    Q2Teams,
  } = useContext(AppContext);

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

  const { t } = useTranslation();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const [phaseState, setPhaseState] = useState<Record<number, PhaseState>>({});

  const currentPhase: PhaseState = phaseState[phaseIndex] ?? {
    matches: [],
    results: {},
    winners: {},
  };

  const [q1Promoted, setQ1Promoted] = useState(false); // Garante que os times do Q1 foram adicionados ao Q2

  const teamCountryMap = new Map<string, string>();

  [...LibertadoresList, ...ChampionsLeagueList].forEach((team) => {
    teamCountryMap.set(team.name, team.league);
  });

  const sameCountry = (a: string, b: string) =>
    teamCountryMap.get(a) === teamCountryMap.get(b); // Verifica se dois times são do mesmo país

  function buildMatchesAvoidingSameCountry(teams: string[]) {
    const pool = [...teams];
    const homes: string[] = [];
    const aways: string[] = [];

    while (pool.length > 0) {
      const home = pool.shift()!;

      const opponentIndex = pool.findIndex((team) => !sameCountry(home, team));

      if (opponentIndex === -1) {
        throw new Error(
          `Sorteio impossível: todos os adversários restantes são do mesmo país de ${home}`
        );
      }

      const away = pool.splice(opponentIndex, 1)[0];

      homes.push(home);
      aways.push(away);
    }

    return [...homes, ...aways];
  }

  function NextPhase() {
    if (phaseIndex < phases.length - 1) {
      setPhaseIndex((prev) => prev + 1);
    }
  }

  function PreviousPhase() {
    if (phaseIndex > 0) {
      setPhaseIndex((prev) => prev - 1);
    }
  }

  function updateResult(index: number, team: "home" | "away", value?: number) {
    setPhaseState((prev) => ({
      ...prev,
      [phaseIndex]: {
        ...currentPhase,
        results: {
          ...currentPhase.results,
          [index]: {
            ...currentPhase.results[index],
            [team]: value,
          },
        },
      },
    }));
  }

  function getTeamLogo(
    teamName: string | undefined,
    teams: string[],
    logos: string[]
  ) {
    if (!teamName) return "";
    const index = teams.indexOf(teamName);
    return index === -1 ? "" : logos[index];
  }

  function Draw() {
    const isLibertadores = selectedTournament?.name === "Libertadores";
    const isChampions = selectedTournament?.name === "Champions League";
    const isQ2 = phases[phaseIndex] === "2nd Qualifying";

    let teamsArray: string[] = [];

    if (phases[phaseIndex] === "1st Qualifying") {
      teamsArray = Q1Teams;
    } else if (phases[phaseIndex] === "2nd Qualifying") {
      teamsArray = Q2Teams;
    }

    // 🔹 CASO ESPECIAL: LIBERTADORES Q2 COM POTES
    if (isLibertadores && isQ2) {
      const sortedByRanking = [...teamsArray].sort((a, b) => {
        return CONMEBOL_Ranking.indexOf(a) - CONMEBOL_Ranking.indexOf(b);
      });

      const half = sortedByRanking.length / 2;

      let pot1 = sortedByRanking.slice(0, half);
      let pot2 = sortedByRanking.slice(half);

      // 🔀 Embaralha cada pote
      const shuffle = (array: string[]) => {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      pot1 = shuffle(pot1);
      pot2 = shuffle(pot2);

      const merged = pot1.flatMap((team, i) => [team, pot2[i]]);
      const matches = buildMatchesAvoidingSameCountry(merged);

      setPhaseState((prev) => ({
        ...prev,
        [phaseIndex]: {
          matches,
          results: {},
          winners: {},
        },
      }));

      return;
    }

    if (isChampions && isQ2) {
      const championsPath = [
        ...teamsArray.slice(0, 10), // Campeões diretos
        ...teamsArray.slice(16), // Vindos do Q1
      ];

      const leaguePath = teamsArray.slice(10, 16);

      const shuffle = (array: string[]) => {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const shuffledChampions = shuffle(championsPath);
      const shuffledLeague = shuffle(leaguePath);

      // Campeões
      const chHalf = shuffledChampions.length / 2;
      const chHome = shuffledChampions.slice(0, chHalf);
      const chAway = shuffledChampions.slice(chHalf);

      // Liga
      const lgHalf = shuffledLeague.length / 2;
      const lgHome = shuffledLeague.slice(0, lgHalf);
      const lgAway = shuffledLeague.slice(lgHalf);

      setPhaseState((prev) => ({
        ...prev,
        [phaseIndex]: {
          matches: [...chHome, ...lgHome, ...chAway, ...lgAway],
          results: {},
          winners: {},
        },
      }));

      return;
    }

    // 🔹 SORTEIO NORMAL (Q1 ou outros casos)
    const shuffled = [...teamsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    console.log(LibertadoresList);

    setPhaseState((prev) => ({
      ...prev,
      [phaseIndex]: {
        matches: shuffled,
        results: {},
        winners: {},
      },
    }));
  }

  function calculateWinner(matchIndex: number) {
    const offset = matchesPerPhase[phaseIndex];
    const firstLeg = currentPhase.results[matchIndex];
    const secondLeg = currentPhase.results[matchIndex + offset];

    if (
      !firstLeg ||
      !secondLeg ||
      firstLeg.home == null ||
      firstLeg.away == null ||
      secondLeg.home == null ||
      secondLeg.away == null
    )
      return;

    const homeTeam = currentPhase.matches[matchIndex];
    const awayTeam =
      currentPhase.matches[matchIndex + currentPhase.matches.length / 2];

    const homeAggregate = firstLeg.home + secondLeg.away;
    const awayAggregate = firstLeg.away + secondLeg.home;

    let winner: string | null = null;

    if (homeAggregate > awayAggregate) winner = homeTeam;
    else if (awayAggregate > homeAggregate) winner = awayTeam;
    else {
      const homeAwayGoals = secondLeg.away;
      const awayAwayGoals = firstLeg.away;

      if (homeAwayGoals > awayAwayGoals) winner = homeTeam;
      else if (awayAwayGoals > homeAwayGoals) winner = awayTeam;
    }

    setPhaseState((prev) => ({
      ...prev,
      [phaseIndex]: {
        ...currentPhase,
        winners: {
          ...currentPhase.winners,
          [matchIndex]: winner,
        },
      },
    }));
  }

  useEffect(() => {
    for (let i = 0; i < matchesPerPhase[phaseIndex]; i++) {
      calculateWinner(i);
    }
  }, [currentPhase.results, phaseIndex]);

  const allTiesResolved =
    Object.keys(currentPhase.winners).length === matchesPerPhase[phaseIndex] &&
    Object.values(currentPhase.winners).every((w) => w !== null);

  useEffect(() => {
    if (!allTiesResolved) return;
    if (phaseIndex !== 0) return;
    if (q1Promoted) return;

    const winners = Object.values(currentPhase.winners) as string[];

    setQ2Teams((prev) => [...prev, ...winners]);
    setQ1Promoted(true);
  }, [allTiesResolved, phaseIndex, q1Promoted]);

  return (
    <Container
      secondaryColor={selectedTournament?.secondaryColor || "#FFF"}
      tertiaryColor={selectedTournament?.tertiaryColor || "#FFF"}
      backgroundColor={selectedTournament?.backgroundColor || "#FFF"}
      textColor={selectedTournament?.textColor || "#FFF"}
      twoLegs={twoLegs}
    >
      <nav className="phase-selection">
        <div
          className={`qualifying-phase ${phaseIndex === 0 ? "inactive" : ""}`}
          onClick={PreviousPhase}
        >
          <ArrowLeft />
        </div>

        <h2 className="current-phase">{t(phases[phaseIndex])}</h2>

        <div
          className={`qualifying-phase ${
            !allTiesResolved || phaseIndex === phases.length - 1
              ? "inactive"
              : ""
          }`}
          onClick={() => allTiesResolved && (NextPhase(), console.log(Q2Teams))}
        >
          <ArrowRight />
        </div>
      </nav>

      <section className="matches">
        {Array.from({ length: matchesPerPhase[phaseIndex] }).map((_, i) => {
          const offset = matchesPerPhase[phaseIndex];

          const homeTeam = currentPhase.matches[i];
          const awayTeam =
            currentPhase.matches[i + currentPhase.matches.length / 2];

          const isChampionsQ2 =
            selectedTournament?.name === "Champions League" &&
            phases[phaseIndex] === "2nd Qualifying";

          return (
            <div key={`tie-${i}`}>
              {isChampionsQ2 && i === 0 && (
                <h3 className="path-title">{t("Champions Path")}</h3>
              )}

              {isChampionsQ2 && i === 12 && (
                <h3 className="path-title">{t("League Path")}</h3>
              )}

              <div className="match-block">
                <h3 className="match-title">
                  {t("Match")} {String(i + 1).padStart(2, "0")}
                </h3>

                <Match
                  index={i}
                  homeTeam={homeTeam}
                  awayTeam={awayTeam}
                  homeLogo={getTeamLogo(homeTeam, selectedTeams, selectedLogos)}
                  awayLogo={getTeamLogo(awayTeam, selectedTeams, selectedLogos)}
                  result={currentPhase.results[i]}
                  onResultChange={updateResult}
                />

                {twoLegs && (
                  <Match
                    index={i + offset}
                    homeTeam={awayTeam}
                    awayTeam={homeTeam}
                    homeLogo={getTeamLogo(
                      awayTeam,
                      selectedTeams,
                      selectedLogos
                    )}
                    awayLogo={getTeamLogo(
                      homeTeam,
                      selectedTeams,
                      selectedLogos
                    )}
                    result={currentPhase.results[i + offset]}
                    onResultChange={updateResult}
                  />
                )}
              </div>
            </div>
          );
        })}
      </section>

      <footer className="buttons">
        <Button
          color="blue"
          width="auto"
          borderRadius="4px"
          functionButton={() => Draw()}
          // disabled={currentPhase.matches.length !== 0}
        >
          {t("Draw") + " " + t(phases[phaseIndex])}
        </Button>
      </footer>
    </Container>
  );
}
