// ── Ícones dos cartões ────────────────────────────────────────────────────────
const imgProfile   = "/figma-assets/e8b08e19-549f-46cf-9c7f-8e1bd6b4b256.svg"; // consumidor
const imgParceria  = "/figma-assets/d9ac404c-0e24-4e3b-8c9c-6bceac8a3557.svg"; // parceiro
const imgPlanetWeb = "/figma-assets/869c7e21-fb15-4cbd-993e-a635c3668a73.svg"; // operação global

// ── Fotos dos cartões ─────────────────────────────────────────────────────────
const imgConsum1   = "/figma-assets/95800f46-e137-4a29-892c-9ade129abbd5.png"; // mulher c/ phone
const imgConsum2   = "/figma-assets/34988d61-1cf6-42b9-9081-eb60606eece0.png"; // homem
const imgGlobal    = "/figma-assets/37a95ad4-7a3c-4372-85aa-7444466840a3.png"; // mapa global

type PersonCard = {
  layout: "person";
  icon: string;
  borderColor: string;
  titleColor: string;
  title: string;
  subtitle: string;
  desc: string;
  photo: string;
};

type MapCard = {
  layout: "map";
  icon: string;
  borderColor: string;
  titleColor: string;
  title: string;
  subtitle: string;
  desc: string;
  photo: string;
};

type CardDef = PersonCard | MapCard;

const cards: CardDef[] = [
  {
    layout: "person",
    icon: imgProfile,
    borderColor: "#0569ff",
    titleColor: "#0569ff",
    title: "Consumidor",
    subtitle: "Facilidade, controle e tranquilidade",
    desc: "Tenha o controle total do seu purificador, receba alertas e garanta água pura com mais conforto e segurança.",
    photo: imgConsum1,
  },
  {
    layout: "person",
    icon: imgParceria,
    borderColor: "#6e54ef",
    titleColor: "#6e54ef",
    title: "Parceiro",
    subtitle: "Visibilidade, suporte e operação conectada",
    desc: "Acompanhe seus clientes, receba insights e ofereça um atendimento mais ágil e eficiente.",
    photo: imgConsum2,
  },
  {
    layout: "map",
    icon: imgPlanetWeb,
    borderColor: "#06ae4c",
    titleColor: "#06ae4c",
    title: "Operação Global",
    subtitle: "Padronização, escalabilidade e dados centralizados",
    desc: "Gerencie múltiplas unidades e mercados com dados unificados e processos padronizados.",
    photo: imgGlobal,
  },
];

function CardContent({ card }: { card: CardDef }) {
  return (
    <>
      {/* Ícone com borda colorida */}
      <div
        className="bg-white flex items-center justify-center size-[60px] rounded-[12px] shrink-0"
        style={{ border: `2px solid ${card.borderColor}` }}
      >
        <div className="size-[30px] flex items-center justify-center">
          <img src={card.icon} alt="" className="max-w-full max-h-full object-contain" />
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
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full min-h-[40px] flex items-center">
          {card.subtitle}
        </p>
      </div>

      {/* Descrição */}
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
        {card.desc}
      </p>
    </>
  );
}

export default function BeneficiosAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
          Benefícios para clientes, parceiros e operadores
        </h2>

        {/* 3 cartões em linha */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {cards.map((card) => {
            if (card.layout === "person") {
              return (
                <div
                  key={card.title}
                  className="bg-white flex flex-[1_0_0] flex-wrap gap-[20px] items-start justify-center min-h-[260px] min-w-[280px] rounded-[16px] overflow-clip"
                >
                  {/* Conteúdo esquerdo */}
                  <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] pl-[20px] py-[20px]">
                    <CardContent card={card} />
                  </div>

                  {/* Foto à direita — top:20 cria espaço acima da cabeça */}
                  <div
                    className="relative overflow-clip self-stretch"
                    style={{ minWidth: 160, maxWidth: 160, minHeight: 200 }}
                  >
                    <img
                      src={card.photo}
                      alt={card.title}
                      className="absolute inset-x-0 bottom-0 w-full object-cover object-top"
                      style={{ top: 20 }}
                    />
                  </div>
                </div>
              );
            }

            // layout === "map" — Operação Global
            return (
              <div
                key={card.title}
                className="bg-white flex flex-[1_0_0] flex-wrap gap-y-0 items-start min-w-[280px] relative rounded-[16px]"
              >
                {/* Conteúdo — mr-[-90px] faz o bloco do mapa iniciar 90px antes do fim do conteúdo */}
                <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px] pl-[20px] py-[20px] mr-[-90px] relative z-[1]">
                  <CardContent card={card} />
                </div>

                {/* Mapa — self-stretch iguala a altura do card; justify-center centraliza verticalmente */}
                <div className="flex flex-[1_0_0] flex-col self-stretch items-end justify-center min-w-px py-[20px] relative">
                  <div
                    className="aspect-[4096/2591] max-h-[220px] mix-blend-multiply relative shrink-0 w-full"
                    style={{ maxWidth: 348, opacity: 0.49 }}
                  >
                    <img
                      src={card.photo}
                      alt=""
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
