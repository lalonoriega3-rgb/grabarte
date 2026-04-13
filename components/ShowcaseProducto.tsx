import HeroSection9 from "@/components/ui/hero-section-9";
import { Package, Clock, ShieldCheck } from "lucide-react";

export default function ShowcaseProducto() {
  return (
    <HeroSection9
      theme="dark"
      title={
        <>
          Un regalo que
          <br />
          <em className="not-italic" style={{ color: "#c8a96e" }}>permanece para siempre</em>
        </>
      }
      subtitle="El cubo de cristal con grabado láser 3D es la única pieza que combina tu foto, un texto personal y la precisión de la tecnología láser en un objeto que dura décadas."
      actions={[
        { text: "Personaliza el tuyo", href: "/#configurador", primary: true },
        { text: "Ver galería", href: "/#galeria" },
      ]}
      stats={[
        { value: "+500", label: "Clientes felices", icon: <ShieldCheck className="w-4 h-4" /> },
        { value: "24 h", label: "Tiempo de producción", icon: <Clock className="w-4 h-4" /> },
        { value: "5×5×8", label: "Centímetros de cristal", icon: <Package className="w-4 h-4" /> },
      ]}
      images={["/cubo-pareja.jpg", "/cubo-base-led.jpg", "/cubo-gato.jpg"]}
    />
  );
}
