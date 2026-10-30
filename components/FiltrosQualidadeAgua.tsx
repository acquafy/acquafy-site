"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// Highlights (Figma 4533:31945) — sizes are each SVG's native proportion
const FEATURE_ICONS = [
  { src: "/figma-assets/icon-feature-water.svg",   w: 42, h: 42 },
  { src: "/figma-assets/icon-feature-filters.svg", w: 42, h: 40 },
  { src: "/figma-assets/icon-feature-bottles.svg", w: 42, h: 42 },
  { src: "/figma-assets/icon-crown-30px.svg",  w: 42, h: 42 },
  { src: "/figma-assets/icon-feature-plug.svg",    w: 40, h: 42 },
];

// Water benefits (Figma 4522:31849)
const BENEFIT_ICONS = [
  { src: "/figma-assets/icon-benefit-hydrogen.svg",    w: 44,    h: 44 },
  { src: "/figma-assets/icon-benefit-alkaline.svg",    w: 42,    h: 44 },
  { src: "/figma-assets/icon-benefit-antioxidant.svg", w: 51.47, h: 44.9 },
  { src: "/figma-assets/icon-benefit-minerals.svg",    w: 42,    h: 44 },
];

const imgPh           = "/figma-assets/icon-filter-ph.svg";
const imgLineAcido    = "/figma-assets/icon-line-acido.svg";
const imgLineAlcalino = "/figma-assets/icon-line-alcalino.svg";

// Same palette as the full pH scale above, steps 4 to 10
const PH_STEPS = [
  { n: 4,  color: "#f5841b" },
  { n: 5,  color: "#f9a621" },
  { n: 6,  color: "#fecb15" },
  { n: 7,  color: "#5fbd02" },
  { n: 8,  color: "#006eaf" },
  { n: 9,  color: "#4d5daa" },
  { n: 10, color: "#7a459c" },
];

const COMMA_DECIMAL = new Set<Lang>(["pt", "pt-pt", "es", "fr", "de", "it", "sv", "fi", "ru", "ro"]);

