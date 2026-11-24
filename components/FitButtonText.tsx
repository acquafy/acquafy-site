"use client";

import { useEffect } from "react";

/**
 * Keeps button labels on a single line. A label (the "flex-1 text-center" span inside a link/button) shrinks its font
 * together with the button when the button gets narrower than the text, down to MIN_PX (14px, the site-wide minimum) and, if it still does not fit, wraps onto a second line; it goes back to its normal
 * size as soon as there is room again. Works for every language because it measures the real rendered text.
 */
const SELECTOR = "a > span.flex-1.text-center, button > span.flex-1.text-center";
const MIN_PX = 14;

function fit(el: HTMLElement) {
  el.style.whiteSpace = "nowrap";
  el.style.minWidth = "0";
  el.style.fontSize = "";
  const natural = parseFloat(getComputedStyle(el).fontSize);
  const room = el.clientWidth;
  const need = el.scrollWidth;
  if (!room || !need || need <= room) return;
  const size = Math.floor(natural * (room / need) * 10) / 10;
  if (size < MIN_PX) {
    el.style.fontSize = natural < MIN_PX ? "" : `${MIN_PX}px`;
    el.style.whiteSpace = "normal";
    return;
  }
  el.style.fontSize = `${size}px`;
}

export default function FitButtonText() {
  useEffect(() => {
    const ro = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target as HTMLElement)));
    const watched = new Set<HTMLElement>();
    let raf = 0;

    const scan = () => {
      raf = 0;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!watched.has(el)) {
          watched.add(el);
          ro.observe(el);
        }
        fit(el);
      });
      watched.forEach((el) => {
        if (!el.isConnected) {
          watched.delete(el);
          ro.unobserve(el);
        }
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(scan);
    };

    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    scan();

    return () => {
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
