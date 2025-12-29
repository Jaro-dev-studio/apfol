"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
      <div className="relative">
        {/* Retro Macintosh loading animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-24 relative"
        >
          {/* Mac body */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-lg border border-[#c5beb0] shadow-lg">
            {/* Screen bezel */}
            <div className="absolute top-2 left-2 right-2 h-[55%] bg-[#b8b0a0] rounded-sm p-1">
              {/* Screen */}
              <div className="w-full h-full bg-[#0a1a0a] rounded-sm flex items-center justify-center overflow-hidden relative">
                {/* Pulsing green dot - startup indicator */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 bg-[#33ff33] rounded-full shadow-[0_0_10px_#33ff33]"
                />
                {/* Scanlines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                  }}
                />
              </div>
            </div>
            {/* Drive slot */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#a8a090] rounded-full" />
          </div>
        </motion.div>
        
        {/* Ambient glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full pointer-events-none"
        />
        
        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-[#1d1d1f]/40 mt-6"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
