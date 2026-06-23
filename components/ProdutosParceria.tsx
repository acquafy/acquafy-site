'use client'
import { useRef } from 'react'
import { PRODUCT_IMAGES } from "@/lib/products";
import { useLang, type Lang } from "@/context/LanguageContext";

/* ─────────────────────────────────────────────────────────────────
   ProdutosParceria
   Node 3542:11243 — container geral
   Node 3542:11304 — bloco por linha de produto
   Node 3542:12322 — lista de produtos (ESSENTIALS / PREMIUM)
───────────────────────────────────────────────────────────────── */

/* ── Assets: Linha Essentials (Node 3542:11643) ───────────────── */
const imgNeoUltraSparkH2 = "/figma-assets/neo-ultra-spark-h2.webp";
const imgNeoMaxSparkH2   = "/figma-assets/neo-max-spark-h2.webp";
const imgNeoUltraSpark   = "/figma-assets/neo-ultra-spark.webp";
const imgNeoMaxSpark     = "/figma-assets/neo-max-spark.webp";
const imgNeoUltra        = "/figma-assets/neo-ultra.webp";
const imgNeoMax          = "/figma-assets/neo-max.webp";
const imgNeoPlus         = "/figma-assets/neo-plus.webp";
const imgNeoTouch        = "/figma-assets/neo-touch.webp";
const imgNeoSmartH2      = "/figma-assets/neo-smart-h2.webp";
const imgNeoFit          = "/figma-assets/neo-fit.webp";
const imgNeoUp           = "/figma-assets/neo-up.webp";

/* ── Assets: Linha Neo Premium — fonte única via PRODUCT_CATALOG (lib/products.ts) ── */
const imgInfinitySparkH2  = PRODUCT_IMAGES["neo-infinity-spark-h2"];
const imgPrestigeSparkH2  = PRODUCT_IMAGES["neo-prestige-spark-h2"];
const imgPrimeSparkH2     = PRODUCT_IMAGES["neo-prime-spark-h2"];
const imgInfinitySpark    = PRODUCT_IMAGES["neo-infinity-spark"];
const imgPrestigeSpark    = PRODUCT_IMAGES["neo-prestige-spark"];
const imgPrimeSpark       = PRODUCT_IMAGES["neo-prime-spark"];
const imgInfinity         = PRODUCT_IMAGES["neo-infinity"];
const imgPrestige         = PRODUCT_IMAGES["neo-prestige"];
const imgPrime            = PRODUCT_IMAGES["neo-prime"];

/* ── Assets: Acquafy Media + cursor ──────────────────────────── */
const imgMedia   = "/figma-assets/acquafy-media-totem.webp";
const imgBuyCta  = "/figma-assets/buy-cursor-icon.webp";

/* ─────────────────────────────────────────────────────────────────
   ProductItem — 1 produto da lista horizontal
   (Node 3542:11163 … 3542:12341)
   img: 80×80; name: 20px Heavy; subscript: "2" em 12.9px
───────────────────────────────────────────────────────────────── */
type ProductItemProps = {
  src:     string;
  variant: "essentials" | "premium";
  name:    string;
  /** se true, renderiza o último char "2" como subscrito 12.9px */
  sub2?:   boolean;
};

function useDragScroll() {
  const ref       = useRef<HTMLDivElement>(null)
  const dragging  = useRef(false)
  const startX    = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current   = true
    startX.current     = e.pageX
    scrollLeft.current = ref.current?.scrollLeft ?? 0
    e.preventDefault()
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return
    ref.current.scrollLeft = scrollLeft.current - (e.pageX - startX.current)
  }
  const onEnd = () => { dragging.current = false }

  return { ref, onMouseDown, onMouseMove, onMouseUp: onEnd, onMouseLeave: onEnd }
}

