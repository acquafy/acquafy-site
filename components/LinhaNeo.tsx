import FigmaIcon from "./FigmaIcon";

// ── Checkin icon ───────────────────────────────────────────────────────────────
const imgCheckin = "/figma-assets/a8739a99-bced-4cff-8957-d1230dbbb560.svg"; // 30×30 sq

// ── Product images (PNG) — row 1 ──────────────────────────────────────────────
const imgNeoUp            = "/figma-assets/e23fc740-275e-4c85-84f9-36e147e4c7f6.png"; // 3275×4096
const imgNeoFit           = "/figma-assets/44f74064-36a2-4ed8-b19d-c0e125bc3613.png"; // 3275×4096
const imgNeoSmart         = "/figma-assets/f4783269-9b05-4929-bf94-55ac43a2db0d.png"; // 3275×4096
const imgNeoTouch         = "/figma-assets/47309acf-e189-4002-8325-6d14513ce62c.png"; // 3384×4096
const imgNeoPlus          = "/figma-assets/5a009cbe-c107-4867-a67d-45542361d091.png"; // 3384×4096

// ── Product images (PNG) — row 2 ──────────────────────────────────────────────
const imgNeoUltra         = "/figma-assets/a025ff9c-7a77-4fe2-a711-958c47093626.png"; // 3772×4096
const imgNeoUltraSpark    = "/figma-assets/e36daeb8-1e75-4c4b-93b8-ca391bf2e8a7.png"; // 3772×4096
const imgNeoUltraSparkH2  = "/figma-assets/b42e0357-4339-485b-beb0-42e50b358494.png"; // 3772×4096
const imgNeoMax           = "/figma-assets/cc9a0b6d-03ca-4c7c-a920-aa35796f2249.png"; // 1515×4012
const imgNeoMaxSpark      = "/figma-assets/d2240635-3424-47d9-a264-6631fb173f63.png"; // 1515×4012
const imgNeoMaxSparkH2    = "/figma-assets/74bed368-254c-4522-ba2c-4798b2fb22ab.png"; // 1515×4012

const waterTypes = [
  { label: "Água Natural",     sub: "Presente em todos" },
  { label: "Água Gelada",      sub: "Em todos, tirando Smart" },
  { label: "45º Leite",        sub: "Em todos" },
  { label: "65º Chá",          sub: "Em todos" },
  { label: "100º Café",        sub: "Em todos" },
  { label: "Água com Gás",     sub: "6 e 7 em 1 Apenas" },
  { label: "Água Hidrogenada", sub: "7 em 1 e Smart Apenas" },
];

import type { ReactNode } from "react";

type Product = {
  img: string;
  imgW: number; // largura real do asset
  imgH: number; // altura real do asset
  name: string | ReactNode;
  sub: string;
  tank?: string;
};

const row1: Product[] = [
  { img: imgNeoUp,    imgW: 3275, imgH: 4096, name: "Neo UP",                                       sub: "Apenas Natural" },
  { img: imgNeoFit,   imgW: 3275, imgH: 4096, name: "Neo FIT",                                      sub: "5 em 1", tank: "Tanque de 400 ml" },
  { img: imgNeoSmart, imgW: 3275, imgH: 4096, name: <span>Neo SMART H<sup>2</sup></span>,            sub: "5 em 1" },
  { img: imgNeoTouch, imgW: 3384, imgH: 4096, name: "Neo TOUCH",                                    sub: "5 em 1", tank: "Tanque de 800 ml" },
  { img: imgNeoPlus,  imgW: 3384, imgH: 4096, name: "Neo PLUS",                                     sub: "5 em 1", tank: "Tanque de 1500 ml" },
];

const row2: Product[] = [
  { img: imgNeoUltra,        imgW: 3772, imgH: 4096, name: "Neo ULTRA",                              sub: "5 em 1", tank: "Tanque de 3L" },
  { img: imgNeoUltraSpark,   imgW: 3772, imgH: 4096, name: "Neo ULTRA SPARK",                        sub: "6 em 1", tank: "Tanque de 3L" },
  { img: imgNeoUltraSparkH2, imgW: 3772, imgH: 4096, name: <span>Neo ULTRA SPARK H<sup>2</sup></span>, sub: "7 em 1", tank: "Tanque de 3L" },
  { img: imgNeoMax,          imgW: 1515, imgH: 4012, name: "Neo MAX",                                sub: "5 em 1", tank: "Tanque de 3L" },
  { img: imgNeoMaxSpark,     imgW: 1515, imgH: 4012, name: "Neo MAX SPARK",                          sub: "6 em 1", tank: "Tanque de 3L" },
  { img: imgNeoMaxSparkH2,   imgW: 1515, imgH: 4012, name: <span>Neo MAX SPARK H<sup>2</sup></span>, sub: "7 em 1", tank: "Tanque de 3L" },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[335px] min-w-[150px] overflow-hidden p-[20px] rounded-[12px]">

      {/* Bloco de imagem: w-full h-[220px] fixo — object-contain preserva ratio dentro do bloco */}
      <div className="w-full h-[220px] shrink-0">
        <img
          alt=""
          className="w-full h-full object-contain pointer-events-none"
          src={product.img}
        />
      </div>

      {/* Nome — min-h-[55px] alinha nomes de 1 e 2 linhas */}
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0233c3] text-center w-full min-h-[55px] flex items-center justify-center">
        {product.name}
      </p>

      {/* Subtipo */}
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
        {product.sub}
      </p>

      {/* Tanque (opcional) */}
      {product.tank && (
        <div className="bg-[#f6f9fe] border border-[#0569ff] flex flex-col items-center justify-center px-[5px] py-[10px] rounded-[12px] w-full shrink-0">
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
            {product.tank}
          </p>
        </div>
      )}
    </div>
  );
}

export default function LinhaNeo() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="flex flex-wrap gap-y-[20px] items-center justify-center w-full">
            <h2
              className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] flex-1 min-w-[240px] bg-clip-text text-transparent text-center lg:text-left"
              style={{ backgroundImage: "linear-gradient(to right, #0233c3, #0569ff)" }}
            >
              Neo Essentials
            </h2>
          </div>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
            Linha acessível e inteligente com Painel LED Touch 10.1, App, UV LED, Wi-Fi 5, Bluetooth 5.3 e filtros de
            alta performance UF.
          </p>

          {/* Water types card */}
          <div className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#1f2e91] w-full">
              {"Tipos de água dos produtos "}
              <span className="font-['Avenir_LT_Pro:85_Heavy']">Neo Essentials</span>
              {", a água perfeita para cada momento"}
            </p>
            <div className="flex flex-wrap gap-[20px_10px] items-center w-full">
              {waterTypes.map((w) => (
                <div key={w.label} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[180px]">
                  <FigmaIcon src={imgCheckin} size={20} />
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
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

        {/* Row 1 — 5 produtos compactos */}
        <div className="pb-[20px] w-full">
          <div className="flex flex-wrap gap-[15px] items-stretch justify-center w-full">
            {row1.map((p, i) => <ProductCard key={i} product={p} />)}
          </div>
        </div>

        {/* Row 2 — Ultra + Max */}
        <div className="flex flex-wrap gap-[15px] items-stretch justify-center w-full">
          {row2.map((p, i) => <ProductCard key={i} product={p} />)}
        </div>
      </div>
    </section>
  );
}
