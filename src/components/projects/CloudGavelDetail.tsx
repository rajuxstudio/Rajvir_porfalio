import { useState } from "react";
import { Monitor, Smartphone, Lock } from "lucide-react";
import cloudgavelMockup from "@/assets/cloudgavel-mockup.png";
import MobileAppDownload from "@/components/projects/shared/MobileAppDownload";

const tabs = [
  { id: "overview", label: "Overview", icon: <Monitor size={14} /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone size={14} /> },
] as const;

type TabId = (typeof tabs)[number]["id"];

const timeline = [
  { step: "01", title: "Create Warrant", desc: "Officers digitally fill warrant applications" },
  { step: "02", title: "Submit for Review", desc: "Automatically routed to available judges" },
  { step: "03", title: "Judicial Review", desc: "Real-time review with secure document access" },
  { step: "04", title: "Approval & Logging", desc: "Instant approval with full audit trail" },
];

const techStack = ["React", "Python", "Django", "PostgreSQL", "Docker"];

export default function CloudGavelDetail() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

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

      {/* Tab Switch */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted border border-border shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="sm:hidden">{tab.icon}</span>
              <span className="hidden sm:inline-flex sm:items-center sm:gap-1.5">{tab.icon} {tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div key={activeTab} className="animate-fade-in">
        {activeTab === "overview" && (
          <>
            {/* Workflow timeline */}
            <div className="mb-6">
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
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[{ val: "<15min", label: "Approval Time" }, { val: "100%", label: "Digital Audit" }, { val: "24/7", label: "Availability" }].map((s) => (
                <div key={s.label} className="text-center p-4 rounded-xl bg-muted border border-border">
                  <p className="text-lg font-extrabold text-accent">{s.val}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Platforms */}
            <div className="flex gap-3 mb-6">
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
          </>
        )}

        {activeTab === "mobile" && (
          <MobileAppDownload
            headline="eWarrant processing on the go"
            features={[
              { title: "Warrant Creation", desc: "Officers can create and submit warrants directly from their mobile device." },
              { title: "Real-time Notifications", desc: "Instant alerts when warrants are reviewed, approved, or need revision." },
              { title: "Document Capture", desc: "Camera integration for attaching supporting evidence and documents." },
              { title: "Status Tracking", desc: "Live tracking of all submitted warrants with status updates." },
            ]}
            contributions={[
              "Mobile-first officer interface design",
              "Streamlined warrant submission flow",
              "Push notification system UX",
              "Offline-capable form design",
            ]}
          />
        )}
      </div>
    </div>
  );
}
