import HeroSection9 from "@/components/ui/hero-section-9";
import { Heart, Star, Sparkles } from "lucide-react";

export default function ShowcaseOcasiones() {
  return (
    <HeroSection9
      theme="light"
      reverse
      title={
        <>
          El regalo perfecto
          <br />
          para cada ocasión
        </>
      }
      subtitle="Bodas, aniversarios, cumpleaños, memoriales de mascotas o reconocimientos corporativos — el cubo de cristal se adapta a cualquier momento especial."
      actions={[
        { text: "Ordenar ahora", href: "/#configurador", primary: true },
        { text: "Ver testimonios", href: "/#testimonios" },
      ]}
      stats={[
        { value: "5 ★", label: "Calificación promedio", icon: <Star className="w-4 h-4" /> },
        { value: "100%", label: "Garantía de satisfacción", icon: <Sparkles className="w-4 h-4" /> },
        { value: "MX", label: "Envíos toda la República", icon: <Heart className="w-4 h-4" /> },
      ]}
      images={["/cubo-perro.jpg", "/cubo-pareja.jpg", "/cubo-base-led.jpg"]}
    />
  );
}
