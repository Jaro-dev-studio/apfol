import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Apfol - Premium Apple Accessories",
  description:
    "Learn about Apfol, the team behind premium Apple accessories like WatchTrainer and Watchintosh. Our mission is to create products that spark joy.",
  openGraph: {
    title: "About Us | Apfol",
    description:
      "Learn about Apfol, the team behind premium Apple accessories.",
    url: "https://apfol.com/about",
    siteName: "Apfol",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




