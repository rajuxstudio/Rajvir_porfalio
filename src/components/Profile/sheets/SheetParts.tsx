// Small building blocks shared by the Profile bottom sheets (About, Education, Certificates).
import type { LucideIcon } from "lucide-react";

/** Row of compact summary figures shown at the top of a sheet. */
export function StatRow({ stats }: { stats: { label: string; value: string; icon?: LucideIcon }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-2xl border border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
            {label}
          </div>
          <div className="mt-1 truncate text-lg font-semibold text-foreground">{value}</div>
        </div>
      ))}
    </div>
  );
}

/** Small uppercase section label inside a sheet. */
export function SectionLabel({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-4 mt-10 flex items-center justify-between gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{children}</h3>
      {aside}
    </div>
  );
}

export function SkillChips({ skills }: { skills: string[] }) {
  if (!skills.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s) => (
        <span key={s} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/70">
          {s}
        </span>
      ))}
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mar 2025" / "2020" / "Present" → Date (start of that month/year). */
export function parseWhen(raw: string): Date {
  const s = raw.trim();
  if (/present/i.test(s)) return new Date();
  const parts = s.split(/\s+/);
  if (parts.length === 1) return new Date(Number(parts[0]), 0, 1);
  return new Date(Number(parts[1]), Math.max(MONTHS.indexOf(parts[0].slice(0, 3)), 0), 1);
}

/** Splits "Mar 2025 – Present" into its two ends (a single year gives the same start and end). */
export function splitPeriod(period: string): [string, string] {
  const [a, b] = period.split(/\s*[–-]\s*/);
  return [a, b ?? a];
}

/** Whole months covered by a period (at least 1). */
export function monthsOf(period: string): number {
  const [a, b] = splitPeriod(period);
  const start = parseWhen(a);
  const end = parseWhen(b);
  return Math.max((end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()), 1);
}

export function durationOf(period: string): string {
  const total = monthsOf(period);
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ") || "1 mo";
}

export const isOngoing = (period: string) => /present/i.test(period);
