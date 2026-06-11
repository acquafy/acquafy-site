import FigmaIcon from "./FigmaIcon";

const imgBg     = "/figma-assets/7ded5ace-e878-4b20-8869-4299cf70ff0d.png";
const imgMockup = "/figma-assets/db9b5ee1-5db7-4786-b9a6-a23d2901a59b.png";

const imgChat   = "/figma-assets/7a22b5e9-f087-42d0-9204-5e54a681197f.svg";

const imgCloud  = "/figma-assets/d3216aaf-e208-4968-8536-7fef8798cde2.svg";
const imgAI     = "/figma-assets/6c8aa3eb-468d-4290-907f-9c41f9176d79.svg";
const imgWifi   = "/figma-assets/c7ca77d6-97d3-48de-b1bf-d6d0f18c139d.svg";
const imgGlobal = "/figma-assets/68ae0005-d7fe-4a58-b370-dcc2fc12dd0e.svg";

const imgShield = "/figma-assets/96da4085-c12f-4602-84d4-3ac5e27445f9.svg";
const imgVendas = "/figma-assets/07d933bd-0244-40bd-a7e4-37350bdb2e3c.svg";
const imgInteg  = "/figma-assets/f9665df1-44e9-4c92-a01d-c3ea3c375b72.svg";
const imgTime   = "/figma-assets/15d4df82-fbfc-4fc0-98f5-9052c0340953.svg";

const featureCards = [
  { bg: "#0233c3", icon: imgCloud,  iconW: 30, iconH: 30, title: "Cloud Platform",     desc: "Infraestrutura segura e escalável." },
  { bg: "#6e54ef", icon: imgAI,     iconW: 30, iconH: 30, title: "App + AI",           desc: "Inteligência artificial para decisões e automação" },
  { bg: "#36ae5c", icon: imgWifi,   iconW: 30, iconH: 20, title: "IoT & Dispositivos", desc: "Monitoramento remoto e sensores conectados" },
  { bg: "#e240ba", icon: imgGlobal, iconW: 30, iconH: 30, title: "Gestão Global",      desc: "Operação em 180+ países e 16 idiomas" },
];

const trustBadges = [
  { icon: imgShield, iconW: 24, iconH: 30, title: "Seguro & Confiável", sub: "Dados protegidos" },
  { icon: imgVendas, iconW: 44, iconH: 22, title: "Escalável",          sub: "Performance elástica" },
  { icon: imgInteg,  iconW: 38, iconH: 40, title: "Integração Total",   sub: "App + Web + IoT + AI" },
  { icon: imgTime,   iconW: 30, iconH: 30, title: "Disponibilidade",    sub: "99,9% uptime" },
];

function BadgeRow() {
  return (
    <>
      {trustBadges.map((b) => (
        <div key={b.title} className="flex flex-[1_0_0] gap-[8px] items-center min-w-[160px]">
          <div className="flex items-center justify-center shrink-0 size-[26px]">
            <FigmaIcon src={b.icon} size={26} aspectW={b.iconW} aspectH={b.iconH} />
          </div>
          <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{b.title}</p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{b.sub}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default function PlatformHero() {
  /*
    default (< 1024px)   : coluna única centrada, bg-[#f6f9fe]            — Figma 1024px
    1024:   (1024px+)    : duas colunas, bg-[#f6f9fe], mockup direita,
                           trust badges linha separada abaixo              — Figma 1280px
    win-1280: (1260px+)  : TELA TOTAL — bg image, duas colunas,
                           trust badges dentro da col esquerda,
                           col direita invisible (bg image tem o mockup)
  */
  return (
    <section className="relative bg-[#f6f9fe] win-1280:bg-transparent flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full min-h-[600px] win-1280:h-[calc(100vh-80px)]">

      {/* Fundo — visível apenas em win-1280+ (TELA TOTAL) */}
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none hidden win-1280:block"
        src={imgBg}
      />

      <div className="relative flex flex-col 1024:flex-row flex-wrap flex-1 gap-[40px] 1024:gap-x-[20px] items-center 1024:items-start max-w-[1400px] w-full">

        {/* ── Coluna esquerda ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-[20px] items-center 1024:items-start w-full 1024:flex-[1_0_0] 1024:max-w-[670px] 1024:min-w-[280px]">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              ECOSSISTEMA DIGITAL ACQUAFY
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] w-full text-center 1024:text-left">
            {"Plataforma "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(113deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
              Web
            </span>
            {" + "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(113deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
              App Inteligente
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] w-full text-center 1024:text-left">
            Gestão global, App + AI + IoT em uma experiência integrada para mídia, parceiros, vendas e operação da água inteligente.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[10px] items-center justify-center xl:justify-start w-full">
            <a
              href="/contato"
              className="flex gap-[10px] items-center justify-center min-h-[56px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer"
              style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              <FigmaIcon src={imgChat} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center whitespace-nowrap">
                Solicitar demonstração
              </span>
            </a>
          </div>

          {/* Feature cards */}
          <div className="flex flex-wrap 1024:flex-nowrap gap-[10px] items-stretch justify-center 1024:justify-start w-full">
            {featureCards.map((f) => (
              <div key={f.title} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[220px] min-w-[200px] 1024:min-w-px px-[10px] py-[20px] rounded-[16px]">
                <div className="flex items-center justify-center p-[12px] rounded-[12px] shrink-0 size-[60px]" style={{ backgroundColor: f.bg }}>
                  <FigmaIcon src={f.icon} size={30} aspectW={f.iconW} aspectH={f.iconH} />
                </div>
                <div className="flex items-center justify-center min-h-[44px] w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full">{f.title}</p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] text-center w-full">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust badges — dentro da col esquerda apenas no win-1280+ (TELA TOTAL) */}
          <div className="hidden win-1280:flex flex-wrap gap-[8px] items-center w-full">
            <BadgeRow />
          </div>
        </div>

        {/* ── Coluna direita — mockup image ─────────────────────────────── */}
        {/* win-1280+: invisible — ocupa espaço mas bg image contém o mockup */}
        <div className="win-1280:invisible rounded-[16px] overflow-clip h-[481px] min-w-[280px] w-full 1024:flex-[1_0_0] 1024:self-center">
          <img
            src={imgMockup}
            alt="Plataforma Acquafy — tablet e smartphone"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Trust badges linha separada — default + 1024, oculta no win-1280+ ── */}
        <div className="flex win-1280:hidden flex-wrap gap-[8px] items-center w-full 1024:flex-none">
          <BadgeRow />
        </div>

      </div>
    </section>
  );
}
