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
  Zap,
  Shield,
  Sparkles,
  Battery,
  Smartphone,
  Package,
  Minus,
  Plus,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: "Fast Wireless Charging",
    description:
      "MagSafe-compatible technology delivers rapid charging speeds up to 15W.",
  },
  {
    icon: Shield,
    title: "Premium Build Quality",
    description:
      "Aerospace-grade aluminum construction with a soft-touch matte finish.",
  },
  {
    icon: Battery,
    title: "Smart LED Indicator",
    description:
      "Intuitive LED ring shows charging status at a glance. Red for charging, green for full.",
  },
  {
    icon: Smartphone,
    title: "Universal Compatibility",
    description:
      "Works with all Apple Watch models from Series 1 to Ultra 2 and beyond.",
  },
];

const specs = [
  { label: "Dimensions", value: "60mm diameter x 55mm height" },
  { label: "Weight", value: "85g" },
  { label: "Material", value: "Aerospace aluminum + ABS" },
  { label: "Cable Length", value: "1.5m USB-C" },
  { label: "Charging Speed", value: "Up to 15W" },
  { label: "Compatibility", value: "All Apple Watch models" },
];

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely love this charger! The Pokeball design is so fun and it charges my Apple Watch quickly.",
    date: "Dec 15, 2024",
  },
  {
    name: "Mike T.",
    rating: 5,
    text: "Perfect gift for any Pokemon fan with an Apple Watch. Quality is outstanding.",
    date: "Dec 10, 2024",
  },
  {
    name: "Emily R.",
    rating: 5,
    text: "Best Apple Watch accessory I have ever bought. The build quality is impressive.",
    date: "Dec 5, 2024",
  },
];

