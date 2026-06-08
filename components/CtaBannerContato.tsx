import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/0526acb5-41bb-4aac-bdb8-f13357a94d07.png";
const imgArrowWhite = "/figma-assets/93b457af-90d0-4dc6-bb02-fb93fc706899.svg"; // 11.2×8.84  landscape

export default function CtaBannerContato() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[60px] py-[40px] relative rounded-[16px] w-full">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        <div className="relative flex flex-1 flex-col items-start justify-center min-w-[240px] max-w-[600px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white text-center lg:text-left">
            Vamos juntos transformar o acesso a água e a vida das pessoas.
          </h2>
        </div>

        <div className="relative flex flex-1 flex-wrap gap-[10px] items-center justify-end min-w-[240px]">
          <button className="group flex gap-[8px] items-center justify-center min-h-[46px] min-w-[180px] px-[20px] py-[10px] rounded-[8px] border border-white bg-transparent hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              Conheça Linha NEO
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </button>
          <button className="group flex gap-[8px] items-center justify-center min-h-[46px] min-w-[180px] px-[20px] py-[10px] rounded-[8px] border border-white bg-transparent hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
              Conheça o Acquafy Media
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </button>
        </div>
      </div>
    </section>
  );
}
