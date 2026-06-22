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
  bg: string; icon: string; iconAspectW?: number; iconAspectH?: number;
};

type NavItem = {
  label: string; href: string; extra: string[]; dropdown: DropdownItem[];
};

// ── Non-translatable nav structure (hrefs, icon assets, icon bg) ─────────
const NAV_STRUCTURE = [
  {
    href:  "/plataforma",
    extra: ["/app-ai-iot", "/central-de-suporte", "/tecnologia"],
    dropdown: [
      { href: "/plataforma",         bg: "#0569ff", icon: "/figma-assets/icon-planetweb-a.svg"         },
      { href: "/app-ai-iot",         bg: "#6e54ef", icon: "/figma-assets/icon-ai-30px-e.svg"           },
      { href: "/central-de-suporte", bg: "#ffa920", icon: "/figma-assets/icon-fone-30px.svg"           },
      { href: "/tecnologia",         bg: "#36ae5c", icon: "/figma-assets/icon-globe-sust.svg"          },
    ],
  },
  {
    href:  "/linha-neo",
    extra: ["/neo-media", "/filtros", "/compare"],
    dropdown: [
      { href: "/linha-neo", bg: "#0569ff", icon: "/figma-assets/icon-agua-pura-30px.svg" },
      { href: "/neo-media", bg: "#6e54ef", icon: "/figma-assets/icon-media.svg"          },
      { href: "/filtros",   bg: "#ffa920", icon: "/figma-assets/icon-filtros-40px.svg"  },
      { href: "/compare",   bg: "#36ae5c", icon: "/figma-assets/icon-check-30px.svg"    },
    ],
  },
  {
    href:  "/sobre",
    extra: ["/expansao-global", "/contato"],
    dropdown: [
      { href: "/sobre",           bg: "#0569ff", icon: "/figma-assets/icon-pessoas-foco-cliente.svg" },
      { href: "/expansao-global", bg: "#6e54ef", icon: "/figma-assets/icon-globe-30px-b.svg"         },
      { href: "/contato",         bg: "#ffa920", icon: "/figma-assets/icon-phone-a.svg"              },
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
      { label: "Sobre Nós",       desc: "Fundada nos EUA em 2020 e presente em mais de 180 países.",   cta: "Nossa História" },
      { label: "Expansão Global", desc: "Operação 100% global com modelo de receita 100% recorrente.", cta: "Ver Expansão"   },
      { label: "Contatos",        desc: "Fale com nossa equipe e encontre o distribuidor mais próximo.", cta: "Falar Conosco" },
    ]},
    { label: "Comprar Agora", dd: [] },
  ],
  "pt-pt": [
    { label: "Plataforma", dd: [
      { label: "Plataforma Acquafy",            desc: "Gestão inteligente da água com Aplicação, IA e IoT totalmente integrados.",       cta: "Conheça a Plataforma"  },
      { label: "App + AI + IoT",                desc: "Controlo remoto, automatização e inteligência artificial na palma da mão.",        cta: "Ver a Aplicação"       },
      { label: "Central de Suporte",            desc: "Suporte técnico especializado para manter a sua Acquafy sempre em funcionamento.", cta: "Aceder ao Suporte"     },
      { label: "Tecnologia & Sustentabilidade", desc: "Inovação de ponta aliada a um impacto ambiental positivo.",                        cta: "Saber mais"            },
    ]},
    { label: "Produtos", dd: [
      { label: "Linha Neo",            desc: "Purificadores com Painel LED Touch, Aplicação, UV LED e filtros UF premium.",              cta: "Ver Linha Neo"   },
      { label: "Acquafy Media",        desc: "Comunicação e conteúdo multimédia integrados ao purificador.",                             cta: "Ver Media"       },
      { label: "Filtros & Acessórios", desc: "Reposição inteligente com rastreabilidade e qualidade garantida.",                         cta: "Ver Filtros"     },
      { label: "Comparar Produtos",    desc: "Encontre o modelo ideal comparando especificações, capacidade e tecnologia.",              cta: "Comparar Agora"  },
    ]},
    { label: "Empresa", dd: [
      { label: "Sobre Nós",       desc: "Fundada nos EUA em 2020 e presente em mais de 180 países.",          cta: "A Nossa História" },
      { label: "Expansão Global", desc: "Operação 100% global com modelo de receita 100% recorrente.",          cta: "Ver Expansão"     },
      { label: "Contactos",       desc: "Fale com a nossa equipa e encontre o distribuidor mais próximo.",       cta: "Falar Connosco"   },
    ]},
    { label: "Comprar Agora", dd: [] },
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
      { label: "About Us",        desc: "Founded in the USA in 2020 and present in more than 180 countries.", cta: "Our Story"    },
      { label: "Global Expansion", desc: "100% global operation with a 100% recurring revenue model.",      cta: "See Expansion" },
      { label: "Contact",         desc: "Talk to our team and find the nearest distributor.",               cta: "Talk to Us"   },
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
      { label: "Sobre Nosotros",   desc: "Fundada en EE.UU. en 2020 y presente en más de 180 países.",        cta: "Nuestra Historia" },
      { label: "Expansión Global", desc: "Operación 100% global con modelo de ingresos 100% recurrente.",   cta: "Ver Expansión"    },
      { label: "Contacto",         desc: "Habla con nuestro equipo y encuentra el distribuidor más cercano.", cta: "Contáctanos"     },
    ]},
    { label: "Comprar ahora", dd: [] },
  ],
  fr: [
    { label: "Plateforme", dd: [
      { label: "Plateforme Acquafy",          desc: "Gestion intelligente de l'eau avec App, IA et IoT entièrement intégrés.",              cta: "Découvrir la Plateforme" },
      { label: "App + AI + IoT",              desc: "Contrôle à distance, automatisation et intelligence artificielle au bout des doigts.",  cta: "Voir l'App"              },
      { label: "Centre de Support",           desc: "Assistance technique spécialisée pour que votre Acquafy fonctionne toujours.",         cta: "Accéder au Support"      },
      { label: "Technologie & Durabilité",    desc: "Innovation de pointe alliée à un impact environnemental positif.",                     cta: "En savoir plus"          },
    ]},
    { label: "Produits", dd: [
      { label: "Gamme Neo",               desc: "Purificateurs avec panneau LED tactile, App, UV LED et filtres UF premium.",               cta: "Voir la Gamme Neo"   },
      { label: "Acquafy Media",           desc: "Communication multimédia et contenu intégrés au purificateur.",                            cta: "Voir Media"          },
      { label: "Filtres & Accessoires",   desc: "Remplacement intelligent avec traçabilité et qualité garantie.",                           cta: "Voir les Filtres"    },
      { label: "Comparer les Produits",   desc: "Trouvez le modèle idéal en comparant specs, capacité et technologie.",                    cta: "Comparer"            },
    ]},
    { label: "Entreprise", dd: [
      { label: "À propos",           desc: "Fondée aux États-Unis en 2020 et présente dans plus de 180 pays.",    cta: "Notre Histoire"   },
      { label: "Expansion Mondiale", desc: "Opération 100 % mondiale avec un modèle de revenus 100 % récurrent.", cta: "Voir l'Expansion" },
      { label: "Contact",            desc: "Parlez à notre équipe et trouvez le distributeur le plus proche.",    cta: "Nous Contacter"   },
    ]},
    { label: "Acheter maintenant", dd: [] },
  ],
  de: [
    { label: "Plattform", dd: [
      { label: "Acquafy Plattform",           desc: "Intelligentes Wassermanagement mit vollständig integrierter App, KI und IoT.",          cta: "Plattform entdecken"  },
      { label: "App + AI + IoT",              desc: "Fernsteuerung, Automatisierung und künstliche Intelligenz in Ihrer Hand.",              cta: "App ansehen"          },
      { label: "Support-Center",              desc: "Spezialisierter technischer Support, damit Ihr Acquafy immer läuft.",                   cta: "Support aufrufen"     },
      { label: "Technologie & Nachhaltigkeit", desc: "Modernste Innovation kombiniert mit positivem Umwelteinfluss.",                       cta: "Mehr erfahren"        },
    ]},
    { label: "Produkte", dd: [
      { label: "Neo-Linie",              desc: "Purifier mit LED-Touch-Panel, App, UV-LED und Premium-UF-Filtern.",                          cta: "Neo-Linie ansehen"  },
      { label: "Acquafy Media",          desc: "Multimedia-Kommunikation und Inhalte, integriert in den Purifier.",                         cta: "Media ansehen"      },
      { label: "Filter & Zubehör",       desc: "Intelligenter Austausch mit Rückverfolgbarkeit und garantierter Qualität.",                  cta: "Filter ansehen"     },
      { label: "Produkte vergleichen",   desc: "Finden Sie das ideale Modell durch den Vergleich von Specs, Kapazität und Technologie.",    cta: "Jetzt vergleichen"  },
    ]},
    { label: "Unternehmen", dd: [
      { label: "Über uns",          desc: "2020 in den USA gegründet und in mehr als 180 Ländern vertreten.",        cta: "Unsere Geschichte" },
      { label: "Globale Expansion", desc: "100 % globaler Betrieb mit einem 100 % wiederkehrenden Umsatzmodell.", cta: "Expansion ansehen" },
      { label: "Kontakt",           desc: "Sprechen Sie mit unserem Team und finden Sie den nächstgelegenen Händler.", cta: "Kontakt aufnehmen" },
    ]},
    { label: "Jetzt kaufen", dd: [] },
  ],
  it: [
    { label: "Piattaforma", dd: [
      { label: "Piattaforma Acquafy",         desc: "Gestione intelligente dell'acqua con App, IA e IoT completamente integrati.",           cta: "Scopri la Piattaforma" },
      { label: "App + AI + IoT",              desc: "Controllo remoto, automazione e intelligenza artificiale nel palmo della mano.",        cta: "Vedi l'App"            },
      { label: "Centro Assistenza",           desc: "Supporto tecnico specializzato per mantenere il tuo Acquafy sempre operativo.",         cta: "Accedi all'Assistenza" },
      { label: "Tecnologia & Sostenibilità",  desc: "Innovazione all'avanguardia unita a un impatto ambientale positivo.",                   cta: "Scopri di più"         },
    ]},
    { label: "Prodotti", dd: [
      { label: "Linea Neo",              desc: "Purificatori con pannello LED Touch, App, UV LED e filtri UF premium.",                      cta: "Vedi la Linea Neo"  },
      { label: "Acquafy Media",          desc: "Comunicazione multimediale e contenuti integrati nel purificatore.",                        cta: "Vedi Media"         },
      { label: "Filtri & Accessori",     desc: "Sostituzione intelligente con tracciabilità e qualità garantita.",                           cta: "Vedi i Filtri"      },
      { label: "Confronta Prodotti",     desc: "Trova il modello ideale confrontando specs, capacità e tecnologia.",                        cta: "Confronta ora"      },
    ]},
    { label: "Azienda", dd: [
      { label: "Chi siamo",          desc: "Fondata negli USA nel 2020 e presente in più di 180 paesi.",         cta: "La nostra storia"  },
      { label: "Espansione Globale", desc: "Operazione 100% globale con un modello di entrate 100% ricorrente.", cta: "Vedi l'Espansione" },
      { label: "Contatto",           desc: "Parla con il nostro team e trova il distributore più vicino.",       cta: "Contattaci"        },
    ]},
    { label: "Acquista ora", dd: [] },
  ],
  zh: [
    { label: "平台", dd: [
      { label: "Acquafy 平台",           desc: "集成 App、AI 与 IoT 的智能水务管理平台。",                                                   cta: "探索平台"     },
      { label: "App + AI + IoT",        desc: "将远程控制、自动化与人工智能集于一掌之中。",                                                   cta: "查看 App"     },
      { label: "支持中心",               desc: "专业技术支持，让您的 Acquafy 始终高效运行。",                                                  cta: "访问支持"     },
      { label: "技术与可持续发展",        desc: "尖端创新与积极环境影响的完美结合。",                                                          cta: "了解更多"     },
    ]},
    { label: "产品", dd: [
      { label: "Neo 系列",              desc: "配备 LED 触控面板、App、UV LED 及高级 UF 滤芯的净水机。",                                     cta: "查看 Neo 系列" },
      { label: "Acquafy Media",        desc: "集成于净水机的多媒体通信与内容系统。",                                                          cta: "查看 Media"   },
      { label: "滤芯与配件",            desc: "具备可追溯性与质量保障的智能耗材更换方案。",                                                    cta: "查看滤芯"     },
      { label: "产品对比",              desc: "通过对比规格、容量和技术，找到最适合您的型号。",                                                 cta: "立即对比"     },
    ]},
    { label: "公司", dd: [
      { label: "关于我们", desc: "2020 年创立于美国，业务遍及 180 多个国家和地区。", cta: "我们的故事" },
      { label: "全球扩张", desc: "100% 全球化运营，100% 经常性收入模式。",       cta: "查看扩张"   },
      { label: "联系我们", desc: "与我们的团队取得联系，找到距您最近的经销商。",   cta: "立即联系"   },
    ]},
    { label: "立即购买", dd: [] },
  ],
  ja: [
    { label: "プラットフォーム", dd: [
      { label: "Acquafy プラットフォーム",  desc: "App・AI・IoT を完全統合したインテリジェント水管理システム。",                              cta: "プラットフォームを見る" },
      { label: "App + AI + IoT",           desc: "手のひらでリモートコントロール、自動化、AIを実現。",                                        cta: "Appを見る"             },
      { label: "サポートセンター",           desc: "Acquafy を常に最高の状態に保つための専門技術サポート。",                                   cta: "サポートにアクセス"    },
      { label: "テクノロジー & 持続可能性", desc: "最先端のイノベーションとポジティブな環境インパクトの融合。",                                cta: "詳しく見る"            },
    ]},
    { label: "製品", dd: [
      { label: "Neo ライン",             desc: "LED タッチパネル・App・UV LED・プレミアム UF フィルター搭載の浄水器。",                        cta: "Neo ラインを見る"  },
      { label: "Acquafy Media",         desc: "浄水器に統合されたマルチメディア通信とコンテンツ。",                                            cta: "Media を見る"      },
      { label: "フィルター & アクセサリ", desc: "トレーサビリティと品質保証を備えたスマート交換サービス。",                                    cta: "フィルターを見る"  },
      { label: "製品を比較する",          desc: "スペック・容量・テクノロジーを比較して最適なモデルを見つけよう。",                            cta: "今すぐ比較"        },
    ]},
    { label: "企業情報", dd: [
      { label: "会社概要",      desc: "2020 年に米国で創業し、180 カ国以上に展開。",               cta: "私たちのストーリー" },
      { label: "グローバル展開", desc: "100% グローバルな事業運営と 100% 継続課金モデル。",         cta: "展開を見る"         },
      { label: "お問い合わせ",  desc: "チームへのお問い合わせや最寄りの販売店をご確認いただけます。", cta: "お問い合わせ"       },
    ]},
    { label: "今すぐ購入", dd: [] },
  ],
  ko: [
    { label: "플랫폼", dd: [
      { label: "Acquafy 플랫폼",         desc: "App, AI, IoT가 완전히 통합된 지능형 물 관리 플랫폼.",                                        cta: "플랫폼 알아보기"  },
      { label: "App + AI + IoT",        desc: "원격 제어, 자동화, 인공지능을 손안에서.",                                                      cta: "App 보기"         },
      { label: "지원 센터",              desc: "Acquafy가 항상 최상의 상태로 작동하도록 전문 기술 지원을 제공합니다.",                          cta: "지원 센터 접속"   },
      { label: "기술 & 지속 가능성",     desc: "첨단 혁신과 긍정적인 환경적 영향의 결합.",                                                    cta: "자세히 알아보기"  },
    ]},
    { label: "제품", dd: [
      { label: "Neo 라인",              desc: "LED 터치 패널, App, UV LED 및 프리미엄 UF 필터가 탑재된 정수기.",                              cta: "Neo 라인 보기"  },
      { label: "Acquafy Media",        desc: "정수기에 통합된 멀티미디어 커뮤니케이션 및 콘텐츠.",                                             cta: "Media 보기"     },
      { label: "필터 & 액세서리",        desc: "추적성과 품질이 보장된 스마트 교체 솔루션.",                                                   cta: "필터 보기"      },
      { label: "제품 비교",              desc: "사양, 용량, 기술을 비교하여 최적의 모델을 찾아보세요.",                                        cta: "지금 비교하기"  },
    ]},
    { label: "회사", dd: [
      { label: "회사 소개",  desc: "2020년 미국에서 설립되어 180개국 이상에서 운영 중.",    cta: "우리의 이야기" },
      { label: "글로벌 확장", desc: "100% 글로벌 운영과 100% 반복 수익 모델.",             cta: "확장 보기"     },
      { label: "문의하기",   desc: "팀에 문의하거나 가장 가까운 판매점을 찾아보세요.",       cta: "문의하기"      },
    ]},
    { label: "지금 구매", dd: [] },
  ],
};

