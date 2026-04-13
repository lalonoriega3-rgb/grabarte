const testimonials = [
  {
    name: "María González",
    occasion: "Regalo de aniversario",
    text: "Quedé sin palabras cuando lo vi. El grabado quedó perfectamente detallado, exactamente como la foto. Mi esposo lloró cuando lo abrió.",
    initials: "MG",
  },
  {
    name: "Carlos Mendoza",
    occasion: "Memorial de mascota",
    text: "Perdimos a nuestro perro después de 12 años. El cubo con su foto es una manera hermosa de recordarlo. La calidad del cristal es impresionante.",
    initials: "CM",
  },
  {
    name: "Sofía Ramírez",
    occasion: "Regalo de cumpleaños",
    text: "Pedí uno para el cumpleaños de mi mamá y quedó espectacular. El proceso fue súper fácil y en 5 días ya lo tenía en casa.",
    initials: "SR",
  },
];

function Star() {
  return (
    <svg className="w-3 h-3 text-[#c8a96e]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Testimoniales() {
  return (
    <section className="py-28 relative bg-[#08080a]">
      <div className="absolute top-0 left-6 right-6 h-px bg-white/5" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">✦ Testimonios</p>
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-white tracking-tight">
              Lo que dicen nuestros clientes
            </h2>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => <Star key={i} />)}
              <span className="text-white/35 text-xs ml-1.5">5.0 · +500 reseñas</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#0e0e12] p-8 space-y-6 hover:bg-[#13131a] transition-colors duration-500"
            >
              <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} />)}</div>

              <p className="text-white/55 text-sm leading-relaxed font-light italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                <div className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 text-xs font-light tracking-wider bg-[#08080a]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white/70 text-sm font-light">{t.name}</p>
                  <p className="text-white/35 text-xs tracking-wide">{t.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
