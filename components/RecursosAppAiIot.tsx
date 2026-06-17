import FigmaIcon from "./FigmaIcon";

const items = [
  {
    icon: "/figma-assets/icon-global-monitoring.svg",
    aspectW: 30, aspectH: 30, bg: "#0569ff",
    title: "Monitoramento global",
    desc: "Visão completa de operações e dispositivos em qualquer lugar.",
  },
  {
    icon: "/figma-assets/icon-preventive-maintenance.svg",
    aspectW: 30, aspectH: 30, bg: "#36ae5c",
    title: "Manutenção preventiva",
    desc: "Antecipe trocas e evite paradas inesperadas.",
  },
  {
    icon: "/figma-assets/icon-filter-365days.svg",
    aspectW: 36, aspectH: 40, bg: "#ffa920",
    title: "Contagem de 365 dias dos filtros",
    desc: "Controle preciso de vida útil e desempenho dos filtros.",
  },
  {
    icon: "/figma-assets/icon-app-control.svg",
    aspectW: 21, aspectH: 30, bg: "#6e54ef",
    title: "Controle via App",
    desc: "Funções e ajustes diretamente do seu smartphone.",
  },
  {
    icon: "/figma-assets/icon-ai-insights-app.svg",
    aspectW: 30, aspectH: 30, bg: "#6e54ef",
    title: "Insights com IA",
    desc: "Decisões mais rápidas com dados e sugestões inteligentes.",
  },
  {
    icon: "/figma-assets/icon-16-languages.svg",
    aspectW: 30, aspectH: 30, bg: "#0569ff",
    title: "Operação em 16 idiomas",
    desc: "Histórico e acompanhamento",
  },
];

export default function RecursosAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">Recursos</span>
          <span className="text-[#1f2e91]"> em destaque</span>
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
