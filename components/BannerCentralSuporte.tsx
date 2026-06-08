import FigmaIcon from "./FigmaIcon";

const imgBg                   = "/figma-assets/142f30c2-ade4-4357-b7fc-108d36cf934f.png";
const imgMainImage            = "/figma-assets/48e951f6-e9a6-497a-b958-0a2344d84bca.png";

const imgIconChat             = "/figma-assets/c6098d3c-0632-4108-9038-57518439bbc4.svg";
const imgIconCheckin          = "/figma-assets/fc5f4219-5ec9-4c86-87e0-98222bd19d25.svg";
const imgIconBook             = "/figma-assets/d36145cc-eef8-4403-a160-721aa88081b1.svg";
const imgIconFone             = "/figma-assets/89808d52-a757-4a1b-9187-c9d078b3c013.svg";
const imgIconProducts         = "/figma-assets/106036b9-937b-4355-8acd-6e2600405dd6.svg";
const imgIconDownload         = "/figma-assets/759d2315-f179-49a5-86a6-89712b80914b.svg";
const imgIconEducation        = "/figma-assets/68332383-670e-4c9e-8b69-f2b2a665e63d.svg";
const imgIconFaq              = "/figma-assets/49c4632e-ba15-4841-84e4-54393decd610.svg";
const imgIconDoc              = "/figma-assets/99002f0a-fa5c-4e61-93c3-fd2c129bb028.svg";
const imgIconWifi             = "/figma-assets/4a208604-6100-4557-aa1e-3b1637554508.svg";
const imgArrowBlue            = "/figma-assets/75971e6c-641c-404b-9d87-240b3150d417.svg";
const imgArrowWhite           = "/figma-assets/62bf5363-6306-4fd5-8982-4c5b3f4e0c54.svg";
const imgArrowAccent          = "/figma-assets/fb64d069-25ba-4424-b496-efc967cd3083.svg";

const floatingCards = [
  {
    icon: imgIconChat,
    title: "Como podemos ajudar você?",
    desc: null,
    aspectW: 30, aspectH: 30,
  },
  {
    icon: imgIconCheckin,
    title: "Status do Sistema",
    desc: "Verifique a operação dos serviços",
    aspectW: 30, aspectH: 30,
  },
  {
    icon: imgIconBook,
    title: "Base de conhecimento",
    desc: "Tutoriais e artigos úteis.",
    aspectW: 30, aspectH: 22.3,
  },
  {
    icon: imgIconFone,
    title: "Abrir chamado",
    desc: "Receba suporte da nossa equipe.",
    aspectW: 30, aspectH: 30,
  },
];

const quickAccess = [
  { icon: imgIconProducts,  title: "Meus produtos",        desc: "Gerencie seus produtos e registros de garantia.",    aspectW: 29, aspectH: 30 },
  { icon: imgIconDownload,  title: "Downloads",             desc: "Manuais, guias rápidos, softwares e documentos.",    aspectW: 30, aspectH: 30 },
  { icon: imgIconEducation, title: "Tutoriais e vídeos",    desc: "Aprenda passo a passo com nossos tutoriais.",        aspectW: 30, aspectH: 22 },
  { icon: imgIconFaq,       title: "Perguntas frequentes",  desc: "Encontre respostas para as dúvidas mais comuns",     aspectW: 30, aspectH: 30 },
  { icon: imgIconDoc,       title: "Políticas e garantias", desc: "Consulte nossas políticas, termos e garantias.",     aspectW: 24, aspectH: 30 },
  { icon: imgIconWifi,      title: "Status do Sistema",     desc: "Acompanhe a operação da plataforma Acquafy.",        aspectW: 30, aspectH: 20 },
];

export default function BannerCentralSuporte() {
  return (
    <section className="relative flex flex-col items-center px-[20px] py-[40px] w-full overflow-hidden min-h-[875px]">
      {/* Background */}
      <img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Content */}
      <div className="relative flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full flex-1">

        {/* Left column */}
        <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[280px] max-w-[474px]">

          {/* Label pill */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#0233c3] whitespace-nowrap">
              ECOSSISTEMA DIGITAL ACQUAFY
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#2a2a2b] w-full">
            Central de{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(106.8deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              Suporte Acquafy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#0569ff] w-full">
            Estamos aqui para ajudar.
          </p>

          {/* Description */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full">
            Nossa equipe e recursos estão prontos para oferecer a melhor experiência com os produtos e soluções Acquafy. Encontre respostas, tutoriais e suporte especializado sempre que precisar.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            {/* Primary */}
            <button className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#0569ff] transition-colors flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] px-[20px] py-[10px] rounded-[8px] cursor-pointer flex-1">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">
                Abrir chamado
              </span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>
            {/* Secondary */}
            <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] px-[20px] py-[10px] rounded-[8px] cursor-pointer flex-1">
              <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white transition-colors flex-1 text-center">
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

        {/* Right column */}
        <div className="flex flex-[1_0_0] gap-[40px] items-end min-w-[280px] h-[470px]">
          {/* Main hero image */}
          <div className="relative h-full shrink-0" style={{ aspectRatio: "4096/3477" }}>
            <img
              src={imgMainImage}
              alt="Central de Suporte Acquafy"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* Floating info cards */}
          <div className="flex flex-col h-full items-end justify-between pb-[20px] shrink-0 gap-[10px]">
            {floatingCards.map((card) => (
              <div
                key={card.title}
                className="bg-gradient-to-r from-white to-[rgba(255,255,255,0.7)] flex flex-wrap gap-[20px] items-center justify-center min-w-[160px] p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] w-[270px]"
              >
                <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                  <FigmaIcon src={card.icon} size={30} aspectW={card.aspectW} aspectH={card.aspectH} />
                </div>
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                    {card.title}
                  </p>
                  {card.desc && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] w-full">
                      {card.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acesso Rápido white bar */}
      <div className="relative bg-white flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full mt-[40px]">
        <div className="w-full">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
            Acesso{" "}
            <span className="text-[#0569ff]">rápido</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {quickAccess.map((item) => (
            <button
              key={item.title}
              className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px] cursor-pointer group"
            >
              <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                <FigmaIcon src={item.icon} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
              </div>
              <div className="flex flex-col gap-[10px] items-start text-center w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  {item.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {item.desc}
                </p>
              </div>
              <div className="relative shrink-0" style={{ width: 12, height: 12 }}>
                <FigmaIcon src={imgArrowAccent} size={12} aspectW={11.2} aspectH={8.84} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
