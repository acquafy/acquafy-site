"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { LanguageSelectorFull } from "./ui/LanguageSelector";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgLogo      = "/figma-assets/logo-b.svg";
const imgInstagram = "/figma-assets/icon-instagram.svg";
const imgX         = "/figma-assets/icon-x-twitter.svg";
const imgLinkedin  = "/figma-assets/icon-linkedin.svg";
const imgYoutube   = "/figma-assets/icon-youtube.svg";
const imgFacebook  = "/figma-assets/icon-facebook.svg";
const imgArrowBullet = "/figma-assets/icon-arrow-bullet.svg";
const imgGlobe     = "/figma-assets/icon-globe-planetweb-30px.svg";
const imgChat      = "/figma-assets/icon-chat-large.svg";
const imgLocation  = "/figma-assets/icon-location-b.svg";
const imgMoney     = "/figma-assets/icon-money-large-b.svg";
const imgFlagUSA   = "/figma-assets/flag-usa.svg";
const imgGlobeSust = "/figma-assets/icon-globe-sust.svg";
const imgArrowDown = "/figma-assets/icon-arrow-down.svg";

const certLogos = [
  "/figma-assets/cert-badge-a.svg",
  "/figma-assets/cert-badge-b.svg",
  "/figma-assets/cert-badge-c.svg",
  "/figma-assets/cert-badge-d.svg",
  "/figma-assets/cert-badge-e.svg",
];

const socialIcons = [
  { src: imgInstagram, alt: "Instagram",   aspectW: 30,      aspectH: 30      },
  { src: imgX,         alt: "X (Twitter)", aspectW: 1000.78, aspectH: 936.69  },
  { src: imgLinkedin,  alt: "LinkedIn",    aspectW: 30,      aspectH: 30      },
  { src: imgYoutube,   alt: "YouTube",     aspectW: 22,      aspectH: 15.5    },
  { src: imgFacebook,  alt: "Facebook",    aspectW: 30.16,   aspectH: 30      },
];

// ── Translations ─────────────────────────────────────────────────────────────
type NavCol = { title: string; links: { label: string; href: string }[] };
type StatItem = { sub: string; main: string };

