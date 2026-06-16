import FigmaIcon from "./FigmaIcon";

const imgAdmin    = "/figma-assets/icon-admin.svg";
const imgSilver   = "/figma-assets/product-silver-c.webp";
const imgGold     = "/figma-assets/product-gold-d.webp";
const imgPlatinum = "/figma-assets/product-platinum-c.webp";
const imgMegaphone= "/figma-assets/icon-megaphone.svg";

const profiles = [
  {
    iconType: "svg", icon: imgAdmin,    iconW: 440, iconH: 512,
    title: "Admin Acquafy",
    desc: "Acesso total à plataforma e gestão global.",
  },
  {
    iconType: "png", icon: imgSilver,   iconW: 40, iconH: 40,
    title: "Parceiro Silver",
    desc: "Vendas, comissões e acompanhamento.",
  },
  {
    iconType: "png", icon: imgGold,     iconW: 40, iconH: 40,
    title: "Parceiro Gold",
    desc: "Gestão de equipe, vendas, comissões e relatórios.",
  },
  {
    iconType: "png", icon: imgPlatinum, iconW: 40, iconH: 40,
    title: "Parceiro Platinum",
    desc: "Gestão avançada, regras FOB e performance.",
  },
  {
    iconType: "svg", icon: imgMegaphone, iconW: 185, iconH: 185,
    title: "Anunciante",
    desc: "Criação e gestão de campanhas e mídia.",
  },
];

export default function PlatformProfiles() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          Perfis de acesso
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {profiles.map((p) => (
            <div key={p.title} className="bg-[#f6f9fe] flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className="flex items-center justify-center shrink-0 size-[40px]">
                {p.iconType === "png" ? (
                  <img alt={p.title} className="size-full object-contain" src={p.icon} />
                ) : (
                  <FigmaIcon src={p.icon} size={40} aspectW={p.iconW} aspectH={p.iconH} />
                )}
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{p.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
