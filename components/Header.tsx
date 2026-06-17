"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import FigmaIcon from "./FigmaIcon";
import { LanguageSelectorCompact } from "./ui/LanguageSelector";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgLogo    = "/figma-assets/logo-acquafy.svg";
const imgPartner = "/figma-assets/icon-partner-b.svg";

// ── Types ────────────────────────────────────────────────────────────────────
type DropdownItem = {
  label: string; href: string; desc: string; cta: string;
  bg: string; light?: boolean;
};

type NavItem = {
  label: string; href: string; extra: string[]; dropdown: DropdownItem[];
};

// ── Non-translatable nav structure (hrefs, bgs) ───────────────────────────
const NAV_STRUCTURE = [
  {
    href:  "/plataforma",
    extra: ["/app-ai-iot", "/central-de-suporte", "/tecnologia"],
    dropdown: [
      { href: "/plataforma",         bg: "linear-gradient(135deg, #0233c3 0%, #0569ff 100%)" },
      { href: "/app-ai-iot",         bg: "linear-gradient(135deg, #07235c 0%, #0233c3 100%)" },
      { href: "/central-de-suporte", bg: "#f0f5ff", light: true },
      { href: "/tecnologia",         bg: "linear-gradient(135deg, #0569ff 0%, #00b4d8 100%)" },
    ],
  },
  {
    href:  "/linha-neo",
    extra: ["/neo-media", "/filtros", "/compare"],
    dropdown: [
      { href: "/linha-neo", bg: "linear-gradient(135deg, #0233c3 0%, #0569ff 100%)" },
      { href: "/neo-media", bg: "linear-gradient(135deg, #07235c 0%, #1f2e91 100%)" },
      { href: "/filtros",   bg: "#f0f5ff", light: true },
      { href: "/compare",   bg: "linear-gradient(135deg, #1f2e91 0%, #0569ff 100%)" },
    ],
  },
  {
    href:  "/sobre",
    extra: ["/expansao-global", "/contato", "/base-de-conhecimento"],
    dropdown: [
      { href: "/sobre",                bg: "linear-gradient(135deg, #0233c3 0%, #0569ff 100%)" },
      { href: "/expansao-global",      bg: "linear-gradient(135deg, #07235c 0%, #0233c3 100%)" },
      { href: "/base-de-conhecimento", bg: "linear-gradient(135deg, #1f2e91 0%, #9f3df5 100%)" },
      { href: "/contato",              bg: "#f0f5ff", light: true },
    ],
  },
  { href: "/checkin", extra: [], dropdown: [] },
];

type NavTxt = { label: string; dd: { label: string; desc: string; cta: string }[] };

