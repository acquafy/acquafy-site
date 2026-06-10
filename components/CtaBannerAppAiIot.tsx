"use client";
import FigmaIcon from "./FigmaIcon";

const imgBg       = "/figma-assets/ead4c0fb-be00-4d8a-8bd6-9f867cc8acab.png"; // banner bg
const imgArrow    = "/figma-assets/d47c325f-bc34-492f-a1fa-d2f3d15fc9bc.svg"; // seta azul
const imgChat     = "/figma-assets/c3816d40-2ab4-42bb-9f2a-6d5c07aa763c.svg"; // chat icon

export default function CtaBannerAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div
        className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-clip px-[80px] py-[40px] relative rounded-[16px] w-full"
      >
        {/* Background image */}
        <img
          src={imgBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
        />

        {/* Esquerda — título */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px] pb-[40px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full">
            Leve o poder do App + AI Acquafy para sua vida ou seu negócio.
          </h2>
        </div>

        {/* Direita — botões */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-end min-w-[240px] pb-[20px]">

          {/* Outline — Solicitar demonstração */}
          <button className="group bg-white border border-[#0233c3] flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-clip px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap shrink-0">
              Solicitar demonstração
            </span>
            <div className="relative h-0 shrink-0 w-[9px]">
              <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0">
                <FigmaIcon src={imgArrow} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
              <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100">
                <FigmaIcon
                  src={imgArrow}
                  size={9}
                  aspectW={11.2}
                  aspectH={8.84}
                  className="[filter:brightness(0)_invert(1)]"
                />
              </div>
            </div>
          </button>

          {/* Gradiente — Falar com especialista */}
          <button
            className="border border-white flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-clip p-[20px] rounded-[8px] cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity"
            style={{ backgroundImage: "linear-gradient(112.26deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            <FigmaIcon src={imgChat} size={16} aspectW={30} aspectH={30} className="[filter:brightness(0)_invert(1)] shrink-0" />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center whitespace-nowrap shrink-0">
              Falar com especialista
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
