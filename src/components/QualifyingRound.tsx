import { useContext, useEffect, useState } from "react";
import { Container } from "../styles/QualifyingRound";
import { AppContext } from "../lib/context";
import ArrowLeft from "../assets/icons/arrowLeftIcon.svg?react";
import ArrowRight from "../assets/icons/arrowRightIcon.svg?react";
import Match from "./Match";
import { useTranslation } from "react-i18next";
import { Button } from "../generic/Button";

interface Props {
  phases: string[];
  matchesPerPhase: number[];
  twoLegs?: boolean;
}

interface MatchResult {
  home?: number;
  away?: number;
}

export default function QualifyingRound({
  phases,
  matchesPerPhase,
  twoLegs,
}: Props) {
  const { selectedTournament, Q1Teams, selectedLogos, selectedTeams } =
    useContext(AppContext);
  const [results, setResults] = useState<Record<number, MatchResult>>({});
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const { t } = useTranslation();

  const [Q1Matches, setQ1Matches] = useState<Array<string>>([]);
  const [Q1Winners, setQ1Winners] = useState<Record<number, string | null>>({});

  function NextPhase() {
    if (phaseIndex < phases.length - 1) {
      setPhaseIndex(phaseIndex + 1);
    }
  }

  function PreviousPhase() {
    if (phaseIndex != 0) {
      setPhaseIndex(phaseIndex - 1);
    }
  }

  function updateResult(index: number, team: "home" | "away", value?: number) {
    setResults((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [team]: value,
      },
    }));
  }

  function getTeamLogo(
    teamName: string | undefined,
    teams: string[],
    logos: string[]
  ): string {
    if (!teamName) return "";

    const index = teams.indexOf(teamName);
    if (index === -1) return "";

    return logos[index] ?? "";
  }

  function DrawQ1(array: string[]): void {
    const result = [...array]; // copia o array
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    setQ1Matches(result);
  }

  function calculateWinner(matchIndex: number) {
    const offset = matchesPerPhase[phaseIndex];

    const firstLeg = results[matchIndex]; // ida
    const secondLeg = results[matchIndex + offset]; // volta

    if (!firstLeg || !secondLeg) return;

    if (
      firstLeg.home == null ||
      firstLeg.away == null ||
      secondLeg.home == null ||
      secondLeg.away == null
    ) {
      return;
    }

    const homeTeam = Q1Matches[matchIndex];
    const awayTeam = Q1Matches[matchIndex + Q1Matches.length / 2];

    // 🔹 GOLS AGREGADOS
    const homeAggregate = firstLeg.home + secondLeg.away;
    const awayAggregate = firstLeg.away + secondLeg.home;

    let winner: string | null = null;

    // 1️⃣ Vitória direta no agregado
    if (homeAggregate > awayAggregate) {
      winner = homeTeam;
    } else if (awayAggregate > homeAggregate) {
      winner = awayTeam;
    } else {
      // 2️⃣ REGRA DO GOL FORA
      const homeAwayGoals = secondLeg.away; // Time da ida jogando fora na volta
      const awayAwayGoals = firstLeg.away; // Time da volta jogando fora na ida

      if (homeAwayGoals > awayAwayGoals) {
        winner = homeTeam;
      } else if (awayAwayGoals > homeAwayGoals) {
        winner = awayTeam;
      }
    }

    // 3️⃣ Empate total → pênaltis (não define ainda)
    if (!winner) {
      setQ1Winners((prev) => ({
        ...prev,
        [matchIndex]: null,
      }));
      return;
    }

    setQ1Winners((prev) => ({
      ...prev,
      [matchIndex]: winner,
    }));
  }

  useEffect(() => {
    for (let i = 0; i < matchesPerPhase[phaseIndex]; i++) {
      calculateWinner(i);
    }
  }, [results, phaseIndex]);

  const allTiesResolved =
    Object.keys(Q1Winners).length === matchesPerPhase[phaseIndex] &&
    Object.values(Q1Winners).every((winner) => winner !== null);

  return (
    <Container
      secondaryColor={selectedTournament?.secondaryColor || "#FFFFFF"}
      tertiaryColor={selectedTournament?.tertiaryColor || "#FFFFFF"}
      backgroundColor={selectedTournament?.backgroundColor || "#FFFFFF"}
      textColor={selectedTournament?.textColor || "#FFFFFF"}
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
            phaseIndex === phases.length - 1 || !allTiesResolved
              ? "inactive"
              : ""
          }`}
          onClick={() => {
            if (allTiesResolved) NextPhase();
          }}
        >
          <ArrowRight />
        </div>
      </nav>
      <section className="matches">
        <h2 className="leg">{t("First Leg")}</h2>
        {Array.from({ length: matchesPerPhase[phaseIndex] }).map((_, i) => (
          <Match
            key={`first-${i}`}
            index={i}
            homeTeam={Q1Matches[i]}
            awayTeam={Q1Matches[i + Q1Matches.length / 2]}
            homeLogo={getTeamLogo(Q1Matches[i], selectedTeams, selectedLogos)}
            awayLogo={getTeamLogo(
              Q1Matches[i + Q1Matches.length / 2],
              selectedTeams,
              selectedLogos
            )}
            result={results[i]}
            onResultChange={updateResult}
          />
        ))}
        <h2 className="leg">{t("Second Leg")}</h2>
        {twoLegs &&
          Array.from({ length: matchesPerPhase[phaseIndex] }).map((_, i) => {
            const offset = matchesPerPhase[phaseIndex];

            return (
              <Match
                key={`second-${i}`}
                index={i + offset}
                homeTeam={Q1Matches[i + Q1Matches.length / 2]}
                awayTeam={Q1Matches[i]}
                homeLogo={getTeamLogo(
                  Q1Matches[i + Q1Matches.length / 2],
                  selectedTeams,
                  selectedLogos
                )}
                awayLogo={getTeamLogo(
                  Q1Matches[i],
                  selectedTeams,
                  selectedLogos
                )}
                result={results[i + offset]}
                onResultChange={updateResult}
              />
            );
          })}
      </section>
      <footer className="buttons">
        <Button
          color="blue"
          width="auto"
          borderRadius="4px"
          functionButton={() => DrawQ1(Q1Teams)}
          disabled={Q1Matches.length != 0}
        >
          {t("Draw") + " " + t(phases[phaseIndex])}
        </Button>
      </footer>
    </Container>
  );
}
