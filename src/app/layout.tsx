import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Watchintosh - Retro Mac Apple Watch Stand | APFOL",
  description: "The Watchintosh is a beautifully crafted Apple Watch stand inspired by the iconic Macintosh 128K. Transform your Apple Watch into a tiny retro computer on your desk.",
  keywords: ["Watchintosh", "Apple Watch stand", "Macintosh stand", "retro Apple Watch dock", "vintage Mac stand", "Apple Watch charging stand", "3D printed Apple Watch stand"],
  authors: [{ name: "APFOL" }],
  openGraph: {
    title: "Watchintosh - Retro Mac Apple Watch Stand",
    description: "Transform your Apple Watch into a tiny Macintosh. A nostalgic charging stand for the modern age.",
    url: "https://apfol.com",
    siteName: "APFOL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <CartProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
