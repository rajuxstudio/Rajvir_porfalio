import { useMemo } from "react";
import * as THREE from "three";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";
import { carpet, plaster, roughNoise } from "./textures";

export const WALL = "#ebe5da"; // warm off-white
export const TRIM = "#7a5436"; // walnut brown, ties walls to the wooden furniture
export const WOOD = "#c9a274";

function parquetTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  const rows = 8;
  const h = 512 / rows;
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let r = 0; r < rows; r++) {
    let x = -(r % 2) * 90;
    while (x < 512) {
      const w = 140 + rnd() * 80;
      const l = 38 + rnd() * 14;
      g.fillStyle = `hsl(28, ${45 + rnd() * 10}%, ${l}%)`;
      g.fillRect(x, r * h, w, h);
      g.strokeStyle = "rgba(40,20,10,0.45)";
      g.lineWidth = 2;
      g.strokeRect(x, r * h, w, h);
      for (let i = 0; i < 4; i++) {
        g.strokeStyle = "rgba(60,30,10,0.12)";
        g.beginPath();
        const y = r * h + rnd() * h;
        g.moveTo(x, y);
        g.lineTo(x + w, y + (rnd() - 0.5) * 6);
        g.stroke();
      }
      x += w;
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  t.anisotropy = 8;
  return t;
}

let wallMat: THREE.MeshStandardMaterial | null = null;
function getWallMat() {
  if (!wallMat) wallMat = new THREE.MeshStandardMaterial({ map: plaster(WALL), roughnessMap: roughNoise(), roughness: 0.95 });
  return wallMat;
}

function Box({ p, s, color, rough = 1 }: { p: [number, number, number]; s: [number, number, number]; color: string; rough?: number }) {
  return (
    <mesh position={p} castShadow receiveShadow {...(color === WALL ? { material: getWallMat() } : {})}>
      <boxGeometry args={s} />
      {color !== WALL && <meshStandardMaterial color={color} roughness={rough} />}
    </mesh>
  );
}

export function Room() {
  const { width: w, length: l, height: h, wallThickness: t } = ROOM;
  const floorTex = useMemo(() => {
    const t = carpet();
    t.repeat.set(ROOM.width / 0.8, ROOM.length / 0.8);
    return t;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[w, l]} />
        <meshPhysicalMaterial map={floorTex} bumpMap={floorTex} bumpScale={0.012} roughness={1} sheen={0.4} sheenRoughness={0.8} sheenColor="#8a7258" />
      </mesh>
      {/* Ceiling slab covers wall tops */}
      <Box p={[0, h + t / 2, 0]} s={[w + 2 * t, t, l + 2 * t]} color="#f3efe7" />
      {/* faint self-light so the off-white ceiling doesn't read as grey in shadow */}
      <mesh position={[0, h - 0.001, 0]} rotation-x={Math.PI / 2} receiveShadow>
        <planeGeometry args={[w, l]} />
        <meshStandardMaterial color="#f3efe7" emissive="#f6efe2" emissiveIntensity={0.18} roughness={0.95} />
      </mesh>
      {/* Back / front walls (span corners) */}
      <Box p={[0, h / 2, -l / 2 - t / 2]} s={[w + 2 * t, h, t]} color={WALL} />
      <Box p={[0, h / 2, l / 2 + t / 2]} s={[w + 2 * t, h, t]} color={WALL} />
      {/* Right wall */}
      <Box p={[w / 2 + t / 2, h / 2, 0]} s={[t, h, l]} color={WALL} />
      {/* Left wall */}
      <Box p={[-w / 2 - t / 2, h / 2, 0]} s={[t, h, l]} color={WALL} />

      {/* Baseboard trim */}
      <Box p={[0, 0.06, -l / 2 + 0.01]} s={[w, 0.12, 0.02]} color={TRIM} />
      <Box p={[(-w / 2 + LAYOUT.door.x - LAYOUT.door.w / 2 - 0.06) / 2, 0.06, l / 2 - 0.01]} s={[LAYOUT.door.x - LAYOUT.door.w / 2 - 0.06 + w / 2, 0.12, 0.02]} color={TRIM} />
      <Box p={[(w / 2 + LAYOUT.door.x + LAYOUT.door.w / 2 + 0.06) / 2, 0.06, l / 2 - 0.01]} s={[w / 2 - LAYOUT.door.x - LAYOUT.door.w / 2 - 0.06, 0.12, 0.02]} color={TRIM} />
      <Box p={[-w / 2 + 0.01, 0.06, 0]} s={[0.02, 0.12, l]} color={TRIM} />
      <Box p={[w / 2 - 0.01, 0.06, 0]} s={[0.02, 0.12, l]} color={TRIM} />
      {/* Crown trim */}
      <Box p={[0, h - 0.04, -l / 2 + 0.01]} s={[w, 0.08, 0.02]} color={TRIM} />
      <Box p={[0, h - 0.04, l / 2 - 0.01]} s={[w, 0.08, 0.02]} color={TRIM} />
      <Box p={[-w / 2 + 0.01, h - 0.04, 0]} s={[0.02, 0.08, l]} color={TRIM} />
      <Box p={[w / 2 - 0.01, h - 0.04, 0]} s={[0.02, 0.08, l]} color={TRIM} />

      {/* Contact shading where walls meet the floor */}
      {(
        [
          [0, -l / 2 + 0.2, 0, w],
          [0, l / 2 - 0.2, Math.PI, w],
          [-w / 2 + 0.2, 0, Math.PI / 2, l],
          [w / 2 - 0.2, 0, -Math.PI / 2, l],
        ] as Array<[number, number, number, number]>
      ).map(([x, z, ry, len], i) => (
        <mesh key={i} position={[x, 0.002, z]} rotation={[-Math.PI / 2, 0, ry]}>
          <planeGeometry args={[len, 0.4]} />
          <meshBasicMaterial color="#000" transparent opacity={0.08} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
