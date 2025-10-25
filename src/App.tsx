import { useContext, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { AppContext } from "./lib/context";
import { ModalGeneric } from "./generic/GenericModal";
import ModalSettings from "./components/ModalSettings";
import { useTranslation } from "react-i18next";
import { ModalMessage } from "./generic/ModalMessage";
import i18n from "./lib/language";
import Home from "./components/Home";
import Tournament from "./components/Tournament";

function App() {
  const {
    showModalSettings,
    setShowModalSettings,
    theme,
    setTheme,
    setLanguage,
    settingsChanged,
    quitSettings,
    setQuitSettings,
    resetSettings,
    setResetSettings,
    activePage,
    setActivePage,
    backToMenu,
    setBackToMenu,
    setSelectedTournament,
    newSimulation,
    setNewSimulation,
    localTournament,
    setSelectedTeams,
    resetAllTeams,
    setResetAllTeams,
    selectedTournament,
    loadDefaultTeams,
    setLoadDefaultTeams,
    setTournamentStep,
    setMatchdayNumber,
    teams,
    setSelectedLogos,
  } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark-theme" : "light-theme");
    } else {
      root.classList.add(`${theme}-theme`);
    }
  }, [theme]);

  function VerifySettings() {
    if (settingsChanged) {
      setQuitSettings(true);
    } else {
      setShowModalSettings(false);
    }
  }

  function SetDefault() {
    setTheme("app");
    setLanguage("en");

    localStorage.setItem("soccer_sim_theme", "app");
    localStorage.setItem("soccer_sim_language", "en");

    i18n.changeLanguage("en");
  }

  return (
    <>
      {activePage == "Home" && <Home></Home>}
      {activePage == "Tournament" && <Tournament></Tournament>}
      <SideBar></SideBar>
      {showModalSettings && (
        <ModalGeneric
          functionCloseModal={() => VerifySettings()}
          mobileFullScreen
          top="50%"
          left="50%"
          title={t("Settings")}
          width="400px"
        >
          <ModalSettings />
        </ModalGeneric>
      )}
      {quitSettings && (
        <ModalMessage
          textMessage={t("Do you want to quit without saving?")}
          onClick1={() => setQuitSettings(false)}
          textButton1={t("Cancel")}
          onClick2={() => (setQuitSettings(false), setShowModalSettings(false))}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
      {resetSettings && (
        <ModalMessage
          textMessage={t("Do you want to reset the settings?")}
          onClick1={() => setResetSettings(false)}
          textButton1={t("Cancel")}
          onClick2={() => (
            setResetSettings(false), setShowModalSettings(false), SetDefault()
          )}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
      {backToMenu && (
        <ModalMessage
          textMessage={t("Do you want to return to the menu?")}
          onClick1={() => setBackToMenu(false)}
          textButton1={t("Cancel")}
          onClick2={() => (
            setBackToMenu(false),
            setActivePage("Home"),
            setSelectedTournament(null)
          )}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
      {newSimulation && (
        <ModalMessage
          textMessage={t("Do you want to create another simulation?")}
          onClick1={() => setNewSimulation(false)}
          textButton1={t("Cancel")}
          onClick2={() => (
            setNewSimulation(false),
            setTournamentStep("Teams Selection"),
            setSelectedTournament(localTournament),
            setSelectedTeams([]),
            setMatchdayNumber(1)
          )}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
      {resetAllTeams && (
        <ModalMessage
          textMessage={t("Do you want to reset all teams?")}
          onClick1={() => setResetAllTeams(false)}
          textButton1={t("Cancel")}
          onClick2={() => (setSelectedTeams([]), setResetAllTeams(false))}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
      {loadDefaultTeams && (
        <ModalMessage
          textMessage={t(
            "Do you want to load the teams from the 2025/26 season?"
          )}
          onClick1={() => setLoadDefaultTeams(false)}
          textButton1={t("Cancel")}
          onClick2={() => {
            if (selectedTournament?.defaultTeams) {
              const defaultTeams = selectedTournament.defaultTeams;

              // Gera os logos correspondentes automaticamente
              const defaultLogos = defaultTeams.map((teamName) => {
                const team = teams.find((t) => t.name === teamName);
                return team ? team.logo : "";
              });

              setSelectedTeams(defaultTeams);
              setSelectedLogos(defaultLogos);
            }

            setLoadDefaultTeams(false);
          }}
          textButton2={t("Yes")}
        ></ModalMessage>
      )}
    </>
  );
}

export default App;
