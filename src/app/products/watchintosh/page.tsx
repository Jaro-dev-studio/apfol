"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Check,
  Star,
  Package,
  Minus,
  Plus,
  Loader2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createDirectCheckout, getShopifyCheckoutUrl } from "@/lib/shopify";
import { motion } from "framer-motion";

// Product images - 3D model will be last
const productImages = [
  { type: "image" as const, src: "/watchintosh/1.png", alt: "Watchintosh front view", label: "" },
  { type: "image" as const, src: "/watchintosh/2.png", alt: "Watchintosh angle view", label: "" },
  { type: "3d" as const, src: "/models/SCENE.glb", alt: "Interactive 3D Demo", label: "3D" },
];

const ScrollRotate3DModel = dynamic(
  () => import("@/components/ScrollRotate3DModel"),
  { ssr: false }
);

// Shopify variant ID for Watchintosh - replace with actual ID from your Shopify store
const WATCHINTOSH_VARIANT_ID = process.env.NEXT_PUBLIC_WATCHINTOSH_VARIANT_ID || "demo-variant-watchintosh";

const features = [
  {
    id: "precision",
    title: "3D Printed Precision",
    description:
      "Crafted with ASA, the toughest commercially available organic material, for an ultra-durable finish that captures every detail of the original Macintosh design.",
  },
  {
    id: "fit",
    title: "Universal Watch Fit",
    description:
      "Designed to accommodate all Apple Watch sizes from 38mm to 49mm, including the Ultra series.",
  },
  {
    id: "retro",
    title: "Authentic Retro Aesthetic",
    description:
      "Faithfully recreated in classic Macintosh beige, bringing 1984 nostalgia to your modern desk setup.",
  },
  {
    id: "angle",
    title: "Perfect Viewing Angle",
    description:
      "Ergonomically tilted display area positions your Apple Watch at the ideal angle for nightstand mode.",
  },
];

