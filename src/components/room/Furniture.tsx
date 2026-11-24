import * as THREE from "three";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";
import { WOOD } from "./Room";
import { Workstation } from "./Workstation";
import { TvWall } from "./TvWall";
import { NeonSign } from "./NeonSign";
import { CertificateWall } from "./CertificateWall";
import { IdCardWall } from "./IdCardHolder";
import { RoundedBox } from "@react-three/drei";
import { useSurfaceMap } from "./SurfaceMaps";

type V3 = [number, number, number];
const RED = "#9e1b22";
const BLACK = "#1c1b1d";

function Box({ p, s, c, r = 0.8, m = 0, rot }: { p: V3; s: V3; c: string; r?: number; m?: number; rot?: V3 }) {
  return (
    <RoundedBox args={s} radius={Math.min(0.012, ...s.map((v) => v / 4))} smoothness={2} position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={c} roughness={r} metalness={m} />
    </RoundedBox>
  );
}


/** Soft furnishing: rounded box in woven fabric. */
// tint=false keeps the weave as bump only, so light fabrics stay clean instead of muddy
function Soft({ p, s, c, rad = 0.03, rot, sheen = 0.5, tint = true }: { p: V3; s: V3; c: string; rad?: number; rot?: V3; sheen?: number; tint?: boolean }) {
  const fabric = useSurfaceMap("fabric", 3, 3);
  return (
    <RoundedBox args={s} radius={Math.min(rad, ...s.map((v) => v / 2.01))} smoothness={4} position={p} rotation={rot ?? [0, 0, 0]} castShadow receiveShadow>
      <meshPhysicalMaterial map={tint ? fabric : null} bumpMap={fabric} bumpScale={0.002} color={c} roughness={0.95} sheen={sheen} sheenRoughness={0.8} sheenColor="#ffffff" />
    </RoundedBox>
  );
}

const UPHOLSTERY = "#c9bca8"; // warm greige frame + headboard
const SHEET = "#f4f2ed";
const DUVET = "#e2dace"; // oatmeal linen
const DUVET_IN = "#ece7de"; // lighter reverse, shows on the fold
const THROW = "#a8553a"; // rust, picks up the zig-zag cushions

