// White-armoured trooper figure built from primitives (lathe-turned helmet, plated armour over
// a black undersuit). Modelled 1.8 m tall with its feet at the origin, facing +Z; `height`
// scales it, so the same build serves as the floor statue and smaller figurines.
import { useEffect, useMemo, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type V3 = [number, number, number];
const FULL = 1.8;
const ARMOR = { color: "#f4f4f1", roughness: 0.28, metalness: 0.02, clearcoat: 0.7, clearcoatRoughness: 0.2 };
const SUIT = { color: "#111113", roughness: 0.75 };
const GREY = { color: "#3b3f45", roughness: 0.45 };
const STRIPE = { color: "#5b78a6", roughness: 0.5 };

function Armor() {
  return <meshPhysicalMaterial {...ARMOR} />;
}

function Plate({ p, s, rot, r = 0.02 }: { p: V3; s: V3; rot?: V3; r?: number }) {
  return (
    <RoundedBox args={s} radius={Math.min(r, ...s.map((v) => v / 2.2))} smoothness={3} position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <Armor />
    </RoundedBox>
  );
}

function Tube({ p, r0, r1, h, rot, mat = "armor" }: { p: V3; r0: number; r1: number; h: number; rot?: V3; mat?: "armor" | "suit" | "grey" }) {
  return (
    <mesh position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[r0, r1, h, 24]} />
      {mat === "armor" ? <Armor /> : <meshStandardMaterial {...(mat === "suit" ? SUIT : GREY)} />}
    </mesh>
  );
}

function Detail({ p, s, rot, m = SUIT }: { p: V3; s: V3; rot?: V3; m?: { color: string; roughness: number } }) {
  return (
    <mesh position={p} rotation={rot ?? [0, 0, 0]}>
      <boxGeometry args={s} />
      <meshStandardMaterial {...m} />
    </mesh>
  );
}

/** Surface of revolution from [radius, y] pairs; `sz` squashes/stretches front-to-back. */
function Lathe({ pts, p = [0, 0, 0], sz = 1, phi = Math.PI * 2 }: { pts: [number, number][]; p?: V3; sz?: number; phi?: number }) {
  const geo = useMemo(() => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 40, 0, phi), [pts, phi]);
  return (
    <mesh geometry={geo} position={p} scale={[1, 1, sz]} castShadow receiveShadow>
      <meshPhysicalMaterial {...ARMOR} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Dome, cheeks and the flared lower rim of the helmet, top at y = +0.17.
const HELMET_PROFILE: [number, number][] = [
  [0.001, 0.17], [0.05, 0.166], [0.088, 0.148], [0.112, 0.115], [0.124, 0.065], [0.126, 0.01],
  [0.121, -0.045], [0.127, -0.085], [0.142, -0.115], [0.153, -0.132], [0.146, -0.14],
];
const BELL_PROFILE: [number, number][] = [[0.001, 0.05], [0.04, 0.046], [0.065, 0.03], [0.08, 0.0], [0.084, -0.03], [0.08, -0.034]];

function Helmet() {
  return (
    <group position={[0, 1.63, 0]}>
      <Lathe pts={HELMET_PROFILE} sz={1.1} />
      {/* brow ridge sweeping over the eyes */}
      <Plate p={[0, 0.04, 0.112]} s={[0.21, 0.03, 0.05]} rot={[0.2, 0, 0]} r={0.012} />
      {/* faceplate / muzzle, angled so the chin juts forward */}
      <Plate p={[0, -0.035, 0.112]} s={[0.155, 0.12, 0.06]} rot={[-0.22, 0, 0]} r={0.032} />
      <Plate p={[0, -0.098, 0.132]} s={[0.095, 0.05, 0.05]} rot={[-0.35, 0, 0]} r={0.022} />
      {/* teardrop eye lenses, outer corners dipping down */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.05, 0.004, 0.146]} rotation={[0.1, s * 0.35, -s * 0.6]} scale={[1.5, 0.95, 0.4]}>
          <sphereGeometry args={[0.036, 18, 12]} />
          <meshStandardMaterial color="#050506" roughness={0.08} metalness={0.4} />
        </mesh>
      ))}
      {/* nose ridge between the lenses */}
      <Detail p={[0, -0.025, 0.15]} s={[0.01, 0.045, 0.01]} rot={[-0.22, 0, 0]} m={GREY} />
      {/* the "frown": grey vent plate with vertical teeth */}
      <Detail p={[0, -0.088, 0.158]} s={[0.085, 0.024, 0.008]} rot={[-0.35, 0, 0]} m={GREY} />
      {Array.from({ length: 7 }, (_, i) => (
        <Detail key={i} p={[-0.036 + i * 0.012, -0.088, 0.163]} s={[0.004, 0.018, 0.004]} rot={[-0.35, 0, 0]} />
      ))}
      {/* cheek tubes running from the frown back toward the ears */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Tube p={[s * 0.075, -0.07, 0.125]} r0={0.006} r1={0.006} h={0.06} rot={[0, 0, s * 0.9]} mat="grey" />
          <Tube p={[s * 0.127, -0.01, 0]} r0={0.034} r1={0.034} h={0.02} rot={[0, 0, Math.PI / 2]} />
          <Tube p={[s * 0.138, -0.01, 0]} r0={0.014} r1={0.014} h={0.006} rot={[0, 0, Math.PI / 2]} mat="grey" />
          {/* blue-grey side stripes behind the ear caps */}
          {[0, 1, 2].map((j) => (
            <Detail key={j} p={[s * 0.123, -0.06 + j * 0.012, -0.05]} s={[0.006, 0.006, 0.05]} m={STRIPE} />
          ))}
        </group>
      ))}
      {/* dark band around the back rim */}
      <Detail p={[0, -0.1, -0.13]} s={[0.12, 0.012, 0.01]} m={GREY} />
    </group>
  );
}

