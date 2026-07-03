"use client";
import FigmaIcon from "./FigmaIcon";
import { useChatWidget } from "./ChatWidget";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgChatIcon      = "/figma-assets/icon-chat-icon.svg";
const imgMailIcon      = "/figma-assets/icon-mail-icon.svg";
const imgWhatsappIcon  = "/figma-assets/icon-whatsapp-icon.svg";
const imgTimeIcon      = "/figma-assets/icon-time-icon.svg";

const T: Record<Lang, {
  heading: string;
  subtitle: string;
  chatBadge: string;
  chatDesc: string;
  chatButton: string;
  emailDesc: string;
  whatsappDesc: string;
  hoursTitle: string;
  hoursDesc: string;
}> = {
  pt: {
    heading: "Fale com nossa equipe",
    subtitle: "Escolha o canal de atendimento ideal para você.",
    chatBadge: "Disponível",
    chatDesc: "Fale agora com um especialista em tempo real.",
    chatButton: "Iniciar chat",
    emailDesc: "Envie sua dúvida ou solicitação que responderemos em breve.",
    whatsappDesc: "Atendimento rápido pelo WhatsApp.",
    hoursTitle: "Horário de atendimento",
    hoursDesc: "Segunda a Sexta",
  },
  en: {
    heading: "Talk to Our Team",
    subtitle: "Choose the ideal support channel for you.",
    chatBadge: "Available",
    chatDesc: "Talk now with a specialist in real time.",
    chatButton: "Start Chat",
    emailDesc: "Send your question or request and we will reply shortly.",
    whatsappDesc: "Quick support via WhatsApp.",
    hoursTitle: "Support Hours",
    hoursDesc: "Monday to Friday",
  },
  "en-gb": {
    heading: "Talk to Our Team",
    subtitle: "Choose the ideal support channel for you.",
    chatBadge: "Available",
    chatDesc: "Talk now with a specialist in real time.",
    chatButton: "Start Chat",
    emailDesc: "Send your question or request and we will reply shortly.",
    whatsappDesc: "Quick support via WhatsApp.",
    hoursTitle: "Support Hours",
    hoursDesc: "Monday to Friday",
  },
  es: {
    heading: "Habla con Nuestro Equipo",
    subtitle: "Elige el canal de atención ideal para ti.",
    chatBadge: "Disponible",
    chatDesc: "Habla ahora con un especialista en tiempo real.",
    chatButton: "Iniciar Chat",
    emailDesc: "Envía tu consulta o solicitud y responderemos pronto.",
    whatsappDesc: "Atención rápida por WhatsApp.",
    hoursTitle: "Horario de Atención",
    hoursDesc: "Lunes a Viernes",
  },
  fr: {
    heading: "Parlez à Notre Équipe",
    subtitle: "Choisissez le canal d'assistance qui vous convient.",
    chatBadge: "Disponible",
    chatDesc: "Parlez maintenant avec un spécialiste en temps réel.",
    chatButton: "Démarrer le chat",
    emailDesc: "Envoyez votre question ou demande et nous vous répondrons rapidement.",
    whatsappDesc: "Assistance rapide via WhatsApp.",
    hoursTitle: "Heures d'assistance",
    hoursDesc: "Lundi au vendredi",
  },
  de: {
    heading: "Sprechen Sie mit Unserem Team",
    subtitle: "Wählen Sie den idealen Support-Kanal für Sie.",
    chatBadge: "Verfügbar",
    chatDesc: "Sprechen Sie jetzt mit einem Spezialisten in Echtzeit.",
    chatButton: "Chat starten",
    emailDesc: "Senden Sie Ihre Frage oder Anfrage und wir antworten Ihnen bald.",
    whatsappDesc: "Schneller Support via WhatsApp.",
    hoursTitle: "Support-Zeiten",
    hoursDesc: "Montag bis Freitag",
  },
  it: {
    heading: "Parla con il Nostro Team",
    subtitle: "Scegli il canale di assistenza ideale per te.",
    chatBadge: "Disponibile",
    chatDesc: "Parla ora con uno specialista in tempo reale.",
    chatButton: "Avvia Chat",
    emailDesc: "Invia la tua domanda o richiesta e ti risponderemo presto.",
    whatsappDesc: "Assistenza rapida via WhatsApp.",
    hoursTitle: "Orari di Assistenza",
    hoursDesc: "Dal lunedì al venerdì",
  },
  zh: {
    heading: "联系我们的团队",
    subtitle: "选择最适合您的支持渠道。",
    chatBadge: "在线",
    chatDesc: "立即与专家实时交流。",
    chatButton: "开始聊天",
    emailDesc: "发送您的问题或请求，我们将尽快回复。",
    whatsappDesc: "通过 WhatsApp 快速获得支持。",
    hoursTitle: "服务时间",
    hoursDesc: "周一至周五",
  },
  ja: {
    heading: "チームにお問い合わせ",
    subtitle: "ご希望のサポートチャネルをお選びください。",
    chatBadge: "対応中",
    chatDesc: "今すぐ専門家とリアルタイムで話しましょう。",
    chatButton: "チャットを開始",
    emailDesc: "ご質問やリクエストをお送りください。すぐにご返答いたします。",
    whatsappDesc: "WhatsApp で迅速なサポートを提供します。",
    hoursTitle: "サポート時間",
    hoursDesc: "月曜日〜金曜日",
  },
  ko: {
    heading: "우리 팀에 문의하기",
    subtitle: "가장 적합한 지원 채널을 선택하세요.",
    chatBadge: "온라인",
    chatDesc: "지금 바로 전문가와 실시간으로 대화하세요.",
    chatButton: "채팅 시작",
    emailDesc: "질문이나 요청을 보내주시면 곧 답변드리겠습니다.",
    whatsappDesc: "WhatsApp으로 빠른 지원을 받으세요.",
    hoursTitle: "지원 시간",
    hoursDesc: "월요일~금요일",
  },
  sv: {
    heading: "Prata med vårt team",
    subtitle: "Välj den ideala supportkanalen för dig.",
    chatBadge: "Tillgänglig",
    chatDesc: "Prata nu med en specialist i realtid.",
    chatButton: "Starta chatt",
    emailDesc: "Skicka din fråga eller förfrågan så svarar vi snart.",
    whatsappDesc: "Snabb support via WhatsApp.",
    hoursTitle: "Supporttider",
    hoursDesc: "Måndag till fredag",
  },
  fi: {
    heading: "Ota yhteyttä tiimiimme",
    subtitle: "Valitse sinulle sopiva tukikanava.",
    chatBadge: "Saatavilla",
    chatDesc: "Puhu nyt asiantuntijan kanssa reaaliajassa.",
    chatButton: "Aloita chat",
    emailDesc: "Lähetä kysymyksesi tai pyyntösi ja vastaamme pian.",
    whatsappDesc: "Nopea tuki WhatsAppin kautta.",
    hoursTitle: "Tukiajat",
    hoursDesc: "Maanantaista perjantaihin",
  },
  ru: {
    heading: "Свяжитесь с нашей командой",
    subtitle: "Выберите удобный канал поддержки.",
    chatBadge: "Доступен",
    chatDesc: "Поговорите с специалистом в режиме реального времени.",
    chatButton: "Начать чат",
    emailDesc: "Отправьте ваш вопрос или запрос, и мы ответим вам в ближайшее время.",
    whatsappDesc: "Быстрая поддержка через WhatsApp.",
    hoursTitle: "Часы работы поддержки",
    hoursDesc: "С понедельника по пятницу",
  },
  ro: {
    heading: "Vorbiti cu echipa noastra",
    subtitle: "Alege canalul de asistenta ideal pentru tine.",
    chatBadge: "Disponibil",
    chatDesc: "Vorbeste acum cu un specialist in timp real.",
    chatButton: "Incepe chat",
    emailDesc: "Trimite intrebarea sau solicitarea ta si iti vom raspunde curand.",
    whatsappDesc: "Asistenta rapida prin WhatsApp.",
    hoursTitle: "Program de asistenta",
    hoursDesc: "Luni pana vineri",
  },
  he: {
    heading: "daber im hatzevet shelanu",
    subtitle: "bechar et erets ha-tmicha hamutzemet bishvilcha.",
    chatBadge: "zamin",
    chatDesc: "daber achshav im mutche be-zman amiti.",
    chatButton: "hitchel sichah",
    emailDesc: "shloach et hasheilah o habakashah shelcha venashiv bkarov.",
    whatsappDesc: "tmicha mehirah deyret WhatsApp.",
    hoursTitle: "shaot tmicha",
    hoursDesc: "yom sheni ad yom shishi",
  },

  "pt-pt": {
    heading: "Fale com a nossa equipa",
    subtitle: "Escolha o canal de atendimento ideal para si.",
    chatBadge: "Disponível",
    chatDesc: "Fale agora com um especialista em tempo real.",
    chatButton: "Iniciar chat",
    emailDesc: "Envie a sua dúvida ou solicitação e responderemos brevemente.",
    whatsappDesc: "Atendimento rápido pelo WhatsApp.",
    hoursTitle: "Horário de atendimento",
    hoursDesc: "Segunda a Sexta",
  },
};

