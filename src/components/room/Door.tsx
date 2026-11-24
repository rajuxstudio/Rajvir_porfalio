import { RoundedBox } from "@react-three/drei";
import { LAYOUT } from "./layout";
import { TRIM } from "./Room";
import { useSurfaceMap } from "./SurfaceMaps";

const BRASS = "#b08d57"; // brushed brass, echoes the bronze desk trim

/** A closed fitted dark-walnut door, with recessed panels and real handle geometry. */
export function Door() {
  const { x, z, w, h, depth } = LAYOUT.door;
  const grain = useSurfaceMap("oak", 1, 2);
  return (
    <group name="room-door" position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 0.04, h + 0.025, depth]} />
        <meshStandardMaterial color="#1c1612" roughness={0.9} />
      </mesh>
      <RoundedBox position={[0, h / 2, -0.015]} args={[w - 0.015, h - 0.015, depth]} radius={0.006} castShadow receiveShadow>
        <meshStandardMaterial map={grain} color="#4a3628" roughness={0.6} />
      </RoundedBox>
      {[0.56, 1.5].map((y) => (
        <RoundedBox key={y} position={[0, y, -0.041]} args={[w - 0.19, y < 1 ? 0.74 : 0.85, 0.009]} radius={0.004} castShadow receiveShadow>
          <meshStandardMaterial map={grain} color="#3a2a1f" roughness={0.65} />
        </RoundedBox>
      ))}
      {[-1, 1].map((side) => (
        <RoundedBox key={side} position={[side * (w / 2 + 0.03), h / 2, -0.015]} args={[0.065, h + 0.08, 0.085]} radius={0.006} castShadow receiveShadow>
          <meshStandardMaterial color={TRIM} roughness={0.75} />
        </RoundedBox>
      ))}
      <RoundedBox position={[0, h + 0.03, -0.015]} args={[w + 0.125, 0.065, 0.085]} radius={0.006} castShadow>
        <meshStandardMaterial color={TRIM} roughness={0.75} />
      </RoundedBox>
      <group position={[w / 2 - 0.12, 1, -0.055]}>
        <mesh rotation-x={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.033, 0.033, 0.014, 24]} />
          <meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} />
        </mesh>
        <RoundedBox position={[-0.04, 0, -0.033]} args={[0.12, 0.018, 0.025]} radius={0.008} castShadow>
          <meshStandardMaterial color={BRASS} metalness={0.9} roughness={0.3} />
        </RoundedBox>
      </group>
      {[0.25, 1.05, 1.85].map((y) => (
        <mesh key={y} position={[-w / 2 + 0.006, y, -0.027]} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.07, 12]} />
          <meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}