"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

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
  fr: {
    h2: "Gamme Essentials - Système de Filtration Haute Performance",
    descs: [
      "Élimine l'iode, la saleté, la rouille, filtre les impuretés, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet.",
      "Élimine le chlore, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet.",
      "Grâce à des micropores d'ultra-précision, élimine les organismes, les substances macromoléculaires, les vers rouges, les virus et les bactéries.",
      "Il ajuste la plage de pH de l'eau, rendant l'eau filtrée alcaline avec un pH supérieur à 9, antioxydante et riche en hydrogène.",
    ],
  },
  de: {
    h2: "Essentials-Linie - Hochleistungs-Filtrationssystem",
    descs: [
      "Entfernt Jod, Schmutz, Rost, filtert Verunreinigungen, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen.",
      "Entfernt Chlor, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen.",
      "Mit ultrapräzisen Mikroporen werden Organismen, makromolekulare Substanzen, rote Würmer, Viren und Bakterien entfernt.",
      "Es reguliert den pH-Bereich des Wassers und macht das gefilterte Wasser mit einem pH-Wert über 9 alkalisch, antioxidativ und wasserstoffreich.",
    ],
  },
  it: {
    h2: "Linea Essentials - Sistema di Filtrazione ad Alta Prestazione",
    descs: [
      "Rimuove iodio, sporco, ruggine, filtra impurità, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto.",
      "Rimuove il cloro, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto.",
      "Con micropori di ultraprecisione, rimuove organismi, sostanze macromolecolari, vermi rossi, virus e batteri.",
      "Regola il range di pH dell'acqua, rendendo l'acqua filtrata alcalina con pH superiore a 9, antiossidante e ricca di idrogeno.",
    ],
  },
  zh: {
    h2: "Essentials系列 - 高性能净水系统",
    descs: [
      "去除碘、污垢、铁锈，过滤自来水中通常含有的杂质、化学物质、悬浮颗粒、异味和异味。",
      "去除氯气、化学物质、悬浮颗粒，以及自来水中通常含有的异味和异味。",
      "凭借超精密微孔，去除有机物、大分子物质、红虫、病毒和细菌。",
      "调节水的pH范围，使过滤后的水呈碱性，pH值高于9，具有抗氧化性且富含氢。",
    ],
  },
  ja: {
    h2: "エッセンシャルライン - 高性能ろ過システム",
    descs: [
      "水道水に通常含まれるヨウ素、汚れ、錆を除去し、不純物、化学物質、浮遊粒子、臭いおよび異味をろ過します。",
      "水道水に通常含まれる塩素、化学物質、浮遊粒子、臭いおよび異味を除去します。",
      "超精密マイクロポアにより、微生物、高分子物質、赤虫、ウイルス、細菌を除去します。",
      "水のpH範囲を調整し、ろ過された水をpH9以上のアルカリ性にし、抗酸化性と水素を豊富に含む水にします。",
    ],
  },
  ko: {
    h2: "에센셜 라인 - 고성능 여과 시스템",
    descs: [
      "수돗물에 일반적으로 존재하는 요오드, 먼지, 녹을 제거하고 불순물, 화학 물질, 부유 입자, 냄새 및 맛을 여과합니다.",
      "수돗물에 일반적으로 존재하는 염소, 화학 물질, 부유 입자, 냄새 및 맛을 제거합니다.",
      "초정밀 마이크로포어로 유기물, 고분자 물질, 붉은 벌레, 바이러스 및 박테리아를 제거합니다.",
      "물의 pH 범위를 조절하여 여과된 물을 pH 9 이상의 알칼리성으로 만들고, 항산화 효과와 수소가 풍부한 물로 만듭니다.",
    ],
  },
  "pt-pt": {
    h2: "Linha Essentials - Sistema de Filtração de Alta Performance",
    descs: [
      "Remove iodo, sujidade, ferrugem, filtra impurezas, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira.",
      "Remove o cloro, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira.",
      "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias.",
      "Ajusta a gama de pH da água, tornando a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogénio.",
    ],
  },
};

function FilterCardItem({ card }: { card: FilterCard }) {
  return (
    <div
      className={`flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[210px] min-w-[200px] px-[20px] py-[25px] rounded-[16px] bg-[#f6f9fe]${card.highlight ? " border-2 border-[#0233c3]" : ""}`}
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
            <FilterCardItem key={i} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
