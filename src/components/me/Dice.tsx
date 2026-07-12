import { useEffect, useRef, useState } from "react";

/**
 * Dice
 * ----------------------------------------------------------------
 * Self-contained 3D dice component. Handles its own roll state,
 * hover/click/touch interactions, optional roll sound, and an
 * optional scroll-based tilt effect. Drop it in anywhere:
 *
 *   <Dice />
 *   <Dice size={100} soundSrc="/sounds/dice-roll.mp3" onRoll={(v) => console.log(v)} />
 */

const DICE_FACES: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
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

function Dice3DCube({
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
    <div
      style={{ perspective: "700px", width: size, height: size }}
      className="mx-auto"
    >
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

export interface DiceProps {
  /** Pixel size of the dice cube. Default 80. */
  size?: number;
  /** URL of a sound to play on each roll. Omit/leave empty to disable sound. */
  soundSrc?: string;
  /** Whether the dice should tilt further as the page scrolls. Default true. */
  enableScrollTilt?: boolean;
  /** Extra classes applied to the wrapping button. */
  className?: string;
  /** Fires with the new face value whenever a roll completes (state update time, not animation end). */
  onRoll?: (value: number) => void;
  /** Starting face value. Default 2. */
  initialValue?: number;
}

export default function Dice({
  size = 80,
  soundSrc = "",
  enableScrollTilt = true,
  className = "",
  onRoll,
  initialValue = 2,
}: DiceProps) {
  const [value, setValue] = useState(initialValue);
  const [rolling, setRolling] = useState(false);
  const [hoverSpin, setHoverSpin] = useState(0);
  const [scrollTilt, setScrollTilt] = useState(0);

  useEffect(() => {
    if (!enableScrollTilt) return;
    const onScroll = () => setScrollTilt(window.scrollY * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enableScrollTilt]);

  const rollAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!soundSrc) {
      rollAudioRef.current = null;
      return;
    }
    const a = new Audio(soundSrc);
    a.preload = "auto";
    a.volume = 0.9;
    rollAudioRef.current = a;
  }, [soundSrc]);

  const playRollSound = () => {
    try {
      const a = rollAudioRef.current;
      if (!a) return;
      a.currentTime = 0;
      void a.play();
    } catch {
      // ignore audio errors
    }
  };

  const rollDice = () => {
    if (rolling) return; // prevent overlapping rolls when hover/click fire together
    setRolling(true);
    playRollSound();
    let next = value;
    while (next === value) next = Math.floor(Math.random() * 6) + 1;
    setValue(next);
    setHoverSpin((s) => s + 360);
    onRoll?.(next);
    setTimeout(() => setRolling(false), 900);
  };

  return (
    <button
      type="button"
      onClick={rollDice}
      aria-label="Roll dice"
      className={`inline-flex items-center justify-center rounded-2xl p-2 transition-transform duration-500 hover:-translate-y-2 ${
        rolling ? "animate-bounce" : ""
      } ${className}`}
    >
      <Dice3DCube value={value} hoverSpin={hoverSpin} scrollTilt={scrollTilt} size={size} />
    </button>
  );
}