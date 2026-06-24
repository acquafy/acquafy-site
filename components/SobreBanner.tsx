"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/bg-desktop-lg.webp"; // lg+ bg fullscreen (≥1024px)
const imgBannerCard = "/figma-assets/banner-card-mobile.webp"; // mobile card (<1024px)
const imgGlobe      = "/figma-assets/icon-globe-badge.svg"; // badge globe  sq
const imgUsa        = "/figma-assets/flag-usa-sq.svg"; // USA flag     sq
const imgInterfyIcon= "/figma-assets/icon-interfy.svg"; // Interfy icon sq
const imgMobile     = "/figma-assets/icon-mobile-21px.svg"; // Mobile icon  21×30 portrait
const imgArrowWhite = "/figma-assets/icon-arrow-white-solid-btn.svg"; // white arrow  (solid btn)
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-c.svg"; // blue arrow   (outline btn)
const imgAI         = "/figma-assets/icon-ai-40px.svg"; // AI IA        40×40 sq
const imgWater      = "/figma-assets/icon-water-bubble-40px.svg"; // water bubble 40×40 sq
const imgGlobe2     = "/figma-assets/icon-globe-connectivity-40px.svg"; // connectivity 40×40 sq
const imgSustent    = "/figma-assets/icon-sustent-b.svg"; // sustainability sq

// ── Translations ──────────────────────────────────────────────────────────────
type PillItem = {
  icon: string; iconAlt: string; sub: string; title: string;
  aspectW?: number; aspectH?: number;
};

type BottomFeatureItem = {
  icon: string; iconAlt: string; title: string; description: string;
};

