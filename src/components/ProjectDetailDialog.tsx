import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project } from "@/lib/projectsData";
import { lazy, Suspense } from "react";

// Per-project detail components
const detailComponents: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  "utility-plus": lazy(() => import("@/components/projects/UtilityPlusDetail")),
  "cloudgavel": lazy(() => import("@/components/projects/CloudGavelDetail")),
  "echelon-constructors": lazy(() => import("@/components/projects/EchelonConstructorsDetail")),
  "captable": lazy(() => import("@/components/projects/CaptableDetail")),
  "bumper-mandi": lazy(() => import("@/components/projects/BumperMandiDetail")),
  "react-portfolio": lazy(() => import("@/components/projects/ReactPortfolioDetail")),
};

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

export default function ProjectDetailDialog({ open, onClose, project }: Props) {
  const isMobile = useIsMobile();

  if (!open || !project) return null;

  const DetailComponent = detailComponents[project.slug];

  const content = (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>}>
      {DetailComponent ? <DetailComponent /> : (
        <p className="text-sm text-muted-foreground">{project.description}</p>
      )}
    </Suspense>
  );

  // ── Mobile: Bottom Sheet ──
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
        <div className="relative z-10 flex justify-center mb-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-card/80 text-muted-foreground border border-border"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative z-10 w-full rounded-t-2xl p-6 pb-8 animate-slide-up max-h-[85vh] overflow-y-auto bg-card border border-border border-b-0">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>
          <h2 className="text-xl font-bold mb-4 text-accent">{project.title}</h2>
          {content}
        </div>
      </div>
    );
  }

  // ── Desktop: Right Side Panel (64vw) ──
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <button
        onClick={onClose}
        className="absolute z-20 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors bg-card text-muted-foreground border border-border"
        style={{
          right: "calc(64vw + 12px)",
          boxShadow: "0 2px 12px hsl(var(--foreground) / 0.1)",
        }}
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <div
        className="relative z-10 h-full animate-slide-left overflow-y-auto bg-card border-l border-border"
        style={{
          width: "64vw",
          boxShadow: "-8px 0 30px hsl(var(--foreground) / 0.08)",
        }}
      >
        <div className="p-8 pt-10 flex flex-col gap-6">
          <h2 className="text-4xl font-extrabold leading-tight text-accent">{project.title}</h2>
          {content}
        </div>
      </div>
    </div>
  );
}
