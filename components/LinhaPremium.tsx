import type { ReactNode } from "react";
import FigmaIcon from "./FigmaIcon";
import PremiumSlideshow from "./ui/PremiumSlideshow";
import { PRODUCT_IMAGES } from "@/lib/products";

// Slide dots
const imgDotActive   = "/figma-assets/dot-active-a.svg";
const imgDotInactive = "/figma-assets/dot-inactive-a.svg";

// Slideshow images
const imgSlide1 = "/figma-assets/premium-slide-1.webp";
const imgSlide2 = "/figma-assets/premium-slide-2.webp";

// Product images — fonte única via PRODUCT_CATALOG (lib/products.ts)
const imgInfinity        = PRODUCT_IMAGES["neo-infinity"];
const imgInfinitySpark   = PRODUCT_IMAGES["neo-infinity-spark"];
const imgInfinitySparkH2 = PRODUCT_IMAGES["neo-infinity-spark-h2"];
const imgPrestige        = PRODUCT_IMAGES["neo-prestige"];
const imgPrestigeSpark   = PRODUCT_IMAGES["neo-prestige-spark"];
const imgPrestigeSparkH2 = PRODUCT_IMAGES["neo-prestige-spark-h2"];
const imgPrime           = PRODUCT_IMAGES["neo-prime"];
const imgPrimeSpark      = PRODUCT_IMAGES["neo-prime-spark"];
const imgPrimeSparkH2    = PRODUCT_IMAGES["neo-prime-spark-h2"];

// Panel screen (TELA PREMIUM 1 — node 3285:5944)
const imgPanel   = "/figma-assets/panel-premium.webp";

// Icons (node 3285:5944)
const imgCheckin    = "/figma-assets/icon-check-b.svg";
const imgIconLCD    = "/figma-assets/icon-lcd.svg"; // BT_DOCS_2 (square)
const imgIconFilter = "/figma-assets/icon-filter-40px.svg"; // Vector/Filtros (40×40 square)
const imgIconOsmose = "/figma-assets/icon-osmose-reversa.svg"; // Osmose Reversa (642×642 square)
const imgIconIoT    = "/figma-assets/icon-iot.svg"; // IoT (629×629 square)

const waterTypes = [
  { label: "Água Natural",      sub: "Presente em todos" },
  { label: "Água Gelada",       sub: "Em todos" },
  { label: "45ºC Leite",         sub: "Em todos" },
  { label: "65ºC Chá",           sub: "Em todos" },
  { label: "85ºC Café",          sub: "Em todos" },
  { label: "100ºC Água Quente",  sub: "Em todos" },
  { label: "Água com Gás",      sub: "7 e 8 em 1 Apenas" },
  { label: "Água Hidrogenada",  sub: "8 em 1 Apenas" },
];

const panelFeatures = [
  { icon: imgIconLCD,    title: "LCD IPS / Total Touch",   desc: "Navegação como iPhone / iPad" },
  { icon: imgIconFilter, title: "Tecnologia Premium",      desc: "Filtros de alta performance" },
  { icon: imgIconOsmose, title: "Osmose Reversa(RO)",      desc: "Água alcalina pura" },
  { icon: imgIconIoT,    title: "IoT Avançado",           desc: "Telemetria em tempo real" },
];

type Product = {
  img: string;
  name: string | ReactNode;
  sub: string;
};

const rowInfinity: Product[] = [
  { img: imgInfinity,       name: "Neo INFINITY",                                    sub: "6 em 1" },
  { img: imgInfinitySpark,  name: "Neo INFINITY SPARK",                              sub: "7 em 1" },
  { img: imgInfinitySparkH2,name: <span>Neo INFINITY SPARK H<sub>2</sub></span>,     sub: "8 em 1" },
];

const rowPrestige: Product[] = [
  { img: imgPrestige,        name: "Neo PRESTIGE",                                   sub: "6 em 1" },
  { img: imgPrestigeSpark,   name: "Neo PRESTIGE SPARK",                             sub: "7 em 1" },
  { img: imgPrestigeSparkH2, name: <span>Neo PRESTIGE SPARK H<sub>2</sub></span>,    sub: "8 em 1" },
];

const rowPrime: Product[] = [
  { img: imgPrime,        name: "Neo PRIME",                                         sub: "6 em 1" },
  { img: imgPrimeSpark,   name: "Neo PRIME SPARK",                                   sub: "7 em 1" },
  { img: imgPrimeSparkH2, name: <span>Neo PRIME SPARK H<sub>2</sub></span>,          sub: "8 em 1" },
];

// ─── Card sub-components ────────────────────────────────────────────────────

/** Slot de imagem: w-full h-[220px] fixo — object-contain preserva ratio dentro do bloco */
function ProductImage({ src }: { src: string }) {
  return (
    <div className="w-full h-[220px] shrink-0">
      <img
        alt=""
        className="w-full h-full object-contain pointer-events-none"
        src={src}
      />
    </div>
  );
}

function InfinityCard({ product }: { product: Product }) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[290px] min-w-[180px] overflow-hidden p-[20px] rounded-[12px]">
      <ProductImage src={product.img} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#6e0cc3] text-center w-full min-h-[55px] flex items-center justify-center">
        {product.name}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
        {product.sub}
      </p>
    </div>
  );
}

