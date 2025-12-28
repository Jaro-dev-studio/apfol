"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products/watchtrainer", label: "WatchTrainer" },
  { href: "/products/watchintosh", label: "Watchintosh" },
  { href: "/#products", label: "Products" },
  { href: "/about", label: "About" },
];

// Pages that use light mode
const lightModePages = ["/products/watchintosh"];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cart, openCart } = useCart();

  const isLight = lightModePages.includes(pathname);
  const itemCount = cart?.lineItemCount || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? "glass border-b border-[#d4cdc0]"
            : "glass-dark border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-semibold tracking-tight transition-opacity hover:opacity-80 ${
              isLight ? "text-[#1d1d1f]" : "text-white"
            }`}
          >
            apfol
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isLight
                    ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`relative ${
                isLight
                  ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    isLight
                      ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={
                  isLight
                    ? "w-full bg-[#f5f0e8] border-l border-[#d4cdc0]"
                    : "w-full bg-black border-l border-white/10"
                }
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <span
                      className={`text-xl font-semibold ${
                        isLight ? "text-[#1d1d1f]" : "text-white"
                      }`}
                    >
                      apfol
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className={
                        isLight
                          ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-2xl font-medium transition-colors py-2 ${
                          isLight
                            ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f]"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto space-y-3">
                    <Button
                      asChild
                      className={`w-full rounded-full ${
                        isLight
                          ? "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90"
                          : "bg-white text-black hover:bg-white/90"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/#products">Shop Now</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className={`w-full rounded-full ${
                        isLight
                          ? "border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f]/5"
                          : "border-white/20 text-white hover:bg-white/5"
                      }`}
                      onClick={() => {
                        setIsOpen(false);
                        openCart();
                      }}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      View Cart {itemCount > 0 && `(${itemCount})`}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
