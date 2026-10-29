// components/mobile/ui/android/MobileButton.tsx
"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";

/** The shared variants map onto the Material button types: primary = filled, soft = tonal, secondary = outlined, ghost = text, danger = outlined error. */
const VARIANT = { primary: "filled", soft: "tonal", secondary: "outlined", ghost: "text", danger: "danger" } as const;

export type MobileButtonVariant = keyof typeof VARIANT;
/** Material Expressive sizes: `sm` is the 40px small button (48px touch target), `md` 48px, `lg` the 56px medium button. */
export type MobileButtonSize = "sm" | "md" | "lg";

type Shared = { variant?: MobileButtonVariant; size?: MobileButtonSize; full?: boolean; className?: string; children: ReactNode };

/** Attributes the CSS (`.md-btn`, app/m/android.css) reads: shape, colours and the pressed-shape morph come from there. */
function buttonProps({ variant = "primary", size = "md", full = false, className }: Omit<Shared, "children">) {
  return { className: cn("md-btn", className), "data-variant": VARIANT[variant], "data-size": size, "data-full": full || undefined } as const;
}

export function mobileButtonClass({ className }: Omit<Shared, "children"> = {}): string {
  return cn("md-btn", className);
}

/** Button of the mobile app. `loading` disables it and shows a spinner. */
export function MobileButton({
  variant,
  size,
  full,
  className,
  loading = false,
  disabled,
  children,
  type = "button",
  ...rest
}: Shared & { loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} {...buttonProps({ variant, size, full, className })} {...rest}>
      <Ripple />
      {loading && <LoaderCircle className="relative size-[18px] animate-spin" aria-hidden="true" />}
      <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}

/** A link that looks like a `MobileButton`. `href` is a mobile route (`{ route: "finance" }`) or a literal URL; `external` opens a new tab. */
export function MobileButtonLink({
  href,
  external = false,
  variant,
  size,
  full,
  className,
  children,
  ...rest
}: Shared & { href: MobileTarget; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const resolve = useMobileHref();
  const url = resolve(href);
  const props = buttonProps({ variant, size, full, className });
  const body = (
    <>
      <Ripple />
      <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
    </>
  );
  if (external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...props} {...rest}>
        {body}
      </a>
    );
  }
  return (
    <Link href={url} {...props} {...rest}>
      {body}
    </Link>
  );
}
