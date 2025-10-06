import { Container } from "../styles/Home";
import { useTranslation } from "react-i18next";
import Logo from "../assets/icons/soccer_simulation_logo.svg?react";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";

export default function Home() {
  const { t } = useTranslation();
  const { selectedTournament } = useContext(AppContext);
  return (
    <Container
      primaryColor={
        selectedTournament != null
          ? selectedTournament.backgroundColor
          : "var(--home-background)"
      }
      secondaryColor={
        selectedTournament != null
          ? selectedTournament.secondaryColor
          : "#FFFFFF"
      }
      textColor={
        selectedTournament != null ? selectedTournament.textColor : "#FFFFFF"
      }
    >
      {selectedTournament == null ? (
        <>
          <div className="logo">
            <Logo></Logo>
          </div>
          <h2 className="welcome-text">
            {t("Welcome to the React Soccer Simulation!")}
          </h2>
          <h2 className="welcome-text">
            {t(
              "You can find the available tournaments in the side bar on the left!"
            )}
          </h2>
        </>
      ) : (
        <>
          <div className="tournament-logo">
            <img src={selectedTournament.logo} alt="tournament logo" />
          </div>
          <h2 className="welcome-text">
            {t("You selected the ")}
            <span className="tournament-name">{selectedTournament.name}</span>
          </h2>
          <h2 className="welcome-text">
            {t("Click on the button below to start the simulation!")}
          </h2>
          <div className="start-simulation">
            <Button color="blue" borderRadius="4px" width="200px" height="50px">
              {t("Start Simulation")}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
