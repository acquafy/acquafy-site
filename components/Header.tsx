"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import FigmaIcon from "./FigmaIcon";
import { LanguageSelectorCompact } from "./ui/LanguageSelector";

// Logo: aspect 1133.86×237.88
const imgLogo    = "/figma-assets/7641c2d1-4055-43a1-83ae-8a4ce06cbf9d.svg";
// Partner icon: 40.69×40
const imgPartner = "/figma-assets/ce8a6a7c-0e01-4346-932a-27b6fd8188ed.svg";

// ── Types ────────────────────────────────────────────────────────────────────
type DropdownItem = {
  label: string;
  href:  string;
  desc:  string;
  cta:   string;
  bg:    string;       // CSS background value (gradient or color)
  light?: boolean;     // true → dark text (for light cards)
};

type NavItem = {
  label:    string;
  href:     string;
  extra:    string[];
  dropdown: DropdownItem[];
};

// ── Nav data ─────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  {
    label: "Plataforma",
    href:  "/plataforma",
    extra: ["/app-ai-iot", "/central-de-suporte", "/tecnologia"],
    dropdown: [
      {
        label: "Plataforma Acquafy",
        href:  "/plataforma",
        desc:  "Gestão inteligente da água com App, AI e IoT totalmente integrados.",
        cta:   "Conheça a Plataforma",
        bg:    "linear-gradient(135deg, #0233c3 0%, #0569ff 100%)",
      },
      {
        label: "App + AI + IoT",
        href:  "/app-ai-iot",
        desc:  "Controle remoto, automação e inteligência artificial na palma da mão.",
        cta:   "Ver o App",
        bg:    "linear-gradient(135deg, #07235c 0%, #0233c3 100%)",
      },
      {
        label: "Central de Suporte",
        href:  "/central-de-suporte",
        desc:  "Suporte técnico especializado para manter sua Acquafy sempre operando.",
        cta:   "Acessar Suporte",
        bg:    "#f0f5ff",
        light: true,
      },
      {
        label: "Tecnologia & Sustentabilidade",
        href:  "/tecnologia",
        desc:  "Inovação de ponta aliada a um impacto ambiental positivo.",
        cta:   "Saiba mais",
        bg:    "linear-gradient(135deg, #0569ff 0%, #00b4d8 100%)",
      },
    ],
  },
  {
    label: "Produtos",
    href:  "/linha-neo",
    extra: ["/neo-media", "/filtros", "/compare"],
    dropdown: [
      {
        label: "Linha Neo",
        href:  "/linha-neo",
        desc:  "Purificadores com Painel LED Touch, App, UV LED e filtros UF premium.",
        cta:   "Ver Linha Neo",
        bg:    "linear-gradient(135deg, #0233c3 0%, #0569ff 100%)",
      },
      {
        label: "Acquafy Media",
        href:  "/neo-media",
        desc:  "Comunicação e conteúdo multimídia integrados ao purificador.",
        cta:   "Ver Media",
        bg:    "linear-gradient(135deg, #07235c 0%, #1f2e91 100%)",
      },
      {
        label: "Filtros & Acessórios",
        href:  "/filtros",
        desc:  "Reposição inteligente com rastreabilidade e qualidade garantida.",
        cta:   "Ver Filtros",
        bg:    "#f0f5ff",
        light: true,
      },
      {
        label: "Compare Produtos",
        href:  "/compare",
        desc:  "Encontre o modelo ideal comparando specs, capacidade e tecnologia.",
        cta:   "Comparar Agora",
        bg:    "linear-gradient(135deg, #1f2e91 0%, #0569ff 100%)",
      },
    ],
  },
  { label: "Parceiros", href: "/parceria", extra: [], dropdown: [] },
  {
    label: "Empresa",
    href:  "/sobre",
    extra: ["/expansao-global", "/contato"],
    dropdown: [
      {
        label: "Sobre Nós",
        href:  "/sobre",
        desc:  "Fundada nos EUA em 2020 e presente em mais de 180 países.",
        cta:   "Nossa História",
        bg:    "linear-gradient(135deg, #0233c3 0%, #0569ff 100%)",
      },
      {
        label: "Expansão Global",
        href:  "/expansao-global",
        desc:  "Operação 100% global com modelo de receita 100% recorrente.",
        cta:   "Ver Expansão",
        bg:    "linear-gradient(135deg, #07235c 0%, #0233c3 100%)",
      },
      {
        label: "Contatos",
        href:  "/contato",
        desc:  "Fale com nossa equipe e encontre o distribuidor mais próximo.",
        cta:   "Falar Conosco",
        bg:    "#f0f5ff",
        light: true,
      },
    ],
  },
];

