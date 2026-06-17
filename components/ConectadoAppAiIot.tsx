"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Tudo conectado em uma ",
    heading2: "única experiência",
    items: [
      { title: "Monitoramento em tempo real", desc: "Acompanhe seus dispositivos 24/7 de qualquer lugar." },
      { title: "Alertas inteligentes", desc: "Notificações automáticas para agir antes de qualquer problema." },
      { title: "Qualidade da água", desc: "Dados precisos para garantir água pura e confiável." },
      { title: "Status dos filtros", desc: "Verifique vida útil, trocas e desempenho dos filtros." },
      { title: "Controle remoto", desc: "Gerencie funções e operações direto do seu App." },
      { title: "Atualizações e suporte", desc: "Software sempre atualizado e suporte especializado." },
    ],
  },
  en: {
    heading1: "Everything connected in a ",
    heading2: "single experience",
    items: [
      { title: "Real-time monitoring", desc: "Track your devices 24/7 from anywhere." },
      { title: "Smart alerts", desc: "Automatic notifications to act before any problem." },
      { title: "Water quality", desc: "Accurate data to ensure pure and reliable water." },
      { title: "Filter status", desc: "Check lifespan, replacements and filter performance." },
      { title: "Remote control", desc: "Manage functions and operations directly from your App." },
      { title: "Updates and support", desc: "Always up-to-date software and specialized support." },
    ],
  },
  es: {
    heading1: "Todo conectado en una ",
    heading2: "única experiencia",
    items: [
      { title: "Monitoreo en tiempo real", desc: "Sigue tus dispositivos 24/7 desde cualquier lugar." },
      { title: "Alertas inteligentes", desc: "Notificaciones automáticas para actuar antes de cualquier problema." },
      { title: "Calidad del agua", desc: "Datos precisos para garantizar agua pura y confiable." },
      { title: "Estado de los filtros", desc: "Verifica la vida útil, cambios y rendimiento de los filtros." },
      { title: "Control remoto", desc: "Gestiona funciones y operaciones directamente desde tu App." },
      { title: "Actualizaciones y soporte", desc: "Software siempre actualizado y soporte especializado." },
    ],
  },
};

const icons = [
  { icon: "/figma-assets/icon-monitoring-realtime.svg", aspectW: 30, aspectH: 30, bg: "#0569ff" },
  { icon: "/figma-assets/icon-smart-alerts.svg",        aspectW: 23, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-water-quality-app.svg",   aspectW: 30, aspectH: 30, bg: "#36ae5c" },
  { icon: "/figma-assets/icon-filter-status.svg",       aspectW: 30, aspectH: 30, bg: "#ffa920" },
  { icon: "/figma-assets/icon-remote-control.svg",      aspectW: 21, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-updates-support.svg",     aspectW: 30, aspectH: 30, bg: "#0569ff" },
];

export default function ConectadoAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const items = t.items.map((item, i) => ({ ...icons[i], ...item }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        {/* 6 cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px]"
            >
              {/* Ícone — círculo colorido */}
              <div
                className="flex items-center justify-center size-[60px] rounded-full shrink-0"
                style={{ backgroundColor: item.bg }}
              >
                <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-[20px] items-center text-center w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[36px] w-full flex items-center justify-center">
                  {item.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] w-full">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
