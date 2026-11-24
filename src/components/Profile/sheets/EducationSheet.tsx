// "Education" bottom sheet: summary figures, then a single-column timeline (newest first) that
// uses the sheet's full width. An ongoing qualification is marked "In progress".
import { motion } from "framer-motion";
import { CalendarRange, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { educationData } from "@/components/EducationTimeline";
import { SectionLabel, SkillChips, StatRow, isOngoing, parseWhen, splitPeriod } from "./SheetParts";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function EducationSheet() {
  const degrees = educationData.filter((e) => !/grade|12th|10th/i.test(e.title));
  const highest = degrees[0]?.title.match(/^[^(]+/)?.[0].trim() ?? "—";
  const since = Math.min(...educationData.map((e) => parseWhen(splitPeriod(e.year)[0]).getFullYear()));

  return (
    <div>
      <StatRow
        stats={[
          { label: "Highest", value: highest, icon: GraduationCap },
          { label: "Degrees", value: String(degrees.length), icon: Sparkles },
          { label: "Learning since", value: String(since), icon: CalendarRange },
        ]}
      />

      <SectionLabel>Timeline</SectionLabel>

      <motion.ol variants={list} initial="hidden" animate="show" className="relative">
        <span className="absolute bottom-6 left-[19px] top-6 w-px bg-border" aria-hidden />
        {educationData.map((e) => {
          const Icon = e.icon;
          const ongoing = isOngoing(e.year);
          return (
            <motion.li key={e.title} variants={row} className="relative pb-5 pl-14 last:pb-0">
              <span
                className={`absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-xl border ${
                  ongoing ? "border-primary/40 bg-primary text-primary-foreground" : "border-border bg-card text-foreground/70"
                }`}
                aria-hidden
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>

              <div className={`rounded-2xl border bg-card p-5 ${ongoing ? "border-primary/30 shadow-md" : "border-border/70"}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground/70">{e.year}</span>
                  {ongoing && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">In progress</span>
                  )}
                </div>
                <h4 className="mt-3 text-base font-semibold leading-snug text-foreground sm:text-lg">{e.title}</h4>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
                  {e.subtitle}
                  {e.city && (
                    <span className="inline-flex items-center gap-1">
                      · <MapPin className="h-3.5 w-3.5" />
                      {e.city}
                    </span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{e.description}</p>
                <div className="mt-4">
                  <SkillChips skills={e.skills} />
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
