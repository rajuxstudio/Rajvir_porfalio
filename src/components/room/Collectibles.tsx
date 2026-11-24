// Collectibles on the open oak shelf of the TV wall: an anime figure, two toy cars and a
// spinning desk globe. Models are CC0 / public domain; see public/models/shelf/CREDITS.txt.
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";

type V3 = [number, number, number];
const HL = ROOM.length / 2;
const S = LAYOUT.tvWall.openShelf;
const ZC = -HL + S.d / 2;
/** Top surface of shelf board i (0 = bottom). */
const shelfTop = (i: number) => (S.levels[i] ?? 0) + S.board / 2;

const KIRA = `${import.meta.env.BASE_URL}models/shelf/kira.glb`;
const CAR = `${import.meta.env.BASE_URL}models/shelf/ToyCar.glb`;
const EARTH = `${import.meta.env.BASE_URL}models/shelf/earth.jpg`;
// stable references so the fitted clones are built once
const KIRA_NODES = ["Kira"];
const KIRA_SEAT = { bone: "spine_03", height: 0.36 };
const CAR_NODES = ["ToyCar", "Glass"];

/**
 * Clones the named nodes out of a glTF scene and fits them: `size` is the target height
 * ("height") or longest horizontal side ("length"), with the base resting on y = 0.
 */
function Fitted({ url, nodes, size, fit, p, rotY = 0, tint, seat }: { url: string; nodes: string[]; size: number; fit: "height" | "length"; p: V3; rotY?: number; tint?: string; seat?: { bone: string; height: number } }) {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => {
    const g = new THREE.Group();
    for (const name of nodes) {
      const src = scene.getObjectByName(name);
      if (src) g.add(cloneSkinned(src));
    }
    g.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = m.receiveShadow = true;
      if (tint && !Array.isArray(m.material) && (m.material as THREE.MeshStandardMaterial).color) {
        const mat = (m.material as THREE.MeshStandardMaterial).clone();
        // the toy car's paint is a texture, so tint multiplies it; leave glass alone
        if (!mat.name.toLowerCase().includes("glass")) mat.color.set(tint);
        m.material = mat;
      }
    });
    g.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(g, true);
    const dim = box.getSize(new THREE.Vector3());
    const k = size / (fit === "height" ? dim.y : Math.max(dim.x, dim.z));
    g.scale.setScalar(k);
    g.updateMatrixWorld(true);
    box.setFromObject(g, true);
    const c = box.getCenter(new THREE.Vector3());
    g.position.set(-c.x, -box.min.y, -c.z);
    const outer = new THREE.Group();
    outer.add(g);
    // seated figures get a display block under the hips (seat.height is a fraction of the figure)
    const hip = seat && g.getObjectByName(seat.bone);
    if (seat && hip) {
      outer.updateMatrixWorld(true);
      const at = outer.worldToLocal(hip.getWorldPosition(new THREE.Vector3()));
      const top = size * seat.height;
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(size * 0.3, top, size * 0.28),
        new THREE.MeshStandardMaterial({ color: "#efece6", roughness: 0.35 }),
      );
      block.position.set(at.x, top / 2, at.z);
      block.castShadow = block.receiveShadow = true;
      outer.add(block);
    }
    return outer;
  }, [scene, nodes, size, fit, tint, seat]);
  return <primitive object={obj} position={p} rotation-y={rotY} />;
}

/** Desk globe: NASA Earth on a tilted axis inside a brass half-meridian, slowly turning. */
function Globe({ p }: { p: V3 }) {
  const earth = useMemo(() => {
    const t = new THREE.TextureLoader().load(EARTH);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  const spin = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.15;
  });
  const r = 0.095;
  const brass = { color: "#b08d57", roughness: 0.3, metalness: 0.9 };
  const cy = 0.035 + 0.06 + r; // base + stem, then globe centre
  return (
    <group position={p}>
      <mesh position={[0, 0.0175, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.07, 0.035, 32]} />
        <meshStandardMaterial color="#3a2a1f" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.035 + 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.012, 0.06, 12]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <group position={[0, cy, 0]} rotation-z={0.41}>
        <mesh ref={spin} castShadow>
          <sphereGeometry args={[r, 48, 32]} />
          <meshStandardMaterial map={earth} roughness={0.55} metalness={0.05} />
        </mesh>
        {/* half meridian ring with axis pins */}
        <mesh rotation-y={Math.PI / 2}>
          <torusGeometry args={[r + 0.012, 0.004, 8, 48, Math.PI]} />
          <meshStandardMaterial {...brass} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0, s * (r + 0.006), 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.014, 8]} />
            <meshStandardMaterial {...brass} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function Collectibles() {
  const x = S.x;
  return (
    <Suspense fallback={null}>
      {/* top inner shelf: anime figure on a small display disc */}
      <group position={[x, shelfTop(3), ZC]}>
        <mesh position={[0, 0.006, 0]} receiveShadow>
          <cylinderGeometry args={[0.07, 0.075, 0.012, 32]} />
          <meshStandardMaterial color="#141416" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>
      <Fitted url={KIRA} nodes={KIRA_NODES} fit="height" size={0.3} p={[x, shelfTop(3) + 0.012, ZC]} rotY={0.25} seat={KIRA_SEAT} />
      {/* warm puck light under the top board so the display reads against the navy wall */}
      <pointLight position={[x, S.h - 0.08, ZC + 0.1]} color="#ffd9a6" intensity={0.8} distance={2} decay={2} />
      {/* third shelf: globe */}
      <Globe p={[x, shelfTop(2), ZC]} />
      {/* second shelf: two toy cars parked nose to tail */}
      <Fitted url={CAR} nodes={CAR_NODES} fit="length" size={0.2} p={[x - 0.1, shelfTop(1), ZC]} rotY={0.5} />
      <Fitted url={CAR} nodes={CAR_NODES} fit="length" size={0.2} p={[x + 0.11, shelfTop(1), ZC + 0.02]} rotY={-0.4} tint="#8fb6ff" />
    </Suspense>
  );
}

useGLTF.preload(KIRA);
useGLTF.preload(CAR);
