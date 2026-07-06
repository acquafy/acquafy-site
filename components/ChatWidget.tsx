"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Plugin configuration ───────────────────────────────────────────────────────
// Set CHAT_AVAILABLE = true and implement openChatWindow() when connecting a
// chat API or plugin.
//
// Examples:
//   Intercom:  (window as any).Intercom?.("show")
//   Zendesk:   (window as any).zE?.("messenger", "open")
//   Tidio:     (window as any).tidioChatApi?.open()
//   JivoChat:  (window as any).jivo_api?.open()
export const CHAT_AVAILABLE = false;

function openChatWindow() {
  // plug your chat SDK call here
}
// ──────────────────────────────────────────────────────────────────────────────

const T: Record<Lang, {
  fabLabel: string;
  fabText: string;
  headerTitle: string;
  headerStatus: string;
  closeLabel: string;
  bodyMessage: string;
  sendMessage: string;
  close: string;
}> = {
  pt: {
    fabLabel: "Abrir chat",
    fabText: "Abrir chat",
    headerTitle: "Chat Acquafy",
    headerStatus: "Atendimento online",
    closeLabel: "Fechar chat",
    bodyMessage: "O chat ao vivo será ativado quando um plugin ou API de atendimento for configurado.",
    sendMessage: "Enviar mensagem",
    close: "Fechar",
  },
  en: {
    fabLabel: "Open Chat",
    fabText: "Open Chat",
    headerTitle: "Acquafy Chat",
    headerStatus: "Online Support",
    closeLabel: "Close chat",
    bodyMessage: "Live chat will be enabled once a support plugin or API is configured.",
    sendMessage: "Send a message",
    close: "Close",
  },
  "en-gb": {
    fabLabel: "Open Chat",
    fabText: "Open Chat",
    headerTitle: "Acquafy Chat",
    headerStatus: "Online Support",
    closeLabel: "Close chat",
    bodyMessage: "Live chat will be enabled once a support plugin or API is configured.",
    sendMessage: "Send a message",
    close: "Close",
  },
  es: {
    fabLabel: "Abrir Chat",
    fabText: "Abrir Chat",
    headerTitle: "Chat Acquafy",
    headerStatus: "Soporte en Línea",
    closeLabel: "Cerrar chat",
    bodyMessage: "El chat en vivo se activará cuando se configure un plugin o API de atención al cliente.",
    sendMessage: "Enviar mensaje",
    close: "Cerrar",
  },
  fr: {
    fabLabel: "Ouvrir le chat",
    fabText: "Ouvrir le chat",
    headerTitle: "Chat Acquafy",
    headerStatus: "Support en ligne",
    closeLabel: "Fermer le chat",
    bodyMessage: "Le chat en direct sera activé une fois qu'un plugin ou une API de support sera configuré.",
    sendMessage: "Envoyer un message",
    close: "Fermer",
  },
  de: {
    fabLabel: "Chat öffnen",
    fabText: "Chat öffnen",
    headerTitle: "Acquafy Chat",
    headerStatus: "Online-Support",
    closeLabel: "Chat schließen",
    bodyMessage: "Der Live-Chat wird aktiviert, sobald ein Support-Plugin oder eine API konfiguriert ist.",
    sendMessage: "Nachricht senden",
    close: "Schließen",
  },
  it: {
    fabLabel: "Apri Chat",
    fabText: "Apri Chat",
    headerTitle: "Chat Acquafy",
    headerStatus: "Supporto Online",
    closeLabel: "Chiudi chat",
    bodyMessage: "La chat in diretta sarà attivata una volta configurato un plugin o un'API di supporto.",
    sendMessage: "Invia un messaggio",
    close: "Chiudi",
  },
  zh: {
    fabLabel: "打开聊天",
    fabText: "打开聊天",
    headerTitle: "Acquafy 聊天",
    headerStatus: "在线支持",
    closeLabel: "关闭聊天",
    bodyMessage: "配置支持插件或 API 后，即可启用实时聊天功能。",
    sendMessage: "发送消息",
    close: "关闭",
  },
  ja: {
    fabLabel: "チャットを開く",
    fabText: "チャットを開く",
    headerTitle: "Acquafy チャット",
    headerStatus: "オンラインサポート",
    closeLabel: "チャットを閉じる",
    bodyMessage: "サポートプラグインまたは API が設定されると、ライブチャットが有効になります。",
    sendMessage: "メッセージを送る",
    close: "閉じる",
  },
  ko: {
    fabLabel: "채팅 열기",
    fabText: "채팅 열기",
    headerTitle: "Acquafy 채팅",
    headerStatus: "온라인 지원",
    closeLabel: "채팅 닫기",
    bodyMessage: "지원 플러그인 또는 API가 구성되면 실시간 채팅이 활성화됩니다.",
    sendMessage: "메시지 보내기",
    close: "닫기",
  },
  sv: {
    fabLabel: "Öppna chatt",
    fabText: "Öppna chatt",
    headerTitle: "Acquafy Chatt",
    headerStatus: "Online-support",
    closeLabel: "Stäng chatt",
    bodyMessage: "Livechatten aktiveras när ett supportplugin eller API har konfigurerats.",
    sendMessage: "Skicka ett meddelande",
    close: "Stäng",
  },
  fi: {
    fabLabel: "Avaa chat",
    fabText: "Avaa chat",
    headerTitle: "Acquafy Chat",
    headerStatus: "Online-tuki",
    closeLabel: "Sulje chat",
    bodyMessage: "Live-chat aktivoituu, kun tukiplugin tai API on määritetty.",
    sendMessage: "Lähetä viesti",
    close: "Sulje",
  },
  ru: {
    fabLabel: "Открыть чат",
    fabText: "Открыть чат",
    headerTitle: "Чат Acquafy",
    headerStatus: "Онлайн-поддержка",
    closeLabel: "Закрыть чат",
    bodyMessage: "Онлайн-чат будет доступен после настройки плагина или API поддержки.",
    sendMessage: "Отправить сообщение",
    close: "Закрыть",
  },
  ro: {
    fabLabel: "Deschide chat",
    fabText: "Deschide chat",
    headerTitle: "Chat Acquafy",
    headerStatus: "Suport online",
    closeLabel: "Inchide chat",
    bodyMessage: "Chatul live va fi activat odata ce un plugin sau API de suport este configurat.",
    sendMessage: "Trimite un mesaj",
    close: "Inchide",
  },
  he: {
    fabLabel: "פתח צ'אט",
    fabText: "פתח צ'אט",
    headerTitle: "צ'אט Acquafy",
    headerStatus: "תמיכה מקוונת",
    closeLabel: "סגור צ'אט",
    bodyMessage: "הצ'אט החי יופעל לאחר הגדרת תוסף או API של תמיכה.",
    sendMessage: "שלח הודעה",
    close: "סגור",
  },

  "pt-pt": {
    fabLabel: "Abrir chat",
    fabText: "Abrir chat",
    headerTitle: "Chat Acquafy",
    headerStatus: "Atendimento online",
    closeLabel: "Fechar chat",
    bodyMessage: "O chat ao vivo será ativado quando um plugin ou API de atendimento for configurado.",
    sendMessage: "Enviar mensagem",
    close: "Fechar",
  },
};

