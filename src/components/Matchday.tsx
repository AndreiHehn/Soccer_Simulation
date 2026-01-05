import { useContext, useEffect } from "react";
import { Container } from "../styles/Matchday";
import Match from "./Match";
import { AppContext } from "../lib/context";

export default function Matchday() {
  const {
    matchdayNumber,
    selectedLogos,
    scheduleRef,
    selectedTeams,
    matchResults,
    setStandings,
    activeTournament,
  } = useContext(AppContext);

  const currentMatchday = scheduleRef.current
    ? scheduleRef.current[matchdayNumber - 1]
    : [];

  function recalculateStandings() {
    const table = selectedTeams.map((team, i) => ({
      team,
      logo: selectedLogos[i] ?? "",
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      history: [] as string[],
      lastFive: [] as string[],
    }));

    // 🔥 Percorre TODAS as rodadas preenchidas
    for (const [day, results] of Object.entries(matchResults)) {
      const dayIndex = Number(day) - 1;
      const matchesOfDay = scheduleRef.current?.[dayIndex] ?? [];

      for (const [matchIndex, result] of Object.entries(results)) {
        const match = matchesOfDay[Number(matchIndex)];
        if (!match) continue;

        const hg = Number(result.home);
        const ag = Number(result.away);
        if (isNaN(hg) || isNaN(ag)) continue;

        const homeIdx = selectedTeams.indexOf(match.home);
        const awayIdx = selectedTeams.indexOf(match.away);

        const H = table[homeIdx];
        const A = table[awayIdx];

        // Stats básicos
        H.played++;
        A.played++;

        H.goalsFor += hg;
        H.goalsAgainst += ag;

        A.goalsFor += ag;
        A.goalsAgainst += hg;

        H.goalDifference = H.goalsFor - H.goalsAgainst;
        A.goalDifference = A.goalsFor - A.goalsAgainst;

        if (hg > ag) {
          H.wins++;
          H.points += 3;
          A.losses++;
          H.history.push("W");
          A.history.push("L");
        } else if (ag > hg) {
          A.wins++;
          A.points += 3;
          H.losses++;
          A.history.push("W");
          H.history.push("L");
        } else {
          H.draws++;
          A.draws++;
          H.points++;
          A.points++;
          H.history.push("D");
          A.history.push("D");
        }
      }
    }

    // 🔥 Ordenação oficial
    table.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference)
        return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.localeCompare(b.team);
    });

    // 🔥 Last 5 (sempre estável)
    table.forEach((entry) => {
      entry.lastFive = entry.history.slice(-5);
    });

    setStandings(table);
  }

  useEffect(() => {
    recalculateStandings();
  }, [matchResults, matchdayNumber]);

  return (
    <Container>
      {activeTournament &&
        currentMatchday.map((match, index) => {
          const homeIndex = selectedTeams.indexOf(match.home);
          const awayIndex = selectedTeams.indexOf(match.away);

          const homeLogo = selectedLogos[homeIndex] || "";
          const awayLogo = selectedLogos[awayIndex] || "";

          return (
            <Match
              key={index}
              index={index}
              homeTeam={match.home}
              awayTeam={match.away}
              homeLogo={homeLogo}
              awayLogo={awayLogo}
            />
          );
        })}
    </Container>
  );
}
