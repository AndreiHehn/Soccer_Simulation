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

// importa listas de times
import { PremierLeagueList } from "../lib/tournaments/PremierLeague";
import { LaLigaList } from "../lib/tournaments/LaLiga";
import { SerieAList } from "../lib/tournaments/SerieA";
import { BundesligaList } from "../lib/tournaments/Bundesliga";
import { Ligue1List } from "../lib/tournaments/Ligue1";
import { BrasileirãoList } from "../lib/tournaments/Brasileirão";

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
  } = useContext(AppContext);

  const [, setSelectedTeam] = useState(""); // Estado local do time selecionado
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

  useEffect(() => {
    setTeams(teams);
  }, [teams, setTeams]);

  // Limpa o time ao trocar de torneio
  useMemo(() => {
    setSelectedTeam("");
  }, []);

  function handleSelectTeam(index: number, teamId: string) {
    const selected = teams.find((t) => t.id === teamId);
    const teamName = selected ? selected.name : "";
    const teamLogo = selected ? selected.logo : "";

    setSelectedTeams((prev) => {
      const newTeams = [...prev];
      newTeams[index] = teamName;
      return newTeams;
    });

    setSelectedLogos((prev) => {
      const newLogos = [...prev];
      newLogos[index] = teamLogo;
      return newLogos;
    });
  }

  function PreviousMatchday() {
    if (matchdayNumber > 1) {
      setMatchdayNumber(matchdayNumber - 1);
    }
  }

  function NextMatchday() {
    if (selectedTournament != undefined) {
      if (matchdayNumber < (selectedTournament.teams - 1) * 2) {
        setMatchdayNumber(matchdayNumber + 1);
      }
    }
  }

  return (
    <Container
      secondaryColor={
        selectedTournament != null
          ? selectedTournament.secondaryColor
          : "#FFFFFF"
      }
      tertiaryColor={
        selectedTournament != null
          ? selectedTournament.tertiaryColor
          : "#FFFFFF"
      }
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
          <footer className="footer-buttons">
            <Button
              color="gray"
              borderRadius="6px"
              height="35px"
              functionButton={() => setConfirmTeams(true)}
              disabled={selectedCount != selectedTournament.teams}
            >
              {t("Generate Tournament")}
            </Button>
            <Button
              color="gray"
              borderRadius="6px"
              height="35px"
              functionButton={() => setLoadDefaultTeams(true)}
              disabled={activeTournament == true}
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
      {tournamentStep == "Matches" && selectedTournament && (
        <>
          <nav className="matchday">
            <div
              className={`previous-matchday ${
                matchdayNumber == 1 ? "inactive" : ""
              }`}
              onClick={PreviousMatchday}
            >
              <ArrowLeft></ArrowLeft>
            </div>
            <h3 className="matchday-number">
              {t("Matchday")} {matchdayNumber < 10 && "0"}
              {matchdayNumber}
            </h3>
            <div
              className={`next-matchday ${
                matchdayNumber == (selectedTournament.teams - 1) * 2
                  ? "inactive"
                  : ""
              }`}
              onClick={NextMatchday}
            >
              <ArrowRight></ArrowRight>
            </div>
          </nav>
          <div className="matches">
            <Matchday></Matchday>
          </div>
        </>
      )}
      {tournamentStep == "Standings" && selectedTournament && (
        <Standings></Standings>
      )}
    </Container>
  );
}
