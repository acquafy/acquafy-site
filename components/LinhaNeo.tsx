"use client";
import type { ReactNode } from "react";
import FigmaIcon from "./FigmaIcon";
import { PRODUCT_IMAGES } from "@/lib/products";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgCheckin = "/figma-assets/icon-check-e.svg";

const imgPanel      = "/figma-assets/panel-led.webp";
const imgHomeMob    = "/figma-assets/app-home-mobile.webp";
const imgAppView    = "/figma-assets/app-view-screen.webp";
const imgFeatCheck  = "/figma-assets/icon-check-30px.svg";
const imgFeatWifi   = "/figma-assets/icon-wifi-feat.svg";
const imgBluetooth  = "/figma-assets/icon-bluetooth.svg";

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

type Product = {
  img: string;
  imgW: number;
  imgH: number;
  name: string | ReactNode;
  sub: string;
  tank?: string;
};

const T: Record<Lang, {
  desc: string;
  waterHeader: [string, string, string];
  waterTypes: { label: string; sub: string }[];
  subNatural: string;
  sub6: string; sub7: string; sub8: string;
  tank400: string; tank800: string; tank1500: string; tank3l: string;
  panel: { title1: string; title2: string; checks: string[] };
  ai: { title: string; sub: string; checks: string[] };
  ctrl: { title: string; checks: string[] };
}> = {
  pt: {
    desc: "Linha acessível e inteligente com Painel LED Touch 10.1, App, UV LED, Wi-Fi 5, Bluetooth 5.3 e filtros de alta performance UF.",
    waterHeader: ["Tipos de água dos produtos ", "Neo Essentials", ", a água perfeita para cada momento"],
    waterTypes: [
      { label: "Água Natural",      sub: "Presente em todos" },
      { label: "Água Gelada",       sub: "Em todos" },
      { label: "45ºC Leite",        sub: "Em todos" },
      { label: "65ºC Chá",          sub: "Em todos" },
      { label: "85ºC Café",         sub: "Em todos" },
      { label: "100ºC Água Quente", sub: "Em todos" },
      { label: "Água com Gás",      sub: "7 e 8 em 1 Apenas" },
      { label: "Água Hidrogenada",  sub: "8 em 1 e Smart Apenas" },
    ],
    subNatural: "Apenas Natural",
    sub6: "6 em 1", sub7: "7 em 1", sub8: "8 em 1",
    tank400: "Tanque de 400 ml", tank800: "Tanque de 800 ml",
    tank1500: "Tanque de 1500 ml", tank3l: "Tanque de 3L",
    panel: {
      title1: "Painel LED ", title2: "Touch Inteligente",
      checks: [
        "Contagem regressiva de 365 dias até a troca dos filtros",
        "Relógio digital e data",
        "Status da água em tempo real",
        "Comunicação total com o App + IA",
        "Alertas Inteligentes",
      ],
    },
    ai: {
      title: "Acquafy AI no App",
      sub: "Inteligência artificial que aprende, analisa e cuida da sua água.",
      checks: [
        "Suporte inteligente 24/7",
        "Alertas de filtros",
        "Recomendações personalizadas",
        "Análise do consumo e hidratação",
        "Monitoramento do equipamento",
        "Experiência conectada com IA",
      ],
    },
    ctrl: {
      title: "Controle tudo pelo App Acquafy",
      checks: [
        "Vida útil dos filtros",
        "Dispositivos conectados",
        "Suporte rápido e direto",
        "Operação global",
        "Multi Idioma",
      ],
    },
  },
  en: {
    desc: "Affordable and smart line with LED Touch Panel 10.1, App, UV LED, Wi-Fi 5, Bluetooth 5.3 and high-performance UF filters.",
    waterHeader: ["Water types from ", "Neo Essentials", " products, the perfect water for every moment"],
    waterTypes: [
      { label: "Natural Water",       sub: "In all models" },
      { label: "Cold Water",          sub: "In all" },
      { label: "45°C Warm Milk",      sub: "In all" },
      { label: "65°C Tea",            sub: "In all" },
      { label: "85°C Coffee",         sub: "In all" },
      { label: "100°C Hot Water",     sub: "In all" },
      { label: "Sparkling Water",     sub: "7 & 8 in 1 Only" },
      { label: "Hydrogen Water",      sub: "8 in 1 & Smart Only" },
    ],
    subNatural: "Natural Only",
    sub6: "6 in 1", sub7: "7 in 1", sub8: "8 in 1",
    tank400: "400 ml Tank", tank800: "800 ml Tank",
    tank1500: "1500 ml Tank", tank3l: "3L Tank",
    panel: {
      title1: "Smart LED ", title2: "Touch Panel",
      checks: [
        "365-day countdown to filter replacement",
        "Digital clock and date",
        "Real-time water status",
        "Full communication with App + AI",
        "Smart Alerts",
      ],
    },
    ai: {
      title: "Acquafy AI in the App",
      sub: "Artificial intelligence that learns, analyzes and cares for your water.",
      checks: [
        "Smart support 24/7",
        "Filter alerts",
        "Personalized recommendations",
        "Consumption and hydration analysis",
        "Equipment monitoring",
        "AI-connected experience",
      ],
    },
    ctrl: {
      title: "Control everything via Acquafy App",
      checks: [
        "Filter lifespan",
        "Connected devices",
        "Fast and direct support",
        "Global operation",
        "Multi Language",
      ],
    },
  },
  es: {
    desc: "Línea accesible e inteligente con Panel LED Touch 10.1, App, UV LED, Wi-Fi 5, Bluetooth 5.3 y filtros UF de alto rendimiento.",
    waterHeader: ["Tipos de agua de los productos ", "Neo Essentials", ", el agua perfecta para cada momento"],
    waterTypes: [
      { label: "Agua Natural",          sub: "En todos los modelos" },
      { label: "Agua Fría",             sub: "En todos" },
      { label: "45°C Leche Caliente",   sub: "En todos" },
      { label: "65°C Té",               sub: "En todos" },
      { label: "85°C Café",             sub: "En todos" },
      { label: "100°C Agua Caliente",   sub: "En todos" },
      { label: "Agua con Gas",          sub: "Solo 7 y 8 en 1" },
      { label: "Agua Hidrogenada",      sub: "Solo 8 en 1 y Smart" },
    ],
    subNatural: "Solo Natural",
    sub6: "6 en 1", sub7: "7 en 1", sub8: "8 en 1",
    tank400: "Depósito de 400 ml", tank800: "Depósito de 800 ml",
    tank1500: "Depósito de 1500 ml", tank3l: "Depósito de 3L",
    panel: {
      title1: "Panel LED ", title2: "Touch Inteligente",
      checks: [
        "Cuenta regresiva de 365 días hasta el cambio de filtros",
        "Reloj digital y fecha",
        "Estado del agua en tiempo real",
        "Comunicación total con App + IA",
        "Alertas Inteligentes",
      ],
    },
    ai: {
      title: "Acquafy IA en la App",
      sub: "Inteligencia artificial que aprende, analiza y cuida tu agua.",
      checks: [
        "Soporte inteligente 24/7",
        "Alertas de filtros",
        "Recomendaciones personalizadas",
        "Análisis del consumo e hidratación",
        "Monitoreo del equipo",
        "Experiencia conectada con IA",
      ],
    },
    ctrl: {
      title: "Controla todo desde la App Acquafy",
      checks: [
        "Vida útil de los filtros",
        "Dispositivos conectados",
        "Soporte rápido y directo",
        "Operación global",
        "Multi Idioma",
      ],
    },
  },
};

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
      <div className="w-full h-[220px] shrink-0">
        <img
          alt=""
          className="w-full h-full object-contain pointer-events-none"
          src={product.img}
        />
      </div>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0233c3] text-center w-full min-h-[55px] flex items-center justify-center">
        {product.name}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
        {product.sub}
      </p>
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
  const { lang } = useLang();
  const t = T[lang];

  const row1: Product[] = [
    { img: imgNeoUp,    imgW: 3275, imgH: 4096, name: "Neo UP",                                        sub: t.subNatural },
    { img: imgNeoFit,   imgW: 3275, imgH: 4096, name: "Neo FIT",                                       sub: t.sub6, tank: t.tank400 },
    { img: imgNeoSmart, imgW: 3275, imgH: 4096, name: <span>Neo SMART H<sub>2</sub></span>,            sub: t.sub7, tank: t.tank800 },
    { img: imgNeoTouch, imgW: 3384, imgH: 4096, name: "Neo TOUCH",                                     sub: t.sub6, tank: t.tank800 },
    { img: imgNeoPlus,  imgW: 3384, imgH: 4096, name: "Neo PLUS",                                      sub: t.sub6, tank: t.tank1500 },
  ];

  const row2: Product[] = [
    { img: imgNeoUltra,        imgW: 3772, imgH: 4096, name: "Neo ULTRA",                              sub: t.sub6, tank: t.tank3l },
    { img: imgNeoUltraSpark,   imgW: 3772, imgH: 4096, name: "Neo ULTRA SPARK",                        sub: t.sub7, tank: t.tank3l },
    { img: imgNeoUltraSparkH2, imgW: 3772, imgH: 4096, name: <span>Neo ULTRA SPARK H<sub>2</sub></span>, sub: t.sub8, tank: t.tank3l },
    { img: imgNeoMax,          imgW: 1515, imgH: 4012, name: "Neo MAX",                                sub: t.sub6, tank: t.tank3l },
    { img: imgNeoMaxSpark,     imgW: 1515, imgH: 4012, name: "Neo MAX SPARK",                          sub: t.sub7, tank: t.tank3l },
    { img: imgNeoMaxSparkH2,   imgW: 1515, imgH: 4012, name: <span>Neo MAX SPARK H<sub>2</sub></span>, sub: t.sub8, tank: t.tank3l },
  ];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

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
            {t.desc}
          </p>

          <div className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#1f2e91] w-full">
              {t.waterHeader[0]}
              <span className="font-['Avenir_LT_Pro:85_Heavy']">{t.waterHeader[1]}</span>
              {t.waterHeader[2]}
            </p>
            <div className="flex flex-wrap gap-[20px_10px] items-center w-full">
              {t.waterTypes.map((w) => (
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

        <div className="pb-[20px] w-full">
          <div className="flex flex-wrap gap-[15px] items-stretch justify-center w-full">
            {row1.map((p, i) => <ProductCard key={i} product={p} />)}
          </div>
        </div>

        <div className="flex flex-wrap gap-[15px] items-stretch justify-center w-full">
          {row2.map((p, i) => <ProductCard key={i} product={p} />)}
        </div>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full overflow-hidden">

          {/* Card 1 – Painel LED Touch */}
          <div className="bg-white flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
            <div className="flex flex-1 flex-col gap-[20px] items-center w-full win-1024:items-start">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center win-1024:text-left w-full">
                <span className="text-[#0569ff]">{t.panel.title1}</span>
                <span className="text-[#1f2e91]">{t.panel.title2}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
                <CardImage src={imgPanel} />
                <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                  <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                    {t.panel.checks.map((check, i) => (
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

          {/* Card 2 – Acquafy AI */}
          <div className="bg-white flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
            <div className="flex flex-1 flex-col gap-[20px] items-center w-full win-1024:items-start">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] text-center win-1024:text-left w-full">
                {t.ai.title}
              </p>
              <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
                <CardImage src={imgHomeMob} />
                <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#1f2e91] text-center win-1024:text-left w-full">
                    {t.ai.sub}
                  </p>
                  <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                    {t.ai.checks.map((check, i) => (
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
                {t.ctrl.title}
              </p>
              <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
                <CardImage src={imgAppView} />
                <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                  <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                    {t.ctrl.checks.map((check, i) => (
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
