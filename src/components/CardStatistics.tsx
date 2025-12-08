/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { Container } from "../styles/CardStatistics";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../lib/context";
import TriangleDownIcon from "../assets/icons/triangleDownIcon.svg?react";
import TriangleUpIcon from "../assets/icons/triangleUpIcon.svg?react";

interface Props {
  cardTitle: string;
  orderBy: keyof typeof sampleTeam;
}

const sampleTeam = {
  team: "",
  logo: "",
  played: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalDifference: 0,
  points: 0,
};

export default function CardStatistics({ cardTitle, orderBy }: Props) {
  const { t } = useTranslation();
  const { selectedTournament, standings } = useContext(AppContext);
  const [ordinationFlow, setOrdinationFlow] = useState("High");

  const ordination = useMemo(() => {
    if (!standings) return [];

    const multiplier = ordinationFlow === "High" ? -1 : 1;

    return [...standings].sort(
      (a, b) => (Number(a[orderBy]) - Number(b[orderBy])) * multiplier
    );
  }, [standings, orderBy, ordinationFlow]);

  return (
    <Container
      primaryColor={
        selectedTournament
          ? selectedTournament.backgroundColor
          : "var(--home-background)"
      }
      secondaryColor={
        selectedTournament ? selectedTournament.secondaryColor : "#FFFFFF"
      }
      tertiaryColor={
        selectedTournament ? selectedTournament.tertiaryColor : "#FFFFFF"
      }
      textColor={selectedTournament ? selectedTournament.textColor : "#FFFFFF"}
    >
      <header className="card-header">
        <h1 className="cardTitle">{t(cardTitle)}</h1>
        {ordinationFlow == "High" ? (
          <TriangleUpIcon
            className="ordination-icon"
            onClick={() => setOrdinationFlow("Low")}
          ></TriangleUpIcon>
        ) : (
          <TriangleDownIcon
            className="ordination-icon"
            onClick={() => setOrdinationFlow("High")}
          ></TriangleDownIcon>
        )}
      </header>

      <div className="stats">
        {ordination.map((team) => (
          <div key={team.team} className="stat-line">
            <img src={team.logo} alt="" className="team-logo" />
            <span className="team-name">{team.team}</span>
            <span className="value">{team[orderBy]}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}
