// components/mobile/sections/MobileSupportChat.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Clock3, Send } from "lucide-react";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { CHAT_AGENT, CHAT_FALLBACK, CHAT_REPLIES, CHAT_WELCOME, SUPPORT_HOURS } from "@/config/support-page";
import { normalizeText } from "@/lib/portal/text-search";

type ChatMessage = { id: number; from: "me" | "them"; text: string; time: string };

const REPLY_DELAY_MS = 1000;

/** "14:05" in the viewer's clock. Only called from event handlers, never during render. */
function clockTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function replyFor(text: string): string {
  const t = normalizeText(text);
  return CHAT_REPLIES.find((r) => r.keywords.some((k) => t.includes(k)))?.reply ?? CHAT_FALLBACK;
}

/** Simulated live chat: welcome from the attendant, the investor writes, an automatic reply comes about a second later. */
export function MobileSupportChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [openedAt, setOpenedAt] = useState("");
  const log = useRef<HTMLUListElement>(null);
  const nextId = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages.length, typing, open]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setOpenedAt((t) => t || clockTime());
    setMessages((m) => [...m, { id: nextId.current++, from: "me", text, time: clockTime() }]);
    setDraft("");
    setTyping(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "them", text: replyFor(text), time: clockTime() }]);
      setTyping(false);
    }, REPLY_DELAY_MS);
  };

  return (
    <MobileSheet
      open={open}
      onClose={onClose}
      size="full"
      title="Chat ao vivo"
      description="Converse com a equipe Acquafy."
      footer={
        <form onSubmit={send} className="flex w-full items-center gap-2">
          <label htmlFor="m-chat-input" className="sr-only">
            Mensagem
          </label>
          <input
            id="m-chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Digite sua mensagem…"
            autoComplete="off"
            maxLength={500}
            enterKeyHint="send"
            className="h-12 min-w-0 flex-1 rounded-full bg-card px-4 text-[16px] text-ink placeholder:text-ink-mute/80 focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/30"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Enviar mensagem"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-gradient text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-40"
          >
            <Send className="size-5" aria-hidden="true" />
          </button>
        </form>
      }
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-[12px] bg-canvas px-3.5 py-2.5 text-[13px] text-ink-soft">
        <span className="inline-flex items-center gap-2 font-semibold text-ok">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-ok" />
          Online agora
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-4" aria-hidden="true" />
          {SUPPORT_HOURS.chat}
        </span>
      </div>
      <ul ref={log} role="log" aria-label="Conversa" aria-live="polite" className="grid min-h-40 content-start gap-3">
        <ChatBubble from="them" author={CHAT_AGENT.name} time="agora">
          {CHAT_WELCOME}
        </ChatBubble>
        {messages.map((m) => (
          <ChatBubble key={m.id} from={m.from} author={m.from === "me" ? "Você" : CHAT_AGENT.name} time={m.time}>
            {m.text}
          </ChatBubble>
        ))}
        {typing && (
          <li className="px-1 text-[13px] text-ink-mute italic" aria-label={`${CHAT_AGENT.firstName} está digitando`}>
            {CHAT_AGENT.firstName} está digitando…
          </li>
        )}
      </ul>
      <span className="sr-only">{openedAt}</span>
    </MobileSheet>
  );
}
