// Wall-mounted lanyard rack on the right wall, past the desk: one ID badge per role in the
// work-experience history (read from the About page data). Badges are real 3D objects —
// thick rounded cards in a rigid clear holder, brass clip, woven strap looped over a brass
// rail — styled in the room's palette (navy, rust, sage, walnut, charcoal, cream, brass).
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { experiences } from "@/components/about/AboutExperience";
import { useSurfaceMap } from "./SurfaceMaps";
import { registerInspectable } from "./inspect";

type Exp = (typeof experiences)[number];
const NAME = "Rajveer";
const PHOTO = `${import.meta.env.BASE_URL}profile-icon.png`;
const CW = 600;
const CH = 950; // CR80 portrait ratio ≈ 54 × 86 mm
const SANS = "Inter, 'Segoe UI', Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const CREAM = "#f3eee4";
const INK = "#1f2328";
const BRASS = "#b08d57";
// one accent per badge, taken from the room: TV-wall navy, throw rust, sage, walnut, charcoal
// eslint-disable-next-line react-refresh/only-export-components -- shared with the inspect overlay
export const ACCENTS = ["#1f2a44", "#a8553a", "#5f7a64", "#5b3a24", "#2b2d33"];
const BRASS_MAT = { color: BRASS, metalness: 0.85, roughness: 0.3 } as const;

function fitFont(g: CanvasRenderingContext2D, text: string, maxW: number, size: number, weight = 700, family = SANS) {
  let s = size;
  do {
    g.font = `${weight} ${s}px ${family}`;
    if (g.measureText(text).width <= maxW) break;
    s -= 2;
  } while (s > 16);
}

/** Wraps `text` into at most `lines` lines inside maxW. */
function wrap(g: CanvasRenderingContext2D, text: string, maxW: number, lines: number) {
  const out: string[] = [];
  let cur = "";
  for (const word of text.split(" ")) {
    const t = cur ? `${cur} ${word}` : word;
    if (g.measureText(t).width > maxW && cur) {
      out.push(cur);
      cur = word;
    } else cur = t;
  }
  if (cur) out.push(cur);
  if (out.length > lines) {
    out.length = lines;
    out[lines - 1] = out[lines - 1].replace(/\s*\S*$/, "") + "…";
  }
  return out;
}

function paperGrain(g: CanvasRenderingContext2D, alpha = 0.03) {
  for (let i = 0; i < 1800; i++) {
    g.fillStyle = `rgba(90,70,40,${Math.random() * alpha})`;
    g.fillRect(Math.random() * CW, Math.random() * CH, 2, 2);
  }
}

