import type { Config } from "tailwindcss";

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
        /* Breakpoints canônicos conforme setup do projeto:
           ≥ 1024px → Breakpoint 2
           ≥ 1280px → TELA TOTAL */
        "win-1024": "1024px",
        "win-1280": "1280px",
        /* Breakpoint calculado: 3 cards×380px + 2 gaps×20px + 2 paddings×20px = 1220px */
        "1220": "1220px",
        /* Breakpoint legado — mantido para compatibilidade */
        "1024": "1024px",
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
        sans: ["Avenir LT Pro:55 Roman", "sans-serif"],
      },
      fontSize: {
        /* Heading hero — 56px ≥1024px, fluid até 32px em 375px */
        "hero": ["clamp(32px, 3.7vw + 18px, 56px)", { lineHeight: "clamp(36px, 3.7vw + 22px, 60px)" }],
      },
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
