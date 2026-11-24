// Real-looking objects for the New Profile UI cards (polaroid, sticky note, envelope, framed
// diploma, award rosette). Pure CSS/SVG, no 3D.

const HAND = "'Caveat', 'Segoe Script', cursive"; // loaded by index.css
const SERIF = "Georgia, 'Times New Roman', serif";

const lift = "transition duration-300 group-hover:-translate-y-1 group-hover:rotate-0";

/* ───────────────────────── objects ───────────────────────── */

function Tape({ className = "" }: { className?: string }) {
  return <span className={`absolute h-6 w-20 bg-[#f4e7b0]/80 shadow-sm backdrop-blur-[1px] ${className}`} />;
}

function Pushpin({ color = "#d9534f", className = "" }: { color?: string; className?: string }) {
  return (
    <span
      className={`absolute h-4 w-4 rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.35)] ${className}`}
      style={{ background: `radial-gradient(circle at 35% 30%, #fff8 0 18%, ${color} 22%)` }}
    />
  );
}

export function Polaroid({ src, caption, sub }: { src: string; caption: string; sub: string }) {
  return (
    <div className={`relative w-[74%] max-w-[270px] -rotate-[4deg] bg-[#fdfcf8] p-3 pb-16 shadow-[0_22px_34px_-14px_rgba(0,0,0,0.5)] ${lift}`}>
      <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
      <img src={src} alt={caption} className="aspect-square w-full object-cover saturate-[0.9]" />
      <div className="absolute inset-x-3 bottom-3 text-[#2a2a2e]">
        <div className="text-[28px] leading-none" style={{ fontFamily: HAND, fontWeight: 700 }}>
          {caption}
        </div>
        <div className="mt-1 text-[15px] leading-none text-[#5a5a60]" style={{ fontFamily: HAND }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

export function StickyNote({ big, caption, color = "#fbe48a", tilt = -3 }: { big: string; caption: string; color?: string; tilt?: number }) {
  return (
    <div
      className={`relative flex aspect-square w-[72%] max-w-[150px] flex-col items-center justify-center shadow-[0_16px_22px_-12px_rgba(0,0,0,0.45)] ${lift}`}
      style={{ background: `linear-gradient(160deg, ${color}, ${color} 70%, rgba(0,0,0,0.06))`, transform: `rotate(${tilt}deg)`, borderBottomRightRadius: "18px 8px" }}
    >
      <Pushpin className="left-1/2 top-2 -translate-x-1/2" />
      <span className="text-[40px] leading-none text-[#2a2a2e]" style={{ fontFamily: HAND, fontWeight: 700 }}>
        {big}
      </span>
      <span className="mt-1 text-[18px] leading-none text-[#3d3d42]" style={{ fontFamily: HAND }}>
        {caption}
      </span>
    </div>
  );
}

export function Envelope({ to }: { to: string }) {
  return (
    <div className={`relative block w-[86%] max-w-[230px] rotate-[2deg] ${lift}`}>
      <div className="relative aspect-[1.55] overflow-hidden rounded-[6px] bg-[#f6efe2] shadow-[0_18px_26px_-14px_rgba(0,0,0,0.5)]">
        {/* flap */}
        <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: "linear-gradient(to bottom right, transparent 49.5%, #e8dcc6 50%) left/50% 100% no-repeat, linear-gradient(to bottom left, transparent 49.5%, #e8dcc6 50%) right/50% 100% no-repeat" }} />
        {/* stamp */}
        <div className="absolute right-2.5 top-2.5 flex h-9 w-7 items-center justify-center border-2 border-dashed border-[#d9a08a] bg-[#ef8582] text-[10px] font-bold text-white">✉</div>
        <div className="absolute inset-x-3 bottom-2.5 break-all text-[15px] leading-tight text-[#1f2a44]" style={{ fontFamily: HAND, fontWeight: 700 }}>
          {to}
        </div>
      </div>
    </div>
  );
}

export function FramedDiploma({ title, abbr, institution, plaque }: { title: string; abbr: string; institution: string; plaque: string }) {
  return (
    <div className={`relative w-[60%] max-w-[236px] ${lift}`}>
      <div className="w-full border-[8px] border-[#18181b] bg-[#f6f4ef] p-2 shadow-[0_22px_32px_-14px_rgba(0,0,0,0.55)] dark:outline dark:outline-1 dark:outline-white/15">
        <div className="flex aspect-[1.6] flex-col items-center justify-center border border-[#b8955a] bg-[#fbf8f0] px-3 text-center">
          <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#1f2a44]">{institution}</span>
          <span className="mt-1 text-[8px] italic text-[#6b6b6b]" style={{ fontFamily: SERIF }}>
            has conferred the degree of
          </span>
          <span className="mt-1 text-[15px] font-bold leading-tight text-[#1f2a44]" style={{ fontFamily: SERIF }}>
            {title}
          </span>
          <span className="mt-0.5 text-[12px] font-bold text-[#b8955a]" style={{ fontFamily: SERIF }}>
            {abbr}
          </span>
          <span className="mt-1 h-4 w-4 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3dca0,#b8955a)] shadow-sm" />
        </div>
      </div>
      {/* brass plaque fixed to the bottom of the frame */}
      <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[linear-gradient(180deg,#d8b98a,#a8834c)] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#2a2216] shadow">
        {plaque}
      </span>
    </div>
  );
}

export function Rosette({ value, caption }: { value: string; caption: string }) {
  return (
    <div className={`flex flex-col items-center ${lift}`}>
      <svg viewBox="0 0 100 130" className="h-[104px] w-[80px] drop-shadow-[0_12px_12px_rgba(0,0,0,0.3)]">
        <path d="M34 62 L22 124 L36 114 L44 128 L50 70 Z" fill="#c25e5b" />
        <path d="M66 62 L78 124 L64 114 L56 128 L50 70 Z" fill="#a8553a" />
        <g transform="translate(50 50)">
          {Array.from({ length: 24 }, (_, i) => (
            <circle key={i} cx={Math.cos((i / 24) * Math.PI * 2) * 36} cy={Math.sin((i / 24) * Math.PI * 2) * 36} r="9" fill="#ef8582" />
          ))}
          <circle r="36" fill="#ef8582" />
          <circle r="28" fill="#d8b98a" />
          <circle r="23" fill="#f6efe2" stroke="#b08d57" strokeWidth="1.5" />
          <text textAnchor="middle" dy="9" fontSize="26" fontWeight="700" fill="#1f1f22" fontFamily="Georgia, serif">
            {value}
          </text>
        </g>
      </svg>
      <span className="-mt-1 text-[15px] leading-none text-[#3d3d42] dark:text-[#cfc6b8]" style={{ fontFamily: HAND, fontWeight: 700 }}>
        {caption}
      </span>
    </div>
  );
}
