import { useState } from "react";
import { Award } from "lucide-react";
import { CERTS } from "@/lib/certificates";

const CARDS = CERTS.slice(0, 3).map((cert, index) => ({
  name: cert.title,
  meta: `${cert.org} · ${cert.year}`,
  gradient:
    index === 0
      ? "from-sky-400 via-indigo-500 to-purple-600"
      : index === 1
        ? "from-emerald-400 via-teal-500 to-cyan-600"
        : "from-amber-400 via-orange-500 to-rose-500",
}));

export default function CertificatesPocket() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-[230px] w-[260px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-x-0 bottom-0 h-[150px] rounded-[22px] bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_25px_50px_-20px_rgba(234,88,12,0.55)] ring-1 ring-orange-700/20 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      />

      {CARDS.map((f, i) => {
        const offset = i - (CARDS.length - 1) / 2;
        const rest = { x: offset * 12, y: 0, r: offset * 4, s: 0.95 };
        const hover = {
          x: offset * 78,
          y: -110 - Math.abs(offset) * 6,
          r: offset * 14,
          s: 1.04,
        };
        const t = hovered ? hover : rest;
        return (
          <div
            key={f.name}
            className="absolute bottom-[40px] left-1/2 -ml-12 h-32 w-24 origin-bottom rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${t.s})`,
              zIndex: hovered ? 30 + i : 10 + i,
              transitionDelay: `${hovered ? i * 60 : (CARDS.length - i) * 30}ms`,
            }}
          >
            <div className={`flex h-full w-full flex-col justify-between rounded-xl bg-gradient-to-br ${f.gradient} p-2.5`}>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/25 backdrop-blur-sm">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-[11px] font-semibold leading-tight text-white">{f.name}</div>
                <div className="text-[9px] text-white/80">{f.meta}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div
        className={`absolute inset-x-0 bottom-0 z-20 h-[110px] rounded-b-[22px] rounded-t-lg bg-gradient-to-br from-orange-500 to-orange-600 p-4 shadow-[0_-8px_20px_-15px_rgba(0,0,0,0.25)] ring-1 ring-orange-700/20 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-1.5 rounded-[14px] border border-dashed border-white/40" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90">
            <Award className="h-3.5 w-3.5" /> Recent certificates
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold leading-none text-white">{CARDS.length}</div>
              <div className="text-[10px] text-white/80">Certificates</div>
            </div>
            <div className="text-[10px] text-white/80">Hover to peek</div>
          </div>
        </div>
      </div>
    </div>
  );
}