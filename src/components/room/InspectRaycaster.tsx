// Lives inside the Canvas: aims from the crosshair (pointer lock) or the cursor (no lock) at the
// registered inspectable objects, publishes what's under it as `hover`, and opens it on click.
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { input } from "./input";
import { inspectRoots, inspectStore, targetOf } from "./inspect";

const RANGE = 4; // metres: how close you must be to inspect something

export function InspectRaycaster() {
  const { camera, gl } = useThree();
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useRef(new THREE.Vector2(0, 0));

  const aimAt = (ndc: THREE.Vector2) => {
    if (!inspectRoots.size) return null;
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects([...inspectRoots], true)[0];
    return hit && hit.distance <= RANGE ? targetOf(hit.object) : null;
  };

  useEffect(() => {
    const el = gl.domElement;
    const toNdc = (e: PointerEvent, out: THREE.Vector2) => {
      if (document.pointerLockElement === el) return out.set(0, 0);
      const r = el.getBoundingClientRect();
      return out.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const move = (e: PointerEvent) => toNdc(e, pointer.current);
    const down = (e: PointerEvent) => {
      if (!input.enabled) return;
      const t = aimAt(toNdc(e, new THREE.Vector2()));
      if (t) inspectStore.set({ open: t, hover: null });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      inspectStore.set({ hover: null });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, gl]);

  const tick = useRef(0);
  useFrame(() => {
    if ((tick.current = (tick.current + 1) % 6) !== 0) return; // ~10 Hz is plenty for a prompt
    if (!input.enabled) return;
    if (document.pointerLockElement === gl.domElement) pointer.current.set(0, 0);
    inspectStore.set({ hover: aimAt(pointer.current) });
  });
  return null;
}
