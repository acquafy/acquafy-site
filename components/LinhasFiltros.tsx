"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

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
    essentialsHeading: "Linha UFF — Ultrafiltração de Alta Performance",
    premiumHeading: "Linha ROF — Osmose Reversa de Alta Pureza",
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
    essentialsHeading: "UFF Line — High Performance Ultra Filtration",
    premiumHeading: "ROF Line — High Purity Reverse Osmosis",
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
  "en-gb": {
    essentialsHeading: "UFF Line — High Performance Ultra Filtration",
    premiumHeading: "ROF Line — High Purity Reverse Osmosis",
    phHeading: "pH Scale",
    labelAcido: "Acid",
    labelNeutro: "Neutral",
    labelAlcalino: "Alkaline",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odours and flavours normally present in tap water." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Removes chlorine, chemical compounds, suspended particles, odours and flavours normally present in tap water." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "With ultra-precision micropores, removes organisms, macromolecular substances, red worm, viruses and bacteria.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Removes iodine, dirt, rust, filters impurities, chemical compounds, suspended particles, odours and flavours normally present in tap water." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Removes chlorine, chemical compounds, suspended particles, odours and flavours normally present in tap water." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "A system that produces water with 99% purity (free from viruses and bacteria up to 0.5 microns), developed for people who want or need extremely pure water.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "It adjusts the pH range of the water, making the filtered water alkaline with a pH above 9, antioxidant and hydrogen-rich." },
    ],
  },
  es: {
    essentialsHeading: "Línea UFF — Ultrafiltración de Alta Eficiencia",
    premiumHeading: "Línea ROF — Ósmosis Inversa de Alta Pureza",
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
  fr: {
    essentialsHeading: "Gamme UFF — Ultrafiltration Haute Performance",
    premiumHeading: "Gamme ROF — Osmose Inverse Haute Pureté",
    phHeading: "Échelle de pH",
    labelAcido: "Acide",
    labelNeutro: "Neutre",
    labelAlcalino: "Alcalin",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Élimine l'iode, la saleté, la rouille, filtre les impuretés, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Élimine le chlore, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Grâce à des micropores d'ultra-précision, élimine les organismes, les substances macromoléculaires, les vers rouges, les virus et les bactéries.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Il ajuste la plage de pH de l'eau, rendant l'eau filtrée alcaline avec un pH supérieur à 9, antioxydante et riche en hydrogène." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Élimine l'iode, la saleté, la rouille, filtre les impuretés, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Élimine le chlore, les composés chimiques, les particules en suspension, les odeurs et les saveurs normalement présents dans l'eau du robinet." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Système qui produit une eau d'une pureté de 99 % (exempte de virus et de bactéries jusqu'à 0,5 micron), conçu pour les personnes souhaitant ou nécessitant une eau extrêmement pure.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Il ajuste la plage de pH de l'eau, rendant l'eau filtrée alcaline avec un pH supérieur à 9, antioxydante et riche en hydrogène." },
    ],
  },
  de: {
    essentialsHeading: "UFF-Linie — Hochleistungs-Ultrafiltration",
    premiumHeading: "ROF-Linie — Hochreine Umkehrosmose",
    phHeading: "pH-Skala",
    labelAcido: "Sauer",
    labelNeutro: "Neutral",
    labelAlcalino: "Alkalisch",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Entfernt Jod, Schmutz, Rost, filtert Verunreinigungen, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Entfernt Chlor, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Mit ultrapräzisen Mikroporen werden Organismen, makromolekulare Substanzen, rote Würmer, Viren und Bakterien entfernt.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Es reguliert den pH-Bereich des Wassers und macht das gefilterte Wasser mit einem pH-Wert über 9 alkalisch, antioxidativ und wasserstoffreich." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Entfernt Jod, Schmutz, Rost, filtert Verunreinigungen, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Entfernt Chlor, chemische Verbindungen, Schwebeteilchen, Gerüche und Geschmacksstoffe, die normalerweise im Leitungswasser vorkommen." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "System, das Wasser mit 99 % Reinheit produziert (frei von Viren und Bakterien bis zu 0,5 Mikron), entwickelt für Personen, die extrem reines Wasser konsumieren möchten oder müssen.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Es reguliert den pH-Bereich des Wassers und macht das gefilterte Wasser mit einem pH-Wert über 9 alkalisch, antioxidativ und wasserstoffreich." },
    ],
  },
  it: {
    essentialsHeading: "Linea UFF — Ultrafiltrazione ad Alta Efficienza",
    premiumHeading: "Linea ROF — Osmosi Inversa ad Alta Purezza",
    phHeading: "Scala di pH",
    labelAcido: "Acido",
    labelNeutro: "Neutro",
    labelAlcalino: "Alcalino",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Rimuove iodio, sporco, ruggine, filtra impurità, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Rimuove il cloro, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Con micropori di ultraprecisione, rimuove organismi, sostanze macromolecolari, vermi rossi, virus e batteri.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Regola il range di pH dell'acqua, rendendo l'acqua filtrata alcalina con pH superiore a 9, antiossidante e ricca di idrogeno." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Rimuove iodio, sporco, ruggine, filtra impurità, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Rimuove il cloro, composti chimici, particelle sospese, odori e sapori normalmente presenti nell'acqua del rubinetto." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Sistema che produce acqua con purezza al 99% (priva di virus e batteri fino a 0,5 micron), sviluppato per chi desidera o necessita di consumare acqua estremamente pura.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Regola il range di pH dell'acqua, rendendo l'acqua filtrata alcalina con pH superiore a 9, antiossidante e ricca di idrogeno." },
    ],
  },
  zh: {
    essentialsHeading: "UFF系列 — 高效能超滤净化",
    premiumHeading: "ROF系列 — 高纯度反渗透净化",
    phHeading: "pH值刻度",
    labelAcido: "酸性",
    labelNeutro: "中性",
    labelAlcalino: "碱性",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "去除碘、污垢、铁锈，过滤自来水中通常含有的杂质、化学物质、悬浮颗粒、异味和异味。" },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "去除氯气、化学物质、悬浮颗粒，以及自来水中通常含有的异味和异味。" },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "凭借超精密微孔，去除有机物、大分子物质、红虫、病毒和细菌。", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "调节水的pH范围，使过滤后的水呈碱性，pH值高于9，具有抗氧化性且富含氢。" },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "去除碘、污垢、铁锈，过滤自来水中通常含有的杂质、化学物质、悬浮颗粒、异味和异味。" },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "去除氯气、化学物质、悬浮颗粒，以及自来水中通常含有的异味和异味。" },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "该系统生产纯度达99%的水（去除0.5微米以内的病毒和细菌），专为需要饮用极纯净水的人群而开发。", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "调节水的pH范围，使过滤后的水呈碱性，pH值高于9，具有抗氧化性且富含氢。" },
    ],
  },
  ja: {
    essentialsHeading: "UFFライン — 高性能限外ろ過",
    premiumHeading: "ROFライン — 高純度逆浸透ろ過",
    phHeading: "pH スケール",
    labelAcido: "酸性",
    labelNeutro: "中性",
    labelAlcalino: "アルカリ性",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "水道水に通常含まれるヨウ素、汚れ、錆を除去し、不純物、化学物質、浮遊粒子、臭いおよび異味をろ過します。" },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "水道水に通常含まれる塩素、化学物質、浮遊粒子、臭いおよび異味を除去します。" },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "超精密マイクロポアにより、微生物、高分子物質、赤虫、ウイルス、細菌を除去します。", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "水のpH範囲を調整し、ろ過された水をpH9以上のアルカリ性にし、抗酸化性と水素を豊富に含む水にします。" },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "水道水に通常含まれるヨウ素、汚れ、錆を除去し、不純物、化学物質、浮遊粒子、臭いおよび異味をろ過します。" },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "水道水に通常含まれる塩素、化学物質、浮遊粒子、臭いおよび異味を除去します。" },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "99%の純度の水を生成するシステム（0.5ミクロンまでのウイルスや細菌を除去）で、極めて純粋な水を必要とする方のために開発されました。", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "水のpH範囲を調整し、ろ過された水をpH9以上のアルカリ性にし、抗酸化性と水素を豊富に含む水にします。" },
    ],
  },
  ko: {
    essentialsHeading: "UFF 라인 — 고성능 초미세 여과",
    premiumHeading: "ROF 라인 — 고순도 역삼투 여과",
    phHeading: "pH 척도",
    labelAcido: "산성",
    labelNeutro: "중성",
    labelAlcalino: "알칼리성",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "수돗물에 일반적으로 존재하는 요오드, 먼지, 녹을 제거하고 불순물, 화학 물질, 부유 입자, 냄새 및 맛을 여과합니다." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "수돗물에 일반적으로 존재하는 염소, 화학 물질, 부유 입자, 냄새 및 맛을 제거합니다." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "초정밀 마이크로포어로 유기물, 고분자 물질, 붉은 벌레, 바이러스 및 박테리아를 제거합니다.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "물의 pH 범위를 조절하여 여과된 물을 pH 9 이상의 알칼리성으로 만들고, 항산화 효과와 수소가 풍부한 물로 만듭니다." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "수돗물에 일반적으로 존재하는 요오드, 먼지, 녹을 제거하고 불순물, 화학 물질, 부유 입자, 냄새 및 맛을 여과합니다." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "수돗물에 일반적으로 존재하는 염소, 화학 물질, 부유 입자, 냄새 및 맛을 제거합니다." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "99% 순도의 물을 생산하는 시스템(0.5마이크론까지의 바이러스 및 박테리아 제거)으로, 극도로 순수한 물을 원하거나 필요로 하는 사람들을 위해 개발되었습니다.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "물의 pH 범위를 조절하여 여과된 물을 pH 9 이상의 알칼리성으로 만들고, 항산화 효과와 수소가 풍부한 물로 만듭니다." },
    ],
  },
  sv: {
    essentialsHeading: "UFF-serien — Högpresterande Ultrafiltrering",
    premiumHeading: "ROF-serien — Omvänd Osmos av Hög Renhet",
    phHeading: "pH-skala",
    labelAcido: "Surt",
    labelNeutro: "Neutralt",
    labelAlcalino: "Alkaliskt",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Tar bort jod, smuts, rost, filtrerar orenheter, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt förekommer i kranvatten." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Tar bort klor, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt förekommer i kranvatten." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Med ultraprecisa mikroporer avlägsnas organismer, makromolekylära ämnen, röda maskar, virus och bakterier.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Det justerar vattnets pH-område och gör det filtrerade vattnet alkaliskt med ett pH över 9, antioxidant och väterikt." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Tar bort jod, smuts, rost, filtrerar orenheter, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt förekommer i kranvatten." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Tar bort klor, kemiska föreningar, suspenderade partiklar, lukter och smaker som normalt förekommer i kranvatten." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Ett system som producerar vatten med 99% renhet (fritt från virus och bakterier upp till 0,5 mikron), utvecklat för personer som vill eller behöver dricka extremt rent vatten.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Det justerar vattnets pH-område och gör det filtrerade vattnet alkaliskt med ett pH över 9, antioxidant och väterikt." },
    ],
  },
  fi: {
    essentialsHeading: "UFF-sarja — Korkean suorituskyvyn ultrasuodatus",
    premiumHeading: "ROF-sarja — Korkean puhtauden käänteisosmoosi",
    phHeading: "pH-asteikko",
    labelAcido: "Hapan",
    labelNeutro: "Neutraali",
    labelAlcalino: "Emäksinen",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Poistaa jodin, lian, ruosteen, suodattaa epäpuhtaudet, kemialliset yhdisteet, suspendoituneet hiukkaset, hajut ja maut, joita yleensä esiintyy hanavedessä." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Poistaa kloorin, kemialliset yhdisteet, suspendoituneet hiukkaset, hajut ja maut, joita yleensä esiintyy hanavedessä." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Ultratarkoilla mikrohuokosilla poistetaan organismit, makromolekyyliset aineet, punaiset madot, virukset ja bakteerit.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Se säätää veden pH-aluetta, tehden suodatetusta vedestä emäksistä pH-arvolla yli 9, antioksidanttista ja vetypitoista." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Poistaa jodin, lian, ruosteen, suodattaa epäpuhtaudet, kemialliset yhdisteet, suspendoituneet hiukkaset, hajut ja maut, joita yleensä esiintyy hanavedessä." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Poistaa kloorin, kemialliset yhdisteet, suspendoituneet hiukkaset, hajut ja maut, joita yleensä esiintyy hanavedessä." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Järjestelmä, joka tuottaa vettä 99% puhtaudella (vapaana viruksista ja bakteereista enintään 0,5 mikronia), kehitetty henkilöille, jotka haluavat tai tarvitsevat erittäin puhdasta vettä.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Se säätää veden pH-aluetta, tehden suodatetusta vedestä emäksistä pH-arvolla yli 9, antioksidanttista ja vetypitoista." },
    ],
  },
  ru: {
    essentialsHeading: "Линейка UFF — Высокопроизводительная ультрафильтрация",
    premiumHeading: "Линейка ROF — Обратный осмос высокой чистоты",
    phHeading: "Шкала pH",
    labelAcido: "Кислотный",
    labelNeutro: "Нейтральный",
    labelAlcalino: "Щелочной",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Удаляет йод, грязь, ржавчину, фильтрует примеси, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Удаляет хлор, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Благодаря ультраточным микропорам удаляет организмы, макромолекулярные вещества, красных червей, вирусы и бактерии.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Регулирует диапазон pH воды, делая отфильтрованную воду щелочной с pH выше 9, антиоксидантной и богатой водородом." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Удаляет йод, грязь, ржавчину, фильтрует примеси, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Удаляет хлор, химические соединения, взвешенные частицы, запахи и привкусы, обычно присутствующие в водопроводной воде." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Система, производящая воду с чистотой 99% (без вирусов и бактерий размером до 0,5 микрон), разработана для людей, желающих или нуждающихся в потреблении исключительно чистой воды.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Регулирует диапазон pH воды, делая отфильтрованную воду щелочной с pH выше 9, антиоксидантной и богатой водородом." },
    ],
  },
  ro: {
    essentialsHeading: "Linia UFF — Ultrafiltrare de Înaltă Performanță",
    premiumHeading: "Linia ROF — Osmoză Inversă de Înaltă Puritate",
    phHeading: "Scala pH",
    labelAcido: "Acid",
    labelNeutro: "Neutru",
    labelAlcalino: "Alcalin",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Elimina iodul, murdaria, rugina, filtreaza impuritatile, compusii chimici, particulele suspendate, mirosurile si gusturile prezente in mod normal in apa de la robinet." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Elimina clorul, compusii chimici, particulele suspendate, mirosurile si gusturile prezente in mod normal in apa de la robinet." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Cu micropori de ultraprecizie, elimina organismele, substantele macromoleculare, viermii rosii, virusurile si bacteriile.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ajusteaza intervalul de pH al apei, facand apa filtrata alcalina cu pH peste 9, antioxidanta si bogata in hidrogen." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Elimina iodul, murdaria, rugina, filtreaza impuritatile, compusii chimici, particulele suspendate, mirosurile si gusturile prezente in mod normal in apa de la robinet." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Elimina clorul, compusii chimici, particulele suspendate, mirosurile si gusturile prezente in mod normal in apa de la robinet." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Sistem care produce apa cu puritate de 99% (lipsita de virusuri si bacterii de pana la 0,5 microni), dezvoltat pentru persoanele care doresc sau au nevoie de apa extrem de pura.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ajusteaza intervalul de pH al apei, facand apa filtrata alcalina cu pH peste 9, antioxidanta si bogata in hidrogen." },
    ],
  },
  he: {
    essentialsHeading: "קו UFF — אולטרה-פילטרציה בביצועים גבוהים",
    premiumHeading: "קו ROF — אוסמוזה הפוכה בטוהר גבוה",
    phHeading: "סולם pH",
    labelAcido: "חומצי",
    labelNeutro: "נייטרלי",
    labelAlcalino: "בסיסי",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "מסיר יוד, לכלוך, חלודה, מסנן אי-ניקיון, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים הנמצאים בדרך כלל במי ברז." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "מסיר כלור, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים הנמצאים בדרך כלל במי ברז." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "באמצעות מיקרו-נקבוביות בדיוק גבוה, מסיר אורגניזמים, חומרים מקרומולקולריים, תולעים אדומים, וירוסים ובקטריות.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "הוא מכוון את טווח ה-pH של המים, הופך את המים המסוננים לבסיסיים עם pH מעל 9, נוגד חמצון ועשיר במימן." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "מסיר יוד, לכלוך, חלודה, מסנן אי-ניקיון, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים הנמצאים בדרך כלל במי ברז." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "מסיר כלור, תרכובות כימיות, חלקיקים מרחפים, ריחות וטעמים הנמצאים בדרך כלל במי ברז." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "מערכת המייצרת מים בטוהר 99% (ללא וירוסים ובקטריות עד 0.5 מיקרון), פותחה עבור אנשים הרוצים או הזקוקים לצריכת מים טהורים במיוחד.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "הוא מכוון את טווח ה-pH של המים, הופך את המים המסוננים לבסיסיים עם pH מעל 9, נוגד חמצון ועשיר במימן." },
    ],
  },
  "pt-pt": {
    essentialsHeading: "Linha UFF — Ultrafiltração de Alta Performance",
    premiumHeading: "Linha ROF — Osmose Inversa de Alta Pureza",
    phHeading: "Escala de pH",
    labelAcido: "Ácido",
    labelNeutro: "Neutro",
    labelAlcalino: "Alcalino",
    essentials: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Remove iodo, sujidade, ferrugem, filtra impurezas, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Remove o cloro, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira." },
      { num: "03", title: "UFF - Ultra Filtration Filter", desc: "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias.", highlight: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ajusta a gama de pH da água, tornando a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogénio." },
    ],
    premium: [
      { num: "01", title: "PPF - Polypropilene Filter", desc: "Remove iodo, sujidade, ferrugem, filtra impurezas, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira." },
      { num: "02", title: "ACF - Anti-Scale Activated Block Carbon Filter", desc: "Remove o cloro, compostos químicos, partículas em suspensão, odores e sabores normalmente presentes na água da torneira." },
      { num: "03", title: "ROF - Reverse Osmose Filter", desc: "Sistema que produz água com 99% de pureza (isenta de vírus e bactérias até 0,5 microns), foi desenvolvido para servir pessoas que queiram ou necessitem do consumo de uma água extremamente pura.", highlight: true, gradient: true },
      { num: "04", title: "AAF - Alkaline Antioxidant Filter", desc: "Ajusta a gama de pH da água, tornando a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogénio." },
    ],
  },
};

const phColors = [
  "#dc2429", "#e3372a", "#ef5d24", "#f5841b", "#f9a621",
  "#fecb15", "#5fbd02", "#006eaf", "#4d5daa", "#7a459c",
];

function FilterCard({ card }: { card: FilterCard }) {
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
            {essentials.map((c, i) => <FilterCard key={i} card={c} />)}
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
            {premium.map((c, i) => <FilterCard key={i} card={c} />)}
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
