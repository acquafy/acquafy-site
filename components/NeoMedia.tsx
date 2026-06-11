import FigmaIcon from "./FigmaIcon";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg          = "/figma-assets/fe4429bc-7d62-427a-a0f3-f9ea1576c252.png"; // background
const imgProduct     = "/figma-assets/1c281bc7-409d-4419-a4b0-63a6eb62fc73.png"; // Acquafy Media totem, aspect 1441/4096
const imgArrowBlue   = "/figma-assets/bf9679c1-4cd0-4871-bf2e-62c09e3cfbe0.svg"; // arrow azul outline
const imgArrowWhite  = "/figma-assets/8b3582ba-350c-4445-b464-872ec596bb95.svg"; // arrow branca hover

// Benefit icons (tamanho 20px cada)
const imgMarketing  = "/figma-assets/225472c1-d7d8-46c8-9e6a-757e6865e82b.svg"; // 39.76×28.46 landscape
const imgDivLine1   = "/figma-assets/9defc25d-3efc-459c-b871-185ccacfd1b8.svg"; // divisor linha
const imgDashboard  = "/figma-assets/d9d2628a-7410-4551-9409-228e4a0c5f01.svg"; // 642×642 sq
const imgDivLine2   = "/figma-assets/ccb8cadb-da22-4087-9862-0c16fd234d71.svg"; // divisor linha
const imgAI         = "/figma-assets/900a973a-2672-4d14-bb6a-88d0a32fe6c1.svg"; // 30×30 sq
const imgMoney      = "/figma-assets/b4c23c4c-c022-43dc-b3ac-5efd2ec978a1.svg"; // 472×440
const imgLocations  = "/figma-assets/e3082aba-4e52-4b16-8e3a-fc260e3ae74a.svg"; // 642×642 sq

// Bottom feature icons
const imgWifi       = "/figma-assets/70eb2c74-72f7-4467-8c0d-6837dce29af3.svg"; // 30×20 landscape
const imgTime       = "/figma-assets/910c0d8d-f822-4220-ad2c-7445a4cb8e53.svg"; // 30×30 sq
const imgBatimentos = "/figma-assets/4efb357e-6728-4416-a523-b7dd5fa91638.svg"; // 30×29
const imgLock       = "/figma-assets/24fb0589-33c6-4a67-9db3-35db57dddabf.svg"; // 27×30 portrait

const benefits = [
  { icon: imgMarketing,  aspectW: 39.76, aspectH: 28.46, title: "Receita com Anúncios",    desc: "Monetize com companhias de alta viabilidade e marcas relevantes." },
  { icon: imgDashboard,  aspectW: 0,     aspectH: 0,      title: "Dashboard do Operador",  desc: "Gestão completa de campanhas, usuários, vendas e indicadores." },
  { icon: imgAI,         aspectW: 0,     aspectH: 0,      title: "IA + Dados Operacionais", desc: "Insights inteligentes para manutenção performance e expansão." },
  { icon: imgMoney,      aspectW: 472,   aspectH: 440,   title: "Receita Recorrente",       desc: "Modelo de receita contínua com mídia e venda de água." },
  { icon: imgLocations,  aspectW: 0,     aspectH: 0,      title: "Locais Ideais",           desc: "Aeroportos, shoppings, hospitais, empresas, universidades e muito mais." },
];

const bottomFeatures = [
  { icon: imgWifi,       aspectW: 30, aspectH: 20, title: "Concetividade Avançada", desc: "4G/5G + Wi-Fi" },
  { icon: imgTime,       aspectW: 0,  aspectH: 0,  title: "Suporte 24h",            desc: "Atendimento dedicado" },
  { icon: imgBatimentos, aspectW: 30, aspectH: 29, title: "Monitoramento Inteligente", desc: "Uso, filtros e consumo" },
  { icon: imgLock,       aspectW: 27, aspectH: 30, title: "Segurança de Dados",     desc: "Conformidade e LGPD" },
];

