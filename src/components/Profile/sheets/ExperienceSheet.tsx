// "Experience" bottom sheet: just the work history (opened from the Experience card).
// `WorkHistory` is the timeline itself (current role first, then newest first; the most recent
// role starts expanded, the rest expand on click) and is also used inside the About sheet.
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Building2, ChevronDown, Clock, MapPin } from "lucide-react";
import { experiences } from "@/components/about/AboutExperience";
import { PROFILE } from "@/components/Profile/IdCard";
import { SkillChips, StatRow, durationOf, isOngoing, parseWhen, splitPeriod } from "./SheetParts";

const startOf = (period: string) => parseWhen(splitPeriod(period)[0]);

export function WorkHistory() {
  const roles = useMemo(
    () =>
      [...experiences].sort(
        (a, b) => Number(isOngoing(b.period)) - Number(isOngoing(a.period)) || startOf(b.period).getTime() - startOf(a.period).getTime(),
      ),
    [],
  );
  const [open, setOpen] = useState(0);

  return (
    <ol className="relative">
      {/* rail */}
      <span className="absolute bottom-3 left-[11px] top-3 w-px bg-border" aria-hidden />
      {roles.map((r, i) => {
        const expanded = open === i;
        const now = isOngoing(r.period);
        return (
          <li key={r.company + r.period} className="relative pb-4 pl-10 last:pb-0">
            <span
              className={`absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                now ? "border-primary bg-primary" : "border-border bg-background"
              }`}
              aria-hidden
            >
              <span className={`h-2 w-2 rounded-full ${now ? "bg-primary-foreground" : "bg-muted-foreground/50"}`} />
            </span>

            <div className={`rounded-2xl border bg-card transition-shadow ${expanded ? "border-border shadow-md" : "border-border/70 hover:shadow-sm"}`}>
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : i)}
                aria-expanded={expanded}
                className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground">{r.title}</h4>
                    {now && (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {r.company} · {r.type}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <div className="hidden text-right sm:block">
                    <div className="text-xs font-medium text-foreground/80">{r.period}</div>
                    <div className="text-[11px] text-muted-foreground">{durationOf(r.period)}</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/70 px-4 pb-5 pt-4 sm:px-5">
                      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:hidden">
                        <span>{r.period}</span>
                        <span>{durationOf(r.period)}</span>
                      </div>
                      {r.location && (
                        <div className="mb-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {r.location}
                        </div>
                      )}
                      <ul className="space-y-2">
                        {r.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <SkillChips skills={r.skills} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function ExperienceSheet() {
  const companies = new Set(experiences.map((e) => e.company)).size;
  return (
    <div>
      <StatRow
        stats={[
          { label: "Experience", value: PROFILE.experience, icon: Clock },
          { label: "Roles", value: String(experiences.length), icon: Briefcase },
          { label: "Companies", value: String(companies), icon: Building2 },
        ]}
      />
      <div className="mt-8">
        <WorkHistory />
      </div>
    </div>
  );
}
