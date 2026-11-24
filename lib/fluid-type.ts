/**
 * Type scale in rem (root-relative), with a step per screen size instead of fixed px.
 *
 * Every size N (the px value the design uses) is N/16 rem. app/globals.css lowers three scale variables on smaller
 * screens: --fs-sm for text from 13 to 17px, --fs-lg for 18-22px and --fs-xl for 24px and up, so headings shrink more
 * than body text. No text on the site is ever smaller than 14px (0.875rem): every size from 9 to 14 is 14px, 15-17px never drop below it, and line heights up to 17px never drop below 1rem. Changing the
 * browser's base font size scales it all, because it is rem.
 * Classes: text-f18 (font-size) and leading-l22 (line-height), one per size the site uses; add a size here when needed.
 */
export const fluidFontSize: Record<string, string> = {
  "f9": "0.875rem",
  "f10": "0.875rem",
  "f11": "0.875rem",
  "f12": "0.875rem",
  "f13": "0.875rem",
  "f14": "0.875rem",
  "f15": "max(0.875rem, calc(0.9375rem * var(--fs-sm, 1)))",
  "f16": "max(0.875rem, calc(1rem * var(--fs-sm, 1)))",
  "f17": "max(0.875rem, calc(1.0625rem * var(--fs-sm, 1)))",
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
  "l11": "max(1rem, calc(0.6875rem * var(--fs-sm, 1)))",
  "l12": "max(1rem, calc(0.75rem * var(--fs-sm, 1)))",
  "l13": "max(1rem, calc(0.8125rem * var(--fs-sm, 1)))",
  "l14": "max(1rem, calc(0.875rem * var(--fs-sm, 1)))",
  "l15": "max(1rem, calc(0.9375rem * var(--fs-sm, 1)))",
  "l16": "max(1rem, calc(1rem * var(--fs-sm, 1)))",
  "l17": "max(1rem, calc(1.0625rem * var(--fs-sm, 1)))",
  "l18": "calc(1.125rem * var(--fs-sm, 1))",
  "l19": "calc(1.1875rem * var(--fs-sm, 1))",
  "l20": "calc(1.25rem * var(--fs-sm, 1))",
  "l21": "calc(1.3125rem * var(--fs-sm, 1))",
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
