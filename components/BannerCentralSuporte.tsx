import FigmaIcon from "./FigmaIcon";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgBg        = "/figma-assets/54da886e-ad0c-40e0-b1c5-4ebef3882107.png";
const imgMainImage = "/figma-assets/0f88f795-dcaa-417c-b773-8e294fb4950f.png";

const imgIconChat    = "/figma-assets/2328f5bd-c67d-4131-836e-a43d2ca36d5b.svg";
const imgIconCheckin = "/figma-assets/a5657761-5416-4e91-aa2c-da6292ddb56a.svg";
const imgIconBook    = "/figma-assets/8c24e0f5-d9f7-4e12-a7ac-575b42f5619f.svg";
const imgIconFone    = "/figma-assets/1dd93c82-743b-4216-9f5f-b173b8df8640.svg";

const imgIconProducts  = "/figma-assets/43762c75-7c8a-4044-8113-69dcb9f63b86.svg";
const imgIconDownload  = "/figma-assets/0298fb46-013e-4e99-b9a3-d7d90d8218e0.svg";
const imgIconEducation = "/figma-assets/d22b56b8-0578-4f64-b011-2228a3e888e8.svg";
const imgIconFaq       = "/figma-assets/383f262b-ce1a-4bcf-956f-07aeabf9e518.svg";
const imgIconDoc       = "/figma-assets/fd0455b2-5d5a-4c6c-8533-301f8a94c68c.svg";
const imgIconWifi      = "/figma-assets/e5466ddf-14ac-49c9-908d-c23208fa39f9.svg";

const imgArrowWhite  = "/figma-assets/f1bc0ed4-ae05-42d0-9a9b-446afb8aa0de.svg";
const imgArrowBlue   = "/figma-assets/9fb38b6b-2d2d-4507-a48f-9b970bd17e28.svg";
const imgArrowAccent = "/figma-assets/11e4753e-07db-4612-9dc9-03f33a0075de.svg";

// ── Dados ─────────────────────────────────────────────────────────────────────
const floatingCards = [
  { icon: imgIconChat,    title: "Como podemos ajudar você?",   desc: null,                               aspectW: 30, aspectH: 30   },
  { icon: imgIconCheckin, title: "Status do Sistema",           desc: "Verifique a operação dos serviços", aspectW: 30, aspectH: 30   },
  { icon: imgIconBook,    title: "Base de conhecimento",        desc: "Tutoriais e artigos úteis.",        aspectW: 30, aspectH: 22.3 },
  { icon: imgIconFone,    title: "Abrir chamado",               desc: "Receba suporte da nossa equipe.",   aspectW: 30, aspectH: 30   },
];

const quickAccess = [
  { icon: imgIconProducts,  aspectW: 29, aspectH: 30, title: "Meus produtos",         desc: "Gerencie seus produtos e registros de garantia." },
  { icon: imgIconDownload,  aspectW: 30, aspectH: 30, title: "Downloads",             desc: "Manuais, guias rápidos, softwares e documentos."  },
  { icon: imgIconEducation, aspectW: 30, aspectH: 22, title: "Tutoriais e vídeos",    desc: "Aprenda passo a passo com nossos tutoriais."       },
  { icon: imgIconFaq,       aspectW: 30, aspectH: 30, title: "Perguntas frequentes",  desc: "Encontre respostas para as dúvidas mais comuns"    },
  { icon: imgIconDoc,       aspectW: 24, aspectH: 30, title: "Políticas e garantias", desc: "Consulte nossas políticas, termos e garantias."    },
  { icon: imgIconWifi,      aspectW: 30, aspectH: 20, title: "Status do Sistema",     desc: "Acompanhe a operação da plataforma Acquafy."       },
];

