// components/base/BaseScreenFrame.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { Platform } from "@/config/base-registry";
import { cn } from "@/lib/cn";
import { DEVICE_LABEL, DEVICE_PARAM, DEVICE_SIZE, type Device } from "@/lib/mobile/devices";

/** Real size of a desktop screen, and the zoom that makes each kind of screen a thumbnail. */
const DESKTOP = { width: 1280, height: 800 };
/** On-page width of each kind of thumbnail: every thumbnail of a kind has the SAME width on both platforms, so a row reads as a grid. */
const TARGET_WIDTH: Record<"desktop" | Device, number> = { desktop: 430, phone: 156, tablet: 330, foldable: 300 };

const PLATFORM_LABEL: Record<Platform, string> = { desktop: "Desktop", ios: "iOS", android: "Android" };

/**
 * A live thumbnail of one screen: the real page in an iframe at its real size, scaled down, loaded only when it scrolls into view.
 * Desktop and phone load the page itself; tablet and foldable load the stage in "embed" mode (one device, no menu: the iframe IS the
 * device). The whole thumbnail is a link to the full screen (the iframe itself does not take clicks).
 */
export function BaseScreenFrame({ platform, device = "phone", href, route, title }: { platform: Platform; device?: Device; href: string; route?: string; title: string }) {
  const kind = platform === "desktop" ? "desktop" : device;
  const big = kind === "tablet" || kind === "foldable";
  const size =
    platform === "desktop"
      ? DESKTOP
      : (() => {
          const d = DEVICE_SIZE[platform][device]!;
          // Tablet and foldable iframes include the bezel (the stage draws it); the phone page is the bare screen.
          return big ? { width: d.width + d.bezel, height: d.height + d.bezel } : { width: d.width, height: d.height };
        })();
  const scale = TARGET_WIDTH[kind] / size.width;
  const box = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const { theme } = useTheme();

  // The thumbnail is a live page of its own: it follows the Dia/Noite switch of the hub (same origin, so its <html data-theme> can be set directly).
  const syncTheme = () => {
    const root = frame.current?.contentDocument?.documentElement;
    if (root) root.dataset.theme = theme;
  };
  useEffect(syncTheme);

  // `?preview` (see proxy.ts) keeps the login on screen when there is a session and lets every screen load without one, for the thumbnail.
  const pagePreview = `${href}${href.includes("?") ? "&" : "?"}preview`;
  const src = big && route ? `/m/duo/${route}?${DEVICE_PARAM}=${device}&p=${platform}&embed=1&preview` : pagePreview;
  const open = big && route ? `/m/duo/${route}?${DEVICE_PARAM}=${device}` : href;
  const label = platform === "desktop" ? "Desktop" : `${PLATFORM_LABEL[platform]}${device === "phone" ? "" : ` · ${DEVICE_LABEL[device]}`}`;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <Link
        ref={box}
        href={open}
        aria-label={`Abrir ${title} (${label})`}
        style={{ width: size.width * scale, height: size.height * scale }}
        className={cn(
          "relative block shrink-0 overflow-hidden focus-visible:outline-2 focus-visible:outline-brand",
          big ? "rounded-xl" : cn("border border-line bg-canvas/50", platform === "desktop" ? "rounded-lg" : "rounded-[22px]"),
        )}
      >
        {visible && (
          <iframe
            title={`${title} · ${label}`}
            ref={frame}
            src={src}
            onLoad={syncTheme}
            tabIndex={-1}
            scrolling="no"
            className={cn("pointer-events-none absolute top-0 left-0 origin-top-left border-0", big ? "bg-transparent" : "bg-white")}
            style={{ width: size.width, height: size.height, transform: `scale(${scale})` }}
          />
        )}
      </Link>
      <figcaption className="text-[12.5px] font-semibold text-ink-soft">{label}</figcaption>
    </figure>
  );
}
