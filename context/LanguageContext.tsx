"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "pt" | "en" | "es";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("acquafy-lang") as Lang | null;
    if (saved && (["pt", "en", "es"] as Lang[]).includes(saved)) setLang(saved);
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
