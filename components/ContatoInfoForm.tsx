"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgLocal      = "/figma-assets/icon-local-31px.svg"; // 31.56×38   portrait
const imgMail       = "/figma-assets/icon-mail-38px.svg"; // 38×30.8    landscape
const imgPhone      = "/figma-assets/icon-phone-whatsapp.svg"; // 37.99×38   ~sq  (WhatsApp)
const imgGlobe      = "/figma-assets/icon-globe-38px.svg"; // 38×38      sq
const imgPessoas    = "/figma-assets/icon-pessoas-38px.svg"; // 38×35.24   landscape
const imgArrowWhite = "/figma-assets/icon-arrow-white-small.svg"; // 11.2×8.84  landscape

const ASSUNTOS_PT = [
  "Falar com especialista",
  "Parcerias",
  "Quero ser Distribuidor",
  "Solicitar apresentação",
  "Suporte técnico",
  "Vendas",
  "Linha Neo",
  "Acquafy Media",
  "Filtros & Acessórios",
  "Acessórios Acquafy",
  "Plataforma Acquafy",
  "App + AI + IoT",
  "Expansão Global",
  "Agendar reunião",
  "Imprensa",
  "Outro",
];

const T: Record<Lang, {
  infoTitle: string;
  sedeTitle: string;
  phoneTitle: string;
  phoneLines: string[];
  presencaTitle: string;
  presencaLines: string[];
  presencaCta: string;
  parceiroTitle: string;
  parceiroLines: string[];
  parceiroCta: string;
  formTitle: string;
  labelNome: string;
  placeholderNome: string;
  labelEmail: string;
  placeholderEmail: string;
  labelAssunto: string;
  labelMensagem: string;
  placeholderMensagem: string;
  submitBtn: string;
  privacyPre: string;
  privacyTerms: string;
  privacyMid: string;
  privacyPolicy: string;
  privacyPost: string;
  assuntos: string[];
}> = {
  pt: {
    infoTitle: "Informações de contato",
    sedeTitle: "Sede Global",
    phoneTitle: "Telefone / WhatsApp",
    phoneLines: ["+1 (407) 203-5669", "Segunda a Sexta, 8h às 18h (EST)"],
    presencaTitle: "Presença global",
    presencaLines: ["16 idiomas em operação ativa"],
    presencaCta: "Ver todas as regiões",
    parceiroTitle: "Seja um parceiro",
    parceiroLines: ["Descubra como fazer parte da nossa rede global de parceiros."],
    parceiroCta: "Quero ser parceiro",
    formTitle: "Envie uma mensagem",
    labelNome: "Nome completo",
    placeholderNome: "Seu nome",
    labelEmail: "E-mail",
    placeholderEmail: "seu@email.com",
    labelAssunto: "Assunto",
    labelMensagem: "Mensagem",
    placeholderMensagem: "Como podemos ajudar você",
    submitBtn: "Enviar mensagem",
    privacyPre: "Li e concordo com os ",
    privacyTerms: "Termos de Uso",
    privacyMid: " e a ",
    privacyPolicy: "Política de Privacidade",
    privacyPost: " da Acquafy",
    assuntos: [
      "Falar com especialista",
      "Parcerias",
      "Quero ser Distribuidor",
      "Solicitar apresentação",
      "Suporte técnico",
      "Vendas",
      "Linha Neo",
      "Acquafy Media",
      "Filtros & Acessórios",
      "Acessórios Acquafy",
      "Plataforma Acquafy",
      "App + AI + IoT",
      "Expansão Global",
      "Agendar reunião",
      "Imprensa",
      "Outro",
    ],
  },
  en: {
    infoTitle: "Contact Information",
    sedeTitle: "Global Headquarters",
    phoneTitle: "Phone / WhatsApp",
    phoneLines: ["+1 (407) 203-5669", "Monday to Friday, 8am to 6pm (EST)"],
    presencaTitle: "Global Presence",
    presencaLines: ["16 languages in active operation"],
    presencaCta: "View All Regions",
    parceiroTitle: "Become a Partner",
    parceiroLines: ["Discover how to join our global partner network."],
    parceiroCta: "I Want to be a Partner",
    formTitle: "Send a Message",
    labelNome: "Full Name",
    placeholderNome: "Your name",
    labelEmail: "E-mail",
    placeholderEmail: "your@email.com",
    labelAssunto: "Subject",
    labelMensagem: "Message",
    placeholderMensagem: "How can we help you",
    submitBtn: "Send Message",
    privacyPre: "I have read and agree to the ",
    privacyTerms: "Terms of Use",
    privacyMid: " and ",
    privacyPolicy: "Privacy Policy",
    privacyPost: " of Acquafy",
    assuntos: [
      "Talk to a Specialist",
      "Partnerships",
      "I Want to be a Distributor",
      "Request a Presentation",
      "Technical Support",
      "Sales",
      "Neo Line",
      "Acquafy Media",
      "Filters & Accessories",
      "Acquafy Accessories",
      "Acquafy Platform",
      "App + AI + IoT",
      "Global Expansion",
      "Schedule a Meeting",
      "Press",
      "Other",
    ],
  },
  es: {
    infoTitle: "Información de Contacto",
    sedeTitle: "Sede Global",
    phoneTitle: "Teléfono / WhatsApp",
    phoneLines: ["+1 (407) 203-5669", "Lunes a Viernes, 8h a 18h (EST)"],
    presencaTitle: "Presencia Global",
    presencaLines: ["16 idiomas en operación activa"],
    presencaCta: "Ver Todas las Regiones",
    parceiroTitle: "Sé un Socio",
    parceiroLines: ["Descubre cómo unirte a nuestra red global de socios."],
    parceiroCta: "Quiero ser Socio",
    formTitle: "Envía un Mensaje",
    labelNome: "Nombre Completo",
    placeholderNome: "Tu nombre",
    labelEmail: "E-mail",
    placeholderEmail: "tu@email.com",
    labelAssunto: "Asunto",
    labelMensagem: "Mensaje",
    placeholderMensagem: "¿Cómo podemos ayudarte?",
    submitBtn: "Enviar Mensaje",
    privacyPre: "He leído y acepto los ",
    privacyTerms: "Términos de Uso",
    privacyMid: " y la ",
    privacyPolicy: "Política de Privacidad",
    privacyPost: " de Acquafy",
    assuntos: [
      "Hablar con un Especialista",
      "Alianzas",
      "Quiero ser Distribuidor",
      "Solicitar Presentación",
      "Soporte Técnico",
      "Ventas",
      "Línea Neo",
      "Acquafy Media",
      "Filtros y Accesorios",
      "Accesorios Acquafy",
      "Plataforma Acquafy",
      "App + AI + IoT",
      "Expansión Global",
      "Agendar Reunión",
      "Prensa",
      "Otro",
    ],
  },
};

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
  const { lang } = useLang();
  const t = T[lang];
  const searchParams = useSearchParams();
  const [nome, setNome]         = useState("");
  const [email, setEmail]       = useState("");
  const [assuntos, setAssuntos] = useState<string[]>(() => {
    const param = searchParams.get("assunto");
    return param && ASSUNTOS_PT.includes(param) ? [param] : [];
  });
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
            {t.infoTitle}
          </p>

          <div className="flex flex-col gap-[20px] w-full">
            <InfoRow
              src={imgLocal} aspectW={31.56} aspectH={38}
              title={t.sedeTitle}
              lines={["Orlando, Flórida, USA", "Acquafy Headquarters"]}
            />
            <InfoRow
              src={imgMail} aspectW={38} aspectH={30.8}
              title="Email"
              lines={["contato@acquafy.com", "parcerias@acquafy.com"]}
            />
            <InfoRow
              src={imgPhone} aspectW={37.99} aspectH={38}
              title={t.phoneTitle}
              lines={t.phoneLines}
            />
            <InfoRow
              src={imgGlobe} aspectW={38} aspectH={38}
              title={t.presencaTitle}
              lines={t.presencaLines}
              ctaLabel={t.presencaCta}
              ctaHref="/expansao-global"
            />
            <InfoRow
              src={imgPessoas} aspectW={38} aspectH={35.24}
              title={t.parceiroTitle}
              lines={t.parceiroLines}
              ctaLabel={t.parceiroCta}
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
            {t.formTitle}
          </p>

          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start w-full">

            {/* Nome + Email lado a lado */}
            <div className="flex flex-wrap gap-[20px] items-start w-full">
              <FormField label={<>{t.labelNome}<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="text"
                  placeholder={t.placeholderNome}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={`${inputCls} flex-1 min-w-[200px]`}
                />
              </FormField>
              <FormField label={<>{t.labelEmail}<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="email"
                  placeholder={t.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputCls} flex-1 min-w-[200px]`}
                />
              </FormField>
            </div>

            {/* Assunto — multi-select chips */}
            <FormField label={<>{t.labelAssunto}<span className="text-[#d74b4d]">*</span></>}>
              <div className="flex flex-wrap gap-[8px] w-full">
                {ASSUNTOS_PT.map((pt, i) => {
                  const selected = assuntos.includes(pt);
                  const label = t.assuntos[i];
                  return (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => toggleAssunto(pt)}
                      className={`px-[14px] py-[8px] rounded-[8px] border text-[14px] font-['Avenir_LT_Pro:85_Heavy'] leading-[18px] transition-colors cursor-pointer ${
                        selected
                          ? "bg-[#0233c3] border-[#0233c3] text-white"
                          : "bg-white border-[#cbd0d4] text-[#333] hover:border-[#0233c3] hover:text-[#0233c3]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </FormField>

            {/* Mensagem */}
            <FormField label={<>{t.labelMensagem}<span className="text-[#d74b4d]">*</span></>}>
              <textarea
                placeholder={t.placeholderMensagem}
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
                {t.submitBtn}
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
                {t.privacyPre}
                <a href="/termos-de-uso" className="text-[#0569ff] hover:underline" onClick={e => e.stopPropagation()}>{t.privacyTerms}</a>
                {t.privacyMid}
                <a href="/politicas-privacidade" className="text-[#9f3df5] hover:underline" onClick={e => e.stopPropagation()}>{t.privacyPolicy}</a>
                {t.privacyPost}
              </span>
            </label>

          </div>
        </div>

      </div>
    </section>
  );
}
