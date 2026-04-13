import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const BASE_URL = "https://grabarte.shop";

const postMeta: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    dateISO: string;
    readTime: string;
    category: string;
    keywords: string[];
  }
> = {
  "regalo-aniversario": {
    title: "El regalo de aniversario perfecto: guía para sorprender a tu pareja",
    description:
      "Descubre cómo sorprender a tu pareja con el regalo de aniversario más original y significativo: un cubo de cristal con grabado láser 3D personalizado con su foto.",
    date: "15 Mar 2025",
    dateISO: "2025-03-15",
    readTime: "4 min",
    category: "Regalos",
    keywords: [
      "regalo de aniversario",
      "regalo aniversario pareja",
      "regalo aniversario original",
      "regalo aniversario personalizado",
      "cubo cristal aniversario",
      "regalo grabado laser aniversario",
    ],
  },
  "regalo-boda": {
    title: "Regalos de boda originales que los novios nunca olvidarán",
    description:
      "Las mejores ideas de regalos de boda originales y personalizados en México. Sorprende a los novios con algo único que durará toda la vida.",
    date: "8 Feb 2025",
    dateISO: "2025-02-08",
    readTime: "5 min",
    category: "Bodas",
    keywords: [
      "regalos de boda originales",
      "regalo boda personalizado mexico",
      "regalo novios original",
      "regalos boda creativos",
      "cubo cristal boda",
      "regalo grabado laser boda",
    ],
  },
  "regalo-corporativo": {
    title: "Regalos corporativos personalizados: cómo destacar en eventos de empresa",
    description:
      "Guía completa para elegir regalos corporativos personalizados que impresionen a clientes y colaboradores. Ideas para empresas en México.",
    date: "20 Ene 2025",
    dateISO: "2025-01-20",
    readTime: "3 min",
    category: "Corporativo",
    keywords: [
      "regalos corporativos personalizados",
      "regalos empresariales mexico",
      "regalos corporativos originales",
      "regalo empresa personalizado",
      "cubo cristal corporativo",
      "regalo ejecutivo personalizado",
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = postMeta[slug];
  if (!meta) return { title: "Artículo no encontrado" };

  const url = `${BASE_URL}/blog/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Grabarte", url: BASE_URL }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "Grabarte",
      locale: "es_MX",
      type: "article",
      publishedTime: meta.dateISO,
      authors: ["Grabarte"],
      tags: meta.keywords,
      images: [
        {
          url: `/og-blog-${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`/og-blog-${slug}.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(postMeta).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = postMeta[slug];

  if (!meta) notFound();

  let content = "";
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    content = fs.readFileSync(filePath, "utf8");
    content = content.replace(/^---[\s\S]*?---\n/, "");
  } catch {
    content = "Contenido próximamente...";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.dateISO,
    dateModified: meta.dateISO,
    author: {
      "@type": "Organization",
      name: "Grabarte",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Grabarte",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-sin-fondo-b.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-blog-${slug}.jpg`,
      width: 1200,
      height: 630,
    },
    keywords: meta.keywords.join(", "),
    inLanguage: "es-MX",
    about: {
      "@type": "Thing",
      name: "Cubos de cristal con grabado láser 3D personalizados",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `${BASE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/25 mb-8">
            <Link href="/" className="hover:text-white/50 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/50 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/40 truncate max-w-[200px]">{meta.category}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <span className="text-xs tracking-[0.16em] uppercase text-[#c8a96e]/70">{meta.category}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-white mt-3 mb-5 leading-tight">
              {meta.title}
            </h1>
            <p className="text-white/50 text-base leading-relaxed font-light mb-5">
              {meta.description}
            </p>
            <div className="flex items-center gap-3 text-white/30 text-sm border-t border-white/8 pt-5">
              <span>Grabarte</span>
              <span>·</span>
              <time dateTime={meta.dateISO}>{meta.date}</time>
              <span>·</span>
              <span>{meta.readTime} de lectura</span>
            </div>
          </header>

          {/* Article content */}
          <article
            className="prose prose-invert prose-sm sm:prose max-w-none
              prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight
              prose-h2:text-white prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-white/90 prose-h3:text-lg prose-h3:mt-6
              prose-p:text-white/55 prose-p:leading-relaxed prose-p:font-light
              prose-strong:text-white prose-strong:font-normal
              prose-a:text-[#c8a96e] prose-a:no-underline hover:prose-a:underline
              prose-ul:text-white/55 prose-ul:font-light
              prose-ol:text-white/55 prose-ol:font-light
              prose-li:mb-1
              prose-hr:border-white/10"
            dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
          />

          {/* CTA */}
          <div className="mt-16 border border-[#c8a96e]/20 bg-[#c8a96e]/5 p-8 text-center space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c8a96e]/60">✦ Grabarte</p>
            <h3 className="font-display text-2xl font-light text-white">
              ¿Listo para crear tu regalo único?
            </h3>
            <p className="text-white/40 text-sm font-light">
              Cubo de cristal con grabado láser 3D personalizado desde $900 MXN. Envío a toda la República Mexicana.
            </p>
            <a
              href="/#configurador"
              className="inline-block bg-[#c8a96e] text-black font-medium text-sm tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#d4b97e] transition-colors"
            >
              Personaliza el tuyo
            </a>
          </div>

          {/* Back link */}
          <div className="mt-10 pt-8 border-t border-white/8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors font-light"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^\- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<)(.+)/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<[hul])/g, "$1")
    .replace(/(<\/[hul][^>]*>)<\/p>/g, "$1");
}
