"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";

declare global {
  interface Window {
    ScrollyVideo: new (opts: Record<string, unknown>) => {
      destroy: () => void;
      setVideoPercentage: (p: number, opts?: { jump?: boolean }) => void;
    };
  }
}

const descriptionWords =
  "Diseño y desarrollo de software con precisión y propósito. Experiencias digitales que generan impacto.".split(
    " "
  );

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{
    destroy: () => void;
    setVideoPercentage: (p: number, opts?: { jump?: boolean }) => void;
  } | null>(null);

  const [visibleWords, setVisibleWords] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleBlur = useTransform(scrollYProgress, [0, 0.3], [20, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1.05, 1]);

  const labelOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const footerOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);

  useEffect(() => {
    const suppressVideoAbort = (e: PromiseRejectionEvent) => {
      if (e.reason?.name === "AbortError") e.preventDefault();
    };
    window.addEventListener("unhandledrejection", suppressVideoAbort);
    return () =>
      window.removeEventListener("unhandledrejection", suppressVideoAbort);
  }, []);

  const onReady = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.setVideoPercentage(0, { jump: true });
    }
  }, []);

  useEffect(() => {
    if (!videoContainerRef.current || instanceRef.current) return;

    const isIOS =
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    const loadAndInit = async () => {
      if (!window.ScrollyVideo) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "/scrolly-video.js";
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Failed to load scrolly-video.js"));
          document.head.appendChild(script);
        });
      }

      if (videoContainerRef.current && window.ScrollyVideo) {
        instanceRef.current = new window.ScrollyVideo({
          scrollyVideoContainer: videoContainerRef.current,
          src: "/video.mp4",
          trackScroll: false,
          lockScroll: false,
          useWebCodecs: !isIOS,
          cover: true,
          sticky: false,
          full: false,
          onReady,
        });
      }
    };

    loadAndInit().catch(() => {});

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [onReady]);

  const rafRef = useRef(0);
  const lastUpdateRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const now = performance.now();
      if (now - lastUpdateRef.current >= 32) {
        lastUpdateRef.current = now;
        instanceRef.current?.setVideoPercentage(latest);
      }
    });

    if (latest >= 0.7 && latest <= 0.9) {
      const t = (latest - 0.7) / 0.2;
      setVisibleWords(Math.floor(t * descriptionWords.length));
    } else if (latest < 0.7) {
      setVisibleWords(0);
    } else {
      setVisibleWords(descriptionWords.length);
    }
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div ref={videoContainerRef} className="scrolly-container absolute inset-0" />

        <div className="absolute inset-0 z-10 bg-background/70" />

        <motion.div
          className="relative z-20 flex flex-col items-center px-6"
        >
          <motion.span
            style={{
              opacity: labelOpacity,
            }}
            className="mb-4 text-[11px] uppercase tracking-[0.4em] text-muted"
          >
            Estudio de Software
          </motion.span>

          <div>
            <motion.h1
              style={{
                filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
                opacity: titleOpacity,
                scale: titleScale,
              }}
              className="text-center text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.9] tracking-tighter"
            >
              di
              <span className="font-light text-muted">.</span>X
            </motion.h1>
          </div>

          <div className="mt-10 flex flex-col items-center gap-6">
            <p className="max-w-md text-center text-sm leading-relaxed text-muted">
              {descriptionWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.25em] transition-opacity duration-200"
                  style={{ opacity: i < visibleWords ? 1 : 0 }}
                >
                  {word}
                </span>
              ))}
            </p>

            <motion.div
              style={{ opacity: footerOpacity }}
              className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-muted"
            >
              <span>Buenos Aires</span>
              <span className="h-px w-8 bg-border" />
              <span>2026</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
