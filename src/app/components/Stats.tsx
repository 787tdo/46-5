import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const homicidiosData = [
  { año: "2018", total: 33341 },
  { año: "2019", total: 34582 },
  { año: "2020", total: 34554 },
  { año: "2021", total: 33308 },
  { año: "2022", total: 30968 },
  { año: "2023", total: 29800 },
];

const desaparecidosData = [
  { año: "2018", total: 5970 },
  { año: "2019", total: 8774 },
  { año: "2020", total: 9024 },
  { año: "2021", total: 11068 },
  { año: "2022", total: 13657 },
  { año: "2023", total: 15200 },
];

const delitosData = [
  { tipo: "Robo", porcentaje: 34 },
  { tipo: "Extorsión", porcentaje: 18 },
  { tipo: "Secuestro", porcentaje: 12 },
  { tipo: "Homicidio", porcentaje: 22 },
  { tipo: "Violencia familiar", porcentaje: 14 },
];

const COLORS = ["#1a2744", "#2d4a7a", "#b91c1c", "#4b6cb7", "#8b1a1a"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(26,39,68,0.15)",
          padding: "0.75rem 1rem",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.82rem",
          borderRadius: "2px",
        }}
      >
        <p style={{ color: "#1a2744", fontWeight: 600 }}>{label}</p>
        <p style={{ color: "#b91c1c" }}>{payload[0].value.toLocaleString("es-MX")}</p>
      </div>
    );
  }
  return null;
};

function SectionLabel({ text }: { text: string }) {
  return (
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
        {text}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section id="estadisticas" style={{ backgroundColor: "#f5f4f0" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel text="Datos oficiales verificados · SESNSP · INEGI" />
          <h2
            style={{
              fontFamily: "Crimson Pro, Georgia, serif",
              color: "#1a2744",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "600px",
            }}
          >
            La realidad que el gobierno prefiere no ver
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#6b6b6b",
              fontSize: "1rem",
              marginTop: "1rem",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            Cifras reales de inseguridad, desapariciones y corrupción en México.
            Actualizadas con datos del Secretariado Ejecutivo del Sistema Nacional de Seguridad Pública.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "112,456", label: "Personas desaparecidas (acumulado)", note: "Registro Nacional de Personas Desaparecidas" },
            { value: "126°/180", label: "Lugar en Índice de Percepción de Corrupción", note: "Transparencia Internacional 2023" },
            { value: "975", label: "Feminicidios en 2023", note: "SESNSP · cifra oficial" },
            { value: "83%", label: "Delitos sin denunciar (cifra negra)", note: "ENSU · INEGI 2023" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(26,39,68,0.1)",
                padding: "1.5rem",
                borderTop: "3px solid #b91c1c",
              }}
            >
              <div
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  color: "#1a2744",
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#1a2744",
                  fontSize: "0.82rem",
                  marginTop: "0.5rem",
                  lineHeight: 1.4,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#9a9a9a",
                  fontSize: "0.68rem",
                  marginTop: "0.5rem",
                }}
              >
                {item.note}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Homicidios */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(26,39,68,0.1)",
              padding: "2rem",
            }}
          >
            <SectionLabel text="Homicidios dolosos" />
            <h3
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Homicidios por año (2018–2023)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={homicidiosData} barSize={28}>
                <XAxis
                  dataKey="año"
                  tick={{ fontFamily: "Inter, sans-serif", fontSize: 11, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: "Inter, sans-serif", fontSize: 10, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#1a2744" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Desaparecidos */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(26,39,68,0.1)",
              padding: "2rem",
            }}
          >
            <SectionLabel text="Personas desaparecidas" />
            <h3
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Nuevas desapariciones por año
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={desaparecidosData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,39,68,0.06)" />
                <XAxis
                  dataKey="año"
                  tick={{ fontFamily: "Inter, sans-serif", fontSize: 11, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: "Inter, sans-serif", fontSize: 10, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#b91c1c"
                  strokeWidth={2.5}
                  dot={{ fill: "#b91c1c", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tipos de delito */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(26,39,68,0.1)",
              padding: "2rem",
            }}
          >
            <SectionLabel text="Tipos de delito reportados" />
            <h3
              style={{
                fontFamily: "Crimson Pro, Georgia, serif",
                color: "#1a2744",
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Distribución de delitos 2023
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={delitosData}
                  dataKey="porcentaje"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ tipo, porcentaje }) => `${tipo} ${porcentaje}%`}
                  labelLine={false}
                >
                  {delitosData.map((entry, i) => (
                    <Cell key={`cell-${entry.tipo}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  iconType="square"
                  wrapperStyle={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Fuente notice */}
          <div
            style={{
              backgroundColor: "#1a2744",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <SectionLabel text="Fuentes de información" />
              <h3
                style={{
                  fontFamily: "Crimson Pro, Georgia, serif",
                  color: "#ffffff",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: "1.5rem",
                }}
              >
                Datos verificados de fuentes oficiales
              </h3>
              <ul
                style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", lineHeight: 2 }}
                className="list-none space-y-2"
              >
                {[
                  "SESNSP — Secretariado Ejecutivo del SNSP",
                  "INEGI — Instituto Nacional de Estadística y Geografía",
                  "RNPDNO — Registro Nacional de Personas Desaparecidas",
                  "Transparencia Internacional — IPC 2023",
                  "ENSU — Encuesta Nacional de Seguridad Urbana",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span style={{ color: "#b91c1c" }}>→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.12)",
                paddingTop: "1rem",
                marginTop: "1.5rem",
                fontFamily: "JetBrains Mono, monospace",
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.68rem",
              }}
            >
              Última actualización: Junio 2024 · Datos públicos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
