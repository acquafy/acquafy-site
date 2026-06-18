"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg        = "/figma-assets/bg-section.webp"; // section bg
const imgGlobe     = "/figma-assets/icon-globe-nova-fase.svg"; // presença global
const imgPartner   = "/figma-assets/icon-partner-rede.svg"; // rede parceiros
const imgWater     = "/figma-assets/icon-water-pessoas.svg"; // pessoas impactadas
const imgGloboSust = "/figma-assets/icon-globo-sustentabilidade.svg"; // sustentabilidade
const imgChat      = "/figma-assets/icon-chat-midia.svg"; // mídia inteligente

const T: Record<Lang, {
  tagline: string;
  heading: string;
  headingHighlight: string;
  headingEnd: string;
  stats: { icon: string; label: string; count: string; description: string }[];
}> = {
  pt: {
    tagline: "Nosso impacto",
    heading: "Transformamos tecnologia em",
    headingHighlight: "impacto positivo",
    headingEnd: "para pessoas e para o planeta.",
    stats: [
      { icon: imgGlobe,     label: "Presença global",     count: "180+",    description: "países com visão e expansão" },
      { icon: imgPartner,   label: "Rede de parceiros",   count: "150+",    description: "parceiros distribuidores e integrados" },
      { icon: imgWater,     label: "Pessoas impactadas",  count: "+50M",    description: "soluções que melhoram vidas" },
      { icon: imgGloboSust, label: "Sustentabilidade",    count: "Milhões", description: "de litros de água preservados" },
      { icon: imgChat,      label: "Mídia inteligente",   count: "+1Bi",    description: "de interações de mídia geradas" },
    ],
  },
  "pt-pt": {
    tagline: "O nosso impacto",
    heading: "Transformamos tecnologia em",
    headingHighlight: "impacto positivo",
    headingEnd: "para as pessoas e para o planeta.",
    stats: [
      { icon: imgGlobe,     label: "Presença global",     count: "180+",    description: "países com visão e expansão" },
      { icon: imgPartner,   label: "Rede de parceiros",   count: "150+",    description: "parceiros distribuidores e integrados" },
      { icon: imgWater,     label: "Pessoas impactadas",  count: "+50M",    description: "soluções que melhoram vidas" },
      { icon: imgGloboSust, label: "Sustentabilidade",    count: "Milhões", description: "de litros de água preservados" },
      { icon: imgChat,      label: "Média inteligente",   count: "+1Bi",    description: "de interações de média geradas" },
    ],
  },
  en: {
    tagline: "Our impact",
    heading: "We turn technology into",
    headingHighlight: "positive impact",
    headingEnd: "for people and the planet.",
    stats: [
      { icon: imgGlobe,     label: "Global presence",     count: "180+",    description: "countries with vision and expansion" },
      { icon: imgPartner,   label: "Partner network",     count: "150+",    description: "distributors and integrated partners" },
      { icon: imgWater,     label: "People impacted",     count: "+50M",    description: "solutions that improve lives" },
      { icon: imgGloboSust, label: "Sustainability",      count: "Millions", description: "liters of water preserved" },
      { icon: imgChat,      label: "Smart media",         count: "+1Bi",    description: "media interactions generated" },
    ],
  },
  es: {
    tagline: "Nuestro impacto",
    heading: "Transformamos tecnología en",
    headingHighlight: "impacto positivo",
    headingEnd: "para las personas y el planeta.",
    stats: [
      { icon: imgGlobe,     label: "Presencia global",    count: "180+",    description: "países con visión y expansión" },
      { icon: imgPartner,   label: "Red de socios",       count: "150+",    description: "socios distribuidores e integrados" },
      { icon: imgWater,     label: "Personas impactadas", count: "+50M",    description: "soluciones que mejoran vidas" },
      { icon: imgGloboSust, label: "Sostenibilidad",      count: "Millones", description: "litros de agua preservados" },
      { icon: imgChat,      label: "Medios inteligentes", count: "+1Bi",    description: "interacciones de medios generadas" },
    ],
  },
  fr: {
    tagline: "Notre impact",
    heading: "Nous transformons la technologie en",
    headingHighlight: "impact positif",
    headingEnd: "pour les personnes et la planète.",
    stats: [
      { icon: imgGlobe,     label: "Présence mondiale",   count: "180+",    description: "pays avec vision et expansion" },
      { icon: imgPartner,   label: "Réseau de partenaires", count: "150+",  description: "partenaires distributeurs et intégrés" },
      { icon: imgWater,     label: "Personnes impactées", count: "+50M",    description: "solutions qui améliorent des vies" },
      { icon: imgGloboSust, label: "Durabilité",          count: "Millions", description: "litres d'eau préservés" },
      { icon: imgChat,      label: "Médias intelligents", count: "+1Bi",    description: "interactions médias générées" },
    ],
  },
  de: {
    tagline: "Unser Impact",
    heading: "Wir verwandeln Technologie in",
    headingHighlight: "positiven Impact",
    headingEnd: "für Menschen und den Planeten.",
    stats: [
      { icon: imgGlobe,     label: "Globale Präsenz",     count: "180+",    description: "Länder mit Vision und Expansion" },
      { icon: imgPartner,   label: "Partnernetzwerk",     count: "150+",    description: "Distributoren und integrierte Partner" },
      { icon: imgWater,     label: "Betroffene Menschen", count: "+50M",    description: "Lösungen, die Leben verbessern" },
      { icon: imgGloboSust, label: "Nachhaltigkeit",      count: "Millionen", description: "Liter Wasser bewahrt" },
      { icon: imgChat,      label: "Smart Media",         count: "+1Bi",    description: "generierte Medieninteraktionen" },
    ],
  },
  it: {
    tagline: "Il nostro impatto",
    heading: "Trasformiamo la tecnologia in",
    headingHighlight: "impatto positivo",
    headingEnd: "per le persone e il pianeta.",
    stats: [
      { icon: imgGlobe,     label: "Presenza globale",    count: "180+",    description: "paesi con visione ed espansione" },
      { icon: imgPartner,   label: "Rete di partner",     count: "150+",    description: "partner distributori e integrati" },
      { icon: imgWater,     label: "Persone impattate",   count: "+50M",    description: "soluzioni che migliorano le vite" },
      { icon: imgGloboSust, label: "Sostenibilità",       count: "Milioni", description: "litri d'acqua preservati" },
      { icon: imgChat,      label: "Media intelligenti",  count: "+1Bi",    description: "interazioni media generate" },
    ],
  },
  zh: {
    tagline: "我们的影响",
    heading: "我们将技术转化为",
    headingHighlight: "积极影响",
    headingEnd: "惠及人类与地球。",
    stats: [
      { icon: imgGlobe,     label: "全球存在",   count: "180+",    description: "具有愿景和扩张的国家" },
      { icon: imgPartner,   label: "合作伙伴网络", count: "150+",  description: "经销商与集成合作伙伴" },
      { icon: imgWater,     label: "受益人群",   count: "+50M",    description: "改善生活的解决方案" },
      { icon: imgGloboSust, label: "可持续性",   count: "数百万", description: "升净水被保护" },
      { icon: imgChat,      label: "智能媒体",   count: "+1Bi",    description: "产生的媒体互动次数" },
    ],
  },
  ja: {
    tagline: "私たちのインパクト",
    heading: "テクノロジーを",
    headingHighlight: "ポジティブなインパクト",
    headingEnd: "に変換し、人々と地球に貢献します。",
    stats: [
      { icon: imgGlobe,     label: "グローバルプレゼンス", count: "180+",  description: "ビジョンと拡大を持つ国々" },
      { icon: imgPartner,   label: "パートナーネットワーク", count: "150+", description: "ディストリビューター・統合パートナー" },
      { icon: imgWater,     label: "影響を受けた人々",    count: "+50M",   description: "生活を改善するソリューション" },
      { icon: imgGloboSust, label: "サステナビリティ",    count: "数百万", description: "リットルの水が保護された" },
      { icon: imgChat,      label: "スマートメディア",    count: "+1Bi",   description: "生成されたメディアインタラクション" },
    ],
  },
  ko: {
    tagline: "우리의 영향",
    heading: "기술을",
    headingHighlight: "긍정적인 영향",
    headingEnd: "으로 전환하여 사람과 지구에 기여합니다.",
    stats: [
      { icon: imgGlobe,     label: "글로벌 존재감",   count: "180+",    description: "비전과 확장을 가진 국가들" },
      { icon: imgPartner,   label: "파트너 네트워크", count: "150+",    description: "유통 및 통합 파트너" },
      { icon: imgWater,     label: "영향받은 인원",   count: "+50M",    description: "삶을 개선하는 솔루션" },
      { icon: imgGloboSust, label: "지속 가능성",     count: "수백만", description: "리터의 물이 보존됨" },
      { icon: imgChat,      label: "스마트 미디어",   count: "+1Bi",    description: "생성된 미디어 상호작용" },
    ],
  },
};

export default function SobreImpacto() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] relative rounded-[16px] w-full">
        {/* Dark background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#1f2e91] inset-0 rounded-[16px]" />
          <img
            alt=""
            className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full"
            src={imgBg}
          />
        </div>

        {/* Title column */}
        <div className="flex flex-col gap-[20px] items-center w-full relative lg:flex-[1_0_0] lg:items-start lg:max-w-[340px] lg:min-w-[280px]">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center lg:text-left">
            {t.tagline}
          </p>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white text-center lg:text-left">
            {t.heading}{" "}
            <span className="text-[#0569ff]">{t.headingHighlight}</span>{" "}
            {t.headingEnd}
          </p>
        </div>

        {/* Stats grid */}
        <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-start justify-center min-w-[280px] relative">
          {t.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-[1_0_0] flex-col gap-[25px] items-center justify-center min-w-[100px]"
            >
              {/* Icon + label */}
              <div className="flex flex-wrap gap-[10px] items-center justify-center w-full">
                <FigmaIcon src={s.icon} alt={s.label} size={30} />
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
                  {s.label}
                </p>
              </div>
              {/* Count */}
              <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white text-center w-full">
                {s.count}
              </p>
              {/* Description */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white text-center w-full">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
