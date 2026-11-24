// Game-style "inspect item" screen: the room dims, the real 3D object sits in a spotlight on the
// left, and its details appear on the right.
//  - ID badges: the badge turns slowly (drag to rotate); details on a lanyard card.
//  - Degrees / certificates: the frame is held still and face-on so the paper reads; details in
//    a "document file" panel (serif title, brass rules, record rows) in the certificates' style.
// ◀ ▶ / A D browse within the same kind; Esc or "Back to room" returns to the room.
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Award, Briefcase, ChevronLeft, ChevronRight, ExternalLink, GraduationCap, MapPin, X } from "lucide-react";
import { experiences } from "@/components/about/AboutExperience";
import { education } from "@/components/about/AboutEducation";
import { certificates } from "@/components/about/AboutCertifications";
import { ACCENTS, Badge } from "./IdCardHolder";
import { CERT_FRAME, DEGREE_FRAME, Frame, drawCert, drawDegree } from "./CertificateWall";
import { KINDS, type InspectTarget } from "./inspect";

type Props = { target: InspectTarget; onClose: () => void; onPrev: () => void; onNext: () => void };

const BRASS = "#b08d57";
const DOC_RATIO = 760 / 1024; // certificate canvas aspect (see CertificateWall)

/* ---------------- 3D viewers ---------------- */

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0.6, 0.8, 1]} intensity={2.2} color="#fff3e2" />
      <directionalLight position={[-0.8, 0.2, -0.6]} intensity={0.9} color="#9fb4d8" />
    </>
  );
}

/** `rotate`: slow auto-turn + drag (badges). Without it the object is held still, face-on (documents). */
function Stage({ children, dist, rotate = true }: { children: React.ReactNode; dist: number; rotate?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, dist], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Lights />
      <Suspense fallback={null}>{children}</Suspense>
      {rotate && <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />}
    </Canvas>
  );
}

function BadgeViewer({ idx }: { idx: number }) {
  const cardW = 0.11;
  const drop = 0.075;
  // centre the badge (strap loop at y=0 down to the bottom of the holder)
  const centreY = (drop + 0.03 + (cardW * 950) / 600 + 0.022) / 2;
  return (
    <Stage dist={0.6}>
      <group position={[0, centreY, 0]} rotation-y={Math.PI / 2} key={idx}>
        <Badge e={experiences[idx]} idx={idx} z={0} drop={drop} cardW={cardW} railR={0.005} />
      </group>
    </Stage>
  );
}

/** A framed document held still and face-on, filling the stage so the paper can be read. */
function FrameViewer({ kind, idx }: { kind: "degree" | "cert"; idx: number }) {
  const w = kind === "degree" ? 0.46 : 0.36;
  const mat = kind === "degree" ? 0.035 : 0.025;
  const inset = 0.022 + mat;
  const h = (w - 2 * inset) * DOC_RATIO + 2 * inset;
  const draw = kind === "degree" ? (g: CanvasRenderingContext2D) => drawDegree(g, education[idx]) : (g: CanvasRenderingContext2D) => drawCert(g, certificates[idx]);
  return (
    <Stage dist={kind === "degree" ? 0.72 : 0.57} rotate={false}>
      <group key={`${kind}-${idx}`} position={[0, 0, -0.012]}>
        <Frame p={[0, 0, 0]} w={w} draw={draw} frame={kind === "degree" ? DEGREE_FRAME : CERT_FRAME} mat={mat} />
        {/* backing board so the frame has depth at the edges */}
        <mesh position={[0, 0, -0.0015]}>
          <boxGeometry args={[w - 0.004, h - 0.004, 0.003]} />
          <meshStandardMaterial color="#9a7a55" roughness={0.95} />
        </mesh>
      </group>
    </Stage>
  );
}

/* ---------------- ID badge: lanyard card ---------------- */

