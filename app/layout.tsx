import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { TopStrip } from "@/components/TopStrip";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Dominio canónico. oria-valiz.vercel.app sigue funcionando como alias.
const SITE_URL = "https://oria.valiz.cl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ORIA — Donde el cuero se firma con nombre",
    template: "%s · ORIA",
  },
  description:
    "Carteras, mochilas y accesorios hechos a mano por maestros chilenos. Una pieza, un autor.",
  openGraph: {
    title: "ORIA — Donde el cuero se firma con nombre",
    description:
      "Carteras, mochilas y accesorios hechos a mano por maestros chilenos. Una pieza, un autor.",
    locale: "es_CL",
    type: "website",
    siteName: "ORIA",
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ORIA — Donde el cuero se firma con nombre",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORIA — Donde el cuero se firma con nombre",
    description:
      "Carteras, mochilas y accesorios hechos a mano por maestros chilenos. Una pieza, un autor.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-papel text-tinta">
        <TopStrip />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
