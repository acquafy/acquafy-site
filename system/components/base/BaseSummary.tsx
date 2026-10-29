// components/base/BaseSummary.tsx
import Link from "next/link";
import { Boxes, Layers, MonitorSmartphone, Smartphone, Tablet } from "lucide-react";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PLATFORM_LABEL } from "@/lib/base/screens";
import type { Platform } from "@/config/base-registry";
import type { LucideIcon } from "lucide-react";

type Counts = Record<Platform, { ready: number; total: number }>;

const PLATFORM_META: Record<Platform, { icon: LucideIcon; tone: Tone; href: string }> = {
  desktop: { icon: MonitorSmartphone, tone: "blue", href: "/base/telas" },
  ios: { icon: Smartphone, tone: "violet", href: "/base/telas" },
  android: { icon: Tablet, tone: "green", href: "/base/telas" },
};

function Tile({ href, icon, tone, title, value, caption, progress }: { href: string; icon: LucideIcon; tone: Tone; title: string; value: string; caption: string; progress?: number }) {
  return (
    <Link href={href} className="card flex items-center gap-4 p-4 transition hover:border-brand focus-visible:outline-2 focus-visible:outline-brand">
      <IconTile icon={icon} tone={tone} className="size-14" />
      <span className="block min-w-0 flex-1">
        <span className="block text-[14.5px] font-medium text-ink">{title}</span>
        <span className="tabular block text-[26px] leading-tight font-extrabold tracking-tight text-ink">{value}</span>
        <span className="block text-[13.5px] text-ink-soft">{caption}</span>
        {progress !== undefined && <ProgressBar value={progress} label={`${title}: ${Math.round(progress)}% prontas`} className="mt-2" />}
      </span>
    </Link>
  );
}

/** Headline counters of the hub: screens ready per platform, components and organisms. */
export function BaseSummary({ counts, components, organisms }: { counts: Counts; components: number; organisms: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {(Object.keys(counts) as Platform[]).map((p) => (
        <Tile
          key={p}
          href={PLATFORM_META[p].href}
          icon={PLATFORM_META[p].icon}
          tone={PLATFORM_META[p].tone}
          title={`Telas ${PLATFORM_LABEL[p]}`}
          value={`${counts[p].ready}/${counts[p].total}`}
          caption="prontas"
          progress={counts[p].total ? (counts[p].ready / counts[p].total) * 100 : 0}
        />
      ))}
      <Tile href="/base/componentes" icon={Boxes} tone="orange" title="Componentes" value={String(components)} caption="átomos e moléculas" />
      <Tile href="/base/organismos" icon={Layers} tone="pink" title="Organismos" value={String(organisms)} caption="blocos de tela" />
    </div>
  );
}