const T: Record<Lang, {
  bottledTitle: string;
  bottledNote: string;
  acquafySub: string;
  orpValue: string;
  benefits: [string, string, string, string];
  phHeading: string;
  acid: string;
  neutral: string;
  alkaline: string;
  features: { title: string; desc: string }[];
  phTitle: string;
  phDesc: string;
}> = {
  pt: {
    bottledTitle: "Água engarrafada",
    bottledNote: "(pode variar conforme a marca)",
    acquafySub: "Água alcalina rica em minerais",
    orpValue: "-100 a -200 mV",
    benefits: ["Água rica em hidrogênio", "Alcalina, pH acima de 9", "Antioxidante e ionizada", "Enriquecida com cálcio, magnésio e potássio"],
    phHeading: "Escala de pH da água",
    acid: "Ácido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Água natural tratada", desc: "Pura, com minerais e excelente sabor" },
      { title: "4 filtros de alta performance", desc: "20 estágios de tratamento" },
      { title: "Menos garrafas plásticas", desc: "Mais economia e menos impacto no meio ambiente" },
      { title: "Design moderno e sofisticado", desc: "Compacto, elegante e ideal para sua cozinha" },
      { title: "Instalação Plug & Play", desc: "Realizada pelo próprio cliente" },
    ],
    phTitle: "pH acima de 9",
    phDesc: "Água alcalina, com pH anunciado acima de 9, enriquecida com minerais como cálcio, magnésio e potássio.",
  },
  "pt-pt": {
    bottledTitle: "Água engarrafada",
    bottledNote: "(pode variar consoante a marca)",
    acquafySub: "Água alcalina rica em minerais",
    orpValue: "-100 a -200 mV",
    benefits: ["Água rica em hidrogénio", "Alcalina, pH acima de 9", "Antioxidante e ionizada", "Enriquecida com cálcio, magnésio e potássio"],
    phHeading: "Escala de pH da água",
    acid: "Ácido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Água natural tratada", desc: "Pura, com minerais e excelente sabor" },
      { title: "4 filtros de alto desempenho", desc: "20 fases de tratamento" },
      { title: "Menos garrafas de plástico", desc: "Mais poupança e menor impacto no ambiente" },
      { title: "Design moderno e sofisticado", desc: "Compacto, elegante e ideal para a sua cozinha" },
      { title: "Instalação Plug & Play", desc: "Feita pelo próprio cliente" },
    ],
    phTitle: "pH acima de 9",
    phDesc: "Água alcalina, com pH anunciado acima de 9, enriquecida com minerais como cálcio, magnésio e potássio.",
  },
  en: {
    bottledTitle: "Bottled water",
    bottledNote: "(may vary by brand)",
    acquafySub: "Alkaline, mineral-rich water",
    orpValue: "-100 to -200 mV",
    benefits: ["Hydrogen-rich water", "Alkaline, pH above 9", "Antioxidant and ionized", "Enriched with calcium, magnesium and potassium"],
    phHeading: "Water pH scale",
    acid: "Acid",
    neutral: "Neutral",
    alkaline: "Alkaline",
    features: [
      { title: "Treated natural water", desc: "Pure, with minerals and excellent taste" },
      { title: "4 high-performance filters", desc: "20 treatment stages" },
      { title: "Fewer plastic bottles", desc: "More savings and less environmental impact" },
      { title: "Modern, sophisticated design", desc: "Compact, elegant and ideal for your kitchen" },
      { title: "Plug & Play installation", desc: "Done by the customer" },
    ],
    phTitle: "pH above 9",
    phDesc: "Alkaline water, with a stated pH above 9, enriched with minerals such as calcium, magnesium and potassium.",
  },
  "en-gb": {
    bottledTitle: "Bottled water",
    bottledNote: "(may vary by brand)",
    acquafySub: "Alkaline, mineral-rich water",
    orpValue: "-100 to -200 mV",
    benefits: ["Hydrogen-rich water", "Alkaline, pH above 9", "Antioxidant and ionised", "Enriched with calcium, magnesium and potassium"],
    phHeading: "Water pH scale",
    acid: "Acid",
    neutral: "Neutral",
    alkaline: "Alkaline",
    features: [
      { title: "Treated natural water", desc: "Pure, with minerals and excellent taste" },
      { title: "4 high-performance filters", desc: "20 treatment stages" },
      { title: "Fewer plastic bottles", desc: "More savings and less environmental impact" },
      { title: "Modern, sophisticated design", desc: "Compact, elegant and ideal for your kitchen" },
      { title: "Plug & Play installation", desc: "Done by the customer" },
    ],
    phTitle: "pH above 9",
    phDesc: "Alkaline water, with a stated pH above 9, enriched with minerals such as calcium, magnesium and potassium.",
  },
  es: {
    bottledTitle: "Agua embotellada",
    bottledNote: "(puede variar según la marca)",
    acquafySub: "Agua alcalina rica en minerales",
    orpValue: "-100 a -200 mV",
    benefits: ["Agua rica en hidrógeno", "Alcalina, pH superior a 9", "Antioxidante e ionizada", "Enriquecida con calcio, magnesio y potasio"],
    phHeading: "Escala de pH del agua",
    acid: "Ácido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Agua natural tratada", desc: "Pura, con minerales y excelente sabor" },
      { title: "4 filtros de alto rendimiento", desc: "20 etapas de tratamiento" },
      { title: "Menos botellas de plástico", desc: "Más ahorro y menos impacto ambiental" },
      { title: "Diseño moderno y sofisticado", desc: "Compacto, elegante e ideal para tu cocina" },
      { title: "Instalación Plug & Play", desc: "Realizada por el propio cliente" },
    ],
    phTitle: "pH superior a 9",
    phDesc: "Agua alcalina, con pH anunciado superior a 9, enriquecida con minerales como calcio, magnesio y potasio.",
  },
  fr: {
    bottledTitle: "Eau en bouteille",
    bottledNote: "(peut varier selon la marque)",
    acquafySub: "Eau alcaline riche en minéraux",
    orpValue: "-100 à -200 mV",
    benefits: ["Eau riche en hydrogène", "Alcaline, pH supérieur à 9", "Antioxydante et ionisée", "Enrichie en calcium, magnésium et potassium"],
    phHeading: "Échelle de pH de l'eau",
    acid: "Acide",
    neutral: "Neutre",
    alkaline: "Alcalin",
    features: [
      { title: "Eau naturelle traitée", desc: "Pure, avec des minéraux et un excellent goût" },
      { title: "4 filtres haute performance", desc: "20 étapes de traitement" },
      { title: "Moins de bouteilles en plastique", desc: "Plus d'économies et moins d'impact sur l'environnement" },
      { title: "Design moderne et sophistiqué", desc: "Compact, élégant et idéal pour votre cuisine" },
      { title: "Installation Plug & Play", desc: "Réalisée par le client lui-même" },
    ],
    phTitle: "pH supérieur à 9",
    phDesc: "Eau alcaline, avec un pH annoncé supérieur à 9, enrichie en minéraux comme le calcium, le magnésium et le potassium.",
  },
  de: {
    bottledTitle: "Abgefülltes Wasser",
    bottledNote: "(kann je nach Marke variieren)",
    acquafySub: "Alkalisches, mineralstoffreiches Wasser",
    orpValue: "-100 bis -200 mV",
    benefits: ["Wasserstoffreiches Wasser", "Alkalisch, pH-Wert über 9", "Antioxidativ und ionisiert", "Angereichert mit Calcium, Magnesium und Kalium"],
    phHeading: "pH-Skala des Wassers",
    acid: "Sauer",
    neutral: "Neutral",
    alkaline: "Alkalisch",
    features: [
      { title: "Aufbereitetes Naturwasser", desc: "Rein, mit Mineralstoffen und hervorragendem Geschmack" },
      { title: "4 Hochleistungsfilter", desc: "20 Aufbereitungsstufen" },
      { title: "Weniger Plastikflaschen", desc: "Mehr Ersparnis und weniger Umweltbelastung" },
      { title: "Modernes, elegantes Design", desc: "Kompakt, elegant und ideal für Ihre Küche" },
      { title: "Plug-&-Play-Installation", desc: "Vom Kunden selbst durchgeführt" },
    ],
    phTitle: "pH-Wert über 9",
    phDesc: "Alkalisches Wasser mit einem angegebenen pH-Wert über 9, angereichert mit Mineralstoffen wie Calcium, Magnesium und Kalium.",
  },
  it: {
    bottledTitle: "Acqua in bottiglia",
    bottledNote: "(può variare in base alla marca)",
    acquafySub: "Acqua alcalina ricca di minerali",
    orpValue: "da -100 a -200 mV",
    benefits: ["Acqua ricca di idrogeno", "Alcalina, pH superiore a 9", "Antiossidante e ionizzata", "Arricchita con calcio, magnesio e potassio"],
    phHeading: "Scala di pH dell'acqua",
    acid: "Acido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Acqua naturale trattata", desc: "Pura, con minerali e ottimo sapore" },
      { title: "4 filtri ad alte prestazioni", desc: "20 stadi di trattamento" },
      { title: "Meno bottiglie di plastica", desc: "Più risparmio e meno impatto sull'ambiente" },
      { title: "Design moderno e sofisticato", desc: "Compatto, elegante e ideale per la tua cucina" },
      { title: "Installazione Plug & Play", desc: "Eseguita dal cliente stesso" },
    ],
    phTitle: "pH superiore a 9",
    phDesc: "Acqua alcalina, con pH dichiarato superiore a 9, arricchita con minerali come calcio, magnesio e potassio.",
  },
  zh: {
    bottledTitle: "瓶装水",
    bottledNote: "（因品牌而异）",
    acquafySub: "富含矿物质的碱性水",
    orpValue: "-100 至 -200 mV",
    benefits: ["富氢水", "碱性，pH 值高于 9", "抗氧化并离子化", "富含钙、镁、钾"],
    phHeading: "水的 pH 值刻度",
    acid: "酸性",
    neutral: "中性",
    alkaline: "碱性",
    features: [
      { title: "经处理的天然水", desc: "纯净，含矿物质，口感出色" },
      { title: "4 个高性能滤芯", desc: "20 道处理工序" },
      { title: "减少塑料瓶", desc: "更省钱，更环保" },
      { title: "现代精致的设计", desc: "紧凑、优雅，适合您的厨房" },
      { title: "即插即用安装", desc: "由用户自行完成" },
    ],
    phTitle: "pH 值高于 9",
    phDesc: "碱性水，标称 pH 值高于 9，富含钙、镁、钾等矿物质。",
  },
  ja: {
    bottledTitle: "ボトルウォーター",
    bottledNote: "（ブランドにより異なります）",
    acquafySub: "ミネラル豊富なアルカリ性の水",
    orpValue: "-100 ～ -200 mV",
    benefits: ["水素リッチウォーター", "アルカリ性（pH 9以上）", "抗酸化・イオン化", "カルシウム・マグネシウム・カリウム配合"],
    phHeading: "水の pH スケール",
    acid: "酸性",
    neutral: "中性",
    alkaline: "アルカリ性",
    features: [
      { title: "処理された天然水", desc: "純粋でミネラルを含み、優れた味わい" },
      { title: "高性能フィルター4つ", desc: "20段階の浄水プロセス" },
      { title: "プラスチックボトルを削減", desc: "経済的で環境への負荷も軽減" },
      { title: "モダンで洗練されたデザイン", desc: "コンパクトでエレガント、キッチンに最適" },
      { title: "プラグ＆プレイ設置", desc: "お客様ご自身で設置可能" },
    ],
    phTitle: "pH 9以上",
    phDesc: "表示 pH が 9 を超えるアルカリ性の水で、カルシウム、マグネシウム、カリウムなどのミネラルが豊富です。",
  },
  ko: {
    bottledTitle: "생수",
    bottledNote: "(브랜드에 따라 다를 수 있음)",
    acquafySub: "미네랄이 풍부한 알칼리수",
    orpValue: "-100 ~ -200 mV",
    benefits: ["수소가 풍부한 물", "알칼리성, pH 9 이상", "항산화 및 이온화", "칼슘, 마그네슘, 칼륨 강화"],
    phHeading: "물의 pH 척도",
    acid: "산성",
    neutral: "중성",
    alkaline: "알칼리성",
    features: [
      { title: "처리된 천연수", desc: "순수하고 미네랄이 풍부하며 뛰어난 맛" },
      { title: "고성능 필터 4개", desc: "20단계 정수 과정" },
      { title: "플라스틱병 사용 감소", desc: "더 경제적이고 환경 영향도 적게" },
      { title: "모던하고 세련된 디자인", desc: "콤팩트하고 우아하여 주방에 이상적" },
      { title: "플러그 앤 플레이 설치", desc: "고객이 직접 설치" },
    ],
    phTitle: "pH 9 이상",
    phDesc: "표시 pH가 9 이상인 알칼리수로, 칼슘, 마그네슘, 칼륨 등의 미네랄이 풍부합니다.",
  },
  sv: {
    bottledTitle: "Flaskvatten",
    bottledNote: "(kan variera beroende på märke)",
    acquafySub: "Alkaliskt, mineralrikt vatten",
    orpValue: "-100 till -200 mV",
    benefits: ["Vätgasrikt vatten", "Alkaliskt, pH över 9", "Antioxidativt och joniserat", "Berikat med kalcium, magnesium och kalium"],
    phHeading: "Vattnets pH-skala",
    acid: "Surt",
    neutral: "Neutralt",
    alkaline: "Alkaliskt",
    features: [
      { title: "Behandlat naturligt vatten", desc: "Rent, med mineraler och utmärkt smak" },
      { title: "4 högpresterande filter", desc: "20 behandlingssteg" },
      { title: "Färre plastflaskor", desc: "Mer besparing och mindre miljöpåverkan" },
      { title: "Modern och sofistikerad design", desc: "Kompakt, elegant och perfekt för ditt kök" },
      { title: "Plug & Play-installation", desc: "Utförs av kunden själv" },
    ],
    phTitle: "pH över 9",
    phDesc: "Alkaliskt vatten med angivet pH över 9, berikat med mineraler som kalcium, magnesium och kalium.",
  },
  fi: {
    bottledTitle: "Pullovesi",
    bottledNote: "(voi vaihdella merkin mukaan)",
    acquafySub: "Alkalinen, kivennäisaineita sisältävä vesi",
    orpValue: "-100 – -200 mV",
    benefits: ["Vetyrikas vesi", "Alkalinen, pH yli 9", "Antioksidatiivinen ja ionisoitu", "Rikastettu kalsiumilla, magnesiumilla ja kaliumilla"],
    phHeading: "Veden pH-asteikko",
    acid: "Hapan",
    neutral: "Neutraali",
    alkaline: "Emäksinen",
    features: [
      { title: "Käsitelty luonnonvesi", desc: "Puhdasta, kivennäisaineita ja erinomainen maku" },
      { title: "4 korkean suorituskyvyn suodatinta", desc: "20 käsittelyvaihetta" },
      { title: "Vähemmän muovipulloja", desc: "Enemmän säästöä ja pienempi ympäristövaikutus" },
      { title: "Moderni ja hienostunut muotoilu", desc: "Kompakti, tyylikäs ja sopii keittiöösi" },
      { title: "Plug & Play -asennus", desc: "Asiakas asentaa itse" },
    ],
    phTitle: "pH yli 9",
    phDesc: "Alkalinen vesi, jonka ilmoitettu pH on yli 9, rikastettu kivennäisaineilla kuten kalsiumilla, magnesiumilla ja kaliumilla.",
  },
  ru: {
    bottledTitle: "Бутилированная вода",
    bottledNote: "(может отличаться в зависимости от бренда)",
    acquafySub: "Щелочная вода, богатая минералами",
    orpValue: "от -100 до -200 мВ",
    benefits: ["Вода, богатая водородом", "Щелочная, pH выше 9", "Антиоксидантная и ионизированная", "Обогащена кальцием, магнием и калием"],
    phHeading: "Шкала pH воды",
    acid: "Кислотный",
    neutral: "Нейтральный",
    alkaline: "Щелочной",
    features: [
      { title: "Очищенная природная вода", desc: "Чистая, с минералами и отличным вкусом" },
      { title: "4 высокопроизводительных фильтра", desc: "20 ступеней очистки" },
      { title: "Меньше пластиковых бутылок", desc: "Больше экономии и меньше вреда для окружающей среды" },
      { title: "Современный и изысканный дизайн", desc: "Компактный, элегантный и идеален для вашей кухни" },
      { title: "Установка Plug & Play", desc: "Выполняется самим клиентом" },
    ],
    phTitle: "pH выше 9",
    phDesc: "Щелочная вода с заявленным pH выше 9, обогащённая минералами, такими как кальций, магний и калий.",
  },
  ro: {
    bottledTitle: "Apa imbuteliata",
    bottledNote: "(poate varia in functie de marca)",
    acquafySub: "Apa alcalina bogata in minerale",
    orpValue: "-100 pana la -200 mV",
    benefits: ["Apa bogata in hidrogen", "Alcalina, pH peste 9", "Antioxidanta si ionizata", "Imbogatita cu calciu, magneziu si potasiu"],
    phHeading: "Scala pH a apei",
    acid: "Acid",
    neutral: "Neutru",
    alkaline: "Alcalin",
    features: [
      { title: "Apa naturala tratata", desc: "Pura, cu minerale si gust excelent" },
      { title: "4 filtre de inalta performanta", desc: "20 de etape de tratare" },
      { title: "Mai putine sticle de plastic", desc: "Mai multa economie si impact redus asupra mediului" },
      { title: "Design modern si sofisticat", desc: "Compact, elegant si ideal pentru bucataria ta" },
      { title: "Instalare Plug & Play", desc: "Realizata chiar de client" },
    ],
    phTitle: "pH peste 9",
    phDesc: "Apa alcalina, cu pH declarat peste 9, imbogatita cu minerale precum calciu, magneziu si potasiu.",
  },
  he: {
    bottledTitle: "מים בבקבוק",
    bottledNote: "(עשוי להשתנות בין מותגים)",
    acquafySub: "מים אלקליים עשירים במינרלים",
    orpValue: "‎-100 עד -200 mV",
    benefits: ["מים עשירים במימן", "אלקליים, pH מעל 9", "נוגדי חמצון ומיוננים", "מועשרים בסידן, מגנזיום ואשלגן"],
    phHeading: "סולם pH של המים",
    acid: "חומצי",
    neutral: "נייטרלי",
    alkaline: "בסיסי",
    features: [
      { title: "מים טבעיים מטופלים", desc: "טהורים, עם מינרלים וטעם מצוין" },
      { title: "4 מסננים בביצועים גבוהים", desc: "20 שלבי טיפול" },
      { title: "פחות בקבוקי פלסטיק", desc: "יותר חיסכון והשפעה סביבתית נמוכה יותר" },
      { title: "עיצוב מודרני ומתוחכם", desc: "קומפקטי, אלגנטי ומושלם למטבח שלך" },
      { title: "התקנת Plug & Play", desc: "מתבצעת על ידי הלקוח עצמו" },
    ],
    phTitle: "pH מעל 9",
    phDesc: "מים אלקליים עם pH מוצהר מעל 9, מועשרים במינרלים כמו סידן, מגנזיום ואשלגן.",
  },
};

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white flex flex-col justify-center gap-[20px] flex-[1_0_auto] px-[20px] py-[25px] rounded-[16px]">
      <div className="flex gap-[10px] items-center">
        <FigmaIcon src={imgPh} size={30} aspectW={36} aspectH={38} />
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] text-[#1f2e91]">{title}</p>
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{desc}</p>
    </div>
  );
}

