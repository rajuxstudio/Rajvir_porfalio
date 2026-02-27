import { Monitor, PieChart, TrendingUp, FileText, Users, Calculator } from "lucide-react";

const features = [
  { icon: <PieChart size={18} />, title: "Cap Table Visualization", desc: "Interactive ownership charts with drill-down" },
  { icon: <TrendingUp size={18} />, title: "Funding Round Modeling", desc: "Simulate dilution across multiple scenarios" },
  { icon: <FileText size={18} />, title: "Equity Grants", desc: "Track options, RSUs, and vesting schedules" },
  { icon: <Users size={18} />, title: "Investor Reporting", desc: "Automated reports for all stakeholders" },
  { icon: <Calculator size={18} />, title: "409A Support", desc: "Valuation-ready data export" },
];

const techStack = ["React", "TypeScript", "Supabase", "Tailwind CSS"];

export default function CaptableDetail() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">Fintech</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Finance / Investment</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Captable simplifies equity management for startups and investors, providing clear visibility into ownership structures and funding rounds.
      </p>

      {/* Feature cards - vertical list */}
      <div className="flex flex-col gap-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-accent" style={{ background: "linear-gradient(135deg, #0F2A44 0%, #5F87A8 100%)" }}>
              <span className="text-white">{f.icon}</span>
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
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
