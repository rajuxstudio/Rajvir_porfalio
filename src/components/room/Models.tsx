// Photoreal CC0 props from Poly Haven (public/models/<id>/<id>.gltf).
import { Suspense, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";

const HW = ROOM.width / 2;
const HL = ROOM.length / 2;
const url = (id: string) => `${import.meta.env.BASE_URL}models/${id}/${id}.gltf`;

/** Places a model so its footprint is centred on (x,z) and its base rests at y. */
function Prop({ id, p, rotY = 0, scale = 1 }: { id: string; p: [number, number, number]; rotY?: number; scale?: number }) {
  const { scene } = useGLTF(url(id));
  const obj = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = o.receiveShadow = true;
    });
    const b = new THREE.Box3().setFromObject(c);
    const ctr = b.getCenter(new THREE.Vector3());
    c.position.set(-ctr.x, -b.min.y, -ctr.z);
    const g = new THREE.Group();
    g.add(c);
    return g;
  }, [scene]);
  return <primitive object={obj} position={p} rotation-y={rotY} scale={scale} />;
}

/**
 * Photoreal potted plants (Poly Haven CC0 scans), each matched to its spot:
 *  - potted_plant_01: 1.35 m leafy floor plant (room corner)
 *  - potted_plant_02: 0.84 m bushy plant, scaled down as the desk pot
 */
export type PlantId = "potted_plant_01" | "potted_plant_02";
export function RealPlant({ id, p, s = 1, rotY = 0 }: { id: PlantId; p: [number, number, number]; s?: number; rotY?: number }) {
  return (
    <Suspense fallback={null}>
      <Prop id={id} p={p} rotY={rotY} scale={s} />
    </Suspense>
  );
}

export const MODEL_SPOTS = {
  plant: { x: HW - 0.4, z: HL - 0.4, r: 0.32 },
};

export function Models() {
  const bed = LAYOUT.bed;
  return (
    <Suspense fallback={null}>
      <Prop id="potted_plant_01" p={[MODEL_SPOTS.plant.x, 0, MODEL_SPOTS.plant.z]} rotY={0.6} />
      <Prop id="painted_wooden_nightstand" p={[LAYOUT.bedside.x, 0, LAYOUT.bedside.z]} rotY={Math.PI / 2} />
      <Prop id="portable_cassette_player" p={[LAYOUT.bedside.x + 0.06, LAYOUT.bedside.h, LAYOUT.bedside.z - 0.1]} rotY={Math.PI / 2 - 0.3} />
      <Prop id="throw_pillows_01" p={[bed.x, 0.54, HL - 0.62]} rotY={Math.PI} scale={0.8} />
    </Suspense>
  );
}

["potted_plant_01", "potted_plant_02", "throw_pillows_01", "painted_wooden_nightstand", "portable_cassette_player"].forEach((id) => useGLTF.preload(url(id)));