export default function FaleComEquipeSuporte() {
  const { openChat } = useChatWidget();
  const { lang } = useLang();
  const t = T[lang];
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Contact cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">

          {/* Chat online */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] p-[20px] rounded-[16px] win-1024:items-start">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgChatIcon} size={30} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <div className="flex gap-[10px] items-center w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1">
                    Chat online
                  </p>
                  <div className="bg-[#e1f3e7] flex flex-col items-center justify-center px-[10px] py-[6px] rounded-full shrink-0">
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#36ae5c] whitespace-nowrap">
                      {t.chatBadge}
                    </span>
                  </div>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {t.chatDesc}
                </p>
              </div>
            </div>
            <button onClick={openChat} className="mt-auto bg-white border border-[#0233c3] hover:bg-[#0233c3] hover:text-white transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px]">
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] hover:text-white text-center">
                {t.chatButton}
              </span>
            </button>
          </div>

          {/* E-mail */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] p-[20px] rounded-[16px] win-1024:items-start">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgMailIcon} size={30} aspectW={30} aspectH={24} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  E-mail
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {t.emailDesc}
                </p>
              </div>
            </div>
            <a
              href="mailto:help@acquafy.com"
              className="mt-auto bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px]"
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center">
                help@acquafy.com
              </span>
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] p-[20px] rounded-[16px] win-1024:items-start">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgWhatsappIcon} size={30} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  WhatsApp
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {t.whatsappDesc}
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/13218887963"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-white border border-[#0233c3] hover:bg-[#0233c3] group transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px]"
            >
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white transition-colors text-center">
                +1 (321) 888-7963
              </span>
            </a>
          </div>

          {/* Horário de atendimento */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] p-[20px] rounded-[16px] win-1024:items-start">
            <div className="flex gap-[20px] items-center w-full">
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                <FigmaIcon src={imgTimeIcon} size={30} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                  {t.hoursTitle}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">
                  {t.hoursDesc}
                </p>
              </div>
            </div>
            <p className="mt-auto font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">
              8h às 18h (EST)
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

