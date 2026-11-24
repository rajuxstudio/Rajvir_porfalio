// "Designer • Developer" neon sign on the wall above the desk: ice-blue script on a dark smoked
// acrylic panel with brass standoffs. Click it to switch the neon on and off.
import { useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { LAYOUT } from "./layout";
import { input } from "./input";

const WORDS = ["Designer", "Developer"]; // drawn with a round neon dot between them
const FONT = "700 230px Caveat, 'Segoe Script', cursive"; // Caveat is loaded by the portfolio's index.css
const CW = 2048;
const CH = 360;

// on: ice-blue tube with a near-white core and a tight halo (sharp, readable letters);
// off: unlit grey glass tube. Both sit on a dark smoked-acrylic panel for contrast.
const LOOK = {
  on: { core: "#effcff", glow: "#29c8ff", halo: [[34, 0.6], [16, 0.9], [6, 1]], bright: 1.2, light: 0.45, lightColor: "#5fd6ff" },
  off: { core: "#8f9aa0", glow: "#000000", halo: [], bright: 0.9, light: 0, lightColor: "#5fd6ff" },
} as const;

function drawNeon(g: CanvasRenderingContext2D, on: boolean) {
  const look = on ? LOOK.on : LOOK.off;
  g.clearRect(0, 0, CW, CH);
  g.font = FONT;
  g.textAlign = "left";
  g.textBaseline = "middle";
  const y = CH / 2 + 8;
  const gap = 110; // room for the dot
  const [a, b] = WORDS.map((t) => g.measureText(t).width);
  const x0 = (CW - (a + gap + b)) / 2;
  // filled + stroked so the script reads as a thick, even tube
  const shape = () => {
    g.lineWidth = 5;
    g.lineJoin = "round";
    g.strokeStyle = g.fillStyle;
    for (const [t, tx] of [[WORDS[0], x0], [WORDS[1], x0 + a + gap]] as const) {
      g.fillText(t, tx, y);
      g.strokeText(t, tx, y);
    }
    g.beginPath();
    g.arc(x0 + a + gap / 2, y + 18, 16, 0, Math.PI * 2);
    g.fill();
  };
  for (const [blur, alpha] of look.halo) {
    g.shadowColor = look.glow;
    g.shadowBlur = blur;
    g.globalAlpha = alpha;
    g.fillStyle = look.glow;
    shape();
  }
  g.globalAlpha = 1;
  g.shadowBlur = on ? 4 : 0;
  g.shadowColor = look.core;
  g.fillStyle = look.core;
  shape();
}

export function NeonSign() {
  const { x, y, z, w } = LAYOUT.neon;
  const h = (w * CH) / CW;
  const [on, setOn] = useState(true);
  const root = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = CW;
    c.height = CH;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);

  // repaint whenever the switch flips (and again once the Caveat font has loaded)
  useEffect(() => {
    let live = true;
    const g = (tex.image as HTMLCanvasElement).getContext("2d");
    if (!g) return;
    const paint = () => {
      if (!live) return;
      drawNeon(g, on);
      tex.needsUpdate = true;
    };
    paint();
    document.fonts?.load(FONT).then(paint, () => {});
    return () => {
      live = false;
    };
  }, [tex, on]);

  // click the sign to toggle; raycast from the crosshair (pointer lock) or the cursor
  useEffect(() => {
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const click = (e: PointerEvent) => {
      if (!input.enabled || !root.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      if (document.pointerLockElement === gl.domElement) pointer.set(0, 0);
      else pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObject(root.current, true)[0];
      if (hit && hit.distance < 6) setOn((v) => !v);
    };
    gl.domElement.addEventListener("pointerdown", click);
    return () => gl.domElement.removeEventListener("pointerdown", click);
  }, [camera, gl]);

  const look = on ? LOOK.on : LOOK.off;
  const plateW = w + 0.1;
  const plateH = h * 0.95;
  return (
    <group ref={root} position={[x, y, z]} rotation-y={-Math.PI / 2}>
      {/* dark smoked-acrylic backplate: gives the light letters contrast (also the click target) */}
      <mesh position={[0, 0, 0.03]} castShadow>
        <boxGeometry args={[plateW, plateH, 0.008]} />
        <meshPhysicalMaterial color="#111317" transparent opacity={0.92} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      {/* brass standoffs */}
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sy) => (
          <mesh key={`${sx}${sy}`} position={[sx * (plateW / 2 - 0.04), sy * (plateH / 2 - 0.035), 0.017]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.009, 0.009, 0.034, 12]} />
            <meshStandardMaterial color="#b08d57" metalness={0.8} roughness={0.35} />
          </mesh>
        )),
      )}
      {/* the tubes: unlit material; slightly over-bright when on so the bloom pass adds a soft glow */}
      <mesh position={[0, 0, 0.037]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} color={new THREE.Color(look.bright, look.bright, look.bright)} />
      </mesh>
      {/* faint blue spill on the wall while lit */}
      <pointLight position={[0, -0.05, 0.35]} color={look.lightColor} intensity={look.light} distance={1.8} decay={2} />
    </group>
  );
}
