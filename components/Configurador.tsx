"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import PriceSummary from "./PriceSummary";

const MAX_CHARS = 50;

export default function Configurador() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [includeBase, setIncludeBase] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const subtotal = 900 + (includeBase ? 250 : 0);
  const shippingCost = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shippingCost;

  const handleFile = useCallback((file: File) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Formato no soportado. Usa JPG, PNG o WEBP.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen no puede pesar más de 10MB.");
      return;
    }
    setError(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleCheckout = async () => {
    if (!imageFile) {
      setError("Por favor sube una foto antes de continuar.");
      return;
    }
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) {
        const { error: e } = await uploadRes.json();
        throw new Error(e || "Error al subir la imagen");
      }
      const { url: imageUrl } = await uploadRes.json();

      setIsUploading(false);
      setIsCheckingOut(true);

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ includeBase, customText, imageUrl }),
      });
      if (!checkoutRes.ok) {
        const { error: e } = await checkoutRes.json();
        throw new Error(e || "Error al crear la sesión de pago");
      }
      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
      setIsUploading(false);
      setIsCheckingOut(false);
    }
  };

  const isLoading = isUploading || isCheckingOut;

  return (
    <section id="configurador" className="bg-[#f7f5f0] py-28 relative overflow-hidden">
      <div className="absolute top-0 left-6 right-6 h-px bg-black/6" />
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(200,170,110,0.06) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-black/30 mb-4">✦ Configurador</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-black tracking-tight">
            Crea tu pieza única
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Steps */}
          <div className="space-y-10">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-6 h-6 border border-black/15 text-black/40 text-xs flex items-center justify-center font-light">1</span>
                <h3 className="text-black/80 font-light text-base tracking-wide">Sube tu foto</h3>
              </div>

              <div
                role="button"
                tabIndex={0}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                className={`relative border cursor-pointer transition-all duration-300 group ${
                  isDragging ? "border-black/30 bg-black/5"
                  : imagePreviewUrl ? "border-[#c8a96e]/40 bg-[#c8a96e]/5"
                  : "border-black/10 bg-white/60 hover:border-black/20 hover:bg-white/80"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                <div className="p-10 flex flex-col items-center text-center">
                  {imagePreviewUrl ? (
                    <div className="space-y-4">
                      <img src={imagePreviewUrl} alt="Preview" className="w-28 h-28 object-cover border border-black/10 mx-auto" />
                      <div>
                        <p className="text-[#c8a96e] text-xs tracking-[0.14em] uppercase">✓ Foto seleccionada</p>
                        <p className="text-black/40 text-xs mt-1 font-light">{imageFile?.name} · Clic para cambiar</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-12 h-12 border border-black/10 flex items-center justify-center mx-auto group-hover:border-black/20 transition-colors">
                        <svg className="w-5 h-5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-black/60 font-light text-sm">Arrastra tu foto aquí</p>
                        <p className="text-black/40 text-xs mt-1">o haz clic para seleccionar</p>
                      </div>
                      <p className="text-black/30 text-xs tracking-wider">JPG · PNG · WEBP · Máx 10MB</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-black/35 text-xs pl-10 font-light tracking-wide">
                Recomendamos fotos con buena iluminación y fondo claro
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-6 h-6 border border-black/15 text-black/40 text-xs flex items-center justify-center font-light">2</span>
                <h3 className="text-black/80 font-light text-base tracking-wide">
                  Texto personalizado <span className="text-black/35 text-sm">(opcional)</span>
                </h3>
              </div>
              <div className="relative pl-10">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="Ej: Para mamá, con amor · 14 · II · 2025"
                  className="w-full bg-white border border-black/10 text-black/80 placeholder-black/25 px-4 py-3 text-sm font-light focus:outline-none focus:border-black/30 transition-colors tracking-wide"
                />
                <span className={`absolute right-3 bottom-3 text-xs tabular-nums ${
                  customText.length >= MAX_CHARS ? "text-amber-500/70" : "text-black/30"
                }`}>
                  {customText.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Step 3 — LED base with real image */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-6 h-6 border border-black/15 text-black/40 text-xs flex items-center justify-center font-light">3</span>
                <h3 className="text-black/80 font-light text-base tracking-wide">Base iluminada</h3>
              </div>
              <div className="pl-10">
                <label className={`flex items-start gap-5 p-5 border cursor-pointer transition-all duration-300 ${
                  includeBase ? "border-[#c8a96e]/40 bg-[#c8a96e]/5" : "border-black/10 bg-white/50 hover:border-black/20"
                }`}>
                  <input
                    type="checkbox"
                    checked={includeBase}
                    onChange={(e) => setIncludeBase(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#c8a96e] cursor-pointer flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-black/80 text-sm font-light tracking-wide">
                      Agregar base de madera con luz LED
                    </p>
                    <p className="text-black/40 text-xs mt-0.5 font-light">
                      +$250 MXN · <span className="text-[#c8a96e]">envío gratis incluido</span>
                    </p>
                  </div>
                  {/* Real LED base image */}
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden border border-black/10">
                    <Image
                      src="/cubo-base-led.jpg"
                      alt="Base de madera con luz LED"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="space-y-4 lg:sticky lg:top-20">
            <PriceSummary includeBase={includeBase} />

            {error && (
              <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-red-500/80 text-xs tracking-wide">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-[#08080a] text-white font-medium text-sm tracking-[0.1em] uppercase py-4 hover:bg-[#1a1a1a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Subiendo imagen..."
                : isCheckingOut ? "Preparando pago..."
                : `Ordenar ahora — $${total} MXN`}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-black/30 tracking-wider">
              <span>Pago seguro</span>
              <span className="text-[8px]">✦</span>
              <span>Visa / MC / OXXO</span>
              <span className="text-[8px]">✦</span>
              <span>Garantía</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
