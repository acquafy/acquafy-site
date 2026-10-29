// components/mobile/android/AndroidScreen.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollRoot } from "@/components/mobile/frame-context";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";
import { AndroidHeaderActions } from "./AndroidHeaderActions";
import { useRailOpen } from "./AndroidRailState";
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
  /**
   * Second pane. On a phone it simply follows `children` in the same column; from `@2xl` (≈ 672px of content: tablet, unfolded foldable) the
   * screen is two panes side by side (`children` left, `secondary` right, top-aligned). On a foldable the split sits on the hinge.
   */
  secondary?: ReactNode;
  /** A floating action button (`AndroidFab`), kept above the navigation bar while the screen scrolls (bottom right of the content on big screens, where the bar is a rail). */
  fab?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * A screen of the Android app: same props as `IosScreen`, so every page is the same composition of organisms. Tab roots get the
 * Material 3 "large flexible" top app bar (headline + subtitle that collapse into the small bar on scroll); pushed screens get the
 * small bar with the back arrow and the title. Content column on `surface`, 16px gutters.
 */
export function AndroidScreen({ title, navTitle, subtitle, back, actions, accessory, fab, secondary, className, children }: AndroidScreenProps) {
  const foldable = useDevice() === "foldable";
  const railOpen = useRailOpen();
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

  // Unfolded foldable with a single pane: the hinge splits the screen, so the heading takes the left pane and the content the right one
  // (nothing is ever drawn across the fold). Elsewhere heading and body share one lane: the two-pane width, or a reading column.
  const book = foldable && !secondary && !railOpen;
  const lane = book ? undefined : cn("px-4 @2xl:mx-auto @2xl:w-full @2xl:px-6", secondary ? "@2xl:max-w-[1200px]" : "@2xl:max-w-[768px]");

  const small = back ? (typeof title === "string" ? title : (navTitle ?? "")) : (navTitle ?? (typeof title === "string" ? title : ""));

  const head = back ? (
    subtitle && <p className={cn("md-body-m pt-1 pb-4 text-(--md-on-surface-variant)", lane)}>{subtitle}</p>
  ) : (
    <div className={cn("relative flex flex-col justify-end pt-1 pb-5", lane, accessory ? "min-h-[152px]" : "min-h-[88px]")}>
      <h1 ref={heading} className="md-headline-m md-headline-m-em relative z-10 text-(--md-on-surface)">
        {title}
      </h1>
      {subtitle && <p className={cn("md-body-m relative z-10 mt-1 text-(--md-on-surface-variant)", !!accessory && "max-w-[62%]")}>{subtitle}</p>}
      {accessory}
    </div>
  );

  return (
    <div className="@container flex flex-1 flex-col">
      <AndroidTopBar ref={bar} title={small} collapsed={!!back || state.collapsed} elevated={state.elevated} back={back} actions={actions ?? (back ? undefined : <AndroidHeaderActions />)} />

      {book ? (
        <div className="grid flex-1 grid-cols-[calc(50cqw-80px)_minmax(0,1fr)] items-start gap-x-8 px-6">
          <div className="sticky top-[calc(var(--m-safe-top)+64px)]">{head}</div>
          <main className={cn("flex min-w-0 flex-col gap-4 pb-8", back && !subtitle && "pt-2", className)}>{children}</main>
        </div>
      ) : (
        <>
          {head}
          <main
            className={cn(
              "flex flex-col gap-4 px-4 pb-6 @2xl:mx-auto @2xl:w-full @2xl:grid @2xl:items-start @2xl:gap-x-8 @2xl:gap-y-4 @2xl:px-6 @2xl:pb-8",
              // On the hinge: the left pane ends 16px before the fold (the rail takes the first 80px of the left half), the right one starts 16px after it.
              foldable ? (railOpen ? "@2xl:grid-cols-1" : "@2xl:grid-cols-[calc(50cqw-80px)_minmax(0,1fr)]") : "@2xl:grid-cols-2",
              secondary ? "@2xl:max-w-[1200px]" : "@2xl:max-w-[768px]",
              back && !subtitle && "pt-2",
              className,
            )}
          >
            {/* display: contents on a phone: the organisms stay direct children of the one column */}
            <div className={cn("contents @2xl:flex @2xl:min-w-0 @2xl:flex-col @2xl:gap-4", !secondary && "@2xl:col-span-2")}>{children}</div>
            {secondary && <div className="contents @2xl:flex @2xl:min-w-0 @2xl:flex-col @2xl:gap-4">{secondary}</div>}
          </main>
        </>
      )}

      {fab && (
        <div className="pointer-events-none sticky bottom-[calc(80px+var(--m-safe-bottom)+16px)] z-10 mt-auto h-0 @2xl:bottom-[calc(var(--m-safe-bottom)+16px)]">
          <div className="pointer-events-auto absolute right-4 bottom-0 @2xl:right-6">{fab}</div>
        </div>
      )}
    </div>
  );
}
