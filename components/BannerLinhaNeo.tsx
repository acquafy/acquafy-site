"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// Background panorama — xl+ apenas (variante TOTAL)
const imgBg       = "/figma-assets/banner-neo-bg.webp";
// Montagem de produtos — inline (default) e coluna direita (lg)
const imgProducts = "/figma-assets/banner-neo-products.webp";

// Feature icons
const imgMobile   = "/figma-assets/icon-mobile-21px-b.svg"; // 21×30
const imgBrain    = "/figma-assets/icon-brain-30px-a.svg"; // 30×30
const imgWifi     = "/figma-assets/icon-wifi-30px-b.svg"; // 30×20
const imgWater    = "/figma-assets/icon-water-large-a.svg"; // 576×662
const imgShield   = "/figma-assets/icon-shield-26px-a.svg"; // 26×30
const imgPlanet   = "/figma-assets/icon-planet-30px-a.svg"; // 30×30

// Stats bar icons
const imgAI       = "/figma-assets/icon-ai-30px-c.svg"; // 30×30 em slot 40px
const imgWaterBub = "/figma-assets/icon-water-bub-40px.svg"; // 40×40
const imgPlanet1  = "/figma-assets/icon-planet-30px-slot40.svg"; // 30×30 em slot 40px
const imgSustain  = "/figma-assets/icon-sustain-40px.svg"; // 40×40