const NAV_TEXT: Record<Lang, NavTxt[]> = {
  pt: [
    { label: "Plataforma", dd: [
      { label: "Plataforma Acquafy",            desc: "Gestão inteligente da água com App, AI e IoT totalmente integrados.",       cta: "Conheça a Plataforma"  },
      { label: "App + AI + IoT",                desc: "Controle remoto, automação e inteligência artificial na palma da mão.",     cta: "Ver o App"             },
      { label: "Central de Suporte",            desc: "Suporte técnico especializado para manter sua Acquafy sempre operando.",    cta: "Acessar Suporte"       },
      { label: "Tecnologia & Sustentabilidade", desc: "Inovação de ponta aliada a um impacto ambiental positivo.",                 cta: "Saiba mais"            },
    ]},
    { label: "Produtos", dd: [
      { label: "Linha Neo",            desc: "Purificadores com Painel LED Touch, App, UV LED e filtros UF premium.",              cta: "Ver Linha Neo"   },
      { label: "Acquafy Media",        desc: "Comunicação e conteúdo multimídia integrados ao purificador.",                       cta: "Ver Media"       },
      { label: "Filtros & Acessórios", desc: "Reposição inteligente com rastreabilidade e qualidade garantida.",                   cta: "Ver Filtros"     },
      { label: "Compare Produtos",     desc: "Encontre o modelo ideal comparando specs, capacidade e tecnologia.",                 cta: "Comparar Agora"  },
    ]},
    { label: "Empresa", dd: [
      { label: "Sobre Nós",            desc: "Fundada nos EUA em 2020 e presente em mais de 180 países.",                         cta: "Nossa História"  },
      { label: "Expansão Global",      desc: "Operação 100% global com modelo de receita 100% recorrente.",                       cta: "Ver Expansão"    },
      { label: "Base de Conhecimento", desc: "Artigos, tutoriais, FAQs e suporte especializado sobre todos os produtos Acquafy.", cta: "Acessar Base"    },
      { label: "Contatos",             desc: "Fale com nossa equipe e encontre o distribuidor mais próximo.",                      cta: "Falar Conosco"   },
    ]},
    { label: "Comprar agora", dd: [] },
  ],
  en: [
    { label: "Platform", dd: [
      { label: "Acquafy Platform",          desc: "Intelligent water management with fully integrated App, AI and IoT.",               cta: "Explore the Platform" },
      { label: "App + AI + IoT",            desc: "Remote control, automation and artificial intelligence in the palm of your hand.",  cta: "See the App"          },
      { label: "Support Center",            desc: "Specialized technical support to keep your Acquafy always running.",                cta: "Access Support"       },
      { label: "Technology & Sustainability", desc: "Cutting-edge innovation combined with a positive environmental impact.",          cta: "Learn more"           },
    ]},
    { label: "Products", dd: [
      { label: "Neo Line",              desc: "Purifiers with LED Touch Panel, App, UV LED and premium UF filters.",                   cta: "See Neo Line"    },
      { label: "Acquafy Media",         desc: "Multimedia communication and content integrated into the purifier.",                    cta: "See Media"       },
      { label: "Filters & Accessories", desc: "Smart replacement with traceability and guaranteed quality.",                           cta: "See Filters"     },
      { label: "Compare Products",      desc: "Find the ideal model by comparing specs, capacity and technology.",                     cta: "Compare Now"     },
    ]},
    { label: "Company", dd: [
      { label: "About Us",           desc: "Founded in the USA in 2020 and present in more than 180 countries.",                      cta: "Our Story"       },
      { label: "Global Expansion",   desc: "100% global operation with a 100% recurring revenue model.",                              cta: "See Expansion"   },
      { label: "Knowledge Base",     desc: "Articles, tutorials, FAQs and specialized support on all Acquafy products.",              cta: "Access Base"     },
      { label: "Contact",            desc: "Talk to our team and find the nearest distributor.",                                       cta: "Talk to Us"      },
    ]},
    { label: "Buy now", dd: [] },
  ],
  es: [
    { label: "Plataforma", dd: [
      { label: "Plataforma Acquafy",         desc: "Gestión inteligente del agua con App, IA e IoT totalmente integrados.",            cta: "Conoce la Plataforma"  },
      { label: "App + IA + IoT",             desc: "Control remoto, automatización e inteligencia artificial en la palma de tu mano.", cta: "Ver la App"             },
      { label: "Central de Soporte",         desc: "Soporte técnico especializado para mantener tu Acquafy siempre operando.",         cta: "Acceder al Soporte"    },
      { label: "Tecnología & Sostenibilidad", desc: "Innovación de vanguardia aliada a un impacto ambiental positivo.",               cta: "Saber más"              },
    ]},
    { label: "Productos", dd: [
      { label: "Línea Neo",            desc: "Purificadores con Panel LED Touch, App, UV LED y filtros UF premium.",                   cta: "Ver Línea Neo"      },
      { label: "Acquafy Media",        desc: "Comunicación y contenido multimedia integrados al purificador.",                         cta: "Ver Media"          },
      { label: "Filtros y Accesorios", desc: "Reposición inteligente con trazabilidad y calidad garantizada.",                        cta: "Ver Filtros"        },
      { label: "Comparar Productos",   desc: "Encuentra el modelo ideal comparando specs, capacidad y tecnología.",                   cta: "Comparar Ahora"     },
    ]},
    { label: "Empresa", dd: [
      { label: "Sobre Nosotros",       desc: "Fundada en EE.UU. en 2020 y presente en más de 180 países.",                            cta: "Nuestra Historia"   },
      { label: "Expansión Global",     desc: "Operación 100% global con modelo de ingresos 100% recurrente.",                         cta: "Ver Expansión"      },
      { label: "Base de Conocimiento", desc: "Artículos, tutoriales, FAQs y soporte especializado sobre todos los productos Acquafy.", cta: "Acceder a la Base" },
      { label: "Contacto",             desc: "Habla con nuestro equipo y encuentra el distribuidor más cercano.",                      cta: "Contáctanos"        },
    ]},
    { label: "Comprar ahora", dd: [] },
  ],
};

