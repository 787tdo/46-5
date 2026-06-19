import { useState } from "react";
import { CheckCircle, Shield, Lock } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  nombre: string;
  email: string;
  estado: string;
  causa: string;
  motivo: string;
  acepta: boolean;
};

const estados = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas",
  "Chihuahua","Ciudad de México","Coahuila","Colima","Durango","Guanajuato",
  "Guerrero","Hidalgo","Jalisco","Estado de México","Michoacán","Morelos",
  "Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo",
  "San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala",
  "Veracruz","Yucatán","Zacatecas",
];

const causas = [
  "Madres Buscadoras",
  "Transparencia y Rendición de Cuentas",
  "Comunidades Seguras",
  "Ni Una Más — Documentación",
  "Coordinación de Manifestaciones Pacíficas",
  "Defensa de Derechos Humanos",
  "Otra causa / proponer nueva",
];

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (_data: FormData) => {
    setSubmitted(true);
  };

  const inputStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem",
    color: "#1a2744",
    backgroundColor: "#f5f4f0",
    border: "1px solid rgba(26,39,68,0.2)",
    borderRadius: "2px",
    padding: "0.7rem 1rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.8rem",
    color: "#1a2744",
    fontWeight: 600,
    display: "block",
    marginBottom: "0.4rem",
  };

  const errorStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.75rem",
    color: "#b91c1c",
    marginTop: "0.3rem",
  };

  return (
    <section id="registro" style={{ backgroundColor: "#1a2744" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px" style={{ backgroundColor: "#b91c1c" }} />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.5)",
                }}
                className="uppercase"
              >
                Registro gratuito
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#ffffff",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Tu voz importa.
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
                Únete sin costo.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                marginTop: "1.25rem",
                maxWidth: "420px",
              }}
            >
              Al registrarte formas parte de una comunidad de ciudadanos que exigen
              justicia, seguridad y transparencia. No requerimos cuotas, no tenemos
              afiliación política y tus datos están protegidos.
            </p>

            <div className="flex flex-col gap-5 mt-10">
              {[
                { icon: Shield, text: "Tus datos personales nunca se comparten con terceros ni autoridades" },
                { icon: Lock, text: "Plataforma independiente, sin financiamiento gubernamental" },
                { icon: CheckCircle, text: "Acceso inmediato a recursos legales, redes de apoyo y eventos" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={16} color="#b91c1c" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Member count */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderLeft: "3px solid #b91c1c",
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
                47,312
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.82rem",
                  marginTop: "0.25rem",
                }}
              >
                ciudadanos ya registrados en toda la República
              </div>
            </div>
          </div>

          {/* Right form */}
          <div>
            {submitted ? (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "3rem 2.5rem",
                  textAlign: "center",
                }}
              >
                <CheckCircle size={48} color="#16a34a" style={{ margin: "0 auto 1rem" }} />
                <h3
                  style={{
                    fontFamily: "Crimson Pro, Georgia, serif",
                    color: "#1a2744",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  ¡Bienvenido a Voz Ciudadana!
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#6b6b6b",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  Tu registro fue exitoso. Recibirás un correo con información
                  sobre la causa que seleccionaste y los próximos pasos.
                  Juntos somos más fuertes.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ backgroundColor: "#ffffff", padding: "2.5rem" }}
              >
                <h3
                  style={{
                    fontFamily: "Crimson Pro, Georgia, serif",
                    color: "#1a2744",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "1.75rem",
                  }}
                >
                  Formulario de registro
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Nombre */}
                  <div>
                    <label style={labelStyle}>Nombre completo *</label>
                    <input
                      style={inputStyle}
                      placeholder="Tu nombre"
                      {...register("nombre", { required: "Campo requerido" })}
                    />
                    {errors.nombre && <p style={errorStyle}>{errors.nombre.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Correo electrónico *</label>
                    <input
                      type="email"
                      style={inputStyle}
                      placeholder="tucorreo@ejemplo.com"
                      {...register("email", {
                        required: "Campo requerido",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Correo inválido" },
                      })}
                    />
                    {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                  </div>

                  {/* Estado */}
                  <div>
                    <label style={labelStyle}>Estado de residencia *</label>
                    <select
                      style={{ ...inputStyle, appearance: "none" }}
                      {...register("estado", { required: "Selecciona tu estado" })}
                    >
                      <option value="">Selecciona tu estado</option>
                      {estados.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                    {errors.estado && <p style={errorStyle}>{errors.estado.message}</p>}
                  </div>

                  {/* Causa */}
                  <div>
                    <label style={labelStyle}>¿A qué causa quieres unirte? *</label>
                    <select
                      style={{ ...inputStyle, appearance: "none" }}
                      {...register("causa", { required: "Selecciona una causa" })}
                    >
                      <option value="">Selecciona una causa</option>
                      {causas.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.causa && <p style={errorStyle}>{errors.causa.message}</p>}
                  </div>

                  {/* Motivo */}
                  <div>
                    <label style={labelStyle}>¿Por qué te unes? (opcional)</label>
                    <textarea
                      style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }}
                      placeholder="Comparte brevemente tu historia o motivación..."
                      {...register("motivo")}
                    />
                  </div>

                  {/* Acepta */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acepta"
                      style={{ marginTop: "3px", accentColor: "#1a2744" }}
                      {...register("acepta", { required: "Debes aceptar los términos" })}
                    />
                    <label
                      htmlFor="acepta"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.78rem",
                        color: "#6b6b6b",
                        lineHeight: 1.5,
                        cursor: "pointer",
                      }}
                    >
                      Acepto que mis datos serán usados exclusivamente para los fines de esta plataforma
                      y no serán compartidos con autoridades ni terceros.
                    </label>
                  </div>
                  {errors.acepta && <p style={errorStyle}>{errors.acepta.message}</p>}

                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#b91c1c",
                      color: "#ffffff",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      padding: "0.875rem",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "2px",
                      transition: "opacity 0.15s",
                      marginTop: "0.5rem",
                    }}
                    className="hover:opacity-90"
                  >
                    Registrarme — es gratuito
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
