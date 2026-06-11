"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulOutArrow } from "./ui/Buttons";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgLocal      = "/figma-assets/7fa577a3-29df-4b04-960c-1ec8b8f0b2bc.svg"; // 31.56×38   portrait
const imgMail       = "/figma-assets/29530df8-b9ae-4a2a-ad2e-0252d2e21f79.svg"; // 38×30.8    landscape
const imgPhone      = "/figma-assets/32a6f68d-b20c-4087-9c6d-4b88dd21ab20.svg"; // 37.99×38   ~sq  (WhatsApp)
const imgGlobe      = "/figma-assets/a3d8d3e1-382f-4155-9bb5-9492c1797329.svg"; // 38×38      sq
const imgPessoas    = "/figma-assets/9cb3b0cd-c1de-41f5-a4b3-1272f0c3596b.svg"; // 38×35.24   landscape
const imgArrowWhite = "/figma-assets/93b457af-90d0-4dc6-bb02-fb93fc706899.svg"; // 11.2×8.84  landscape

const ASSUNTOS = [
  "Falar com especialista",
  "Parcerias",
  "Quero ser Distribuidor",
  "Solicitar apresentação",
  "Suporte técnico",
  "Vendas",
  "Linha Neo",
  "Acquafy Media",
  "Filtros & Acessórios",
  "Plataforma Acquafy",
  "App + AI + IoT",
  "Expansão Global",
  "Agendar reunião",
  "Imprensa",
  "Outro",
];

// ── Ícone dentro de círculo ───────────────────────────────────────────────────
function IconCircle({ src, aspectW, aspectH }: {
  src: string; aspectW: number; aspectH: number;
}) {
  return (
    <div className="bg-[#f6f9fe] border border-[#f3faff] flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[60px]">
      <FigmaIcon src={src} size={36} aspectW={aspectW} aspectH={aspectH} />
    </div>
  );
}

// ── Linha de informação de contato ────────────────────────────────────────────
function InfoRow({
  src, aspectW, aspectH, title, lines, ctaLabel, ctaHref,
}: {
  src: string; aspectW: number; aspectH: number;
  title: string; lines: string[]; ctaLabel?: string; ctaHref?: string;
}) {
  return (
    <div className="flex gap-[20px] items-center w-full">
      <IconCircle src={src} aspectW={aspectW} aspectH={aspectH} />
      <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[30px] w-full flex flex-col justify-center">
          {title}
        </p>
        <div className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] min-h-[30px] w-full flex flex-col justify-center">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {ctaLabel && ctaHref && (
          <Link href={ctaHref} className="w-full">
            <BtnAzulOutArrow className="w-full min-h-[30px] text-[14px]">
              {ctaLabel}
            </BtnAzulOutArrow>
          </Link>
        )}
        {ctaLabel && !ctaHref && (
          <BtnAzulOutArrow className="w-full min-h-[30px] text-[14px]">
            {ctaLabel}
          </BtnAzulOutArrow>
        )}
      </div>
    </div>
  );
}

// ── Campo do formulário ───────────────────────────────────────────────────────
function FormField({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[20px] items-start w-full">
      <div className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#2a2a2b] w-full">
        {label}
      </div>
      {children}
    </div>
  );
}

const inputCls =
  "bg-white border-[0.5px] border-[#cbd0d4] flex gap-[10px] items-start overflow-clip p-[20px] rounded-[12px] w-full " +
  "font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] placeholder:text-[#c8cfd8] " +
  "outline-none focus:border-[#0233c3] transition-colors";

