export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
      <div className="relative">
        {/* Retro Mac loading animation */}
        <div className="relative w-24 h-28 animate-pulse">
          {/* Mac body */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#e8e0d0] to-[#d4cdc0] rounded-lg border border-[#c5beb0] shadow-lg">
            {/* Screen area */}
            <div className="absolute top-2 left-2 right-2 h-14 bg-[#2a2a2a] rounded border border-[#1a1a1a]">
              {/* CRT glow effect */}
              <div className="absolute inset-1 bg-gradient-to-br from-[#1a3a1a] to-[#0a1a0a] rounded-sm overflow-hidden">
                <div className="absolute inset-0 animate-pulse bg-[#33ff33]/10" />
                {/* Scan lines */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)"
                  }}
                />
              </div>
            </div>
            {/* Floppy drive slot */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#a8a090] rounded-full" />
          </div>
          {/* Base */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-gradient-to-b from-[#d4cdc0] to-[#c5beb0] rounded-b-lg" />
        </div>
        {/* Warm glow */}
        <div className="absolute inset-0 rounded-xl bg-amber-500/10 blur-2xl animate-pulse" />
      </div>
    </div>
  );
}

