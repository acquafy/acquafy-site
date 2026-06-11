'use client'
import { useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────
   ProdutosParceria
   Node 3542:11243 — container geral
   Node 3542:11304 — bloco por linha de produto
   Node 3542:12322 — lista de produtos (ESSENTIALS / PREMIUM)
───────────────────────────────────────────────────────────────── */

/* ── Assets: Linha Essentials (Node 3542:11643) ───────────────── */
const imgNeoUltraSparkH2 = "/figma-assets/neo-ultra-spark-h2.png";
const imgNeoMaxSparkH2   = "/figma-assets/neo-max-spark-h2.png";
const imgNeoUltraSpark   = "/figma-assets/neo-ultra-spark.png";
const imgNeoMaxSpark     = "/figma-assets/neo-max-spark.png";
const imgNeoUltra        = "/figma-assets/neo-ultra.png";
const imgNeoMax          = "/figma-assets/neo-max.png";
const imgNeoPlus         = "/figma-assets/neo-plus.png";
const imgNeoTouch        = "/figma-assets/neo-touch.png";
const imgNeoSmartH2      = "/figma-assets/neo-smart-h2.png";
const imgNeoFit          = "/figma-assets/neo-fit.png";
const imgNeoUp           = "/figma-assets/neo-up.png";

/* ── Assets: Linha Neo Premium (Node 3542:12323) ──────────────── */
const imgInfinitySparkH2  = "/figma-assets/premium-infinity-spark-h2.png";
const imgPrestigeSparkH2  = "/figma-assets/premium-prestige-spark-h2.png";
const imgPrimeSparkH2     = "/figma-assets/premium-prime-spark-h2.png";
const imgInfinitySpark    = "/figma-assets/premium-infinity-spark.png";
const imgPrestigeSpark    = "/figma-assets/premium-prestige-spark.png";
const imgPrimeSpark       = "/figma-assets/premium-prime-spark.png";
const imgInfinity         = "/figma-assets/premium-infinity.png";
const imgPrestige         = "/figma-assets/premium-prestige.png";
const imgPrime            = "/figma-assets/premium-prime.png";

/* ── Assets: Acquafy Media + cursor ──────────────────────────── */
const imgMedia   = "/figma-assets/acquafy-media-totem.png";
const imgBuyCta  = "/figma-assets/buy-cursor-icon.png";

/* ─────────────────────────────────────────────────────────────────
   ProductItem — 1 produto da lista horizontal
   (Node 3542:11163 … 3542:12341)
   img: 80×80; name: 20px Heavy; subscript: "2" em 12.9px
───────────────────────────────────────────────────────────────── */
type ProductItemProps = {
  src:      string;
  /** aspect-ratio da imagem, ex: "3275/4096" */
  aspect:   string;
  /** false = objeto retrato → h-full; true = objeto paisagem/quadrado → w-full */
  portrait: boolean;
  variant:  "essentials" | "premium";
  name:     string;
  /** se true, renderiza o último char "2" como subscrito 12.9px */
  sub2?:    boolean;
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

function ProductItem({ src, aspect, portrait, variant, name, sub2 }: ProductItemProps) {
  /* gradiente de texto para Essentials */
  const essGrad: React.CSSProperties = {
    backgroundImage:      "linear-gradient(to right, #0233c3, #0569ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor:  "transparent",
    backgroundClip:       "text",
  };
  /* sólido para Premium */
  const premColor: React.CSSProperties = { color: "#1f2e91" };

  const [w, h] = aspect.split("/").map(Number);
  const cssRatio = `${w} / ${h}`;

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center relative rounded-[12px] shrink-0">
      {/* imagem 80×80 */}
      <div className="flex items-center justify-center relative shrink-0 size-[80px]">
        {portrait ? (
          /* retrato: h-full → largura vem do aspect-ratio */
          <div className="relative h-full" style={{ aspectRatio: cssRatio }}>
            <img src={src} alt={name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
          </div>
        ) : (
          /* paisagem/quadrado: w-full → altura vem do aspect-ratio */
          <div className="relative w-full shrink-0" style={{ aspectRatio: cssRatio }}>
            <img src={src} alt={name} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
          </div>
        )}
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
      <ProductItem src={imgNeoUltraSparkH2} aspect="3772/4096" portrait name="Neo ULTRA SPARK H2" variant="essentials" sub2 />
      <ProductItem src={imgNeoMaxSparkH2}   aspect="1515/4012" portrait name="Neo MAX SPARK H2"   variant="essentials" sub2 />
      <ProductItem src={imgNeoUltraSpark}   aspect="3772/4096" portrait name="Neo ULTRA SPARK"    variant="essentials" />
      <ProductItem src={imgNeoMaxSpark}     aspect="1515/4012" portrait name="Neo MAX SPARK"       variant="essentials" />
      <ProductItem src={imgNeoUltra}        aspect="3772/4096" portrait name="Neo ULTRA"           variant="essentials" />
      <ProductItem src={imgNeoMax}          aspect="1515/4012" portrait name="Neo MAX"             variant="essentials" />
      <ProductItem src={imgNeoPlus}         aspect="3384/4096" portrait name="Neo PLUS"            variant="essentials" />
      <ProductItem src={imgNeoTouch}        aspect="3384/4096" portrait name="Neo TOUCH"           variant="essentials" />
      <ProductItem src={imgNeoSmartH2}      aspect="3275/4096" portrait name="Neo SMART H2"        variant="essentials" sub2 />
      <ProductItem src={imgNeoFit}          aspect="3275/4096" portrait name="Neo FIT"             variant="essentials" />
      <ProductItem src={imgNeoUp}           aspect="3275/4096" portrait name="Neo UP"              variant="essentials" />
    </div>
  );
}

function PremiumProductRow() {
  return (
    <div className="flex gap-[40px] items-start py-[10px] pr-[20px] shrink-0">
      <ProductItem src={imgInfinitySparkH2} aspect="837/1526"         portrait name="Neo INFINITY SPARK H2"  variant="premium" sub2 />
      <ProductItem src={imgPrestigeSparkH2} aspect="113.75/99.76" portrait={false} name="Neo PRESTIGE SPARK H2" variant="premium" sub2 />
      <ProductItem src={imgPrimeSparkH2}    aspect="3288/3245"    portrait={false} name="Neo PRIME SPARK H2"    variant="premium" sub2 />
      <ProductItem src={imgInfinitySpark}   aspect="837/1526"         portrait name="Neo INFINITY SPARK"    variant="premium" />
      <ProductItem src={imgPrestigeSpark}   aspect="113.75/99.76" portrait={false} name="Neo PRESTIGE SPARK"   variant="premium" />
      <ProductItem src={imgPrimeSpark}      aspect="3288/3245"    portrait={false} name="Neo PRIME SPARK"       variant="premium" />
      <ProductItem src={imgInfinity}        aspect="837/1526"         portrait name="Neo INFINITY"           variant="premium" />
      <ProductItem src={imgPrestige}        aspect="113.75/99.76" portrait={false} name="Neo PRESTIGE"          variant="premium" />
      <ProductItem src={imgPrime}           aspect="3288/3245"    portrait={false} name="Neo PRIME"              variant="premium" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ProductLineCard — bloco de 1 linha de produto
   (Node 3542:11304 e variante Premium 3542:11305)

   Essentials: h-[315px] justify-between  (header + scroll)
   Premium:    gap-[20px]                 (itens fluem)
───────────────────────────────────────────────────────────────── */
function ProductLineCard({ variant }: { variant: "essentials" | "premium" }) {
  const drag = useDragScroll()
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
          {isEssentials ? "Linha Essentials" : "Linha Neo Premium"}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[18px] leading-[19px] text-[#333] w-full shrink-0">
          {isEssentials
            ? "Silver pode indicar e vender toda a linha Neo"
            : "Silver e Gold vendem. Platinum distribui."}
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
  return (
    <section className="bg-[#f2f6fd] flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* título da seção */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] not-italic text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {"Produtos para cada "}
          <span className="text-[#0569ff]">modelo de parceria</span>
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
                Acquafy Media
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] not-italic text-[18px] leading-[19px] text-[#333] w-full">
                Gold opera e monetiza. Ideal para mídia e hidratação.
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