function drawFront(g: CanvasRenderingContext2D, e: Exp, accent: string, photo: HTMLImageElement | null, idx: number) {
  g.clearRect(0, 0, CW, CH);
  g.save();
  g.beginPath();
  g.roundRect(0, 0, CW, CH, 34);
  g.clip();
  // cream card stock
  g.fillStyle = CREAM;
  g.fillRect(0, 0, CW, CH);
  paperGrain(g);
  // accent header with a brass hairline
  g.fillStyle = accent;
  g.fillRect(0, 0, CW, 240);
  g.fillStyle = BRASS;
  g.fillRect(0, 240, CW, 6);
  // punched slot
  g.fillStyle = "rgba(0,0,0,0.35)";
  g.beginPath();
  g.roundRect(CW / 2 - 56, 30, 112, 20, 10);
  g.fill();
  g.restore();

  g.textAlign = "center";
  g.textBaseline = "middle";
  // company (serif, like the certificates)
  g.fillStyle = "#f6efe2";
  g.font = `700 34px ${SERIF}`;
  const co = wrap(g, e.company, CW - 80, 2);
  fitFont(g, co.reduce((a, b) => (a.length > b.length ? a : b)), CW - 80, 34, 700, SERIF);
  co.forEach((l, i) => g.fillText(l, CW / 2, (co.length === 1 ? 112 : 98) + i * 42));
  // type, small caps in brass
  g.fillStyle = "#d8b98a";
  g.font = `600 22px ${SANS}`;
  g.fillText(e.type.toUpperCase().split("").join(" "), CW / 2, 196);
  // photo with brass ring
  const pr = 116;
  const py = 372;
  g.save();
  g.beginPath();
  g.arc(CW / 2, py, pr, 0, Math.PI * 2);
  g.fillStyle = "#ddd6c9";
  g.fill();
  if (photo) {
    g.clip();
    const s = (pr * 2) / Math.min(photo.width, photo.height);
    const w = photo.width * s;
    const h = photo.height * s;
    g.drawImage(photo, CW / 2 - w / 2, py - pr - h * 0.04, w, h);
  }
  g.restore();
  g.strokeStyle = BRASS;
  g.lineWidth = 8;
  g.beginPath();
  g.arc(CW / 2, py, pr + 4, 0, Math.PI * 2);
  g.stroke();
  // name + role
  g.fillStyle = INK;
  g.font = `700 54px ${SERIF}`;
  g.fillText(NAME, CW / 2, 560);
  g.fillStyle = accent;
  g.font = `700 30px ${SANS}`;
  const role = wrap(g, e.title, CW - 70, 2);
  role.forEach((l, i) => g.fillText(l, CW / 2, 620 + i * 38));
  // details
  const dy = role.length > 1 ? 722 : 694;
  g.strokeStyle = BRASS;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(CW / 2 - 150, dy - 32);
  g.lineTo(CW / 2 + 150, dy - 32);
  g.stroke();
  g.fillStyle = "#3a3f47";
  g.font = `600 27px ${SANS}`;
  g.fillText(e.period, CW / 2, dy + 6);
  g.fillStyle = "#6b6f76";
  g.font = `500 23px ${SANS}`;
  g.fillText(e.location ?? "Remote", CW / 2, dy + 44);
  // barcode + id
  let bx = 130;
  const seed = (idx + 3) * 7919;
  g.fillStyle = INK;
  for (let i = 0; bx < CW - 130; i++) {
    const bw = 2 + ((seed * (i + 1)) % 5);
    g.fillRect(bx, CH - 124, bw, 50);
    bx += bw + 2 + ((seed >> (i % 8)) % 3);
  }
  g.fillStyle = "#8a8d93";
  g.font = `500 19px ${SANS}`;
  g.fillText(`ID ${String(2022 + idx).slice(-2)}-${(seed % 9000) + 1000}`, CW / 2, CH - 46);
}