function BenefitIcon({ icon, aspectW, aspectH }: { icon: string; aspectW: number; aspectH: number }) {
  if (aspectW && aspectH) {
    return <FigmaIcon src={icon} size={20} aspectW={aspectW} aspectH={aspectH} />;
  }
  return <FigmaIcon src={icon} size={20} />;
}

export default function NeoMedia() {
  return (
    <section className="bg-white relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      {/*
       * Container:
       *   ≥1024px (lg): flex-wrap horizontal — texto+cards esquerda, produto direita
       *   <1024px:       flex-col vertical   — tudo empilhado, produto no final
       */}
      <div className="
        border border-[#cbd0d4] flex max-w-[1400px] p-[20px] relative rounded-[16px] w-full overflow-hidden
        flex-col gap-[20px] items-center justify-center
        lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-[20px]
      ">
        {/* Background */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px] z-0"
          src={imgBg}
        />

        {/* LEFT / TOP: título, texto, botão, cards */}
        <div className="relative z-10 flex flex-col gap-[20px] items-start min-w-[240px] w-full lg:flex-[1_0_0]">

          {/* Header */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[240px] pt-[20px]">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full text-center lg:text-left">
              Neo Media
            </h2>
            <div className="flex flex-wrap gap-y-[20px] items-center w-full">
              <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[210px]">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white w-full text-center lg:text-left">
                  Água inteligente + media digital + receita recorrente.
                  <br />
                  Transforme locais públicos em pontos de hidratação, mídia e negócios. Ganhe com anúncios e venda dos produtos Acquafy Neo.
                </p>

                {/* Botão outline com hover/pressed */}
                <a href="/contato" className="
                  group bg-white border border-[#0233c3]
                  hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors
                  flex gap-[10px] items-center justify-center
                  max-w-[280px] min-h-[30px] min-w-[240px] overflow-hidden
                  px-[20px] py-[10px] rounded-[8px] shrink-0 w-full cursor-pointer
                ">
                  <span className="
                    font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px]
                    text-[#0233c3] group-hover:text-white group-active:text-white
                    transition-colors text-center whitespace-nowrap
                  ">
                    Quero investir no Media Network
                  </span>
                  <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
                      <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                    </div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
                      <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Cards wrapper */}
          <div className="flex flex-col gap-[20px] items-start min-w-[240px] shrink-0 w-full">

            {/* Benefits card */}
            <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[20px_10px] items-start justify-center overflow-hidden p-[20px] rounded-[16px] shrink-0 w-full">
              {benefits.map((b, i) => (
                <div key={b.title} className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[150px]">
                  {/* Icon + title block (h-65 to align across items) */}
                  <div className="flex flex-col gap-[20px] h-[65px] items-start justify-center w-full shrink-0">
                    <BenefitIcon icon={b.icon} aspectW={b.aspectW} aspectH={b.aspectH} />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] min-h-[25px] w-full">
                      {b.title}
                    </p>
                  </div>
                  {/* Description (min-h-75 to align across items) */}
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] min-h-[75px] w-full">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom features card */}
            <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[10px] items-center justify-center overflow-hidden p-[20px] rounded-[16px] shrink-0 w-full">
              {bottomFeatures.map((f) => (
                <div key={f.title} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[120px]">
                  <BenefitIcon icon={f.icon} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#1f2e91] w-full">
                      {f.title}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[10px] leading-[14px] text-[#2a2a2b] w-full">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT / BOTTOM: produto Acquafy Media totem
            Desktop: aspect-[350/430] flex-[1_0_0] (ocupa espaço restante)
            Mobile: w-full shrink-0 (abaixo do conteúdo)
        */}
        <div className="
          relative flex flex-wrap gap-y-[40px] items-center justify-center
          min-w-[240px] max-w-[350px] max-h-[430px]
          w-full lg:flex-[1_0_0] lg:aspect-[350/430] relative z-10
        ">
          {/* Totem — w-[151px] h-[430px], aspect 1441/4096 portrait */}
          <div className="flex flex-col items-center justify-center h-[430px] w-[151px] shrink-0">
            <div className="flex-[1_0_0] min-h-px relative" style={{ aspectRatio: "1441 / 4096" }}>
              <img
                alt="Acquafy Neo Media"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgProduct}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
