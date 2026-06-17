"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "pt" | "en" | "es";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

function detectLang(): Lang {
  const saved = localStorage.getItem("acquafy-lang") as Lang | null;
  if (saved && (["pt", "en", "es"] as Lang[]).includes(saved)) return saved;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("es")) return "es";
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