function Arm({ s }: { s: number }) {
  // the right arm bends a little more to hold the blaster at the hip
  const bend = s > 0 ? 0.35 : 0.12;
  return (
    <group position={[s * 0.215, 1.43, 0]} rotation={[0, 0, s * 0.1]}>
      <Lathe pts={BELL_PROFILE} p={[0, 0.0, 0]} sz={1.15} />
      <Tube p={[0, -0.14, 0]} r0={0.04} r1={0.038} h={0.26} mat="suit" />
      <Tube p={[0, -0.13, 0.004]} r0={0.047} r1={0.044} h={0.16} />
      <group position={[0, -0.28, 0]} rotation-x={-bend}>
        <Tube p={[0, 0, 0]} r0={0.038} r1={0.038} h={0.05} mat="suit" />
        <Tube p={[0, -0.13, 0.004]} r0={0.044} r1={0.036} h={0.19} />
        <Tube p={[0, -0.13, 0.004]} r0={0.039} r1={0.033} h={0.22} mat="suit" />
        {/* glove */}
        <mesh position={[0, -0.27, 0.01]} scale={[0.85, 1.25, 1]} castShadow>
          <sphereGeometry args={[0.04, 14, 10]} />
          <meshStandardMaterial {...SUIT} />
        </mesh>
      </group>
    </group>
  );
}

function Leg({ s }: { s: number }) {
  return (
    <group position={[s * 0.092, 0, 0]}>
      <Tube p={[0, 0.79, 0]} r0={0.068} r1={0.058} h={0.32} mat="suit" />
      <Tube p={[0, 0.8, 0.004]} r0={0.074} r1={0.064} h={0.24} />
      <Tube p={[0, 0.585, 0]} r0={0.054} r1={0.054} h={0.09} mat="suit" />
      {/* knee guard only on the left leg, as on the real armour */}
      {s < 0 && <Plate p={[0, 0.59, 0.05]} s={[0.085, 0.08, 0.035]} r={0.016} />}
      <Tube p={[0, 0.36, 0.004]} r0={0.064} r1={0.05} h={0.34} />
      <Detail p={[0, 0.42, 0.064]} s={[0.03, 0.06, 0.006]} m={GREY} />
      {/* boot */}
      <Plate p={[0, 0.075, 0.03]} s={[0.1, 0.12, 0.2]} r={0.035} />
      <Plate p={[0, 0.04, 0.115]} s={[0.095, 0.07, 0.07]} r={0.03} />
      <Detail p={[0, 0.006, 0.04]} s={[0.1, 0.012, 0.23]} />
    </group>
  );
}

