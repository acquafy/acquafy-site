import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg       = "/figma-assets/dac94c0b-90ee-420b-ab31-a31ca7b10a14.png";
const imgProdutos = "/figma-assets/c7db2329-9da9-4f23-b0fa-f13f65ecbb29.png";
const imgContainer = "/figma-assets/9fe09495-cb74-4581-8a18-d1218e05c6ce.svg"; // 40.17×41.5  portrait
const imgDots      = "/figma-assets/42ea5353-8843-46d2-9697-63999c787ed4.svg"; // 42×42       sq
const imgPessoas   = "/figma-assets/9cb3b0cd-c1de-41f5-a4b3-1272f0c3596b.svg"; // 38×35.24    landscape

// ── Feature card ─────────────────────────────────────────────────────────────
function Feature({
  icon, aspectW, aspectH, title, description,
}: { icon: string; aspectW: number; aspectH: number; title: string; description: string }) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-[160px]">
      <FigmaIcon src={icon} size={42} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0233c3]">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">
        {description}
      </p>
    </div>
  );
}

export default function BannerContato() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full min-h-[500px] xl:h-[calc(100vh-80px)]">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Content */}
      <div className="relative flex flex-wrap gap-[40px] items-center max-w-[1400px] w-full">
        {/* Left */}
        <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-[280px] max-w-[640px]">
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#2a2a2b] text-center lg:text-left">
            Fale com a{" "}
            <span className="text-[#0569ff]">Acquafy</span>
          </h1>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] max-w-[520px] text-center lg:text-left">
            Tem dúvidas, quer saber mais sobre nossas soluções ou se tornar um
            parceiro? Estamos prontos para ouvir você e encontrar a melhor
            solução juntos.
          </p>

          <div className="flex flex-wrap gap-[20px] items-start w-full">
            <Feature
              icon={imgContainer}
              aspectW={40.17} aspectH={41.5}
              title="Atendimento especializado"
              description="Nossa equipe está pronta para ajudar você."
            />
            <Feature
              icon={imgDots}
              aspectW={42} aspectH={42}
              title="Resposta rápida"
              description="Retornamos o mais rápido possível"
            />
            <Feature
              icon={imgPessoas}
              aspectW={38} aspectH={35.24}
              title="Atendimento especializado"
              description="Nossa equipe está pronta para ajudar você."
            />
          </div>
        </div>

        {/* Right — product image */}
        <div className="flex flex-[1_0_0] items-center justify-center min-w-[240px]">
          <img
            alt="Linha Neo Acquafy"
            className="w-full max-w-[560px] h-auto object-contain"
            src={imgProdutos}
          />
        </div>
      </div>
    </section>
  );
}
