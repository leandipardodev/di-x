"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export interface BifurcateOption {
  label: string;
  href: string;
}

export default function BifurcateLink({
  label,
  options,
}: {
  label: string;
  options: BifurcateOption[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`group flex cursor-pointer items-center gap-3 text-sm transition-colors ${
          open ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
      >
        <span className="h-px w-8 bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-foreground" />
        {label}
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          <ArrowUpRight className="h-3 w-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-full top-1/2 z-10 -translate-y-1/2 ml-2"
          >
            <div className="relative h-14 w-[220px]">
              <svg
                viewBox="0 0 120 56"
                width="120"
                height="56"
                className="absolute left-0 top-0 text-white/25"
                fill="none"
              >
                {/* continuation of base line */}
                <motion.line
                  x1="0"
                  y1="28"
                  x2="20"
                  y2="28"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                {/* upper branch */}
                <motion.path
                  d="M20 28 C 34 28, 40 14, 52 8 H 88 M 88 4 V 12"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                />
                {/* lower branch */}
                <motion.path
                  d="M20 28 C 34 28, 40 42, 52 48 H 88 M 88 44 V 52"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                />
              </svg>

              {/* branch labels */}
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.65 }}
                className="absolute left-[92px] top-[1px]"
              >
                <a
                  href={options[0]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[11px] leading-none text-muted transition-colors hover:text-foreground"
                >
                  {options[0]?.label}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.65 }}
                className="absolute left-[92px] top-[45px]"
              >
                <a
                  href={options[1]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[11px] leading-none text-muted transition-colors hover:text-foreground"
                >
                  {options[1]?.label}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}