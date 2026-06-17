"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Recursos",
    heading2: " em destaque",
    items: [
      { title: "Monitoramento global",              desc: "Visão completa de operações e dispositivos em qualquer lugar." },
      { title: "Manutenção preventiva",             desc: "Antecipe trocas e evite paradas inesperadas." },
      { title: "Contagem de 365 dias dos filtros",  desc: "Controle preciso de vida útil e desempenho dos filtros." },
      { title: "Controle via App",                  desc: "Funções e ajustes diretamente do seu smartphone." },
      { title: "Insights com IA",                   desc: "Decisões mais rápidas com dados e sugestões inteligentes." },
      { title: "Operação em 16 idiomas",            desc: "Histórico e acompanhamento" },
    ],
  },
  en: {
    heading1: "Featured",
    heading2: " resources",
    items: [
      { title: "Global monitoring",              desc: "Complete view of operations and devices anywhere." },
      { title: "Preventive maintenance",         desc: "Anticipate replacements and avoid unexpected downtime." },
      { title: "365-day filter countdown",       desc: "Precise control of filter lifespan and performance." },
      { title: "App control",                    desc: "Functions and adjustments directly from your smartphone." },
      { title: "AI insights",                    desc: "Faster decisions with data and intelligent suggestions." },
      { title: "Operation in 16 languages",      desc: "History and tracking" },
    ],
  },
  es: {
    heading1: "Recursos",
    heading2: " destacados",
    items: [
      { title: "Monitoreo global",                   desc: "Visión completa de operaciones y dispositivos en cualquier lugar." },
      { title: "Mantenimiento preventivo",           desc: "Anticipa cambios y evita paradas inesperadas." },
      { title: "Conteo de 365 días de los filtros",  desc: "Control preciso de vida útil y rendimiento de los filtros." },
      { title: "Control vía App",                    desc: "Funciones y ajustes directamente desde tu smartphone." },
      { title: "Insights con IA",                    desc: "Decisiones más rápidas con datos y sugerencias inteligentes." },
      { title: "Operación en 16 idiomas",            desc: "Historial y seguimiento" },
    ],
  },
};

const icons = [
  { icon: "/figma-assets/icon-global-monitoring.svg",      aspectW: 30, aspectH: 30, bg: "#0569ff" },
  { icon: "/figma-assets/icon-preventive-maintenance.svg", aspectW: 30, aspectH: 30, bg: "#36ae5c" },
  { icon: "/figma-assets/icon-filter-365days.svg",         aspectW: 36, aspectH: 40, bg: "#ffa920" },
  { icon: "/figma-assets/icon-app-control.svg",            aspectW: 21, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-ai-insights-app.svg",        aspectW: 30, aspectH: 30, bg: "#6e54ef" },
  { icon: "/figma-assets/icon-16-languages.svg",           aspectW: 30, aspectH: 30, bg: "#0569ff" },
];

export default function RecursosAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  const items = t.items.map((item, i) => ({ ...icons[i], ...item }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">{t.heading1}</span>
          <span className="text-[#1f2e91]">{t.heading2}</span>
        </h2>

        {/* 6 cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-start min-w-[200px] p-[20px] rounded-[16px]"
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
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[36px] w-full flex items-center justify-center text-center">
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
