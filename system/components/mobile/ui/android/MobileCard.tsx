// components/mobile/ui/android/MobileCard.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MobileCardProps = {
  as?: "div" | "section" | "article" | "aside";
  /** Inner padding; `none` for cards that hold a list drawn edge to edge. */
  padding?: "none" | "sm" | "md";
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-label"?: string;
};

const PADDING = { none: "", sm: "p-3", md: "p-4" } as const;

/** Material 3 card: a tonal `surface-container` block with a 20px radius. No border and no shadow; the elevation is the tone against the `surface` screen. */
export function MobileCard({ as: Tag = "div", padding = "md", className, children, ...rest }: MobileCardProps) {
  return (
    <Tag className={cn("min-w-0 rounded-[20px] bg-(--md-surface-container) text-(--md-on-surface)", PADDING[padding], className)} {...rest}>
      {children}
    </Tag>
  );
}
