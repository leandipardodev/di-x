"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealLine, ParallaxText } from "./Animations";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const bgXScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.1, 0.7]);
  const bgXOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.1, 0.12, 0.1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [4, 0, 0, 0, 4]);
  const bgXGradientPos = useTransform(scrollYProgress, [0, 1], ["0% 50%", "200% 50%"]);
  const marqueeY = useTransform(scrollYProgress, [0.7, 1], [0, -50]);
  const marqueeOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  return (
    <section
      id="studio"
      ref={ref}
      className="relative overflow-hidden py-32 lg:py-48"
    >
      <motion.div
        style={{
          scale: bgXScale,
          opacity: bgXOpacity,
          y: bgY,
          filter: useTransform(bgBlur, (v) => `blur(${v}px)`),
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(250,250,250,0.2) 0%, rgba(250,250,250,0.2) 40%, rgba(250,250,250,0.8) 50%, rgba(250,250,250,0.2) 60%, rgba(250,250,250,0.2) 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: bgXGradientPos,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          className="text-[70vw] font-bold leading-none select-none"
        >
          X
        </motion.span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealLine>
              <h2 className="text-5xl font-bold tracking-tighter lg:text-7xl">
                Visión,
              </h2>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-5xl font-bold tracking-tighter lg:text-7xl">
                ejecución.
              </h2>
            </RevealLine>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="relative">
              <motion.div
                style={{ height: lineHeight }}
                className="absolute -left-8 top-0 hidden w-px bg-foreground/20 lg:block"
              />

              <div className="space-y-16">
                <RevealLine delay={0.1}>
                  <p className="text-lg leading-relaxed text-muted lg:text-xl">
                    En{" "}
                    <span className="text-foreground">di.X</span> creemos que el
                    software debe ser{" "}
                    <span className="text-foreground">hermoso</span> y{" "}
                    <span className="relative inline-block font-medium text-foreground">
                      funcional
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="absolute -bottom-1 left-0 h-px w-full bg-foreground/40 origin-left"
                      />
                    </span>
                    .
                  </p>
                </RevealLine>

                <RevealLine delay={0.2}>
                  <p className="text-lg leading-relaxed text-muted lg:text-xl">
                    Cada proyecto recibe la misma atención obsesiva al detalle — desde
                    la primera línea de código hasta el último pixel en pantalla.
                  </p>
                </RevealLine>

                <RevealLine delay={0.3}>
                  <p className="text-lg leading-relaxed text-muted lg:text-xl">
                    No hacemos plantillas. Construimos{" "}
                    <span className="text-foreground">soluciones a medida</span>{" "}
                    que resuelven problemas reales y se sienten{" "}
                    <span className="text-foreground">sin esfuerzo</span> de usar.
                  </p>
                </RevealLine>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          style={{ y: marqueeY, opacity: marqueeOpacity }}
          className="mt-32 overflow-hidden border-t border-border pt-16"
        >
          <ParallaxText speed={0.3}>
            <div className="flex items-center gap-12 whitespace-nowrap">
              {["Diseñar", "Desarrollar", "Desplegar", "Iterar", "Diseñar", "Desarrollar"].map(
                (word, i) => (
                  <span key={`${word}-${i}`} className="flex items-center gap-12">
                    <span className="text-stroke text-5xl font-bold uppercase tracking-widest lg:text-7xl transition-all duration-300">
                      {word}
                    </span>
                    <span className="text-border text-3xl">—</span>
                  </span>
                )
              )}
            </div>
          </ParallaxText>
        </motion.div>
      </div>
    </section>
  );
}
