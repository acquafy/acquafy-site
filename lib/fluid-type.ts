/**
 * Type scale in rem (root-relative), with a step per screen size instead of fixed px.
 *
 * Every size N (the px value the design uses) is N/16 rem. Text from 18px up is multiplied by a scale variable that
 * app/globals.css lowers on smaller screens (--fs-lg for 18-22px, --fs-xl for 24px and up), so headings shrink more
 * than body text and everything stays legible; body text under 18px keeps its size. Changing the browser's base font
 * size scales it all, because it is rem.
 * Classes: text-f18 (font-size) and leading-l22 (line-height), one per size the site uses; add a size here when needed.
 */
export const fluidFontSize: Record<string, string> = {
  "f9": "0.5625rem",
  "f10": "0.625rem",
  "f11": "0.6875rem",
  "f12": "0.75rem",
  "f13": "0.8125rem",
  "f14": "0.875rem",
  "f15": "0.9375rem",
  "f16": "1rem",
  "f17": "1.0625rem",
  "f18": "calc(1.125rem * var(--fs-lg, 1))",
  "f20": "calc(1.25rem * var(--fs-lg, 1))",
  "f22": "calc(1.375rem * var(--fs-lg, 1))",
  "f24": "calc(1.5rem * var(--fs-xl, 1))",
  "f26": "calc(1.625rem * var(--fs-xl, 1))",
  "f28": "calc(1.75rem * var(--fs-xl, 1))",
  "f32": "calc(2rem * var(--fs-xl, 1))",
  "f40": "calc(2.5rem * var(--fs-xl, 1))",
  "f42": "calc(2.625rem * var(--fs-xl, 1))",
  "f46": "calc(2.875rem * var(--fs-xl, 1))",
  "f48": "calc(3rem * var(--fs-xl, 1))",
};

export const fluidLineHeight: Record<string, string> = {
  "l11": "0.6875rem",
  "l12": "0.75rem",
  "l13": "0.8125rem",
  "l14": "0.875rem",
  "l15": "0.9375rem",
  "l16": "1rem",
  "l17": "1.0625rem",
  "l18": "1.125rem",
  "l19": "1.1875rem",
  "l20": "1.25rem",
  "l21": "1.3125rem",
  "l22": "calc(1.375rem * var(--fs-lg, 1))",
  "l24": "calc(1.5rem * var(--fs-lg, 1))",
  "l25": "calc(1.5625rem * var(--fs-lg, 1))",
  "l26": "calc(1.625rem * var(--fs-lg, 1))",
  "l28": "calc(1.75rem * var(--fs-lg, 1))",
  "l29": "calc(1.8125rem * var(--fs-xl, 1))",
  "l34": "calc(2.125rem * var(--fs-xl, 1))",
  "l39": "calc(2.4375rem * var(--fs-xl, 1))",
  "l40": "calc(2.5rem * var(--fs-xl, 1))",
  "l48": "calc(3rem * var(--fs-xl, 1))",
  "l50": "calc(3.125rem * var(--fs-xl, 1))",
  "l56": "calc(3.5rem * var(--fs-xl, 1))",
};
