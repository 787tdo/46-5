import { Scale, Mail, Phone } from "lucide-react";

interface FooterProps {
  onAdminClick: () => void;
}

export function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer style={{ backgroundColor: "#111827" }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Scale size={20} color="#ffffff" />
              <span style={{ color: "#ffffff", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em", fontSize: "0.85rem" }} className="uppercase">
                Voz Ciudadana México
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: "320px" }}>
              Plataforma ciudadana independiente de apoyo gratuito a víctimas de inseguridad, corrupción y abandono institucional en México. Sin partido político. Sin costo. Con dignidad.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <a href="mailto:contacto@vozciudadana.mx" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
                <Mail size={13} />
                contacto@vozciudadana.mx
              </a>
              <a href="tel:8001234567" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
                <Phone size={13} />
                800 VOZ-CIUDADANA (línea de apoyo)
              </a>
            </div>
          </div>

          {/* Causas */}
          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", color: "#ffffff", fontSize: "0.8rem", letterSpacing: "0.08em", marginBottom: "1.25rem" }} className="uppercase">
              Causas
            </h4>
            <ul className="flex flex-col gap-3">
              {["Madres Buscadoras","Anticorrupción","Seguridad ciudadana","Ni Una Más","Derechos Humanos","Marchas pacíficas"].map((item) => (
                <li key={item}>
                  <a href="#causas" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }} className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontFamily: "Inter, sans-serif", color: "#ffffff", fontSize: "0.8rem", letterSpacing: "0.08em", marginBottom: "1.25rem" }} className="uppercase">
              Información
            </h4>
            <ul className="flex flex-col gap-3">
              {["Acerca de nosotros","Estadísticas nacionales","Aviso de privacidad","Términos de uso","Contacto de emergencia","Prensa y medios"].map((item) => (
                <li key={item}>
                  <a href="#acerca" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }} className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.25)", fontSize: "0.72rem" }}>
            © 2024 Voz Ciudadana México · Plataforma sin fines de lucro · Datos: SESNSP · INEGI · Transparencia Internacional
          </p>
          <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
            Hecho con dignidad en México 🇲🇽
          </div>
        </div>

        {/* Hidden admin button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={onAdminClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.08)",
              letterSpacing: "0.15em",
              padding: "0.5rem 1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.08)"; }}
          >
            Iniciar
          </button>
        </div>
      </div>
    </footer>
  );
}
