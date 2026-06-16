import FigmaIcon from "./FigmaIcon";

// ── Desktop (≥1024px) assets ──────────────────────────────────────────────────
const imgBg        = "/figma-assets/bg-card.webp"; // background card
// ── Mobile (<1024px) asset ────────────────────────────────────────────────────
const imgProduct   = "/figma-assets/product-water-image.webp"; // product+water image

// ── Icons (SVG) ───────────────────────────────────────────────────────────────
const imgShieldLabel = "/figma-assets/icon-shield-label.svg"; // 26.14×30 portrait
const imgGift        = "/figma-assets/icon-gift-a.svg"; // square
const imgShield      = "/figma-assets/icon-shield-24px.svg"; // 24×30 portrait
const imgCert        = "/figma-assets/icon-cert.svg"; // 19×30 portrait
const imgFone        = "/figma-assets/icon-fone-30px.svg"; // 30×30 square
const imgLock        = "/figma-assets/icon-lock-a.svg"; // 27×30 portrait
const imgLogoWhite   = "/figma-assets/logo-white.svg"; // 1133.86×237.88 wide

const trustItems = [
  { icon: imgShield, aspectW: 24,    aspectH: 30,    title: "Compra 100% segura",    sub: "Seus dados protegidos" },
  { icon: imgCert,   aspectW: 19,    aspectH: 30,    title: "Produto com garantia",  sub: "Qualidade Acquafy" },
  { icon: imgFone,   aspectW: 30,    aspectH: 30,    title: "Suporte especializado", sub: "Antes e após a sua compra" },
];

export default function CheckoutUp() {
  return (
    <section className="flex flex-col items-center justify-center p-[20px] w-full lg:bg-transparent bg-gradient-to-b from-[#fafbff] to-[#e8f1f8]">
      {/*
       * Outer container:
       *   lg (≥1024): card com bg image, padding, border-radius, max-w-1400
       *   <1024:      sem card, sem bg image, itens centralizados
       */}
      <div className="relative flex flex-col lg:items-start items-center lg:max-w-[1400px] lg:p-[20px] lg:rounded-[16px] w-full lg:overflow-hidden gap-[20px]">

        {/* Background image — desktop only */}
        <img
          alt=""
          className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Content — desktop: max-w-710 left-aligned · mobile: full-width centered */}
        <div className="relative flex flex-col gap-[20px] lg:items-start items-center lg:max-w-[710px] w-full">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgShieldLabel} size={16} aspectW={26.14} aspectH={30} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              CHECKOUT SEGURO
            </span>
          </div>

          {/* H1 — left on desktop, centered on mobile */}
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#2a2a2b] w-full lg:text-left text-center">
            Seu purificador antigo vale{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>
              um UP!
            </span>
          </h2>

          {/* Bonus card */}
          <div className="bg-white flex flex-col items-center justify-center p-[20px] rounded-[16px] w-full shrink-0">
            <div className="flex gap-[10px] items-center justify-center w-full">
              <div
                className="flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[50px]"
                style={{ background: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}
              >
                <FigmaIcon src={imgGift} size={26} />
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-0">
                {"Ganhe "}
                <span
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}
                >
                  R$100,00
                </span>
                {" de bônus na compra do Acquafy Neo UP Essentials."}
              </p>
            </div>
          </div>

          {/* Trust items — left on desktop, centered on mobile */}
          <div className="flex flex-wrap gap-[15px] items-center lg:justify-start justify-center w-full">
            {trustItems.map((item) => (
              <div key={item.title} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[180px]">
                <FigmaIcon src={item.icon} size={20} aspectW={item.aspectW} aspectH={item.aspectH} />
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] w-full">
                    {item.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] w-full">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom banner */}
          <div
            className="flex flex-wrap gap-[20px] items-center justify-center p-[20px] rounded-[16px] w-full shrink-0 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)]"
            style={{ background: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}
          >
            <FigmaIcon src={imgLock} size={30} aspectW={27} aspectH={30} />
            <div className="flex flex-[1_0_0] flex-col gap-[5px] items-start justify-center min-w-[240px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white w-full">
                Água de qualidade não deve ser privilégio.
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-white w-full">
                {"Faça um "}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#73d0ff]">UP</span>
                {" e leve mais saúde para você e sua família."}
              </p>
            </div>
            {/* Acquafy white logo */}
            <div className="flex flex-[1_0_0] flex-col items-start max-h-[33.57px] max-w-[160px] min-w-[160px]">
              <div className="relative w-full" style={{ aspectRatio: "1133.86 / 237.88" }}>
                <img
                  alt="Acquafy"
                  className="absolute inset-0 w-full h-full object-contain"
                  src={imgLogoWhite}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product image — mobile only (<1024px), below content */}
        <div className="lg:hidden flex flex-col h-[380px] items-center justify-center overflow-clip rounded-[16px] shrink-0 w-full">
          <img
            alt="Acquafy Neo UP"
            className="w-full h-full object-cover"
            src={imgProduct}
          />
        </div>
      </div>
    </section>
  );
}
