"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

export default function LogoTransition({
  logo,
  url,
  onDone,
}: {
  logo: string;
  url: string;
  onDone: () => void;
}) {
  const logos = useMemo(
    () =>
      Array.from({ length: 22 }, () => {
        const size = 44 + Math.random() * 84;
        const duration = 0.9 + Math.random() * 1.2;
        const delay = Math.random() * 0.3;
        const fromX = -30 + Math.random() * 20;
        const fromY = 80 + Math.random() * 35;
        const toX = 55 + Math.random() * 60;
        const toY = -30 - Math.random() * 40;
        const rotate = -24 + Math.random() * 48;
        const opacity = 0.5 + Math.random() * 0.5;
        return { size, duration, delay, fromX, fromY, toX, toY, rotate, opacity };
      }),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (url) window.location.href = url;
      onDone();
    }, 1700);
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
          src={logo}
          alt=""
          className="absolute select-none object-contain will-change-transform"
          style={{ width: l.size, opacity: l.opacity, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4))" }}
          initial={{ x: `${l.fromX}vw`, y: `${l.fromY}vh`, rotate: l.rotate }}
          animate={{ x: `${l.toX}vw`, y: `${l.toY}vh`, rotate: l.rotate * 1.4 }}
          transition={{ duration: l.duration, delay: l.delay, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}