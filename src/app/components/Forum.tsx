import { useState, useEffect, useRef } from "react";
import { MessageSquare, ThumbsUp, Share2, Send, Hash, TrendingUp, Pin, ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";

function getDailyHashtag(): string {
  const hashtags = [
    "MéxicoExigeJusticia","NiUnaMás","MadresBuscadoras","FueraCORRUPCIÓN",
    "DesaparecidosMéxico","MéxicoSeguro","JusticiaParaTodos","VozCiudadana",
    "MéxicoDespierta","FuerzaMadresBuscadoras","AnticorrupciónYa",
    "DerechosHumanosMéxico","MéxicoNoEstáSolo","JusticiaParaEllos",
    "SeguridadYa","MéxicoUnido","TransparenciaYa","BuscarEsResistir",
    "MéxicoExige","NoMásImpunidad","FuerzaMéxico","CiudadanosUnidos",
    "JusticiaSocial","MéxicoDignidad","NoMásCorrupción","VerdadYJusticia",
    "MéxicoResiste","PorEllasPorTodos","ExigimosCuentas","MéxicoConVoz","PazYJusticia",
  ];
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return hashtags[dayOfYear % hashtags.length];
}

export interface Comment {
  id: number;
  author: string;
  time: string;
  content: string;
  likes: number;
}

export interface Post {
  id: number;
  author: string;
  estado: string;
  time: string;
  tag: string;
  tagColor: string;
  pinned: boolean;
  content: string;
  likes: number;
  comments: Comment[];
}

const SEED_POSTS: Post[] = [
  {
    id: 1,
    author: "Rosario M.",
    estado: "Jalisco",
    time: "hace 12 min",
    tag: "Desapariciones",
    tagColor: "#b91c1c",
    pinned: true,
    content: "Llevamos 3 años buscando a mi hijo. La fiscalía cerró el caso sin resultados. ¿Alguien más ha pasado por esto y sabe cómo recurrir ante la CNDH? Necesitamos asesoría urgente.",
    likes: 184,
    comments: [
      { id: 101, author: "Abogada Voluntaria", time: "hace 5 min", content: "Sí, puedes presentar una queja directamente en cndh.org.mx. Te acompaño en el proceso si me escribes. Soy abogada de derechos humanos con 10 años de experiencia.", likes: 12 },
      { id: 102, author: "Familia Ramírez", time: "hace 8 min", content: "Pasamos por lo mismo en 2021. El colectivo 'Luz de Esperanza' en CDMX nos ayudó mucho. Te mando su contacto por mensaje privado.", likes: 8 },
      { id: 108, author: "Madre Buscadora Sinaloa", time: "hace 15 min", content: "Rosario, estamos contigo. En nuestro colectivo hemos logrado reabrir 12 casos. Escríbeme y te explico el proceso paso a paso.", likes: 21 },
      { id: 109, author: "Estudiante de Derecho UNAM", time: "hace 22 min", content: "En la clínica jurídica de la UNAM ofrecemos asesoría gratuita. Puedes agendar cita sin costo. El proceso ante la CNDH tarda aprox 6 meses pero vale la pena.", likes: 9 },
      { id: 110, author: "Anónimo", time: "hace 35 min", content: "Fuerza. No estás sola. Hay miles de familias en tu misma situación y juntos somos más fuertes.", likes: 45 },
    ],
  },
  {
    id: 2,
    author: "Colectivo Sonora Segura",
    estado: "Sonora",
    time: "hace 28 min",
    tag: "Seguridad",
    tagColor: "#2d4a7a",
    pinned: false,
    content: "Documentamos 14 colonias en Hermosillo sin alumbrado público desde hace 8 meses. Ya enviamos 3 oficios al municipio sin respuesta. Mañana haremos plantón. ¿Quién se une?",
    likes: 97,
    comments: [
      { id: 103, author: "Vecino Col. Reforma", time: "hace 20 min", content: "Cuenten conmigo, llevo a 5 vecinos más. ¿A qué hora y dónde exactamente nos reunimos?", likes: 5 },
      { id: 111, author: "Periodista Local", time: "hace 18 min", content: "Voy a cubrir el plantón. Síganme en redes para darle difusión. La presión mediática es fundamental.", likes: 11 },
      { id: 112, author: "Concejal Independiente", time: "hace 12 min", content: "Soy concejala de oposición. Presento mañana mismo un punto de acuerdo urgente sobre este tema. ¿Pueden mandarme el mapa de colonias afectadas?", likes: 28 },
      { id: 113, author: "Vecina Col. Miradores", time: "hace 5 min", content: "En nuestra colonia llevamos 10 meses igual. Ya hubo dos asaltos por la oscuridad. El municipio solo manda respuestas genéricas.", likes: 14 },
    ],
  },
  {
    id: 3,
    author: "Anónimo",
    estado: "Veracruz",
    time: "hace 1 hr",
    tag: "Corrupción",
    tagColor: "#374151",
    pinned: false,
    content: "El director de obras públicas de mi municipio adjudicó contratos a su propia empresa. Tengo documentos. ¿Cómo los presento ante la SFP de forma segura y sin exponer mi identidad?",
    likes: 213,
    comments: [
      { id: 104, author: "Periodista Independiente", time: "hace 45 min", content: "Usa SecureDrop o contáctanos a través de Signal. Tu identidad queda 100% protegida. También puedes enviar documentos físicos a la SFP por correo certificado.", likes: 19 },
      { id: 105, author: "Transparencia MX", time: "hace 30 min", content: "La SFP tiene canal de denuncia anónima en sfp.gob.mx/denuncia. También puedes ir con la ASF (Auditoría Superior de la Federación). Ambas reciben denuncias anónimas.", likes: 14 },
      { id: 106, author: "Ciudadano Veracruz", time: "hace 10 min", content: "Yo hice algo similar el año pasado con un regidor. Escríbeme en privado y te cuento mi experiencia. Sí se puede lograr que investiguen.", likes: 7 },
      { id: 114, author: "Abogado Anticorrupción", time: "hace 55 min", content: "Antes de presentar los documentos, haz copias en múltiples lugares. También puedes enviarlos a medios de comunicación simultáneamente para que haya más presión.", likes: 32 },
      { id: 115, author: "Anónimo", time: "hace 1 hr", content: "Lo mismo pasa en mi municipio. Los contratos van siempre a los mismos 3 apellidos. Ya documenté también pero me da miedo actuar solo.", likes: 18 },
      { id: 116, author: "ONG Justicia Veracruz", time: "hace 58 min", content: "Ofrecemos acompañamiento legal y protección de identidad para denunciantes. Escríbenos. Hemos logrado que 4 funcionarios sean investigados formalmente.", likes: 41 },
    ],
  },
  {
    id: 4,
    author: "Familias de Guerrero",
    estado: "Guerrero",
    time: "hace 2 hr",
    tag: "Desapariciones",
    tagColor: "#b91c1c",
    pinned: false,
    content: "Este viernes realizamos jornada de búsqueda en zona serrana. Necesitamos voluntarios con vehículo propio. También buscamos médicos o paramédicos para acompañar el operativo.",
    likes: 76,
    comments: [
      { id: 117, author: "Médico Voluntario", time: "hace 1 hr", content: "Soy médico general con experiencia en trabajo de campo. Cuenten conmigo para el viernes. ¿A qué hora salen y desde dónde?", likes: 22 },
      { id: 118, author: "Enfermera Patricia R.", time: "hace 1 hr 20 min", content: "Me apunto también como paramédica. Llevo mi mochila de primeros auxilios completa.", likes: 15 },
      { id: 119, author: "Conductor Voluntario", time: "hace 45 min", content: "Tengo camioneta doble cabina y puedo llevar 4 personas más. ¿Cuál es el punto de reunión?", likes: 9 },
      { id: 120, author: "Colectivo Nacional", time: "hace 30 min", content: "Desde CDMX les mandamos solidaridad y apoyo económico para gastos de la jornada. Compartan su cuenta de banco o número de teléfono para transferencia.", likes: 38 },
    ],
  },
  {
    id: 5,
    author: "Red Feminista CDMX",
    estado: "Ciudad de México",
    time: "hace 3 hr",
    tag: "Feminicidio",
    tagColor: "#7c1d1d",
    pinned: false,
    content: "La Fiscalía clasifica el caso de Andrea como 'homicidio doloso' y no como feminicidio, evitando la agravante. Iniciamos campaña legal. Abogadas con experiencia en perspectiva de género: necesitamos su apoyo.",
    likes: 301,
    comments: [
      { id: 107, author: "Abogada Pérez", time: "hace 2 hr", content: "Me sumo. Tengo 8 años litigando casos con perspectiva de género ante el Tribunal Superior de Justicia de CDMX. Les mando mis datos al DM.", likes: 34 },
      { id: 121, author: "INMUJERES Delegación", time: "hace 2 hr 30 min", content: "Pueden solicitar la Alerta de Violencia de Género si el municipio registra patrón. También la FEVIMTRA tiene protocolo específico para estos casos.", likes: 27 },
      { id: 122, author: "Periodista Investigadora", time: "hace 1 hr 45 min", content: "Estoy documentando este patrón de 'reclasificaciones' en 7 estados. El caso de Andrea no es aislado. ¿Podemos hablar con la familia?", likes: 52 },
      { id: 123, author: "Maestra Andrea G.", time: "hace 1 hr 20 min", content: "Conozco a la familia de Andrea desde la primaria. Es una injusticia terrible. Todo el barrio está indignado y listo para apoyar.", likes: 19 },
      { id: 124, author: "Estudiantes UAM", time: "hace 50 min", content: "Organizamos mañana una concentración en el Ángel de la Independencia a las 17:00 hrs. ¡Convoquen! #JusticiaParaAndrea", likes: 73 },
      { id: 125, author: "Anónimo", time: "hace 40 min", content: "Mi hermana pasó por algo similar. La pelea legal duró 2 años pero al final logramos la reclasificación. No se rindan. La ley dice que si hay relación afectiva y violencia previa, ES feminicidio.", likes: 61 },
    ],
  },
  {
    id: 6,
    author: "Vecinos Col. Doctores",
    estado: "Ciudad de México",
    time: "hace 4 hr",
    tag: "Seguridad",
    tagColor: "#2d4a7a",
    pinned: false,
    content: "Tercer robo a casa habitación en nuestra cuadra este mes. La policía llega 40 minutos después de la llamada. Necesitamos organizarnos como comunidad. ¿Alguien tiene experiencia con comités de vigilancia vecinal?",
    likes: 88,
    comments: [
      { id: 126, author: "Org. Barrio Seguro", time: "hace 3 hr", content: "Nosotros implementamos uno en la Del Valle. La clave es un grupo de WhatsApp con 5 personas por cuadra que se turnen la guardia de 20:00 a 01:00. Reducimos robos en 60%.", likes: 44 },
      { id: 127, author: "Expolicia", time: "hace 2 hr 30 min", content: "Puedo asesorarlos gratis sobre cómo organizar rondines efectivos y qué evidencia recopilar para que las denuncias procedan. Años de experiencia en seguridad comunitaria.", likes: 17 },
      { id: 128, author: "Vecino Anónimo", time: "hace 2 hr", content: "También instalamos cámaras de bajo costo conectadas al grupo vecinal. Hay opciones desde 800 pesos que funcionan muy bien.", likes: 23 },
    ],
  },
  {
    id: 7,
    author: "Madre de Carlos H.",
    estado: "Nuevo León",
    time: "hace 5 hr",
    tag: "Desapariciones",
    tagColor: "#b91c1c",
    pinned: false,
    content: "Mi hijo Carlos desapareció el 14 de enero saliendo del trabajo. Tenía 23 años. La Fiscalía de NL dice que 'no hay indicios de delito'. Alguien que pueda ayudarme a entender mis derechos, por favor.",
    likes: 156,
    comments: [
      { id: 129, author: "FUNDEM", time: "hace 4 hr", content: "Somos la Fundación por los Desaparecidos de México. Le acompañamos sin costo. Llame al 800-000-FUNDEM o escríbanos. Tenemos abogados especializados en NL.", likes: 38 },
      { id: 130, author: "Madre Buscadora MTY", time: "hace 3 hr 30 min", content: "Señora, yo estoy buscando a mi hijo desde hace 4 años. El primer paso es activar la Alerta Amber si es menor, o el Protocolo Alba si es mujer. Para hombres adultos hay que insistir en la FGR federal. No la dejen sola.", likes: 29 },
      { id: 131, author: "Abogado Pro Bono NL", time: "hace 3 hr", content: "En Monterrey tenemos un colectivo de abogados que toma casos sin costo. Escriba a abogados.probonoNL arroba gmail.com con el número de carpeta de investigación.", likes: 21 },
      { id: 132, author: "Anónimo", time: "hace 2 hr", content: "Fuerza. No pierda la esperanza. Aquí todos estamos para apoyarla.", likes: 67 },
    ],
  },
];

const tagColors: Record<string, string> = {
  Desapariciones: "#b91c1c",
  Seguridad: "#2d4a7a",
  Corrupción: "#374151",
  Feminicidio: "#7c1d1d",
  Marchas: "#4b5563",
  Derechos: "#1a2744",
  General: "#6b6b6b",
};

const STORAGE_KEY = "foro_posts_v2";
const LIKED_KEY = "foro_liked_v2";
const LIKED_COMMENTS_KEY = "foro_liked_comments_v2";

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Post[];
  } catch {}
  return SEED_POSTS;
}

