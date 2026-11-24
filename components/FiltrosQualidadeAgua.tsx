"use client";
import Img from "@/components/ui/Img";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// Highlights (Figma 4533:31945) — sizes are each SVG's native proportion
const FEATURE_ICONS = [
  { src: "/figma-assets/icon-feature-water.svg",   w: 42, h: 42 },
  { src: "/figma-assets/icon-feature-filters-blue.svg", w: 42, h: 40 },
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
  benefits: [string, string, string, string];
  phHeading: string;
  acid: string;
  neutral: string;
  alkaline: string;
  features: { title: string; desc: string }[];
}> = {
  pt: {
    bottledTitle: "Água engarrafada",
    bottledNote: "(pode variar conforme a marca)",
    acquafySub: "Água alcalina rica em minerais",
    benefits: ["Água rica em hidrogênio", "Alcalina, pH acima de 9", "Antioxidante e ionizada", "Enriquecida com cálcio, magnésio e potássio"],
    phHeading: "Escala de pH da água",
    acid: "Ácido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Água natural tratada", desc: "Pura, com minerais e excelente sabor" },
      { title: "4 filtros de alta performance", desc: "Retém vírus, bactérias e toxinas em 20 estágios de tratamento" },
      { title: "Menos garrafas plásticas", desc: "Mais economia e menos impacto no meio ambiente" },
      { title: "Design moderno e sofisticado", desc: "Compacto, elegante e ideal para sua cozinha" },
      { title: "Instalação Plug & Play", desc: "Você mesmo instala, sem depender de técnico" },
    ],
  },
  "pt-pt": {
    bottledTitle: "Água engarrafada",
    bottledNote: "(pode variar consoante a marca)",
    acquafySub: "Água alcalina rica em minerais",
    benefits: ["Água rica em hidrogénio", "Alcalina, pH acima de 9", "Antioxidante e ionizada", "Enriquecida com cálcio, magnésio e potássio"],
    phHeading: "Escala de pH da água",
    acid: "Ácido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Água natural tratada", desc: "Pura, com minerais e excelente sabor" },
      { title: "4 filtros de alto desempenho", desc: "Retém vírus, bactérias e toxinas em 20 fases de tratamento" },
      { title: "Menos garrafas de plástico", desc: "Mais poupança e menor impacto no ambiente" },
      { title: "Design moderno e sofisticado", desc: "Compacto, elegante e ideal para a sua cozinha" },
      { title: "Instalação Plug & Play", desc: "Instale por si, sem depender de técnico" },
    ],
  },
  en: {
    bottledTitle: "Bottled water",
    bottledNote: "(may vary by brand)",
    acquafySub: "Alkaline, mineral-rich water",
    benefits: ["Hydrogen-rich water", "Alkaline, pH above 9", "Antioxidant and ionized", "Enriched with calcium, magnesium and potassium"],
    phHeading: "Water pH scale",
    acid: "Acid",
    neutral: "Neutral",
    alkaline: "Alkaline",
    features: [
      { title: "Treated natural water", desc: "Pure, with minerals and excellent taste" },
      { title: "4 high-performance filters", desc: "Retains viruses, bacteria and toxins across 20 treatment stages" },
      { title: "Fewer plastic bottles", desc: "More savings and less environmental impact" },
      { title: "Modern, sophisticated design", desc: "Compact, elegant and ideal for your kitchen" },
      { title: "Plug & Play installation", desc: "Install it yourself, no technician needed" },
    ],
  },
  "en-gb": {
    bottledTitle: "Bottled water",
    bottledNote: "(may vary by brand)",
    acquafySub: "Alkaline, mineral-rich water",
    benefits: ["Hydrogen-rich water", "Alkaline, pH above 9", "Antioxidant and ionised", "Enriched with calcium, magnesium and potassium"],
    phHeading: "Water pH scale",
    acid: "Acid",
    neutral: "Neutral",
    alkaline: "Alkaline",
    features: [
      { title: "Treated natural water", desc: "Pure, with minerals and excellent taste" },
      { title: "4 high-performance filters", desc: "Retains viruses, bacteria and toxins across 20 treatment stages" },
      { title: "Fewer plastic bottles", desc: "More savings and less environmental impact" },
      { title: "Modern, sophisticated design", desc: "Compact, elegant and ideal for your kitchen" },
      { title: "Plug & Play installation", desc: "Install it yourself, no technician needed" },
    ],
  },
  es: {
    bottledTitle: "Agua embotellada",
    bottledNote: "(puede variar según la marca)",
    acquafySub: "Agua alcalina rica en minerales",
    benefits: ["Agua rica en hidrógeno", "Alcalina, pH superior a 9", "Antioxidante e ionizada", "Enriquecida con calcio, magnesio y potasio"],
    phHeading: "Escala de pH del agua",
    acid: "Ácido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Agua natural tratada", desc: "Pura, con minerales y excelente sabor" },
      { title: "4 filtros de alto rendimiento", desc: "Retiene virus, bacterias y toxinas en 20 etapas de tratamiento" },
      { title: "Menos botellas de plástico", desc: "Más ahorro y menos impacto ambiental" },
      { title: "Diseño moderno y sofisticado", desc: "Compacto, elegante e ideal para tu cocina" },
      { title: "Instalación Plug & Play", desc: "Instálala tú mismo, sin depender de un técnico" },
    ],
  },
  fr: {
    bottledTitle: "Eau en bouteille",
    bottledNote: "(peut varier selon la marque)",
    acquafySub: "Eau alcaline riche en minéraux",
    benefits: ["Eau riche en hydrogène", "Alcaline, pH supérieur à 9", "Antioxydante et ionisée", "Enrichie en calcium, magnésium et potassium"],
    phHeading: "Échelle de pH de l'eau",
    acid: "Acide",
    neutral: "Neutre",
    alkaline: "Alcalin",
    features: [
      { title: "Eau naturelle traitée", desc: "Pure, avec des minéraux et un excellent goût" },
      { title: "4 filtres haute performance", desc: "Retient virus, bactéries et toxines en 20 étapes de traitement" },
      { title: "Moins de bouteilles en plastique", desc: "Plus d'économies et moins d'impact sur l'environnement" },
      { title: "Design moderne et sophistiqué", desc: "Compact, élégant et idéal pour votre cuisine" },
      { title: "Installation Plug & Play", desc: "Installez-le vous-même, sans technicien" },
    ],
  },
  de: {
    bottledTitle: "Abgefülltes Wasser",
    bottledNote: "(kann je nach Marke variieren)",
    acquafySub: "Alkalisches, mineralstoffreiches Wasser",
    benefits: ["Wasserstoffreiches Wasser", "Alkalisch, pH-Wert über 9", "Antioxidativ und ionisiert", "Angereichert mit Calcium, Magnesium und Kalium"],
    phHeading: "pH-Skala des Wassers",
    acid: "Sauer",
    neutral: "Neutral",
    alkaline: "Alkalisch",
    features: [
      { title: "Aufbereitetes Naturwasser", desc: "Rein, mit Mineralstoffen und hervorragendem Geschmack" },
      { title: "4 Hochleistungsfilter", desc: "Hält Viren, Bakterien und Giftstoffe in 20 Aufbereitungsstufen zurück" },
      { title: "Weniger Plastikflaschen", desc: "Mehr Ersparnis und weniger Umweltbelastung" },
      { title: "Modernes, elegantes Design", desc: "Kompakt, elegant und ideal für Ihre Küche" },
      { title: "Plug-&-Play-Installation", desc: "Selbst installieren – ganz ohne Techniker" },
    ],
  },
  it: {
    bottledTitle: "Acqua in bottiglia",
    bottledNote: "(può variare in base alla marca)",
    acquafySub: "Acqua alcalina ricca di minerali",
    benefits: ["Acqua ricca di idrogeno", "Alcalina, pH superiore a 9", "Antiossidante e ionizzata", "Arricchita con calcio, magnesio e potassio"],
    phHeading: "Scala di pH dell'acqua",
    acid: "Acido",
    neutral: "Neutro",
    alkaline: "Alcalino",
    features: [
      { title: "Acqua naturale trattata", desc: "Pura, con minerali e ottimo sapore" },
      { title: "4 filtri ad alte prestazioni", desc: "Trattiene virus, batteri e tossine in 20 stadi di trattamento" },
      { title: "Meno bottiglie di plastica", desc: "Più risparmio e meno impatto sull'ambiente" },
      { title: "Design moderno e sofisticato", desc: "Compatto, elegante e ideale per la tua cucina" },
      { title: "Installazione Plug & Play", desc: "Installala da solo, senza bisogno di un tecnico" },
    ],
  },
  zh: {
    bottledTitle: "瓶装水",
    bottledNote: "（因品牌而异）",
    acquafySub: "富含矿物质的碱性水",
    benefits: ["富氢水", "碱性，pH 值高于 9", "抗氧化并离子化", "富含钙、镁、钾"],
    phHeading: "水的 pH 值刻度",
    acid: "酸性",
    neutral: "中性",
    alkaline: "碱性",
    features: [
      { title: "经处理的天然水", desc: "纯净，含矿物质，口感出色" },
      { title: "4 个高性能滤芯", desc: "20 道处理工序，拦截病毒、细菌和毒素" },
      { title: "减少塑料瓶", desc: "更省钱，更环保" },
      { title: "现代精致的设计", desc: "紧凑、优雅，适合您的厨房" },
      { title: "即插即用安装", desc: "自行安装，无需技术人员" },
    ],
  },
  ja: {
    bottledTitle: "ボトルウォーター",
    bottledNote: "（ブランドにより異なります）",
    acquafySub: "ミネラル豊富なアルカリ性の水",
    benefits: ["水素リッチウォーター", "アルカリ性（pH 9以上）", "抗酸化・イオン化", "カルシウム・マグネシウム・カリウム配合"],
    phHeading: "水の pH スケール",
    acid: "酸性",
    neutral: "中性",
    alkaline: "アルカリ性",
    features: [
      { title: "処理された天然水", desc: "純粋でミネラルを含み、優れた味わい" },
      { title: "高性能フィルター4つ", desc: "20段階の浄水で、ウイルス・細菌・毒素を取り除きます" },
      { title: "プラスチックボトルを削減", desc: "経済的で環境への負荷も軽減" },
      { title: "モダンで洗練されたデザイン", desc: "コンパクトでエレガント、キッチンに最適" },
      { title: "プラグ＆プレイ設置", desc: "ご自身で設置でき、技術者は不要" },
    ],
  },
  ko: {
    bottledTitle: "생수",
    bottledNote: "(브랜드에 따라 다를 수 있음)",
    acquafySub: "미네랄이 풍부한 알칼리수",
    benefits: ["수소가 풍부한 물", "알칼리성, pH 9 이상", "항산화 및 이온화", "칼슘, 마그네슘, 칼륨 강화"],
    phHeading: "물의 pH 척도",
    acid: "산성",
    neutral: "중성",
    alkaline: "알칼리성",
    features: [
      { title: "처리된 천연수", desc: "순수하고 미네랄이 풍부하며 뛰어난 맛" },
      { title: "고성능 필터 4개", desc: "20단계 정수 과정으로 바이러스, 박테리아, 독소를 걸러냅니다" },
      { title: "플라스틱병 사용 감소", desc: "더 경제적이고 환경 영향도 적게" },
      { title: "모던하고 세련된 디자인", desc: "콤팩트하고 우아하여 주방에 이상적" },
      { title: "플러그 앤 플레이 설치", desc: "직접 설치하므로 기사가 필요 없습니다" },
    ],
  },
  sv: {
    bottledTitle: "Flaskvatten",
    bottledNote: "(kan variera beroende på märke)",
    acquafySub: "Alkaliskt, mineralrikt vatten",
    benefits: ["Vätgasrikt vatten", "Alkaliskt, pH över 9", "Antioxidativt och joniserat", "Berikat med kalcium, magnesium och kalium"],
    phHeading: "Vattnets pH-skala",
    acid: "Surt",
    neutral: "Neutralt",
    alkaline: "Alkaliskt",
    features: [
      { title: "Behandlat naturligt vatten", desc: "Rent, med mineraler och utmärkt smak" },
      { title: "4 högpresterande filter", desc: "Fångar upp virus, bakterier och toxiner i 20 behandlingssteg" },
      { title: "Färre plastflaskor", desc: "Mer besparing och mindre miljöpåverkan" },
      { title: "Modern och sofistikerad design", desc: "Kompakt, elegant och perfekt för ditt kök" },
      { title: "Plug & Play-installation", desc: "Installera själv, utan tekniker" },
    ],
  },
  fi: {
    bottledTitle: "Pullovesi",
    bottledNote: "(voi vaihdella merkin mukaan)",
    acquafySub: "Alkalinen, kivennäisaineita sisältävä vesi",
    benefits: ["Vetyrikas vesi", "Alkalinen, pH yli 9", "Antioksidatiivinen ja ionisoitu", "Rikastettu kalsiumilla, magnesiumilla ja kaliumilla"],
    phHeading: "Veden pH-asteikko",
    acid: "Hapan",
    neutral: "Neutraali",
    alkaline: "Emäksinen",
    features: [
      { title: "Käsitelty luonnonvesi", desc: "Puhdasta, kivennäisaineita ja erinomainen maku" },
      { title: "4 korkean suorituskyvyn suodatinta", desc: "Pidättää virukset, bakteerit ja toksiinit 20 käsittelyvaiheessa" },
      { title: "Vähemmän muovipulloja", desc: "Enemmän säästöä ja pienempi ympäristövaikutus" },
      { title: "Moderni ja hienostunut muotoilu", desc: "Kompakti, tyylikäs ja sopii keittiöösi" },
      { title: "Plug & Play -asennus", desc: "Asenna itse, ilman asentajaa" },
    ],
  },
  ru: {
    bottledTitle: "Бутилированная вода",
    bottledNote: "(может отличаться в зависимости от бренда)",
    acquafySub: "Щелочная вода, богатая минералами",
    benefits: ["Вода, богатая водородом", "Щелочная, pH выше 9", "Антиоксидантная и ионизированная", "Обогащена кальцием, магнием и калием"],
    phHeading: "Шкала pH воды",
    acid: "Кислотный",
    neutral: "Нейтральный",
    alkaline: "Щелочной",
    features: [
      { title: "Очищенная природная вода", desc: "Чистая, с минералами и отличным вкусом" },
      { title: "4 высокопроизводительных фильтра", desc: "Задерживает вирусы, бактерии и токсины за 20 ступеней очистки" },
      { title: "Меньше пластиковых бутылок", desc: "Больше экономии и меньше вреда для окружающей среды" },
      { title: "Современный и изысканный дизайн", desc: "Компактный, элегантный и идеален для вашей кухни" },
      { title: "Установка Plug & Play", desc: "Установите сами, без вызова мастера" },
    ],
  },
  ro: {
    bottledTitle: "Apa imbuteliata",
    bottledNote: "(poate varia in functie de marca)",
    acquafySub: "Apa alcalina bogata in minerale",
    benefits: ["Apa bogata in hidrogen", "Alcalina, pH peste 9", "Antioxidanta si ionizata", "Imbogatita cu calciu, magneziu si potasiu"],
    phHeading: "Scala pH a apei",
    acid: "Acid",
    neutral: "Neutru",
    alkaline: "Alcalin",
    features: [
      { title: "Apa naturala tratata", desc: "Pura, cu minerale si gust excelent" },
      { title: "4 filtre de inalta performanta", desc: "Retine virusii, bacteriile si toxinele in 20 de etape de tratare" },
      { title: "Mai putine sticle de plastic", desc: "Mai multa economie si impact redus asupra mediului" },
      { title: "Design modern si sofisticat", desc: "Compact, elegant si ideal pentru bucataria ta" },
      { title: "Instalare Plug & Play", desc: "Instaleaza singur, fara tehnician" },
    ],
  },
  he: {
    bottledTitle: "מים בבקבוק",
    bottledNote: "(עשוי להשתנות בין מותגים)",
    acquafySub: "מים אלקליים עשירים במינרלים",
    benefits: ["מים עשירים במימן", "אלקליים, pH מעל 9", "נוגדי חמצון ומיוננים", "מועשרים בסידן, מגנזיום ואשלגן"],
    phHeading: "סולם pH של המים",
    acid: "חומצי",
    neutral: "נייטרלי",
    alkaline: "בסיסי",
    features: [
      { title: "מים טבעיים מטופלים", desc: "טהורים, עם מינרלים וטעם מצוין" },
      { title: "4 מסננים בביצועים גבוהים", desc: "לוכד וירוסים, חיידקים וטוקסינים ב-20 שלבי טיפול" },
      { title: "פחות בקבוקי פלסטיק", desc: "יותר חיסכון והשפעה סביבתית נמוכה יותר" },
      { title: "עיצוב מודרני ומתוחכם", desc: "קומפקטי, אלגנטי ומושלם למטבח שלך" },
      { title: "התקנת Plug & Play", desc: "מתקינים בעצמכם, בלי צורך בטכנאי" },
    ],
  },
};

