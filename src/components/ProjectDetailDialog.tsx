import { X, Monitor, Smartphone, Tablet, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Project {
  id: number;
  title: string;
  category: string;
  industryDomain?: string;
  applications?: ("web" | "mobile" | "tablet")[];
  description: string;
  color: string;
  link: string;
  isViewAll?: boolean;
  mockup?: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

export default function ProjectDetailDialog({ open, onClose, project }: Props) {
  const isMobile = useIsMobile();

  if (!open || !project) return null;

  const platformLabel = { web: "Web App", mobile: "Mobile App", tablet: "Tablet App" };
  const platformIcon = {
    web: <Monitor size={14} />,
    mobile: <Smartphone size={14} />,
    tablet: <Tablet size={14} />,
  };

  const content = (
    <div className="flex flex-col gap-6">
      {/* Mockup preview */}
      {project.mockup && (
        <div className="w-full rounded-xl overflow-hidden" style={{ background: project.color }}>
          <img
            src={project.mockup}
            alt={project.title}
            className="w-full h-48 md:h-64 object-cover opacity-90"
          />
        </div>
      )}

      {/* Category badge */}
      <div className="flex flex-wrap gap-2">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: project.color, color: "white" }}
        >
          {project.category}
        </span>
        {project.industryDomain && (
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
          >
            {project.industryDomain}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
        {project.description}
      </p>

      {/* Platform icons */}
      {project.applications && project.applications.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
            Platforms
          </span>
          <div className="flex gap-3">
            {project.applications.map((app) => (
              <span
                key={app}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
              >
                {platformIcon[app]} {platformLabel[app]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* View project link */}
      {!project.isViewAll && project.link !== "#" && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{ background: project.color, color: "white" }}
        >
          <ExternalLink size={15} /> View Project
        </a>
      )}
    </div>
  );

  // ── Mobile: Bottom Sheet ──
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
        <div className="relative z-10 flex justify-center mb-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md"
            style={{ background: "hsl(var(--card) / 0.8)", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div
          className="relative z-10 w-full rounded-t-2xl p-6 pb-8 animate-slide-up max-h-[85vh] overflow-y-auto"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderBottom: "none" }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 rounded-full" style={{ background: "hsl(var(--border))" }} />
          </div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "hsl(var(--accent))" }}>
            {project.title}
          </h2>
          {content}
        </div>
      </div>
    );
  }

  // ── Desktop: Right Side Panel ──
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <button
        onClick={onClose}
        className="absolute z-20 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
        style={{
          right: "calc(100vw - 100vw / 1.618 + 12px)",
          color: "hsl(var(--muted-foreground))",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 2px 12px hsl(var(--foreground) / 0.1)",
        }}
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <div
        className="relative z-10 h-full animate-slide-left overflow-y-auto"
        style={{
          width: "calc(100vw - 100vw / 1.618)",
          background: "hsl(var(--card))",
          borderLeft: "1px solid hsl(var(--border))",
          boxShadow: "-8px 0 30px hsl(var(--foreground) / 0.08)",
        }}
      >
        <div className="p-8 pt-10 flex flex-col gap-6 h-full">
          <h2 className="text-4xl font-extrabold leading-tight" style={{ color: "hsl(var(--accent))" }}>
            {project.title}
          </h2>
          {content}
        </div>
      </div>
    </div>
  );
}
