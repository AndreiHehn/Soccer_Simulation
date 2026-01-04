import { useContext, useState } from "react";
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

export default function QualifyingRound({
  phases,
  matchesPerPhase,
  twoLegs,
}: Props) {
  const { selectedTournament } = useContext(AppContext);
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const { t } = useTranslation();

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
            phaseIndex === phases.length - 1 ? "inactive" : ""
          }`}
          onClick={NextPhase}
        >
          <ArrowRight />
        </div>
      </nav>
      <section className="matches">
        <h2 className="leg">{t("First Leg")}</h2>
        {Array.from({ length: matchesPerPhase[phaseIndex] }).map((_, i) => (
          <Match key={`first-${i}`} />
        ))}
        <h2 className="leg">{t("Second Leg")}</h2>
        {twoLegs &&
          Array.from({ length: matchesPerPhase[phaseIndex] }).map((_, i) => (
            <Match key={`second-${i}`} />
          ))}
      </section>
      <footer className="buttons">
        <Button
          color="blue"
          width="100px"
          borderRadius="4px"
          onClick={() => console.log("TESTE")}
        >
          {t("Draw")}
        </Button>
      </footer>
    </Container>
  );
}
