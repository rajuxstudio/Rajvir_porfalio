// A row of 3D ID badges hanging on lanyards, one per role (newest first), for the Experience card.
// Each badge is an SVG card (photo, company, title, dates, barcode) with a solid edge and a clear sleeve, in a
// CSS 3D space: it swings on its lanyard and slowly turns, with a plastic sheen that sweeps across.
// Hovering the card lifts the lanyards; hovering a badge tilts it towards the mouse. Clicks fall
// through to the card (the button that opens the Experience sheet).
import { useRef } from "react";
const SERIF = "'DM Serif Display', Georgia, serif";
const SANS = "Inter, 'Segoe UI', Arial, sans-serif";
const TINTS = ["#1f2a44", "#2f6f73", "#c4554a", "#5b3a7a", "#3a6b4f", "#8a5a2b"];
const LANYARD = [2.2, 5.4, 3.2, 6.4, 4]; // lanyard lengths (vh), staggered
const DEPTH = 5; // card thickness in px (stacked edge slices)

export type BadgeRole = { company: string; title: string; period: string; now?: boolean };

/** Split a title over two lines at the space nearest the middle. */
function twoLines(t: string): [string, string?] {
  if (t.length <= 18) return [t];
  const mid = t.length / 2;
  let best = -1;
  for (let i = 0; i < t.length; i++) if (t[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return best < 0 ? [t] : [t.slice(0, best), t.slice(best + 1)];
}

function Badge({ r, i, photo }: { r: BadgeRole; i: number; photo: string }) {
  const tint = TINTS[i % TINTS.length];
  const [l1, l2] = twoLines(r.title);
  const fit = (s: string, max: number, w: number) => (s.length > max ? { textLength: w, lengthAdjust: "spacingAndGlyphs" as const } : {});
  return (
    <svg viewBox="0 0 100 140" className="block h-full w-full">
      <defs>
        <clipPath id={`idb-photo-${i}`}>
          <rect x="33" y="44" width="34" height="38" rx="5" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="100" height="140" rx="9" fill="#fffdf8" />
      {/* punched slot for the clip */}
      <rect x="38" y="5" width="24" height="5" rx="2.5" fill="#d9cfc0" />
      {/* company band */}
      <rect x="0" y="14" width="100" height="24" fill={tint} />
      <text x="50" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={SERIF} {...fit(r.company, 11, 84)}>
        {r.company}
      </text>
      {r.now && (
        <>
          <rect x="70" y="40" width="24" height="10" rx="5" fill="#ef8582" />
          <text x="82" y="47.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff" fontFamily={SANS}>
            NOW
          </text>
        </>
      )}
      {/* photo */}
      <rect x="31.5" y="42.5" width="37" height="41" rx="6" fill={tint} opacity=".25" />
      <image href={photo} x="33" y="44" width="34" height="38" preserveAspectRatio="xMidYMid slice" clipPath={`url(#idb-photo-${i})`} />
      {/* name + title */}
      <text x="50" y="94" textAnchor="middle" fontSize="10.5" fill="#1f1f22" fontFamily={SERIF}>
        Rajveer
      </text>
      <text textAnchor="middle" fontSize="6.2" fontWeight="600" fill="#6b6b72" fontFamily={SANS}>
        <tspan x="50" y="103" {...fit(l1, 22, 88)}>
          {l1}
        </tspan>
        {l2 && (
          <tspan x="50" y="110.5" {...fit(l2, 22, 88)}>
            {l2}
          </tspan>
        )}
      </text>
      {/* dates + barcode */}
      <text x="50" y="121" textAnchor="middle" fontSize="5.6" fontWeight="700" letterSpacing=".3" fill={tint} fontFamily={SANS} {...fit(r.period, 22, 84)}>
        {r.period.toUpperCase()}
      </text>
      <g fill="#1f1f22" opacity=".75">
        {[0, 3, 5, 9, 11, 12, 16, 19, 21, 24, 27, 28, 32, 35, 37, 40].map((x, k) => (
          <rect key={k} x={30 + x} y="126" width={k % 3 ? 1.2 : 2} height="8" />
        ))}
      </g>
    </svg>
  );
}

/** One badge on its lanyard: a real 3D card (front, solid edge, back) in a clear plastic sleeve. */
function HangingBadge({ r, i, photo }: { r: BadgeRole; i: number; photo: string }) {
  const tilt = useRef<HTMLDivElement>(null);
  const tint = TINTS[i % TINTS.length];
  const delay = `${-i * 0.9}s`;

  // hovering a badge: it stops turning and tilts towards the mouse, with a moving glare
  const onMove = (e: React.PointerEvent) => {
    const el = tilt.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    el.style.setProperty("--ry", `${x * 46}deg`);
    el.style.setProperty("--rx", `${-y * 34}deg`);
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
    <div className="idb-lift" style={{ transitionDelay: `${i * 40}ms` }}>
      <div className="idb-swing flex flex-col items-center" style={{ animationDelay: delay }}>
        {/* lanyard strap (rounded shading over woven stripes) */}
        <div
          className="w-[10px] rounded-b-sm"
          style={{
            height: `calc(${LANYARD[i % LANYARD.length]}vh + 18px)`,
            background: `linear-gradient(90deg, rgba(0,0,0,.28), rgba(255,255,255,.12) 35%, rgba(255,255,255,.12) 55%, rgba(0,0,0,.3)), repeating-linear-gradient(180deg, ${tint} 0 7px, color-mix(in srgb, ${tint} 78%, #fff) 7px 8px)`,
          }}
        />
        {/* metal swivel ring + clasp */}
        <div className="-mt-[3px] h-[9px] w-[9px] rounded-full border-[2px] border-[#b8bcc4] shadow-[inset_0_1px_1px_rgba(255,255,255,.8),0_1px_1px_rgba(0,0,0,.35)]" />
        <div className="-mt-[2px] h-[11px] w-[7px] rounded-[3px] bg-[linear-gradient(90deg,#8d929b,#f1f2f4_45%,#a3a8b0)] shadow-[0_1px_2px_rgba(0,0,0,.35)]" />

        <div
          className="idb-stage pointer-events-auto relative -mt-[3px] aspect-[100/140] w-[13vw] max-w-[96px] md:w-[clamp(58px,9.5vh,92px)] md:max-w-none"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {/* soft shadow cast on the wall behind; shifts as the badge turns */}
          <div className="idb-shadow absolute inset-[4%] rounded-[10%/7%] bg-[#3a1a05]/40 blur-[7px]" style={{ animationDelay: delay }} />

          <div ref={tilt} className="idb-tilt absolute inset-0">
            <div className="idb-card absolute inset-0" style={{ animationDelay: delay }}>
              {/* back of the card */}
              <div className="absolute inset-0 rounded-[9%/6.5%]" style={{ background: tint, transform: `translateZ(-${DEPTH + 1}px)` }} />
              {/* solid edge: stacked slices of card stock */}
              {Array.from({ length: DEPTH }, (_, k) => (
                <div
                  key={k}
                  className="absolute inset-0 rounded-[9%/6.5%]"
                  style={{ background: k === DEPTH - 1 ? `color-mix(in srgb, ${tint} 55%, #d9d2c4)` : "#ddd6c9", transform: `translateZ(-${k + 1}px)` }}
                />
              ))}
              {/* printed front, with light that shifts as it turns + sheen + mouse glare */}
              <div className="absolute inset-0 overflow-hidden rounded-[9%/6.5%]">
                <Badge r={r} i={i} photo={photo} />
                <div className="idb-shade absolute inset-0 bg-[#2a1405]" style={{ animationDelay: delay }} />
                <div className="idb-sheen absolute inset-0" style={{ animationDelay: delay }} />
                <div className="idb-glare absolute inset-0" />
              </div>
              {/* clear plastic sleeve over the card */}
              <div className="idb-sleeve absolute -inset-[4%] rounded-[12%/8.5%]" style={{ transform: "translateZ(3px)" }}>
                <div className="absolute left-1/2 top-[3%] h-[3.5%] w-[30%] -translate-x-1/2 rounded-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IdBadges({ roles, photo, className = "" }: { roles: BadgeRole[]; photo: string; className?: string }) {
  return (
    <div className={`flex items-start justify-around ${className}`}>
      <style>{`
        @keyframes idb-swing { 0%,100% { transform: rotate(-2.4deg) } 50% { transform: rotate(2.4deg) } }
        @keyframes idb-turn { 0%,100% { transform: rotateY(-34deg) rotateX(6deg) } 50% { transform: rotateY(34deg) rotateX(-4deg) } }
        @keyframes idb-shade { 0%,100% { opacity: .2 } 50% { opacity: 0 } }
        @keyframes idb-shadow { 0%,100% { transform: translate(14%, 9%) scaleX(.78) } 50% { transform: translate(2%, 9%) scaleX(.82) } }
        @keyframes idb-sheen { 0%,100% { background-position: 120% 0 } 50% { background-position: -20% 0 } }
        .idb-lift { transition: transform .5s cubic-bezier(.3,1.4,.5,1) }
        .group:hover .idb-lift { transform: translateY(-10px) }
        .idb-swing { transform-origin: 50% 0; animation: idb-swing 3.6s ease-in-out infinite }
        .idb-stage { perspective: 380px }
        .idb-tilt { transform-style: preserve-3d; transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform .3s cubic-bezier(.2,.8,.3,1) }
        .idb-card { transform-style: preserve-3d; animation: idb-turn 6s ease-in-out infinite }
        .idb-tilt[data-tilt="1"] .idb-card, .idb-tilt[data-tilt="1"] .idb-shade, .idb-tilt[data-tilt="1"] .idb-sheen { animation-play-state: paused }
        .idb-shade { animation: idb-shade 6s ease-in-out infinite }
        .idb-shadow { animation: idb-shadow 6s ease-in-out infinite }
        .idb-sheen { background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.6) 50%, transparent 65%); background-size: 250% 100%; animation: idb-sheen 6s ease-in-out infinite; mix-blend-mode: soft-light }
        .idb-glare { opacity: 0; transition: opacity .3s; background: radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgba(255,255,255,.55), transparent 55%); mix-blend-mode: soft-light }
        .idb-tilt[data-tilt="1"] .idb-glare { opacity: 1 }
        .idb-sleeve {
          border: 1px solid rgba(255,255,255,.75);
          background: linear-gradient(140deg, rgba(255,255,255,.42), rgba(255,255,255,.06) 32%, rgba(255,255,255,0) 58%, rgba(255,255,255,.2) 82%, rgba(255,255,255,.04));
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.05), inset 0 -6px 10px -8px rgba(255,255,255,.7);
        }
        @media (prefers-reduced-motion: reduce) { .idb-swing, .idb-card, .idb-sheen, .idb-shade, .idb-shadow { animation: none } }
      `}</style>
      {roles.map((r, i) => (
        <HangingBadge key={r.company + r.period} r={r} i={i} photo={photo} />
      ))}
    </div>
  );
}
