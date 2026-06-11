import FigmaIcon from "./FigmaIcon";

const items = [
  {
    icon: "/figma-assets/b4436e72-2a16-43ae-b1ca-e743d4b415b5.svg",
    aspectW: 30, aspectH: 30, bg: "#0569ff",
    title: "Monitoramento em tempo real",
    desc: "Acompanhe seus dispositivos 24/7 de qualquer lugar.",
  },
  {
    icon: "/figma-assets/cda0fdfe-d6fe-4e76-a317-8d9c7f2efa51.svg",
    aspectW: 23, aspectH: 30, bg: "#6e54ef",
    title: "Alertas inteligentes",
    desc: "Notificações automáticas para agir antes de qualquer problema.",
  },
  {
    icon: "/figma-assets/2bea5dfa-f637-42ae-a0a1-9c37ae63ac66.svg",
    aspectW: 30, aspectH: 30, bg: "#36ae5c",
    title: "Qualidade da água",
    desc: "Dados precisos para garantir água pura e confiável.",
  },
  {
    icon: "/figma-assets/515915ba-bee4-479a-9d4b-3e347e3d019e.svg",
    aspectW: 30, aspectH: 30, bg: "#ffa920",
    title: "Status dos filtros",
    desc: "Verifique vida útil, trocas e desempenho dos filtros.",
  },
  {
    icon: "/figma-assets/2a2def0a-3c93-44cd-b762-a1d5c6043c64.svg",
    aspectW: 21, aspectH: 30, bg: "#6e54ef",
    title: "Controle remoto",
    desc: "Gerencie funções e operações direto do seu App.",
  },
  {
    icon: "/figma-assets/95fe6e51-57a0-459d-806d-7b0c277259f5.svg",
    aspectW: 30, aspectH: 30, bg: "#0569ff",
    title: "Atualizações e suporte",
    desc: "Software sempre atualizado e suporte especializado.",
  },
];

export default function ConectadoAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">Tudo conectado em uma </span>
          <span className="text-[#0569ff]">única experiência</span>
        </h2>

        {/* 6 cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
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
              <div className="flex flex-col gap-[20px] items-start text-center w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[36px] w-full flex items-center">
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
