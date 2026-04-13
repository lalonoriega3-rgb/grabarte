"use client";

import { SparklesCore } from "@/components/ui/sparkles";

export default function HeroSparkles() {
  return (
    <div className="w-72 sm:w-80 lg:w-96 h-28 relative mt-0">
      {/* Top gradient lines — like the demo, emanating from the image base */}
      <div className="absolute inset-x-8 top-0 bg-gradient-to-r from-transparent via-[#c8a96e]/60 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-8 top-0 bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-white/50 to-transparent h-[4px] w-1/3 blur-sm" />
      <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-white/30 to-transparent h-px w-1/3" />

      {/* Sparkles particles */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={800}
        className="w-full h-full"
        particleColor="#c8a96e"
        speed={1.5}
      />

      {/* Radial mask so edges fade out softly */}
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(320px_100px_at_top,transparent_20%,white)]" />
    </div>
  );
}
