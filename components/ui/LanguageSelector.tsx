"use client";

import { useState, useRef, useEffect } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ─────────────────────────────────────────────────────────────────
const imgFlagBR_Full  = "/figma-assets/flag-br.svg";
const imgArrowFooter  = "/figma-assets/icon-arrow-footer.svg";
const imgGlobeHeader  = "/figma-assets/icon-globe-header-18px.svg";
const imgArrowHeader  = "/figma-assets/icon-arrow-header.svg";

const imgUSA     = "/figma-assets/flag-usa-30px.svg";
const imgBR_Menu = "/figma-assets/flag-br.svg";
const imgPT      = "/figma-assets/flag-pt.svg";
const imgES      = "/figma-assets/flag-es.svg";
const imgFR      = "/figma-assets/flag-fr.svg";
const imgDE      = "/figma-assets/flag-de.svg";
const imgIT      = "/figma-assets/flag-it.svg";
const imgZH      = "/figma-assets/flag-zh.svg";
const imgJA      = "/figma-assets/flag-ja.svg";
const imgKO      = "/figma-assets/flag-ko.svg";
const imgGB      = "/figma-assets/flag-uk.svg";
const imgSV      = "/figma-assets/flag-sv.svg";
const imgFI      = "/figma-assets/flag-fi.svg";
const imgRU      = "/figma-assets/flag-ru.svg";
const imgRO      = "/figma-assets/flag-ro.svg";
const imgHE      = "/figma-assets/flag-he.svg";

// ── Language data ──────────────────────────────────────────────────────────
type Language = {
  code: string;
  label: string;
  flag: string;
  aspectW: number;
  aspectH: number;
  langCode: Lang | null; // null = ainda não disponível
};

const LANGUAGES: Language[] = [
  { code: "pt-br", label: "Português (BR)",          flag: imgBR_Menu,aspectW: 512,   aspectH: 512,   langCode: "pt" },
  { code: "en",    label: "English (England)",        flag: imgGB,  aspectW: 20, aspectH: 20, langCode: "en-gb" },
  { code: "en-gb", label: "English (USA)",            flag: imgUSA, aspectW: 18, aspectH: 18, langCode: "en" },
  { code: "pt-pt", label: "Português (Portugal)",    flag: imgPT,     aspectW: 1,     aspectH: 1,     langCode: "pt-pt" },
  { code: "es",    label: "Español",                 flag: imgES,     aspectW: 22,    aspectH: 22,    langCode: "es" },
  { code: "fr",    label: "Français",                flag: imgFR,     aspectW: 30,    aspectH: 30,    langCode: "fr" },
  { code: "de",    label: "Deutsch",                 flag: imgDE,     aspectW: 306.6, aspectH: 306.7, langCode: "de" },
  { code: "it",    label: "Italiano",                flag: imgIT,     aspectW: 30,    aspectH: 30,    langCode: "it" },
  { code: "zh",    label: "中文",                    flag: imgZH,     aspectW: 512,   aspectH: 512,   langCode: "zh" },
  { code: "ja",    label: "日本語",                  flag: imgJA,     aspectW: 512,   aspectH: 512,   langCode: "ja" },
  { code: "ko",    label: "한국어",                  flag: imgKO,     aspectW: 374,   aspectH: 374,   langCode: "ko" },
  { code: "sv",    label: "Svenska",               flag: imgSV,     aspectW: 512,   aspectH: 512,   langCode: "sv" },
  { code: "fi",    label: "Suomi",                 flag: imgFI,     aspectW: 512,   aspectH: 512,   langCode: "fi" },
  { code: "ru",    label: "Русский",               flag: imgRU,     aspectW: 512,   aspectH: 512,   langCode: "ru" },
  { code: "ro",    label: "Română",                flag: imgRO,     aspectW: 326,   aspectH: 326,   langCode: "ro" },
  { code: "he",    label: "עברית", flag: imgHE, aspectW: 512, aspectH: 512, langCode: "he" },
];

// Compact label shown in Header button
const COMPACT_LABEL: Record<Lang, string> = { pt: "BR", "pt-pt": "PT", en: "GB", "en-gb": "EN", es: "ES", fr: "FR", de: "DE", it: "IT", zh: "中文", ja: "日本語", ko: "한국어", sv: "SV", fi: "FI", ru: "RU", ro: "RO", he: "HE" };

// Full label + flag shown in Footer button
const FULL_INFO: Record<Lang, { flag: string; aspectW: number; aspectH: number; label: string }> = {
  pt:      { flag: imgBR_Menu, aspectW: 512,   aspectH: 512,   label: "Português (BR)" },
  "pt-pt": { flag: imgPT,     aspectW: 1,     aspectH: 1,     label: "Português (Portugal)" },
  en:      { flag: imgUSA,    aspectW: 18,    aspectH: 18,    label: "English (USA)" },
  "en-gb": { flag: imgGB,    aspectW: 20,    aspectH: 20,    label: "English (England)" },
  es: { flag: imgES,      aspectW: 22,    aspectH: 22,    label: "Español" },
  fr: { flag: imgFR,      aspectW: 30,    aspectH: 30,    label: "Français" },
  de: { flag: imgDE,      aspectW: 306.6, aspectH: 306.7, label: "Deutsch" },
  it: { flag: imgIT,      aspectW: 30,    aspectH: 30,    label: "Italiano" },
  zh: { flag: imgZH,      aspectW: 512,   aspectH: 512,   label: "中文" },
  ja: { flag: imgJA,      aspectW: 512,   aspectH: 512,   label: "日本語" },
  ko: { flag: imgKO,      aspectW: 374,   aspectH: 374,   label: "한국어" },
  sv: { flag: imgSV,      aspectW: 512,   aspectH: 512,   label: "Svenska" },
  fi: { flag: imgFI,      aspectW: 512,   aspectH: 512,   label: "Suomi" },
  ru: { flag: imgRU,      aspectW: 512,   aspectH: 512,   label: "Русский" },
  ro: { flag: imgRO,      aspectW: 326,   aspectH: 326,   label: "Română" },
  he: { flag: imgHE,      aspectW: 512,   aspectH: 512,   label: "עברית" },
};

