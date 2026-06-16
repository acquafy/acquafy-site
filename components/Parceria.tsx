import FigmaIcon from "./FigmaIcon";

const imgSilver = "/figma-assets/product-silver-e.webp";
const imgGold = "/figma-assets/product-gold-e.webp";
const imgPlatinum = "/figma-assets/product-platinum-e.webp";
const imgCheckin = "/figma-assets/icon-check-d.svg";

// Benefits card icons
const imgPartner = "/figma-assets/icon-partner-a.svg";
const imgCertificado = "/figma-assets/icon-certificado-b.svg";
const imgMarketing = "/figma-assets/icon-marketing-b.svg";
const imgFone = "/figma-assets/icon-fone-b.svg";

type TierCard = {
  icon: string;
  name: string;
  nameColor: string;
  checks: string[];
};

const tiers: TierCard[] = [
  {
    icon: imgSilver,
    name: "Silver",
    nameColor: "#3e4650",
    checks: [
      "Suporte dedicado",
      "Treinamento e materiais",
      "Condições exclusivas",
      "Acesso ao App + IA",
    ],
  },
  {
    icon: imgGold,
    name: "Gold",
    nameColor: "#dfa727",
    checks: [
      "Operação com Media Network",
      "Suporte avançado",
      "Material de marketing",
      "Receita recorrente",
    ],
  },
  {
    icon: imgPlatinum,
    name: "Platinum",
    nameColor: "#0569ff",
    checks: [
      "Distribuição em larga escala",
      "Suporte premium 24h",
      "Soluções personalizadas",
      "Projetos estratégicos",
    ],
  },
];

// Benefits icons: partner 21.5×21.16 ≈sq, cert 14.17×21.5 portrait, marketing 21.5×15.82 landscape, fone 21.5×21.5 sq
const benefitsItems = [
  { icon: imgPartner,     aspectW: 43,    aspectH: 42,    text: "Rede global de parceiros" },
  { icon: imgCertificado, aspectW: 14.17, aspectH: 21.5,  text: "Treinamento e certificações" },
  { icon: imgMarketing,   aspectW: 21.5,  aspectH: 15.82, text: "Marketing e campanhas exclusivas" },
  { icon: imgFone,        aspectW: 21.5,  aspectH: 21.5,  text: "Suporte e acompanhamento contínuo" },
];

export default function Parceria() {
  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center px-[20px] py-[40px] w-full">
      {/* Header */}
      <div className="flex flex-col gap-[5px] items-center max-w-[1400px] overflow-hidden w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] min-w-[240px] w-full text-center lg:text-left">
          <span className="text-[#2a2a2b]">Programa de</span>
          <span className="text-[#0233c3]">{" Parceria Global Acquafy"}</span>
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
          Cresça conosco e conquiste o mundo com a Acquafy.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-[10px] items-stretch justify-center max-w-[1400px] overflow-hidden w-full">
        {/* Tier cards */}
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="bg-[#f6f9fe] flex flex-1 flex-wrap gap-y-[20px] items-start min-w-[280px] p-[20px] rounded-[16px]"
          >
            <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[280px]">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <div className="flex gap-[10px] items-center w-full">
                  <div className="flex flex-col items-center justify-center size-[46px] shrink-0">
                    <img alt={tier.name} className="w-full h-full object-contain" src={tier.icon} />
                  </div>
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0"
                    style={{ color: tier.nameColor }}
                  >
                    {tier.name}
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] items-start w-full">
                  {tier.checks.map((check) => (
                    <div key={check} className="flex gap-[8px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={8} aspectW={9} aspectH={6.44} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[15px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="/parceria" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] w-full cursor-pointer">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center flex-1 min-w-0">
                  Ver mais!
                </span>
              </a>
            </div>
          </div>
        ))}

        {/* Benefits card */}
        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-center justify-between min-h-[206px] min-w-[280px] p-[20px] rounded-[16px]">
          {benefitsItems.map((item) => (
            <div key={item.text} className="flex gap-[10px] items-center w-full">
              <FigmaIcon src={item.icon} size={20} aspectW={item.aspectW} aspectH={item.aspectH} />
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
