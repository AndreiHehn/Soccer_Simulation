import { Container } from "../styles/Rankings";
// import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "../lib/context";

export default function Rankings() {
  // const { t } = useTranslation();
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
    ></Container>
  );
}
