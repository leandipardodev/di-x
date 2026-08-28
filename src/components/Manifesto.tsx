"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { RevealLine } from "./Animations";

let flickeringCount = 0;
const MAX_FLICKERING = 3;

function FlickerWord({ children }: { children: React.ReactNode }) {
  const opacity = useMotionValue(1);
  const glow = useMotionValue(0);

  const flicker = useCallback(() => {
    if (flickeringCount >= MAX_FLICKERING) {
      setTimeout(flicker, 2000 + Math.random() * 3000);
      return;
    }
    flickeringCount++;

    const sequence = [
      { o: 0.4, g: 0.2, d: 40 },
      { o: 1, g: 1, d: 30 },
      { o: 0.15, g: 0, d: 70 },
      { o: 0.8, g: 0.6, d: 35 },
      { o: 0.1, g: 0, d: 60 },
      { o: 1, g: 1, d: 25 },
      { o: 0.3, g: 0.1, d: 45 },
      { o: 1, g: 1, d: 30 },
      { o: 0.6, g: 0.4, d: 40 },
      { o: 1, g: 1, d: 150 },
      { o: 0.7, g: 0.5, d: 30 },
      { o: 1, g: 0, d: 0 },
    ];

    let i = 0;
    const step = () => {
      if (i < sequence.length) {
        opacity.set(sequence[i].o);
        glow.set(sequence[i].g);
        setTimeout(step, sequence[i].d);
        i++;
      } else {
        flickeringCount--;
        const next = 8000 + Math.random() * 12000;
        setTimeout(flicker, next);
      }
    };
    step();
  }, [opacity, glow]);

  useEffect(() => {
    const delay = Math.random() * 5000;
    const t = setTimeout(flicker, delay);
    return () => clearTimeout(t);
  }, [flicker]);

  const color = useTransform(glow, [0, 1], ["rgba(255,255,255,0.15)", "rgba(255,255,255,1)"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="text-3xl font-bold uppercase tracking-widest sm:text-5xl lg:text-7xl transition-all duration-300"
    >
      {children}
    </motion.span>
  );
}

function MarqueeLine({
  word,
  direction,
  speed,
  scrollYProgress,
  flickerEvery = 1,
}: {
  word: string;
  direction: "left" | "right";
  speed: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  flickerEvery?: number;
}) {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "right" ? [100 * speed, -300 * speed] : [-200 * speed, 200 * speed]
  );

  const repeats = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="overflow-hidden whitespace-nowrap py-1">
      <motion.div style={{ x }} className="flex w-max gap-6 sm:gap-10 lg:gap-14">
        {repeats.map((i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 sm:gap-10 lg:gap-14">
            {i % flickerEvery === 0 ? (
              <FlickerWord>{word}</FlickerWord>
            ) : (
              <span className="text-stroke text-3xl font-bold uppercase tracking-widest sm:text-5xl lg:text-7xl">
                {word}
              </span>
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const lines: { word: string; direction: "left" | "right"; speed: number; flickerEvery: number }[] = [
  { word: "Diseñar", direction: "right", speed: 0.3, flickerEvery: 3 },
  { word: "Desarrollar", direction: "left", speed: 0.4, flickerEvery: 3 },
  { word: "Desplegar", direction: "right", speed: 0.35, flickerEvery: 3 },
  { word: "Iterar", direction: "left", speed: 0.25, flickerEvery: 3 },
  { word: "Diseñar", direction: "right", speed: 0.3, flickerEvery: 3 },
  { word: "Desarrollar", direction: "left", speed: 0.4, flickerEvery: 3 },
];

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
  const marqueeOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  return (
    <section
      id="studio"
      ref={ref}
      className="relative overflow-hidden pt-32 pb-0 lg:pt-48 lg:pb-0"
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

        </div>

      <motion.div
        style={{ opacity: marqueeOpacity }}
        className="relative w-full cursor-default overflow-hidden py-4 lg:py-8"
      >
        <div className="-rotate-3 scale-110">
          {lines.map((line, i) => (
            <MarqueeLine
              key={`${line.word}-${i}`}
              word={line.word}
              direction={line.direction}
              speed={line.speed}
              flickerEvery={line.flickerEvery}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
