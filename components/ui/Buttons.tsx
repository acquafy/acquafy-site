"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import FigmaIcon from "../FigmaIcon";
import { useLang } from "@/context/LanguageContext";

// ── Arrow icons  (11×9 landscape — fills 9px slot by width) ──────────────────
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-d.svg";
const imgArrowWhite = "/figma-assets/icon-arrow-white-hover.svg";
const imgArrowGray  = "/figma-assets/icon-arrow-gray.svg";
const imgArrowGreen = "/figma-assets/icon-arrow-green.svg";

// ── Partner icon  (40.69×40 — fills 16px slot by width) ──────────────────────
const imgPartnerWhite = "/figma-assets/icon-partner-white.svg";
const imgPartnerBlue  = "/figma-assets/icon-partner-blue.svg";
const imgPartnerGray  = "/figma-assets/icon-partner-gray.svg";

// ── Chat icon  (30×30 — square) ───────────────────────────────────────────────
const imgChatBlue  = "/figma-assets/icon-chat-blue.svg";
const imgChatWhite = "/figma-assets/icon-chat-white.svg";
const imgChatGray  = "/figma-assets/icon-chat-gray.svg";

// ── Gift icon  (642×642 — square) ────────────────────────────────────────────
const imgGift = "/figma-assets/icon-gift-b.svg";

// ── Pessoas icon  (43.86×40.50 — fills 16px slot by width) ───────────────────
const imgPessoas = "/figma-assets/icon-pessoas-b.svg";

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

function Arrow({ src }: { src: string }) {
  return <FigmaIcon src={src} size={9} aspectW={11} aspectH={9} />;
}

function ArrowToggle({ defaultSrc, hoverSrc }: { defaultSrc: string; hoverSrc: string }) {
  return (
    <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
      <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
        <FigmaIcon src={defaultSrc} size={9} aspectW={11} aspectH={9} />
      </div>
      <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
        <FigmaIcon src={hoverSrc} size={9} aspectW={11} aspectH={9} />
      </div>
    </div>
  );
}

function Ico({ src, aspectW = 1, aspectH = 1 }: { src: string; aspectW?: number; aspectH?: number }) {
  const size = 16;
  const bleed = 2.5;
  const scale = size / Math.max(aspectW, aspectH);
  const innerW = aspectW * scale;
  const innerH = aspectH * scale;
  const bleedShort = ((bleed * Math.max(aspectW, aspectH)) / Math.min(aspectW, aspectH)).toFixed(2);
  const bleedLong = bleed.toFixed(2);
  const inset =
    aspectW > aspectH
      ? `-${bleedShort}% -${bleedLong}%`
      : `-${bleedLong}% -${bleedShort}%`;
  return (
    <div className="flex flex-col items-center justify-center relative shrink-0 size-[16px]">
      <div className="relative shrink-0" style={{ width: innerW, height: innerH }}>
        <div className="absolute" style={{ inset }}>
          <img alt="" className="block max-w-none size-full" src={src} />
        </div>
      </div>
    </div>
  );
}

function IcoToggle({ defaultSrc, hoverSrc, aspectW = 1, aspectH = 1 }: {
  defaultSrc: string; hoverSrc: string; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="relative size-[16px] shrink-0">
      <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
        <Ico src={defaultSrc} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
        <Ico src={hoverSrc} aspectW={aspectW} aspectH={aspectH} />
      </div>
    </div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-center whitespace-nowrap shrink-0 ${className}`}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared prop type
// ─────────────────────────────────────────────────────────────────────────────
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };
type BtnNoChildrenProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

// ─────────────────────────────────────────────────────────────────────────────
// OUTLINE AZUL
// ─────────────────────────────────────────────────────────────────────────────

export function BtnAzulOut({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#f6f9fe] border border-[#c8cfd8] cursor-not-allowed"
          : "bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#0233c3] group-hover:text-white group-active:text-white"}>
        {children}
      </Label>
    </button>
  );
}

export function BtnAzulOutArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#f6f9fe] border border-[#c8cfd8] cursor-not-allowed"
          : "bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#0233c3] group-hover:text-white group-active:text-white"}>
        {children}
      </Label>
      {disabled
        ? <Arrow src={imgArrowGray} />
        : <ArrowToggle defaultSrc={imgArrowBlue} hoverSrc={imgArrowWhite} />}
    </button>
  );
}

export function BtnAzulOutPartner({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[5px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#f6f9fe] border border-[#c8cfd8] cursor-not-allowed"
          : "bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8]"}
        ${className}`}
      {...rest}
    >
      {disabled
        ? <Ico src={imgPartnerGray} aspectW={40.69} aspectH={40} />
        : <IcoToggle defaultSrc={imgPartnerBlue} hoverSrc={imgPartnerWhite} aspectW={40.69} aspectH={40} />}
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#0233c3] group-hover:text-white group-active:text-white"}>
        {children}
      </Label>
    </button>
  );
}

export function BtnAzulOutPartnerArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[5px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#f6f9fe] border border-[#c8cfd8] cursor-not-allowed"
          : "bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8]"}
        ${className}`}
      {...rest}
    >
      {disabled
        ? <Ico src={imgPartnerGray} aspectW={40.69} aspectH={40} />
        : <IcoToggle defaultSrc={imgPartnerBlue} hoverSrc={imgPartnerWhite} aspectW={40.69} aspectH={40} />}
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#0233c3] group-hover:text-white group-active:text-white"}>
        {children}
      </Label>
      {disabled
        ? <Arrow src={imgArrowGray} />
        : <ArrowToggle defaultSrc={imgArrowBlue} hoverSrc={imgArrowWhite} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SÓLIDO AZUL
// ─────────────────────────────────────────────────────────────────────────────

export function BtnAzulBase({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#2a2a2b] cursor-not-allowed"
          : "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
    </button>
  );
}

export function BtnAzulBaseArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#2a2a2b] cursor-not-allowed"
          : "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
      <Arrow src={disabled ? imgArrowGray : imgArrowWhite} />
    </button>
  );
}

export function BtnAzulBasePartner({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#2a2a2b] cursor-not-allowed"
          : "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0]"}
        ${className}`}
      {...rest}
    >
      <Ico src={disabled ? imgPartnerGray : imgPartnerWhite} aspectW={40.69} aspectH={40} />
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
    </button>
  );
}

export function BtnAzulBasePartnerArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#2a2a2b] cursor-not-allowed"
          : "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0]"}
        ${className}`}
      {...rest}
    >
      <Ico src={disabled ? imgPartnerGray : imgPartnerWhite} aspectW={40.69} aspectH={40} />
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
      <Arrow src={disabled ? imgArrowGray : imgArrowWhite} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRADIENT (azul → lilás)
// ─────────────────────────────────────────────────────────────────────────────
const gdStyle = { backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" };
const gdHoverStyle = { backgroundImage: "linear-gradient(103.83deg, #002ba8 6.19%, #6e0cc3 93.35%)" };
const gdPressedStyle = { backgroundImage: "linear-gradient(103.83deg, #0569ff 6.19%, #b25efb 93.35%)" };

export function BtnGd({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-all cursor-pointer
        ${disabled ? "bg-[#2a2a2b] cursor-not-allowed" : ""}
        ${className}`}
      style={!disabled ? gdStyle : undefined}
      onMouseEnter={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdHoverStyle) : undefined}
      onMouseLeave={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      onMouseDown={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdPressedStyle) : undefined}
      onMouseUp={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
    </button>
  );
}

export function BtnGdArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer
        ${disabled ? "bg-[#2a2a2b] cursor-not-allowed" : ""}
        ${className}`}
      style={!disabled ? gdStyle : undefined}
      onMouseEnter={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdHoverStyle) : undefined}
      onMouseLeave={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      onMouseDown={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdPressedStyle) : undefined}
      onMouseUp={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
      <Arrow src={disabled ? imgArrowGray : imgArrowWhite} />
    </button>
  );
}

export function BtnGdGift({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] border border-white cursor-pointer
        ${disabled ? "bg-[#2a2a2b] cursor-not-allowed" : ""}
        ${className}`}
      style={!disabled ? gdStyle : undefined}
      onMouseEnter={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdHoverStyle) : undefined}
      onMouseLeave={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      onMouseDown={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdPressedStyle) : undefined}
      onMouseUp={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      {...rest}
    >
      <Ico src={imgGift} />
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>{children}</Label>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VERDE
// ─────────────────────────────────────────────────────────────────────────────

export function BtnVerde({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#2a2a2b] cursor-not-allowed"
          : "bg-[#36ae5c] hover:bg-[#0b8650] active:bg-[#e1f3e7]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white group-active:text-[#36ae5c]"}>
        {children}
      </Label>
    </button>
  );
}

export function BtnVerdeArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#2a2a2b] cursor-not-allowed"
          : "bg-[#36ae5c] hover:bg-[#0b8650] active:bg-[#e1f3e7]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white group-active:text-[#36ae5c]"}>
        {children}
      </Label>
      {disabled
        ? <Arrow src={imgArrowGray} />
        : <ArrowToggle defaultSrc={imgArrowWhite} hoverSrc={imgArrowWhite} />}
    </button>
  );
}

export function BtnVerdeOut({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#f6f9fe] border border-[#c8cfd8] cursor-not-allowed"
          : "bg-white border border-[#36ae5c] hover:bg-[#36ae5c] active:bg-[#0b8650]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#36ae5c] group-hover:text-white group-active:text-white"}>
        {children}
      </Label>
    </button>
  );
}

