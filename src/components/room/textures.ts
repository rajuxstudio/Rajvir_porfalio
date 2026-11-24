import * as THREE from "three";

function make(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const context = c.getContext("2d");
  if (context) draw(context);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

let seed = 11;
const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

/** Slightly uneven painted plaster with scuffs and faint stains. */
export function plaster(base = "#b9ada4") {
  return make(512, 512, (g) => {
    g.fillStyle = base;
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 9000; i++) {
      const v = rnd();
      g.fillStyle = v > 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.04)";
      g.fillRect(rnd() * 512, rnd() * 512, 1 + rnd() * 3, 1 + rnd() * 3);
    }
    for (let i = 0; i < 14; i++) {
      const x = rnd() * 512,
        y = rnd() * 512,
        r = 30 + rnd() * 90;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, `rgba(70,55,40,${0.03 + rnd() * 0.04})`);
      gr.addColorStop(1, "rgba(70,55,40,0)");
      g.fillStyle = gr;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    g.strokeStyle = "rgba(40,30,25,0.08)";
    for (let i = 0; i < 25; i++) {
      g.beginPath();
      const x = rnd() * 512,
        y = 400 + rnd() * 110;
      g.moveTo(x, y);
      g.lineTo(x + (rnd() - 0.5) * 40, y + (rnd() - 0.5) * 6);
      g.stroke();
    }
  });
}

/** Seamless brown loop-pile carpet: dense short wavy tufts in light and dark tones. */
export function carpet() {
  const S = 512;
  const t = make(S, S, (g) => {
    g.fillStyle = "#6f5440";
    g.fillRect(0, 0, S, S);
    g.lineCap = "round";
    for (let i = 0; i < 9000; i++) {
      const x = rnd() * S,
        y = rnd() * S;
      const len = 4 + rnd() * 6;
      const a = rnd() * Math.PI;
      const v = rnd();
      g.strokeStyle =
        v > 0.55
          ? `rgba(176,142,106,${0.35 + rnd() * 0.35})`
          : `rgba(52,34,22,${0.3 + rnd() * 0.35})`;
      g.lineWidth = 1.5 + rnd() * 1.5;
      // repeat near edges so the tile wraps without seams
      for (const dx of [-S, 0, S])
        for (const dy of [-S, 0, S]) {
          const px = x + dx,
            py = y + dy;
          if (px < -12 || px > S + 12 || py < -12 || py > S + 12) continue;
          g.beginPath();
          g.arc(px, py, len / 2, a, a + Math.PI * (0.8 + rnd() * 0.4));
          g.stroke();
        }
    }
  });
  return t;
}

/** Grayscale roughness noise (lighter = rougher). */
export function roughNoise() {
  return make(
    256,
    256,
    (g) => {
      g.fillStyle = "#c8c8c8";
      g.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 4000; i++) {
        const v = 150 + rnd() * 105;
        g.fillStyle = `rgb(${v},${v},${v})`;
        g.fillRect(rnd() * 256, rnd() * 256, 2, 2);
      }
      for (let i = 0; i < 8; i++) {
        const x = rnd() * 256,
          y = rnd() * 256,
          r = 20 + rnd() * 40;
        const gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, "rgba(90,90,90,0.5)");
        gr.addColorStop(1, "rgba(90,90,90,0)");
        g.fillStyle = gr;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }
    },
    false,
  );
}

