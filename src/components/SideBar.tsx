import { useContext } from "react";
import { Container } from "../styles/SideBar";
import { AppContext } from "../lib/context";
import SideBarButton from "./SideBarButton";
import Logo from "../assets/icons/soccer_simulation_logo.svg?react";

import { useTranslation } from "react-i18next";
import SettingsIcon from "../assets/icons/settingsIcon.svg?react";
import { TournamentsList } from "../lib/tournamentsList";

export default function SideBar() {
  const {
    isSideBarOpen,
    setIsSideBarOpen,
    setShowModalSettings,
    setSelectedTournament,
  } = useContext(AppContext);
  const { t } = useTranslation();

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
      <section className="separator">
        <h3 className="section-category">{t("National Leagues")}</h3>
      </section>
      <div className="tournaments-buttons">
        {TournamentsList.map((tournament) => (
          <SideBarButton
            key={tournament.id}
            name={tournament.name}
            color={tournament.primaryColor}
            logo={tournament.logo}
            functionButton={() => setSelectedTournament(tournament)}
          />
        ))}
      </div>
      <footer className="settings">
        <SideBarButton
          name={t("Settings")}
          color="#265643"
          logo={SettingsIcon}
          functionButton={() => setShowModalSettings(true)}
        ></SideBarButton>
      </footer>
    </Container>
  );
}
