import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CONTENT, DEFAULT_LANG, LANGS, type Content, type Lang } from "./content";

const STORAGE_KEY = "queky-lang";

interface LangState { lang: Lang; setLang: (lang: Lang) => void; t: Content }

const LangContext = createContext<LangState | null>(null);

const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

/** URL (?lang=en) wins, then the visitor's last choice, then Spanish. */
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch { /* storage unavailable */ }
  return DEFAULT_LANG;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
    const url = new URL(location.href);
    if (next === DEFAULT_LANG) url.searchParams.delete("lang"); else url.searchParams.set("lang", next);
    history.replaceState(null, "", url);
  };

  return <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const state = useContext(LangContext);
  if (!state) throw new Error("useLang must be used inside LangProvider");
  return state;
}
