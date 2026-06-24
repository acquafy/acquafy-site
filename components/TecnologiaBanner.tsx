"use client";

import React from "react";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  description: string;
  stat1: React.ReactNode;
  stat2: string;
  stat3: string;
  stat4: string;
  trust1: string;
  trust2: string;
  trust3: string;
}> = {
  pt: {
    badge: "NOVA FASE GLOBAL",
    titleLine1: "Tecnologia & ",
    titleLine2: "Sustentabilidade",
    subtitle: "Inovação que transforma água em qualidade de vida e preserva o planeta para as futuras gerações.",
    description: "A Acquafy combina tecnologia de ponta, inteligência artificial e design sustentável para entregar água pura, segura e acessível reduzindo o impacto ambiental e promovendo um futuro mais saudável.",
    stat1: <><span>Água pura e</span><br /><span>segura</span></>,
    stat2: "Tecnologia inteligente",
    stat3: "Sustentabilidade real",
    stat4: "Impacto global positivo",
    trust1: "Tecnologia confiável e certificada",
    trust2: "Materiais duráveis e recicláveis",
    trust3: "Compromisso global com um futuro sustentável",
  },
  en: {
    badge: "NEW GLOBAL PHASE",
    titleLine1: "Technology & ",
    titleLine2: "Sustainability",
    subtitle: "Innovation that transforms water into quality of life and preserves the planet for future generations.",
    description: "Acquafy combines cutting-edge technology, artificial intelligence and sustainable design to deliver pure, safe and accessible water while reducing environmental impact and promoting a healthier future.",
    stat1: <><span>Pure and</span><br /><span>safe water</span></>,
    stat2: "Smart technology",
    stat3: "Real sustainability",
    stat4: "Positive global impact",
    trust1: "Reliable and certified technology",
    trust2: "Durable and recyclable materials",
    trust3: "Global commitment to a sustainable future",
  },
  "en-gb": {
    badge: "NEW GLOBAL PHASE",
    titleLine1: "Technology & ",
    titleLine2: "Sustainability",
    subtitle: "Innovation that transforms water into quality of life and preserves the planet for future generations.",
    description: "Acquafy combines cutting-edge technology, artificial intelligence and sustainable design to deliver pure, safe and accessible water whilst reducing environmental impact and promoting a healthier future.",
    stat1: <><span>Pure and</span><br /><span>safe water</span></>,
    stat2: "Smart technology",
    stat3: "Real sustainability",
    stat4: "Positive global impact",
    trust1: "Reliable and certified technology",
    trust2: "Durable and recyclable materials",
    trust3: "Global commitment to a sustainable future",
  },
  es: {
    badge: "NUEVA FASE GLOBAL",
    titleLine1: "Tecnología & ",
    titleLine2: "Sostenibilidad",
    subtitle: "Innovación que transforma el agua en calidad de vida y preserva el planeta para las generaciones futuras.",
    description: "Acquafy combina tecnología de vanguardia, inteligencia artificial y diseño sostenible para entregar agua pura, segura y accesible reduciendo el impacto ambiental y promoviendo un futuro más saludable.",
    stat1: <><span>Agua pura y</span><br /><span>segura</span></>,
    stat2: "Tecnología inteligente",
    stat3: "Sostenibilidad real",
    stat4: "Impacto global positivo",
    trust1: "Tecnología confiable y certificada",
    trust2: "Materiales duraderos y reciclables",
    trust3: "Compromiso global con un futuro sostenible",
  },
  fr: {
    badge: "NOUVELLE PHASE MONDIALE",
    titleLine1: "Technologie & ",
    titleLine2: "Durabilité",
    subtitle: "Innovation qui transforme l'eau en qualité de vie et préserve la planète pour les générations futures.",
    description: "Acquafy combine technologie de pointe, intelligence artificielle et design durable pour offrir une eau pure, sûre et accessible, tout en réduisant l'impact environnemental et en promouvant un avenir plus sain.",
    stat1: <><span>Eau pure et</span><br /><span>sûre</span></>,
    stat2: "Technologie intelligente",
    stat3: "Durabilité réelle",
    stat4: "Impact mondial positif",
    trust1: "Technologie fiable et certifiée",
    trust2: "Matériaux durables et recyclables",
    trust3: "Engagement mondial pour un avenir durable",
  },
  de: {
    badge: "NEUE GLOBALE PHASE",
    titleLine1: "Technologie & ",
    titleLine2: "Nachhaltigkeit",
    subtitle: "Innovation, die Wasser in Lebensqualität verwandelt und den Planeten für zukünftige Generationen bewahrt.",
    description: "Acquafy kombiniert Spitzentechnologie, künstliche Intelligenz und nachhaltiges Design, um reines, sicheres und zugängliches Wasser zu liefern, den Umwelteinfluss zu reduzieren und eine gesündere Zukunft zu fördern.",
    stat1: <><span>Reines und</span><br /><span>sicheres Wasser</span></>,
    stat2: "Intelligente Technologie",
    stat3: "Echte Nachhaltigkeit",
    stat4: "Positiver globaler Einfluss",
    trust1: "Zuverlässige und zertifizierte Technologie",
    trust2: "Langlebige und recycelbare Materialien",
    trust3: "Globales Engagement für eine nachhaltige Zukunft",
  },
  it: {
    badge: "NUOVA FASE GLOBALE",
    titleLine1: "Tecnologia & ",
    titleLine2: "Sostenibilità",
    subtitle: "Innovazione che trasforma l'acqua in qualità della vita e preserva il pianeta per le generazioni future.",
    description: "Acquafy combina tecnologia all'avanguardia, intelligenza artificiale e design sostenibile per offrire acqua pura, sicura e accessibile, riducendo l'impatto ambientale e promuovendo un futuro più sano.",
    stat1: <><span>Acqua pura e</span><br /><span>sicura</span></>,
    stat2: "Tecnologia intelligente",
    stat3: "Sostenibilità reale",
    stat4: "Impatto globale positivo",
    trust1: "Tecnologia affidabile e certificata",
    trust2: "Materiali durevoli e riciclabili",
    trust3: "Impegno globale per un futuro sostenibile",
  },
  zh: {
    badge: "全球新阶段",
    titleLine1: "技术与",
    titleLine2: "可持续发展",
    subtitle: "创新将水转化为生活品质，并为子孙后代守护地球。",
    description: "Acquafy融合尖端技术、人工智能与可持续设计，提供纯净、安全且易获取的饮用水，同时减少环境影响，共创更健康的未来。",
    stat1: <><span>纯净</span><br /><span>安全饮水</span></>,
    stat2: "智能技术",
    stat3: "真正的可持续性",
    stat4: "积极的全球影响",
    trust1: "可靠且经过认证的技术",
    trust2: "耐用且可回收的材料",
    trust3: "对可持续未来的全球承诺",
  },
  ja: {
    badge: "新たなグローバルフェーズ",
    titleLine1: "テクノロジーと",
    titleLine2: "サステナビリティ",
    subtitle: "水を生活の質へと変え、未来の世代のために地球を守るイノベーション。",
    description: "Acquafyは最先端技術、人工知能、サステナブルなデザインを組み合わせ、純粋で安全かつ手頃な水を届けながら、環境負荷を低減し、より健やかな未来を実現します。",
    stat1: <><span>純粋で</span><br /><span>安全な水</span></>,
    stat2: "スマートテクノロジー",
    stat3: "真のサステナビリティ",
    stat4: "ポジティブなグローバルインパクト",
    trust1: "信頼性の高い認定済み技術",
    trust2: "耐久性があるリサイクル可能な素材",
    trust3: "持続可能な未来へのグローバルなコミットメント",
  },
  ko: {
    badge: "새로운 글로벌 단계",
    titleLine1: "기술과 ",
    titleLine2: "지속가능성",
    subtitle: "물을 삶의 질로 변화시키고 미래 세대를 위해 지구를 보존하는 혁신.",
    description: "Acquafy는 최첨단 기술, 인공지능, 지속가능한 디자인을 결합하여 순수하고 안전하며 접근 가능한 물을 제공하고, 환경 영향을 줄이며 더 건강한 미래를 만들어 갑니다.",
    stat1: <><span>순수하고</span><br /><span>안전한 물</span></>,
    stat2: "스마트 기술",
    stat3: "진정한 지속가능성",
    stat4: "긍정적인 글로벌 영향",
    trust1: "신뢰할 수 있는 인증된 기술",
    trust2: "내구성 있고 재활용 가능한 소재",
    trust3: "지속가능한 미래를 향한 글로벌 헌신",
  },
  sv: {
    badge: "NY GLOBAL FAS",
    titleLine1: "Teknik & ",
    titleLine2: "Hållbarhet",
    subtitle: "Innovation som omvandlar vatten till livskvalitet och bevarar planeten för framtida generationer.",
    description: "Acquafy kombinerar banbrytande teknik, artificiell intelligens och hållbar design för att leverera rent, säkert och tillgängligt vatten, minska miljöpåverkan och främja en hälsosammare framtid.",
    stat1: <><span>Rent och</span><br /><span>säkert vatten</span></>,
    stat2: "Smart teknik",
    stat3: "Verklig hållbarhet",
    stat4: "Positivt globalt inflytande",
    trust1: "Pålitlig och certifierad teknik",
    trust2: "Hållbara och återvinningsbara material",
    trust3: "Globalt engagemang för en hållbar framtid",
  },
  fi: {
    badge: "UUSI GLOBAALI VAIHE",
    titleLine1: "Teknologia & ",
    titleLine2: "Kestävyys",
    subtitle: "Innovaatio, joka muuttaa veden elämänlaaduksi ja säilyttää planeetan tuleville sukupolville.",
    description: "Acquafy yhdistää huipputeknologian, tekoälyn ja kestävän suunnittelun toimittaakseen puhdasta, turvallista ja saavutettavaa vettä samalla vähentäen ympäristövaikutuksia ja edistäen terveellisempää tulevaisuutta.",
    stat1: <><span>Puhdasta ja</span><br /><span>turvallista vettä</span></>,
    stat2: "Äly-teknologia",
    stat3: "Todellinen kestävyys",
    stat4: "Positiivinen globaali vaikutus",
    trust1: "Luotettava ja sertifioitu teknologia",
    trust2: "Kestävät ja kierrätettävät materiaalit",
    trust3: "Globaali sitoutuminen kestävään tulevaisuuteen",
  },
  ru: {
    badge: "NOVYJ GLOBALNYJ ETAP",
    titleLine1: "Tekhnologii i ",
    titleLine2: "Ustojchivost",
    subtitle: "Innovacii, kotorye prevraschayut vodu v kachestvo zhizni i sohranayut planetu dlya budushchih pokolenij.",
    description: "Acquafy sochetaet peredovye tekhnologii, iskusstvennyj intellekt i ustojchivyj dizajn dlya perechen chistoj, bezopasnoj i dostupnoj vody, snizhat vozdejstvie na okruzhayuschuyu sredu i sodejstvovat bolee zdorovomu budushchemu.",
    stat1: <><span>Chistaya i</span><br /><span>bezopasnaya voda</span></>,
    stat2: "Umnye tekhnologii",
    stat3: "Nastoyashchaya ustojchivost",
    stat4: "Polozhitelnoye globalnoye vliyanie",
    trust1: "Nadyozhnye i sertificirovannye tekhnologii",
    trust2: "Dolgovechnye i pererabatyvayemye materialy",
    trust3: "Globalnoye obyazatelstvo v otnoshenii ustojchivogo budushchego",
  },
  ro: {
    badge: "NOUA FAZA GLOBALA",
    titleLine1: "Tehnologie & ",
    titleLine2: "Sustenabilitate",
    subtitle: "Inovatie care transforma apa in calitate a vietii si pastreaza planeta pentru generatiile viitoare.",
    description: "Acquafy combina tehnologie de varf, inteligenta artificiala si design sustenabil pentru a livra apa pura, sigura si accesibila, reducand impactul asupra mediului si promovand un viitor mai sanatos.",
    stat1: <><span>Apa pura si</span><br /><span>sigura</span></>,
    stat2: "Tehnologie inteligenta",
    stat3: "Sustenabilitate reala",
    stat4: "Impact global pozitiv",
    trust1: "Tehnologie fiabila si certificata",
    trust2: "Materiale durabile si reciclabile",
    trust3: "Angajament global pentru un viitor sustenabil",
  },
  he: {
    badge: "SHAV GLOVAALI HADASH",
    titleLine1: "Technologia & ",
    titleLine2: "Kayamut",
    subtitle: "Hidush hamefanej mayim le'ichut chayim umeshamir et ha'olam la'dorot haba'im.",
    description: "Acquafy meshalemet technologia mitkademet, binah melakutit ve'itzuv kayam kedei lehaspiik mayim tehorim, betuchim venesigim, tokh tzimtzum hashpa'at hasevivah veikuv atid bari yoter.",
    stat1: <><span>Mayim tehorim</span><br /><span>ubetuchim</span></>,
    stat2: "Technologia chachamah",
    stat3: "Kayamut amitit",
    stat4: "Hashpa'ah globalit chiyuvit",
    trust1: "Technologia amina umusinenet",
    trust2: "Chomerim atikim venichanim lemichzur",
    trust3: "Mchuyavut globalit le'atid kayam",
  },
  "pt-pt": {
    badge: "NOVA FASE GLOBAL",
    titleLine1: "Tecnologia & ",
    titleLine2: "Sustentabilidade",
    subtitle: "Inovação que transforma a água em qualidade de vida e preserva o planeta para as gerações futuras.",
    description: "A Acquafy combina tecnologia de ponta, inteligência artificial e design sustentável para fornecer água pura, segura e acessível, reduzindo o impacto ambiental e promovendo um futuro mais saudável.",
    stat1: <><span>Água pura e</span><br /><span>segura</span></>,
    stat2: "Tecnologia inteligente",
    stat3: "Sustentabilidade real",
    stat4: "Impacto global positivo",
    trust1: "Tecnologia fiável e certificada",
    trust2: "Materiais duráveis e recicláveis",
    trust3: "Compromisso global com um futuro sustentável",
  },
};

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/ts-banner-bg.webp";           // lg+ photo bg
const imgBgCard     = "/figma-assets/ts-banner-card-1024.webp";    // < lg card image
const imgGlobe      = "/figma-assets/ts-icon-planet.svg";         // 30×30
const imgAguaPura   = "/figma-assets/ts-icon-agua-pura.svg";      // 643×631
const imgWifi       = "/figma-assets/ts-icon-wifi.svg";           // 30×20
const imgGloboSust  = "/figma-assets/ts-icon-globo-sust.svg";     // 492×475
const imgPlanet     = "/figma-assets/ts-icon-planet.svg";         // 30×30
const imgShield     = "/figma-assets/ts-icon-shield-check.svg";   // 26.14×30
const imgSustent    = "/figma-assets/ts-icon-sustent.svg";        // 30×30
const imgGloboGreen = "/figma-assets/ts-icon-globo-green.svg";    // 492×492

