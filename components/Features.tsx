"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  card1Title1: string;
  card1Title2: string;
  card1Items: string[];
  card2Title: string;
  card2Subtitle: string;
  card2Items: string[];
  card3Title: string;
  card3Items: string[];
}> = {
  pt: {
    card1Title1: "Painel LED ",
    card1Title2: "Touch Inteligente",
    card1Items: [
      "Contagem regressiva de 365 dias até a troca dos filtros",
      "Relógio digital e data",
      "Status da água em tempo real",
      "Comunicação total com o App + IA",
      "Alertas Inteligentes",
    ],
    card2Title: "Acquafy AI no App",
    card2Subtitle: "Inteligência artificial que aprende, analisa e cuida da sua água.",
    card2Items: [
      "Suporte inteligente 24/7",
      "Alertas de filtros",
      "Recomendações personalizadas",
      "Análise do consumo e hidratação",
      "Monitoramento do equipamento",
      "Experiência conectada com IA",
    ],
    card3Title: "Controle tudo pelo App Acquafy",
    card3Items: [
      "Vida útil dos filtros",
      "Dispositivos conectados",
      "Suporte rápido e direto",
      "Operação global",
      "Multi Idioma",
    ],
  },
  en: {
    card1Title1: "LED ",
    card1Title2: "Smart Touch Panel",
    card1Items: [
      "365-day countdown until filter replacement",
      "Digital clock and date",
      "Real-time water status",
      "Full communication with App + AI",
      "Smart Alerts",
    ],
    card2Title: "Acquafy AI in the App",
    card2Subtitle: "Artificial intelligence that learns, analyzes and takes care of your water.",
    card2Items: [
      "Smart 24/7 support",
      "Filter alerts",
      "Personalized recommendations",
      "Consumption and hydration analysis",
      "Equipment monitoring",
      "AI-connected experience",
    ],
    card3Title: "Control everything via the Acquafy App",
    card3Items: [
      "Filter lifetime",
      "Connected devices",
      "Fast and direct support",
      "Global operation",
      "Multi Language",
    ],
  },
  es: {
    card1Title1: "Panel LED ",
    card1Title2: "Touch Inteligente",
    card1Items: [
      "Cuenta regresiva de 365 días hasta el cambio de filtros",
      "Reloj digital y fecha",
      "Estado del agua en tiempo real",
      "Comunicación total con la App + IA",
      "Alertas Inteligentes",
    ],
    card2Title: "Acquafy AI en la App",
    card2Subtitle: "Inteligencia artificial que aprende, analiza y cuida tu agua.",
    card2Items: [
      "Soporte inteligente 24/7",
      "Alertas de filtros",
      "Recomendaciones personalizadas",
      "Análisis del consumo e hidratación",
      "Monitoreo del equipo",
      "Experiencia conectada con IA",
    ],
    card3Title: "Controla todo desde la App Acquafy",
    card3Items: [
      "Vida útil de los filtros",
      "Dispositivos conectados",
      "Soporte rápido y directo",
      "Operación global",
      "Multi Idioma",
    ],
  },
};

const imgPanel = "/figma-assets/panel-led.webp";
const imgHomeMob = "/figma-assets/app-home-mobile.webp"; // Acquafy AI app screenshot
const imgAppView = "/figma-assets/app-view-screen.webp";
const imgCheckin = "/figma-assets/icon-check-30px.svg"; // 30×30 sq, inset -5.36%
const imgWifi = "/figma-assets/icon-wifi-feat.svg";
const imgBluetooth = "/figma-assets/icon-bluetooth.svg";

/**
 * CardImage — altura limitada a 220px, largura auto pelo aspect-ratio.
 *
 * Problema anterior: object-cover + container portrait (ex: 271/500) preenchia
 * a largura e cortava topo/baixo do smartphone.
 *
 * Solução: container h-[220px] max-w-[170px] + img object-contain.
 *   - Portrait (phone): max-h=220 → width = 220 × 271/500 ≈ 119px  ✓ sem corte
 *   - Landscape (panel): max-w=170 → height = 170 × 2265/4096 ≈ 94px ✓ sem corte
 */
function CardImage({ src }: { src: string; outerAspect?: string; innerAspect?: string }) {
  return (
    <div className="flex items-center justify-center h-[220px] max-w-[170px] overflow-hidden relative shrink-0">
      <img
        alt=""
        className="max-h-full max-w-full object-contain pointer-events-none"
        src={src}
      />
    </div>
  );
}

export default function Features() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-wrap gap-[10px] items-stretch justify-center max-w-[1400px] overflow-hidden w-full">

        {/* Card 1 – Painel LED Touch */}
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
          <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[200px] win-1024:items-start">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center win-1024:text-left w-full">
              <span className="text-[#0569ff]">{t.card1Title1}</span>
              <span className="text-[#1f2e91]">{t.card1Title2}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
              <CardImage src={imgPanel} outerAspect="4096/2265" />
              <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                  {t.card1Items.map((check, i) => (
                    <div key={i} className="flex gap-[10px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={14} />
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
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
          <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[200px] win-1024:items-start">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] text-center win-1024:text-left w-full">
              {t.card2Title}
            </p>
            <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
              <CardImage src={imgHomeMob} outerAspect="1970/3639" innerAspect="271/500" />
              <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#1f2e91] text-center win-1024:text-left w-full">
                  {t.card2Subtitle}
                </p>
                <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                  {t.card2Items.map((check, i) => (
                    <div key={i} className="flex gap-[10px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={14} />
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
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-start min-h-[310px] min-w-[280px] p-[20px] rounded-[16px]">
          <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[200px] win-1024:items-start">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] text-center win-1024:text-left w-full">
              {t.card3Title}
            </p>
            <div className="flex flex-wrap justify-center gap-[20px] items-center min-h-[210px] w-full shrink-0">
              <CardImage src={imgAppView} outerAspect="1970/3639" />
              <div className="flex flex-1 flex-col gap-[20px] items-center min-w-[210px] win-1024:items-start">
                <div className="flex flex-col h-[134px] items-start justify-between w-full shrink-0">
                  {t.card3Items.map((check, i) => (
                    <div key={i} className="flex gap-[10px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={14} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Connectivity badges */}
                <div className="flex gap-[10px] items-center w-full shrink-0">
                  <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[5px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
                    <FigmaIcon src={imgWifi} size={12} aspectW={13.5} aspectH={9.5} />
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[9px] leading-[11px] text-[#0233c3] whitespace-nowrap">
                      WiFi 5
                    </span>
                  </div>
                  <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[5px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
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
    </section>
  );
}
