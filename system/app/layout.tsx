// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { BaseBackLink } from "@/components/base/BaseBackLink";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { isTheme, THEME_COOKIE } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-stack", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Acquafy Investor Portal", template: "%s · Acquafy Investor Portal" },
  description: "Portal do Investidor Acquafy: purificadores, repasses, extrato e contrato do seu investimento em Água como Serviço.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const saved = (await cookies()).get(THEME_COOKIE)?.value;
  const theme = isTheme(saved) ? saved : "light";

  return (
    <html lang="pt-BR" data-theme={theme} className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider initial={theme}>
          {children}
          <BaseBackLink />
        </ThemeProvider>
      </body>
    </html>
  );
}
