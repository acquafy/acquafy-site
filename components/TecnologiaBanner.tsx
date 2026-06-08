import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/ts-banner-bg.png";
const imgHeroRight  = "/figma-assets/ts-hero-right.png";

// Badge & mini-stat icons
const imgGlobe      = "/figma-assets/ts-icon-planet.svg";        // badge globe    30×30
const imgAguaPura   = "/figma-assets/ts-icon-agua-pura.svg";     // água pura      ~643×631
const imgWifi       = "/figma-assets/ts-icon-wifi.svg";          // tecnologia     30×20
const imgGloboSust  = "/figma-assets/ts-icon-globo-sust.svg";    // sustentab.     ~492×475
const imgPlanet     = "/figma-assets/ts-icon-planet.svg";        // impacto global 30×30

// Trust bar icons
const imgShield     = "/figma-assets/ts-icon-shield-check.svg";  // shield check   26.14×30
const imgSustent    = "/figma-assets/ts-icon-sustent.svg";       // materiais      30×30
const imgGloboGreen = "/figma-assets/ts-icon-globo-green.svg";   // compromisso    ~492×492

// ── Sub-components ───────────────────────────────────────────────────────────

function HeroStat({ icon, label, aspectW = 30, aspectH = 30 }: {
  icon: string; label: string; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-px">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center w-full">
        {label}
      </p>
    </div>
  );
}

function TrustItem({ icon, label, aspectW = 30, aspectH = 30 }: {
  icon: string; label: string; aspectW?: number; aspectH?: number;
}) {
  return (
    <div className="flex flex-wrap gap-[20px] items-center min-w-[160px] shrink-0">
      <FigmaIcon src={icon} size={50} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-white max-w-[240px]">
        {label}
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaBanner() {
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Right decorative image — desktop only */}
      <img
        alt=""
        className="hidden xl:block absolute right-0 top-0 h-full object-cover pointer-events-none"
        style={{ width: "55%", objectPosition: "right center" }}
        src={imgHeroRight}
      />

      {/* ── Main content ── */}
      <div className="relative flex flex-[1_0_0] flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full min-h-px">
        {/* Left column */}
        <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center max-w-[580px] min-w-[280px]">
          {/* Badge */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgGlobe} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              NOVA FASE GLOBAL
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#2a2a2b] w-full text-center lg:text-left">
            {`Tecnologia & `}
            <span className="text-[#0569ff]">Sustentabilidade</span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#0569ff] w-full text-center lg:text-left">
            Inovação que transforma água em qualidade de vida e preserva o planeta para as futuras gerações.
          </p>

          {/* Description */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full text-center lg:text-left">
            A Acquafy combina tecnologia de ponta, inteligência artificial e design sustentável para entregar água pura, segura e acessível reduzindo o impacto ambiental e promovendo um futuro mais saudável.
          </p>

          {/* Mini stats */}
          <div className="flex gap-[20px] items-center w-full">
            <HeroStat icon={imgAguaPura}  label="Água pura e segura"      aspectW={643} aspectH={631} />
            <HeroStat icon={imgWifi}      label="Tecnologia inteligente"  aspectW={30}  aspectH={20}  />
            <HeroStat icon={imgGloboSust} label="Sustentabilidade real"   aspectW={492} aspectH={475} />
            <HeroStat icon={imgPlanet}    label="Impacto global positivo" aspectW={30}  aspectH={30}  />
          </div>
        </div>

        {/* Right spacer — image is absolute-positioned */}
        <div className="hidden xl:block flex-[1_0_0] min-w-[280px]" />
      </div>

      {/* ── Trust bar — pinned to bottom ── */}
      <div className="relative bg-[#1f2e91] flex flex-wrap gap-y-[30px] items-center justify-between max-w-[1400px] overflow-hidden p-[40px] rounded-[16px] w-full shrink-0">
        <TrustItem
          icon={imgShield}
          label="Tecnologia confiável e certificada"
          aspectW={26.14} aspectH={30}
        />
        <div className="border-[0.5px] border-[#cbd0d4] h-[50px] w-0 shrink-0 hidden md:block" />
        <TrustItem
          icon={imgSustent}
          label="Materiais duráveis e recicláveis"
          aspectW={30} aspectH={30}
        />
        <div className="border-[0.5px] border-[#cbd0d4] h-[50px] w-0 shrink-0 hidden md:block" />
        <TrustItem
          icon={imgGloboGreen}
          label="Compromisso global com um futuro sustentável"
          aspectW={492} aspectH={492}
        />
      </div>
    </section>
  );
}
