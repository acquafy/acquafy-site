// components/ui/Badge.tsx
import { CircleCheck, CircleDollarSign, Clock3, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "ok" | "warn" | "brand" | "violet" | "danger" | "neutral";

const TONES: Record<BadgeTone, string> = {
  ok: "bg-ok-soft text-ok",
  warn: "bg-warn-soft text-warn",
  brand: "bg-brand-soft text-brand",
  violet: "bg-violet-soft text-violet",
  danger: "bg-danger-soft text-danger",
  neutral: "bg-canvas text-ink-soft",
};

/** Small pill. Colour is never the only signal: always carries text (and optionally an icon). */
export function Badge({ tone = "neutral", icon: Icon, dot = false, children, className }: { tone?: BadgeTone; icon?: LucideIcon; dot?: boolean; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold whitespace-nowrap", TONES[tone], className)}>
      {Icon && <Icon className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />}
      {dot && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Domain statuses used across tables (payouts, purifiers, tickets, documents). */
export type StatusKind = "received" | "pending" | "next" | "scheduled" | "operation" | "available" | "maintenance";

const STATUS: Record<StatusKind, { tone: BadgeTone; label: string; icon?: LucideIcon; dot?: boolean }> = {
  received: { tone: "ok", label: "Recebido", icon: CircleCheck },
  pending: { tone: "warn", label: "Pendente", dot: true },
  next: { tone: "violet", label: "Em breve", icon: Clock3 },
  scheduled: { tone: "brand", label: "Programado", icon: CircleDollarSign },
  operation: { tone: "ok", label: "Em operação", dot: true },
  available: { tone: "brand", label: "Disponível", dot: true },
  maintenance: { tone: "danger", label: "Em manutenção", dot: true },
};

export function StatusBadge({ kind }: { kind: StatusKind }) {
  const s = STATUS[kind];
  return (
    <Badge tone={s.tone} icon={s.icon} dot={s.dot}>
      {s.label}
    </Badge>
  );
}
