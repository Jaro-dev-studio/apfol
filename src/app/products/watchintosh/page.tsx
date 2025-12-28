"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Check,
  Star,
  Printer,
  Palette,
  Watch,
  Monitor,
  Package,
  Minus,
  Plus,
  Heart,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

gsap.registerPlugin(ScrollTrigger);

// Shopify variant ID for Watchintosh - replace with actual ID from your Shopify store
const WATCHINTOSH_VARIANT_ID = process.env.NEXT_PUBLIC_WATCHINTOSH_VARIANT_ID || "demo-variant-watchintosh";

const features = [
  {
    icon: Printer,
    title: "3D Printed Precision",
    description:
      "Crafted with high-quality PLA filament for a smooth, durable finish that captures every detail of the original Macintosh design.",
  },
  {
    icon: Watch,
    title: "Universal Watch Fit",
    description:
      "Designed to accommodate all Apple Watch sizes from 38mm to 49mm, including the Ultra series.",
  },
  {
    icon: Palette,
    title: "Authentic Retro Aesthetic",
    description:
      "Faithfully recreated in classic Macintosh beige, bringing 1984 nostalgia to your modern desk setup.",
  },
  {
    icon: Monitor,
    title: "Perfect Viewing Angle",
    description:
      "Ergonomically tilted display area positions your Apple Watch at the ideal angle for nightstand mode.",
  },
];

const specs = [
  { label: "Dimensions", value: "55mm x 48mm x 60mm" },
  { label: "Weight", value: "42g" },
  { label: "Material", value: "Premium PLA" },
  { label: "Finish", value: "Matte textured" },
  { label: "Color", value: "Classic Macintosh Beige" },
  { label: "Compatibility", value: "All Apple Watch models" },
];

const reviews = [
  {
    name: "David K.",
    rating: 5,
    text: "As someone who grew up with the original Mac, this brings such joy to my desk. The attention to detail is remarkable.",
    date: "Dec 20, 2024",
  },
  {
    name: "Jessica L.",
    rating: 5,
    text: "My coworkers are obsessed with this little stand. It is the perfect conversation starter and actually really functional.",
    date: "Dec 18, 2024",
  },
  {
    name: "Thomas B.",
    rating: 5,
    text: "The print quality exceeded my expectations. Fits my Apple Watch Ultra perfectly and looks adorable on my nightstand.",
    date: "Dec 12, 2024",
  },
];

