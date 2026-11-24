// Tiny isometric room drawing (SVG), used by the Profile page's "Find me" card.

/** Tiny isometric room model (links to the 3D room). */
export function MiniRoom() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full drop-shadow-[0_14px_14px_rgba(0,0,0,0.3)]">
      <polygon points="120,30 220,80 220,150 120,100" fill="#2c3b5e" />
      <polygon points="120,30 20,80 20,150 120,100" fill="#3a4b73" />
      <polygon points="120,100 220,150 120,200 20,150" fill="#c9a77a" />
      <polygon points="40,90 70,75 70,100 40,115" fill="#f6efe2" stroke="#18181b" strokeWidth="2" />
      <polygon points="78,71 100,60 100,80 78,91" fill="#f6efe2" stroke="#b98a55" strokeWidth="2" />
      <polygon points="140,62 200,92 200,104 140,74" fill="#121418" />
      <line x1="146" y1="70" x2="194" y2="94" stroke="#7fe3ff" strokeWidth="2" strokeLinecap="round" />
      <polygon points="150,128 196,151 176,161 130,138" fill="#f4f3f0" />
      <polygon points="130,138 176,161 176,170 130,147" fill="#d9d6cf" />
      <polygon points="160,118 182,129 182,141 160,130" fill="#1f2a44" />
      <ellipse cx="60" cy="158" rx="9" ry="5" fill="#a8553a" />
      <circle cx="60" cy="146" r="11" fill="#5f7a64" />
      <circle cx="54" cy="140" r="7" fill="#6f8d74" />
      <polygon points="70,128 108,147 88,157 50,138" fill="#efe9dd" />
      <polygon points="50,138 88,157 88,164 50,145" fill="#c9bca8" />
    </svg>
  );
}
