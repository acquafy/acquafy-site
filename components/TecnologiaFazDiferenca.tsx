import FigmaIcon from "./FigmaIcon";

const imgPurif    = "/figma-assets/ts-icon-agua-intel.svg";
const imgBrain    = "/figma-assets/ts-icon-brain.svg";
const imgIot      = "/figma-assets/ts-icon-iot.svg";
const imgTela     = "/figma-assets/ts-icon-tela.svg";
const imgShield   = "/figma-assets/ts-icon-shield-agua.svg";
const imgScale    = "/figma-assets/ts-icon-scale.svg";
const imgMagnific = "/figma-assets/ts-hero-right.png";

const features = [
  {
    icon: imgPurif,  aspectW: 40,  aspectH: 40,
    title: "Purificação Avançada",
    description: "Sistemas de filtragem multi-etapas que removem impurezas, odores, metais pesados e microrganismos, garantindo água pura e alcalina.",
  },
  {
    icon: imgBrain,  aspectW: 30,  aspectH: 30,
    title: "Inteligência Artificial",
    description: "IA integrada para monitoramento da água, manutenção preditiva, uso otimizado e insights para operação e desempenho.",
  },
  {
    icon: imgIot,    aspectW: 30,  aspectH: 20,
    title: "Conectividade IoT",
    description: "Dispositivos conectados em tempo real, com monitoramento remoto, atualizações e gestão centralizadas via plataforma Acquafy.",
  },
  {
    icon: imgTela,   aspectW: 21,  aspectH: 30,
    title: "Interface Inteligente",
    description: "Telas LCD IPS Touch com experiência intuitiva, informações em tempo real, anúncios e interatividade para usuários de marcas.",
  },
  {
    icon: imgShield, aspectW: 24,  aspectH: 30,
    title: "Segurança Total",
    description: "Proteção de dados, controle de acesso, criptografia e conformidade com as principais normas internacionais de segurança e privacidade.",
  },
  {
    icon: imgScale,  aspectW: 30,  aspectH: 30,
    title: "Dados e Performance",
    description: "Dashboards completos com indicadores de uso, qualidade da água, receita e impacto para decisões estratégicas baseadas em dados.",
  },
];

function FeatureCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[265px] min-w-[150px] px-[10px] py-[20px] rounded-[16px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full min-h-[36px]">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
        {description}
      </p>
    </div>
  );
}

export default function TecnologiaFazDiferenca() {
  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] max-w-[800px] w-full">
            <span className="text-[#0569ff]">Tecnologia</span>
            {" que faz a diferença"}
          </h2>
          <p
            className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] max-w-[800px] w-full"
            style={{ fontFeatureSettings: '"case" 1' }}
          >
            Desenvolvemos soluções completas que unem hardware avançado, software inteligente e conectividade para oferecer a melhor experiência em purificação de água e gestão de impacto.
          </p>
        </div>

        {/* Cards + Globe — flex-col mobile / flex-row desktop */}
        <div className="
          flex flex-col gap-[100px] items-center justify-center min-w-[240px] relative w-full
          md:content-center md:flex-row md:flex-wrap md:gap-[20px]
        ">

          {/* Cards grid */}
          <div className="content-start flex flex-wrap gap-[10px] items-start justify-center min-w-[180px] overflow-clip relative w-full md:flex-[1_0_0]">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Globe — inline flex item, overflows 135px upward from h-[265px] container */}
          <div className="flex flex-col h-[265px] items-center justify-end max-w-[260px] min-h-[250px] min-w-[260px] relative w-full md:flex-[1_0_0]">
            <div className="mix-blend-multiply relative shrink-0 size-[400px]">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgMagnific}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
