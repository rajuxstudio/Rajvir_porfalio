import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
    }
  });

  const earthMaterial = useMemo(() => {
    // Create a canvas texture for the earth
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;

    // Ocean gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, "#0a4a8a");
    grad.addColorStop(0.3, "#1565c0");
    grad.addColorStop(0.5, "#1976d2");
    grad.addColorStop(0.7, "#1565c0");
    grad.addColorStop(1, "#0a4a8a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    // Simplified continents
    ctx.fillStyle = "#2e7d32";

    // North America
    ctx.beginPath();
    ctx.ellipse(60, 35, 22, 18, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // Central America
    ctx.fillRect(55, 48, 6, 12);

    // South America
    ctx.beginPath();
    ctx.ellipse(72, 72, 12, 20, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.ellipse(135, 30, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.ellipse(138, 62, 14, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Asia
    ctx.beginPath();
    ctx.ellipse(178, 35, 30, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(210, 78, 12, 8, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Ice caps
    ctx.fillStyle = "rgba(220, 240, 255, 0.7)";
    ctx.fillRect(0, 0, 256, 8);
    ctx.fillRect(0, 120, 256, 8);

    // Subtle green variations
    ctx.fillStyle = "rgba(46, 125, 50, 0.4)";
    ctx.beginPath();
    ctx.ellipse(170, 50, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.1,
    });
  }, []);

  return (
    <mesh ref={meshRef} rotation={[0.4, 0, 0]} material={earthMaterial}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}

export default function Globe3D({ size = 18 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 3]} intensity={1.2} />
        <directionalLight position={[-2, -1, -1]} intensity={0.3} />
        <Earth />
      </Canvas>
    </div>
  );
}
