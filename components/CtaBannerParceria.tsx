import Link from "next/link";
import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";

const imgBg = "/figma-assets/cta-banner-bg.png";

export default function CtaBannerParceria() {
  return (
    <section className="bg-white flex items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-clip px-[20px] xl:px-[80px] py-[40px] relative rounded-[16px] w-full">

        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
          src={imgBg}
        />

        {/* texto esquerdo */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <div className="font-['Avenir_LT_Pro:95_Black'] text-[0px] text-white w-full text-center xl:text-left">
            <p className="text-[32px] leading-[39px]">
              Pronto pra crescer com a Acquafy?
            </p>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px]">
              Junte-se ao ecossistema de gestão inteligente de água que mais cresce no mundo.
            </p>
          </div>
        </div>

        {/* botões direita */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center xl:justify-end max-w-[500px] min-w-[240px]">
          <BtnAzulOutArrow className="flex-1 min-w-[200px] min-h-[56px]">
            Solicitar apresentação
          </BtnAzulOutArrow>
          <Link href="/parceria" className="flex-1 min-w-[200px]">
            <BtnAzulBaseArrow className="w-full min-h-[56px]">
              Quero ser parceiro
            </BtnAzulBaseArrow>
          </Link>
        </div>

      </div>
    </section>
  );
}
