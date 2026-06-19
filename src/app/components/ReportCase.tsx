import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertTriangle, FileText, Camera, Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Denuncia } from "../../lib/supabase";

type FormData = {
  tipo: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  municipio: string;
  autoridad: string;
  anonimo: boolean;
  nombre: string;
  contacto: string;
};

const tiposDenuncia = [
  "Persona desaparecida",
  "Homicidio sin investigación",
  "Feminicidio",
  "Corrupción de funcionario público",
  "Abuso de autoridad / policía",
  "Extorsión",
  "Secuestro",
  "Desplazamiento forzado",
  "Amenazas / intimidación",
  "Negligencia institucional",
  "Otro",
];

const estados = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas",
  "Chihuahua","Ciudad de México","Coahuila","Colima","Durango","Guanajuato",
  "Guerrero","Hidalgo","Jalisco","Estado de México","Michoacán","Morelos",
  "Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo",
  "San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala",
  "Veracruz","Yucatán","Zacatecas",
];

const recentReports = [
  { id: 1, tipo: "Persona desaparecida", titulo: "Joven desaparecido desde noviembre en Tamaulipas", estado: "Tamaulipas", fecha: "15 nov 2023", folio: "VCM-2023-4821", color: "#b91c1c", hasPhoto: true },
  { id: 2, tipo: "Corrupción de funcionario", titulo: "Director de seguridad exige cuotas a comerciantes", estado: "Puebla", fecha: "03 dic 2023", folio: "VCM-2023-5104", color: "#374151", hasPhoto: true },
  { id: 3, tipo: "Abuso de autoridad", titulo: "Detención arbitraria de manifestante en marcha pacífica", estado: "Ciudad de México", fecha: "10 dic 2023", folio: "VCM-2023-5231", color: "#2d4a7a", hasPhoto: false },
  { id: 4, tipo: "Feminicidio", titulo: "Caso clasificado erróneamente — familia exige reclasificación", estado: "Guerrero", fecha: "18 dic 2023", folio: "VCM-2023-5389", color: "#7c1d1d", hasPhoto: true },
];

async function uploadImage(file: File, folio: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${folio}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("evidencias").upload(path, file, { upsert: true });
  if (error) return null;
  const { data } = supabase.storage.from("evidencias").getPublicUrl(path);
  return data.publicUrl;
}

const inputStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.875rem",
  color: "#1a2744",
  backgroundColor: "#f5f4f0",
  border: "1px solid rgba(26,39,68,0.18)",
  borderRadius: "2px",
  padding: "0.7rem 1rem",
  outline: "none",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.78rem",
  color: "#1a2744",
  fontWeight: 600,
  display: "block",
  marginBottom: "0.4rem",
};

