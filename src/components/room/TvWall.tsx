// Navy feature wall opposite the door (reference: user photo): oak slat panel with a trooper
// statue, cane-front oak console carrying a games console and a slotted game holder under a
// 75" TV, stool with a controller, and an open shelf.
// Everything sits against the back wall (z = -HL) and faces the room (+Z).
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";
import { caneWeave, plaster, roughNoise } from "./textures";
import tvScreen from "@/assets/room/tv-screen.jpg";
import { TrooperStatue } from "./Trooper";
import { Collectibles } from "./Collectibles";
import { Gamepad } from "./Gamepad";
import { useSurfaceMap } from "./SurfaceMaps";

type V3 = [number, number, number];
const HL = ROOM.length / 2;
const OAK = "#fde2b4";
const CERAMIC = "#ece7dd";
const T = LAYOUT.tvWall;

function OakBox({ p, s, rot, grain }: { p: V3; s: V3; rot?: V3; grain: THREE.Texture }) {
  return (
    <RoundedBox args={s} radius={Math.min(0.006, ...s.map((v) => v / 4))} smoothness={2} position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial map={grain} color={OAK} roughness={0.55} />
    </RoundedBox>
  );
}

/** Tapered, slightly splayed round leg standing on the floor at (x,z). */
function Leg({ x, z, h, sx, sz, grain }: { x: number; z: number; h: number; sx: number; sz: number; grain: THREE.Texture }) {
  return (
    <mesh position={[x, h / 2, z]} rotation={[-sz * 0.08, 0, sx * 0.08]} castShadow>
      <cylinderGeometry args={[0.018, 0.011, h, 12]} />
      <meshStandardMaterial map={grain} color={OAK} roughness={0.55} />
    </mesh>
  );
}

function NavyWall() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ map: plaster("#26344f"), roughnessMap: roughNoise(), roughness: 0.95 }), []);
  useEffect(() => () => mat.dispose(), [mat]);
  return (
    <mesh position={[0, ROOM.height / 2, -HL + 0.002]} material={mat} receiveShadow>
      <planeGeometry args={[ROOM.width, ROOM.height]} />
    </mesh>
  );
}

function Slats({ grain }: { grain: THREE.Texture }) {
  const { x, w } = T.slats;
  const n = 8;
  const pitch = w / n;
  const h = ROOM.height - 0.01;
  return (
    <group>
      <mesh position={[x, h / 2, -HL + 0.022]}>
        <boxGeometry args={[w, h, 0.004]} />
        <meshStandardMaterial color="#1a2234" roughness={0.9} />
      </mesh>
      {Array.from({ length: n }, (_, i) => (
        <OakBox key={i} p={[x - w / 2 + pitch * (i + 0.5), h / 2, -HL + 0.045]} s={[pitch * 0.62, h, 0.04]} grain={grain} />
      ))}
    </group>
  );
}

function CaneConsole({ grain }: { grain: THREE.Texture }) {
  const { x, w, d, h } = T.console;
  const cane = useMemo(() => {
    const t = caneWeave();
    t.repeat.set(5, 2);
    return t;
  }, []);
  useEffect(() => () => cane.dispose(), [cane]);
  const legH = 0.12;
  const bodyH = h - legH;
  const zc = -HL + d / 2;
  const front = -HL + d;
  const doorW = (w - 0.06) / 2;
  return (
    <group>
      {/* carcass */}
      <OakBox p={[x, h - 0.0125, zc]} s={[w, 0.025, d]} grain={grain} />
      <OakBox p={[x, legH + 0.0125, zc]} s={[w, 0.025, d]} grain={grain} />
      {[-1, 1].map((s) => (
        <OakBox key={s} p={[x + s * (w / 2 - 0.0125), legH + bodyH / 2, zc]} s={[0.025, bodyH, d]} grain={grain} />
      ))}
      <mesh position={[x, legH + bodyH / 2, -HL + 0.012]}>
        <boxGeometry args={[w - 0.04, bodyH - 0.04, 0.01]} />
        <meshStandardMaterial color="#3b2c1e" roughness={0.9} />
      </mesh>
      {/* two sliding cane doors in oak frames */}
      {[-1, 1].map((s) => {
        const cx = x + s * (doorW / 2 + 0.004);
        const cy = legH + bodyH / 2;
        const ih = bodyH - 0.1;
        return (
          <group key={s} position={[cx, cy, front - 0.012]}>
            <OakBox p={[0, ih / 2 + 0.017, 0]} s={[doorW, 0.034, 0.02]} grain={grain} />
            <OakBox p={[0, -ih / 2 - 0.017, 0]} s={[doorW, 0.034, 0.02]} grain={grain} />
            <OakBox p={[-doorW / 2 + 0.017, 0, 0]} s={[0.034, ih, 0.02]} grain={grain} />
            <OakBox p={[doorW / 2 - 0.017, 0, 0]} s={[0.034, ih, 0.02]} grain={grain} />
            <mesh position={[0, 0, 0.002]}>
              <planeGeometry args={[doorW - 0.068, ih]} />
              <meshStandardMaterial map={cane} bumpMap={cane} bumpScale={0.002} roughness={0.8} />
            </mesh>
            {/* finger-pull notch at the meeting edge */}
            <mesh position={[-s * (doorW / 2 - 0.017), 0, 0.011]}>
              <boxGeometry args={[0.012, 0.09, 0.004]} />
              <meshStandardMaterial color="#5a4128" roughness={0.7} />
            </mesh>
          </group>
        );
      })}
      {([[-1, -1], [1, -1], [-1, 1], [1, 1]] as [number, number][]).map(([a, b], i) => (
        <Leg key={i} x={x + a * (w / 2 - 0.08)} z={zc + b * (d / 2 - 0.07)} h={legH + 0.004} sx={a} sz={b} grain={grain} />
      ))}
      {/* gaming setup on top */}
      <GameHolder x={x + w / 2 - 0.47} y={h} zc={zc} />
      <GamesConsole p={[x + w / 2 - 0.2, h, zc]} />
    </group>
  );
}

