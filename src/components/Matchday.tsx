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
    // base zerada
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
    }));

    // percorre TODAS as rodadas já preenchidas
    Object.entries(matchResults).forEach(([day, results]) => {
      const matchdayIdx = Number(day) - 1;
      const matchday = scheduleRef.current?.[matchdayIdx] ?? [];

      Object.entries(results).forEach(([matchIndex, result]) => {
        const { home, away } = result;
        if (home === "" || away === "") return;

        const match = matchday[Number(matchIndex)];
        if (!match) return;

        const homeIdx = selectedTeams.indexOf(match.home);
        const awayIdx = selectedTeams.indexOf(match.away);

        const hg = Number(home);
        const ag = Number(away);

        const H = table[homeIdx];
        const A = table[awayIdx];

        // Stats
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
        } else if (ag > hg) {
          A.wins++;
          A.points += 3;
          H.losses++;
        } else {
          H.draws++;
          A.draws++;
          H.points++;
          A.points++;
        }
      });
    });

    // 🔥 ORDENAÇÃO
    table.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference)
        return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.localeCompare(b.team);
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
