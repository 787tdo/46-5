import { useState, useEffect } from "react";
import { X, LogOut, Camera, FileText, MapPin, Calendar, User, Phone, Shield, Loader2, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Denuncia } from "../../lib/supabase";

const ADMIN_USER = "admin";
const ADMIN_PASS = "123etica456";

const s = {
  navy: "#1a2744",
  red: "#b91c1c",
  bg: "#f5f4f0",
  mono: "JetBrains Mono, monospace",
  serif: "Crimson Pro, Georgia, serif",
  font: "Inter, sans-serif",
};

function LoginModal({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  const inp: React.CSSProperties = {
    fontFamily: s.font,
    fontSize: "0.875rem",
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.07)",
    border: `1px solid ${error ? s.red : "rgba(255,255,255,0.18)"}`,
    borderRadius: "2px",
    padding: "0.75rem 1rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <form onSubmit={handle} style={{ backgroundColor: s.navy, padding: "3rem", width: "100%", maxWidth: "380px", borderLeft: `3px solid ${s.red}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={16} color={s.red} />
          <span style={{ fontFamily: s.mono, fontSize: "0.65rem", color: s.red, letterSpacing: "0.12em" }} className="uppercase">
            Acceso restringido
          </span>
        </div>
        <h2 style={{ fontFamily: s.serif, color: "#fff", fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem" }}>
          Panel de administración
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label style={{ fontFamily: s.font, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.4rem" }}>
              Usuario
            </label>
            <input style={inp} type="text" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
          </div>
          <div>
            <label style={{ fontFamily: s.font, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.4rem" }}>
              Contraseña
            </label>
            <input style={inp} type="password" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" />
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: "rgba(185,28,28,0.15)", border: `1px solid ${s.red}`, padding: "0.6rem 0.9rem", marginBottom: "1rem", borderRadius: "2px", fontFamily: s.font, fontSize: "0.78rem", color: "#fca5a5" }}>
            Credenciales incorrectas
          </div>
        )}

        <button type="submit" style={{ backgroundColor: s.red, color: "#fff", fontFamily: s.font, fontSize: "0.9rem", padding: "0.85rem", border: "none", cursor: "pointer", borderRadius: "2px", width: "100%" }} className="hover:opacity-90 transition-opacity">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

function DenunciaCard({ d }: { d: Denuncia }) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const tipoColor: Record<string, string> = {
    "Persona desaparecida": "#b91c1c",
    "Feminicidio": "#7c1d1d",
    "Homicidio sin investigación": "#991b1b",
    "Corrupción de funcionario público": "#374151",
    "Abuso de autoridad / policía": "#2d4a7a",
    "Extorsión": "#4b5563",
    "Secuestro": "#78350f",
    "Negligencia institucional": "#1e3a5f",
  };
  const color = tipoColor[d.tipo] || "#6b6b6b";

  const dateStr = d.created_at
    ? new Date(d.created_at).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "—";

  return (
    <>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, cursor: "zoom-out" }}>
          <img src={lightbox} alt="Evidencia" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "2px" }} />
        </div>
      )}

      <div style={{ backgroundColor: "#fff", border: "1px solid rgba(26,39,68,0.1)", borderLeft: `3px solid ${color}`, marginBottom: "1rem" }}>
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 p-4" style={{ borderBottom: "1px solid rgba(26,39,68,0.07)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span style={{ fontFamily: s.mono, fontSize: "0.62rem", color, backgroundColor: `${color}15`, padding: "0.2rem 0.6rem", borderRadius: "2px", letterSpacing: "0.05em" }}>
              {d.tipo.toUpperCase()}
            </span>
            <span style={{ fontFamily: s.mono, fontSize: "0.65rem", color: "#9a9a9a" }}>{d.folio}</span>
            {d.imagenes?.length > 0 && (
              <span className="flex items-center gap-1" style={{ fontFamily: s.mono, fontSize: "0.62rem", color: "#9a9a9a" }}>
                <Camera size={11} /> {d.imagenes.length} foto{d.imagenes.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button onClick={() => setExpanded((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", color: "#9a9a9a", fontFamily: s.font, fontSize: "0.75rem" }}>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? "Colapsar" : "Ver detalle"}
          </button>
        </div>

        {/* Summary */}
        <div className="p-4">
          <h3 style={{ fontFamily: s.serif, color: s.navy, fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.5rem" }}>{d.titulo}</h3>
          <div className="flex flex-wrap gap-4" style={{ fontFamily: s.font, fontSize: "0.75rem", color: "#6b6b6b" }}>
            <span className="flex items-center gap-1"><MapPin size={11} /> {d.estado}{d.municipio ? ` · ${d.municipio}` : ""}</span>
            {d.fecha && <span className="flex items-center gap-1"><Calendar size={11} /> Hecho: {d.fecha}</span>}
            <span className="flex items-center gap-1"><Calendar size={11} /> Recibido: {dateStr}</span>
            {!d.anonimo && d.nombre && <span className="flex items-center gap-1"><User size={11} /> {d.nombre}</span>}
            {!d.anonimo && d.contacto && <span className="flex items-center gap-1"><Phone size={11} /> {d.contacto}</span>}
            {d.anonimo && <span className="flex items-center gap-1"><Shield size={11} /> Anónimo</span>}
          </div>
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div style={{ borderTop: "1px solid rgba(26,39,68,0.07)", padding: "1.25rem 1rem 1.5rem" }}>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={13} color={s.red} />
              <span style={{ fontFamily: s.font, fontSize: "0.72rem", color: s.red, fontWeight: 600, letterSpacing: "0.06em" }} className="uppercase">Descripción completa</span>
            </div>
            <p style={{ fontFamily: s.font, fontSize: "0.88rem", color: "#2d2d2d", lineHeight: 1.75, marginBottom: "1.25rem" }}>{d.descripcion}</p>

            {d.autoridad && (
              <div style={{ backgroundColor: "rgba(185,28,28,0.05)", border: "1px solid rgba(185,28,28,0.15)", padding: "0.7rem 1rem", marginBottom: "1.25rem", borderRadius: "2px" }}>
                <span style={{ fontFamily: s.font, fontSize: "0.75rem", color: s.red, fontWeight: 600 }}>Autoridad señalada: </span>
                <span style={{ fontFamily: s.font, fontSize: "0.85rem", color: "#2d2d2d" }}>{d.autoridad}</span>
              </div>
            )}

            {d.imagenes?.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Camera size={13} color={s.red} />
                  <span style={{ fontFamily: s.font, fontSize: "0.72rem", color: s.red, fontWeight: 600, letterSpacing: "0.06em" }} className="uppercase">Evidencia fotográfica ({d.imagenes.length})</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {d.imagenes.map((url, i) => (
                    <div key={i} onClick={() => setLightbox(url)} style={{ cursor: "zoom-in", position: "relative" }}>
                      <img src={url} alt={`Evidencia ${i + 1}`} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "2px", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0)", transition: "background-color 0.15s", borderRadius: "2px" }} className="hover:bg-black/20" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

type Filter = { tipo: string; estado: string; conFoto: boolean };

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>({ tipo: "", estado: "", conFoto: false });

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase.from("denuncias").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (e) { setError("Error al cargar denuncias: " + e.message); return; }
    setDenuncias((data as Denuncia[]) || []);
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  if (!authed) return <LoginModal onLogin={() => setAuthed(true)} />;

  const filtered = denuncias.filter((d) => {
    if (filter.tipo && d.tipo !== filter.tipo) return false;
    if (filter.estado && d.estado !== filter.estado) return false;
    if (filter.conFoto && (!d.imagenes || d.imagenes.length === 0)) return false;
    return true;
  });

  const tiposUnicos = [...new Set(denuncias.map((d) => d.tipo))];
  const estadosUnicos = [...new Set(denuncias.map((d) => d.estado))].sort();

  const selectStyle: React.CSSProperties = {
    fontFamily: s.font,
    fontSize: "0.8rem",
    color: s.navy,
    backgroundColor: "#fff",
    border: "1px solid rgba(26,39,68,0.2)",
    borderRadius: "2px",
    padding: "0.45rem 0.75rem",
    outline: "none",
    appearance: "none",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: s.bg, zIndex: 9999, overflowY: "auto" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: s.navy, padding: "0 1.5rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div className="flex items-center gap-3">
          <Shield size={16} color={s.red} />
          <span style={{ fontFamily: s.mono, fontSize: "0.72rem", color: "#fff", letterSpacing: "0.1em" }} className="uppercase">
            Panel de denuncias — Acceso restringido
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} disabled={loading} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "2px", padding: "0.3rem 0.7rem", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "6px", fontFamily: s.font, fontSize: "0.75rem" }}>
            <RefreshCw size={13} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            Actualizar
          </button>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "6px", fontFamily: s.font, fontSize: "0.8rem" }}>
            <LogOut size={15} />
            Salir
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total de denuncias", value: denuncias.length },
            { label: "Con fotografías", value: denuncias.filter((d) => d.imagenes?.length > 0).length },
            { label: "Anónimas", value: denuncias.filter((d) => d.anonimo).length },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "#fff", border: "1px solid rgba(26,39,68,0.1)", padding: "1.25rem", borderLeft: `3px solid ${s.red}` }}>
              <div style={{ fontFamily: s.serif, color: s.navy, fontSize: "2rem", fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontFamily: s.font, fontSize: "0.78rem", color: "#6b6b6b", marginTop: "0.25rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select style={selectStyle} value={filter.tipo} onChange={(e) => setFilter((f) => ({ ...f, tipo: e.target.value }))}>
            <option value="">Todos los tipos</option>
            {tiposUnicos.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select style={selectStyle} value={filter.estado} onChange={(e) => setFilter((f) => ({ ...f, estado: e.target.value }))}>
            <option value="">Todos los estados</option>
            {estadosUnicos.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
            <input type="checkbox" checked={filter.conFoto} onChange={(e) => setFilter((f) => ({ ...f, conFoto: e.target.checked }))} />
            <span style={{ fontFamily: s.font, fontSize: "0.8rem", color: s.navy }}>Solo con fotos</span>
          </label>
          <span style={{ fontFamily: s.mono, fontSize: "0.65rem", color: "#9a9a9a", marginLeft: "auto" }}>
            {filtered.length} de {denuncias.length} denuncias
          </span>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.3)", padding: "1rem 1.25rem", marginBottom: "1.5rem", borderRadius: "2px", fontFamily: s.font, fontSize: "0.85rem", color: s.red }}>
            {error}
            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#6b6b6b" }}>
              Asegúrate de haber ejecutado el SQL de creación de la tabla en tu proyecto de Supabase.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3" style={{ color: "#9a9a9a" }}>
            <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontFamily: s.font, fontSize: "0.9rem" }}>Cargando denuncias...</span>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#9a9a9a" }}>
            <FileText size={40} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
            <p style={{ fontFamily: s.font, fontSize: "0.9rem" }}>
              {denuncias.length === 0 ? "Aún no hay denuncias registradas." : "Ninguna denuncia coincide con los filtros."}
            </p>
          </div>
        )}

        {/* List */}
        {!loading && filtered.map((d) => <DenunciaCard key={d.id} d={d} />)}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
