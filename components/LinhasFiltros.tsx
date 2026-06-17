"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrow        = "/figma-assets/icon-arrow-c.svg";
const imgLineAcido    = "/figma-assets/icon-line-acido.svg";
const imgLineAlcalino = "/figma-assets/icon-line-alcalino.svg";

type FilterCard = {
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
  gradient?: boolean;
};

const T: Record<Lang, {
  essentialsHeading: string;
  premiumHeading: string;
  phHeading: string;
  labelAcido: string;
  labelNeutro: string;
  labelAlcalino: string;
  essentials: FilterCard[];
  premium: FilterCard[];
}> = {
  pt: {
    essentialsHeading: "Linha Essentials - Sistema de Filtração de Alta Performace",
    premiumHeading: "Linha Premium - Sistema de Filtração de Alta Performace",
    phHeading: "Escala de pH",
    labelAcido: "Ácido",
    labelNeutro: "Neutro",
    labelAlcalino: "Alcalino",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ele ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio" },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Sistema que produz água com 99% de pureza (livre de vírus e bactérias com até 0,5 microns), foi desenvolvido para atender pessoas que queiram ou necessitem do consumo de uma água extremamente pura.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ele ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio" },
    ],
  },
  en: {
    essentialsHeading: "Essentials Line - High Performance Filtration System",
    premiumHeading: "Premium Line - High Performance Filtration System",
    phHeading: "pH Scale",
    labelAcido: "Acid",
    labelNeutro: "Neutral",
    labelAlcalino: "Alkaline",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odors and flavors normally present in tap water." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Removes chlorine, chemical compounds, suspended particles, odors and flavors normally present in tap water." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "With ultra-precision micropores, removes organisms, macromolecular substances, red worm, viruses and bacteria.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odors and flavors normally present in tap water." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Removes chlorine, chemical compounds, suspended particles, odors and flavors normally present in tap water." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "A system that produces water with 99% purity (free from viruses and bacteria up to 0.5 microns), developed for people who want or need extremely pure water.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich." },
    ],
  },
  es: {
    essentialsHeading: "Línea Essentials - Sistema de Filtración de Alta Eficiencia",
    premiumHeading: "Línea Premium - Sistema de Filtración de Alta Eficiencia",
    phHeading: "Escala de pH",
    labelAcido: "Ácido",
    labelNeutro: "Neutro",
    labelAlcalino: "Alcalino",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Elimina el yodo, suciedad, óxido, filtra impurezas, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Elimina el cloro, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Con microporos de ultraprecisión, elimina organismos, sustancias macromoleculares, gusano rojo, virus y bacterias.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ajusta el rango de pH del agua, convirtiendo el agua filtrada en alcalina con pH superior a 9, antioxidante y rica en hidrógeno." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Elimina el yodo, suciedad, óxido, filtra impurezas, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Elimina el cloro, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Sistema que produce agua con 99% de pureza (libre de virus y bacterias de hasta 0,5 micrones), desarrollado para personas que deseen o necesiten agua extremadamente pura.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ajusta el rango de pH del agua, convirtiendo el agua filtrada en alcalina con pH superior a 9, antioxidante y rica en hidrógeno." },
    ],
  },
};

const phColors = [
  "#dc2429", "#e3372a", "#ef5d24", "#f5841b", "#f9a621",
  "#fecb15", "#5fbd02", "#006eaf", "#4d5daa", "#7a459c",
];

