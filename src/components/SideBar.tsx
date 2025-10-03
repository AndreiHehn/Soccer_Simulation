import { useContext } from "react";
import { Container } from "../styles/SideBar";
import { AppContext } from "../lib/context";
import SideBarButton from "./SideBarButton";
import Logo from "../assets/icons/soccer_simulation_logo.svg?react";
import Bundesliga_logo from "../assets/icons/Bundesliga_logo.png";
import LaLiga_logo from "../assets/icons/LaLiga_logo.png";
import PremierLeague_logo from "../assets/icons/Premier_League_logo.png";
import SerieA_logo from "../assets/icons/SerieA_logo.png";
import Ligue1_logo from "../assets/icons/Ligue1_logo.png";

export default function SideBar() {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(AppContext);
  return (
    <Container
      isOpen={isSideBarOpen}
      onMouseEnter={() => setIsSideBarOpen(true)}
      onMouseLeave={() => setIsSideBarOpen(false)}
    >
      <div className="logo">
        <Logo></Logo>
        <h2 className="app-name">REACT SOCCER SIMULATION</h2>
      </div>
      <div className="tournaments-buttons">
        <SideBarButton
          name="Premier League"
          color="#360D3A"
          logo={PremierLeague_logo}
        ></SideBarButton>
        <SideBarButton
          name="La Liga"
          color="#FF4A42"
          logo={LaLiga_logo}
        ></SideBarButton>
        <SideBarButton
          name="Serie A"
          color="#0C8CFF"
          logo={SerieA_logo}
        ></SideBarButton>
        <SideBarButton
          name="Bundesliga"
          color="#D10214"
          logo={Bundesliga_logo}
        ></SideBarButton>
        <SideBarButton
          name="Ligue 1"
          color="#0061FE"
          logo={Ligue1_logo}
        ></SideBarButton>
      </div>
    </Container>
  );
}
