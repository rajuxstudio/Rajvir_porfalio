// All furniture placements and collision boxes in one place. See input.ts for axes.
import { ROOM } from "./input";

const HW = ROOM.width / 2;
const HL = ROOM.length / 2;
const DOOR = { x: 0.35, z: HL - 0.025, w: 0.9, h: 2.1, depth: 0.045 };
const SIDE_TABLE = { w: 0.75, d: 0.4, h: 0.62 };
// Back edge against the right wall; z keeps the -Z end clear of the TV wall's open shelf.
const DESK = { x: HW - 0.35, z: 0.2, d: 0.7, w: 2.0, h: 0.75 };

export const LAYOUT = {
  door: DOOR,
  // framed degrees + certificates on the left wall, beside the trooper statue (TV-wall corner)
  // and running toward the bedside table
  certWall: { x: -HW, z0: -HL + 0.55, z1: 0.05 },
  // oak chest against the front wall, on the door's right as seen from inside (-X side)
  sideTable: {
    ...SIDE_TABLE,
    x: DOOR.x - DOOR.w / 2 - 0.15 - SIDE_TABLE.w / 2,
    z: HL - SIDE_TABLE.d / 2 - 0.01,
  },
  bed: { x: -HW + 0.64, z: HL - 1.08, w: 1.2, l: 2.1 }, // headboard against front wall
  bedside: { x: -HW + 0.28, z: HL - 2.48, w: 0.52, d: 0.52, h: 0.62 },
  desk: DESK,
  chair: { x: HW - 1.25, z: DESK.z },
  deskShelf: { x: HW, z: DESK.z, y: 1.95, w: 1.1, d: 0.2 }, // floating shelf above the dashboard
  // ID-card lanyard rack on the right wall, past the desk end and above the corner plant
  idWall: { x: HW, z: DESK.z + DESK.w / 2 + 0.65, y: 1.8 },
  neon: { x: HW - 0.002, z: DESK.z, y: 2.5, w: 1.8 }, // "Designer · Developer" sign above the shelf
  bin: { x: HW - 0.28, z: DESK.z + DESK.w / 2 + 0.22, r: 0.16, h: 0.34 }, // just past the desk's +Z end
  // navy feature wall opposite the door (z = -HL): slats + trooper statue, cane console with 75" TV and
  // games console, stool with controller, open shelf
  tvWall: {
    z: -HL,
    slats: { x: -HW + 0.5, w: 0.62 },
    trooper: { x: -HW + 0.5, z: -HL + 0.32, r: 0.32, h: 1.2 },
    console: { x: -0.15, w: 1.6, d: 0.42, h: 0.56 },
    tv: { x: -0.15, y: 1.47, w: 1.66, h: 0.94 }, // 75"
    stool: { x: 0.98, z: -HL + 0.26, r: 0.16, h: 0.5 },
    openShelf: {
      x: HW - 0.55,
      w: 0.56,
      d: 0.32,
      h: 1.85,
      levels: [0.05, 0.5, 0.95, 1.4],
      board: 0.025,
    },
  },
};

/** Axis-aligned collision boxes on the XZ plane: [minX, maxX, minZ, maxZ]. */
export type Box2 = [number, number, number, number];
const L = LAYOUT;
export const COLLIDERS: Box2[] = [
  [L.door.x - L.door.w / 2 - 0.055, L.door.x + L.door.w / 2 + 0.055, HL - 0.09, HL],
  [-HW, L.bed.x + L.bed.w / 2, L.bed.z - L.bed.l / 2, HL],
  [
    L.sideTable.x - L.sideTable.w / 2,
    L.sideTable.x + L.sideTable.w / 2,
    HL - L.sideTable.d - 0.01,
    HL,
  ],
  [
    -HW,
    L.bedside.x + L.bedside.w / 2,
    L.bedside.z - L.bedside.d / 2,
    L.bedside.z + L.bedside.d / 2,
  ],
  [L.desk.x - L.desk.d / 2, HW, L.desk.z - L.desk.w / 2, L.desk.z + L.desk.w / 2],
  [L.chair.x - 0.4, L.chair.x + 0.4, L.chair.z - 0.4, L.chair.z + 0.4],
  [L.bin.x - L.bin.r, L.bin.x + L.bin.r, L.bin.z - L.bin.r, L.bin.z + L.bin.r],
  [
    L.tvWall.trooper.x - L.tvWall.trooper.r,
    L.tvWall.trooper.x + L.tvWall.trooper.r,
    -HL,
    L.tvWall.trooper.z + L.tvWall.trooper.r,
  ],
  [
    L.tvWall.console.x - L.tvWall.console.w / 2,
    L.tvWall.console.x + L.tvWall.console.w / 2,
    -HL,
    -HL + L.tvWall.console.d,
  ],
  [
    L.tvWall.stool.x - L.tvWall.stool.r,
    L.tvWall.stool.x + L.tvWall.stool.r,
    -HL,
    L.tvWall.stool.z + L.tvWall.stool.r,
  ],
  [
    L.tvWall.openShelf.x - L.tvWall.openShelf.w / 2,
    L.tvWall.openShelf.x + L.tvWall.openShelf.w / 2,
    -HL,
    -HL + L.tvWall.openShelf.d,
  ],
  [HW - 0.72, HW, HL - 0.72, HL], // potted plant corner
];

/** Push a circle (x,z,r) out of all colliders and room walls. Mutates & returns pos. */
export function resolveCollisions(p: { x: number; z: number }, r: number) {
  for (let iter = 0; iter < 2; iter++) {
    for (const [x0, x1, z0, z1] of COLLIDERS) {
      const cx = Math.max(x0, Math.min(x1, p.x));
      const cz = Math.max(z0, Math.min(z1, p.z));
      const dx = p.x - cx;
      const dz = p.z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 >= r * r) continue;
      if (d2 > 1e-8) {
        const d = Math.sqrt(d2);
        p.x += (dx / d) * (r - d);
        p.z += (dz / d) * (r - d);
      } else {
        // centre inside box: exit via nearest side
        const opts = [p.x - x0 + r, x1 - p.x + r, p.z - z0 + r, z1 - p.z + r];
        const m = opts.indexOf(Math.min(...opts));
        if (m === 0) p.x = x0 - r;
        else if (m === 1) p.x = x1 + r;
        else if (m === 2) p.z = z0 - r;
        else p.z = z1 + r;
      }
    }
    p.x = Math.max(-HW + r, Math.min(HW - r, p.x));
    p.z = Math.max(-HL + r, Math.min(HL - r, p.z));
  }
  return p;
}
