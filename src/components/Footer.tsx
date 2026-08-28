"use client";

import { RevealLine } from "./Animations";
import BifurcateLink from "./BifurcateLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <RevealLine>
              <img src="/logo di.x.webp" alt="di.X" className="h-10 w-auto" />
            </RevealLine>
            <RevealLine delay={0.1}>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Estudio de software creando experiencias digitales de alto impacto.
              </p>
            </RevealLine>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="grid grid-cols-2 gap-8">
              <RevealLine delay={0.1}>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                    Navegación
                  </span>
                  <div className="mt-4 flex flex-col gap-3">
                    {["Estudio", "Proyectos", "Contacto"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase() === "estudio" ? "studio" : item.toLowerCase() === "proyectos" ? "work" : "contact"}`}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealLine>

              <RevealLine delay={0.2}>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                    Redes
                  </span>
                  <div className="mt-4 flex flex-col gap-3">
                    {[
                      { name: "Twitter", href: "https://twitter.com" },
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </a>
                    ))}
                    <BifurcateLink
                      label="GitHub"
                      options={[
                        { label: "leandipardodev", href: "https://github.com/leandipardodev" },
                        { label: "DiMa-Program", href: "https://github.com/DiMa-Program" },
                      ]}
                    />
                    <BifurcateLink
                      label="LinkedIn"
                      options={[
                        { label: "Leandro Di Pardo", href: "https://www.linkedin.com/in/leandro-di-pardo-7a5a6518b/" },
                        { label: "Hermano", href: "#" },
                      ]}
                    />
                  </div>
                </div>
              </RevealLine>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-muted">
            &copy; {currentYear}
            <img src="/logo di.x.webp" alt="di.X" className="h-3 w-auto" />
            Todos los derechos reservados.
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
            Construido con precisión
          </span>
        </div>
      </div>
    </footer>
  );
}
