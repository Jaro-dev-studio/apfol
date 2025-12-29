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

// Pre-generated star positions for the AngleFeature (avoiding Math.random during render)
const starPositions = [
  { top: 12, left: 8, duration: 2.3, delay: 0.1 },
  { top: 45, left: 92, duration: 3.1, delay: 1.2 },
  { top: 78, left: 23, duration: 2.7, delay: 0.5 },
  { top: 5, left: 67, duration: 3.5, delay: 1.8 },
  { top: 89, left: 45, duration: 2.1, delay: 0.3 },
  { top: 34, left: 78, duration: 2.9, delay: 1.5 },
  { top: 67, left: 12, duration: 3.3, delay: 0.8 },
  { top: 23, left: 56, duration: 2.5, delay: 1.1 },
  { top: 56, left: 34, duration: 3.0, delay: 0.6 },
  { top: 91, left: 89, duration: 2.2, delay: 1.9 },
  { top: 8, left: 45, duration: 2.8, delay: 0.4 },
  { top: 72, left: 67, duration: 3.2, delay: 1.3 },
  { top: 38, left: 5, duration: 2.4, delay: 0.9 },
  { top: 15, left: 82, duration: 3.4, delay: 1.6 },
  { top: 82, left: 56, duration: 2.6, delay: 0.2 },
  { top: 48, left: 19, duration: 3.0, delay: 1.0 },
  { top: 28, left: 38, duration: 2.3, delay: 1.7 },
  { top: 95, left: 72, duration: 2.9, delay: 0.7 },
  { top: 62, left: 85, duration: 3.1, delay: 1.4 },
  { top: 18, left: 28, duration: 2.7, delay: 0.0 },
  { top: 75, left: 95, duration: 2.5, delay: 1.2 },
  { top: 42, left: 48, duration: 3.3, delay: 0.5 },
  { top: 3, left: 15, duration: 2.1, delay: 1.8 },
  { top: 88, left: 32, duration: 2.8, delay: 0.3 },
  { top: 52, left: 75, duration: 3.0, delay: 1.5 },
  { top: 25, left: 62, duration: 2.4, delay: 0.8 },
  { top: 68, left: 42, duration: 3.2, delay: 1.1 },
  { top: 35, left: 88, duration: 2.6, delay: 0.6 },
  { top: 85, left: 18, duration: 2.9, delay: 1.9 },
  { top: 58, left: 52, duration: 3.4, delay: 0.4 },
];

// Feature Section Components - Each with unique immersive animations

