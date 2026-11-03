// components/layout/ThemeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { IconButton } from "@/components/ui/IconButton";

/** Day ⇄ Night switch for the top bar. Shows the icon of the theme you would switch to. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const toast = useToast();
  const night = theme === "dark";

  return (
    <IconButton
      icon={night ? Sun : Moon}
      label={night ? "Ativar modo Dia" : "Ativar modo Noite"}
      tone="muted"
      bordered
      aria-pressed={night}
      className="size-10"
      onClick={() => {
        toggle();
        toast({ title: night ? "Modo Dia ativado" : "Modo Noite ativado", tone: "info" });
      }}
    />
  );
}
