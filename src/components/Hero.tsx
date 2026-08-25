"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealLine } from "./Animations";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      <motion.div
        style={{ y: titleY, opacity }}
        className="flex flex-col items-center"
      >
        <RevealLine className="mb-4">
          <span className="text-[11px] uppercase tracking-[0.4em] text-muted">
            Estudio de Software
          </span>
        </RevealLine>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.2,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.2,
            }}
            className="text-center text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.9] tracking-tighter"
          >
            di
            <span className="font-light text-muted">.</span>X
          </motion.h1>
        </div>

        <motion.div
          style={{ y: subtitleY }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <RevealLine delay={0.5}>
            <p className="max-w-md text-center text-sm leading-relaxed text-muted">
              Diseño y desarrollo de software con precisión y propósito.
              <br />
              Experiencias digitales que generan impacto.
            </p>
          </RevealLine>

          <RevealLine delay={0.7}>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-muted">
              <span>Buenos Aires</span>
              <span className="h-px w-8 bg-border" />
              <span>2026</span>
            </div>
          </RevealLine>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
