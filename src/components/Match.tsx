import { useContext } from "react";
import { Container } from "../styles/Match";
import { AppContext } from "../lib/context";

import Arsenal_logo from "../assets/icons/teams logos/England/Arsenal_logo.png";
import AstonVilla_logo from "../assets/icons/teams logos/England/AstonVilla_logo.png";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
}

export default function Match({ homeTeam, awayTeam }: MatchProps) {
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
        <img src={Arsenal_logo} className="home-team-logo" />
      </div>
      <div className="results-container">
        <input type="number" className="home-goals" />
        <div className="separator">-</div>
        <input type="number" className="away-goals" />
      </div>
      <div className="away-team">
        <img src={AstonVilla_logo} className="away-team-logo" />
        <h2 className="away-team-name">{awayTeam}</h2>
      </div>
    </Container>
  );
}
