// components/ui/Button.tsx
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS = {
  primary: "bg-brand-gradient text-white enabled:hover:brightness-110 enabled:active:brightness-95",
  outline: "border border-brand/40 bg-card text-brand enabled:hover:bg-brand-soft",
  soft: "bg-brand-soft text-brand enabled:hover:bg-brand/20",
  ghost: "text-ink-soft enabled:hover:bg-brand-soft enabled:hover:text-brand",
  danger: "border border-danger/30 bg-card text-danger enabled:hover:bg-danger-soft",
} as const;

const SIZES = {
  sm: "px-3 py-2 text-[13.5px]",
  md: "px-5 py-3 text-[15px]",
  lg: "px-6 py-3.5 text-[16px]",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

type Shared = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };

/** `buttonClass({ variant:"outline"})` — for the rare element that must look like a button but is not one. */
export function buttonClass({ variant = "primary", size = "md", className }: Pick<Shared, "variant" | "size" | "className"> = {}): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled,
  children,
  type = "button",
  ...rest
}: Shared & { loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={buttonClass({ variant, size, className })} {...rest}>
      {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  ...rest
}: Shared & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const cls = buttonClass({ variant, size, className });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
