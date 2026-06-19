import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "92vh", backgroundColor: "#1a2744" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1680407470509-44b8c229b1cb?w=1400&h=900&fit=crop&auto=format"
          alt="Ciudadanos marchando por la justicia en México"
          className="w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,39,68,0.85) 0%, rgba(26,39,68,0.7) 60%, rgba(26,39,68,0.95) 100%)",
          }}
        />
      </div>

      {/* Left accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: "#b91c1c" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 flex flex-col justify-center min-h-screen">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px" style={{ backgroundColor: "#b91c1c" }} />
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
            }}
            className="uppercase"
          >
            Plataforma ciudadana gratuita · México
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "Crimson Pro, Georgia, serif",
            color: "#ffffff",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            lineHeight: 1.1,
            fontWeight: 700,
            maxWidth: "700px",
          }}
        >
          Cuando el gobierno
          <br />
          <span style={{ color: "#e5e5e5", fontStyle: "italic" }}>no nos escucha,</span>
          <br />
          nos escuchamos entre todos.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "Inter, sans-serif",
            color: "rgba(255,255,255,0.7)",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            maxWidth: "560px",
            marginTop: "1.75rem",
          }}
        >
          Espacio de organización civil para madres buscadoras, activistas,
          víctimas de corrupción e inseguridad. Sin costo. Sin partido político.
          Solo ciudadanos unidos.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#registro"
            style={{
              backgroundColor: "#b91c1c",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.95rem",
              padding: "0.875rem 2rem",
            }}
            className="rounded-sm hover:opacity-90 transition-opacity"
          >
            Unirme ahora — es gratuito
          </a>
          <a
            href="#causas"
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.95rem",
              padding: "0.875rem 2rem",
            }}
            className="rounded-sm hover:border-white/60 transition-colors"
          >
            Ver causas activas
          </a>
        </motion.div>

        {/* Counter strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-10 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          {[
            { value: "112,000+", label: "Personas desaparecidas en México" },
            { value: "29,800", label: "Homicidios registrados en 2023" },
            { value: "47,000+", label: "Ciudadanos ya registrados" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  color: "#ffffff",
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.78rem",
                  marginTop: "0.3rem",
                  maxWidth: "160px",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>
          Scroll
        </span>
        <ArrowDown size={16} color="rgba(255,255,255,0.4)" />
      </div>
    </section>
  );
}
