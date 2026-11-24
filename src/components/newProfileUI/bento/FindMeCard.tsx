// Navy "Find me" card with an illustrated door into Rajveer's room (matches the Let's talk mailbox
// card). The door sits ajar with lamp light leaking out; hovering the card swings it open to show
// the room (desk, monitor, lamp, window, plant); clicking opens it wide and walks into the 3D room.
// LinkedIn / GitHub are small link pills under the text.
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";

const SERIF = "'DM Serif Display', Georgia, serif";
const SANS = "Inter, 'Segoe UI', Arial, sans-serif";
const LINKS = [
  { href: "https://www.linkedin.com/in/rajuxstudio/", label: "LinkedIn", Icon: Linkedin, bg: "#0a66c2" },
  { href: "https://github.com/rajuxstudio", label: "GitHub", Icon: Github, bg: "#0e0e10" },
];

const preloadRoom = () => void import("@/pages/RoomPage");

// door opening (inside the frame): x 68…152, y 28…186; hinge on the left edge
const D = { x: 68, y: 28, w: 84, h: 158 };

function RoomDoor({ entering, className }: { entering: boolean; className: string }) {
  return (
    <svg viewBox="40 4 140 196" aria-hidden className={`pointer-events-none shrink-0 overflow-visible ${className}`}>
      <style>{`
        .rd-door { transform-box: view-box; transform-origin: ${D.x}px 107px; transform: scaleX(.86); transition: transform .6s cubic-bezier(.3,1.25,.5,1) }
        .group:hover .rd-door, .group:focus-within .rd-door { transform: scaleX(-.42) }
        .rd-door.rd-in { transform: scaleX(-.62) !important; transition-duration: .45s }
        .rd-shade { opacity: 0; transition: opacity .4s }
        .group:hover .rd-shade, .group:focus-within .rd-shade, .rd-in .rd-shade { opacity: .28 }
        .rd-beam { opacity: .35; transition: opacity .5s }
        .group:hover .rd-beam, .group:focus-within .rd-beam { opacity: .85 }
        .rd-beam.rd-in { opacity: 1 }
        @keyframes rd-flicker { 0%,100% { opacity: .9 } 50% { opacity: .65 } }
        .rd-glow { animation: rd-flicker 3.2s ease-in-out infinite }
        @keyframes rd-blink { 0%,92%,100% { opacity: 1 } 96% { opacity: .35 } }
        .rd-screen { animation: rd-blink 5s infinite }
        @media (prefers-reduced-motion: reduce) { .rd-glow, .rd-screen { animation: none } .rd-door { transition: none } }
      `}</style>
      <defs>
        <linearGradient id="rd-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2ad" />
          <stop offset="1" stopColor="#f0b26c" />
        </linearGradient>
        <linearGradient id="rd-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd38a" stopOpacity=".75" />
          <stop offset="1" stopColor="#ffd38a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="rd-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c4" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <clipPath id="rd-open">
          <rect x={D.x} y={D.y} width={D.w} height={D.h} />
        </clipPath>
      </defs>

      {/* light spilling out onto the floor in front of the door */}
      <path className={`rd-beam ${entering ? "rd-in" : ""}`} d="M68 186 L152 186 L196 200 L24 200 Z" fill="url(#rd-beam)" />

      {/* ── the room, seen through the doorway ── */}
      <g clipPath="url(#rd-open)">
        <rect x={D.x} y={D.y} width={D.w} height={D.h} fill="url(#rd-wall)" />
        {/* window with the moon */}
        <rect x="116" y="42" width="28" height="28" rx="2" fill="#2a3a64" stroke="#fbf6ec" strokeWidth="3" />
        <circle cx="134" cy="52" r="5" fill="#fff3c4" />
        <circle cx="122" cy="62" r="1" fill="#fff" />
        <circle cx="127" cy="48" r=".8" fill="#fff" />
        {/* framed picture */}
        <rect x="76" y="50" width="20" height="24" rx="1.5" fill="#fbf6ec" />
        <rect x="79" y="53" width="14" height="18" fill="#e8735f" />
        <path d="M79 71 l5 -7 l4 4 l3 -3 l2 6 z" fill="#c4554a" />
        {/* floor + rug */}
        <rect x={D.x} y="150" width={D.w} height="36" fill="#b97a4c" />
        <ellipse cx="112" cy="172" rx="34" ry="7" fill="#e8735f" opacity=".85" />
        {/* desk with monitor + lamp */}
        <rect x="94" y="126" width="54" height="5" rx="1.5" fill="#6b4429" />
        <rect x="97" y="131" width="3" height="26" fill="#5a3822" />
        <rect x="142" y="131" width="3" height="26" fill="#5a3822" />
        <rect x="106" y="106" width="26" height="17" rx="2" fill="#1f2a44" />
        <rect className="rd-screen" x="108" y="108" width="22" height="13" rx="1" fill="#8fd3ff" />
        <rect x="111" y="111" width="10" height="2" rx="1" fill="#1f2a44" opacity=".5" />
        <rect x="111" y="115" width="14" height="2" rx="1" fill="#1f2a44" opacity=".35" />
        <rect x="117" y="123" width="4" height="3" fill="#1f2a44" />
        <circle className="rd-glow" cx="140" cy="108" r="20" fill="url(#rd-lamp)" />
        <path d="M134 104 L146 104 L142 96 L138 96 Z" fill="#ffd166" />
        <rect x="139.2" y="104" width="1.6" height="22" fill="#2a2433" />
        {/* chair */}
        <rect x="104" y="136" width="20" height="4" rx="2" fill="#2a2433" />
        <rect x="112" y="140" width="3" height="16" fill="#2a2433" />
        {/* plant */}
        <rect x="73" y="140" width="13" height="13" rx="2" fill="#e9dcc6" />
        <ellipse cx="76" cy="134" rx="4" ry="8" fill="#5f9a6a" transform="rotate(-20 76 134)" />
        <ellipse cx="83" cy="133" rx="4" ry="9" fill="#4f8a5c" transform="rotate(18 83 133)" />
        <ellipse cx="79.5" cy="130" rx="3.5" ry="9" fill="#6aa877" />
      </g>

      {/* door frame */}
      <path d={`M${D.x - 8} 186 V${D.y - 8} H${D.x + D.w + 8} V186 H${D.x + D.w} V${D.y} H${D.x} V186 Z`} fill="#e9dcc6" />
      <rect x={D.x - 8} y={D.y - 8} width={D.w + 16} height="4" fill="#fff" opacity=".35" />

      {/* the door: swings on its left hinge */}
      <g className={`rd-door ${entering ? "rd-in" : ""}`}>
        <rect x={D.x} y={D.y} width={D.w} height={D.h} fill="#2f6f73" />
        <rect x={D.x + 9} y={D.y + 12} width={D.w - 18} height="56" rx="3" fill="none" stroke="#25595c" strokeWidth="3" />
        <rect x={D.x + 9} y={D.y + 82} width={D.w - 18} height="62" rx="3" fill="none" stroke="#25595c" strokeWidth="3" />
        {/* "3D" number plate */}
        <rect x={D.x + D.w / 2 - 13} y={D.y + 30} width="26" height="16" rx="8" fill="#d8b98a" />
        <text x={D.x + D.w / 2} y={D.y + 42} textAnchor="middle" fontSize="10" fontWeight="800" fill="#4a3518" fontFamily={SANS}>
          3D
        </text>
        {/* knob */}
        <circle cx={D.x + D.w - 11} cy="112" r="4.5" fill="#d8b98a" />
        <circle cx={D.x + D.w - 12} cy="111" r="1.5" fill="#fff" opacity=".6" />
        <rect className="rd-shade" x={D.x} y={D.y} width={D.w} height={D.h} fill="#000" />
      </g>

      {/* doormat */}
      <rect x="74" y="187" width="72" height="9" rx="2" fill="#c98b4e" />
      <text x="110" y="194" textAnchor="middle" fontSize="6.5" fontWeight="800" letterSpacing="1.6" fill="#7a4e24" fontFamily={SANS}>
        WELCOME
      </text>
    </svg>
  );
}

