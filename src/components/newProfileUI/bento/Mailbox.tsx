// Illustrated wall mailbox for the "Let's talk" tile. A letter floats above the box; hovering the
// tile lifts the lid and lowers the letter towards the slot; sending (click, or dragging the letter
// onto the box) drops it in, shuts the lid and raises the flag. Pure SVG + CSS transitions.
import { useEffect, useRef, useState } from "react";

const VB = { w: 220, h: 200 };
const LETTER = { x: 110, y: 36 }; // letter centre at rest

export default function Mailbox({ sending, onSend, className = "w-40 sm:w-48" }: { sending: boolean; onSend: () => void; className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const start = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const dragged = useRef(false); // swallow the click that follows a drag
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  // "drop": lid open while the letter slides in → "in": lid shut, flag up
  const [phase, setPhase] = useState<"idle" | "drop" | "in">("idle");
  useEffect(() => {
    if (!sending) return setPhase("idle");
    setPhase("drop");
    const t = setTimeout(() => setPhase("in"), 520);
    return () => clearTimeout(t);
  }, [sending]);

  const toSvg = (dx: number, dy: number) => {
    const r = svg.current?.getBoundingClientRect();
    const k = r ? VB.w / r.width : 1;
    return { x: dx * k, y: dy * k };
  };

  const onDown = (e: React.PointerEvent) => {
    if (sending) return;
    e.stopPropagation();
    dragged.current = false;
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {
      /* synthetic / already-released pointer */
    }
    start.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const d = toSvg(e.clientX - s.x, e.clientY - s.y);
    if (!s.moved && Math.hypot(d.x, d.y) < 4) return;
    s.moved = true;
    setDrag(d);
  };
  const onUp = () => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const d = drag;
    setDrag(null);
    if (!s.moved) return; // a plain click is handled by the click handler below
    dragged.current = true;
    // dropped over the box → in it goes; anywhere else → it springs back
    const cx = LETTER.x + (d?.x ?? 0);
    const cy = LETTER.y + (d?.y ?? 0);
    if (cx > 40 && cx < 180 && cy > 30 && cy < 150) onSend();
  };

  const letterMove = drag
    ? { transform: `translate(${drag.x}px, ${drag.y}px)`, transition: "none" }
    : { transform: sending ? "translate(0px, 118px)" : "translate(0px, 0px)", transition: sending ? "transform .5s cubic-bezier(.55,0,.75,.3)" : "transform .45s cubic-bezier(.3,1.4,.5,1)" };

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      aria-hidden
      className={`pointer-events-auto shrink-0 cursor-pointer select-none overflow-visible drop-shadow-[0_14px_18px_rgba(90,20,10,0.28)] ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (dragged.current) {
          dragged.current = false;
          return;
        }
        onSend();
      }}
    >
      <style>{`
        @keyframes mb-bob { 0%,100% { transform: translateY(0) rotate(-4deg) } 50% { transform: translateY(-6px) rotate(3deg) } }
        .mb-bob { animation: mb-bob 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center }
        @media (prefers-reduced-motion: reduce) { .mb-bob { animation: none } }
      `}</style>
      <defs>
        <linearGradient id="mb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d23a3f" />
          <stop offset="1" stopColor="#a9161d" />
        </linearGradient>
        <linearGradient id="mb-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2484c" />
          <stop offset="1" stopColor="#bb2128" />
        </linearGradient>
        {/* the letter is only visible above the slot, so it vanishes into the box */}
        <clipPath id="mb-clip">
          <rect x="-60" y="-200" width="340" height="282" />
        </clipPath>
      </defs>

      {/* mounting plate + screws */}
      <rect x="72" y="48" width="76" height="148" rx="10" fill="#8f1218" />
      <circle cx="110" cy="182" r="4" fill="#e9e3dc" opacity=".8" />

      {/* letter (behind the box front) */}
      <g clipPath="url(#mb-clip)">
        <g style={letterMove} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} className={drag ? "cursor-grabbing" : "cursor-grab"}>
          <g className={`transition-transform duration-300 ${sending || drag ? "" : "group-hover:translate-y-[14px]"}`}>
            <g className={sending || drag ? "" : "mb-bob"}>
              <rect x={LETTER.x - 38} y={LETTER.y - 25} width="76" height="50" rx="4" fill="#fbf6ec" stroke="#e3d6c0" strokeWidth="1.5" />
              <path d={`M${LETTER.x - 38} ${LETTER.y - 23} L${LETTER.x} ${LETTER.y + 3} L${LETTER.x + 38} ${LETTER.y - 23}`} fill="none" stroke="#d9c9ae" strokeWidth="2" strokeLinejoin="round" />
              <rect x={LETTER.x + 20} y={LETTER.y - 19} width="12" height="14" rx="1.5" fill="#e8735f" />
              <circle cx={LETTER.x} cy={LETTER.y + 3} r="7" fill="#c62a2f" />
              <path d={`M${LETTER.x} ${LETTER.y + 6.5} l-3.6 -3.4 a2.2 2.2 0 0 1 3.6 -2.6 a2.2 2.2 0 0 1 3.6 2.6 z`} fill="#fbf6ec" />
            </g>
          </g>
        </g>
      </g>

      {/* box */}
      <rect x="30" y="78" width="160" height="96" rx="20" fill="url(#mb-body)" />
      <rect x="40" y="86" width="140" height="10" rx="5" fill="#fff" opacity=".12" />
      {/* address plate */}
      <rect x="62" y="114" width="96" height="34" rx="8" fill="#fbf6ec" />
      <text x="110" y="128" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#9a8467" fontFamily="Inter, Segoe UI, sans-serif">
        LETTERS
      </text>
      <text x="110" y="142" textAnchor="middle" fontSize="12" fill="#c62a2f" fontFamily="Inter, Segoe UI, sans-serif">
        ♥
      </text>

      {/* flag on the side: down at rest, up once a letter is in */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "192px 150px",
          transform: phase === "in" ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform .6s cubic-bezier(.3,1.6,.5,1)",
        }}
      >
        <rect x="189" y="104" width="6" height="48" rx="3" fill="#2a2433" />
        <rect x="189" y="104" width="24" height="15" rx="3" fill="#ffd166" />
      </g>
      <circle cx="192" cy="150" r="5" fill="#2a2433" />

      {/* lid: hinged at the back-left, lifts on hover and while a letter goes in */}
      <g
        className={sending ? "" : "group-hover:-rotate-[16deg]"}
        style={{
          transformBox: "view-box",
          transformOrigin: "34px 80px",
          transform: phase === "drop" ? "rotate(-24deg)" : phase === "in" ? "rotate(0deg)" : undefined,
          transition: "transform .35s cubic-bezier(.3,1.4,.5,1)",
        }}
      >
        <rect x="24" y="66" width="172" height="22" rx="11" fill="url(#mb-lid)" />
        <rect x="34" y="70" width="152" height="4" rx="2" fill="#fff" opacity=".2" />
      </g>
    </svg>
  );
}
