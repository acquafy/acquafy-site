import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgPurif  = "/figma-assets/ts-icon-agua-intel.svg";   // água inteligente  40×40
const imgBrain  = "/figma-assets/ts-icon-brain.svg";        // brain             30×30
const imgIot    = "/figma-assets/ts-icon-iot.svg";          // wifi IoT          30×20
const imgTela   = "/figma-assets/ts-icon-tela.svg";         // tela grande vert  21×30
const imgShield = "/figma-assets/ts-icon-shield-agua.svg";  // shield água       24×30
const imgScale    = "/figma-assets/ts-icon-scale.svg";        // scale graphic     30×30
const imgMagnific = "/figma-assets/ts-hero-right.png";        // water globe decorativo (absolute)

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

// ── Sub-component ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[265px] min-w-[160px] px-[10px] py-[20px] rounded-[16px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91] text-center w-full min-h-[36px]">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
        {description}
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaFazDiferenca() {
  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden px-[20px] py-[40px] relative w-full">
      {/* Globo de água decorativo — absolute, alinhado ao spacer lateral direito */}
      <div className="-translate-x-1/2 absolute left-[calc(50%+576px)] pointer-events-none size-[450px] top-0">
        <img alt="" className="absolute inset-0 block max-w-none object-cover size-full" src={imgMagnific} />
      </div>

      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        {/* Header */}
        <div className="flex flex-col gap-[10px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] max-w-[800px] w-full">
            <span className="text-[#0569ff]">Tecnologia</span>
            {" que faz a diferença"}
          </h2>
          <p
            className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] max-w-[800px] w-full"
            style={{ fontFeatureSettings: '"case" 1' }}
          >
            Desenvolvemos soluções completas que unem hardware avançado, software inteligente e conectividade para oferecer a melhor experiência em purificação de água e gestão de impacto.
          </p>
        </div>

        {/* Cards grid — inner container (gap-[10px]) + spacer para o globo decorativo */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          <div className="flex flex-[1_0_0] flex-wrap gap-[10px] items-start justify-center min-w-[180px] overflow-clip">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
          {/* Spacer alinhado à imagem decorativa absoluta */}
          <div className="flex-[1_0_0] h-[265px] max-w-[260px] min-h-[250px] min-w-[260px]" />
        </div>
      </div>
    </section>
  );
}
