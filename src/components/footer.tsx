import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black text-white/60">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="APFOL"
                width={32}
                height={32}
                className="h-8 w-auto invert"
              />
              <span className="text-2xl font-semibold tracking-[0.15em] font-[family-name:var(--font-logo)]">
                APFOL
              </span>
            </Link>
          </div>
          <p className="text-xs text-center md:text-right">
            Copyright {new Date().getFullYear()} Apfol Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
