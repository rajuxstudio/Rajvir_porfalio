import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Monitor, Smartphone, Tablet, ExternalLink } from "lucide-react";
import { projects, Project } from "@/lib/projectsData";

const platformLabel = { web: "Web App", mobile: "Mobile App", tablet: "Tablet App" };
const platformIcon = {
  web: <Monitor size={16} />,
  mobile: <Smartphone size={16} />,
  tablet: <Tablet size={16} />,
};

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
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all hover:scale-105"
          style={{
            background: "hsl(var(--card) / 0.85)",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 4px 20px hsl(var(--foreground) / 0.08)",
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Hero banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "50vh",
          background: project.color,
        }}
      >
        {project.mockup && project.mockup !== "/placeholder.svg" && (
          <img
            src={project.mockup}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16" style={{ maxWidth: `calc(100vw / 1.618)`, margin: "0 auto" }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
              {project.category}
            </span>
            {project.industryDomain && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                {project.industryDomain}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-6 md:px-16 py-12" style={{ maxWidth: `calc(100vw / 1.618)` }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main content - 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-10">
            {/* Overview */}
            {project.overview && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </section>
            )}

            {/* Challenge & Solution */}
            {project.challenge && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">The Challenge</h3>
                  <p className="text-foreground text-sm leading-relaxed">{project.challenge}</p>
                </div>
                <div
                  className="rounded-2xl p-6"
                  style={{ background: project.color, border: "1px solid transparent" }}
                >
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
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl p-4"
                      style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                        style={{ background: project.color }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground">{feat}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - 1 col */}
          <div className="flex flex-col gap-8">
            {/* Platforms */}
            {project.applications && project.applications.length > 0 && (
              <div
                className="rounded-2xl p-5"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Platforms</h3>
                <div className="flex flex-col gap-2">
                  {project.applications.map((app) => (
                    <span
                      key={app}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      {platformIcon[app]} {platformLabel[app]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div
                className="rounded-2xl p-5"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg"
                      style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--border))" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
    </div>
  );
}
