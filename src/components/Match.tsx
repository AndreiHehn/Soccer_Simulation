import { useContext } from "react";
import { Container } from "../styles/Match";
import { AppContext } from "../lib/context";

interface MatchProps {
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
}

export default function Match({
  homeTeam,
  homeLogo,
  awayTeam,
  awayLogo,
}: MatchProps) {
  const { selectedTournament } = useContext(AppContext);
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
        <input type="number" className="home-goals" />
        <div className="separator">-</div>
        <input type="number" className="away-goals" />
      </div>
      <div className="away-team">
        <img src={awayLogo} className="away-team-logo" />
        <h2 className="away-team-name">{awayTeam}</h2>
      </div>
    </Container>
  );
}
