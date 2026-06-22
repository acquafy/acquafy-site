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
  "pt-pt": {
    heading: "Não encontrou o que procurava?",
    subheading: "A nossa equipa está pronta para ajudar. Escolha o melhor canal de atendimento.",
    btnOpenTicket: "Abrir chamado",
    btnTalkSpecialist: "Fale com um especialista",
    chatTitle: "Chat online",
    chatDesc: "Fale agora com um especialista em tempo real.",
    chatAction: "Iniciar chat",
    chatBadgeAvailable: "Disponível",
    chatBadgeUnavailable: "Indisponível",
    emailTitle: "E-mail",
    emailDesc: "Envie a sua dúvida e responderemos brevemente.",
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
  fr: {
    heading: "Vous n'avez pas trouvé ce que vous cherchiez ?",
    subheading: "Notre équipe est prête à vous aider. Choisissez le meilleur canal d'assistance.",
    btnOpenTicket: "Ouvrir un ticket",
    btnTalkSpecialist: "Parler à un expert",
    chatTitle: "Chat en direct",
    chatDesc: "Discutez maintenant avec un expert en temps réel.",
    chatAction: "Démarrer le chat",
    chatBadgeAvailable: "Disponible",
    chatBadgeUnavailable: "Indisponible",
    emailTitle: "E-mail",
    emailDesc: "Envoyez votre question et nous vous répondrons rapidement.",
    hoursTitle: "Heures d'assistance",
    hoursDesc: "Lundi au Vendredi",
    hoursAction: "8h à 18h (EST)",
  },
  de: {
    heading: "Nicht gefunden, was Sie gesucht haben?",
    subheading: "Unser Team ist bereit zu helfen. Wählen Sie den besten Support-Kanal.",
    btnOpenTicket: "Ticket erstellen",
    btnTalkSpecialist: "Mit einem Experten sprechen",
    chatTitle: "Live-Chat",
    chatDesc: "Sprechen Sie jetzt in Echtzeit mit einem Experten.",
    chatAction: "Chat starten",
    chatBadgeAvailable: "Verfügbar",
    chatBadgeUnavailable: "Nicht verfügbar",
    emailTitle: "E-Mail",
    emailDesc: "Senden Sie Ihre Anfrage und wir antworten Ihnen in Kürze.",
    hoursTitle: "Support-Zeiten",
    hoursDesc: "Montag bis Freitag",
    hoursAction: "8–18 Uhr (EST)",
  },
  it: {
    heading: "Non hai trovato quello che cercavi?",
    subheading: "Il nostro team è pronto ad aiutarti. Scegli il miglior canale di assistenza.",
    btnOpenTicket: "Apri un ticket",
    btnTalkSpecialist: "Parla con uno specialista",
    chatTitle: "Chat dal vivo",
    chatDesc: "Parla ora con uno specialista in tempo reale.",
    chatAction: "Avvia la chat",
    chatBadgeAvailable: "Disponibile",
    chatBadgeUnavailable: "Non disponibile",
    emailTitle: "E-mail",
    emailDesc: "Invia la tua domanda e ti risponderemo presto.",
    hoursTitle: "Orari di assistenza",
    hoursDesc: "Dal lunedì al venerdì",
    hoursAction: "8:00–18:00 (EST)",
  },
  zh: {
    heading: "没有找到您需要的内容？",
    subheading: "我们的团队随时准备提供帮助。请选择最佳支持渠道。",
    btnOpenTicket: "提交工单",
    btnTalkSpecialist: "联系专家",
    chatTitle: "在线客服",
    chatDesc: "立即与专家实时交流。",
    chatAction: "开始聊天",
    chatBadgeAvailable: "在线",
    chatBadgeUnavailable: "不在线",
    emailTitle: "电子邮件",
    emailDesc: "发送您的问题，我们将尽快回复。",
    hoursTitle: "支持时间",
    hoursDesc: "周一至周五",
    hoursAction: "上午 8 点至下午 6 点（EST）",
  },
  ja: {
    heading: "お探しのものが見つかりませんでしたか？",
    subheading: "私たちのチームがお手伝いします。最適なサポートチャンネルをお選びください。",
    btnOpenTicket: "チケットを開く",
    btnTalkSpecialist: "専門家に相談する",
    chatTitle: "ライブチャット",
    chatDesc: "今すぐ専門家とリアルタイムでお話しください。",
    chatAction: "チャットを開始",
    chatBadgeAvailable: "対応中",
    chatBadgeUnavailable: "対応不可",
    emailTitle: "メール",
    emailDesc: "ご質問をお送りください。すぐにご返信いたします。",
    hoursTitle: "サポート時間",
    hoursDesc: "月曜日〜金曜日",
    hoursAction: "午前 8 時〜午後 6 時（EST）",
  },
  ko: {
    heading: "찾으시는 것을 찾지 못하셨나요?",
    subheading: "저희 팀이 도와드릴 준비가 되어 있습니다. 최적의 지원 채널을 선택하세요.",
    btnOpenTicket: "티켓 열기",
    btnTalkSpecialist: "전문가와 상담",
    chatTitle: "라이브 채팅",
    chatDesc: "지금 바로 전문가와 실시간으로 대화하세요.",
    chatAction: "채팅 시작",
    chatBadgeAvailable: "응대 가능",
    chatBadgeUnavailable: "응대 불가",
    emailTitle: "이메일",
    emailDesc: "질문을 보내주시면 곧 답변해 드리겠습니다.",
    hoursTitle: "지원 시간",
    hoursDesc: "월요일~금요일",
    hoursAction: "오전 8시~오후 6시 (EST)",
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
