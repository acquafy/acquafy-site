import Link from "next/link";
import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg = "/figma-assets/0526acb5-41bb-4aac-bdb8-f13357a94d07.png";

export default function CtaBannerContato() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] lg:px-[80px] py-[40px] relative rounded-[16px] w-full">

        {/* Imagem de fundo (gradiente azul/roxo) */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Texto esquerdo */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            Vamos juntos transformar o acesso a água e a vida das pessoas.
          </h2>
        </div>

        {/* Botões direito */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center lg:justify-end max-w-[500px] min-w-[240px]">
          {/* Botão outline — bg-white, texto azul */}
          <Link href="/linha-neo" className="flex-1 min-w-[200px]">
            <BtnAzulOutArrow className="w-full min-h-[56px]">
              Conheça Linha NEO
            </BtnAzulOutArrow>
          </Link>
          {/* Botão sólido — bg azul, texto branco */}
          <Link href="/neo-media" className="flex-1 min-w-[200px]">
            <BtnAzulBaseArrow className="w-full min-h-[56px]">
              Conheça o Acquafy Media
            </BtnAzulBaseArrow>
          </Link>
        </div>

      </div>
    </section>
  );
}
