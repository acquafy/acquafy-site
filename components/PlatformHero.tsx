"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg     = "/figma-assets/platform-hero-bg.webp";
const imgMockup = "/figma-assets/platform-hero-mockup.webp";

const imgChat   = "/figma-assets/icon-chat-b.svg";

const imgCloud  = "/figma-assets/icon-cloud-platform.svg";
const imgAI     = "/figma-assets/icon-ai-platform.svg";
const imgWifi   = "/figma-assets/icon-wifi-b.svg";
const imgGlobal = "/figma-assets/icon-global.svg";

const imgShield = "/figma-assets/icon-shield-d.svg";
const imgVendas = "/figma-assets/icon-vendas-d.svg";
const imgInteg  = "/figma-assets/icon-integration.svg";
const imgTime   = "/figma-assets/icon-uptime.svg";

const T: Record<Lang, {
  badge: string;
  h1part1: string;
  h1part2: string;
  subtitle: string;
  cta: string;
  mockupAlt: string;
  featureCards: { title: string; desc: string }[];
  trustBadges: { title: string; sub: string }[];
}> = {
  pt: {
    badge: "ECOSSISTEMA DIGITAL ACQUAFY",
    h1part1: "Plataforma ",
    h1part2: "App Inteligente",
    subtitle: "Gestão global, App + AI + IoT em uma experiência integrada para mídia, parceiros, vendas e operação da água inteligente.",
    cta: "Solicitar demonstração",
    mockupAlt: "Plataforma Acquafy — tablet e smartphone",
    featureCards: [
      { title: "Cloud Platform",     desc: "Infraestrutura segura e escalável." },
      { title: "App + AI",           desc: "Inteligência artificial para decisões e automação" },
      { title: "IoT & Dispositivos", desc: "Monitoramento remoto e sensores conectados" },
      { title: "Gestão Global",      desc: "Operação em 180+ países e 16 idiomas" },
    ],
    trustBadges: [
      { title: "Seguro & Confiável", sub: "Dados protegidos" },
      { title: "Escalável",          sub: "Performance elástica" },
      { title: "Integração Total",   sub: "App + Web + IoT + AI" },
      { title: "Disponibilidade",    sub: "99,9% uptime" },
    ],
  },
  "pt-pt": {
    badge: "ECOSSISTEMA DIGITAL ACQUAFY",
    h1part1: "Plataforma ",
    h1part2: "Aplicação Inteligente",
    subtitle: "Gestão global, App + AI + IoT numa experiência integrada para média, parceiros, vendas e operação da água inteligente.",
    cta: "Solicitar demonstração",
    mockupAlt: "Plataforma Acquafy — tablet e smartphone",
    featureCards: [
      { title: "Cloud Platform",     desc: "Infraestrutura segura e escalável." },
      { title: "App + AI",           desc: "Inteligência artificial para decisões e automação" },
      { title: "IoT & Dispositivos", desc: "Monitorização remota e sensores ligados" },
      { title: "Gestão Global",      desc: "Operação em 180+ países e 16 idiomas" },
    ],
    trustBadges: [
      { title: "Seguro & Fiável",    sub: "Dados protegidos" },
      { title: "Escalável",          sub: "Performance elástica" },
      { title: "Integração Total",   sub: "App + Web + IoT + AI" },
      { title: "Disponibilidade",    sub: "99,9% uptime" },
    ],
  },
  en: {
    badge: "ACQUAFY DIGITAL ECOSYSTEM",
    h1part1: "Platform ",
    h1part2: "Smart App",
    subtitle: "Global management, App + AI + IoT in an integrated experience for media, partners, sales and smart water operations.",
    cta: "Request a demo",
    mockupAlt: "Acquafy Platform — tablet and smartphone",
    featureCards: [
      { title: "Cloud Platform",    desc: "Secure and scalable infrastructure." },
      { title: "App + AI",          desc: "Artificial intelligence for decisions and automation" },
      { title: "IoT & Devices",     desc: "Remote monitoring and connected sensors" },
      { title: "Global Management", desc: "Operations in 180+ countries and 16 languages" },
    ],
    trustBadges: [
      { title: "Secure & Reliable", sub: "Protected data" },
      { title: "Scalable",          sub: "Elastic performance" },
      { title: "Full Integration",  sub: "App + Web + IoT + AI" },
      { title: "Availability",      sub: "99.9% uptime" },
    ],
  },
  es: {
    badge: "ECOSISTEMA DIGITAL ACQUAFY",
    h1part1: "Plataforma ",
    h1part2: "App Inteligente",
    subtitle: "Gestión global, App + AI + IoT en una experiencia integrada para medios, socios, ventas y operación de agua inteligente.",
    cta: "Solicitar demostración",
    mockupAlt: "Plataforma Acquafy — tablet y smartphone",
    featureCards: [
      { title: "Cloud Platform",     desc: "Infraestructura segura y escalable." },
      { title: "App + AI",           desc: "Inteligencia artificial para decisiones y automatización" },
      { title: "IoT & Dispositivos", desc: "Monitoreo remoto y sensores conectados" },
      { title: "Gestión Global",     desc: "Operación en 180+ países y 16 idiomas" },
    ],
    trustBadges: [
      { title: "Seguro y Confiable", sub: "Datos protegidos" },
      { title: "Escalable",          sub: "Rendimiento elástico" },
      { title: "Integración Total",  sub: "App + Web + IoT + AI" },
      { title: "Disponibilidad",     sub: "99,9% uptime" },
    ],
  },
  fr: {
    badge: "ÉCOSYSTÈME DIGITAL ACQUAFY",
    h1part1: "Plateforme ",
    h1part2: "App Intelligente",
    subtitle: "Gestion mondiale, App + AI + IoT dans une expérience intégrée pour les médias, partenaires, ventes et opération de l'eau intelligente.",
    cta: "Demander une démo",
    mockupAlt: "Plateforme Acquafy — tablette et smartphone",
    featureCards: [
      { title: "Cloud Platform",     desc: "Infrastructure sécurisée et évolutive." },
      { title: "App + AI",           desc: "Intelligence artificielle pour les décisions et l'automatisation" },
      { title: "IoT & Appareils",    desc: "Surveillance à distance et capteurs connectés" },
      { title: "Gestion Mondiale",   desc: "Opération dans 180+ pays et 16 langues" },
    ],
    trustBadges: [
      { title: "Sécurisé & Fiable",  sub: "Données protégées" },
      { title: "Évolutif",           sub: "Performance élastique" },
      { title: "Intégration Totale", sub: "App + Web + IoT + AI" },
      { title: "Disponibilité",      sub: "99,9% uptime" },
    ],
  },
  de: {
    badge: "DIGITALES ÖKOSYSTEM ACQUAFY",
    h1part1: "Plattform ",
    h1part2: "Smart App",
    subtitle: "Globales Management, App + AI + IoT in einer integrierten Erfahrung für Medien, Partner, Vertrieb und intelligenten Wasserbetrieb.",
    cta: "Demo anfordern",
    mockupAlt: "Acquafy Plattform — Tablet und Smartphone",
    featureCards: [
      { title: "Cloud Platform",     desc: "Sichere und skalierbare Infrastruktur." },
      { title: "App + AI",           desc: "Künstliche Intelligenz für Entscheidungen und Automatisierung" },
      { title: "IoT & Geräte",       desc: "Fernüberwachung und vernetzte Sensoren" },
      { title: "Globales Management",desc: "Betrieb in 180+ Ländern und 16 Sprachen" },
    ],
    trustBadges: [
      { title: "Sicher & Zuverlässig", sub: "Geschützte Daten" },
      { title: "Skalierbar",           sub: "Elastische Performance" },
      { title: "Vollintegration",      sub: "App + Web + IoT + AI" },
      { title: "Verfügbarkeit",        sub: "99,9% Uptime" },
    ],
  },
  it: {
    badge: "ECOSISTEMA DIGITALE ACQUAFY",
    h1part1: "Piattaforma ",
    h1part2: "App Intelligente",
    subtitle: "Gestione globale, App + AI + IoT in un'esperienza integrata per media, partner, vendite e operazione dell'acqua intelligente.",
    cta: "Richiedi una demo",
    mockupAlt: "Piattaforma Acquafy — tablet e smartphone",
    featureCards: [
      { title: "Cloud Platform",     desc: "Infrastruttura sicura e scalabile." },
      { title: "App + AI",           desc: "Intelligenza artificiale per decisioni e automazione" },
      { title: "IoT & Dispositivi",  desc: "Monitoraggio remoto e sensori connessi" },
      { title: "Gestione Globale",   desc: "Operazione in 180+ paesi e 16 lingue" },
    ],
    trustBadges: [
      { title: "Sicuro & Affidabile", sub: "Dati protetti" },
      { title: "Scalabile",           sub: "Performance elastica" },
      { title: "Integrazione Totale", sub: "App + Web + IoT + AI" },
      { title: "Disponibilità",       sub: "99,9% uptime" },
    ],
  },
  zh: {
    badge: "ACQUAFY 数字生态系统",
    h1part1: "平台 ",
    h1part2: "智能应用",
    subtitle: "全球管理，App + AI + IoT 融合媒体、合作伙伴、销售和智能水务运营的一体化体验。",
    cta: "申请演示",
    mockupAlt: "Acquafy 平台 — 平板电脑和智能手机",
    featureCards: [
      { title: "Cloud Platform",     desc: "安全且可扩展的基础设施。" },
      { title: "App + AI",           desc: "用于决策与自动化的人工智能" },
      { title: "IoT & 设备",         desc: "远程监控与连接传感器" },
      { title: "全球管理",            desc: "覆盖 180+ 个国家及 16 种语言的运营" },
    ],
    trustBadges: [
      { title: "安全可靠",            sub: "数据受保护" },
      { title: "可扩展",              sub: "弹性性能" },
      { title: "全面集成",            sub: "App + Web + IoT + AI" },
      { title: "高可用性",            sub: "99.9% 正常运行时间" },
    ],
  },
  ja: {
    badge: "ACQUAFY デジタルエコシステム",
    h1part1: "プラットフォーム ",
    h1part2: "スマートアプリ",
    subtitle: "グローバル管理、App + AI + IoT を統合し、メディア・パートナー・販売・スマートウォーター運営を一元化した体験。",
    cta: "デモを申し込む",
    mockupAlt: "Acquafy プラットフォーム — タブレットとスマートフォン",
    featureCards: [
      { title: "Cloud Platform",     desc: "安全でスケーラブルなインフラ。" },
      { title: "App + AI",           desc: "意思決定と自動化のための人工知能" },
      { title: "IoT & デバイス",      desc: "リモートモニタリングと接続センサー" },
      { title: "グローバル管理",       desc: "180か国以上・16言語での運営" },
    ],
    trustBadges: [
      { title: "安全・信頼性",         sub: "データ保護済み" },
      { title: "スケーラブル",          sub: "弾力的なパフォーマンス" },
      { title: "完全統合",             sub: "App + Web + IoT + AI" },
      { title: "可用性",               sub: "稼働率 99.9%" },
    ],
  },
  ko: {
    badge: "ACQUAFY 디지털 생태계",
    h1part1: "플랫폼 ",
    h1part2: "스마트 앱",
    subtitle: "글로벌 관리, App + AI + IoT를 결합한 미디어, 파트너, 판매 및 스마트 워터 운영을 위한 통합 경험.",
    cta: "데모 신청",
    mockupAlt: "Acquafy 플랫폼 — 태블릿과 스마트폰",
    featureCards: [
      { title: "Cloud Platform",     desc: "안전하고 확장 가능한 인프라." },
      { title: "App + AI",           desc: "의사결정 및 자동화를 위한 인공지능" },
      { title: "IoT & 기기",          desc: "원격 모니터링 및 연결된 센서" },
      { title: "글로벌 관리",          desc: "180개국 이상, 16개 언어 운영" },
    ],
    trustBadges: [
      { title: "안전 & 신뢰성",        sub: "보호된 데이터" },
      { title: "확장 가능",            sub: "탄력적 성능" },
      { title: "완전 통합",            sub: "App + Web + IoT + AI" },
      { title: "가용성",               sub: "99.9% 업타임" },
    ],
  },
};

