// Ergonomic office chair (reference: user photo): teal upholstery in a black frame.
// Built facing +Z, rotated to face the desk.
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { LAYOUT } from "./layout";
import { input } from "./input";
import { useSurfaceMap } from "./SurfaceMaps";

const PLASTIC = { color: "#141416", roughness: 0.45, metalness: 0.05 };
const TEAL = "#08434d";

/** Curved upholstered backrest panel (section of a cylinder). */
function CurvedPanel({ w, h, r, tex }: { w: number; h: number; r: number; tex: THREE.Texture }) {
  const geo = useMemo(() => {
    const a = w / r;
    const gm = new THREE.CylinderGeometry(r, r, h, 24, 1, true, Math.PI - a / 2, a);
    gm.translate(0, 0, r);
    return gm;
  }, [w, h, r]);
  return (
    <mesh geometry={geo} castShadow>
      <meshPhysicalMaterial map={tex} bumpMap={tex} bumpScale={0.003} side={THREE.DoubleSide} color={TEAL} roughness={0.95} sheen={0.6} sheenRoughness={0.6} sheenColor="#3f95a0" />
    </mesh>
  );
}

function Frame({ w, h, r }: { w: number; h: number; r: number }) {
  const geo = useMemo(() => {
    const a = w / 2 / r;
    const pts: THREE.Vector3[] = [];
    const n = 14;
    const edge = (t: number, y: number) => new THREE.Vector3(Math.sin(t) * r, y, r - Math.cos(t) * r);
    for (let i = 0; i <= n; i++) pts.push(edge(-a + (2 * a * i) / n, h / 2 - 0.02 * Math.sin((i / n) * Math.PI)));
    for (let i = 0; i <= n; i++) pts.push(edge(a - (2 * a * i) / n, -h / 2));
    const curve = new THREE.CatmullRomCurve3(pts, true, "centripetal");
    return new THREE.TubeGeometry(curve, 120, 0.022, 8, true);
  }, [w, h, r]);
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial {...PLASTIC} />
    </mesh>
  );
}

