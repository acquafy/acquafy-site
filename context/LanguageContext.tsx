"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "pt" | "pt-pt" | "en" | "es" | "fr" | "de" | "it" | "zh" | "ja" | "ko";

const ALL_LANGS: Lang[] = ["pt", "pt-pt", "en", "es", "fr", "de", "it", "zh", "ja", "ko"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

function detectLang(): Lang {
  const saved = localStorage.getItem("acquafy-lang") as Lang | null;
  if (saved && ALL_LANGS.includes(saved)) return saved;
  const nav = navigator.language.toLowerCase();
  if (nav === "pt-pt" || nav === "pt-mz" || nav === "pt-ao") return "pt-pt";
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("de")) return "de";
  if (nav.startsWith("it")) return "it";
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("ko")) return "ko";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    setLang(detectLang());
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem("acquafy-lang", l);
  }

  return <Ctx.Provider value={{ lang, setLang: changeLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
