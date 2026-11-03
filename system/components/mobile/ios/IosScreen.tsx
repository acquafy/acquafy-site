// components/mobile/ios/IosScreen.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollRoot } from "@/components/mobile/frame-context";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { cn } from "@/lib/cn";
import { IosHeaderActions } from "./IosHeaderActions";
import { IosNavBar } from "./IosNavBar";
import { useSidebarOpen } from "./IosSidebarState";

type IosScreenProps = {
  /** Large title (a string, or a node such as the greeting with an accent colour). */
  title: ReactNode;
  /** Plain-text title for the collapsed bar. Defaults to `title` when it is a string. */
  navTitle?: string;
  subtitle?: ReactNode;
  /** Pushed screen: the round back button returns to `href`. Omit on tab roots. */
  back?: { href: string; label: string };
  /** Replaces the default right side (bell + avatar capsule on tab roots, nothing on pushed screens). */
  actions?: ReactNode;
  /** Decoration anchored to the right of the large title (e.g. the purifier on Início). */
  accessory?: ReactNode;
  /** Secondary blocks. Phone: stacked after `children`. Tablet / foldable (content ≥ 42rem): the right-hand column, next to `children`. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * A screen of the iOS app: transparent glass nav bar + Large Title (34pt bold) that collapses into the bar's inline title on
 * scroll + the content column (16pt gutters, inset-grouped blocks on the grouped background). Pages are thin:
 * `<IosScreen title="Extrato" …><SomeOrganism /></IosScreen>`. The screen is a `@container`: from 42rem (`@2xl`, iPad and unfolded foldable)
 * the gutters grow to 24, the content gets a reading width and, with `aside`, splits into two columns (`items-start`): equal on the
 * tablet; on the foldable the 24pt gap sits exactly on the hinge (screen centre = 50cqw − 48 of the content column, the rail being 96 wide).
 */
export function IosScreen({ title, navTitle, subtitle, back, actions, accessory, aside, className, children }: IosScreenProps) {
  const scrollRoot = useScrollRoot();
  const foldable = useDevice() === "foldable";
  const sidebarOpen = useSidebarOpen();
  const nav = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [bar, setBar] = useState({ collapsed: false, elevated: false });

  useEffect(() => {
    if (!scrollRoot) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const navBottom = nav.current?.getBoundingClientRect().bottom ?? 0;
      const headingBottom = heading.current?.getBoundingClientRect().bottom ?? 0;
      const next = { collapsed: headingBottom <= navBottom + 4, elevated: scrollRoot.scrollTop > 2 };
      setBar((prev) => (prev.collapsed === next.collapsed && prev.elevated === next.elevated ? prev : next));
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

  const small = navTitle ?? (typeof title === "string" ? title : "");

  return (
    <div className="@container flex flex-1 flex-col">
      <div className={cn("mx-auto flex w-full flex-1 flex-col", aside ? "@2xl:max-w-[62rem]" : "@2xl:max-w-[42rem]")}>
        <IosNavBar ref={nav} title={small} collapsed={bar.collapsed} elevated={bar.elevated} back={back} actions={actions ?? (back ? undefined : <IosHeaderActions />)} />
        <div className="relative overflow-x-clip px-4 pt-1 pb-3 @2xl:px-6">
          <h1 ref={heading} className="relative z-10 text-[34px] leading-[41px] font-bold tracking-[-0.4px] text-ink">
            {title}
          </h1>
          {subtitle && <p className={cn("relative z-10 mt-1 text-[15px] leading-5 text-ink-soft", !!accessory && "max-w-[62%]")}>{subtitle}</p>}
          {accessory}
        </div>
        <main
          className={cn(
            "relative flex flex-col gap-4 px-4 pb-6 @2xl:px-6 @2xl:pb-8",
            !!aside && "@2xl:grid @2xl:items-start",
            !!aside && (foldable ? (sidebarOpen ? "@2xl:grid-cols-1" : "@2xl:grid-cols-[calc(50cqw-76px)_1fr] @2xl:gap-6") : "@2xl:grid-cols-2 @2xl:gap-5"),
            className,
          )}
        >
          {aside ? (
            <>
              <div className="flex min-w-0 flex-col gap-4 @2xl:gap-5">{children}</div>
              <div className="flex min-w-0 flex-col gap-4 @2xl:gap-5">{aside}</div>
            </>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
