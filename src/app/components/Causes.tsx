import { useState } from "react";
import { Users, ChevronRight, ChevronDown, ChevronUp, MapPin, Calendar, ExternalLink } from "lucide-react";

const causes = [
  {
    id: 1,
    category: "Desapariciones",
    color: "#b91c1c",
    title: "Madres Buscadoras",
    shortDesc: "Red de apoyo para familias que buscan a sus seres queridos desaparecidos.",
    fullDesc:
      "Las Madres Buscadoras surgieron ante la incapacidad del Estado mexicano de investigar y resolver los casos de personas desaparecidas. Organizadas en colectivos estatales, estas mujeres — la mayoría madres — salen a buscar fosas clandestinas con sus propias manos y herramientas. Han encontrado miles de restos en terrenos que las autoridades nunca investigaron. Además del trabajo de campo, ofrecen orientación legal gratuita a nuevas familias, acompañamiento emocional y presión mediática para que los casos no sean archivados. Su lucha ha llevado a reformas en la Ley General en Materia de Desaparición Forzada y ha inspirado colectivos similares en Centroamérica.",
    members: 14820,
    estado: "Nacional",
    activa: true,
    fundacion: "2018",
    logros: [
      "Más de 4,000 fosas clandestinas localizadas",
      "Ley de Búsqueda en Vida aprobada en 7 estados",
      "Red de 45 colectivos en toda la República",
    ],
    proximoEvento: "Jornada de búsqueda en Jalisco — 22 jun 2024",
  },
  {
    id: 2,
    category: "Corrupción",
    color: "#1a2744",
    title: "Transparencia y Rendición de Cuentas",
    shortDesc: "Ciudadanos organizados para denunciar corrupción y exigir acceso a información pública.",
    fullDesc:
      "México ocupa el lugar 126 de 180 países en el Índice de Percepción de la Corrupción 2023 de Transparencia Internacional. Este movimiento reúne a ciudadanos, periodistas, abogados y expertos en datos que trabajan para documentar, denunciar y dar seguimiento a actos de corrupción en los tres niveles de gobierno. Utilizan herramientas de solicitudes de información, litigación estratégica ante el INAI y análisis de datos de contratos públicos para evidenciar irregularidades. Han logrado cancelar contratos millonarios irregulares y han presentado denuncias formales ante la SFP y la Fiscalía Anticorrupción.",
    members: 9340,
    estado: "Nacional",
    activa: true,
    fundacion: "2019",
    logros: [
      "112 denuncias formales ante la Fiscalía Anticorrupción",
      "3 contratos irregulares cancelados por más de $800M",
      "Portal de transparencia ciudadana con 60,000 documentos",
    ],
    proximoEvento: "Taller de solicitudes de información — CDMX, 28 jun 2024",
  },
  {
    id: 3,
    category: "Seguridad",
    color: "#2d4a7a",
    title: "Comunidades Seguras",
    shortDesc: "Organización vecinal para exigir soluciones concretas de seguridad en colonias vulnerables.",
    fullDesc:
      "En México, el 83% de los delitos no se denuncia por desconfianza en las autoridades (ENSU 2023). Comunidades Seguras parte de esta realidad para construir redes de denuncia vecinal y presión directa a presidencias municipales y secretarías de seguridad estatales. Sus integrantes documentan delitos, mapean zonas de riesgo, exigen alumbrado público, cámaras de vigilancia y mayor presencia policial en colonias abandonadas. También operan comités de mediación para resolver conflictos sin violencia y conectan a víctimas con asesores jurídicos.",
    members: 21500,
    estado: "Nacional",
    activa: true,
    fundacion: "2020",
    logros: [
      "Instalación de alumbrado en 68 colonias vulnerables",
      "Reducción del 24% de robos en colonias organizadas",
      "320 comités vecinales activos en 18 estados",
    ],
    proximoEvento: "Asamblea nacional de seguridad vecinal — 5 jul 2024",
  },
  {
    id: 4,
    category: "Feminicidio",
    color: "#7c1d1d",
    title: "Ni Una Más — Documentación",
    shortDesc: "Base de datos ciudadana de feminicidios y apoyo legal a familias de víctimas.",
    fullDesc:
      "En México se registran más de 975 feminicidios al año según cifras oficiales del SESNSP, aunque organizaciones civiles estiman que la cifra real supera los 3,000 cuando se incluyen los homicidios de mujeres mal clasificados. Ni Una Más documenta cada caso con nombre, edad, estado y circunstancias para impedir que sean archivados. Cuentan con una red de abogadas especializadas en perspectiva de género que litigan para lograr la correcta tipificación del delito, acceder a los expedientes y exigir la Alerta de Violencia de Género en municipios que la requieren. También acompañan emocionalmente a las familias durante años.",
    members: 18230,
    estado: "Nacional",
    activa: true,
    fundacion: "2017",
    logros: [
      "5,400+ casos documentados con nombre y expediente",
      "Alerta de Género activada en 11 municipios",
      "Red de 80 abogadas voluntarias especializadas",
    ],
    proximoEvento: "Marcha 25N anticipada — Guadalajara, 15 jun 2024",
  },
  {
    id: 5,
    category: "Marchas",
    color: "#374151",
    title: "Coordinación de Manifestaciones Pacíficas",
    shortDesc: "Plataforma para organizar marchas pacíficas con asesoría legal y comunicación segura.",
    fullDesc:
      "El derecho a la manifestación está protegido por el Artículo 9 de la Constitución, pero en la práctica cientos de manifestantes han sido detenidos arbitrariamente, especialmente durante protestas de alto impacto. Este colectivo brinda asesoría legal preventiva antes de cualquier marcha, forma redes de observadores ciudadanos que documentan posibles abusos y mantiene contacto en tiempo real con abogados de turno durante los eventos. También capacita a los coordinadores de marcha en rutas seguras, permisos y comunicación con medios de comunicación.",
    members: 7690,
    estado: "Nacional",
    activa: true,
    fundacion: "2021",
    logros: [
      "450+ manifestaciones acompañadas sin incidentes graves",
      "87 detenciones arbitrarias revertidas con amparo",
      "Protocolo de manifestación segura adoptado en 12 ciudades",
    ],
    proximoEvento: "Capacitación para coordinadores — CDMX, 19 jun 2024",
  },
  {
    id: 6,
    category: "Derechos",
    color: "#4b5563",
    title: "Defensa de Derechos Humanos",
    shortDesc: "Red de abogados voluntarios y activistas con orientación gratuita ante abusos de autoridad.",
    fullDesc:
      "México es uno de los países más peligrosos del mundo para defensores de derechos humanos. Según Global Witness, al menos 18 activistas y defensores ambientales fueron asesinados en 2023. Esta red conecta a ciudadanos víctimas de abusos de autoridad, detenciones arbitrarias, tortura o desplazamiento forzado con abogados pro bono especializados en derechos humanos. También acompañan casos ante la Comisión Nacional de los Derechos Humanos (CNDH) y el Sistema Interamericano cuando las instancias nacionales fallan.",
    members: 5100,
    estado: "Nacional",
    activa: true,
    fundacion: "2016",
    logros: [
      "2,100+ casos atendidos con orientación jurídica gratuita",
      "34 casos llevados ante la CIDH",
      "Red de 150 abogados voluntarios en toda la República",
    ],
    proximoEvento: "Clínica jurídica gratuita — Oaxaca, 25 jun 2024",
  },
];

