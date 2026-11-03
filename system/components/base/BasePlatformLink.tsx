// components/base/BasePlatformLink.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { PlatformState } from "@/lib/base/screens";

/** One platform cell of a screen: a link when the screen exists, a "Pendente" badge when it is planned, a dash otherwise. */
export function BasePlatformLink({ state, label }: { state: PlatformState; label: string }) {
  if (state.state === "none")
    return (
      <span aria-label={`${label}: não se aplica`} className="text-ink-mute">
        —
      </span>
    );
  if (state.state === "pending")
    return (
      <Badge tone="warn" dot>
        Pendente
      </Badge>
    );
  return (
    <Link href={state.href!} className="inline-flex items-center gap-1 rounded-md text-[14px] font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
      Abrir
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
