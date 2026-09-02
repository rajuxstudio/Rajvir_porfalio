import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import type { ComponentType } from "react";

export type MockupPlatform = "mobile" | "web" | "tablet";

export interface MockupItem {
  src: string;
  alt?: string;
  platform: MockupPlatform;
}

const PLATFORM_ORDER: MockupPlatform[] = ["mobile", "web", "tablet"];

const PLATFORM_META: Record<MockupPlatform, { label: string; icon: ComponentType<{ className?: string }> }> = {
  mobile: { label: "Mobile", icon: Smartphone },
  web: { label: "Web", icon: Monitor },
  tablet: { label: "Tablet", icon: Tablet },
};

interface MockupGalleryProps {
  mockups: MockupItem[];
  /** Override the section heading. Defaults to "Product UI Showcase". */
  title?: string;
}

/**
 * Screenshot gallery with a big preview, thumbnail strip, and a platform
 * switch (Mobile / Web / Tablet). The switch only shows tabs for platforms
 * that actually have mockups — pass whichever platforms the project has.
 */
const MockupGallery = ({ mockups, title = "Product UI Showcase" }: MockupGalleryProps) => {
  const platforms = PLATFORM_ORDER.filter((p) => mockups.some((m) => m.platform === p));
  const [activePlatform, setActivePlatform] = useState<MockupPlatform>(platforms[0]);
  const [active, setActive] = useState(0);

  if (!mockups || mockups.length === 0) return null;

  const filtered = mockups.filter((m) => m.platform === activePlatform);

  const handlePlatformChange = (platform: MockupPlatform) => {
    setActivePlatform(platform);
    setActive(0);
  };

  return (
    <div className="pt-4 border-t border-border/50">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>

        {platforms.length > 1 && (
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
            {platforms.map((platform) => {
              const { label, icon: Icon } = PLATFORM_META[platform];
              const isActive = platform === activePlatform;
              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformChange(platform)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main image — object-contain + a flexible height so portrait (mobile) and
          landscape (web/tablet) screenshots both display in full, uncropped. */}
      <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/30 flex items-center justify-center min-h-[240px] max-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activePlatform}-${active}`}
            src={filtered[active]?.src}
            alt={filtered[active]?.alt ?? `${PLATFORM_META[activePlatform].label} mockup ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[520px] w-auto max-w-full object-contain"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {filtered.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {filtered.map((mockup, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 bg-muted/30 flex items-center justify-center transition-all ${
                i === active
                  ? "border-primary shadow-md"
                  : "border-border/50 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={mockup.src} alt={mockup.alt ?? `Thumb ${i + 1}`} className="max-w-full max-h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockupGallery;
