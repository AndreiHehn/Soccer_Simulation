import { useContext } from "react";
import { Container } from "../styles/Standings";
import { AppContext } from "../lib/context";
import { useTranslation } from "react-i18next";

export default function Standings() {
  const { selectedTournament, selectedTeams, selectedLogos, activeTournament } =
    useContext(AppContext);
  const { t } = useTranslation();

  const StandingsInfo = [
    "POS",
    "Team",
    "PL",
    "W",
    "D",
    "L",
    "GF",
    "GA",
    "GD",
    "PTS",
  ];

  return (
    <Container
      secondaryColor={selectedTournament?.secondaryColor || "#FFFFFF"}
      tertiaryColor={selectedTournament?.tertiaryColor || "#FFFFFF"}
      backgroundColor={selectedTournament?.backgroundColor || "#FFFFFF"}
      textColor={selectedTournament?.textColor || "#FFFFFF"}
    >
      <tr className="standings-header">
        {StandingsInfo.map((item) => (
          <th key={item} className="header-item" id={`${item}-column`}>
            {t(item)}
          </th>
        ))}
      </tr>

      {selectedTeams.map((team, index) => (
        <tr key={team} className="standings">
          {activeTournament && (
            <>
              <td className="standings-points">{index + 1}</td>
              <td className="standings-teams">
                <img src={selectedLogos[index]} className="team-logo" alt="" />
                <h2 className="team-name">{team}</h2>
              </td>
              {Array(8)
                .fill("")
                .map((_, i) => (
                  <td key={i}></td>
                ))}
            </>
          )}
        </tr>
      ))}
    </Container>
  );
}