function Tv() {
  const { x, y, w, h } = T.tv;
  const pic = useMemo(() => {
    const t = new THREE.TextureLoader().load(tvScreen);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  useEffect(() => () => pic.dispose(), [pic]);
  return (
    <group position={[x, y, -HL]}>
      <mesh position={[0, 0, 0.028]}>
        <boxGeometry args={[0.3, 0.2, 0.05]} />
        <meshStandardMaterial color="#111" roughness={0.6} />
      </mesh>
      <RoundedBox args={[w, h, 0.025]} radius={0.004} smoothness={2} position={[0, 0, 0.062]} castShadow>
        <meshStandardMaterial color="#0e0e10" roughness={0.35} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.004, 0.0752]}>
        <planeGeometry args={[w - 0.02, h - 0.025]} />
        <meshStandardMaterial map={pic} emissiveMap={pic} emissive="#ffffff" emissiveIntensity={0.8} roughness={0.55} />
      </mesh>
      {/* screen spill onto the console and floor */}
      <pointLight position={[0, -h / 2 - 0.15, 0.6]} color="#8fb3e0" intensity={0.6} distance={3} decay={2} />
    </group>
  );
}

function Stool({ grain }: { grain: THREE.Texture }) {
  const { x, z, r, h } = T.stool;
  return (
    <group>
      <mesh position={[x, h - 0.015, z]} castShadow receiveShadow>
        <cylinderGeometry args={[r, r, 0.03, 32]} />
        <meshStandardMaterial map={grain} color={OAK} roughness={0.55} />
      </mesh>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        const sx = Math.sin(a);
        const sz = Math.cos(a);
        return <Leg key={i} x={x + sx * r * 0.65} z={z + sz * r * 0.65} h={h - 0.03} sx={sx} sz={sz} grain={grain} />;
      })}
      <Gamepad p={[x, h, z]} rotY={0.5} />
      {/* stretcher ring */}
      <mesh position={[x, h * 0.4, z]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[r * 0.7, 0.007, 8, 32]} />
        <meshStandardMaterial map={grain} color={OAK} roughness={0.55} />
      </mesh>
    </group>
  );
}

function OpenShelf({ grain }: { grain: THREE.Texture }) {
  const { x, w, d, h, levels } = T.openShelf;
  const t = 0.025;
  const zc = -HL + d / 2;
  return (
    <group>
      {[-1, 1].map((s) => (
        <OakBox key={s} p={[x + s * (w / 2 - t / 2), h / 2, zc]} s={[t, h, d]} grain={grain} />
      ))}
      <OakBox p={[x, h - t / 2, zc]} s={[w, t, d]} grain={grain} />
      {levels.map((y) => (
        <OakBox key={y} p={[x, y, zc]} s={[w - 2 * t, t, d - 0.01]} grain={grain} />
      ))}
      {/* collectibles on the upper shelves live in Collectibles.tsx */}
    </group>
  );
}

// ---------- gaming ----------

const CASE = { w: 0.135, h: 0.17, t: 0.015 };
// Fictional titles: [title, spine colour, title colour]
const GAMES: [string, string, string][] = [
  ["NOVA RIFT", "#2a1b4d", "#f4c2e0"],
  ["IRON TIDE", "#9e2a2b", "#ffffff"],
  ["SKYBOUND", "#cfe3e8", "#1d3d55"],
  ["ECHO PROTOCOL", "#1b1f3a", "#e85a5a"],
  ["CRIMSON HOUR", "#5a1620", "#ffffff"],
  ["ICE LEAGUE 25", "#f2f2f2", "#111111"],
  ["WILDS OF ARDEN", "#b9c9a8", "#2f3d22"],
];

