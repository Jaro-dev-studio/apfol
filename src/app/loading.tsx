export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative">
        {/* Pokeball loading animation */}
        <div className="w-16 h-16 rounded-full animate-pulse">
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 to-red-600" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-white" />
          <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 bg-gray-900" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-gray-900" />
        </div>
        <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl animate-pulse" />
      </div>
    </div>
  );
}
