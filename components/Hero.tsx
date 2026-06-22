"use client";
import { useState, useEffect } from "react";
import FigmaIcon from "./FigmaIcon";
import { DotAtivo, DotInativo } from "./ui/SlideDot";
import { useLang, type Lang } from "@/context/LanguageContext";

// Backgrounds
const imgBg1    = "/figma-assets/bg-slide-1.webp";
const imgBg2    = "/figma-assets/bg-slide-2-xl.webp";
// Images
const imgMockup  = "/figma-assets/mockup-tablet-phone.webp";
const imgFrame36 = "/figma-assets/frame-36-mobile-product.webp";
// Slide 1 feature icons
const imgPlanetWeb = "/figma-assets/icon-planetweb-30px-b.svg";
const imgCloud     = "/figma-assets/icon-cloud-30px.svg";
const imgAI        = "/figma-assets/icon-ai-30px-b.svg";
const imgGlobe     = "/figma-assets/icon-globe-30px-a.svg";
// Slide 2 icons
const imgGiftLabel = "/figma-assets/icon-gift-label.svg";
const imgFiltros   = "/figma-assets/icon-filtros-40px.svg";
const imgWater20   = "/figma-assets/icon-water-20.svg";
const imgPlugPlay  = "/figma-assets/icon-plug-play.svg";
const imgGiftCTA   = "/figma-assets/icon-gift-cta.svg";
// Arrows
const imgArrowWhite = "/figma-assets/icon-arrow-white-a.svg";
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-a.svg";
// Stats bar 1 icons
const imgGlobeStats   = "/figma-assets/icon-globe-stats-30px.svg";
const imgChatStats    = "/figma-assets/icon-chat-stats.svg";
const imgMobileStats  = "/figma-assets/icon-mobile-stats.svg";
const imgWifiStats    = "/figma-assets/icon-wifi-stats.svg";
const imgPessoasStats = "/figma-assets/icon-pessoas-stats.svg";
const imgMediaStats   = "/figma-assets/icon-media-stats.svg";
// Stats bar 2 icons
const imgAguaPura = "/figma-assets/icon-agua-pura-30px.svg";
const imgShield   = "/figma-assets/icon-shield-26px-b.svg";

// ─── Gradient constants ──────────────────────────────────────────────────────
const gdBase    = { backgroundImage: "linear-gradient(104deg, #0233c3 6.19%, #9f3df5 93.35%)" };
const gdHover   = { backgroundImage: "linear-gradient(104deg, #002ba8 6.19%, #6e0cc3 93.35%)" };
const gdPressed = { backgroundImage: "linear-gradient(104deg, #0569ff 6.19%, #b25efb 93.35%)" };

// ─── Static icon arrays ──────────────────────────────────────────────────────
const S1_FEAT_ICONS = [
  { bg: "#0233c3", icon: imgCloud,  aspectW: 30, aspectH: 22 },
  { bg: "#7a16d2", icon: imgAI,     aspectW: 30, aspectH: 30 },
  { bg: "#36ae5c", icon: imgGlobe,  aspectW: 30, aspectH: 30 },
];
const S2_CARD_ICONS = [
  { icon: imgFiltros,  aspectW: 40,  aspectH: 40  },
  { icon: imgWater20,  aspectW: 35,  aspectH: 42  },
  { icon: imgPlugPlay, aspectW: 485, aspectH: 629 },
];
const STATS1_ICONS = [
  { icon: imgGlobeStats,   aspectW: 30,    aspectH: 30    },
  { icon: imgChatStats,    aspectW: 30,    aspectH: 30    },
  { icon: imgMobileStats,  aspectW: 21,    aspectH: 30    },
  { icon: imgWifiStats,    aspectW: 30,    aspectH: 20    },
  { icon: imgPessoasStats, aspectW: 43.86, aspectH: 40.5  },
  { icon: imgMediaStats,   aspectW: 26.67, aspectH: 26.67 },
];

// ─── Translations ────────────────────────────────────────────────────────────
type Stats1Item = { top: string; bottom: string } | { lines: string[] };