function ProductItem({ src, variant, name, sub2 }: ProductItemProps) {
  /* gradiente de texto para Essentials */
  const essGrad: React.CSSProperties = {
    backgroundImage:      "linear-gradient(to right, #0233c3, #0569ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor:  "transparent",
    backgroundClip:       "text",
  };
  /* sólido para Premium */
  const premColor: React.CSSProperties = { color: "#1f2e91" };

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center relative rounded-[12px] shrink-0">
      {/* imagem 80×80 */}
      <div className="flex items-center justify-center relative shrink-0 size-[80px]">
        <img src={src} alt={name} className="w-full h-full object-contain pointer-events-none" />
      </div>

      {/* nome do produto */}
      <p
        className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center max-w-[140px] min-h-[44px] shrink-0 w-full"
        style={variant === "essentials" ? essGrad : premColor}
      >
        {sub2
          ? <>{name.slice(0, -1)}<span style={{ fontSize: "12.9px" }}>2</span></>
          : name}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Listas de produtos — ESSENTIALS e PREMIUM
   (Node 3542:12322 — prop ESSENTIALS / PREMIUM)
───────────────────────────────────────────────────────────────── */
function EssentialsProductRow() {
  return (
    <div className="flex gap-[40px] items-start py-[10px] pr-[20px] shrink-0">
      {/* ordem: do mais completo ao mais simples, da esquerda para direita */}
      <ProductItem src={imgNeoUltraSparkH2} name="Neo ULTRA SPARK H2" variant="essentials" sub2 />
      <ProductItem src={imgNeoMaxSparkH2}   name="Neo MAX SPARK H2"   variant="essentials" sub2 />
      <ProductItem src={imgNeoUltraSpark}   name="Neo ULTRA SPARK"    variant="essentials" />
      <ProductItem src={imgNeoMaxSpark}     name="Neo MAX SPARK"       variant="essentials" />
      <ProductItem src={imgNeoUltra}        name="Neo ULTRA"           variant="essentials" />
      <ProductItem src={imgNeoMax}          name="Neo MAX"             variant="essentials" />
      <ProductItem src={imgNeoSmartH2}      name="Neo SMART H2"        variant="essentials" sub2 />
      <ProductItem src={imgNeoPlus}         name="Neo PLUS"            variant="essentials" />
      <ProductItem src={imgNeoTouch}        name="Neo TOUCH"           variant="essentials" />
      <ProductItem src={imgNeoFit}          name="Neo FIT"             variant="essentials" />
      <ProductItem src={imgNeoUp}           name="Neo UP"              variant="essentials" />
    </div>
  );
}

function PremiumProductRow() {
  return (
    <div className="flex gap-[40px] items-start py-[10px] pr-[20px] shrink-0">
      <ProductItem src={imgInfinitySparkH2} name="Neo INFINITY SPARK H2"  variant="premium" sub2 />
      <ProductItem src={imgPrestigeSparkH2} name="Neo PRESTIGE SPARK H2" variant="premium" sub2 />
      <ProductItem src={imgPrimeSparkH2}    name="Neo PRIME SPARK H2"    variant="premium" sub2 />
      <ProductItem src={imgInfinitySpark}   name="Neo INFINITY SPARK"    variant="premium" />
      <ProductItem src={imgPrestigeSpark}   name="Neo PRESTIGE SPARK"    variant="premium" />
      <ProductItem src={imgPrimeSpark}      name="Neo PRIME SPARK"       variant="premium" />
      <ProductItem src={imgInfinity}        name="Neo INFINITY"          variant="premium" />
      <ProductItem src={imgPrestige}        name="Neo PRESTIGE"          variant="premium" />
      <ProductItem src={imgPrime}           name="Neo PRIME"             variant="premium" />
    </div>
  );
}

/* ── Translations ────────────────────────────────────────────── */
const T: Record<Lang, {
  heading:         string;
  headingHL:       string;
  essentialsTitle: string;
  essentialsSub:   string;
  premiumTitle:    string;
  premiumSub:      string;
  mediaTitle:      string;
  mediaSub:        string;
}> = {
  pt: {
    heading:         "Produtos para cada ",
    headingHL:       "modelo de parceria",
    essentialsTitle: "Linha Essentials",
    essentialsSub:   "Silver pode indicar e vender toda a linha Neo",
    premiumTitle:    "Linha Neo Premium",
    premiumSub:      "Silver e Gold vendem. Platinum distribui.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold opera e monetiza. Ideal para mídia e hidratação.",
  },
  "pt-pt": {
    heading:         "Produtos para cada ",
    headingHL:       "modelo de parceria",
    essentialsTitle: "Linha Essentials",
    essentialsSub:   "Silver pode indicar e vender toda a linha Neo",
    premiumTitle:    "Linha Neo Premium",
    premiumSub:      "Silver e Gold vendem. Platinum distribui.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold opera e monetiza. Ideal para média e hidratação.",
  },
  en: {
    heading:         "Products for each ",
    headingHL:       "partnership model",
    essentialsTitle: "Essentials Line",
    essentialsSub:   "Silver can refer and sell the entire Neo line",
    premiumTitle:    "Neo Premium Line",
    premiumSub:      "Silver and Gold sell. Platinum distributes.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold operates and monetizes. Ideal for media and hydration.",
  },
  "en-gb": {
    heading:         "Products for each ",
    headingHL:       "partnership model",
    essentialsTitle: "Essentials Line",
    essentialsSub:   "Silver can refer and sell the entire Neo line",
    premiumTitle:    "Neo Premium Line",
    premiumSub:      "Silver and Gold sell. Platinum distributes.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold operates and monetises. Ideal for media and hydration.",
  },
  es: {
    heading:         "Productos para cada ",
    headingHL:       "modelo de asociación",
    essentialsTitle: "Línea Essentials",
    essentialsSub:   "Silver puede referir y vender toda la línea Neo",
    premiumTitle:    "Línea Neo Premium",
    premiumSub:      "Silver y Gold venden. Platinum distribuye.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold opera y monetiza. Ideal para medios e hidratación.",
  },
  fr: {
    heading:         "Produits pour chaque ",
    headingHL:       "modèle de partenariat",
    essentialsTitle: "Gamme Essentials",
    essentialsSub:   "Silver peut recommander et vendre toute la gamme Neo",
    premiumTitle:    "Gamme Neo Premium",
    premiumSub:      "Silver et Gold vendent. Platinum distribue.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold opère et monétise. Idéal pour les médias et l'hydratation.",
  },
  de: {
    heading:         "Produkte für jedes ",
    headingHL:       "Partnerschaftsmodell",
    essentialsTitle: "Essentials-Linie",
    essentialsSub:   "Silver kann die gesamte Neo-Linie empfehlen und verkaufen",
    premiumTitle:    "Neo Premium-Linie",
    premiumSub:      "Silver und Gold verkaufen. Platinum vertreibt.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold betreibt und monetarisiert. Ideal für Medien und Hydration.",
  },
  it: {
    heading:         "Prodotti per ogni ",
    headingHL:       "modello di partnership",
    essentialsTitle: "Linea Essentials",
    essentialsSub:   "Silver può segnalare e vendere l'intera linea Neo",
    premiumTitle:    "Linea Neo Premium",
    premiumSub:      "Silver e Gold vendono. Platinum distribuisce.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold gestisce e monetizza. Ideale per media e idratazione.",
  },
  zh: {
    heading:         "适合每种",
    headingHL:       "合作模式的产品",
    essentialsTitle: "Essentials 系列",
    essentialsSub:   "Silver 可推荐和销售整个 Neo 系列",
    premiumTitle:    "Neo Premium 系列",
    premiumSub:      "Silver 和 Gold 销售。Platinum 分销。",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold 运营并变现。适合媒体与补水场景。",
  },
  ja: {
    heading:         "各",
    headingHL:       "パートナーシップモデルに対応した製品",
    essentialsTitle: "Essentials ライン",
    essentialsSub:   "Silver は Neo ライン全製品を紹介・販売できます",
    premiumTitle:    "Neo Premium ライン",
    premiumSub:      "Silver と Gold が販売。Platinum が流通。",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold が運営・収益化。メディアと給水に最適。",
  },
  ko: {
    heading:         "각 ",
    headingHL:       "파트너십 모델을 위한 제품",
    essentialsTitle: "Essentials 라인",
    essentialsSub:   "Silver는 전체 Neo 라인을 추천하고 판매할 수 있습니다",
    premiumTitle:    "Neo Premium 라인",
    premiumSub:      "Silver와 Gold가 판매. Platinum이 유통.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold가 운영하고 수익화. 미디어 및 수분 보충에 이상적.",
  },
  sv: {
    heading:         "Produkter för varje ",
    headingHL:       "partnerskapsmodell",
    essentialsTitle: "Essentials-linjen",
    essentialsSub:   "Silver kan rekommendera och sälja hela Neo-linjen",
    premiumTitle:    "Neo Premium-linjen",
    premiumSub:      "Silver och Gold säljer. Platinum distribuerar.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold driver och monetiserar. Perfekt för media och hydrering.",
  },
  fi: {
    heading:         "Tuotteet jokaiseen ",
    headingHL:       "kumppanuusmalliin",
    essentialsTitle: "Essentials-linja",
    essentialsSub:   "Silver voi suositella ja myydä koko Neo-linjan",
    premiumTitle:    "Neo Premium -linja",
    premiumSub:      "Silver ja Gold myyvät. Platinum jakaa.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold operoi ja monetisoi. Ihanteellinen mediaan ja nesteyttämiseen.",
  },
  ru: {
    heading:         "Продукты для каждой ",
    headingHL:       "модели партнёрства",
    essentialsTitle: "Линейка Essentials",
    essentialsSub:   "Silver может рекомендовать и продавать всю линейку Neo",
    premiumTitle:    "Линейка Neo Premium",
    premiumSub:      "Silver и Gold продают. Platinum распространяет.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold управляет и монетизирует. Идеально для медиа и гидратации.",
  },
  ro: {
    heading:         "Produse pentru fiecare ",
    headingHL:       "model de parteneriat",
    essentialsTitle: "Linia Essentials",
    essentialsSub:   "Silver poate recomanda si vinde intreaga linie Neo",
    premiumTitle:    "Linia Neo Premium",
    premiumSub:      "Silver si Gold vand. Platinum distribuie.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold opereaza si monetizeaza. Ideal pentru media si hidratare.",
  },
  he: {
    heading:         "מוצרים לכל ",
    headingHL:       "מודל שותפות",
    essentialsTitle: "קו Essentials",
    essentialsSub:   "Silver יכול להפנות ולמכור את כל קו Neo",
    premiumTitle:    "קו Neo Premium",
    premiumSub:      "Silver ו-Gold מוכרים. Platinum מפיץ.",
    mediaTitle:      "Acquafy Media",
    mediaSub:        "Gold מפעיל וממניה. אידיאלי למדיה ולהידרציה.",
  },
};

/* ─────────────────────────────────────────────────────────────────
   ProductLineCard — bloco de 1 linha de produto
   (Node 3542:11304 e variante Premium 3542:11305)

   Essentials: h-[315px] justify-between  (header + scroll)
   Premium:    gap-[20px]                 (itens fluem)
───────────────────────────────────────────────────────────────── */
function ProductLineCard({ variant }: { variant: "essentials" | "premium" }) {
  const drag = useDragScroll()
  const { lang } = useLang();
  const t = T[lang];
  const isEssentials = variant === "essentials";

  const titleStyle: React.CSSProperties = isEssentials
    ? {
        backgroundImage:      "linear-gradient(to right, #0041ff, #3f8cff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:  "transparent",
        backgroundClip:       "text",
      }
    : {
        backgroundImage:      "linear-gradient(120.45deg, #0233c3 6.19%, #9f3df5 93.35%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:  "transparent",
        backgroundClip:       "text",
      };

  return (
    <div
      className={[
        "bg-white flex flex-col items-start min-w-[280px] overflow-hidden p-[20px] relative rounded-[16px] shrink-0 w-full",
        isEssentials ? "h-[315px] justify-between" : "gap-[20px]",
      ].join(" ")}
    >
      {/* header: título + descrição — centralizados */}
      <div className="flex flex-col gap-[10px] items-center text-center w-full shrink-0">
        <p
          className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] min-h-[36px] whitespace-nowrap shrink-0 w-full"
          style={titleStyle}
        >
          {isEssentials ? t.essentialsTitle : t.premiumTitle}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[18px] leading-[19px] text-[#333] w-full shrink-0">
          {isEssentials ? t.essentialsSub : t.premiumSub}
        </p>
      </div>

      {/* scroll horizontal de produtos */}
      <div
        ref={drag.ref}
        className="w-full overflow-x-auto overflow-y-clip py-[10px] shrink-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={drag.onMouseDown}
        onMouseMove={drag.onMouseMove}
        onMouseUp={drag.onMouseUp}
        onMouseLeave={drag.onMouseLeave}
      >
        {isEssentials ? <EssentialsProductRow /> : <PremiumProductRow />}
      </div>

      {/* ícone de compra — absoluto, mix-blend-multiply */}
      <div className="absolute mix-blend-multiply right-[9px] top-[20px] size-[50px] pointer-events-none">
        <img src={imgBuyCta} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ProdutosParceria — seção principal
   (Node 3542:11243)
───────────────────────────────────────────────────────────────── */
export default function ProdutosParceria() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-[#f2f6fd] flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* título da seção */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {t.heading}
          <span className="text-[#0569ff]">{t.headingHL}</span>
        </h2>

        {/* ── cards ── */}
        <div className="flex flex-col xl:flex-row gap-[20px] items-stretch xl:items-start justify-center w-full">

          {/* coluna esquerda: 2 cards empilhados */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[280px]">
            <ProductLineCard variant="essentials" />
            <ProductLineCard variant="premium" />
          </div>

          {/* card direito: Acquafy Media */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[40px] h-[630px] items-center xl:max-w-[310px] min-h-[566px] min-w-[240px] overflow-clip p-[20px] relative rounded-[16px]">

            {/* header centralizado */}
            <div className="flex flex-col gap-[10px] items-center text-center w-full shrink-0">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-[#0569ff] min-h-[36px] w-full">
                {t.mediaTitle}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[18px] leading-[19px] text-[#333] w-full">
                {t.mediaSub}
              </p>
            </div>

            {/* imagem do totem — ocupa o restante da altura */}
            <div className="flex flex-[1_0_0] flex-col items-center justify-center min-h-0 w-full">
              <div className="relative h-full" style={{ aspectRatio: "1441 / 4096" }}>
                <img
                  src={imgMedia}
                  alt="Acquafy Media"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
