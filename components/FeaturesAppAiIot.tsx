import FigmaIcon from "./FigmaIcon";

// ── Imagens de card ───────────────────────────────────────────────────────────
const imgFrame10    = "/figma-assets/frame-10-bg-blend.webp"; // bg mix-blend
const imgCheckin    = "/figma-assets/icon-check-bullet.svg"; // bullet 14px

// ── Ícones dos cards (todos com preserveAspectRatio="none") ───────────────────
const imgMobile     = "/figma-assets/icon-mobile-20px.svg";  // 20.2×28
const imgBrain      = "/figma-assets/icon-brain-32px.svg";  // 32×32
const imgWifi       = "/figma-assets/icon-wifi-32px.svg";  // 32×22
const imgPessoas    = "/figma-assets/icon-pessoas-32px.svg";  // 32×29.7

// ── Imagens bottom dos cards ──────────────────────────────────────────────────
const imgAppPhone   = "/figma-assets/app-phone-mockup-a.webp";
const imgAiApp      = "/figma-assets/app-ai-screenshot.webp";
const imgIotApp     = "/figma-assets/app-iot-screen.webp";
const imgCloudApp   = "/figma-assets/app-cloud-screen.webp";

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
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
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
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] flex-1 min-h-[44px] flex items-center">
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
