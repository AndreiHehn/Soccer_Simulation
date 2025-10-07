import { useTranslation } from "react-i18next";
import { Container } from "../styles/Tournament";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "../lib/context";
import { TeamSelector } from "./TeamSelector";

// importa listas de times (exemplo)
import { PremierLeagueList } from "../lib/tournaments/PremierLeague";

export default function Tournament() {
  const { t } = useTranslation();
  const { selectedTournament, tournamentStep, setTournamentStep } =
    useContext(AppContext);

  // Estado local do time selecionado
  const [selectedTeam, setSelectedTeam] = useState("");

  // Mapeia as equipes com base no torneio selecionado
  const teams = useMemo(() => {
    if (!selectedTournament) return [];
    switch (selectedTournament.id) {
      case "premier_league":
        return PremierLeagueList;
      default:
        return [];
    }
  }, [selectedTournament]);

  // Limpa o time ao trocar de torneio
  useMemo(() => {
    setSelectedTeam("");
  }, [selectedTournament]);

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

      <TeamSelector
        selectedTournament={selectedTournament}
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
        teams={teams}
      />
    </Container>
  );
}