function Torso() {
  return (
    <group>
      {/* collar and neck */}
      <Tube p={[0, 1.495, 0]} r0={0.05} r1={0.06} h={0.06} mat="suit" />
      <Tube p={[0, 1.462, 0]} r0={0.08} r1={0.125} h={0.04} />
      {/* chest plate with centre control box and grooves; back plate */}
      <Plate p={[0, 1.35, 0.025]} s={[0.34, 0.22, 0.16]} r={0.06} />
      <Plate p={[0, 1.33, -0.07]} s={[0.31, 0.25, 0.09]} r={0.035} />
      <Detail p={[0, 1.355, 0.106]} s={[0.065, 0.04, 0.008]} m={{ color: "#c9ccd1", roughness: 0.4 }} />
      {[-0.01, 0.01].map((dy) => (
        <Detail key={dy} p={[0, 1.395 + dy * 2, 0.104]} s={[0.15, 0.004, 0.006]} m={GREY} />
      ))}
      {/* black midriff with three rows of ab plates */}
      <Tube p={[0, 1.18, 0]} r0={0.112} r1={0.122} h={0.16} mat="suit" />
      {[1.235, 1.19, 1.145].map((y) =>
        [-1, 1].map((sx) => <Plate key={`${y}${sx}`} p={[sx * 0.032, y, 0.112]} s={[0.054, 0.036, 0.02]} r={0.008} />),
      )}
      {/* belt with pouches and buckle */}
      <Tube p={[0, 1.075, 0]} r0={0.128} r1={0.132} h={0.05} />
      <Detail p={[0, 1.075, 0.134]} s={[0.07, 0.042, 0.008]} m={{ color: "#c9ccd1", roughness: 0.35 }} />
      {[-0.11, -0.075, 0.075, 0.11].map((x) => (
        <Plate key={x} p={[x, 1.075, 0.115]} s={[0.032, 0.045, 0.03]} rot={[0, x * 3, 0]} r={0.008} />
      ))}
      {/* hips, codpiece and rear plate */}
      <Tube p={[0, 0.99, 0]} r0={0.125} r1={0.12} h={0.09} mat="suit" />
      <Plate p={[0, 0.98, 0.075]} s={[0.15, 0.12, 0.05]} rot={[0.15, 0, 0]} r={0.025} />
      <Plate p={[0, 0.99, -0.08]} s={[0.2, 0.11, 0.05]} r={0.025} />
    </group>
  );
}

/** Short black blaster held at the right hip, muzzle angled down and forward. */
function Blaster() {
  return (
    <group position={[0.24, 0.93, 0.13]} rotation={[0.9, 0, 0.05]}>
      <Tube p={[0, 0, 0]} r0={0.016} r1={0.016} h={0.3} rot={[Math.PI / 2, 0, 0]} mat="suit" />
      {Array.from({ length: 5 }, (_, i) => (
        <Tube key={i} p={[0, 0, 0.04 + i * 0.022]} r0={0.018} r1={0.018} h={0.006} rot={[Math.PI / 2, 0, 0]} mat="grey" />
      ))}
      <Tube p={[0, 0.03, -0.02]} r0={0.008} r1={0.008} h={0.11} rot={[Math.PI / 2, 0, 0]} mat="grey" />
      <Detail p={[0, -0.045, -0.05]} s={[0.022, 0.07, 0.03]} rot={[-0.25, 0, 0]} />
      <Detail p={[0, -0.02, 0.03]} s={[0.012, 0.06, 0.02]} />
      <Detail p={[0, 0.005, -0.17]} s={[0.014, 0.022, 0.08]} />
    </group>
  );
}

