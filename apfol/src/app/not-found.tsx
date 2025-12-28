import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        {/* Cracked Pokeball */}
        <div className="w-32 h-32 rounded-full opacity-50">
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-br from-red-400 to-red-600" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-white" />
          <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-gray-900" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-3 border-gray-900" />
        </div>
      </div>

      <h1 className="text-6xl md:text-8xl font-bold text-white/20 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-white/60 max-w-md mb-8">
        Looks like this page escaped! The page you are looking for does not exist or has been moved.
      </p>

      <Button
        asChild
        size="lg"
        className="bg-white text-black hover:bg-white/90 rounded-full px-8"
      >
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
