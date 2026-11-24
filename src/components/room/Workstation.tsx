// Desk corner (reference: user photo): O-frame desk with a panel leg, fabric privacy
// panel topped by a wide dashboard display, laptop on a stand, monitor, mat and props.
// Built against the right wall (+X); the user sits on the -X side facing +X, so -Z is
// their left and +Z their right.
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";
import { drawMountainLake, mountainScreen } from "./textures";
import { useSurfaceMap } from "./SurfaceMaps";
import { RealPlant } from "./Models";

type V3 = [number, number, number];
const HW = ROOM.width / 2;
const WHITE = "#f2f1ee";
const STEEL = { c: "#9a9ea4", r: 0.35, m: 0.85 };
const BRONZE = { c: "#8a6a4c", r: 0.3, m: 0.9 };
const INK = "#18191b";

function B({ p, s, c, r = 0.7, m = 0, rot }: { p: V3; s: V3; c: string; r?: number; m?: number; rot?: V3 }) {
  return (
    <RoundedBox args={s} radius={Math.min(0.006, ...s.map((v) => v / 4))} smoothness={2} position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={c} roughness={r} metalness={m} />
    </RoundedBox>
  );
}

/** A screen plane facing the user (-X). */
function Screen({ p, w, h, map, glow = 1 }: { p: V3; w: number; h: number; map: THREE.Texture; glow?: number }) {
  return (
    <mesh position={p} rotation-y={-Math.PI / 2}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial map={map} emissiveMap={map} emissive="#ffffff" emissiveIntensity={glow} roughness={0.3} />
    </mesh>
  );
}

// ---------- dashboard ----------

const DASH_W = 2400;
const DASH_H = 330;

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
}

function drawDashboard(g: CanvasRenderingContext2D, now: Date) {
  const W = DASH_W;
  const H = DASH_H;
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0c1424");
  bg.addColorStop(1, "#131d33");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  const font = (px: number, weight = 400) => `${weight} ${px}px "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
  const pad = 22;
  const cardY = pad;
  const cardH = H - pad * 2;
  const widths = [480, 470, 430, 320, 340, 0];
  widths[5] = W - pad * 7 - widths.reduce((a, b) => a + b, 0);
  const xs: number[] = [];
  widths.reduce((x, w) => (xs.push(x), x + w + pad), pad);
  widths.forEach((w, i) => {
    roundRect(g, xs[i] ?? 0, cardY, w, cardH, 18);
    g.fillStyle = "rgba(38,52,82,0.72)";
    g.fill();
    g.strokeStyle = "rgba(140,170,230,0.14)";
    g.lineWidth = 2;
    g.stroke();
  });
  const text = (t: string, x: number, y: number, px: number, color = "#e9eef8", weight = 400) => {
    g.font = font(px, weight);
    g.fillStyle = color;
    g.fillText(t, x, y);
  };
  const header = (i: number, title: string, sub: string, icon: (x: number, y: number) => void) => {
    const x = (xs[i] ?? 0) + 30;
    icon(x, cardY + 30);
    text(title, x + 62, cardY + 56, 30, "#e9eef8", 600);
    if (sub) text(sub, x + 62, cardY + 88, 22, "#7f90b0");
  };
  const tile = (color: string) => (x: number, y: number) => {
    roundRect(g, x, y, 46, 46, 10);
    g.fillStyle = color;
    g.fill();
  };

  // clock + greeting (live)
  const hr = now.getHours();
  const time = `${hr % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;
  const date = now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(/^(\w+)/, "$1,");
  const part = hr < 12 ? "Morning" : hr < 17 ? "Afternoon" : "Evening";
  const x0 = (xs[0] ?? 0) + 36;
  text(time, x0, cardY + 104, 92, "#ffffff", 300);
  text(date, x0, cardY + 150, 30, "#8fa8d6");
  text(`Good ${part}, Raj`, x0, cardY + 222, 40, "#ffffff", 500);
  text("Here's what's happening today.", x0, cardY + 260, 24, "#8090ad");

  // tasks
  header(1, "Tasks", "3 pending", tile("#3d7bf0"));
  ["Finish design system", "Team standup", "Project update"].forEach((t, i) => {
    const y = cardY + 150 + i * 46;
    g.beginPath();
    g.arc((xs[1] ?? 0) + 46, y - 8, 11, 0, Math.PI * 2);
    g.strokeStyle = "#5d8fe8";
    g.lineWidth = 3;
    g.stroke();
    text(t, (xs[1] ?? 0) + 72, y, 25, "#d6deec");
  });

  // calendar
  header(2, "Calendar", "Today", tile("#3567d6"));
  [["10:30", "Team standup"], ["02:00", "Design review"], ["04:00", "Client call"]].forEach(([t, e], i) => {
    const y = cardY + 150 + i * 46;
    text(t ?? "", (xs[2] ?? 0) + 32, y, 25, "#6fa0ff", 500);
    text(e ?? "", (xs[2] ?? 0) + 130, y, 25, "#d6deec");
  });

  // weather
  header(3, "Weather", "", (x, y) => {
    g.beginPath();
    g.arc(x + 23, y + 23, 16, 0, Math.PI * 2);
    g.fillStyle = "#ffc93c";
    g.fill();
  });
  text("24°C", (xs[3] ?? 0) + 32, cardY + 168, 62, "#ffffff", 400);
  text("Partly cloudy", (xs[3] ?? 0) + 32, cardY + 212, 24, "#b7c3da");
  text("Pune", (xs[3] ?? 0) + 32, cardY + 256, 22, "#6f86b4");

  // quick links (generic glyphs, no brand marks)
  text("Quick Links", (xs[4] ?? 0) + 30, cardY + 56, 28, "#e9eef8", 600);
  [["Mail", "#e2574c"], ["Notes", "#e8eaf0"], ["Drive", "#2fb36d"], ["Docs", "#4d8af0"], ["Files", "#9b6cf0"], ["Chat", "#f0a93c"]].forEach(([label, c], i) => {
    const cx = (xs[4] ?? 0) + 64 + (i % 3) * 104;
    const cy = cardY + 118 + Math.floor(i / 3) * 92;
    roundRect(g, cx - 20, cy - 20, 40, 40, 9);
    g.fillStyle = c ?? "#fff";
    g.fill();
    g.font = font(18);
    g.fillStyle = "#93a3c2";
    g.textAlign = "center";
    g.fillText(label ?? "", cx, cy + 46);
    g.textAlign = "left";
  });

  // motivational card with a small landscape
  const qx = xs[5] ?? 0;
  const qw = widths[5] ?? 0;
  g.save();
  roundRect(g, qx, cardY, qw, cardH, 18);
  g.clip();
  drawMountainLake(g, qx, cardY, qw, cardH);
  g.fillStyle = "rgba(10,16,32,0.25)";
  g.fillRect(qx, cardY, qw, cardH);
  g.restore();
  text("Small steps", qx + 28, cardY + 60, 30, "#ffffff", 500);
  text("make big progress.", qx + 28, cardY + 98, 30, "#ffffff", 500);
}

/** Canvas texture redrawn once a minute so the clock and greeting stay current. */
function useDashboardTexture() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = DASH_W;
    c.height = DASH_H;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  useEffect(() => {
    const canvas = tex.image as HTMLCanvasElement;
    const g = canvas.getContext("2d");
    if (!g) return;
    let last = -1;
    const tick = () => {
      const now = new Date();
      if (now.getMinutes() === last) return;
      last = now.getMinutes();
      drawDashboard(g, now);
      tex.needsUpdate = true;
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(id);
      tex.dispose();
    };
  }, [tex]);
  return tex;
}

