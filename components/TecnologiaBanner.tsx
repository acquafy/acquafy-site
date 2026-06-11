import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/ts-banner-bg.png";           // lg+ photo bg
const imgBgCard     = "/figma-assets/ts-banner-card-1024.png";    // < lg card image
const imgGlobe      = "/figma-assets/ts-icon-planet.svg";         // 30×30
const imgAguaPura   = "/figma-assets/ts-icon-agua-pura.svg";      // 643×631
const imgWifi       = "/figma-assets/ts-icon-wifi.svg";           // 30×20
const imgGloboSust  = "/figma-assets/ts-icon-globo-sust.svg";     // 492×475
const imgPlanet     = "/figma-assets/ts-icon-planet.svg";         // 30×30
const imgShield     = "/figma-assets/ts-icon-shield-check.svg";   // 26.14×30
const imgSustent    = "/figma-assets/ts-icon-sustent.svg";        // 30×30
const imgGloboGreen = "/figma-assets/ts-icon-globo-green.svg";    // 492×492

// ── Sub-components ───────────────────────────────────────────────────────────

function HeroStat({ icon, label, aspectW = 30, aspectH = 30 }: {
  icon: string; label: string; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-px">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <div className="[word-break:break-word] flex flex-col font-['Avenir_LT_Pro:85_Heavy'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#1f2e91] text-center">
        <p className="leading-[20px]">{label}</p>
      </div>
    </div>
  );
}

function TrustItem({ icon, label, aspectW = 30, aspectH = 30 }: {
  icon: string; label: string; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="content-center flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] lg:justify-start lg:min-w-[160px]">
      <FigmaIcon src={icon} size={50} aspectW={aspectW} aspectH={aspectH} />
      <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] flex flex-[1_0_0] flex-col font-['Avenir_LT_Pro:85_Heavy'] justify-center leading-[0] min-w-px not-italic relative text-[20px] text-white">
        <p className="leading-[22px]">{label}</p>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaBanner() {
  return (
    <section className="
      bg-[#f6f9fe] flex flex-col gap-[20px] items-center px-[20px] py-[40px] relative w-full
      lg:bg-transparent lg:h-[calc(100vh-80px)] lg:overflow-hidden
    ">
      {/* Background photo — lg+ only */}
      <img
        alt=""
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* ── Content area ── */}
      <div className="
        relative flex flex-col gap-[40px] items-center justify-center max-w-[1400px] shrink-0 w-full
        lg:content-center lg:flex-[1_0_0] lg:flex-row lg:flex-wrap lg:min-h-px
      ">

        {/* Left column */}
        <div className="
          flex flex-col gap-[20px] items-center justify-center w-full
          lg:flex-[1_0_0] lg:items-start lg:min-w-[280px]
        ">

          {/* Badge */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgGlobe} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              NOVA FASE GLOBAL
            </span>
          </div>

          {/* Title */}
          <h1 className="[word-break:break-word] font-['Avenir_LT_Pro:95_Black'] leading-[0] min-w-full not-italic relative shrink-0 text-[64px] text-[#2a2a2b] text-center lg:text-left">
            <span className="leading-[68px]">Tecnologia & </span>
            <span className="leading-[68px] text-[#0569ff]">Sustentabilidade</span>
          </h1>

          {/* Subtitle */}
          <div className="[word-break:break-word] flex flex-col font-['Avenir_LT_Pro:85_Heavy'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[26px] text-[#0569ff] text-center lg:text-left">
            <p className="leading-[28px]">Inovação que transforma água em qualidade de vida e preserva o planeta para as futuras gerações.</p>
          </div>

          {/* Description */}
          <div className="[word-break:break-word] flex flex-col font-['Avenir_LT_Pro:55_Roman'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[20px] text-[#333] text-center lg:text-left">
            <p className="leading-[26px]">A Acquafy combina tecnologia de ponta, inteligência artificial e design sustentável para entregar água pura, segura e acessível reduzindo o impacto ambiental e promovendo um futuro mais saudável.</p>
          </div>

          {/* Mini stats */}
          <div className="flex gap-[20px] items-start justify-center shrink-0 w-full">
            <HeroStat icon={imgAguaPura}  label="Água pura e segura"      aspectW={643} aspectH={631} />
            <HeroStat icon={imgWifi}      label="Tecnologia inteligente"  aspectW={30}  aspectH={20}  />
            <HeroStat icon={imgGloboSust} label="Sustentabilidade real"   aspectW={492} aspectH={475} />
            <HeroStat icon={imgPlanet}    label="Impacto global positivo" aspectW={30}  aspectH={30}  />
          </div>
        </div>

        {/* Card image — < lg only */}
        <div className="h-[300px] min-w-[280px] overflow-hidden relative rounded-[16px] shrink-0 w-full lg:hidden">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
            src={imgBgCard}
          />
        </div>

        {/* Right spacer — lg+ only */}
        <div className="hidden lg:block flex-[1_0_0] max-w-[650px] min-w-[280px]" />
      </div>

      {/* ── Trust bar ── */}
      <div className="relative bg-[#1f2e91] flex flex-wrap gap-[30px_40px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] rounded-[16px] shrink-0 w-full">
        <TrustItem
          icon={imgShield}
          label="Tecnologia confiável e certificada"
          aspectW={26.14} aspectH={30}
        />
        <div className="hidden lg:block border-[0.5px] border-[#cbd0d4] h-[50px] shrink-0 w-0" />
        <TrustItem
          icon={imgSustent}
          label="Materiais duráveis e recicláveis"
          aspectW={30} aspectH={30}
        />
        <div className="hidden lg:block border-[0.5px] border-[#cbd0d4] h-[50px] shrink-0 w-0" />
        <TrustItem
          icon={imgGloboGreen}
          label="Compromisso global com um futuro sustentável"
          aspectW={492} aspectH={492}
        />
      </div>
    </section>
  );
}
