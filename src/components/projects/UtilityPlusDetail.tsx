import { Monitor, Smartphone, Tablet, Zap, Users, BarChart3, Shield, Settings } from "lucide-react";

const features = [
  { icon: <Zap size={18} />, title: "Automated Billing", desc: "End-to-end invoicing with zero manual entry" },
  { icon: <Users size={18} />, title: "Customer Records", desc: "Unified data management for all service users" },
  { icon: <BarChart3 size={18} />, title: "Usage Analytics", desc: "Real-time dashboards for operational insights" },
  { icon: <Shield size={18} />, title: "Role-Based Access", desc: "Granular permissions for every team member" },
  { icon: <Settings size={18} />, title: "Multi-Tenant", desc: "One platform serving multiple agencies" },
];

const techStack = ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS"];

export default function UtilityPlusDetail() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero badge */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">SaaS</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Public Utilities / Government</span>
      </div>

      {/* Overview */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Utility Plus is a comprehensive SaaS platform built for public utility agencies. It digitizes billing workflows, automates record keeping, and provides real-time dashboards for operational insights.
        </p>
      </div>

      {/* Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">The Challenge</h4>
          <p className="text-sm text-foreground leading-relaxed">
            Government agencies relied on legacy systems with fragmented data, leading to billing errors and slow customer service.
          </p>
        </div>
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)" }}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">The Solution</h4>
          <p className="text-sm leading-relaxed">
            A unified platform consolidating all utility data into a single dashboard, automating billing cycles and reducing errors by 85%.
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted border border-border">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-accent bg-accent/10">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="flex gap-3">
        {[{ icon: <Monitor size={14} />, label: "Web" }, { icon: <Smartphone size={14} />, label: "Mobile" }, { icon: <Tablet size={14} />, label: "Tablet" }].map((p) => (
          <span key={p.label} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border">
            {p.icon} {p.label}
          </span>
        ))}
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
    </div>
  );
}
