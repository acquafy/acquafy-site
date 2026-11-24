"use client";

import { useEffect } from "react";

/**
 * Balances every ".card-row" (see globals.css) so that, when the cards wrap, the rows differ by at most one card:
 * 7 cards -> 4 / 3, then 3 / 2 / 2, and so on. Only the minimum width (--card-min) decides how many fit on a
 * row; the blocks then always fill the full width, so a row with fewer blocks has wider ones and nothing is left
 * empty beside it (a card alone on its row stays card-sized and centred).
 *
 * Before this runs (or without JS) .card-row is a plain auto-fit grid, so nothing breaks.
 * The container reads its minimum card width from --card-min and its gap from column-gap.
 *
 * ".card-row-fit" (items of different widths, e.g. a stats strip): while every item fits on a single row the row is a
 * plain flex row and each item takes the width of its content, sharing the spare space, so a long label is not squeezed
 * into the same width as a short one. When it no longer fits on one row it falls back to the balanced grid above.
 */
const SELECTOR = ".card-row";

function layout(el: HTMLElement) {
  const kids = Array.from(el.children).filter(
    (c): c is HTMLElement => c instanceof HTMLElement && getComputedStyle(c).display !== "none",
  );
  const n = kids.length;
  if (n === 0) return;

  const cs = getComputedStyle(el);
  const gap = parseFloat(cs.columnGap) || 0;
  const min = parseFloat(cs.getPropertyValue("--card-min")) || 200;
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

  const first = getComputedStyle(kids[0]);
  const plain =
    first.backgroundColor === "rgba(0, 0, 0, 0)" && first.backgroundImage === "none" && parseFloat(first.borderTopWidth) === 0;

  const counts = Array.from({ length: rows }, (_, r) => (r < extra ? base + 1 : base));

  // Every row fills the full width: the grid has lcm(row sizes) tracks and a block in a row of `count` spans
  // tracks / count of them. A card alone on its row (never a plain text block) keeps the width of a normal card
  // and is centred, so it does not turn into one giant card.
  const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
  const lone = (count: number) => !plain && count === 1 && cols > 1;
  const sizes = counts.map((count) => (lone(count) ? cols : count));
  const tracks = sizes.reduce((acc, c) => (acc * c) / gcd(acc, c), 1) * (sizes.some((_, r) => lone(counts[r])) ? 2 : 1);
  el.style.gridTemplateColumns = `repeat(${tracks}, minmax(0, 1fr))`;
  let i = 0;
  counts.forEach((count) => {
    const span = tracks / (lone(count) ? cols : count);
    const offset = lone(count) ? (tracks - span) / 2 : 0;
    for (let j = 0; j < count; j++, i++) kids[i].style.gridColumn = `${offset + j * span + 1} / span ${span}`;
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
