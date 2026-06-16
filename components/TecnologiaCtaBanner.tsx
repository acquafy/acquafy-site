import FigmaIcon from "./FigmaIcon";
import { BtnVerdeOutArrow } from "./ui/Buttons";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg   = "/figma-assets/ts-cta-bg.webp";
const imgIcon = "/figma-assets/ts-icon-experiencia.svg";  // experiência água  438×492

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaCtaBanner() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="relative flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[40px] rounded-[16px] w-full">
        {/* Background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#0b8650] inset-0 rounded-[16px]" />
          <img
            alt=""
            className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full"
            src={imgBg}
          />
        </div>

        {/* Icon */}
        <div className="relative shrink-0">
          <FigmaIcon src={imgIcon} size={60} aspectW={438} aspectH={492} />
        </div>

        {/* Title */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            Inovação que cuida de pessoas e do planeta ao mesmo tempo.
          </h2>
        </div>

        {/* CTA button */}
        <div className="relative flex flex-[1_0_0] items-center justify-center max-w-[300px] min-w-[200px]">
          <BtnVerdeOutArrow className="w-full min-h-[56px]">
            Faça parte dessa transformação
          </BtnVerdeOutArrow>
        </div>
      </div>
    </section>
  );
}
