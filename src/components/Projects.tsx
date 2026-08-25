"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { RevealLine, ClipReveal } from "./Animations";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  color: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Klip",
    description:
      "App de gestión de turnos, finanzas y administración integral para locales.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    year: "2026",
    color: "#1a1a2e",
    image: "/klip.webp",
  },
  {
    id: "02",
    title: "Boobaa",
    description:
      "Kiosco automático con Arduino. Máquina dispensadora inteligente con gestión remota.",
    tags: ["Arduino", "IoT", "React"],
    year: "2026",
    color: "#0f2e1a",
    image: "/booba.webp",
  },
  {
    id: "03",
    title: "Arca",
    description:
      "Plataforma para cobrar virtualmente y organizar monotributo, impuestos y facturación.",
    tags: ["Next.js", "API AFIP", "TypeScript"],
    year: "2025",
    color: "#2e1a1a",
    image: "/arca.webp",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", "-20%"]
  );

  return (
    <section id="work" ref={containerRef} className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <RevealLine>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                Proyectos seleccionados
              </span>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="mt-6 text-3xl font-bold tracking-tight lg:text-5xl">
                Proyectos
              </h2>
            </RevealLine>
          </div>
          <RevealLine delay={0.2}>
            <span className="hidden text-sm text-muted lg:block">
              {projects.length} proyectos
            </span>
          </RevealLine>
        </div>
      </div>

      <div ref={trackRef} className="overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 pl-6 lg:pl-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-12">
        <RevealLine>
          <div className="grid gap-8 border-t border-border pt-16 lg:grid-cols-3">
            <div>
              <span className="text-5xl font-bold tracking-tighter">3</span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                Proyectos entregados
              </p>
            </div>
            <div>
              <span className="text-5xl font-bold tracking-tighter">1</span>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                Misión
              </p>
            </div>
          </div>
        </RevealLine>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const titleY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const metaY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <ClipReveal delay={index * 0.1}>
      <motion.article
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex-shrink-0 w-[75vw] cursor-pointer lg:w-[520px]"
      >
        <div
          className="relative aspect-[4/5] overflow-hidden border border-border transition-colors duration-500 group-hover:border-muted/30"
          style={{ backgroundColor: project.color }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ y: imageY }}
            className="absolute inset-0 h-[120%] w-full object-cover object-center opacity-80 transition-opacity duration-500 group-hover:opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            <div className="flex items-start justify-between">
              <div>
                <motion.span
                  style={{ y: metaY }}
                  className="text-[10px] uppercase tracking-[0.3em] text-white/50"
                >
                  {project.year}
                </motion.span>
                <motion.h3
                  style={{ y: titleY }}
                  className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl"
                >
                  {project.title}
                </motion.h3>
              </div>
              <motion.div
                animate={{
                  rotate: isHovered ? 45 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black"
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            <motion.div
              style={{ y: textY }}
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="mt-6"
            >
              <p className="text-sm leading-relaxed text-white/70">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute top-8 left-8 text-[10px] font-mono tracking-wider text-white/30">
            {project.id}
          </div>
        </div>
      </motion.article>
    </ClipReveal>
  );
}
