import Link from "next/link";

const posts = [
  {
    slug: "regalo-aniversario",
    category: "Regalos",
    title: "El regalo de aniversario perfecto: guía para sorprender a tu pareja",
    date: "15 Mar 2025",
    readTime: "4 min",
    accent: "from-rose-500/8",
  },
  {
    slug: "regalo-boda",
    category: "Bodas",
    title: "Regalos de boda originales que los novios nunca olvidarán",
    date: "8 Feb 2025",
    readTime: "5 min",
    accent: "from-purple-500/8",
  },
  {
    slug: "regalo-corporativo",
    category: "Corporativo",
    title: "Regalos corporativos personalizados: cómo destacar en eventos de empresa",
    date: "20 Ene 2025",
    readTime: "3 min",
    accent: "from-blue-500/8",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-28 relative" style={{ background: "#0b0b0f" }}>
      <div className="absolute top-0 left-6 right-6 h-px bg-white/5" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">✦ Blog</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-white tracking-tight">
              Ideas para cada ocasión
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-white/30 hover:text-white/70 text-xs tracking-[0.14em] uppercase transition-colors duration-300 ml-8 flex-shrink-0"
          >
            Ver todos
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#0b0b0f] hover:bg-white/[0.025] transition-colors duration-500 flex flex-col"
            >
              {/* Image */}
              <div className={`aspect-video bg-gradient-to-br ${post.accent} to-transparent relative overflow-hidden flex items-center justify-center`}>
                <svg viewBox="0 0 200 120" className="w-20 h-14 text-white/8" fill="none" stroke="currentColor" strokeWidth="0.6">
                  <rect x="60" y="20" width="80" height="80" rx="1" />
                  <path d="M60 20 L100 5 L140 20" />
                  <circle cx="100" cy="60" r="14" />
                  <circle cx="100" cy="60" r="5" />
                </svg>
              </div>

              <div className="p-7 space-y-4 flex-1 flex flex-col">
                <span className="text-xs tracking-[0.14em] uppercase text-white/25">
                  {post.category}
                </span>
                <h3 className="text-white/75 font-light text-sm leading-snug group-hover:text-white/90 transition-colors duration-300 flex-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-white/20 text-xs tracking-wider">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} de lectura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
