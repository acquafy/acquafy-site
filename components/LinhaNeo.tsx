import FigmaIcon from "./FigmaIcon";
import { PRODUCT_IMAGES } from "@/lib/products";

// ── Checkin icon ───────────────────────────────────────────────────────────────
const imgCheckin = "/figma-assets/icon-check-e.svg"; // 30×30 sq

// ── Feature card assets ────────────────────────────────────────────────────────
const imgPanel      = "/figma-assets/panel-led.webp";
const imgHomeMob    = "/figma-assets/app-home-mobile.webp";
const imgAppView    = "/figma-assets/app-view-screen.webp";
const imgFeatCheck  = "/figma-assets/icon-check-30px.svg";
const imgFeatWifi   = "/figma-assets/icon-wifi-feat.svg";
const imgBluetooth  = "/figma-assets/icon-bluetooth.svg";

// ── Product images — source única via PRODUCT_CATALOG (lib/products.ts) ───────
const imgNeoUp            = PRODUCT_IMAGES["neo-up"];
const imgNeoFit           = PRODUCT_IMAGES["neo-fit"];
const imgNeoSmart         = PRODUCT_IMAGES["neo-smart-h2"];
const imgNeoTouch         = PRODUCT_IMAGES["neo-touch"];
const imgNeoPlus          = PRODUCT_IMAGES["neo-plus"];
const imgNeoUltra         = PRODUCT_IMAGES["neo-ultra"];
const imgNeoUltraSpark    = PRODUCT_IMAGES["neo-ultra-spark"];
const imgNeoUltraSparkH2  = PRODUCT_IMAGES["neo-ultra-spark-h2"];
const imgNeoMax           = PRODUCT_IMAGES["neo-max"];
const imgNeoMaxSpark      = PRODUCT_IMAGES["neo-max-spark"];
const imgNeoMaxSparkH2    = PRODUCT_IMAGES["neo-max-spark-h2"];

const waterTypes = [
  { label: "Água Natural",     sub: "Presente em todos" },
  { label: "Água Gelada",      sub: "Em todos" },
  { label: "45ºC Leite",        sub: "Em todos" },
  { label: "65ºC Chá",          sub: "Em todos" },
  { label: "85ºC Café",         sub: "Em todos" },
  { label: "100ºC Água Quente", sub: "Em todos" },
  { label: "Água com Gás",     sub: "7 e 8 em 1 Apenas" },
  { label: "Água Hidrogenada", sub: "8 em 1 e Smart Apenas" },
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
  { img: imgNeoFit,   imgW: 3275, imgH: 4096, name: "Neo FIT",                                      sub: "6 em 1", tank: "Tanque de 400 ml" },
  { img: imgNeoSmart, imgW: 3275, imgH: 4096, name: <span>Neo SMART H<sub>2</sub></span>,            sub: "7 em 1", tank: "Tanque de 800 ml" },
  { img: imgNeoTouch, imgW: 3384, imgH: 4096, name: "Neo TOUCH",                                    sub: "6 em 1", tank: "Tanque de 800 ml" },
  { img: imgNeoPlus,  imgW: 3384, imgH: 4096, name: "Neo PLUS",                                     sub: "6 em 1", tank: "Tanque de 1500 ml" },
];

const row2: Product[] = [
  { img: imgNeoUltra,        imgW: 3772, imgH: 4096, name: "Neo ULTRA",                              sub: "6 em 1", tank: "Tanque de 3L" },
  { img: imgNeoUltraSpark,   imgW: 3772, imgH: 4096, name: "Neo ULTRA SPARK",                        sub: "7 em 1", tank: "Tanque de 3L" },
  { img: imgNeoUltraSparkH2, imgW: 3772, imgH: 4096, name: <span>Neo ULTRA SPARK H<sub>2</sub></span>, sub: "8 em 1", tank: "Tanque de 3L" },
  { img: imgNeoMax,          imgW: 1515, imgH: 4012, name: "Neo MAX",                                sub: "6 em 1", tank: "Tanque de 3L" },
  { img: imgNeoMaxSpark,     imgW: 1515, imgH: 4012, name: "Neo MAX SPARK",                          sub: "7 em 1", tank: "Tanque de 3L" },
  { img: imgNeoMaxSparkH2,   imgW: 1515, imgH: 4012, name: <span>Neo MAX SPARK H<sub>2</sub></span>, sub: "8 em 1", tank: "Tanque de 3L" },
];

