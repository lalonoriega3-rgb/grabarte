interface PriceSummaryProps {
  includeBase: boolean;
}

const PRICE_CUBO = 900;
const PRICE_BASE = 250;
const PRICE_SHIPPING = 99;
const FREE_SHIPPING_THRESHOLD = 999;

export default function PriceSummary({ includeBase }: PriceSummaryProps) {
  const subtotal = PRICE_CUBO + (includeBase ? PRICE_BASE : 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : PRICE_SHIPPING;
  const total = subtotal + shippingCost;
  const freeShipping = shippingCost === 0;

  return (
    <div
      className="border border-black/10 p-6 space-y-4 bg-white"
    >
      <h3 className="text-xs tracking-[0.16em] uppercase text-black/40 mb-5">
        Resumen del pedido
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-black/50 font-light">Cubo de cristal 3D (5×5×8 cm)</span>
          <span className="text-black/80 tabular-nums">${PRICE_CUBO}</span>
        </div>

        {includeBase && (
          <div className="flex justify-between text-sm">
            <span className="text-black/50 font-light">Base de madera con luz LED</span>
            <span className="text-black/80 tabular-nums">+${PRICE_BASE}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-black/50 font-light">Envío</span>
          {freeShipping ? (
            <span className="text-[#c8a96e] text-xs tracking-wider uppercase">Gratis</span>
          ) : (
            <span className="text-black/80 tabular-nums">${PRICE_SHIPPING}</span>
          )}
        </div>
      </div>

      <div className="border-t border-black/8 pt-4 flex justify-between items-baseline">
        <span className="text-xs tracking-[0.12em] uppercase text-black/40">Total MXN</span>
        <span className="font-display text-3xl font-light text-black tracking-tight">
          ${total}
        </span>
      </div>

      {freeShipping ? (
        <div className="flex items-center gap-2.5 bg-[#c8a96e]/8 border border-[#c8a96e]/20 px-3 py-2.5">
          <svg className="w-3.5 h-3.5 text-[#c8a96e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[#c8a96e] text-xs tracking-wider uppercase">
            Envío gratis incluido
          </span>
        </div>
      ) : (
        <p className="text-xs text-black/35 text-center tracking-wide">
          Agrega la base LED y tu envío es{" "}
          <span className="text-[#c8a96e]">gratis</span>
        </p>
      )}
    </div>
  );
}
