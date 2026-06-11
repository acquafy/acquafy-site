import FigmaIcon from "./FigmaIcon";

const imgArrowWhite = "/figma-assets/f1bc0ed4-ae05-42d0-9a9b-446afb8aa0de.svg";
const imgArrowBlue  = "/figma-assets/9fb38b6b-2d2d-4507-a48f-9b970bd17e28.svg";

const imgChatIcon   = "/figma-assets/670c53d1-1537-48df-8655-d6a9ef072f14.svg";
const imgMailIcon   = "/figma-assets/84fcccc4-1a8c-4979-80f4-8d89504a03f7.svg";
const imgTimeIcon   = "/figma-assets/fcd02a83-8abf-4576-a597-b2cb201790ff.svg";

const canais = [
  {
    icon: imgChatIcon,
    size: 30,
    title: "Chat online",
    desc: "Fale agora com um especialista em tempo real.",
    badge: "Disponível",
    badgeColor: "#36ae5c",
    badgeBg: "#e1f3e7",
    action: "Iniciar chat",
    href: "#chat",
  },
  {
    icon: imgMailIcon,
    size: 30,
    aspectW: 30, aspectH: 24,
    title: "E-mail",
    desc: "Envie sua dúvida e responderemos em breve.",
    badge: null,
    action: "suporte@acquafy.com",
    href: "mailto:suporte@acquafy.com",
  },
  {
    icon: imgTimeIcon,
    size: 30,
    title: "Horário de atendimento",
    desc: "Segunda a Sexta",
    badge: null,
    action: "8h às 18h (EST)",
    href: null,
    isInfo: true,
  },
];

export default function CtaBK() {
  return (
    <section className="bg-[#1f2e91] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[16px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-white w-full">
            Não encontrou o que procurava?
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-white max-w-[600px] w-full">
            Nossa equipe está pronta para ajudar. Escolha o melhor canal de atendimento.
          </p>
        </div>

        {/* CTA Buttons row */}
        <div className="flex flex-wrap gap-[16px] items-center justify-center w-full">
          <button className="bg-white hover:bg-[#f0f4ff] active:bg-[#e5ebff] transition-colors
            flex gap-[10px] items-center justify-center
            min-h-[54px] min-w-[200px] overflow-hidden px-[28px] py-[12px] rounded-[8px] cursor-pointer shrink-0
            shadow-[0_2px_12px_0_rgba(255,255,255,0.15)]">
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] flex-1 text-center leading-normal">
              Abrir chamado
            </span>
            <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
          </button>

          <button className="group border-2 border-white hover:bg-white active:bg-[#f0f4ff] transition-colors
            flex gap-[10px] items-center justify-center
            min-h-[54px] min-w-[200px] overflow-hidden px-[28px] py-[12px] rounded-[8px] cursor-pointer shrink-0">
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-white group-hover:text-[#0233c3] transition-colors flex-1 text-center leading-normal">
              Fale com um especialista
            </span>
            <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
              <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
              <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[rgba(255,255,255,0.15)]" />

        {/* Contact channels */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {canais.map((canal) => (
            <div
              key={canal.title}
              className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.14)] transition-colors
                flex flex-[1_0_0] gap-[20px] items-center justify-start
                min-w-[240px] p-[20px] rounded-[16px]"
            >
              {/* Icon */}
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[18px] rounded-full shrink-0 size-[72px]">
                <FigmaIcon
                  src={canal.icon}
                  size={canal.size}
                  aspectW={canal.aspectW}
                  aspectH={canal.aspectH}
                />
              </div>

              {/* Text */}
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <div className="flex gap-[10px] items-center w-full flex-wrap">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-white">
                    {canal.title}
                  </p>
                  {canal.badge && (
                    <span
                      className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] px-[10px] py-[5px] rounded-full whitespace-nowrap"
                      style={{ color: canal.badgeColor, backgroundColor: canal.badgeBg }}
                    >
                      {canal.badge}
                    </span>
                  )}
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[rgba(255,255,255,0.7)]">
                  {canal.desc}
                </p>
                {canal.isInfo ? (
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0569ff]">
                    {canal.action}
                  </p>
                ) : canal.href ? (
                  <a
                    href={canal.href}
                    className="bg-[rgba(255,255,255,0.12)] hover:bg-white hover:text-[#0233c3] transition-colors
                      flex items-center justify-center min-h-[34px] overflow-hidden px-[16px] py-[8px] rounded-[8px] no-underline
                      font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white w-full text-center"
                  >
                    {canal.action}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
