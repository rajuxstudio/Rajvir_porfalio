import { Lock } from "lucide-react";
import ProjectDetailHero from "@/components/projects/shared/ProjectDetailHero";

const techStack = ["React", "TypeScript", "Tailwind CSS"];

export default function NewProjectDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="New Project"
        category="Coming Soon"
        industryDomain="TBD"
        gradient="linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
        applications={["web"]}
        role="Design + Code"
        duration="TBD"
      />

      <div className="px-6 sm:px-8 pb-8 flex flex-col gap-6 mt-6">
        {/* Placeholder */}
        <div className="rounded-xl p-8 bg-muted border border-border text-center">
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
    </div>
  );
}
