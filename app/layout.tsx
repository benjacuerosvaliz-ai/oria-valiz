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

export const metadata: Metadata = {
  metadataBase: new URL("https://oria.valiz.cl"),
  title: {
    default: "ORIA — Vitrina editorial para maestros chilenos del cuero",
    template: "%s · ORIA",
  },
  description:
    "ORIA es un sello editorial que cada estación elige a un maestro chileno del cuero y le da vitrina, branding y alcance. Vol. 01: Marcelo Rojas.",
  openGraph: {
    title: "ORIA",
    description: "Vitrina editorial para maestros chilenos del cuero.",
    locale: "es_CL",
    type: "website",
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