// ── Sub-components ───────────────────────────────────────────────────────────

function HeroStat({ icon, label, aspectW = 30, aspectH = 30 }: {
  icon: string; label: React.ReactNode; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[100px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <div className="[word-break:break-word] flex flex-col font-['Avenir_LT_Pro:85_Heavy'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#1f2e91] text-center">
        <p className="leading-[20px]">{label}</p>
      </div>
    </div>
  );
}

function TrustItem({ icon, label, aspectW = 30, aspectH = 30 }: {
  icon: string; label: string; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="content-center flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center min-w-[280px] lg:justify-start lg:min-w-[160px]">
      <FigmaIcon src={icon} size={30} aspectW={aspectW} aspectH={aspectH} />
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Avenir_LT_Pro:85_Heavy'] justify-center leading-[0] min-w-px not-italic relative text-[18px] text-white">
        <p className="leading-[22px]">{label}</p>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaBanner() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="
      bg-[#f6f9fe] flex flex-col gap-[20px] items-center px-[20px] py-[40px] relative w-full
      lg:bg-transparent lg:h-[calc(100vh-80px)] lg:overflow-hidden
    ">
      {/* Background photo — lg+ only */}
      <img
        alt=""
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* ── Content area ── */}
      <div className="
        relative flex flex-col gap-[40px] items-center justify-center max-w-[1400px] shrink-0 w-full
        lg:content-center lg:flex-[1_0_0] lg:flex-row lg:flex-wrap lg:min-h-px lg:justify-start
      ">

        {/* Left column */}
        <div className="
          flex flex-col gap-[20px] items-center justify-center w-full
          lg:flex-[1_0_0] lg:items-start lg:min-w-[280px] lg:max-w-[650px]
        ">

          {/* Badge */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgGlobe} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="[word-break:break-word] font-['Avenir_LT_Pro:95_Black'] leading-[0] min-w-full not-italic relative shrink-0 text-hero-xl text-[#2a2a2b] text-center lg:text-left">
            <span className="leading-[clamp(36px,12.5vw-92px,68px)]">{t.titleLine1}</span>
            <span className="leading-[clamp(36px,12.5vw-92px,68px)] text-[#0569ff]">{t.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <div className="[word-break:break-word] flex flex-col font-['Avenir_LT_Pro:85_Heavy'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[20px] text-[#0569ff] text-center lg:text-left">
            <p className="leading-[28px]">{t.subtitle}</p>
          </div>

          {/* Description */}
          <div className="[word-break:break-word] flex flex-col font-['Avenir_LT_Pro:55_Roman'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[18px] text-[#333] text-center lg:text-left">
            <p className="leading-[26px]">{t.description}</p>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-[20px] items-start justify-center shrink-0 w-full">
            <HeroStat icon={imgAguaPura}  label={t.stat1} aspectW={643} aspectH={631} />
            <HeroStat icon={imgWifi}      label={t.stat2} aspectW={30}  aspectH={20}  />
            <HeroStat icon={imgGloboSust} label={t.stat3} aspectW={492} aspectH={475} />
            <HeroStat icon={imgPlanet}    label={t.stat4} aspectW={30}  aspectH={30}  />
          </div>
        </div>

        {/* Card image — < lg only */}
        <div className="h-[300px] min-w-[280px] overflow-hidden relative rounded-[16px] shrink-0 w-full lg:hidden">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
            src={imgBgCard}
          />
        </div>

        {/* Right spacer — lg+ only */}
        <div className="hidden lg:block flex-[1_0_0] max-w-[650px] min-w-[280px]" />
      </div>

      {/* ── Trust bar ── */}
      <div className="relative bg-[#1f2e91] flex flex-wrap gap-[30px_40px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] rounded-[16px] shrink-0 w-full">
        <TrustItem
          icon={imgShield}
          label={t.trust1}
          aspectW={26.14} aspectH={30}
        />
        <TrustItem
          icon={imgSustent}
          label={t.trust2}
          aspectW={30} aspectH={30}
        />
        <TrustItem
          icon={imgGloboGreen}
          label={t.trust3}
          aspectW={492} aspectH={492}
        />
      </div>
    </section>
  );
}
