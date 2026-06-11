import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/components/ChatWidget";

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
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
