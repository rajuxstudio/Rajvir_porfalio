import type { ElementType, ReactNode } from "react";
import { Check } from "lucide-react";

/**
 * Shared building blocks for every case study's bespoke content (Bumper Mandi,
 * Echelon Constructors, CloudGavel, LENSS). Structure, spacing, and the base
 * palette come from the site's shadcn theme tokens (bg-background, bg-card,
 * border-border, text-muted-foreground, ...) so every project is light/dark
 * aware automatically. Each project keeps its own identity by passing an
 * `Accent` — its brand color, expressed as literal Tailwind classes (so
 * Tailwind's JIT can see and keep them) — into whichever of these it uses.
 *
 * Usage pattern: define one `const ACCENT: Accent = { text: "...", bg: "...",
 * softBg: "..." }` per project file and pass it to these components.
 */

export interface Accent {
  /** Text color, e.g. "text-cyan-600 dark:text-cyan-400" */
  text: string;
  /** Full-strength background for solid chips/icons, e.g. "bg-cyan-500" */
  bg: string;
  /** Low-opacity tint background, e.g. "bg-cyan-500/10" */
  softBg: string;
  /** Border color, e.g. "border-cyan-500" */
  border: string;
}

/* ---------- Layout ---------- */

export type SectionBg = "default" | "muted" | "invert";

interface SectionProps {
  id?: string;
  /** Omit for footer-style sections that shouldn't show up in the bottom nav. */
  label?: string;
  /** Restricts this section's nav pill to only show while that device is selected. */
  platform?: "web" | "mobile" | "tablet";
  /** CSS-hides the section (display:none) instead of unmounting it, so the bottom
   *  nav's already-discovered section list stays valid across a device switch. */
  hidden?: boolean;
  /** "default" = page background, "muted" = subtle tonal band, "invert" = inverted
   *  (dark-on-light-theme / light-on-dark-theme) for an occasional high-contrast break. */
  bg?: SectionBg;
  className?: string;
  children: ReactNode;
}

const SECTION_BG: Record<SectionBg, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted/40 text-foreground",
  invert: "bg-foreground text-background",
};

export function Section({ id, label, platform, hidden = false, bg = "default", className = "", children }: SectionProps) {
  return (
    <section className={`px-6 py-20 sm:px-10 sm:py-28 ${SECTION_BG[bg]} ${hidden ? "hidden" : ""} ${className}`}>
      <div
        id={id}
        {...(label ? { "data-nav-section": true, "data-nav-label": label } : {})}
        {...(platform ? { "data-nav-platform": platform } : {})}
        className="mx-auto max-w-6xl scroll-mt-24"
      >
        {children}
      </div>
    </section>
  );
}

/* ---------- Text / labels ---------- */

export function SectionNumber({ n, accent }: { n: string; accent: Accent }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`font-mono text-sm font-bold ${accent.text}`}>{n}</span>
      <span className="h-px flex-1 max-w-[48px] bg-border" />
    </div>
  );
}

export function Badge({ children, accent }: { children: ReactNode; accent: Accent }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${accent.softBg} ${accent.text}`}>
      {children}
    </span>
  );
}

export function Pill({ children, accent }: { children: ReactNode; accent?: Accent }) {
  return accent ? (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${accent.softBg} ${accent.text}`}>
      {children}
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  );
}

/* ---------- Cards ---------- */

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}

export function IconBadge({ icon: Icon, accent }: { icon: ElementType; accent: Accent }) {
  return (
    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${accent.softBg} ${accent.text}`}>
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

/* ---------- Data display ---------- */

export function StatBlock({ value, label, accent }: { value: string; label: string; accent: Accent }) {
  return (
    <div>
      <div className={`text-[38px] font-bold leading-none sm:text-[46px] ${accent.text}`}>{value}</div>
      <div className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{label}</div>
    </div>
  );
}

export function CheckItem({ children, accent }: { children: ReactNode; accent: Accent }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${accent.softBg}`}>
        <Check className={`h-2.5 w-2.5 ${accent.text}`} strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}
