"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

function useCubeSize() {
  const [size, setSize] = useState({
    w: 340,
    h: 440,
    perspective: 1100,
    isMobile: false,
  });
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setSize(
        mobile
          ? { w: 200, h: 280, perspective: 750, isMobile: true }
          : { w: 340, h: 440, perspective: 1100, isMobile: false }
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

function AnnotationBlock({
  project,
  opacity,
  align = "left",
}: {
  project: Project;
  opacity: any;
  align?: "left" | "right";
}) {
  const isRight = align === "right";
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className={isRight ? "text-right" : ""}>
        <div
          className={`mb-5 flex items-center gap-3 ${
            isRight ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className="h-px flex-shrink-0 bg-white/15"
            style={{ width: 48 }}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
            {project.year}
          </span>
        </div>

        <div
          className={`mb-5 flex items-center gap-3 ${
            isRight ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className="h-px flex-shrink-0 bg-white/25"
            style={{ width: 80 }}
          />
          <h3 className="flex-shrink-0 text-xl font-bold tracking-tight text-white lg:text-2xl">
            {project.title}
          </h3>
        </div>

        <p
          className={`mb-5 max-w-[210px] text-[11px] leading-[1.7] text-white/35 ${
            isRight ? "ml-auto" : ""
          }`}
        >
          {project.description}
        </p>

        <div
          className={`flex flex-wrap gap-1.5 ${isRight ? "justify-end" : ""}`}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { w: cubeW, h: cubeH, perspective, isMobile } = useCubeSize();
  const halfD = cubeW / 2;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28, 0.43, 0.53, 0.68, 0.78, 1],
    [0, 0, -90, -90, -180, -180, -270, -270]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -5, 4, -4, 0]
  );
  const floatY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -10, 5, -8, 0]
  );
  const cubeX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.28, 0.43, 0.53, 0.68, 0.78, 1],
    ["0vw", "0vw", "22vw", "22vw", "-22vw", "-22vw", "0vw", "0vw"]
  );
  const cubeOpacity = useTransform(
    scrollYProgress,
    [0.88, 0.95],
    [1, 0]
  );

  const hablemosOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [0, 1]
  );
  const hablemosScale = useTransform(
    scrollYProgress,
    [0.85, 1],
    [0.5, 1.15]
  );

  const klipOp = useTransform(
    scrollYProgress,
    [0, 0.03, 0.16, 0.26],
    [0, 1, 1, 0]
  );
  const boobaOp = useTransform(
    scrollYProgress,
    [0.2, 0.28, 0.41, 0.51],
    [0, 1, 1, 0]
  );
  const arcaOp = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.66, 0.76],
    [0, 1, 1, 0]
  );

  const scrollIndicatorOp = useTransform(
    scrollYProgress,
    [0, 0.06],
    [1, 0]
  );

  const faces = [
    { ry: 0, project: projects[0] },
    { ry: 90, project: projects[1] },
    { ry: 180, project: projects[2] },
    { ry: 270, project: null },
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/15">
            Proyectos
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full bg-white/[0.015] blur-[150px]"
            style={{ width: cubeW * 2.8, height: cubeH * 1.6 }}
          />
        </div>

        <div className="relative h-full w-full max-w-[1400px]">
          <div
            className="absolute left-6 z-20 hidden lg:block"
            style={{ width: 260, top: "50%", transform: "translateY(-50%)" }}
          >
            <div className="relative" style={{ height: cubeH }}>
              <AnnotationBlock project={projects[0]} opacity={klipOp} />
              <AnnotationBlock project={projects[1]} opacity={boobaOp} />
            </div>
          </div>

          <div
            className="absolute right-6 z-20 hidden lg:block"
            style={{ width: 260, top: "50%", transform: "translateY(-50%)" }}
          >
            <div className="relative" style={{ height: cubeH }}>
              <AnnotationBlock
                project={projects[0]}
                opacity={klipOp}
                align="right"
              />
              <AnnotationBlock
                project={projects[2]}
                opacity={arcaOp}
                align="right"
              />
            </div>
          </div>

          <div
            className="absolute left-1/2 z-10"
            style={{
              perspective,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div style={{ x: cubeX, opacity: cubeOpacity }}>
              <motion.div
                style={{
                  width: cubeW,
                  height: cubeH,
                  rotateY,
                  rotateX,
                  y: floatY,
                  transformStyle: "preserve-3d",
                }}
              >
                {faces.map((face, i) => (
                  <div
                    key={i}
                    className="absolute overflow-hidden border border-white/[0.06]"
                    style={{
                      width: cubeW,
                      height: cubeH,
                      transform: `rotateY(${face.ry}deg) translateZ(${halfD}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {face.project ? (
                      <>
                        <img
                          src={face.project.image}
                          alt={face.project.title}
                          className="absolute inset-0 h-full w-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
                        <div className="absolute top-5 left-5 font-mono text-[10px] tracking-wider text-white/20">
                          {face.project.id}
                        </div>
                        <div className="absolute bottom-5 left-5 right-5">
                          <h3 className="text-xl font-bold tracking-tight text-white lg:text-2xl">
                            {face.project.title}
                          </h3>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center bg-[#080808] text-center">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-white/20">
                          ¿Tenés un proyecto?
                        </span>
                        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                          Hablemos
                        </h3>
                        <div className="mt-6 h-px w-12 bg-white/15" />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
              <div className="absolute -bottom-8 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </motion.div>
          </div>

          {isMobile && (
            <div className="absolute bottom-20 left-0 right-0 px-6 text-center">
              <motion.div
                style={{ opacity: klipOp }}
                className="absolute inset-x-6 bottom-0"
              >
                <h3 className="text-base font-bold tracking-tight text-white">
                  Klip
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  2026 · React Native
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: boobaOp }}
                className="absolute inset-x-6 bottom-0"
              >
                <h3 className="text-base font-bold tracking-tight text-white">
                  Boobaa
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  2026 · Arduino
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: arcaOp }}
                className="absolute inset-x-6 bottom-0"
              >
                <h3 className="text-base font-bold tracking-tight text-white">
                  Arca
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  2025 · Next.js
                </p>
              </motion.div>
            </div>
          )}

          <motion.div
            style={{ opacity: hablemosOpacity, scale: hablemosScale }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <h2 className="text-6xl font-bold tracking-tight text-white lg:text-[8rem]">
              Hablemos
            </h2>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOp }}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/20">
            Scroll
          </span>
          <div className="h-5 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
