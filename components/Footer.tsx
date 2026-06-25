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
        { label: "Plataforma Acquafy",            href: "/platform"          },
        { label: "App + AI + IoT",                href: "/app-ai-iot"          },
        { label: "Central de Suporte",            href: "/support-center"  },
        { label: "Tecnologia & Sustentabilidade", href: "/technology"          },
      ]},
      { title: "Produtos", links: [
        { label: "Linha Neo",            href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filtros & Acessórios", href: "/filters"   },
        { label: "Compare Produtos",     href: "/compare"   },
      ]},
      { title: "Empresa", links: [
        { label: "Sobre Nós",       href: "/about"           },
        { label: "Expansão Global", href: "/global-expansion" },
        { label: "Contatos",        href: "/contact"         },
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
  "pt-pt": {
    desc: "Acquafy Platform + Aplicação + AI + IoT para Gestão Global Inteligente da Água.",
    nav: [
      { title: "Plataforma", links: [
        { label: "Plataforma Acquafy",            href: "/platform"          },
        { label: "App + AI + IoT",                href: "/app-ai-iot"          },
        { label: "Central de Suporte",            href: "/support-center"  },
        { label: "Tecnologia & Sustentabilidade", href: "/technology"          },
      ]},
      { title: "Produtos", links: [
        { label: "Linha Neo",            href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filtros & Acessórios", href: "/filters"   },
        { label: "Comparar Produtos",    href: "/compare"   },
      ]},
      { title: "Empresa", links: [
        { label: "Sobre Nós",       href: "/about"           },
        { label: "Expansão Global", href: "/global-expansion" },
        { label: "Contactos",       href: "/contact"         },
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
    terms:          "Termos de Utilização",
    privacy:        "Políticas de Privacidade",
  },
  en: {
    desc: "Acquafy Platform + App + AI + IoT for Global Intelligent Water Management.",
    nav: [
      { title: "Platform", links: [
        { label: "Acquafy Platform",          href: "/platform"         },
        { label: "App + AI + IoT",            href: "/app-ai-iot"         },
        { label: "Support Center",            href: "/support-center" },
        { label: "Technology & Sustainability", href: "/technology"       },
      ]},
      { title: "Products", links: [
        { label: "Neo Line",              href: "/neo-line" },
        { label: "Acquafy Media",         href: "/neo-media" },
        { label: "Filters & Accessories", href: "/filters"   },
        { label: "Compare Products",      href: "/compare"   },
      ]},
      { title: "Company", links: [
        { label: "About Us",         href: "/about"           },
        { label: "Global Expansion", href: "/global-expansion" },
        { label: "Contact",          href: "/contact"         },
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
  "en-gb": {
    desc: "Acquafy Platform + App + AI + IoT for Global Intelligent Water Management.",
    nav: [
      { title: "Platform", links: [
        { label: "Acquafy Platform",          href: "/platform"         },
        { label: "App + AI + IoT",            href: "/app-ai-iot"         },
        { label: "Support Centre",            href: "/support-center" },
        { label: "Technology & Sustainability", href: "/technology"       },
      ]},
      { title: "Products", links: [
        { label: "Neo Line",              href: "/neo-line" },
        { label: "Acquafy Media",         href: "/neo-media" },
        { label: "Filters & Accessories", href: "/filters"   },
        { label: "Compare Products",      href: "/compare"   },
      ]},
      { title: "Company", links: [
        { label: "About Us",         href: "/about"           },
        { label: "Global Expansion", href: "/global-expansion" },
        { label: "Contact",          href: "/contact"         },
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
        { label: "Plataforma Acquafy",         href: "/platform"         },
        { label: "App + IA + IoT",             href: "/app-ai-iot"         },
        { label: "Central de Soporte",         href: "/support-center" },
        { label: "Tecnología & Sostenibilidad", href: "/technology"        },
      ]},
      { title: "Productos", links: [
        { label: "Línea Neo",            href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filtros y Accesorios", href: "/filters"   },
        { label: "Comparar Productos",   href: "/compare"   },
      ]},
      { title: "Empresa", links: [
        { label: "Sobre Nosotros",   href: "/about"           },
        { label: "Expansión Global", href: "/global-expansion" },
        { label: "Contacto",         href: "/contact"         },
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
  fr: {
    desc: "Acquafy Platform + App + AI + IoT pour la Gestion Mondiale Intelligente de l'Eau.",
    nav: [
      { title: "Plateforme", links: [
        { label: "Plateforme Acquafy",          href: "/platform"         },
        { label: "App + AI + IoT",              href: "/app-ai-iot"         },
        { label: "Centre de Support",           href: "/support-center" },
        { label: "Technologie & Durabilité",    href: "/technology"         },
      ]},
      { title: "Produits", links: [
        { label: "Gamme Neo",             href: "/neo-line" },
        { label: "Acquafy Media",         href: "/neo-media" },
        { label: "Filtres & Accessoires", href: "/filters"   },
        { label: "Comparer les Produits", href: "/compare"   },
      ]},
      { title: "Entreprise", links: [
        { label: "À propos",           href: "/about"           },
        { label: "Expansion Mondiale", href: "/global-expansion" },
        { label: "Contact",            href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Présent dans",     main: "+180 pays"        },
      { sub: "Disponible en",    main: "16 langues"       },
      { sub: "Opération",        main: "100 % mondiale"   },
      { sub: "Modèle de revenu", main: "100 % récurrent"  },
    ],
    founded:        "Fondée aux États-Unis en 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Tous droits réservés.",
    terms:          "Conditions d'utilisation",
    privacy:        "Politique de confidentialité",
  },
  de: {
    desc: "Acquafy Platform + App + AI + IoT für globales intelligentes Wassermanagement.",
    nav: [
      { title: "Plattform", links: [
        { label: "Acquafy Plattform",            href: "/platform"         },
        { label: "App + AI + IoT",               href: "/app-ai-iot"         },
        { label: "Support-Center",               href: "/support-center" },
        { label: "Technologie & Nachhaltigkeit", href: "/technology"         },
      ]},
      { title: "Produkte", links: [
        { label: "Neo-Linie",            href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filter & Zubehör",     href: "/filters"   },
        { label: "Produkte vergleichen", href: "/compare"   },
      ]},
      { title: "Unternehmen", links: [
        { label: "Über uns",          href: "/about"           },
        { label: "Globale Expansion", href: "/global-expansion" },
        { label: "Kontakt",           href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Präsent in",         main: "180+ Länder"          },
      { sub: "Verfügbar in",       main: "16 Sprachen"          },
      { sub: "Betrieb",            main: "100 % global"         },
      { sub: "Umsatzmodell",       main: "100 % wiederkehrend"  },
    ],
    founded:        "2020 in den USA gegründet",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Alle Rechte vorbehalten.",
    terms:          "Nutzungsbedingungen",
    privacy:        "Datenschutzrichtlinie",
  },
  it: {
    desc: "Acquafy Platform + App + AI + IoT per la Gestione Globale Intelligente dell'Acqua.",
    nav: [
      { title: "Piattaforma", links: [
        { label: "Piattaforma Acquafy",         href: "/platform"         },
        { label: "App + AI + IoT",              href: "/app-ai-iot"         },
        { label: "Centro Assistenza",           href: "/support-center" },
        { label: "Tecnologia & Sostenibilità",  href: "/technology"         },
      ]},
      { title: "Prodotti", links: [
        { label: "Linea Neo",          href: "/neo-line" },
        { label: "Acquafy Media",      href: "/neo-media" },
        { label: "Filtri & Accessori", href: "/filters"   },
        { label: "Confronta Prodotti", href: "/compare"   },
      ]},
      { title: "Azienda", links: [
        { label: "Chi siamo",          href: "/about"           },
        { label: "Espansione Globale", href: "/global-expansion" },
        { label: "Contatto",           href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Presente in",       main: "180+ paesi"       },
      { sub: "Disponibile in",    main: "16 lingue"        },
      { sub: "Operazione",        main: "100% globale"     },
      { sub: "Modello di ricavo", main: "100% ricorrente"  },
    ],
    founded:        "Fondata negli USA nel 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Tutti i diritti riservati.",
    terms:          "Termini di Utilizzo",
    privacy:        "Informativa sulla Privacy",
  },
  zh: {
    desc: "Acquafy Platform + App + AI + IoT，实现全球智能水务管理。",
    nav: [
      { title: "平台", links: [
        { label: "Acquafy 平台",    href: "/platform"         },
        { label: "App + AI + IoT", href: "/app-ai-iot"         },
        { label: "支持中心",        href: "/support-center" },
        { label: "技术与可持续发展", href: "/technology"         },
      ]},
      { title: "产品", links: [
        { label: "Neo 系列",   href: "/neo-line" },
        { label: "Acquafy Media", href: "/neo-media" },
        { label: "滤芯与配件", href: "/filters"   },
        { label: "产品对比",   href: "/compare"   },
      ]},
      { title: "公司", links: [
        { label: "关于我们", href: "/about"           },
        { label: "全球扩张", href: "/global-expansion" },
        { label: "联系我们", href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "覆盖",       main: "180+ 个国家和地区" },
      { sub: "支持",       main: "16 种语言"         },
      { sub: "运营",       main: "100% 全球化"       },
      { sub: "收入模式",   main: "100% 经常性"       },
    ],
    founded:        "2020 年创立于美国",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. 保留所有权利。",
    terms:          "使用条款",
    privacy:        "隐私政策",
  },
  ja: {
    desc: "Acquafy Platform + App + AI + IoT によるグローバル・スマート水管理。",
    nav: [
      { title: "プラットフォーム", links: [
        { label: "Acquafy プラットフォーム",  href: "/platform"         },
        { label: "App + AI + IoT",           href: "/app-ai-iot"         },
        { label: "サポートセンター",           href: "/support-center" },
        { label: "テクノロジー & 持続可能性", href: "/technology"         },
      ]},
      { title: "製品", links: [
        { label: "Neo ライン",              href: "/neo-line" },
        { label: "Acquafy Media",          href: "/neo-media" },
        { label: "フィルター & アクセサリ", href: "/filters"   },
        { label: "製品を比較する",          href: "/compare"   },
      ]},
      { title: "企業情報", links: [
        { label: "会社概要",      href: "/about"           },
        { label: "グローバル展開", href: "/global-expansion" },
        { label: "お問い合わせ",  href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "展開国数",       main: "180 カ国以上"   },
      { sub: "対応言語",       main: "16 言語"        },
      { sub: "オペレーション", main: "100% グローバル" },
      { sub: "収益モデル",     main: "100% 継続課金"  },
    ],
    founded:        "2020 年に米国で創業",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. 無断転載を禁じます。",
    terms:          "利用規約",
    privacy:        "プライバシーポリシー",
  },
  ko: {
    desc: "Acquafy Platform + App + AI + IoT로 글로벌 지능형 수자원 관리를 실현합니다.",
    nav: [
      { title: "플랫폼", links: [
        { label: "Acquafy 플랫폼",   href: "/platform"         },
        { label: "App + AI + IoT",  href: "/app-ai-iot"         },
        { label: "지원 센터",        href: "/support-center" },
        { label: "기술 & 지속 가능성", href: "/technology"        },
      ]},
      { title: "제품", links: [
        { label: "Neo 라인",         href: "/neo-line" },
        { label: "Acquafy Media",   href: "/neo-media" },
        { label: "필터 & 액세서리",  href: "/filters"   },
        { label: "제품 비교",        href: "/compare"   },
      ]},
      { title: "회사", links: [
        { label: "회사 소개",   href: "/about"           },
        { label: "글로벌 확장", href: "/global-expansion" },
        { label: "문의하기",   href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "진출 국가",    main: "180개국 이상"   },
      { sub: "지원 언어",    main: "16개 언어"      },
      { sub: "운영",         main: "100% 글로벌"    },
      { sub: "수익 모델",    main: "100% 반복 수익" },
    ],
    founded:        "2020년 미국에서 설립",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. All rights reserved.",
    terms:          "이용약관",
    privacy:        "개인정보 처리방침",
  },
  sv: {
    desc: "Acquafy Platform + App + AI + IoT för global intelligent vattenhantering.",
    nav: [
      { title: "Plattform", links: [
        { label: "Acquafy Plattform",          href: "/platform"         },
        { label: "App + AI + IoT",             href: "/app-ai-iot"         },
        { label: "Supportcenter",              href: "/support-center" },
        { label: "Teknologi & Hållbarhet",     href: "/technology"         },
      ]},
      { title: "Produkter", links: [
        { label: "Neo-linjen",           href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filter & Tillbehör",   href: "/filters"   },
        { label: "Jämför Produkter",     href: "/compare"   },
      ]},
      { title: "Företag", links: [
        { label: "Om Oss",            href: "/about"           },
        { label: "Global Expansion",  href: "/global-expansion" },
        { label: "Kontakt",           href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Närvarande i",    main: "180+ länder"       },
      { sub: "Tillgänglig på",  main: "16 språk"          },
      { sub: "Verksamhet",      main: "100% global"       },
      { sub: "Intäktsmodell",   main: "100% återkommande" },
    ],
    founded:        "Grundat i USA 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Alla rättigheter förbehållna.",
    terms:          "Användarvillkor",
    privacy:        "Integritetspolicy",
  },
  fi: {
    desc: "Acquafy Platform + App + AI + IoT globaaliin älykkääseen vedenhallintaan.",
    nav: [
      { title: "Alusta", links: [
        { label: "Acquafy-alusta",              href: "/platform"         },
        { label: "App + AI + IoT",              href: "/app-ai-iot"         },
        { label: "Tukikeskus",                  href: "/support-center" },
        { label: "Teknologia & Kestävyys",      href: "/technology"         },
      ]},
      { title: "Tuotteet", links: [
        { label: "Neo-linja",            href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Suodattimet & Lisäosat", href: "/filters" },
        { label: "Vertaile Tuotteita",   href: "/compare"   },
      ]},
      { title: "Yritys", links: [
        { label: "Tietoa Meistä",     href: "/about"           },
        { label: "Globaali Laajentuminen", href: "/global-expansion" },
        { label: "Yhteystiedot",      href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Läsnä",           main: "180+ maassa"       },
      { sub: "Saatavilla",      main: "16 kielellä"       },
      { sub: "Toiminta",        main: "100% globaali"     },
      { sub: "Tulomalli",       main: "100% toistuva"     },
    ],
    founded:        "Perustettu USA:ssa vuonna 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Kaikki oikeudet pidätetään.",
    terms:          "Käyttöehdot",
    privacy:        "Tietosuojakäytäntö",
  },
  ru: {
    desc: "Acquafy Platform + App + AI + IoT для глобального интеллектуального управления водными ресурсами.",
    nav: [
      { title: "Платформа", links: [
        { label: "Платформа Acquafy",           href: "/platform"         },
        { label: "App + AI + IoT",              href: "/app-ai-iot"         },
        { label: "Центр поддержки",             href: "/support-center" },
        { label: "Технологии & Устойчивость",   href: "/technology"         },
      ]},
      { title: "Продукты", links: [
        { label: "Линейка Neo",          href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Фильтры & Аксессуары", href: "/filters"   },
        { label: "Сравнить продукты",    href: "/compare"   },
      ]},
      { title: "Компания", links: [
        { label: "О нас",               href: "/about"           },
        { label: "Глобальное расширение", href: "/global-expansion" },
        { label: "Контакты",            href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Присутствие в",    main: "180+ странах"      },
      { sub: "Доступно на",      main: "16 языках"         },
      { sub: "Операции",         main: "100% глобальные"   },
      { sub: "Модель дохода",    main: "100% повторяющийся" },
    ],
    founded:        "Основана в США в 2020 году",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Все права защищены.",
    terms:          "Условия использования",
    privacy:        "Политика конфиденциальности",
  },
  ro: {
    desc: "Acquafy Platform + App + AI + IoT pentru Managementul Global Inteligent al Apei.",
    nav: [
      { title: "Platforma", links: [
        { label: "Platforma Acquafy",           href: "/platform"         },
        { label: "App + AI + IoT",              href: "/app-ai-iot"         },
        { label: "Centrul de Suport",           href: "/support-center" },
        { label: "Tehnologie & Sustenabilitate", href: "/technology"        },
      ]},
      { title: "Produse", links: [
        { label: "Linia Neo",            href: "/neo-line" },
        { label: "Acquafy Media",        href: "/neo-media" },
        { label: "Filtre & Accesorii",   href: "/filters"   },
        { label: "Compara Produse",      href: "/compare"   },
      ]},
      { title: "Companie", links: [
        { label: "Despre Noi",        href: "/about"           },
        { label: "Expansiune Globala", href: "/global-expansion" },
        { label: "Contact",           href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "Prezenti in",      main: "180+ tari"         },
      { sub: "Disponibil in",    main: "16 limbi"          },
      { sub: "Operatiune",       main: "100% globala"      },
      { sub: "Model de venituri", main: "100% recurent"    },
    ],
    founded:        "Fondata in SUA in 2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. Toate drepturile rezervate.",
    terms:          "Termeni de Utilizare",
    privacy:        "Politica de Confidentialitate",
  },
  he: {
    desc: "Acquafy Platform + App + AI + IoT לניהול מים גלובלי חכם.",
    nav: [
      { title: "פלטפורמה", links: [
        { label: "פלטפורמת Acquafy",         href: "/platform"         },
        { label: "App + AI + IoT",           href: "/app-ai-iot"         },
        { label: "מרכז תמיכה",               href: "/support-center" },
        { label: "טכנולוגיה וקיימות",         href: "/technology"         },
      ]},
      { title: "מוצרים", links: [
        { label: "קו Neo",              href: "/neo-line" },
        { label: "Acquafy Media",       href: "/neo-media" },
        { label: "מסננים ואביזרים",     href: "/filters"   },
        { label: "השווה מוצרים",        href: "/compare"   },
      ]},
      { title: "חברה", links: [
        { label: "אודותינו",         href: "/about"           },
        { label: "התרחבות גלובלית", href: "/global-expansion" },
        { label: "צור קשר",          href: "/contact"         },
      ]},
    ],
    stats: [
      { sub: "נוכחות ב",        main: "180+ מדינות"      },
      { sub: "זמין ב",          main: "16 שפות"          },
      { sub: "פעילות",          main: "100% גלובלית"     },
      { sub: "מודל הכנסות",     main: "100% חוזר"        },
    ],
    founded:        "נוסדה בארה\"ב ב-2020",
    globalPlatform: "Global Smart Water Platform",
    copyright:      "Acquafy Corporation © 2026. כל הזכויות שמורות.",
    terms:          "תנאי שימוש",
    privacy:        "מדיניות פרטיות",
  },
};

const gradientLine = { backgroundImage: "linear-gradient(146.8deg, #3447d2 4.03%, #0035c1 124%)" };

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
        <div className="bg-white flex flex-[1_0_0] flex-wrap gap-x-[20px] gap-y-[10px] items-center justify-center max-w-[1400px] min-w-px overflow-hidden py-[10px] rounded-[20px]">
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
            <a href="/terms-of-use" className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#07235c] hover:text-[#0233c3] transition-colors">{t.terms}</a>
            <a href="/privacy-policy" className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#07235c] hover:text-[#0233c3] transition-colors">{t.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
