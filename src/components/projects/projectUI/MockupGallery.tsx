import { useState } from "react";

interface MockupGalleryProps {
  mockups: { src: string; alt: string }[];
}

export default function MockupGallery({ mockups }: MockupGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (!mockups || mockups.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Mockups & Screenshots
      </h4>

      {/* Main preview */}
      <div className="rounded-2xl overflow-hidden border border-border bg-muted">
        <img
          src={mockups[selected].src}
          alt={mockups[selected].alt}
          className="w-full h-auto max-h-[400px] object-contain"
          loading="lazy"
        />
      </div>

      {/* Thumbnails */}
      {mockups.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {mockups.map((mockup, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                selected === i
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-border hover:border-muted-foreground/40"
              }`}
            >
              <img
                src={mockup.src}
                alt={mockup.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
