import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.006;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.008;
  });

  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Deep ocean with variation
    const oceanGrad = ctx.createRadialGradient(256, 128, 0, 256, 128, 280);
    oceanGrad.addColorStop(0, "#1565c0");
    oceanGrad.addColorStop(1, "#0d47a1");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Ocean depth variation
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      ctx.fillStyle = `rgba(${10 + Math.random() * 20}, ${60 + Math.random() * 40}, ${140 + Math.random() * 40}, 0.3)`;
      ctx.beginPath();
      ctx.ellipse(x, y, 15 + Math.random() * 30, 10 + Math.random() * 20, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    const drawContinent = (shapes: { x: number; y: number; rx: number; ry: number; rot?: number; color?: string }[]) => {
      shapes.forEach(({ x, y, rx, ry, rot = 0, color }) => {
        ctx.fillStyle = color || "#2e7d32";
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
        ctx.fill();
        // Terrain variation
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = `rgba(${30 + Math.random() * 50}, ${100 + Math.random() * 80}, ${20 + Math.random() * 40}, 0.4)`;
          ctx.beginPath();
          ctx.ellipse(x + (Math.random() - 0.5) * rx, y + (Math.random() - 0.5) * ry, rx * 0.4, ry * 0.4, Math.random(), 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // North America
    drawContinent([
      { x: 110, y: 55, rx: 35, ry: 25, rot: -0.3 },
      { x: 95, y: 45, rx: 18, ry: 14, rot: -0.4 },
      { x: 120, y: 75, rx: 12, ry: 8 },
      { x: 105, y: 90, rx: 5, ry: 12 },
    ]);

    // South America
    drawContinent([
      { x: 140, y: 130, rx: 18, ry: 35, rot: 0.15 },
      { x: 135, y: 115, rx: 10, ry: 12 },
      { x: 145, y: 160, rx: 8, ry: 12, rot: 0.3 },
    ]);

    // Europe
    drawContinent([
      { x: 265, y: 48, rx: 20, ry: 12, rot: 0.1 },
      { x: 250, y: 55, rx: 8, ry: 10 },
      { x: 280, y: 42, rx: 6, ry: 5 },
      { x: 258, y: 62, rx: 4, ry: 8, rot: 0.2 },
    ]);

    // Africa
    drawContinent([
      { x: 272, y: 105, rx: 22, ry: 38, rot: -0.05 },
      { x: 265, y: 85, rx: 16, ry: 12 },
      { x: 285, y: 90, rx: 8, ry: 6 },
    ]);

    // Asia
    drawContinent([
      { x: 340, y: 55, rx: 50, ry: 22, rot: -0.1 },
      { x: 310, y: 45, rx: 15, ry: 12 },
      { x: 370, y: 50, rx: 18, ry: 14 },
      { x: 330, y: 80, rx: 20, ry: 14, rot: 0.3 },
      { x: 360, y: 90, rx: 10, ry: 16 },
    ]);

    // India
    drawContinent([
      { x: 330, y: 100, rx: 10, ry: 16, rot: 0.1 },
    ]);

    // Southeast Asia / Indonesia
    drawContinent([
      { x: 370, y: 110, rx: 6, ry: 4 },
      { x: 380, y: 115, rx: 5, ry: 3 },
      { x: 390, y: 112, rx: 4, ry: 3 },
      { x: 385, y: 120, rx: 8, ry: 3 },
    ]);

    // Australia
    drawContinent([
      { x: 410, y: 155, rx: 20, ry: 14, rot: 0.2 },
      { x: 400, y: 148, rx: 8, ry: 6 },
    ]);

    // Greenland
    drawContinent([
      { x: 170, y: 28, rx: 14, ry: 10, color: "#a5d6a7" },
    ]);

    // Desert regions
    const deserts = [
      { x: 270, y: 95, rx: 14, ry: 6 },  // Sahara
      { x: 330, y: 75, rx: 10, ry: 5 },   // Middle East
      { x: 410, y: 148, rx: 10, ry: 6 },  // Australian outback
    ];
    deserts.forEach(({ x, y, rx, ry }) => {
      ctx.fillStyle = "rgba(194, 178, 128, 0.35)";
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Mountain highlights
    const mountains = [
      { x: 340, y: 60, rx: 8, ry: 3 },   // Himalayas
      { x: 130, y: 130, rx: 3, ry: 18 },  // Andes
      { x: 100, y: 55, rx: 3, ry: 12 },   // Rockies
    ];
    mountains.forEach(({ x, y, rx, ry }) => {
      ctx.fillStyle = "rgba(120, 100, 70, 0.3)";
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Ice caps
    const iceGrad = ctx.createLinearGradient(0, 0, 0, 18);
    iceGrad.addColorStop(0, "rgba(230, 245, 255, 0.9)");
    iceGrad.addColorStop(1, "rgba(200, 230, 255, 0.1)");
    ctx.fillStyle = iceGrad;
    ctx.fillRect(0, 0, 512, 16);

    const iceGrad2 = ctx.createLinearGradient(0, 240, 0, 256);
    iceGrad2.addColorStop(0, "rgba(200, 230, 255, 0.1)");
    iceGrad2.addColorStop(1, "rgba(230, 245, 255, 0.8)");
    ctx.fillStyle = iceGrad2;
    ctx.fillRect(0, 240, 512, 16);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  const cloudTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 512, 256);

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 512;
      const y = 20 + Math.random() * 216;
      const rx = 8 + Math.random() * 30;
      const ry = 3 + Math.random() * 8;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color("#4fc3f7") },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(glowColor, intensity * 0.6);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, []);

  return (
    <group rotation={[0.4, 0, 0]}>
      {/* Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 48, 48]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={glowRef} material={atmosphereMaterial}>
        <sphereGeometry args={[1.15, 32, 32]} />
      </mesh>
    </group>
  );
}

export default function Globe3D({ size = 18 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden" }}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 2, 4]} intensity={1.3} />
        <directionalLight position={[-2, -1, -2]} intensity={0.25} color="#6fa8dc" />
        <pointLight position={[0, 3, 2]} intensity={0.3} color="#fff" />
        <Earth />
      </Canvas>
    </div>
  );
}
