import { useState } from "react";
import { Clock, ExternalLink, ChevronRight, Globe, AlertCircle } from "lucide-react";

const categories = ["Todas", "México", "Derechos Humanos", "Corrupción", "Seguridad", "Internacional"];

const news = [
  {
    id: 1,
    category: "México",
    tag: "DESAPARICIONES",
    tagColor: "#b91c1c",
    featured: true,
    title: "México supera 112,000 personas desaparecidas: el Registro Nacional alcanza cifra histórica",
    summary:
      "El Registro Nacional de Personas Desaparecidas y No Localizadas (RNPDNO) reporta que México supera por primera vez la barrera de 112,000 casos acumulados desde 1964. Organizaciones civiles señalan que la cifra real es aún mayor por la falta de denuncia. Las madres buscadoras exigen al gobierno federal activar protocolos de búsqueda en vida y aumentar el presupuesto de la Comisión Nacional de Búsqueda.",
    date: "14 jun 2025",
    source: "RNPDNO / Causa en Común",
    image: "https://images.unsplash.com/photo-1680407470509-44b8c229b1cb?w=700&h=400&fit=crop&auto=format",
    readTime: "4 min",
  },
  {
    id: 2,
    category: "Internacional",
    tag: "DERECHOS HUMANOS",
    tagColor: "#2d4a7a",
    featured: false,
    title: "CIDH llama a México a proteger a defensores de derechos humanos tras ola de asesinatos",
    summary:
      "La Comisión Interamericana de Derechos Humanos emitió una resolución urgente exigiendo a México implementar medidas cautelares para activistas y defensores ambientales. En lo que va de 2025, al menos 12 defensores han sido asesinados, varios de ellos en Guerrero y Oaxaca. La CIDH señala que México incumple el compromiso adquirido en el Acuerdo de Escazú.",
    date: "12 jun 2025",
    source: "CIDH / Amnistía Internacional",
    image: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=700&h=400&fit=crop&auto=format",
    readTime: "3 min",
  },
  {
    id: 3,
    category: "Corrupción",
    tag: "ANTICORRUPCIÓN",
    tagColor: "#374151",
    featured: false,
    title: "Transparencia Internacional: México cae 3 posiciones en el Índice de Percepción de Corrupción 2024",
    summary:
      "El IPC 2024 coloca a México en el lugar 129 de 180 países con una puntuación de 31/100, tres posiciones por debajo del año anterior. El informe señala como factores clave la falta de independencia del poder judicial, la impunidad en casos de alto perfil y el debilitamiento del sistema de organismos autónomos de fiscalización.",
    date: "11 jun 2025",
    source: "Transparencia Internacional",
    image: "",
    readTime: "3 min",
  },
  {
    id: 4,
    category: "Internacional",
    tag: "MUNDO",
    tagColor: "#4b5563",
    featured: false,
    title: "ONU advierte que la violencia contra periodistas alcanza niveles récord en América Latina",
    summary:
      "El informe anual de la UNESCO sobre libertad de prensa documenta que América Latina concentra el 40% de los asesinatos de periodistas en el mundo en 2024. México encabeza la lista con al menos 8 periodistas asesinados, la mayoría cubriendo crimen organizado y corrupción municipal. La ONU exige mecanismos de protección urgentes.",
    date: "10 jun 2025",
    source: "UNESCO / RSF",
    image: "https://images.unsplash.com/photo-1599727076124-e1c82d722dda?w=700&h=400&fit=crop&auto=format",
    readTime: "5 min",
  },
  {
    id: 5,
    category: "Seguridad",
    tag: "SEGURIDAD",
    tagColor: "#1a2744",
    featured: false,
    title: "Incidente en Sinaloa: desplazamiento de 3,000 personas en menos de 72 horas por violencia entre grupos",
    summary:
      "La escalada de violencia entre facciones del crimen organizado en la Sierra Sinaloense provocó el desplazamiento forzado de al menos 3,000 personas de comunidades indígenas. La CNDH emitió medidas cautelares y exige la presencia del Ejército para garantizar el retorno seguro. Organizaciones de derechos humanos documentan saqueos y destrucción de viviendas.",
    date: "9 jun 2025",
    source: "CNDH / El Informador",
    image: "",
    readTime: "4 min",
  },
  {
    id: 6,
    category: "México",
    tag: "FEMINICIDIO",
    tagColor: "#7c1d1d",
    featured: false,
    title: "Congreso debate nueva ley para tipificar correctamente feminicidios; colectivos denuncian obstáculos",
    summary:
      "El Congreso discute reformas al Código Penal Federal para estandarizar la tipificación del feminicidio en los 32 estados. Actualmente, la definición varía por entidad, lo que permite a fiscalías reclasificar casos para evitar la agravante. Colectivos como Ni Una Más advierten que el dictamen actual tiene lagunas que benefician la impunidad.",
    date: "8 jun 2025",
    source: "Cámara de Diputados / GIRE",
    image: "",
    readTime: "3 min",
  },
  {
    id: 7,
    category: "Derechos Humanos",
    tag: "DERECHOS",
    tagColor: "#2d4a7a",
    featured: false,
    title: "Corte IDH condena a México por desaparición forzada y ordena reparaciones a familia de Guerrero",
    summary:
      "La Corte Interamericana de Derechos Humanos encontró al Estado mexicano responsable de la desaparición forzada de un activista indígena en Guerrero en 2011 y ordenó reparaciones económicas, investigación exhaustiva y garantías de no repetición. Es la sentencia número 34 en contra de México ante el sistema interamericano.",
    date: "7 jun 2025",
    source: "Corte IDH",
    image: "",
    readTime: "4 min",
  },
  {
    id: 8,
    category: "Internacional",
    tag: "INTERNACIONAL",
    tagColor: "#4b5563",
    featured: false,
    title: "El Salvador y Honduras reportan caída histórica en homicidios; expertos debaten sostenibilidad del modelo",
    summary:
      "Mientras El Salvador registra tasas de homicidio inferiores a muchos países europeos tras el régimen de excepción, organismos de derechos humanos documentan más de 7,000 detenciones arbitrarias y condiciones penitenciarias calificadas como tortura. El debate sobre si el modelo puede replicarse en México genera divisiones entre académicos, activistas y autoridades.",
    date: "6 jun 2025",
    source: "InSight Crime / Human Rights Watch",
    image: "",
    readTime: "6 min",
  },
];

