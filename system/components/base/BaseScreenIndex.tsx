// components/base/BaseScreenIndex.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ResolvedScreen } from "@/lib/base/screens";
import { FORMAT_HINT, FORMAT_LABEL, SCREEN_FORMATS, type ScreenFormat } from "@/lib/base/formats";
import { DEVICE_PARAM } from "@/lib/mobile/devices";

/** Where a screen opens in each format. Tablet e Foldable and Celulares open the stage with iOS and Android side by side. */
function hrefFor(format: ScreenFormat, s: ResolvedScreen): string | null {
  if (format === "desktop") return s.desktop;
  if (!s.mobile) return null;
  return format === "tablet" ? `/m/duo/${s.mobile}?${DEVICE_PARAM}=tablet` : `/m/duo/${s.mobile}`;
}

/** Three columns (Desktop, Tablet e Foldable, Celulares) listing every screen of the format as a link. iOS and Android are told apart only in Componentes and Organismos. */
export function BaseScreenIndex({ screens }: { screens: ResolvedScreen[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {SCREEN_FORMATS.map((format) => {
        const rows = screens.flatMap((s) => {
          const href = hrefFor(format, s);
          return href ? [{ s, href }] : [];
        });
        return (
          <Card key={format} title={FORMAT_LABEL[format]} action={<Badge tone="brand">{rows.length} telas</Badge>}>
            <p className="-mt-1 mb-2 text-[13px] text-ink-soft">{FORMAT_HINT[format]}</p>
            <ul className="divide-y divide-line">
              {rows.map(({ s, href }) => (
                <li key={s.id}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-2 py-2.5 text-[15px] font-semibold text-ink hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <span className="truncate">{s.title}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-ink-mute group-hover:text-brand" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
