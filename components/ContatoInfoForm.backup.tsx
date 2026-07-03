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
    phoneLines: ["+1 (321) 888-7963", "Segunda a Sexta, 8h às 18h (EST)"],
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
    phoneLines: ["+1 (321) 888-7963", "Monday to Friday, 8am to 6pm (EST)"],
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
    phoneLines: ["+1 (321) 888-7963", "Lunes a Viernes, 8h a 18h (EST)"],
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
  fr: {
    infoTitle: "Informations de Contact",
    sedeTitle: "Siège Mondial",
    phoneTitle: "Téléphone / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "Lundi au Vendredi, 8h à 18h (EST)"],
    presencaTitle: "Présence Mondiale",
    presencaLines: ["16 langues en opération active"],
    presencaCta: "Voir Toutes les Régions",
    parceiroTitle: "Devenez Partenaire",
    parceiroLines: ["Découvrez comment rejoindre notre réseau mondial de partenaires."],
    parceiroCta: "Je Veux Être Partenaire",
    formTitle: "Envoyer un Message",
    labelNome: "Nom Complet",
    placeholderNome: "Votre nom",
    labelEmail: "E-mail",
    placeholderEmail: "votre@email.com",
    labelAssunto: "Sujet",
    labelMensagem: "Message",
    placeholderMensagem: "Comment pouvons-nous vous aider ?",
    submitBtn: "Envoyer le Message",
    privacyPre: "J'ai lu et j'accepte les ",
    privacyTerms: "Conditions d'Utilisation",
    privacyMid: " et la ",
    privacyPolicy: "Politique de Confidentialité",
    privacyPost: " d'Acquafy",
    assuntos: [
      "Parler à un Spécialiste",
      "Partenariats",
      "Je Veux Être Distributeur",
      "Demander une Présentation",
      "Support Technique",
      "Ventes",
      "Ligne Neo",
      "Acquafy Media",
      "Filtres et Accessoires",
      "Accessoires Acquafy",
      "Plateforme Acquafy",
      "App + AI + IoT",
      "Expansion Mondiale",
      "Planifier une Réunion",
      "Presse",
      "Autre",
    ],
  },
  de: {
    infoTitle: "Kontaktinformationen",
    sedeTitle: "Globaler Hauptsitz",
    phoneTitle: "Telefon / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "Montag bis Freitag, 8–18 Uhr (EST)"],
    presencaTitle: "Globale Präsenz",
    presencaLines: ["16 Sprachen im aktiven Betrieb"],
    presencaCta: "Alle Regionen Anzeigen",
    parceiroTitle: "Partner Werden",
    parceiroLines: ["Erfahren Sie, wie Sie unserem globalen Partnernetzwerk beitreten können."],
    parceiroCta: "Ich Möchte Partner Werden",
    formTitle: "Eine Nachricht Senden",
    labelNome: "Vollständiger Name",
    placeholderNome: "Ihr Name",
    labelEmail: "E-Mail",
    placeholderEmail: "ihre@email.com",
    labelAssunto: "Betreff",
    labelMensagem: "Nachricht",
    placeholderMensagem: "Wie können wir Ihnen helfen?",
    submitBtn: "Nachricht Senden",
    privacyPre: "Ich habe die ",
    privacyTerms: "Nutzungsbedingungen",
    privacyMid: " und die ",
    privacyPolicy: "Datenschutzrichtlinie",
    privacyPost: " von Acquafy gelesen und stimme zu",
    assuntos: [
      "Mit einem Spezialisten Sprechen",
      "Partnerschaften",
      "Ich Möchte Händler Werden",
      "Präsentation Anfordern",
      "Technischer Support",
      "Vertrieb",
      "Neo-Linie",
      "Acquafy Media",
      "Filter & Zubehör",
      "Acquafy Zubehör",
      "Acquafy Plattform",
      "App + AI + IoT",
      "Globale Expansion",
      "Meeting Planen",
      "Presse",
      "Sonstiges",
    ],
  },
  it: {
    infoTitle: "Informazioni di Contatto",
    sedeTitle: "Sede Globale",
    phoneTitle: "Telefono / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "Lunedì al Venerdì, 8h alle 18h (EST)"],
    presencaTitle: "Presenza Globale",
    presencaLines: ["16 lingue in operazione attiva"],
    presencaCta: "Vedi Tutte le Regioni",
    parceiroTitle: "Diventa un Partner",
    parceiroLines: ["Scopri come entrare a far parte della nostra rete globale di partner."],
    parceiroCta: "Voglio Essere Partner",
    formTitle: "Invia un Messaggio",
    labelNome: "Nome Completo",
    placeholderNome: "Il tuo nome",
    labelEmail: "E-mail",
    placeholderEmail: "tua@email.com",
    labelAssunto: "Oggetto",
    labelMensagem: "Messaggio",
    placeholderMensagem: "Come possiamo aiutarti?",
    submitBtn: "Invia Messaggio",
    privacyPre: "Ho letto e accetto i ",
    privacyTerms: "Termini di Utilizzo",
    privacyMid: " e la ",
    privacyPolicy: "Politica sulla Privacy",
    privacyPost: " di Acquafy",
    assuntos: [
      "Parlare con uno Specialista",
      "Partnership",
      "Voglio Essere Distributore",
      "Richiedere una Presentazione",
      "Supporto Tecnico",
      "Vendite",
      "Linea Neo",
      "Acquafy Media",
      "Filtri e Accessori",
      "Accessori Acquafy",
      "Piattaforma Acquafy",
      "App + AI + IoT",
      "Espansione Globale",
      "Fissare una Riunione",
      "Stampa",
      "Altro",
    ],
  },
  zh: {
    infoTitle: "联系信息",
    sedeTitle: "全球总部",
    phoneTitle: "电话 / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "周一至周五，上午8点至下午6点（EST）"],
    presencaTitle: "全球覆盖",
    presencaLines: ["16种语言积极运营中"],
    presencaCta: "查看所有地区",
    parceiroTitle: "成为合作伙伴",
    parceiroLines: ["了解如何加入我们的全球合作伙伴网络。"],
    parceiroCta: "我想成为合作伙伴",
    formTitle: "发送消息",
    labelNome: "全名",
    placeholderNome: "您的姓名",
    labelEmail: "电子邮件",
    placeholderEmail: "您的@邮箱.com",
    labelAssunto: "主题",
    labelMensagem: "消息",
    placeholderMensagem: "我们如何为您提供帮助？",
    submitBtn: "发送消息",
    privacyPre: "我已阅读并同意Acquafy的 ",
    privacyTerms: "使用条款",
    privacyMid: " 和 ",
    privacyPolicy: "隐私政策",
    privacyPost: "",
    assuntos: [
      "与专家交流",
      "合作伙伴关系",
      "我想成为经销商",
      "申请演示",
      "技术支持",
      "销售",
      "Neo系列",
      "Acquafy Media",
      "滤芯与配件",
      "Acquafy配件",
      "Acquafy平台",
      "App + AI + IoT",
      "全球扩展",
      "安排会议",
      "媒体",
      "其他",
    ],
  },
  ja: {
    infoTitle: "お問い合わせ情報",
    sedeTitle: "グローバル本社",
    phoneTitle: "電話 / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "月曜〜金曜、午前8時〜午後6時（EST）"],
    presencaTitle: "グローバルプレゼンス",
    presencaLines: ["16言語でアクティブ運用中"],
    presencaCta: "すべての地域を見る",
    parceiroTitle: "パートナーになる",
    parceiroLines: ["グローバルパートナーネットワークへの参加方法をご覧ください。"],
    parceiroCta: "パートナーになりたい",
    formTitle: "メッセージを送る",
    labelNome: "氏名",
    placeholderNome: "お名前",
    labelEmail: "メールアドレス",
    placeholderEmail: "your@email.com",
    labelAssunto: "件名",
    labelMensagem: "メッセージ",
    placeholderMensagem: "どのようにお手伝いできますか？",
    submitBtn: "メッセージを送る",
    privacyPre: "Acquafyの ",
    privacyTerms: "利用規約",
    privacyMid: " および ",
    privacyPolicy: "プライバシーポリシー",
    privacyPost: " を読み、同意します",
    assuntos: [
      "専門家と話す",
      "パートナーシップ",
      "販売代理店になりたい",
      "プレゼンを依頼する",
      "テクニカルサポート",
      "営業",
      "Neoライン",
      "Acquafy Media",
      "フィルター＆アクセサリー",
      "Acquafyアクセサリー",
      "Acquafyプラットフォーム",
      "App + AI + IoT",
      "グローバル展開",
      "ミーティングをスケジュール",
      "プレス",
      "その他",
    ],
  },
  ko: {
    infoTitle: "연락처 정보",
    sedeTitle: "글로벌 본사",
    phoneTitle: "전화 / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "월요일~금요일, 오전 8시~오후 6시 (EST)"],
    presencaTitle: "글로벌 진출",
    presencaLines: ["16개 언어로 활발히 운영 중"],
    presencaCta: "모든 지역 보기",
    parceiroTitle: "파트너가 되세요",
    parceiroLines: ["글로벌 파트너 네트워크에 참여하는 방법을 알아보세요."],
    parceiroCta: "파트너가 되고 싶습니다",
    formTitle: "메시지 보내기",
    labelNome: "전체 이름",
    placeholderNome: "이름을 입력하세요",
    labelEmail: "이메일",
    placeholderEmail: "your@email.com",
    labelAssunto: "제목",
    labelMensagem: "메시지",
    placeholderMensagem: "어떻게 도와드릴까요?",
    submitBtn: "메시지 보내기",
    privacyPre: "Acquafy의 ",
    privacyTerms: "이용약관",
    privacyMid: " 및 ",
    privacyPolicy: "개인정보 처리방침",
    privacyPost: "을 읽고 동의합니다",
    assuntos: [
      "전문가와 상담",
      "파트너십",
      "유통업체가 되고 싶습니다",
      "프레젠테이션 요청",
      "기술 지원",
      "영업",
      "Neo 라인",
      "Acquafy Media",
      "필터 & 액세서리",
      "Acquafy 액세서리",
      "Acquafy 플랫폼",
      "App + AI + IoT",
      "글로벌 확장",
      "미팅 예약",
      "언론",
      "기타",
    ],
  },
  "pt-pt": {
    infoTitle: "Informações de contacto",
    sedeTitle: "Sede Global",
    phoneTitle: "Telefone / WhatsApp",
    phoneLines: ["+1 (321) 888-7963", "Segunda a Sexta, 8h às 18h (EST)"],
    presencaTitle: "Presença global",
    presencaLines: ["16 idiomas em operação activa"],
    presencaCta: "Ver todas as regiões",
    parceiroTitle: "Seja um parceiro",
    parceiroLines: ["Descubra como fazer parte da nossa rede global de parceiros."],
    parceiroCta: "Quero ser parceiro",
    formTitle: "Envie uma mensagem",
    labelNome: "Nome completo",
    placeholderNome: "O seu nome",
    labelEmail: "E-mail",
    placeholderEmail: "o.seu@email.com",
    labelAssunto: "Assunto",
    labelMensagem: "Mensagem",
    placeholderMensagem: "Como podemos ajudá-lo",
    submitBtn: "Enviar mensagem",
    privacyPre: "Li e concordo com os ",
    privacyTerms: "Termos de Utilização",
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
              lines={["info@acquafy.com"]}
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

