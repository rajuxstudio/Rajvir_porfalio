// Shared mutable input state — written by DOM handlers, read in useFrame (no re-renders).
export const input = {
  forward: 0,
  right: 0,
  joyX: 0, // touch joystick -1..1
  joyY: 0,
  lookDX: 0, // accumulated look delta (pixels)
  lookDY: 0,
  enabled: false,
};

/**
 * Coordinate convention (1 unit ≈ 1 metre):
 *  - Origin (0,0,0) is the centre of the floor.
 *  - +Y is up. Floor at y=0, ceiling at y=ROOM.height.
 *  - +X is the RIGHT wall (workstation), -X is the LEFT wall (window, bed).
 *  - -Z is the BACK wall (bookshelf), +Z is the FRONT wall (behind spawn).
 *  - The player spawns near the front, looking toward -Z.
 */
export const ROOM = { width: 5, length: 5, height: 3.0, wallThickness: 0.2 };
export const PLAYER = { eyeHeight: 1.65, speed: 3, radius: 0.3, sensitivity: 0.0022 };
export const SPAWN: [number, number] = [0, 1.5];

if (import.meta.env.DEV && typeof window !== "undefined") (window as unknown as { __input: typeof input }).__input = input;