/** Dark-theme code editor screen. */
export function codeScreen(variant = 0) {
  return make(1024, 420, (g) => {
    g.fillStyle = "#14171c";
    g.fillRect(0, 0, 1024, 420);
    g.fillStyle = "#1b1f26";
    g.fillRect(0, 0, 170, 420);
    g.fillStyle = "#0f1115";
    g.fillRect(0, 0, 1024, 22);
    const cols = ["#c792ea", "#82aaff", "#c3e88d", "#f78c6c", "#89ddff", "#9aa3ad", "#ffcb6b"];
    g.font = "13px monospace";
    for (let y = 40; y < 410; y += 17) {
      g.fillStyle = "#3b4048";
      g.fillText(String((y - 40) / 17 + 1 + variant * 120), 180, y);
      let x = 215 + Math.floor(rnd() * 4) * 22;
      const n = 1 + Math.floor(rnd() * 5);
      for (let i = 0; i < n && rnd() > 0.06; i++) {
        const w = 20 + rnd() * 110;
        g.fillStyle = cols[Math.floor(rnd() * cols.length)] ?? cols[0] ?? "#9aa3ad";
        g.fillRect(x, y - 10, w, 10);
        x += w + 8;
      }
    }
    for (let y = 40; y < 300; y += 20) {
      g.fillStyle = "#596170";
      g.fillRect(16 + (rnd() > 0.6 ? 14 : 0), y - 9, 60 + rnd() * 70, 8);
    }
    if (variant === 1) {
      g.fillStyle = "#0b0d10";
      g.fillRect(0, 0, 1024, 420);
      g.font = "14px monospace";
      for (let y = 24; y < 410; y += 18) {
        g.fillStyle = rnd() > 0.85 ? "#e5c07b" : rnd() > 0.7 ? "#98c379" : "#8b93a0";
        g.fillText(
          "> " + "build ok ".repeat(1 + Math.floor(rnd() * 3)).slice(0, 10 + rnd() * 40),
          14,
          y,
        );
      }
    }
  });
}

/** Snowy mountains over a still lake, painted into (x,y,w,h). */
export function drawMountainLake(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const horizon = y + h * 0.62;
  const sky = g.createLinearGradient(0, y, 0, horizon);
  sky.addColorStop(0, "#2b3f7a");
  sky.addColorStop(0.6, "#7d86c4");
  sky.addColorStop(1, "#d9b7c9");
  g.fillStyle = sky;
  g.fillRect(x, y, w, horizon - y);
  const ridge = (peaks: [number, number][], fill: string) => {
    g.beginPath();
    g.moveTo(x, horizon);
    for (const [px, py] of peaks) g.lineTo(x + px * w, y + py * h);
    g.lineTo(x + w, horizon);
    g.closePath();
    g.fillStyle = fill;
    g.fill();
  };
  const far: [number, number][] = [
    [0, 0.5],
    [0.15, 0.36],
    [0.3, 0.44],
    [0.48, 0.2],
    [0.62, 0.38],
    [0.78, 0.28],
    [0.92, 0.42],
    [1, 0.4],
  ];
  ridge(far, "#5d6aa0");
  // snow caps: same ridge clipped to the upper band
  g.save();
  g.beginPath();
  g.rect(x, y, w, h * 0.34);
  g.clip();
  ridge(far, "#eef0fa");
  g.restore();
  ridge(
    [
      [0, 0.56],
      [0.2, 0.48],
      [0.38, 0.56],
      [0.55, 0.46],
      [0.72, 0.54],
      [0.88, 0.47],
      [1, 0.55],
    ],
    "#2e3a5c",
  );
  ridge(
    [
      [0, 0.6],
      [0.1, 0.55],
      [0.3, 0.6],
      [0.7, 0.58],
      [0.85, 0.53],
      [1, 0.6],
    ],
    "#1d2a3a",
  );
  // lake: mirrored, darkened copy of the scene above the horizon
  g.save();
  g.translate(0, horizon * 2);
  g.scale(1, -1);
  g.globalAlpha = 0.7;
  g.drawImage(
    g.canvas,
    x,
    y + h * 0.24,
    w,
    horizon - y - h * 0.24,
    x,
    y + h * 0.24,
    w,
    horizon - y - h * 0.24,
  );
  g.restore();
  g.fillStyle = "rgba(10,20,45,0.45)";
  g.fillRect(x, horizon, w, y + h - horizon);
  g.fillStyle = "rgba(255,255,255,0.18)";
  for (let i = 0; i < 18; i++)
    g.fillRect(x + rnd() * w, horizon + rnd() * (y + h - horizon), 10 + rnd() * 60, 1.5);
}

