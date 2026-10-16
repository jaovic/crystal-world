import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
