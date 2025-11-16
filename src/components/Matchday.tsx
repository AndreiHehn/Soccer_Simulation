import { useContext } from "react";
import { Container } from "../styles/Matchday";
import Match from "./Match";
import { AppContext } from "../lib/context";

export default function Matchday() {
  const { matchdayNumber, selectedLogos, scheduleRef, selectedTeams } =
    useContext(AppContext);

  const currentMatchday = scheduleRef.current
    ? scheduleRef.current[matchdayNumber - 1]
    : [];

  return (
    <Container>
      {currentMatchday.map((match, index) => {
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