/** Modern upholstered platform bed: channel-tufted headboard, deep mattress, duvet with folded top, pillows and a throw. */
function Bed() {
  const { x, z, w, l } = LAYOUT.bed;
  const z0 = z - l / 2; // foot
  const z1 = z + l / 2; // head (front wall)
  const baseTop = 0.32;
  const mTop = baseTop + 0.22; // mattress top
  const mL = l - 0.16; // mattress length (headboard + small foot lip)
  const mZ0 = z0 + 0.04;
  const duvL = mL - 0.42; // duvet stops short of the pillows
  const duvZ = mZ0 + duvL / 2;
  const hbW = w + 0.12;
  const channels = 6;
  return (
    <group>
      {/* upholstered platform on short oak legs */}
      <Soft p={[x, 0.19, z - 0.03]} s={[w + 0.06, 0.26, l - 0.06]} c={UPHOLSTERY} rad={0.04} sheen={0.3} />
      {([[-1, -1], [1, -1], [-1, 1], [1, 1]] as [number, number][]).map(([a, b], i) => (
        <Box key={i} p={[x + a * (w / 2 - 0.04), 0.03, z - 0.03 + b * (l / 2 - 0.1)]} s={[0.05, 0.06, 0.05]} c={WOOD} />
      ))}
      {/* headboard: backing board + vertical channel cushions */}
      <Soft p={[x, 0.82, z1 - 0.035]} s={[hbW, 1.04, 0.07]} c={UPHOLSTERY} rad={0.03} sheen={0.3} />
      {Array.from({ length: channels }, (_, i) => {
        const cw = hbW / channels;
        return <Soft key={i} p={[x - hbW / 2 + cw * (i + 0.5), 0.86, z1 - 0.09]} s={[cw - 0.006, 0.9, 0.06]} c={UPHOLSTERY} rad={0.028} sheen={0.3} />;
      })}
      {/* mattress in a white fitted sheet */}
      <Soft p={[x, baseTop + 0.11, mZ0 + mL / 2]} s={[w - 0.04, 0.22, mL]} c={SHEET} rad={0.05} sheen={0.2} tint={false} />
      {/* duvet: top + soft drapes over both sides and the foot */}
      <Soft p={[x, mTop + 0.03, duvZ]} s={[w + 0.02, 0.06, duvL]} c={DUVET} rad={0.028} tint={false} />
      {[-1, 1].map((sd) => (
        <Soft key={sd} p={[x + sd * (w / 2 + 0.002), mTop - 0.09, duvZ]} s={[0.03, 0.24, duvL]} c={DUVET} rad={0.014} rot={[0, 0, sd * 0.06]} tint={false} />
      ))}
      <Soft p={[x, mTop - 0.09, mZ0 - 0.012]} s={[w + 0.03, 0.24, 0.03]} c={DUVET} rad={0.014} rot={[-0.06, 0, 0]} tint={false} />
      {/* folded-back top edge */}
      <Soft p={[x, mTop + 0.07, mZ0 + duvL - 0.11]} s={[w + 0.03, 0.06, 0.24]} c={DUVET_IN} rad={0.028} tint={false} />
      {/* two sleeping pillows leaning on the headboard */}
      {[-1, 1].map((sd) => (
        <Soft key={sd} p={[x + sd * (w / 4 + 0.005), mTop + 0.09, z1 - 0.28]} s={[w / 2 - 0.04, 0.14, 0.36]} c={SHEET} rad={0.065} rot={[-0.35, 0, 0]} sheen={0.2} tint={false} />
      ))}
      {/* knit throw across the foot */}
      <Soft p={[x, mTop + 0.075, mZ0 + 0.36]} s={[w + 0.07, 0.03, 0.46]} c={THROW} rad={0.014} />
      {[-1, 1].map((sd) => (
        <Soft key={sd} p={[x + sd * (w / 2 + 0.03), mTop - 0.05, mZ0 + 0.36]} s={[0.025, 0.26, 0.46]} c={THROW} rad={0.012} rot={[0, 0, sd * 0.05]} />
      ))}
    </group>
  );
}

function Lamp({ x, y, z }: { x: number; y: number; z: number }) {
  const metal = { c: "#b9bcc0", r: 0.35, m: 0.8 };
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.02, 20]} />
        <meshStandardMaterial color={metal.c} roughness={metal.r} metalness={metal.m} />
      </mesh>
      <Box p={[0, 0.18, 0.04]} s={[0.012, 0.34, 0.012]} rot={[0.25, 0, 0]} {...metal} />
      <Box p={[-0.07, 0.38, 0.06]} s={[0.012, 0.012, 0.18]} rot={[0, Math.PI / 2 + 0.3, -0.3]} {...metal} />
      <group position={[-0.16, 0.36, 0.06]} rotation={[0, 0, 0.6]}>
        <mesh castShadow>
          <coneGeometry args={[0.065, 0.12, 20, 1, true]} />
          <meshStandardMaterial color={metal.c} roughness={metal.r} metalness={metal.m} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#ffe2a8" />
        </mesh>
      </group>
      <pointLight position={[-0.2, 0.28, 0.06]} color="#ffc979" intensity={2.2} distance={3} decay={2} />
    </group>
  );
}

function Bin() {
  const { x, z, r, h } = LAYOUT.bin;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} castShadow>
        <cylinderGeometry args={[r, r * 0.85, h, 24, 6, true]} />
        <meshStandardMaterial color={BLACK} wireframe />
      </mesh>
      <mesh position={[0, h / 2, 0]}>
        <cylinderGeometry args={[r * 0.97, r * 0.82, h, 24, 1, true]} />
        <meshStandardMaterial color={RED} side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, h, 0]}>
        <torusGeometry args={[r, 0.008, 6, 32]} />
        <meshStandardMaterial color={BLACK} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[r * 0.85, 24]} />
        <meshStandardMaterial color={BLACK} />
      </mesh>
    </group>
  );
}

const OAK = "#f0cb94";