const categories = ["Todas", "Desapariciones", "Corrupción", "Seguridad", "Feminicidio", "Marchas", "Derechos"];

export function Causes() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeCategory === "Todas"
      ? causes
      : causes.filter((c) => c.category === activeCategory);

  return (
    <section id="causas" style={{ backgroundColor: "#ffffff" }} className="py-24">
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
                Causas activas
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: "480px",
              }}
            >
              Movimientos que necesitan tu voz
            </h2>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#6b6b6b",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              maxWidth: "340px",
            }}
          >
            Únete a causas existentes o propón una nueva. Todas son verificadas
            y operan de forma independiente a partidos políticos.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8rem",
                padding: "0.4rem 1rem",
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

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {filtered.map((cause) => {
            const isOpen = expandedId === cause.id;
            return (
              <div
                key={cause.id}
                style={{
                  backgroundColor: "#f5f4f0",
                  border: "1px solid rgba(26,39,68,0.1)",
                  borderLeft: `4px solid ${cause.color}`,
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
                className="hover:shadow-md"
              >
                {/* Card header — always visible */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">

                    {/* Left: meta + title + short desc */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "0.65rem",
                            color: cause.color,
                            letterSpacing: "0.1em",
                            backgroundColor: `${cause.color}15`,
                            padding: "0.2rem 0.6rem",
                            borderRadius: "2px",
                          }}
                          className="uppercase"
                        >
                          {cause.category}
                        </span>
                        <span
                          style={{
                            backgroundColor: "rgba(22,163,74,0.1)",
                            color: "#166534",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.65rem",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "2px",
                          }}
                        >
                          Activa desde {cause.fundacion}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "Crimson Pro, Georgia, serif",
                          color: "#1a2744",
                          fontSize: "1.35rem",
                          fontWeight: 700,
                          lineHeight: 1.3,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {cause.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: "#5a5a5a",
                          fontSize: "0.87rem",
                          lineHeight: 1.65,
                        }}
                      >
                        {cause.shortDesc}
                      </p>
                    </div>

                    {/* Right: members + expand button */}
                    <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} color="#6b6b6b" />
                        <span
                          style={{
                            fontFamily: "Crimson Pro, Georgia, serif",
                            fontSize: "1.1rem",
                            color: "#1a2744",
                            fontWeight: 700,
                          }}
                        >
                          {cause.members.toLocaleString("es-MX")}
                        </span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "#9a9a9a" }}>
                          miembros
                        </span>
                      </div>
                      <button
                        onClick={() => setExpandedId(isOpen ? null : cause.id)}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.78rem",
                          color: cause.color,
                          background: "none",
                          border: `1px solid ${cause.color}`,
                          borderRadius: "2px",
                          padding: "0.35rem 0.85rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isOpen ? "Ver menos" : "Ver más"}
                        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(26,39,68,0.08)",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div className="grid md:grid-cols-3 gap-0">

                      {/* Full description */}
                      <div
                        className="md:col-span-2 p-6"
                        style={{ borderRight: "1px solid rgba(26,39,68,0.08)" }}
                      >
                        <h4
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                            color: "#9a9a9a",
                            letterSpacing: "0.08em",
                            marginBottom: "0.875rem",
                          }}
                          className="uppercase"
                        >
                          Sobre este movimiento
                        </h4>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            color: "#3d3d3d",
                            fontSize: "0.875rem",
                            lineHeight: 1.85,
                            marginBottom: "1.5rem",
                          }}
                        >
                          {cause.fullDesc}
                        </p>

                        {/* Logros */}
                        <h4
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                            color: "#9a9a9a",
                            letterSpacing: "0.08em",
                            marginBottom: "0.75rem",
                          }}
                          className="uppercase"
                        >
                          Logros documentados
                        </h4>
                        <ul className="flex flex-col gap-2 mb-5">
                          {cause.logros.map((logro, i) => (
                            <li
                              key={`logro-${cause.id}-${i}`}
                              className="flex items-start gap-2"
                            >
                              <span style={{ color: cause.color, marginTop: "2px", flexShrink: 0 }}>→</span>
                              <span
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "0.84rem",
                                  color: "#3d3d3d",
                                  lineHeight: 1.5,
                                }}
                              >
                                {logro}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href="#registro"
                          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                          style={{
                            backgroundColor: cause.color,
                            color: "#ffffff",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.82rem",
                            padding: "0.65rem 1.5rem",
                            borderRadius: "2px",
                          }}
                        >
                          Unirme a esta causa <ChevronRight size={13} />
                        </a>
                      </div>

                      {/* Sidebar info */}
                      <div className="p-6 flex flex-col gap-5">
                        {/* Próximo evento */}
                        <div>
                          <h4
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.72rem",
                              color: "#9a9a9a",
                              letterSpacing: "0.08em",
                              marginBottom: "0.6rem",
                            }}
                            className="uppercase"
                          >
                            Próximo evento
                          </h4>
                          <div className="flex items-start gap-2">
                            <Calendar size={13} color={cause.color} style={{ marginTop: "2px", flexShrink: 0 }} />
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.82rem",
                                color: "#1a2744",
                                lineHeight: 1.5,
                              }}
                            >
                              {cause.proximoEvento}
                            </span>
                          </div>
                        </div>

                        {/* Cobertura */}
                        <div>
                          <h4
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.72rem",
                              color: "#9a9a9a",
                              letterSpacing: "0.08em",
                              marginBottom: "0.6rem",
                            }}
                            className="uppercase"
                          >
                            Cobertura
                          </h4>
                          <div className="flex items-center gap-2">
                            <MapPin size={13} color={cause.color} />
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#1a2744" }}>
                              {cause.estado}
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div
                          style={{
                            backgroundColor: "#f5f4f0",
                            padding: "1rem",
                            borderRadius: "2px",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Crimson Pro, Georgia, serif",
                              color: cause.color,
                              fontSize: "2rem",
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            {cause.members.toLocaleString("es-MX")}
                          </div>
                          <div
                            style={{
                              fontFamily: "Inter, sans-serif",
                              color: "#6b6b6b",
                              fontSize: "0.75rem",
                              marginTop: "0.3rem",
                            }}
                          >
                            ciudadanos activos en esta causa
                          </div>
                        </div>

                        <a
                          href="#registro"
                          className="flex items-center justify-center gap-1.5 hover:opacity-80 transition-opacity"
                          style={{
                            border: `1px solid ${cause.color}`,
                            color: cause.color,
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.8rem",
                            padding: "0.65rem",
                            borderRadius: "2px",
                            textAlign: "center",
                          }}
                        >
                          <ExternalLink size={12} />
                          Compartir esta causa
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
