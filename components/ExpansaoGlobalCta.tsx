import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";

const imgBg = "/figma-assets/6e4c7a5e-74be-4ed7-ab5a-e6572a21db21.png";

export default function ExpansaoGlobalCta() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] relative rounded-[16px] w-full">
        {/* Background */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Text */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center">
            Faça parte da rede global Acquafy
          </h2>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white w-full mt-[4px] text-center">
            Juntos podemos transformar milhões de vidas, gerar oportunidades e construir um futuro mais saudável e sustentável.
          </p>
        </div>

        {/* Buttons */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center max-w-[500px] min-w-[240px]">
          <BtnAzulOutArrow className="flex-1 min-w-[200px] min-h-[56px]">
            Seja um parceiro
          </BtnAzulOutArrow>
          <BtnAzulBaseArrow className="flex-1 min-w-[200px] min-h-[56px]">
            Fale com um especialista
          </BtnAzulBaseArrow>
        </div>
      </div>
    </section>
  );
}
