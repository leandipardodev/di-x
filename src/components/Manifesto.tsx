"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { RevealLine, ParallaxText } from "./Animations";

let flickeringCount = 0;
const MAX_FLICKERING = 2;

function FlickerWord({ children }: { children: React.ReactNode }) {
  const opacity = useMotionValue(1);

  const flicker = useCallback(() => {
    if (flickeringCount >= MAX_FLICKERING) {
      setTimeout(flicker, 2000 + Math.random() * 3000);
      return;
    }
    flickeringCount++;

    const sequence = [
      { o: 0.3, d: 50 },
      { o: 1, d: 40 },
      { o: 0.15, d: 60 },
      { o: 0.9, d: 30 },
      { o: 0.2, d: 50 },
      { o: 1, d: 40 },
      { o: 0.4, d: 30 },
      { o: 1, d: 0 },
    ];

    let i = 0;
    const step = () => {
      if (i < sequence.length) {
        opacity.set(sequence[i].o);
        setTimeout(step, sequence[i].d);
        i++;
      } else {
        flickeringCount--;
        const next = 8000 + Math.random() * 12000;
        setTimeout(flicker, next);
      }
    };
    step();
  }, [opacity]);

  useEffect(() => {
    const delay = Math.random() * 5000;
    const t = setTimeout(flicker, delay);
    return () => clearTimeout(t);
  }, [flicker]);

  return (
    <motion.span style={{ opacity }} className="text-stroke text-3xl font-bold uppercase tracking-widest sm:text-5xl lg:text-7xl transition-all duration-300">
      {children}
    </motion.span>
  );
}

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
                    <img src="/logo di.x.webp" alt="di.X" className="inline-block h-5 w-auto align-middle" /> creemos que el
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
                    No hacemos plantillas. Creamos{" "}
                    <span className="text-foreground">productos digitales</span>{" "}
                    precisos, performantes y{" "}
                    <span className="text-foreground">pensados para durar</span>.
                  </p>
                </RevealLine>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          style={{ y: marqueeY, opacity: marqueeOpacity }}
          className="mt-32 cursor-default overflow-hidden border-t border-border pt-16"
        >
          <ParallaxText speed={0.3}>
            <div className="flex flex-wrap items-center gap-4 gap-y-2 lg:flex-nowrap lg:gap-12 lg:gap-y-0">
              {["Diseñar", "Desarrollar", "Desplegar", "Iterar", "Diseñar", "Desarrollar"].map(
                (word, i) => (
                  <span key={`${word}-${i}`} className="flex items-center gap-4 lg:gap-12">
                    <FlickerWord>{word}</FlickerWord>
                    <span className="text-border hidden text-3xl lg:inline">—</span>
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