const T: Record<Lang, {
  desc: string;
  features: { title: string; desc: string }[];
  stats: { title: string; desc: string }[];
}> = {
  pt: {
    desc: "Purificadores inteligentes para cada estilo de vida, com tecnologia global, App + AI + IoT e opções Essentials & Premium.",
    features: [
      { title: "App Acquafy",        desc: "Controle total pelo app de onde quiser." },
      { title: "Acquafy AI",         desc: "Inteligência que aprende seus hábitos." },
      { title: "IoT Inteligente",    desc: "Conectividade e dados em tempo real." },
      { title: "Água Personalizada", desc: "Temperaturas e funções para cada momento." },
      { title: "Alta Performance",   desc: "Tecnologia global e filtros de última geração." },
      { title: "Design Global",      desc: "Acabamento sofisticado e premiado." },
    ],
    stats: [
      { title: "Tecnologia + IA",     desc: "Inteligência artificial aplicada à experiência da água" },
      { title: "Purificação premium",  desc: "Água pura, segura e de qualidade superior" },
      { title: "Conectividade global", desc: "Soluções inteligentes com IoT e gestão em tempo real" },
      { title: "Sustentabilidade",     desc: "Impacto positivo para pessoas, comunidades e o planeta" },
    ],
  },
  "pt-pt": {
    desc: "Purificadores inteligentes para cada estilo de vida, com tecnologia global, App + AI + IoT e opções Essentials & Premium.",
    features: [
      { title: "App Acquafy",        desc: "Controlo total pela aplicação a partir de qualquer lugar." },
      { title: "Acquafy AI",         desc: "Inteligência que aprende os seus hábitos." },
      { title: "IoT Inteligente",    desc: "Conectividade e dados em tempo real." },
      { title: "Água Personalizada", desc: "Temperaturas e funções para cada momento." },
      { title: "Alto Desempenho",    desc: "Tecnologia global e filtros de última geração." },
      { title: "Design Global",      desc: "Acabamento sofisticado e premiado." },
    ],
    stats: [
      { title: "Tecnologia + IA",     desc: "Inteligência artificial aplicada à experiência da água" },
      { title: "Purificação premium",  desc: "Água pura, segura e de qualidade superior" },
      { title: "Conectividade global", desc: "Soluções inteligentes com IoT e gestão em tempo real" },
      { title: "Sustentabilidade",     desc: "Impacto positivo para pessoas, comunidades e o planeta" },
    ],
  },
  en: {
    desc: "Smart purifiers for every lifestyle, with global technology, App + AI + IoT and Essentials & Premium options.",
    features: [
      { title: "App Acquafy",       desc: "Full control from anywhere via the app." },
      { title: "Acquafy AI",        desc: "Intelligence that learns your habits." },
      { title: "Smart IoT",         desc: "Connectivity and real-time data." },
      { title: "Personalised Water",desc: "Temperatures and functions for every moment." },
      { title: "High Performance",  desc: "Global technology and latest-generation filters." },
      { title: "Global Design",     desc: "Sophisticated, award-winning finish." },
    ],
    stats: [
      { title: "Technology + AI",    desc: "Artificial intelligence applied to the water experience" },
      { title: "Premium purification",desc: "Pure, safe, superior-quality water" },
      { title: "Global connectivity", desc: "Smart solutions with IoT and real-time management" },
      { title: "Sustainability",      desc: "Positive impact for people, communities and the planet" },
    ],
  },
  es: {
    desc: "Purificadores inteligentes para cada estilo de vida, con tecnología global, App + AI + IoT y opciones Essentials & Premium.",
    features: [
      { title: "App Acquafy",       desc: "Control total desde la app donde quieras." },
      { title: "Acquafy AI",        desc: "Inteligencia que aprende tus hábitos." },
      { title: "IoT Inteligente",   desc: "Conectividad y datos en tiempo real." },
      { title: "Agua Personalizada",desc: "Temperaturas y funciones para cada momento." },
      { title: "Alto Rendimiento",  desc: "Tecnología global y filtros de última generación." },
      { title: "Diseño Global",     desc: "Acabado sofisticado y premiado." },
    ],
    stats: [
      { title: "Tecnología + IA",    desc: "Inteligencia artificial aplicada a la experiencia del agua" },
      { title: "Purificación premium",desc: "Agua pura, segura y de calidad superior" },
      { title: "Conectividad global", desc: "Soluciones inteligentes con IoT y gestión en tiempo real" },
      { title: "Sostenibilidad",      desc: "Impacto positivo para personas, comunidades y el planeta" },
    ],
  },
  fr: {
    desc: "Purificateurs intelligents pour chaque style de vie, avec une technologie mondiale, App + AI + IoT et des options Essentials & Premium.",
    features: [
      { title: "App Acquafy",         desc: "Contrôle total depuis l'application, où que vous soyez." },
      { title: "Acquafy AI",          desc: "Une intelligence qui apprend vos habitudes." },
      { title: "IoT Intelligent",     desc: "Connectivité et données en temps réel." },
      { title: "Eau Personnalisée",   desc: "Températures et fonctions pour chaque instant." },
      { title: "Haute Performance",   desc: "Technologie mondiale et filtres de dernière génération." },
      { title: "Design Global",       desc: "Finition sophistiquée et primée." },
    ],
    stats: [
      { title: "Technologie + IA",      desc: "Intelligence artificielle appliquée à l'expérience de l'eau" },
      { title: "Purification premium",  desc: "Eau pure, sûre et de qualité supérieure" },
      { title: "Connectivité mondiale", desc: "Solutions intelligentes avec IoT et gestion en temps réel" },
      { title: "Durabilité",            desc: "Impact positif pour les personnes, les communautés et la planète" },
    ],
  },
  de: {
    desc: "Intelligente Purifier für jeden Lebensstil, mit globaler Technologie, App + AI + IoT und Essentials & Premium Optionen.",
    features: [
      { title: "App Acquafy",          desc: "Vollständige Kontrolle von überall über die App." },
      { title: "Acquafy AI",           desc: "Intelligenz, die Ihre Gewohnheiten erlernt." },
      { title: "Smartes IoT",          desc: "Konnektivität und Echtzeit-Daten." },
      { title: "Personalisiertes Wasser",desc: "Temperaturen und Funktionen für jeden Moment." },
      { title: "Hochleistung",         desc: "Globale Technologie und Filter der neuesten Generation." },
      { title: "Globales Design",      desc: "Anspruchsvolles, preisgekröntes Finish." },
    ],
    stats: [
      { title: "Technologie + KI",      desc: "Künstliche Intelligenz angewandt auf das Wassererlebnis" },
      { title: "Premium-Reinigung",     desc: "Reines, sicheres Wasser in überlegener Qualität" },
      { title: "Globale Konnektivität", desc: "Intelligente Lösungen mit IoT und Echtzeit-Management" },
      { title: "Nachhaltigkeit",        desc: "Positiver Einfluss auf Menschen, Gemeinschaften und den Planeten" },
    ],
  },
  it: {
    desc: "Purificatori intelligenti per ogni stile di vita, con tecnologia globale, App + AI + IoT e opzioni Essentials & Premium.",
    features: [
      { title: "App Acquafy",          desc: "Controllo totale da qualsiasi luogo tramite l'app." },
      { title: "Acquafy AI",           desc: "Un'intelligenza che impara le tue abitudini." },
      { title: "IoT Intelligente",     desc: "Connettività e dati in tempo reale." },
      { title: "Acqua Personalizzata", desc: "Temperature e funzioni per ogni momento." },
      { title: "Alta Prestazione",     desc: "Tecnologia globale e filtri di ultima generazione." },
      { title: "Design Globale",       desc: "Finitura sofisticata e pluripremiata." },
    ],
    stats: [
      { title: "Tecnologia + IA",       desc: "Intelligenza artificiale applicata all'esperienza dell'acqua" },
      { title: "Purificazione premium", desc: "Acqua pura, sicura e di qualità superiore" },
      { title: "Connettività globale",  desc: "Soluzioni intelligenti con IoT e gestione in tempo reale" },
      { title: "Sostenibilità",         desc: "Impatto positivo per le persone, le comunità e il pianeta" },
    ],
  },
  zh: {
    desc: "智能净水器，适合每种生活方式，搭载全球技术、App + AI + IoT，提供 Essentials & Premium 两款选择。",
    features: [
      { title: "Acquafy App",    desc: "随时随地通过应用程序全面掌控。" },
      { title: "Acquafy AI",     desc: "学习您生活习惯的智能系统。" },
      { title: "智能 IoT",       desc: "实时连接与数据传输。" },
      { title: "个性化水质",     desc: "为每个时刻定制温度与功能。" },
      { title: "高性能",         desc: "全球技术与最新一代过滤器。" },
      { title: "全球设计",       desc: "精致优雅的获奖外观设计。" },
    ],
    stats: [
      { title: "技术 + 人工智能", desc: "人工智能赋能水体验" },
      { title: "高端净化",        desc: "纯净、安全、卓越品质的水" },
      { title: "全球连接",        desc: "配备 IoT 与实时管理的智能解决方案" },
      { title: "可持续发展",      desc: "对人类、社区和地球产生积极影响" },
    ],
  },
  ja: {
    desc: "あらゆるライフスタイルに対応したスマートピュリファイアー。グローバルテクノロジー、App + AI + IoT、Essentials & Premium オプションを搭載。",
    features: [
      { title: "App Acquafy",       desc: "アプリからどこでも完全制御。" },
      { title: "Acquafy AI",        desc: "あなたの習慣を学ぶ知性。" },
      { title: "スマート IoT",      desc: "リアルタイムの接続性とデータ。" },
      { title: "パーソナライズされた水",desc: "あらゆる瞬間に合わせた温度と機能。" },
      { title: "高パフォーマンス",  desc: "グローバルテクノロジーと最新世代フィルター。" },
      { title: "グローバルデザイン",desc: "洗練された受賞歴のある仕上がり。" },
    ],
    stats: [
      { title: "テクノロジー + AI",   desc: "水体験に活かされた人工知能" },
      { title: "プレミアム浄水",      desc: "純粋で安全、高品質な水" },
      { title: "グローバル接続性",    desc: "IoT とリアルタイム管理によるスマートソリューション" },
      { title: "サステナビリティ",    desc: "人々、コミュニティ、地球への好影響" },
    ],
  },
  ko: {
    desc: "모든 라이프스타일을 위한 스마트 정수기. 글로벌 기술, App + AI + IoT, Essentials & Premium 옵션 탑재.",
    features: [
      { title: "App Acquafy",     desc: "앱을 통해 어디서든 완전 제어." },
      { title: "Acquafy AI",      desc: "당신의 습관을 학습하는 인공지능." },
      { title: "스마트 IoT",      desc: "실시간 연결성과 데이터." },
      { title: "맞춤형 물",       desc: "모든 순간에 맞는 온도와 기능." },
      { title: "고성능",          desc: "글로벌 기술과 최신 세대 필터." },
      { title: "글로벌 디자인",   desc: "정교하고 수상 경력이 있는 마감." },
    ],
    stats: [
      { title: "기술 + AI",       desc: "물 경험에 적용된 인공지능" },
      { title: "프리미엄 정수",   desc: "순수하고 안전하며 뛰어난 품질의 물" },
      { title: "글로벌 연결성",   desc: "IoT와 실시간 관리를 갖춘 스마트 솔루션" },
      { title: "지속 가능성",     desc: "사람, 커뮤니티, 지구에 긍정적인 영향" },
    ],
  },
};

