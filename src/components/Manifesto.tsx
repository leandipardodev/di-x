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

  return (
    <section
      id="studio"
      ref={ref}
      className="relative py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <RevealLine>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                Filosofía
              </span>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="mt-6 text-3xl font-bold tracking-tight lg:text-4xl">
                Visión,
                <br />
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
                    <span className="text-foreground">hermoso</span> y funcional.
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

        <div className="mt-32 overflow-hidden border-t border-border pt-16">
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
        </div>
      </div>
    </section>
  );
}
