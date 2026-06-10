import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg = "/figma-assets/0526acb5-41bb-4aac-bdb8-f13357a94d07.png";

export default function CtaBannerContato() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[80px] py-[40px] relative rounded-[16px] w-full">

        {/* Imagem de fundo (gradiente azul/roxo) */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Texto esquerdo */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full">
            Vamos juntos transformar o acesso a água e a vida das pessoas.
          </h2>
        </div>

        {/* Botões direito */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-end max-w-[500px] min-w-[240px]">
          {/* Botão outline — bg-white, texto azul */}
          <BtnAzulOutArrow className="flex-1 min-h-[56px] min-w-[200px]">
            Conheça Linha NEO
          </BtnAzulOutArrow>
          {/* Botão sólido — bg azul, texto branco */}
          <BtnAzulBaseArrow className="flex-1 min-h-[56px] min-w-[200px]">
            Conheça o Acquafy Media
          </BtnAzulBaseArrow>
        </div>

      </div>
    </section>
  );
}
