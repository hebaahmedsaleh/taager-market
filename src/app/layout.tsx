"use client";

import { Geist, Geist_Mono } from "next/font/google";

import { CartProvider } from "@/app/context/CartContext";
import CartDrawer from "@/app/components/CartDrawer";

import "./globals.css";
import Link from "next/link";
import { COMMON } from "./constants/product";
import { CONFIG } from "./constants";
import CartButton from "./components/ui/CartButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {/* Header */}
          <header className="fixed top-0 w-full h-16 bg-blue-600 text-white flex items-center px-4 shadow z-10">
            <Link href="/" className="px-6 py-2 hover:text-blue-950 transition">
              <h1 className="text-lg font-semibold">{CONFIG.APP_NAME}</h1>
            </Link>

            <CartButton />
          </header>
          <div className="h-16" />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Main Content */}
          <main
            id="main-content"
            className="flex-1 px-4 py-6 bg-gray-50 overflow-y-auto"
          >
            {children}
          </main>
          <div className="h-14" />

          {/* Footer */}
          <footer className="fixed bottom-0 w-full h-14 bg-blue-600 text-white flex items-center justify-center shadow z-10">
            <p>{COMMON.COPY_RIGHT}</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
