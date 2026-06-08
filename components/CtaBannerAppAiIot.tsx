"use client";
import { useState } from "react";
import FigmaIcon from "./FigmaIcon";

const imgArrowW = "/figma-assets/9777bc4a-58de-46e7-8e46-08e99069f337.svg";

export default function CtaBannerAppAiIot() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div
        className="flex flex-wrap gap-[40px] items-center justify-between max-w-[1400px] overflow-hidden px-[40px] py-[40px] relative rounded-[16px] w-full"
        style={{ backgroundImage: "linear-gradient(135deg, #1f2e91 0%, #0233c3 50%, #7a16d2 100%)" }}
      >
        {/* Left — title */}
        <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[240px] max-w-[500px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            Leve o poder do App + AI Acquafy para seu negócio.
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-white opacity-90 w-full text-center lg:text-left">
            Comece agora com uma avaliação gratuita e descubra como transformar sua operação.
          </p>
        </div>

        {/* Right — form */}
        <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[240px] max-w-[440px]">
          <div className="flex gap-[10px] items-center w-full flex-wrap">
            <input
              type="email"
              placeholder="Seu e-mail comercial"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white flex-[1_0_0] font-['Avenir_LT_Pro:55_Roman'] text-[16px] min-w-[200px] h-[50px] px-[16px] rounded-[8px] text-[#333] outline-none border-none"
            />
            <button className="bg-white hover:bg-[#f0f4ff] active:bg-[#e0e8ff] transition-colors flex gap-[10px] items-center justify-center h-[50px] overflow-hidden px-[20px] rounded-[8px] shrink-0 cursor-pointer">
              <span className="font-['Articulat_CF:Bold'] text-[15px] text-[#0233c3] whitespace-nowrap">
                Começar agora
              </span>
              <FigmaIcon src={imgArrowW} size={9} aspectW={11.2} aspectH={8.84} className="[filter:invert(1)_sepia(1)_saturate(5)_hue-rotate(200deg)]" />
            </button>
          </div>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[16px] text-white opacity-70 w-full">
            Sem compromisso. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