function CardImage({ src }: { src: string }) {
  return (
    <div className="flex items-center justify-center h-[220px] w-full min-w-[120px] max-w-[170px] overflow-hidden relative shrink-0">
      <img alt="" className="max-h-full max-w-full object-contain pointer-events-none" src={src} />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[335px] min-w-[180px] overflow-hidden p-[20px] rounded-[12px]">

      {/* Bloco de imagem: w-full h-[220px] fixo — object-contain preserva ratio dentro do bloco */}
      <div className="w-full h-[220px] shrink-0">
        <img
          alt=""
          className="w-full h-full object-contain pointer-events-none"
          src={product.img}
        />
      </div>

      {/* Nome — min-h-[55px] alinha nomes de 1 e 2 linhas */}
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0233c3] text-center w-full min-h-[55px] flex items-center justify-center">
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
              className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] flex-1 min-w-[240px] bg-clip-text text-transparent text-center lg:text-left"
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
                <div key={w.label} className="flex flex-[0_0_calc(50%-5px)] lg:flex-[0_0_calc(25%-8px)] gap-[10px] items-center">
                  <FigmaIcon src={imgCheckin} size={20} />
                  <div className="flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-0">
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

        {/* Feature cards — Painel LED Touch, Acquafy AI, Controle App */}
        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full overflow-hidden">

          {/* Card 1 – Painel LED Touch */}
          <div className="bg-white flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
            <div className="flex flex-1 flex-col gap-[20px] items-center w-full win-1024:items-start">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center win-1024:text-left w-full">
                <span className="text-[#0569ff]">Painel LED </span>
                <span className="text-[#1f2e91]">Touch Inteligente</span>
              </p>
              <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
                <CardImage src={imgPanel} />
                <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                  <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                    {[
                      "Contagem regressiva de 365 dias até a troca dos filtros",
                      "Relógio digital e data",
                      "Status da água em tempo real",
                      "Comunicação total com o App + IA",
                      "Alertas Inteligentes",
                    ].map((check, i) => (
                      <div key={i} className="flex gap-[10px] items-center w-full">
                        <FigmaIcon src={imgFeatCheck} size={14} />
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                          {check}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 – Acquafy AI no App */}
          <div className="bg-white flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
            <div className="flex flex-1 flex-col gap-[20px] items-center w-full win-1024:items-start">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] text-center win-1024:text-left w-full">
                Acquafy AI no App
              </p>
              <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
                <CardImage src={imgHomeMob} />
                <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#1f2e91] text-center win-1024:text-left w-full">
                    Inteligência artificial que aprende, analisa e cuida da sua água.
                  </p>
                  <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                    {[
                      "Suporte inteligente 24/7",
                      "Alertas de filtros",
                      "Recomendações personalizadas",
                      "Análise do consumo e hidratação",
                      "Monitoramento do equipamento",
                      "Experiência conectada com IA",
                    ].map((check, i) => (
                      <div key={i} className="flex gap-[10px] items-center w-full">
                        <FigmaIcon src={imgFeatCheck} size={14} />
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                          {check}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 – Controle pelo App */}
          <div className="bg-white flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
            <div className="flex flex-1 flex-col gap-[20px] items-center w-full win-1024:items-start">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] text-center win-1024:text-left w-full">
                Controle tudo pelo App Acquafy
              </p>
              <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
                <CardImage src={imgAppView} />
                <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                  <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                    {[
                      "Vida útil dos filtros",
                      "Dispositivos conectados",
                      "Suporte rápido e direto",
                      "Operação global",
                      "Multi Idioma",
                    ].map((check, i) => (
                      <div key={i} className="flex gap-[10px] items-center w-full">
                        <FigmaIcon src={imgFeatCheck} size={14} />
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                          {check}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-[10px] items-center w-full shrink-0">
                    <div className="bg-[#f6f9fe] border border-[#0233c3] flex flex-wrap gap-[5px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
                      <FigmaIcon src={imgFeatWifi} size={12} aspectW={13.5} aspectH={9.5} />
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[9px] leading-[11px] text-[#0233c3] whitespace-nowrap">
                        WiFi 5
                      </span>
                    </div>
                    <div className="bg-[#f6f9fe] border border-[#0233c3] flex flex-wrap gap-[5px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
                      <FigmaIcon src={imgBluetooth} size={12} aspectW={10} aspectH={15} />
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[9px] leading-[11px] text-[#0233c3] whitespace-nowrap">
                        Bluetooth 5.3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
