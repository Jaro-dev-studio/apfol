import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apfol - Premium Apple Accessories",
  description: "Discover stunning custom gadgets designed exclusively for Apple users. Premium quality meets innovative design.",
  keywords: ["Apple accessories", "Apple Watch charger", "Pokeball charger", "WatchTrainer", "premium gadgets"],
  authors: [{ name: "Apfol" }],
  openGraph: {
    title: "Apfol - Premium Apple Accessories",
    description: "Discover stunning custom gadgets designed exclusively for Apple users.",
    url: "https://apfol.com",
    siteName: "Apfol",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