// ── Componente ────────────────────────────────────────────────────────────────
//
//  Breakpoints (Figma nodes 3764-13853, 3772-13963, 3772-14308, 3772-14411):
//  • default   (≤ 620px)  "620"  → col centrado; cards empilhados; imagem full-width abaixo
//  • min-[621px] (621-767px) "767"  → col end; cards c/ mb-[-240px]; imagem 460×390 dir
//  • md:       (≥ 768px)  "1280" → imagem 471×400 esq + cards grade 2×2 dir
//  • xl:       (≥ 1280px) "TOTAL"→ texto esq + imagem flex + cards col 270px dir
//
//  Sem gap entre main-row e Acesso Rápido (section usa justify-center, sem gap).
//
export default function BannerCentralSuporte() {
  return (
    <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full min-h-[calc(100vh-80px)]">

      {/* ── Background ──────────────────────────────────────────── */}
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── Linha principal ─────────────────────────────────────── */}
      {/*
       * ≤1279px: flex-col (texto em cima, imagem+cards abaixo)
       * ≥1280px: flex-row flex-wrap (texto esq | imagem+cards dir), alinhados ao bottom
       */}
      <div className="relative flex flex-col gap-[40px] items-center max-w-[1400px] w-full shrink-0
        xl:flex-row xl:flex-wrap xl:items-end xl:justify-center">

        {/* ── Coluna de texto ─────────────────────────────────── */}
        {/*
         * ≤1279px: centrado, largura total
         * ≥1280px: flex-[1_0_0] max-w-[490px], alinhamento esquerdo, pb-[40px] pt-[20px]
         */}
        <div className="flex flex-col gap-[20px] items-center w-full
          xl:flex-[1_0_0] xl:items-start xl:justify-center xl:self-center xl:max-w-[490px] xl:min-w-[280px] xl:pb-[40px] xl:pt-[20px]">

          {/* Label */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[290px] px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              ECOSSISTEMA DIGITAL ACQUAFY
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#2a2a2b] text-center w-full lg:text-left">
            Central de{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(107deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              Suporte Acquafy
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#0569ff] text-center w-full xl:text-left">
            Estamos aqui para ajudar.
          </p>

          {/* Descrição */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center w-full xl:text-left">
            Nossa equipe e recursos estão prontos para oferecer a melhor experiência
            com os produtos e soluções Acquafy. Encontre respostas, tutoriais e
            suporte especializado sempre que precisar.
          </p>

          {/* Botões */}
          {/*
           * ≤1279px: justify-center (botões centrados)
           * ≥1280px: justify-start (botões à esquerda)
           */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center w-full xl:justify-start">
            <button className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center leading-normal">
                Abrir chamado
              </span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer shrink-0">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white transition-colors flex-1 text-center leading-normal">
                Fale com um especialista
              </span>
              <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                  <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ── Imagem + Cards ──────────────────────────────────── */}
        {/*
         * ≤620px:    flex-col gap-[20px] items-center
         *            → cards (order-1) acima, imagem (order-2) abaixo full-width
         * 621-767px: flex-col items-end gap-0
         *            → cards (order-1) c/ mb-[-240px], imagem (order-2) 460×390 alinhada dir
         * ≥768px:    flex-row items-end justify-center
         *            → imagem (order-1) 471×400 esq c/ mr-[-40px], cards (order-2) dir
         * ≥1280px:   flex-row flex-[1_0_0] items-end max-w-[880px]
         *            → imagem flex-[1_0_0] c/ mr-[-50px], cards col 270px self-stretch
         */}
        <div className="flex flex-col gap-[20px] items-center justify-end w-full shrink-0 min-w-[280px]
          min-[621px]:items-end min-[621px]:gap-0
          md:flex-row md:items-end md:justify-center md:gap-0
          xl:flex-[1_0_0] xl:max-w-[880px] xl:min-w-[280px]">

          {/* ── Imagem ─────────────────────────────────────────── */}
          {/*
           * Container relativo com dimensões exatas do Figma:
           * ≤620px:    order-2, w-full, aspect-[4096/3477] (preenchimento natural)
           * 621-767px: order-2, 460×390 fixo (aspect é sobrescrito pelo h explícito)
           * ≥768px:    order-1, 471×400 fixo, mr-[-40px] sobreposição
           * ≥1280px:   order-1, flex-[1_0_0], h/w-auto volta ao aspect-ratio, mr-[-50px]
           * Imagem preenche container com absolute inset-0 object-cover (sem corte)
           */}
          <div className="relative order-2 w-full aspect-[4096/3477] shrink-0
            min-[621px]:w-[460px] min-[621px]:h-[390px] min-[621px]:max-w-[460px] min-[621px]:shrink-0
            md:order-1 md:w-[471px] md:h-[400px] md:max-w-[471px] md:shrink-0 md:mr-[-40px]
            xl:order-1 xl:flex-[1_0_0] xl:min-w-px xl:w-auto xl:h-auto xl:max-w-none xl:mr-[-50px]">
            <img
              src={imgMainImage}
              alt="Central de Suporte Acquafy"
              className="absolute inset-0 size-full max-w-none object-cover pointer-events-none select-none"
            />
          </div>

          {/* ── Cards (self-stretch wrapper, ativo ≥768px) ─────── */}
          {/*
           * ≤767px: simples container block
           * ≥768px: flex flex-[1_0_0] items-end self-stretch (iguala altura da imagem)
           */}
          <div className="order-1 w-full
            md:order-2 md:relative md:z-[1] md:flex md:flex-[1_0_0] md:flex-row md:items-end md:self-stretch md:min-w-px
            xl:z-10 xl:max-w-[270px]">

            {/* ── Cards (inner) ───────────────────────────────── */}
            {/*
             * ≤620px:    flex-col gap-[20px] w-full
             * 621-767px: + mb-[-240px] (sobreposição com imagem)
             * ≥768px:    flex-wrap h-full items-center justify-end pb-[20px] mb-0 (grade 2×2)
             * ≥1280px:   flex-col flex-nowrap items-end justify-center max-w-[270px] pb-[20px]
             */}
            <div className="flex flex-col gap-[20px] w-full
              min-[621px]:mb-[-240px]
              md:flex-[1_0_0] md:flex-row md:flex-wrap md:content-center md:h-full md:items-center md:justify-end md:pb-[20px] md:mb-0 md:min-w-px
              xl:flex-col xl:flex-nowrap xl:items-end xl:justify-center xl:max-w-[270px] xl:min-w-px xl:pb-[20px]">

              {floatingCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-gradient-to-r from-white to-[rgba(255,255,255,0.7)]
                    flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center
                    p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]
                    w-full min-w-[150px]
                    md:min-h-[90px] md:min-w-[280px] md:w-auto
                    xl:w-full xl:min-w-[160px] xl:min-h-[80px]">
                  <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                    <FigmaIcon src={card.icon} size={30} aspectW={card.aspectW} aspectH={card.aspectH} />
                  </div>
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                      {card.title}
                    </p>
                    {card.desc && (
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#1f2e91] w-full">
                        {card.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Acesso Rápido ───────────────────────────────────────── */}
      {/* Sem gap acima: section usa justify-center (sem justify-between) */}
      <div className="relative bg-white flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full shrink-0">

        {/* Título */}
        <div className="flex flex-col items-start w-full shrink-0">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
            Acesso{" "}
            <span className="text-[#0569ff]">rápido</span>
          </p>
        </div>

        {/* Grid de itens */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full shrink-0
          xl:h-[203px] xl:items-stretch">
          {quickAccess.map((item) => (
            <button
              key={item.title}
              className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors
                flex flex-[1_0_0] flex-col gap-[20px] items-center
                min-w-[180px] p-[20px] rounded-[16px] cursor-pointer">
              <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
              </div>
              <div className="flex flex-col gap-[10px] items-start text-center w-full flex-1">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  {item.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {item.desc}
                </p>
              </div>
              <FigmaIcon src={imgArrowAccent} size={12} aspectW={11.2} aspectH={8.84} />
            </button>
          ))}
        </div>

      </div>

    </section>
  );
}