const T: Record<Lang, {
  desc: string;
  nav: NavCol[];
  stats: StatItem[];
  founded: string;
  globalPlatform: string;
  copyright: string;
  terms: string;
  privacy: string;
}> = {
  pt: {
    desc: "Acquafy Platform + App + AI + IoT para Gestão Global Inteligente de Água.",
    nav: [
      { title: "Plataforma", links: [
        { label: "Plataforma Acquafy",            href: "/plataforma"          },
        { label: "App + AI + IoT",                href: "/app-ai-iot"          },
        { label: "Central de Suporte",            href: "/central-de-suporte"  },
        { label: "Tecnologia & Sustentabilidade", href: "/tecnologia"          },
      ]},
      { title: "Produtos", links: [
        { label: "Linha Neo",            href: "/linha-neo" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filtros & Acessórios", href: "/filtros"   },
        { label: "Compare Produtos",     href: "/compare"   },
      ]},
      { title: "Empresa", links: [
        { label: "Sobre Nós",            href: "/sobre"                 },
        { label: "Expansão Global",      href: "/expansao-global"       },
        { label: "Base de Conhecimento", href: "/base-de-conhecimento"  },
        { label: "Contatos",             href: "/contato"               },
      ]},
    ],
    stats: [
      { sub: "Presente em",      main: "+ de 180 países"  },
      { sub: "Disponível em",    main: "16 idiomas"       },
      { sub: "Operação",         main: "100% global"      },
      { sub: "Modelo de receita", main: "100% recorrente" },
    ],
    founded:        "Fundada nos EUA em 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Todos os direitos reservados.",
    terms:          "Termos de Uso",
    privacy:        "Políticas de Privacidade",
  },
  en: {
    desc: "Acquafy Platform + App + AI + IoT for Global Intelligent Water Management.",
    nav: [
      { title: "Platform", links: [
        { label: "Acquafy Platform",          href: "/plataforma"         },
        { label: "App + AI + IoT",            href: "/app-ai-iot"         },
        { label: "Support Center",            href: "/central-de-suporte" },
        { label: "Technology & Sustainability", href: "/tecnologia"       },
      ]},
      { title: "Products", links: [
        { label: "Neo Line",              href: "/linha-neo" },
        { label: "Acquafy Media",         href: "/neo-media" },
        { label: "Filters & Accessories", href: "/filtros"   },
        { label: "Compare Products",      href: "/compare"   },
      ]},
      { title: "Company", links: [
        { label: "About Us",         href: "/sobre"                },
        { label: "Global Expansion", href: "/expansao-global"      },
        { label: "Knowledge Base",   href: "/base-de-conhecimento" },
        { label: "Contact",          href: "/contato"              },
      ]},
    ],
    stats: [
      { sub: "Present in",     main: "180+ countries"    },
      { sub: "Available in",   main: "16 languages"      },
      { sub: "Operation",      main: "100% global"       },
      { sub: "Revenue model",  main: "100% recurring"    },
    ],
    founded:        "Founded in the USA in 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. All rights reserved.",
    terms:          "Terms of Use",
    privacy:        "Privacy Policy",
  },
  es: {
    desc: "Acquafy Platform + App + IA + IoT para la Gestión Global Inteligente del Agua.",
    nav: [
      { title: "Plataforma", links: [
        { label: "Plataforma Acquafy",         href: "/plataforma"         },
        { label: "App + IA + IoT",             href: "/app-ai-iot"         },
        { label: "Central de Soporte",         href: "/central-de-suporte" },
        { label: "Tecnología & Sostenibilidad", href: "/tecnologia"        },
      ]},
      { title: "Productos", links: [
        { label: "Línea Neo",            href: "/linha-neo" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filtros y Accesorios", href: "/filtros"   },
        { label: "Comparar Productos",   href: "/compare"   },
      ]},
      { title: "Empresa", links: [
        { label: "Sobre Nosotros",       href: "/sobre"                },
        { label: "Expansión Global",     href: "/expansao-global"      },
        { label: "Base de Conocimiento", href: "/base-de-conhecimento" },
        { label: "Contacto",             href: "/contato"              },
      ]},
    ],
    stats: [
      { sub: "Presentes en",      main: "+180 países"      },
      { sub: "Disponible en",     main: "16 idiomas"       },
      { sub: "Operación",         main: "100% global"      },
      { sub: "Modelo de ingresos", main: "100% recurrente" },
    ],
    founded:        "Fundada en EE.UU. en 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Todos los derechos reservados.",
    terms:          "Términos de Uso",
    privacy:        "Política de Privacidad",
  },
};

const gradientLine = { backgroundImage: "linear-gradient(146.8deg, #3447d2 4.03%, #0035c1 124%)" };

function ArrowBullet() {
  return (
    <div className="flex h-[12px] items-center justify-center shrink-0 w-[6px]">
      <div className="-rotate-90 flex-none">
        <div className="flex flex-col h-[6px] items-start w-[12px]">
          <div className="relative shrink-0 w-full" style={{ aspectRatio: "226.27/113.14" }}>
            <div className="absolute inset-[-12.5%_-6.25%]">
              <img alt="" className="block max-w-none size-full" src={imgArrowBullet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialCircle({ src, alt, aspectW, aspectH }: { src: string; alt: string; aspectW: number; aspectH: number }) {
  const isSquare = Math.abs(aspectW - aspectH) < 1;
  return (
    <div className="aspect-square bg-white border border-[#cbd0d4] flex flex-col items-center justify-center max-w-[50px] w-full mx-auto p-[14px] rounded-full cursor-pointer">
      {isSquare ? (
        <div className="flex-[1_0_0] min-h-px relative w-full" style={{ aspectRatio: "1/1" }}>
          <img alt={alt} className="absolute inset-0 max-w-none size-full" src={src} />
        </div>
      ) : (
        <div className="relative shrink-0 w-full" style={{ aspectRatio: `${aspectW}/${aspectH}` }}>
          <img alt={alt} className="absolute block inset-0 max-w-none size-full" src={src} />
        </div>
      )}
    </div>
  );
}

function MobileNavSection({
  col, isOpen, onToggle,
}: {
  col: NavCol; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="flex flex-col w-full border-t border-[#cbd0d4]">
      <button onClick={onToggle} className="flex items-center justify-between w-full py-[16px] cursor-pointer">
        <div className="flex flex-col gap-[10px] items-start">
          <p className="font-['Articulat_CF:Bold'] text-[18px] leading-[22px] text-[#0569ff]">{col.title}</p>
        </div>
        <div className={`shrink-0 transition-transform duration-200${isOpen ? "" : " rotate-180"}`}>
          <div className="relative h-[5px] w-[10px]">
            <img alt="" className="absolute inset-0 max-w-none size-full" src={imgArrowDown} />
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-[30px] items-start pb-[24px]">
          {col.links.map((link) => (
            <div key={link.href} className="flex gap-[10px] items-center w-full">
              <ArrowBullet />
              <a href={link.href} className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-[1_0_0] min-w-px hover:text-[#0233c3] transition-colors">
                {link.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const { lang } = useLang();
  const t = T[lang];

  return (
    <footer
      className="border-t-[0.5px] border-[#002ba8] flex flex-col gap-[40px] items-center justify-center pt-[50px] w-full"
      style={{ background: "linear-gradient(to bottom, #fafbff, #e8f1f8)" }}
    >
      <div className="flex flex-col items-center px-[20px] w-full">
        <div className="content-start flex flex-wrap gap-[40px_20px] items-stretch justify-center max-w-[1400px] w-full">

          {/* Logo + description + social */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[210px] min-w-[240px] mob:h-auto mob:min-h-0 mob:items-center mob:pb-[40px]">
            <a href="/" className="flex flex-col items-center justify-center max-w-[200px] w-full">
              <div className="relative shrink-0 w-full" style={{ aspectRatio: "1133.84/187.34" }}>
                <img alt="Acquafy" className="absolute block inset-0 max-w-none size-full" src={imgLogo} />
              </div>
            </a>
            <p className="font-['Articulat_CF:Regular'] text-[16px] leading-[25px] text-[#333] flex-[1_0_0] min-h-px w-full mob:text-center mob:flex-none mob:min-h-0">
              {t.desc}
            </p>
            <div className="grid grid-cols-5 gap-[10px] w-full mt-auto mob:max-w-[260px] mob:mx-auto mob:mt-0">
              {socialIcons.map((s) => (
                <SocialCircle key={s.alt} src={s.src} alt={s.alt} aspectW={s.aspectW} aspectH={s.aspectH} />
              ))}
            </div>
          </div>

          {/* Desktop nav columns */}
          {t.nav.map((col) => (
            <div key={col.title} className="flex flex-[1_0_0] flex-col gap-[40px] items-start min-h-[215px] min-w-[200px] pl-[20px] mob:hidden">
              <div className="flex flex-col gap-[10px] items-start min-h-[30px] w-full">
                <p className="font-['Articulat_CF:Bold'] text-[18px] leading-[22px] text-[#0569ff] w-full">{col.title}</p>
                <div className="h-[1.5px] rounded-full shrink-0 w-[30px]" style={gradientLine} />
              </div>
              <div className="flex flex-col gap-[30px] items-start w-full">
                {col.links.map((link) => (
                  <div key={link.href} className="flex gap-[10px] items-center w-full">
                    <ArrowBullet />
                    <a href={link.href} className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-[1_0_0] min-w-px hover:text-[#0233c3] transition-colors">
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Mobile accordion */}
          <div className="hidden mob:flex flex-col w-full">
            {t.nav.map((col, i) => (
              <MobileNavSection
                key={col.title}
                col={col}
                isOpen={openSection === i}
                onToggle={() => setOpenSection(openSection === i ? null : i)}
              />
            ))}
            <div className="border-t border-[#cbd0d4]" />
          </div>
        </div>
      </div>

      {/* Stats card */}
      <div className="flex items-center justify-center px-[20px] w-full">
        <div className="bg-white flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center max-w-[1400px] min-w-px overflow-hidden pl-[10px] py-[10px] rounded-[20px]">
          {t.stats.map((s, i) => {
            const icons = [
              { src: imgGlobe,    aspectW: 30,    aspectH: 30    },
              { src: imgChat,     aspectW: 501.7, aspectH: 419   },
              { src: imgLocation, aspectW: 642.7, aspectH: 642.7 },
              { src: imgMoney,    aspectW: 472,   aspectH: 440   },
            ];
            const ic = icons[i];
            return (
              <div key={i} className="flex flex-[1_0_0] gap-[20px] items-center min-w-[240px] p-[20px]">
                <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={ic.src} size={40} aspectW={ic.aspectW} aspectH={ic.aspectH} />
                </div>
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#07235c] w-full">{s.sub}</p>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0233c3] w-full">{s.main}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-center px-[20px] w-full">
        <div className="flex flex-wrap gap-[14px_20px] items-center justify-between max-w-[1400px] w-full mob:flex-col mob:gap-[20px]">
          <div className="flex gap-[20px] items-center min-w-[240px] shrink-0 w-[240px] mob:w-full mob:min-w-0 mob:shrink mob:justify-center">
            <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
              <FigmaIcon src={imgFlagUSA} alt="USA" size={40} />
            </div>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-[1_0_0] min-w-px mob:flex-none">
              {t.founded}
            </p>
          </div>
          <div className="flex gap-[20px] items-center min-w-[240px] shrink-0 w-[240px] mob:w-full mob:min-w-0 mob:shrink mob:justify-center">
            <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
              <FigmaIcon src={imgGlobeSust} size={40} aspectW={492} aspectH={474.82} />
            </div>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-[1_0_0] min-w-px mob:flex-none">
              {t.globalPlatform}
            </p>
          </div>
          <div className="flex flex-wrap gap-[18px] items-center justify-center min-w-[320px] shrink-0 mob:min-w-0 mob:w-full">
            {certLogos.map((src, i) => (
              <div key={i} className="relative shrink-0 size-[50px] min-h-[50px] min-w-[50px]">
                <img alt="" className="absolute inset-0 max-w-none size-full" src={src} />
              </div>
            ))}
          </div>
          <LanguageSelectorFull />
        </div>
      </div>

      {/* Copyright strip */}
      <div className="border-t border-[#dde5f0] flex items-center justify-center px-[20px] py-[14px] w-full bg-[#f6f9fe]">
        <div className="flex flex-wrap gap-[10px_20px] items-center justify-between max-w-[1400px] w-full mob:flex-col mob:items-center mob:gap-[10px]">
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#07235c] mob:text-center">
            {t.copyright}
          </p>
          <div className="flex gap-[20px] items-center shrink-0">
            <a href="/termos-de-uso" className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#07235c] hover:text-[#0233c3] transition-colors">{t.terms}</a>
            <a href="/politicas-privacidade" className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#07235c] hover:text-[#0233c3] transition-colors">{t.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