function drawBack(g: CanvasRenderingContext2D, e: Exp, accent: string) {
  g.clearRect(0, 0, CW, CH);
  g.save();
  g.beginPath();
  g.roundRect(0, 0, CW, CH, 34);
  g.clip();
  g.fillStyle = accent;
  g.fillRect(0, 0, CW, CH);
  // fine diagonal pinstripe
  g.strokeStyle = "rgba(255,255,255,0.05)";
  g.lineWidth = 3;
  for (let x = -CH; x < CW; x += 26) {
    g.beginPath();
    g.moveTo(x, CH);
    g.lineTo(x + CH, 0);
    g.stroke();
  }
  g.fillStyle = "rgba(0,0,0,0.35)";
  g.beginPath();
  g.roundRect(CW / 2 - 56, 30, 112, 20, 10);
  g.fill();
  g.restore();
  // brass monogram
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.strokeStyle = BRASS;
  g.lineWidth = 5;
  g.beginPath();
  g.arc(CW / 2, CH / 2 - 40, 110, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = BRASS;
  g.font = `700 120px ${SERIF}`;
  g.fillText(NAME[0], CW / 2, CH / 2 - 34);
  g.fillStyle = "#e9dcc4";
  fitFont(g, e.company, CW - 120, 30, 600, SERIF);
  g.fillText(e.company, CW / 2, CH / 2 + 130);
  g.font = `500 22px ${SANS}`;
  g.fillStyle = "rgba(233,220,196,0.7)";
  g.fillText("If found, please return to the owner", CW / 2, CH - 90);
}

function useCanvasTexture(draw: (g: CanvasRenderingContext2D, img: HTMLImageElement | null) => void, deps: unknown[], withPhoto: boolean) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = CW;
    c.height = CH;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  useEffect(() => {
    let live = true;
    const g = (tex.image as HTMLCanvasElement).getContext("2d");
    if (!g) return;
    const paint = (img: HTMLImageElement | null) => {
      if (!live) return;
      draw(g, img);
      tex.needsUpdate = true;
    };
    paint(null);
    if (withPhoto) {
      const img = new Image();
      img.onload = () => document.fonts.ready.then(() => paint(img));
      img.src = PHOTO;
    } else document.fonts.ready.then(() => paint(null));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tex, ...deps]);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/**
 * One badge. Local frame: the rail runs along Z through the origin, the room is at -X. The
 * strap loops over the rail in the XY plane and both strands meet at the clip `drop` below.
 */
export function Badge({ e, idx, z, drop, cardW, railR }: { e: Exp; idx: number; z: number; drop: number; cardW: number; railR: number }) {
  const accent = ACCENTS[idx % ACCENTS.length];
  const front = useCanvasTexture((g, img) => drawFront(g, e, accent, img, idx), [e, accent, idx], true);
  const back = useCanvasTexture((g) => drawBack(g, e, accent), [e, accent], false);
  const weave = useSurfaceMap("fabric", 1, 12);
  const cardH = (cardW * CH) / CW;
  const thick = 0.0016;
  const sway = useRef<THREE.Group>(null);
  const phase = idx * 1.7;
  useFrame(({ clock }) => {
    if (sway.current) sway.current.rotation.z = Math.sin(clock.elapsedTime * 0.8 + phase) * 0.01;
  });

  // strap: a flattened tube following the loop over the rail
  const strapGeo = useMemo(() => {
    const r = railR + 0.0016;
    const pts = [
      [-0.0015, -drop],
      [-0.006, -drop * 0.55],
      [-r * 1.05, -0.006],
      [-r * 0.75, r * 0.7],
      [0, r * 1.02],
      [r * 0.75, r * 0.7],
      [r * 1.05, -0.006],
      [0.006, -drop * 0.55],
      [0.0015, -drop],
    ].map(([x, y]) => new THREE.Vector3(x, y, 0));
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    return new THREE.TubeGeometry(curve, 64, 0.0011, 6, false);
  }, [drop, railR]);
  const cardGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(cardW, cardH, cardW * 0.06), { depth: thick, bevelEnabled: false, curveSegments: 6 });
    g.translate(0, 0, -thick / 2);
    return g;
  }, [cardW, cardH]);
  useEffect(() => () => strapGeo.dispose(), [strapGeo]);
  useEffect(() => () => cardGeo.dispose(), [cardGeo]);

  const clipY = -drop;
  const holderW = cardW + 0.012;
  const holderH = cardH + 0.022;
  const cardTop = clipY - 0.03; // top edge of the holder
  return (
    <group position={[0, 0, z]} userData={{ inspect: { kind: "badge", idx } }}>
      <group ref={sway}>
        {/* woven strap, ~12 mm wide (tube flattened along Z) */}
        <mesh geometry={strapGeo} scale={[1, 1, 5.5]} castShadow>
          <meshStandardMaterial color={accent} roughness={0.85} bumpMap={weave} bumpScale={0.0006} />
        </mesh>
        {/* brass crimp + swivel ring + clip */}
        <mesh position={[0, clipY + 0.002, 0]} castShadow>
          <boxGeometry args={[0.004, 0.012, 0.014]} />
          <meshStandardMaterial {...BRASS_MAT} />
        </mesh>
        <mesh position={[0, clipY - 0.009, 0]} rotation-y={Math.PI / 2} castShadow>
          <torusGeometry args={[0.0055, 0.0012, 8, 20]} />
          <meshStandardMaterial {...BRASS_MAT} />
        </mesh>
        <mesh position={[0, clipY - 0.02, 0]} castShadow>
          <boxGeometry args={[0.003, 0.014, 0.006]} />
          <meshStandardMaterial {...BRASS_MAT} />
        </mesh>
        {/* badge: faces -X (into the room) */}
        <group position={[0, cardTop - holderH / 2, 0]} rotation-y={-Math.PI / 2}>
          {/* rigid clear holder with a little thickness */}
          <RoundedBox args={[holderW, holderH, 0.005]} radius={0.004} smoothness={3} castShadow>
            <meshPhysicalMaterial color="#ffffff" transparent opacity={0.16} roughness={0.06} clearcoat={1} clearcoatRoughness={0.05} depthWrite={false} />
          </RoundedBox>
          {/* brass eyelet at the top of the holder */}
          <mesh position={[0, holderH / 2 - 0.005, 0]}>
            <torusGeometry args={[0.0035, 0.0011, 8, 18]} />
            <meshStandardMaterial {...BRASS_MAT} />
          </mesh>
          <group position={[0, -0.004, 0]}>
            {/* card stock edge */}
            <mesh geometry={cardGeo} castShadow receiveShadow>
              <meshStandardMaterial color={CREAM} roughness={0.7} />
            </mesh>
            {/* printed front + back */}
            <mesh position={[0, 0, thick / 2 + 0.0002]}>
              <planeGeometry args={[cardW, cardH]} />
              <meshStandardMaterial map={front} transparent roughness={0.5} />
            </mesh>
            <mesh position={[0, 0, -thick / 2 - 0.0002]} rotation-y={Math.PI}>
              <planeGeometry args={[cardW, cardH]} />
              <meshStandardMaterial map={back} transparent roughness={0.55} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/**
 * Wall-mounted lanyard rack: a slim walnut board on the wall with a brass rail held off it on two
 * brackets; badges hang from the rail. `p` is the rail centre at the wall face (x = wall), the rail runs
 * along Z and the badges face -X, into the room.
 */
export function IdCardWall({ p }: { p: [number, number, number] }) {
  const n = experiences.length;
  const cardW = 0.11; // ~2× real size so the wall reads from across the room
  const gap = 0.03;
  const railL = n * cardW + (n - 1) * gap + 0.08;
  const railR = 0.005;
  const off = 0.04; // rail distance from the wall
  // badges are inspectable (game-style): the scene's InspectRaycaster aims at this group
  const badges = useRef<THREE.Group>(null);
  useEffect(() => registerInspectable(badges.current), []);

  return (
    <group position={p}>
      {/* walnut board */}
      <RoundedBox args={[0.018, 0.075, railL + 0.06]} radius={0.004} smoothness={3} position={[-0.009, 0.012, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#5b3a24" roughness={0.55} />
      </RoundedBox>
      {/* brackets + rail */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[-off / 2 - 0.009, 0, s * (railL / 2 - 0.01)]} rotation-z={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.005, 0.005, off, 12]} />
          <meshStandardMaterial {...BRASS_MAT} />
        </mesh>
      ))}
      <mesh position={[-off - 0.009, 0, 0]} rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[railR, railR, railL, 16]} />
        <meshStandardMaterial {...BRASS_MAT} />
      </mesh>
      {/* badges: most recent role first, reading left → right as you face the wall */}
      <group ref={badges} position={[-off - 0.009, 0, 0]}>
        {experiences.map((e, i) => (
          <Badge
            key={`${e.company}-${e.period}`}
            e={e}
            idx={i}
            z={-railL / 2 + 0.04 + cardW / 2 + i * (cardW + gap)}
            drop={0.075 + (i % 2) * 0.025}
            cardW={cardW}
            railR={railR}
          />
        ))}
      </group>
    </group>
  );
}
