import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Foro", href: "#foro" },
    { label: "Denunciar", href: "#denunciar" },
    { label: "Causas", href: "#causas" },
    { label: "Noticias", href: "#noticias" },
    { label: "Estadísticas", href: "#estadisticas" },
    { label: "Acerca de", href: "#acerca" },
  ];

  return (
    <nav
      style={{ backgroundColor: "#1a2744", fontFamily: "Inter, sans-serif" }}
      className="sticky top-0 z-50 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Scale size={22} color="#ffffff" />
          <span style={{ color: "#ffffff", letterSpacing: "0.05em" }} className="uppercase tracking-widest text-sm">
            Voz Ciudadana México
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
              className="text-sm hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#registro"
            style={{
              backgroundColor: "#b91c1c",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
            }}
            className="text-sm px-5 py-2 rounded-sm hover:opacity-90 transition-opacity"
          >
            Registrarme
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: "#1a2744" }} className="md:hidden px-6 pb-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Inter, sans-serif" }}
              className="text-sm py-1 border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#registro"
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "#b91c1c", color: "#ffffff", fontFamily: "Inter, sans-serif" }}
            className="text-sm text-center px-5 py-2 rounded-sm mt-2"
          >
            Registrarme
          </a>
        </div>
      )}
    </nav>
  );
}
