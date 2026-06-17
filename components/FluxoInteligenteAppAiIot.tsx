"use client";
import React from "react";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Fotos nos círculos ───────────────────────────────────────────────────────
const imgPurifier  = "/figma-assets/product-purifier.webp";
const imgAppPhone  = "/figma-assets/app-phone-mockup-b.webp";

// ── Ícones SVG nos círculos ──────────────────────────────────────────────────
const imgWifi      = "/figma-assets/icon-wifi-63px.svg";  // 63×43
const imgCloud     = "/figma-assets/icon-cloud-63px.svg";  // 63×63
const imgBrain     = "/figma-assets/icon-brain-63px.svg";  // 63×63
const imgBell      = "/figma-assets/icon-bell.svg";  // 49×63

// ── Seta tracejada ───────────────────────────────────────────────────────────
const imgArrow     = "/figma-assets/image-arrow.webp";

type StepItem =
  | { label: string; type: "photo"; src: string; padding: string }
  | { label: string; type: "icon";  src: string; padding: string; aspectW: number; aspectH: number };

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  labels: string[];
}> = {
  pt: {
    heading1: "Fluxo inteligente",
    heading2: " da operação",
    subtitle: "Dados dos produtos e dispositivos coletados, analisados e transformados em insights e ações em tempo real.",
    labels: [
      "Purificador Neo / Acquafy Media",
      "App Acquafy",
      "IoT & Sensores",
      "Plataforma Cloud",
      "Acquafy AI",
      "Alertas & Ações",
    ],
  },
  en: {
    heading1: "Intelligent flow",
    heading2: " of operations",
    subtitle: "Product and device data collected, analyzed and transformed into real-time insights and actions.",
    labels: [
      "Neo Purifier / Acquafy Media",
      "Acquafy App",
      "IoT & Sensors",
      "Cloud Platform",
      "Acquafy AI",
      "Alerts & Actions",
    ],
  },
  es: {
    heading1: "Flujo inteligente",
    heading2: " de la operación",
    subtitle: "Datos de productos y dispositivos recopilados, analizados y transformados en insights y acciones en tiempo real.",
    labels: [
      "Purificador Neo / Acquafy Media",
      "App Acquafy",
      "IoT & Sensores",
      "Plataforma Cloud",
      "Acquafy AI",
      "Alertas & Acciones",
    ],
  },
};

const stepMeta = [
  { type: "photo" as const, src: imgPurifier, padding: "p-[24px]" },
  { type: "photo" as const, src: imgAppPhone,  padding: "p-[24px]" },
  { type: "icon"  as const, src: imgWifi,      padding: "p-[30px]", aspectW: 63, aspectH: 43 },
  { type: "icon"  as const, src: imgCloud,     padding: "p-[30px]", aspectW: 63, aspectH: 63 },
  { type: "icon"  as const, src: imgBrain,     padding: "p-[30px]", aspectW: 63, aspectH: 63 },
  { type: "icon"  as const, src: imgBell,      padding: "p-[30px]", aspectW: 49, aspectH: 63 },
];

export default function FluxoInteligenteAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const steps: StepItem[] = t.labels.map((label, i) => ({
    label,
    ...stepMeta[i],
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] rounded-[16px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">{t.heading1}</span>
          <span className="text-[#1f2e91]">{t.heading2}</span>
        </h2>

        {/* Steps — itens flex-1; setas preenchem espaço disponível entre eles */}
        <div className="flex flex-wrap gap-y-[30px] items-start justify-center w-full">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              {/* Item */}
              <div className="flex-[1_0_0] flex flex-col gap-[12px] items-center min-w-[120px]">

                {/* Círculo */}
                <div
                  className={`border border-[#cbd0d4] flex items-center justify-center size-[120px] rounded-full shrink-0 ${step.padding}`}
                >
                  {step.type === "icon" ? (
                    <FigmaIcon src={step.src} size={40} aspectW={step.aspectW} aspectH={step.aspectH} />
                  ) : (
                    <img
                      src={step.src}
                      alt={step.label}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Label */}
                <p
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[18px] text-[#1f2e91] text-center w-full min-h-[36px] flex items-center justify-center"
                  style={{}}
                >
                  {step.label}
                </p>
              </div>

              {/* Seta tracejada — wrapper flex-1 preenche espaço entre itens */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:flex flex-1 items-start justify-center shrink-0"
                  style={{ paddingTop: 52 }}
                >
                  <img src={imgArrow} alt="" width={41} height={15} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Subtítulo */}
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#2a2a2b] text-center w-full min-w-[240px]">
          {t.subtitle}
        </p>
      </div>
    </section>
  );
}