// Feature illustrations as components
const FeatureIllustration = ({ id }: { id: string }) => {
  switch (id) {
    case "precision":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* 3D printing layers animation */}
          <div className="relative w-24 h-28">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute left-0 right-0"
                style={{ bottom: `${i * 12}px` }}
              >
                <div 
                  className="h-3 rounded-sm mx-auto"
                  style={{ 
                    width: `${60 + Math.sin(i * 0.8) * 20}%`,
                    background: `linear-gradient(90deg, #d4cdc0 0%, #e8e0d0 50%, #d4cdc0 100%)`,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                />
              </motion.div>
            ))}
            {/* Nozzle */}
            <motion.div
              initial={{ y: -30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2"
            >
              <div className="w-4 h-6 bg-gradient-to-b from-[#666] to-[#444] rounded-b-full" />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-amber-400 mx-auto rounded-full"
              />
            </motion.div>
          </div>
        </div>
      );
    case "fit":
      return (
        <div className="relative w-full h-full flex items-center justify-center gap-3">
          {/* Different watch sizes */}
          {[38, 42, 45, 49].map((size, i) => (
            <motion.div
              key={size}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col items-center"
            >
              <div 
                className="rounded-lg bg-gradient-to-b from-[#1d1d1f] to-[#333] flex items-center justify-center"
                style={{ 
                  width: `${20 + i * 6}px`, 
                  height: `${24 + i * 7}px`,
                  borderRadius: size === 49 ? '6px' : '8px'
                }}
              >
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                />
              </div>
              <span className="text-[10px] text-[#1d1d1f]/40 mt-1">{size}mm</span>
            </motion.div>
          ))}
        </div>
      );
    case "retro":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Retro color palette with pixel aesthetic */}
          <div className="grid grid-cols-6 gap-1">
            {[
              '#f5f0e8', '#e8dfd0', '#d4cdc0', '#c5beb0', '#b0a898', '#968f80',
              '#f0e8d8', '#e0d8c8', '#d0c8b8', '#c0b8a8', '#a89888', '#887868',
              '#33ff33', '#00cc00', '#009900', '#006600', '#003300', '#001a00',
            ].map((color, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.03,
                  duration: 0.3,
                }}
                whileHover={{ scale: 1.2 }}
                className="w-5 h-5 rounded-sm cursor-pointer transition-transform"
                style={{ backgroundColor: color, boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.1)' }}
              />
            ))}
          </div>
        </div>
      );
    case "angle":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Angle visualization */}
          <div className="relative">
            {/* Base/desk line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-[#d4cdc0]" />
            
            {/* Mini Macintosh */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-16 h-20"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-lg border border-[#c5beb0]">
                <div className="absolute top-2 left-1.5 right-1.5 h-10 bg-[#1a1a1a] rounded-sm">
                  <div className="absolute inset-0.5 bg-[#0a1a0a] rounded-sm flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[#33ff33] text-[8px]"
                    >
                      12:00
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const specs = [
  { label: "Dimensions", value: "55mm x 48mm x 60mm" },
  { label: "Weight", value: "42g" },
  { label: "Material", value: "Premium ASA" },
  { label: "Finish", value: "Matte textured" },
  { label: "Color", value: "Classic Macintosh Beige" },
  { label: "Compatibility", value: "All Apple Watch models" },
];

// Helper function to format date relative to today
const formatRelativeDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const reviews = [
  {
    name: "David K.",
    rating: 5,
    text: "As someone who grew up with the original Mac, this brings such joy to my desk. The attention to detail is remarkable.",
    daysAgo: 1,
    verified: true,
  },
  {
    name: "Jessica L.",
    rating: 5,
    text: "My coworkers are obsessed with this little stand. It is the perfect conversation starter and actually really functional.",
    daysAgo: 3,
    verified: true,
  },
  {
    name: "Thomas B.",
    rating: 5,
    text: "The print quality exceeded my expectations. Fits my Apple Watch Ultra perfectly and looks adorable on my nightstand.",
    daysAgo: 5,
    verified: true,
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "Bought this as a gift for my husband who collects vintage Apple stuff. He absolutely loves it! The quality is outstanding.",
    daysAgo: 8,
    verified: true,
  },
  {
    name: "Michael R.",
    rating: 5,
    text: "Such a clever idea and beautifully executed. Makes charging my watch feel special every single time.",
    daysAgo: 12,
    verified: true,
  },
  {
    name: "Emily C.",
    rating: 5,
    text: "The perfect blend of nostalgia and functionality. Everyone who sees it on my desk asks where I got it!",
    daysAgo: 18,
    verified: true,
  },
  {
    name: "James W.",
    rating: 5,
    text: "Shipping was fast and the packaging was great. The stand itself is even better in person than in photos.",
    daysAgo: 25,
    verified: true,
  },
  {
    name: "Amanda P.",
    rating: 5,
    text: "I have the 41mm Watch and it fits perfectly. The nightstand mode looks so cute in the little Mac screen!",
    daysAgo: 32,
    verified: true,
  },
  {
    name: "Robert H.",
    rating: 5,
    text: "Incredible attention to detail. You can tell this was made by someone who truly appreciates Apple history.",
    daysAgo: 45,
    verified: true,
  },
];

const UNIT_PRICE = 79;
const ORIGINAL_PRICE = 119;
const BUNDLE_PRICE = 119; // 2 for $119

export default function WatchintoshProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update active index based on scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveImageIndex(Math.min(newIndex, productImages.length - 1));
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToImage = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const itemWidth = carousel.offsetWidth;
    carousel.scrollTo({ left: index * itemWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (activeImageIndex > 0) {
      scrollToImage(activeImageIndex - 1);
    }
  };

  const scrollNext = () => {
    if (activeImageIndex < productImages.length - 1) {
      scrollToImage(activeImageIndex + 1);
    }
  };

  // 2 for $119 pricing logic
  const calculatePrice = (qty: number) => {
    const bundles = Math.floor(qty / 2);
    const remainder = qty % 2;
    return bundles * BUNDLE_PRICE + remainder * UNIT_PRICE;
  };

  const calculateOriginalPrice = (qty: number) => {
    return qty * ORIGINAL_PRICE;
  };

  const currentPrice = calculatePrice(quantity);
  const strikethroughPrice = calculateOriginalPrice(quantity);
  const savings = strikethroughPrice - currentPrice;
  const savingsPercent = Math.round((savings / strikethroughPrice) * 100);

  const handleBuyNow = async () => {
    setIsBuying(true);
    try {
      // Try to create a direct checkout via Storefront API first
      const checkoutUrl = await createDirectCheckout(WATCHINTOSH_VARIANT_ID, quantity);
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }
      
      // Fallback to cart permalink format
      const fallbackUrl = getShopifyCheckoutUrl(WATCHINTOSH_VARIANT_ID, quantity);
      if (fallbackUrl !== "#") {
        window.location.href = fallbackUrl;
        return;
      }
      
      // If Shopify is not configured, show a message
      alert("Checkout requires Shopify to be configured. Please set up your Shopify credentials.");
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="bg-[#f5f0e8] text-[#1d1d1f] overflow-hidden">
      {/* Scroll content wrapper for 3D model rotation */}
      <div className="scroll-content pb-24 sm:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-8 md:pt-12">
        {/* Background */}
        <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-[#e8dfd0] via-[#f5f0e8] to-[#f5f0e8] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {/* Retro grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="order-1"
            >
              <div className="relative max-w-lg mx-auto lg:mx-0">
                {/* Main Carousel */}
                <div className="relative">
                  {/* Carousel Container */}
                  <div
                    ref={carouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-2xl bg-white/50 border border-[#d4cdc0]/50"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {productImages.map((item, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full aspect-square snap-center"
                      >
                        {item.type === "image" ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>
                        ) : (
                          <div 
                            className="relative w-full h-full"
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                          >
                            {/* Title for 3D Demo */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                              <span className="text-xs font-medium text-[#1d1d1f]/60 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#d4cdc0]/50">
                                Interactive 3D Demo
                              </span>
                            </div>
                            <ScrollRotate3DModel
                              modelPath={item.src}
                              scrollContainer=".scroll-content"
                              rotationRange={Math.PI * 2}
                              enableInteraction={true}
                              showHint={true}
                            />
                            {/* Ambient glow for 3D model */}
                            <div className="absolute top-1/4 left-1/4 right-1/4 h-1/2 bg-amber-500/10 blur-3xl rounded-full pointer-events-none z-0" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={scrollPrev}
                    disabled={activeImageIndex === 0}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#d4cdc0]/50 flex items-center justify-center transition-all ${
                      activeImageIndex === 0
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 hover:bg-white hover:scale-105"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 text-[#1d1d1f]" />
                  </button>
                  <button
                    onClick={scrollNext}
                    disabled={activeImageIndex === productImages.length - 1}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#d4cdc0]/50 flex items-center justify-center transition-all ${
                      activeImageIndex === productImages.length - 1
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 hover:bg-white hover:scale-105"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5 text-[#1d1d1f]" />
                  </button>
                </div>

                {/* Thumbnail Previews */}
                <div className="flex gap-2 mt-3 justify-center lg:justify-start">
                  {productImages.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToImage(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === index
                          ? "border-[#1d1d1f] ring-1 ring-[#1d1d1f]/20"
                          : "border-[#d4cdc0]/50 hover:border-[#1d1d1f]/50"
                      }`}
                    >
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#e8e0d0] to-[#d4cdc0] flex items-center justify-center">
                          <div className="text-[10px] font-medium text-[#1d1d1f]/60 text-center leading-tight">
                            3D
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="order-2">
              <motion.a
                href="#reviews"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-[#1d1d1f]/60 underline-offset-2 hover:underline">4.9 (2,847 reviews)</span>
              </motion.a>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 text-[#1d1d1f]"
              >
                Watchintosh<sup className="text-xl md:text-2xl lg:text-3xl align-super">®</sup>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="text-xl md:text-2xl text-[#1d1d1f]/60 mb-6"
              >
                The Dream Apple Watch Charging Dock
              </motion.p>

              {/* Compelling Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="mb-6 space-y-3"
              >
                <p className="text-[#1d1d1f]/80 leading-relaxed">
                  <span className="font-semibold text-[#1d1d1f]">Your Apple Watch deserves better than to lie flat on your desk.</span>{" "}
                  Right now it is sliding around, getting scratched, 
                  one nudge away from crashing onto the floor.
                </p>
                <p className="text-[#1d1d1f]/70 leading-relaxed">
                  The Watchintosh is a <b>replica of the first Mac ever made</b>, the Macintosh 128k, precision-crafted to charge your Apple Watch while making it look like the tiny computer it really is.
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#1d1d1f]/60 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Fits ALL Apple Watch sizes (38mm-49mm Ultra)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Perfect nightstand angle
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="flex flex-col gap-2 mb-4 sm:mb-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-semibold text-[#1d1d1f]">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-[#1d1d1f]/40 line-through">${strikethroughPrice.toFixed(2)}</span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save ${savings} ({savingsPercent}%)</span>
                </div>
                <p className="text-sm text-[#1d1d1f]/60">
                  <span className="text-green-600">&#10003;</span> Free worldwide shipping · <span className="text-green-600">&#10003;</span> 30-day returns
                </p>
              </motion.div>

              {/* Mobile 2 for $119 - shown only on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="mb-6 sm:hidden"
              >
                <div className="p-4 rounded-2xl border-2 border-green-400 bg-green-50 w-full">
                  <div className="mb-2">
                    <span className="text-xl font-bold text-green-700">2 for $119</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-700/80">Save $39 when you buy 2</p>
                    {quantity < 2 && (
                      <Button
                        size="sm"
                        className="h-8 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-full px-4"
                        onClick={() => setQuantity(2)}
                      >
                        Apply Discount
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Desktop product actions - hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="space-y-4 hidden sm:block"
              >
                {/* Quantity selector and offer */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[#1d1d1f]/60">Quantity</span>
                  <div className="flex items-center gap-2 bg-[#1d1d1f]/5 rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-[#1d1d1f]/10 text-[#1d1d1f]"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-[#1d1d1f]/10 text-[#1d1d1f]"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* 2 for $119 */}
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl border-2 border-green-400 bg-green-50">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-green-700">2 for $119</span>
                      <span className="text-xs text-green-700/70">Save $39 when you buy 2</span>
                    </div>
                    {quantity < 2 && (
                      <Button
                        size="sm"
                        className="h-7 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-full px-3 ml-auto"
                        onClick={() => setQuantity(2)}
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>

                {/* Buy Now */}
                <Button
                  size="lg"
                  className="w-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-8 text-base font-medium"
                  onClick={handleBuyNow}
                  disabled={isBuying}
                >
                  {isBuying ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-5 w-5" />
                  )}
                  Buy Now - ${currentPrice.toFixed(2)}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#eee8dc] to-[#f5f0e8]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6 border border-amber-200"
            >
              Why Watchintosh?
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-[#1d1d1f]">
              Crafted with Care
            </h2>
            <p className="text-lg md:text-xl text-[#1d1d1f]/60 max-w-2xl mx-auto">
              Every Watchintosh is precision printed and hand-finished for that
              authentic vintage feel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full rounded-[2rem] bg-white/80 backdrop-blur-sm border border-[#d4cdc0]/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-amber-900/5 hover:border-amber-200/50">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-100/0 group-hover:from-amber-50/50 group-hover:to-amber-100/30 transition-all duration-500" />
                  
                  {/* Illustration area */}
                  <div className="relative h-40 md:h-48 border-b border-[#e8e0d0] bg-gradient-to-b from-[#faf8f4] to-white/50 overflow-hidden">
                    {/* Decorative grid */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #d4cdc0 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }}
                    />
                    <FeatureIllustration id={feature.id} />
                  </div>
                  
                  {/* Content area */}
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20"
                      >
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#1d1d1f] group-hover:text-amber-900 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-[#1d1d1f]/60 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#f5f0e8] to-[#eee8dc]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Technical Specifications
            </h2>
          </div>

          <div className="divide-y divide-[#d4cdc0]">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className="flex justify-between items-center py-5"
              >
                <span className="text-[#1d1d1f]/60">{spec.label}</span>
                <span className="font-medium text-[#1d1d1f]">{spec.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-white/70 border border-[#d4cdc0]">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-[#1d1d1f]/60 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2 text-[#1d1d1f]">
                  Whats in the Box
                </h4>
                <ul className="text-[#1d1d1f]/60 space-y-1">
                  <li>1x Watchintosh Charging Dock with built-in Apple Watch Magnetic Charger, USB-C port.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative py-32 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] to-[#eee8dc]" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-[#1d1d1f]">
              Loved by Apple Fans
            </h2>
            
            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
              {/* Star rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-2xl font-semibold text-[#1d1d1f]">4.9</span>
              </div>
              
              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-[#d4cdc0]" />
              
              {/* Review count */}
              <div className="text-center">
                <span className="text-2xl font-semibold text-[#1d1d1f]">2,847+</span>
                <span className="text-[#1d1d1f]/60 ml-2">5-star reviews</span>
              </div>
              
              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-[#d4cdc0]" />
              
              {/* Happy customers */}
              <div className="text-center">
                <span className="text-2xl font-semibold text-[#1d1d1f]">10,000+</span>
                <span className="text-[#1d1d1f]/60 ml-2">happy customers</span>
              </div>
            </div>
            
            <p className="text-[#1d1d1f]/60 max-w-xl mx-auto">
              Join thousands of Apple enthusiasts who have brought a piece of computing history to their desks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#d4cdc0]/50 hover:border-amber-200/50 hover:shadow-lg hover:shadow-amber-900/5 transition-all duration-300"
              >
                {/* Header with stars and verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                {/* Review text */}
                <p className="text-[#1d1d1f]/80 mb-4 leading-relaxed text-sm md:text-base">
                  &ldquo;{review.text}&rdquo;
                </p>
                
                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-[#e8e0d0]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-amber-800 font-semibold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <span className="font-medium text-[#1d1d1f] text-sm">
                      {review.name}
                    </span>
                  </div>
                  <span className="text-xs text-[#1d1d1f]/40">
                    {formatRelativeDate(review.daysAgo)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* See all reviews link */}
          <div className="text-center mt-12">
            <p className="text-[#1d1d1f]/60 text-sm">
              Showing 9 of 2,847+ reviews
            </p>
          </div>
        </div>
      </section>

      </div>{/* End scroll-content */}

      {/* Mobile sticky bottom bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#f5f0e8]/95 backdrop-blur-lg border-t border-[#d4cdc0] p-4 pb-8 sm:hidden"
      >
        <div className="flex items-center gap-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-1 bg-[#1d1d1f]/5 rounded-full p-1">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-[#1d1d1f]/10 text-[#1d1d1f]"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.span
              key={quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="w-8 text-center font-medium"
            >
              {quantity}
            </motion.span>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-[#1d1d1f]/10 text-[#1d1d1f]"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Buy now button */}
          <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
            <Button
              size="lg"
              className="w-full h-12 bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full text-base font-medium"
              onClick={handleBuyNow}
              disabled={isBuying}
            >
              {isBuying ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5" />
              )}
              Buy Now - ${currentPrice.toFixed(2)}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

