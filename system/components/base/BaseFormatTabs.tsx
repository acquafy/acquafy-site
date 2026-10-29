// components/base/BaseFormatTabs.tsx
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FORMAT_HINT, FORMAT_LABEL, SCREEN_FORMATS, type ScreenFormat } from "@/lib/base/formats";

/** Format selector of /base/telas: a compact segmented control (one format at a time keeps the page short; the choice lives in the URL, `?f=`). */
export function BaseFormatTabs({ format }: { format: ScreenFormat }) {
  return (
    <nav aria-label="Formato das telas" className="flex w-fit flex-wrap gap-1 rounded-xl bg-brand-soft/60 p-1">
      {SCREEN_FORMATS.map((f) => (
        <Link
          key={f}
          href={`/base/telas?f=${f}`}
          title={FORMAT_HINT[f]}
          aria-current={format === f ? "page" : undefined}
          className={cn(
            "rounded-lg px-4 py-2 text-[14.5px] font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-brand",
            format === f ? "bg-card text-brand" : "text-ink-soft hover:text-brand",
          )}
        >
          {FORMAT_LABEL[f]}
        </Link>
      ))}
    </nav>
  );
}
