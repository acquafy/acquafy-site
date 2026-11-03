// components/ui/ActionTile.tsx
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconTile, type Tone } from "./KpiCard";

type ActionTileProps = {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  description: string;
  href: string;
  /** Saves the target instead of opening it (PDF downloads). */
  download?: boolean;
  /** Opens in a new tab (WhatsApp, maps…). */
  external?: boolean;
  className?: string;
};

/** Big quick-action card: icon, title, one line of help and an arrow. The whole card is the link. */
export function ActionTile({ icon, tone, title, description, href, download, external, className }: ActionTileProps) {
  const body = (
    <>
      <IconTile icon={icon} tone={tone} className="size-12" />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-snug font-bold text-ink">{title}</span>
        <span className="block text-[13px] leading-snug text-ink-soft">{description}</span>
      </span>
      <ArrowUpRight className="size-5 shrink-0 text-ink-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden="true" />
    </>
  );
  const cls = cn(
    "card group flex items-center gap-3.5 p-4 transition hover:-translate-y-0.5 hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    className,
  );

  if (download || external) {
    return (
      <a href={href} className={cls} {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