function savePosts(posts: Post[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); } catch {}
}

function loadLiked(): Set<number> {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {}
  return new Set();
}

function saveLiked(liked: Set<number>) {
  try { localStorage.setItem(LIKED_KEY, JSON.stringify([...liked])); } catch {}
}

function loadLikedComments(): Set<number> {
  try {
    const raw = localStorage.getItem(LIKED_COMMENTS_KEY);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {}
  return new Set();
}

function saveLikedComments(liked: Set<number>) {
  try { localStorage.setItem(LIKED_COMMENTS_KEY, JSON.stringify([...liked])); } catch {}
}

const s = {
  font: "Inter, sans-serif",
  mono: "JetBrains Mono, monospace",
  serif: "Crimson Pro, Georgia, serif",
  navy: "#1a2744",
  red: "#b91c1c",
  bg: "#f5f4f0",
  muted: "#6b6b6b",
  border: "rgba(26,39,68,0.1)",
};

function inputStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    fontFamily: s.font,
    fontSize: "0.875rem",
    color: s.navy,
    backgroundColor: s.bg,
    border: `1px solid rgba(26,39,68,0.18)`,
    borderRadius: "2px",
    padding: "0.65rem 0.9rem",
    outline: "none",
    width: "100%",
    ...extra,
  };
}

