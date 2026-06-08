import FigmaIcon from "./FigmaIcon";

const imgConsumidor1 = "/figma-assets/56776b51-408d-4a0c-9374-2f194eabeb97.png";
const imgConsumidor2 = "/figma-assets/85cddf8a-416b-4296-91b2-3393d3544b76.png";
const imgPerfil      = "/figma-assets/2be77672-9559-4963-bcd9-ddfcb844ff0e.png";
const imgCheckin     = "/figma-assets/6e980cf7-5c09-4a14-8503-ec31deee8e89.svg";

const columns = [
  {
    img: imgConsumidor1,
    role: "Clientes",
    color: "#0233c3",
    items: [
      "Controle total do purificador pelo app",
      "Alertas inteligentes de manutenção",
      "Qualidade da água monitorada 24/7",
      "Suporte rápido pelo app",
      "Recomendações personalizadas por IA",
    ],
  },
  {
    img: imgConsumidor2,
    role: "Parceiros",
    color: "#7a16d2",
    items: [
      "Gestão da carteira de clientes",
      "Monitoramento remoto de dispositivos",
      "Alertas para ação preventiva",
      "Dashboard com dados em tempo real",
      "Integração com a plataforma Acquafy",
    ],
  },
  {
    img: imgPerfil,
    role: "Operadores",
    color: "#36ae5c",
    items: [
      "Visão global das operações",
      "Telemetria e diagnóstico remoto",
      "Gestão de múltiplos dispositivos",
      "Relatórios e métricas de desempenho",
      "Automação de fluxos operacionais",
    ],
  },
];

export default function BeneficiosAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <div className="flex flex-col gap-[10px] items-center w-full">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#333] text-center w-full">
            Benefícios para{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              clientes, parceiros e operadores
            </span>
          </h2>
        </div>

        {/* Columns */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {columns.map((col) => (
            <div
              key={col.role}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] p-[20px] rounded-[16px]"
            >
              {/* Person image */}
              <div className="flex items-center justify-center w-full h-[180px] overflow-hidden rounded-[12px]">
                <img
                  src={col.img}
                  alt={col.role}
                  className="max-h-[180px] max-w-full object-contain"
                />
              </div>

              {/* Role label */}
              <p
                className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-center w-full"
                style={{ color: col.color }}
              >
                {col.role}
              </p>

              {/* Feature list */}
              <div className="flex flex-col gap-[10px] items-start w-full">
                {col.items.map((item) => (
                  <div key={item} className="flex gap-[10px] items-start w-full">
                    <FigmaIcon src={imgCheckin} size={14} className="mt-[2px] shrink-0" />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[18px] text-[#2a2a2b] flex-1 min-w-0">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
