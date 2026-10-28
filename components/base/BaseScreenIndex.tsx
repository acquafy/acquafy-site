// components/base/BaseScreenIndex.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PLATFORM_LABEL, type ResolvedScreen } from "@/lib/base/screens";
import type { Platform } from "@/config/base-registry";

/** Three columns (Desktop, iOS, Android) listing every screen as a link, or a "Pendente" badge while it is not built. */
export function BaseScreenIndex({ screens }: { screens: ResolvedScreen[] }) {
  const platforms: Platform[] = ["desktop", "ios", "android"];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {platforms.map((platform) => {
        const rows = screens.flatMap((s) => {
          const p = s.platforms.find((x) => x.platform === platform);
          return p && p.state !== "none" ? [{ s, p }] : [];
        });
        return (
          <Card
            key={platform}
            title={PLATFORM_LABEL[platform]}
            action={
              <Badge tone="brand">
                {rows.filter((r) => r.p.state === "ready").length} / {rows.length}
              </Badge>
            }
          >
            <ul className="divide-y divide-line">
              {rows.map(({ s, p }) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-2.5">
                  {p.state === "ready" ? (
                    <Link
                      href={p.href!}
                      className="group flex min-w-0 flex-1 items-center justify-between gap-2 text-[15px] font-semibold text-ink hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      <span className="truncate">{s.title}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink-mute group-hover:text-brand" aria-hidden="true" />
                    </Link>
                  ) : (
                    <>
                      <span className="truncate text-[15px] text-ink-soft">{s.title}</span>
                      <Badge tone="warn" dot>
                        Pendente
                      </Badge>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
