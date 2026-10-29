// components/base/BaseProductionQueue.tsx
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Platform } from "@/config/base-registry";
import { nextInQueue, PLATFORM_LABEL, type ResolvedScreen } from "@/lib/base/screens";

/** One card per platform: how many screens are ready and which one is next in the production order. */
export function BaseProductionQueue({ screens, counts }: { screens: ResolvedScreen[]; counts: Record<Platform, { ready: number; total: number }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {(Object.keys(counts) as Platform[]).map((p) => {
        const next = nextInQueue(screens, p);
        const { ready, total } = counts[p];
        return (
          <Card key={p} title={PLATFORM_LABEL[p]} action={<Badge tone={next ? "brand" : "ok"}>{`${ready} / ${total}`}</Badge>}>
            <ProgressBar value={total ? (ready / total) * 100 : 0} label={`${PLATFORM_LABEL[p]}: ${ready} de ${total} telas prontas`} />
            <p className="mt-3 text-[13px] font-bold tracking-wide text-ink-mute uppercase">Próxima da fila</p>
            {next ? (
              <a href={`#${next.id}`} className="mt-1 flex items-baseline gap-2 text-[15px] font-semibold text-ink hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                <span className="tabular font-extrabold text-brand">{String(next.order).padStart(2, "0")}</span>
                {next.title}
              </a>
            ) : (
              <p className="mt-1 flex items-center gap-1.5 text-[15px] font-semibold text-ok">
                <CircleCheck className="size-4" aria-hidden="true" />
                Todas prontas
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
