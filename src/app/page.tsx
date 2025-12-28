"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline();
      
      heroTl
        .from(".hero-badge", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(".hero-title", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.4")
        .from(".hero-subtitle", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6")
        .from(".hero-cta", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        .from(".hero-product", {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.8");

      // Featured product section
      gsap.from(".featured-content", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
      });

      gsap.from(".featured-image", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        x: 100,
        opacity: 0,
        scale: 0.9,
      });

      // Features section
      gsap.from(".feature-card", {
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

      // CTA section
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Parallax effect on hero
      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
        {/* Background glow */}
        <div className="hero-bg absolute inset-0 hero-glow pointer-events-none" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400/20 rounded-full animate-pulse delay-200" />
        </div>

        <div ref={heroTextRef} className="relative z-10 text-center max-w-4xl mx-auto">
          <Badge className="hero-badge bg-white/10 text-white border-white/20 hover:bg-white/20 mb-6">
            Introducing WatchTrainer
          </Badge>
          
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6">
            <span className="text-gradient">Premium Gadgets</span>
            <br />
            <span className="text-white">for Apple Users</span>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Discover our collection of stunning, thoughtfully designed accessories 
            that perfectly complement your Apple devices.
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 text-base font-medium"
            >
              <Link href="/products/watchtrainer">
                Shop WatchTrainer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 text-base"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Product Showcase */}
        <div className="hero-product relative mt-16 md:mt-24">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Pokeball representation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500 via-red-600 to-red-700 shadow-2xl shadow-red-500/30">
              {/* Top half */}
              <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 to-red-600 overflow-hidden">
                <div className="absolute top-4 left-4 w-1/3 h-1/4 bg-white/30 rounded-full blur-md" />
              </div>
              {/* Bottom half */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-gradient-to-br from-gray-100 to-white" />
              {/* Center band */}
              <div className="absolute top-1/2 left-0 right-0 h-4 md:h-6 -translate-y-1/2 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800" />
              {/* Center button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-100 to-white border-4 md:border-6 border-gray-800 shadow-lg">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-100" />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-8 rounded-full bg-red-500/20 blur-3xl -z-10" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        ref={featuredRef}
        id="products"
        className="relative py-32 px-6"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Our Products
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Discover our collection of premium Apple Watch accessories, 
              each designed to bring joy to your daily routine.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* WatchTrainer Card */}
            <div className="featured-content group relative rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Product Image */}
              <div className="relative aspect-square p-8 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4 rounded-full group-hover:scale-105 transition-transform duration-500">
                  {/* Top half */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 to-red-600">
                    <div className="absolute top-6 left-6 w-1/4 h-1/4 bg-white/30 rounded-full blur-lg" />
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
                {/* Glow */}
                <div className="absolute inset-0 bg-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Product Info */}
              <div className="p-8 pt-0">
                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">
                  Best Seller
                </Badge>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  WatchTrainer
                </h3>
                <p className="text-white/60 mb-6">
                  Pokeball-inspired Apple Watch charger with MagSafe compatibility and premium aluminum build.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">$49.99</span>
                  <Button
                    asChild
                    className="bg-white text-black hover:bg-white/90 rounded-full px-6"
                  >
                    <Link href="/products/watchtrainer">
                      View Product
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Watchintosh Card */}
            <div className="featured-content group relative rounded-3xl bg-gradient-to-br from-[#e8e0d0] to-[#d4cdc0] border border-[#c5beb0] overflow-hidden hover:border-[#b5ae a0] transition-all duration-300">
              {/* Product Image */}
              <div className="relative aspect-square p-8 flex items-center justify-center">
                <div className="relative w-2/3 h-3/4 group-hover:scale-105 transition-transform duration-500">
                  {/* Mac Body */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f0e8d8] to-[#e0d8c8] rounded-2xl border border-[#d0c8b8] shadow-xl">
                    {/* Top vents */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-3 h-0.5 bg-[#b8b0a0] rounded-full" />
                      ))}
                    </div>
                    {/* Screen bezel */}
                    <div className="absolute top-6 left-3 right-3 h-[55%] bg-[#c8c0b0] rounded-lg p-1.5">
                      <div className="w-full h-full bg-[#1a1a1a] rounded overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0a] to-[#001100] flex items-center justify-center">
                          <div className="text-[#33ff33] text-center">
                            <div className="text-lg font-mono font-bold">15:24</div>
                            <div className="text-[8px] font-mono opacity-70">SUN 28</div>
                          </div>
                        </div>
                        {/* Scan lines */}
                        <div 
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)" }}
                        />
                      </div>
                    </div>
                    {/* Logo */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#a8a090] text-[8px] font-medium tracking-wider">
                      Watchintosh
                    </div>
                    {/* Drive slot */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#b8b0a0] rounded-full" />
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 bg-[#33ff33]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Product Info */}
              <div className="p-8 pt-0">
                <Badge className="bg-amber-600/10 text-amber-700 border-amber-600/20 mb-4">
                  Retro Revival
                </Badge>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-[#1d1d1f]">
                  Watchintosh
                </h3>
                <p className="text-[#1d1d1f]/60 mb-6">
                  Macintosh-inspired Apple Watch stand. 3D printed with precision for that authentic vintage feel.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-[#1d1d1f]">$29.99</span>
                  <Button
                    asChild
                    className="bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-6"
                  >
                    <Link href="/products/watchintosh">
                      View Product
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-950"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Why Choose Apfol
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every product is crafted with precision and passion, 
              designed to enhance your Apple experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Premium Design",
                description:
                  "Every product is meticulously designed with attention to the finest details, ensuring a perfect blend of form and function.",
              },
              {
                icon: Zap,
                title: "Fast Charging",
                description:
                  "Experience rapid charging speeds with our MagSafe-compatible accessories, getting you back to full power in no time.",
              },
              {
                icon: Shield,
                title: "Built to Last",
                description:
                  "Crafted from premium materials like aerospace-grade aluminum, our products are designed to withstand daily use.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Designed for
                <br />
                Apple Enthusiasts
              </h2>
              <p className="text-lg text-white/60 mb-6 leading-relaxed">
                At Apfol, we believe that accessories should be as beautiful and 
                functional as the devices they complement. Our team of designers 
                and engineers work tirelessly to create products that you will love.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                From concept to creation, every Apfol product goes through rigorous 
                testing to ensure it meets our high standards of quality and performance.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-gradient mb-4">2024</div>
                  <p className="text-white/60">Established with a vision to redefine Apple accessories</p>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-32 px-6 bg-gradient-to-b from-gray-950 to-black"
      >
        <div className="max-w-[800px] mx-auto text-center cta-content">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Join thousands of happy customers who have transformed their 
            Apple experience with our premium accessories.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-white/90 rounded-full px-10 text-base font-medium"
          >
            <Link href="/products/watchtrainer">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