export default function WatchintoshPage() {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const productShowcaseRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(WATCHINTOSH_VARIANT_ID, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(WATCHINTOSH_VARIANT_ID, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline();

      heroTl
        .from(".product-badge", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".product-title",
          {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".product-subtitle",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".product-price",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".product-actions",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Hero product image
      gsap.from(".hero-product-image", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Product showcase section
      const showcaseTl = gsap.timeline({
        scrollTrigger: {
          trigger: productShowcaseRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
      });

      showcaseTl
        .from(".showcase-title", {
          y: 100,
          opacity: 0,
        })
        .from(
          ".showcase-description",
          {
            y: 80,
            opacity: 0,
          },
          "-=0.5"
        )
        .from(
          ".showcase-image",
          {
            scale: 0.8,
            opacity: 0,
          },
          "-=0.5"
        );

      // Features section
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // How it works section
      const steps = gsap.utils.toArray(".how-step");
      steps.forEach((step, i) => {
        gsap.from(step as Element, {
          scrollTrigger: {
            trigger: step as Element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Specs section
      gsap.from(".spec-row", {
        scrollTrigger: {
          trigger: specsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Reviews section
      gsap.from(".review-card", {
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Parallax background
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
      });

      // Floating elements
      gsap.to(".float-element", {
        y: -15,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // CRT flicker effect
      gsap.to(".crt-flicker", {
        opacity: 0.9,
        duration: 0.05,
        ease: "none",
        yoyo: true,
        repeat: -1,
        repeatDelay: 3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f5f0e8] text-[#1d1d1f] overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-6 pt-20"
      >
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
            {/* Product Info */}
            <div className="order-2 lg:order-1">
              <Badge className="product-badge bg-amber-600/10 text-amber-700 border-amber-600/20 mb-6">
                Retro Revival
              </Badge>

              <h1 className="product-title text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
                Watchintosh
              </h1>

              <p className="product-subtitle text-xl md:text-2xl text-[#1d1d1f]/60 mb-8">
                The Macintosh Apple Watch Stand
              </p>

              <div className="product-price flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-semibold text-[#1d1d1f]">
                  $29.99
                </span>
                <span className="text-lg text-[#1d1d1f]/40 line-through">
                  $39.99
                </span>
                <Badge className="bg-green-600/10 text-green-700 border-green-600/20">
                  Save 25%
                </Badge>
              </div>

              <div className="product-actions space-y-4">
                {/* Quantity selector */}
                <div className="flex items-center gap-4">
                  <span className="text-[#1d1d1f]/60">Quantity</span>
                  <div className="flex items-center gap-2 bg-[#1d1d1f]/5 rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-[#1d1d1f]/10 text-[#1d1d1f]"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-[#1d1d1f]/10 text-[#1d1d1f]"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-8 text-base font-medium"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <ShoppingBag className="mr-2 h-5 w-5" />
                    )}
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-[#1d1d1f]/30 text-[#1d1d1f] hover:bg-[#1d1d1f]/5 rounded-full px-8"
                    onClick={handleBuyNow}
                    disabled={isAddingToCart}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 text-sm text-[#1d1d1f]/60">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Free Shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Handcrafted
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Premium Quality
                  </div>
                </div>
              </div>
            </div>

            {/* Product Image - Macintosh Illustration */}
            <div className="order-1 lg:order-2 hero-product-image">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main Macintosh */}
                <div className="float-element absolute inset-8">
                  {/* Mac Body */}
                  <div className="relative w-full h-full">
                    {/* Main housing */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-2xl border border-[#c5beb0] shadow-2xl shadow-amber-900/20">
                      {/* Top ventilation lines */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-0.5 bg-[#a8a090] rounded-full"
                          />
                        ))}
                      </div>

                      {/* Screen bezel */}
                      <div className="absolute top-8 left-4 right-4 h-[55%] bg-[#d0c8b8] rounded-lg p-2 shadow-inner">
                        {/* CRT Screen */}
                        <div className="relative w-full h-full bg-[#1a1a1a] rounded overflow-hidden border border-[#0a0a0a]">
                          {/* Screen content - simulated watch display */}
                          <div className="crt-flicker absolute inset-0 bg-gradient-to-br from-[#0a1a0a] to-[#001100]">
                            {/* Phosphor glow */}
                            <div className="absolute inset-2 flex flex-col items-center justify-center text-[#33ff33]">
                              <div className="text-2xl md:text-3xl font-mono font-bold tracking-wider">
                                15:24
                              </div>
                              <div className="text-xs md:text-sm font-mono opacity-70 mt-1">
                                SUNDAY 28
                              </div>
                            </div>
                            {/* CRT scan lines */}
                            <div
                              className="absolute inset-0 opacity-10 pointer-events-none"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)",
                              }}
                            />
                            {/* Screen curvature effect */}
                            <div className="absolute inset-0 rounded bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Apple logo area */}
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                        <div className="text-[#a8a090] text-xs font-semibold tracking-widest">
                          Watchintosh
                        </div>
                      </div>

                      {/* Floppy drive slot */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-[#a8a090] rounded-full shadow-inner" />
                    </div>

                    {/* Base/Stand */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-gradient-to-b from-[#d4cdc0] to-[#c5beb0] rounded-b-xl border border-t-0 border-[#b5ae a0] shadow-lg" />
                  </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute top-1/4 left-1/4 right-1/4 h-1/2 bg-[#33ff33]/10 blur-3xl rounded-full" />
                <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section ref={productShowcaseRef} className="relative py-32 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="showcase-title text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-[#1d1d1f]">
            Hello Again.
          </h2>
          <p className="showcase-description text-xl md:text-2xl text-[#1d1d1f]/60 max-w-3xl mx-auto mb-16">
            A tribute to the computer that started it all. The Watchintosh
            transforms your Apple Watch into a tiny piece of computing history.
          </p>

          <div className="showcase-image relative max-w-sm mx-auto">
            {/* Showcase Macintosh */}
            <div className="relative aspect-[4/5]">
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 blur-xl rounded-full" />

              {/* Mac illustration */}
              <div className="relative w-full h-full">
                <div className="absolute inset-4 bg-gradient-to-b from-[#f0e8d8] to-[#e0d8c8] rounded-2xl border border-[#d0c8b8] shadow-xl">
                  {/* Screen area */}
                  <div className="absolute top-6 left-4 right-4 h-[60%] bg-[#c8c0b0] rounded-lg p-2">
                    <div className="w-full h-full bg-[#0a0a0a] rounded overflow-hidden relative">
                      {/* Simulated happy mac icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[#33ff33] opacity-80">
                          <svg
                            viewBox="0 0 48 48"
                            className="w-16 h-16"
                            fill="currentColor"
                          >
                            <rect
                              x="8"
                              y="4"
                              width="32"
                              height="36"
                              rx="2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <rect x="12" y="8" width="24" height="18" rx="1" />
                            <circle cx="18" cy="14" r="2" fill="#0a0a0a" />
                            <circle cx="30" cy="14" r="2" fill="#0a0a0a" />
                            <path
                              d="M18 20 Q24 24 30 20"
                              fill="none"
                              stroke="#0a0a0a"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                      {/* Scan lines */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                        }}
                      />
                    </div>
                  </div>
                  {/* Logo text */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#a8a090] text-xs font-medium tracking-wider">
                    Watchintosh
                  </div>
                  {/* Drive slot */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#b8b0a0] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        ref={featuresRef}
        className="relative py-32 px-6 bg-gradient-to-b from-[#f5f0e8] to-[#eee8dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Crafted with Care
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
              Every Watchintosh is precision printed and hand-finished for that
              authentic vintage feel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item group relative p-8 rounded-3xl bg-white/70 border border-[#d4cdc0] hover:bg-white hover:border-[#c5beb0] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-amber-300/50">
                    <feature.icon className="w-7 h-7 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1d1d1f]">
                      {feature.title}
                    </h3>
                    <p className="text-[#1d1d1f]/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="relative py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Simple Setup
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
              Get your mini Macintosh up and running in seconds.
            </p>
          </div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Insert Your Charger",
                description:
                  "Slide your existing Apple Watch magnetic charging cable through the back opening. The Watchintosh is designed to work with your official Apple charger.",
                align: "left",
              },
              {
                step: "02",
                title: "Position the Cable",
                description:
                  "Route the cable through the integrated channel. The charger puck sits perfectly centered in the screen cutout.",
                align: "right",
              },
              {
                step: "03",
                title: "Dock Your Watch",
                description:
                  "Place your Apple Watch on the charger. It magnetically snaps into place and activates Nightstand mode automatically.",
                align: "left",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`how-step flex flex-col ${
                  item.align === "right" ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="max-w-md mx-auto md:mx-0">
                    <span className="text-6xl md:text-8xl font-bold text-[#1d1d1f]/10">
                      {item.step}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 -mt-4 text-[#1d1d1f]">
                      {item.title}
                    </h3>
                    <p className="text-lg text-[#1d1d1f]/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
                    {/* Step illustration */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f0e8d8] to-[#e0d8c8] border border-[#d0c8b8] flex items-center justify-center shadow-lg">
                      <div className="w-20 h-24 md:w-24 md:h-28 relative">
                        {/* Mini mac */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-lg border border-[#c5beb0]">
                          <div className="absolute top-2 left-2 right-2 h-1/2 bg-[#1a1a1a] rounded-sm">
                            <div className="absolute inset-0.5 bg-[#0a1a0a] rounded-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-[#33ff33] rounded-full opacity-70 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section
        ref={specsRef}
        className="relative py-32 px-6 bg-gradient-to-b from-[#f5f0e8] to-[#eee8dc]"
      >
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Technical Specifications
            </h2>
          </div>

          <div className="divide-y divide-[#d4cdc0]">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="spec-row flex justify-between items-center py-5"
              >
                <span className="text-[#1d1d1f]/60">{spec.label}</span>
                <span className="font-medium text-[#1d1d1f]">{spec.value}</span>
              </div>
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
                  <li>1x Watchintosh Stand</li>
                  <li>1x Setup Guide</li>
                  <li>1x Microfiber Cleaning Cloth</li>
                </ul>
                <p className="text-sm text-[#1d1d1f]/40 mt-3 italic">
                  Note: Apple Watch charger not included. Uses your existing
                  Apple charging cable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section ref={reviewsRef} className="relative py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Loved by Mac Fans
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-2 text-lg text-[#1d1d1f]">4.9 out of 5</span>
            </div>
            <p className="text-[#1d1d1f]/60">Based on 847 reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="review-card p-8 rounded-3xl bg-white/70 border border-[#d4cdc0] shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-[#1d1d1f]/80 mb-6 leading-relaxed">
                  {review.text}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1d1d1f]">
                    {review.name}
                  </span>
                  <span className="text-sm text-[#1d1d1f]/40">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#eee8dc] to-[#e8e0d0]">
        <div className="max-w-[800px] mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-amber-600" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-[#1d1d1f]">
            Think Differently.
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 mb-8 max-w-xl mx-auto">
            Join thousands of Apple enthusiasts who have added a touch of
            vintage charm to their desk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-10 text-base font-medium"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ShoppingBag className="mr-2 h-5 w-5" />
              )}
              Add to Cart - $29.99
            </Button>
          </div>
          <p className="mt-6 text-sm text-[#1d1d1f]/40">
            Free shipping worldwide. Handcrafted with love.
          </p>
        </div>
      </section>
    </div>
  );
}

