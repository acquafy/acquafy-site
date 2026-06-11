import type { ReactNode } from "react";
import FigmaIcon from "./FigmaIcon";
import PremiumSlideshow from "./ui/PremiumSlideshow";

// Slide dots
const imgDotActive   = "/figma-assets/1c28eecf-0b03-413f-acc0-d80cace5f949.svg";
const imgDotInactive = "/figma-assets/b410b09c-6053-47fe-aa6d-96ccd0a7b750.svg";

// Slideshow images
const imgSlide1 = "/figma-assets/7cbbfd60-44e7-4cb2-9e49-352087597ef0.png";
const imgSlide2 = "/figma-assets/cf110e85-ad24-43d6-b563-1f1002aa19f7.png";

// Infinity products (keep existing from previous session)
const imgInfinity      = "/figma-assets/22fda6d3-1ea3-48aa-b26b-bd92fc65d286.png";
const imgInfinitySpark   = "/figma-assets/ee0e1157-ebcb-43a5-ba1a-a819a777f35b.png";
const imgInfinitySparkH2 = "/figma-assets/08beedcc-95b5-449d-a7a5-a66aa64ead56.png";

// Prestige products
const imgPrestige        = "/figma-assets/9d959c11-3d1b-4ee6-a012-3ae5ba6e218d.png";
const imgPrestigeSpark   = "/figma-assets/9bffacc0-e10f-4e47-9a17-cadb82b8fabd.png";
const imgPrestigeSparkH2 = "/figma-assets/ded1ddb1-731b-44ac-a5cc-7de82c612d9d.png";

// Prime products
const imgPrime        = "/figma-assets/1286c1c8-ee96-4d96-9d75-9804a8992a0f.png";
const imgPrimeSpark   = "/figma-assets/019577f9-c58d-4251-84f2-2a46723d2329.png";
const imgPrimeSparkH2 = "/figma-assets/83b323cb-be65-4b33-a70a-10daf12a0a06.png";

// Panel screen (TELA PREMIUM 1 — node 3285:5944)
const imgPanel   = "/figma-assets/45c97b68-92c7-454f-9dae-8298671c9c07.png";

// Icons (node 3285:5944)
const imgCheckin    = "/figma-assets/b41fadec-c9cf-4033-967a-21f2b7b8c020.svg";
const imgIconLCD    = "/figma-assets/f20db2d1-fd07-42cc-97e2-8c275c994409.svg"; // BT_DOCS_2 (square)
const imgIconFilter = "/figma-assets/72988fa4-9114-44e7-86c8-0bce090e363c.svg"; // Vector/Filtros (40×40 square)
const imgIconOsmose = "/figma-assets/52211f12-c4c4-4e79-ad60-7d9b9d1b82e7.svg"; // Osmose Reversa (642×642 square)
const imgIconIoT    = "/figma-assets/908cd665-baf2-4e13-b652-189909b3e36e.svg"; // IoT (629×629 square)

const waterTypes = [
  { label: "Água Natural",      sub: "Presente em todos" },
  { label: "Água Gelada",       sub: "Em todos" },
  { label: "45º Leite",         sub: "Em todos" },
  { label: "65º Chá",           sub: "Em todos" },
  { label: "100º Café",         sub: "Em todos" },
  { label: "Água com Gás",      sub: "6 e 7 em 1 Apenas" },
  { label: "Água Hidrogenada",  sub: "7 em 1 Apenas" },
];

const panelFeatures = [
  { icon: imgIconLCD,    title: "LCD IPS / Total Touch",   desc: "Navegação como iPhone / iPad" },
  { icon: imgIconFilter, title: "Tecnologia Premium",      desc: "Filtros de alta performance" },
  { icon: imgIconOsmose, title: "Osmose Reversa(RO)",      desc: "Água alcalina pura" },
  { icon: imgIconIoT,    title: "IoT\nAvançado",           desc: "Telemetria em tempo real" },
];

type Product = {
  img: string;
  name: string | ReactNode;
  sub: string;
};

const rowInfinity: Product[] = [
  { img: imgInfinity,       name: "Neo INFINITY",                                    sub: "5 em 1" },
  { img: imgInfinitySpark,  name: "Neo INFINITY SPARK",                              sub: "6 em 1" },
  { img: imgInfinitySparkH2,name: <span>Neo INFINITY SPARK H<sub>2</sub></span>,     sub: "7 em 1" },
];

const rowPrestige: Product[] = [
  { img: imgPrestige,        name: "Neo PRESTIGE",                                   sub: "5 em 1" },
  { img: imgPrestigeSpark,   name: "Neo PRESTIGE SPARK",                             sub: "6 em 1" },
  { img: imgPrestigeSparkH2, name: <span>Neo PRESTIGE SPARK H<sub>2</sub></span>,    sub: "7 em 1" },
];

const rowPrime: Product[] = [
  { img: imgPrime,        name: "Neo PRIME",                                         sub: "5 em 1" },
  { img: imgPrimeSpark,   name: "Neo PRIME SPARK",                                   sub: "6 em 1" },
  { img: imgPrimeSparkH2, name: <span>Neo PRIME SPARK H<sub>2</sub></span>,          sub: "7 em 1" },
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
                <div key={w.label} className="flex flex-1 gap-[10px] items-center min-w-[180px]">
                  <FigmaIcon src={imgCheckin} size={20} />
                  <div className="flex flex-1 flex-col gap-[10px] items-start min-w-0">
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
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#6e0cc3] text-center w-full whitespace-pre-line min-h-[28px] flex flex-col justify-center">
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
