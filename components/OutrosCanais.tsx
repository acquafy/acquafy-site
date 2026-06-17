"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { useChatWidget } from "./ChatWidget";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgChat      = "/figma-assets/icon-chat-42px.svg"; // 42×42      sq
const imgWhatsApp  = "/figma-assets/icon-whatsapp.svg"; // 41.98×42   ~sq
const imgPhone     = "/figma-assets/icon-phone-42px.svg"; // 42×42      sq
const imgCalendar  = "/figma-assets/icon-calendar-b.svg"; // 38×42      portrait
const imgMail      = "/figma-assets/icon-mail-42px.svg"; // 42×34      landscape
const imgArrowBlue = "/figma-assets/icon-arrow-blue-small.svg"; // 11.2×8.84  landscape

const PHONE       = "+14072035669";
const WHATSAPP    = `https://wa.me/${PHONE.replace("+", "")}`;

// ── Translations ──────────────────────────────────────────────────────────────
const T: Record<Lang, {
  heading: string;
  subtitle: string;
  agendarAssunto: string;
  modal: {
    title: string;
    desc: string;
    checkboxText: string;
    termsLink: string;
    checkboxSuffix: string;
    cancelBtn: string;
    submitBtn: string;
  };
  cards: Array<{ title: string; desc: string; cta: string }>;
}> = {
  pt: {
    heading: "Outros canais",
    subtitle: "Escolha o canal que preferir para falar conosco",
    agendarAssunto: "Agendar reunião",
    modal: {
      title: "Inscreva-se na Newsletter",
      desc: "Receba novidades, atualizações e conteúdos exclusivos da Acquafy.",
      checkboxText: "Li e concordo com os ",
      termsLink: "Termos de uso",
      checkboxSuffix: " da Newsletter da Acquafy",
      cancelBtn: "Cancelar",
      submitBtn: "Inscrever-se",
    },
    cards: [
      { title: "Chat online",     desc: "Fale com nossa equipe em tempo real.",      cta: "Iniciar chat" },
      { title: "WhatsApp",        desc: "Atendimento rápido pelo WhatsApp.",         cta: "Abrir WhatsApp" },
      { title: "Ligue para nós",  desc: "Entre em contato diretamente.",             cta: "Ligar agora" },
      { title: "Agendar reunião", desc: "Agende uma conversa com um especialista.",  cta: "Agendar" },
      { title: "Newsletter",      desc: "Receba novidades e atualizações Acquafy.",  cta: "Inscrever-se" },
    ],
  },
  en: {
    heading: "Other Channels",
    subtitle: "Choose the channel you prefer to talk to us",
    agendarAssunto: "Schedule a Meeting",
    modal: {
      title: "Subscribe to the Newsletter",
      desc: "Receive news, updates and exclusive content from Acquafy.",
      checkboxText: "I have read and agree to the ",
      termsLink: "Terms of Use",
      checkboxSuffix: " of Acquafy Newsletter",
      cancelBtn: "Cancel",
      submitBtn: "Subscribe",
    },
    cards: [
      { title: "Online Chat",        desc: "Talk to our team in real time.",               cta: "Start Chat" },
      { title: "WhatsApp",           desc: "Quick support via WhatsApp.",                  cta: "Open WhatsApp" },
      { title: "Call Us",            desc: "Get in touch directly.",                       cta: "Call Now" },
      { title: "Schedule a Meeting", desc: "Schedule a conversation with a specialist.",   cta: "Schedule" },
      { title: "Newsletter",         desc: "Receive Acquafy news and updates.",            cta: "Subscribe" },
    ],
  },
  es: {
    heading: "Otros Canales",
    subtitle: "Elige el canal que prefieras para hablar con nosotros",
    agendarAssunto: "Agendar Reunión",
    modal: {
      title: "Suscríbete al Newsletter",
      desc: "Recibe noticias, actualizaciones y contenidos exclusivos de Acquafy.",
      checkboxText: "He leído y acepto los ",
      termsLink: "Términos de uso",
      checkboxSuffix: " del Newsletter de Acquafy",
      cancelBtn: "Cancelar",
      submitBtn: "Suscribirse",
    },
    cards: [
      { title: "Chat en línea",   desc: "Habla con nuestro equipo en tiempo real.",        cta: "Iniciar Chat" },
      { title: "WhatsApp",        desc: "Atención rápida por WhatsApp.",                   cta: "Abrir WhatsApp" },
      { title: "Llámanos",        desc: "Contáctanos directamente.",                       cta: "Llamar Ahora" },
      { title: "Agendar Reunión", desc: "Agenda una conversación con un especialista.",    cta: "Agendar" },
      { title: "Newsletter",      desc: "Recibe noticias y actualizaciones de Acquafy.",   cta: "Suscribirse" },
    ],
  },
};

