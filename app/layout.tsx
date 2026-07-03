import type { Metadata } from "next";
import Script from "next/script";
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

  const snipcartKey = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;

  return (
    <html lang="pt-BR">
      <head>
        {snipcartKey && (
          <>
            <link rel="preconnect" href="https://app.snipcart.com" />
            <link rel="preconnect" href="https://cdn.snipcart.com" />
            <link
              rel="stylesheet"
              href="https://cdn.snipcart.com/themes/v3.7.4/default/snipcart.css"
            />
          </>
        )}
      </head>
      <body className="bg-white pt-[80px]">
        <LanguageProvider initialLang={initialLang}>
          <CartProvider>
            <ChatProvider>{children}</ChatProvider>
          </CartProvider>
        </LanguageProvider>

        {snipcartKey && (
          <>
            <div hidden id="snipcart" data-api-key={snipcartKey} />
            <Script
              src="https://cdn.snipcart.com/themes/v3.7.4/default/snipcart.js"
              strategy="afterInteractive"
            />
          </>
        )}
      </body>
    </html>
  );
}