export default function WatchTrainerPage() {
  const [quantity, setQuantity] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const productShowcaseRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

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
        .from(".product-title", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.4")
        .from(".product-subtitle", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6")
        .from(".product-price", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        .from(".product-actions", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.3");

      // Hero product image
      gsap.from(".hero-product-image", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Product showcase section - Apple-style scroll animation
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
        .from(".showcase-description", {
          y: 80,
          opacity: 0,
        }, "-=0.5")
        .from(".showcase-image", {
          scale: 0.8,
          opacity: 0,
          rotateY: 20,
        }, "-=0.5");

      // Rotating product animation on scroll
      gsap.to(".rotating-product", {
        scrollTrigger: {
          trigger: productShowcaseRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        rotateY: 360,
        ease: "none",
      });

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

      // How it works section - step by step reveal
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

      // Parallax background elements
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
      });

      // Floating animation for decorative elements
      gsap.to(".float-element", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-6 pt-20"
      >
        {/* Background */}
        <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-red-950/30 via-black to-black pointer-events-none" />
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-50" />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Info */}
            <div className="order-2 lg:order-1">
              <Badge className="product-badge bg-red-500/10 text-red-400 border-red-500/20 mb-6">
                New Release
              </Badge>

              <h1 className="product-title text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4">
                WatchTrainer
              </h1>

              <p className="product-subtitle text-xl md:text-2xl text-white/60 mb-8">
                The Pokeball Apple Watch Charger
              </p>

              <div className="product-price flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-semibold">$49.99</span>
                <span className="text-lg text-white/40 line-through">$69.99</span>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                  Save 30%
                </Badge>
              </div>

              <div className="product-actions space-y-4">
                {/* Quantity selector */}
                <div className="flex items-center gap-4">
                  <span className="text-white/60">Quantity</span>
                  <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-white/10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-white/10"
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
                    className="flex-1 bg-white text-black hover:bg-white/90 rounded-full px-8 text-base font-medium"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 pt-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Free Shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    30-Day Returns
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    1 Year Warranty
                  </div>
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="order-1 lg:order-2 hero-product-image">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main Pokeball */}
                <div className="absolute inset-8 rounded-full shadow-2xl shadow-red-500/30">
                  {/* Top half - Red */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 via-red-500 to-red-600 overflow-hidden">
                    <div className="absolute top-4 left-8 w-1/3 h-1/3 bg-white/40 rounded-full blur-xl" />
                    <div className="absolute top-2 left-4 w-1/4 h-1/4 bg-white/20 rounded-full blur-md" />
                  </div>
                  {/* Bottom half - White */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <div className="absolute bottom-4 right-8 w-1/4 h-1/4 bg-gray-200/50 rounded-full blur-lg" />
                  </div>
                  {/* Center band */}
                  <div className="absolute top-1/2 left-0 right-0 h-5 md:h-6 -translate-y-1/2 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg" />
                  {/* Center button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white to-gray-100 border-4 md:border-[5px] border-gray-800 shadow-xl">
                    <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-inner" />
                    {/* LED indicator */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 opacity-80 animate-pulse" />
                  </div>
                </div>

                {/* Glow effects */}
                <div className="float-element absolute -top-4 -right-4 w-24 h-24 bg-red-500/30 rounded-full blur-2xl" />
                <div className="float-element absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-0 rounded-full bg-red-500/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Apple Style Scroll */}
      <section
        ref={productShowcaseRef}
        className="relative py-32 px-6"
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="showcase-title text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Catch Your Charge.
          </h2>
          <p className="showcase-description text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-16">
            Inspired by the iconic Pokeball, the WatchTrainer transforms your daily 
            charging routine into a moment of joy.
          </p>

          <div className="showcase-image relative">
            <div className="rotating-product relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto" style={{ perspective: "1000px" }}>
              {/* 3D Pokeball representation */}
              <div className="absolute inset-0 rounded-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Top half */}
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 to-red-600">
                  <div className="absolute top-4 left-6 w-1/3 h-1/3 bg-white/30 rounded-full blur-lg" />
                </div>
                {/* Bottom half */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-gradient-to-br from-gray-100 to-white" />
                {/* Center band */}
                <div className="absolute top-1/2 left-0 right-0 h-6 -translate-y-1/2 bg-gray-900" />
                {/* Center button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 border-gray-900">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200" />
                </div>
              </div>
            </div>

            {/* Watch illustration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4">
              <div className="w-8 h-10 md:w-10 md:h-12 bg-gray-800 rounded-lg border border-gray-700">
                <div className="absolute inset-1 bg-black rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        ref={featuresRef}
        className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-950"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Designed to Impress
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every detail has been carefully considered to deliver an exceptional experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">
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
      <section
        ref={howItWorksRef}
        className="relative py-32 px-6"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Simple as 1, 2, 3
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Getting started with your WatchTrainer is effortless.
            </p>
          </div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Unbox Your WatchTrainer",
                description:
                  "Carefully crafted packaging reveals your premium Pokeball charger, USB-C cable, and quick start guide.",
                align: "left",
              },
              {
                step: "02",
                title: "Connect to Power",
                description:
                  "Plug the USB-C cable into any power adapter or USB port. The LED indicator will glow to confirm its ready.",
                align: "right",
              },
              {
                step: "03",
                title: "Place Your Watch",
                description:
                  "Simply rest your Apple Watch on top of the WatchTrainer. The magnetic alignment ensures perfect placement every time.",
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
                    <span className="text-6xl md:text-8xl font-bold text-white/10">
                      {item.step}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4 -mt-4">
                      {item.title}
                    </h3>
                    <p className="text-lg text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
                    {/* Step illustration - Pokeball */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-center justify-center">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full">
                        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 rounded-full">
                          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 to-red-600" />
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-white" />
                          <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-gray-900" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-900" />
                        </div>
                      </div>
                    </div>
                    {/* Step number indicator */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
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
        className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-950"
      >
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Technical Specifications
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="spec-row flex justify-between items-center py-5"
              >
                <span className="text-white/60">{spec.label}</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-white/60 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">Whats in the Box</h4>
                <ul className="text-white/60 space-y-1">
                  <li>1x WatchTrainer Pokeball Charger</li>
                  <li>1x USB-C Charging Cable (1.5m)</li>
                  <li>1x Quick Start Guide</li>
                  <li>1x Premium Carrying Pouch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        ref={reviewsRef}
        className="relative py-32 px-6"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Loved by Trainers
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg">4.9 out of 5</span>
            </div>
            <p className="text-white/60">Based on 1,247 reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="review-card p-8 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">{review.text}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-sm text-white/40">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-[800px] mx-auto text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-red-400" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Ready to Catch Yours?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Join thousands of trainers who have upgraded their Apple Watch charging experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-10 text-base font-medium"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart - $49.99
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/40">
            Free shipping worldwide. 30-day money-back guarantee.
          </p>
        </div>
      </section>
    </div>
  );
}