const T: Record<Lang, {
  headingPrefix: string;
  para1: string;
  para2: string;
  pillItems: Pick<PillItem, "sub" | "title">[];
  btn1: string;
  btn2: string;
  bottomFeatures: Pick<BottomFeatureItem, "title" | "description">[];
}> = {
  pt: {
    headingPrefix: "Sobre a ",
    para1: "Nossa missão é transformar o acesso à água de qualidade e melhorar vidas.",
    para2: "A Acquafy une tecnologia, inteligência artificial, conectividade e design premium para oferecer soluções modernas de purificação, gestão e experiência da água para casas, empresas e operações globais.",
    pillItems: [
      { sub: "100% americana",     title: "Fundada nos EUA em 2020" },
      { sub: "Parte do",           title: "Interfy Group" },
      { sub: "Presença global com", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Conheça nossa história",
    btn2: "Fale com nossa equipe",
    bottomFeatures: [
      { title: "Tecnologia + IA",     description: "Inteligência artificial aplicada à experiência da água" },
      { title: "Purificação premium",  description: "Água pura, segura e de qualidade superior" },
      { title: "Conectividade global", description: "Soluções inteligentes com IoT e gestão em tempo real" },
      { title: "Sustentabilidade",     description: "Impacto positivo para pessoas, comunidades e o planeta" },
    ],
  },
  "pt-pt": {
    headingPrefix: "Sobre a ",
    para1: "A nossa missão é transformar o acesso a água de qualidade e melhorar vidas.",
    para2: "A Acquafy une tecnologia, inteligência artificial, conectividade e design premium para oferecer soluções modernas de purificação, gestão e experiência da água para habitações, empresas e operações globais.",
    pillItems: [
      { sub: "100% americana",      title: "Fundada nos EUA em 2020" },
      { sub: "Parte do",            title: "Interfy Group" },
      { sub: "Presença global com", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Conheça a nossa história",
    btn2: "Fale com a nossa equipa",
    bottomFeatures: [
      { title: "Tecnologia + IA",     description: "Inteligência artificial aplicada à experiência da água" },
      { title: "Purificação premium",  description: "Água pura, segura e de qualidade superior" },
      { title: "Conectividade global", description: "Soluções inteligentes com IoT e gestão em tempo real" },
      { title: "Sustentabilidade",     description: "Impacto positivo para pessoas, comunidades e o planeta" },
    ],
  },
  en: {
    headingPrefix: "About ",
    para1: "Our mission is to transform access to quality water and improve lives.",
    para2: "Acquafy combines technology, artificial intelligence, connectivity and premium design to offer modern solutions for water purification, management and experience for homes, businesses and global operations.",
    pillItems: [
      { sub: "100% American",      title: "Founded in the USA in 2020" },
      { sub: "Part of",            title: "Interfy Group" },
      { sub: "Global presence with", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Our Story",
    btn2: "Talk to Our Team",
    bottomFeatures: [
      { title: "Technology + AI",     description: "Artificial intelligence applied to the water experience" },
      { title: "Premium Purification", description: "Pure, safe water of superior quality" },
      { title: "Global Connectivity",  description: "Smart solutions with IoT and real-time management" },
      { title: "Sustainability",        description: "Positive impact for people, communities and the planet" },
    ],
  },
  "en-gb": {
    headingPrefix: "About ",
    para1: "Our mission is to transform access to quality water and improve lives.",
    para2: "Acquafy combines technology, artificial intelligence, connectivity and premium design to offer modern solutions for water purification, management and experience for homes, businesses and global operations.",
    pillItems: [
      { sub: "100% American",      title: "Founded in the USA in 2020" },
      { sub: "Part of",            title: "Interfy Group" },
      { sub: "Global presence with", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Our Story",
    btn2: "Talk to Our Team",
    bottomFeatures: [
      { title: "Technology + AI",     description: "Artificial intelligence applied to the water experience" },
      { title: "Premium Purification", description: "Pure, safe water of superior quality" },
      { title: "Global Connectivity",  description: "Smart solutions with IoT and real-time management" },
      { title: "Sustainability",        description: "Positive impact for people, communities and the planet" },
    ],
  },
  es: {
    headingPrefix: "Sobre ",
    para1: "Nuestra misión es transformar el acceso al agua de calidad y mejorar vidas.",
    para2: "Acquafy une tecnología, inteligencia artificial, conectividad y diseño premium para ofrecer soluciones modernas de purificación, gestión y experiencia del agua para hogares, empresas y operaciones globales.",
    pillItems: [
      { sub: "100% americana",     title: "Fundada en EE.UU. en 2020" },
      { sub: "Parte del",          title: "Interfy Group" },
      { sub: "Presencia global con", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Nuestra Historia",
    btn2: "Habla con Nuestro Equipo",
    bottomFeatures: [
      { title: "Tecnología + IA",     description: "Inteligencia artificial aplicada a la experiencia del agua" },
      { title: "Purificación premium", description: "Agua pura, segura y de calidad superior" },
      { title: "Conectividad global",  description: "Soluciones inteligentes con IoT y gestión en tiempo real" },
      { title: "Sostenibilidad",        description: "Impacto positivo para personas, comunidades y el planeta" },
    ],
  },
  fr: {
    headingPrefix: "À propos d'",
    para1: "Notre mission est de transformer l'accès à l'eau de qualité et d'améliorer les vies.",
    para2: "Acquafy allie technologie, intelligence artificielle, connectivité et design premium pour offrir des solutions modernes de purification, de gestion et d'expérience de l'eau pour les foyers, les entreprises et les opérations mondiales.",
    pillItems: [
      { sub: "100% américaine",       title: "Fondée aux États-Unis en 2020" },
      { sub: "Membre du",             title: "Interfy Group" },
      { sub: "Présence mondiale avec", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Notre Histoire",
    btn2: "Parler à Notre Équipe",
    bottomFeatures: [
      { title: "Technologie + IA",     description: "Intelligence artificielle appliquée à l'expérience de l'eau" },
      { title: "Purification premium", description: "Eau pure, sûre et de qualité supérieure" },
      { title: "Connectivité mondiale", description: "Solutions intelligentes avec IoT et gestion en temps réel" },
      { title: "Durabilité",           description: "Impact positif pour les personnes, les communautés et la planète" },
    ],
  },
  de: {
    headingPrefix: "Über ",
    para1: "Unsere Mission ist es, den Zugang zu qualitativ hochwertigem Wasser zu transformieren und Leben zu verbessern.",
    para2: "Acquafy vereint Technologie, künstliche Intelligenz, Konnektivität und Premium-Design, um moderne Lösungen für Wasserreinigung, -management und -erlebnis für Haushalte, Unternehmen und globale Operationen anzubieten.",
    pillItems: [
      { sub: "100% amerikanisch",     title: "Gegründet in den USA 2020" },
      { sub: "Teil der",              title: "Interfy Group" },
      { sub: "Globale Präsenz mit",   title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Unsere Geschichte",
    btn2: "Mit Unserem Team sprechen",
    bottomFeatures: [
      { title: "Technologie + KI",     description: "Künstliche Intelligenz für das Wassererlebnis" },
      { title: "Premium-Reinigung",    description: "Reines, sicheres Wasser von überlegener Qualität" },
      { title: "Globale Konnektivität", description: "Intelligente Lösungen mit IoT und Echtzeit-Management" },
      { title: "Nachhaltigkeit",       description: "Positiver Impact für Menschen, Gemeinschaften und den Planeten" },
    ],
  },
  it: {
    headingPrefix: "Su ",
    para1: "La nostra missione è trasformare l'accesso all'acqua di qualità e migliorare le vite.",
    para2: "Acquafy unisce tecnologia, intelligenza artificiale, connettività e design premium per offrire soluzioni moderne di purificazione, gestione ed esperienza dell'acqua per case, aziende e operazioni globali.",
    pillItems: [
      { sub: "100% americana",        title: "Fondata negli USA nel 2020" },
      { sub: "Parte del",             title: "Interfy Group" },
      { sub: "Presenza globale con",  title: "App + IoT + Acquafy AI" },
    ],
    btn1: "La Nostra Storia",
    btn2: "Parla con il Nostro Team",
    bottomFeatures: [
      { title: "Tecnologia + IA",      description: "Intelligenza artificiale applicata all'esperienza dell'acqua" },
      { title: "Purificazione premium", description: "Acqua pura, sicura e di qualità superiore" },
      { title: "Connettività globale",  description: "Soluzioni intelligenti con IoT e gestione in tempo reale" },
      { title: "Sostenibilità",         description: "Impatto positivo per persone, comunità e il pianeta" },
    ],
  },
  zh: {
    headingPrefix: "关于",
    para1: "我们的使命是改变优质水的获取方式，改善人们的生活。",
    para2: "Acquafy 融合技术、人工智能、连接性与高端设计，为家庭、企业及全球运营提供现代化的水净化、管理与体验解决方案。",
    pillItems: [
      { sub: "百分百美国品牌",   title: "2020年于美国成立" },
      { sub: "隶属于",           title: "Interfy Group" },
      { sub: "全球存在，涵盖",   title: "App + IoT + Acquafy AI" },
    ],
    btn1: "我们的故事",
    btn2: "联系我们的团队",
    bottomFeatures: [
      { title: "技术 + 人工智能", description: "将人工智能应用于水体验" },
      { title: "高端净化",         description: "纯净、安全、品质卓越的水" },
      { title: "全球连接性",       description: "具有物联网与实时管理的智能解决方案" },
      { title: "可持续性",         description: "为人、社区和地球创造积极影响" },
    ],
  },
  ja: {
    headingPrefix: "",
    para1: "私たちのミッションは、質の高い水へのアクセスを変革し、生活を向上させることです。",
    para2: "Acquafy はテクノロジー、人工知能、コネクティビティ、プレミアムデザインを組み合わせ、家庭・企業・グローバルオペレーション向けに現代的な水の浄化・管理・体験ソリューションを提供します。",
    pillItems: [
      { sub: "100%アメリカ企業",   title: "2020年に米国で設立" },
      { sub: "加盟",               title: "Interfy Group" },
      { sub: "グローバル展開",     title: "App + IoT + Acquafy AI" },
    ],
    btn1: "私たちの歴史",
    btn2: "チームに相談する",
    bottomFeatures: [
      { title: "テクノロジー + AI", description: "水の体験に活かされる人工知能" },
      { title: "プレミアム浄水",    description: "純粋で安全、卓越した品質の水" },
      { title: "グローバル接続性",  description: "IoTとリアルタイム管理を備えたスマートソリューション" },
      { title: "サステナビリティ",  description: "人・コミュニティ・地球へのポジティブなインパクト" },
    ],
  },
  ko: {
    headingPrefix: "Acquafy 소개",
    para1: "우리의 사명은 양질의 물에 대한 접근성을 혁신하고 삶을 개선하는 것입니다.",
    para2: "Acquafy 는 기술, 인공지능, 연결성, 프리미엄 디자인을 결합하여 가정, 기업, 글로벌 운영을 위한 현대적인 정수, 관리 및 물 경험 솔루션을 제공합니다.",
    pillItems: [
      { sub: "100% 미국 브랜드",   title: "2020년 미국에서 설립" },
      { sub: "소속",               title: "Interfy Group" },
      { sub: "글로벌 존재감",      title: "App + IoT + Acquafy AI" },
    ],
    btn1: "우리의 이야기",
    btn2: "팀과 상담하기",
    bottomFeatures: [
      { title: "기술 + AI",         description: "물 경험에 적용된 인공지능" },
      { title: "프리미엄 정수",      description: "순수하고 안전하며 탁월한 품질의 물" },
      { title: "글로벌 연결성",      description: "IoT와 실시간 관리를 갖춘 스마트 솔루션" },
      { title: "지속 가능성",        description: "사람, 커뮤니티, 지구에 긍정적인 영향" },
    ],
  },
  sv: {
    headingPrefix: "Om ",
    para1: "Vår mission är att förändra tillgången till kvalitetsvatten och förbättra liv.",
    para2: "Acquafy kombinerar teknik, artificiell intelligens, anslutning och premiumdesign för att erbjuda moderna lösningar för vattenrening, -hantering och -upplevelse för hem, företag och globala verksamheter.",
    pillItems: [
      { sub: "100% amerikanskt",      title: "Grundat i USA 2020" },
      { sub: "Del av",                title: "Interfy Group" },
      { sub: "Global närvaro med",    title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Vår Historia",
    btn2: "Prata med Vårt Team",
    bottomFeatures: [
      { title: "Teknik + AI",          description: "Artificiell intelligens tillämpad på vattenupplevelsen" },
      { title: "Premiumrening",        description: "Rent, säkert vatten av överlägsen kvalitet" },
      { title: "Global anslutning",    description: "Smarta lösningar med IoT och realtidshantering" },
      { title: "Hållbarhet",           description: "Positiv inverkan för människor, samhällen och planeten" },
    ],
  },
  fi: {
    headingPrefix: "Tietoa ",
    para1: "Missiomme on muuttaa laadukkaan veden saatavuutta ja parantaa elämää.",
    para2: "Acquafy yhdistää teknologian, tekoälyn, yhteydet ja premium-muotoilun tarjotakseen moderneja ratkaisuja veden puhdistukseen, hallintaan ja kokemukseen kodeille, yrityksille ja globaaleille toiminnoille.",
    pillItems: [
      { sub: "100% amerikkalainen",   title: "Perustettu USA:ssa 2020" },
      { sub: "Osa",                   title: "Interfy Groupia" },
      { sub: "Globaali läsnäolo",     title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Tarinamme",
    btn2: "Ota yhteyttä tiimiimme",
    bottomFeatures: [
      { title: "Teknologia + AI",      description: "Tekoäly sovellettuna vesikokemukseen" },
      { title: "Premium-puhdistus",    description: "Puhdas, turvallinen vesi erinomaisesta laadusta" },
      { title: "Globaali yhteys",      description: "Älykkäitä ratkaisuja IoT:lla ja reaaliaikaisella hallinnalla" },
      { title: "Kestävä kehitys",      description: "Positiivinen vaikutus ihmisille, yhteisöille ja planeetalle" },
    ],
  },
  ru: {
    headingPrefix: "O kompanii ",
    para1: "Nasha missiya — preobrazovat dostup k kachestvennoj vode i uluchshat zhizn lyudej.",
    para2: "Acquafy ob'edinyaet tekhnologii, iskusstvennyj intellekt, svyaznost i premium-dizajn dlya predlozheniya sovremennykh reshenij po ochistke, upravleniyu i opyte vody dlya domov, predpriyatij i globalnykh operacij.",
    pillItems: [
      { sub: "100% amerikanskij",     title: "Osnovana v SShA v 2020 g." },
      { sub: "Chast",                 title: "Interfy Group" },
      { sub: "Globalnoe prisutstvie", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Nasha istoriya",
    btn2: "Svyazatsya s nashej komandoj",
    bottomFeatures: [
      { title: "Tekhnologii + ИИ",    description: "Iskusstvennyj intellekt v opyte vody" },
      { title: "Premium-ochistka",    description: "Chistaya, bezopasnaya voda prevoskhodnogo kachestva" },
      { title: "Globalnaya svyaz",    description: "Umnye resheniya s IoT i upravleniem v realnom vremeni" },
      { title: "Ustojchivost",        description: "Polozhitelnoye vozdejstvie na lyudej, soobshchestva i planetu" },
    ],
  },
  ro: {
    headingPrefix: "Despre ",
    para1: "Misiunea noastra este sa transformam accesul la apa de calitate si sa imbunatatim vietile.",
    para2: "Acquafy combina tehnologia, inteligenta artificiala, conectivitatea si designul premium pentru a oferi solutii moderne de purificare, gestionare si experienta a apei pentru case, companii si operatiuni globale.",
    pillItems: [
      { sub: "100% americana",        title: "Fondata in SUA in 2020" },
      { sub: "Parte din",             title: "Interfy Group" },
      { sub: "Prezenta globala cu",   title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Povestea noastra",
    btn2: "Vorbeste cu echipa noastra",
    bottomFeatures: [
      { title: "Tehnologie + IA",      description: "Inteligenta artificiala aplicata experientei apei" },
      { title: "Purificare premium",   description: "Apa pura, sigura si de calitate superioara" },
      { title: "Conectivitate globala", description: "Solutii inteligente cu IoT si management in timp real" },
      { title: "Sustenabilitate",      description: "Impact pozitiv pentru oameni, comunitati si planeta" },
    ],
  },
  he: {
    headingPrefix: "אודות ",
    para1: "המשימה שלנו היא לשנות את הגישה למים איכותיים ולשפר חיים.",
    para2: "Acquafy משלבת טכנולוגיה, בינה מלאכותית, קישוריות ועיצוב פרמיום כדי להציע פתרונות מודרניים לטיהור, ניהול וחוויית מים לבתים, עסקים ופעולות גלובליות.",
    pillItems: [
      { sub: "100% אמריקאי",          title: "נוסדה בארה\"ב ב-2020" },
      { sub: "חלק מ-",                title: "Interfy Group" },
      { sub: "נוכחות גלובלית עם",     title: "App + IoT + Acquafy AI" },
    ],
    btn1: "הסיפור שלנו",
    btn2: "דבר עם הצוות שלנו",
    bottomFeatures: [
      { title: "טכנולוגיה + AI",       description: "בינה מלאכותית מיושמת על חוויית המים" },
      { title: "טיהור פרמיום",         description: "מים נקיים, בטוחים ובאיכות מעולה" },
      { title: "קישוריות גלובלית",     description: "פתרונות חכמים עם IoT וניהול בזמן אמת" },
      { title: "קיימות",               description: "השפעה חיובית על אנשים, קהילות והפלנטה" },
    ],
  },
};

// ── Static pill icon/alt data (no translation needed) ─────────────────────────
const pillIconData: Pick<PillItem, "icon" | "iconAlt" | "aspectW" | "aspectH">[] = [
  { icon: imgUsa,         iconAlt: "EUA" },
  { icon: imgInterfyIcon, iconAlt: "Interfy Group" },
  { icon: imgMobile,      iconAlt: "App + IoT", aspectW: 21, aspectH: 30 },
];

const bottomIconData: Pick<BottomFeatureItem, "icon" | "iconAlt">[] = [
  { icon: imgAI,      iconAlt: "Tecnologia + IA" },
  { icon: imgWater,   iconAlt: "Purificação premium" },
  { icon: imgGlobe2,  iconAlt: "Conectividade global" },
  { icon: imgSustent, iconAlt: "Sustentabilidade" },
];

// ── Feature pill — mobile (<lg): horizontal (ícone + texto lado a lado) ────────
function FeaturePill({ icon, iconAlt, aspectW, aspectH, sub, title }: PillItem) {
  return (
    <div className="flex flex-[1_0_0] flex-row gap-[10px] items-center min-w-[240px]">
      <div className="bg-white flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[60px]">
        <FigmaIcon src={icon} alt={iconAlt} size={36} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px">
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">{sub}</p>
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#2a2a2b] w-full">{title}</p>
      </div>
    </div>
  );
}

// ── Feature pill — desktop (lg+): vertical ────────────────────────────────────
function FeaturePillDesktop({ icon, iconAlt, aspectW, aspectH, sub, title }: PillItem) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-px">
      <div className="bg-white flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[60px]">
        <FigmaIcon src={icon} alt={iconAlt} size={36} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <div className="flex flex-col gap-[6px] items-start justify-center text-center w-full">
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">{sub}</p>
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#2a2a2b] w-full">{title}</p>
      </div>
    </div>
  );
}

// ── Bottom feature card ────────────────────────────────────────────────────────
function BottomFeature({ icon, iconAlt, title, description }: BottomFeatureItem) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[160px] win-1280:flex-row win-1280:flex-wrap">
      <FigmaIcon src={icon} alt={iconAlt} size={40} />
      <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-[200px] text-center win-1280:text-left">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">{title}</p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">{description}</p>
      </div>
    </div>
  );
}

// ── CTA buttons ───────────────────────────────────────────────────────────────
function CTAButtons({ stretch = false, btn1, btn2 }: { stretch?: boolean; btn1: string; btn2: string }) {
  return (
    <div className={`flex flex-wrap gap-[20px] items-center ${stretch ? "justify-center max-w-[800px] w-full" : "justify-center xl:justify-start w-full"}`}>
      <a href="#quem-somos" className={`flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer no-underline ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
        <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-white flex-1 text-center">
          {btn1}
        </span>
        <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
      </a>
      <a href="/contact" className={`group flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors cursor-pointer no-underline ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
        <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">
          {btn2}
        </span>
        <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
          <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
            <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
          </div>
          <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </div>
        </div>
      </a>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge() {
  return (
    <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
      <FigmaIcon src={imgGlobe} size={16} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
        GLOBAL SMART WATER PLATFORM
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SobreBanner() {
  const { lang } = useLang();
  const t = T[lang];

  const pillItems: PillItem[] = pillIconData.map((icon, i) => ({
    ...icon,
    ...t.pillItems[i],
  }));

  const bottomFeatures: BottomFeatureItem[] = bottomIconData.map((icon, i) => ({
    ...icon,
    ...t.bottomFeatures[i],
  }));

  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">

      {/* Background — apenas lg+ (≥1024px); hidden no mobile */}
      <img
        alt=""
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* ══ MOBILE (<lg = <1024px) ══════════════════════════════════════════ */}
      <div className="lg:hidden relative flex flex-col gap-[20px] items-center w-full">

        <Badge />

        <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] text-center w-full">
          {t.headingPrefix}<span className="text-[#0569ff]">Acquafy</span>
        </h1>

        <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#333] text-center">
          <p className="leading-[26px] mb-[4px]">
            {t.para1}
          </p>
          <p className="leading-[26px]">
            {t.para2}
          </p>
        </div>

        {/* Pills horizontais */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {pillItems.map((p) => <FeaturePill key={p.title} {...p} />)}
        </div>

        <CTAButtons stretch btn1={t.btn1} btn2={t.btn2} />

        {/* Card de imagem */}
        <div className="relative h-[380px] min-w-[280px] rounded-[16px] w-full overflow-hidden shrink-0">
          <img
            alt="Acquafy Global Smart Water"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={imgBannerCard}
          />
        </div>
      </div>

      {/* ══ DESKTOP (lg+ = ≥1024px) ═════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-1 items-center justify-center max-w-[1400px] w-full relative">
        <div className="flex flex-wrap items-center w-full">

          {/* Coluna esquerda */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center max-w-[650px] min-w-[280px]">

            <Badge />

            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b]">
              {t.headingPrefix}<span className="text-[#0569ff]">Acquafy</span>
            </h1>

            <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#333]">
              <p className="leading-[26px] mb-[4px]">
                {t.para1}
              </p>
              <p className="leading-[26px]">
                {t.para2}
              </p>
            </div>

            {/* Pills verticais */}
            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {pillItems.map((p) => <FeaturePillDesktop key={p.title} {...p} />)}
            </div>

            <CTAButtons btn1={t.btn1} btn2={t.btn2} />
          </div>

          {/* Coluna direita — espaçador (bg image preenche) */}
          <div className="flex-[1_0_0] min-w-[240px]" />
        </div>
      </div>

      {/* ══ BOTTOM INFO BAR — sempre ════════════════════════════════════════ */}
      <div
        className="relative flex flex-wrap gap-[30px_20px] items-start justify-center overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full max-w-[1400px]"
        style={{ backgroundImage: "linear-gradient(92deg, rgb(243, 250, 255) 0%, rgb(206, 239, 255) 100%)" }}
      >
        {bottomFeatures.map((f) => <BottomFeature key={f.title} {...f} />)}
      </div>
    </section>
  );
}