const trustBadgeIcons = [
  { icon: imgShield, iconW: 24, iconH: 30 },
  { icon: imgVendas, iconW: 44, iconH: 22 },
  { icon: imgInteg,  iconW: 38, iconH: 40 },
  { icon: imgTime,   iconW: 30, iconH: 30 },
];

function BadgeRow({ badges }: { badges: { title: string; sub: string }[] }) {
  return (
    <>
      {badges.map((b, i) => (
        <div key={b.title} className="flex flex-[1_0_0] gap-[8px] items-center min-w-[160px]">
          <div className="flex items-center justify-center shrink-0 size-[26px]">
            <FigmaIcon src={trustBadgeIcons[i].icon} size={26} aspectW={trustBadgeIcons[i].iconW} aspectH={trustBadgeIcons[i].iconH} />
          </div>
          <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{b.title}</p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{b.sub}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default function PlatformHero() {
  const { lang } = useLang();
  const t = T[lang];

  const featureCards = [
    { bg: "#0233c3", icon: imgCloud,  iconW: 30, iconH: 30, ...t.featureCards[0] },
    { bg: "#6e54ef", icon: imgAI,     iconW: 30, iconH: 30, ...t.featureCards[1] },
    { bg: "#36ae5c", icon: imgWifi,   iconW: 30, iconH: 20, ...t.featureCards[2] },
    { bg: "#e240ba", icon: imgGlobal, iconW: 30, iconH: 30, ...t.featureCards[3] },
  ];

  /*
    default (< 1024px)   : coluna única centrada, bg-[#f6f9fe]            — Figma 1024px
    1024:   (1024px+)    : duas colunas, bg-[#f6f9fe], mockup direita,
                           trust badges linha separada abaixo              — Figma 1280px
    win-1280: (1260px+)  : TELA TOTAL — bg image, duas colunas,
                           trust badges dentro da col esquerda,
                           col direita invisible (bg image tem o mockup)
  */
  return (
    <section className="relative bg-[#f6f9fe] win-1280:bg-transparent flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full min-h-[600px] win-1280:h-[calc(100vh-80px)]">

      {/* Fundo — visível apenas em win-1280+ (TELA TOTAL) */}
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none hidden win-1280:block"
        src={imgBg}
      />

      <div className="relative flex flex-col 1024:flex-row flex-wrap flex-1 gap-[40px] 1024:gap-x-[20px] items-center 1024:items-start max-w-[1400px] w-full">

        {/* ── Coluna esquerda ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-[20px] items-center 1024:items-start w-full 1024:flex-[1_0_0] 1024:max-w-[670px] 1024:min-w-[280px] 1024:self-center">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.badge}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] w-full text-center 1024:text-left">
            {t.h1part1}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(113deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
              Web
            </span>
            {" + "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(113deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
              {t.h1part2}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] w-full text-center 1024:text-left">
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[10px] items-center justify-center xl:justify-start w-full">
            <a
              href="/contato"
              className="flex gap-[10px] items-center justify-center min-h-[56px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer"
              style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              <FigmaIcon src={imgChat} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center whitespace-nowrap">
                {t.cta}
              </span>
            </a>
          </div>

          {/* Feature cards */}
          <div className="flex flex-wrap 1024:flex-nowrap gap-[10px] items-stretch justify-center 1024:justify-start w-full">
            {featureCards.map((f) => (
              <div key={f.title} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[220px] min-w-[200px] 1024:min-w-px px-[10px] py-[20px] rounded-[16px]">
                <div className="flex items-center justify-center p-[12px] rounded-[12px] shrink-0 size-[60px]" style={{ backgroundColor: f.bg }}>
                  <FigmaIcon src={f.icon} size={30} aspectW={f.iconW} aspectH={f.iconH} />
                </div>
                <div className="flex items-center justify-center min-h-[44px] w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full">{f.title}</p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] text-center w-full">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust badges — dentro da col esquerda apenas no win-1280+ (TELA TOTAL) */}
          <div className="hidden win-1280:flex flex-wrap gap-[8px] items-center w-full">
            <BadgeRow badges={t.trustBadges} />
          </div>
        </div>

        {/* ── Coluna direita — mockup image ─────────────────────────────── */}
        {/* win-1280+: invisible — ocupa espaço mas bg image contém o mockup */}
        <div className="win-1280:invisible rounded-[16px] overflow-clip h-[481px] min-w-[280px] w-full 1024:flex-[1_0_0] 1024:self-center">
          <img
            src={imgMockup}
            alt={t.mockupAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Trust badges linha separada — default + 1024, oculta no win-1280+ ── */}
        <div className="flex win-1280:hidden flex-wrap gap-[8px] items-center w-full 1024:flex-none">
          <BadgeRow badges={t.trustBadges} />
        </div>

      </div>
    </section>
  );
}
