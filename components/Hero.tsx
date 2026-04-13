import Image from "next/image";
import HeroSparkles from "./HeroSparkles";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#08080a]">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(160,140,100,0.1) 0%, rgba(160,140,100,0.03) 40%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08080a] to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="animate-fade-up inline-flex items-center gap-2.5 border border-white/10 px-4 py-2 text-xs tracking-[0.14em] uppercase text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse" />
              Envíos a toda la República Mexicana
            </div>

            <div className="animate-fade-up delay-100">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-white">
                Inmortaliza
                <br />
                <em className="text-shimmer not-italic">ese momento</em>
                <br />
                en cristal
              </h1>
            </div>

            <p className="animate-fade-up delay-200 text-white/45 text-base leading-relaxed max-w-sm font-light tracking-wide">
              Grabado láser 3D personalizado. Convierte tu foto en una obra de
              arte suspendida dentro de un cubo de cristal puro.
            </p>

            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/#configurador"
                className="bg-white text-black font-medium text-sm tracking-[0.1em] uppercase px-8 py-4 text-center transition-all duration-300 hover:bg-[#e8e4d8]"
              >
                Personaliza el tuyo
              </a>
              <a
                href="/#galeria"
                className="border border-white/15 text-white/70 font-light text-sm tracking-[0.1em] uppercase px-8 py-4 text-center hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Ver galería
              </a>
            </div>

            <div className="animate-fade-up delay-400 flex items-center gap-6 pt-2">
              {["Listo en 24 hrs", "Garantía 100%", "+500 pedidos"].map((text) => (
                <div key={text} className="flex items-center gap-2 text-white/35 text-xs tracking-wider">
                  <span className="text-[8px] text-[#c8a96e]">✦</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product image + sparkles below */}
          <div className="flex flex-col items-center lg:items-end animate-fade-in delay-300">
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute -inset-12 rounded-full animate-pulse-glow"
                style={{ background: "radial-gradient(circle, rgba(200,170,110,0.07) 0%, transparent 65%)" }}
              />

              {/* Image */}
              <div className="animate-float relative">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 overflow-hidden">
                  <Image
                    src="/cubo-pareja.jpg"
                    alt="Cubo de cristal con grabado láser 3D — pareja"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Price badge */}
              <div className="absolute -top-2 -right-2 bg-[#e8e4d8] text-[#030303] text-xs font-medium tracking-[0.1em] uppercase px-4 py-2">
                $900 MXN
              </div>
            </div>

            {/* Sparkles strip below the image */}
            <HeroSparkles />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-fade-in delay-800">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
