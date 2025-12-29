"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Retro Macintosh loading animation - larger size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-40 relative"
        >
          {/* Floating animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {/* Mac body */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-xl border border-[#c5beb0] shadow-2xl">
              {/* Screen bezel */}
              <div className="absolute top-3 left-3 right-3 h-[55%] bg-[#b8b0a0] rounded-md p-1.5">
                {/* Screen */}
                <div className="w-full h-full bg-[#0a1a0a] rounded-md flex items-center justify-center overflow-hidden relative">
                  {/* Animated startup sequence */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-5 h-5 bg-[#33ff33] rounded-full shadow-[0_0_20px_#33ff33,0_0_40px_#33ff33]"
                  />
                  {/* Scanlines overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                    }}
                  />
                  {/* CRT flicker */}
                  <motion.div
                    animate={{ opacity: [0, 0.03, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 bg-white pointer-events-none"
                  />
                </div>
              </div>
              {/* Ventilation lines */}
              <div className="absolute bottom-10 left-3 right-3 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-0.5 bg-[#b8b0a0] rounded-full" />
                ))}
              </div>
              {/* Drive slot */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#a8a090] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Ambient glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 w-40 h-40 bg-amber-500/30 blur-3xl rounded-full pointer-events-none"
        />
        
        {/* Loading text with animated dots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex items-center gap-1"
        >
          <span className="text-lg text-[#1d1d1f]/50 font-medium">Loading</span>
          <span className="flex gap-0.5 ml-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-[#1d1d1f]/50 rounded-full"
              />
            ))}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
