// components/layout/LogoutButton.tsx
"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { cn } from "@/lib/cn";
import { LogoutDialog } from "./LogoutDialog";
import { RailTooltip } from "./SidebarNav";

/** Sidebar "Sair": opens the confirmation dialog. */
export function LogoutButton() {
  const [open, setOpen] = useState(false);
  const { collapsed } = useSidebar();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={collapsed ? "Sair" : undefined}
        className={cn(
          "group relative flex w-full items-center rounded-lg py-3 text-[14.5px] font-medium text-ink-soft hover:bg-card hover:text-brand focus-visible:outline-2 focus-visible:outline-brand",
          collapsed ? "justify-center px-0" : "gap-3 px-3.5",
        )}
      >
        <LogOut className="size-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        {collapsed ? <RailTooltip>Sair</RailTooltip> : "Sair"}
      </button>
      <LogoutDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