/** Range marker: a 1px gradient line with a straight vertical tick at each end (dimension-line style). The line stretches with
 *  its container; the ticks keep their height. */
function RangeMarker({ from, to }: { from: string; to: string }) {
  return (
    <div aria-hidden="true" className="flex items-center w-full shrink-0 h-[15px]">
      <div className="w-px h-full shrink-0" style={{ backgroundColor: from }} />
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${from}, ${to})` }} />
      <div className="w-px h-full shrink-0" style={{ backgroundColor: to }} />
    </div>
  );
}

/** Short arrow pointing up from the "Neutro" label to the pH 7 block. */
function UpArrow({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="11" height="15" viewBox="0 0 11 15" fill="none" className="block shrink-0">
      <path d="M5.5 14.5 V1.5 M1.5 5.5 L5.5 1.5 L9.5 5.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
            <div key={ic.src} className="grid grid-rows-subgrid row-span-3 gap-y-[10px] items-start justify-items-center text-center">
              <FigmaIcon src={ic.src} size={40} aspectW={ic.w} aspectH={ic.h} />
              <p className="font-avenir-heavy text-f20 leading-l24 text-[#1f2e91]">{t.features[i].title}</p>
              <p className="font-avenir-roman text-f16 leading-l20 text-[#2a2a2b]">{t.features[i].desc}</p>
            </div>
          ))}
        </div>

        {/* Water benefits (left) and pH scale with comparison (right) */}
        <div className="flex flex-col lg:flex-row gap-[20px] items-stretch w-full">

          {/* Water benefits */}
          <div className="card-row [--card-min:160px] auto-rows-fr gap-[20px] items-stretch justify-center w-full lg:basis-[calc(50%-10px)] lg:grow-0 lg:shrink-0 min-w-0">
            {BENEFIT_ICONS.map((ic, i) => (
              <div key={ic.src} className="bg-white flex flex-col gap-[10px] items-center justify-start lg:justify-center min-w-0 px-[20px] py-[25px] rounded-[12px] text-center">
                <div className="flex items-center justify-center h-[46px] w-full shrink-0">
                  <FigmaIcon src={ic.src} size={40} aspectW={ic.w} aspectH={ic.h} />
                </div>
                <p className="font-avenir-heavy text-f20 leading-l24 text-[#1f2e91] min-h-[2lh] flex items-center justify-center">{t.benefits[i]}</p>
              </div>
            ))}
          </div>

          <div className="bg-white flex flex-col justify-between gap-[20px] flex-1 min-w-0 px-[20px] py-[25px] rounded-[16px]">
            <h2 className="font-avenir-heavy text-f22 leading-l28 md:text-f26 md:leading-l34 text-[#1f2e91] text-center w-full">
              {t.phHeading}
            </h2>

            {/* Scale */}
            <div className="flex flex-col gap-[20px] w-full">
              <div className="grid overflow-hidden rounded-[8px] w-full" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                {PH_STEPS.map((s) => (
                  <div key={s.n} className="flex flex-col items-center justify-center px-[4px] py-[20px]" style={{ backgroundColor: s.color }}>
                    <span className="font-avenir-black text-f24 leading-l29 sm:text-f32 sm:leading-l39 text-white text-center">{s.n}</span>
                  </div>
                ))}
              </div>
              <div className="grid w-full" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                <div className="flex flex-col gap-[10px] items-center justify-center" style={{ gridColumn: "1 / span 3" }}>
                  <RangeMarker from="#DC2429" to="#FECB15" />
                  <span className="font-avenir-heavy text-f16 leading-l20 text-[#333] text-center">{t.acid}</span>
                </div>
                <div className="flex flex-col gap-[10px] items-center justify-center">
                  <UpArrow color={PH_STEPS[3].color} />
                  <span className="font-avenir-heavy text-f16 leading-l20 text-[#333] text-center whitespace-nowrap">{t.neutral}</span>
                </div>
                <div className="flex flex-col gap-[10px] items-center justify-center" style={{ gridColumn: "5 / span 3" }}>
                  <RangeMarker from="#7A459C" to="#006EAF" />
                  <span className="font-avenir-heavy text-f16 leading-l20 text-[#333] text-center">{t.alkaline}</span>
                </div>
              </div>
            </div>

            {/* Bottled water x Acquafy Neo UP */}
            <div className="flex flex-col sm:flex-row gap-[20px]">
              <div className="bg-[#f6f9fe] flex flex-col gap-[10px] items-center justify-center flex-1 px-[10px] py-[20px] rounded-[12px] text-center">
                <p className="font-avenir-heavy text-f20 leading-l24 text-[#1f2e91]">{t.bottledTitle}</p>
                <p className="font-avenir-roman text-f16 leading-l20 text-[#2a2a2b]">{t.bottledNote}</p>
                <p className="font-avenir-black text-f32 leading-l39 text-[#dc2429]">{bottledPh}</p>
              </div>
              <div className="bg-[#f6f9fe] flex flex-col gap-[10px] items-center justify-center flex-1 px-[10px] py-[20px] rounded-[12px] text-center">
                <p className="font-avenir-heavy text-f20 leading-l24 text-[#1f2e91]">
                  Acquafy <span className="text-[#0569ff]">Neo UP</span>
                </p>
                <p className="font-avenir-roman text-f16 leading-l20 text-[#2a2a2b]">{t.acquafySub}</p>
                <p
                  className="font-avenir-black text-f32 leading-l39 bg-clip-text text-transparent"
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
