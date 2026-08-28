"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

const DI_X_LOGO = "/logo di.x.webp";
const ROWS = 14;

export default function LogoTransition({
  url,
  onDone,
}: {
  url: string;
  onDone: () => void;
}) {
  const perRow = useMemo(
    () => Math.max(4, Math.ceil(window.innerWidth / 130)),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if (url) window.location.href = url;
      onDone();
    }, 2400);
    return () => clearTimeout(t);
  }, [url, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div
        initial={{ x: "-22vw", y: "24vh", rotate: -3 }}
        animate={{ x: "22vw", y: "-24vh", rotate: -3 }}
        transition={{ duration: 2.2, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "150vw", height: "150vh" }}
      >
        {Array.from({ length: ROWS }, (_, r) => (
          <motion.div
            key={r}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12, delay: (r / ROWS) * 1.2 }}
            className="flex w-full items-center"
            style={{ height: `${100 / ROWS}%` }}
          >
            {Array.from({ length: perRow }, (_, k) => (
              <div
                key={k}
                className="flex h-full flex-1 items-center justify-center"
              >
                <img
                  src={DI_X_LOGO}
                  alt=""
                  className="object-contain"
                  style={{ height: "min(9vh, 110px)", width: "auto" }}
                />
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}