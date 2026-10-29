// components/mobile/ui/ios/MobileCard.tsx
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

/** Opaque inset-grouped block (content is never glass): hairline border, no shadow, 24pt continuous corners, on the grouped background. */
export function MobileCard({ as: Tag = "div", padding = "md", className, children, ...rest }: MobileCardProps) {
  return (
    <Tag className={cn("ios-sq min-w-0 rounded-[24px] bg-card", PADDING[padding], className)} {...rest}>
      {children}
    </Tag>
  );
}
