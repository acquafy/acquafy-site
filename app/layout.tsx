import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { ChatProvider } from "@/components/ChatWidget";
import { CartProvider } from "@/components/CartProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import type { Lang } from "@/context/LanguageContext";

const VALID_LANGS = ["pt", "pt-pt", "en", "en-gb", "es", "fr", "de", "it", "zh", "ja", "ko", "sv", "fi", "ru", "ro", "he"];

export const metadata: Metadata = {
  title: "Acquafy — Purificadores de Água",
  description: "Acquafy — tecnologia e qualidade em purificadores de água para sua família e seu negócio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("acquafy-lang")?.value;
  const initialLang: Lang = raw && VALID_LANGS.includes(raw) ? (raw as Lang) : "pt";

  return (
    <html lang="pt-BR">
      <body className="bg-white pt-[80px]">
        <LanguageProvider initialLang={initialLang}>
          <CartProvider>
            <ChatProvider>{children}</ChatProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
