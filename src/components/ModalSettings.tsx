import { useTranslation } from "react-i18next";
import { RadioButton } from "../generic/RadioButton";
import { Container } from "../styles/ModalSettings";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";

export default function ModalSettings() {
  const { t } = useTranslation();
  const { theme, setTheme, setShowModalSettings, setSettingsChanged } =
    useContext(AppContext);

  const [localTheme, setLocalTheme] = useState(theme);

  function SaveSettings() {
    setTheme(localTheme);
    localStorage.setItem("soccer_sim_theme", localTheme);
    setShowModalSettings(false);
  }

  useEffect(() => {
    if (localTheme != theme) {
      setSettingsChanged(true);
    } else {
      setSettingsChanged(false);
    }
  }, [localTheme, theme]);

  return (
    <Container>
      <div className="theme-radios">
        <div className="section-separator">
          <h2 className="section-title">{t("Theme Selection")}</h2>
          <hr className="section-line" />
        </div>
        <RadioButton
          name="themeRB"
          text={t("App Theme")}
          color="var(--app-primary)"
          bgColor="var(--text-primary)"
          value="app"
          checked={localTheme == "app"}
          onChange={(val) => setLocalTheme(val)}
        ></RadioButton>
        <RadioButton
          name="themeRB"
          text={t("Dark Theme")}
          color="var(--app-primary)"
          bgColor="var(--text-primary)"
          value="dark"
          checked={localTheme == "dark"}
          onChange={(val) => setLocalTheme(val)}
        ></RadioButton>
        <RadioButton
          name="themeRB"
          text={t("System Theme")}
          color="var(--app-primary)"
          bgColor="var(--text-primary)"
          value="system"
          checked={localTheme == "system"}
          onChange={(val) => setLocalTheme(val)}
        ></RadioButton>
      </div>
      <footer className="footer-buttons">
        <Button color="green" borderRadius="4px" functionButton={SaveSettings}>
          {t("Save")}
        </Button>
      </footer>
    </Container>
  );
}
