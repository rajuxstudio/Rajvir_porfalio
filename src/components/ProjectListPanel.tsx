import { projects, Project } from "@/lib/projectsData";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import ProjectDetailDialog from "./ProjectDetailDialog";

type Props = {
  filterType: "design" | "code";
};

export default function ProjectListPanel({ filterType }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter(
    (p) => !p.isViewAll && p.projectType?.includes(filterType)
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects yet in this category.</p>
        )}
        {filtered.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="rounded-xl border border-border bg-background overflow-hidden text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            {/* Gradient accent strip */}
            <div className="h-1.5 w-full" style={{ background: project.color }} />

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{project.category}</span>
                    {project.industryDomain && (
                      <span className="text-[10px] text-muted-foreground">· {project.industryDomain}</span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{project.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                </div>

                {/* Platform icons */}
                {project.applications && (
                  <div className="flex gap-1 shrink-0">
                    {project.applications.map((app) => (
                      <span key={app} className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center">
                        {app === "web" && <Monitor size={11} className="text-muted-foreground" />}
                        {app === "mobile" && <Smartphone size={11} className="text-muted-foreground" />}
                        {app === "tablet" && <Tablet size={11} className="text-muted-foreground" />}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {project.techStack && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-secondary text-muted-foreground">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <ProjectDetailDialog
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
}
