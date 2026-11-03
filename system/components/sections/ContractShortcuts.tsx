// components/sections/ContractShortcuts.tsx
import Link from "next/link";
import { ChevronRight, FileText, ReceiptText, UserPlus, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile, type Tone } from "@/components/ui/KpiCard";

const SHORTCUTS: { href: string; icon: LucideIcon; tone: Tone; title: string; description: string }[] = [
  { href: "/extrato", icon: ReceiptText, tone: "green", title: "Extrato Financeiro", description: "Repasses recebidos e previstos" },
  { href: "/solicitar", icon: UserPlus, tone: "violet", title: "Solicitar mais purificadores", description: "Amplie seu investimento" },
  { href: "/documentos", icon: FileText, tone: "blue", title: "Documentos", description: "Contratos e comprovantes" },
];

export function ContractShortcuts() {
  return (
    <Card title="Atalhos">
      <ul className="flex flex-col gap-2">
        {SHORTCUTS.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="flex items-center gap-3 rounded-xl border border-line/80 p-3 transition hover:border-brand/40 hover:bg-brand-soft/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <IconTile icon={s.icon} tone={s.tone} className="size-11" />
              <span className="min-w-0 flex-1 leading-snug">
                <span className="block text-[14.5px] font-bold text-ink">{s.title}</span>
                <span className="block text-[13px] text-ink-soft">{s.description}</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-brand" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
