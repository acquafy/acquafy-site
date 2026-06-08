import FigmaIcon from "./FigmaIcon";

const imgBg   = "/figma-assets/588b6943-81ee-4231-824d-a3e56918920f.png";
const imgChat = "/figma-assets/7a22b5e9-f087-42d0-9204-5e54a681197f.svg";
const imgArrow= "/figma-assets/03b65413-2c5b-4058-93a1-d3a60c7614c0.svg";

export default function PlatformCta() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[80px] py-[40px] relative rounded-[16px] w-full">

        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px] pb-[40px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            Pronto para operar a nova geração de água inteligente?
          </h2>
        </div>

        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-end min-w-[240px] pb-[20px]">
          <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap">
              Solicitar demonstração
            </span>
            <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
              <img alt="" className="block max-w-none size-full" src={imgArrow} />
            </div>
          </button>

          <button
            className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer"
            style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            <FigmaIcon src={imgChat} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center whitespace-nowrap">
              Falar com especialista
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
