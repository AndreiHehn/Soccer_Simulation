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
import { ModalMessage } from "../generic/ModalMessage";

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
    setQ3Teams,
    Q3Teams,
    setUCLPlayoffsTeams,
    UCLPlayoffsTeams,
    startDraw,
    setStartDraw,
    setQualifyedTeams,
    qualifyingState,
    setQualifyingState,
    qualifyingDone,
    setQualifyingDone,
    qualifyedTeams,
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

  const currentPhase: PhaseState = (
    qualifyingState as Record<number, PhaseState>
  )[phaseIndex] ?? {
    matches: [],
    results: {},
    winners: {},
  };

  const [promotedPhases, setPromotedPhases] = useState<number[]>([]);

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
    setQualifyingState((prev) => ({
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

    const phaseName = phases[phaseIndex];
    const isQ2 = phaseName === "2nd Qualifying";
    const isQ3 = phaseName === "3rd Qualifying";
    const isPlayoffs = phaseName === "Playoffs";

    let teamsArray: string[] = [];

    if (phaseName === "1st Qualifying") {
      teamsArray = Q1Teams;
    } else if (phaseName === "2nd Qualifying") {
      teamsArray = Q2Teams;
    } else if (phaseName === "3rd Qualifying") {
      teamsArray = Q3Teams;
    } else if (phaseName === "Playoffs") {
      teamsArray = UCLPlayoffsTeams;
    }

    // ======================================================
    // 🔹 LIBERTADORES – Q2 (potes + ranking + país)
    // ======================================================
    if (isLibertadores && isQ2) {
      const sortedByRanking = [...teamsArray].sort(
        (a, b) => CONMEBOL_Ranking.indexOf(a) - CONMEBOL_Ranking.indexOf(b)
      );

      const half = sortedByRanking.length / 2;
      let pot1 = sortedByRanking.slice(0, half);
      let pot2 = sortedByRanking.slice(half);

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

      // interleia (1º do pote A x 1º do pote B)
      const merged = pot1.flatMap((team, i) => [team, pot2[i]]);

      // evita confrontos do mesmo país
      const matches = buildMatchesAvoidingSameCountry(merged);

      setQualifyingState((prev) => ({
        ...prev,
        [phaseIndex]: {
          matches,
          results: {},
          winners: {},
        },
      }));

      return;
    }

    // ======================================================
    // 🔹 CHAMPIONS LEAGUE – Q2 (Champions Path + League Path)
    // ======================================================
    if (isChampions && (isQ2 || isQ3 || isPlayoffs)) {
      let championsPath: string[] = [];
      let leaguePath: string[] = [];

      if (isQ2) {
        championsPath = [
          ...teamsArray.slice(0, 10), // campeões diretos
          ...teamsArray.slice(16), // vindos do Q1
        ];
        leaguePath = teamsArray.slice(10, 16);
      }
      if (isQ3) {
        championsPath = [
          ...teamsArray.slice(5, 17), // vindos do Q2
        ];
        leaguePath = [...teamsArray.slice(0, 5), ...teamsArray.slice(17, 20)];
      }
      if (isPlayoffs) {
        championsPath = [
          ...teamsArray.slice(0, 10), // vindos do Q2
        ];
        leaguePath = [...teamsArray.slice(10)];
      }

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

      const chHalf = shuffledChampions.length / 2;
      const lgHalf = shuffledLeague.length / 2;

      setQualifyingState((prev) => ({
        ...prev,
        [phaseIndex]: {
          matches: [
            ...shuffledChampions.slice(0, chHalf),
            ...shuffledLeague.slice(0, lgHalf),
            ...shuffledChampions.slice(chHalf),
            ...shuffledLeague.slice(lgHalf),
          ],
          results: {},
          winners: {},
        },
      }));

      return;
    }

    // ======================================================
    // 🔹 LIBERTADORES – Q3 (SEM SORTEIO | 1×8, 2×7, 3×6, 4×5)
    // ======================================================
    if (isLibertadores && isQ3) {
      const ordered = [...Q3Teams];

      const home = [ordered[0], ordered[1], ordered[2], ordered[3]];

      const away = [ordered[7], ordered[6], ordered[5], ordered[4]];

      setQualifyingState((prev) => ({
        ...prev,
        [phaseIndex]: {
          matches: [...home, ...away],
          results: {},
          winners: {},
        },
      }));

      return;
    }

    // ======================================================
    // 🔹 SORTEIO PADRÃO (Q1 e demais casos)
    // ======================================================
    const shuffled = [...teamsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setQualifyingState((prev) => ({
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

    setQualifyingState((prev) => ({
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

    const winners = Object.values(currentPhase.winners) as string[];

    // 🔹 Q1 → Q2
    if (phaseIndex === 0 && !promotedPhases.includes(0)) {
      setQ2Teams((prev) => [...prev, ...winners]);
      setPromotedPhases((prev) => [...prev, 0]);
      return;
    }

    // 🔹 Q2 → Q3
    if (phaseIndex === 1 && !promotedPhases.includes(1)) {
      setQ3Teams((prev) => [...prev, ...winners]);
      setPromotedPhases((prev) => [...prev, 1]);
      return;
    }

    // 🔹 Q3 → Playoffs (Champions League)
    if (
      phaseIndex === 2 &&
      selectedTournament?.name === "Champions League" &&
      !promotedPhases.includes(2)
    ) {
      setUCLPlayoffsTeams((prev) => [...prev, ...winners]);
      setPromotedPhases((prev) => [...prev, 2]);
      return;
    }

    // 🔹 Q3 → Group Stage (Libertadores)
    if (
      phaseIndex === 2 &&
      selectedTournament?.name === "Libertadores" &&
      !qualifyingDone
    ) {
      setQualifyedTeams((prev) => [...prev, ...winners]);
      setQualifyingDone(true);
      return;
    }

    // 🔹 Playoffs → Group Stage (Champions League) ✅ AQUI ESTAVA O BUG
    if (
      phaseIndex === 3 &&
      selectedTournament?.name === "Champions League" &&
      !qualifyingDone
    ) {
      setQualifyedTeams((prev) => [...prev, ...winners]);
      setQualifyingDone(true);
      console.log("AAAAAAAAAAAAA");
    }
  }, [
    allTiesResolved,
    phaseIndex,
    promotedPhases,
    qualifyingDone,
    selectedTournament,
  ]);

  useEffect(() => {
    if (qualifyedTeams.length > 0) {
      console.log("qualifyiedTeams atualizado:", qualifyedTeams);
    }
  }, [qualifyedTeams]);

  return (
    <Container
      secondaryColor={selectedTournament?.secondaryColor || "#FFF"}
      tertiaryColor={selectedTournament?.tertiaryColor || "#FFF"}
      backgroundColor={selectedTournament?.backgroundColor || "#FFF"}
      textColor={selectedTournament?.textColor || "#FFF"}
      tournamentName={selectedTournament?.name || ""}
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
          onClick={() => allTiesResolved && NextPhase()}
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

          const isChampionsQ3 =
            selectedTournament?.name === "Champions League" &&
            phases[phaseIndex] === "3rd Qualifying";

          const isChampionsPlayoffs =
            selectedTournament?.name === "Champions League" &&
            phases[phaseIndex] === "Playoffs";

          return (
            <div key={`tie-${i}`}>
              {(isChampionsQ2 || isChampionsQ3 || isChampionsPlayoffs) &&
                i === 0 && (
                  <h3 className="path-title">{t("Champions Path")}</h3>
                )}

              {isChampionsQ2 && i === 12 && (
                <h3 className="path-title">{t("League Path")}</h3>
              )}

              {isChampionsQ3 && i === 6 && (
                <h3 className="path-title">{t("League Path")}</h3>
              )}

              {isChampionsPlayoffs && i === 5 && (
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
                  <div className="second-leg-wrapper">
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
                    {currentPhase.winners[i] && (
                      <div
                        className={`tie-winner-indicator ${
                          currentPhase.winners[i] === awayTeam
                            ? "winner-away"
                            : "winner-home"
                        }`}
                      >
                        {currentPhase.winners[i]}
                      </div>
                    )}
                  </div>
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
          functionButton={() => setStartDraw(true)}
          disabled={currentPhase.matches.length !== 0}
        >
          {t("Draw") + " " + t(phases[phaseIndex])}
        </Button>
      </footer>
      {startDraw && (
        <ModalMessage
          textMessage={t("Do you want to draw the current phase?")}
          onClick1={() => setStartDraw(false)}
          textButton1={t("Cancel")}
          onClick2={() => (Draw(), setStartDraw(false))}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
    </Container>
  );
}
