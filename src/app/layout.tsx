import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenuBadge from "@/components/FloatingMenuBadge";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Caserito | Sabor de casa en Maturín",
  description: "Un viaje de sabor hasta el corazón de Maturín. Arepas, café, ensaladas, cortes de carne y platos preparados con ese toque de casa.",
  keywords: ["El Caserito", "Restaurante Maturin", "Comida Venezolana", "Carnes Maturin", "Arepas Maturin"],
  authors: [{ name: "El Caserito" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-[#0B0B0B] text-[#FFF3DE] font-sans selection:bg-[#F97316] selection:text-[#0B0B0B]">
        <SmoothScroll>
          <TransitionProvider>
            <PageTransition />
            <FloatingMenuBadge />
            {children}
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
