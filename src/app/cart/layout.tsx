import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Apfol",
  description: "Review your cart and checkout securely with Shopify.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