export function BtnVerdeOutArrow({ children, className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] transition-colors cursor-pointer
        ${disabled
          ? "bg-[#f6f9fe] border border-[#c8cfd8] cursor-not-allowed"
          : "bg-white border border-[#36ae5c] hover:bg-[#36ae5c] active:bg-[#0b8650]"}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#36ae5c] group-hover:text-white group-active:text-white"}>
        {children}
      </Label>
      {disabled
        ? <Arrow src={imgArrowGray} />
        : <ArrowToggle defaultSrc={imgArrowGreen} hoverSrc={imgArrowWhite} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ESPECÍFICOS (label fixo, usado no site todo)
// ─────────────────────────────────────────────────────────────────────────────

const BTN_LABELS: Record<string, Record<string, string>> = {
  falaAcquafy:  { pt: "Falar com a Acquafy",      "pt-pt": "Falar com a Acquafy",        en: "Talk to Acquafy",            "en-gb": "Talk to Acquafy",            es: "Hablar con Acquafy",        fr: "Parler à Acquafy",            de: "Mit Acquafy sprechen",        it: "Parla con Acquafy",           zh: "联系 Acquafy",        ja: "Acquafyに連絡",     ko: "Acquafy에 문의",    sv: "Prata med Acquafy",           fi: "Puhu Acquafylle",               ru: "Связаться с Acquafy",            ro: "Vorbeste cu Acquafy",         he: "דבר עם Acquafy" },
  distribuidor: { pt: "Quero ser Distribuidor",   "pt-pt": "Quero ser Distribuidor",      en: "I want to be a Distributor", "en-gb": "I want to be a Distributor", es: "Quiero ser Distribuidor",   fr: "Je veux être Distributeur",   de: "Ich möchte Distributor sein", it: "Voglio essere Distributore",  zh: "成为经销商",         ja: "代理店になる",      ko: "유통업체 되기",     sv: "Jag vill bli Distributör",    fi: "Haluan olla jakelija",          ru: "Хочу стать дистрибьютором",      ro: "Vreau sa fiu Distribuitor",   he: "אני רוצה להיות מפיץ" },
  kitGift:      { pt: "Solicitar Kit Promocional","pt-pt": "Solicitar Kit Promocional",   en: "Request Promotional Kit",    "en-gb": "Request Promotional Kit",    es: "Solicitar Kit Promocional", fr: "Demander un Kit Promotionnel", de: "Werbekit anfordern",          it: "Richiedi Kit Promozionale",   zh: "申请促销套件",       ja: "プロモキットを申請",ko: "프로모션 키트 요청", sv: "Begar Reklamkit",              fi: "Pyydä markkinointipaketti",     ru: "Запросить промо-комплект",        ro: "Solicita Kit Promotional",    he: "בקש ערכה פרומוציונלית" },
};

export function BtnFalaAcquafy({ className = "", disabled, ...rest }: BtnNoChildrenProps) {
  const { lang } = useLang();
  return (
    <a
      href="/contact"
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] transition-colors cursor-pointer bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] ${className}`}
    >
      <IcoToggle defaultSrc={imgChatBlue} hoverSrc={imgChatWhite} />
      <Label className="text-[#0233c3] group-hover:text-white group-active:text-white">
        {BTN_LABELS.falaAcquafy[lang]}
      </Label>
    </a>
  );
}

export function BtnDistribuidor({ className = "", disabled, ...rest }: BtnNoChildrenProps) {
  const { lang } = useLang();
  return (
    <a
      href="/contact"
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] border border-white transition-colors cursor-pointer bg-[#9f3df5] hover:bg-[#7a16d2] active:bg-[#b25efb] ${className}`}
    >
      <Ico src={imgPessoas} aspectW={43.86} aspectH={40.5} />
      <Label className="text-white">
        {BTN_LABELS.distribuidor[lang]}
      </Label>
    </a>
  );
}

export function BtnKitGift({ className = "", disabled, ...rest }: BtnNoChildrenProps) {
  const { lang } = useLang();
  return (
    <button
      disabled={disabled}
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] border border-white cursor-pointer
        ${disabled ? "bg-[#2a2a2b] cursor-not-allowed" : ""}
        ${className}`}
      style={!disabled ? gdStyle : undefined}
      onMouseEnter={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdHoverStyle) : undefined}
      onMouseLeave={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      onMouseDown={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdPressedStyle) : undefined}
      onMouseUp={!disabled ? (e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdStyle) : undefined}
      {...rest}
    >
      <Ico src={imgGift} />
      <Label className={disabled ? "text-[#c8cfd8]" : "text-white"}>
        {BTN_LABELS.kitGift[lang]}
      </Label>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXTO (sem fundo, sem borda)
// ─────────────────────────────────────────────────────────────────────────────

export function BtnSaibaMais({ children = "SAIBA MAIS", className = "", disabled, ...rest }: BtnProps) {
  return (
    <button
      disabled={disabled}
      className={`group flex gap-[5px] items-center justify-center bg-transparent cursor-pointer
        ${disabled ? "cursor-not-allowed" : ""}
        ${className}`}
      {...rest}
    >
      <Label className={disabled ? "text-[#c8cfd8]" : "text-[#2a2a2b] group-hover:text-[#0233c3] transition-colors"}>
        {children}
      </Label>
      {disabled
        ? <Arrow src={imgArrowGray} />
        : <ArrowToggle defaultSrc={imgArrowBlue} hoverSrc={imgArrowBlue} />}
    </button>
  );
}
