import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from "./ru.json";

export const DEFAULT_LANGUAGE = "ru";

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  compatibilityJSON: "v3",
  resources: {
    ru: {
      translation: ru,
    },
    en: {
      translation: en,
    }
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
