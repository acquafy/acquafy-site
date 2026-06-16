import FigmaIcon from "./FigmaIcon";

// Aspect ratios from Figma design
const imgParceria  = "/figma-assets/icon-parceria-large.svg";  // 1125×1078 ≈ sq
const imgEscala    = "/figma-assets/icon-escala.svg";  // 30×30 sq
const imgAdaptacao = "/figma-assets/icon-adaptacao.svg";  // 38×40 portrait
const imgEducacao  = "/figma-assets/icon-educacao.svg";  // 30×22 landscape
const imgSustent   = "/figma-assets/icon-sustent-large.svg";  // 492×475 ≈ sq

const pillars = [
  {
    icon: imgParceria, iconW: 1125, iconH: 1078,
    title: "Parcerias estratégicas",
    desc:  "Trabalhamos com distribuidores, integradores e investidores que compartilham nossa visão de impacto e crescimento.",
  },
  {
    icon: imgEscala, iconW: 30, iconH: 30,
    title: "Modelo escalável",
    desc:  "Tecnologia própria, operação padronizada e suporte completo para garantir crescimento consistente e rentável.",
  },
  {
    icon: imgAdaptacao, iconW: 38, iconH: 40,
    title: "Adaptação local",
    desc:  "Soluções flexíveis que se adaptam à cultura, necessidades e regulamentações de cada mercado.",
  },
  {
    icon: imgEducacao, iconW: 30, iconH: 22,
    title: "Capacitação contínua",
    desc:  "Treinamentos, marketing e suporte técnico para impulsionar nossos parceiros e garantir o sucesso da operação.",
  },
  {
    icon: imgSustent, iconW: 492, iconH: 475,
    title: "Impacto sustentável",
    desc:  "Promovemos saúde, inclusão, renda e preservação ambiental por meio do acesso a água pura e consciente.",
  },
];

export default function ExpansaoGlobalPilares() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          Nossos pilares para expansão
        </h2>

        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <FigmaIcon src={p.icon} size={40} aspectW={p.iconW} aspectH={p.iconH} />
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[50px]">
                {p.title}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
