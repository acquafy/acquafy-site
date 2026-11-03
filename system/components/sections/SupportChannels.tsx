// components/sections/SupportChannels.tsx
"use client";

import { useState, type ReactNode } from "react";
import { Mail, MessageCircle, MessagesSquare, Phone } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button, buttonClass } from "@/components/ui/Button";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import type { LucideIcon } from "lucide-react";
import { SUPPORT_EMAIL, SUPPORT_HOURS, SUPPORT_PHONE, SUPPORT_WHATSAPP } from "@/config/support-page";
import { SupportChat, clockTime } from "./SupportChat";

function ChannelCard({ icon, tone, title, detail, hours, status, action }: { icon: LucideIcon; tone: Tone; title: string; detail: string; hours: string; status?: ReactNode; action: ReactNode }) {
  return (
    <article className="card flex min-w-0 flex-col gap-3 p-5">
      <div className="flex items-center gap-3.5">
        <IconTile icon={icon} tone={tone} className="size-12" />
        <div className="min-w-0">
          <h3 className="text-[17px] leading-tight font-extrabold text-ink">{title}</h3>
          {status}
        </div>
      </div>
      <p className="text-[14.5px] font-medium break-words text-ink">{detail}</p>
      <p className="text-[13.5px] leading-snug text-ink-soft">{hours}</p>
      <div className="mt-auto pt-1">{action}</div>
    </article>
  );
}

export function SupportChannels() {
  const toast = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState("");

  const openChat = () => {
    setOpenedAt((t) => t || clockTime());
    setChatOpen(true);
  };

  return (
    <section aria-label="Canais de atendimento" className="grid gap-4 @[640px]:grid-cols-2 @[880px]:grid-cols-4">
      <ChannelCard
        icon={MessagesSquare}
        tone="blue"
        title="Chat ao vivo"
        status={
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ok">
            <span aria-hidden="true" className="size-2 rounded-full bg-ok" />
            Online agora
          </span>
        }
        detail="Fale em tempo real com a nossa equipe."
        hours={SUPPORT_HOURS.chat}
        action={
          <Button className="w-full" onClick={openChat}>
            Iniciar chat
          </Button>
        }
      />
      <ChannelCard
        icon={Mail}
        tone="violet"
        title="E-mail"
        detail={SUPPORT_EMAIL}
        hours={SUPPORT_HOURS.email}
        action={
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            onClick={() => toast({ title: "Abrindo seu e-mail", description: `Nova mensagem para ${SUPPORT_EMAIL}.`, tone: "info" })}
            className={buttonClass({ variant: "outline", className: "w-full" })}
          >
            Enviar e-mail
          </a>
        }
      />
      <ChannelCard
        icon={MessageCircle}
        tone="green"
        title="WhatsApp"
        detail="+1 (407) 555-0123"
        hours={SUPPORT_HOURS.whatsapp}
        action={
          <a
            href={SUPPORT_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => toast({ title: "Abrindo o WhatsApp", description: "A conversa abre em uma nova aba.", tone: "info" })}
            className={buttonClass({ variant: "outline", className: "w-full" })}
          >
            Abrir WhatsApp
          </a>
        }
      />
      <ChannelCard
        icon={Phone}
        tone="orange"
        title="Telefone"
        detail={SUPPORT_PHONE.label}
        hours={SUPPORT_HOURS.phone}
        action={
          <a
            href={SUPPORT_PHONE.href}
            onClick={() => toast({ title: "Iniciando a chamada", description: SUPPORT_PHONE.label, tone: "info" })}
            className={buttonClass({ variant: "outline", className: "w-full" })}
          >
            Ligar agora
          </a>
        }
      />

      <SupportChat open={chatOpen} onClose={() => setChatOpen(false)} openedAt={openedAt} />
    </section>
  );
}
