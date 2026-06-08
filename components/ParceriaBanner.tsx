import FigmaIcon from "./FigmaIcon";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";

const imgBg       = "/figma-assets/79af86b4-3435-4ade-8e82-a20bc14ca999.png";
const imgPlanet   = "/figma-assets/8c104eef-a025-400c-bb4a-d473b8a6e5fc.svg";  // 30×30
const imgSilver   = "/figma-assets/38da40a7-26bb-4f7a-99a5-65b47e867479.png";
const imgGold     = "/figma-assets/ae409aed-f3e1-4496-bc73-e0fa23423f95.png";
const imgPlatinum = "/figma-assets/35878417-4ef7-4de9-90e1-4319485c805b.png";

export default function ParceriaBanner() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[875px] px-[20px] py-[40px] w-full overflow-hidden xl:min-h-[calc(100vh-80px)]">
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      <div className="relative flex-1 flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">
        {/* Left column */}
        <div className="flex flex-[1_0_0] flex-col gap-[40px] items-start justify-center max-w-[580px] min-w-[280px]">

          {/* Badge */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgPlanet} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#0233c3]">
              NOVA FASE GLOBAL
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] bg-clip-text text-transparent w-full text-center lg:text-left"
            style={{ backgroundImage: "linear-gradient(110.27deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Programa de Parceria Global Acquafy
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center lg:text-left">
            Três níveis para crescer com a marca em escala global: indicar, operar ou distribuir.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            <BtnAzulBaseArrow className="flex-[1_0_0] min-h-[50px] min-w-[190px]">
              Seja um parceiro
            </BtnAzulBaseArrow>
            <BtnAzulOutArrow className="flex-[1_0_0] min-h-[50px] min-w-[190px]">
              Falar com especialista
            </BtnAzulOutArrow>
          </div>

          {/* Tier badges */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center min-w-px p-[10px] rounded-[16px]">
              <img src={imgSilver} alt="Silver" className="w-[40px] h-[50px] object-contain shrink-0" />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#3e4650]">
                Silver
              </span>
            </div>
            <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center min-w-px p-[10px] rounded-[16px]">
              <img src={imgGold} alt="Gold" className="size-[40px] object-contain shrink-0" />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#dfa727]">
                Gold
              </span>
            </div>
            <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center min-w-px p-[10px] rounded-[16px]">
              <img src={imgPlatinum} alt="Platinum" className="w-[44px] h-[50px] object-contain shrink-0" />
              <span
                className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(117.65deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
              >
                Platinum
              </span>
            </div>
          </div>
        </div>

        {/* Right side — filled by bg image */}
        <div className="flex-[1_0_0] min-w-[280px] hidden xl:block" style={{ height: 795 }} />
      </div>
    </section>
  );
}
