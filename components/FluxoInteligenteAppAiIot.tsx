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
  "en-gb": {
    heading1: "Intelligent flow",
    heading2: " of operations",
    subtitle: "Product and device data collected, analysed and transformed into real-time insights and actions.",
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
  fr: {
    heading1: "Flux intelligent",
    heading2: " des opérations",
    subtitle: "Les données des produits et des appareils sont collectées, analysées et transformées en insights et actions en temps réel.",
    labels: [
      "Purificateur Neo / Acquafy Media",
      "App Acquafy",
      "IoT & Capteurs",
      "Plateforme Cloud",
      "Acquafy AI",
      "Alertes & Actions",
    ],
  },
  de: {
    heading1: "Intelligenter Betriebsablauf",
    heading2: "",
    subtitle: "Produkt- und Gerätedaten werden gesammelt, analysiert und in Echtzeit in Insights und Aktionen umgewandelt.",
    labels: [
      "Neo Reiniger / Acquafy Media",
      "App Acquafy",
      "IoT & Sensoren",
      "Cloud-Plattform",
      "Acquafy AI",
      "Alarme & Aktionen",
    ],
  },
  it: {
    heading1: "Flusso intelligente",
    heading2: " delle operazioni",
    subtitle: "Dati di prodotti e dispositivi raccolti, analizzati e trasformati in insights e azioni in tempo reale.",
    labels: [
      "Purificatore Neo / Acquafy Media",
      "App Acquafy",
      "IoT & Sensori",
      "Piattaforma Cloud",
      "Acquafy AI",
      "Avvisi & Azioni",
    ],
  },
  zh: {
    heading1: "智能运营",
    heading2: "流程",
    subtitle: "产品和设备数据被收集、分析，并实时转化为洞察和行动。",
    labels: [
      "Neo 净水器 / Acquafy Media",
      "App Acquafy",
      "IoT & 传感器",
      "Cloud 平台",
      "Acquafy AI",
      "提醒 & 行动",
    ],
  },
  ja: {
    heading1: "インテリジェントな",
    heading2: "オペレーションフロー",
    subtitle: "製品とデバイスのデータがリアルタイムで収集・分析され、インサイトとアクションに変換されます。",
    labels: [
      "Neo 浄水器 / Acquafy Media",
      "App Acquafy",
      "IoT & センサー",
      "Cloud プラットフォーム",
      "Acquafy AI",
      "アラート & アクション",
    ],
  },
  ko: {
    heading1: "지능형",
    heading2: " 운영 흐름",
    subtitle: "제품 및 기기 데이터가 수집, 분석되어 실시간 인사이트와 행동으로 전환됩니다.",
    labels: [
      "Neo 정수기 / Acquafy Media",
      "App Acquafy",
      "IoT & 센서",
      "Cloud 플랫폼",
      "Acquafy AI",
      "알림 & 행동",
    ],
  },
  sv: {
    heading1: "Intelligent flöde",
    heading2: " av driften",
    subtitle: "Produkt- och enhetsdata samlas in, analyseras och omvandlas till insikter och åtgärder i realtid.",
    labels: [
      "Neo Renare / Acquafy Media",
      "Acquafy App",
      "IoT & Sensorer",
      "Molnplattform",
      "Acquafy AI",
      "Aviseringar & Åtgärder",
    ],
  },
  fi: {
    heading1: "Älykäs toimintavirta",
    heading2: "",
    subtitle: "Tuote- ja laitetiedot kerätään, analysoidaan ja muunnetaan reaaliaikaisiksi oivalluksiksi ja toimenpiteiksi.",
    labels: [
      "Neo Puhdistin / Acquafy Media",
      "Acquafy App",
      "IoT & Anturit",
      "Pilvipalvelualusta",
      "Acquafy AI",
      "Hälytykset & Toimenpiteet",
    ],
  },
  ru: {
    heading1: "Интеллектуальный поток",
    heading2: " операций",
    subtitle: "Данные продуктов и устройств собираются, анализируются и преобразуются в инсайты и действия в режиме реального времени.",
    labels: [
      "Очиститель Neo / Acquafy Media",
      "Acquafy App",
      "IoT & Датчики",
      "Облачная платформа",
      "Acquafy AI",
      "Оповещения & Действия",
    ],
  },
  ro: {
    heading1: "Flux inteligent",
    heading2: " al operatiunii",
    subtitle: "Datele produselor si dispozitivelor sunt colectate, analizate si transformate in informatii si actiuni in timp real.",
    labels: [
      "Purificator Neo / Acquafy Media",
      "Acquafy App",
      "IoT & Senzori",
      "Platforma Cloud",
      "Acquafy AI",
      "Alerte & Actiuni",
    ],
  },
  he: {
    heading1: "זרימה חכמה",
    heading2: " של הפעילות",
    subtitle: "נתוני המוצרים והמכשירים נאספים, מנותחים ומומרים לתובנות ופעולות בזמן אמת.",
    labels: [
      "מטהר Neo / Acquafy Media",
      "אפליקציית Acquafy",
      "IoT & חיישנים",
      "פלטפורמת ענן",
      "Acquafy AI",
      "התראות & פעולות",
    ],
  },
  "pt-pt": {
    heading1: "Fluxo inteligente",
    heading2: " da operação",
    subtitle: "Dados dos produtos e dispositivos recolhidos, analisados e transformados em insights e ações em tempo real.",
    labels: [
      "Purificador Neo / Acquafy Media",
      "App Acquafy",
      "IoT & Sensores",
      "Plataforma Cloud",
      "Acquafy AI",
      "Alertas & Ações",
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