// ---------- props ----------

function Notebook({ p, rotY = 0, pen = false }: { p: V3; rotY?: number; pen?: boolean }) {
  return (
    <group position={p} rotation-y={rotY}>
      <B p={[0, 0.009, 0]} s={[0.17, 0.018, 0.24]} c={INK} r={0.75} />
      <B p={[0.001, 0.0185, 0]} s={[0.16, 0.001, 0.23]} c="#232427" r={0.6} />
      {/* elastic band */}
      <B p={[0, 0.0095, 0.095]} s={[0.172, 0.019, 0.006]} c="#0c0c0d" r={0.5} />
      {pen && (
        <group position={[0, 0.024, -0.02]} rotation={[0, 0.5, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.14, 12]} />
            <meshStandardMaterial color="#0d0d0e" roughness={0.25} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0.072, 0]}>
            <coneGeometry args={[0.005, 0.012, 12]} />
            <meshStandardMaterial color="#c9a45a" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function PenCup({ p }: { p: V3 }) {
  const pens = [
    [0.012, 0.01, "#1b1b1d"],
    [-0.015, 0.008, "#c9a45a"],
    [0.004, -0.016, "#2c2c30"],
    [-0.01, -0.01, "#e2c26a"],
    [0.018, -0.006, "#121214"],
  ] as const;
  return (
    <group position={p}>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.12, 6]} />
        <meshStandardMaterial color="#2a2b2f" roughness={0.3} metalness={0.5} flatShading />
      </mesh>
      {pens.map(([dx, dz, c], i) => (
        <mesh key={i} position={[dx, 0.15, dz]} rotation={[dz * 6, 0, -dx * 6]} castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.17, 8]} />
          <meshStandardMaterial color={c} roughness={0.35} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Minimal bar lamp: post at the back, arm reaching toward the user with a warm strip. */
function BarLamp({ p }: { p: V3 }) {
  const arm = 0.32;
  const post = 0.44;
  return (
    <group position={p}>
      <B p={[0, 0.008, 0]} s={[0.14, 0.016, 0.1]} c={INK} r={0.3} m={0.6} />
      <B p={[0, post / 2, 0]} s={[0.02, post, 0.04]} {...BRONZE} />
      <B p={[-arm / 2 + 0.01, post, 0]} s={[arm, 0.022, 0.045]} {...BRONZE} />
      <mesh position={[-arm / 2 + 0.01, post - 0.012, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[arm - 0.04, 0.03]} />
        <meshBasicMaterial color="#ffe1ae" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[-arm / 2, post - 0.08, 0]} color="#ffcf8a" intensity={1.6} distance={2.2} decay={2} castShadow={false} />
    </group>
  );
}

/** Floating black shelf with a bronze lip and warm under-glow, mounted on the desk wall. */
function WallShelf() {
  const { x, z, y, w, d } = LAYOUT.deskShelf;
  const sx = x - d / 2; // shelf centre; x is the wall face
  const books = [
    [0.03, 0.2, "#d8d2c6"],
    [0.025, 0.18, "#2d4a52"],
    [0.035, 0.22, "#1f2023"],
    [0.028, 0.17, "#8a6a4c"],
  ] as const;
  let bz = z - w / 2 + 0.12;
  return (
    <group>
      <B p={[sx, y, z]} s={[d, 0.035, w]} c="#151517" r={0.5} />
      <B p={[x - d + 0.004, y, z]} s={[0.008, 0.037, w]} {...BRONZE} />
      {/* LED strip on the underside, washing the wall */}
      <mesh position={[x - 0.03, y - 0.0185, z]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[0.012, w - 0.08]} />
        <meshBasicMaterial color="#ffd9a0" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[x - 0.12, y - 0.12, z]} color="#ffc98a" intensity={0.9} distance={1.6} decay={2} />
      {/* upright books, left end */}
      {books.map(([t, bh, c], i) => {
        const pz = bz + t / 2;
        bz += t + 0.003;
        return <B key={i} p={[sx, y + 0.0175 + bh / 2, pz]} s={[0.15, bh, t]} c={c} r={0.85} />;
      })}
      {/* bronze bookend + framed print + vase */}
      <B p={[sx, y + 0.08, bz + 0.01]} s={[0.1, 0.13, 0.008]} {...BRONZE} />
      <group position={[x - 0.06, y + 0.0175, z + 0.22]} rotation-z={0.08}>
        <B p={[0, 0.12, 0]} s={[0.015, 0.24, 0.19]} c={INK} r={0.5} />
        <mesh position={[-0.008, 0.12, 0]} rotation-y={-Math.PI / 2}>
          <planeGeometry args={[0.16, 0.21]} />
          <meshStandardMaterial color="#c9c2b4" roughness={0.9} />
        </mesh>
      </group>
      <mesh position={[sx, y + 0.0175 + 0.07, z + w / 2 - 0.14]} castShadow>
        <cylinderGeometry args={[0.03, 0.045, 0.14, 24]} />
        <meshStandardMaterial color={BRONZE.c} roughness={BRONZE.r} metalness={BRONZE.m} />
      </mesh>
    </group>
  );
}

// ---------- assembly ----------

export function Workstation() {
  const { x, z, d, w, h } = LAYOUT.desk;
  const front = x - d / 2;
  const back = HW;
  const z0 = z - w / 2; // user's left end
  const z1 = z + w / 2;
  const fabric = useSurfaceMap("fabric", 6, 2);
  const dash = useDashboardTexture();
  const monitorTex = useMemo(() => mountainScreen(true), []);
  const laptopTex = useMemo(() => mountainScreen(false), []);
  useEffect(
    () => () => {
      monitorTex.dispose();
      laptopTex.dispose();
    },
    [monitorTex, laptopTex],
  );

  const top = h;
  const tube = 0.04;
  const panelH = 0.5;
  const dashH = 0.3;
  const panelX = back - 0.025;

  // laptop on stand (left of the monitor)
  const lap = { x: back - 0.3, z: z - 0.42 };
  // monitor (centre-right)
  const mon = { x: back - 0.16, z: z + 0.08, w: 0.62, h: 0.37, y: top + 0.3 };

  return (
    <group>
      {/* desktop */}
      <B p={[x, top - 0.02, z]} s={[d, 0.04, w]} c={WHITE} r={0.45} />
      {/* left: rectangular O-frame leg */}
      {[front + 0.06, back - 0.06].map((px, i) => (
        <B key={i} p={[px, (top - 0.04) / 2, z0 + 0.06]} s={[tube, top - 0.04, tube]} {...STEEL} />
      ))}
      <B p={[x, 0.02, z0 + 0.06]} s={[d - 0.08, tube, tube]} {...STEEL} />
      <B p={[x, top - 0.06, z0 + 0.06]} s={[d - 0.08, tube, tube]} {...STEEL} />
      {/* right: solid white panel leg, inset from the end */}
      <B p={[x, (top - 0.04) / 2, z1 - 0.34]} s={[d - 0.06, top - 0.04, 0.3]} c={WHITE} r={0.5} />
      {/* rail tying the legs together under the back edge */}
      <B p={[back - 0.06, top - 0.07, z - 0.15]} s={[tube * 0.7, 0.05, w - 0.5]} {...STEEL} />

      {/* fabric privacy panel with bronze frame, dashboard display on top */}
      <mesh position={[panelX, top + panelH / 2, z]} rotation-y={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[w - 0.06, panelH]} />
        <meshStandardMaterial map={fabric} bumpMap={fabric} bumpScale={0.004} color="#3a3b3e" roughness={0.95} />
      </mesh>
      <B p={[panelX + 0.012, top + (panelH + dashH) / 2, z]} s={[0.02, panelH + dashH + 0.03, w - 0.02]} c="#121316" r={0.6} />
      {[z0 + 0.012, z1 - 0.012].map((pz, i) => (
        <B key={i} p={[panelX - 0.004, top + (panelH + dashH + 0.02) / 2, pz]} s={[0.03, panelH + dashH + 0.02, 0.024]} {...BRONZE} />
      ))}
      <B p={[panelX - 0.004, top + panelH + dashH + 0.012, z]} s={[0.03, 0.024, w]} {...BRONZE} />
      <B p={[panelX - 0.004, top + panelH, z]} s={[0.03, 0.014, w - 0.04]} {...BRONZE} />
      <Screen p={[panelX - 0.006, top + panelH + dashH / 2 + 0.004, z]} w={w - 0.07} h={dashH - 0.02} map={dash} glow={0.95} />

      {/* desk mat */}
      <B p={[front + 0.28, top + 0.0015, z + 0.12]} s={[0.44, 0.003, 1.05]} c="#1e1f22" r={0.95} />

      {/* monitor */}
      <B p={[mon.x + 0.02, top + 0.006, mon.z]} s={[0.16, 0.012, 0.26]} c="#2a2b2e" r={0.35} m={0.6} />
      <B p={[mon.x + 0.06, top + 0.14, mon.z]} s={[0.025, 0.26, 0.06]} c="#2a2b2e" r={0.35} m={0.6} />
      <B p={[mon.x + 0.01, mon.y, mon.z]} s={[0.025, mon.h + 0.02, mon.w + 0.02]} c={INK} r={0.4} />
      <Screen p={[mon.x - 0.003, mon.y + 0.005, mon.z]} w={mon.w - 0.01} h={mon.h - 0.02} map={monitorTex} />

      {/* laptop on an angled stand */}
      <group position={[lap.x, top, lap.z]}>
        <B p={[0.02, 0.006, 0]} s={[0.26, 0.012, 0.3]} c="#26272a" r={0.4} m={0.5} />
        <B p={[0.1, 0.03, 0]} s={[0.03, 0.04, 0.26]} c="#26272a" r={0.4} m={0.5} />
        <group position={[0, 0.04, 0]} rotation-z={0.17}>
          <B p={[0, 0, 0]} s={[0.22, 0.014, 0.31]} c="#a7abb1" r={0.3} m={0.85} />
          <B p={[-0.03, 0.0075, 0]} s={[0.1, 0.002, 0.27]} c="#1c1d20" r={0.6} />
          <group position={[0.11, 0.007, 0]} rotation-z={-0.45}>
            <B p={[0.004, 0.105, 0]} s={[0.008, 0.21, 0.31]} c="#a7abb1" r={0.3} m={0.85} />
            <Screen p={[-0.001, 0.108, 0]} w={0.29} h={0.18} map={laptopTex} />
          </group>
        </group>
      </group>

      {/* mouse */}
      <mesh position={[front + 0.28, top + 0.014, z + 0.48]} scale={[0.06, 0.022, 0.034]} castShadow>
        <sphereGeometry args={[1, 20, 12]} />
        <meshStandardMaterial color="#1b1c1f" roughness={0.35} metalness={0.2} />
      </mesh>

      {/* notebooks, pens, plant, lamp */}
      <Notebook p={[front + 0.16, top, z0 + 0.32]} rotY={0.35} pen />
      <Notebook p={[back - 0.36, top, z1 - 0.2]} rotY={-0.25} />
      <PenCup p={[back - 0.2, top, z0 + 0.3]} />
      <RealPlant id="potted_plant_02" p={[back - 0.2, top, z0 + 0.12]} s={0.36} rotY={2.3} />
      <BarLamp p={[back - 0.12, top, z1 - 0.17]} />
      <WallShelf />
    </group>
  );
}
