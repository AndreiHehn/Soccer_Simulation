import { useContext } from "react";
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
  const { selectedTournament, matchResults, setMatchResults, matchdayNumber } =
    useContext(AppContext);

  const homeGoals = matchResults?.[matchdayNumber]?.[index]?.home ?? "";
  const awayGoals = matchResults?.[matchdayNumber]?.[index]?.away ?? "";

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
          type="text"
          className="home-goals"
          value={homeGoals}
          onChange={(e) => {
            const value = e.target.value;

            // permite vazio
            if (value === "") {
              handleResultChange(index, "home", "");
              return;
            }

            // aceita apenas números 0–9
            if (/^\d+$/.test(value)) {
              handleResultChange(index, "home", value);
            }
          }}
          onKeyDown={(e) => {
            // bloqueia tudo que não for número, backspace ou delete
            if (
              !/^[0-9]$/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete" &&
              e.key !== "Tab" &&
              e.key !== "ArrowLeft" &&
              e.key !== "ArrowRight"
            ) {
              e.preventDefault();
            }
          }}
        />

        <div className="separator">-</div>
        <input
          type="text"
          className="away-goals"
          value={awayGoals}
          onChange={(e) => {
            const value = e.target.value;

            // permite vazio
            if (value === "") {
              handleResultChange(index, "away", "");
              return;
            }

            // aceita apenas números 0–9
            if (/^\d+$/.test(value)) {
              handleResultChange(index, "away", value);
            }
          }}
          onKeyDown={(e) => {
            // bloqueia tudo que não for número, backspace ou delete
            if (
              !/^[0-9]$/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete" &&
              e.key !== "Tab" &&
              e.key !== "ArrowLeft" &&
              e.key !== "ArrowRight"
            ) {
              e.preventDefault();
            }
          }}
        />
      </div>

      <div className="away-team">
        <img src={awayLogo} className="away-team-logo" />
        <h2 className="away-team-name">{awayTeam}</h2>
      </div>
    </Container>
  );
}