export default function BannerLinhaNeo() {
  const { lang } = useLang();
  const t = T[lang];
  const features = [
    { icon: imgMobile, aW: 21,  aH: 30,  title: t.features[0].title, desc: t.features[0].desc },
    { icon: imgBrain,  aW: 30,  aH: 30,  title: t.features[1].title, desc: t.features[1].desc },
    { icon: imgWifi,   aW: 30,  aH: 20,  title: t.features[2].title, desc: t.features[2].desc },
    { icon: imgWater,  aW: 576, aH: 662, title: t.features[3].title, desc: t.features[3].desc },
    { icon: imgShield, aW: 26,  aH: 30,  title: t.features[4].title, desc: t.features[4].desc },
    { icon: imgPlanet, aW: 30,  aH: 30,  title: t.features[5].title, desc: t.features[5].desc },
  ];
  const stats = [
    { icon: imgAI,       title: t.stats[0].title, desc: t.stats[0].desc },
    { icon: imgWaterBub, title: t.stats[1].title, desc: t.stats[1].desc },
    { icon: imgPlanet1,  title: t.stats[2].title, desc: t.stats[2].desc },
    { icon: imgSustain,  title: t.stats[3].title, desc: t.stats[3].desc },
  ];
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden bg-[#f1f5fe] win-1280:bg-transparent win-1280:h-[calc(100vh-80px)]">

      {/* Imagem de fundo — win-1280+ apenas (variante TOTAL) */}
      <img
        alt=""
        className="hidden win-1280:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Linha principal de conteúdo */}
      <div className="relative flex flex-col gap-[20px] items-center max-w-[1400px] w-full win-1024:flex-row win-1024:flex-wrap win-1024:gap-[40px] win-1024:items-center win-1280:flex-[1_0_0] win-1280:min-h-px">

        {/* Coluna esquerda: título + descrição + img inline (mobile) + features */}
        <div className="flex flex-col gap-[20px] items-center w-full win-1024:flex-[1_0_0] win-1024:gap-[40px] win-1024:items-start win-1024:justify-center win-1024:max-w-[500px] win-1024:min-w-[280px]">

          <h1
            className="font-['Avenir_LT_Pro:95_Black'] text-hero bg-clip-text text-transparent text-center w-full win-1024:text-left"
            style={{ backgroundImage: "linear-gradient(129deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Linha Neo
          </h1>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full win-1024:text-left">
            {t.desc}
          </p>

          {/* Imagem de produto inline — visível apenas abaixo de win-1024 (variante 1024) */}
          <div className="win-1024:hidden aspect-[960/450] relative rounded-[16px] overflow-hidden shrink-0 w-full">
            <img
              alt="Linha Neo — produtos"
              className="absolute inset-0 w-full h-full object-cover"
              src={imgProducts}
            />
          </div>

          {/* Lista de features */}
          <div className="flex flex-wrap gap-[20px] items-start justify-center rounded-[12px] w-full">
            {features.map((f) => (
              <div key={f.title} className="flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[180px] win-1024:justify-start">
                <FigmaIcon src={f.icon} size={30} aspectW={f.aW} aspectH={f.aH} />
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {f.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] w-full">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita: imagem de produto — win-1024 apenas (variante 1280, oculta em win-1280+) */}
        <div className="hidden win-1024:flex win-1280:hidden flex-[1_0_0] items-stretch min-h-[480px] min-w-[280px] relative rounded-[16px] overflow-hidden">
          <img
            alt="Linha Neo — produtos"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgProducts}
          />
        </div>

        {/* Coluna direita: espaço vazio — win-1280+ (produtos estão na imagem de fundo) */}
        <div className="hidden win-1280:block flex-[1_0_0] min-h-[376px] min-w-[280px]" />
      </div>

      {/* Barra de stats */}
      <div
        className="relative flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] shrink-0 w-full"
        style={{ backgroundImage: "linear-gradient(92deg, #f3faff 0%, #ceefff 100%)" }}
      >
        {stats.map((s) => (
          <div key={s.title} className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[160px] win-1280:flex-row win-1280:flex-wrap">
            <FigmaIcon src={s.icon} size={40} />
            <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-[200px] text-center win-1280:text-left">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                {s.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
