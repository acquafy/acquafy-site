"use client";

import { useEffect } from "react";

/**
 * Keeps button labels on a single line. A label (the "flex-1 text-center" span inside a link/button) shrinks its font
 * together with the button when the button gets narrower than the text, down to MIN_PX (12px; button labels are the one place smaller than the 14px body minimum, so they never wrap).
 * If it still does not fit at 14px the label never wraps: the button gets a minimum width equal to its label, so a
 * flex-wrap row moves the whole button to the next line instead. It goes back to its normal size as soon as there is
 * room again. Works for every language because it measures the real rendered text.
 */
const SELECTOR = "a > span.flex-1.text-center, button > span.flex-1.text-center";
const MIN_PX = 12;

function fit(el: HTMLElement) {
  const btn = el.parentElement;
  if (btn) btn.style.minWidth = "";
  el.style.whiteSpace = "nowrap";
  el.style.minWidth = "0";
  el.style.fontSize = "";
  const natural = parseFloat(getComputedStyle(el).fontSize);
  const room = el.clientWidth;
  const need = el.scrollWidth;
  if (!room || !need || need <= room) return;
  const size = Math.floor(natural * (room / need) * 10) / 10;
  if (size < MIN_PX) {
    // label at the minimum size; widen the button just enough for it (the rest of the button is padding and icon)
    const sized = natural < MIN_PX ? natural : MIN_PX;
    el.style.fontSize = natural < MIN_PX ? "" : `${MIN_PX}px`;
    if (btn) btn.style.minWidth = `${Math.ceil(btn.clientWidth - room + need * (sized / natural))}px`;
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
