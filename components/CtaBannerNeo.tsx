import { BtnFalaAcquafy, BtnDistribuidor } from "./ui/Buttons";

const imgBg = "/figma-assets/2a2b01fb-7792-406f-b758-08114ebe75c3.png";

export default function CtaBannerNeo() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[80px] py-[40px] relative rounded-[16px] w-full">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            Escolha a Neo ideal para sua rotina
          </h2>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-white w-full text-center lg:text-left">
            Conheça toda a linha e encontre o purificador perfeito para você.
          </p>
        </div>

        <div className="relative flex flex-1 flex-wrap gap-[10px] items-center justify-end max-w-[500px] min-w-[240px]">
          <BtnFalaAcquafy className="flex-1 min-w-[200px]" />
          <BtnDistribuidor className="flex-1 min-w-[200px]" />
        </div>
      </div>
    </section>
  );
}
