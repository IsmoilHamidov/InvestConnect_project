import { useLanguageStore } from "../store/useLanguage.ts";
import { translations } from "@/store/useTransition.ts";

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation() {
  const { language } = useLanguageStore();
  return translations[language];
}

export default function LanguageTriger() {
  const { setLanguage } = useLanguageStore();

  return (
    <div>
      <button onClick={() => setLanguage("en")}>English</button>
      <button onClick={() => setLanguage("ru")}>Русский</button>
      <button onClick={() => setLanguage("uz")}>Uzb</button>
    </div>
  );
}
