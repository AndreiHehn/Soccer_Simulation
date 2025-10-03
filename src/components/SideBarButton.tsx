import { useContext } from "react";
import { Container } from "../styles/SideBarButton";
import { AppContext } from "../lib/context";
import Bundesliga_logo from "../assets/icons/Bundesliga_logo.png";
import LaLiga_logo from "../assets/icons/LaLiga_logo.png";
import PremierLeague_logo from "../assets/icons/Premier_League_logo.png";
import SerieA_logo from "../assets/icons/SerieA_logo.png";
import Ligue1_logo from "../assets/icons/Ligue1_logo.png";

export default function SideBarButton() {
  const { isSideBarOpen } = useContext(AppContext);

  return (
    <Container isSideBarOpen={isSideBarOpen}>
      <div className="internal">
        <div className="tournament-info">
          <img className="tournament-logo" src={Bundesliga_logo} alt="logo" />
          <h2 className="tournament-name">Bundesliga</h2>
        </div>
      </div>
    </Container>
  );
}
