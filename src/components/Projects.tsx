"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { RevealLine, ClipReveal } from "./Animations";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  color: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Klip",
    description:
      "Plataforma de contenido digital que redefine la experiencia de consumo de medios.",
    tags: ["React", "TypeScript", "D3.js"],
    year: "2026",
    color: "#1a1a2e",
  },
  {
    id: "02",
    title: "Boobaa",
    description:
      "Ecosistema de software diseñado para escalar con elegancia y precisión.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    year: "2026",
    color: "#0f2e1a",
  },
  {
    id: "03",
    title: "Afip",
    description:
      "Sistema de gestión y cumplimiento tributario con una interfaz clara y eficiente.",
    tags: ["Next.js", "MapLibre", "Go"],
    year: "2025",
    color: "#2e1a1a",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState<[number, number]>([0, 1]);
  const [translateX, setTranslateX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, scrollRange, ["0px", `${translateX}px`]);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;
      const section = containerRef.current;
      const track = trackRef.current;
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;
      const trackWidth = track.scrollWidth;
      const visibleWidth = section.clientWidth;
      const maxTranslate = -(trackWidth - visibleWidth);

      if (maxTranslate >= 0) {
        setScrollRange([0, 1]);
        setTranslateX(0);
        return;
      }

      const startProgress = viewportHeight / (sectionHeight + viewportHeight);
      const endProgress = 1 - viewportHeight / (sectionHeight + viewportHeight);

      setScrollRange([startProgress, endProgress]);
      setTranslateX(maxTranslate);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="work" ref={containerRef} className="relative min-h-screen py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 flex items-end justify-between">
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

      <div className="overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-8 pl-6 lg:pl-12">
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

  return (
    <ClipReveal delay={index * 0.1}>
      <motion.article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex-shrink-0 w-[85vw] cursor-pointer lg:w-[520px]"
      >
        <div
          className="relative aspect-[4/5] overflow-hidden border border-border transition-colors duration-500 group-hover:border-muted/30"
          style={{ backgroundColor: project.color }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted/60">
                  {project.year}
                </span>
                <h3 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
                  {project.title}
                </h3>
              </div>
              <motion.div
                animate={{
                  rotate: isHovered ? 45 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                className="rounded-full border border-border p-3 transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="mt-6"
            >
              <p className="text-sm leading-relaxed text-muted/80">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border/50 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-muted/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute top-8 left-8 text-[10px] font-mono tracking-wider text-muted/40">
            {project.id}
          </div>
        </div>
      </motion.article>
    </ClipReveal>
  );
}
