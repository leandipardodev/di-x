"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { RevealLine } from "./Animations";

declare global {
  interface Window {
    ScrollyVideo: new (opts: Record<string, unknown>) => {
      destroy: () => void;
    };
  }
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ destroy: () => void } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [0.85, 1]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [0.75, 0.45, 0.35, 0.65]
  );
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12],
    [1, 0]
  );

  useEffect(() => {
    if (!videoContainerRef.current || instanceRef.current) return;

    const loadAndInit = async () => {
      await new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/scrolly-video@latest/dist/scrolly-video.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

      if (videoContainerRef.current && window.ScrollyVideo) {
        instanceRef.current = new window.ScrollyVideo({
          scrollyVideoContainer: videoContainerRef.current,
          src: "/video.mp4",
          trackScroll: true,
          useWebCodecs: true,
          cover: true,
          sticky: false,
          full: false,
        });
      }
    };

    loadAndInit();

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div ref={videoContainerRef} className="absolute inset-0" />

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background z-10"
        />

        <motion.div
          style={{ opacity: textOpacity, scale: titleScale }}
          className="relative z-20 flex flex-col items-center px-6"
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

          <div className="mt-10 flex flex-col items-center gap-6">
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
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
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
      </div>
    </div>
  );
}
