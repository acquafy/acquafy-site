import FigmaIcon from "./FigmaIcon";

const imgBg           = "/figma-assets/3958d1a8-eec0-471c-9c54-c4776137a789.png";
const imgShield       = "/figma-assets/96d98b3e-dbe3-4d1e-b240-380b886c4cc7.svg";
const imgFastSupport  = "/figma-assets/32402a0b-fa3e-4b73-a43a-edb18bad797c.svg";
const imgRating       = "/figma-assets/1688e4c3-a773-4b05-bfd4-aa673b6d1f1a.svg";
const imgPlanet       = "/figma-assets/7650bdc3-d65a-456a-ac34-017eb512653c.svg";

const diferenciais = [
  {
    icon: imgShield,
    aspectW: 26.14, aspectH: 30,
    title: "Atendimento especializado",
    desc: "Equipe treinada e certificada para oferecer o melhor suporte.",
  },
  {
    icon: imgFastSupport,
    aspectW: 30, aspectH: 30,
    title: "Respostas rápidas",
    desc: "Agilidade no atendimento e soluções eficientes.",
  },
  {
    icon: imgRating,
    aspectW: 480.3, aspectH: 453,
    title: "Satisfação garantida",
    desc: "Compromisso com a sua satisfação e sucesso.",
  },
  {
    icon: imgPlanet,
    aspectW: 30, aspectH: 30,
    title: "Suporte global",
    desc: "Atendimento para clientes e parceiros em 16 idiomas.",
  },
];

export default function DiferenciaisSuporte() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="relative flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full">
        {/* Background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#1f2e91] inset-0 rounded-[16px]" />
          <img
            src={imgBg}
            alt=""
            className="absolute inset-0 w-full h-full max-w-none object-cover opacity-40 rounded-[16px]"
          />
        </div>

        {/* Diferencial cards */}
        {diferenciais.map((item) => (
          <div
            key={item.title}
            className="relative flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[100px]"
          >
            <div className="flex flex-col items-center justify-center shrink-0 size-[50px]">
              <FigmaIcon src={item.icon} size={40} aspectW={item.aspectW} aspectH={item.aspectH} />
            </div>
            <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px text-white">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] w-full">
                {item.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] w-full">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