function BadgeCard({ idx, n }: { idx: number; n: number }) {
  const e = experiences[idx];
  const accent = ACCENTS[idx % ACCENTS.length];
  return (
    <div className="inspect-swing relative w-full max-w-[460px] pt-16">
      {/* strap + clip */}
      <div className="absolute left-1/2 top-[-40vh] h-[calc(40vh+64px)] w-6 -translate-x-1/2 rotate-[6deg] origin-bottom rounded-sm bg-gradient-to-r from-slate-300 via-white to-slate-300 shadow-[0_0_12px_rgba(0,0,0,0.25)]" />
      <div className="absolute left-1/2 top-[54px] z-20 flex h-5 w-16 -translate-x-1/2 items-center justify-center rounded-md bg-gradient-to-b from-slate-100 to-slate-400 shadow-md">
        <div className="h-1.5 w-8 rounded-full bg-slate-500/70" />
      </div>
      {/* stacked cards behind */}
      <div className="absolute inset-x-3 bottom-[-14px] top-[78px] -rotate-[3deg] rounded-2xl bg-white/90 shadow-lg" />
      <div className="absolute inset-x-2 bottom-[-6px] top-[72px] rotate-[2deg] rounded-2xl bg-white/95 shadow-lg" />
      {/* card */}
      <div className="relative z-10 rounded-2xl bg-white p-7 text-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[15px] font-extrabold uppercase leading-snug tracking-[0.12em] text-slate-800">{e.title}</h3>
          <div className="mt-1.5 flex shrink-0 gap-1">
            {Array.from({ length: n }, (_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-slate-800" : "bg-slate-300"}`} />
            ))}
          </div>
        </div>
        <div className="mt-4 font-serif text-4xl font-black leading-none text-slate-800">&ldquo;</div>
        <ul className="mt-1 space-y-1.5 text-[15px] leading-relaxed text-slate-400">
          {e.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        {e.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {e.skills.map((s) => (
              <span key={s} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${BRASS})` }}>
            {e.company.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-slate-800">{e.company}</div>
            <div className="flex items-center gap-1 truncate text-xs text-slate-500">
              {e.period}
              {e.location && (
                <>
                  <span className="mx-1">·</span>
                  <MapPin size={11} className="shrink-0" />
                  {e.location}
                </>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm font-semibold text-slate-700">
            <Briefcase size={14} className="text-amber-500" />
            {e.type}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- degree / certificate: document file panel ---------------- */

function statusOf(period: string) {
  const end = period.split(/[–-]/).pop()?.trim() ?? "";
  if (/present/i.test(end)) return "In progress";
  const d = new Date(`1 ${end}`);
  return !Number.isNaN(d.getTime()) && d.getTime() > Date.now() ? "In progress" : "Completed";
}

type DocInfo = {
  eyebrow: string;
  title: string;
  subtitle: string;
  rows: [string, string][];
  about: string;
  tags: string[];
  link?: string;
  Icon: typeof GraduationCap;
};

function docInfo(kind: "degree" | "cert", idx: number): DocInfo {
  if (kind === "degree") {
    const e = education[idx];
    const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(e.degree);
    const status = statusOf(e.period);
    const [from, to] = e.period.split(/\s*[–-]\s*/);
    return {
      eyebrow: "Academic record",
      title: m ? m[1] : e.degree,
      subtitle: e.institution,
      rows: [
        ["Award", m ? m[2] : e.degree],
        ["Enrolled", from ?? e.period],
        ["Completed", status === "Completed" ? (to ?? "—") : "In progress"],
        ["Status", status],
      ],
      about: status === "Completed" ? `Earned the ${e.degree} at ${e.institution}.` : `Currently pursuing the ${e.degree} at ${e.institution}.`,
      tags: e.skills,
      Icon: GraduationCap,
    };
  }
  const c = certificates[idx];
  return {
    eyebrow: "Certificate of completion",
    title: c.title,
    subtitle: `Issued by ${c.issuer}`,
    rows: [
      ["Issuer", c.issuer],
      ["Issued", c.issued],
      ["Credential", c.verifyUrl && c.verifyUrl !== "#" ? "Verifiable online" : "On file"],
    ],
    about: c.description,
    tags: c.skills,
    link: c.verifyUrl && c.verifyUrl !== "#" ? c.verifyUrl : undefined,
    Icon: Award,
  };
}

function DocPanel({ kind, idx, n }: { kind: "degree" | "cert"; idx: number; n: number }) {
  const d = docInfo(kind, idx);
  return (
    <div className="inspect-file relative w-full max-w-[420px] overflow-hidden rounded-xl border border-white/10 bg-[#14161c]/80 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-8">
      {/* brass corner marks, like the certificate borders */}
      <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[#b08d57]/70" />
      <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-[#b08d57]/70" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#b08d57]/70" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#b08d57]/70" />

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d8b98a]">{d.eyebrow}</span>
        <span className="font-mono text-[11px] tracking-widest text-white/40">
          {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#b08d57]/60 bg-[#b08d57]/10 text-[#d8b98a]">
          <d.Icon size={22} strokeWidth={1.6} />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-[26px] leading-tight text-[#f3eee4]">{d.title}</h3>
          <p className="mt-1 text-sm text-white/60">{d.subtitle}</p>
        </div>
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b08d57]/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#b08d57]" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b08d57]/60" />
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        {d.rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{k}</dt>
            <dd className="mt-1 text-sm font-medium text-white/90">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-l-2 border-[#b08d57]/60 pl-4 text-sm italic leading-relaxed text-white/70">{d.about}</p>

      {d.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {d.tags.map((t) => (
            <span key={t} className="rounded border border-[#b08d57]/40 px-2 py-0.5 text-[11px] text-[#e9dcc4]">
              {t}
            </span>
          ))}
        </div>
      )}

      {d.link && (
        <a href={d.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#b08d57] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#14161c] hover:bg-[#c39e66]">
          Verify credential <ExternalLink size={13} />
        </a>
      )}
      {/* page marks */}
      <div className="mt-6 flex gap-1.5">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className={`h-0.5 rounded-full ${i === idx ? "w-6 bg-[#b08d57]" : "w-3 bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- screen ---------------- */

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[28px] items-center justify-center rounded-md border border-white/30 bg-white/10 px-1.5 py-0.5 text-[11px] font-semibold text-white shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]">
      {children}
    </kbd>
  );
}

export function InspectOverlay({ target, onClose, onPrev, onNext }: Props) {
  const { kind, idx } = target;
  const n = KINDS[kind].count();
  const isBadge = kind === "badge";
  return (
    <div className="inspect-root fixed inset-0 z-40 flex flex-col bg-black/60 text-white backdrop-blur-md">
      {/* HUD: top */}
      <div className="flex items-center justify-between px-6 pt-5">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
          <span className="h-2 w-2 rotate-45 bg-[#b08d57]" />
          Item inspect
          <span className="text-white/40">·</span>
          <span className="text-white">{KINDS[kind].label}</span>
          <span className="text-white/40">
            {idx + 1} / {n}
          </span>
        </div>
        <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 hover:bg-white/20" aria-label="Close">
          <X size={18} />
        </button>
      </div>

      {/* stage */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-4 md:flex-row md:gap-14">
        {/* the object */}
        <div className={`relative w-full shrink-0 ${isBadge ? "h-[34vh] max-w-[300px] md:h-[62vh] md:max-w-[380px]" : "h-[30vh] max-w-[460px] md:h-[56vh] md:max-w-[620px]"}`}>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,236,205,0.22),transparent)]" />
          {isBadge ? <BadgeViewer idx={idx} /> : <FrameViewer kind={kind} idx={idx} />}
          {isBadge && <p className="absolute -bottom-6 left-0 right-0 text-center text-[11px] uppercase tracking-[0.25em] text-white/50">Drag to rotate</p>}
        </div>

        {/* the details */}
        {isBadge ? <BadgeCard key={`b-${idx}`} idx={idx} n={n} /> : <DocPanel key={`${kind}-${idx}`} kind={kind} idx={idx} n={n} />}
      </div>

      {/* HUD: bottom controls */}
      <div className="flex items-center justify-center gap-6 pb-6 text-xs text-white/70">
        <button onClick={onPrev} className="flex items-center gap-2 hover:text-white">
          <ChevronLeft size={16} />
          <Key>A</Key> Prev
        </button>
        <button onClick={onNext} className="flex items-center gap-2 hover:text-white">
          Next <Key>D</Key>
          <ChevronRight size={16} />
        </button>
        <button onClick={onClose} className="flex items-center gap-2 hover:text-white">
          <Key>Esc</Key> Back to room
        </button>
      </div>
    </div>
  );
}
