"use client";

import { useState, useRef, useEffect } from "react";

// ── Assets ─────────────────────────────────────────────────────────────────
// Footer selector (3095:5902) — "IDIOMA FULL"
const imgFlagBR_Full  = "/figma-assets/44759f6f-a798-4941-b8e5-93c69ab86057.svg"; // Brazil 512×512
const imgArrowFooter  = "/figma-assets/b114f61a-ebeb-4bc1-8659-c10a1093904c.svg"; // 30×18

// Header selector (3102:6909) — "IDIOMA COMPACTO"
const imgGlobeHeader  = "/figma-assets/8f0b36db-933d-403f-89d7-ee77991b3d07.svg"; // Globe 18×18
const imgArrowHeader  = "/figma-assets/fbc9c4eb-b063-44be-b35e-84a450dba994.svg"; // 30×18, oriented ∧

// Language menu flags (shared)
const imgUSA     = "/figma-assets/11e850be-35ee-437f-ad1c-3d289bfaa564.svg"; // 30×30
const imgUK      = "/figma-assets/33bd5c2f-c320-4129-8ed9-b8b322032d93.svg"; // 262×262
const imgBR_Menu = "/figma-assets/44759f6f-a798-4941-b8e5-93c69ab86057.svg"; // 512×512
const imgPT      = "/figma-assets/8f586395-cc0a-4d61-b158-7beb295f578b.svg"; // w-full
const imgES      = "/figma-assets/29974bf3-0cc6-43be-83a9-34be04d64160.svg"; // 22×22
const imgFR      = "/figma-assets/d4e2ac7c-28c1-4878-bdd2-b1fe6a18e35a.svg"; // 30×30
const imgDE      = "/figma-assets/02cea198-3dfa-468d-9e91-fed48fb92d4c.svg"; // 306×306
const imgIT      = "/figma-assets/f8aa173c-d1e5-466b-9e72-681d04548bb2.svg"; // 30×30
const imgZH      = "/figma-assets/7bbec2c4-74c1-45bb-b17f-3069822dc08e.svg"; // 512×512
const imgJA      = "/figma-assets/9b03aeb2-7bd2-4fa5-870f-925bc62b8f02.svg"; // 512×512
const imgKO      = "/figma-assets/b08ccc53-a577-47f4-b3fe-8fc5931dbada.svg"; // 374×374

// ── Language data ──────────────────────────────────────────────────────────
type Language = {
  code: string;
  label: string;
  flag: string;
  aspectW: number;
  aspectH: number;
  active?: boolean;
};

const LANGUAGES: Language[] = [
  { code: "en-us", label: "English (United States)", flag: imgUSA,    aspectW: 30,    aspectH: 30    },
  { code: "en-gb", label: "English (England)",       flag: imgUK,     aspectW: 262.3, aspectH: 262.3 },
  { code: "pt-br", label: "Português (BR)",          flag: imgBR_Menu,aspectW: 512,   aspectH: 512,  active: true },
  { code: "pt-pt", label: "Português (Portugal)",    flag: imgPT,     aspectW: 1,     aspectH: 1     },
  { code: "es",    label: "Español",                 flag: imgES,     aspectW: 22,    aspectH: 22    },
  { code: "fr",    label: "Français",                flag: imgFR,     aspectW: 30,    aspectH: 30    },
  { code: "de",    label: "Deutsch",                 flag: imgDE,     aspectW: 306.6, aspectH: 306.7 },
  { code: "it",    label: "Italiano",                flag: imgIT,     aspectW: 30,    aspectH: 30    },
  { code: "zh",    label: "中文",                    flag: imgZH,     aspectW: 512,   aspectH: 512   },
  { code: "ja",    label: "中国語",                  flag: imgJA,     aspectW: 512,   aspectH: 512   },
  { code: "ko",    label: "중국",                    flag: imgKO,     aspectW: 374,   aspectH: 374   },
];

// ── Flag 20×20 helper ──────────────────────────────────────────────────────
function FlagImg({ flag, aspectW, aspectH }: Pick<Language, "flag" | "aspectW" | "aspectH">) {
  return (
    <div className="flex flex-col items-center justify-center overflow-clip shrink-0 size-[20px]">
      <div
        className="flex-[1_0_0] min-h-px relative w-full"
        style={{ aspectRatio: `${aspectW}/${aspectH}` }}
      >
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={flag} />
      </div>
    </div>
  );
}

