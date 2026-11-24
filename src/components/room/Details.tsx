import { useMemo } from "react";
import * as THREE from "three";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";
import { roughNoise } from "./textures";
import { RoundedBox } from "@react-three/drei";

let _rn: THREE.Texture | null = null;
const rn = () => (_rn ??= roughNoise());

type V3 = [number, number, number];
const HW = ROOM.width / 2;
const HL = ROOM.length / 2;

function B({ p, s, c, r = 0.7, m = 0, rot }: { p: V3; s: V3; c: string; r?: number; m?: number; rot?: V3 }) {
  return (
    <RoundedBox args={s} radius={Math.min(0.008, ...s.map((v) => v / 4))} smoothness={2} position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <meshPhysicalMaterial color={c} roughness={r} roughnessMap={rn()} metalness={m} clearcoat={m > 0.3 ? 0.4 : 0} clearcoatRoughness={0.3} sheen={r > 0.85 ? 0.6 : 0} sheenRoughness={0.8} />
    </RoundedBox>
  );
}

function Cable({ pts, r = 0.006, c = "#111" }: { pts: V3[]; r?: number; c?: string }) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 64, r, 6, false);
  }, [pts, r]);
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial color={c} roughness={0.5} />
    </mesh>
  );
}

function Mug({ p, c = "#e8e2d8", coffee = true }: { p: V3; c?: string; coffee?: boolean }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.037, 0.1, 24, 1, true]} />
        <meshStandardMaterial color={c} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.002, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.037, 24]} />
        <meshStandardMaterial color={c} roughness={0.3} />
      </mesh>
      {coffee && (
        <mesh position={[0, 0.07, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.038, 24]} />
          <meshStandardMaterial color="#2a1608" roughness={0.05} />
        </mesh>
      )}
      <mesh position={[0.045, 0.05, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.022, 0.006, 8, 16, Math.PI]} />
        <meshStandardMaterial color={c} roughness={0.25} />
      </mesh>
      {/* coffee ring stain */}
      <mesh position={[0.03, 0.0005, 0.04]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.034, 0.039, 32]} />
        <meshBasicMaterial color="#5a3a1c" transparent opacity={0.25} depthWrite={false} />
      </mesh>
    </group>
  );
}

function DeskSetup() {
  const { x, z, h } = LAYOUT.desk;
  const top = h;
  return (
    <group>
      {/* cables: monitor + laptop -> behind desk -> floor -> outlet */}
      <Cable pts={[[x + 0.25, top + 0.1, z + 0.08], [HW - 0.04, top - 0.05, z + 0.15], [HW - 0.03, 0.4, z + 0.5], [HW - 0.04, 0.02, z + 0.9], [HW - 0.04, 0.02, z + 1.2], [HW - 0.02, 0.3, z + 1.35]]} />
      <Cable pts={[[x + 0.12, top + 0.05, z - 0.42], [HW - 0.05, top - 0.08, z - 0.3], [HW - 0.05, 0.3, z - 0.1], [HW - 0.05, 0.02, z + 0.4], [HW - 0.06, 0.02, z + 0.7]]} r={0.004} c="#222" />
      {/* wall outlet + power strip */}
      <B p={[HW - 0.006, 0.3, z + 1.35]} s={[0.012, 0.11, 0.07]} c="#e6e3dd" />
      <B p={[HW - 0.06, 0.02, z + 0.8]} s={[0.05, 0.035, 0.3]} c="#ddd" r={0.5} />
    </group>
  );
}

function LivedIn() {
  const bed = LAYOUT.bed;
  const bs = LAYOUT.bedside;
  return (
    <group>
      {/* sneakers */}
      {[0, 1].map((i) => (
        <group key={i} position={[0.9 + i * 0.16, 0, HL - 0.3 - i * 0.05]} rotation-y={0.3 + i * 0.5}>
          <B p={[0, 0.02, 0]} s={[0.1, 0.035, 0.28]} c="#e9e7e2" r={0.7} />
          <B p={[0, 0.06, -0.03]} s={[0.09, 0.06, 0.2]} c="#2b2b2f" r={0.9} />
        </group>
      ))}
      {/* bedside: book stack + mug */}
      <group position={[bs.x - 0.1, bs.h, bs.z + 0.1]}>
        <B p={[0, 0.015, 0.05]} s={[0.15, 0.03, 0.21]} rot={[0, 0.2, 0]} c="#7a2a2a" r={0.9} />
        <B p={[0.01, 0.045, 0.04]} s={[0.13, 0.03, 0.19]} rot={[0, -0.1, 0]} c="#2f4a5a" r={0.9} />
        <B p={[-0.005, 0.07, 0.05]} s={[0.12, 0.02, 0.17]} rot={[0, 0.35, 0]} c="#d8cfbd" r={0.9} />
        <Mug p={[0.22, 0, 0]} c="#b8553a" coffee={false} />
      </group>
      {/* ceiling pendant */}
      <group position={[0, ROOM.height, 0.3]}>
        <Cable pts={[[0, 0, 0], [0, -0.3, 0], [0, -0.6, 0]]} r={0.004} />
        <mesh position={[0, -0.68, 0]} castShadow>
          <coneGeometry args={[0.18, 0.16, 32, 1, true]} />
          <meshStandardMaterial color="#1d1d1f" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.72, 0]}>
          <sphereGeometry args={[0.04, 16, 12]} />
          <meshStandardMaterial color="#fff" emissive="#ffd9a0" emissiveIntensity={4} />
        </mesh>
      </group>
    </group>
  );
}

export function Details() {
  return (
    <group>
      <DeskSetup />
      <LivedIn />
    </group>
  );
}
