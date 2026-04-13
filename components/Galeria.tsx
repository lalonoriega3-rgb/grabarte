import Image from "next/image";

const items = [
  {
    src: "/cubo-gato.jpg",
    alt: "Cubo de cristal con grabado de gato — We love you",
    label: "Mascota",
    labelColor: "text-orange-600",
  },
  {
    src: "/cubo-pareja.jpg",
    alt: "Cristal corazón con foto de pareja en base LED",
    label: "Aniversario",
    labelColor: "text-rose-600",
  },
  {
    src: "/cubo-base-led.jpg",
    alt: "Cubo de cristal sobre base de madera con luz LED",
    label: "Corporativo",
    labelColor: "text-blue-600",
  },
  {
    src: "/cubo-perro.jpg",
    alt: "Cubo de cristal rectangular con grabado de perro",
    label: "Mascota",
    labelColor: "text-amber-600",
  },
  {
    src: "/cubo-pareja.jpg",
    alt: "Cristal corazón — regalo de boda",
    label: "Boda",
    labelColor: "text-purple-600",
  },
  {
    src: "/cubo-gato.jpg",
    alt: "Cubo de cristal personalizado — cumpleaños",
    label: "Cumpleaños",
    labelColor: "text-emerald-600",
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="py-28 bg-[#08080a] relative">
      <div className="absolute top-0 left-6 right-6 h-px bg-white/5" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">✦ Galería</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-white tracking-tight">
              Momentos grabados
            </h2>
          </div>
          <p className="text-white/25 text-sm font-light tracking-wide">
            Más de 500 clientes felices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-[#111] cursor-pointer">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-400" />

              {/* Occasion label */}
              <div className="absolute bottom-4 left-4">
                <span className={`text-xs tracking-[0.12em] uppercase font-medium ${item.labelColor} bg-white/90 px-2.5 py-1`}>
                  {item.label}
                </span>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href="/#configurador"
                  className="border border-white/60 text-white text-xs tracking-[0.14em] uppercase px-5 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Quiero uno así
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
