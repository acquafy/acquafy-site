// ── Ícones dos cartões ────────────────────────────────────────────────────────
const imgProfile   = "/figma-assets/e8b08e19-549f-46cf-9c7f-8e1bd6b4b256.svg"; // consumidor
const imgParceria  = "/figma-assets/d9ac404c-0e24-4e3b-8c9c-6bceac8a3557.svg"; // parceiro
const imgPlanetWeb = "/figma-assets/869c7e21-fb15-4cbd-993e-a635c3668a73.svg"; // operação global

// ── Fotos dos cartões ─────────────────────────────────────────────────────────
const imgConsum1   = "/figma-assets/95800f46-e137-4a29-892c-9ade129abbd5.png"; // mulher c/ phone
const imgConsum2   = "/figma-assets/34988d61-1cf6-42b9-9081-eb60606eece0.png"; // homem
const imgGlobal    = "/figma-assets/37a95ad4-7a3c-4372-85aa-7444466840a3.png"; // mapa global

const cards = [
  {
    icon: imgProfile,
    borderColor: "#0569ff",
    titleColor: "#0569ff",
    title: "Consumidor",
    subtitle: "Facilidade, controle e tranquilidade",
    desc: "Tenha o controle total do seu purificador, receba alertas e garanta água pura com mais conforto e segurança.",
    photo: imgConsum1,
    photoAspect: "140/227" as const,
    photoOpacity: undefined as number | undefined,
    photoBlend: false,
  },
  {
    icon: imgParceria,
    borderColor: "#6e54ef",
    titleColor: "#6e54ef",
    title: "Parceiro",
    subtitle: "Visibilidade, suporte e operação conectada",
    desc: "Acompanhe seus clientes, receba insights e ofereça um atendimento mais ágil e eficiente.",
    photo: imgConsum2,
    photoAspect: "140/227" as const,
    photoOpacity: undefined as number | undefined,
    photoBlend: false,
  },
  {
    icon: imgPlanetWeb,
    borderColor: "#06ae4c",
    titleColor: "#06ae4c",
    title: "Operação Global",
    subtitle: "Padronização, escalabilidade e dados centralizados",
    desc: "Gerencie múltiplas unidades e mercados com dados unificados e processos padronizados.",
    photo: imgGlobal,
    photoAspect: "4096/2591" as const,
    photoOpacity: 0.49 as number | undefined,
    photoBlend: true,
  },
];

export default function BeneficiosAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Título — alinhado à esquerda */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] w-full">
          Benefícios para clientes, parceiros e operadores
        </h2>

        {/* 3 cartões em linha */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white flex flex-[1_0_0] flex-wrap gap-[20px] items-start justify-center min-h-[260px] min-w-[280px] rounded-[16px] overflow-clip"
            >
              {/* Conteúdo esquerdo */}
              <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] pl-[20px] py-[20px]">

                {/* Ícone com borda colorida */}
                <div
                  className="bg-white flex items-center justify-center size-[60px] rounded-[12px] shrink-0"
                  style={{ border: `2px solid ${card.borderColor}` }}
                >
                  <div className="size-[30px] flex items-center justify-center">
                    <img src={card.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Título + subtítulo */}
                <div className="flex flex-col gap-[10px] w-full">
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] w-full"
                    style={{ color: card.titleColor }}
                  >
                    {card.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {card.subtitle}
                  </p>
                </div>

                {/* Descrição */}
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
                  {card.desc}
                </p>
              </div>

              {/* Foto à direita */}
              <div
                className="flex flex-col items-end justify-center overflow-clip pt-[10px]"
                style={{ minWidth: 160, maxWidth: 160, height: 260 }}
              >
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: card.photoAspect,
                    maxHeight: 250,
                    opacity: card.photoOpacity ?? 1,
                    mixBlendMode: card.photoBlend ? "multiply" : "normal",
                  }}
                >
                  <img
                    src={card.photo}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
