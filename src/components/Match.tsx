import { useContext, useEffect } from "react";
import { Container } from "../styles/Match";
import { AppContext } from "../lib/context";

interface MatchProps {
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  index: number;
}

export default function Match({
  homeTeam,
  homeLogo,
  awayTeam,
  awayLogo,
  index,
}: MatchProps) {
  const {
    selectedTournament,
    standings,
    setStandings,
    matchResults,
    setMatchResults,
    matchdayNumber,
  } = useContext(AppContext);

  const homeGoals = matchResults?.[matchdayNumber]?.[index]?.home ?? "";
  const awayGoals = matchResults?.[matchdayNumber]?.[index]?.away ?? "";

  // Atualiza standings quando resultados mudam
  useEffect(() => {
    if (homeGoals === "" || awayGoals === "") return;
    updateStandings();
  }, [homeGoals, awayGoals]);

  // ---------------------------------------------------------
  // REMOVE resultado anterior da tabela
  // ---------------------------------------------------------
  function removePreviousResult(updated) {
    const old = matchResults?.[matchdayNumber]?.[index];
    if (!old || old.home === undefined || old.away === undefined)
      return updated;

    const oldHomeGoals = Number(old.home);
    const oldAwayGoals = Number(old.away);

    const homeIdx = updated.findIndex((t) => t.team === homeTeam);
    const awayIdx = updated.findIndex((t) => t.team === awayTeam);

    if (homeIdx === -1 || awayIdx === -1) return updated;

    const home = updated[homeIdx];
    const away = updated[awayIdx];

    // Reverte estatísticas básicas
    home.played -= 1;
    away.played -= 1;

    home.goalsFor -= oldHomeGoals;
    home.goalsAgainst -= oldAwayGoals;

    away.goalsFor -= oldAwayGoals;
    away.goalsAgainst -= oldHomeGoals;

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;

    // Reverte pontos
    if (oldHomeGoals > oldAwayGoals) {
      home.wins -= 1;
      home.points -= 3;
      away.losses -= 1;
    } else if (oldAwayGoals > oldHomeGoals) {
      away.wins -= 1;
      away.points -= 3;
      home.losses -= 1;
    } else {
      home.draws -= 1;
      away.draws -= 1;
      home.points -= 1;
      away.points -= 1;
    }

    return updated;
  }

  // ---------------------------------------------------------
  // ADICIONA resultado novo
  // ---------------------------------------------------------
  function updateStandings() {
    let updated = standings.map((t) => ({ ...t }));

    updated = removePreviousResult(updated);

    const homeIdx = updated.findIndex((t) => t.team === homeTeam);
    const awayIdx = updated.findIndex((t) => t.team === awayTeam);

    if (homeIdx === -1 || awayIdx === -1) return;

    const home = updated[homeIdx];
    const away = updated[awayIdx];

    const hg = Number(homeGoals);
    const ag = Number(awayGoals);

    // Adiciona base
    home.played += 1;
    away.played += 1;

    home.goalsFor += hg;
    home.goalsAgainst += ag;

    away.goalsFor += ag;
    away.goalsAgainst += hg;

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;

    // pontos
    if (hg > ag) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (ag > hg) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }

    setStandings(updated);
  }

  // ---------------------------------------------------------
  // Salva o resultado no contexto
  // ---------------------------------------------------------
  function handleResultChange(
    matchIndex: number,
    team: "home" | "away",
    value: string
  ) {
    setMatchResults((prev) => ({
      ...prev,
      [matchdayNumber]: {
        ...prev?.[matchdayNumber],
        [matchIndex]: {
          ...prev?.[matchdayNumber]?.[matchIndex],
          [team]: value,
        },
      },
    }));
  }

  return (
    <Container
      primaryColor={selectedTournament?.primaryColor ?? ""}
      secondaryColor={selectedTournament?.secondaryColor ?? ""}
      matchBackground={selectedTournament?.tertiaryColor ?? ""}
      textColor={selectedTournament?.textColor ?? ""}
    >
      <div className="home-team">
        <h2 className="home-team-name">{homeTeam}</h2>
        <img src={homeLogo} className="home-team-logo" />
      </div>

      <div className="results-container">
        <input
          type="number"
          className="home-goals"
          value={homeGoals}
          onChange={(e) => handleResultChange(index, "home", e.target.value)}
        />
        <div className="separator">-</div>
        <input
          type="number"
          className="away-goals"
          value={awayGoals}
          onChange={(e) => handleResultChange(index, "away", e.target.value)}
        />
      </div>

      <div className="away-team">
        <img src={awayLogo} className="away-team-logo" />
        <h2 className="away-team-name">{awayTeam}</h2>
      </div>
    </Container>
  );
}
