"use client";
import FigmaIcon from "./FigmaIcon";

// ── Imagens ──────────────────────────────────────────────────────────────────
const imgBg     = "/figma-assets/427e1a29-4c52-4389-b4ff-172ebd6393d0.png";  // hero background
const imgMockup = "/figma-assets/60b9a5e2-760a-4d86-a81a-3c1d9ce03754.png";  // tablet + smartphone

// ── Ícones do label e badges ─────────────────────────────────────────────────
const imgGlobe  = "/figma-assets/217dfb34-157d-4dc3-ae48-b63e6bc5443e.svg";  // 30×30 globe (label pill)
const imgMobile = "/figma-assets/c949cdb8-5a17-4158-b6b0-8aaef884917e.svg";  // 18×30 phone (App Acquafy)
const imgBrain  = "/figma-assets/0b8f0243-2d5a-408a-b20d-efa330a7912b.svg";  // 30×30 brain (AI)
const imgIoT    = "/figma-assets/4e54c88a-0878-4a32-b7ee-b9be83ec4c9d.svg";  // 30×30 IoT icon

// ── Setas dos botões ─────────────────────────────────────────────────────────
const imgArrowWhite = "/figma-assets/9777bc4a-58de-46e7-8e46-08e99069f337.svg"; // sólido / hover
const imgArrowBlue  = "/figma-assets/4e468b96-c90e-4821-837b-9780c1f0b21f.svg"; // outline padrão

// ── Gradiente do botão primário ───────────────────────────────────────────────
const gdBase    = { backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" };
const gdHover   = { backgroundImage: "linear-gradient(103.83deg, #002ba8 6.19%, #6e0cc3 93.35%)" };
const gdPressed = { backgroundImage: "linear-gradient(103.83deg, #0569ff 6.19%, #b25efb 93.35%)" };

// ── Badges de feature ─────────────────────────────────────────────────────────
const badges = [
  { icon: imgMobile, aspectW: 18, aspectH: 30, label: "App Acquafy",        bg: "#0233c3" },
  { icon: imgBrain,  aspectW: 30, aspectH: 30, label: "Acquafy AI",         bg: "#7a16d2" },
  { icon: imgIoT,    aspectW: 30, aspectH: 30, label: "IoT & Dispositivos", bg: "#36ae5c" },
];

export default function HeroAppAiIot() {
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">

      {/* Background */}
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Área de conteúdo — flex-1 preenche a altura disponível no xl */}
      <div className="relative flex flex-1 flex-wrap xl:flex-nowrap gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* ── Coluna esquerda ─────────────────────────────────────────── */}
        <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[280px] max-w-[580px]">

          {/* Label pill */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgGlobe} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#0233c3] whitespace-nowrap">
              ECOSSISTEMA CONECTADO ACQUAFY
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333] w-full text-center lg:text-left">
            {"App + "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              AI + IoT
            </span>
          </h1>

          {/* Descrição */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full">
            Controle seus purificadores, monitore dispositivos, receba alertas inteligentes e gerencie toda a operação em uma experiência integrada.
          </p>

          {/* Badges de feature */}
          <div className="flex flex-wrap gap-[20px] items-start w-full">
            {badges.map((b) => (
              <div key={b.label} className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-[100px]">
                <div
                  className="flex items-center justify-center size-[44px] rounded-[12px] shrink-0"
                  style={{ backgroundColor: b.bg }}
                >
                  <FigmaIcon src={b.icon} size={24} aspectW={b.aspectW} aspectH={b.aspectH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#07235c] text-center w-full">
                  {b.label}
                </p>
              </div>
            ))}
          </div>

          {/* Botões — mesmo padrão do Hero da Home */}
          <div className="flex flex-wrap gap-[20px] items-center justify-start w-full">

            {/* Primário — gradiente azul→lilás */}
            <button
              className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer"
              style={gdBase}
              onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdHover)}
              onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdBase)}
              onMouseDown={(e)  => Object.assign((e.currentTarget as HTMLButtonElement).style, gdPressed)}
              onMouseUp={(e)    => Object.assign((e.currentTarget as HTMLButtonElement).style, gdBase)}
            >
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">
                Baixar o App
              </span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            {/* Secundário — outline azul */}
            <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">
                Explorar recursos
              </span>
              {/* Arrow toggle: azul → branco no hover */}
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ── Coluna direita — mockup ──────────────────────────────────── */}
        <div className="flex flex-[1_0_0] items-center justify-center min-w-[280px] max-w-[660px]">
          <div className="relative w-full" style={{ aspectRatio: "3016/1916" }}>
            <img
              src={imgMockup}
              alt="App Acquafy — tablet e smartphone"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
