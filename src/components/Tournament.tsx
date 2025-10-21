import { useTranslation } from "react-i18next";
import { Container } from "../styles/Tournament";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "../lib/context";
import { TeamSelector } from "./TeamSelector";

// importa listas de times
import { PremierLeagueList } from "../lib/tournaments/PremierLeague";
import { LaLigaList } from "../lib/tournaments/LaLiga";
import { SerieAList } from "../lib/tournaments/SerieA";
import { BundesligaList } from "../lib/tournaments/Bundesliga";
import { Ligue1List } from "../lib/tournaments/Ligue1";
import { BrasileirãoList } from "../lib/tournaments/Brasileirão";

export default function Tournament() {
  const { t } = useTranslation();
  const { selectedTournament, tournamentStep, setTournamentStep } =
    useContext(AppContext);

  // Estado local do time selecionado
  const [, setSelectedTeam] = useState("");

  // Times selecionados
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]); // Preenche o array completo (com undefined)
  const selectedCount = selectedTeams.filter(Boolean).length; // Apenas times selecionados

  // Mapeia as equipes com base no torneio selecionado
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
      case "brasileirao":
        return BrasileirãoList;
      default:
        return [];
    }
  }, [selectedTournament]);

  // Limpa o time ao trocar de torneio
  useMemo(() => {
    setSelectedTeam("");
  }, []);

  function handleSelectTeam(index: number, teamId: string) {
    setSelectedTeams((prev) => {
      const newTeams = [...prev];
      newTeams[index] = teamId;
      return newTeams;
    });
  }

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
              className={`step ${tournamentStep === step ? "active" : ""} ${
                selectedTournament != null &&
                step != "Teams Selection" &&
                selectedCount < selectedTournament?.teams
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                selectedCount == selectedTournament?.teams &&
                setTournamentStep(step)
              }
            >
              <h3 className="step-name">{t(step)}</h3>
              <hr className="selected-step" />
            </div>
          )
        )}
        <p>{selectedCount}</p>
      </nav>

      {tournamentStep === "Teams Selection" && selectedTournament && (
        <>
          <section className="teams-selection">
            {[...Array(selectedTournament.teams)].map((_, index) => (
              <TeamSelector
                key={index}
                selectedTournament={selectedTournament}
                selectedTeam={selectedTeams[index]}
                onSelectTeam={(teamId) => handleSelectTeam(index, teamId)}
                teams={teams}
                disabledTeams={selectedTeams.filter((_, i) => i !== index)} //
              />
            ))}
          </section>
        </>
      )}
    </Container>
  );
}