export function News() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [expanded, setExpanded] = useState<number | null>(null);

  const featured = news.find((n) => n.featured);
  const rest = news.filter((n) => !n.featured);
  const filteredRest =
    activeCategory === "Todas"
      ? rest
      : rest.filter((n) => n.category === activeCategory);

  return (
    <section id="noticias" style={{ backgroundColor: "#f5f4f0" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px" style={{ backgroundColor: "#b91c1c" }} />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "#b91c1c",
                }}
                className="uppercase"
              >
                Noticias relevantes
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Lo que está pasando
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#6b6b6b",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                marginTop: "0.75rem",
                maxWidth: "420px",
              }}
            >
              Información verificada sobre derechos humanos, corrupción, seguridad
              y justicia en México y el mundo.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle size={14} color="#6b6b6b" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#6b6b6b" }}>
              Fuentes verificadas · Actualizado junio 2025
            </span>
          </div>
        </div>

        {/* Featured story */}
        {featured && activeCategory === "Todas" && (
          <div
            className="mb-10 grid md:grid-cols-2 overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(26,39,68,0.1)",
              borderTop: "4px solid #b91c1c",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${featured.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#1a2744",
                minHeight: "280px",
              }}
            />
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.65rem",
                      color: featured.tagColor,
                      backgroundColor: `${featured.tagColor}15`,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "2px",
                      letterSpacing: "0.1em",
                    }}
                    className="uppercase"
                  >
                    {featured.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.63rem",
                      color: "#9a9a9a",
                      letterSpacing: "0.06em",
                    }}
                    className="uppercase"
                  >
                    Nota principal
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Crimson Pro, Georgia, serif",
                    color: "#1a2744",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1.25,
                    marginBottom: "1rem",
                  }}
                >
                  {featured.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#5a5a5a",
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                  }}
                >
                  {featured.summary}
                </p>
              </div>
              <div
                className="flex items-center justify-between flex-wrap gap-3 pt-5 mt-4"
                style={{ borderTop: "1px solid rgba(26,39,68,0.08)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} color="#9a9a9a" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#9a9a9a" }}>
                      {featured.readTime} de lectura
                    </span>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#9a9a9a" }}>
                    {featured.date}
                  </span>
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#6b6b6b" }}>
                  Fuente: {featured.source}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem",
                padding: "0.35rem 0.9rem",
                backgroundColor: activeCategory === cat ? "#1a2744" : "transparent",
                color: activeCategory === cat ? "#ffffff" : "#1a2744",
                border: "1px solid",
                borderColor: activeCategory === cat ? "#1a2744" : "rgba(26,39,68,0.2)",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRest.map((item) => {
            const isOpen = expanded === item.id;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(26,39,68,0.1)",
                  borderTop: `3px solid ${item.tagColor}`,
                  display: "flex",
                  flexDirection: "column",
                }}
                className="hover:shadow-md transition-shadow"
              >
                {/* Image if available */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                  />
                )}

                <div className="p-5 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.6rem",
                        color: item.tagColor,
                        letterSpacing: "0.08em",
                        backgroundColor: `${item.tagColor}12`,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "2px",
                      }}
                      className="uppercase"
                    >
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1">
                      <Globe size={10} color="#9a9a9a" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#9a9a9a" }}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "Crimson Pro, Georgia, serif",
                      color: "#1a2744",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      marginBottom: "0.75rem",
                      flexGrow: 1,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Summary — expandable */}
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#5a5a5a",
                      fontSize: "0.82rem",
                      lineHeight: 1.7,
                      marginBottom: "1rem",
                      overflow: "hidden",
                      maxHeight: isOpen ? "500px" : "4.5em",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    {item.summary}
                  </p>

                  <button
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      color: item.tagColor,
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      marginBottom: "1rem",
                    }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {isOpen ? "Leer menos" : "Leer más"} <ChevronRight size={11} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                  </button>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between flex-wrap gap-2 pt-3 mt-auto"
                    style={{ borderTop: "1px solid rgba(26,39,68,0.07)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock size={11} color="#9a9a9a" />
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "#9a9a9a" }}>
                        {item.date}
                      </span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#9a9a9a" }}>
                      {item.source}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div
          className="flex items-start gap-3 mt-10"
          style={{
            backgroundColor: "rgba(26,39,68,0.04)",
            border: "1px solid rgba(26,39,68,0.1)",
            padding: "1rem 1.25rem",
            borderRadius: "2px",
          }}
        >
          <ExternalLink size={13} color="#6b6b6b" style={{ marginTop: "2px", flexShrink: 0 }} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#6b6b6b", lineHeight: 1.6 }}>
            Las noticias presentadas son elaboradas a partir de fuentes públicas verificadas (organismos internacionales, dependencias oficiales y medios de comunicación independientes).
            Voz Ciudadana no es un medio de comunicación y no garantiza la actualización en tiempo real de los contenidos.
          </p>
        </div>
      </div>
    </section>
  );
}
