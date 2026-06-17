"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrow = "/figma-assets/icon-arrow-c.svg";

type FilterCard = {
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
};

const FILTER_STRUCTURE: Omit<FilterCard, "desc">[] = [
  { num: "01", title: "PPF - Polypropilene Filter" },
  { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter" },
  { num: "03", title: "UFF - Ultra Filtration Filter", highlight: true },
  { num: "04", title: "AAF - Alkaline Antioxidant Filter" },
];

const T: Record<Lang, { h2: string; descs: string[] }> = {
  pt: {
    h2: "Linha Essentials - Sistema de Filtração de Alta Performance",
    descs: [
      "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira.",
      "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira.",
      "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias.",
      "Ele ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio",
    ],
  },
  en: {
    h2: "Essentials Line - High Performance Filtration System",
    descs: [
      "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odors and flavors normally present in tap water.",
      "Removes chlorine, chemical compounds, suspended particles, odors and flavors normally present in tap water.",
      "With ultra-precision micropores, removes organisms, macromolecular substances, red worm, viruses and bacteria.",
      "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich.",
    ],
  },
  es: {
    h2: "Línea Essentials - Sistema de Filtración de Alto Rendimiento",
    descs: [
      "Elimina yodo, suciedad, herrumbre, filtra impurezas, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo.",
      "Elimina el cloro, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo.",
      "Con microporos de ultraprecisión, elimina organismos, sustancias macromoleculares, gusanos rojos, virus y bacterias.",
      "Ajusta el rango de pH del agua, haciendo que el agua filtrada sea alcalina con pH superior a 9, antioxidante y rica en hidrógeno.",
    ],
  },
};

function FilterCardItem({ card, isLast }: { card: FilterCard; isLast: boolean }) {
  return (
    <div
      className={`flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[210px] min-w-[200px] px-[20px] py-[25px] relative rounded-[16px] bg-[#f6f9fe]${card.highlight ? " border-2 border-[#0233c3]" : ""}`}
    >
      <div className="flex flex-col gap-[10px] items-center w-full shrink-0">
        <div
          className="flex flex-col items-center justify-center rounded-full shrink-0 size-[40px]"
          style={card.highlight ? { backgroundImage: "linear-gradient(to right, #0041ff, #3f8cff)" } : { backgroundColor: "#1f2e91" }}
        >
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center">{card.num}</span>
        </div>
        <p
          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0 text-center${card.highlight ? " bg-clip-text text-transparent" : " text-[#1f2e91]"}`}
          style={card.highlight ? { backgroundImage: "linear-gradient(to right, #0041ff, #3f8cff)" } : undefined}
        >
          {card.title}
        </p>
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] flex-1 w-full">{card.desc}</p>
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

export default function FiltrosNeo() {
  const { lang } = useLang();
  const t = T[lang];
  const cards: FilterCard[] = FILTER_STRUCTURE.map((s, i) => ({ ...s, desc: t.descs[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] text-center w-full">
          {t.h2}
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {cards.map((c, i) => (
            <FilterCardItem key={i} card={c} isLast={i === cards.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
