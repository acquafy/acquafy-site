"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { useChatWidget } from "./ChatWidget";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgChat      = "/figma-assets/42ea5353-8843-46d2-9697-63999c787ed4.svg"; // 42×42      sq
const imgWhatsApp  = "/figma-assets/5dabfa98-850b-481b-9adc-7a50efe0ae5f.svg"; // 41.98×42   ~sq
const imgPhone     = "/figma-assets/b42e3aca-077d-485d-8519-8dd743644232.svg"; // 42×42      sq
const imgCalendar  = "/figma-assets/796ff117-103a-49c0-ada5-b04a49b8cffb.svg"; // 38×42      portrait
const imgMail      = "/figma-assets/2a1a1b30-6448-4c52-a1e7-7673b9f5da29.svg"; // 42×34      landscape
const imgArrowBlue = "/figma-assets/cb40773a-2459-425f-9c0e-bae3e3e893ad.svg"; // 11.2×8.84  landscape

const PHONE       = "+14072035669";
const WHATSAPP    = `https://wa.me/${PHONE.replace("+", "")}`;

// ── Newsletter modal ──────────────────────────────────────────────────────────
function NewsletterModal({ onClose }: { onClose: () => void }) {
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
          Inscreva-se na Newsletter
        </p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333]">
          Receba novidades, atualizações e conteúdos exclusivos da Acquafy.
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
            Li e concordo com os{" "}
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#0233c3]">Termos de uso</span>
            {" "}da Newsletter da Acquafy
          </span>
        </label>

        <div className="flex gap-[10px] items-center justify-end w-full">
          <button
            onClick={onClose}
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-[#666] px-[20px] py-[10px] rounded-[8px] hover:bg-[#f6f9fe] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={!email || !aceito}
            className="bg-[#0233c3] disabled:opacity-50 disabled:cursor-not-allowed font-['Avenir_LT_Pro:85_Heavy'] text-[16px] text-white px-[20px] py-[10px] rounded-[8px] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer"
          >
            Inscrever-se
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
  const { openChat }                    = useChatWidget();
  const [newsletterOpen, setNewsletter] = useState(false);

  function handleAgendar() {
    window.dispatchEvent(new CustomEvent("prefill-assunto", { detail: "Agendar reunião" }));
    document
      .getElementById("contato-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const cards = [
    {
      icon: imgChat, aspectW: 42, aspectH: 42,
      title: "Chat online",     description: "Fale com nossa equipe em tempo real.",      cta: "Iniciar chat",
      onClick: openChat,
    },
    {
      icon: imgWhatsApp, aspectW: 41.98, aspectH: 42,
      title: "WhatsApp",        description: "Atendimento rápido pelo WhatsApp.",         cta: "Abrir WhatsApp",
      href: WHATSAPP,
    },
    {
      icon: imgPhone, aspectW: 42, aspectH: 42,
      title: "Ligue para nós",  description: "Entre em contato diretamente.",             cta: "Ligar agora",
      href: `tel:${PHONE}`,
    },
    {
      icon: imgCalendar, aspectW: 38, aspectH: 42,
      title: "Agendar reunião", description: "Agende uma conversa com um especialista.",  cta: "Agendar",
      onClick: handleAgendar,
    },
    {
      icon: imgMail, aspectW: 42, aspectH: 34,
      title: "Newsletter",      description: "Receba novidades e atualizações Acquafy.",  cta: "Inscrever-se",
      onClick: () => setNewsletter(true),
    },
  ];

  return (
    <>
      {newsletterOpen && <NewsletterModal onClose={() => setNewsletter(false)} />}

      <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

          <div className="flex flex-col gap-[10px] items-start text-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
              Outros canais
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
              Escola o canal que preferir para falar conosco
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
