"use client";

import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>

      <main>
        <Hero />

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="mx-auto my-8 h-px max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent px-6 lg:px-12"
          />
        </div>

        <Manifesto />

        <Projects />

        <Contact />
      </main>

      <Footer />
    </main>
  );
}
