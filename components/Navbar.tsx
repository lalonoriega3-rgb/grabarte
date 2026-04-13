"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#08080a]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-sin-fondo-b.png"
              alt="Grabarte"
              width={110}
              height={44}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/#galeria"
              className="text-white/40 hover:text-white/90 text-xs tracking-[0.12em] uppercase transition-colors duration-300 hidden sm:block"
            >
              Galería
            </Link>
            <Link
              href="/#faq"
              className="text-white/40 hover:text-white/90 text-xs tracking-[0.12em] uppercase transition-colors duration-300 hidden sm:block"
            >
              FAQ
            </Link>
            <a
              href="/#configurador"
              className="relative overflow-hidden group border border-white/20 text-white text-xs tracking-[0.12em] uppercase px-5 py-2.5 hover:border-white/60 transition-all duration-300"
            >
              <span className="relative z-10">Personaliza el tuyo</span>
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