export default function FiltrosQualidadeAgua() {
  const { lang } = useLang();
  const t = T[lang];
  const bottledPh = `pH ~4${COMMA_DECIMAL.has(lang) ? "," : "."}0`;

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] pb-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[20px] max-w-[1400px] px-[20px] py-[40px] rounded-[16px] w-full">

        {/* Highlights: each item spans 3 rows (icon, title, description) of a shared grid, so every
            title takes the height of the tallest one and the descriptions line up */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-[20px] gap-y-[30px] w-full">
          {FEATURE_ICONS.map((ic, i) => (
            <div key={ic.src} className="grid grid-rows-subgrid row-span-3 gap-y-[10px] items-start">
              <FigmaIcon src={ic.src} size={40} aspectW={ic.w} aspectH={ic.h} />
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] text-[#1f2e91]">{t.features[i].title}</p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{t.features[i].desc}</p>
            </div>
          ))}
        </div>

        {/* Water benefits */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {BENEFIT_ICONS.map((ic, i) => (
            <div key={ic.src} className="bg-white flex flex-col gap-[10px] items-center justify-center flex-1 min-w-[160px] px-[20px] py-[25px] rounded-[12px] text-center">
              <FigmaIcon src={ic.src} size={40} aspectW={ic.w} aspectH={ic.h} />
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] text-[#1f2e91]">{t.benefits[i]}</p>
            </div>
          ))}
        </div>

        {/* Left half: pH above 9 and ORP — right half: pH scale and comparison */}
        <div className="flex flex-col lg:flex-row gap-[20px] items-stretch w-full">

          <div className="flex flex-col gap-[20px] lg:basis-[calc(50%-10px)] lg:grow-0 lg:shrink-0 min-w-0">
            <InfoCard title={t.phTitle} desc={t.phDesc} />
            <InfoCard title={`ORP ${t.orpValue}`} desc={t.phDesc} />
          </div>

          <div className="bg-white flex flex-col gap-[20px] lg:basis-[calc(50%-10px)] lg:grow-0 lg:shrink-0 min-w-0 px-[20px] py-[25px] rounded-[16px]">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[22px] leading-[28px] md:text-[26px] md:leading-[34px] text-[#1f2e91] text-center w-full">
              {t.phHeading}
            </h2>

            {/* Scale */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="grid overflow-hidden rounded-[8px] w-full" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                {PH_STEPS.map((s) => (
                  <div key={s.n} className="flex flex-col items-center justify-center px-[4px] py-[20px]" style={{ backgroundColor: s.color }}>
                    <span className="font-['Avenir_LT_Pro:95_Black'] text-[24px] leading-[29px] sm:text-[32px] sm:leading-[39px] text-white text-center">{s.n}</span>
                  </div>
                ))}
              </div>
              <div className="grid w-full" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                <div className="flex flex-col gap-[10px] items-center justify-center" style={{ gridColumn: "1 / span 3" }}>
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute" style={{ inset: "-7.36px -0.12%" }}>
                      <img alt="" className="block max-w-none size-full" src={imgLineAcido} />
                    </div>
                  </div>
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#333] text-center">{t.acid}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#333] text-center">{t.neutral}</span>
                </div>
                <div className="flex flex-col gap-[10px] items-center justify-center" style={{ gridColumn: "5 / span 3" }}>
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute" style={{ inset: "-7.36px -0.24%" }}>
                      <img alt="" className="block max-w-none size-full" src={imgLineAlcalino} />
                    </div>
                  </div>
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#333] text-center">{t.alkaline}</span>
                </div>
              </div>
            </div>

            {/* Bottled water x Acquafy Neo UP */}
            <div className="flex flex-col sm:flex-row gap-[20px]">
              <div className="bg-[#f6f9fe] flex flex-col gap-[10px] items-center justify-center flex-1 px-[10px] py-[20px] rounded-[12px] text-center">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] text-[#1f2e91]">{t.bottledTitle}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{t.bottledNote}</p>
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#dc2429]">{bottledPh}</p>
              </div>
              <div className="bg-[#f6f9fe] flex flex-col gap-[10px] items-center justify-center flex-1 px-[10px] py-[20px] rounded-[12px] text-center">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] text-[#1f2e91]">
                  Acquafy <span className="text-[#0569ff]">Neo UP</span>
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">{t.acquafySub}</p>
                <p
                  className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to right, #0041ff, #3f8cff)" }}
                >
                  pH 9+
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
