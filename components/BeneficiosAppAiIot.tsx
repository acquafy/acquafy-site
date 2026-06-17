"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Ícones dos cartões ────────────────────────────────────────────────────────
const imgProfile   = "/figma-assets/icon-profile-consumer.svg"; // consumidor
const imgParceria  = "/figma-assets/icon-parceiro.svg"; // parceiro
const imgPlanetWeb = "/figma-assets/icon-planetweb-operacao-global.svg"; // operação global

// ── Fotos dos cartões ─────────────────────────────────────────────────────────
const imgConsum1   = "/figma-assets/photo-consumer-woman.webp"; // mulher c/ phone
const imgConsum2   = "/figma-assets/photo-consumer-man.webp"; // homem
const imgGlobal    = "/figma-assets/image-global-map.webp"; // mapa global

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

const T: Record<Lang, {
  heading: string;
  cards: { title: string; subtitle: string; desc: string }[];
}> = {
  pt: {
    heading: "Benefícios para clientes, parceiros e operadores",
    cards: [
      {
        title: "Consumidor",
        subtitle: "Facilidade, controle e tranquilidade",
        desc: "Tenha o controle total do seu purificador, receba alertas e garanta água pura com mais conforto e segurança.",
      },
      {
        title: "Parceiro",
        subtitle: "Visibilidade, suporte e operação conectada",
        desc: "Acompanhe seus clientes, receba insights e ofereça um atendimento mais ágil e eficiente.",
      },
      {
        title: "Operação Global",
        subtitle: "Padronização, escalabilidade e dados centralizados",
        desc: "Gerencie múltiplas unidades e mercados com dados unificados e processos padronizados.",
      },
    ],
  },
  en: {
    heading: "Benefits for customers, partners and operators",
    cards: [
      {
        title: "Consumer",
        subtitle: "Ease, control and peace of mind",
        desc: "Take full control of your purifier, receive alerts and ensure pure water with greater comfort and safety.",
      },
      {
        title: "Partner",
        subtitle: "Visibility, support and connected operations",
        desc: "Monitor your customers, receive insights and offer faster, more efficient service.",
      },
      {
        title: "Global Operations",
        subtitle: "Standardization, scalability and centralized data",
        desc: "Manage multiple units and markets with unified data and standardized processes.",
      },
    ],
  },
  es: {
    heading: "Beneficios para clientes, socios y operadores",
    cards: [
      {
        title: "Consumidor",
        subtitle: "Facilidad, control y tranquilidad",
        desc: "Ten el control total de tu purificador, recibe alertas y garantiza agua pura con mayor comodidad y seguridad.",
      },
      {
        title: "Socio",
        subtitle: "Visibilidad, soporte y operación conectada",
        desc: "Acompaña a tus clientes, recibe insights y ofrece una atención más ágil y eficiente.",
      },
      {
        title: "Operación Global",
        subtitle: "Estandarización, escalabilidad y datos centralizados",
        desc: "Gestiona múltiples unidades y mercados con datos unificados y procesos estandarizados.",
      },
    ],
  },
};

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
          className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] w-full"
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
  const { lang } = useLang();
  const t = T[lang];

  const cards: CardDef[] = [
    {
      layout: "person",
      icon: imgProfile,
      borderColor: "#0569ff",
      titleColor: "#0569ff",
      title: t.cards[0].title,
      subtitle: t.cards[0].subtitle,
      desc: t.cards[0].desc,
      photo: imgConsum1,
    },
    {
      layout: "person",
      icon: imgParceria,
      borderColor: "#6e54ef",
      titleColor: "#6e54ef",
      title: t.cards[1].title,
      subtitle: t.cards[1].subtitle,
      desc: t.cards[1].desc,
      photo: imgConsum2,
    },
    {
      layout: "map",
      icon: imgPlanetWeb,
      borderColor: "#06ae4c",
      titleColor: "#06ae4c",
      title: t.cards[2].title,
      subtitle: t.cards[2].subtitle,
      desc: t.cards[2].desc,
      photo: imgGlobal,
    },
  ];

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[60px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full text-center lg:text-left">
          {t.heading}
        </h2>

        {/* 3 cartões — flex-col abaixo de 1220px; flex-row a partir de 1220px
            Breakpoint: 3×380 + 2×20(gaps) + 2×20(padding) = 1220px */}
        <div className="flex flex-col gap-[20px] items-stretch w-full 1220:flex-row 1220:flex-wrap 1220:justify-center">
          {cards.map((card) => {
            if (card.layout === "person") {
              return (
                <div
                  key={card.title}
                  className="bg-white flex min-h-[260px] rounded-[16px] relative 1220:flex-[1_0_0] 1220:min-w-[380px]"
                >
                  {/* Conteúdo — pr-[180px] reserva espaço para a foto absoluta (160px + 20px gap) */}
                  <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start pl-[20px] py-[20px] pr-[180px]">
                    <CardContent card={card} />
                  </div>

                  {/* Foto — contida no bloco, pt-[10px], imagem alinhada ao rodapé com object-contain */}
                  <div
                    className="absolute right-0 inset-y-0 overflow-hidden pt-[10px]"
                    style={{ width: 160 }}
                  >
                    <img
                      src={card.photo}
                      alt={card.title}
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>
              );
            }

            // layout === "map" — Operação Global (mantém layout original)
            return (
              <div
                key={card.title}
                className="bg-white flex flex-[1_0_0] flex-wrap gap-y-0 items-start min-w-[280px] relative rounded-[16px] 1220:min-w-[380px]"
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
