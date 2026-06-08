import FigmaIcon from "./FigmaIcon";

// ── Ícone de checklist ────────────────────────────────────────────────────────
const imgCheckin  = "/figma-assets/6e980cf7-5c09-4a14-8503-ec31deee8e89.svg";  // 30×30 checkmark

// ── Imagens de cada card (PNGs — screenshots/mockups reais) ──────────────────
const imgAppMock  = "/figma-assets/991de71d-f429-413a-8c1f-9e65639775c4.png";  // Frame10 — App mockup
const imgAiApp    = "/figma-assets/ea9727d9-0f55-41cc-a1f5-2a6fdd27f678.png";  // Acquafy AI app
const imgIotApp   = "/figma-assets/a8009bb3-a2cf-4241-a8b1-70920ccd0d58.png";  // IoT device
const imgCloudApp = "/figma-assets/b2f49f74-e9ae-4702-9a58-ec2009ac1cad.png";  // Plataforma Cloud

const cards = [
  {
    title: "App Acquafy",
    titleColor: "#0233c3",
    img: imgAppMock,
    items: [
      "Visualizar equipamento e status",
      "Histórico de consumo e uso",
      "Recursos e informações técnicas",
      "Suporte e manuais",
      "Notificações e alertas",
      "Preferências e configurações",
    ],
  },
  {
    title: "Acquafy AI",
    titleColor: "#7a16d2",
    img: imgAiApp,
    items: [
      "Insights automáticos e preditivos",
      "Recomendações personalizadas",
      "Detecção de padrões e anomalias",
      "Resumo inteligente da operação",
      "Assistente de operação com IA",
    ],
  },
  {
    title: "IoT & Dispositivos",
    titleColor: "#36ae5c",
    img: imgIotApp,
    items: [
      "Sensores conectados e telemetria",
      "Status online / offline",
      "Dados em tempo real",
      "Manutenção preventiva",
      "Alertas críticos de operação",
    ],
  },
  {
    title: "Operação Integrada",
    titleColor: "#0569ff",
    img: imgCloudApp,
    items: [
      "Integração com a Plataforma Acquafy",
      "Rede de parceiros e instaladores",
      "Gestão de vendas e pedidos",
      "Mídia, campanhas e conteúdos",
      "Gestão global e multi-idioma",
    ],
  },
];

export default function FeaturesAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#333] text-center w-full">
          O que você pode fazer com o{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            App + AI + IoT?
          </span>
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] p-[20px] rounded-[16px]"
            >
              {/* Título do card */}
              <p
                className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] w-full"
                style={{ color: card.titleColor }}
              >
                {card.title}
              </p>

              {/* Imagem — mockup/screenshot */}
              <div className="flex items-center justify-center w-full overflow-hidden rounded-[12px] bg-[#f6f9fe]" style={{ minHeight: 160 }}>
                <img
                  src={card.img}
                  alt={card.title}
                  className="max-h-[180px] max-w-full object-contain pointer-events-none"
                />
              </div>

              {/* Lista de bullet points */}
              <div className="flex flex-col gap-[10px] items-start w-full flex-1">
                {card.items.map((item) => (
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
