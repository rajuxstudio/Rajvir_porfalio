import { X } from "lucide-react";
import { Project } from "@/lib/projectsData";
import { lazy, Suspense, useEffect } from "react";

// Per-project detail components
const detailComponents: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  "utility-plus": lazy(() => import("@/components/projects/UtilityPlusDetail")),
  "cloudgavel": lazy(() => import("@/components/projects/CloudGavelDetail")),
  "echelon-constructors": lazy(() => import("@/components/projects/EchelonConstructorsDetail")),
  "captable": lazy(() => import("@/components/projects/CaptableDetail")),
  "bumper-mandi": lazy(() => import("@/components/projects/BumperMandiDetail")),
  "react-portfolio": lazy(() => import("@/components/projects/ReactPortfolioDetail")),
  "recruit-ease": lazy(() => import("@/components/projects/RecruitEaseDetail")),
  "new-project": lazy(() => import("@/components/projects/NewProjectDetail")),
};

type Props = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

export default function ProjectDetailDialog({ open, onClose, project }: Props) {
  if (!open || !project) return null;

  const DetailComponent = detailComponents[project.slug];

  const content = (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>}>
      {DetailComponent ? <DetailComponent /> : (
        <p className="text-sm text-muted-foreground">{project.description}</p>
      )}
    </Suspense>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop — top 12vh is click-to-close */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Close button — centered above the sheet */}
      <div className="relative z-20 flex justify-center mb-3">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-card/80 text-muted-foreground border border-border shadow-sm"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Bottom sheet — takes up 88vh */}
      <div
        className="relative z-10 w-full rounded-t-2xl animate-slide-up overflow-y-auto bg-card border border-border border-b-0"
        style={{ maxHeight: "88vh" }}
      >
        <div className="flex flex-col">
          {content}
        </div>
      </div>
    </div>
  );
}
