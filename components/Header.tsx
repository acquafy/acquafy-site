"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import FigmaIcon from "./FigmaIcon";
import { LanguageSelectorCompact } from "./ui/LanguageSelector";

// Logo: aspect 1133.86×237.88
const imgLogo    = "/figma-assets/7641c2d1-4055-43a1-83ae-8a4ce06cbf9d.svg";
// Partner icon: 40.69×40
const imgPartner = "/figma-assets/ce8a6a7c-0e01-4346-932a-27b6fd8188ed.svg";

const navItems = [
  { label: "Plataforma", href: "/plataforma", extra: [] },
  { label: "Produtos",   href: "/produtos",   extra: ["/compare"] },
  { label: "Parceiros",  href: "/parceiros",  extra: [] },
  { label: "Empresa",    href: "/empresa",    extra: [] },
  { label: "Recursos",   href: "/recursos",   extra: [] },
];

// ── Hamburger / Close icon ──────────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      {open ? (
        <>
          <line x1="3" y1="3"  x2="19" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="3" x2="3"  y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="5"  x2="19" y2="5"  stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="17" x2="19" y2="17" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ── Nav link — 3 estados: Padrão / Hover / Ativo ───────────────────────────
// Padrão : fundo transparente, texto #333, Avenir 55 Roman
// Hover  : fundo #f6f9fe,      texto #0233c3
// Ativo  : fundo #f6f9fe,      texto #0233c3 bold + indicador azul na base
// ── Nav link — 3 estados ────────────────────────────────────────────────────
// Figma (3010:4844): container flex-[1_0_0] max-w-[160px] min-h-[80px] px-15 py-8 rounded-4px
// Texto: Avenir LT Pro 85 Heavy 14px leading-17 em TODOS os estados (só a cor muda)
// Padrão : texto #333, fundo transparente
// Hover  : texto #0233c3, fundo #f6f9fe
// Ativo  : texto #0233c3, fundo #f6f9fe + linha azul 2px na base
function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <a
      href={href}
      className={`
        group relative flex flex-[1_0_0] items-center justify-center
        max-w-[160px] min-h-[80px] min-w-px px-[15px] py-[8px] rounded-[4px]
        transition-colors duration-150
        ${active ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}
      `}
    >
      {/* Texto — sempre 85 Heavy 14px, só a cor varia */}
      <p
        className={`
          font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px]
          text-center whitespace-nowrap transition-colors duration-150 shrink-0
          ${active ? "text-[#0233c3]" : "text-[#333] group-hover:text-[#0233c3]"}
        `}
      >
        {label}
      </p>

      {/* Indicador ativo: linha azul 2px na base */}
      {active && (
        <span className="absolute bottom-0 left-[8px] right-[8px] h-[2px] rounded-full bg-[#0233c3]" />
      )}
    </a>
  );
}

// ── Mobile nav link ─────────────────────────────────────────────────────────
function MobileNavLink({ label, href, active, onClick }: { label: string; href: string; active: boolean; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        group flex items-center min-h-[52px] px-[10px] rounded-[8px] transition-colors border-b border-[#f0f0f0] last:border-b-0
        ${active ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}
      `}
    >
      <span
        className={`
          font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[21px] transition-colors
          ${active ? "text-[#0233c3]" : "text-[#333] group-hover:text-[#0233c3]"}
        `}
      >
        {label}
      </span>
    </a>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white w-full flex flex-col items-center px-[20px] fixed top-0 left-0 right-0 z-50 shadow-[0_1px_0_0_#e6e6e6]">

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="flex h-[80px] items-center justify-between max-w-[1400px] w-full">

        {/* Logo — link para home */}
        <a href="/" className="flex flex-col items-start shrink-0">
          <div className="relative h-[34px] w-[160px]">
            <img alt="Acquafy" className="absolute inset-0 w-full h-full object-contain" src={imgLogo} />
          </div>
        </a>

        {/* ── DESKTOP nav ≥1024px ──────────────────────────────────── */}
        <nav className="hidden lg:flex flex-1 gap-[2px] h-[80px] items-center justify-center">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              href={item.href}
              active={pathname === item.href || pathname.startsWith(item.href + "/") || item.extra.includes(pathname)}
            />
          ))}
        </nav>

        {/* ── Actions (direita) ─────────────────────────────────────── */}
        <div className="flex gap-[10px] items-center justify-end shrink-0">

          {/* Idioma — sempre visível */}
          <LanguageSelectorCompact />

          {/* Seja um Parceiro — só ≥1024px */}
          <button className="hidden lg:flex bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors gap-[10px] items-center justify-center h-[40px] overflow-hidden px-[20px] rounded-[8px] shrink-0 cursor-pointer">
            <FigmaIcon src={imgPartner} size={16} aspectW={41} aspectH={40} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              Seja um Parceiro
            </span>
          </button>

          {/* Hamburger — só <1024px */}
          <button
            className="lg:hidden flex items-center justify-center w-[40px] h-[40px] rounded-[8px] hover:bg-[#f6f9fe] transition-colors cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 right-0 bg-white border-t border-[#e6e6e6] shadow-lg z-50">
          <div className="flex flex-col px-[20px] py-[10px] max-w-[1400px] mx-auto">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.label}
                label={item.label}
                href={item.href}
                active={pathname === item.href || pathname.startsWith(item.href + "/") || item.extra.includes(pathname)}
                onClick={() => setMenuOpen(false)}
              />
            ))}
            <div className="pt-[16px] pb-[10px]">
              <button className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex gap-[10px] items-center justify-center h-[48px] overflow-hidden px-[20px] rounded-[8px] w-full cursor-pointer">
                <FigmaIcon src={imgPartner} size={16} aspectW={41} aspectH={40} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
                  Seja um Parceiro
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
