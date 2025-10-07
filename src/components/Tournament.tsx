import { useTranslation } from "react-i18next";
import { Container } from "../styles/Tournament";
import { useContext } from "react";
import { AppContext } from "../lib/context";

export default function Tournament() {
  const { t } = useTranslation();
  const { selectedTournament, tournamentStep, setTournamentStep } =
    useContext(AppContext);

  return (
    <Container
      backgroundColor={
        selectedTournament != null
          ? selectedTournament.backgroundColor
          : "#FFFFFF"
      }
      textColor={
        selectedTournament != null ? selectedTournament.textColor : "#FFFFFF"
      }
    >
      <nav className="steps-nav">
        {["Teams Selection", "Matches", "Standings", "Statistics"].map(
          (step) => (
            <div
              key={step}
              className={`step ${tournamentStep === step ? "active" : ""}`}
              onClick={() => setTournamentStep(step)}
            >
              <h3 className="step-name">{t(step)}</h3>
              <hr className="selected-step" />
            </div>
          )
        )}
      </nav>
    </Container>
  );
}
