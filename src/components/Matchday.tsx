import { useContext } from "react";
import { Container } from "../styles/Matchday";
import Match from "./Match";
import { AppContext } from "../lib/context";

export default function Matchday() {
  const { selectedTournament } = useContext(AppContext);

  return (
    <Container>
      {[...Array(Math.floor((selectedTournament?.teams ?? 0) / 2))].map(
        (_, index) => (
          <Match key={index} homeTeam="Chelsea" awayTeam="Manchester United" />
        )
      )}
    </Container>
  );
}
