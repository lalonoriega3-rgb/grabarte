import Link from "next/link";
import Image from "next/image";

const infoLinks = [
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Política de envío", href: "/politica-envio" },
  { label: "Devoluciones", href: "/devoluciones" },
  { label: "Aviso de privacidad", href: "/privacidad" },
  { label: "Contacto", href: "/contacto" },
];

const blogLinks = [
  { label: "El regalo de aniversario perfecto", href: "/blog/regalo-aniversario" },
  { label: "Regalos de boda originales", href: "/blog/regalo-boda" },
  { label: "Regalos corporativos personalizados", href: "/blog/regalo-corporativo" },
  { label: "Ver todos los artículos →", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-[#08080a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & tagline */}
          <div className="space-y-5 lg:col-span-1">
            <Image
              src="/logo-sin-fondo-b.png"
              alt="Grabarte"
              width={600}
              height={240}
              className="h-48 w-auto opacity-80"
            />
            <p className="text-white/25 text-sm leading-relaxed font-light">
              Cubos de cristal con grabado láser 3D personalizado. El regalo perfecto para cada ocasión.
            </p>
          </div>

          {/* Info links */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.16em] uppercase text-white/25">Información</h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/30 hover:text-white/70 text-sm font-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog links */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.16em] uppercase text-white/25">Blog</h4>
            <ul className="space-y-2.5">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/30 hover:text-white/70 text-sm font-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & contact */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs tracking-[0.16em] uppercase text-white/25">Métodos de pago</h4>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "OXXO", "G Pay"].map((method) => (
                  <div key={method} className="border border-white/8 px-3 py-1.5 text-white/30 text-xs tracking-wider font-light">
                    {method}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs tracking-[0.16em] uppercase text-white/25">WhatsApp</h4>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "52XXXXXXXXXX"}?text=${encodeURIComponent("Hola, me interesa un cubo de cristal personalizado")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-[#25D366] text-sm font-light transition-colors duration-300"
              >
                Escríbenos directo →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wider font-light">
            © 2025 Grabarte · Envíos a toda la República Mexicana
          </p>
          <div className="flex items-center gap-1 text-white/15 text-xs tracking-widest">
            <span>✦</span>
            <span>grabarte.shop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