/** Light-oak two-drawer chest on tapered legs, with a ceramic table lamp and a bud vase. */
function SideTable() {
  const { x, z, w, d, h } = LAYOUT.sideTable;
  const grain = useSurfaceMap("oak", 1, 1);
  const legH = 0.14;
  const topT = 0.025;
  const bodyH = h - legH - topT;
  const fz = z - d / 2; // front face, toward the room (-Z)
  const drawerH = (bodyH - 0.03) / 2;
  const oak = <meshStandardMaterial map={grain} color={OAK} roughness={0.55} />;
  return (
    <group>
      {/* carcass + slightly overhanging top */}
      <RoundedBox args={[w, bodyH, d]} radius={0.008} smoothness={2} position={[x, legH + bodyH / 2, z]} castShadow receiveShadow>
        {oak}
      </RoundedBox>
      <RoundedBox args={[w + 0.02, topT, d + 0.015]} radius={0.008} smoothness={2} position={[x, h - topT / 2, z - 0.0075]} castShadow receiveShadow>
        {oak}
      </RoundedBox>
      {/* drawer fronts with a shadow gap between them */}
      {[0, 1].map((i) => (
        <RoundedBox key={i} args={[w - 0.03, drawerH, 0.015]} radius={0.004} smoothness={2} position={[x, legH + 0.015 + drawerH / 2 + i * (drawerH + 0.004), fz - 0.004]} castShadow receiveShadow>
          {oak}
        </RoundedBox>
      ))}
      {/* tapered, slightly splayed legs */}
      {([[-1, -1], [1, -1], [-1, 1], [1, 1]] as [number, number][]).map(([a, b], i) => (
        <mesh key={i} position={[x + a * (w / 2 - 0.05), legH / 2, z + b * (d / 2 - 0.05)]} rotation={[-b * 0.06, 0, a * 0.06]} castShadow>
          <cylinderGeometry args={[0.016, 0.01, legH, 12]} />
          {oak}
        </mesh>
      ))}
      {/* ceramic ball lamp with linen drum shade */}
      <group position={[x + 0.14, h, z + 0.02]}>
        <mesh position={[0, 0.11, 0]} scale={[1, 0.95, 1]} castShadow receiveShadow>
          <sphereGeometry args={[0.11, 32, 24]} />
          <meshStandardMaterial color="#e8e2d6" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.235, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.018, 0.04, 16]} />
          <meshStandardMaterial color="#b08d57" metalness={0.85} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.34, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.17, 0.19, 40, 1, true]} />
          <meshStandardMaterial color="#f1ebdf" emissive="#ffe2b8" emissiveIntensity={0.35} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 0.3, 0]} color="#ffd29a" intensity={1.4} distance={2.5} decay={2} />
      </group>
      {/* small bud vase with twigs */}
      <group position={[x - 0.2, h, z + 0.03]}>
        <mesh position={[0, 0.045, 0]} scale={[1, 0.9, 1]} castShadow>
          <sphereGeometry args={[0.05, 24, 16]} />
          <meshStandardMaterial color="#efeae0" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.095, 0]}>
          <cylinderGeometry args={[0.012, 0.016, 0.025, 16]} />
          <meshStandardMaterial color="#efeae0" roughness={0.6} />
        </mesh>
        {[-0.35, 0.05, 0.4].map((t, i) => (
          <group key={i} position={[0, 0.1, 0]} rotation={[0.15 * (i - 1), i * 1.7, t]}>
            <mesh position={[0, 0.11, 0]}>
              <cylinderGeometry args={[0.0018, 0.0025, 0.22, 5]} />
              <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
            </mesh>
            {[0.07, 0.12, 0.17, 0.21].map((ly, j) => (
              <mesh key={j} position={[(j % 2 ? 1 : -1) * 0.012, ly, 0]} rotation-z={(j % 2 ? -1 : 1) * 0.8} scale={[0.006, 0.014, 0.003]}>
                <sphereGeometry args={[1, 6, 4]} />
                <meshStandardMaterial color="#7d8f6a" roughness={0.8} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

export function Furniture() {
  return (
    <group>
      <Bed />
      <SideTable />
      <TvWall />
      <Workstation />
      <NeonSign />
      <CertificateWall />
      <IdCardWall p={[LAYOUT.idWall.x, LAYOUT.idWall.y, LAYOUT.idWall.z]} />
      <Bin />
    </group>
  );
}