function Avatar({ name, color, size = 32 }: { name: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ color: "#fff", fontSize: size * 0.28 + "rem", fontFamily: s.font }}>{name.charAt(0)}</span>
    </div>
  );
}

function CommentItem({
  comment,
  likedComments,
  onLike,
}: {
  comment: Comment;
  likedComments: Set<number>;
  onLike: (id: number) => void;
}) {
  const liked = likedComments.has(comment.id);
  return (
    <div className="flex gap-3" style={{ padding: "0.85rem 0", borderBottom: `1px solid ${s.border}` }}>
      <CornerDownRight size={13} color={s.muted} style={{ marginTop: "3px", flexShrink: 0 }} />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span style={{ fontFamily: s.font, fontSize: "0.78rem", color: s.navy, fontWeight: 600 }}>{comment.author}</span>
          <span style={{ fontFamily: s.mono, fontSize: "0.65rem", color: s.muted }}>{comment.time}</span>
        </div>
        <p style={{ fontFamily: s.font, fontSize: "0.83rem", color: "#2d2d2d", lineHeight: 1.65 }}>{comment.content}</p>
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center gap-1 mt-1.5 hover:opacity-70 transition-opacity"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: liked ? s.red : s.muted, fontFamily: s.font, fontSize: "0.72rem" }}
        >
          <ThumbsUp size={11} fill={liked ? s.red : "none"} />
          {comment.likes}
        </button>
      </div>
    </div>
  );
}

