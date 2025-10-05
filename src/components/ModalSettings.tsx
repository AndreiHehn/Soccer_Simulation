import { useTranslation } from "react-i18next";
import { RadioButton } from "../generic/RadioButton";
import { Container } from "../styles/ModalSettings";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/context";
import { Button } from "../generic/Button";
import { LanguageSelector } from "./LanguageSelector";
import i18n from "../lib/language";

export default function ModalSettings() {
  const { t } = useTranslation();
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    setShowModalSettings,
    setSettingsChanged,
    setResetSettings,
  } = useContext(AppContext);

  const [localTheme, setLocalTheme] = useState(theme);
  const [localLanguage, setLocalLanguage] = useState(language);

  function SaveSettings() {
    setTheme(localTheme);
    setLanguage(localLanguage);

    localStorage.setItem("soccer_sim_theme", localTheme);
    localStorage.setItem("soccer_sim_language", localLanguage);

    i18n.changeLanguage(localLanguage);
    setShowModalSettings(false);
  }

  useEffect(() => {
    if (localTheme != theme || localLanguage != language) {
      setSettingsChanged(true);
    } else {
      setSettingsChanged(false);
    }
  }, [localTheme, theme, localLanguage, language]);

  return (
    <Container>
      <div className="section-separator">
        <h2 className="section-title">{t("Language Selection")}</h2>
        <hr className="section-line" />
      </div>
      <LanguageSelector
        selectedLanguage={localLanguage}
        onSelectLanguage={setLocalLanguage}
      />
      <div className="section-separator">
        <h2 className="section-title">{t("Theme Selection")}</h2>
        <hr className="section-line" />
      </div>
      <div className="theme-radios">
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
        <Button
          color="gray"
          borderRadius="4px"
          functionButton={() => setResetSettings(true)}
        >
          {t("Reset")}
        </Button>
        <Button color="green" borderRadius="4px" functionButton={SaveSettings}>
          {t("Save")}
        </Button>
      </footer>
    </Container>
  );
}