export default function FindMeCard({
  onRoom,
  className = "",
  headingClass = "text-4xl sm:text-5xl",
  artClass = "w-32 sm:w-36",
}: {
  onRoom: () => void;
  className?: string;
  headingClass?: string;
  artClass?: string;
}) {
  const [entering, setEntering] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const enter = () => {
    if (entering) return;
    preloadRoom();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEntering(true);
    timer.current = window.setTimeout(onRoom, calm ? 0 : 550);
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-[#1f2a44] p-6 text-[#f3eee4] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(10,20,50,0.7)] dark:bg-[#1a2238] sm:p-7 ${className}`}
      onMouseEnter={preloadRoom}
    >
      {/* the whole card walks into the room; the link pills sit above it */}
      <button
        type="button"
        aria-label="Find me: enter my 3D room"
        onClick={enter}
        className="absolute inset-0 z-0 rounded-[inherit] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/50"
      />
      {/* warm glow from the doorway */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-[-25%] h-full w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,120,0.22),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="pointer-events-none relative z-[1] flex h-full flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9d2e3]/80">Find me</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0 pb-2">
            <p className={`leading-[1.05] ${headingClass}`} style={{ fontFamily: SERIF }}>
              Step into <span className="italic text-[#ffd38a]">my room.</span>
            </p>
            <p className="mt-3 text-sm text-[#c9d2e3]" aria-live="polite">
              {entering ? "Opening the door…" : "Walk around my 3D room, or find me online."}
            </p>
            <div className="pointer-events-auto mt-4 flex flex-wrap gap-2">
              {LINKS.map(({ href, label, Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 py-1.5 pl-1.5 pr-3 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40"
                  style={{ background: bg }}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-3 w-3" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <RoomDoor entering={entering} className={artClass} />
        </div>
      </div>
    </div>
  );
}
