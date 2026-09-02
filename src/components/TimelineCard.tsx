import type { LucideIcon } from "lucide-react";

export type TimelineCardProps = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  icon: LucideIcon;
  city?: string;
  skills: string[];
  index: number;
  isLeft: boolean;
};

export default function TimelineCard({
  year,
  title,
  subtitle,
  description,
  icon: Icon,
  city,
  skills,
  isLeft,
}: TimelineCardProps) {
  return (
    <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <span className="absolute left-0 top-1.5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background bg-accent text-accent-foreground shadow-sm md:left-1/2">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </span>

      <div className="w-full pl-12 md:w-1/2 md:px-10 md:pl-0">
        <div
          className={`rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6 ${
            isLeft ? "md:text-right" : "md:text-left"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{year}</span>
          <h3 className="mt-1 text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {subtitle}
            {city && <span> · {city}</span>}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">{description}</p>

          <div className={`mt-4 flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-muted px-2 py-[3px] text-[10px] font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
