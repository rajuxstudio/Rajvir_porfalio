// Framed degrees (top row) and certificates (bottom row) on the left wall beside the trooper statue.
// Content comes from the portfolio's About page data, so the room stays in sync with it.
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LAYOUT } from "./layout";
import { registerInspectable } from "./inspect";
import { education } from "@/components/about/AboutEducation";
import { certificates } from "@/components/about/AboutCertifications";

type V3 = [number, number, number];
const PAPER = "#fbf8f0";
const NAVY = "#1f2a44";
const GOLD = "#b8955a";
const INK = "#3b3b3b";
const SERIF = "Georgia, 'Times New Roman', serif";
const TW = 1024;
const TH = 760;

/** Sets the largest font (down to a floor) that fits `maxW`. */
function fit(g: CanvasRenderingContext2D, text: string, maxW: number, size: number, style = "", family = SERIF) {
  let s = size;
  do {
    g.font = `${style} ${s}px ${family}`;
    if (g.measureText(text).width <= maxW) break;
    s -= 2;
  } while (s > 18);
  return s;
}

function paper(g: CanvasRenderingContext2D) {
  g.fillStyle = PAPER;
  g.fillRect(0, 0, TW, TH);
  // faint paper grain
  for (let i = 0; i < 2500; i++) {
    g.fillStyle = `rgba(120,100,60,${Math.random() * 0.035})`;
    g.fillRect(Math.random() * TW, Math.random() * TH, 2, 2);
  }
  g.strokeStyle = NAVY;
  g.lineWidth = 10;
  g.strokeRect(26, 26, TW - 52, TH - 52);
  g.strokeStyle = GOLD;
  g.lineWidth = 3;
  g.strokeRect(46, 46, TW - 92, TH - 92);
  // small corner diamonds
  g.fillStyle = GOLD;
  for (const [cx, cy] of [[46, 46], [TW - 46, 46], [46, TH - 46], [TW - 46, TH - 46]]) {
    g.beginPath();
    g.moveTo(cx, cy - 12);
    g.lineTo(cx + 12, cy);
    g.lineTo(cx, cy + 12);
    g.lineTo(cx - 12, cy);
    g.closePath();
    g.fill();
  }
  g.textAlign = "center";
  g.textBaseline = "middle";
}

function seal(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, label: string) {
  // ribbons
  g.fillStyle = "#8c2f2f";
  for (const s of [-1, 1]) {
    g.beginPath();
    g.moveTo(cx + s * r * 0.3, cy);
    g.lineTo(cx + s * r * 0.75, cy + r * 1.7);
    g.lineTo(cx + s * r * 0.45, cy + r * 1.45);
    g.lineTo(cx + s * r * 0.15, cy + r * 1.75);
    g.closePath();
    g.fill();
  }
  // serrated gold disc
  g.fillStyle = GOLD;
  g.beginPath();
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const rr = i % 2 ? r : r * 0.9;
    g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
  }
  g.fill();
  g.strokeStyle = "#f3e2b8";
  g.lineWidth = 3;
  g.beginPath();
  g.arc(cx, cy, r * 0.68, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = "#f8ecd0";
  fit(g, label, r * 1.1, r * 0.55, "bold");
  g.fillText(label, cx, cy + 2);
}

function signatureLine(g: CanvasRenderingContext2D, cx: number, y: number, caption: string) {
  g.strokeStyle = INK;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx - 120, y);
  g.lineTo(cx + 120, y);
  g.stroke();
  // scribble
  g.strokeStyle = NAVY;
  g.lineWidth = 3;
  g.beginPath();
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    g.lineTo(cx - 90 + t * 180, y - 22 - Math.sin(t * 14) * 12 * (1 - t * 0.5));
  }
  g.stroke();
  g.fillStyle = INK;
  g.font = `italic 22px ${SERIF}`;
  g.fillText(caption, cx, y + 24);
}

type Edu = (typeof education)[number];
type Cert = (typeof certificates)[number];

export function drawDegree(g: CanvasRenderingContext2D, e: Edu) {
  paper(g);
  const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(e.degree); // "Master of Computer Applications (MCA)"
  const name = m ? m[1] : e.degree;
  const abbr = m ? m[2] : "";
  g.fillStyle = NAVY;
  fit(g, e.institution.toUpperCase(), TW - 200, 40, "bold");
  g.fillText(e.institution.toUpperCase(), TW / 2, 130);
  g.fillStyle = INK;
  g.font = `italic 30px ${SERIF}`;
  g.fillText("has conferred the degree of", TW / 2, 215);
  g.fillStyle = NAVY;
  fit(g, name, TW - 180, 64, "bold");
  g.fillText(name, TW / 2, 305);
  if (abbr) {
    g.fillStyle = GOLD;
    g.font = `bold 46px ${SERIF}`;
    g.fillText(abbr, TW / 2, 380);
  }
  g.fillStyle = INK;
  g.font = `28px ${SERIF}`;
  g.fillText(e.period.replace(/\s*[–-]\s*/, "  –  "), TW / 2, 450);
  signatureLine(g, 230, 620, "Registrar");
  signatureLine(g, TW - 230, 620, "Vice Chancellor");
  seal(g, TW / 2, 590, 62, abbr || "DEG");
}

