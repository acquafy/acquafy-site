"use client";
import FigmaIcon from "./FigmaIcon";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg     = "/figma-assets/427e1a29-4c52-4389-b4ff-172ebd6393d0.png";
const imgMockup = "/figma-assets/ad6b6089-95ed-4abe-b88d-6ef9c6eeca1a.png";
const imgMobile = "/figma-assets/c949cdb8-5a17-4158-b6b0-8aaef884917e.svg";
const imgBrain  = "/figma-assets/0b8f0243-2d5a-408a-b20d-efa330a7912b.svg";
const imgIoT    = "/figma-assets/9efaad61-e4b7-4002-8c20-5c33ed7090b9.svg";
const imgArrowW = "/figma-assets/9777bc4a-58de-46e7-8e46-08e99069f337.svg";
const imgArrowB = "/figma-assets/4e468b96-c90e-4821-837b-9780c1f0b21f.svg";

// ── Dados ─────────────────────────────────────────────────────────────────────
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
    icon: imgIoT, aspectW: 27.5, aspectH: 18.8, bg: "#36ae5c",
    title: "IoT & Dispositivos",
    desc: "Sensores, conectividade e monitoramento em tempo real.",
  },
];

/*
  BREAKPOINTS (tailwind.config.ts)
  ─────────────────────────────────
  win-1024  min-width: 1024px   →  Breakpoint 2 (2 colunas)
  win-1280  min-width: 1280px   →  TELA TOTAL (bg-image)

  MAPEAMENTO
  ─────────────────────────────────
  Base      (< 1024px): Figma Breakpoint 3 — coluna única centrada, mockup abaixo
  win-1024 (≥ 1024px) : Figma Breakpoint 2 — 2 colunas, mockup à direita
  win-1280 (≥ 1280px) : Figma TELA TOTAL   — bg-image, h-[875px], badges h-[217px]
*/
export default function HeroAppAiIot() {
  return (
    // ── SECTION ──────────────────────────────────────────────────────────────
    // Base    : bg cinza, padding, altura automática
    // win-1280: bg transparente, altura fixa 875px (imagem de fundo toma conta)
    <section className={[
      "relative overflow-hidden",
      "flex flex-col items-center justify-center",
      "px-[20px] py-[40px] w-full",
      "bg-[#f6f9fe] win-1280:bg-transparent",
      "win-1280:h-[875px]",
    ].join(" ")}>

      {/* Imagem de fundo — apenas win-1280+ */}
      <img
        src={imgBg} alt="" aria-hidden="true"
        className="hidden win-1280:block absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── WRAPPER INTERNO ──────────────────────────────────────────────────
          Base     : flex-col gap-[40px] items-start
          win-1024 : flex-row flex-wrap gap-y-[40px] gap-x-[20px] items-center
          win-1280 : gap-x-[40px] (mantém 2 colunas com gap maior)
      */}
      <div className={[
        "relative max-w-[1400px] w-full",
        "flex flex-col gap-[40px] items-start",
        "win-1024:flex-row win-1024:flex-wrap win-1024:gap-y-[40px] win-1024:gap-x-[20px] win-1024:items-center",
        "win-1280:gap-x-[40px]",
      ].join(" ")}>

        {/* ── BLOCO DE CONTEÚDO ──────────────────────────────────────────────
            Base     : w-full, items-center (centrado)
            win-1024 : flex-[1_0_0] max-w-[660px] min-w-[280px], items-start (alinhado à esq.)
        */}
        <div className={[
          "flex flex-col gap-[20px] justify-center",
          "items-center win-1024:items-start",
          "w-full win-1024:flex-[1_0_0] win-1024:max-w-[660px] win-1024:min-w-[280px]",
        ].join(" ")}>

          {/* Label pill */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0 w-full">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              ECOSSISTEMA CONECTADO ACQUAFY
            </span>
          </div>

          {/* Título
              Base     : centrado
              win-1024 : alinhado à esquerda
          */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] w-full text-center win-1024:text-left">
            {"App + "}
            <span className="text-[#6e54ef]">AI</span>
            {" "}
            <span className="text-[#1f2e91]">+</span>
            {" "}
            <span className="text-[#0569ff]">IoT</span>
          </h1>

          {/* Descrição
              Base     : centrada
              win-1024 : alinhada à esquerda
          */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full text-center win-1024:text-left">
            Controle seus purificadores, monitore dispositivos, receba alertas inteligentes e gerencie toda a operação em uma experiência integrada.
          </p>

          {/* ── BADGE-CARDS ────────────────────────────────────────────────
              Base     : flex-wrap, items-start, justify-center
                         cada card: min-w-[280px] flex-[1_0_0]
              win-1024 : flex-nowrap (linha única), items-start, justify-center
                         cada card: min-w-px (pode diminuir)
              win-1280 : items-center (TELA TOTAL); cada card h-[217px]
          */}
          <div className={[
            "flex flex-wrap gap-[10px] w-full",
            "items-stretch",
            "justify-center",
            "win-1024:flex-nowrap",
          ].join(" ")}>
            {badges.map((b) => (
              <div
                key={b.title}
                className={[
                  "bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start",
                  "p-[20px] rounded-[16px]",
                  "min-w-[280px] win-1024:min-w-px",
                ].join(" ")}
              >
                {/* Ícone */}
                <div
                  className="flex items-center justify-center size-[50px] rounded-[12px] shrink-0 p-[12px]"
                  style={{ backgroundColor: b.bg }}
                >
                  <FigmaIcon src={b.icon} size={26} aspectW={b.aspectW} aspectH={b.aspectH} />
                </div>

                {/* Título do card */}
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">
                  {b.title}
                </p>

                {/* Descrição do card */}
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── BOTÕES ─────────────────────────────────────────────────────
              Base     : flex-wrap justify-center, cada botão flex-[1_0_0]
              win-1024 : justify-start, cada botão shrink-0 (tamanho fixo)
          */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center win-1024:justify-start w-full">

            {/* Primário */}
            <button className={[
              "bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors",
              "flex flex-[1_0_0] win-1024:flex-none gap-[10px] items-center justify-center",
              "min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer",
            ].join(" ")}>
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">
                Baixar o App
              </span>
              <FigmaIcon src={imgArrowW} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            {/* Secundário */}
            <button className={[
              "group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors",
              "flex flex-[1_0_0] win-1024:flex-none gap-[10px] items-center justify-center",
              "min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer",
            ].join(" ")}>
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white transition-colors flex-1 text-center">
                Explorar recursos
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-150">
                  <FigmaIcon src={imgArrowB} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <FigmaIcon src={imgArrowW} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ── MOCKUP ─────────────────────────────────────────────────────────
            Base     : w-full h-[481px] abaixo do conteúdo (flex-col)
            win-1024 : flex-[1_0_0] min-w-[280px] à direita (flex-row)
            win-1280 : oculto — a imagem de fundo já mostra o mockup
        */}
        <div className="win-1280:hidden rounded-[16px] overflow-clip h-[481px] min-w-[280px] w-full win-1024:flex-[1_0_0]">
          <img
            src={imgMockup}
            alt="App Acquafy — tablet e smartphone"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── ESPAÇADOR TELA TOTAL ────────────────────────────────────────────
            Visível apenas em win-1280+. Ocupa o lado direito para que o
            bloco de conteúdo fique restrito aos seus 660px enquanto o
            mockup da imagem de fundo aparece ao fundo nesse espaço.
        */}
        <div className="hidden win-1280:flex flex-[1_0_0]" />

      </div>
    </section>
  );
}
