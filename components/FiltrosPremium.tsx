"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

type FilterCard = {
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
  gradient?: boolean;
};

const FILTER_STRUCTURE: Omit<FilterCard, "desc">[] = [
  { num: "01", title: "PPF - Polypropilene Filter" },
  { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter" },
  { num: "03", title: "ROF - Reverse Osmose Filter", highlight: true, gradient: true },
  { num: "04", title: "AAF - Alkaline Antioxidant Filter" },
];

const T: Record<Lang, { h2: string; descs: string[] }> = {
  pt: {
    h2: "Linha Premium - Sistema de Filtração de Alta Performance",
    descs: [
      "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira.",
      "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira.",
      "Sistema que produz água com 99% de pureza (livre de vírus e bactérias com até 0,5 microns), foi desenvolvido para atender pessoas que queiram ou necessitem do consumo de uma água extremamente pura.",
      "Ele ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio",
    ],
  },
  en: {
    h2: "Premium Line - High Performance Filtration System",
    descs: [
      "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odors and flavors normally present in tap water.",
      "Removes chlorine, chemical compounds, suspended particles, odors and flavors normally present in tap water.",
      "System that produces water with 99% purity (free of viruses and bacteria down to 0.5 microns), developed for people who want or need to consume extremely pure water.",
      "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich.",
    ],
  },
  "en-gb": {
    h2: "Premium Line - High Performance Filtration System",
    descs: [
      "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odours and flavours normally present in tap water.",
      "Removes chlorine, chemical compounds, suspended particles, odours and flavours normally present in tap water.",
      "System that produces water with 99% purity (free of viruses and bacteria down to 0.5 microns), developed for people who want or need to consume extremely pure water.",
      "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich.",
    ],
  },
  es: {
    h2: "Línea Premium - Sistema de Filtración de Alto Rendimiento",
    descs: [
      "Elimina yodo, suciedad, herrumbre, filtra impurezas, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo.",
      "Elimina el cloro, compuestos químicos, partículas en suspensión, olores y sabores normalmente presentes en el agua del grifo.",
      "Sistema que produce agua con 99% de pureza (libre de virus y bacterias de hasta 0,5 micras), desarrollado para personas que deseen o necesiten consumir agua extremadamente pura.",
      "Ajusta el rango de pH del agua, haciendo que el agua filtrada sea alcalina con pH superior a 9, antioxidante y rica en hidrógeno.",
    ],
  },
  fr: {
    h2: "Gamme Premium - Système de Filtration Haute Performance",
    descs: [
      "Élimine l'iode, la saleté, la rouille, filtre les impuretés, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet.",
      "Élimine le chlore, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet.",
      "Système qui produit une eau d'une pureté de 99 % (exempte de virus et de bactéries jusqu'à 0,5 micron), conçu pour les personnes souhaitant ou nécessitant une eau extrêmement pure.",
      "Il ajuste la plage de pH de l'eau, rendant l'eau filtrée alcaline avec un pH supérieur à 9, antioxydante et riche en hydrogène.",
    ],
  },
  de: {
    h2: "Premium-Linie - Hochleistungs-Filtrationssystem",
    descs: [
      "Entfernt Jod, Schmutz, Rost, filtert Verunreinigungen, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen.",
      "Entfernt Chlor, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen.",
      "System, das Wasser mit 99 % Reinheit produziert (frei von Viren und Bakterien bis zu 0,5 Mikron), entwickelt für Personen, die extrem reines Wasser konsumieren möchten oder müssen.",
      "Es reguliert den pH-Bereich des Wassers und macht das gefilterte Wasser mit einem pH-Wert über 9 alkalisch, antioxidativ und wasserstoffreich.",
    ],
  },
  it: {
    h2: "Linea Premium - Sistema di Filtrazione ad Alta Prestazione",
    descs: [
      "Rimuove iodio, sporco, ruggine, filtra impurità, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto.",
      "Rimuove il cloro, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto.",
      "Sistema che produce acqua con purezza al 99% (priva di virus e batteri fino a 0,5 micron), sviluppato per chi desidera o necessita di consumare acqua estremamente pura.",
      "Regola il range di pH dell'acqua, rendendo l'acqua filtrata alcalina con pH superiore a 9, antiossidante e ricca di idrogeno.",
    ],
  },
  zh: {
    h2: "Premium系列 - 高性能净水系统",
    descs: [
      "去除碘、污垢、铁锈，过滤自来水中通常含有的杂质、化学物质、悬浮颗粒、异味和异味。",
      "去除氯气、化学物质、悬浮颗粒，以及自来水中通常含有的异味和异味。",
      "该系统生产纯度达99%的水（去除0.5微米以内的病毒和细菌），专为需要饮用极纯净水的人群而开发。",
      "调节水的pH范围，使过滤后的水呈碱性，pH值高于9，具有抗氧化性且富含氢。",
    ],
  },
  ja: {
    h2: "プレミアムライン - 高性能ろ過システム",
    descs: [
      "水道水に通常含まれるヨウ素、汚れ、錆を除去し、不純物、化学物質、浮遊粒子、臭いおよび異味をろ過します。",
      "水道水に通常含まれる塩素、化学物質、浮遊粒子、臭いおよび異味を除去します。",
      "99%の純度の水を生成するシステム（0.5ミクロンまでのウイルスや細菌を除去）で、極めて純粋な水を必要とする方のために開発されました。",
      "水のpH範囲を調整し、ろ過された水をpH9以上のアルカリ性にし、抗酸化性と水素を豊富に含む水にします。",
    ],
  },
  ko: {
    h2: "프리미엄 라인 - 고성능 여과 시스템",
    descs: [
      "수돗물에 일반적으로 존재하는 요오드, 먼지, 녹을 제거하고 불순물, 화학 물질, 부유 입자, 냄새 및 맛을 여과합니다.",
      "수돗물에 일반적으로 존재하는 염소, 화학 물질, 부유 입자, 냄새 및 맛을 제거합니다.",
      "99% 순도의 물을 생산하는 시스템(0.5마이크론까지의 바이러스 및 박테리아 제거)으로, 극도로 순수한 물을 원하거나 필요로 하는 사람들을 위해 개발되었습니다.",
      "물의 pH 범위를 조절하여 여과된 물을 pH 9 이상의 알칼리성으로 만들고, 항산화 효과와 수소가 풍부한 물로 만듭니다.",
    ],
  },
  sv: {
    h2: "Premium-linjen - Högpresterande filtressionssystem",
    descs: [
      "Tar bort jod, smuts, rost, filtrerar orenheter, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt finns i kranvatten.",
      "Tar bort klor, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt finns i kranvatten.",
      "System som producerar vatten med 99% renhet (fritt från virus och bakterier ned till 0,5 mikron), utvecklat för personer som vill eller behöver konsumera extremt rent vatten.",
      "Det justerar vattnets pH-intervall och gör det filtrerade vattnet alkaliskt med ett pH över 9, antioxidant och väterikt.",
    ],
  },
  fi: {
    h2: "Premium-linja - Korkean suorituskyvyn suodatusjärjestelmä",
    descs: [
      "Poistaa jodin, lian, ruosteen, suodattaa epäpuhtaudet, kemialliset yhdisteet, leijuvat hiukkaset, hajut ja maut, joita normaalisti esiintyy hanavedessä.",
      "Poistaa kloorin, kemialliset yhdisteet, leijuvat hiukkaset, hajut ja maut, joita normaalisti esiintyy hanavedessä.",
      "Järjestelmä, joka tuottaa vettä 99 %:n puhtaudella (vapaa viruksista ja bakteereista 0,5 mikrometriin asti), kehitetty henkilöille, jotka haluavat tai tarvitsevat äärimmäisen puhdasta vettä.",
      "Se säätää veden pH-aluetta tehden suodatetusta vedestä alkalisen pH-arvolla yli 9, antioksidantti- ja vetypitoiseksi.",
    ],
  },
  ru: {
    h2: "Премиум-линия - Высокопроизводительная система фильтрации",
    descs: [
      "Удаляет йод, грязь, ржавчину, фильтрует примеси, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде.",
      "Удаляет хлор, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде.",
      "Система, производящая воду с чистотой 99% (свободную от вирусов и бактерий размером до 0,5 микрон), разработана для людей, которые хотят или нуждаются в потреблении исключительно чистой воды.",
      "Регулирует диапазон pH воды, делая отфильтрованную воду щелочной с pH выше 9, антиоксидантной и богатой водородом.",
    ],
  },
  ro: {
    h2: "Linia Premium - Sistem de filtrare de inalta performanta",
    descs: [
      "Elimina iodul, murdaria, rugina, filtreaza impuritatile, compusii chimici, particulele in suspensie, mirosurile si gusturile prezente in mod normal in apa de la robinet.",
      "Elimina clorul, compusii chimici, particulele in suspensie, mirosurile si gusturile prezente in mod normal in apa de la robinet.",
      "Sistem care produce apa cu o puritate de 99% (lipsita de virusi si bacterii pana la 0,5 microni), dezvoltat pentru persoanele care doresc sau au nevoie sa consume apa extrem de pura.",
      "Regleaza intervalul de pH al apei, facand apa filtrata alcalina cu un pH peste 9, antioxidanta si bogata in hidrogen.",
    ],
  },
  he: {
    h2: "קו פרמיום - מערכת סינון בעלת ביצועים גבוהים",
    descs: [
      "מסיר יוד, לכלוך, חלודה, מסנן אי-נקיות, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים הנמצאים בדרך כלל במי הברז.",
      "מסיר כלור, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים הנמצאים בדרך כלל במי הברז.",
      "מערכת המייצרת מים בטוהר של 99% (נקיים מווירוסים וחיידקים עד 0.5 מיקרון), פותחה עבור אנשים שרוצים או זקוקים לצריכת מים טהורים במיוחד.",
      "היא מכוונת את טווח ה-pH של המים, הופכת את המים המסוננים לאלקליים עם pH מעל 9, נוגדי חמצון ועשירים במימן.",
    ],
  },
  "pt-pt": {
    h2: "Linha Premium - Sistema de Filtração de Alta Performance",
    descs: [
      "Remove iodo, sujidade, ferrugem, filtra impurezas, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira.",
      "Remove o cloro, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira.",
      "Sistema que produz água com 99% de pureza (isenta de vírus e bactérias até 0,5 microns), foi desenvolvido para servir pessoas que queiram ou necessitem do consumo de uma água extremamente pura.",
      "Ajusta a gama de pH da água, tornando a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogénio.",
    ],
  },
};

function FilterCardItem({ card }: { card: FilterCard }) {
  const isGrad = card.highlight && card.gradient;
  return (
    <div
      className={`flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[210px] min-w-[200px] px-[20px] py-[25px] rounded-[16px] bg-[#f6f9fe]${card.highlight ? " border-2 border-[#0233c3]" : ""}`}
    >
      <div className="flex flex-col gap-[10px] items-center w-full shrink-0">
        <div
          className="flex flex-col items-center justify-center rounded-full shrink-0 size-[40px]"
          style={isGrad ? { backgroundImage: "linear-gradient(94deg, #0233c3 6.19%, #9f3df5 93.35%)" } : { backgroundColor: "#1f2e91" }}
        >
          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center">{card.num}</span>
        </div>
        <p
          className={`font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0 text-center${isGrad ? " bg-clip-text text-transparent" : " text-[#1f2e91]"}`}
          style={isGrad ? { backgroundImage: "linear-gradient(147deg, #0233c3 6.19%, #9f3df5 93.35%)" } : undefined}
        >
          {card.title}
        </p>
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] flex-1 w-full">{card.desc}</p>
    </div>
  );
}

export default function FiltrosPremium() {
  const { lang } = useLang();
  const t = T[lang];
  const cards: FilterCard[] = FILTER_STRUCTURE.map((s, i) => ({ ...s, desc: t.descs[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2
          className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent text-center w-full"
          style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
        >
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
