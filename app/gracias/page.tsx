import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function GraciasPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  let orderInfo: {
    customerEmail?: string;
    includeBase?: boolean;
    customText?: string;
  } = {};

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const { stripe } = await import("@/lib/stripe");
      const session = await stripe.checkout.sessions.retrieve(session_id);
      orderInfo = {
        customerEmail: session.customer_details?.email ?? undefined,
        includeBase: session.metadata?.include_base === "true",
        customText: session.metadata?.custom_text ?? undefined,
      };
    } catch {
      // Session not found or invalid — show generic confirmation
    }
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "52XXXXXXXXXX";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            ¡Pedido confirmado!
          </h1>
          <p className="text-gray-400 text-lg">
            Gracias por tu compra. Tu cubo de cristal personalizado está en
            camino.
          </p>
        </div>

        {orderInfo.customerEmail && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-left space-y-3">
            <h2 className="text-white font-semibold">Resumen del pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Cubo de cristal 3D</span>
                <span className="text-white">$900 MXN</span>
              </div>
              {orderInfo.includeBase && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Base de madera LED</span>
                  <span className="text-white">$250 MXN</span>
                </div>
              )}
              {orderInfo.customText && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Texto personalizado</span>
                  <span className="text-white italic">
                    &ldquo;{orderInfo.customText}&rdquo;
                  </span>
                </div>
              )}
            </div>
            <div className="pt-3 border-t border-[#2a2a2a]">
              <p className="text-gray-400 text-sm">
                Confirmación enviada a:{" "}
                <span className="text-white">{orderInfo.customerEmail}</span>
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 text-left">
          <h3 className="text-white font-semibold mb-2">
            ¿Cuándo llega tu pedido?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            El 99% de los pedidos salen del taller en{" "}
            <strong className="text-white">24 horas</strong>. Recibirás tu cubo
            en <strong className="text-white">3 a 8 días hábiles</strong> a
            toda la República Mexicana.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 border border-[#2a2a2a] text-white font-semibold py-3 rounded-xl text-center hover:bg-[#1a1a1a] transition-colors text-sm"
          >
            Volver al inicio
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, acabo de hacer un pedido y tengo una pregunta")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white font-semibold py-3 rounded-xl text-center hover:bg-[#1ebe5d] transition-colors text-sm"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
