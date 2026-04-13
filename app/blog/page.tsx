import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Ideas y guías para regalos personalizados",
  description:
    "Descubre ideas únicas para regalos personalizados en bodas, aniversarios y eventos corporativos. Guías prácticas para elegir el regalo perfecto en México.",
  keywords: [
    "ideas regalos personalizados",
    "blog regalos mexico",
    "guia regalo aniversario",
    "regalos boda originales",
    "regalos corporativos mexico",
  ],
  alternates: {
    canonical: "https://grabarte.shop/blog",
  },
  openGraph: {
    title: "Blog Grabarte — Ideas y guías para regalos personalizados",
    description:
      "Guías e ideas para elegir el regalo perfecto para cada ocasión. Bodas, aniversarios, cumpleaños y más.",
    url: "https://grabarte.shop/blog",
    siteName: "Grabarte",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Grabarte — Ideas para regalos personalizados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Grabarte — Ideas para regalos personalizados",
    description:
      "Guías e ideas para elegir el regalo perfecto para cada ocasión en México.",
    images: ["/og-image.jpg"],
  },
};

const posts = [
  {
    slug: "regalo-aniversario",
    category: "Regalos",
    title: "El regalo de aniversario perfecto: guía para sorprender a tu pareja",
    description:
      "Descubre cómo hacer de un aniversario un momento único e inolvidable con un regalo que cuente su historia.",
    date: "15 Mar 2025",
    readTime: "4 min",
    dateISO: "2025-03-15",
  },
  {
    slug: "regalo-boda",
    category: "Bodas",
    title: "Regalos de boda originales que los novios nunca olvidarán",
    description:
      "¿Cansado de regalar vajillas y sábanas? Estas ideas sorprenderán a los novios y destacarán entre todos los regalos.",
    date: "8 Feb 2025",
    readTime: "5 min",
    dateISO: "2025-02-08",
  },
  {
    slug: "regalo-corporativo",
    category: "Corporativo",
    title: "Regalos corporativos personalizados: cómo destacar en eventos de empresa",
    description:
      "Los mejores regalos empresariales no son los más caros, sino los más significativos. Aprende a elegir bien.",
    date: "20 Ene 2025",
    readTime: "3 min",
    dateISO: "2025-01-20",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">✦ Blog</p>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Ideas y guías para regalos personalizados
          </h1>
          <p className="text-white/40 text-lg font-light">
            Inspiración para cada ocasión especial en México.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row gap-6 border border-white/8 overflow-hidden hover:border-white/20 transition-all p-6 bg-white/2"
            >
              <div className="flex-1 space-y-3">
                <span className="inline-block px-2 py-0.5 border border-white/10 text-white/40 text-xs tracking-wider uppercase">
                  {post.category}
                </span>
                <h2 className="text-white font-light text-xl leading-snug group-hover:text-white/80 transition-colors font-display">
                  {post.title}
                </h2>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-white/25 text-xs pt-1">
                  <time dateTime={post.dateISO}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime} de lectura</span>
                </div>
              </div>
              <div className="flex items-center text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0 self-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