/** Spine art: white top band with a small brand-free mark, then colour and a vertical title. */
function spineTexture([title, bg, fg]: [string, string, string]) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 720;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = bg;
    g.fillRect(0, 0, 64, 720);
    g.fillStyle = "#f6f6f4";
    g.fillRect(0, 0, 64, 200);
    g.fillStyle = "#1c1c1e";
    g.beginPath();
    g.arc(32, 70, 14, 0, Math.PI * 2);
    g.fill();
    g.fillRect(18, 110, 28, 60);
    g.save();
    g.translate(40, 690);
    g.rotate(-Math.PI / 2);
    g.fillStyle = fg;
    g.font = "bold 34px 'Segoe UI', Arial, sans-serif";
    g.fillText(title, 0, 0, 460);
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** White slotted stand (reference: user photo) holding cases upright, spines to the room. */
function GameHolder({ x, y, zc }: { x: number; y: number; zc: number }) {
  const spines = useMemo(() => GAMES.map(spineTexture), []);
  useEffect(() => () => spines.forEach((t) => t.dispose()), [spines]);
  const slots = 10;
  const pitch = CASE.t + 0.004;
  const wall = 0.008;
  const bw = slots * pitch + wall * 2;
  const bd = CASE.w + 0.03;
  const bh = 0.035;
  const x0 = x - bw / 2 + wall + pitch / 2;
  const WHITE = { color: "#f3f3f1", roughness: 0.55 };
  return (
    <group>
      {/* base with a sloped front lip */}
      <RoundedBox args={[bw, bh, bd]} radius={0.004} smoothness={2} position={[x, y + bh / 2, zc]} castShadow receiveShadow>
        <meshStandardMaterial {...WHITE} />
      </RoundedBox>
      <mesh position={[x, y + bh / 2 - 0.004, zc + bd / 2 + 0.012]} rotation-x={0.45} castShadow>
        <boxGeometry args={[bw, bh + 0.008, 0.012]} />
        <meshStandardMaterial {...WHITE} />
      </mesh>
      {/* slot dividers visible in the empty slots */}
      {Array.from({ length: slots + 1 }, (_, i) => (
        <mesh key={i} position={[x - bw / 2 + wall + i * pitch, y + bh + 0.006, zc]}>
          <boxGeometry args={[0.003, 0.012, bd - 0.01]} />
          <meshStandardMaterial {...WHITE} />
        </mesh>
      ))}
      {spines.map((tex, i) => (
        <group key={i} position={[x0 + i * pitch, y + bh - 0.01 + CASE.h / 2, zc]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[CASE.t, CASE.h, CASE.w]} />
            <meshStandardMaterial color="#2453c4" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, CASE.w / 2 + 0.0006]}>
            <planeGeometry args={[CASE.t - 0.002, CASE.h - 0.004]} />
            <meshStandardMaterial map={tex} roughness={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Current-gen console standing upright: white flared side panels around a black core. */
function GamesConsole({ p }: { p: V3 }) {
  const hgt = 0.39;
  const dep = 0.26;
  return (
    <group position={p}>
      <mesh position={[0, 0.006, 0]} receiveShadow>
        <cylinderGeometry args={[0.07, 0.075, 0.012, 32]} />
        <meshStandardMaterial color="#111113" roughness={0.4} />
      </mesh>
      <RoundedBox args={[0.06, hgt - 0.02, dep - 0.02]} radius={0.01} smoothness={3} position={[0, 0.012 + hgt / 2, 0]} castShadow>
        <meshStandardMaterial color="#0d0d0f" roughness={0.5} />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.038, 0.012 + hgt / 2, 0]}>
          {/* side shell, flaring outward toward the top */}
          <RoundedBox args={[0.016, hgt, dep]} radius={0.007} smoothness={3} rotation-z={-s * 0.05} position={[s * 0.005, 0, 0]} castShadow>
            <meshStandardMaterial color="#f4f4f6" roughness={0.3} />
          </RoundedBox>
          <RoundedBox args={[0.02, hgt * 0.35, dep * 0.9]} radius={0.009} smoothness={3} rotation-z={-s * 0.12} position={[s * 0.016, hgt * 0.3, 0]} castShadow>
            <meshStandardMaterial color="#f4f4f6" roughness={0.3} />
          </RoundedBox>
        </group>
      ))}
      {/* front: soft blue light strip and power button */}
      <mesh position={[0, 0.012 + hgt * 0.62, dep / 2 - 0.009]}>
        <boxGeometry args={[0.004, hgt * 0.5, 0.002]} />
        <meshBasicMaterial color="#5aa8ff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.06, dep / 2 - 0.005]}>
        <boxGeometry args={[0.03, 0.004, 0.004]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} />
      </mesh>
    </group>
  );
}


export function TvWall() {
  const grain = useSurfaceMap("oak", 1, 1);
  return (
    <group name="tv-wall">
      <NavyWall />
      <Slats grain={grain} />
      <TrooperStatue position={[T.trooper.x, 0.04, T.trooper.z]} height={T.trooper.h} rotY={0.35} />
      <CaneConsole grain={grain} />
      <Tv />
      <Stool grain={grain} />
      <OpenShelf grain={grain} />
      <Collectibles />
    </group>
  );
}
