// components/mobile/duo/DuoNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { IconButton } from "@/components/ui/IconButton";
import { SCREENS } from "@/config/base-registry";
import { cn } from "@/lib/cn";
import { DEVICE_LABEL, DEVICE_PARAM, DEVICES, type Device } from "@/lib/mobile/devices";

const LINKS = SCREENS.filter((s) => s.mobile).map((s) => ({ id: s.id, title: s.title, route: s.mobile! }));

const suffix = (device: Device) => (device === "phone" ? "" : `?${DEVICE_PARAM}=${device}`);

/** Left column of the stage: the form factor (phone, tablet, foldable), the app's screens (each one loads in every device) and the Dia/Noite switch. */
export function DuoNav({ device }: { device: Device }) {
  const rest = usePathname().split("/").filter(Boolean).slice(2).join("/") || "home";
  const current = rest.split("/")[0];
  const { theme, toggle } = useTheme();
  const night = theme === "dark";

  return (
    <nav aria-label="Telas do app" className="sticky top-0 flex h-dvh w-60 shrink-0 flex-col gap-1 overflow-y-auto p-4 [scrollbar-width:thin]">
      <Link
        href="/base"
        className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-semibold text-ink-soft transition hover:bg-brand-soft/60 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar à Base
      </Link>
      <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.08em] text-ink-mute uppercase">Aparelho</p>
      <div role="group" aria-label="Aparelho" className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-brand-soft/60 p-1">
        {DEVICES.map((d) => (
          <Link
            key={d}
            href={`/m/duo/${rest}${suffix(d)}`}
            aria-current={device === d ? "true" : undefined}
            className={cn(
              "rounded-md px-1 py-1.5 text-center text-[12.5px] font-semibold transition focus-visible:outline-2 focus-visible:outline-brand",
              device === d ? "bg-card text-brand" : "text-ink-soft hover:text-brand",
            )}
          >
            {DEVICE_LABEL[d]}
          </Link>
        ))}
      </div>

      <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.08em] text-ink-mute uppercase">Telas do app</p>
      {LINKS.map((s) => (
        <Link
          key={s.id}
          href={`/m/duo/${s.route}${suffix(device)}`}
          aria-current={current === s.route ? "page" : undefined}
          className={cn(
            "rounded-lg border-l-2 px-3 py-2 text-[14px] font-semibold transition focus-visible:outline-2 focus-visible:outline-brand",
            current === s.route ? "border-brand bg-brand-soft text-brand" : "border-transparent text-ink-soft hover:bg-brand-soft/60 hover:text-brand",
          )}
        >
          {s.title}
        </Link>
      ))}
      <div className="mt-auto pt-4">
        <IconButton icon={night ? Sun : Moon} label={night ? "Ativar modo Dia" : "Ativar modo Noite"} tone="muted" bordered aria-pressed={night} className="size-10" onClick={toggle} />
      </div>
    </nav>
  );
}
