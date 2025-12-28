"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Target, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: "Passion for Design",
    description:
      "Every product starts with a spark of creativity. We pour our hearts into crafting accessories that bring joy to your daily life.",
  },
  {
    icon: Sparkles,
    title: "Quality First",
    description:
      "We never compromise on materials or craftsmanship. Each product is built to last and designed to impress.",
  },
  {
    icon: Target,
    title: "Attention to Detail",
    description:
      "From the curve of a stand to the finish of a charger, we obsess over every detail to create products you will love.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Our best ideas come from our customers. We listen, iterate, and create products that truly meet your needs.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "Apfol was founded with a simple mission: create Apple accessories that are as beautiful as the devices they complement.",
  },
  {
    year: "2024",
    title: "WatchTrainer Launch",
    description:
      "Our first product, the Pokeball-inspired Apple Watch charger, quickly became a fan favorite among Pokemon enthusiasts.",
  },
  {
    year: "2024",
    title: "Watchintosh Arrives",
    description:
      "Paying homage to the original Macintosh, we launched a retro-styled Apple Watch stand that captures the magic of 1984.",
  },
  {
    year: "Future",
    title: "More to Come",
    description:
      "We are constantly dreaming up new products. Stay tuned for more innovative Apple accessories.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".about-hero-content > *", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      // Values section
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Timeline section
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // CTA section
      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black pointer-events-none" />
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-30" />

        <div className="about-hero-content relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            About Apfol
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-8">
            We create premium accessories that celebrate the joy of using Apple
            products. Every product is designed with love and crafted with care.
          </p>
          <div className="flex items-center justify-center gap-8 text-white/40">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2024</div>
              <div className="text-sm">Founded</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2</div>
              <div className="text-sm">Products</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                At Apfol, we believe that accessories should spark joy. They
                should make you smile every time you see them on your desk or
                nightstand.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                We combine nostalgia with modern functionality, creating
                products that are not just useful, but delightful. Whether it is
                a Pokeball-inspired charger or a retro Mac stand, each product
                tells a story.
              </p>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">apfol</div>
                  <p className="text-white/60">Premium Apple Accessories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-950"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The principles that guide everything we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-white/60 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-32 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From a simple idea to products loved by thousands.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item relative pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-red-500 border-4 border-black" />

                  <div className="text-sm text-red-400 font-medium mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-32 px-6 bg-gradient-to-b from-gray-950 to-black"
      >
        <div className="cta-content max-w-[800px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Ready to Explore?
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Discover our collection of premium Apple accessories designed to
            bring joy to your everyday life.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-white/90 rounded-full px-10 text-base font-medium"
          >
            <Link href="/#products">
              View Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

