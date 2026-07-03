"use client";
import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgProduct       = "/figma-assets/neo-up-bow.webp";
const imgBgDesktop     = "/figma-assets/bg-desktop-city.webp";
const imgFamilyDesktop = "/figma-assets/photo-family-desktop.webp";
const imgBgMobile      = "/figma-assets/bg-mobile-gradient.webp";
const imgFamilyMobile  = "/figma-assets/photo-family-mobile.webp";
const imgArrowBlue     = "/figma-assets/icon-arrow-blue-outline-btn.svg";
const imgArrowWhite    = "/figma-assets/icon-arrow-white-hover.svg";

const T: Record<Lang, {
  title: string;
  sub1: string; sub2: string; sub3: string;
  btn: string;
}> = {
  pt: {
    title: "CAMPANHA ACQUAFY TRANSFORMA VIDAS",
    sub1: "De julho a dezembro, 1 purificador por mês.",
    sub2: "Participe e concorra a um ",
    sub3: " todo mês!",
    btn: "Quero participar",
  },
  en: {
    title: "ACQUAFY TRANSFORMS LIVES CAMPAIGN",
    sub1: "From July to December, 1 purifier per month.",
    sub2: "Join and compete for an ",
    sub3: " every month!",
    btn: "I want to participate",
  },
  "en-gb": {
    title: "ACQUAFY TRANSFORMS LIVES CAMPAIGN",
    sub1: "From July to December, 1 purifier per month.",
    sub2: "Join and enter for an ",
    sub3: " every month!",
    btn: "I want to take part",
  },
  es: {
    title: "CAMPAÑA ACQUAFY TRANSFORMA VIDAS",
    sub1: "De julio a diciembre, 1 purificador por mes.",
    sub2: "Participa y concursa por un ",
    sub3: " ¡cada mes!",
    btn: "Quiero participar",
  },
  fr: {
    title: "CAMPAGNE ACQUAFY TRANSFORME DES VIES",
    sub1: "De juillet à décembre, 1 purificateur par mois.",
    sub2: "Participez et concourez pour un ",
    sub3: " chaque mois !",
    btn: "Je veux participer",
  },
  de: {
    title: "ACQUAFY VERÄNDERT LEBEN KAMPAGNE",
    sub1: "Von Juli bis Dezember, 1 Wasserreiniger pro Monat.",
    sub2: "Mitmachen und gewinnen Sie einen ",
    sub3: " jeden Monat!",
    btn: "Ich möchte mitmachen",
  },
  it: {
    title: "CAMPAGNA ACQUAFY TRASFORMA VITE",
    sub1: "Da luglio a dicembre, 1 purificatore al mese.",
    sub2: "Partecipa e concorri per un ",
    sub3: " ogni mese!",
    btn: "Voglio partecipare",
  },
  zh: {
    title: "ACQUAFY改变生活活动",
    sub1: "从7月到12月，每月一台净水器。",
    sub2: "参与并角逐一台 ",
    sub3: " 每个月！",
    btn: "我想参与",
  },
  ja: {
    title: "ACQUAFY 生活を変えるキャンペーン",
    sub1: "7月から12月まで、毎月1台の浄水器。",
    sub2: "参加して ",
    sub3: " を毎月獲得しよう！",
    btn: "参加したい",
  },
  ko: {
    title: "ACQUAFY 삶을 변화시키는 캠페인",
    sub1: "7월부터 12월까지, 매월 정수기 1대.",
    sub2: "참여하고 ",
    sub3: " 을 매달 받아가세요!",
    btn: "참여하고 싶어요",
  },
  sv: {
    title: "ACQUAFY FÖRÄNDRAR LIV KAMPANJ",
    sub1: "Från juli till december, 1 vattenrenare per månad.",
    sub2: "Delta och tävla om en ",
    sub3: " varje månad!",
    btn: "Jag vill delta",
  },
  fi: {
    title: "ACQUAFY MUUTTAA ELÄMÄÄ -KAMPANJA",
    sub1: "Heinäkuusta joulukuuhun, 1 vedenpuhdistin kuukaudessa.",
    sub2: "Osallistu ja kilpaile ",
    sub3: " joka kuukausi!",
    btn: "Haluan osallistua",
  },
  ru: {
    title: "КАМПАНИЯ ACQUAFY МЕНЯЕТ ЖИЗНИ",
    sub1: "С июля по декабрь, 1 очиститель воды в месяц.",
    sub2: "Участвуйте и борьтесь за ",
    sub3: " каждый месяц!",
    btn: "Хочу участвовать",
  },
  ro: {
    title: "CAMPANIA ACQUAFY TRANSFORMA VIETILE",
    sub1: "Din iulie pana in decembrie, 1 purificator pe luna.",
    sub2: "Participa si concureaza pentru un ",
    sub3: " in fiecare luna!",
    btn: "Vreau sa particip",
  },
  he: {
    title: "קמפיין ACQUAFY משנה חיים",
    sub1: "מיולי עד דצמבר, מטהר מים אחד בחודש.",
    sub2: "הצטרפו והתחרו על ",
    sub3: " כל חודש!",
    btn: "אני רוצה להשתתף",
  },
  "pt-pt": {
    title: "CAMPANHA ACQUAFY TRANSFORMA VIDAS",
    sub1: "De julho a dezembro, 1 purificador por mês.",
    sub2: "Participe e concorra a um ",
    sub3: " todos os meses!",
    btn: "Quero participar",
  },
};

