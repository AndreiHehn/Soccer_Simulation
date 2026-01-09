import { useContext } from "react";
import { Container, ScrollWrapper } from "../styles/Standings";
import { AppContext } from "../lib/context";
import { useTranslation } from "react-i18next";

export default function Standings() {
  const { selectedTournament, activeTournament, standings } =
    useContext(AppContext);
  const { t } = useTranslation();

  const StandingsInfo = [
    "detail",
    "#",
    "Team",
    "PL",
    "W",
    "D",
    "L",
    "GF",
    "GA",
    "GD",
    "Last 5",
    "PTS",
  ];

  return (
    <ScrollWrapper
      backgroundColor={selectedTournament?.backgroundColor || "#FFFFFF"}
      teamsAmount={selectedTournament?.teams || 0}
    >
      <Container
        secondaryColor={selectedTournament?.secondaryColor || "#FFFFFF"}
        tertiaryColor={selectedTournament?.tertiaryColor || "#FFFFFF"}
        backgroundColor={selectedTournament?.backgroundColor || "#FFFFFF"}
        textColor={selectedTournament?.textColor || "#FFFFFF"}
      >
        <tr className="standings-header">
          {StandingsInfo.map((item) => (
            <th key={item} className="header-item" id={`${item}-column`}>
              {item != "detail" && t(item)}
            </th>
          ))}
        </tr>

        {activeTournament &&
          selectedTournament?.type == "National League" &&
          standings.map((team, index) => (
            <tr key={team.team} className="standings">
              <td className="standings-detail">
                <div
                  className={(() => {
                    if (!selectedTournament) return "";

                    const q = selectedTournament.qualified ?? [];
                    const relegated = selectedTournament.relegated ?? 0;
                    const totalTeams = selectedTournament.teams;

                    const qtPrimary = q[0] ?? 0;
                    const qtSecondary = q[1] ?? 0;

                    // Relegated Teams
                    if (index >= totalTeams - relegated) {
                      return "detail relegated";
                    }

                    // Main Competition (Champions, Libertadores)
                    if (index < qtPrimary) {
                      return "detail primaryTournament";
                    }

                    // Secondary Competition (Europa League, Sudamericana)
                    if (index >= qtPrimary && index < qtPrimary + qtSecondary) {
                      return "detail secondaryTournament";
                    }

                    return "";
                  })()}
                ></div>
              </td>
              <td className="standings-points">{index + 1}</td>

              <td className="standings-teams">
                <img src={team.logo} className="team-logo" alt="" />
                <h2 className="team-name">{team.team}</h2>
              </td>

              <td className="standings-info">{team.played}</td>
              <td className="standings-info">{team.wins}</td>
              <td className="standings-info">{team.draws}</td>
              <td className="standings-info">{team.losses}</td>
              <td className="standings-info">{team.goalsFor}</td>
              <td className="standings-info">{team.goalsAgainst}</td>
              <td className="standings-info">{team.goalDifference}</td>
              <td className="standings-last5">
                {team.lastFive?.map((r, i) => (
                  <span key={i} className={`result-${r}`}>
                    <span className="resultText">{r}</span>
                  </span>
                ))}
              </td>

              <td className="standings-info">{team.points}</td>
            </tr>
          ))}
      </Container>
    </ScrollWrapper>
  );
}
