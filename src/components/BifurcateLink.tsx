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
    <div className="relative">
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="relative mt-3 flex h-16 w-full">
              {/* bifurcating line */}
              <svg
                viewBox="0 0 160 64"
                className="absolute left-0 top-0 h-16 w-40 text-white/25"
                fill="none"
              >
                <motion.path
                  d="M40 0 V10"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <motion.path
                  d="M40 10 C 34 22, 24 26, 16 56"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                />
                <motion.path
                  d="M40 10 C 46 22, 56 26, 64 56"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                />
              </svg>

              {/* branch labels */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.65 }}
                className="absolute left-0 bottom-0 pr-2"
              >
                <a
                  href={options[0]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[11px] text-muted transition-colors hover:text-foreground"
                >
                  {options[0]?.label}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.65 }}
                className="absolute right-0 bottom-0 pl-2"
              >
                <a
                  href={options[1]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[11px] text-muted transition-colors hover:text-foreground"
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