const T: Record<Lang, {
  s1Label: string;
  s1H1a: string; s1H1b: string;
  s1Sub: string;
  s1Features: { title: string; desc: string }[];
  s1Cta1: string; s1Cta2mob: string; s1Cta2desk: string;
  s2Label: string;
  s2H1a: string; s2H1b: string;
  s2SubMobP1: string; s2SubMobP2: string;
  s2SubDeskP1: string; s2SubDeskP2: string;
  s2Cards: { label: string }[];
  giftEarn: string; giftIn: string;
  stats1: Stats1Item[];
  stats2tag: [string, string];
  stats2rules: string[];
}> = {
  pt: {
    s1Label: "NOVA FASE GLOBAL",
    s1H1a: "Plataforma Inteligente para ",
    s1H1b: "Água de Qualidade",
    s1Sub: "A Acquafy conecta produtos inteligentes, filtros de alta performance, App + AI, parceiros globais e recorrência para transformar a forma como o mundo consome água.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infraestrutura segura e escalável na nuvem para máxima performance" },
      { title: "App + AI",          desc: "Inteligência artificial integrada para decisões mais rápidas e eficientes." },
      { title: "Gestão Global",    desc: "Visão completa do negócio com dados em tempo real em qualquer lugar." },
    ],
    s1Cta1: "Conheça a Linha Neo", s1Cta2mob: "Compare os produtos", s1Cta2desk: "Conheça nossa Plataforma",
    s2Label: "CAMPANHA ACQUAFY",
    s2H1a: "Água de qualidade",
    s2H1b: "não deve ser privilégio.",
    s2SubMobP1: "A Acquafy combina tecnologia, inteligência artificial, conectividade e sustentabilidade para transformar a forma como pessoas, empresas e comunidades acessam água pura e de qualidade em todo o mundo.",
    s2SubMobP2: "Faça um upgrade do seu purificador antigo para o novo ",
    s2SubDeskP1: "A Acquafy torna a água pura mais acessível, com tecnologia global, design premium e benefícios reais para o seu dia a dia.",
    s2SubDeskP2: "Faça um upgrade do seu purificador antigo para o novo ",
    s2Cards: [
      { label: "4 filtros de alta performance" },
      { label: "20 estágios de tratamento" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Ganhe", giftIn: "no Brasil",
    stats1: [
      { top: "Até",  bottom: "180 países" },
      { top: "16",   bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Parceiros Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Tecnologia que transforma.", " Água que muda vidas."],
    stats2rules: [
      "Entregue seu purificador antigo no momento da compra.",
      "Bônus não convertido em dinheiro.",
      "Válido na compra de um novo Acquafy Neo UP.",
    ],
  },
  en: {
    s1Label: "NEW GLOBAL PHASE",
    s1H1a: "Smart Platform for ",
    s1H1b: "Quality Water",
    s1Sub: "Acquafy connects smart products, high-performance filters, App + AI, global partners and recurring revenue to transform how the world consumes water.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Secure and scalable cloud infrastructure for maximum performance" },
      { title: "App + AI",          desc: "Integrated artificial intelligence for faster and more efficient decisions." },
      { title: "Global Management", desc: "Complete business overview with real-time data from anywhere." },
    ],
    s1Cta1: "Explore the Neo Line", s1Cta2mob: "Compare products", s1Cta2desk: "Explore our Platform",
    s2Label: "ACQUAFY CAMPAIGN",
    s2H1a: "Quality water",
    s2H1b: "should not be a privilege.",
    s2SubMobP1: "Acquafy combines technology, artificial intelligence, connectivity and sustainability to transform how people, businesses and communities access pure, quality water around the world.",
    s2SubMobP2: "Upgrade your old purifier to the new ",
    s2SubDeskP1: "Acquafy makes pure water more accessible, with global technology, premium design and real benefits for your daily life.",
    s2SubDeskP2: "Upgrade your old purifier to the new ",
    s2Cards: [
      { label: "4 high-performance filters" },
      { label: "20 treatment stages" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Earn", giftIn: "in Brazil",
    stats1: [
      { top: "Up to", bottom: "180 countries" },
      { top: "16",    bottom: "languages" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver Partners,", "Gold and Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Technology that transforms.", " Water that changes lives."],
    stats2rules: [
      "Return your old purifier at the time of purchase.",
      "Bonus not convertible to cash.",
      "Valid on the purchase of a new Acquafy Neo UP.",
    ],
  },
  es: {
    s1Label: "NUEVA FASE GLOBAL",
    s1H1a: "Plataforma Inteligente para ",
    s1H1b: "Agua de Calidad",
    s1Sub: "Acquafy conecta productos inteligentes, filtros de alto rendimiento, App + AI, socios globales y recurrencia para transformar la forma en que el mundo consume agua.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infraestructura segura y escalable en la nube para máximo rendimiento" },
      { title: "App + AI",          desc: "Inteligencia artificial integrada para decisiones más rápidas y eficientes." },
      { title: "Gestión Global",   desc: "Visión completa del negocio con datos en tiempo real desde cualquier lugar." },
    ],
    s1Cta1: "Conoce la Línea Neo", s1Cta2mob: "Compara los productos", s1Cta2desk: "Conoce nuestra Plataforma",
    s2Label: "CAMPAÑA ACQUAFY",
    s2H1a: "El agua de calidad",
    s2H1b: "no debe ser un privilegio.",
    s2SubMobP1: "Acquafy combina tecnología, inteligencia artificial, conectividad y sostenibilidad para transformar cómo personas, empresas y comunidades acceden al agua pura y de calidad en todo el mundo.",
    s2SubMobP2: "Actualiza tu purificador antiguo al nuevo ",
    s2SubDeskP1: "Acquafy hace el agua pura más accesible, con tecnología global, diseño premium y beneficios reales para tu día a día.",
    s2SubDeskP2: "Actualiza tu purificador antiguo al nuevo ",
    s2Cards: [
      { label: "4 filtros de alto rendimiento" },
      { label: "20 etapas de tratamiento" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Gana", giftIn: "en Brasil",
    stats1: [
      { top: "Hasta", bottom: "180 países" },
      { top: "16",    bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Socios Silver,", "Gold y Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Tecnología que transforma.", " Agua que cambia vidas."],
    stats2rules: [
      "Entrega tu purificador antiguo al momento de la compra.",
      "Bono no convertible en dinero.",
      "Válido en la compra de un nuevo Acquafy Neo UP.",
    ],
  },
  fr: {
    s1Label: "NOUVELLE PHASE MONDIALE",
    s1H1a: "Plateforme Intelligente pour ",
    s1H1b: "une Eau de Qualité",
    s1Sub: "Acquafy connecte des produits intelligents, des filtres haute performance, App + AI, des partenaires mondiaux et des revenus récurrents pour transformer la façon dont le monde consomme l'eau.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infrastructure cloud sécurisée et évolutive pour une performance maximale" },
      { title: "App + AI",          desc: "Intelligence artificielle intégrée pour des décisions plus rapides et efficaces." },
      { title: "Gestion Mondiale",  desc: "Vue complète de l'activité avec des données en temps réel depuis n'importe où." },
    ],
    s1Cta1: "Découvrez la Ligne Neo", s1Cta2mob: "Comparez les produits", s1Cta2desk: "Découvrez notre Plateforme",
    s2Label: "CAMPAGNE ACQUAFY",
    s2H1a: "Une eau de qualité",
    s2H1b: "ne devrait pas être un privilège.",
    s2SubMobP1: "Acquafy combine technologie, intelligence artificielle, connectivité et durabilité pour transformer la façon dont les personnes, les entreprises et les communautés accèdent à l'eau pure et de qualité dans le monde entier.",
    s2SubMobP2: "Remplacez votre ancien purificateur par le nouveau ",
    s2SubDeskP1: "Acquafy rend l'eau pure plus accessible, avec une technologie mondiale, un design premium et de vrais avantages pour votre quotidien.",
    s2SubDeskP2: "Remplacez votre ancien purificateur par le nouveau ",
    s2Cards: [
      { label: "4 filtres haute performance" },
      { label: "20 étapes de traitement" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Gagnez", giftIn: "au Brésil",
    stats1: [
      { top: "Jusqu'à", bottom: "180 pays" },
      { top: "16",      bottom: "langues" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Partenaires Silver,", "Gold et Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Technologie qui transforme.", " Eau qui change des vies."],
    stats2rules: [
      "Rendez votre ancien purificateur au moment de l'achat.",
      "Bonus non convertible en espèces.",
      "Valable pour l'achat d'un nouveau Acquafy Neo UP.",
    ],
  },
  de: {
    s1Label: "NEUE GLOBALE PHASE",
    s1H1a: "Intelligente Plattform für ",
    s1H1b: "Qualitätswasser",
    s1Sub: "Acquafy verbindet intelligente Produkte, Hochleistungsfilter, App + AI, globale Partner und wiederkehrende Einnahmen, um die Art und Weise zu transformieren, wie die Welt Wasser konsumiert.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Sichere und skalierbare Cloud-Infrastruktur für maximale Leistung" },
      { title: "App + AI",          desc: "Integrierte künstliche Intelligenz für schnellere und effizientere Entscheidungen." },
      { title: "Globales Management", desc: "Vollständiger Geschäftsüberblick mit Echtzeit-Daten von überall." },
    ],
    s1Cta1: "Neo-Linie entdecken", s1Cta2mob: "Produkte vergleichen", s1Cta2desk: "Unsere Plattform entdecken",
    s2Label: "ACQUAFY KAMPAGNE",
    s2H1a: "Qualitätswasser",
    s2H1b: "sollte kein Privileg sein.",
    s2SubMobP1: "Acquafy kombiniert Technologie, künstliche Intelligenz, Konnektivität und Nachhaltigkeit, um zu transformieren, wie Menschen, Unternehmen und Gemeinschaften weltweit auf reines, hochwertiges Wasser zugreifen.",
    s2SubMobP2: "Ersetzen Sie Ihren alten Reiniger durch den neuen ",
    s2SubDeskP1: "Acquafy macht reines Wasser zugänglicher, mit globaler Technologie, Premium-Design und echten Vorteilen für Ihren Alltag.",
    s2SubDeskP2: "Ersetzen Sie Ihren alten Reiniger durch den neuen ",
    s2Cards: [
      { label: "4 Hochleistungsfilter" },
      { label: "20 Aufbereitungsstufen" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Gewinnen Sie", giftIn: "in Brasilien",
    stats1: [
      { top: "Bis zu", bottom: "180 Länder" },
      { top: "16",     bottom: "Sprachen" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver-Partner,", "Gold und Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Technologie, die transformiert.", " Wasser, das Leben verändert."],
    stats2rules: [
      "Geben Sie Ihren alten Reiniger beim Kauf zurück.",
      "Bonus ist nicht in Bargeld umwandelbar.",
      "Gültig beim Kauf eines neuen Acquafy Neo UP.",
    ],
  },
  it: {
    s1Label: "NUOVA FASE GLOBALE",
    s1H1a: "Piattaforma Intelligente per ",
    s1H1b: "Acqua di Qualità",
    s1Sub: "Acquafy connette prodotti intelligenti, filtri ad alte prestazioni, App + AI, partner globali e ricavi ricorrenti per trasformare il modo in cui il mondo consuma l'acqua.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infrastruttura cloud sicura e scalabile per le massime prestazioni" },
      { title: "App + AI",          desc: "Intelligenza artificiale integrata per decisioni più rapide ed efficienti." },
      { title: "Gestione Globale",  desc: "Visione completa del business con dati in tempo reale da qualsiasi luogo." },
    ],
    s1Cta1: "Scopri la Linea Neo", s1Cta2mob: "Confronta i prodotti", s1Cta2desk: "Scopri la nostra Piattaforma",
    s2Label: "CAMPAGNA ACQUAFY",
    s2H1a: "L'acqua di qualità",
    s2H1b: "non dovrebbe essere un privilegio.",
    s2SubMobP1: "Acquafy combina tecnologia, intelligenza artificiale, connettività e sostenibilità per trasformare il modo in cui persone, aziende e comunità accedono all'acqua pura e di qualità in tutto il mondo.",
    s2SubMobP2: "Aggiorna il tuo vecchio purificatore al nuovo ",
    s2SubDeskP1: "Acquafy rende l'acqua pura più accessibile, con tecnologia globale, design premium e vantaggi reali per la tua vita quotidiana.",
    s2SubDeskP2: "Aggiorna il tuo vecchio purificatore al nuovo ",
    s2Cards: [
      { label: "4 filtri ad alte prestazioni" },
      { label: "20 fasi di trattamento" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Guadagna", giftIn: "in Brasile",
    stats1: [
      { top: "Fino a", bottom: "180 paesi" },
      { top: "16",     bottom: "lingue" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Partner Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Tecnologia che trasforma.", " Acqua che cambia vite."],
    stats2rules: [
      "Consegna il tuo vecchio purificatore al momento dell'acquisto.",
      "Bonus non convertibile in denaro.",
      "Valido per l'acquisto di un nuovo Acquafy Neo UP.",
    ],
  },
  zh: {
    s1Label: "全球新阶段",
    s1H1a: "优质饮水的",
    s1H1b: "智能平台",
    s1Sub: "Acquafy连接智能产品、高性能过滤器、App + AI、全球合作伙伴和持续收益，变革世界饮水方式。",
    s1Features: [
      { title: "Acquafy Platform", desc: "安全可扩展的云基础设施，实现最高性能" },
      { title: "App + AI",          desc: "集成人工智能，实现更快、更高效的决策。" },
      { title: "全球管理",          desc: "随时随地通过实时数据全面掌握业务状况。" },
    ],
    s1Cta1: "探索Neo系列", s1Cta2mob: "比较产品", s1Cta2desk: "了解我们的平台",
    s2Label: "ACQUAFY活动",
    s2H1a: "优质饮水",
    s2H1b: "不应是特权。",
    s2SubMobP1: "Acquafy融合技术、人工智能、连接性和可持续性，变革全球各地人们、企业和社区获取纯净优质水的方式。",
    s2SubMobP2: "将您的旧净水器升级为全新的 ",
    s2SubDeskP1: "Acquafy让纯净水更易获得，凭借全球技术、高端设计和真正的日常生活益处。",
    s2SubDeskP2: "将您的旧净水器升级为全新的 ",
    s2Cards: [
      { label: "4个高性能过滤器" },
      { label: "20个处理阶段" },
      { label: "Plug & Play" },
    ],
    giftEarn: "赢取", giftIn: "在巴西",
    stats1: [
      { top: "最多",   bottom: "180个国家" },
      { top: "16",     bottom: "种语言" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver合作伙伴,", "Gold及Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["改变世界的技术。", " 改变生活的水。"],
    stats2rules: [
      "购买时交回您的旧净水器。",
      "奖励不可兑换为现金。",
      "适用于购买全新Acquafy Neo UP。",
    ],
  },
  ja: {
    s1Label: "新たなグローバルフェーズ",
    s1H1a: "高品質な水のための",
    s1H1b: "スマートプラットフォーム",
    s1Sub: "Acquafyはスマート製品、高性能フィルター、App + AI、グローバルパートナー、リカーリング収益を接続し、世界の水消費を変革します。",
    s1Features: [
      { title: "Acquafy Platform", desc: "最高のパフォーマンスのための安全でスケーラブルなクラウドインフラ" },
      { title: "App + AI",          desc: "より迅速で効率的な意思決定のための統合人工知能。" },
      { title: "グローバル管理",    desc: "どこからでもリアルタイムデータでビジネスを完全に把握。" },
    ],
    s1Cta1: "Neoラインを見る", s1Cta2mob: "製品を比較する", s1Cta2desk: "プラットフォームを見る",
    s2Label: "ACQUAFY キャンペーン",
    s2H1a: "高品質な水は",
    s2H1b: "特権であるべきではない。",
    s2SubMobP1: "Acquafyはテクノロジー、人工知能、コネクティビティ、サステナビリティを組み合わせ、世界中の人々、企業、コミュニティが純粋で高品質な水にアクセスする方法を変革します。",
    s2SubMobP2: "古い浄水器を新しい ",
    s2SubDeskP1: "Acquafyはグローバルテクノロジー、プレミアムデザイン、日常生活への真のメリットで、純水をより身近にします。",
    s2SubDeskP2: "古い浄水器を新しい ",
    s2Cards: [
      { label: "4つの高性能フィルター" },
      { label: "20の処理ステージ" },
      { label: "Plug & Play" },
    ],
    giftEarn: "ゲット", giftIn: "ブラジルで",
    stats1: [
      { top: "最大",    bottom: "180カ国" },
      { top: "16",      bottom: "言語" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silverパートナー,", "GoldとPlatinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["変革をもたらすテクノロジー。", " 生活を変える水。"],
    stats2rules: [
      "購入時に古い浄水器をお返しください。",
      "ボーナスは現金への換算不可。",
      "新しいAcquafy Neo UPのご購入に有効。",
    ],
  },
  ko: {
    s1Label: "새로운 글로벌 단계",
    s1H1a: "고품질 물을 위한 ",
    s1H1b: "스마트 플랫폼",
    s1Sub: "Acquafy는 스마트 제품, 고성능 필터, App + AI, 글로벌 파트너와 반복 수익을 연결하여 세계의 물 소비 방식을 혁신합니다.",
    s1Features: [
      { title: "Acquafy Platform", desc: "최고의 성능을 위한 안전하고 확장 가능한 클라우드 인프라" },
      { title: "App + AI",          desc: "더 빠르고 효율적인 의사결정을 위한 통합 인공지능." },
      { title: "글로벌 관리",       desc: "어디서나 실시간 데이터로 완전한 비즈니스 현황 파악." },
    ],
    s1Cta1: "Neo 라인 탐색", s1Cta2mob: "제품 비교", s1Cta2desk: "플랫폼 탐색",
    s2Label: "ACQUAFY 캠페인",
    s2H1a: "고품질 물은",
    s2H1b: "특권이어서는 안 됩니다.",
    s2SubMobP1: "Acquafy는 기술, 인공지능, 연결성, 지속가능성을 결합하여 전 세계 사람들, 기업, 커뮤니티가 순수하고 고품질의 물에 접근하는 방식을 변화시킵니다.",
    s2SubMobP2: "오래된 정수기를 새로운 ",
    s2SubDeskP1: "Acquafy는 글로벌 기술, 프리미엄 디자인, 일상생활의 실질적인 혜택으로 순수한 물을 더 쉽게 접근할 수 있게 합니다.",
    s2SubDeskP2: "오래된 정수기를 새로운 ",
    s2Cards: [
      { label: "4개의 고성능 필터" },
      { label: "20단계 처리" },
      { label: "Plug & Play" },
    ],
    giftEarn: "받으세요", giftIn: "브라질에서",
    stats1: [
      { top: "최대",   bottom: "180개국" },
      { top: "16",     bottom: "개 언어" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver 파트너,", "Gold 및 Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["변화를 만드는 기술.", " 삶을 바꾸는 물."],
    stats2rules: [
      "구매 시 기존 정수기를 반납하세요.",
      "보너스는 현금으로 전환 불가.",
      "새로운 Acquafy Neo UP 구매 시 유효.",
    ],
  },
  "pt-pt": {
    s1Label: "NOVA FASE GLOBAL",
    s1H1a: "Plataforma Inteligente para ",
    s1H1b: "Água de Qualidade",
    s1Sub: "A Acquafy liga produtos inteligentes, filtros de alta performance, App + AI, parceiros globais e recorrência para transformar a forma como o mundo consome água.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infraestrutura segura e escalável na nuvem para máxima performance" },
      { title: "App + AI",          desc: "Inteligência artificial integrada para decisões mais rápidas e eficientes." },
      { title: "Gestão Global",    desc: "Visão completa do negócio com dados em tempo real em qualquer lugar." },
    ],
    s1Cta1: "Conheça a Linha Neo", s1Cta2mob: "Compare os produtos", s1Cta2desk: "Conheça a nossa Plataforma",
    s2Label: "CAMPANHA ACQUAFY",
    s2H1a: "Água de qualidade",
    s2H1b: "não deve ser um privilégio.",
    s2SubMobP1: "A Acquafy combina tecnologia, inteligência artificial, conectividade e sustentabilidade para transformar a forma como pessoas, empresas e comunidades acedem a água pura e de qualidade em todo o mundo.",
    s2SubMobP2: "Faça um upgrade do seu purificador antigo para o novo ",
    s2SubDeskP1: "A Acquafy torna a água pura mais acessível, com tecnologia global, design premium e benefícios reais para o seu dia a dia.",
    s2SubDeskP2: "Faça um upgrade do seu purificador antigo para o novo ",
    s2Cards: [
      { label: "4 filtros de alta performance" },
      { label: "20 estágios de tratamento" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Ganhe", giftIn: "no Brasil",
    stats1: [
      { top: "Até",  bottom: "180 países" },
      { top: "16",   bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Parceiros Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Tecnologia que transforma.", " Água que muda vidas."],
    stats2rules: [
      "Entregue o seu purificador antigo no momento da compra.",
      "Bónus não convertido em dinheiro.",
      "Válido na compra de um novo Acquafy Neo UP.",
    ],
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function GiftCard({ earn, inText }: { earn: string; inText: string }) {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center min-h-[60px] min-w-[190px] px-[20px] py-[5px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-col items-center justify-center p-[10px] rounded-full size-[41px] shrink-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
        <FigmaIcon src={imgGiftCTA} size={20} />
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-[100px]">
        {earn}{" "}
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">R$100,00</span>
        {" "}{inText}
      </p>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 2), 5000);
    return () => clearInterval(id);
  }, [hovered, slide]);
  const t = T[lang];

  return (
    <section
      className={`relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)] ${slide === 1 ? "xl:bg-transparent bg-gradient-to-b from-[#fafbff] to-[#e8f1f8]" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Backgrounds */}
      {slide === 0 && <img src={imgBg1} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />}
      {slide === 1 && <img src={imgBg2} alt="" className="hidden xl:block absolute inset-0 w-full h-full object-cover pointer-events-none" />}

      {/* ══ MOBILE LAYOUT (<xl) ══ */}
      <div className="xl:hidden relative flex-1 flex flex-col gap-[20px] items-center w-full">

        {/* === SLIDE 1 - mobile === */}
        {slide === 0 && (
          <>
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgPlanetWeb} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">{t.s1Label}</span>
            </div>

            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full text-center">
              {t.s1H1a}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {t.s1H1b}
              </span>
            </h1>

            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full">
              {t.s1Sub}
            </p>

            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {S1_FEAT_ICONS.map((f, i) => (
                <div key={i} className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-[180px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                    <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#07235c] text-center w-full">{t.s1Features[i].title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">{t.s1Features[i].desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px] items-center justify-center">
              <DotAtivo />
              <DotInativo onClick={() => setSlide(1)} aria-label="ir para slide 2" />
            </div>

            <div
              className="flex items-end justify-end w-full max-w-[800px] cursor-pointer"
              style={{ minHeight: "254px" }}
              onClick={() => setSlide(1)}
              aria-label="Próximo slide"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSlide(1)}
            >
              <div className="relative w-full" style={{ aspectRatio: "3160/2300" }}>
                <img src={imgMockup} alt="Acquafy Platform Mockup" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <a href="/linha-neo" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">{t.s1Cta1}</span>
                <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
              </a>
              <a href="/compare" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.s1Cta2mob}</span>
                <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
                </div>
              </a>
            </div>
          </>
        )}

        {/* === SLIDE 2 - mobile === */}
        {slide === 1 && (
          <>
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgGiftLabel} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {t.s2Label}
              </span>
            </div>

            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full text-center">
              {t.s2H1a}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">
                {t.s2H1b}
              </span>
            </h1>

            <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full flex flex-col gap-[26px]">
              <p>{t.s2SubMobP1}</p>
              <p>{t.s2SubMobP2}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(116.55deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                  Acquafy Neo UP.
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
              {S2_CARD_ICONS.map((f, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                  <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center w-full min-h-[44px]">{t.s2Cards[i].label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px] items-center justify-center">
              <DotInativo onClick={() => setSlide(0)} aria-label="ir para slide 1" />
              <DotAtivo />
            </div>

            <div
              className="relative w-full overflow-hidden rounded-[16px] cursor-pointer"
              style={{ height: 508 }}
              onClick={() => setSlide(0)}
              aria-label="Slide anterior"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSlide(0)}
            >
              <img src={imgFrame36} alt="Acquafy Neo UP" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <GiftCard earn={t.giftEarn} inText={t.giftIn} />
            </div>
          </>
        )}
      </div>

      {/* ══ DESKTOP LAYOUT (xl+) ══ */}
      <div
        className="hidden xl:flex relative flex-1 flex-col gap-[20px] items-center justify-center w-full cursor-pointer"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest("button, a")) setSlide((s) => (s + 1) % 2);
        }}
      >
        <div className={`relative flex xl:flex-row xl:items-center xl:flex-1 gap-[40px] items-center max-w-[1400px] w-full ${slide === 0 ? "justify-center" : "justify-start"}`}>

          {/* LEFT COLUMN */}
          <div className={`flex flex-col gap-[20px] items-start justify-center flex-1 min-w-[280px] ${slide === 0 ? "max-w-[580px]" : "max-w-[680px]"}`}>

            {/* Label */}
            {slide === 0 ? (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgPlanetWeb} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">{t.s1Label}</span>
              </div>
            ) : (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgGiftLabel} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>{t.s2Label}</span>
              </div>
            )}

            {/* H1 */}
            {slide === 0 ? (
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full">
                {t.s1H1a}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>{t.s1H1b}</span>
              </h1>
            ) : (
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full">
                {t.s2H1a}<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>{t.s2H1b}</span>
              </h1>
            )}

            {/* Subtitle */}
            {slide === 0 ? (
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] w-full">
                {t.s1Sub}
              </p>
            ) : (
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333]">{t.s2SubDeskP1}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333]">
                  {t.s2SubDeskP2}
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(116.55deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>Acquafy Neo UP.</span>
                </p>
              </div>
            )}

            {/* Feature items */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
                {S1_FEAT_ICONS.map((f, i) => (
                  <div key={i} className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[180px]">
                    <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                      <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#07235c] w-full">{t.s1Features[i].title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{t.s1Features[i].desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
                {S2_CARD_ICONS.map((f, i) => (
                  <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                    <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center w-full min-h-[44px]">{t.s2Cards[i].label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-center justify-start w-full">
                <a href="/linha-neo" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">{t.s1Cta1}</span>
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </a>
                <a href="/plataforma" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.s1Cta2desk}</span>
                  <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
                  </div>
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
                <GiftCard earn={t.giftEarn} inText={t.giftIn} />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — slide 0 only */}
          {slide === 0 && (
            <div className="flex flex-1 items-end justify-end min-w-px">
              <div className="relative w-full" style={{ aspectRatio: "3160/2300" }}>
                <img src={imgMockup} alt="Acquafy Platform Mockup" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Desktop dots */}
        <div className="flex gap-[10px] items-center justify-center">
          {slide === 0 ? (
            <>
              <DotAtivo />
              <DotInativo onClick={() => setSlide(1)} aria-label="ir para slide 2" />
            </>
          ) : (
            <>
              <DotInativo onClick={() => setSlide(0)} aria-label="ir para slide 1" />
              <DotAtivo />
            </>
          )}
        </div>
      </div>

      {/* ══ STATS BAR ══ */}
      {slide === 0 ? (
        <div className="relative bg-[#0233c3] flex flex-wrap gap-y-[30px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] rounded-[16px] w-full">
          {STATS1_ICONS.map((stat, i) => {
            const text = t.stats1[i];
            return (
              <div key={i} className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-w-[160px] px-[10px]">
                <FigmaIcon src={stat.icon} size={30} aspectW={stat.aspectW} aspectH={stat.aspectH} />
                <div className="flex flex-col gap-[2px]">
                  {"lines" in text ? text.lines.map((l, li) => (
                    <span key={li} className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white">{l}</span>
                  )) : (
                    <>
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white">{text.top}</span>
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white">{text.bottom}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative bg-white flex flex-col xl:flex-row gap-[30px] xl:gap-x-[20px] items-center justify-center max-w-[1400px] min-h-[85px] overflow-hidden px-[20px] py-[25px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] w-full">
          <div className="flex flex-[1_0_0] gap-[10px] items-center min-w-[240px] max-w-[480px]">
            <FigmaIcon src={imgAguaPura} size={30} />
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-px">
              {t.stats2tag[0]}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(164.34deg, #0233c3 5.42%, #9f3df5 28.68%)" }}>{t.stats2tag[1]}</span>
            </p>
          </div>
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-between min-w-px">
            {t.stats2rules.map((text) => (
              <div key={text} className="drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)] flex flex-[1_0_0] gap-[10px] items-center min-w-[180px] rounded-[12px]">
                <FigmaIcon src={imgShield} size={24} aspectW={26.14} aspectH={30} />
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#333] flex-1 min-w-px">{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
