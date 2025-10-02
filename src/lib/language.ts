import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_EN from "../assets/languages/translation_EN.json";
import translation_ES from "../assets/languages/translation_ES.json";
import translation_PT from "../assets/languages/translation_PT-BR.json";

const resources = {
  en: {
    translation: translation_EN,
  },
  pt: {
    translation: translation_PT,
  },
  es: {
    translation: translation_ES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("[app_name]_language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
