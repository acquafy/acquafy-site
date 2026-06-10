import FigmaIcon from "./FigmaIcon";

const imgBg       = "/figma-assets/7ded5ace-e878-4b20-8869-4299cf70ff0d.png";
const imgArrow    = "/figma-assets/03b65413-2c5b-4058-93a1-d3a60c7614c0.svg";
const imgChat     = "/figma-assets/7a22b5e9-f087-42d0-9204-5e54a681197f.svg";

const imgCloud    = "/figma-assets/d3216aaf-e208-4968-8536-7fef8798cde2.svg";
const imgAI       = "/figma-assets/6c8aa3eb-468d-4290-907f-9c41f9176d79.svg";
const imgWifi     = "/figma-assets/c7ca77d6-97d3-48de-b1bf-d6d0f18c139d.svg";
const imgGlobal   = "/figma-assets/68ae0005-d7fe-4a58-b370-dcc2fc12dd0e.svg";
const imgShield   = "/figma-assets/96da4085-c12f-4602-84d4-3ac5e27445f9.svg";
const imgVendas   = "/figma-assets/07d933bd-0244-40bd-a7e4-37350bdb2e3c.svg";
const imgInteg    = "/figma-assets/f9665df1-44e9-4c92-a01d-c3ea3c375b72.svg";
const imgTime     = "/figma-assets/15d4df82-fbfc-4fc0-98f5-9052c0340953.svg";

const featureCards = [
  { bg: "#0233c3", icon: imgCloud, iconW: 30, iconH: 30, title: "Cloud Platform",      desc: "Infraestrutura segura e escalável." },
  { bg: "#6e54ef", icon: imgAI,    iconW: 30, iconH: 30, title: "App + AI",            desc: "Inteligência artificial para decisões e automação" },
  { bg: "#36ae5c", icon: imgWifi,  iconW: 30, iconH: 20, title: "IoT & Dispositivos",  desc: "monitoramento remoto e sensores conectados" },
  { bg: "#e240ba", icon: imgGlobal, iconW: 30, iconH: 30, title: "Gestão Global",      desc: "Operação em 180+ países e 16 idiomas" },
];

const trustBadges = [
  { icon: imgShield, iconW: 24, iconH: 30, title: "Seguro & Confiável",  sub: "Dados protegidos" },
  { icon: imgVendas, iconW: 44, iconH: 22, title: "Escalável",           sub: "Performance elástica" },
  { icon: imgInteg,  iconW: 38, iconH: 40, title: "Integração Total",    sub: "App + Web + IoT + AI" },
  { icon: imgTime,   iconW: 30, iconH: 30, title: "Disponibilidade",     sub: "99,9% uptime" },
];

export default function PlatformHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[600px] xl:h-[calc(100vh-80px)] overflow-hidden px-[20px] py-[40px] w-full">
      <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBg} />

      <div className="relative flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Left column */}
        <div className="flex flex-[1_0_0] flex-col gap-[40px] items-start justify-center max-w-[670px] min-w-[280px]">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[340px] px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">ECOSSISTEMA DIGITAL ACQUAFY</span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#2a2a2b] w-full text-center lg:text-left">
            Plataforma{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(113deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
              Web
            </span>
            {" + "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(113deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
              App Inteligente
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full text-center lg:text-left">
            Gestão global, App + AI + IoT em uma experiência integrada para mídia, parceiros, vendas e operação da água inteligente.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-[10px] items-center w-full">
            <button
              className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer"
              style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              <FigmaIcon src={imgChat} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center whitespace-nowrap">
                Solicitar demonstração
              </span>
            </button>
            <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap">
                Ver recursos da plataforma
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <img alt="" className="block max-w-none size-full" src={imgArrow} />
              </div>
            </button>
          </div>

          {/* Feature cards */}
          <div className="flex flex-wrap gap-[10px] items-center w-full">
            {featureCards.map((f) => (
              <div key={f.title} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[220px] min-w-px px-[10px] py-[20px] rounded-[16px]">
                <div className="flex items-center justify-center p-[12px] rounded-[12px] shrink-0 size-[60px]" style={{ backgroundColor: f.bg }}>
                  <FigmaIcon src={f.icon} size={30} aspectW={f.iconW} aspectH={f.iconH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full">{f.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] text-center w-full">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-[8px] items-center w-full">
            {trustBadges.map((b) => (
              <div key={b.title} className="flex flex-[1_0_0] gap-[8px] items-center min-w-px">
                <div className="flex items-center justify-center shrink-0 size-[26px]">
                  <FigmaIcon src={b.icon} size={26} aspectW={b.iconW} aspectH={b.iconH} />
                </div>
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">{b.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b]">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column placeholder — keeps the layout balanced */}
        <div className="flex-[1_0_0] min-h-[481px] min-w-[280px]" />
      </div>
    </section>
  );
}
