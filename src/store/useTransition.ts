import { useLanguageStore } from "@/store/useLanguage";

// Импортируем все JSON-файлы для каждого языка
import enHeader from "@/locales/en/header.json";
import enFooter from "@/locales/en/footer.json";
import enHomePage from "@/locales/en/homePage.json";

import ruHeader from "@/locales/ru/header.json";
import ruFooter from "@/locales/ru/footer.json";
import ruHomePage from "@/locales/ru/homePage.json";

import uzHeader from    "@/locales/uz/header.json";
import uzFooter from    "@/locales/uz/footer.json";
import uzHomePage from  "@/locales/uz/homePage.json";

// Собираем все переводы по языкам
export const translations = {
  en: {
    header: enHeader,
    footer: enFooter,
    homePage: enHomePage,
  },
  ru: {
    header: ruHeader,
    footer: ruFooter,
    homePage: ruHomePage,
  },
  uz: {
    header: uzHeader,
    footer: uzFooter,
    homePage: uzHomePage,
  },
};

export function useTranslation() {
  const { language } = useLanguageStore();
  return translations[language];
}
