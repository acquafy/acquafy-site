// components/mobile/ui/ios/MobileButton.tsx
"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";
import type { MobileTarget } from "@/lib/mobile/platform";

/** Capsule buttons that spring on press (see `.ios-press` in app/m/ios.css). */
const BASE =
  "ios-press relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

/** primary = prominent Liquid Glass (brand tint); secondary = bordered (grey fill); soft = tinted; ghost = plain; danger = tinted red. */
const VARIANTS = {
  primary: "ios-glass-prominent",
  secondary: "bg-(--ios-fill) text-brand active:bg-(--ios-fill-strong)",
  soft: "bg-brand/15 text-brand active:bg-brand/25",
  ghost: "text-brand active:opacity-50",
  danger: "bg-danger/14 text-danger active:bg-danger/24",
} as const;

/** `md` (44pt) and `lg` (50pt) meet the 44pt touch target; `sm` is 36pt drawn with an invisible 44pt hit area. */
const SIZES = {
  sm: "h-9 px-3.5 text-[15px] before:absolute before:inset-x-0 before:-inset-y-[4px] before:content-['']",
  md: "h-11 px-5 text-[17px]",
  lg: "h-[50px] px-6 text-[17px]",
} as const;

export type MobileButtonVariant = keyof typeof VARIANTS;
export type MobileButtonSize = keyof typeof SIZES;

type Shared = { variant?: MobileButtonVariant; size?: MobileButtonSize; full?: boolean; className?: string; children: ReactNode };

export function mobileButtonClass({ variant = "primary", size = "md", full = false, className }: Omit<Shared, "children"> = {}): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], full && "w-full", className);
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
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={mobileButtonClass({ variant, size, full, className })} {...rest}>
      {loading && <LoaderCircle className="size-[18px] animate-spin" aria-hidden="true" />}
      {children}
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
  const cls = mobileButtonClass({ variant, size, full, className });
  if (external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={url} className={cls} {...rest}>
      {children}
    </Link>
  );
}
