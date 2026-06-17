"use client";
import FigmaIcon from "./FigmaIcon";
import { useChatWidget } from "./ChatWidget";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowWhite = "/figma-assets/icon-arrow-white-solid.svg";
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-c.svg";

const imgChatIcon   = "/figma-assets/icon-chat-icon.svg";
const imgMailIcon   = "/figma-assets/icon-mail-icon.svg";
const imgTimeIcon   = "/figma-assets/icon-time-icon.svg";

const T: Record<Lang, {
  heading: string;
  subheading: string;
  btnOpenTicket: string;
  btnTalkSpecialist: string;
  chatTitle: string;
  chatDesc: string;
  chatAction: string;
  chatBadgeAvailable: string;
  chatBadgeUnavailable: string;
  emailTitle: string;
  emailDesc: string;
  hoursTitle: string;
  hoursDesc: string;
  hoursAction: string;
}> = {
  pt: {
    heading: "Não encontrou o que procurava?",
    subheading: "Nossa equipe está pronta para ajudar. Escolha o melhor canal de atendimento.",
    btnOpenTicket: "Abrir chamado",
    btnTalkSpecialist: "Fale com um especialista",
    chatTitle: "Chat online",
    chatDesc: "Fale agora com um especialista em tempo real.",
    chatAction: "Iniciar chat",
    chatBadgeAvailable: "Disponível",
    chatBadgeUnavailable: "Indisponível",
    emailTitle: "E-mail",
    emailDesc: "Envie sua dúvida e responderemos em breve.",
    hoursTitle: "Horário de atendimento",
    hoursDesc: "Segunda a Sexta",
    hoursAction: "8h às 18h (EST)",
  },
  en: {
    heading: "Didn't find what you were looking for?",
    subheading: "Our team is ready to help. Choose the best support channel.",
    btnOpenTicket: "Open a ticket",
    btnTalkSpecialist: "Talk to a specialist",
    chatTitle: "Live Chat",
    chatDesc: "Talk now with a specialist in real time.",
    chatAction: "Start Chat",
    chatBadgeAvailable: "Available",
    chatBadgeUnavailable: "Unavailable",
    emailTitle: "E-mail",
    emailDesc: "Send your question and we will reply shortly.",
    hoursTitle: "Support Hours",
    hoursDesc: "Monday to Friday",
    hoursAction: "8am to 6pm (EST)",
  },
  es: {
    heading: "¿No encontró lo que buscaba?",
    subheading: "Nuestro equipo está listo para ayudar. Elija el mejor canal de atención.",
    btnOpenTicket: "Abrir ticket",
    btnTalkSpecialist: "Hablar con un especialista",
    chatTitle: "Chat en Vivo",
    chatDesc: "Hable ahora con un especialista en tiempo real.",
    chatAction: "Iniciar Chat",
    chatBadgeAvailable: "Disponible",
    chatBadgeUnavailable: "No disponible",
    emailTitle: "E-mail",
    emailDesc: "Envíe su consulta y le responderemos pronto.",
    hoursTitle: "Horario de Atención",
    hoursDesc: "Lunes a Viernes",
    hoursAction: "8h a 18h (EST)",
  },
};

export default function CtaBK() {
  const { isAvailable, openChat } = useChatWidget();
  const { lang } = useLang();
  const t = T[lang];

  const chatBadge      = isAvailable ? t.chatBadgeAvailable   : t.chatBadgeUnavailable;
  const chatBadgeColor = isAvailable ? "#36ae5c"              : "#e53e3e";
  const chatBadgeBg    = isAvailable ? "#e1f3e7"              : "#fee2e2";

  const canais = [
    {
      icon: imgChatIcon,
      size: 30,
      title: t.chatTitle,
      desc: t.chatDesc,
      isChat: true,
      badge: "", badgeColor: "", badgeBg: "",
      action: t.chatAction,
      href: null,
    },
    {
      icon: imgMailIcon,
      size: 30,
      aspectW: 30, aspectH: 24,
      title: t.emailTitle,
      desc: t.emailDesc,
      badge: null,
      action: "suporte@acquafy.com",
      href: "mailto:suporte@acquafy.com",
    },
    {
      icon: imgTimeIcon,
      size: 30,
      title: t.hoursTitle,
      desc: t.hoursDesc,
      badge: null,
      action: t.hoursAction,
      href: null,
      isInfo: true,
    },
  ];

  return (
    <section className="bg-[#1f2e91] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[16px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-white max-w-[600px] w-full">
            {t.subheading}
          </p>
        </div>

        {/* CTA Buttons row */}
        <div className="flex flex-wrap gap-[16px] items-center justify-center w-full">
          <a
            href="/central-de-suporte"
            className="bg-white hover:bg-[#f0f4ff] active:bg-[#e5ebff] transition-colors
              flex gap-[10px] items-center justify-center
              min-h-[54px] min-w-[200px] overflow-hidden px-[28px] py-[12px] rounded-[8px] cursor-pointer shrink-0
              shadow-[0_2px_12px_0_rgba(255,255,255,0.15)] no-underline"
          >
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] flex-1 text-center leading-normal">
              {t.btnOpenTicket}
            </span>
            <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
          </a>

          <a href="/contato" className="group border-2 border-white hover:bg-white active:bg-[#f0f4ff] transition-colors
            flex gap-[10px] items-center justify-center
            min-h-[54px] min-w-[200px] overflow-hidden px-[28px] py-[12px] rounded-[8px] cursor-pointer shrink-0">
            <span className="font-['Articulat_CF:Bold'] text-[16px] text-white group-hover:text-[#0233c3] transition-colors flex-1 text-center leading-normal">
              {t.btnTalkSpecialist}
            </span>
            <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
              <div className="absolute inset-0 transition-opacity opacity-100 group-hover:opacity-0">
                <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
              <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100">
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
            </div>
          </a>
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
                  {(canal.badge || canal.isChat) && (
                    <span
                      className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] px-[10px] py-[5px] rounded-full whitespace-nowrap"
                      style={{
                        color: canal.isChat ? chatBadgeColor : canal.badgeColor,
                        backgroundColor: canal.isChat ? chatBadgeBg : canal.badgeBg,
                      }}
                    >
                      {canal.isChat ? chatBadge : canal.badge}
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
                ) : canal.isChat ? (
                  <button
                    onClick={openChat}
                    className="bg-[rgba(255,255,255,0.12)] hover:bg-white hover:text-[#0233c3] transition-colors
                      flex items-center justify-center min-h-[34px] overflow-hidden px-[16px] py-[8px] rounded-[8px]
                      font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white w-full text-center cursor-pointer"
                  >
                    {canal.action}
                  </button>
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