export function ReportCase() {
  const [form, setForm] = useState<FormData>({
    tipo: "", titulo: "", descripcion: "", fecha: "",
    estado: "", municipio: "", autoridad: "",
    anonimo: true, nombre: "", contacto: "",
  });
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [folio, setFolio] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newPhotos = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 5 - photos.length)
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tipo || !form.titulo || !form.descripcion || !form.estado) return;
    setLoading(true);
    setError(null);

    const generatedFolio = `VCM-${new Date().getFullYear()}-${Math.floor(5000 + Math.random() * 4999)}`;

    // Upload images
    const imageUrls: string[] = [];
    for (const photo of photos) {
      const url = await uploadImage(photo.file, generatedFolio);
      if (url) imageUrls.push(url);
    }

    const denuncia: Denuncia = {
      tipo: form.tipo,
      titulo: form.titulo,
      descripcion: form.descripcion,
      fecha: form.fecha,
      estado: form.estado,
      municipio: form.municipio,
      autoridad: form.autoridad,
      anonimo: form.anonimo,
      nombre: form.anonimo ? "" : form.nombre,
      contacto: form.anonimo ? "" : form.contacto,
      folio: generatedFolio,
      imagenes: imageUrls,
    };

    const { error: dbError } = await supabase.from("denuncias").insert(denuncia);
    setLoading(false);

    if (dbError) {
      setError("Error al guardar la denuncia. Por favor intenta de nuevo.");
      return;
    }

    setFolio(generatedFolio);
    setSubmitted(true);
  };

  return (
    <section id="denunciar" style={{ backgroundColor: "#ffffff" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px" style={{ backgroundColor: "#b91c1c" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#b91c1c" }} className="uppercase">
                Registro de casos
              </span>
            </div>
            <h2 style={{ fontFamily: "Crimson Pro, Georgia, serif", color: "#1a2744", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}>
              Denuncia tu caso
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#6b6b6b", fontSize: "0.88rem", lineHeight: 1.75, marginTop: "0.75rem", maxWidth: "460px" }}>
              Registra tu denuncia con evidencia fotográfica. Tu caso queda documentado en nuestra base de datos ciudadana y puede ser referido a organizaciones de derechos humanos y medios de comunicación.
            </p>
          </div>
          <div style={{ backgroundColor: "#f5f4f0", border: "1px solid rgba(26,39,68,0.1)", borderLeft: "3px solid #1a2744", padding: "1.25rem 1.5rem", maxWidth: "300px" }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} color="#1a2744" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#1a2744", fontWeight: 600 }}>Tu seguridad es prioridad</span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#6b6b6b", lineHeight: 1.6 }}>
              Puedes denunciar de forma anónima. Ningún dato personal es compartido con autoridades sin tu consentimiento explícito.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div style={{ backgroundColor: "#f5f4f0", border: "1px solid rgba(26,39,68,0.1)", padding: "3rem 2.5rem", textAlign: "center" }}>
                <CheckCircle size={52} color="#16a34a" style={{ margin: "0 auto 1.25rem" }} />
                <h3 style={{ fontFamily: "Crimson Pro, Georgia, serif", color: "#1a2744", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Denuncia registrada
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: "#6b6b6b", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 1.5rem" }}>
                  Tu caso ha sido documentado en nuestra base de datos ciudadana. Guarda tu número de folio para dar seguimiento.
                </p>
                <div style={{ display: "inline-block", backgroundColor: "#1a2744", padding: "1rem 2.5rem", marginBottom: "2rem" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>NÚMERO DE FOLIO</div>
                  <div style={{ fontFamily: "Crimson Pro, Georgia, serif", color: "#ffffff", fontSize: "1.8rem", fontWeight: 700 }}>{folio}</div>
                </div>
                <div>
                  <button
                    onClick={() => { setSubmitted(false); setPhotos([]); setForm({ tipo:"",titulo:"",descripcion:"",fecha:"",estado:"",municipio:"",autoridad:"",anonimo:true,nombre:"",contacto:"" }); }}
                    style={{ backgroundColor: "transparent", border: "1px solid rgba(26,39,68,0.25)", color: "#1a2744", fontFamily: "Inter, sans-serif", fontSize: "0.85rem", padding: "0.7rem 1.75rem", cursor: "pointer", borderRadius: "2px" }}
                  >
                    Registrar otro caso
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ backgroundColor: "#f5f4f0", border: "1px solid rgba(26,39,68,0.1)", padding: "2.5rem" }}>

                  {/* Tipo y fecha */}
                  <div className="flex items-center gap-2 mb-5">
                    <FileText size={15} color="#b91c1c" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#b91c1c", fontWeight: 600, letterSpacing: "0.06em" }} className="uppercase">
                      Información del caso
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label style={labelStyle}>Tipo de denuncia *</label>
                      <select required style={{ ...inputStyle, appearance: "none" }} value={form.tipo} onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}>
                        <option value="">Selecciona el tipo</option>
                        {tiposDenuncia.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Fecha del hecho *</label>
                      <input type="date" required style={inputStyle} value={form.fecha} onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label style={labelStyle}>Título breve del caso *</label>
                    <input required style={inputStyle} placeholder="ej. Desaparición de joven en colonia Centro sin respuesta de la fiscalía" value={form.titulo} onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))} />
                  </div>

                  <div className="mb-4">
                    <label style={labelStyle}>Descripción detallada del caso *</label>
                    <textarea required style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }} placeholder="Describe lo que ocurrió, cuándo, cómo, qué respuesta has recibido de las autoridades y qué necesitas..." value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label style={labelStyle}>Estado *</label>
                      <select required style={{ ...inputStyle, appearance: "none" }} value={form.estado} onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}>
                        <option value="">Selecciona tu estado</option>
                        {estados.map((e) => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Municipio / Alcaldía</label>
                      <input style={inputStyle} placeholder="ej. Culiacán" value={form.municipio} onChange={(e) => setForm((f) => ({ ...f, municipio: e.target.value }))} />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label style={labelStyle}>Autoridad involucrada o negligente</label>
                    <input style={inputStyle} placeholder="ej. Fiscalía del Estado, Policía Municipal, Ayuntamiento..." value={form.autoridad} onChange={(e) => setForm((f) => ({ ...f, autoridad: e.target.value }))} />
                  </div>

                  {/* Fotos */}
                  <div style={{ borderTop: "1px solid rgba(26,39,68,0.1)", paddingTop: "1.75rem", marginBottom: "1.75rem" }}>
                    <div className="flex items-center gap-2 mb-5">
                      <Camera size={15} color="#b91c1c" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#b91c1c", fontWeight: 600, letterSpacing: "0.06em" }} className="uppercase">
                        Evidencia fotográfica
                      </span>
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      style={{ border: `2px dashed ${dragOver ? "#1a2744" : "rgba(26,39,68,0.2)"}`, backgroundColor: dragOver ? "rgba(26,39,68,0.04)" : "#ffffff", padding: "2rem", textAlign: "center", cursor: "pointer", transition: "all 0.15s", borderRadius: "2px", marginBottom: "1rem" }}
                    >
                      <Upload size={28} color="rgba(26,39,68,0.3)" style={{ margin: "0 auto 0.75rem" }} />
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "#1a2744", marginBottom: "0.3rem" }}>
                        Arrastra las fotos aquí o <span style={{ color: "#b91c1c", textDecoration: "underline" }}>haz clic para seleccionar</span>
                      </p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "#9a9a9a" }}>
                        JPG, PNG, WEBP · Máximo 5 imágenes · Las fotos no se publican sin tu permiso
                      </p>
                      <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />
                    </div>

                    {photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {photos.map((photo, i) => (
                          <div key={`photo-${i}`} className="relative">
                            <img src={photo.preview} alt={`Evidencia ${i + 1}`} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "2px", display: "block" }} />
                            <button type="button" onClick={() => removePhoto(i)} style={{ position: "absolute", top: "4px", right: "4px", backgroundColor: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                              <X size={12} color="#fff" />
                            </button>
                            <div style={{ position: "absolute", bottom: "4px", left: "4px", backgroundColor: "rgba(0,0,0,0.55)", borderRadius: "2px", padding: "1px 6px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "#fff" }}>
                              Foto {i + 1}
                            </div>
                          </div>
                        ))}
                        {photos.length < 5 && (
                          <button type="button" onClick={() => fileInputRef.current?.click()} style={{ height: "100px", border: "1px dashed rgba(26,39,68,0.2)", backgroundColor: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", borderRadius: "2px" }}>
                            <Upload size={16} color="rgba(26,39,68,0.3)" />
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "rgba(26,39,68,0.4)" }}>Agregar</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Identidad */}
                  <div style={{ borderTop: "1px solid rgba(26,39,68,0.1)", paddingTop: "1.75rem" }}>
                    <div className="flex items-center gap-2 mb-5">
                      <Shield size={15} color="#b91c1c" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#b91c1c", fontWeight: 600, letterSpacing: "0.06em" }} className="uppercase">
                        Tu identidad
                      </span>
                    </div>

                    <button type="button" onClick={() => setForm((f) => ({ ...f, anonimo: !f.anonimo }))} className="flex items-center gap-3 mb-5 hover:opacity-80 transition-opacity" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <div style={{ width: "44px", height: "24px", borderRadius: "12px", backgroundColor: form.anonimo ? "#1a2744" : "rgba(26,39,68,0.2)", position: "relative", transition: "background-color 0.2s", flexShrink: 0 }}>
                        <div style={{ position: "absolute", top: "3px", left: form.anonimo ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#ffffff", transition: "left 0.2s" }} />
                      </div>
                      <div className="flex items-center gap-2">
                        {form.anonimo ? <EyeOff size={14} color="#1a2744" /> : <Eye size={14} color="#6b6b6b" />}
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "#1a2744" }}>
                          {form.anonimo ? "Denuncia anónima (recomendado)" : "Incluir mis datos de contacto"}
                        </span>
                      </div>
                    </button>

                    {!form.anonimo && (
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label style={labelStyle}>Nombre (opcional)</label>
                          <input style={inputStyle} placeholder="Tu nombre" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
                        </div>
                        <div>
                          <label style={labelStyle}>Correo o teléfono de contacto</label>
                          <input style={inputStyle} placeholder="Para seguimiento del caso" value={form.contacto} onChange={(e) => setForm((f) => ({ ...f, contacto: e.target.value }))} />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 mb-6" style={{ backgroundColor: "rgba(185,28,28,0.05)", border: "1px solid rgba(185,28,28,0.15)", padding: "0.85rem 1rem", borderRadius: "2px" }}>
                      <AlertTriangle size={14} color="#b91c1c" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "#6b6b6b", lineHeight: 1.6 }}>
                        Si tu caso implica un riesgo activo para tu seguridad, considera comunicarte primero con nuestra línea de apoyo:{" "}
                        <span style={{ color: "#1a2744", fontWeight: 600 }}>800 VOZ-CIUDADANA</span>
                      </p>
                    </div>

                    {error && (
                      <div style={{ backgroundColor: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.3)", padding: "0.75rem 1rem", marginBottom: "1rem", borderRadius: "2px", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#b91c1c" }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ backgroundColor: loading ? "#9a9a9a" : "#b91c1c", color: "#ffffff", fontFamily: "Inter, sans-serif", fontSize: "0.95rem", padding: "0.9rem 2.5rem", border: "none", cursor: loading ? "not-allowed" : "pointer", borderRadius: "2px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      {loading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
                      {loading ? "Registrando denuncia..." : "Registrar denuncia"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div style={{ backgroundColor: "#f5f4f0", border: "1px solid rgba(26,39,68,0.1)", padding: "1.5rem" }}>
              <h4 style={{ fontFamily: "Inter, sans-serif", color: "#1a2744", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "1.25rem" }} className="uppercase">
                Casos recientes registrados
              </h4>
              <div className="flex flex-col gap-4">
                {recentReports.map((r) => (
                  <div key={r.id} style={{ borderLeft: `3px solid ${r.color}`, paddingLeft: "0.875rem" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.63rem", color: r.color, letterSpacing: "0.06em" }}>{r.tipo.toUpperCase()}</span>
                      {r.hasPhoto && <Camera size={10} color="#9a9a9a" />}
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "#1a2744", lineHeight: 1.4, marginBottom: "0.4rem" }}>{r.titulo}</p>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "#9a9a9a" }}>{r.estado} · {r.fecha}</span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.62rem", color: "#9a9a9a" }}>{r.folio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "#1a2744", padding: "1.5rem" }}>
              <h4 style={{ fontFamily: "Inter, sans-serif", color: "#ffffff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "1.25rem" }} className="uppercase">
                ¿Qué pasa después?
              </h4>
              <div className="flex flex-col gap-4">
                {[
                  { paso: "01", texto: "Tu caso recibe un número de folio único para seguimiento" },
                  { paso: "02", texto: "Es revisado por nuestro equipo de moderación ciudadana" },
                  { paso: "03", texto: "Se incorpora a nuestra base de datos pública de casos" },
                  { paso: "04", texto: "Puede ser referido a ONG, medios o abogados voluntarios con tu permiso" },
                ].map((p) => (
                  <div key={p.paso} className="flex items-start gap-3">
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#b91c1c", flexShrink: 0, marginTop: "1px" }}>{p.paso}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{p.texto}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "#f5f4f0", border: "1px solid rgba(26,39,68,0.1)", padding: "1.5rem" }}>
              <h4 style={{ fontFamily: "Inter, sans-serif", color: "#1a2744", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "1rem" }} className="uppercase">
                Base de datos ciudadana
              </h4>
              {[
                { value: "5,842", label: "Casos registrados" },
                { value: "3,210", label: "Con evidencia fotográfica" },
                { value: "712", label: "Derivados a ONG o medios" },
                { value: "89", label: "Con seguimiento judicial activo" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(26,39,68,0.07)" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#6b6b6b" }}>{s.label}</span>
                  <span style={{ fontFamily: "Crimson Pro, Georgia, serif", fontSize: "1.1rem", color: "#1a2744", fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
