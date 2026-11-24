import type { Config } from "tailwindcss";
import { fluidFontSize, fluidLineHeight } from "./lib/fluid-type";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        /* Breakpoint mobile — telas ≤ 767px (smartphones) */
        "mob": { max: "767px" },
        /* Phones only — screens ≤ 479px */
        "phone": { max: "479px" },
        /* Below the lg breakpoint — screens ≤ 1023px (max-lg: is not available with these custom screens) */
        "below-lg": { max: "1023px" },
        /* Breakpoints canônicos conforme setup do projeto:
           ≥ 1024px → Breakpoint 2
           ≥ 1280px → TELA TOTAL */
        "win-1024": "1024px",
        "win-1190": "1190px",
        "win-1280": "1280px",
        /* Breakpoint calculado: 3 cards×380px + 2 gaps×20px + 2 paddings×20px = 1220px */
        "1220": "1220px",
        /* Breakpoint legado — mantido para compatibilidade */
        "1024": "1024px",
        /* Breakpoint intermediário — layout de 3 colunas full */
        "1300": "1300px",
        /* Breakpoint para "tela total" — design nativo Figma (Padrão, 1500px) */
        "1440": "1440px",
      },
      colors: {
        azul: "#0233c3",
        "azul-neon": "#0569ff",
        "azul-escuro": "#1f2e91",
        lilas: "#9f3df5",
        "lilas-plus": "#6e0cc3",
        verde: "#36ae5c",
        gold: "#dfa727",
        texto: "#333333",
        "texto-dark": "#2a2a2b",
        "bg-cinza": "#f6f9fe",
        border: "#cbd0d4",
      },
      fontFamily: {
        sans: ['"Avenir LT Pro:55 Roman"', '"Avenir Roman Fallback"', "Arial", "sans-serif"],
        /* Avenir LT Pro weights (app/globals.css), each with its metric-matched fallback */
        "avenir-roman": ['"Avenir LT Pro:55 Roman"', '"Avenir Roman Fallback"', "Arial", "sans-serif"],
        "avenir-heavy": ['"Avenir LT Pro:85 Heavy"', '"Avenir Heavy Fallback"', "Arial", "sans-serif"],
        "avenir-black": ['"Avenir LT Pro:95 Black"', '"Avenir Black Fallback"', "Arial", "sans-serif"],
      },
      fontSize: {
        ...fluidFontSize,
        /* Heading hero — 56px em 1280px, fluid até 32px em 1024px */
        "hero": ["calc(clamp(2rem, 9.375vw - 4rem, 3.5rem) * var(--fs-xl, 1))", { lineHeight: "calc(clamp(2.25rem, 9.375vw - 3.75rem, 3.75rem) * var(--fs-xl, 1))" }],
        /* Heading hero-md — 48px em 1280px, fluid até 32px em 1024px */
        "hero-md": ["calc(clamp(2rem, 6.25vw - 2rem, 3rem) * var(--fs-xl, 1))", { lineHeight: "calc(clamp(2.25rem, 6.25vw - 1.75rem, 3.25rem) * var(--fs-xl, 1))" }],
        /* Heading hero-xl — 64px em 1280px, fluid até 32px em 1024px */
        "hero-xl": ["calc(clamp(2rem, 12.5vw - 6rem, 4rem) * var(--fs-xl, 1))", { lineHeight: "calc(clamp(2.25rem, 12.5vw - 5.75rem, 4.25rem) * var(--fs-xl, 1))" }],
      },
      lineHeight: fluidLineHeight,
      maxWidth: {
        container: "1400px",
      },
      borderRadius: {
        card: "12px",
        section: "16px",
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)",
        "gradient-essentials": "linear-gradient(to right, #0233c3, #0569ff)",
        "gradient-premium": "linear-gradient(172.84deg, #0233c3 0%, #9f3df5 36.37%)",
      },
    },
  },
  plugins: [],
};

export default config;
