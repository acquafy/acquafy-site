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
