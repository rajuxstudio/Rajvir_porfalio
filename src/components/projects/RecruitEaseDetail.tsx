import { useState } from "react";
import {
  Monitor, Smartphone, Users, Search, Calendar, CreditCard, BarChart3,
  CheckCircle2, Lock, Layers, Target, Zap,
} from "lucide-react";
import MobileAppDownload from "@/components/projects/shared/MobileAppDownload";
import ProjectDetailHero from "@/components/projects/shared/ProjectDetailHero";

const tabs = [
  { id: "overview", label: "Overview", icon: <Monitor size={14} /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone size={14} /> },
] as const;

type TabId = (typeof tabs)[number]["id"];

const features = [
  { icon: <Users size={16} />, label: "Candidate Marketplace" },
  { icon: <Search size={16} />, label: "Smart Matching" },
  { icon: <Calendar size={16} />, label: "Interview Scheduling" },
  { icon: <CreditCard size={16} />, label: "Payment & Subscriptions" },
  { icon: <BarChart3 size={16} />, label: "Analytics Dashboard" },
];

const designProcess = [
  { icon: <Search size={18} />, title: "User Research & Personas" },
  { icon: <Layers size={18} />, title: "Information Architecture" },
  { icon: <Target size={18} />, title: "Interaction Design" },
  { icon: <Zap size={18} />, title: "Performance Optimization" },
];

const outcomes = [
  "40% reduction in time-to-hire",
  "Improved candidate-employer match rate",
  "Streamlined hiring pipeline",
  "Scalable subscription model",
];

const techStack = ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe"];

export default function RecruitEaseDetail() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="RecruitEase"
        category="E-commerce"
        industryDomain="Recruitment / HR"
        gradient="linear-gradient(135deg, #F97316 0%, #DC2626 100%)"
        applications={["web", "mobile"]}
        role="Design + Code"
        duration="4 months"
      />

      <div className="px-6 sm:px-8 pb-8 flex flex-col gap-6 mt-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          RecruitEase is a marketplace-style recruitment platform where employers browse, shortlist, and hire candidates — while job seekers showcase profiles like storefronts. The platform combines e-commerce UX patterns with HR workflows.
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
              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl p-5 bg-muted border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Challenge</h4>
                  <p className="text-sm text-foreground">Traditional job boards are cluttered and impersonal, leading to poor candidate-employer matches and high drop-off rates.</p>
                </div>
                <div className="rounded-xl p-5 bg-muted border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Solution</h4>
                  <p className="text-sm text-foreground">Built a marketplace-style platform with curated profiles, smart matching, and a streamlined pipeline — reducing time-to-hire by 40%.</p>
                </div>
              </div>

              {/* Impact stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[{ val: "40%", label: "Faster Hiring" }, { val: "3x", label: "Match Rate" }, { val: "85%", label: "User Retention" }].map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-muted border border-border">
                    <p className="text-lg font-extrabold text-accent">{s.val}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {features.map((f) => (
                    <span key={f.label} className="flex items-center gap-2 text-xs font-medium px-4 py-3 rounded-xl bg-muted text-foreground border border-border">
                      {f.icon} {f.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Design Process */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Design Process</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {designProcess.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-muted border border-border">
                      <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        {item.icon}
                      </span>
                      <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="rounded-xl p-6 text-center mb-6" style={{
                background: "linear-gradient(135deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--muted)) 100%)",
              }}>
                <h3 className="text-lg font-bold text-foreground mb-4">Outcome</h3>
                <div className="flex flex-col gap-2 max-w-md mx-auto">
                  {outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t) => (
                    <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">{t}</span>
                  ))}
                </div>
              </div>

              {/* Confidentiality */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl p-4 border border-border">
                <Lock size={12} className="shrink-0 mt-0.5" />
                <p>This case study presents design contributions and workflow improvements. Specific operational data and proprietary information have been omitted for confidentiality purposes.</p>
              </div>
            </>
          )}

          {activeTab === "mobile" && (
            <MobileAppDownload
              headline="Hire smarter, right from your phone"
              features={[
                { title: "Candidate Browse", desc: "Swipe through curated candidate profiles with smart filters." },
                { title: "Quick Apply", desc: "One-tap application with saved profile data." },
                { title: "Interview Scheduler", desc: "Calendar integration for seamless interview booking." },
                { title: "Push Notifications", desc: "Real-time alerts for matches, messages, and status updates." },
              ]}
              contributions={[
                "Mobile-first candidate experience",
                "Swipe-based interaction patterns",
                "Push notification UX flow",
                "Offline-ready profile viewing",
              ]}
              uxFocus={["Fast candidate discovery", "Frictionless applications", "Real-time engagement", "Cross-platform consistency"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
