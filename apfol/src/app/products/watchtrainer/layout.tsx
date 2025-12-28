import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WatchTrainer - Pokeball Apple Watch Charger | Apfol",
  description:
    "The WatchTrainer is a premium Pokeball-inspired Apple Watch charger. MagSafe compatible, fast wireless charging, and stunning design. Perfect for Pokemon fans and Apple enthusiasts.",
  keywords: [
    "Pokeball charger",
    "Apple Watch charger",
    "WatchTrainer",
    "Pokemon charger",
    "MagSafe charger",
    "wireless charger",
  ],
  openGraph: {
    title: "WatchTrainer - Pokeball Apple Watch Charger",
    description:
      "The ultimate fusion of nostalgia and technology. A Pokeball-inspired Apple Watch charger.",
    url: "https://apfol.com/products/watchtrainer",
    siteName: "Apfol",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WatchTrainer - Pokeball Apple Watch Charger",
    description:
      "The ultimate fusion of nostalgia and technology. A Pokeball-inspired Apple Watch charger.",
  },
};

export default function WatchTrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
