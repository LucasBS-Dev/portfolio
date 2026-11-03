"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { copy, type Language } from "../lib/content";

type Theme = "light" | "dark" | "auto";
type Palette = "petroleum" | "indigo";
type Preferences = { language: Language; setLanguage: (value: Language) => void; theme: Theme; setTheme: (value: Theme) => void; palette: Palette; setPalette: (value: Palette) => void; t: typeof copy.pt | typeof copy.en };
const Context = createContext<Preferences | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>("pt");
  const [theme, setThemeState] = useState<Theme>("auto");
  const [palette, setPaletteState] = useState<Palette>("petroleum");
  useEffect(() => {
    const lang = localStorage.getItem("portfolio-language");
    const mode = localStorage.getItem("portfolio-theme");
    const color = localStorage.getItem("portfolio-palette");
    if (lang === "en" || lang === "pt") setLanguageState(lang);
    if (mode === "light" || mode === "dark" || mode === "auto") setThemeState(mode);
    if (color === "petroleum" || color === "indigo") setPaletteState(color);
  }, []);
  useEffect(() => {
    const title = pathname.includes("vivamais") ? "Viva+" : pathname.includes("rpg-character-creator") ? "RPG Character Creator" : pathname.includes("privacidade") ? (language === "pt" ? "Política de privacidade" : "Privacy policy") : (language === "pt" ? "Desenvolvedor Back-end Java" : "Java Back-end Developer");
    const pageTitle = `${title} — Lucas H. B. Silva`;
    const description = language === "pt" ? "Portfólio de Lucas H. B. Silva: desenvolvimento back-end Java, projetos full-stack e tecnologia aplicada a problemas reais." : "Lucas H. B. Silva’s portfolio: Java back-end development, full-stack projects and technology for real problems.";
    const updateMetadata = () => {
      if (document.title !== pageTitle) document.title = pageTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && meta.getAttribute("content") !== description) meta.setAttribute("content", description);
    };
    const observer = new MutationObserver(updateMetadata);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["content"] });
    updateMetadata();
    return () => observer.disconnect();
  }, [language, pathname]);
  const setLanguage = (value: Language) => { setLanguageState(value); localStorage.setItem("portfolio-language", value); document.documentElement.lang = value === "pt" ? "pt-BR" : "en"; };
  const setTheme = (value: Theme) => { setThemeState(value); localStorage.setItem("portfolio-theme", value); document.documentElement.dataset.theme = value; };
  const setPalette = (value: Palette) => { setPaletteState(value); localStorage.setItem("portfolio-palette", value); document.documentElement.dataset.palette = value; };
  const value = useMemo(() => ({ language, setLanguage, theme, setTheme, palette, setPalette, t: copy[language] }), [language, theme, palette]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function usePreferences() {
  const context = useContext(Context);
  if (!context) throw new Error("PreferencesProvider missing");
  return context;
}


