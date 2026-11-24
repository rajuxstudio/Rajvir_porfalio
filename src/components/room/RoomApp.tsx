import { useCallback, useEffect, useRef, useState } from "react";
import { Experience } from "./Experience";
import { TouchControls } from "./TouchControls";
import { input } from "./input";
import { KINDS, inspectStore, useInspect } from "./inspect";
import { InspectOverlay } from "./InspectOverlay";

type Phase = "entry" | "playing" | "paused" | "inspect";

function getCanvas() {
  return document.querySelector<HTMLCanvasElement>(".room-canvas canvas");
}

/**
 * `menu` (e.g. the site's page-switcher panel) is shown only on the entry screen and after Esc
 * pauses the room, so it never covers the 3D view or the inspect screen.
 */
export function RoomApp({ menu }: { menu?: React.ReactNode } = {}) {
  const [phase, setPhase] = useState<Phase>("entry");
  const [hint, setHint] = useState(false);
  const [touch, setTouch] = useState(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const { hover, open } = useInspect();

  const lock = useCallback(() => {
    if (touch) return;
    const c = getCanvas();
    try {
      const r = c?.requestPointerLock() as unknown as Promise<void> | undefined;
      r?.catch?.(() => {}); // denied → free-look fallback
    } catch {
      /* fallback: free look without lock */
    }
  }, [touch]);

  // an inspectable object was clicked in the scene → switch to the inspect screen
  useEffect(() => {
    if (!open || phaseRef.current !== "playing") return;
    phaseRef.current = "inspect"; // before releasing the mouse, so it isn't treated as a pause
    input.enabled = false;
    if (document.pointerLockElement) document.exitPointerLock();
    setPhase("inspect");
  }, [open]);

  const closeInspect = useCallback(
    (relock: boolean) => {
      inspectStore.set({ open: null });
      input.enabled = true;
      phaseRef.current = "playing";
      setPhase("playing");
      if (relock) lock(); // only from a click; Esc can't grab the mouse, so click the view to re-lock
    },
    [lock],
  );
  const step = useCallback((d: number) => inspectStore.step(d), []);

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    const onChange = () => {
      if (!document.pointerLockElement && phaseRef.current === "playing") {
        input.enabled = false;
        setPhase("paused");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current === "inspect") {
        if (e.code === "Escape") closeInspect(false);
        else if (e.code === "ArrowLeft" || e.code === "KeyA") step(-1);
        else if (e.code === "ArrowRight" || e.code === "KeyD") step(1);
        return;
      }
      if (phaseRef.current !== "playing") return;
      // E inspects whatever the crosshair is on
      if (e.code === "KeyE") {
        const h = inspectStore.get().hover;
        if (h) inspectStore.set({ open: h, hover: null });
      }
      // fallback pause when pointer lock isn't active
      if (e.code === "Escape" && !document.pointerLockElement) {
        input.enabled = false;
        setPhase("paused");
      }
    };
    document.addEventListener("pointerlockchange", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerlockchange", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, [closeInspect, step]);

  // hide the mouse cursor everywhere while walking around (even when pointer lock was denied);
  // it comes back on the entry screen, when paused, and on the inspect screen (which has buttons)
  useEffect(() => {
    const hide = phase === "playing" && !touch;
    document.documentElement.classList.toggle("room-playing", hide);
    return () => document.documentElement.classList.remove("room-playing");
  }, [phase, touch]);

  const start = () => {
    input.enabled = true;
    setPhase("playing");
    lock();
    setHint(true);
    window.setTimeout(() => setHint(false), 4000);
  };

  const resume = () => {
    input.enabled = true;
    setPhase("playing");
    lock();
  };

  const pause = () => {
    input.enabled = false;
    if (document.pointerLockElement) document.exitPointerLock();
    setPhase("paused");
  };

  return (
    <div className="room-root">
      <div
        className="room-stage"
        onClick={() => {
          if (phaseRef.current === "playing" && !document.pointerLockElement) lock();
        }}
      >
        <Experience />
      </div>

      {phase === "playing" && <div className="crosshair" aria-hidden />}
      {phase === "playing" && hover && (
        <div className="inspect-prompt">
          <kbd>E</kbd> Inspect · {KINDS[hover.kind].label}
        </div>
      )}
      {phase === "playing" && (
        <div className={`controls-hint ${hint ? "is-visible" : ""}`}>
          {touch ? "Left: move · Right: look" : "WASD to move · Mouse to look"}
        </div>
      )}
      {phase === "playing" && touch && <TouchControls onPause={pause} />}

      {phase === "inspect" && open && (
        <InspectOverlay target={open} onClose={() => closeInspect(true)} onPrev={() => step(-1)} onNext={() => step(1)} />
      )}

      {phase === "entry" && (
        <div className="overlay overlay-solid">
          <h1 className="overlay-title">Enter the Room</h1>
          <p className="overlay-sub">A space to explore.</p>
          <button className="overlay-btn" onClick={start}>
            ENTER EXPERIENCE
          </button>
        </div>
      )}
      {phase === "paused" && (
        <div className="overlay overlay-glass">
          <h2 className="overlay-title">Experience Paused</h2>
          <button className="overlay-btn" onClick={resume}>
            RESUME
          </button>
        </div>
      )}
      {(phase === "entry" || phase === "paused") && menu}
    </div>
  );
}
