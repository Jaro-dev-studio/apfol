"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/products/watchintosh", label: "Shop Watchintosh", scrollToTop: true },
  { href: "/about", label: "About", scrollToTop: false },
];

// Pages that use light mode
const lightModePages = ["/", "/about", "/cart", "/products/watchintosh"];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isLight = lightModePages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? isLight
              ? "bg-[#f5f0e8] border-b border-[#d4cdc0]"
              : "bg-black border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1200px] px-6 py-4">
          <div className="flex h-10 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link
                href="/"
                className={`flex items-end gap-2 transition-opacity hover:opacity-80 ${
                  isLight ? "text-[#1d1d1f]" : "text-white"
                }`}
              >
                <Image
                  src="/logo.png"
                  alt="APFOL"
                  width={32}
                  height={32}
                  className={`h-8 w-auto -translate-y-0.5 ${isLight ? "" : "invert"}`}
                  priority
                />
                <span className="text-2xl font-semibold tracking-[0.15em] leading-none font-[family-name:var(--font-logo)]">
                  APFOL
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden md:flex items-center gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      if (link.scrollToTop) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`text-sm transition-colors ${
                      isLight
                        ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${
                  isLight
                    ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed inset-y-0 left-0 right-0 z-50 md:hidden ${
                isLight
                  ? "bg-[#f5f0e8]"
                  : "bg-black"
              }`}
            >
              <div className="flex flex-col h-full p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex justify-between items-center mb-12"
                >
                  <div className={`flex items-end gap-2 ${isLight ? "text-[#1d1d1f]" : "text-white"}`}>
                    <Image
                      src="/logo.png"
                      alt="APFOL"
                      width={32}
                      height={32}
                      className={`h-8 w-auto -translate-y-0.5 ${isLight ? "" : "invert"}`}
                    />
                    <span className="text-2xl font-semibold tracking-[0.15em] leading-none font-[family-name:var(--font-logo)]">
                      APFOL
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full transition-colors ${
                      isLight
                        ? "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </motion.div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setIsOpen(false);
                          if (link.scrollToTop) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className={`block text-4xl font-medium py-3 transition-all ${
                          pathname === link.href
                            ? isLight
                              ? "text-[#1d1d1f]"
                              : "text-white"
                            : isLight
                              ? "text-[#1d1d1f]/50 hover:text-[#1d1d1f] hover:translate-x-2"
                              : "text-white/50 hover:text-white hover:translate-x-2"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-auto space-y-4"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="lg"
                      className={`w-full h-14 rounded-full text-lg font-medium ${
                        isLight
                          ? "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90"
                          : "bg-white text-black hover:bg-white/90"
                      }`}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <Link href="/products/watchintosh">Shop Now</Link>
                    </Button>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.3 }}
                    className={`text-center text-sm pt-4 ${
                      isLight ? "text-[#1d1d1f]/40" : "text-white/40"
                    }`}
                  >
                    Free shipping worldwide
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
