// components/mobile/android/AndroidScreen.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollRoot } from "@/components/mobile/frame-context";
import { cn } from "@/lib/cn";
import { AndroidHeaderActions } from "./AndroidHeaderActions";
import { AndroidTopBar } from "./AndroidTopBar";

type AndroidScreenProps = {
  /** Headline (a string, or a node such as the greeting with an accent colour). */
  title: ReactNode;
  /** Plain-text title for the small bar. Defaults to `title` when it is a string. */
  navTitle?: string;
  subtitle?: ReactNode;
  /** Pushed screen: small top app bar with the back arrow to `href`. Omit on tab roots (large flexible bar). */
  back?: { href: string; label: string };
  /** Replaces the default right side (bell + avatar on tab roots, nothing on pushed screens). */
  actions?: ReactNode;
  /** Decoration anchored to the right of the large headline (e.g. the purifier on Início). */
  accessory?: ReactNode;
  /** A floating action button (`AndroidFab`), kept above the navigation bar while the screen scrolls. */
  fab?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * A screen of the Android app: same props as `IosScreen`, so every page is the same composition of organisms. Tab roots get the
 * Material 3 "large flexible" top app bar (headline + subtitle that collapse into the small bar on scroll); pushed screens get the
 * small bar with the back arrow and the title. Content column on `surface`, 16px gutters.
 */
export function AndroidScreen({ title, navTitle, subtitle, back, actions, accessory, fab, className, children }: AndroidScreenProps) {
  const scrollRoot = useScrollRoot();
  const bar = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState({ collapsed: false, elevated: false });

  useEffect(() => {
    if (!scrollRoot) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const barBottom = bar.current?.getBoundingClientRect().bottom ?? 0;
      const headingBottom = heading.current?.getBoundingClientRect().bottom ?? 0;
      const next = { collapsed: !!heading.current && headingBottom <= barBottom + 4, elevated: scrollRoot.scrollTop > 2 };
      setState((prev) => (prev.collapsed === next.collapsed && prev.elevated === next.elevated ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scrollRoot.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [scrollRoot]);

  const small = back ? (typeof title === "string" ? title : (navTitle ?? "")) : (navTitle ?? (typeof title === "string" ? title : ""));

  return (
    <div className="flex flex-1 flex-col">
      <AndroidTopBar ref={bar} title={small} collapsed={!!back || state.collapsed} elevated={state.elevated} back={back} actions={actions ?? (back ? undefined : <AndroidHeaderActions />)} />

      {back ? (
        subtitle && <p className="md-body-m px-4 pt-1 pb-4 text-(--md-on-surface-variant)">{subtitle}</p>
      ) : (
        <div className={cn("relative flex flex-col justify-end px-4 pt-1 pb-5", accessory ? "min-h-[152px]" : "min-h-[88px]")}>
          <h1 ref={heading} className="md-headline-m md-headline-m-em relative z-10 text-(--md-on-surface)">
            {title}
          </h1>
          {subtitle && <p className={cn("md-body-m relative z-10 mt-1 text-(--md-on-surface-variant)", !!accessory && "max-w-[62%]")}>{subtitle}</p>}
          {accessory}
        </div>
      )}

      <main className={cn("flex flex-col gap-4 px-4 pb-6", back && !subtitle && "pt-2", className)}>{children}</main>

      {fab && (
        <div className="pointer-events-none sticky bottom-[calc(80px+var(--m-safe-bottom)+16px)] z-10 mt-auto h-0">
          <div className="pointer-events-auto absolute right-4 bottom-0">{fab}</div>
        </div>
      )}
    </div>
  );
}
