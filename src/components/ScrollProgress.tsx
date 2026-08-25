"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  const sections = ["Inicio", "Estudio", "Proyectos", "Contacto"];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v < 0.2) setActiveSection(0);
      else if (v < 0.5) setActiveSection(1);
      else if (v < 0.75) setActiveSection(2);
      else setActiveSection(3);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="fixed right-6 top-0 z-40 hidden h-screen flex-col items-center justify-center gap-3 lg:flex"
    >
      <div className="relative h-40 w-px bg-border">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute top-0 left-0 w-full bg-foreground"
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {sections.map((section, i) => (
          <div key={section} className="flex items-center gap-3">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                activeSection === i
                  ? "bg-foreground scale-125"
                  : "bg-border"
              }`}
            />
            <span
              className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                activeSection === i
                  ? "text-foreground opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              } font-mono`}
            >
              {section}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
