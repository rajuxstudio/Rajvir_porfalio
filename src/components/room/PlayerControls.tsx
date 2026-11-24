import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { input, PLAYER, SPAWN } from "./input";
import { resolveCollisions } from "./layout";

const MAX_PITCH = Math.PI / 2 - 0.05;

export function PlayerControls() {
  const { camera, gl } = useThree();
  const yaw = useRef(0);
  const pitch = useRef(0);
  const keys = useRef<Record<string, boolean>>({});
  const dir = useRef(new THREE.Vector3());
  // cursor x in [-1, 1] across the view; used for edge-turning when pointer lock isn't active
  const edge = useRef({ active: false, x: 0 });

  useEffect(() => {
    camera.position.set(SPAWN[0], PLAYER.eyeHeight, SPAWN[1]);
    camera.rotation.order = "YXZ";
  }, [camera]);

  useEffect(() => {
    const el = gl.domElement;
    // Free look: the camera follows the mouse with no button held. With pointer lock the
    // cursor is captured; without it (lock denied), the look still follows the cursor while
    // it's over the 3D view, and resting near the left/right edge keeps turning (see useFrame).
    const onMove = (e: MouseEvent) => {
      const locked = document.pointerLockElement === el;
      const overView = e.target === el;
      edge.current.active = !locked && overView && input.enabled;
      if (overView) {
        const r = el.getBoundingClientRect();
        edge.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      }
      if (!input.enabled) return;
      if (locked || overView) {
        input.lookDX += e.movementX;
        input.lookDY += e.movementY;
      }
    };
    const onLeave = () => (edge.current.active = false);
    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      keys.current[e.code] = down;
    };
    const kd = onKey(true);
    const ku = onKey(false);
    const blur = () => (keys.current = {});
    document.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("blur", blur);
    return () => {
      document.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("blur", blur);
    };
  }, [gl]);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    // Look
    // Unlocked cursor can't move past the screen edge, so holding it in the outer 10%
    // keeps turning that way (up to ~100°/s at the very edge).
    const e = edge.current;
    if (e.active && input.enabled && Math.abs(e.x) > 0.8) {
      const push = (Math.abs(e.x) - 0.8) / 0.2;
      yaw.current -= Math.sign(e.x) * push * 1.75 * dt;
    }
    yaw.current -= input.lookDX * PLAYER.sensitivity;
    pitch.current -= input.lookDY * PLAYER.sensitivity;
    pitch.current = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch.current));
    input.lookDX = 0;
    input.lookDY = 0;
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");

    if (!input.enabled) return;
    const k = keys.current as Partial<Record<"KeyW"|"KeyA"|"KeyS"|"KeyD"|"ArrowUp"|"ArrowDown"|"ArrowLeft"|"ArrowRight", boolean>>;
    let f = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0) - input.joyY;
    let r = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0) + input.joyX;
    const len = Math.hypot(f, r);
    if (len > 1) {
      f /= len;
      r /= len;
    }
    if (len < 0.01) return;
    const sin = Math.sin(yaw.current);
    const cos = Math.cos(yaw.current);
    // forward = (-sin, 0, -cos), right = (cos, 0, -sin)
    dir.current.set(-sin * f + cos * r, 0, -cos * f - sin * r);
    const p = camera.position;
    p.addScaledVector(dir.current, PLAYER.speed * dt);
    resolveCollisions(p, PLAYER.radius);
    p.y = PLAYER.eyeHeight;
  });

  return null;
}
