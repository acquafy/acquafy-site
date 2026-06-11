import FigmaIcon from "./FigmaIcon";

// ── Imagens de card ───────────────────────────────────────────────────────────
const imgFrame10    = "/figma-assets/25c396db-adbd-4033-a6c2-730dee33b6af.png"; // bg mix-blend
const imgCheckin    = "/figma-assets/8ac04097-5015-4f16-b49f-ca64faf46c51.svg"; // bullet 14px

// ── Ícones dos cards (todos com preserveAspectRatio="none") ───────────────────
const imgMobile     = "/figma-assets/c949cdb8-5a17-4158-b6b0-8aaef884917e.svg";  // 20.2×28
const imgBrain      = "/figma-assets/b541d68d-7cda-4158-8395-6f6eb9330e5a.svg";  // 32×32
const imgWifi       = "/figma-assets/44a31159-c52e-4424-9868-43766b829a50.svg";  // 32×22
const imgPessoas    = "/figma-assets/9d80f21c-8d2a-4d4e-90c7-46de9785bd6c.svg";  // 32×29.7

// ── Imagens bottom dos cards ──────────────────────────────────────────────────
const imgAppPhone   = "/figma-assets/47b82084-2a56-48d4-944e-16f89c7dfa57.png";
const imgAiApp      = "/figma-assets/93031ad9-3e45-43e5-9b96-aece9cb3ae2d.png";
const imgIotApp     = "/figma-assets/957e36e7-cb9c-4dd0-b61e-186dc792edf7.png";
const imgCloudApp   = "/figma-assets/f3ca984b-b4cb-4462-8ff0-edce017ec847.png";

const cards = [
  {
    icon: imgMobile, aspectW: 20.2, aspectH: 28,
    title: "App Acquafy",
    items: [
      "Visualizar equipamento e status",
      "Histórico de consumo e uso",
      "Recursos e informações técnicas",
      "Suporte e manuais",
      "Notificações e alertas",
      "Preferências e configurações",
    ],
    img: imgAppPhone,
  },
  {
    icon: imgBrain, aspectW: 32, aspectH: 32,
    title: "Acquafy AI",
    items: [
      "Insights automáticos e preditivos",
      "Recomendações personalizadas",
      "Detecção de padrões e anomalias",
      "Resumo inteligente da operação",
      "Assistente de operação com IA",
    ],
    img: imgAiApp,
  },
  {
    icon: imgWifi, aspectW: 32, aspectH: 22,
    title: "IoT & Dispositivos",
    items: [
      "Sensores conectados e telemetria",
      "Status online / offline",
      "Dados em tempo real",
      "Manutenção preventiva",
      "Alertas críticos de operação",
    ],
    img: imgIotApp,
  },
  {
    icon: imgPessoas, aspectW: 32, aspectH: 29.7,
    title: "Operação integrada",
    items: [
      "Integração com a Plataforma Acquafy",
      "Rede de parceiros e instaladores",
      "Gestão de vendas e pedidos",
      "Mídia, campanhas e conteúdos",
      "Gestão global e multi-idioma",
    ],
    img: imgCloudApp,
  },
];

export default function FeaturesAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">O que você pode fazer com o </span>
          <span className="text-[#0569ff]">App + AI + IoT</span>
        </h2>

        {/* Grid de cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col items-center min-h-[540px] min-w-[280px] overflow-clip rounded-[16px]"
            >
              {/* Conteúdo superior */}
              <div className="flex flex-col gap-[20px] items-start p-[20px] w-full">

                {/* Header: ícone + título */}
                <div className="flex gap-[20px] items-center w-full shrink-0">
                  <div className="flex items-center justify-center size-[60px] rounded-[12px] bg-[#0569ff] shrink-0">
                    <FigmaIcon src={card.icon} size={30} aspectW={card.aspectW} aspectH={card.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91] flex-1 min-h-[44px] flex items-center">
                    {card.title}
                  </p>
                </div>

                {/* Checklist */}
                <div className="flex flex-col gap-[20px] items-start w-full">
                  {card.items.map((text) => (
                    <div key={text} className="flex gap-[10px] items-center w-full">
                      <div className="size-[14px] shrink-0 flex items-center justify-center">
                        <img src={imgCheckin} alt="" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] flex-1">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Imagem inferior com mix-blend-multiply */}
              <div className="relative flex flex-col items-center justify-center min-h-[220px] overflow-clip w-full flex-1 mix-blend-multiply">
                <img
                  src={imgFrame10}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <img
                  src={card.img}
                  alt={card.title}
                  className="relative max-h-[200px] max-w-[195px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