// 1. 3D Printed Precision - Layer Build Animation
const PrecisionFeature = () => {
  const layers = 12;
  
      return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1f] via-[#2a2a2c] to-[#1d1d1f]" />
      
      {/* Animated grid pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Animation Side */}
          <div className="relative h-[400px] flex items-center justify-center order-2 lg:order-1">
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-64 h-64 rounded-full bg-amber-500/20 blur-3xl"
              />
            </div>
            
            {/* 3D Print Build Animation */}
            <div className="relative w-48 h-64">
              {/* Base plate */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-2 bg-gradient-to-r from-[#444] via-[#666] to-[#444] rounded-sm"
              />
              
              {/* Printing layers - Mac shape */}
              {[...Array(layers)].map((_, i) => {
                const isScreenArea = i >= 2 && i <= 7;
                const layerWidth = isScreenArea ? 85 : (70 + Math.sin(i * 0.4) * 15);
                
                return (
              <motion.div
                key={i}
                    initial={{ opacity: 0, scaleX: 0, x: '-50%' }}
                    whileInView={{ opacity: 1, scaleX: 1, x: '-50%' }}
                viewport={{ once: true }}
                transition={{ 
                      delay: 0.3 + i * 0.12,
                      duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                    className="absolute left-1/2"
                    style={{ bottom: `${8 + i * 16}px` }}
              >
                    <motion.div 
                      className="h-4 rounded-sm relative overflow-hidden"
                  style={{ 
                        width: `${layerWidth * 2}px`,
                        background: isScreenArea 
                          ? 'linear-gradient(90deg, #d4cdc0 0%, #c5beb0 20%, #1a1a1a 25%, #1a1a1a 75%, #c5beb0 80%, #d4cdc0 100%)'
                          : 'linear-gradient(90deg, #c5beb0 0%, #e8e0d0 50%, #c5beb0 100%)',
                      }}
                    >
                      {/* Printing shimmer effect */}
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ 
                          delay: 0.3 + i * 0.12,
                          duration: 0.8,
                          ease: 'linear'
                        }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
                  </motion.div>
                );
              })}
              
              {/* Nozzle assembly */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
                {/* Gantry */}
                <div className="w-72 h-1 bg-gradient-to-r from-transparent via-[#555] to-transparent mb-1" />
                {/* Nozzle */}
              <motion.div
                  animate={{ x: [-60, 60, -60] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="w-8 h-6 bg-gradient-to-b from-[#666] to-[#333] mx-auto rounded-b-lg relative">
                    {/* Heat block */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3 bg-gradient-to-b from-[#ff6b35] to-[#e55a2b]" />
                    {/* Filament drop */}
                    <motion.div
                      animate={{ 
                        height: [0, 8, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 bg-amber-400 rounded-full"
                    />
                  </div>
            </motion.div>
              </motion.div>
              
              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    y: [0, -100],
                    x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5)]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut'
                  }}
                  className="absolute bottom-20 left-1/2 w-1 h-1 bg-amber-300 rounded-full"
                />
              ))}
            </div>
          </div>
          
          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-amber-400 text-sm font-medium tracking-widest uppercase mb-4"
            >
              Premium Materials
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              3D Printed
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                Precision
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg"
            >
              Crafted with ASA, the toughest commercially available organic material, 
              for an ultra-durable finish that captures every detail of the original 
              Macintosh design.
            </motion.p>
            
            {/* Specs badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {['0.2mm Layer Height', 'ASA Material', 'UV Resistant'].map((spec, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                  {spec}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
          </div>
        </div>
      );
};

// 2. Universal Watch Fit - Orbital Constellation
const FitFeature = () => {
  const watches = [
    { size: 38, label: '38mm', delay: 0, angle: 0 },
    { size: 41, label: '41mm', delay: 0.15, angle: 90 },
    { size: 45, label: '45mm', delay: 0.3, angle: 180 },
    { size: 49, label: 'Ultra', delay: 0.45, angle: 270 },
  ];
  
      return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8] via-[#ebe4d8] to-[#e8e0d0]" />
      
      {/* Radial pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {[...Array(6)].map((_, i) => (
            <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.3 - i * 0.04 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="absolute rounded-full border border-[#1d1d1f]/10"
            style={{ width: `${200 + i * 100}px`, height: `${200 + i * 100}px` }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-amber-600 text-sm font-medium tracking-widest uppercase mb-4"
            >
              Universal Compatibility
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6"
            >
              Fits Every
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Apple Watch
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-[#1d1d1f]/60 leading-relaxed max-w-lg"
            >
              Designed to accommodate all Apple Watch sizes from 38mm to 49mm, 
              including the Ultra series. One Watchintosh, every watch.
            </motion.p>
            
            {/* Size list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {['Series 1-9', 'SE', 'Ultra 1 & 2'].map((model, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                    className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-[#1d1d1f]/80 font-medium">{model}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Animation Side - Orbital */}
          <div className="relative h-[400px] flex items-center justify-center">
            {/* Central Watchintosh */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="relative z-20"
            >
              <div className="w-24 h-28 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-xl border-2 border-[#c5beb0] shadow-2xl">
                <div className="absolute top-3 left-2 right-2 h-14 bg-[#1a1a1a] rounded-md">
                  <div className="absolute inset-1 bg-[#0a1a0a] rounded-sm flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[#33ff33] text-xs font-mono"
                    >
                      FITS ALL
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Orbiting watches */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute w-80 h-80"
            >
              {watches.map((watch, i) => (
                <motion.div
                  key={watch.size}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
                  transition={{ delay: watch.delay + 0.5, type: 'spring', stiffness: 150 }}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${watch.angle}deg) translateX(140px) rotate(-${watch.angle}deg)`,
                    marginTop: `-${(24 + i * 5)}px`,
                    marginLeft: `-${(20 + i * 4)}px`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="relative group"
            >
              <div 
                      className="bg-gradient-to-b from-[#1d1d1f] to-[#333] rounded-xl flex items-center justify-center shadow-xl border border-[#444] relative overflow-hidden"
                style={{ 
                        width: `${40 + i * 8}px`, 
                        height: `${48 + i * 10}px`,
                }}
              >
                      {/* Watch face glow */}
                <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                />
              </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-[#1d1d1f]/60 whitespace-nowrap">
                      {watch.label}
                    </span>
                  </motion.div>
            </motion.div>
          ))}
            </motion.div>
            
            {/* Orbit path */}
            <div className="absolute w-80 h-80 rounded-full border-2 border-dashed border-[#d4cdc0] opacity-50" />
          </div>
        </div>
      </div>
        </div>
      );
};

// 3. Authentic Retro Aesthetic - CRT Boot Sequence
const RetroFeature = () => {
      return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Dark background with CRT ambiance */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
      
      {/* Scan lines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
        }}
      />
      
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* CRT Animation Side */}
          <div className="relative h-[400px] flex items-center justify-center order-2 lg:order-1">
            {/* CRT Monitor */}
              <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Monitor body */}
              <div className="w-72 h-56 bg-gradient-to-b from-[#e8e0d0] to-[#c5beb0] rounded-2xl p-4 shadow-2xl border border-[#b0a898]">
                {/* Screen bezel */}
                <div className="w-full h-full bg-[#1a1a1a] rounded-lg p-3 relative overflow-hidden">
                  {/* CRT screen with curvature effect */}
                  <div 
                    className="w-full h-full rounded-md relative overflow-hidden"
                    style={{
                      background: 'radial-gradient(ellipse at center, #0a2a0a 0%, #041004 100%)',
                      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)'
                    }}
                  >
                    {/* Screen flicker */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="absolute inset-0"
                    >
                      {/* Boot sequence */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="flex flex-col items-center justify-center h-full"
                      >
                        {/* Happy Mac icon */}
                        <motion.div
                          initial={{ scale: 0, y: 20 }}
                          whileInView={{ scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                          className="relative"
                        >
                          <div className="w-16 h-20 bg-[#33ff33] rounded-lg flex flex-col items-center justify-center">
                            {/* Mac face */}
                            <div className="flex gap-2 mb-1">
                              <div className="w-2 h-2 bg-[#0a2a0a] rounded-sm" />
                              <div className="w-2 h-2 bg-[#0a2a0a] rounded-sm" />
                            </div>
                            {/* Smile */}
                            <div className="w-6 h-3 border-b-2 border-[#0a2a0a] rounded-b-full" />
                          </div>
                        </motion.div>
                        
                        {/* Boot text */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.3 }}
                          className="mt-4 text-[#33ff33] text-xs font-mono"
                        >
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Welcome to Macintosh_
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Screen glare */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
                      }}
                    />
                    
                    {/* Phosphor glow */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-md"
                      style={{
                        boxShadow: 'inset 0 0 30px rgba(51,255,51,0.2)'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Monitor stand */}
              <div className="w-20 h-4 bg-gradient-to-b from-[#d4cdc0] to-[#c5beb0] mx-auto -mt-1 rounded-b-lg" />
              <div className="w-32 h-2 bg-gradient-to-b from-[#c5beb0] to-[#b0a898] mx-auto rounded-b-lg" />
              
              {/* Ambient glow */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 left-10 right-10 bottom-20 bg-[#33ff33] blur-3xl rounded-lg -z-10"
              />
            </motion.div>
          </div>
          
          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-[#33ff33] text-sm font-medium tracking-widest uppercase mb-4"
            >
              Classic Design
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              Authentic
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33ff33] to-[#00cc00]">
                Retro Aesthetic
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg"
            >
              Faithfully recreated in classic Macintosh beige, bringing 1984 nostalgia 
              to your modern desk setup. A piece of computing history, reimagined.
            </motion.p>
            
            {/* Color swatches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-4 mt-8"
            >
              <span className="text-white/40 text-sm">Authentic Colors:</span>
              <div className="flex gap-2">
                {['#e8e0d0', '#d4cdc0', '#c5beb0', '#33ff33'].map((color, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                    style={{ backgroundColor: color }}
              />
            ))}
              </div>
            </motion.div>
          </div>
        </div>
          </div>
        </div>
      );
};

// 4. Perfect Viewing Angle - Spotlight Stage
const AngleFeature = () => {
      return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
      
      {/* Stars */}
      {starPositions.map((star, i) => (
            <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ 
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
        />
      ))}
      
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-blue-400 text-sm font-medium tracking-widest uppercase mb-4"
            >
              Ergonomic Design
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6"
            >
              Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Viewing Angle
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg"
            >
              Ergonomically tilted display area positions your Apple Watch at the ideal 
              angle for nightstand mode. Wake up to the time at a glance.
            </motion.p>
            
            {/* Angle indicator */}
                    <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-6 mt-8"
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
                  <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span className="text-white/80 font-medium">Optimal Visibility</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-blue-400">15°</span>
                <span className="text-white/60 text-sm">Tilt Angle</span>
              </div>
            </motion.div>
          </div>
          
          {/* Animation Side - Spotlight Stage */}
          <div className="relative h-[400px] flex items-center justify-center">
            {/* Spotlight cone */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 origin-top"
              style={{
                width: '200px',
                height: '300px',
                background: 'linear-gradient(180deg, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 100%)',
                clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
              }}
            />
            
            {/* Stage platform */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Rotating platform */}
              <motion.div
                animate={{ rotateY: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                className="relative"
              >
                {/* Watchintosh on platform */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                  style={{ transform: 'rotateX(15deg)' }}
                >
                  <div className="w-28 h-36 bg-gradient-to-b from-[#e8e0d0] to-[#c5beb0] rounded-xl border-2 border-[#b0a898] shadow-2xl relative">
                    {/* Screen area */}
                    <div className="absolute top-3 left-2 right-2 h-16 bg-[#1a1a1a] rounded-md overflow-hidden">
                      <div className="absolute inset-1 bg-gradient-to-b from-[#0a1a0a] to-[#041004] rounded-sm flex items-center justify-center">
                        {/* Clock display */}
                        <motion.div
                          animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                          className="text-center"
                    >
                          <div className="text-[#33ff33] text-2xl font-mono font-bold">12:00</div>
                          <div className="text-[#33ff33]/60 text-xs">MON 29</div>
                    </motion.div>
                  </div>
                </div>
                    
                    {/* Floppy drive */}
                    <div className="absolute bottom-3 left-2 right-2 h-4 bg-[#1a1a1a] rounded-sm" />
              </div>
                  
                  {/* Angle arc indicator */}
                  <motion.svg
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="absolute -right-16 top-1/2 -translate-y-1/2 w-16 h-16"
                    viewBox="0 0 60 60"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.8 }}
                      d="M 10 50 A 40 40 0 0 1 50 50"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <text x="30" y="35" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">15°</text>
                  </motion.svg>
                </motion.div>
              </motion.div>
              
              {/* Platform base */}
              <div className="w-40 h-4 bg-gradient-to-r from-[#333] via-[#555] to-[#333] mx-auto mt-4 rounded-full" 
                   style={{ transform: 'perspective(500px) rotateX(60deg)' }} />
              
              {/* Light rays */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 0.3, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="absolute bottom-0 origin-bottom"
                  style={{
                    left: `${30 + i * 10}%`,
                    width: '2px',
                    height: '60px',
                    background: 'linear-gradient(to top, rgba(59,130,246,0.5), transparent)',
                    transform: `rotate(${(i - 2) * 15}deg)`,
                  }}
                />
              ))}
            </motion.div>
            
            {/* Eye icon tracking */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute right-8 top-1/3"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-400/60">
                  <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                {/* Tracking line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '60px' }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="h-0.5 bg-gradient-to-r from-blue-400/60 to-transparent absolute left-1/2 top-1/2 -translate-x-full"
                  style={{ marginLeft: '-30px' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
          </div>
        </div>
      );
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

  // Check if current slide is the 3D model
  const is3DSlideActive = productImages[activeImageIndex]?.type === "3d";

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
                    className={`flex snap-x snap-mandatory scrollbar-hide rounded-2xl bg-white/50 border border-[#d4cdc0]/50 ${is3DSlideActive ? "overflow-hidden" : "overflow-x-auto"}`}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {productImages.map((item, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full aspect-square snap-center"
                        style={item.type === "3d" ? { touchAction: "none" } : undefined}
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
                            style={{ touchAction: "none" }}
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

      {/* Features - Immersive Sections */}
      <section className="relative">
        {/* Section Header */}
        <div className="relative py-24 px-6 bg-gradient-to-b from-[#f5f0e8] via-[#eee8dc] to-[#f5f0e8]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center max-w-[1200px] mx-auto"
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
        </div>
        
        {/* Feature 1: 3D Printed Precision */}
        <PrecisionFeature />
        
        {/* Feature 2: Universal Watch Fit */}
        <FitFeature />
        
        {/* Feature 3: Authentic Retro Aesthetic */}
        <RetroFeature />
        
        {/* Feature 4: Perfect Viewing Angle */}
        <AngleFeature />
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