function PrestigeCard({ product }: { product: Product }) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[290px] min-w-[180px] overflow-hidden p-[20px] rounded-[12px]">
      <ProductImage src={product.img} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#6e0cc3] text-center w-full min-h-[55px] flex items-center justify-center">
        {product.name}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
        {product.sub}
      </p>
    </div>
  );
}

function PrimeCard({ product }: { product: Product }) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[290px] min-w-[180px] overflow-hidden p-[20px] rounded-[12px]">
      <ProductImage src={product.img} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#6e0cc3] text-center w-full min-h-[55px] flex items-center justify-center">
        {product.name}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
        {product.sub}
      </p>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function LinhaPremium() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

        {/* ── Header ── */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="flex flex-wrap gap-y-[20px] items-center justify-center w-full">
            <h2
              className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent flex-1 min-w-[240px] text-center lg:text-left"
              style={{ backgroundImage: "linear-gradient(170.17deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              Neo Premium
            </h2>
          </div>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
            Modelos sofisticados em aço inox com Painel LCD IPS Touch 15.6, RO/Osmose Reversa, App, UV LED, Wi-Fi 5, Bluetooth 5.3 e experiência premium integrada.
          </p>

          {/* Water types */}
          <div className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#1f2e91] w-full">
              {"Tipos de água dos produtos "}
              <span className="font-['Avenir_LT_Pro:85_Heavy']">Neo Premium</span>
              {", a água perfeita para cada momento"}
            </p>
            <div className="flex flex-wrap gap-[20px_10px] items-center w-full">
              {waterTypes.map((w) => (
                <div key={w.label} className="flex flex-[0_0_calc(50%-5px)] lg:flex-[0_0_calc(25%-8px)] gap-[10px] items-center">
                  <FigmaIcon src={imgCheckin} size={20} />
                  <div className="flex flex-1 flex-col gap-[5px] items-start min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                      {w.label}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] w-full">
                      {w.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Products left + Panel right ── */}
        <div className="flex flex-col gap-[20px] items-start justify-center w-full lg:flex-row lg:flex-wrap lg:items-start">

          {/* Left: product rows */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[240px] w-full lg:w-auto">

            {/* Infinity row */}
            <div className="flex flex-wrap gap-[15px] items-stretch w-full">
              {rowInfinity.map((p, i) => <InfinityCard key={i} product={p} />)}
            </div>

            {/* Prestige row */}
            <div className="flex flex-wrap gap-[15px] items-stretch w-full">
              {rowPrestige.map((p, i) => <PrestigeCard key={i} product={p} />)}
            </div>

            {/* Prime row */}
            <div className="flex flex-wrap gap-[15px] items-stretch w-full">
              {rowPrime.map((p, i) => <PrimeCard key={i} product={p} />)}
            </div>

            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center w-full">
              Todos possuem Tanque de Água Gelada com 3000ml.
            </p>
          </div>

          {/* Right: panel card + slideshow — gap-[20px] (node 3285:5944) */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[240px]">

            {/* Panel card — shrink-0: tamanho pelo conteúdo, não cresce */}
            <div className="bg-[#f6f9fe] flex flex-col gap-[40px] items-center justify-center min-w-[240px] pt-[20px] rounded-[16px] shrink-0 w-full">

              {/* Title block — w-full sem padding lateral extra */}
              <div className="flex flex-col gap-[10px] items-start w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] w-full">
                  <span className="text-[#1f2e91]">Painel Premium </span>
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(170.17deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
                  >
                    com Tecnologia IPS
                  </span>
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
                  Tecnologia avançada para ambientes sofisticados e usuários exigentes.
                </p>
              </div>

              {/* Content row — flex-wrap shrink-0 (node 3283:6499) */}
              <div className="flex flex-wrap gap-[20px] items-center justify-center shrink-0 w-full">

                {/* Icons group — node 3283:6500 exact spec:
                    content-start flex-wrap gap-[20px/10px] items-start justify-center
                    size-full → em flex context = flex-[1_0_0] min-h-px */}
                <div className="content-start flex flex-[1_0_0] flex-wrap gap-x-[10px] gap-y-[20px] items-start justify-center min-w-[240px]">
                  {panelFeatures.map((f, i) => (
                    /* Cada coluna — min-w-[140px], sem px, gap-[20px] (node 3283:6501) */
                    <div key={i} className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[140px]">
                      <FigmaIcon src={f.icon} size={30} />
                      {/* Text group — gap-[10px] entre label e desc (node I3283:6501;3691:14050) */}
                      <div className="flex flex-col gap-[10px] items-center shrink-0 text-center w-full">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#6e0cc3] text-center w-full whitespace-pre-line min-h-[34px] flex flex-col justify-center">
                          {f.title}
                        </p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] text-center w-full">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Panel screen — min-w-[240px] max-w-[249px] w-[240px] shrink-0 (node 3283:6505)
                    Altura determinada pelo aspect-ratio do conteúdo interno (2309/3821) */}
                <div className="flex flex-col gap-[10px] items-center justify-center shrink-0 min-w-[240px] max-w-[249px] w-[240px]">
                  <div className="relative w-full" style={{ aspectRatio: "2309/3821" }}>
                    <img
                      alt="Painel Premium"
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                      src={imgPanel}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Slideshow interativo — h-[412px] shrink-0 w-full (node 3285:5964) */}
            <PremiumSlideshow />

          </div>
        </div>

      </div>
    </section>
  );
}