export function Trooper({ position, height = FULL, rotY = 0, base = true }: { position: V3; height?: number; rotY?: number; base?: boolean }) {
  const k = height / FULL;
  return (
    <group position={position} rotation-y={rotY} scale={k}>
      {base && (
        <mesh position={[0, -0.02, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[0.3, 0.32, 0.04, 40]} />
          <meshStandardMaterial color="#1a1a1c" roughness={0.4} metalness={0.3} />
        </mesh>
      )}
      <Leg s={-1} />
      <Leg s={1} />
      <Torso />
      <Helmet />
      <Arm s={-1} />
      <Arm s={1} />
      <Blaster />
    </group>
  );
}

// "Dancing Stormtrooper" by StrykerDoesAnimation, CC BY 4.0 (see public/models/stormtrooper/CREDITS.txt).
const STATUE_URL = `${import.meta.env.BASE_URL}models/stormtrooper/stormtrooper.dae`;
const POSE_TIME = -1; // seconds into the dance clip for the statue pose; negative keeps the rest pose

/** Swings both upper arms down from the rig's A-pose so the statue stands relaxed. */
function relaxArms(model: THREE.Object3D, maxDrop = 0.6) {
  const down = new THREE.Vector3(0, -1, 0);
  for (const side of ["Left", "Right"]) {
    let arm: THREE.Object3D | undefined;
    model.traverse((o) => {
      if (!arm && (o as THREE.Bone).isBone && o.name.endsWith(`${side}Arm`)) arm = o;
    });
    const fore = arm?.children.find((c) => (c as THREE.Bone).isBone);
    if (!arm?.parent || !fore) continue;
    model.updateMatrixWorld(true);
    const dir = fore.getWorldPosition(new THREE.Vector3()).sub(arm.getWorldPosition(new THREE.Vector3())).normalize();
    const angle = Math.min(maxDrop, dir.angleTo(down) - 0.2);
    if (angle <= 0) continue;
    const axis = dir.clone().cross(down).normalize();
    const world = new THREE.Quaternion().setFromAxisAngle(axis, angle).multiply(arm.getWorldQuaternion(new THREE.Quaternion()));
    arm.quaternion.copy(arm.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(world));
  }
}

/** Loads the rigged model and freezes it in one pose, fitted to `height` with feet at y=0. */
async function loadStatue(height: number) {
  const { ColladaLoader } = await import("three/examples/jsm/loaders/ColladaLoader.js");
  const collada = await new ColladaLoader().loadAsync(STATUE_URL);
  if (!collada) throw new Error("unreadable statue model");
  const model = collada.scene;
  const clip = model.animations[0];
  if (clip && POSE_TIME >= 0) {
    const mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(clip).play();
    mixer.setTime(POSE_TIME);
  } else {
    relaxArms(model);
  }
  model.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) o.castShadow = o.receiveShadow = true;
  });
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model, true);
  const k = height / Math.max(box.max.y - box.min.y, 1e-6);
  model.scale.multiplyScalar(k);
  model.updateMatrixWorld(true);
  box.setFromObject(model, true);
  const c = box.getCenter(new THREE.Vector3());
  model.position.sub(new THREE.Vector3(c.x, box.min.y, c.z));
  const g = new THREE.Group();
  g.add(model);
  g.rotation.y = Math.PI; // the export faces -Z; turn it toward the room like the built-in one
  return g;
}

/** Floor statue: the detailed downloaded trooper, with the built-in one shown until it loads. */
export function TrooperStatue({ position, height, rotY = 0 }: { position: V3; height: number; rotY?: number }) {
  const [model, setModel] = useState<THREE.Group | null>(null);
  useEffect(() => {
    let live = true;
    loadStatue(height)
      .then((g) => live && setModel(g))
      .catch(() => {
        // keep the built-in trooper if the file is missing or unreadable
      });
    return () => {
      live = false;
    };
  }, [height]);
  if (!model) return <Trooper position={position} height={height} rotY={rotY} />;
  return (
    <group position={position} rotation-y={rotY}>
      <mesh position={[0, -0.02, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.24, 0.26, 0.04, 40]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.4} metalness={0.3} />
      </mesh>
      <primitive object={model} />
    </group>
  );
}
