import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  products: [
    { href: "/products/watchtrainer", label: "WatchTrainer" },
    { href: "#", label: "Accessories" },
    { href: "#", label: "New Arrivals" },
  ],
  support: [
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Shipping" },
    { href: "#", label: "Returns" },
    { href: "#", label: "FAQ" },
  ],
  company: [
    { href: "#about", label: "About" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white/60">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-semibold text-white hover:opacity-80 transition-opacity"
            >
              apfol
            </Link>
          </div>
          <p className="text-xs text-center md:text-right">
            Copyright 2024 Apfol Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
