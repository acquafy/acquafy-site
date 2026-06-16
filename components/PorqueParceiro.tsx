import FigmaIcon from "./FigmaIcon";

const imgScale  = "/figma-assets/icon-scale-b.svg";  // 30×30
const imgMoney  = "/figma-assets/icon-money-33px.svg";  // 33×30
const imgGlobe  = "/figma-assets/icon-globe-30px-b.svg";  // 30×30
const imgBrain  = "/figma-assets/icon-brain-30px-c.svg";  // 30×30
const imgCrown  = "/figma-assets/icon-crown-30px.svg";  // 30×30
const imgPhone  = "/figma-assets/icon-phone-30px.svg";  // 30×30

const cards = [
  {
    icon: imgScale,  iW: 30,    iH: 30,
    title: "Modelo escalável",
    desc:  "Atue localmente com estrutura global e grande potencial de crescimento.",
  },
  {
    icon: imgMoney,  iW: 33.33, iH: 30,
    title: "Receita recorrente",
    desc:  "Ganhos contínuos com vendas, mídia ou distribuição do ecossistema Neo.",
  },
  {
    icon: imgGlobe,  iW: 30,    iH: 30,
    title: "Expansão global",
    desc:  "Presença em até 180 países e 6 regiões comerciais.",
  },
  {
    icon: imgBrain,  iW: 30,    iH: 30,
    title: "Tecnologia inteligente",
    desc:  "Plataforma com App, IA e IoT para mais eficiência e controle total.",
  },
  {
    icon: imgCrown,  iW: 30,    iH: 30,
    title: "Produtos Premium",
    desc:  "Purificadores Neo de alta performance para todos os perfis de mercado.",
  },
  {
    icon: imgPhone,  iW: 30,    iH: 30,
    title: "Suporte comercial",
    desc:  "Acompanhamento global com materiais, treinamentos e suporte multilíngue.",
  },
];

export default function PorqueParceiro() {
  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {"Porque se tornar um "}
          <span className="text-[#0569ff]">parceiro Acquafy?</span>
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <div className="flex flex-col items-center justify-center size-[40px] shrink-0">
                <FigmaIcon src={c.icon} size={30} aspectW={c.iW} aspectH={c.iH} />
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center min-h-[50px] w-full">
                {c.title}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
