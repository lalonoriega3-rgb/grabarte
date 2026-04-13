const steps = [
  {
    num: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Sube tu foto",
    description: "Selecciona la imagen que quieres inmortalizar. Recomendamos fotos con buena iluminación y fondo claro.",
  },
  {
    num: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Nosotros grabamos",
    description: "Nuestro equipo convierte tu foto en un diseño tridimensional grabado con precisión láser dentro del cristal.",
  },
  {
    num: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Lo recibes en casa",
    description: "Tu cubo llega empacado con cuidado a toda la República Mexicana en 3 a 8 días hábiles.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="py-28 relative bg-[#f7f5f0]">
      <div className="absolute top-0 left-6 right-6 h-px bg-black/6" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-black/30 mb-4">✦ Proceso</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-black tracking-tight">
            Cómo funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#f7f5f0] p-10 group hover:bg-white transition-colors duration-500"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 border border-black/10 flex items-center justify-center text-black/40 group-hover:border-black/25 group-hover:text-black/70 transition-all duration-500">
                    {step.icon}
                  </div>
                  <span className="font-display text-6xl font-light text-black/6 leading-none">
                    {step.num}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-black/80 font-light text-base tracking-wide">{step.title}</h3>
                  <p className="text-black/45 text-sm leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 flex items-center justify-between border-t border-black/6 pt-8">
          <p className="text-black/35 text-sm font-light">
            Salida del taller en <strong className="text-black/60 font-normal">24 horas</strong> · Entrega en <strong className="text-black/60 font-normal">3–8 días hábiles</strong>
          </p>
          <a
            href="/#configurador"
            className="text-xs tracking-[0.14em] uppercase text-black/40 hover:text-black/80 transition-colors duration-300 flex items-center gap-2"
          >
            Comenzar
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
