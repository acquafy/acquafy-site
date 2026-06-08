import FigmaIcon from "./FigmaIcon";

// Card background images
const imgBgEssentials = "/figma-assets/5b8b92ca-add2-43d4-b26c-96a6dc29a2a5.png";
const imgBgPremium    = "/figma-assets/7afaf51e-c39c-46c2-943e-dc447b16793e.png";

// Checkin icons
const imgCheckinBlue   = "/figma-assets/e23b591b-0bf0-41a3-a330-a5f82eaf9553.svg"; // blue (essentials)
const imgCheckinPurple = "/figma-assets/d7553f09-85fb-4d05-b9d6-de700508cb60.svg"; // purple (premium)

// Product images (already in project)
const imgNeoFit          = "/figma-assets/44f74064-36a2-4ed8-b19d-c0e125bc3613.png"; // 3275×4096
const imgInfinitySparkH2 = "/figma-assets/08beedcc-95b5-449d-a7a5-a66aa64ead56.png"; // 837×1526

const essentialsFeatures = [
  "Painel LED Touch 10,1",
  "4 filtros de Alta Performance UF",
  "Opções de 1 até 7 funções",
  "Tanques: 400ml, 800ml. 1500ml e 3000ml",
  "Foco em praticidade e variedade para o dia a dia",
];

const premiumFeatures = [
  "Painel LCD IPS Touch 15.6",
  "Osmose Reversa (RO)",
  "Aço inox e design sofisticado",
  "Mini Media Network integrado",
  "Experiência premium completa",
];

function CheckItem({ label, iconSrc }: { label: string; iconSrc: string }) {
  return (
    <div className="flex gap-[10px] items-center min-w-[170px] w-full">
      <FigmaIcon src={iconSrc} size={16} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
        {label}
      </p>
    </div>
  );
}

export default function NeoVsPremium() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">Neo Essentials</span>
          {" vs "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Neo Premium
          </span>
        </h2>

        {/* Cards row */}
        <div className="flex flex-wrap gap-[40px] items-center w-full">

          {/* Essentials card */}
          <div className="border border-[#cbd0d4] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] overflow-hidden p-[40px] relative rounded-[16px]">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
              src={imgBgEssentials}
            />
            <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[200px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0569ff] w-full">
                Neo Essentials
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {essentialsFeatures.map((f) => (
                  <CheckItem key={f} label={f} iconSrc={imgCheckinBlue} />
                ))}
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-center justify-center max-w-[200px] min-w-[140px] relative">
              <img
                alt="Neo FIT"
                className="max-w-[200px] w-full object-contain pointer-events-none"
                src={imgNeoFit}
              />
            </div>
          </div>

          {/* Premium card */}
          <div className="border border-[#cbd0d4] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] overflow-hidden p-[40px] relative rounded-[16px]">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
              src={imgBgPremium}
            />
            <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[200px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#9f3df5] w-full">
                Neo Premium
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {premiumFeatures.map((f) => (
                  <CheckItem key={f} label={f} iconSrc={imgCheckinPurple} />
                ))}
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-center justify-center max-w-[200px] min-w-[140px] relative">
              <img
                alt="Neo INFINITY SPARK H2"
                className="max-w-[160px] w-full object-contain pointer-events-none"
                src={imgInfinitySparkH2}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