const PARTNER_BTN: Record<Lang, string> = {
  pt: "Seja um Parceiro",
  "pt-pt": "Seja um Parceiro",
  en: "Be a Partner",
  es: "Ser un Socio",
  fr: "Devenir Partenaire",
  de: "Partner werden",
  it: "Diventa Partner",
  zh: "成为合作伙伴",
  ja: "パートナーになる",
  ko: "파트너 되기",
};

const ARIA_MENU: Record<Lang, { open: string; close: string }> = {
  pt: { open: "Abrir menu",  close: "Fechar menu"  },
  "pt-pt": { open: "Abrir menu",  close: "Fechar menu"  },
  en: { open: "Open menu",   close: "Close menu"   },
  es: { open: "Abrir menú",  close: "Cerrar menú"  },
  fr: { open: "Ouvrir le menu",  close: "Fermer le menu"  },
  de: { open: "Menü öffnen",     close: "Menü schließen"  },
  it: { open: "Apri il menu",    close: "Chiudi il menu"  },
  zh: { open: "打开菜单",         close: "关闭菜单"          },
  ja: { open: "メニューを開く",   close: "メニューを閉じる"  },
  ko: { open: "메뉴 열기",        close: "메뉴 닫기"         },
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

function DropdownItemRow({ item }: { item: DropdownItem }) {
  return (
    <a
      href={item.href}
      className="flex gap-[14px] items-center px-[12px] py-[10px] rounded-[10px] hover:bg-[#f2f6fd] transition-colors group"
    >
      <div
        className="flex items-center justify-center shrink-0 size-[50px] rounded-[8px]"
        style={{ background: item.bg }}
      >
        <FigmaIcon src={item.icon} size={22} aspectW={item.iconAspectW} aspectH={item.iconAspectH} className="brightness-0 invert" />
      </div>
      <div className="flex flex-col gap-[5px] flex-1 min-w-0">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#07235c] group-hover:text-[#0233c3] transition-colors">
          {item.label}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[15px] text-[#8a8f97]">
          {item.desc}
        </p>
      </div>
    </a>
  );
}

function NavTrigger({ label, href, active, hasDropdown, open, onMouseEnter, dropdown }: {
  label: string; href: string; active: boolean;
  hasDropdown: boolean; open: boolean; onMouseEnter: () => void;
  dropdown: DropdownItem[];
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
      {open && hasDropdown && (
        <div className="absolute top-full left-0 bg-white border border-[#e6e6e6] rounded-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          <div className="flex flex-col gap-[4px] p-[20px] w-[320px]">
            {dropdown.map((item) => <DropdownItemRow key={item.href} item={item} />)}
          </div>
        </div>
      )}
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
              dropdown={item.dropdown}
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
