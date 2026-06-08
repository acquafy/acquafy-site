import FigmaIcon from "./FigmaIcon";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgProduct       = "/figma-assets/22acfcd2-3786-49e8-81ce-f9f470567201.png"; // Neo UP c/ laço, aspect 1191/1456
const imgBgDesktop     = "/figma-assets/e23668bc-8ba6-42b7-891e-ba02f44d2389.png"; // desktop bg (azul + cidade)
const imgFamilyDesktop = "/figma-assets/0df07aad-6576-4d9b-b9c4-5b7afd48bbcb.png"; // desktop: família + skyline
const imgBgMobile      = "/figma-assets/261d44fd-8ce5-4fd5-a507-7d8881ce2b7b.png"; // mobile bg (gradiente azul/roxo)
const imgFamilyMobile  = "/figma-assets/06fc3dd6-e78f-4f0e-a009-4749cd24df15.png"; // mobile: família s/ fundo (DIFERENTE)
const imgArrowBlue     = "/figma-assets/d7865876-6346-4a62-bf02-b810271db265.svg"; // seta azul botão outline
const imgArrowWhite    = "/figma-assets/8b3582ba-350c-4445-b464-872ec596bb95.svg"; // seta branca hover

// ── Sub-components ────────────────────────────────────────────────────────────

/** Produto Neo UP com laço – slot quadrado, imagem portrait 1191×1456 via flex-[1_0_0] */
function NeoUPProduct({ size }: { size: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="flex-[1_0_0] min-h-px relative"
        style={{ aspectRatio: "1191 / 1456" }}
      >
        <img
          alt="Acquafy Neo UP"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgProduct}
        />
      </div>
    </div>
  );
}

/** Botão outline azul com seta toggle hover/pressed */
function ParticipateButton() {
  return (
    <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0 cursor-pointer">
      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap">
        Quero participar
      </span>
      <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
        <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
          <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
        <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
          <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
      </div>
    </button>
  );
}

// ── Texto compartilhado ────────────────────────────────────────────────────────
function CampaignText({ centered }: { centered?: boolean }) {
  return (
    <div className={`flex flex-col gap-[20px] items-start text-white w-full ${centered ? "items-center text-center" : ""}`}>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-white w-full">
        CAMPANHA ACQUAFY TRANSFORMA VIDAS
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-white w-full">
        De julho a dezembro, 1 purificador por mês.
        <br />
        {"Participe e concorra a um "}
        <span className="font-['Avenir_LT_Pro:85_Heavy']">Acquafy Neo UP</span>
        {" todo mês!"}
      </p>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────
export default function TransformaVidas() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      {/*
       * Container:
       *   Mobile (<1024px): flex-col, gap-40, pt-40, px-20, sem max-h
       *   Desktop (lg/≥1024px): flex-wrap (row), gap-10, sem padding (herdado do bg)
       *   A altura é controlada pelo bloco direito (h-[390px] no desktop)
       */}
      <div className="
        max-w-[1400px] overflow-hidden relative rounded-[16px] w-full
        flex flex-col items-center justify-center gap-[40px] pt-[40px] px-[20px]
        lg:flex-row lg:flex-wrap lg:gap-[10px] lg:pt-0 lg:px-0 lg:items-center lg:justify-center
      ">

        {/* Background desktop */}
        <img
          alt=""
          className="hidden lg:block absolute inset-0 size-full object-cover pointer-events-none rounded-[16px]"
          src={imgBgDesktop}
        />

        {/* Background mobile */}
        <img
          alt=""
          className="lg:hidden absolute inset-0 size-full object-cover pointer-events-none rounded-[16px]"
          src={imgBgMobile}
        />

        {/* ── MOBILE: texto + botão ── */}
        <div className="lg:hidden relative flex flex-col gap-[10px] items-center justify-center min-w-[240px] shrink-0 w-full">
          <CampaignText centered />
          <ParticipateButton />
        </div>

        {/* ── DESKTOP LEFT: texto + produto lado a lado ── */}
        <div className="hidden lg:flex flex-[1_0_0] flex-wrap gap-[10px] min-w-px pl-[20px] py-[20px]">
          {/* Coluna texto */}
          <div className="relative flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[280px] py-[40px]">
            <div className="max-w-[370px] rounded-[16px] w-full">
              <CampaignText />
            </div>
            <ParticipateButton />
          </div>
          {/* Coluna produto — h-[268px] exato do Figma */}
          <div className="flex flex-[1_0_0] items-center justify-center min-w-[240px]" style={{ height: 268 }}>
            <NeoUPProduct size={246} />
          </div>
        </div>

        {/* ── MOBILE: produto (size 290px) ── */}
        <div className="lg:hidden flex flex-col items-center justify-center relative shrink-0" style={{ width: 290, height: 290, maxWidth: 292, maxHeight: 292 }}>
          <div className="flex-[1_0_0] min-h-px relative" style={{ aspectRatio: "1191 / 1456" }}>
            <img
              alt="Acquafy Neo UP"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgProduct}
            />
          </div>
        </div>

        {/* ── DESKTOP RIGHT: família (h-390, justify-end) ── */}
        {/*
         * flex-[1_0_0] min-h-px dentro ocupa toda a altura de 390px.
         * A imagem cobre com object-cover.
         */}
        <div
          className="hidden lg:flex flex-col items-center justify-end shrink-0 w-[400px]"
          style={{ height: 390, maxHeight: 390 }}
        >
          <div className="flex-[1_0_0] min-h-px relative w-full">
            <img
              alt="Família Acquafy"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgFamilyDesktop}
            />
          </div>
        </div>

        {/* ── MOBILE: família (imagem DIFERENTE, bottom-aligned) ── */}
        <div
          className="lg:hidden flex flex-col items-center justify-end min-w-[240px] shrink-0 w-full relative"
          style={{ maxHeight: 390 }}
        >
          <div className="relative shrink-0" style={{ height: 338.511, maxHeight: 338.511, width: 380, maxWidth: 380 }}>
            <img
              alt="Família Acquafy"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgFamilyMobile}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
