import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  N8AO,
  Bloom,
  Vignette,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { Room } from "./Room";
import { Furniture } from "./Furniture";
import { Details } from "./Details";
import { Models } from "./Models";
import { Door } from "./Door";
import { OfficeChair } from "./OfficeChair";
import { PlayerControls } from "./PlayerControls";
import { InspectRaycaster } from "./InspectRaycaster";
import { ROOM } from "./input";
import { LAYOUT } from "./layout";

/** Mouse-wheel zoom via field of view. */
function Zoom() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const target = useRef(70);
  useEffect(() => {
    const w = (e: WheelEvent) => {
      target.current = THREE.MathUtils.clamp(target.current + e.deltaY * 0.03, 25, 85);
    };
    window.addEventListener("wheel", w, { passive: true });
    return () => window.removeEventListener("wheel", w);
  }, []);
  useFrame((_, dt) => {
    const f = camera.fov + (target.current - camera.fov) * (1 - Math.exp(-8 * dt));
    if (Math.abs(f - camera.fov) > 0.01) {
      camera.fov = f;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

export function Experience() {
  const { x: dx, z: dz, h: dh } = LAYOUT.desk;
  return (
    <Canvas
      className="room-canvas"
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: false, toneMapping: THREE.NoToneMapping }}
      camera={{ fov: 70, near: 0.05, far: 50, position: [0, 1.65, 1.5] }}
    >
      <color attach="background" args={["#f2b27a"]} />
      <Environment resolution={128}>
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#ffcf9a"
          position={[-6, 2, 2.6]}
          rotation-y={Math.PI / 2}
          scale={[3, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.35}
          color="#9fb4d8"
          position={[0, 5, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.5}
          color="#6f8fd0"
          position={[5, 1.2, 0.3]}
          rotation-y={-Math.PI / 2}
          scale={[1, 0.5, 1]}
        />
      </Environment>
      <hemisphereLight args={["#eef0f2", "#6b6058", 0.9]} />
      {/* soft warm fill (replaces the old window sun); no shadows so walls/ceiling don't block it */}
      <directionalLight position={[-1.5, 4, 2.5]} color="#fff0db" intensity={1.1} />
      {/* cool monitor glow onto keyboard, chair and face */}
      <pointLight
        position={[dx - 0.25, dh + 0.45, dz]}
        color="#7fa2ff"
        intensity={1.4}
        distance={2.8}
        decay={2}
      />
      {/* dimmed pendant */}
      <pointLight
        position={[0, ROOM.height - 0.78, 0.3]}
        color="#ffcf91"
        intensity={2.2}
        distance={7}
        decay={2}
      />
      <Room />
      <Furniture />
      <Details />
      <Models />
      <Door />
      <OfficeChair />
      <PlayerControls />
      <InspectRaycaster />
      <Zoom />
      <EffectComposer multisampling={4}>
        <N8AO aoRadius={0.25} intensity={1.4} distanceFalloff={0.6} quality="medium" halfRes />
        <Bloom luminanceThreshold={1.1} luminanceSmoothing={0.2} intensity={0.22} mipmapBlur />
        <ToneMapping mode={ToneMappingMode.AGX} />
        <Vignette offset={0.3} darkness={0.25} />
        <Noise opacity={0.008} premultiply />
      </EffectComposer>
    </Canvas>
  );
}
