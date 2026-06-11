"use client";
import FigmaIcon from "./FigmaIcon";

// ── Imagens ──────────────────────────────────────────────────────────────────
const imgBg     = "/figma-assets/427e1a29-4c52-4389-b4ff-172ebd6393d0.png";

// ── Ícones dos badge-cards ────────────────────────────────────────────────────
const imgMobile = "/figma-assets/c949cdb8-5a17-4158-b6b0-8aaef884917e.svg";   // 21×30
const imgBrain  = "/figma-assets/0b8f0243-2d5a-408a-b20d-efa330a7912b.svg";   // 30×30
const imgIoT    = "/figma-assets/4e54c88a-0878-4a32-b7ee-b9be83ec4c9d.svg";   // 30×20

// ── Setas dos botões ─────────────────────────────────────────────────────────
const imgArrowWhite = "/figma-assets/9777bc4a-58de-46e7-8e46-08e99069f337.svg";
const imgArrowBlue  = "/figma-assets/4e468b96-c90e-4821-837b-9780c1f0b21f.svg";

const badges = [
  {
    icon: imgMobile, aspectW: 21, aspectH: 30, bg: "#0233c3",
    title: "App Acquafy",
    desc: "Controle remoto, status do equipamento e suporte na palma da mão.",
  },
  {
    icon: imgBrain, aspectW: 30, aspectH: 30, bg: "#6e54ef",
    title: "Acquafy AI",
    desc: "Inteligência artificial para insights, automações e decisões mais rápidas.",
  },
  {
    icon: imgIoT, aspectW: 30, aspectH: 20, bg: "#36ae5c",
    title: "IoT & Dispositivos",
    desc: "Sensores, conectividade e monitoramento em tempo real.",
  },
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

      {/* Conteúdo — flex-1 preenche altura disponível no xl */}
      <div className="relative flex flex-1 flex-wrap xl:flex-nowrap gap-[40px] items-center justify-start max-w-[1400px] w-full">

        {/* ── Coluna esquerda ─────────────────────────────────────────── */}
        <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[280px] max-w-[660px]">

          {/* Label pill — só texto, sem ícone */}
          <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0 w-full">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              ECOSSISTEMA CONECTADO ACQUAFY
            </span>
          </div>

          {/* H1 — cores individuais por palavra, não gradiente */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333] w-full text-center lg:text-left">
            {"App + "}
            <span style={{ color: "#6e54ef" }}>AI</span>
            {" "}
            <span style={{ color: "#1f2e91" }}>+</span>
            {" "}
            <span style={{ color: "#0569ff" }}>IoT</span>
          </h1>

          {/* Descrição */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full">
            Controle seus purificadores, monitore dispositivos, receba alertas inteligentes e gerencie toda a operação em uma experiência integrada.
          </p>

          {/* Badge cards — 3 cartões brancos em linha */}
          <div className="flex gap-[10px] items-center justify-center shrink-0 w-full flex-wrap">
            {badges.map((b) => (
              <div
                key={b.title}
                className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[140px] p-[20px] rounded-[16px]"
              >
                <div
                  className="flex items-center justify-center size-[50px] rounded-[12px] shrink-0"
                  style={{ backgroundColor: b.bg }}
                >
                  <FigmaIcon src={b.icon} size={26} aspectW={b.aspectW} aspectH={b.aspectH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                  {b.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Botões */}
          <div className="flex flex-wrap gap-[20px] items-center justify-start w-full">

            {/* Primário — azul sólido */}
            <button
              className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors"
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


      </div>
    </section>
  );
}
