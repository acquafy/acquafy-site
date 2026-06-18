"use client";

import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnVerdeOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg          = "/figma-assets/ts-sustent-bg.webp";         // section bg
const imgCtaBg       = "/figma-assets/ts-cta-bg.webp";             // CTA overlay
const imgCtaIcon     = "/figma-assets/ts-icon-experiencia.svg";   // CTA icon 438×492
const imgPlastico    = "/figma-assets/ts-icon-plastico.svg";       // plastic bottle  405×643
const imgEnergia     = "/figma-assets/ts-icon-energia.svg";        // energia         ~492×492
const imgReciclavel  = "/figma-assets/ts-icon-reciclavel.svg";     // reciclável       30×30
const imgPreservAgua = "/figma-assets/ts-icon-preserv-agua.svg";   // água pura       643×631
const imgStatsPessoas   = "/figma-assets/ts-icon-stats-pessoas.svg";    // 43.86×40.50
const imgStatsAgua      = "/figma-assets/ts-icon-stats-agua.svg";       // 40×40
const imgStatsPlanta    = "/figma-assets/ts-icon-stats-planta.svg";     // 335.36×361.50
const imgStatsPlanetWeb = "/figma-assets/ts-icon-stats-planet-web.svg"; // 30×30

const T: Record<Lang, {
  infoTitle: string;
  infoParagraph: string;
  infoCta: string;
  sustCards: { icon: string; aspectW: number; aspectH: number; title: string; description: string }[];
  stats: { value: string; label: string; icon: string; aspectW: number; aspectH: number }[];
  ctaTitle: string;
  ctaBtn: string;
}> = {
  pt: {
    infoTitle: "Sustentabilidade em cada gota",
    infoParagraph: "Acreditamos que a tecnologia deve caminhar junto com a responsabilidade ambiental. Por isso, nossas soluções são projetadas para reduzir o consumo de recursos, eliminar plásticos descartáveis e gerar impacto positivo real.",
    infoCta: "Conheça nossas iniciativas sustentáveis",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Menos plástico descartável", description: "Reduzimos milhões de garrafas plásticas ao oferecer água pura acessível em locais estratégicos." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Consumo consciente de energia", description: "Equipamentos eficientes e inteligentes que otimizam o consumo de energia." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Materiais recicláveis e duráveis", description: "Componentes de alta qualidade recicláveis e projetados para longa vida útil." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Preservação da água", description: "Tecnologias que economizam água em cada etapa do processo de purificação." },
    ],
    stats: [
      { value: "+50M",        label: "pessoas impactadas positivamente",       icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2.000",      label: "toneladas de plástico evitadas por ano", icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",        label: "litros de água economizados por ano",    icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 países", label: "impactados e em expansão",               icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Inovação que cuida de pessoas e do planeta ao mesmo tempo.",
    ctaBtn: "Faça parte dessa transformação",
  },
  en: {
    infoTitle: "Sustainability in every drop",
    infoParagraph: "We believe technology must go hand in hand with environmental responsibility. That is why our solutions are designed to reduce resource consumption, eliminate disposable plastics and generate real positive impact.",
    infoCta: "Discover our sustainable initiatives",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Less disposable plastic", description: "We reduce millions of plastic bottles by offering accessible pure water in strategic locations." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Conscious energy consumption", description: "Efficient and intelligent equipment that optimizes energy consumption." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Recyclable and durable materials", description: "High-quality recyclable components designed for a long service life." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Water preservation", description: "Technologies that save water at every stage of the purification process." },
    ],
    stats: [
      { value: "+50M",          label: "people positively impacted",             icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2,000",        label: "tons of plastic avoided per year",        icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",          label: "liters of water saved per year",          icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 countries", label: "impacted and expanding",                 icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Innovation that takes care of people and the planet at the same time.",
    ctaBtn: "Be part of this transformation",
  },
  es: {
    infoTitle: "Sostenibilidad en cada gota",
    infoParagraph: "Creemos que la tecnología debe ir de la mano con la responsabilidad ambiental. Por eso, nuestras soluciones están diseñadas para reducir el consumo de recursos, eliminar plásticos desechables y generar un impacto positivo real.",
    infoCta: "Conoce nuestras iniciativas sostenibles",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Menos plástico desechable", description: "Reducimos millones de botellas plásticas al ofrecer agua pura accesible en lugares estratégicos." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Consumo consciente de energía", description: "Equipos eficientes e inteligentes que optimizan el consumo de energía." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Materiales reciclables y duraderos", description: "Componentes de alta calidad reciclables y diseñados para larga vida útil." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Preservación del agua", description: "Tecnologías que ahorran agua en cada etapa del proceso de purificación." },
    ],
    stats: [
      { value: "+50M",          label: "personas impactadas positivamente",       icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2.000",        label: "toneladas de plástico evitadas por año",  icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",          label: "litros de agua ahorrados por año",        icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 países",   label: "impactados y en expansión",               icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Innovación que cuida a las personas y al planeta al mismo tiempo.",
    ctaBtn: "Sé parte de esta transformación",
  },
  fr: {
    infoTitle: "La durabilité dans chaque goutte",
    infoParagraph: "Nous croyons que la technologie doit aller de pair avec la responsabilité environnementale. C'est pourquoi nos solutions sont conçues pour réduire la consommation de ressources, éliminer les plastiques jetables et générer un impact positif réel.",
    infoCta: "Découvrez nos initiatives durables",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Moins de plastique jetable", description: "Nous réduisons des millions de bouteilles en plastique en offrant une eau pure accessible dans des lieux stratégiques." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Consommation énergétique consciente", description: "Équipements efficaces et intelligents qui optimisent la consommation d'énergie." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Matériaux recyclables et durables", description: "Composants de haute qualité recyclables et conçus pour une longue durée de vie." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Préservation de l'eau", description: "Technologies qui économisent l'eau à chaque étape du processus de purification." },
    ],
    stats: [
      { value: "+50M",           label: "personnes positivement impactées",         icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2 000",         label: "tonnes de plastique évitées par an",        icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",           label: "litres d'eau économisés par an",            icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 pays",      label: "impactés et en expansion",                  icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Innovation qui prend soin des personnes et de la planète en même temps.",
    ctaBtn: "Faites partie de cette transformation",
  },
  de: {
    infoTitle: "Nachhaltigkeit in jedem Tropfen",
    infoParagraph: "Wir glauben, dass Technologie Hand in Hand mit Umweltverantwortung gehen muss. Deshalb sind unsere Lösungen darauf ausgelegt, den Ressourcenverbrauch zu reduzieren, Einwegplastik zu eliminieren und echte positive Auswirkungen zu erzielen.",
    infoCta: "Entdecken Sie unsere nachhaltigen Initiativen",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Weniger Einwegplastik", description: "Wir reduzieren Millionen von Plastikflaschen, indem wir zugängliches reines Wasser an strategischen Standorten anbieten." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Bewusster Energieverbrauch", description: "Effiziente und intelligente Geräte, die den Energieverbrauch optimieren." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Recycelbare und langlebige Materialien", description: "Hochwertige recycelbare Komponenten, die für eine lange Lebensdauer ausgelegt sind." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Wassererhaltung", description: "Technologien, die bei jedem Schritt des Reinigungsprozesses Wasser sparen." },
    ],
    stats: [
      { value: "+50M",            label: "positiv beeinflusste Menschen",            icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2.000",          label: "Tonnen vermiedener Plastik pro Jahr",       icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",            label: "Liter Wasser gespart pro Jahr",             icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 Länder",     label: "beeinflusst und im Wachstum",               icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Innovation, die gleichzeitig für Menschen und den Planeten sorgt.",
    ctaBtn: "Werden Sie Teil dieser Transformation",
  },
  it: {
    infoTitle: "Sostenibilità in ogni goccia",
    infoParagraph: "Crediamo che la tecnologia debba andare di pari passo con la responsabilità ambientale. Per questo, le nostre soluzioni sono progettate per ridurre il consumo di risorse, eliminare la plastica usa e getta e generare un impatto positivo reale.",
    infoCta: "Scopri le nostre iniziative sostenibili",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Meno plastica usa e getta", description: "Riduciamo milioni di bottiglie di plastica offrendo acqua pura accessibile in luoghi strategici." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Consumo energetico consapevole", description: "Apparecchiature efficienti e intelligenti che ottimizzano il consumo di energia." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Materiali riciclabili e durevoli", description: "Componenti di alta qualità riciclabili e progettati per una lunga durata." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Preservazione dell'acqua", description: "Tecnologie che risparmiano acqua ad ogni fase del processo di purificazione." },
    ],
    stats: [
      { value: "+50M",          label: "persone positivamente impattate",           icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2.000",        label: "tonnellate di plastica evitate per anno",    icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",          label: "litri di acqua risparmiati per anno",        icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 paesi",    label: "impattati e in espansione",                  icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Innovazione che si prende cura delle persone e del pianeta allo stesso tempo.",
    ctaBtn: "Fai parte di questa trasformazione",
  },
  zh: {
    infoTitle: "每一滴中的可持续性",
    infoParagraph: "我们相信技术必须与环境责任携手并进。因此，我们的解决方案旨在减少资源消耗、消除一次性塑料并产生真正的积极影响。",
    infoCta: "了解我们的可持续举措",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "减少一次性塑料", description: "通过在战略地点提供纯净饮用水，减少数百万个塑料瓶的使用。" },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "节能意识", description: "高效智能的设备优化能源消耗。" },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "可回收耐用材料", description: "高质量可回收组件，专为长使用寿命而设计。" },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "水资源保护", description: "在净化过程的每个阶段节约用水的技术。" },
    ],
    stats: [
      { value: "+5000万",        label: "受到积极影响的人",                          icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2,000",         label: "吨/年减少的塑料",                            icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+1500万",        label: "升/年节省的水",                              icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180个国家",     label: "覆盖并持续扩展",                             icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "同时关爱人类与地球的创新。",
    ctaBtn: "成为这场变革的一部分",
  },
  ja: {
    infoTitle: "一滴ごとのサステナビリティ",
    infoParagraph: "私たちは、テクノロジーは環境責任と共に歩まなければならないと信じています。そのため、私たちのソリューションはリソース消費の削減、使い捨てプラスチックの排除、そして真のポジティブな影響の創出を目的として設計されています。",
    infoCta: "サステナブルな取り組みを見る",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "使い捨てプラスチックの削減", description: "戦略的な場所で手頃な純水を提供することで、数百万本のペットボトルを削減しています。" },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "意識的なエネルギー消費", description: "エネルギー消費を最適化する効率的でインテリジェントな機器。" },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "リサイクル可能で耐久性のある素材", description: "長い耐用年数のために設計された高品質なリサイクル可能なコンポーネント。" },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "水の保全", description: "浄化プロセスの各段階で水を節約する技術。" },
    ],
    stats: [
      { value: "+5000万人",       label: "にポジティブな影響を与えた",               icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2,000",          label: "トン/年のプラスチック削減",                 icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+1500万",         label: "リットル/年の節水",                         icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180カ国",        label: "に影響を与え拡大中",                        icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "人と地球を同時に大切にするイノベーション。",
    ctaBtn: "この変革の一員になりましょう",
  },
  ko: {
    infoTitle: "모든 물방울 속의 지속가능성",
    infoParagraph: "우리는 기술이 환경 책임과 함께해야 한다고 믿습니다. 그래서 우리의 솔루션은 자원 소비 감소, 일회용 플라스틱 제거, 그리고 실질적인 긍정적 영향 창출을 위해 설계되었습니다.",
    infoCta: "지속가능한 이니셔티브 알아보기",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "일회용 플라스틱 감소", description: "전략적 위치에서 접근 가능한 순수한 물을 제공하여 수백만 개의 플라스틱 병을 줄입니다." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "의식적인 에너지 소비", description: "에너지 소비를 최적화하는 효율적이고 지능적인 장비." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "재활용 가능하고 내구성 있는 소재", description: "긴 서비스 수명을 위해 설계된 고품질 재활용 가능한 부품." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "수자원 보존", description: "정수 과정의 모든 단계에서 물을 절약하는 기술." },
    ],
    stats: [
      { value: "+5000만명",       label: "에게 긍정적인 영향",                        icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2,000",          label: "톤/년 플라스틱 절감",                        icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+1500만",         label: "리터/년 절수",                               icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180개국",        label: "에 영향 및 확장 중",                         icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "사람과 지구를 동시에 돌보는 혁신.",
    ctaBtn: "이 변화의 일원이 되세요",
  },
  "pt-pt": {
    infoTitle: "Sustentabilidade em cada gota",
    infoParagraph: "Acreditamos que a tecnologia deve caminhar a par da responsabilidade ambiental. Por isso, as nossas soluções são concebidas para reduzir o consumo de recursos, eliminar plásticos descartáveis e gerar um impacto positivo real.",
    infoCta: "Conheça as nossas iniciativas sustentáveis",
    sustCards: [
      { icon: imgPlastico, aspectW: 405, aspectH: 643, title: "Menos plástico descartável", description: "Reduzimos milhões de garrafas de plástico ao disponibilizar água pura acessível em locais estratégicos." },
      { icon: imgEnergia, aspectW: 492, aspectH: 492, title: "Consumo consciente de energia", description: "Equipamentos eficientes e inteligentes que optimizam o consumo de energia." },
      { icon: imgReciclavel, aspectW: 30, aspectH: 30, title: "Materiais recicláveis e duráveis", description: "Componentes de alta qualidade recicláveis e concebidos para longa vida útil." },
      { icon: imgPreservAgua, aspectW: 643, aspectH: 631, title: "Preservação da água", description: "Tecnologias que poupam água em cada etapa do processo de purificação." },
    ],
    stats: [
      { value: "+50M",        label: "pessoas impactadas positivamente",       icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
      { value: "+2.000",      label: "toneladas de plástico evitadas por ano", icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
      { value: "+15M",        label: "litros de água poupados por ano",        icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
      { value: "+180 países", label: "impactados e em expansão",               icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
    ],
    ctaTitle: "Inovação que cuida das pessoas e do planeta ao mesmo tempo.",
    ctaBtn: "Faça parte desta transformação",
  },
};

// ── Sub-component ─────────────────────────────────────────────────────────────

function SustCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[160px] px-[10px] py-[20px] rounded-[16px] win-1024:min-h-[235px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#0b8650] text-center w-full">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
        {description}
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaSustentSection() {
  const { lang } = useLang();
  const t = T[lang];
  const sustCards = t.sustCards;
  const stats = t.stats;

  return (
    <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      <div className="relative flex flex-col gap-[20px] items-center max-w-[1400px] w-full">
        {/* Top row: info card + sust cards */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          {/* Info card */}
          <div className="bg-white flex flex-col gap-[20px] items-start min-h-[235px] min-w-[280px] overflow-hidden p-[20px] rounded-[16px] w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0b8650] text-center lg:text-left">
              {t.infoTitle}
            </h2>
            <div className="bg-[#36ae5c] h-[2px] w-[80px] shrink-0" />
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333] flex-1">
              {t.infoParagraph}
            </p>
            <Link href="/tecnologia" className="max-w-[320px] w-full self-center lg:self-start">
              <BtnVerdeOutArrow className="w-full">
                {t.infoCta}
              </BtnVerdeOutArrow>
            </Link>
          </div>

          {/* Sustainability cards */}
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] justify-center min-w-[280px]">
            {sustCards.map((c) => (
              <SustCard key={c.title} {...c} />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white content-start flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] w-full overflow-hidden px-[20px] py-[40px] relative rounded-[16px]">
          {stats.map((s) => (
            <div key={s.value} className="content-start flex flex-[1_0_0] flex-wrap gap-[20px] items-start min-w-[160px] relative">
              <FigmaIcon src={s.icon} size={40} aspectW={s.aspectW} aspectH={s.aspectH} />
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start leading-[0] min-w-px not-italic relative">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-['Avenir_LT_Pro:95_Black'] justify-center relative shrink-0 text-[32px] text-[#0b8650] w-full">
                  <p className="leading-[39px]">{s.value}</p>
                </div>
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-['Avenir_LT_Pro:55_Roman'] justify-center relative shrink-0 text-[16px] text-[#2a2a2b] w-full">
                  <p className="leading-[20px]">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner — dentro da mesma seção, sobre o fundo nature ── */}
        <div className="content-center flex flex-col gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[40px] relative rounded-[16px] shrink-0 w-full lg:flex-row lg:flex-wrap">
          {/* Fundo: verde-escuro + foto com opacidade */}
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px]">
            <div className="absolute bg-[#0b8650] inset-0 rounded-[16px]" />
            <img
              alt=""
              className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full"
              src={imgCtaBg}
            />
          </div>

          {/* Ícone */}
          <FigmaIcon src={imgCtaIcon} size={60} aspectW={438} aspectH={492} />

          {/* Título */}
          <div className="relative flex flex-col items-center justify-center w-full lg:flex-[1_0_0] lg:min-w-[240px]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
              {t.ctaTitle}
            </p>
          </div>

          {/* Botão */}
          <div className="relative flex items-center justify-center w-full lg:flex-[1_0_0] lg:max-w-[300px] lg:min-w-[200px]">
            <BtnVerdeOutArrow className="w-full min-h-[56px]">
              {t.ctaBtn}
            </BtnVerdeOutArrow>
          </div>
        </div>
      </div>
    </section>
  );
}
