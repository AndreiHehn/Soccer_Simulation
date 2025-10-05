import { useContext, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { AppContext } from "./lib/context";
import { ModalGeneric } from "./generic/GenericModal";
import ModalSettings from "./components/ModalSettings";
import { useTranslation } from "react-i18next";
import { ModalMessage } from "./generic/ModalMessage";

function App() {
  const {
    showModalSettings,
    setShowModalSettings,
    theme,
    settingsChanged,
    setSettingsChanged,
    quitSettings,
    setQuitSettings,
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

  return (
    <>
      <SideBar></SideBar>;
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
    </>
  );
}

export default App;
