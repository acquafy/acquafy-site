"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

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

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-end p-[20px]"
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
                  Chat Acquafy
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[rgba(255,255,255,0.7)]">
                  Atendimento online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fechar chat"
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
                O chat ao vivo será ativado quando um plugin ou API de atendimento for configurado.
              </p>
              <a
                href="/contato"
                className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] overflow-hidden px-[20px] py-[10px] text-white font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] hover:opacity-90 transition-opacity"
                style={{ backgroundImage: "linear-gradient(112deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
              >
                Enviar mensagem
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[16px] text-[#999] hover:text-[#333] transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </ChatContext.Provider>
  );
}
