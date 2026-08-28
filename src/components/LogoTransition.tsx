"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const DI_X_LOGO = "/logo di.x.webp";

export default function LogoTransition({
  url,
  onDone,
}: {
  url: string;
  onDone: () => void;
}) {
  const logos = useMemo(() => {
    const waves = [
      { count: 8, delayBase: 0, delaySpread: 0.1, durMin: 2.0, durMax: 2.3 },
      { count: 20, delayBase: 0.18, delaySpread: 0.2, durMin: 1.8, durMax: 2.1 },
      { count: 36, delayBase: 0.38, delaySpread: 0.28, durMin: 1.6, durMax: 2.0 },
    ];
    const items: {
      size: number;
      duration: number;
      delay: number;
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
    }[] = [];
    waves.forEach((w) => {
      for (let i = 0; i < w.count; i++) {
        const size = 90 + Math.random() * 130;
        const duration = w.durMin + Math.random() * (w.durMax - w.durMin);
        const delay = w.delayBase + Math.random() * w.delaySpread;
        const fromX = -25 - Math.random() * 15;
        const fromY = 95 + Math.random() * 20;
        const toX = 75 + Math.random() * 40;
        const toY = -25 - Math.random() * 35;
        items.push({ size, duration, delay, fromX, fromY, toX, toY });
      }
    });
    return items;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (url) window.location.href = url;
      onDone();
    }, 2500);
    return () => clearTimeout(t);
  }, [url, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0a0a0a]"
    >
      {logos.map((l, i) => (
        <motion.img
          key={i}
          src={DI_X_LOGO}
          alt=""
          className="absolute select-none object-contain"
          style={{ width: l.size }}
          initial={{ x: `${l.fromX}vw`, y: `${l.fromY}vh` }}
          animate={{ x: `${l.toX}vw`, y: `${l.toY}vh` }}
          transition={{ duration: l.duration, delay: l.delay, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}