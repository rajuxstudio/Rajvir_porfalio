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
            className="rounded-xl border border-border bg-background p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">{project.category}</span>
                  {project.industryDomain && (
                    <span className="text-[10px] text-muted-foreground">· {project.industryDomain}</span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{project.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>

                {project.techStack && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border text-muted-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Color swatch */}
              <div
                className="w-10 h-10 rounded-lg shrink-0"
                style={{ background: project.color }}
              />
            </div>

            {project.applications && (
              <div className="flex gap-1.5 mt-3">
                {project.applications.map((app) => (
                  <span key={app} className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                    {app === "web" && <Monitor size={10} className="text-muted-foreground" />}
                    {app === "mobile" && <Smartphone size={10} className="text-muted-foreground" />}
                    {app === "tablet" && <Tablet size={10} className="text-muted-foreground" />}
                  </span>
                ))}
              </div>
            )}
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
