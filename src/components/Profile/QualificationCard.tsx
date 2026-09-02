import { GraduationCap, Award, BookOpen, School } from "lucide-react";

type Qualification = {
  degree: string;
  field: string;
  years: string;
  icon: typeof GraduationCap;
  current?: boolean;
};

const QUALIFICATIONS: Qualification[] = [
  { degree: "MCA", field: "Master of Computer Apps", years: "2024 – 26", icon: GraduationCap, current: true },
  { degree: "M.Com", field: "Master of Commerce", years: "2020 – 22", icon: Award },
  { degree: "B.Com", field: "Bachelor of Commerce", years: "2017 – 20", icon: BookOpen },
  { degree: "12th", field: "Higher Secondary", years: "2017", icon: School },
];

export default function QualificationCard() {
  return (
    <div className="group relative h-[270px] w-[290px]">
      <div className="absolute right-0 top-3 w-[248px] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_25px_50px_-20px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-1">
        <div className="relative flex items-center justify-between bg-accent px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={2.25} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground/90">Education</span>
          </div>
          <span className="rounded-full bg-accent-foreground/15 px-1.5 py-0.5 text-[9px] font-medium text-accent-foreground ring-1 ring-accent-foreground/20">
            {QUALIFICATIONS.length} degrees
          </span>
        </div>

        <ul className="divide-y divide-border px-3 py-2">
          {QUALIFICATIONS.map((q) => {
            const Icon = q.icon;
            return (
              <li key={q.degree} className="flex items-center gap-2.5 py-1.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold leading-tight text-foreground">{q.degree}</span>
                    {q.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300">
                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                        Now
                      </span>
                    )}
                  </div>
                  <div className="truncate text-[9.5px] leading-tight text-muted-foreground">{q.field}</div>
                </div>
                <span className="shrink-0 tabular-nums text-[10px] font-medium text-muted-foreground">{q.years}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute left-0 top-0 z-10 flex h-16 w-16 -rotate-6 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-3">
        <GraduationCap className="h-7 w-7 text-foreground" strokeWidth={1.75} />
      </div>
    </div>
  );
}