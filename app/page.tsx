import Hero from "@/components/Hero";
import Configurador from "@/components/Configurador";
import ShowcaseProducto from "@/components/ShowcaseProducto";
import ComoFunciona from "@/components/ComoFunciona";
import Testimoniales from "@/components/Testimoniales";
import FAQ from "@/components/FAQ";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cubo de cristal con grabado láser 3D personalizado",
  description:
    "Cubo de cristal 5×5×8 cm con grabado láser 3D de tu foto. Personalizado con texto opcional. Base de madera con luz LED disponible. Envíos a toda la República Mexicana.",
  image: "https://grabarte.shop/cubo-pareja.jpg",
  brand: {
    "@type": "Brand",
    name: "Grabarte",
  },
  offers: {
    "@type": "Offer",
    url: "https://grabarte.shop/#configurador",
    priceCurrency: "MXN",
    price: "900",
    priceValidUntil: "2026-12-31",
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Grabarte",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "99",
        currency: "MXN",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "MX",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        businessDays: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        },
        cutoffTime: "18:00:00-06:00",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 1,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 3,
          maxValue: 8,
          unitCode: "DAY",
        },
      },
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grabarte",
  url: "https://grabarte.shop",
  logo: "https://grabarte.shop/logo-sin-fondo-b.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52-998-480-0290",
    contactType: "customer service",
    areaServed: "MX",
    availableLanguage: "Spanish",
  },
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Configurador />
      <ShowcaseProducto />
      <ComoFunciona />
      <Testimoniales />
      <FAQ />
    </>
  );
}
