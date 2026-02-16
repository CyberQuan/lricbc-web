import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";

const nunito = Nunito({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LRICBC - 小石城以馬內利華語浸信會",
  description: "Welcome to Little Rock Immanuel Chinese Baptist Church",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
