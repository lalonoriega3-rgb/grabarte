"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  href: string;
  primary?: boolean;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
  /** "dark" = fondo oscuro (#0e0e12), "light" = fondo claro (#f7f5f0) */
  theme?: "dark" | "light";
  /** Invertir layout: imágenes a la izquierda, texto a la derecha */
  reverse?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity },
  },
};

const HeroSection9 = ({
  title,
  subtitle,
  actions,
  stats,
  images,
  className,
  theme = "dark",
  reverse = false,
}: HeroSectionProps) => {
  const isDark = theme === "dark";

  return (
    <section
      className={cn("w-full overflow-hidden py-24 relative", className)}
      style={{ background: isDark ? "#08080a" : "#f7f5f0" }}
    >
      {/* Section divider */}
      <div className={cn("absolute top-0 left-6 right-6 h-px", isDark ? "bg-white/5" : "bg-black/6")} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14 lg:grid-cols-2",
            reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          {/* Text column */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <p className={cn("text-xs tracking-[0.2em] uppercase mb-4", isDark ? "text-white/30" : "text-black/30")}>
                ✦ Grabarte
              </p>
              <h2
                className={cn(
                  "font-display text-4xl sm:text-5xl font-light tracking-tight leading-[1.08]",
                  isDark ? "text-white" : "text-black"
                )}
              >
                {title}
              </h2>
            </motion.div>

            <motion.p
              className={cn("mt-6 max-w-sm text-base leading-relaxed font-light", isDark ? "text-white/45" : "text-black/50")}
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" variants={itemVariants}>
              {actions.map((action, i) => (
                <a
                  key={i}
                  href={action.href}
                  className={cn(
                    "text-sm tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-300",
                    action.primary
                      ? isDark
                        ? "bg-[#e8e4d8] text-[#08080a] hover:bg-white"
                        : "bg-[#030303] text-white hover:bg-[#1a1a1a]"
                      : isDark
                      ? "border border-white/18 text-white/60 hover:border-white/40 hover:text-white"
                      : "border border-black/15 text-black/60 hover:border-black/40 hover:text-black"
                  )}
                >
                  {action.text}
                </a>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
              variants={itemVariants}
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center border",
                      isDark ? "border-white/10 text-white/40" : "border-black/10 text-black/40"
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className={cn("text-lg font-display font-light", isDark ? "text-white" : "text-black")}>
                      {stat.value}
                    </p>
                    <p className={cn("text-xs tracking-wide", isDark ? "text-white/35" : "text-black/40")}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image collage column */}
          <motion.div
            className="relative h-[420px] w-full sm:h-[500px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Floating decorative orbs */}
            <motion.div
              className={cn("absolute -top-3 left-1/4 h-14 w-14 rounded-full", isDark ? "bg-[#c8a96e]/10" : "bg-[#c8a96e]/20")}
              variants={floatingVariants}
              animate="animate"
            />
            <motion.div
              className={cn("absolute bottom-4 right-1/4 h-10 w-10 rounded-sm", isDark ? "bg-white/5" : "bg-black/5")}
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "0.8s" }}
            />
            <motion.div
              className={cn("absolute bottom-1/3 left-6 h-5 w-5 rounded-full", isDark ? "bg-[#c8a96e]/15" : "bg-[#c8a96e]/25")}
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "1.6s" }}
            />

            {/* Top center image */}
            <motion.div
              className="absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 shadow-2xl sm:h-64 sm:w-64"
              variants={imageVariants}
            >
              <img
                src={images[0]}
                alt="Cubo de cristal Grabarte"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Right middle image */}
            <motion.div
              className="absolute right-0 top-1/3 h-40 w-40 shadow-2xl sm:h-52 sm:w-52"
              variants={imageVariants}
            >
              <img
                src={images[1]}
                alt="Cubo de cristal con base LED"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Bottom left image */}
            <motion.div
              className="absolute bottom-0 left-0 h-36 w-36 shadow-2xl sm:h-48 sm:w-48"
              variants={imageVariants}
            >
              <img
                src={images[2]}
                alt="Cubo de cristal personalizado"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection9;
