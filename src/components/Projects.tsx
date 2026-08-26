"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, animate } from "framer-motion";
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
    image: "/booba-2.webp",
  },
  {
    id: "03",
    title: "Dix gestor",
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
    w: 350,
    h: 460,
    perspective: 1100,
    isMobile: false,
  });
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setSize(
        mobile
          ? { w: 220, h: 300, perspective: 750, isMobile: true }
          : { w: 350, h: 460, perspective: 1100, isMobile: false }
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
          <div className="h-px flex-shrink-0 bg-white/15" style={{ width: 48 }} />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
            {project.year}
          </span>
        </div>

        <div
          className={`mb-5 flex items-center gap-3 ${
            isRight ? "flex-row-reverse" : ""
          }`}
        >
          <div className="h-px flex-shrink-0 bg-white/25" style={{ width: 80 }} />
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
          className={`flex flex-wrap gap-1.5 ${
            isRight ? "justify-end" : ""
          }`}
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

function CTAFace() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
        ¿Tenés un proyecto?
      </span>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">
        Hablemos
      </h3>
      <div className="mt-6 h-px w-12 bg-white/25" />
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoBoobaaRef = useRef<HTMLVideoElement>(null);
  const videoKlipRef = useRef<HTMLVideoElement>(null);
  const lastPausedKlip = useRef(0);
  const lastPausedBoobaa = useRef(0);
  const lastScrollTime = useRef(0);
  const snapRef = useRef(false);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { w: cubeW, h: cubeH, perspective, isMobile } = useCubeSize();
  const halfD = cubeW / 2;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const facePositions = [0.15, 0.43, 0.72, 1.0];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    lastScrollTime.current = Date.now();
    if (snapRef.current) return;
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    let closest = facePositions[0];
    let minDist = Math.abs(latest - closest);
    for (const pos of facePositions) {
      const dist = Math.abs(latest - pos);
      if (dist < minDist) { closest = pos; minDist = dist; }
    }
    if (minDist < 0.015) {
      snapTimerRef.current = setTimeout(() => {
        if (Date.now() - lastScrollTime.current >= 450 && !snapRef.current) {
          snapRef.current = true;
          animate(scrollYProgress, closest, {
            type: "spring",
            stiffness: 200,
            damping: 30,
            onComplete: () => { snapRef.current = false; },
          });
        }
      }, 500);
    }
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    [-30, 0, -270]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.29, 0.43, 0.58, 0.72, 0.86, 1],
    [0, 0, -3, 0, 3, 0, -3, 0]
  );
  const floatY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.29, 0.43, 0.58, 0.72, 0.86, 1],
    [0, 0, -5, 0, 4, 0, -4, 0]
  );

  const cubeScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [0.25, 1]
  );
  const cubeIntroOp = useTransform(
    scrollYProgress,
    [0, 0.03, 0.12],
    [0.15, 0.4, 1]
  );
  const cubeIntroY = useTransform(
    scrollYProgress,
    [0, 0.15],
    [-80, 0]
  );

  const f0 = useTransform(
    scrollYProgress,
    [0.10, 0.15, 0.20],
    [0, 1, 0]
  );

  useMotionValueEvent(f0, "change", (v) => {
    const vid = videoKlipRef.current;
    if (!vid) return;
    const now = Date.now();
    if (v > 0.5) {
      if (now - lastPausedKlip.current > 1500) {
        vid.currentTime = 0;
      }
      vid.play().catch(() => {});
    } else {
      vid.pause();
      lastPausedKlip.current = now;
    }
  });

  const f1 = useTransform(
    scrollYProgress,
    [0.38, 0.43, 0.48],
    [0, 1, 0]
  );

  useMotionValueEvent(f1, "change", (v) => {
    const vid = videoBoobaaRef.current;
    if (!vid) return;
    const now = Date.now();
    if (v > 0.5) {
      if (now - lastPausedBoobaa.current > 1500) {
        vid.currentTime = 0;
      }
      vid.play().catch(() => {});
    } else {
      vid.pause();
      lastPausedBoobaa.current = now;
    }
  });

  const f2 = useTransform(
    scrollYProgress,
    [0.67, 0.72, 0.77],
    [0, 1, 0]
  );
  const f3 = useTransform(
    scrollYProgress,
    [0.92, 0.97, 1],
    [0, 1, 1]
  );

  const spotlightOp = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15, 0.29, 0.43, 0.58, 0.72, 0.86, 0.93, 1],
    [0, 0, 1, 0.05, 1, 0.05, 1, 0.05, 0.8, 1]
  );

  const faceDarken = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15, 0.29, 0.43, 0.58, 0.72, 0.86, 0.93, 1],
    [0.9, 0.9, 0, 0.8, 0, 0.8, 0, 0.8, 0.15, 0]
  );

  const imgOpacity = useTransform(spotlightOp, [0, 1], [0.15, 0.55]);

  const faceData = [
    { ry: 0, rx: 0, tz: halfD, w: cubeW, h: cubeH, project: projects[0], op: f0 },
    { ry: 90, rx: 0, tz: halfD, w: cubeW, h: cubeH, project: projects[1], op: f1 },
    { ry: 180, rx: 0, tz: halfD, w: cubeW, h: cubeH, project: projects[2], op: f2 },
    { ry: 270, rx: 0, tz: halfD, w: cubeW, h: cubeH, project: null, op: f3, cta: true },
    { ry: 0, rx: -90, tz: cubeH / 2, w: cubeW, h: cubeW, cap: true },
    { ry: 0, rx: 90, tz: cubeH / 2, w: cubeW, h: cubeW, cap: true },
  ];

  return (
    <section ref={containerRef} className="relative h-[450vh]">
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

        <div className="relative flex w-full max-w-[1400px] items-center justify-center gap-6 px-6 lg:gap-20 lg:px-16">
          <div
            className="relative hidden flex-shrink-0 lg:block"
            style={{ width: 280, height: cubeH }}
          >
            <AnnotationBlock project={projects[0]} opacity={f0} />
            <AnnotationBlock project={projects[1]} opacity={f1} />
            <AnnotationBlock project={projects[2]} opacity={f2} />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20">
            <motion.div
              style={{ opacity: spotlightOp }}
            >
              <div
                style={{
                  width: cubeW * 1.3,
                  height: cubeH * 0.8,
                  background:
                    "radial-gradient(ellipse at center bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
            </motion.div>
          </div>

          <div className="relative z-10 flex-shrink-0" style={{ perspective }}>
            <motion.div
              style={{
                scale: cubeScale,
                opacity: cubeIntroOp,
                y: cubeIntroY,
              }}
            >
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
              {faceData.map((face, i) => {
                const isCap = face.rx === 90 || face.rx === -90;
                const tx = isCap
                  ? `rotateX(${face.rx}deg) translateZ(${face.tz}px)`
                  : `rotateY(${face.ry}deg) translateZ(${face.tz}px)`;
                return (
                  <div
                    key={i}
                    className="absolute overflow-hidden"
                    style={{
                      width: face.w,
                      height: face.h,
                      top: isCap ? (cubeH - cubeW) / 2 : 0,
                      left: isCap ? (cubeW - face.w) / 2 : 0,
                      transform: tx,
                      backfaceVisibility: "hidden",
                      backgroundColor: "#0a0a0a",
                      border: face.project ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    {face.project ? (
                      <>
                        {face.project.title === "Boobaa" ? (
                          <motion.video
                            ref={videoBoobaaRef}
                            src="/video booba.mp4"
                            muted
                            playsInline
                            preload="auto"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ opacity: imgOpacity }}
                          />
                        ) : face.project.title === "Klip" ? (
                          <motion.video
                            ref={videoKlipRef}
                            src="/video klip.mp4"
                            muted
                            playsInline
                            preload="auto"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ opacity: imgOpacity }}
                          />
                        ) : (
                          <motion.img
                            src={face.project.image}
                            alt={face.project.title}
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ opacity: imgOpacity }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
                          }}
                        />
                        <div className="absolute top-5 left-5 font-mono text-[10px] tracking-wider text-white/20">
                          {face.project.id}
                        </div>
                        <div
                          className="absolute bottom-5 left-5 right-5"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: "translateZ(50px)",
                            filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.6))",
                          }}
                        >
                          {face.project.title === "Dix gestor" ? (
                              <img
                                src="/dix-gestor-logo.png"
                                alt="Dix gestor"
                                className="h-8 w-auto object-contain lg:h-10"
                              />
                            ) : face.project.title === "Klip" ? (
                              <img
                                src="/klip-logo.png"
                                alt="Klip"
                                className="h-8 w-auto object-contain lg:h-10"
                              />
                            ) : face.project.title === "Boobaa" ? (
                              <img
                                src="/boobaa-logo.png"
                                alt="Boobaa"
                                className="h-8 w-auto object-contain lg:h-10"
                              />
                            ) : (
                              <h3 className="text-xl font-bold tracking-tight text-white lg:text-2xl">
                                {face.project.title}
                              </h3>
                            )}
                        </div>
                      </>
                    ) : face.cta ? (
                      <CTAFace />
                    ) : null}

                    <motion.div
                      style={{ opacity: faceDarken }}
                      className="absolute inset-0 bg-[#0a0a0a]"
                    />
                  </div>
                );
              })}
              </motion.div>

              <div className="absolute -bottom-8 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </motion.div>
          </div>

          <div
            className="relative hidden flex-shrink-0 lg:block"
            style={{ width: 280, height: cubeH }}
          >
            <AnnotationBlock project={projects[0]} opacity={f0} align="right" />
            <AnnotationBlock project={projects[1]} opacity={f1} align="right" />
            <AnnotationBlock project={projects[2]} opacity={f2} align="right" />
          </div>
        </div>

        {isMobile && (
          <div className="absolute bottom-20 left-0 right-0 px-6 text-center">
            {faceData.filter(f => f.op !== null && f.project).map((face, i) => (
              <motion.div
                key={i}
                style={{ opacity: face.op! }}
                className="absolute inset-x-6 bottom-0"
              >
                <h3 className="text-base font-bold tracking-tight text-white">
                  {face.project!.title}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {face.project!.year} · {face.project!.tags[0]}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
