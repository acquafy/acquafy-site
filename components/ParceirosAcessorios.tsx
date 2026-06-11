import FigmaIcon from "./FigmaIcon";

const imgSilver    = "/figma-assets/b52cb10e-f442-402a-ac17-5c35da435575.png";
const imgGold      = "/figma-assets/abc43d20-830a-4269-a60d-86e42f721bf2.png";
const imgPlatinum  = "/figma-assets/3c04dafb-7a5d-451d-bdbc-f2ce68a70697.png";
const imgLayout    = "/figma-assets/3678b0a9-9a93-4bfb-94a3-3d319e921234.svg";
const imgCrown     = "/figma-assets/a17ec99d-f776-4f21-b16a-64d3b3021592.svg";
const imgMarketing = "/figma-assets/e1dd78ba-b24c-4fdf-bccf-e1ff0e6dd6dc.svg";
const imgPlay      = "/figma-assets/d5bc45e9-32a7-4a4f-80f3-4759074142e2.svg";
const imgCheckin   = "/figma-assets/2aa3fa11-0d1c-4acf-8e00-00b68596f8f5.svg";

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
              <div key={b.title} className="flex flex-1 gap-[20px] items-center justify-center max-w-[260px] min-w-[200px]">
                <div className="flex items-center justify-center shrink-0 size-[30px]">
                  <FigmaIcon src={b.icon} size={30} aspectW={b.iconW} aspectH={b.iconH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start shrink-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] max-w-[200px]">{b.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-[200px]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
