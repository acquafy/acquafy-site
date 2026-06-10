import FigmaIcon from "./FigmaIcon";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg       = "/figma-assets/dac94c0b-90ee-420b-ab31-a31ca7b10a14.png";
const imgProdutos = "/figma-assets/c7db2329-9da9-4f23-b0fa-f13f65ecbb29.png";

// Feature icons — viewBox 0 0 42 42 (todos quadrados)
const imgFone      = "/figma-assets/a5ac7430-0e36-4051-9680-377407e8eb96.svg"; // FONE / headset
const imgTime      = "/figma-assets/fb1809ac-e6e8-4bd9-8e73-65bfa0513f0b.svg"; // TIME / relógio
const imgPlanetWeb = "/figma-assets/57332476-1372-4ded-9d5e-384e7f8717aa.svg"; // PLANET WEB / globo

// ── Feature item ──────────────────────────────────────────────────────────────
// Layout Figma (3560:12637): ícone + título na MESMA LINHA, descrição abaixo
function Feature({
  icon, title, description,
}: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[180px]">
      {/* linha: ícone + título */}
      <div className="flex gap-[20px] items-center w-full">
        <FigmaIcon src={icon} size={40} aspectW={42} aspectH={42} />
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1 min-w-0">
          {title}
        </p>
      </div>
      {/* descrição */}
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
        {description}
      </p>
    </div>
  );
}

export default function BannerContato() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-[20px] pt-[80px] pb-[40px] w-full min-h-[506px]">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Content */}
      <div className="relative flex flex-wrap gap-[40px] items-center max-w-[1400px] w-full">

        {/* Left */}
        <div className="flex flex-[1_0_0] flex-col gap-[40px] items-center lg:items-start min-w-[280px] max-w-[640px]">
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#2a2a2b] text-center lg:text-left">
            Fale com a{" "}
            <span className="text-[#0569ff]">Acquafy</span>
          </h1>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center lg:text-left w-full">
            Tem dúvidas, quer saber mais sobre nossas soluções ou se tornar um
            parceiro? Estamos prontos para ouvir você e encontrar a melhor
            solução juntos.
          </p>

          {/* Features — 3 ícones diferentes, layout horizontal */}
          <div className="flex flex-wrap gap-[20px] items-start w-full">
            <Feature
              icon={imgFone}
              title="Atendimento especializado"
              description="Nossa equipe está pronta para ajudar você."
            />
            <Feature
              icon={imgTime}
              title="Resposta rápida"
              description="Retornamos o mais rápido possível."
            />
            <Feature
              icon={imgPlanetWeb}
              title="Atuação global"
              description="Presente em mais de 16 idiomas com suporte local."
            />
          </div>
        </div>

        {/* Right — product image */}
        <div className="flex flex-[1_0_0] items-end justify-end min-w-[280px]">
          <img
            alt="Linha Neo Acquafy"
            className="w-full max-w-[680px] h-auto object-contain"
            src={imgProdutos}
          />
        </div>

      </div>
    </section>
  );
}
