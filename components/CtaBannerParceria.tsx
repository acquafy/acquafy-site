import { BtnAzulBaseArrow, BtnDistribuidor } from "./ui/Buttons";

const imgBg = "/figma-assets/96402f4c-c25b-4a55-a039-a05af221583c.png";

export default function CtaBannerParceria() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[40px] py-[40px] relative rounded-[16px] w-full">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />
        <div className="relative flex flex-1 flex-col items-start justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            Pronto para crescer com a Acquafy?
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-white/90 mt-[10px] text-center lg:text-left">
            Escolha seu nível e comece a sua jornada global hoje.
          </p>
        </div>
        <div className="relative flex flex-1 flex-wrap gap-[10px] items-center justify-end max-w-[500px] min-w-[240px]">
          <BtnAzulBaseArrow className="flex-1 min-w-[200px] min-h-[50px]">
            Seja um parceiro
          </BtnAzulBaseArrow>
          <BtnDistribuidor className="flex-1 min-w-[200px] min-h-[50px]" />
        </div>
      </div>
    </section>
  );
}
