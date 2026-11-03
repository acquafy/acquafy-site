// components/mobile/android/AndroidFab.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import type { MobileTarget } from "@/lib/mobile/platform";
import { Ripple } from "./Ripple";

type Props = {
  /** The 24px icon as an element (`<Plus />`): pages are server components and cannot hand a component function to a client one. */
  icon: ReactNode;
  /** Accessible name; shown as the label when `extended`. */
  label: string;
  /** Extended FAB: icon + label (56px tall) instead of the 56px square. */
  extended?: boolean;
  href?: MobileTarget;
  onClick?: () => void;
};

/**
 * Material 3 Expressive FAB (56px, 16px radius that morphs to 28px when pressed). Floats above the navigation bar, anchored to the
 * right: use it through `AndroidScreen`'s `fab` prop, which keeps it sticky inside the scroll area.
 */
export function AndroidFab({ icon, label, extended = false, href, onClick }: Props) {
  const resolve = useMobileHref();
  const body: ReactNode = (
    <>
      <Ripple />
      <span className="relative grid size-6 place-items-center [&>svg]:size-6" aria-hidden="true">
        {icon}
      </span>
      {extended && <span className="md-label-l relative text-[16px] leading-6">{label}</span>}
    </>
  );
  const common = { className: "md-fab", "data-extended": extended || undefined, "aria-label": extended ? undefined : label };
  if (href) {
    return (
      <Link href={resolve(href)} {...common}>
        {body}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} {...common}>
      {body}
    </button>
  );
}