type ChatCtx = { isAvailable: boolean; openChat: () => void };

const ChatContext = createContext<ChatCtx>({
  isAvailable: CHAT_AVAILABLE,
  openChat: () => {},
});

export function useChatWidget() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [extraBottom, setExtraBottom] = useState(0);
  const [pastBanner, setPastBanner] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const pathname = usePathname();
  const { lang } = useLang();
  const t = T[lang];

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const update = () => {
      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      setExtraBottom(overlap > 0 ? overlap + 8 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const check = () => setPastBanner(window.scrollY > 150);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    const check = () => setIsWideScreen(window.innerWidth >= 1600);
    window.addEventListener("resize", check, { passive: true });
    check();
    return () => window.removeEventListener("resize", check);
  }, []);

  function openChat() {
    if (CHAT_AVAILABLE) {
      openChatWindow();
    } else {
      setIsOpen(true);
    }
  }

  return (
    <ChatContext.Provider value={{ isAvailable: CHAT_AVAILABLE, openChat }}>
      {children}

      {/* ── FAB — chat bubble ── */}
      {!isOpen && (pastBanner || pathname.startsWith('/buy') || isWideScreen) && (() => {
        const isBuy = pathname.startsWith('/buy/');
        return (
          <button
            onClick={openChat}
            aria-label={t.fabLabel}
            suppressHydrationWarning
            className="fixed z-[9998] flex items-center justify-center rounded-full shadow-[0_4px_20px_0_rgba(2,51,195,0.35)] hover:shadow-[0_6px_28px_0_rgba(2,51,195,0.45)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
            style={{
              backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)",
              bottom: isBuy ? 108 : 24 + extraBottom,
              ...(isBuy ? { left: 24 } : { right: 24 }),
              width: 46, height: 46,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-[20px] shrink-0" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        );
      })()}

      {isOpen && (
        <div
          className={`fixed inset-0 z-[9999] flex items-end p-[20px] ${pathname.startsWith('/buy/') ? "justify-start" : "justify-end"}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-[16px] shadow-[0_8px_40px_0_rgba(0,0,0,0.18)] w-full max-w-[360px] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-[20px] py-[16px] shrink-0"
              style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              <div className="flex flex-col gap-[2px]">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-white">
                  {t.headerTitle}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[rgba(255,255,255,0.7)]">
                  {t.headerStatus}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t.closeLabel}
                className="flex items-center justify-center size-[32px] rounded-full hover:bg-[rgba(255,255,255,0.15)] transition-colors text-white text-[18px] leading-none shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-[20px] items-center px-[24px] py-[32px] text-center">
              <div className="size-[56px] bg-[#f6f9fe] rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="size-[28px]" stroke="#0233c3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#555]">
                {t.bodyMessage}
              </p>
              <a
                href="/contact"
                className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] overflow-hidden px-[20px] py-[10px] text-white font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] hover:opacity-90 transition-opacity"
                style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
              >
                {t.sendMessage}
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[16px] text-[#999] hover:text-[#333] transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </ChatContext.Provider>
  );
}
