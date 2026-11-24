// A small gallery wall of 3D framed degrees for the Education card: the latest degree in a large
// frame in the middle, earlier ones in smaller frames either side. Each frame hangs from a nail on
// a wire, has real depth (stacked moulding slices + backing board) and a glass pane with
// reflections, sways and slowly turns with light that shifts across it, and casts a soft shadow on
// the wall. Hovering a frame tilts it towards the mouse with a moving glare. Clicks fall through to
// the card (the button that opens the Education sheet).
import { useRef } from "react";

const SERIF = "'DM Serif Display', Georgia, serif";
const SANS = "Inter, 'Segoe UI', Arial, sans-serif";

export type Degree = { abbr: string; title: string; institution: string; period: string };

/** Split a line over two at the space nearest the middle. */
function twoLines(t: string, max: number): [string, string?] {
  if (t.length <= max) return [t];
  const mid = t.length / 2;
  let best = -1;
  for (let i = 0; i < t.length; i++) if (t[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return best < 0 ? [t] : [t.slice(0, best), t.slice(best + 1)];
}
const fit = (s: string, max: number, w: number) => (s.length > max ? { textLength: w, lengthAdjust: "spacingAndGlyphs" as const } : {});

/** The printed diploma (large frame). */
function BigSheet({ d }: { d: Degree }) {
  const [l1, l2] = twoLines(d.title, 22);
  return (
    <svg viewBox="0 0 160 104" className="block h-full w-full">
      <rect width="160" height="104" fill="#fbf8f0" />
      <rect x="5" y="5" width="150" height="94" fill="none" stroke="#b8955a" strokeWidth="1.2" />
      <rect x="8" y="8" width="144" height="88" fill="none" stroke="#b8955a" strokeWidth=".5" />
      <text x="80" y="21" textAnchor="middle" fontSize="5.4" fontWeight="800" letterSpacing=".8" fill="#1f2a44" fontFamily={SANS} {...fit(d.institution.toUpperCase(), 34, 136)}>
        {d.institution.toUpperCase()}
      </text>
      <text x="80" y="31" textAnchor="middle" fontSize="5.6" fontStyle="italic" fill="#6b6b6b" fontFamily={SERIF}>
        has conferred the degree of
      </text>
      <text textAnchor="middle" fontSize="11" fill="#1f2a44" fontFamily={SERIF}>
        <tspan x="80" y={l2 ? 45 : 50} {...fit(l1, 24, 140)}>
          {l1}
        </tspan>
        {l2 && (
          <tspan x="80" y="57" {...fit(l2, 24, 140)}>
            {l2}
          </tspan>
        )}
      </text>
      <text x="80" y="71" textAnchor="middle" fontSize="9" fontWeight="700" fill="#b8955a" fontFamily={SERIF}>
        {d.abbr}
      </text>
      {/* signatures */}
      <path d="M22 88 q5 -7 9 0 t9 -2 q4 -5 7 1" fill="none" stroke="#1f2a44" strokeWidth=".8" opacity=".7" />
      <rect x="20" y="91" width="32" height=".5" fill="#1f2a44" opacity=".4" />
      <path d="M112 87 q4 -6 8 0 t8 -1 q3 -4 6 1" fill="none" stroke="#1f2a44" strokeWidth=".8" opacity=".7" />
      <rect x="108" y="91" width="32" height=".5" fill="#1f2a44" opacity=".4" />
      {/* gold seal */}
      <path d="M74 86 L71 99 L76 96 L78 100 L80 88 Z M86 86 L89 99 L84 96 L82 100 L80 88 Z" fill="#c4554a" />
      <circle cx="80" cy="84" r="7.5" fill="#d7a64a" />
      <circle cx="80" cy="84" r="5.5" fill="#f1d38a" stroke="#b8862c" strokeWidth=".6" strokeDasharray="1.2 .9" />
    </svg>
  );
}

/** A small framed degree: abbreviation, institution, seal. */
function SmallSheet({ d }: { d: Degree }) {
  return (
    <svg viewBox="0 0 80 100" className="block h-full w-full">
      <rect width="80" height="100" fill="#fbf8f0" />
      <rect x="4" y="4" width="72" height="92" fill="none" stroke="#b8955a" strokeWidth="1" />
      <text x="40" y="22" textAnchor="middle" fontSize="5" fontWeight="800" letterSpacing="1" fill="#6b5a2a" fontFamily={SANS}>
        DEGREE
      </text>
      <text x="40" y="48" textAnchor="middle" fontSize="17" fill="#1f2a44" fontFamily={SERIF} {...fit(d.abbr, 5, 62)}>
        {d.abbr}
      </text>
      <text x="40" y="60" textAnchor="middle" fontSize="5" fill="#6b6b6b" fontFamily={SANS} {...fit(d.institution, 20, 64)}>
        {d.institution.split(",")[0]}
      </text>
      <circle cx="40" cy="78" r="7" fill="#d7a64a" />
      <circle cx="40" cy="78" r="5" fill="#f1d38a" stroke="#b8862c" strokeWidth=".6" strokeDasharray="1.2 .9" />
    </svg>
  );
}

type FrameProps = {
  children: React.ReactNode;
  aspect: string; // CSS aspect-ratio of the whole frame
  sizeClass: string;
  frame: string; // moulding colour
  edge: string; // side of the moulding
  depth: number; // px
  wire: number; // px
  border: string; // moulding width (CSS length)
  delay: string;
  plaque?: string;
  className?: string;
};

function Frame3D({ children, aspect, sizeClass, frame, edge, depth, wire, border, delay, plaque, className = "" }: FrameProps) {
  const tilt = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = tilt.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    el.style.setProperty("--ry", `${x * 34}deg`);
    el.style.setProperty("--rx", `${-y * 26}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
    el.dataset.tilt = "1";
  };
  const onLeave = () => {
    const el = tilt.current;
    if (!el) return;
    el.dataset.tilt = "";
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div className={`dip-swing relative flex flex-col items-center ${sizeClass} ${className}`} style={{ animationDelay: delay }}>
      {/* nail + picture wire */}
      <span className="absolute left-1/2 top-0 z-10 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4f4f6,#8d929b)] shadow-[0_1px_2px_rgba(0,0,0,.45)]" />
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="block w-full" style={{ height: wire }} aria-hidden>
        <path d="M14 20 L50 0 L86 20" fill="none" stroke="#5a4a38" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="dip-stage pointer-events-auto relative w-full" style={{ aspectRatio: aspect }} onPointerMove={onMove} onPointerLeave={onLeave}>
        {/* shadow on the wall */}
        <div className="dip-shadow absolute inset-[3%] bg-[#1d2a08]/45 blur-[8px]" style={{ animationDelay: delay }} />

        <div ref={tilt} className="dip-tilt absolute inset-0">
          <div className="dip-card absolute inset-0" style={{ animationDelay: delay }}>
            {/* backing board */}
            <div className="absolute inset-0 bg-[#3b2f22]" style={{ transform: `translateZ(-${depth + 1}px)` }} />
            {/* moulding depth */}
            {Array.from({ length: depth }, (_, k) => (
              <div key={k} className="absolute inset-0" style={{ background: edge, transform: `translateZ(-${k + 1}px)` }} />
            ))}
            {/* moulding face (bevelled) + mat + print */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                background: frame,
                padding: border,
                boxShadow: "inset 1.5px 1.5px 0 rgba(255,255,255,.22), inset -1.5px -1.5px 0 rgba(0,0,0,.35)",
              }}
            >
              <div className="h-full w-full bg-[#f3efe6] p-[6%] shadow-[inset_1px_1px_3px_rgba(0,0,0,.35)]">
                <div className="h-full w-full shadow-[0_0_0_1px_rgba(0,0,0,.06)]">{children}</div>
              </div>
              <div className="dip-shade absolute inset-0 bg-[#10140a]" style={{ animationDelay: delay }} />
            </div>
            {/* glass pane */}
            <div className="dip-glass absolute" style={{ inset: border, transform: "translateZ(1.5px)" }}>
              <div className="dip-sheen absolute inset-0" style={{ animationDelay: delay }} />
              <div className="dip-glare absolute inset-0" />
            </div>
            {/* brass plaque on the bottom rail */}
            {plaque && (
              <span
                className="absolute bottom-0 left-1/2 translate-y-[45%] whitespace-nowrap rounded-[2px] bg-[linear-gradient(180deg,#e2c48f,#a8834c)] px-[0.6em] py-[0.15em] text-[clamp(7px,1.1vh,9.5px)] font-semibold uppercase tracking-wider text-[#2a2216] shadow-[0_2px_3px_rgba(0,0,0,.35)]"
                style={{ transform: "translateX(-50%) translateZ(1px)" }}
              >
                {plaque}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiplomaWall({ degrees, className = "" }: { degrees: Degree[]; className?: string }) {
  const [latest, ...earlier] = degrees;
  const left = earlier[0];
  const right = earlier[1];
  const small = (d: Degree, i: number, side: "l" | "r") => (
    <Frame3D
      key={d.abbr + i}
      aspect="80 / 100"
      sizeClass="w-[17vw] max-w-[78px] md:w-[clamp(48px,8vh,76px)] md:max-w-none"
      frame={side === "l" ? "#6b4429" : "#c9a46a"}
      edge={side === "l" ? "#4e301c" : "#9c7a45"}
      depth={4}
      wire={10}
      border="9%"
      delay={`${-1.3 - i}s`}
      className={side === "l" ? "mt-[12%] -mr-[2%]" : "mt-[20%] -ml-[2%]"}
    >
      <SmallSheet d={d} />
    </Frame3D>
  );

  return (
    <div className={`flex items-start justify-center gap-[4%] ${className}`}>
      <style>{`
        @keyframes dip-swing { 0%,100% { transform: rotate(-1.4deg) } 50% { transform: rotate(1.4deg) } }
        @keyframes dip-turn { 0%,100% { transform: rotateY(-16deg) rotateX(3deg) } 50% { transform: rotateY(16deg) rotateX(-2deg) } }
        @keyframes dip-shade { 0%,100% { opacity: .16 } 50% { opacity: 0 } }
        @keyframes dip-shadow { 0%,100% { transform: translate(9%, 8%) scaleX(.9) } 50% { transform: translate(3%, 8%) scaleX(.94) } }
        @keyframes dip-sheen { 0%,100% { background-position: 115% 0 } 50% { background-position: -15% 0 } }
        .dip-swing { transform-origin: 50% 0; animation: dip-swing 4.4s ease-in-out infinite }
        .dip-stage { perspective: 520px }
        .dip-tilt { transform-style: preserve-3d; transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform .3s cubic-bezier(.2,.8,.3,1) }
        .dip-card { transform-style: preserve-3d; animation: dip-turn 7s ease-in-out infinite }
        .dip-tilt[data-tilt="1"] .dip-card, .dip-tilt[data-tilt="1"] .dip-shade, .dip-tilt[data-tilt="1"] .dip-sheen { animation-play-state: paused }
        .dip-shade { animation: dip-shade 7s ease-in-out infinite }
        .dip-shadow { animation: dip-shadow 7s ease-in-out infinite }
        .dip-glass { background: linear-gradient(135deg, rgba(255,255,255,.32), rgba(255,255,255,.04) 30%, rgba(255,255,255,0) 55%, rgba(255,255,255,.14) 80%, rgba(255,255,255,.03)); box-shadow: inset 0 0 0 1px rgba(255,255,255,.25) }
        .dip-sheen { background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,.5) 50%, transparent 62%); background-size: 260% 100%; animation: dip-sheen 7s ease-in-out infinite; mix-blend-mode: soft-light }
        .dip-glare { opacity: 0; transition: opacity .3s; background: radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgba(255,255,255,.5), transparent 55%); mix-blend-mode: soft-light }
        .dip-tilt[data-tilt="1"] .dip-glare { opacity: 1 }
        @media (prefers-reduced-motion: reduce) { .dip-swing, .dip-card, .dip-shade, .dip-shadow, .dip-sheen { animation: none } }
      `}</style>
      {left && small(left, 0, "l")}
      <Frame3D
        aspect="160 / 118"
        sizeClass="w-[46vw] max-w-[210px] md:w-[clamp(118px,20vh,196px)] md:max-w-none"
        frame="#1c1a19"
        edge="#0e0d0c"
        depth={7}
        wire={22}
        border="6.5%"
        delay="0s"
        plaque={`${latest.abbr} · ${latest.period}`}
        className="z-[1]"
      >
        <BigSheet d={latest} />
      </Frame3D>
      {right && small(right, 1, "r")}
    </div>
  );
}
