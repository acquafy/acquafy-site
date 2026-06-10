import FigmaIcon from "./FigmaIcon";

const imgScreenshot   = "/figma-assets/490bae29-1592-42a3-8a9f-4d88ada22566.png";
const imgHeadset      = "/figma-assets/9dbce4db-3e23-4bb9-80ae-4cbe7c473f9f.png";
const imgArrowBlue    = "/figma-assets/75971e6c-641c-404b-9d87-240b3150d417.svg";

export default function BaseConhecimentoSuporte() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] w-full" style={{ minHeight: 280 }}>

        {/* Card 1 — Base de conhecimento */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] px-[20px] py-[40px] rounded-[16px] w-[690px]">
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0569ff]">
              Base de conhecimento
            </p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">
              Acesse nossa biblioteca completa de artigos, tutoriais e guias para aproveitar ao máximo sua experiência Acquafy.
            </p>
            <button className="bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center whitespace-nowrap">
                Acessar base de conhecimento
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <img src="/figma-assets/62bf5363-6306-4fd5-8982-4c5b3f4e0c54.svg" alt="" className="block max-w-none size-full" />
                </div>
              </div>
            </button>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-end justify-center min-w-[160px] overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "3700/2112" }}>
              <img
                src={imgScreenshot}
                alt="Base de conhecimento Acquafy"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Card 2 — Não encontrou? */}
        <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] px-[20px] py-[40px] rounded-[16px] w-[690px]">
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[240px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0569ff]">
              Não encontrou o que procura?
            </p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b]">
              Nossa equipe está pronta para ajudar você com qualquer dúvida ou necessidade específica.
            </p>
            <button className="bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center whitespace-nowrap">
                Abrir chamado
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <img src="/figma-assets/62bf5363-6306-4fd5-8982-4c5b3f4e0c54.svg" alt="" className="block max-w-none size-full" />
                </div>
              </div>
            </button>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-end justify-center min-w-[160px] overflow-hidden">
            <div className="relative shrink-0 w-full aspect-[2956/3158] max-h-[200px] max-w-[187px]">
              <img
                src={imgHeadset}
                alt="Suporte Acquafy"
                className="absolute inset-0 size-full max-w-none object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
