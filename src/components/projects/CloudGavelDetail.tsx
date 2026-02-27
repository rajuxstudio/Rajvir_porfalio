import { Monitor, Smartphone, FileText, Clock, Lock, Search, Smartphone as MobileIcon } from "lucide-react";
import cloudgavelMockup from "@/assets/cloudgavel-mockup.png";

const timeline = [
  { step: "01", title: "Create Warrant", desc: "Officers digitally fill warrant applications" },
  { step: "02", title: "Submit for Review", desc: "Automatically routed to available judges" },
  { step: "03", title: "Judicial Review", desc: "Real-time review with secure document access" },
  { step: "04", title: "Approval & Logging", desc: "Instant approval with full audit trail" },
];

const techStack = ["React", "Python", "Django", "PostgreSQL", "Docker"];

export default function CloudGavelDetail() {
  return (
    <div className="flex flex-col gap-8">
      {/* Mockup */}
      <div className="w-full rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #FFA24C 0%, #E56A2E 100%)" }}>
        <img src={cloudgavelMockup} alt="CloudGavel" className="w-full h-48 md:h-56 object-cover opacity-90" />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">SaaS</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Law Enforcement / Justice</span>
      </div>

      {/* Overview */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        CloudGavel digitizes the entire warrant lifecycle — from creation and submission to judicial review and approval — reducing turnaround from days to minutes.
      </p>

      {/* Workflow timeline */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">How It Works</h3>
        <div className="flex flex-col gap-3">
          {timeline.map((t) => (
            <div key={t.step} className="flex items-start gap-4 p-4 rounded-xl bg-muted border border-border">
              <span className="text-2xl font-black text-accent/30">{t.step}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{ val: "<15min", label: "Approval Time" }, { val: "100%", label: "Digital Audit" }, { val: "24/7", label: "Availability" }].map((s) => (
          <div key={s.label} className="text-center p-4 rounded-xl bg-muted border border-border">
            <p className="text-lg font-extrabold text-accent">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="flex gap-3">
        {[{ icon: <Monitor size={14} />, label: "Web" }, { icon: <Smartphone size={14} />, label: "Mobile" }].map((p) => (
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
