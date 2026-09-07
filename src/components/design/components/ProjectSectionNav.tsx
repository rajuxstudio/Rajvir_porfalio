import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Tablet, type LucideIcon } from "lucide-react";
import type { DevicePlatform } from "../projects/types";

interface NavSection {
  id: string;
  label: string;
  /** Set via `data-nav-platform` when a section only applies to one device
   *  (e.g. a "Web"-only deep-dive). Sections without it always show. */
  platform?: DevicePlatform;
}

interface ProjectSectionNavProps {
  /** The element the sheet actually scrolls inside — used as the IntersectionObserver root. */
  scrollRef: React.RefObject<HTMLElement>;
  /** Wraps whichever content is currently rendered (generic or custom) — re-scanned for
   *  `[data-nav-section]` markers whenever `watchKey` changes. */
  contentRef: React.RefObject<HTMLElement>;
  /** Changes whenever the open project changes, forcing a re-scan for its own sections. */
  watchKey: string;
  devicePlatforms?: DevicePlatform[];
  activePlatform?: DevicePlatform;
  onPlatformChange?: (platform: DevicePlatform) => void;
}

const DEVICE_ICONS: Record<DevicePlatform, { icon: LucideIcon; label: string }> = {
  mobile: { icon: Smartphone, label: "Mobile" },
  tablet: { icon: Tablet, label: "Tablet" },
  web: { icon: Monitor, label: "Web" },
};
const DEVICE_ORDER: DevicePlatform[] = ["mobile", "tablet", "web"];

/**
 * Slim floating pill bar, pinned to the bottom of the bottom sheet: a text-only
 * accordion-style section nav (active label gets a sliding pill highlight, driven
 * by scrollspy) so the reader always knows which section they're in.
 *
 * Also carries a compact device switch (Mobile / Web / Tablet) when the project ships on
 * more than one platform — kept in sync with any other switch the project's own content
 * exposes (e.g. CloudGavel's Web/Mobile switch below its Overview), so either control
 * works and both stay in sync since they share the same lifted state.
 *
 * Sections are discovered from the DOM (`[id][data-nav-section][data-nav-label]`) rather
 * than passed in as data, so it works for both the generic ProjectContentSections layout
 * and any project's bespoke customContent without extra wiring per project. A section
 * tagged `data-nav-platform` only shows its pill while that device is selected.
 */
const ProjectSectionNav = ({
  scrollRef,
  contentRef,
  watchKey,
  devicePlatforms = [],
  activePlatform,
  onPlatformChange,
}: ProjectSectionNavProps) => {
  const [sections, setSections] = useState<NavSection[]>([]);
  const [activeId, setActiveId] = useState("");

  // Discover this project's sections once its content has mounted.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const raf = requestAnimationFrame(() => {
      const found = Array.from(root.querySelectorAll<HTMLElement>("[data-nav-section]"))
        .map((el) => ({ id: el.id, label: el.dataset.navLabel ?? "", platform: el.dataset.navPlatform as DevicePlatform | undefined }))
        .filter((s) => s.id && s.label);
      setSections(found);
      setActiveId(found[0]?.id ?? "");
    });
    return () => cancelAnimationFrame(raf);
  }, [contentRef, watchKey]);

  // Scrollspy — highlight whichever section is nearest the top of the visible area.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || sections.length === 0) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topmost.target.id);
      },
      { root: container, rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollRef, sections]);

  if (sections.length === 0) return null;

  const orderedDevices = DEVICE_ORDER.filter((d) => devicePlatforms.includes(d));
  const showDeviceSwitch = orderedDevices.length > 1 && !!onPlatformChange;

  // Sections tagged for a specific device only show up in the nav while that
  // device is selected — e.g. a "Web"-only deep-dive hides once you switch to Mobile.
  const visibleSections = activePlatform
    ? sections.filter((s) => !s.platform || s.platform === activePlatform)
    : sections;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-3">
      <div className="pointer-events-auto flex max-w-full items-center gap-1.5 rounded-full border border-border bg-card/95 p-1 shadow-lg shadow-black/10 backdrop-blur-md">
        <motion.nav layout className="flex max-w-[68vw] items-center gap-0.5 overflow-x-auto sm:max-w-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <AnimatePresence initial={false}>
            {visibleSections.map((s) => {
              const isActive = s.id === activeId;
              return (
                <motion.button
                  key={s.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  type="button"
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="relative flex-shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap"
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-section-nav-active"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 34 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {s.label}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.nav>

        {showDeviceSwitch && (
          <>
            <span className="h-5 w-px flex-shrink-0 bg-border" aria-hidden="true" />
            <div className="flex flex-shrink-0 items-center gap-0.5">
              {orderedDevices.map((d) => {
                const { icon: Icon, label } = DEVICE_ICONS[d];
                const isActive = d === activePlatform;
                return (
                  <button
                    key={d}
                    type="button"
                    title={`Show ${label} screens`}
                    onClick={() => onPlatformChange?.(d)}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectSectionNav;
