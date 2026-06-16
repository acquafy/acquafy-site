import FigmaIcon from "./FigmaIcon";

const imgSilver    = "/figma-assets/product-silver-b.webp";
const imgGold      = "/figma-assets/product-gold-b.webp";
const imgPlatinum  = "/figma-assets/product-platinum-b.webp";
const imgLayout    = "/figma-assets/icon-layout.svg";
const imgCrown     = "/figma-assets/icon-crown-a.svg";
const imgMarketing = "/figma-assets/icon-marketing-c.svg";
const imgPlay      = "/figma-assets/icon-play-a.svg";
const imgCheckin   = "/figma-assets/icon-check-c.svg";

const tiers = [
  { img: imgSilver,   imgAspect: 1, name: "Silver",   desc: "Acessórios essenciais para apresentar sua marca com qualidade Acquafy." },
  { img: imgGold,     imgAspect: 1, name: "Gold",     desc: "Materiais premium para experiências com diferenciação e sofisticação." },
  { img: imgPlatinum, imgAspect: 1, name: "Platinum", desc: "Soluções exclusivas e personalizações para destacar sua liderança de mercado." },
];

const benefits = [
  { icon: imgLayout,    iconW: 629, iconH: 629, title: "Identidade Consistente",    desc: "Padronização global com a identidade visual Acquafy." },
  { icon: imgCrown,     iconW: 353, iconH: 353, title: "Qualidade Premium",          desc: "Materiais selecionados e acabamento de excelência." },
  { icon: imgMarketing, iconW: 40,  iconH: 28,  title: "Merchandising Estratégico", desc: "Fortalece sua marca em todos os pontos de contato." },
  { icon: imgPlay,      iconW: 27,  iconH: 27,  title: "Ideal para Showrooms",       desc: "Acessórios que valorizam o ambiente e a experiência." },
  { icon: imgCheckin,   iconW: 30,  iconH: 30,  title: "Ativação de Eventos",        desc: "Perfeito para feiras, ações promocionais e ativações." },
];

export default function ParceirosAcessorios() {
  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[20px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] min-w-[240px] w-full">
            Para parceiros, eventos e ações promocionais
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            Os acessórios Acquafy podem ser utilizados por parceiros Silver, Gold e Platinum em feiras, ativações de showroom, lançamentos de produtos, campanhas de aquisições e operações da Media Network.
          </p>
        </div>

        <div className="flex flex-col gap-[20px] items-start w-full">
          {/* Tier cards */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center overflow-hidden w-full">
            {tiers.map((tier) => (
              <div key={tier.name} className="bg-white flex flex-1 flex-col items-start min-w-[280px] p-[20px] rounded-[16px]">
                <div className="flex gap-[20px] items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-center shrink-0" style={{ width: 46, height: 50 }}>
                    <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                      <img alt={tier.name} className="absolute inset-0 w-full h-full object-cover" src={tier.img} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff]">{tier.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">{tier.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits row */}
          <div className="bg-white flex flex-wrap gap-[20px_10px] items-center justify-center p-[20px] rounded-[16px] w-full">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-1 gap-[20px] items-center justify-center min-w-[200px]">
                <div className="flex items-center justify-center shrink-0 size-[30px]">
                  <FigmaIcon src={b.icon} size={30} aspectW={b.iconW} aspectH={b.iconH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{b.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
