const DICE_FACES: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

const FACE_ROT: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

function DiceFace({ value, accent }: { value: number; accent?: boolean }) {
  const dots = DICE_FACES[value];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-1 rounded-xl bg-gradient-to-br from-white to-neutral-100 p-2.5 ring-1 ring-neutral-200/80">
      {Array.from({ length: 9 }).map((_, i) => {
        const r = Math.floor(i / 3);
        const c = i % 3;
        const active = dots.some(([dr, dc]) => dr === r && dc === c);
        return (
          <div key={i} className="flex items-center justify-center">
            {active && (
              <span
                className={`h-2 w-2 rounded-full shadow-[inset_0_-1px_1px_rgba(255,255,255,0.4)] ${
                  accent && value === 1 ? "bg-blue-600" : "bg-neutral-900"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Dice3D({
  value,
  hoverSpin,
  scrollTilt,
  size = 80,
}: {
  value: number;
  hoverSpin: number;
  scrollTilt: number;
  size?: number;
}) {
  const rot = FACE_ROT[value];
  const half = size / 2;
  const rx = rot.x + hoverSpin * 0.6 + scrollTilt * 0.7;
  const ry = rot.y + hoverSpin + scrollTilt;
  const faces: Array<{ v: number; t: string }> = [
    { v: 1, t: `translateZ(${half}px)` },
    { v: 6, t: `rotateY(180deg) translateZ(${half}px)` },
    { v: 3, t: `rotateY(90deg) translateZ(${half}px)` },
    { v: 4, t: `rotateY(-90deg) translateZ(${half}px)` },
    { v: 2, t: `rotateX(90deg) translateZ(${half}px)` },
    { v: 5, t: `rotateX(-90deg) translateZ(${half}px)` },
  ];
  return (
    <div style={{ perspective: "700px", width: size, height: size }} className="mx-auto">
      <div
        className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
        }}
      >
        {faces.map(({ v, t }) => (
          <div
            key={v}
            className="absolute inset-0"
            style={{ transform: t, backfaceVisibility: "hidden" }}
          >
            <DiceFace value={v} accent={v === value} />
          </div>
        ))}
      </div>
    </div>
  );
}