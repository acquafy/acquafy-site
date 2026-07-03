import type { Metadata } from "next";
import "./globals.css";
import { cookies, headers } from "next/headers";
import { ChatProvider } from "@/components/ChatWidget";
import { CartProvider } from "@/components/CartProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import type { Lang } from "@/context/LanguageContext";

const VALID_LANGS = ["pt", "pt-pt", "en", "en-gb", "es", "fr", "de", "it", "zh", "ja", "ko", "sv", "fi", "ru", "ro", "he"];

const HTML_LANG: Record<Lang, string> = {
  pt: "pt-BR", "pt-pt": "pt-PT", en: "en", "en-gb": "en-GB", es: "es", fr: "fr",
  de: "de", it: "it", zh: "zh", ja: "ja", ko: "ko", sv: "sv", fi: "fi", ru: "ru", ro: "ro", he: "he",
};

/** Best-effort language from the Accept-Language header (no cookie yet). */
function langFromAcceptHeader(acceptLanguage: string | null): Lang {
  const first = acceptLanguage?.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first === "pt-pt" || first === "pt-mz" || first === "pt-ao") return "pt-pt";
  if (first.startsWith("pt")) return "pt";
  if (first.startsWith("es")) return "es";
  if (first.startsWith("fr")) return "fr";
  if (first.startsWith("de")) return "de";
  if (first.startsWith("it")) return "it";
  if (first.startsWith("zh")) return "zh";
  if (first.startsWith("ja")) return "ja";
  if (first.startsWith("ko")) return "ko";
  return "en";
}

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

  let initialLang: Lang;
  if (raw && VALID_LANGS.includes(raw)) {
    initialLang = raw as Lang;
  } else {
    // No saved preference yet: acquafy.com.br always opens in Portuguese;
    // acquafy.com (and any other host) falls back to the visitor's Accept-Language.
    const headerStore = await headers();
    const host = headerStore.get("host") ?? "";
    initialLang = host.includes("acquafy.com.br")
      ? "pt"
      : langFromAcceptHeader(headerStore.get("accept-language"));
  }

  return (
    <html lang={HTML_LANG[initialLang]}>
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