// ── Chevron ───────────────────────────────────────────────────────────────────
function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <svg
      width="8" height="5" viewBox="0 0 8 5" fill="none"
      className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l3 3 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Hamburger ────────────────────────────────────────────────────────────────
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

// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowRight({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Mega-menu card ────────────────────────────────────────────────────────────
function DropdownCard({ item }: { item: DropdownItem }) {
  const titleCls = item.light ? "text-[#07235c]" : "text-white";
  const descCls  = item.light ? "text-[#4a5568]" : "text-white/75";
  const ctaColor = item.light ? "#0233c3" : "#ffffff";

  return (
    <a
      href={item.href}
      className="flex flex-[1_0_0] flex-col justify-between gap-[20px] min-w-[180px] p-[20px] rounded-[16px] min-h-[165px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_10px_28px_0_rgba(0,0,0,0.16)]"
      style={{ background: item.bg }}
    >
      {/* Text block */}
      <div className="flex flex-col gap-[8px]">
        <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[19px] ${titleCls}`}>
          {item.label}
        </p>
        <p className={`font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[17px] ${descCls}`}>
          {item.desc}
        </p>
      </div>

      {/* CTA */}
      <span className="inline-flex items-center gap-[5px]">
        <span
          className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[14px]"
          style={{ color: ctaColor }}
        >
          {item.cta}
        </span>
        <ArrowRight color={ctaColor} />
      </span>
    </a>
  );
}

// ── Desktop nav trigger ───────────────────────────────────────────────────────
function NavTrigger({
  label, href, active, hasDropdown, open, onMouseEnter,
}: {
  label: string; href: string; active: boolean;
  hasDropdown: boolean; open: boolean;
  onMouseEnter: () => void;
}) {
  const highlighted = active || open;
  const textColor   = highlighted ? "#0233c3" : "#333";

  const cls = `
    group relative flex w-full items-center justify-center gap-[4px]
    min-h-[80px] min-w-px px-[15px] py-[8px] rounded-[4px]
    transition-colors duration-150
    ${highlighted ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}
  `;

  const inner = (
    <>
      <p className={`
        font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px]
        text-center whitespace-nowrap transition-colors duration-150 shrink-0
        ${highlighted ? "text-[#0233c3]" : "text-[#333] group-hover:text-[#0233c3]"}
      `}>
        {label}
      </p>
      {hasDropdown && <Chevron open={open} color={textColor} />}
      {active && <span className="absolute bottom-0 left-[8px] right-[8px] h-[2px] rounded-full bg-[#0233c3]" />}
    </>
  );

  return (
    <div
      className="relative flex flex-[1_0_0] max-w-[160px]"
      onMouseEnter={onMouseEnter}
    >
      {hasDropdown
        ? <div className={`${cls} cursor-default`}>{inner}</div>
        : <a href={href} className={cls}>{inner}</a>
      }
    </div>
  );
}

// ── Mobile nav link ───────────────────────────────────────────────────────────
function MobileNavLink({
  label, href, active, dropdown, onClose,
}: {
  label: string; href: string; active: boolean;
  dropdown: DropdownItem[]; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasDropdown = dropdown.length > 0;

  return (
    <div className="flex flex-col border-b border-[#cbd0d4] last:border-b-0">
      {hasDropdown ? (
        /* Com dropdown: só abre/fecha lista — NÃO navega */
        <button
          className={`flex items-center justify-between min-h-[52px] px-[10px] rounded-[8px] w-full transition-colors cursor-pointer ${active ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}`}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] transition-colors ${active ? "text-[#0233c3]" : "text-[#333]"}`}>
            {label}
          </span>
          <Chevron open={expanded} color={active ? "#0233c3" : "#333"} />
        </button>
      ) : (
        /* Sem dropdown: link direto */
        <a
          href={href}
          onClick={onClose}
          className={`flex items-center min-h-[52px] px-[10px] rounded-[8px] transition-colors ${active ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}`}
        >
          <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] transition-colors ${active ? "text-[#0233c3]" : "text-[#333]"}`}>
            {label}
          </span>
        </a>
      )}

      {/* Sub-itens */}
      {hasDropdown && expanded && (
        <div className="flex flex-col pl-[24px] pb-[8px]">
          {dropdown.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] hover:text-[#0233c3] py-[10px] pr-[10px] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Header() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const activeNav = navItems.find((n) => n.label === openDropdown);

  function isActive(item: NavItem) {
    return (
      pathname === item.href ||
      pathname.startsWith(item.href + "/") ||
      item.extra.includes(pathname)
    );
  }

  return (
    <header
      className="bg-white w-full flex flex-col items-center px-[20px] fixed top-0 left-0 right-0 z-50 shadow-[0_1px_0_0_#e6e6e6]"
      onMouseLeave={() => setOpenDropdown(null)}
    >

      {/* ── Top bar ────────────────────────────────────────────────── */}
      <div className="flex h-[80px] items-center justify-between gap-[20px] max-w-[1400px] w-full">

        {/* Logo */}
        <a href="/" className="flex flex-col items-start shrink-0">
          <div className="relative h-[34px] w-[160px]">
            <img alt="Acquafy" className="absolute inset-0 w-full h-full object-contain" src={imgLogo} />
          </div>
        </a>

        {/* ── Desktop nav ≥1024px ────────────────────────────────── */}
        <nav className="hidden lg:flex flex-1 gap-[2px] h-[80px] items-center justify-center">
          {navItems.map((item) => (
            <NavTrigger
              key={item.label}
              label={item.label}
              href={item.href}
              active={isActive(item)}
              hasDropdown={item.dropdown.length > 0}
              open={openDropdown === item.label}
              onMouseEnter={() =>
                setOpenDropdown(item.dropdown.length > 0 ? item.label : null)
              }
            />
          ))}
        </nav>

        {/* ── Actions ────────────────────────────────────────────── */}
        <div className="flex gap-[10px] items-center justify-end shrink-0">
          <LanguageSelectorCompact />

          <button className="hidden lg:flex bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors gap-[10px] items-center justify-center h-[40px] overflow-hidden px-[20px] rounded-[8px] shrink-0 cursor-pointer">
            <FigmaIcon src={imgPartner} size={16} aspectW={41} aspectH={40} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              Seja um Parceiro
            </span>
          </button>

          <button
            className="lg:hidden flex items-center justify-center w-[40px] h-[40px] rounded-[8px] hover:bg-[#f6f9fe] transition-colors cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ── Mega-menu panel (desktop only) ─────────────────────────── */}
      {openDropdown && activeNav && activeNav.dropdown.length > 0 && (
        <div className="hidden lg:flex absolute top-[80px] left-0 right-0 bg-white border-t border-[#cbd0d4] shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] z-50 justify-center px-[20px] py-[20px]">
          <div className="flex gap-[12px] max-w-[1400px] w-full">
            {activeNav.dropdown.map((item) => (
              <DropdownCard key={item.label} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile menu ────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 right-0 bg-white border-t border-[#cbd0d4] shadow-lg z-50">
          <div className="flex flex-col px-[20px] py-[10px] max-w-[1400px] mx-auto">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.label}
                label={item.label}
                href={item.href}
                active={isActive(item)}
                dropdown={item.dropdown}
                onClose={() => setMenuOpen(false)}
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