// ── Dropdown menu (shared between full & compact) ──────────────────────────
function DropdownMenu({ dropUp }: { dropUp: boolean }) {
  return (
    <div
      className="absolute bg-white border border-[#cbd0d4] flex flex-col gap-[12px] items-start justify-center overflow-clip pl-[20px] pr-[50px] py-[20px] right-[-1px] rounded-[6px] w-[290px] z-50"
      style={{ [dropUp ? "bottom" : "top"]: "calc(100% + 4px)" }}
    >
      {LANGUAGES.map((lang) => (
        <div
          key={lang.code}
          className="flex gap-[10px] items-center overflow-clip shrink-0 w-full cursor-pointer hover:opacity-70 transition-opacity"
        >
          <FlagImg flag={lang.flag} aspectW={lang.aspectW} aspectH={lang.aspectH} />
          {lang.active ? (
            /* Active item — Plus Jakarta Sans Bold, leading-normal */
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#2a2a2b] whitespace-nowrap shrink-0">
              {lang.label}
            </p>
          ) : (
            /* Regular item — Plus Jakarta Sans Regular, leading-[25px] */
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] whitespace-nowrap shrink-0">
              {lang.label}
            </p>
          )}
        </div>
      ))}
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

// ── FOOTER variant — "IDIOMA FULL" (3095:5902) ────────────────────────────
// Arrow: sempre aponta ∧ (para cima), pois o dropdown abre acima.
// Figma usa rotate-180 + -scale-y-100 no asset do footer → resultado: ∧.
export function LanguageSelectorFull() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`border flex gap-[5px] items-center min-w-[200px] p-[10px] rounded-[6px] w-[220px] cursor-pointer transition-colors ${
          open ? "bg-[#f6f9fe] border-[0.5px] border-[#cbd0d4]" : "border-[#cbd0d4]"
        }`}
      >
        {/* Brazil flag 20×20 — overflow-clip, aspect 512/512 */}
        <FlagImg flag={imgFlagBR_Full} aspectW={512} aspectH={512} />

        {/* Label — Plus Jakarta Sans Bold 14px */}
        <p
          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] flex-[1_0_0] min-w-px text-left ${
            open ? "text-[#0233c3]" : "text-[#333]"
          }`}
        >
          Português (BR)
        </p>

        {/* Arrow footer — Figma: rotate-180(outer) + -scale-y-100(inner) = sempre ∧ */}
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

      {/* Dropdown abre ACIMA */}
      {open && <DropdownMenu dropUp />}
    </div>
  );
}

// ── HEADER variant — "IDIOMA COMPACTO" (3102:6909) ───────────────────────
// Arrow: ∨ (baixo) quando fechado, ∧ (cima) quando aberto.
// Figma usa -scale-y-100 no asset ∧ para dar ∨ no estado fechado.
// Toggle: fechado = -scale-y-100, aberto = sem scale.
export function LanguageSelectorCompact() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`border flex gap-[5px] items-center p-[10px] rounded-[6px] cursor-pointer transition-colors ${
          open ? "bg-[#f6f9fe] border-[0.5px] border-[#cbd0d4]" : "border-[#cbd0d4]"
        }`}
      >
        {/* Globe icon — size-[18px], inset-[-2.78%] */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative shrink-0 size-[18px]">
            <div className="absolute inset-[-2.78%]">
              <img alt="" className="block max-w-none size-full" src={imgGlobeHeader} />
            </div>
          </div>
        </div>

        {/* "BR" label — Plus Jakarta Sans Bold 14px */}
        <p
          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] whitespace-nowrap shrink-0 ${
            open ? "text-[#0233c3]" : "text-[#333]"
          }`}
        >
          BR
        </p>

        {/* Arrow header — ∧ asset com -scale-y-100 dá ∨ (fechado); sem scale = ∧ (aberto) */}
        <div className="flex flex-col items-center justify-center size-[10px] shrink-0">
          <div className="flex items-center justify-center shrink-0 w-full">
            <div
              className={`flex-none w-full transition-transform duration-200 ${open ? "" : "-scale-y-100"}`}
            >
              <div className="relative size-full" style={{ aspectRatio: "30/18" }}>
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowHeader} />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Dropdown abre ABAIXO */}
      {open && <DropdownMenu dropUp={false} />}
    </div>
  );
}