export default function ContatoInfoForm() {
  const [nome, setNome]         = useState("");
  const [email, setEmail]       = useState("");
  const [assuntos, setAssuntos] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [aceito, setAceito]     = useState(false);

  useEffect(() => {
    function handler(e: CustomEvent<string>) {
      setAssuntos((prev) => prev.includes(e.detail) ? prev : [...prev, e.detail]);
    }
    window.addEventListener("prefill-assunto", handler as EventListener);
    return () => window.removeEventListener("prefill-assunto", handler as EventListener);
  }, []);

  function toggleAssunto(a: string) {
    setAssuntos((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }

  return (
    <section id="contato-form" className="scroll-mt-[80px] bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col lg:flex-row gap-[20px] items-stretch justify-center max-w-[1400px] w-full">

        {/* ── LEFT: Informações de contato ──────────────────────────────────── */}
        <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-start lg:max-w-[420px] min-w-[280px] px-[20px] py-[40px] lg:p-[40px] rounded-[16px] order-2 lg:order-1">

          <p
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent w-full"
            style={{ backgroundImage: "linear-gradient(90deg, #0233c3, #0569ff)" }}
          >
            Informações de contato
          </p>

          <div className="flex flex-col gap-[20px] w-full">
            <InfoRow
              src={imgLocal} aspectW={31.56} aspectH={38}
              title="Sede Global"
              lines={["Orlando, Flórida, USA", "Acquafy Headquarters"]}
            />
            <InfoRow
              src={imgMail} aspectW={38} aspectH={30.8}
              title="Email"
              lines={["contato@acquafy.com", "parcerias@acquafy.com"]}
            />
            <InfoRow
              src={imgPhone} aspectW={37.99} aspectH={38}
              title="Telefone / WhatsApp"
              lines={["+1 (407) 203-5669", "Segunda a Sexta, 8h às 18h (EST)"]}
            />
            <InfoRow
              src={imgGlobe} aspectW={38} aspectH={38}
              title="Presença global"
              lines={["16 idiomas em operação ativa"]}
              ctaLabel="Ver todas as regiões"
              ctaHref="/expansao-global"
            />
            <InfoRow
              src={imgPessoas} aspectW={38} aspectH={35.24}
              title="Seja um parceiro"
              lines={["Descubra como fazer parte da nossa rede global de parceiros."]}
              ctaLabel="Quero ser parceiro"
              ctaHref="/parceria"
            />
          </div>
        </div>

        {/* ── RIGHT: Formulário ─────────────────────────────────────────────── */}
        <div className="bg-white flex flex-[1_0_0] flex-col gap-[40px] items-start min-w-[280px] px-[20px] py-[40px] lg:p-[40px] rounded-[16px] order-1 lg:order-2">

          <p
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent w-full shrink-0"
            style={{ backgroundImage: "linear-gradient(90deg, #0233c3, #0569ff)" }}
          >
            Envie uma mensagem
          </p>

          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start w-full">

            {/* Nome + Email lado a lado */}
            <div className="flex flex-wrap gap-[20px] items-start w-full">
              <FormField label={<>Nome completo<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={`${inputCls} flex-1 min-w-[200px]`}
                />
              </FormField>
              <FormField label={<>E-mail<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputCls} flex-1 min-w-[200px]`}
                />
              </FormField>
            </div>

            {/* Assunto — multi-select chips */}
            <FormField label={<>Assunto<span className="text-[#d74b4d]">*</span></>}>
              <div className="flex flex-wrap gap-[8px] w-full">
                {ASSUNTOS.map((a) => {
                  const selected = assuntos.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAssunto(a)}
                      className={`px-[14px] py-[8px] rounded-[8px] border text-[14px] font-['Avenir_LT_Pro:85_Heavy'] leading-[18px] transition-colors cursor-pointer ${
                        selected
                          ? "bg-[#0233c3] border-[#0233c3] text-white"
                          : "bg-white border-[#cbd0d4] text-[#333] hover:border-[#0233c3] hover:text-[#0233c3]"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            </FormField>

            {/* Mensagem */}
            <FormField label={<>Mensagem<span className="text-[#d74b4d]">*</span></>}>
              <textarea
                placeholder="Como podemos ajudar você"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={6}
                className={`${inputCls} resize-none`}
              />
            </FormField>

            {/* Botão enviar */}
            <button
              type="submit"
              className="bg-[#0233c3] flex gap-[10px] items-center justify-center min-h-[50px] overflow-hidden px-[20px] py-[10px] rounded-[8px] w-full hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer shrink-0"
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center whitespace-nowrap">
                Enviar mensagem
              </span>
              <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
            </button>

            {/* Checkbox privacidade */}
            <label className="flex gap-[9px] items-center w-full cursor-pointer shrink-0">
              <div className="relative shrink-0">
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
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#2a2a2b]">
                Li e concordo com a{" "}
                <span className="text-[#0569ff]">Política de Privacidade</span>
                {" "}da Acquafy
              </span>
            </label>

          </div>
        </div>

      </div>
    </section>
  );
}