type CampaignFormLang = {
  modalTitle: string;
  labelNome: string; placeholderNome: string;
  labelEmail: string; placeholderEmail: string;
  labelPais: string; placeholderPais: string;
  submitBtn: string;
  privacyPre: string; privacyTerms: string; privacyMid: string; privacyPolicy: string; privacyPost: string;
};

const FORM_T: Record<Lang, CampaignFormLang> = {
  pt: {
    modalTitle: "Participar da Campanha",
    labelNome: "Nome completo", placeholderNome: "Seu nome",
    labelEmail: "E-mail", placeholderEmail: "seu@email.com",
    labelPais: "País", placeholderPais: "Ex.: Brasil, Portugal…",
    submitBtn: "Enviar",
    privacyPre: "Li e concordo com os ", privacyTerms: "Termos de Uso", privacyMid: " e a ", privacyPolicy: "Política de Privacidade", privacyPost: " da Acquafy",
  },
  "pt-pt": {
    modalTitle: "Participar da Campanha",
    labelNome: "Nome completo", placeholderNome: "O seu nome",
    labelEmail: "E-mail", placeholderEmail: "o.seu@email.com",
    labelPais: "País", placeholderPais: "Ex.: Brasil, Portugal…",
    submitBtn: "Enviar",
    privacyPre: "Li e concordo com os ", privacyTerms: "Termos de Utilização", privacyMid: " e a ", privacyPolicy: "Política de Privacidade", privacyPost: " da Acquafy",
  },
  en: {
    modalTitle: "Join the Campaign",
    labelNome: "Full name", placeholderNome: "Your name",
    labelEmail: "E-mail", placeholderEmail: "you@email.com",
    labelPais: "Country", placeholderPais: "e.g. United States, UK…",
    submitBtn: "Submit",
    privacyPre: "I have read and agree to the ", privacyTerms: "Terms of Use", privacyMid: " and the ", privacyPolicy: "Privacy Policy", privacyPost: " of Acquafy",
  },
  "en-gb": {
    modalTitle: "Join the Campaign",
    labelNome: "Full name", placeholderNome: "Your name",
    labelEmail: "E-mail", placeholderEmail: "you@email.com",
    labelPais: "Country", placeholderPais: "e.g. United Kingdom, Australia…",
    submitBtn: "Submit",
    privacyPre: "I have read and agree to the ", privacyTerms: "Terms of Use", privacyMid: " and the ", privacyPolicy: "Privacy Policy", privacyPost: " of Acquafy",
  },
  es: {
    modalTitle: "Unirse a la Campaña",
    labelNome: "Nombre completo", placeholderNome: "Tu nombre",
    labelEmail: "Correo electrónico", placeholderEmail: "tu@correo.com",
    labelPais: "País", placeholderPais: "Ej.: España, México…",
    submitBtn: "Enviar",
    privacyPre: "He leído y acepto los ", privacyTerms: "Términos de Uso", privacyMid: " y la ", privacyPolicy: "Política de Privacidad", privacyPost: " de Acquafy",
  },
  fr: {
    modalTitle: "Rejoindre la Campagne",
    labelNome: "Nom complet", placeholderNome: "Votre nom",
    labelEmail: "E-mail", placeholderEmail: "vous@email.com",
    labelPais: "Pays", placeholderPais: "Ex. : France, Belgique…",
    submitBtn: "Envoyer",
    privacyPre: "J'ai lu et j'accepte les ", privacyTerms: "Conditions d'utilisation", privacyMid: " et la ", privacyPolicy: "Politique de confidentialité", privacyPost: " d'Acquafy",
  },
  de: {
    modalTitle: "An der Kampagne teilnehmen",
    labelNome: "Vollständiger Name", placeholderNome: "Ihr Name",
    labelEmail: "E-Mail", placeholderEmail: "sie@email.com",
    labelPais: "Land", placeholderPais: "z. B. Deutschland, Österreich…",
    submitBtn: "Absenden",
    privacyPre: "Ich habe die ", privacyTerms: "Nutzungsbedingungen", privacyMid: " und die ", privacyPolicy: "Datenschutzrichtlinie", privacyPost: " von Acquafy gelesen und stimme zu",
  },
  it: {
    modalTitle: "Partecipa alla Campagna",
    labelNome: "Nome completo", placeholderNome: "Il tuo nome",
    labelEmail: "E-mail", placeholderEmail: "tu@email.com",
    labelPais: "Paese", placeholderPais: "Es.: Italia, Svizzera…",
    submitBtn: "Invia",
    privacyPre: "Ho letto e accetto i ", privacyTerms: "Termini di utilizzo", privacyMid: " e la ", privacyPolicy: "Politica sulla privacy", privacyPost: " di Acquafy",
  },
  zh: {
    modalTitle: "参与活动",
    labelNome: "全名", placeholderNome: "您的姓名",
    labelEmail: "电子邮件", placeholderEmail: "您的邮箱",
    labelPais: "国家", placeholderPais: "例如：中国、新加坡…",
    submitBtn: "提交",
    privacyPre: "我已阅读并同意Acquafy的", privacyTerms: "使用条款", privacyMid: "和", privacyPolicy: "隐私政策", privacyPost: "",
  },
  ja: {
    modalTitle: "キャンペーンに参加する",
    labelNome: "氏名", placeholderNome: "お名前",
    labelEmail: "メールアドレス", placeholderEmail: "メール",
    labelPais: "国", placeholderPais: "例：日本、シンガポール…",
    submitBtn: "送信",
    privacyPre: "Acquafyの", privacyTerms: "利用規約", privacyMid: "と", privacyPolicy: "プライバシーポリシー", privacyPost: "を読み、同意します",
  },
  ko: {
    modalTitle: "캠페인 참여하기",
    labelNome: "전체 이름", placeholderNome: "이름을 입력하세요",
    labelEmail: "이메일", placeholderEmail: "이메일 주소",
    labelPais: "국가", placeholderPais: "예: 한국, 미국…",
    submitBtn: "제출",
    privacyPre: "Acquafy의 ", privacyTerms: "이용약관", privacyMid: " 및 ", privacyPolicy: "개인정보처리방침", privacyPost: "을 읽고 동의합니다",
  },
  sv: {
    modalTitle: "Delta i kampanjen",
    labelNome: "Fullständigt namn", placeholderNome: "Ditt namn",
    labelEmail: "E-post", placeholderEmail: "du@email.com",
    labelPais: "Land", placeholderPais: "T.ex. Sverige, Norge…",
    submitBtn: "Skicka",
    privacyPre: "Jag har läst och godkänner ", privacyTerms: "användarvillkoren", privacyMid: " och ", privacyPolicy: "integritetspolicyn", privacyPost: " för Acquafy",
  },
  fi: {
    modalTitle: "Osallistu kampanjaan",
    labelNome: "Koko nimi", placeholderNome: "Nimesi",
    labelEmail: "Sähköposti", placeholderEmail: "sinä@email.com",
    labelPais: "Maa", placeholderPais: "Esim. Suomi, Ruotsi…",
    submitBtn: "Lähetä",
    privacyPre: "Olen lukenut ja hyväksyn Acquafyn ", privacyTerms: "käyttöehdot", privacyMid: " ja ", privacyPolicy: "tietosuojakäytännön", privacyPost: "",
  },
  ru: {
    modalTitle: "Участвовать в кампании",
    labelNome: "Полное имя", placeholderNome: "Ваше имя",
    labelEmail: "Эл. почта", placeholderEmail: "вы@email.com",
    labelPais: "Страна", placeholderPais: "Напр.: Россия, Казахстан…",
    submitBtn: "Отправить",
    privacyPre: "Я прочитал(а) и принимаю ", privacyTerms: "Условия использования", privacyMid: " и ", privacyPolicy: "Политику конфиденциальности", privacyPost: " Acquafy",
  },
  ro: {
    modalTitle: "Participă la Campanie",
    labelNome: "Nume complet", placeholderNome: "Numele tău",
    labelEmail: "E-mail", placeholderEmail: "tu@email.com",
    labelPais: "Țară", placeholderPais: "Ex.: România, Moldova…",
    submitBtn: "Trimite",
    privacyPre: "Am citit și sunt de acord cu ", privacyTerms: "Termenii de utilizare", privacyMid: " și ", privacyPolicy: "Politica de confidențialitate", privacyPost: " ale Acquafy",
  },
  he: {
    modalTitle: "הצטרפות לקמפיין",
    labelNome: "שם מלא", placeholderNome: "שמך",
    labelEmail: "דואר אלקטרוני", placeholderEmail: "אתה@email.com",
    labelPais: "מדינה", placeholderPais: "למשל: ישראל, ארה\"ב…",
    submitBtn: "שלח",
    privacyPre: "קראתי ואני מסכים/ה ל", privacyTerms: "תנאי השימוש", privacyMid: " ול", privacyPolicy: "מדיניות הפרטיות", privacyPost: " של Acquafy",
  },
};

