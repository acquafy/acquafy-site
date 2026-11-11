"use client";
import Img from "@/components/ui/Img";
import { useState, useEffect } from "react";
import FigmaIcon from "./FigmaIcon";
import { DotAtivo, DotInativo } from "./ui/SlideDot";
import { useLang, type Lang } from "@/context/LanguageContext";

// Backgrounds
const imgBg1     = "/figma-assets/bg-slide-1.webp";
const imgBg2a    = "/figma-assets/bg-campanha-1024.webp";
const imgBg2b    = "/figma-assets/bg-campanha-1400.webp";
// Images
const imgMockup  = "/figma-assets/image-banner-home.webp";
const imgFrame36 = "/figma-assets/frame-36-mobile-product.webp";
// Slide 1 feature icons
const imgPlanetWeb = "/figma-assets/icon-planet-b.svg";
const imgCloud     = "/figma-assets/icon-cloud-30px.svg";
const imgAI        = "/figma-assets/icon-ai-30px-b.svg";
const imgGlobe     = "/figma-assets/icon-globe-30px-a.svg";
// Slide 2 icons
const imgGiftLabel = "/figma-assets/icon-gift-label.svg";
const imgFiltros   = "/figma-assets/icon-filtros-40px.svg";
const imgWater20   = "/figma-assets/icon-water-20.svg";
const imgPlugPlay  = "/figma-assets/icon-plug-play.svg";
const imgGiftCTA   = "/figma-assets/icon-gift-cta.svg";
const imgCalendar      = "/figma-assets/icon-calendar-a.svg";
const imgChatBlue      = "/figma-assets/icon-chat-blue.svg";
const imgChatWhite     = "/figma-assets/icon-chat-white.svg";
const imgChat42px      = "/figma-assets/icon-chat-42px.svg";
const imgFeatureFilters = "/figma-assets/icon-feature-filters.svg";
// Arrows
const imgArrowWhite = "/figma-assets/icon-arrow-white-hover.svg";
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-b.svg";
// Stats bar 1 icons
const imgGlobeStats   = "/figma-assets/icon-globe-nova-fase.svg";
const imgChatStats    = "/figma-assets/icon-chat-stats.svg";
const imgMobileStats  = "/figma-assets/icon-app-control.svg";
const imgWifiStats    = "/figma-assets/icon-wifi-2025.svg";
const imgPessoasStats = "/figma-assets/icon-pessoas-stats.svg";
const imgMediaStats   = "/figma-assets/icon-bpm-play.svg";
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
  { icon: imgPlugPlay,       aspectW: 41.5, aspectH: 41.5 },
  { icon: imgFeatureFilters, aspectW: 42,   aspectH: 42   },
  { icon: imgChat42px,       aspectW: 42,   aspectH: 42   },
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Água como Serviço",
    s2H1b: "Assinatura mensal por US$ 40",
    s2SubMobP1: "Tenha um purificador Acquafy com reposição de filtros e suporte incluídos em um modelo simples, acessível e inteligente para sua casa ou empresa.",
    s2SubMobP2: "",
    s2SubDeskP1: "Tenha um purificador Acquafy com reposição de filtros e suporte incluídos em um modelo simples, acessível e inteligente para sua casa ou empresa.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purificador incluso" },
      { label: "Reposição de filtros" },
      { label: "Suporte especializado" },
    ],
    giftEarn: "Assine agora", giftIn: "Falar com um especialista",
    stats1: [
      { top: "+ de", bottom: "180 países" },
      { top: "16",   bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Parceiros Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Sem alto investimento inicial", ""],
    stats2rules: [
      "Plano simples e previsível",
      "Manutenção facilitada",
      "Ideal para casas e empresas",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Water as a Service",
    s2H1b: "Monthly subscription for US$ 40",
    s2SubMobP1: "Get an Acquafy purifier with filter replacements and support included in a simple, affordable and smart plan for your home or business.",
    s2SubMobP2: "",
    s2SubDeskP1: "Get an Acquafy purifier with filter replacements and support included in a simple, affordable and smart plan for your home or business.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purifier included" },
      { label: "Filter replacements" },
      { label: "Specialized support" },
    ],
    giftEarn: "Subscribe now", giftIn: "Talk to a specialist",
    stats1: [
      { top: "Up to", bottom: "180 countries" },
      { top: "16",    bottom: "languages" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver Partners,", "Gold and Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["No high upfront investment", ""],
    stats2rules: [
      "Simple and predictable plan",
      "Easy maintenance",
      "Ideal for homes and businesses",
    ],
  },
  "en-gb": {
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
    s2SubDeskP1: "Get an Acquafy purifier with filter replacements and support included in a simple, affordable and smart plan for your home or business.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purifier included" },
      { label: "Filter replacements" },
      { label: "Specialised support" },
    ],
    giftEarn: "Subscribe now", giftIn: "Talk to a specialist",
    stats1: [
      { top: "Up to", bottom: "180 countries" },
      { top: "16",    bottom: "languages" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver Partners,", "Gold and Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["No high upfront investment", ""],
    stats2rules: [
      "Simple and predictable plan",
      "Easy maintenance",
      "Ideal for homes and businesses",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Agua como Servicio",
    s2H1b: "Suscripción mensual por US$ 40",
    s2SubMobP1: "Obtenga un purificador Acquafy con reposición de filtros y soporte incluidos en un modelo simple, accesible e inteligente para su hogar o empresa.",
    s2SubMobP2: "",
    s2SubDeskP1: "Obtenga un purificador Acquafy con reposición de filtros y soporte incluidos en un modelo simple, accesible e inteligente para su hogar o empresa.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purificador incluido" },
      { label: "Reposición de filtros" },
      { label: "Soporte especializado" },
    ],
    giftEarn: "Suscríbete ahora", giftIn: "Hablar con un especialista",
    stats1: [
      { top: "+ de",  bottom: "180 países" },
      { top: "16",    bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Socios Silver,", "Gold y Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Sin alta inversión inicial", ""],
    stats2rules: [
      "Plan simple y predecible",
      "Mantenimiento facilitado",
      "Ideal para hogares y empresas",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "L'eau comme service",
    s2H1b: "Abonnement mensuel à US$ 40",
    s2SubMobP1: "Bénéficiez d'un purificateur Acquafy avec le remplacement des filtres et l'assistance inclus dans un modèle simple, abordable et intelligent pour votre domicile ou entreprise.",
    s2SubMobP2: "",
    s2SubDeskP1: "Bénéficiez d'un purificateur Acquafy avec le remplacement des filtres et l'assistance inclus dans un modèle simple, abordable et intelligent pour votre domicile ou entreprise.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purificateur inclus" },
      { label: "Remplacement des filtres" },
      { label: "Assistance spécialisée" },
    ],
    giftEarn: "S'abonner maintenant", giftIn: "Parler à un spécialiste",
    stats1: [
      { top: "+ de",     bottom: "180 pays" },
      { top: "16",      bottom: "langues" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Partenaires Silver,", "Gold et Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Pas d'investissement initial élevé", ""],
    stats2rules: [
      "Plan simple et prévisible",
      "Maintenance facilitée",
      "Idéal pour les maisons et entreprises",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Wasser als Service",
    s2H1b: "Monatliches Abo für US$ 40",
    s2SubMobP1: "Erhalten Sie einen Acquafy-Reiniger mit Filteraustausch und Support im Modell enthalten – einfach, erschwinglich und intelligent für Ihr Zuhause oder Unternehmen.",
    s2SubMobP2: "",
    s2SubDeskP1: "Erhalten Sie einen Acquafy-Reiniger mit Filteraustausch und Support im Modell enthalten – einfach, erschwinglich und intelligent für Ihr Zuhause oder Unternehmen.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Reiniger inklusive" },
      { label: "Filteraustausch" },
      { label: "Spezialisierter Support" },
    ],
    giftEarn: "Jetzt abonnieren", giftIn: "Mit einem Spezialisten sprechen",
    stats1: [
      { top: "Bis zu", bottom: "180 Länder" },
      { top: "16",     bottom: "Sprachen" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver-Partner,", "Gold und Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Keine hohe Anfangsinvestition", ""],
    stats2rules: [
      "Einfacher und planbarer Tarif",
      "Erleichterte Wartung",
      "Ideal für Haushalte und Unternehmen",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "L'acqua come servizio",
    s2H1b: "Abbonamento mensile a US$ 40",
    s2SubMobP1: "Ottieni un purificatore Acquafy con sostituzione dei filtri e supporto inclusi in un modello semplice, accessibile e intelligente per la tua casa o azienda.",
    s2SubMobP2: "",
    s2SubDeskP1: "Ottieni un purificatore Acquafy con sostituzione dei filtri e supporto inclusi in un modello semplice, accessibile e intelligente per la tua casa o azienda.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purificatore incluso" },
      { label: "Sostituzione filtri" },
      { label: "Supporto specializzato" },
    ],
    giftEarn: "Abbonati ora", giftIn: "Parla con uno specialista",
    stats1: [
      { top: "+ di",   bottom: "180 paesi" },
      { top: "16",     bottom: "lingue" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Partner Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Nessun alto investimento iniziale", ""],
    stats2rules: [
      "Piano semplice e prevedibile",
      "Manutenzione facilitata",
      "Ideale per case e aziende",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "水即服务",
    s2H1b: "每月仅需US$ 40",
    s2SubMobP1: "获取配备滤芯更换和技术支持的Acquafy净水器，简单、实惠、智能，适合家庭和企业使用。",
    s2SubMobP2: "",
    s2SubDeskP1: "获取配备滤芯更换和技术支持的Acquafy净水器，简单、实惠、智能，适合家庭和企业使用。",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "净水器已包含" },
      { label: "滤芯更换" },
      { label: "专业技术支持" },
    ],
    giftEarn: "立即订阅", giftIn: "与专家交流",
    stats1: [
      { top: "最多",   bottom: "180个国家" },
      { top: "16",     bottom: "种语言" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver合作伙伴,", "Gold及Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["无需高额初始投资", ""],
    stats2rules: [
      "简单可预期的计划",
      "便捷维护",
      "适合家庭和企业",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "水のサービス",
    s2H1b: "月額US$ 40のサブスクリプション",
    s2SubMobP1: "フィルター交換とサポートが含まれたAcquafy浄水器を、ご家庭やビジネス向けのシンプル、手頃、スマートなモデルでご利用いただけます。",
    s2SubMobP2: "",
    s2SubDeskP1: "フィルター交換とサポートが含まれたAcquafy浄水器を、ご家庭やビジネス向けのシンプル、手頃、スマートなモデルでご利用いただけます。",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "浄水器込み" },
      { label: "フィルター交換" },
      { label: "専門サポート" },
    ],
    giftEarn: "今すぐ申し込む", giftIn: "専門家に相談する",
    stats1: [
      { top: "最大",    bottom: "180カ国" },
      { top: "16",      bottom: "言語" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silverパートナー,", "GoldとPlatinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["高額な初期投資なし", ""],
    stats2rules: [
      "シンプルで予測可能なプラン",
      "容易なメンテナンス",
      "家庭とビジネスに最適",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "서비스로서의 물",
    s2H1b: "월 US$ 40 구독",
    s2SubMobP1: "필터 교체 및 지원이 포함된 Acquafy 정수기를 가정 및 기업을 위한 간단하고 합리적이며 스마트한 모델로 이용하세요.",
    s2SubMobP2: "",
    s2SubDeskP1: "필터 교체 및 지원이 포함된 Acquafy 정수기를 가정 및 기업을 위한 간단하고 합리적이며 스마트한 모델로 이용하세요.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "정수기 포함" },
      { label: "필터 교체" },
      { label: "전문 지원" },
    ],
    giftEarn: "지금 구독", giftIn: "전문가와 상담",
    stats1: [
      { top: "최대",   bottom: "180개국" },
      { top: "16",     bottom: "개 언어" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver 파트너,", "Gold 및 Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["높은 초기 투자 없음", ""],
    stats2rules: [
      "단순하고 예측 가능한 플랜",
      "편리한 유지 관리",
      "가정과 기업에 적합",
    ],
  },
  sv: {
    s1Label: "NY GLOBAL FAS",
    s1H1a: "Smart plattform för ",
    s1H1b: "kvalitetsvatten",
    s1Sub: "Acquafy kopplar samman smarta produkter, högpresterande filter, App + AI, globala partners och återkommande intäkter för att förändra hur världen konsumerar vatten.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Säker och skalbar molninfrastruktur för maximal prestanda" },
      { title: "App + AI",          desc: "Integrerad artificiell intelligens för snabbare och effektivare beslut." },
      { title: "Global förvaltning", desc: "Komplett affärsöversikt med realtidsdata från var som helst." },
    ],
    s1Cta1: "Utforska Neo-linjen", s1Cta2mob: "Jämför produkter", s1Cta2desk: "Utforska vår plattform",
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Vatten som tjänst",
    s2H1b: "Månadsabonnemang för US$ 40",
    s2SubMobP1: "Få en Acquafy-reningsenhet med filterbyten och support inkluderat i ett enkelt, prisvärt och smart abonnemang för ditt hem eller företag.",
    s2SubMobP2: "",
    s2SubDeskP1: "Få en Acquafy-reningsenhet med filterbyten och support inkluderat i ett enkelt, prisvärt och smart abonnemang för ditt hem eller företag.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Reningsenhet ingår" },
      { label: "Filterbyte" },
      { label: "Specialiserat support" },
    ],
    giftEarn: "Prenumerera nu", giftIn: "Prata med en specialist",
    stats1: [
      { top: "Upp till", bottom: "180 länder" },
      { top: "16",       bottom: "språk" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver-partners,", "Gold och Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Ingen hög initial investering", ""],
    stats2rules: [
      "Enkelt och förutsägbart abonnemang",
      "Enklare underhåll",
      "Idealiskt för hem och företag",
    ],
  },
  fi: {
    s1Label: "UUSI GLOBAALI VAIHE",
    s1H1a: "Äly-alusta ",
    s1H1b: "laadukkaalle vedelle",
    s1Sub: "Acquafy yhdistää älykkäät tuotteet, suorituskykyiset suodattimet, App + AI:n, globaalit kumppanit ja toistuvat tulot muuttaakseen tapaa, jolla maailma kuluttaa vettä.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Turvallinen ja skaalautuva pilvi-infrastruktuuri maksimaalista suorituskykyä varten" },
      { title: "App + AI",          desc: "Integroitu tekoäly nopeampien ja tehokkaampien päätösten tueksi." },
      { title: "Globaali hallinta",  desc: "Täydellinen liiketoimintakatsaus reaaliaikaisella datalla mistä tahansa." },
    ],
    s1Cta1: "Tutustu Neo-sarjaan", s1Cta2mob: "Vertaa tuotteita", s1Cta2desk: "Tutustu alustaamme",
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Vesi palveluna",
    s2H1b: "Kuukausitilaus vain US$ 40",
    s2SubMobP1: "Hanki Acquafy-puhdistin suodatinvaihdoilla ja tuella sisällytettynä yksinkertaiseen, edulliseen ja älykkääseen malliin kotisi tai yrityksesi tarpeisiin.",
    s2SubMobP2: "",
    s2SubDeskP1: "Hanki Acquafy-puhdistin suodatinvaihdoilla ja tuella sisällytettynä yksinkertaiseen, edulliseen ja älykkääseen malliin kotisi tai yrityksesi tarpeisiin.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Puhdistin sisältyy" },
      { label: "Suodatinvaihto" },
      { label: "Erikoistunut tuki" },
    ],
    giftEarn: "Tilaa nyt", giftIn: "Puhu asiantuntijan kanssa",
    stats1: [
      { top: "Jopa", bottom: "180 maata" },
      { top: "16",   bottom: "kieltä" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver-kumppanit,", "Gold ja Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Ei suurta alkuinvestointia", ""],
    stats2rules: [
      "Yksinkertainen ja ennakoitava suunnitelma",
      "Helppo huolto",
      "Sopii koteihin ja yrityksiin",
    ],
  },
  ru: {
    s1Label: "НОВЫЙ ГЛОБАЛЬНЫЙ ЭТАП",
    s1H1a: "Умная платформа для ",
    s1H1b: "качественной воды",
    s1Sub: "Acquafy объединяет умные продукты, высокоэффективные фильтры, App + AI, глобальных партнёров и повторяющийся доход, чтобы изменить способ, которым мир потребляет воду.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Безопасная и масштабируемая облачная инфраструктура для максимальной производительности" },
      { title: "App + AI",          desc: "Интегрированный искусственный интеллект для более быстрых и эффективных решений." },
      { title: "Глобальное управление", desc: "Полный обзор бизнеса с данными в режиме реального времени из любой точки мира." },
    ],
    s1Cta1: "Изучить линейку Neo", s1Cta2mob: "Сравнить продукты", s1Cta2desk: "Изучить нашу платформу",
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Вода как услуга",
    s2H1b: "Ежемесячная подписка за US$ 40",
    s2SubMobP1: "Получите очиститель Acquafy с заменой фильтров и поддержкой в рамках простой, доступной и умной модели для вашего дома или бизнеса.",
    s2SubMobP2: "",
    s2SubDeskP1: "Получите очиститель Acquafy с заменой фильтров и поддержкой в рамках простой, доступной и умной модели для вашего дома или бизнеса.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Очиститель включён" },
      { label: "Замена фильтров" },
      { label: "Специализированная поддержка" },
    ],
    giftEarn: "Подписаться сейчас", giftIn: "Поговорить со специалистом",
    stats1: [
      { top: "До", bottom: "180 стран" },
      { top: "16",  bottom: "языков" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Партнёры Silver,", "Gold и Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Без высоких начальных вложений", ""],
    stats2rules: [
      "Простой и предсказуемый план",
      "Удобное обслуживание",
      "Идеально для домов и предприятий",
    ],
  },
  ro: {
    s1Label: "NOUA FAZA GLOBALA",
    s1H1a: "Platforma inteligenta pentru ",
    s1H1b: "apa de calitate",
    s1Sub: "Acquafy conecteaza produse inteligente, filtre de inalta performanta, App + AI, parteneri globali si venituri recurente pentru a transforma modul in care lumea consuma apa.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infrastructura cloud sigura si scalabila pentru performanta maxima" },
      { title: "App + AI",          desc: "Inteligenta artificiala integrata pentru decizii mai rapide si mai eficiente." },
      { title: "Management global", desc: "Imagine completa a afacerii cu date in timp real de oriunde." },
    ],
    s1Cta1: "Exploreaza linia Neo", s1Cta2mob: "Compara produsele", s1Cta2desk: "Exploreaza platforma noastra",
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Apa ca serviciu",
    s2H1b: "Abonament lunar pentru US$ 40",
    s2SubMobP1: "Obtineti un purificator Acquafy cu inlocuire filtre si suport incluse intr-un model simplu, accesibil si inteligent pentru casa sau compania dumneavoastra.",
    s2SubMobP2: "",
    s2SubDeskP1: "Obtineti un purificator Acquafy cu inlocuire filtre si suport incluse intr-un model simplu, accesibil si inteligent pentru casa sau compania dumneavoastra.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purificator inclus" },
      { label: "Inlocuire filtre" },
      { label: "Suport specializat" },
    ],
    giftEarn: "Abonati-va acum", giftIn: "Vorbiti cu un specialist",
    stats1: [
      { top: "Pana la", bottom: "180 de tari" },
      { top: "16",      bottom: "limbi" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Parteneri Silver,", "Gold si Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Fara investitie initiala mare", ""],
    stats2rules: [
      "Plan simplu si previzibil",
      "Mentenanta facilitata",
      "Ideal pentru case si companii",
    ],
  },
  he: {
    s1Label: "שלב גלובלי חדש",
    s1H1a: "פלטפורמה חכמה ל",
    s1H1b: "מים איכותיים",
    s1Sub: "Acquafy מחברת מוצרים חכמים, מסננים בעלי ביצוע גבוה, App + AI, שותפים גלובליים והכנסות חוזרות כדי לשנות את האופן שבו העולם צורך מים.",
    s1Features: [
      { title: "Acquafy Platform", desc: "תשתית ענן בטוחה וניתנת להרחבה לביצוע מרבי" },
      { title: "App + AI",          desc: "בינה מלאכותית משולבת להחלטות מהירות ויעילות יותר." },
      { title: "ניהול גלובלי", desc: "תמונה עסקית מלאה עם נתונים בזמן אמת מכל מקום." },
    ],
    s1Cta1: "גלו את סדרת Neo", s1Cta2mob: "השוואת מוצרים", s1Cta2desk: "גלו את הפלטפורמה שלנו",
    s2Label: "ACQUAFY WAAS",
    s2H1a: "מים כשירות",
    s2H1b: "מנוי חודשי ב-US$ 40",
    s2SubMobP1: "קבלו מטהר Acquafy עם החלפת מסננים ותמיכה כלולים במודל פשוט, נגיש וחכם לביתכם או לעסק שלכם.",
    s2SubMobP2: "",
    s2SubDeskP1: "קבלו מטהר Acquafy עם החלפת מסננים ותמיכה כלולים במודל פשוט, נגיש וחכם לביתכם או לעסק שלכם.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "מטהר כלול" },
      { label: "החלפת מסננים" },
      { label: "תמיכה מתמחה" },
    ],
    giftEarn: "הירשמו עכשיו", giftIn: "שוחחו עם מומחה",
    stats1: [
      { top: "עד", bottom: "180 מדינות" },
      { top: "16",  bottom: "שפות" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["שותפים Silver,", "Gold ו-Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["ללא השקעה ראשונית גבוהה", ""],
    stats2rules: [
      "תוכנית פשוטה וצפויה",
      "תחזוקה מקלה",
      "אידיאלי לבתים ועסקים",
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
    s2Label: "ACQUAFY WAAS",
    s2H1a: "Água como Serviço",
    s2H1b: "Subscrição mensal por US$ 40",
    s2SubMobP1: "Tenha um purificador Acquafy com reposição de filtros e suporte incluídos num modelo simples, acessível e inteligente para a sua casa ou empresa.",
    s2SubMobP2: "",
    s2SubDeskP1: "Tenha um purificador Acquafy com reposição de filtros e suporte incluídos num modelo simples, acessível e inteligente para a sua casa ou empresa.",
    s2SubDeskP2: "",
    s2Cards: [
      { label: "Purificador incluído" },
      { label: "Reposição de filtros" },
      { label: "Suporte especializado" },
    ],
    giftEarn: "Subscreva agora", giftIn: "Falar com um especialista",
    stats1: [
      { top: "+ de", bottom: "180 países" },
      { top: "16",   bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Parceiros Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Sem alto investimento inicial", ""],
    stats2rules: [
      "Plano simples e previsível",
      "Manutenção facilitada",
      "Ideal para casas e empresas",
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
      <p className="font-avenir-roman text-[18px] leading-[19px] text-[#333] flex-1 min-w-[100px]">
        {earn}{" "}
        <span className="font-avenir-heavy text-[18px] leading-[22px] bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">$100,00</span>
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
      {slide === 0 && <Img src={imgBg1} priority alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />}
      {slide === 1 && <Img src={imgBg2a} alt="" className="hidden win-1024:block win-1280:hidden absolute inset-0 w-full h-full object-cover pointer-events-none" />}
      {slide === 1 && <Img src={imgBg2b} alt="" className="hidden win-1280:block absolute inset-0 w-full h-full object-cover pointer-events-none" />}

      {/* ══ MOBILE LAYOUT (<xl) ══ */}
      <div className="xl:hidden relative flex-1 flex flex-col gap-[20px] items-center w-full">

        {/* === SLIDE 1 - mobile === */}
        {slide === 0 && (
          <>
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgPlanetWeb} size={16} />
              <span className="font-avenir-heavy text-[14px] leading-[17px] text-[#0233c3]">{t.s1Label}</span>
            </div>

            <h1 className="font-avenir-black text-hero text-[#333] w-full text-center">
              {t.s1H1a}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {t.s1H1b}
              </span>
            </h1>

            <p className="font-avenir-roman text-[18px] leading-[26px] text-[#333] text-center w-full">
              {t.s1Sub}
            </p>

            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {S1_FEAT_ICONS.map((f, i) => (
                <div key={i} className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-[180px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                    <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                  </div>
                  <p className="font-avenir-heavy text-[18px] leading-[22px] text-[#07235c] text-center w-full">{t.s1Features[i].title}</p>
                  <p className="font-avenir-roman text-[14px] leading-[16px] text-[#333] text-center w-full">{t.s1Features[i].desc}</p>
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
              aria-label="Proximo slide"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSlide(1)}
            >
              <div className="relative w-full" style={{ aspectRatio: "3160/2300" }}>
                <Img src={imgMockup} alt="Acquafy Platform Mockup" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            </div>

            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <a href="/neo-line" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-avenir-heavy text-[16px] text-white flex-1 text-center">{t.s1Cta1}</span>
                <FigmaIcon src={imgArrowWhite} size={18} aspectW={18} aspectH={18} />
              </a>
              <a href="/compare" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-avenir-heavy text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.s1Cta2mob}</span>
                <div className="relative shrink-0" style={{ width: 18, height: 18 }}>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={18} aspectW={18} aspectH={18} /></div>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={18} aspectW={18} aspectH={18} /></div>
                </div>
              </a>
            </div>
          </>
        )}

        {/* === SLIDE 2 - mobile === */}
        {slide === 1 && (
          <>
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgCalendar} size={16} />
              <span className="font-avenir-heavy text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {t.s2Label}
              </span>
            </div>

            <h1 className="font-avenir-black text-hero text-[#333] w-full text-center">
              {t.s2H1a}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">
                {t.s2H1b}
              </span>
            </h1>

            <div className="font-avenir-roman text-[18px] leading-[26px] text-[#333] text-center w-full">
              <p>{t.s2SubMobP1}</p>
            </div>

            <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
              {S2_CARD_ICONS.map((f, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                  <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <p className="font-avenir-heavy text-[18px] leading-[22px] text-[#333] text-center w-full min-h-[44px]">{t.s2Cards[i].label}</p>
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
              <Img src={imgFrame36} alt="Acquafy Neo UP" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap gap-[10px] items-center justify-center max-w-[720px] w-full">
              <a href="/waas" className="flex flex-[1_0_auto] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer transition-opacity hover:opacity-90 active:opacity-80" style={gdBase}>
                <span className="font-avenir-heavy text-[16px] text-white flex-1 text-center whitespace-nowrap">{t.giftEarn}</span>
                <FigmaIcon src={imgArrowWhite} size={18} aspectW={18} aspectH={18} />
              </a>
              <a href="/contact" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_auto] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <div className="relative shrink-0" style={{ width: 18, height: 18 }}>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgChatBlue} size={18} aspectW={30} aspectH={30} /></div>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgChatWhite} size={18} aspectW={30} aspectH={30} /></div>
                </div>
                <span className="font-avenir-heavy text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center whitespace-nowrap">{t.giftIn}</span>
              </a>
            </div>
          </>
        )}
      </div>

      {/* ══ DESKTOP LAYOUT (xl+) ══ */}
      <div
        className="hidden xl:flex relative flex-1 min-h-0 flex-col gap-[20px] items-center justify-center w-full cursor-pointer"
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
                <span className="font-avenir-heavy text-[14px] leading-[17px] text-[#0233c3]">{t.s1Label}</span>
              </div>
            ) : (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgCalendar} size={16} />
                <span className="font-avenir-heavy text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>{t.s2Label}</span>
              </div>
            )}

            {/* H1 */}
            {slide === 0 ? (
              <h1 className="font-avenir-black text-hero text-[#333] w-full">
                {t.s1H1a}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>{t.s1H1b}</span>
              </h1>
            ) : (
              <h1 className="font-avenir-black text-[46px] leading-[1.15] text-[#333] w-full">
                {t.s2H1a}<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>{t.s2H1b}</span>
              </h1>
            )}

            {/* Subtitle */}
            {slide === 0 ? (
              <p className="font-avenir-roman text-[18px] leading-[26px] text-[#333] w-full">
                {t.s1Sub}
              </p>
            ) : (
              <p className="font-avenir-roman text-[18px] leading-[26px] text-[#333] w-full">{t.s2SubDeskP1}</p>
            )}

            {/* Feature items */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
                {S1_FEAT_ICONS.map((f, i) => (
                  <div key={i} className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[180px]">
                    <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                      <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                    </div>
                    <p className="font-avenir-heavy text-[18px] leading-[22px] text-[#07235c] w-full">{t.s1Features[i].title}</p>
                    <p className="font-avenir-roman text-[14px] leading-[16px] text-[#333] w-full">{t.s1Features[i].desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
                {S2_CARD_ICONS.map((f, i) => (
                  <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                    <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                    <p className="font-avenir-heavy text-[18px] leading-[22px] text-[#333] text-center w-full min-h-[44px]">{t.s2Cards[i].label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-center justify-start w-full">
                <a href="/neo-line" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-avenir-heavy text-[16px] text-white flex-1 text-center">{t.s1Cta1}</span>
                  <FigmaIcon src={imgArrowWhite} size={18} aspectW={18} aspectH={18} />
                </a>
                <a href="/platform" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-avenir-heavy text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.s1Cta2desk}</span>
                  <div className="relative shrink-0" style={{ width: 18, height: 18 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={18} aspectW={18} aspectH={18} /></div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={18} aspectW={18} aspectH={18} /></div>
                  </div>
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap gap-[10px] items-center justify-start w-full">
                <a href="/waas" className="flex flex-[1_0_auto] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer transition-opacity hover:opacity-90 active:opacity-80" style={gdBase}>
                  <span className="font-avenir-heavy text-[16px] text-white flex-1 text-center whitespace-nowrap">{t.giftEarn}</span>
                  <FigmaIcon src={imgArrowWhite} size={18} aspectW={18} aspectH={18} />
                </a>
                <a href="/contact" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_auto] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <div className="relative shrink-0" style={{ width: 18, height: 18 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgChatBlue} size={18} aspectW={30} aspectH={30} /></div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgChatWhite} size={18} aspectW={30} aspectH={30} /></div>
                  </div>
                  <span className="font-avenir-heavy text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center whitespace-nowrap">{t.giftIn}</span>
                </a>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — slide 0 only */}
          {slide === 0 && (
            <div className="flex flex-1 items-end justify-end min-w-px">
              <div className="relative w-full" style={{ aspectRatio: "3160/2300" }}>
                <Img src={imgMockup} sizes="(min-width: 1280px) 50vw, 100vw" alt="Acquafy Platform Mockup" className="absolute inset-0 w-full h-full object-contain" />
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
        <div className="relative shrink-0 bg-[#0233c3] flex flex-wrap items-center justify-center max-w-[1400px] min-h-[85px] overflow-hidden px-[20px] py-[22px] rounded-[16px] w-full">
          {STATS1_ICONS.map((stat, i) => {
            const text = t.stats1[i];
            return (
              <div key={i} className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-w-[160px] px-[10px]">
                <FigmaIcon src={stat.icon} size={30} aspectW={stat.aspectW} aspectH={stat.aspectH} />
                <div className="flex flex-col gap-[2px]">
                  {"lines" in text ? text.lines.map((l, li) => (
                    <span key={li} className="font-avenir-heavy text-[18px] leading-[22px] text-white">{l}</span>
                  )) : (
                    <>
                      <span className="font-avenir-heavy text-[18px] leading-[22px] text-white">{text.top}</span>
                      <span className="font-avenir-roman text-[16px] leading-[20px] text-white">{text.bottom}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative shrink-0 bg-white flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] min-h-[85px] overflow-hidden px-[20px] py-[25px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] w-full">
          <div className="drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)] flex flex-[1_0_0] gap-[10px] items-center min-w-[200px] rounded-[12px]">
            <FigmaIcon src={imgAguaPura} size={24} />
            <p className="font-avenir-heavy text-[16px] leading-[20px] text-[#333] flex-1 min-w-px">{t.stats2tag[0]}</p>
          </div>
          {t.stats2rules.map((text) => (
            <div key={text} className="drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)] flex flex-[1_0_0] gap-[10px] items-center min-w-[200px] rounded-[12px]">
              <FigmaIcon src={imgShield} size={24} aspectW={26.14} aspectH={30} />
              <p className="font-avenir-heavy text-[16px] leading-[20px] text-[#333] flex-1 min-w-px">{text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
