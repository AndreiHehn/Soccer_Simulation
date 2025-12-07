import { useContext } from "react";
import { Container } from "../styles/SideBar";
import { AppContext } from "../lib/context";
import SideBarButton from "./SideBarButton";
import Logo from "../assets/icons/soccer_simulation_logo.svg?react";

import { useTranslation } from "react-i18next";
import GraphIcon from "../assets/icons/GraphIcon.svg?react";
import SettingsIcon from "../assets/icons/settingsIcon.svg?react";
import HomeIcon from "../assets/icons/homeIcon.svg?react";
import { TournamentsList } from "../lib/tournaments/tournamentsList";

export default function SideBar() {
  const {
    isSideBarOpen,
    setIsSideBarOpen,
    setShowModalSettings,
    setSelectedTournament,
    selectedTournament,
    activePage,
    setBackToMenu,
    setActivePage,
    setLocalTournament,
    setNewSimulation,
    setRanking,
    setSelectedTeams,
  } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <Container
      isOpen={isSideBarOpen}
      onMouseEnter={() => setIsSideBarOpen(true)}
      onMouseLeave={() => setIsSideBarOpen(false)}
      tournamentColor={selectedTournament?.secondaryColor}
      lineColor={selectedTournament?.textColor}
    >
      <div className="logo">
        <Logo></Logo>
        <h2 className="app-name">REACT SOCCER SIMULATION</h2>
      </div>
      <section className="separator">
        <h3 className="section-category">{t("National Leagues")}</h3>
      </section>
      <div className="buttons">
        <div className="tournaments-buttons">
          {TournamentsList.map(
            (tournament) =>
              tournament.type == "National League" && (
                <SideBarButton
                  key={tournament.id}
                  name={tournament.name}
                  color={tournament.primaryColor}
                  logo={tournament.logo}
                  functionButton={() =>
                    activePage == "Home" || activePage == "Rankings"
                      ? (setSelectedTournament(tournament),
                        setActivePage("Home"))
                      : (setLocalTournament(tournament),
                        setNewSimulation(true),
                        setSelectedTeams)
                  }
                />
              )
          )}
        </div>
        <section className="separator">
          <h3 className="section-category">{t("Continental Cups")}</h3>
        </section>
        <div className="tournaments-buttons">
          {TournamentsList.map(
            (tournament) =>
              tournament.type == "Continental" && (
                <SideBarButton
                  key={tournament.id}
                  name={tournament.name}
                  color={tournament.primaryColor}
                  logo={tournament.logo}
                  functionButton={() =>
                    activePage == "Home" || activePage == "Rankings"
                      ? (setSelectedTournament(tournament),
                        setActivePage("Home"))
                      : (setLocalTournament(tournament),
                        setNewSimulation(true),
                        setSelectedTeams)
                  }
                />
              )
          )}
        </div>
      </div>
      <footer className="settings-menu">
        {activePage != "Rankings" && (
          <SideBarButton
            name={t("Rankings")}
            color="#265643"
            logo={GraphIcon}
            functionButton={() =>
              selectedTournament != null
                ? setRanking(true)
                : (setActivePage("Rankings"), setSelectedTournament(null))
            }
          ></SideBarButton>
        )}
        <SideBarButton
          name={t("Settings")}
          color="#265643"
          logo={SettingsIcon}
          functionButton={() => setShowModalSettings(true)}
        ></SideBarButton>
        {activePage == "Tournament" ||
          (activePage == "Rankings" && (
            <SideBarButton
              name={t("Back to Menu")}
              color="#265643"
              logo={HomeIcon}
              functionButton={() => setBackToMenu(true)}
            ></SideBarButton>
          ))}
      </footer>
    </Container>
  );
}
