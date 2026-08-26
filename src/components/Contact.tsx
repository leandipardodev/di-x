"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RevealLine, TextReveal, ClipReveal } from "./Animations";
import { Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="relative py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealLine>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                Contacto
              </span>
            </RevealLine>

            <RevealLine delay={0.1}>
              <h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-6xl">
                <TextReveal>Construyamos</TextReveal>
                <br />
                <TextReveal>algo</TextReveal>
                <br />
                <span className="text-muted">
                  <TextReveal>juntos.</TextReveal>
                </span>
              </h2>
            </RevealLine>

            <RevealLine delay={0.3}>
              <div className="mt-16 space-y-6">
                <img src="/logo di.x.webp" alt="di.X" className="h-6 w-auto" />
                <a
                  href="mailto:hello@di-x.studio"
                  className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <span className="h-px w-8 bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-foreground" />
                  hello@di-x.studio
                </a>
                <a
                  href="https://github.com/di-x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <span className="h-px w-8 bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-foreground" />
                  GitHub
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <span className="h-px w-8 bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-foreground" />
                  LinkedIn
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </RevealLine>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {[
                { name: "name", label: "Nombre", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "project", label: "Tipo de proyecto", type: "text" },
              ].map((field) => (
                <ClipReveal key={field.name} delay={0.1}>
                  <div className="relative border-b border-border">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent pb-4 pt-2 text-sm text-foreground outline-none placeholder:text-muted/40"
                      placeholder={field.label}
                    />
                    <motion.div
                      animate={{
                        scaleX: focused === field.name ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-foreground"
                    />
                  </div>
                </ClipReveal>
              ))}

              <ClipReveal delay={0.4}>
                <div className="relative border-b border-border">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={4}
                    className="w-full resize-none bg-transparent pb-4 pt-2 text-sm text-foreground outline-none placeholder:text-muted/40"
                    placeholder="Cuéntanos sobre tu proyecto"
                  />
                  <motion.div
                    animate={{
                      scaleX: focused === "message" ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-foreground"
                  />
                </div>
              </ClipReveal>

              <ClipReveal delay={0.5}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex cursor-pointer items-center gap-4 border border-border bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
                >
                  <span>Enviar mensaje</span>
                  <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>
              </ClipReveal>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
