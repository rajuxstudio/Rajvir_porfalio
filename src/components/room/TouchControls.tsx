import { useRef, useState } from "react";
import { input } from "./input";

export function TouchControls({ onPause }: { onPause: () => void }) {
  const base = useRef<{ x: number; y: number; id: number } | null>(null);
  const look = useRef<{ x: number; y: number; id: number } | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const R = 50;

  return (
    <div className="touch-layer">
      <div
        className="touch-joy"
        onPointerDown={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          base.current = { x: r.left + r.width / 2, y: r.top + r.height / 2, id: e.pointerId };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const b = base.current;
          if (!b || b.id !== e.pointerId) return;
          let dx = e.clientX - b.x;
          let dy = e.clientY - b.y;
          const d = Math.hypot(dx, dy);
          if (d > R) {
            dx = (dx / d) * R;
            dy = (dy / d) * R;
          }
          setKnob({ x: dx, y: dy });
          input.joyX = dx / R;
          input.joyY = dy / R;
        }}
        onPointerUp={() => {
          base.current = null;
          setKnob({ x: 0, y: 0 });
          input.joyX = input.joyY = 0;
        }}
        onPointerCancel={() => {
          base.current = null;
          setKnob({ x: 0, y: 0 });
          input.joyX = input.joyY = 0;
        }}
      >
        <div className="touch-knob" style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} />
      </div>
      <div
        className="touch-look"
        onPointerDown={(e) => {
          look.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const l = look.current;
          if (!l || l.id !== e.pointerId) return;
          input.lookDX += (e.clientX - l.x) * 1.5;
          input.lookDY += (e.clientY - l.y) * 1.5;
          l.x = e.clientX;
          l.y = e.clientY;
        }}
        onPointerUp={() => (look.current = null)}
        onPointerCancel={() => (look.current = null)}
      />
      <button className="touch-pause" onClick={onPause} aria-label="Pause">
        II
      </button>
    </div>
  );
}
