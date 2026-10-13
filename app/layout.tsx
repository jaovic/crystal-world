import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://crystalworldturismo.com.br"),
  title: {
    default: "Crystal World Turismo | Pacotes e viagens personalizadas",
    template: "%s | Crystal World Turismo",
  },
  description:
    "Pacotes nacionais e internacionais, experiências e viagens personalizadas com acompanhamento em cada etapa. Agência de turismo em Belo Horizonte.",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Crystal World Turismo" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${body.variable} ${heading.variable}`}>
      <body>{children}</body>
    </html>
  );
}
