"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Diamond3D = dynamic(() => import("@/components/Diamond3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 animate-pulse" />
    </div>
  ),
});

const timeline = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "APFOL was founded with a simple mission: create Apple accessories that are as beautiful as the devices they complement.",
  },
  {
    year: "2024",
    title: "Watchintosh Launches",
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#f5f0e8] text-[#1d1d1f] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8dfd0] via-[#f5f0e8] to-[#f5f0e8] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-[#1d1d1f]"
          >
            About APFOL
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-[#1d1d1f]/60 max-w-2xl mx-auto mb-8"
          >
            We create premium accessories that celebrate the joy of using Apple
            products. Every product is designed with love and crafted with care.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-8 text-[#1d1d1f]/40"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1d1d1f]">2024</div>
              <div className="text-sm">Founded</div>
            </div>
            <div className="w-px h-12 bg-[#1d1d1f]/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1d1d1f]">1</div>
              <div className="text-sm">Product</div>
            </div>
            <div className="w-px h-12 bg-[#1d1d1f]/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1d1d1f]">1000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-[#1d1d1f]">
                Our Mission
              </h2>
              <p className="text-lg text-[#1d1d1f]/60 leading-relaxed mb-6">
                At APFOL, we believe that accessories should spark joy. They
                should make you smile every time you see them on your desk or
                nightstand.
              </p>
              <p className="text-lg text-[#1d1d1f]/60 leading-relaxed">
                We combine nostalgia with modern functionality, creating
                products that are not just useful, but delightful. Our retro Mac 
                stand tells a story of innovation and timeless design.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-200/50 to-amber-100/30 border border-[#d4cdc0] flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <Image
                    src="/logo.png"
                    alt="APFOL"
                    width={200}
                    height={200}
                    className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4"
                  />
                  <p className="text-[#1d1d1f]/60">Premium Apple Accessories</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#f5f0e8] to-[#eee8dc] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Our Values
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
              The principles that guide everything we create.
            </p>
          </motion.div>

          {/* Value 1: Passion for Design - Pulsing Heart with Radiating Waves */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative mb-32"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] flex items-center justify-center">
                {/* Radiating circles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-rose-300/30"
                    style={{
                      width: `${150 + i * 80}px`,
                      height: `${150 + i * 80}px`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                {/* Central heart */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-rose-500/30">
                    <svg viewBox="0 0 24 24" className="w-16 h-16 text-white fill-current">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </motion.div>
                {/* Floating particles */}
                {[
                  { left: "32%", top: "22%", duration: 2.5 },
                  { left: "58%", top: "28%", duration: 3.2 },
                  { left: "42%", top: "65%", duration: 2.8 },
                  { left: "68%", top: "45%", duration: 3.5 },
                  { left: "35%", top: "78%", duration: 2.2 },
                  { left: "62%", top: "72%", duration: 3.0 },
                  { left: "48%", top: "35%", duration: 2.6 },
                  { left: "55%", top: "55%", duration: 3.3 },
                ].map((particle, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-rose-400/60"
                    style={{
                      left: particle.left,
                      top: particle.top,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block text-sm font-medium text-rose-500 mb-3 tracking-wide uppercase">01</span>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[#1d1d1f]">Passion for Design</h3>
                <p className="text-lg text-[#1d1d1f]/60 leading-relaxed">
                  Every product starts with a spark of creativity. We pour our hearts into crafting accessories that bring joy to your daily life. Design is not just what we do - it is who we are.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Value 2: Quality First - Diamond/Crystal with Sparkles */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative mb-32"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <span className="inline-block text-sm font-medium text-amber-600 mb-3 tracking-wide uppercase">02</span>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[#1d1d1f]">Quality First</h3>
                <p className="text-lg text-[#1d1d1f]/60 leading-relaxed">
                  We never compromise on materials or craftsmanship. Each product is built to last and designed to impress. Like a perfectly cut diamond, our attention to quality shines through in every detail.
                </p>
              </motion.div>
              <div className="relative h-[400px] flex items-center justify-center order-1 lg:order-2">
                {/* 3D Diamond */}
                <Diamond3D className="absolute inset-0" />
              </div>
            </div>
          </motion.div>

          {/* Value 3: Attention to Detail - Magnifying Glass with Focus Rings */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative mb-32"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] flex items-center justify-center">
                {/* Background grid pattern - represents details to examine */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-64 h-64 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(79, 70, 229, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(79, 70, 229, 0.5) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>

                {/* Small details scattered around */}
                {[
                  { left: "30%", top: "25%", size: 6 },
                  { left: "65%", top: "30%", size: 4 },
                  { left: "25%", top: "60%", size: 5 },
                  { left: "70%", top: "65%", size: 3 },
                  { left: "45%", top: "75%", size: 4 },
                  { left: "55%", top: "20%", size: 5 },
                ].map((dot, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute rounded-full bg-indigo-300"
                    style={{
                      left: dot.left,
                      top: dot.top,
                      width: dot.size,
                      height: dot.size,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}

                {/* Magnifying Glass */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    x: [-30, 30],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  {/* Glass lens */}
                  <motion.div
                    className="relative"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Outer ring */}
                    <div className="w-36 h-36 rounded-full border-[6px] border-indigo-600 bg-indigo-50/30 backdrop-blur-sm shadow-2xl shadow-indigo-500/20 flex items-center justify-center overflow-hidden">
                      {/* Magnified content inside lens */}
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(79, 70, 229, 0.3) 2px, transparent 2px),
                            linear-gradient(90deg, rgba(79, 70, 229, 0.3) 2px, transparent 2px)
                          `,
                          backgroundSize: '30px 30px',
                          transform: 'scale(1.5)',
                        }}
                      />
                      {/* Lens highlight */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/40" />
                      {/* Focus point in center */}
                      <motion.div 
                        className="absolute w-4 h-4 rounded-full bg-indigo-500"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                    
                    {/* Handle */}
                    <div className="absolute -bottom-12 -right-8 w-6 h-20 bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 rounded-full origin-top rotate-45 shadow-lg">
                      {/* Handle grip lines */}
                      <div className="absolute top-8 left-1 right-1 space-y-1">
                        <div className="h-0.5 bg-indigo-500/50 rounded" />
                        <div className="h-0.5 bg-indigo-500/50 rounded" />
                        <div className="h-0.5 bg-indigo-500/50 rounded" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Sparkle effects around lens */}
                {[
                  { left: "38%", top: "32%", delay: 0 },
                  { left: "62%", top: "35%", delay: 0.5 },
                  { left: "35%", top: "58%", delay: 1 },
                  { left: "65%", top: "55%", delay: 1.5 },
                ].map((sparkle, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute"
                    style={{ left: sparkle.left, top: sparkle.top }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: sparkle.delay,
                      repeat: Infinity,
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 fill-current">
                      <path d="M12 0L13.5 9L22 12L13.5 15L12 24L10.5 15L2 12L10.5 9L12 0Z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block text-sm font-medium text-indigo-500 mb-3 tracking-wide uppercase">03</span>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[#1d1d1f]">Attention to Detail</h3>
                <p className="text-lg text-[#1d1d1f]/60 leading-relaxed">
                  From the curve of a stand to the finish of a charger, we obsess over every detail to create products you will love. Perfection lives in the smallest things.
                </p>
              </motion.div>
                </div>
          </motion.div>

          {/* Value 4: Community Driven - Connected Network */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <span className="inline-block text-sm font-medium text-emerald-600 mb-3 tracking-wide uppercase">04</span>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[#1d1d1f]">Community Driven</h3>
                <p className="text-lg text-[#1d1d1f]/60 leading-relaxed">
                  Our best ideas come from our customers. We listen, iterate, and create products that truly meet your needs. Together, we build something greater than ourselves.
                </p>
              </motion.div>
              <div className="relative h-[400px] flex items-center justify-center order-1 lg:order-2">
                {/* Network visualization */}
                <svg className="absolute w-full h-full" style={{ overflow: "visible" }}>
                  {/* Connection lines */}
                  {[
                    { x1: "50%", y1: "50%", x2: "25%", y2: "25%" },
                    { x1: "50%", y1: "50%", x2: "75%", y2: "25%" },
                    { x1: "50%", y1: "50%", x2: "20%", y2: "60%" },
                    { x1: "50%", y1: "50%", x2: "80%", y2: "60%" },
                    { x1: "50%", y1: "50%", x2: "35%", y2: "80%" },
                    { x1: "50%", y1: "50%", x2: "65%", y2: "80%" },
                    { x1: "25%", y1: "25%", x2: "75%", y2: "25%" },
                    { x1: "20%", y1: "60%", x2: "35%", y2: "80%" },
                    { x1: "80%", y1: "60%", x2: "65%", y2: "80%" },
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="rgba(16, 185, 129, 0.3)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  ))}
                </svg>
                {/* Central node */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 z-10"
                  style={{ left: "calc(50% - 40px)", top: "calc(50% - 40px)" }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-none stroke-current" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </motion.div>
                {/* Outer nodes */}
                {[
                  { left: "25%", top: "25%", delay: 0.2 },
                  { left: "75%", top: "25%", delay: 0.4 },
                  { left: "20%", top: "60%", delay: 0.6 },
                  { left: "80%", top: "60%", delay: 0.8 },
                  { left: "35%", top: "80%", delay: 1.0 },
                  { left: "65%", top: "80%", delay: 1.2 },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center shadow-lg"
                    style={{ left: `calc(${node.left} - 24px)`, top: `calc(${node.top} - 24px)` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: node.delay }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-white/90"
                      animate={{ scale: [1, 0.9, 1] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
              </motion.div>
            ))}
                {/* Pulse effect from center */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full border-2 border-emerald-400/50"
                  style={{ left: "calc(50% - 40px)", top: "calc(50% - 40px)" }}
                  animate={{
                    scale: [1, 3],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
              Our Journey
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
              From a simple idea to products loved by thousands.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute left-8 top-0 bottom-0 w-px bg-[#d4cdc0]"
            />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="absolute left-6 top-2 w-4 h-4 rounded-full bg-amber-500 border-4 border-[#f5f0e8]"
                  />

                  <div className="text-sm text-amber-600 font-medium mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1d1d1f]">{item.title}</h3>
                  <p className="text-[#1d1d1f]/60 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#eee8dc] to-[#e8e0d0]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[800px] mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-[#1d1d1f]"
          >
            Ready to Explore?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[#1d1d1f]/60 mb-8 max-w-xl mx-auto"
          >
            Discover the Watchintosh, our premium Apple Watch stand designed to
            bring a touch of vintage charm to your desk.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-10 text-base font-medium"
            >
              <Link 
                href="/products/watchintosh"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Shop Watchintosh
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
