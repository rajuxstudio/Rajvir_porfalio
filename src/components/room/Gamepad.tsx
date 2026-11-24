// Detailed wireless gamepad on a charging cradle, modelled at real size (~16 cm wide).
// The body is an extruded, bevelled top-view outline: a black core with white wing shells,
// then sticks, d-pad, face buttons, touchpad with light bar, bumpers and triggers on top.
// Local frame: +X right, +Z toward the player (front of the grips), +Y up; base on y = 0.
import { useMemo } from "react";
import * as THREE from "three";

type V3 = [number, number, number];
const WHITE = { color: "#f3f3f5", roughness: 0.38 };
const BLACK = { color: "#141417", roughness: 0.55 };
const GLOSS = { color: "#1c1c20", roughness: 0.2, metalness: 0.1 };
const GREY = { color: "#9a9ca3", roughness: 0.4 };
const LIGHT = "#4f9dff";

const DEPTH = 0.02; // body thickness before bevel
const BEVEL = 0.006;
const TOP = DEPTH + BEVEL; // top surface height above the body's base plane

/** Top-view outline of the whole controller (x right, y away from the player). */
function bodyShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.034);
  s.bezierCurveTo(0.03, 0.036, 0.062, 0.04, 0.075, 0.028);
  s.bezierCurveTo(0.086, 0.017, 0.086, -0.004, 0.083, -0.022);
  s.bezierCurveTo(0.08, -0.045, 0.074, -0.066, 0.06, -0.068);
  s.bezierCurveTo(0.047, -0.07, 0.041, -0.055, 0.037, -0.035);
  s.bezierCurveTo(0.033, -0.02, 0.02, -0.014, 0, -0.014);
  s.bezierCurveTo(-0.02, -0.014, -0.033, -0.02, -0.037, -0.035);
  s.bezierCurveTo(-0.041, -0.055, -0.047, -0.07, -0.06, -0.068);
  s.bezierCurveTo(-0.074, -0.066, -0.08, -0.045, -0.083, -0.022);
  s.bezierCurveTo(-0.086, -0.004, -0.086, 0.017, -0.075, 0.028);
  s.bezierCurveTo(-0.062, 0.04, -0.03, 0.036, 0, 0.034);
  return s;
}

/** White shell over one wing and grip (side = 1 right, -1 left). */
function wingShape(side: number) {
  const k = side;
  const s = new THREE.Shape();
  s.moveTo(k * 0.05, 0.039);
  s.bezierCurveTo(k * 0.064, 0.039, k * 0.072, 0.034, k * 0.076, 0.028);
  s.bezierCurveTo(k * 0.087, 0.017, k * 0.087, -0.004, k * 0.084, -0.022);
  s.bezierCurveTo(k * 0.081, -0.046, k * 0.075, -0.067, k * 0.06, -0.069);
  s.bezierCurveTo(k * 0.046, -0.071, k * 0.04, -0.056, k * 0.037, -0.036);
  // inner edge stays outboard of the sticks, leaving the black core visible down the middle
  s.bezierCurveTo(k * 0.039, -0.02, k * 0.043, -0.004, k * 0.044, 0.012);
  s.bezierCurveTo(k * 0.045, 0.024, k * 0.046, 0.032, k * 0.05, 0.039);
  return s;
}

function extrude(shape: THREE.Shape, depth: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 32 });
  g.rotateX(-Math.PI / 2); // outline y → -z (away), extrusion → +y (up)
  return g;
}

function Stick({ p }: { p: V3 }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.002, 0]}>
        <cylinderGeometry args={[0.0125, 0.0125, 0.004, 32]} />
        <meshStandardMaterial {...GLOSS} />
      </mesh>
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[0.005, 0.006, 0.008, 16]} />
        <meshStandardMaterial {...BLACK} />
      </mesh>
      {/* cap with a raised grippy rim and dished centre */}
      <mesh position={[0, 0.0115, 0]} castShadow>
        <cylinderGeometry args={[0.0095, 0.0095, 0.004, 32]} />
        <meshStandardMaterial {...BLACK} />
      </mesh>
      <mesh position={[0, 0.0135, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.0085, 0.0013, 8, 32]} />
        <meshStandardMaterial color="#2a2a2f" roughness={0.8} />
      </mesh>
    </group>
  );
}