function PostCard({
  post,
  liked,
  likedComments,
  onLike,
  onLikeComment,
  onAddComment,
}: {
  post: Post;
  liked: boolean;
  likedComments: Set<number>;
  onLike: (id: number) => void;
  onLikeComment: (commentId: number, postId: number) => void;
  onAddComment: (postId: number, content: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = () => {
    if (!replyText.trim()) return;
    onAddComment(post.id, replyText.trim());
    setReplyText("");
    setReplying(false);
    setExpanded(true);
  };

  const totalComments = post.comments.length;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid ${s.border}`,
        borderLeft: post.pinned ? `3px solid ${s.red}` : `1px solid ${s.border}`,
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={post.author} color={post.tagColor} />
          <div>
            <span style={{ fontFamily: s.font, fontSize: "0.82rem", color: s.navy, fontWeight: 600 }}>{post.author}</span>
            <span style={{ fontFamily: s.font, fontSize: "0.75rem", color: "#9a9a9a", marginLeft: "0.5rem" }}>· {post.estado} · {post.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.pinned && (
            <span className="flex items-center gap-1" style={{ fontFamily: s.mono, fontSize: "0.65rem", color: s.red }}>
              <Pin size={10} /> Fijado
            </span>
          )}
          <span style={{ fontFamily: s.mono, fontSize: "0.65rem", color: post.tagColor, backgroundColor: `${post.tagColor}18`, padding: "0.2rem 0.6rem", borderRadius: "2px", letterSpacing: "0.06em" }}>
            {post.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <p style={{ fontFamily: s.font, color: "#2d2d2d", fontSize: "0.88rem", lineHeight: 1.75 }}>{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-5 mt-4 pt-4" style={{ borderTop: `1px solid rgba(26,39,68,0.06)` }}>
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          style={{ fontFamily: s.font, fontSize: "0.78rem", color: liked ? s.red : s.muted, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <ThumbsUp size={13} fill={liked ? s.red : "none"} />
          {post.likes}
        </button>

        <button
          onClick={() => { setExpanded((v) => !v); setReplying(false); }}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          style={{ fontFamily: s.font, fontSize: "0.78rem", color: expanded ? s.navy : s.muted, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <MessageSquare size={13} />
          {totalComments} {totalComments === 1 ? "respuesta" : "respuestas"}
          {totalComments > 0 && (expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
        </button>

        <button
          onClick={() => { setReplying((v) => !v); if (!replying && textRef.current) setTimeout(() => textRef.current?.focus(), 50); }}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          style={{ fontFamily: s.font, fontSize: "0.78rem", color: replying ? s.navy : s.muted, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <CornerDownRight size={13} />
          Responder
        </button>

        <button
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity ml-auto"
          style={{ fontFamily: s.font, fontSize: "0.78rem", color: s.muted, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Share2 size={13} />
          Compartir
        </button>
      </div>

      {/* Reply form */}
      {replying && (
        <div className="mt-4 pt-4" style={{ borderTop: `1px solid rgba(26,39,68,0.06)` }}>
          <div className="flex gap-2">
            <textarea
              ref={textRef}
              style={{ ...inputStyle({ resize: "none", minHeight: "72px", flex: 1 }) }}
              placeholder="Escribe tu respuesta..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleReply(); }}
            />
            <button
              onClick={handleReply}
              style={{ backgroundColor: s.navy, color: "#fff", border: "none", borderRadius: "2px", padding: "0 1rem", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: s.font, fontSize: "0.8rem" }}
            >
              <Send size={13} />
            </button>
          </div>
          <p style={{ fontFamily: s.font, fontSize: "0.68rem", color: s.muted, marginTop: "0.4rem" }}>Ctrl+Enter para enviar</p>
        </div>
      )}

      {/* Comments */}
      {expanded && totalComments > 0 && (
        <div className="mt-4 pt-2" style={{ borderTop: `1px solid rgba(26,39,68,0.06)` }}>
          {post.comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              likedComments={likedComments}
              onLike={(cid) => onLikeComment(cid, post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Forum() {
  const hashtag = getDailyHashtag();
  const [posts, setPosts] = useState<Post[]>(() => loadPosts());
  const [likedIds, setLikedIds] = useState<Set<number>>(() => loadLiked());
  const [likedComments, setLikedComments] = useState<Set<number>>(() => loadLikedComments());
  const [newPost, setNewPost] = useState({ content: "", tag: "General", estado: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTag, setActiveTag] = useState("Todos");

  useEffect(() => { savePosts(posts); }, [posts]);
  useEffect(() => { saveLiked(likedIds); }, [likedIds]);
  useEffect(() => { saveLikedComments(likedComments); }, [likedComments]);

  const tags = ["Todos", "Desapariciones", "Seguridad", "Corrupción", "Feminicidio", "Marchas", "Derechos", "General"];
  const filtered = activeTag === "Todos" ? posts : posts.filter((p) => p.tag === activeTag);

  const handleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setPosts((ps) => ps.map((p) => p.id === id ? { ...p, likes: p.likes - 1 } : p));
      } else {
        next.add(id);
        setPosts((ps) => ps.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p));
      }
      return next;
    });
  };

  const handleLikeComment = (commentId: number, postId: number) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      const delta = next.has(commentId) ? -1 : 1;
      if (next.has(commentId)) next.delete(commentId); else next.add(commentId);
      setPosts((ps) =>
        ps.map((p) =>
          p.id !== postId ? p : {
            ...p,
            comments: p.comments.map((c) => c.id === commentId ? { ...c, likes: c.likes + delta } : c),
          }
        )
      );
      return next;
    });
  };

  const handleAddComment = (postId: number, content: string) => {
    const comment: Comment = {
      id: Date.now(),
      author: "Ciudadano anónimo",
      time: "ahora mismo",
      content,
      likes: 0,
    };
    setPosts((ps) =>
      ps.map((p) => p.id !== postId ? p : { ...p, comments: [...p.comments, comment] })
    );
  };

  const handleSubmit = () => {
    if (!newPost.content.trim() || !newPost.estado.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: "Ciudadano anónimo",
      estado: newPost.estado,
      time: "ahora mismo",
      tag: newPost.tag,
      tagColor: tagColors[newPost.tag] || "#6b6b6b",
      pinned: false,
      content: newPost.content,
      likes: 0,
      comments: [],
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost({ content: "", tag: "General", estado: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section style={{ backgroundColor: s.bg }} className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px" style={{ backgroundColor: s.red }} />
              <span style={{ fontFamily: s.mono, fontSize: "0.7rem", letterSpacing: "0.12em", color: s.red }} className="uppercase">
                Foro ciudadano
              </span>
            </div>
            <h2 style={{ fontFamily: s.serif, color: s.navy, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}>
              Hablemos sin miedo
            </h2>
            <p style={{ fontFamily: s.font, color: s.muted, fontSize: "0.88rem", lineHeight: 1.7, marginTop: "0.75rem", maxWidth: "420px" }}>
              Comparte tu caso, busca asesoría, organiza acciones. Espacio moderado por la comunidad.
            </p>
          </div>

          <div style={{ backgroundColor: s.navy, padding: "1.25rem 1.75rem", minWidth: "260px", borderLeft: `3px solid ${s.red}` }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={13} color={s.red} />
              <span style={{ fontFamily: s.mono, fontSize: "0.66rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }} className="uppercase">
                Hashtag del día
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <Hash size={20} color={s.red} style={{ marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontFamily: s.serif, color: "#ffffff", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.2, wordBreak: "break-word" }}>
                {hashtag}
              </span>
            </div>
            <p style={{ fontFamily: s.font, color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", marginTop: "0.75rem" }}>
              Úsalo hoy en tus redes sociales para amplificar tu voz
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  style={{
                    fontFamily: s.font,
                    fontSize: "0.75rem",
                    padding: "0.35rem 0.9rem",
                    backgroundColor: activeTag === t ? s.navy : "transparent",
                    color: activeTag === t ? "#ffffff" : s.navy,
                    border: "1px solid",
                    borderColor: activeTag === t ? s.navy : "rgba(26,39,68,0.2)",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-4">
              {filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  liked={likedIds.has(post.id)}
                  likedComments={likedComments}
                  onLike={handleLike}
                  onLikeComment={handleLikeComment}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* New post form */}
            <div style={{ backgroundColor: "#ffffff", border: `1px solid ${s.border}`, padding: "1.5rem" }}>
              <h3 style={{ fontFamily: s.serif, color: s.navy, fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                Publicar en el foro
              </h3>

              {submitted && (
                <div style={{ backgroundColor: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.3)", padding: "0.75rem", marginBottom: "1rem", fontFamily: s.font, fontSize: "0.8rem", color: "#166534", borderRadius: "2px" }}>
                  ✓ Tu mensaje fue publicado
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div>
                  <label style={{ fontFamily: s.font, fontSize: "0.75rem", fontWeight: 600, color: s.navy, display: "block", marginBottom: "0.3rem" }}>Tu estado</label>
                  <input style={inputStyle()} placeholder="ej. Jalisco" value={newPost.estado} onChange={(e) => setNewPost((p) => ({ ...p, estado: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontFamily: s.font, fontSize: "0.75rem", fontWeight: 600, color: s.navy, display: "block", marginBottom: "0.3rem" }}>Categoría</label>
                  <select style={inputStyle({ appearance: "none" as never })} value={newPost.tag} onChange={(e) => setNewPost((p) => ({ ...p, tag: e.target.value }))}>
                    {Object.keys(tagColors).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: s.font, fontSize: "0.75rem", fontWeight: 600, color: s.navy, display: "block", marginBottom: "0.3rem" }}>Tu mensaje</label>
                  <textarea style={inputStyle({ resize: "vertical", minHeight: "110px" })} placeholder="Comparte tu caso, busca apoyo o convoca a acción..." value={newPost.content} onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))} />
                </div>
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: s.navy, color: "#ffffff", fontFamily: s.font, fontSize: "0.85rem", padding: "0.75rem", border: "none", cursor: "pointer", borderRadius: "2px" }}
                >
                  <Send size={14} />
                  Publicar mensaje
                </button>
                <p style={{ fontFamily: s.font, fontSize: "0.7rem", color: "#9a9a9a", lineHeight: 1.5 }}>
                  Puedes publicar de forma anónima. El contenido es moderado por la comunidad.
                </p>
              </div>
            </div>

            {/* Hashtags recientes */}
            <div style={{ backgroundColor: "#ffffff", border: `1px solid ${s.border}`, padding: "1.5rem" }}>
              <h4 style={{ fontFamily: s.font, color: s.navy, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "1rem" }} className="uppercase">
                Hashtags recientes
              </h4>
              <div className="flex flex-col gap-2">
                {[{ tag: hashtag, label: "Hoy" }, { tag: "MéxicoExigeJusticia", label: "Ayer" }, { tag: "NiUnaMás", label: "Hace 2 días" }, { tag: "MadresBuscadoras", label: "Hace 3 días" }, { tag: "AnticorrupciónYa", label: "Hace 4 días" }].map((h, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Hash size={11} color={s.red} />
                      <span style={{ fontFamily: s.font, fontSize: "0.8rem", color: s.navy }}>{h.tag}</span>
                    </div>
                    <span style={{ fontFamily: s.mono, fontSize: "0.65rem", color: "#9a9a9a" }}>{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reglas */}
            <div style={{ backgroundColor: s.navy, padding: "1.5rem" }}>
              <h4 style={{ fontFamily: s.font, color: "#ffffff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "1rem" }} className="uppercase">
                Reglas del foro
              </h4>
              <ul className="flex flex-col gap-2">
                {["Respeto a todas las personas", "No datos personales de terceros", "Sin incitación a la violencia", "Información verificada cuando sea posible", "Anonimato garantizado para todos"].map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: s.red, fontSize: "0.75rem", marginTop: "1px" }}>→</span>
                    <span style={{ fontFamily: s.font, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