function FilterCard({ card, isLast }: { card: FilterCard; isLast: boolean }) {
  const isHighlightBlue = card.highlight && !card.gradient;
  const isHighlightGrad = card.highlight && card.gradient;

  return (
    <div className={`flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[210px] min-w-[200px] px-[20px] py-[25px] relative rounded-[16px] bg-[#f6f9fe]${isHighlightBlue ? " border-2 border-[#0233c3]" : ""}${isHighlightGrad ? " border-2 border-[#0233c3]" : ""}`}>
      {/* Number + title */}
      <div className="flex flex-col gap-[10px] items-center w-full shrink-0">
        <div
          className="flex flex-col items-center justify-center rounded-full shrink-0 size-[40px]"
          style={
            isHighlightBlue
              ? { backgroundImage: "linear-gradient(to right, #0041ff, #3f8cff)" }
              : isHighlightGrad
              ? { backgroundImage: "linear-gradient(94deg, #0233c3 6.19%, #9f3df5 93.35%)" }
              : { backgroundColor: "#1f2e91" }
          }
        >
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center">{card.num}</span>
        </div>
        <p
          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0 text-center${isHighlightBlue ? " bg-clip-text text-transparent" : isHighlightGrad ? " bg-clip-text text-transparent" : " text-[#1f2e91]"}`}
          style={isHighlightBlue ? { backgroundImage: "linear-gradient(to right, #0041ff, #3f8cff)" } : isHighlightGrad ? { backgroundImage: "linear-gradient(147deg, #0233c3 6.19%, #9f3df5 93.35%)" } : undefined}
        >
          {card.title}
        </p>
      </div>
      {/* Description */}
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] flex-1 w-full">{card.desc}</p>
      {/* Arrow connector (not on last card) */}
      {!isLast && (
        <div className="absolute -right-[10px] top-1/2 -translate-y-1/2 w-[10px] h-0 pointer-events-none">
          <div className="absolute" style={{ inset: "-7.36px -10% -7.36px 0" }}>
            <img alt="" className="block max-w-none size-full" src={imgArrow} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function LinhasFiltros() {
  const { lang } = useLang();
  const t = T[lang];
  const essentials = t.essentials;
  const premium = t.premium;

  return (
    <section id="filtros-lista" className="scroll-mt-[80px] bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Linha Essentials */}
        <div className="flex flex-col gap-[40px] items-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] text-center w-full">
            {t.essentialsHeading}
          </h2>
          <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
            {essentials.map((c, i) => <FilterCard key={i} card={c} isLast={i === essentials.length - 1} />)}
          </div>
        </div>

        {/* Linha Premium */}
        <div className="flex flex-col gap-[40px] items-center w-full">
          <h2
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent text-center w-full"
            style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            {t.premiumHeading}
          </h2>
          <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
            {premium.map((c, i) => <FilterCard key={i} card={c} isLast={i === premium.length - 1} />)}
          </div>
        </div>

        {/* Escala de pH */}
        <div className="flex flex-col gap-[40px] items-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
            {t.phHeading}
          </h2>
          <div className="flex flex-col gap-[20px] w-full">
            {/* Color bar */}
            <div className="grid overflow-hidden rounded-[8px] w-full" style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}>
              {phColors.map((color, i) => (
                <div key={i} className="flex flex-col items-center justify-center px-[10px] py-[40px]" style={{ backgroundColor: color }}>
                  <span className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white text-center">{i + 1}</span>
                </div>
              ))}
            </div>
            {/* Labels */}
            <div className="grid w-full" style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}>
              {/* Ácido — cols 1-6: seta dupla colorida (warm) */}
              <div className="flex flex-col gap-[10px] items-center justify-center" style={{ gridColumn: "1 / span 6" }}>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute" style={{ inset: "-7.36px -0.12%" }}>
                    <img alt="" className="block max-w-none size-full" src={imgLineAcido} />
                  </div>
                </div>
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[clamp(12px,1.8vw,20px)] leading-[clamp(14px,2.1vw,22px)] text-[#333] text-center">{t.labelAcido}</span>
              </div>
              {/* Neutro — col 7 */}
              <div className="flex flex-col items-center justify-center">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[clamp(12px,1.8vw,20px)] leading-[clamp(14px,2.1vw,22px)] text-[#333] text-center">{t.labelNeutro}</span>
              </div>
              {/* Alcalino — cols 8-10: seta dupla colorida (cool) */}
              <div className="flex flex-col gap-[10px] items-center justify-center" style={{ gridColumn: "8 / span 3" }}>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute" style={{ inset: "-7.36px -0.24%" }}>
                    <img alt="" className="block max-w-none size-full" src={imgLineAlcalino} />
                  </div>
                </div>
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[clamp(12px,1.8vw,20px)] leading-[clamp(14px,2.1vw,22px)] text-[#333] text-center">{t.labelAlcalino}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
