import { Lock } from "lucide-react";

const techStack = ["React", "TypeScript", "Tailwind CSS"];

export default function NewProjectDetail() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)" }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Case Study</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">New Project</h2>
        <p className="text-sm text-white/80 mt-2 max-w-md mx-auto">
          Details coming soon — a new project currently in development
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {[
            { label: "Role", value: "Design + Code" },
            { label: "Duration", value: "TBD" },
            { label: "Platform", value: "Web" },
          ].map((chip) => (
            <span key={chip.label} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/15 text-white backdrop-blur-sm">
              {chip.label}: {chip.value}
            </span>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">Coming Soon</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">TBD</span>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl p-8 bg-muted border border-border text-center">
        <p className="text-sm text-muted-foreground">
          This project is currently being documented. Check back soon for the full case study with details on the challenge, approach, and outcome.
        </p>
      </div>

      {/* Tech stack */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">{t}</span>
          ))}
        </div>
      </div>

      {/* Confidentiality */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl p-4 border border-border">
        <Lock size={12} className="shrink-0 mt-0.5" />
        <p>This case study presents design contributions and workflow improvements. Specific operational data and proprietary information have been omitted for confidentiality purposes.</p>
      </div>
    </div>
  );
}
