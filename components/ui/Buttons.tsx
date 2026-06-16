"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import FigmaIcon from "../FigmaIcon";

// ── Arrow icons  (11×9 landscape — fills 9px slot by width) ──────────────────
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-d.svg"; // outline Padrão
const imgArrowWhite = "/figma-assets/icon-arrow-white-hover.svg"; // solid buttons
const imgArrowGray  = "/figma-assets/icon-arrow-gray.svg"; // inactive
const imgArrowGreen = "/figma-assets/icon-arrow-green.svg"; // verde outline

// ── Partner icon  (40.69×40 — fills 16px slot by width) ──────────────────────
const imgPartnerWhite = "/figma-assets/icon-partner-white.svg"; // hover/pressed
const imgPartnerBlue  = "/figma-assets/icon-partner-blue.svg"; // outline Padrão
const imgPartnerGray  = "/figma-assets/icon-partner-gray.svg"; // inactive

// ── Chat icon  (30×30 — square) ───────────────────────────────────────────────
const imgChatBlue  = "/figma-assets/icon-chat-blue.svg"; // Padrão
const imgChatWhite = "/figma-assets/icon-chat-white.svg"; // hover/pressed
const imgChatGray  = "/figma-assets/icon-chat-gray.svg"; // inactive

// ── Gift icon  (642×642 — square) ────────────────────────────────────────────
const imgGift = "/figma-assets/icon-gift-b.svg";

// ── Pessoas icon  (43.86×40.50 — fills 16px slot by width) ───────────────────
const imgPessoas = "/figma-assets/icon-pessoas-b.svg";

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Fixed arrow: landscape 11×9 — fills 9px slot by width */
function Arrow({ src }: { src: string }) {
  return <FigmaIcon src={src} size={9} aspectW={11} aspectH={9} />;
}

/**
 * Toggle arrow: shows defaultSrc normally, hoverSrc on group-hover/group-active.
 * Landscape 11×9 — each state rendered via FigmaIcon in an absolute overlay.
 * Parent button MUST have className="group".
 */
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

/** 16×16 icon slot — longest axis fills 16px, shorter axis scales proportionally */
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

/**
 * Toggle icon: shows defaultSrc normally, hoverSrc on group-hover/group-active.
 * Parent button MUST have className="group".
 */
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

/** Button label — Avenir Heavy 14/17 */
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

/** Outline azul — sem ícone, sem seta */
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

/** Outline azul — com seta */
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

/** Outline azul + ícone parceiro */
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

/** Outline azul + ícone parceiro + seta */
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

/** Sólido azul — sem ícone, sem seta */
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

/** Sólido azul — com seta */
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

/** Sólido azul + ícone parceiro */
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

/** Sólido azul + ícone parceiro + seta */
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

/** Gradient — sem ícone, sem seta */
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

/** Gradient + seta */
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

/** Gradient + ícone presente (Kit Promocional) */
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

/** Verde sólido — sem seta */
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

/** Verde sólido + seta */
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

/** Outline verde — sem seta */
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

/** Outline verde + seta */
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

/**
 * "Falar com a Acquafy"
 * Padrão: bg-white border-azul ícone-azul texto-azul
 * Hover/Pressed: bg-azul ícone-branco texto-branco
 */
export function BtnFalaAcquafy({ className = "", disabled, ...rest }: BtnNoChildrenProps) {
  return (
    <a
      href="/contato"
      className={`group flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] transition-colors cursor-pointer bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] ${className}`}
    >
      <IcoToggle defaultSrc={imgChatBlue} hoverSrc={imgChatWhite} />
      <Label className="text-[#0233c3] group-hover:text-white group-active:text-white">
        Falar com a Acquafy
      </Label>
    </a>
  );
}

/**
 * "Quero ser Distribuidor"
 * Padrão: #9f3df5 | Hover: #7a16d2 | Pressed: #b25efb | Inactive: #2a2a2b
 */
export function BtnDistribuidor({ className = "", disabled, ...rest }: BtnNoChildrenProps) {
  return (
    <a
      href="/contato"
      className={`flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden p-[20px] rounded-[8px] border border-white transition-colors cursor-pointer bg-[#9f3df5] hover:bg-[#7a16d2] active:bg-[#b25efb] ${className}`}
    >
      <Ico src={imgPessoas} aspectW={43.86} aspectH={40.5} />
      <Label className="text-white">
        Quero ser Distribuidor
      </Label>
    </a>
  );
}

/**
 * "Solicitar Kit Promocional"
 * Gradient + ícone presente
 */
export function BtnKitGift({ className = "", disabled, ...rest }: BtnNoChildrenProps) {
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
        Solicitar Kit Promocional
      </Label>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXTO (sem fundo, sem borda)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * "SAIBA MAIS →" — texto puro com seta
 * Padrão: texto #2a2a2b seta azul | Hover: texto azul | Inactive: cinza
 */
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