const PARTNER_BTN: Record<Lang, string> = {
  pt: "Seja um Parceiro",
  en: "Be a Partner",
  es: "Ser un Socio",
};

const ARIA_MENU: Record<Lang, { open: string; close: string }> = {
  pt: { open: "Abrir menu",  close: "Fechar menu"  },
  en: { open: "Open menu",   close: "Close menu"   },
  es: { open: "Abrir menú",  close: "Cerrar menú"  },
};

function buildNavItems(navT: NavTxt[]): NavItem[] {
  return NAV_STRUCTURE.map((s, i) => ({
    label:    navT[i].label,
    href:     s.href,
    extra:    s.extra,
    dropdown: s.dropdown.map((dd, j) => ({
      ...dd,
      label: navT[i].dd[j]?.label ?? "",
      desc:  navT[i].dd[j]?.desc  ?? "",
      cta:   navT[i].dd[j]?.cta   ?? "",
    })),
  }));
}

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

function ArrowRight({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
      <div className="flex flex-col gap-[8px]">
        <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[15px] leading-[19px] ${titleCls}`}>{item.label}</p>
        <p className={`font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[17px] ${descCls}`}>{item.desc}</p>
      </div>
      <span className="inline-flex items-center gap-[5px]">
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[14px]" style={{ color: ctaColor }}>{item.cta}</span>
        <ArrowRight color={ctaColor} />
      </span>
    </a>
  );
}

function NavTrigger({ label, href, active, hasDropdown, open, onMouseEnter }: {
  label: string; href: string; active: boolean;
  hasDropdown: boolean; open: boolean; onMouseEnter: () => void;
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
      <p className={`font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-center whitespace-nowrap transition-colors duration-150 shrink-0 ${highlighted ? "text-[#0233c3]" : "text-[#333] group-hover:text-[#0233c3]"}`}>
        {label}
      </p>
      {hasDropdown && <Chevron open={open} color={textColor} />}
      {active && <span className="absolute bottom-0 left-[8px] right-[8px] h-[2px] rounded-full bg-[#0233c3]" />}
    </>
  );
  return (
    <div className="relative flex flex-[1_0_0] max-w-[160px]" onMouseEnter={onMouseEnter}>
      {hasDropdown
        ? <div className={`${cls} cursor-default`}>{inner}</div>
        : <a href={href} className={cls}>{inner}</a>
      }
    </div>
  );
}

function MobileNavLink({ label, href, active, dropdown, onClose }: {
  label: string; href: string; active: boolean; dropdown: DropdownItem[]; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasDropdown = dropdown.length > 0;
  return (
    <div className="flex flex-col border-b border-[#cbd0d4] last:border-b-0">
      {hasDropdown ? (
        <button
          className={`flex items-center justify-between min-h-[52px] px-[10px] rounded-[8px] w-full transition-colors cursor-pointer ${active ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}`}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] transition-colors ${active ? "text-[#0233c3]" : "text-[#333]"}`}>{label}</span>
          <Chevron open={expanded} color={active ? "#0233c3" : "#333"} />
        </button>
      ) : (
        <a href={href} onClick={onClose} className={`flex items-center min-h-[52px] px-[10px] rounded-[8px] transition-colors ${active ? "bg-[#f6f9fe]" : "hover:bg-[#f6f9fe]"}`}>
          <span className={`font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] transition-colors ${active ? "text-[#0233c3]" : "text-[#333]"}`}>{label}</span>
        </a>
      )}
      {hasDropdown && expanded && (
        <div className="flex flex-col pl-[24px] pb-[8px]">
          {dropdown.map((item) => (
            <a key={item.label} href={item.href} onClick={onClose} className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] hover:text-[#0233c3] py-[10px] pr-[10px] transition-colors">
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
  const pathname   = usePathname();
  const { lang }   = useLang();

  const navItems   = buildNavItems(NAV_TEXT[lang]);
  const partnerBtn = PARTNER_BTN[lang];
  const ariaMenu   = ARIA_MENU[lang];
  const activeNav  = navItems.find((n) => n.label === openDropdown);

  function isActive(item: NavItem) {
    return pathname === item.href || pathname.startsWith(item.href + "/") || item.extra.includes(pathname);
  }

  return (
    <header
      className="bg-white w-full flex flex-col items-center px-[20px] fixed top-0 left-0 right-0 z-50 shadow-[0_1px_0_0_#e6e6e6]"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="flex h-[80px] items-center justify-between gap-[20px] max-w-[1400px] w-full">
        <a href="/" className="flex flex-col items-start shrink-0">
          <div className="relative h-[34px] w-[160px]">
            <img alt="Acquafy" className="absolute inset-0 w-full h-full object-contain" src={imgLogo} />
          </div>
        </a>

        <nav className="hidden lg:flex flex-1 gap-[2px] h-[80px] items-center justify-center">
          {navItems.map((item) => (
            <NavTrigger
              key={item.href}
              label={item.label}
              href={item.href}
              active={isActive(item)}
              hasDropdown={item.dropdown.length > 0}
              open={openDropdown === item.label}
              onMouseEnter={() => setOpenDropdown(item.dropdown.length > 0 ? item.label : null)}
            />
          ))}
        </nav>

        <div className="flex gap-[10px] items-center justify-end shrink-0">
          <LanguageSelectorCompact />
          <a href="/parceria" className="hidden lg:flex bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors gap-[10px] items-center justify-center h-[40px] overflow-hidden px-[20px] rounded-[8px] shrink-0 cursor-pointer">
            <FigmaIcon src={imgPartner} size={16} aspectW={41} aspectH={40} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">{partnerBtn}</span>
          </a>
          <button
            className="lg:hidden flex items-center justify-center w-[40px] h-[40px] rounded-[8px] hover:bg-[#f6f9fe] transition-colors cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? ariaMenu.close : ariaMenu.open}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {openDropdown && activeNav && activeNav.dropdown.length > 0 && (
        <div className="hidden lg:flex absolute top-[80px] left-0 right-0 bg-white border-t border-[#cbd0d4] shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] z-50 justify-center px-[20px] py-[20px]">
          <div className="flex gap-[12px] max-w-[1400px] w-full">
            {activeNav.dropdown.map((item) => <DropdownCard key={item.href} item={item} />)}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 right-0 bg-white border-t border-[#cbd0d4] shadow-lg z-50">
          <div className="flex flex-col px-[20px] py-[10px] max-w-[1400px] mx-auto">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.href}
                label={item.label}
                href={item.href}
                active={isActive(item)}
                dropdown={item.dropdown}
                onClose={() => setMenuOpen(false)}
              />
            ))}
            <div className="pt-[16px] pb-[10px]">
              <a href="/parceria" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex gap-[10px] items-center justify-center h-[48px] overflow-hidden px-[20px] rounded-[8px] w-full cursor-pointer">
                <FigmaIcon src={imgPartner} size={16} aspectW={41} aspectH={40} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">{partnerBtn}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
