// components/mobile/android/Ripple.tsx
"use client";

import { useEffect, useRef } from "react";

const PRESSABLE = 'a, button, [role="button"], [role="radio"], [role="switch"], label';
const GROW_MS = 450;
const FADE_MS = 300;

/**
 * Material state layer + ripple. Put it as the FIRST child of a `relative` pressable (button, link, row): it clips itself to the
 * host's border radius, shows the hover/focus/pressed layer (CSS, app/m/android.css) and, on pointer down, a wave that grows from
 * the touch point and fades once the finger is up. `follow` makes it listen to the closest pressable ancestor instead of its parent
 * (the navigation bar draws the wave on the indicator pill but the whole item is the touch target).
 */
export function Ripple({ follow = false }: { follow?: boolean }) {
  const layer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const host = follow ? el.closest<HTMLElement>(PRESSABLE) : el.parentElement;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || (host as HTMLButtonElement).disabled || host.getAttribute("aria-disabled") === "true") return;
      const box = el.getBoundingClientRect();
      const x = Math.min(box.width, Math.max(0, e.clientX - box.left));
      const y = Math.min(box.height, Math.max(0, e.clientY - box.top));
      const radius = Math.hypot(Math.max(x, box.width - x), Math.max(y, box.height - y));

      const wave = document.createElement("span");
      wave.className = "md-ripple-wave";
      Object.assign(wave.style, { left: `${x - radius}px`, top: `${y - radius}px`, width: `${radius * 2}px`, height: `${radius * 2}px` });
      el.appendChild(wave);

      let grown = false;
      let released = false;
      const fadeOut = () => {
        if (!grown || !released) return;
        const out = wave.animate([{ opacity: 0.16 }, { opacity: 0 }], { duration: FADE_MS, fill: "forwards" });
        out.onfinish = () => wave.remove();
      };
      wave.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], { duration: GROW_MS, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" }).onfinish = () => {
        grown = true;
        fadeOut();
      };
      const release = () => {
        host.removeEventListener("pointerup", release);
        host.removeEventListener("pointercancel", release);
        host.removeEventListener("pointerleave", release);
        released = true;
        fadeOut();
      };
      host.addEventListener("pointerup", release);
      host.addEventListener("pointercancel", release);
      host.addEventListener("pointerleave", release);
    };

    host.addEventListener("pointerdown", onDown);
    return () => host.removeEventListener("pointerdown", onDown);
  }, [follow]);

  return <span ref={layer} aria-hidden="true" data-follow={follow || undefined} className="md-ripple" />;
}
