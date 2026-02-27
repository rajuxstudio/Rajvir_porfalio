import { Monitor, Calendar, DollarSign, Users, FileText, TrendingUp } from "lucide-react";

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
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">ERP</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Construction</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Echelon Constructors is an ERP solution tailored for the construction industry, enabling end-to-end project management from bidding to completion.
      </p>

      {/* Challenge / Solution */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="p-5 bg-muted">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Challenge</h4>
          <p className="text-sm text-foreground">Scattered spreadsheets and disconnected tools causing cost overruns and missed deadlines.</p>
        </div>
        <div className="p-5" style={{ background: "linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)" }}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Solution</h4>
          <p className="text-sm text-white">Centralized ERP with real-time visibility into budgets, timelines, and resources.</p>
        </div>
      </div>

      {/* Modules */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Core Modules</h3>
        <div className="flex flex-wrap gap-2">
          {modules.map((m) => (
            <span key={m.name} className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-muted text-foreground border border-border">
              {m.icon} {m.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border">
          <Monitor size={14} /> Web
        </span>
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
  );
}