const inputCls =
  "bg-white border-[0.5px] border-[#cbd0d4] flex gap-[10px] items-start overflow-clip p-[20px] rounded-[12px] w-full " +
  "font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] placeholder:text-[#c8cfd8] " +
  "outline-none focus:border-[#0233c3] transition-colors";

function FormField({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[12px] items-start w-full">
      <div className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
        {label}
      </div>
      {children}
    </div>
  );
}

function CampaignModal({ ft, onClose }: { ft: CampaignFormLang; onClose: () => void }) {
  const [nome, setNome]     = useState("");
  const [email, setEmail]   = useState("");
  const [pais, setPais]     = useState("");
  const [aceito, setAceito] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[20px]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-[30px] lg:p-[40px] flex flex-col gap-[24px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <p
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #0233c3, #0569ff)" }}
          >
            {ft.modalTitle}
          </p>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-[36px] rounded-full hover:bg-[#f0f0f0] transition-colors shrink-0 cursor-pointer"
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#3e4650" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-wrap gap-[16px] items-start">
            <div className="flex-1 min-w-[200px]">
              <FormField label={<>{ft.labelNome}<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="text"
                  placeholder={ft.placeholderNome}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputCls}
                />
              </FormField>
            </div>
            <div className="flex-1 min-w-[200px]">
              <FormField label={<>{ft.labelEmail}<span className="text-[#d74b4d]">*</span></>}>
                <input
                  type="email"
                  placeholder={ft.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </FormField>
            </div>
          </div>

          <FormField label={ft.labelPais}>
            <input
              type="text"
              placeholder={ft.placeholderPais}
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className={inputCls}
            />
          </FormField>

          <button
            type="submit"
            className="bg-[#0233c3] flex gap-[10px] items-center justify-center min-h-[50px] overflow-hidden px-[20px] py-[10px] rounded-[8px] w-full hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer shrink-0"
          >
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white text-center whitespace-nowrap">
              {ft.submitBtn}
            </span>
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </button>

          <label className="flex gap-[9px] items-center w-full cursor-pointer shrink-0">
            <div className="relative shrink-0">
              <input
                type="checkbox"
                className="sr-only"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
              />
              <div className="bg-white border-[0.5px] border-[#cbd0d4] flex flex-col items-center justify-center size-[24px] overflow-hidden p-[6px] rounded-[5px]">
                <div className={`bg-[#0569ff] rounded-full w-full aspect-square transition-opacity ${aceito ? "opacity-100" : "opacity-0"}`} />
              </div>
            </div>
            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#2a2a2b]">
              {ft.privacyPre}
              <a href="/terms-of-use" className="text-[#0569ff] hover:underline" onClick={(e) => e.stopPropagation()}>{ft.privacyTerms}</a>
              {ft.privacyMid}
              <a href="/privacy-policy" className="text-[#9f3df5] hover:underline" onClick={(e) => e.stopPropagation()}>{ft.privacyPolicy}</a>
              {ft.privacyPost}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function NeoUPProduct({ size }: { size: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="flex-[1_0_0] min-h-px relative"
        style={{ aspectRatio: "1191 / 1456" }}
      >
        <img
          alt="Acquafy Neo UP"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgProduct}
        />
      </div>
    </div>
  );
}

function CampaignText({ centered, t }: { centered?: boolean; t: typeof T["pt"] }) {
  return (
    <div className={`flex flex-col gap-[20px] items-start text-white w-full ${centered ? "items-center text-center" : ""}`}>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full">
        {t.title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-white w-full">
        {t.sub1}
        <br />
        {t.sub2}
        <span className="font-['Avenir_LT_Pro:85_Heavy']">Acquafy Neo UP</span>
        {t.sub3}
      </p>
    </div>
  );
}

function ParticipateButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0 cursor-pointer">
      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap">
        {label}
      </span>
      <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
        <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
          <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
        <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
          <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
      </div>
    </button>
  );
}

export default function TransformaVidas() {
  const { lang } = useLang();
  const t  = T[lang];
  const ft = FORM_T[lang];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="
        max-w-[1400px] overflow-hidden relative rounded-[16px] w-full
        flex flex-col items-center justify-center gap-[40px] pt-[40px] px-[20px]
        lg:flex-row lg:flex-wrap lg:gap-[10px] lg:pt-0 lg:px-0 lg:items-center lg:justify-center
      ">

        <img
          alt=""
          className="hidden lg:block absolute inset-0 size-full object-cover pointer-events-none rounded-[16px]"
          src={imgBgDesktop}
        />

        <img
          alt=""
          className="lg:hidden absolute inset-0 size-full object-cover pointer-events-none rounded-[16px]"
          src={imgBgMobile}
        />

        <div className="lg:hidden relative flex flex-col gap-[10px] items-center justify-center min-w-[240px] shrink-0 w-full">
          <CampaignText centered t={t} />
          <ParticipateButton label={t.btn} onClick={() => setModalOpen(true)} />
        </div>

        <div className="hidden lg:flex flex-[1_0_0] flex-wrap gap-[10px] min-w-px pl-[20px] py-[20px]">
          <div className="relative flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[280px] py-[40px]">
            <div className="max-w-[370px] rounded-[16px] w-full">
              <CampaignText t={t} />
            </div>
            <ParticipateButton label={t.btn} onClick={() => setModalOpen(true)} />
          </div>
          <div className="flex flex-[1_0_0] items-center justify-center min-w-[240px]" style={{ height: 268 }}>
            <NeoUPProduct size={246} />
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center justify-center relative shrink-0" style={{ width: 290, height: 290, maxWidth: 292, maxHeight: 292 }}>
          <div className="flex-[1_0_0] min-h-px relative" style={{ aspectRatio: "1191 / 1456" }}>
            <img
              alt="Acquafy Neo UP"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgProduct}
            />
          </div>
        </div>

        <div
          className="hidden lg:flex flex-col items-center justify-end shrink-0 w-[400px]"
          style={{ height: 390, maxHeight: 390 }}
        >
          <div className="flex-[1_0_0] min-h-px relative w-full">
            <img
              alt="Família Acquafy"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgFamilyDesktop}
            />
          </div>
        </div>

        <div
          className="lg:hidden flex flex-col items-center justify-end min-w-[240px] shrink-0 w-full relative"
          style={{ maxHeight: 390 }}
        >
          <div className="relative shrink-0" style={{ height: 338.511, maxHeight: 338.511, width: 380, maxWidth: 380 }}>
            <img
              alt="Família Acquafy"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgFamilyMobile}
            />
          </div>
        </div>

      </div>

      {modalOpen && <CampaignModal ft={ft} onClose={() => setModalOpen(false)} />}
    </section>
  );
}
