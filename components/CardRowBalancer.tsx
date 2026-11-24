"use client";

import { useEffect } from "react";

/**
 * Balances every ".card-row" (see globals.css) so that, when the cards wrap, the rows differ by at most one card:
 * 7 cards -> 4 / 3, then 3 / 2 / 2, and so on. Only the minimum width (--card-min) decides how many fit on a
 * row; the blocks then always fill the full width, so a row with fewer blocks has wider ones and nothing is left
 * empty beside it (a block alone on its row fills the whole row too).
 *
 * Before this runs (or without JS) .card-row is a plain auto-fit grid, so nothing breaks.
 * The container reads its minimum card width from --card-min and its gap from column-gap.
 *
 * ".card-row-content": the minimum card width is the natural width of the widest card (so lists never wrap), and --card-min
 * only acts as a floor.
 *
 * ".card-row-equal": when the blocks end up stacked one per row they get the same height as well (side by side the grid already stretches them). The spare height goes to the CSS variable --equal-extra, which a card adds to the bottom padding of its list row (min-height is ignored by subgrid cards).
 *
 * ".card-row-hug": every block keeps the width of its own content. While they all fit on one row the row is a flex row with
 * justify-content: space-between, so the free space becomes an equal gap between the blocks. When they no longer fit the
 * row falls back to the balanced grid (minimum column width from --card-min).
 *
 * ".card-row-fit" (items of different widths, e.g. a stats strip): while every item fits on a single row the row is a
 * plain flex row and each item takes the width of its content, sharing the spare space, so a long label is not squeezed
 * into the same width as a short one. When it no longer fits on one row it falls back to the balanced grid above.
 */
const SELECTOR = ".card-row";

function layout(el: HTMLElement) {
  const kids = Array.from(el.children).filter(
    (c): c is HTMLElement => {
      if (!(c instanceof HTMLElement)) return false;
      const cs = getComputedStyle(c);
      return cs.display !== "none" && cs.position !== "absolute" && cs.position !== "fixed";
    },
  );
  const n = kids.length;
  if (n === 0) return;

  const cs = getComputedStyle(el);
  const gap = parseFloat(cs.columnGap) || 0;
  let min = parseFloat(cs.getPropertyValue("--card-min")) || 200;
  if (el.classList.contains("card-row-hug")) {
    const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    // back to the grid defaults before measuring
    el.style.display = "";
    el.style.justifyContent = "";
    kids.forEach((k) => { k.style.flex = ""; k.style.gridColumn = ""; });
    const widths = kids.map((k) => {
      const prev = k.style.width;
      k.style.width = "max-content";
      const w = k.offsetWidth;
      k.style.width = prev;
      return w;
    });
    const total = widths.reduce((a, b) => a + b, 0) + gap * (n - 1);
    if (total <= inner) {
      el.style.display = "flex";
      el.style.flexWrap = "nowrap";
      el.style.justifyContent = "space-between";
      el.style.gridTemplateColumns = "";
      kids.forEach((k) => (k.style.flex = "0 0 auto"));
      return;
    }
    el.style.flexWrap = "";
  } else if (el.classList.contains("card-row-content")) {
    // Cards whose text must not wrap: the minimum width is the widest card at its natural (max-content) width.
    for (const k of kids) {
      const prev = k.style.width;
      k.style.width = "max-content";
      min = Math.max(min, k.offsetWidth);
      k.style.width = prev;
    }
  }
  const inner = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);

  const maxCols = Math.max(1, Math.floor((inner + gap) / (min + gap)));
  const rows = Math.ceil(n / Math.min(maxCols, n));
  const cols = Math.ceil(n / rows); // widest row
  const base = Math.floor(n / rows);
  const extra = n % rows; // the first `extra` rows get one more card

  const fit = el.classList.contains("card-row-fit");
  if (fit && maxCols >= n) {
    el.style.display = "flex";
    el.style.flexWrap = "nowrap";
    el.style.gridTemplateColumns = "";
    kids.forEach((k) => {
      k.style.flex = "1 1 auto";
      k.style.gridColumn = "";
    });
    return;
  }
  if (fit) {
    el.style.display = "";
    el.style.flexWrap = "";
    kids.forEach((k) => (k.style.flex = ""));
  }

  if (el.classList.contains("card-row-equal")) {
    kids.forEach((k) => k.style.removeProperty("--equal-extra"));
    if (cols === 1 && n > 1) {
      const heights = kids.map((k) => k.offsetHeight);
      const tallest = Math.max(...heights);
      kids.forEach((k, idx) => k.style.setProperty("--equal-extra", `${tallest - heights[idx]}px`));
    }
  }

  const counts = Array.from({ length: rows }, (_, r) => (r < extra ? base + 1 : base));

  // Every row fills the full width, including a block that ends up alone on its row: the grid has lcm(row sizes)
  // tracks and a block in a row of `count` spans tracks / count of them.
  const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
  const tracks = counts.reduce((acc, c) => (acc * c) / gcd(acc, c), 1);
  el.style.gridTemplateColumns = `repeat(${tracks}, minmax(0, 1fr))`;
  let i = 0;
  counts.forEach((count) => {
    const span = tracks / count;
    for (let j = 0; j < count; j++, i++) kids[i].style.gridColumn = `${j * span + 1} / span ${span}`;
  });
}

export default function CardRowBalancer() {
  useEffect(() => {
    const ro = new ResizeObserver((entries) => entries.forEach((e) => layout(e.target as HTMLElement)));
    const watched = new Set<HTMLElement>();
    let raf = 0;

    const scan = () => {
      raf = 0;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!watched.has(el)) {
          watched.add(el);
          ro.observe(el);
        }
        layout(el);
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

    // New rows (route changes, language switch, conditional blocks) and children that appear or disappear.
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", schedule);
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
