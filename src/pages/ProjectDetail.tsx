import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projectsData";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Project not found</h1>
          <button onClick={() => navigate("/")} className="text-accent underline">Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all hover:scale-105 bg-card/85 text-foreground border border-border shadow-lg"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Centered hero header */}
      <div className="flex flex-col items-center text-center px-6 md:px-16 pt-20 pb-12 gap-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
          {project.title}
        </h1>
        {project.industryDomain && (
          <p className="text-sm font-medium text-accent">{project.industryDomain}</p>
        )}
        <span className="text-xs font-semibold px-4 py-1.5 rounded-full border border-border bg-muted text-foreground">
          {project.category}
        </span>
        {project.overview && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{project.overview}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          {project.role && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground">
              <span className="font-bold text-foreground">Role:</span> {project.role}
            </span>
          )}
          {project.applications && project.applications.length > 0 && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground">
              <span className="font-bold text-foreground">Platform:</span> {project.applications.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(", ")}
            </span>
          )}
          {project.duration && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground">
              <span className="font-bold text-foreground">Duration:</span> {project.duration}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-6 md:px-16 py-12" style={{ maxWidth: "900px" }}>
        <div className="flex flex-col gap-10">
          {/* Challenge & Solution */}
          {project.challenge && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 bg-muted border border-border">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">The Challenge</h3>
                <p className="text-foreground text-sm leading-relaxed">{project.challenge}</p>
              </div>
              <div className="rounded-2xl p-6 text-white" style={{ background: project.color }}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/70 mb-3">The Solution</h3>
                <p className="text-white text-sm leading-relaxed">{project.solution}</p>
              </div>
            </section>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl p-4 bg-muted border border-border">
                    <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: project.color }}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* External link */}
          {!project.isViewAll && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] text-white"
              style={{ background: project.color }}
            >
              <ExternalLink size={15} /> View Live Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