// ── Flag 20×20 helper ──────────────────────────────────────────────────────
function FlagImg({ flag, aspectW, aspectH }: Pick<Language, "flag" | "aspectW" | "aspectH">) {
  return (
    <div className="flex flex-col items-center justify-center overflow-clip shrink-0 size-[20px]">
      <div className="flex-[1_0_0] min-h-px relative w-full" style={{ aspectRatio: `${aspectW}/${aspectH}` }}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={flag} />
      </div>
    </div>
  );
}

// ── Dropdown menu ──────────────────────────────────────────────────────────
function DropdownMenu({
  dropUp, lang, setLang, onClose,
}: {
  dropUp: boolean; lang: Lang; setLang: (l: Lang) => void; onClose: () => void;
}) {
  return (
    <div
      className="absolute bg-white border border-[#cbd0d4] flex flex-col gap-[12px] items-start overflow-clip pl-[20px] pr-[20px] py-[20px] right-[-1px] rounded-[6px] w-[290px] z-50"
      style={{ [dropUp ? "bottom" : "top"]: "calc(100% + 4px)" }}
    >
      {LANGUAGES.map((item) => {
        const isActive    = item.langCode === lang;
        const isAvailable = item.langCode !== null;
        return (
          <div
            key={item.code}
            onClick={() => { if (item.langCode) { setLang(item.langCode); onClose(); } }}
            className={`flex gap-[10px] items-center overflow-clip shrink-0 w-full transition-opacity ${
              isAvailable ? "cursor-pointer hover:opacity-70" : "cursor-default opacity-40"
            }`}
          >
            <FlagImg flag={item.flag} aspectW={item.aspectW} aspectH={item.aspectH} />
            <p className={`${isActive ? "font-['Avenir_LT_Pro:85_Heavy']" : "font-['Avenir_LT_Pro:55_Roman']"} text-[16px] leading-[20px] text-[#2a2a2b] whitespace-nowrap shrink-0 flex-1 min-w-0`}>
              {item.label}
            </p>
            {!isAvailable && (
              <span className="text-[10px] font-['Avenir_LT_Pro:55_Roman'] text-[#aaa] whitespace-nowrap shrink-0">
                Em breve
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Click-outside hook ─────────────────────────────────────────────────────
function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);
  return ref;
}

// ── FOOTER variant ─────────────────────────────────────────────────────────
export function LanguageSelectorFull() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const ref = useClickOutside(() => setOpen(false));
  const info = FULL_INFO[lang];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`border flex gap-[5px] items-center min-w-[200px] p-[10px] rounded-[6px] w-[220px] cursor-pointer transition-colors ${
          open ? "bg-[#f6f9fe] border-[0.5px] border-[#cbd0d4]" : "border-[#cbd0d4]"
        }`}
      >
        <FlagImg flag={info.flag} aspectW={info.aspectW} aspectH={info.aspectH} />
        <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] flex-[1_0_0] min-w-px text-left ${open ? "text-[#0233c3]" : "text-[#333]"}`}>
          {info.label}
        </p>
        <div className="flex items-center justify-center shrink-0">
          <div className="flex-none rotate-180">
            <div className="flex flex-col items-center justify-center size-[10px]">
              <div className="flex items-center justify-center shrink-0 w-full">
                <div className="-scale-y-100 flex-none w-full">
                  <div className="relative size-full" style={{ aspectRatio: "30/18" }}>
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowFooter} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      {open && <DropdownMenu dropUp lang={lang} setLang={setLang} onClose={() => setOpen(false)} />}
    </div>
  );
}

// ── HEADER variant ─────────────────────────────────────────────────────────
export function LanguageSelectorCompact() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`border flex gap-[5px] items-center p-[10px] rounded-[6px] cursor-pointer transition-colors ${
          open ? "bg-[#f6f9fe] border-[0.5px] border-[#cbd0d4]" : "border-[#cbd0d4]"
        }`}
      >
        <FlagImg flag={FULL_INFO[lang].flag} aspectW={FULL_INFO[lang].aspectW} aspectH={FULL_INFO[lang].aspectH} />
        <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] whitespace-nowrap shrink-0 ${open ? "text-[#0233c3]" : "text-[#333]"}`}>
          {COMPACT_LABEL[lang]}
        </p>
        <div className="flex flex-col items-center justify-center size-[10px] shrink-0">
          <div className="flex items-center justify-center shrink-0 w-full">
            <div className={`flex-none w-full transition-transform duration-200 ${open ? "" : "-scale-y-100"}`}>
              <div className="relative size-full" style={{ aspectRatio: "30/18" }}>
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowHeader} />
              </div>
            </div>
          </div>
        </div>
      </button>
      {open && <DropdownMenu dropUp={false} lang={lang} setLang={setLang} onClose={() => setOpen(false)} />}
    </div>
  );
}
