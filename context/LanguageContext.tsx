"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "pt" | "pt-pt" | "en" | "en-gb" | "es" | "fr" | "de" | "it" | "zh" | "ja" | "ko" | "sv" | "fi" | "ru" | "ro" | "he";

export const ALL_LANGS: Lang[] = ["pt", "pt-pt", "en", "en-gb", "es", "fr", "de", "it", "zh", "ja", "ko", "sv", "fi", "ru", "ro", "he"];

const COOKIE = "acquafy-lang";
const MAX_AGE = 60 * 60 * 24 * 365;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

function writeCookie(l: Lang) {
  document.cookie = `${COOKIE}=${l}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

function detectClientLang(): Lang {
  const saved = localStorage.getItem(COOKIE) as Lang | null;
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

export function LanguageProvider({
  children,
  initialLang = "pt",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    // Sync localStorage → cookie on first load (migration from old sessions without cookie).
    // Also handles first visit: detects browser language and persists it.
    const clientLang = detectClientLang();
    writeCookie(clientLang);
    if (clientLang !== initialLang) setLang(clientLang);
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem(COOKIE, l);
    writeCookie(l);
  }

  return <Ctx.Provider value={{ lang, setLang: changeLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
