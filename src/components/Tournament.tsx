import { useTranslation } from "react-i18next";
import { Container } from "../styles/Tournament";
import { useContext } from "react";
import { AppContext } from "../lib/context";

export default function Tournament() {
  const { t } = useTranslation();
  const { selectedTournament } = useContext(AppContext);

  return (
    <Container
      backgroundColor={
        selectedTournament != null
          ? selectedTournament.backgroundColor
          : "#FFFFFF"
      }
    ></Container>
  );
}
