import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/components/ChatWidget";
import { CartProvider } from "@/components/CartProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Acquafy — Purificadores de Água",
  description: "Acquafy — tecnologia e qualidade em purificadores de água para sua família e seu negócio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-white pt-[80px]">
        <LanguageProvider>
          <CartProvider>
            <ChatProvider>{children}</ChatProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
