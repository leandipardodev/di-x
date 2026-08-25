"use client";

import { motion, useScroll, useTransform } from "framer-motion";


export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 w-full"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(9,9,11,${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="#" className="flex items-baseline gap-0">
          <span className="text-2xl font-bold tracking-tighter">di</span>
          <span className="text-2xl font-light text-muted">.</span>
          <span className="text-2xl font-bold tracking-tighter">X</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {["Estudio", "Proyectos", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase() === "estudio" ? "studio" : item.toLowerCase() === "proyectos" ? "work" : "contact"}`}
              className="text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="border border-border px-5 py-2 text-[11px] uppercase tracking-[0.15em] text-muted transition-all duration-300 hover:border-foreground hover:text-foreground"
        >
          Hablemos
        </a>
      </nav>
    </motion.header>
  );
}