export function drawCert(g: CanvasRenderingContext2D, c: Cert) {
  paper(g);
  g.fillStyle = NAVY;
  g.font = `bold 58px ${SERIF}`;
  g.fillText("C E R T I F I C A T E", TW / 2, 135);
  g.fillStyle = GOLD;
  g.font = `bold 26px ${SERIF}`;
  g.fillText("O F   C O M P L E T I O N", TW / 2, 192);
  g.fillStyle = INK;
  g.font = `italic 28px ${SERIF}`;
  g.fillText("for successfully completing", TW / 2, 268);
  g.fillStyle = NAVY;
  fit(g, c.title, TW - 200, 66, "bold");
  g.fillText(c.title, TW / 2, 350);
  g.strokeStyle = GOLD;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(TW / 2 - 200, 405);
  g.lineTo(TW / 2 + 200, 405);
  g.stroke();
  g.fillStyle = INK;
  g.font = `30px ${SERIF}`;
  g.fillText(`Issued by ${c.issuer}  ·  ${c.issued}`, TW / 2, 455);
  signatureLine(g, 260, 620, c.issuer);
  seal(g, TW - 250, 585, 66, c.issuer.slice(0, 1).toUpperCase());
}

function useDocTexture(draw: (g: CanvasRenderingContext2D) => void) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = TW;
    c.height = TH;
    const g = c.getContext("2d");
    if (g) draw(g);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
    // draw functions are stable per item
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

/** One framed document. Local +Z faces the room; the group sits flush on the wall. */
export function Frame({ p, w, draw, frame, mat = 0.035 }: { p: V3; w: number; draw: (g: CanvasRenderingContext2D) => void; frame: { c: string; m: number; r: number }; mat?: number }) {
  const tex = useDocTexture(draw);
  const docW = w - 2 * (0.022 + mat);
  const docH = (docW * TH) / TW;
  const h = docH + 2 * (0.022 + mat);
  const d = 0.024;
  const bar = 0.022;
  return (
    <group position={p}>
      {/* moulding: 4 bars */}
      {[
        [0, h / 2 - bar / 2, w, bar],
        [0, -h / 2 + bar / 2, w, bar],
        [-w / 2 + bar / 2, 0, bar, h - 2 * bar],
        [w / 2 - bar / 2, 0, bar, h - 2 * bar],
      ].map(([x, y, bw, bh], i) => (
        <mesh key={i} position={[x, y, d / 2]} castShadow>
          <boxGeometry args={[bw, bh, d]} />
          <meshStandardMaterial color={frame.c} metalness={frame.m} roughness={frame.r} />
        </mesh>
      ))}
      {/* white mat board */}
      <mesh position={[0, 0, 0.006]} receiveShadow>
        <planeGeometry args={[w - 2 * bar, h - 2 * bar]} />
        <meshStandardMaterial color="#f6f4ef" roughness={0.9} />
      </mesh>
      {/* the document */}
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={[docW, docH]} />
        <meshStandardMaterial map={tex} roughness={0.85} />
      </mesh>
      {/* glass */}
      <mesh position={[0, 0, d - 0.004]}>
        <planeGeometry args={[w - 2 * bar, h - 2 * bar]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.08} roughness={0.04} metalness={0} clearcoat={1} depthWrite={false} />
      </mesh>
    </group>
  );
}

export const DEGREE_FRAME = { c: "#18181b", m: 0.2, r: 0.45 }; // black lacquer
export const CERT_FRAME = { c: "#b98a55", m: 0, r: 0.6 }; // oak

export function CertificateWall() {
  const { x, z0, z1 } = LAYOUT.certWall;
  // degrees + certificates are inspectable (game-style): the scene's InspectRaycaster aims at this group
  const root = useRef<THREE.Group>(null);
  useEffect(() => registerInspectable(root.current), []);
  const span = z1 - z0;
  const gap = 0.05;
  const degW = Math.min(0.46, (span - gap * (education.length - 1)) / education.length);
  const certW = Math.min(0.36, (span - gap * (certificates.length - 1)) / certificates.length);
  // rows centred on the free stretch of the left wall; frames face +X, so their local +X
  // (reading direction) runs toward world -Z: first item sits at the bed end
  const row = (n: number, w: number) => {
    const total = n * w + (n - 1) * gap;
    const cz = (z0 + z1) / 2;
    return (i: number) => cz + total / 2 - w / 2 - i * (w + gap); // left-to-right as seen from the room
  };
  const degZ = row(education.length, degW);
  const certZ = row(certificates.length, certW);
  return (
    <group ref={root}>
      {education.map((e, i) => (
        <group key={e.degree} position={[x + 0.002, 2.05, degZ(i)]} rotation-y={Math.PI / 2} userData={{ inspect: { kind: "degree", idx: i } }}>
          <Frame p={[0, 0, 0]} w={degW} draw={(g) => drawDegree(g, e)} frame={DEGREE_FRAME} />
        </group>
      ))}
      {certificates.map((c, i) => (
        <group key={c.title} position={[x + 0.002, 1.62, certZ(i)]} rotation-y={Math.PI / 2} userData={{ inspect: { kind: "cert", idx: i } }}>
          <Frame p={[0, 0, 0]} w={certW} draw={(g) => drawCert(g, c)} frame={CERT_FRAME} mat={0.025} />
        </group>
      ))}
    </group>
  );
}
