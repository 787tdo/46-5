export function About() {
  return (
    <section id="acerca" style={{ backgroundColor: "#f5f4f0" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1647463556028-560e808a31d7?w=700&h=500&fit=crop&auto=format"
              alt="Ciudadanos marchando pacíficamente"
              className="w-full object-cover"
              style={{ height: "420px" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "-1.5rem",
                backgroundColor: "#1a2744",
                padding: "1.5rem 2rem",
                maxWidth: "220px",
              }}
            >
              <div
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  color: "#ffffff",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                2021
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  marginTop: "0.3rem",
                }}
              >
                Año de fundación por ciudadanos independientes
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div className="flex items-center gap-3 mb-6">
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
                Nuestra misión
              </span>
            </div>

            <h2
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Una plataforma para los que el sistema ignora
            </h2>

            <div
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#4b4b4b",
                fontSize: "0.92rem",
                lineHeight: 1.9,
              }}
              className="flex flex-col gap-4"
            >
              <p>
                Voz Ciudadana México nació de la frustración compartida de miles de personas
                que han acudido a las autoridades sin obtener respuesta: madres buscando
                a sus hijos, familias víctimas de extorsión, comunidades que viven en el abandono.
              </p>
              <p>
                No somos un partido político. No recibimos financiamiento gubernamental.
                Somos ciudadanos que creemos que la organización colectiva y la visibilidad
                son herramientas poderosas para exigir lo que es nuestro derecho.
              </p>
              <p>
                Ofrecemos orientación, redes de apoyo, documentación de casos y coordinación
                de acciones pacíficas. Todo de forma gratuita, para siempre.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { value: "32", label: "Estados con presencia activa" },
                { value: "100%", label: "Financiamiento independiente" },
                { value: "3,200+", label: "Casos documentados" },
                { value: "0 pesos", label: "Costo para el ciudadano" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{ borderLeft: "2px solid rgba(26,39,68,0.15)", paddingLeft: "1rem" }}
                >
                  <div
                    style={{
                      fontFamily: "Crimson Pro, Georgia, serif",
                      color: "#1a2744",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#6b6b6b",
                      fontSize: "0.78rem",
                      marginTop: "0.3rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
