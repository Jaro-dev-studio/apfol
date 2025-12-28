import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchintosh - Retro Mac Apple Watch Stand | Apfol",
  description:
    "The Watchintosh is a beautifully crafted Apple Watch stand inspired by the iconic Macintosh 128K. Transform your Apple Watch into a tiny retro computer on your desk.",
  keywords: [
    "Watchintosh",
    "Apple Watch stand",
    "Macintosh stand",
    "retro Apple Watch dock",
    "vintage Mac stand",
    "Apple Watch charging stand",
    "3D printed Apple Watch stand",
  ],
  openGraph: {
    title: "Watchintosh - Retro Mac Apple Watch Stand",
    description:
      "Transform your Apple Watch into a tiny Macintosh. A nostalgic charging stand for the modern age.",
    url: "https://apfol.com/products/watchintosh",
    siteName: "Apfol",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watchintosh - Retro Mac Apple Watch Stand",
    description:
      "Transform your Apple Watch into a tiny Macintosh. A nostalgic charging stand for the modern age.",
  },
};

export default function WatchintoshLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

