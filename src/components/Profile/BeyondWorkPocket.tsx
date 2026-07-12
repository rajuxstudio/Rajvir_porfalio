import { useState } from "react";
import { Sparkles } from "lucide-react";

type BeyondItem = { name: string; meta: string; gradient: string; emoji: string };

const BEYOND_ITEMS: BeyondItem[] = [
  { name: "Photography", meta: "Street & film", gradient: "from-fuchsia-500 via-pink-500 to-rose-500", emoji: "📷" },
  { name: "Sports", meta: "Football weekly", gradient: "from-lime-400 via-emerald-500 to-teal-600", emoji: "⚽" },
  { name: "Travel", meta: "12 countries", gradient: "from-sky-400 via-blue-500 to-indigo-600", emoji: "✈️" },
];

export default function BeyondWorkPocket() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-[240px] w-[260px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute bottom-[140px] left-4 h-6 w-24 rounded-t-lg bg-gradient-to-b from-amber-300 to-amber-400 shadow-[0_-4px_10px_-6px_rgba(0,0,0,0.25)] ring-1 ring-amber-500/40 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-[150px] rounded-[14px] rounded-tl-none bg-gradient-to-br from-amber-300 to-amber-400 shadow-[0_25px_50px_-20px_rgba(217,119,6,0.55)] ring-1 ring-amber-500/40 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      />

      {BEYOND_ITEMS.map((item, i) => {
        const offset = i - (BEYOND_ITEMS.length - 1) / 2;
        const rest = { x: offset * 12, y: 0, r: offset * 4, s: 0.95 };
        const hover = { x: offset * 80, y: -110 - Math.abs(offset) * 6, r: offset * 12, s: 1.05 };
        const t = hovered ? hover : rest;
        return (
          <div
            key={item.name}
            className="absolute bottom-[45px] left-1/2 -ml-12 h-32 w-24 origin-bottom rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${t.s})`,
              zIndex: hovered ? 30 + i : 10 + i,
              transitionDelay: `${hovered ? i * 60 : (BEYOND_ITEMS.length - i) * 30}ms`,
            }}
          >
            <div className={`flex h-full w-full flex-col items-center justify-between rounded-2xl bg-gradient-to-br ${item.gradient} p-2.5`}>
              <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/30 text-2xl shadow-[inset_0_-4px_8px_rgba(0,0,0,0.15),0_6px_14px_-6px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">{item.emoji}</span>
              </div>
              <div className="text-center">
                <div className="text-[11px] font-semibold leading-tight text-white">{item.name}</div>
                <div className="text-[9px] text-white/80">{item.meta}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div
        className={`absolute inset-x-0 bottom-0 z-20 h-[115px] rounded-b-[14px] rounded-t-md bg-gradient-to-br from-amber-400 to-amber-500 p-4 shadow-[0_-8px_20px_-15px_rgba(0,0,0,0.25)] ring-1 ring-amber-600/40 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-1.5 rounded-[10px] border border-dashed border-amber-900/25" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-950">
            <Sparkles className="h-3.5 w-3.5" /> Beyond work
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold leading-none text-amber-950">{BEYOND_ITEMS.length}</div>
              <div className="text-[10px] text-amber-900/80">Passions</div>
            </div>
            <div className="text-[10px] text-amber-900/80">Hover to peek</div>
          </div>
        </div>
      </div>
    </div>
  );
}