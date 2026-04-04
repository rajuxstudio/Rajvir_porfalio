import { Calendar, DollarSign, Users, FileText, TrendingUp } from "lucide-react";
import ProjectDetailHero from "@/components/projects/shared/ProjectDetailHero";

const modules = [
  { icon: <Calendar size={16} />, name: "Planning & Gantt Charts" },
  { icon: <Users size={16} />, name: "Resource Allocation" },
  { icon: <DollarSign size={16} />, name: "Budget Forecasting" },
  { icon: <FileText size={16} />, name: "Subcontractor Mgmt" },
  { icon: <TrendingUp size={16} />, name: "Progress Reporting" },
];

const techStack = ["React", "Node.js", "MongoDB", "Material UI", "Azure"];

export default function EchelonConstructorsDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="Echelon Constructors"
        category="ERP"
        industryDomain="Construction"
        gradient="linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)"
        applications={["web"]}
        role="UX/UI Design"
      />

      <div className="px-6 sm:px-8 pb-8 flex flex-col gap-6 mt-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Echelon Constructors is an ERP solution tailored for the construction industry, enabling end-to-end project management from bidding to completion.
        </p>

        {/* Challenge / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl p-5 bg-muted border border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Challenge</h4>
            <p className="text-sm text-foreground">Scattered spreadsheets and disconnected tools causing cost overruns and missed deadlines.</p>
          </div>
          <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)" }}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Solution</h4>
            <p className="text-sm">Centralized ERP with real-time visibility into budgets, timelines, and resources.</p>
          </div>
        </div>

        {/* Modules */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">Core Modules</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {modules.map((m) => (
              <span key={m.name} className="flex items-center gap-2 text-xs font-medium px-4 py-3 rounded-xl bg-muted text-foreground border border-border">
                {m.icon} {m.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
