// components/live/StatusPill.tsx
import type { LucideIcon } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";

/** Status text and tone for every record state the live screens show (orders, leases, payouts, units, tickets, enrollments). */
const STATUS: Record<string, { tone: BadgeTone; label: string; dot?: boolean; icon?: LucideIcon }> = {
  // orders
  requested: { tone: "warn", label: "Aguardando proposta", dot: true },
  quoted: { tone: "violet", label: "Proposta disponível", dot: true },
  accepted: { tone: "brand", label: "Aceito · aguardando pagamento", dot: true },
  paid: { tone: "ok", label: "Pagamento confirmado", dot: true },
  processing: { tone: "brand", label: "Em preparação", dot: true },
  shipped: { tone: "brand", label: "Enviado", dot: true },
  installed: { tone: "ok", label: "Instalado", dot: true },
  completed: { tone: "ok", label: "Concluído", dot: true },
  cancelled: { tone: "neutral", label: "Cancelado", dot: true },
  review: { tone: "warn", label: "Pagamento em análise", dot: true },
  // leases
  offered: { tone: "violet", label: "Locação oferecida", dot: true },
  // shared records
  active: { tone: "ok", label: "Ativo", dot: true },
  suspended: { tone: "danger", label: "Suspenso", dot: true },
  draft: { tone: "neutral", label: "Minuta", dot: true },
  ended: { tone: "neutral", label: "Encerrado", dot: true },
  available: { tone: "brand", label: "Disponível", dot: true },
  operation: { tone: "ok", label: "Em operação", dot: true },
  maintenance: { tone: "danger", label: "Em manutenção", dot: true },
  retired: { tone: "neutral", label: "Retirado", dot: true },
  scheduled: { tone: "brand", label: "Programado", dot: true },
  settled: { tone: "ok", label: "Liquidado", dot: true },
  open: { tone: "warn", label: "Aberto", dot: true },
  in_progress: { tone: "brand", label: "Em atendimento", dot: true },
  resolved: { tone: "ok", label: "Resolvido", dot: true },
};

export function StatusPill({ status, label }: { status: string; label?: string }) {
  const s = STATUS[status] ?? { tone: "neutral" as const, label: status, dot: true };
  return (
    <Badge tone={s.tone} icon={s.icon} dot={s.dot}>
      {label ?? s.label}
    </Badge>
  );
}

export const statusLabel = (status: string) => STATUS[status]?.label ?? status;
