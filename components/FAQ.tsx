"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Cuánto tarda en llegar mi pedido?",
    a: "El 99% de los pedidos salen del taller en 24 horas. Entrega en 3 a 8 días hábiles a toda la República Mexicana.",
  },
  {
    q: "¿Cómo envío mi foto?",
    a: "La subes directamente en esta página al momento de hacer tu pedido, desde el configurador de arriba. No necesitas enviarla por ningún otro medio.",
  },
  {
    q: "¿El grabado se verá exactamente como mi foto?",
    a: "El grabado final se verá mejor que cualquier vista previa. Nuestro equipo revisa cada diseño manualmente antes de grabar para garantizar el mejor resultado.",
  },
  {
    q: "¿Qué pasa si no quedo satisfecho?",
    a: "Contamos con garantía de satisfacción 100%. Si por alguna razón no quedas satisfecho con tu pedido, escríbenos y lo resolvemos sin costo adicional.",
  },
  {
    q: "¿Ofrecen envío gratis?",
    a: "Sí, en compras mayores a $999 MXN el envío es gratis a toda la República. Si agregas la base LED (+$250), tu compra supera ese umbral automáticamente.",
  },
  {
    q: "¿Aceptan pagos con OXXO?",
    a: "Sí, aceptamos OXXO, tarjeta de crédito/débito, Google Pay y Apple Pay a través de Stripe, la plataforma de pago más segura del mercado.",
  },
  {
    q: "¿Hacen pedidos corporativos o por volumen?",
    a: "Sí, escríbenos por WhatsApp para cotizar pedidos de más de 10 piezas. Ofrecemos precios especiales y personalización de empaque.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-[#f7f5f0] relative">
      <div className="absolute top-0 left-6 right-6 h-px bg-black/6" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-black/30 mb-4">✦ FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-black tracking-tight">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="divide-y divide-black/8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  openIndex === i ? "text-black" : "text-black/55 group-hover:text-black/80"
                }`}>
                  {faq.q}
                </span>
                <span className={`text-black/30 flex-shrink-0 w-4 h-4 flex items-center justify-center text-lg transition-all duration-300 ${
                  openIndex === i ? "rotate-45 text-black/60" : ""
                }`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${
                openIndex === i ? "max-h-48 pb-6" : "max-h-0"
              }`}>
                <p className="text-black/50 text-sm leading-relaxed font-light pl-0">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