/** Desktop wallpaper screen; `sidebar` adds a file explorer pane on the left. */
export function mountainScreen(sidebar = false, w = 1024, h = 600) {
  return make(w, h, (g) => {
    drawMountainLake(g, 0, 0, w, h);
    if (sidebar) {
      const sw = w * 0.3;
      g.fillStyle = "rgba(18,24,36,0.94)";
      g.fillRect(0, 0, sw, h);
      g.font = `${Math.round(h * 0.022)}px sans-serif`;
      for (let i = 0, yy = h * 0.08; yy < h * 0.9; i++, yy += h * 0.035) {
        const indent = (i % 5 === 0 ? 0 : i % 3 === 0 ? 2 : 1) * sw * 0.06;
        g.fillStyle = i % 5 === 0 ? "#7fa7e8" : "#8a94a6";
        g.fillRect(sw * 0.06 + indent, yy - h * 0.012, sw * 0.05, h * 0.016);
        g.fillRect(sw * 0.14 + indent, yy - h * 0.01, sw * (0.25 + rnd() * 0.3), h * 0.012);
      }
    }
    // taskbar
    g.fillStyle = "rgba(15,18,28,0.75)";
    g.fillRect(0, h - h * 0.045, w, h * 0.045);
    for (let i = 0; i < 9; i++) {
      g.fillStyle = ["#5b8def", "#e8eaf0", "#f2b33d", "#3fb68b"][i % 4] ?? "#e8eaf0";
      g.fillRect(w / 2 - 4.5 * w * 0.028 + i * w * 0.028, h - h * 0.035, w * 0.016, h * 0.025);
    }
  });
}

/** Natural rattan cane webbing (octagonal weave) on a light frame colour. */
export function caneWeave() {
  return make(256, 256, (g) => {
    g.fillStyle = "#3b2c1e";
    g.fillRect(0, 0, 256, 256);
    g.lineCap = "round";
    const strand = (x0: number, y0: number, x1: number, y1: number) => {
      g.strokeStyle = "#d9bf91";
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(x0, y0);
      g.lineTo(x1, y1);
      g.stroke();
      g.strokeStyle = "rgba(255,240,210,0.35)";
      g.lineWidth = 1.5;
      g.stroke();
    };
    // vertical, horizontal and both diagonals: the classic open cane pattern
    for (let i = 0; i <= 256; i += 32) {
      strand(i, 0, i, 256);
      strand(0, i, 256, i);
    }
    for (let i = -256; i <= 256; i += 32) {
      strand(i + 16, 0, i + 16 + 256, 256);
      strand(i + 16, 256, i + 16 + 256, 0);
    }
  });
}

/** Glossy white plastic shell with small scattered dimples (the bot's body). */
export function dimpled(base = "#f3f4f6") {
  return make(512, 256, (g) => {
    g.fillStyle = base;
    g.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 150; i++) {
      const x = rnd() * 512,
        y = 20 + rnd() * 216,
        r = 0.9 + rnd() * 1.3;
      // soft shadowed pit with a faint highlight on its lower edge
      g.fillStyle = "rgba(150,156,168,0.4)";
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.7)";
      g.beginPath();
      g.arc(x, y + r * 0.6, r * 0.5, 0, Math.PI * 2);
      g.fill();
    }
  });
}

/** Vertical colour ramp, first stop at the top; mapped onto a sphere it runs pole to pole. */
export function ramp(stops: string[]) {
  return make(4, 256, (g) => {
    const gr = g.createLinearGradient(0, 0, 0, 256);
    stops.forEach((c, i) => gr.addColorStop(i / (stops.length - 1), c));
    g.fillStyle = gr;
    g.fillRect(0, 0, 4, 256);
  });
}
