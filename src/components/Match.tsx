import { useContext } from "react";
import { Container } from "../styles/Match";
import { AppContext } from "../lib/context";

interface MatchProps {
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  index: number;

  result?: {
    home?: number;
    away?: number;
  };
  onResultChange?: (
    index: number,
    team: "home" | "away",
    value: number | undefined
  ) => void;
}

export default function Match({
  homeTeam,
  homeLogo,
  awayTeam,
  awayLogo,
  index,
  result,
  onResultChange,
}: MatchProps) {
  const { selectedTournament, matchResults, setMatchResults, matchdayNumber } =
    useContext(AppContext);

  const homeGoals = onResultChange
    ? result?.home ?? ""
    : matchResults?.[matchdayNumber]?.[index]?.home ?? "";

  const awayGoals = onResultChange
    ? result?.away ?? ""
    : matchResults?.[matchdayNumber]?.[index]?.away ?? "";

  function updateFromContext(team: "home" | "away", value: string) {
    setMatchResults((prev) => ({
      ...prev,
      [matchdayNumber]: {
        ...prev?.[matchdayNumber],
        [index]: {
          ...prev?.[matchdayNumber]?.[index],
          [team]: value,
        },
      },
    }));
  }

  function handleChange(team: "home" | "away", value: string) {
    if (!onResultChange) {
      updateFromContext(team, value);
      return;
    }

    if (value === "") {
      onResultChange(index, team, undefined);
      return;
    }

    if (/^\d+$/.test(value)) {
      onResultChange(index, team, Number(value));
    }
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
        {homeLogo && <img src={homeLogo} className="home-team-logo" />}
      </div>

      <div className="results-container">
        <input
          type="text"
          className="home-goals"
          value={homeGoals}
          onChange={(e) => handleChange("home", e.target.value)}
        />

        <div className="separator">-</div>

        <input
          type="text"
          className="away-goals"
          value={awayGoals}
          onChange={(e) => handleChange("away", e.target.value)}
        />
      </div>

      <div className="away-team">
        {awayLogo && <img src={awayLogo} className="away-team-logo" />}
        <h2 className="away-team-name">{awayTeam}</h2>
      </div>
    </Container>
  );
}
