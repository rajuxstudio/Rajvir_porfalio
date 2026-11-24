// Shared store for the game-style "inspect object" feature. Objects opt in by tagging a group with
// `userData.inspect = { kind, idx }` and registering its root with `registerInspectable`; the
// scene raycaster (InspectRaycaster) writes what the player is aiming at (`hover`) and what was
// opened (`open`); the DOM overlay in RoomApp reads it. Only the objects listed in KINDS take part.
import { useSyncExternalStore } from "react";
import type { Object3D } from "three";
import { experiences } from "@/components/about/AboutExperience";
import { education } from "@/components/about/AboutEducation";
import { certificates } from "@/components/about/AboutCertifications";

export type InspectKind = "badge" | "degree" | "cert";
export type InspectTarget = { kind: InspectKind; idx: number };
export type InspectState = { hover: InspectTarget | null; open: InspectTarget | null };

/** Display name + how many items each kind has (A/D browses within the kind). */
export const KINDS: Record<InspectKind, { label: string; count: () => number }> = {
  badge: { label: "ID Badge", count: () => experiences.length },
  degree: { label: "Degree", count: () => education.length },
  cert: { label: "Certificate", count: () => certificates.length },
};

const same = (a: InspectTarget | null, b: InspectTarget | null) => a === b || (!!a && !!b && a.kind === b.kind && a.idx === b.idx);

let state: InspectState = { hover: null, open: null };
const listeners = new Set<() => void>();

export const inspectStore = {
  get: () => state,
  set(patch: Partial<InspectState>) {
    const next = { ...state, ...patch };
    if (same(next.hover, state.hover) && same(next.open, state.open)) return;
    state = next;
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  /** Move the open item by `d` within its kind, wrapping around. */
  step(d: number) {
    const o = state.open;
    if (!o) return;
    const n = KINDS[o.kind].count();
    this.set({ open: { kind: o.kind, idx: (o.idx + d + n) % n } });
  },
};

export function useInspect() {
  return useSyncExternalStore(inspectStore.subscribe, inspectStore.get);
}

/** Roots the raycaster tests against (keeps aiming cheap: no whole-scene raycasts). */
export const inspectRoots = new Set<Object3D>();
export function registerInspectable(obj: Object3D | null) {
  if (!obj) return () => {};
  inspectRoots.add(obj);
  return () => {
    inspectRoots.delete(obj);
  };
}

/** Walks up from a hit mesh to the nearest tagged group. */
export function targetOf(obj: Object3D | null): InspectTarget | null {
  for (let o = obj; o; o = o.parent) {
    const t = o.userData?.inspect as InspectTarget | undefined;
    if (t && typeof t.idx === "number") return t;
  }
  return null;
}
