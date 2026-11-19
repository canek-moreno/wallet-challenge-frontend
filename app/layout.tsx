import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { StoreProvider } from "@/presentation/providers/StoreProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "luma.",
  description: "luma. Tu dinero, tus planes y cada nuevo comienzo.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface text-ink">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