function Caster({ a }: { a: number }) {
  const x = Math.sin(a) * 0.33, z = Math.cos(a) * 0.33;
  return (
    <group position={[x, 0.035, z]} rotation-y={a}>
      {[-0.012, 0.012].map((o) => (
        <mesh key={o} position={[o, 0, 0.02]} rotation-z={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.018, 16]} />
          <meshStandardMaterial color="#0c0c0d" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 0.035, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.04, 8]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Arm({ s }: { s: number }) {
  return (
    <group position={[s * 0.29, 0, 0]}>
      {/* L-bracket from seat underside */}
      <RoundedBox args={[0.05, 0.03, 0.18]} radius={0.01} position={[-s * 0.02, 0.43, -0.03]} castShadow>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      <RoundedBox args={[0.045, 0.24, 0.07]} radius={0.015} position={[0, 0.56, -0.05]} castShadow>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      <RoundedBox args={[0.085, 0.03, 0.26]} radius={0.013} position={[0, 0.69, -0.01]} castShadow>
        <meshStandardMaterial color="#1c1c1f" roughness={0.75} />
      </RoundedBox>
    </group>
  );
}

export function OfficeChair() {
  const root = useRef<THREE.Group>(null);
  const swivel = useRef<THREE.Group>(null);
  const target = useRef(0);
  const { camera, gl } = useThree();
  useEffect(() => {
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const spin = (e: PointerEvent) => {
      if (!input.enabled || !root.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      if (document.pointerLockElement === gl.domElement) pointer.set(0, 0);
      else pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1);
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObject(root.current, true)[0];
      if (hit && hit.distance < 3) target.current += Math.PI / 2;
    };
    gl.domElement.addEventListener("pointerdown", spin);
    return () => gl.domElement.removeEventListener("pointerdown", spin);
  }, [camera, gl]);
  useFrame((_, raw) => {
    if (!swivel.current) return;
    swivel.current.rotation.y = THREE.MathUtils.damp(swivel.current.rotation.y, target.current, 5, Math.min(raw, 0.05));
  });
  const tex = useSurfaceMap("fabric", 3, 4);
  const headTex = useSurfaceMap("fabric", 2, 1);
  const seatTex = useSurfaceMap("fabric", 3, 3);
  const { x, z } = LAYOUT.chair;
  const seatY = 0.48;
  return (
    <group ref={root} name="reference-office-chair" position={[x, 0, z]} rotation-y={Math.PI / 2 + 0.25}>
      {/* 5-star base */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <group key={i}>
            <mesh position={[Math.sin(a) * 0.16, 0.085, Math.cos(a) * 0.16]} rotation={[0, a, 0]} castShadow>
              <boxGeometry args={[0.05, 0.035, 0.34]} />
              <meshStandardMaterial {...PLASTIC} />
            </mesh>
            <Caster a={a} />
          </group>
        );
      })}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.06, 20]} />
        <meshStandardMaterial {...PLASTIC} />
      </mesh>
      {/* gas cylinder */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.26, 16]} />
        <meshStandardMaterial color="#202022" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.038, 0.038, 0.14, 16]} />
        <meshStandardMaterial {...PLASTIC} />
      </mesh>
      {/* tilt mechanism + lever */}
      <group ref={swivel} name="chair-swivel">
      <RoundedBox args={[0.22, 0.05, 0.26]} radius={0.015} position={[0, 0.405, 0]} castShadow>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      <mesh position={[0.17, 0.4, 0.05]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
        <meshStandardMaterial {...PLASTIC} />
      </mesh>
      <mesh position={[-0.13, 0.36, 0.04]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
        <meshStandardMaterial {...PLASTIC} />
      </mesh>
      {/* seat: shell + fabric cushion with waterfall front */}
      <RoundedBox args={[0.5, 0.03, 0.48]} radius={0.012} position={[0, seatY - 0.035, 0]} castShadow>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      <RoundedBox args={[0.52, 0.07, 0.5]} radius={0.03} smoothness={5} position={[0, seatY + 0.01, 0.005]} castShadow receiveShadow>
        <meshPhysicalMaterial map={seatTex} bumpMap={seatTex} bumpScale={0.003} color={TEAL} roughness={0.95} sheen={0.7} sheenRoughness={0.6} sheenColor="#3f95a0" />
      </RoundedBox>
      <Arm s={-1} />
      <Arm s={1} />
      {/* back support spine */}
      <RoundedBox args={[0.07, 0.04, 0.2]} radius={0.012} position={[0, 0.42, -0.25]} castShadow>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      <group position={[0, 0.46, -0.34]} rotation-x={-0.12}>
        <RoundedBox args={[0.06, 0.32, 0.03]} radius={0.012} position={[0, 0.12, 0]} castShadow>
          <meshStandardMaterial {...PLASTIC} />
        </RoundedBox>
      </group>
      {/* mesh backrest, reclined slightly */}
      <group position={[0, 0.9, -0.3]} rotation-x={-0.12}>
        <group>
          <CurvedPanel w={0.48} h={0.62} r={0.35} tex={tex} />
          <Frame w={0.48} h={0.62} r={0.35} />
        </group>
        {/* lumbar pad */}
        <RoundedBox args={[0.3, 0.09, 0.025]} radius={0.01} position={[0, -0.16, 0.0]} castShadow>
          <meshStandardMaterial color="#06323a" roughness={0.9} />
        </RoundedBox>
        {/* headrest */}
        <RoundedBox args={[0.035, 0.12, 0.02]} radius={0.008} position={[0, 0.38, -0.02]} castShadow>
          <meshStandardMaterial {...PLASTIC} />
        </RoundedBox>
        <group position={[0, 0.47, 0]}>
          <CurvedPanel w={0.3} h={0.12} r={0.3} tex={headTex} />
          <Frame w={0.3} h={0.12} r={0.3} />
        </group>
      </group>
      </group>
    </group>
  );
}