function DPad({ p }: { p: V3 }) {
  return (
    <group position={p}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation-y={(i * Math.PI) / 2}>
          <mesh position={[0, 0.0015, -0.0075]} castShadow>
            <boxGeometry args={[0.0065, 0.003, 0.009]} />
            <meshStandardMaterial {...GREY} />
          </mesh>
          {/* arrow notch */}
          <mesh position={[0, 0.0031, -0.0095]} rotation-x={-Math.PI / 2}>
            <circleGeometry args={[0.0018, 3]} />
            <meshStandardMaterial color="#6b6d74" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Four face buttons; the glyphs are simple grey marks (ring, cross, square, triangle). */
function FaceButtons({ p }: { p: V3 }) {
  const glyph = { color: "#5c5f66", roughness: 0.5 };
  const spots: [number, number][] = [[0, -0.0085], [0.0085, 0], [0, 0.0085], [-0.0085, 0]];
  return (
    <group position={p}>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.0016, 0]} castShadow>
            <cylinderGeometry args={[0.0042, 0.0042, 0.0032, 24]} />
            <meshStandardMaterial {...GREY} />
          </mesh>
          <group position={[0, 0.0033, 0]} rotation-x={-Math.PI / 2}>
            {i === 0 && (
              <mesh>
                <ringGeometry args={[0.0015, 0.0022, 20]} />
                <meshStandardMaterial {...glyph} />
              </mesh>
            )}
            {i === 1 && [1, -1].map((s) => (
              <mesh key={s} rotation-z={(s * Math.PI) / 4}>
                <planeGeometry args={[0.0045, 0.0007]} />
                <meshStandardMaterial {...glyph} />
              </mesh>
            ))}
            {i === 2 && (
              <mesh>
                <ringGeometry args={[0.0017, 0.0024, 3, 1, Math.PI / 2]} />
                <meshStandardMaterial {...glyph} />
              </mesh>
            )}
            {i === 3 && (
              <mesh>
                <ringGeometry args={[0.0016, 0.0023, 4, 1, Math.PI / 4]} />
                <meshStandardMaterial {...glyph} />
              </mesh>
            )}
          </group>
        </group>
      ))}
    </group>
  );
}

function Pill({ p, w = 0.006, rotY = 0 }: { p: V3; w?: number; rotY?: number }) {
  return (
    <mesh position={p} rotation={[0, rotY, Math.PI / 2]}>
      <capsuleGeometry args={[0.0014, w, 4, 8]} />
      <meshStandardMaterial {...GLOSS} />
    </mesh>
  );
}

export function Gamepad({ p, rotY = 0 }: { p: V3; rotY?: number }) {
  const geos = useMemo(
    () => ({
      body: extrude(bodyShape(), DEPTH, BEVEL),
      wingL: extrude(wingShape(-1), DEPTH + 0.0012, BEVEL + 0.0004),
      wingR: extrude(wingShape(1), DEPTH + 0.0012, BEVEL + 0.0004),
    }),
    [],
  );
  const lift = 0.012 + BEVEL; // cradle height, then body base above it
  return (
    <group position={p} rotation-y={rotY}>
      {/* charging cradle */}
      <mesh position={[0, 0.006, 0.005]} castShadow receiveShadow>
        <boxGeometry args={[0.13, 0.012, 0.075]} />
        <meshStandardMaterial {...BLACK} />
      </mesh>
      <mesh position={[0, 0.0122, 0.042]}>
        <boxGeometry args={[0.03, 0.0008, 0.002]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      <group position={[0, lift, 0]}>
        <mesh geometry={geos.body} castShadow receiveShadow>
          <meshStandardMaterial {...BLACK} />
        </mesh>
        <mesh geometry={geos.wingL} position={[0, -0.0006, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...WHITE} />
        </mesh>
        <mesh geometry={geos.wingR} position={[0, -0.0006, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...WHITE} />
        </mesh>

        {/* top surface details */}
        <group position={[0, TOP, 0]}>
          {/* touchpad: white, slightly raised, light bar glowing along both sides */}
          <mesh position={[0, 0.0012, -0.019]} castShadow>
            <boxGeometry args={[0.05, 0.0024, 0.026]} />
            <meshStandardMaterial {...WHITE} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.0262, 0.0008, -0.02]} rotation-y={s * 0.25}>
              <boxGeometry args={[0.0018, 0.0016, 0.024]} />
              <meshBasicMaterial color={LIGHT} toneMapped={false} />
            </mesh>
          ))}
          <Pill p={[-0.032, 0.0012, -0.026]} rotY={0.5} w={0.004} />
          <Pill p={[0.032, 0.0012, -0.026]} rotY={-0.5} w={0.004} />
          {/* home button and mute bar */}
          <mesh position={[0, 0.0012, 0.0045]}>
            <cylinderGeometry args={[0.0036, 0.0036, 0.0024, 24]} />
            <meshStandardMaterial {...GLOSS} />
          </mesh>
          <mesh position={[0, 0.0009, 0.0105]}>
            <boxGeometry args={[0.009, 0.0018, 0.0025]} />
            <meshStandardMaterial color="#f08a8a" roughness={0.4} />
          </mesh>
          <Stick p={[-0.023, 0, 0.012]} />
          <Stick p={[0.023, 0, 0.012]} />
          <DPad p={[-0.055, 0.0016, -0.008]} />
          <FaceButtons p={[0.055, 0.0016, -0.008]} />
          {/* speaker grille */}
          {[-0.004, 0, 0.004].map((x) => (
            <mesh key={x} position={[x, 0.0002, 0.0005]}>
              <cylinderGeometry args={[0.0006, 0.0006, 0.0006, 8]} />
              <meshStandardMaterial color="#000" />
            </mesh>
          ))}
        </group>

        {/* bumpers and triggers along the back edge */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.058, TOP / 2, -0.036]}>
            <mesh position={[0, 0.003, -0.002]} castShadow>
              <boxGeometry args={[0.03, 0.006, 0.006]} />
              <meshStandardMaterial {...BLACK} />
            </mesh>
            <mesh position={[0, -0.006, -0.008]} rotation-x={0.5} castShadow>
              <boxGeometry args={[0.024, 0.016, 0.009]} />
              <meshStandardMaterial {...BLACK} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
