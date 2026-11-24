// Yellow "Certificates" card with an illustrated stack of certificate sheets (matches the Let's
// talk mailbox and Find me door cards). One sheet per certificate, each with its issuer's initial;
// a gold medal showing the count hangs off the front sheet and sways. Hovering the card fans the
// sheets out to both sides like a hand of cards (front sheet lifts); clicking opens the Certificates sheet.
const SERIF = "'DM Serif Display', Georgia, serif";
const SANS = "Inter, 'Segoe UI', Arial, sans-serif";

// sheet size + the pivot (bottom centre) they fan around
const S = { x: 70, y: 52, w: 96, h: 122 };
const PIVOT = { x: S.x + S.w / 2, y: S.y + S.h + 4 };
const TINTS = ["#5b6cff", "#2f8fd8", "#3aa76d", "#a855f7", "#e8735f", "#1f2a44"];

function Stack({ orgs, count, className }: { orgs: string[]; count: number; className: string }) {
  const n = orgs.length;
  return (
    <svg viewBox="20 20 180 170" aria-hidden className={`pointer-events-none shrink-0 overflow-visible drop-shadow-[0_14px_16px_rgba(90,70,0,0.25)] ${className}`}>
      <style>{`
        .ct-sheet { transform-box: view-box; transform-origin: ${PIVOT.x}px ${PIVOT.y}px; transform: rotate(var(--a0)); transition: transform .55s cubic-bezier(.3,1.35,.5,1) }
        .group:hover .ct-sheet, .group:focus-within .ct-sheet { transform: rotate(var(--a1)) translateY(-4px) }
        @keyframes ct-sway { 0%,100% { transform: rotate(-5deg) } 50% { transform: rotate(5deg) } }
        .ct-medal { transform-box: view-box; transform-origin: 150px 128px; animation: ct-sway 3s ease-in-out infinite }
        .ct-pop { transform-box: view-box; transform-origin: 150px 150px; transition: transform .4s cubic-bezier(.3,1.8,.5,1) }
        .group:hover .ct-pop, .group:focus-within .ct-pop { transform: scale(1.14) }
        @media (prefers-reduced-motion: reduce) { .ct-medal { animation: none } .ct-sheet { transition: none } }
      `}</style>

      {/* desk shadow under the stack */}
      <ellipse cx={PIVOT.x} cy={PIVOT.y + 4} rx="58" ry="6" fill="#000" opacity=".12" />

      {orgs.map((org, i) => {
        const back = n - 1 - i; // 0 = front sheet (drawn last)
        const front = back === 0;
        const tint = TINTS[i % TINTS.length];
        // back sheets alternate left / right of the front one
        const side = back === 0 ? 0 : (back % 2 ? -1 : 1) * Math.ceil(back / 2);
        return (
          <g key={org + i} className="ct-sheet" style={{ ["--a0" as string]: `${back === 0 ? 1.5 : side * 3.5}deg`, ["--a1" as string]: `${side * 11}deg` }}>
            <rect x={S.x} y={S.y} width={S.w} height={S.h} rx="4" fill="#fffdf6" stroke="#eadfc4" strokeWidth="1.2" />
            <rect x={S.x + 5} y={S.y + 5} width={S.w - 10} height={S.h - 10} rx="2" fill="none" stroke="#d8b98a" strokeWidth="1" strokeDasharray="3 2" />
            {/* issuer badge */}
            <circle cx={S.x + 17} cy={S.y + 19} r="7.5" fill={tint} />
            <text x={S.x + 17} y={S.y + 22.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily={SANS}>
              {org.charAt(0).toUpperCase()}
            </text>
            <text x={S.x + 29} y={S.y + 21.5} fontSize="6.5" fontWeight="800" letterSpacing="1.4" fill="#6b5a2a" fontFamily={SANS}>
              CERTIFICATE
            </text>
            {/* title + body lines */}
            <rect x={S.x + 16} y={S.y + 36} width={S.w - 32} height="5" rx="2.5" fill="#3b2f05" opacity=".75" />
            <rect x={S.x + 22} y={S.y + 47} width={S.w - 44} height="3" rx="1.5" fill="#3b2f05" opacity=".25" />
            <rect x={S.x + 14} y={S.y + 56} width={S.w - 28} height="3" rx="1.5" fill="#3b2f05" opacity=".18" />
            <rect x={S.x + 18} y={S.y + 64} width={S.w - 36} height="3" rx="1.5" fill="#3b2f05" opacity=".18" />
            {/* signature */}
            <path d={`M${S.x + 12} ${S.y + 96} q6 -9 10 0 t10 -2 q4 -6 8 1`} fill="none" stroke="#1f2a44" strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
            <rect x={S.x + 12} y={S.y + 100} width="34" height="1" fill="#3b2f05" opacity=".3" />
            {front && (
              <g className="ct-medal">
                <g className="ct-pop">
                  {/* ribbon tails */}
                  <path d="M141 150 L135 176 L142 171 L147 178 L151 152 Z" fill="#c4554a" />
                  <path d="M159 150 L165 176 L158 171 L153 178 L149 152 Z" fill="#1f2a44" />
                  {/* medal */}
                  <circle cx="150" cy="146" r="17" fill="#d79d32" />
                  <circle cx="150" cy="146" r="13" fill="#f3cf6f" stroke="#c88a22" strokeWidth="1.2" strokeDasharray="2 1.6" />
                  <text x="150" y="151" textAnchor="middle" fontSize="15" fontWeight="700" fill="#5a3d08" fontFamily="Georgia, serif">
                    {count}
                  </text>
                </g>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function CertificatesCard({
  orgs,
  count,
  verified,
  onOpen,
  className = "",
  headingClass = "text-4xl sm:text-5xl",
  artClass = "w-36 sm:w-40",
}: {
  orgs: string[];
  count: number;
  verified: number;
  onOpen: () => void;
  className?: string;
  headingClass?: string;
  artClass?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-[#f9df73] p-6 text-[#3b2f05] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(120,90,0,0.55)] sm:p-7 ${className}`}
    >
      <button
        type="button"
        aria-label={`Certificates: ${count} courses, open the list`}
        onClick={onOpen}
        className="absolute inset-0 z-0 rounded-[inherit] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-black/25"
      />
      {/* soft light behind the stack */}
      <div aria-hidden className="pointer-events-none absolute -right-8 bottom-[-20%] h-full w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),transparent)]" />
      <div className="pointer-events-none relative z-[1] flex h-full flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5a2a]">Certificates</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0 pb-2">
            <p className={`leading-[1.05] ${headingClass}`} style={{ fontFamily: SERIF }}>
              Always <span className="italic text-[#b4572f]">learning.</span>
            </p>
            <p className="mt-3 text-sm text-[#5b4a10]">
              {count} courses in design & development, {verified} verifiable online.
            </p>
          </div>
          <Stack orgs={orgs} count={count} className={artClass} />
        </div>
      </div>
    </div>
  );
}