// ── Newsletter modal ──────────────────────────────────────────────────────────
function NewsletterModal({
  onClose,
  modalT,
}: {
  onClose: () => void;
  modalT: typeof T["pt"]["modal"];
}) {
  const [email, setEmail]   = useState("");
  const [aceito, setAceito] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-[20px]"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col gap-[20px] max-w-[480px] w-full p-[40px] rounded-[16px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91]">
          {modalT.title}
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333]">
          {modalT.desc}
        </p>

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border-[0.5px] border-[#cbd0d4] p-[20px] rounded-[12px] w-full font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] placeholder:text-[#c8cfd8] outline-none focus:border-[#0233c3] transition-colors"
        />

        <label className="flex gap-[9px] items-start w-full cursor-pointer">
          <div className="relative shrink-0 mt-[2px]">
            <input
              type="checkbox"
              className="sr-only"
              checked={aceito}
              onChange={(e) => setAceito(e.target.checked)}
            />
            <div className="bg-white border-[0.5px] border-[#cbd0d4] flex flex-col items-center justify-center size-[24px] overflow-hidden p-[6px] rounded-[5px]">
              <div
                className={`bg-[#0569ff] rounded-full w-full aspect-square transition-opacity ${aceito ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>
          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#2a2a2b]">
            {modalT.checkboxText}
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">{modalT.termsLink}</span>
            {modalT.checkboxSuffix}
          </span>
        </label>

        <div className="flex gap-[10px] items-center justify-end w-full">
          <button
            onClick={onClose}
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#666] px-[20px] py-[10px] rounded-[8px] hover:bg-[#f6f9fe] transition-colors cursor-pointer"
          >
            {modalT.cancelBtn}
          </button>
          <button
            disabled={!email || !aceito}
            className="bg-[#0233c3] disabled:opacity-50 disabled:cursor-not-allowed font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-white px-[20px] py-[10px] rounded-[8px] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer"
          >
            {modalT.submitBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Card individual ───────────────────────────────────────────────────────────
function CanalCard({
  icon, aspectW, aspectH, title, description, cta, href, onClick,
}: {
  icon: string; aspectW: number; aspectH: number;
  title: string; description: string; cta: string;
  href?: string;
  onClick?: () => void;
}) {
  const ctaRow = (
    <div className="flex gap-[5px] items-center justify-center w-full">
      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] text-center whitespace-nowrap">
        {cta}
      </span>
      <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
    </div>
  );

  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <div className="flex flex-col gap-[20px] items-start w-full">
        <div className="flex items-center justify-center w-full min-h-[30px]">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center flex-1">
            {title}
          </p>
        </div>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[30px] w-full">
          {description}
        </p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="w-full no-underline"
          >
            {ctaRow}
          </a>
        ) : (
          <button onClick={onClick} className="w-full cursor-pointer">
            {ctaRow}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function OutrosCanais() {
  const { lang }                         = useLang();
  const t                                = T[lang];
  const { openChat }                     = useChatWidget();
  const [newsletterOpen, setNewsletter]  = useState(false);

  function handleAgendar() {
    window.dispatchEvent(new CustomEvent("prefill-assunto", { detail: t.agendarAssunto }));
    document
      .getElementById("contato-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const cards = [
    {
      icon: imgChat, aspectW: 42, aspectH: 42,
      title: t.cards[0].title, description: t.cards[0].desc, cta: t.cards[0].cta,
      onClick: openChat,
    },
    {
      icon: imgWhatsApp, aspectW: 41.98, aspectH: 42,
      title: t.cards[1].title, description: t.cards[1].desc, cta: t.cards[1].cta,
      href: WHATSAPP,
    },
    {
      icon: imgPhone, aspectW: 42, aspectH: 42,
      title: t.cards[2].title, description: t.cards[2].desc, cta: t.cards[2].cta,
      href: `tel:${PHONE}`,
    },
    {
      icon: imgCalendar, aspectW: 38, aspectH: 42,
      title: t.cards[3].title, description: t.cards[3].desc, cta: t.cards[3].cta,
      onClick: handleAgendar,
    },
    {
      icon: imgMail, aspectW: 42, aspectH: 34,
      title: t.cards[4].title, description: t.cards[4].desc, cta: t.cards[4].cta,
      onClick: () => setNewsletter(true),
    },
  ];

  return (
    <>
      {newsletterOpen && (
        <NewsletterModal onClose={() => setNewsletter(false)} modalT={t.modal} />
      )}

      <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

          <div className="flex flex-col gap-[10px] items-start text-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
              {t.heading}
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
            {cards.map((card) => (
              <CanalCard key={card.title} {...card} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
