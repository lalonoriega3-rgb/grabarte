import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://grabarte.shop"),
  title: {
    default: "Grabarte — Cubos de cristal con grabado láser 3D personalizado",
    template: "%s | Grabarte",
  },
  description:
    "Inmortaliza ese momento especial en un cubo de cristal con grabado láser 3D personalizado con tu foto. El regalo perfecto para bodas, aniversarios y cumpleaños. Envíos a toda la República Mexicana.",
  keywords: [
    "cubo de cristal personalizado",
    "grabado laser cristal mexico",
    "cubo cristal 3d",
    "regalo personalizado mexico",
    "regalo original para pareja",
    "regalos de boda originales",
    "regalo de aniversario",
    "grabado 3d cristal",
    "regalo corporativo personalizado",
    "grabarte shop",
  ],
  authors: [{ name: "Grabarte", url: "https://grabarte.shop" }],
  creator: "Grabarte",
  publisher: "Grabarte",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Grabarte — Cubos de cristal con grabado láser 3D",
    description:
      "Convierte tu foto en una obra de arte dentro de un cubo de cristal. Grabado láser 3D personalizado. Desde $900 MXN con envío a toda México.",
    url: "https://grabarte.shop",
    siteName: "Grabarte",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grabarte — Cubo de cristal con grabado láser 3D personalizado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grabarte — Cubos de cristal con grabado láser 3D",
    description:
      "Convierte tu foto en una obra de arte dentro de un cubo de cristal. Grabado láser 3D personalizado. Envíos a toda México.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://grabarte.shop",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
