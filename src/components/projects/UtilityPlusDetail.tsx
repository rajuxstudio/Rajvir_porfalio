import { Monitor, Smartphone, Tablet, Zap, Users, BarChart3, Shield, Settings, Layout, FileText, RefreshCw, ClipboardList, Apple, Play } from "lucide-react";
import utilityLogo from "@/assets/utility-plus-logo.png";
import mobileMockup1 from "@/assets/utility-mobile-mockup-1.png";
import mobileMockup2 from "@/assets/utility-mobile-mockup-2.png";

const features = [
  { icon: <Zap size={18} />, title: "Automated Billing", desc: "End-to-end invoicing with zero manual entry" },
  { icon: <Users size={18} />, title: "Customer Records", desc: "Unified data management for all service users" },
  { icon: <BarChart3 size={18} />, title: "Usage Analytics", desc: "Real-time dashboards for operational insights" },
  { icon: <Shield size={18} />, title: "Role-Based Access", desc: "Granular permissions for every team member" },
  { icon: <Settings size={18} />, title: "Multi-Tenant", desc: "One platform serving multiple agencies" },
];

const webImprovements = [
  { icon: <RefreshCw size={16} />, title: "New Update Flow", desc: "Guided onboarding that walks users through every platform change, reducing support tickets" },
  { icon: <Layout size={16} />, title: "Redesigned User Portal", desc: "Cleaner dashboard with improved hierarchy, card-based layout, and accessible navigation" },
  { icon: <ClipboardList size={16} />, title: "Work Order & Tax Process", desc: "Streamlined work order creation with auto-populated fields and simplified tax calculations" },
];

const uxPrinciples = [
  "Progressive disclosure for complex forms — show fields only when relevant",
  "Consistent visual hierarchy with clear primary and secondary actions",
  "Contextual help tooltips to reduce cognitive load during form filling",
  "Micro-interactions and feedback to confirm user actions instantly",
];

const techStack = ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS", "React Native"];

export default function UtilityPlusDetail() {
  return (
    <div className="flex flex-col gap-8">

      {/* Logo & Badges */}
      <div className="flex items-center gap-4">
        <img src={utilityLogo} alt="Utility Plus logo" className="w-14 h-14 rounded-xl object-contain bg-muted border border-border p-1.5" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/15 text-accent">SaaS</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">Public Utilities / Government</span>
          </div>
          <p className="text-xs text-muted-foreground">Web Portal · Mobile App · Tablet</p>
        </div>
      </div>

      {/* Overview */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Utility Plus is a comprehensive SaaS platform built for public utility agencies. It digitizes billing workflows, automates record keeping, and provides real-time dashboards for operational insights. I worked on both the <strong className="text-foreground">web portal redesign</strong> and the <strong className="text-foreground">mobile application</strong> to improve the overall user experience.
        </p>
      </div>

      {/* Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">The Challenge</h4>
          <p className="text-sm text-foreground leading-relaxed">
            Government agencies relied on legacy systems with fragmented data, leading to billing errors, poor form completion rates, and slow customer service.
          </p>
        </div>
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)" }}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">The Solution</h4>
          <p className="text-sm leading-relaxed">
            A unified platform consolidating all utility data into a single dashboard, automating billing cycles, redesigning the user portal, and launching a mobile app — reducing errors by 85%.
          </p>
        </div>
      </div>

      {/* My Role & Approach */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-2">My Role & Approach</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          I focused on <strong className="text-foreground">UI/UX improvements</strong> across the platform — refining visual hierarchy, simplifying form interactions, and ensuring design consistency between web and mobile experiences.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["UI Refinement", "UX Research", "Mobile Design", "Design System"].map((role) => (
            <div key={role} className="text-xs font-medium text-center py-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
              {role}
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
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

      {/* Web Portal Improvements */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Web Portal Improvements</h3>
        <p className="text-xs text-muted-foreground mb-3">Key areas updated during the redesign</p>
        <div className="flex flex-col gap-3">
          {webImprovements.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted border border-border">
              <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)" }}>
                <span className="text-white">{item.icon}</span>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UX Principles Applied */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">UX Principles Applied</h3>
        <div className="rounded-2xl bg-muted border border-border p-5">
          <ul className="flex flex-col gap-2.5">
            {uxPrinciples.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Mobile Application Section ── */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="p-6 pb-4" style={{ background: "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)" }}>
          <div className="flex items-center gap-2 mb-1">
            <Smartphone size={18} className="text-white/80" />
            <h3 className="text-lg font-bold text-white">Mobile Application</h3>
          </div>
          <p className="text-sm text-white/75 leading-relaxed">
            A companion mobile app giving field workers and customers on-the-go access to billing, work orders, and account management.
          </p>
        </div>

        {/* Mockups */}
        <div className="bg-muted/50 px-6 py-8 flex items-end justify-center gap-6">
          <div className="w-36 sm:w-44 rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
            <img src={mobileMockup1} alt="Utility Plus mobile dashboard" className="w-full h-auto" />
          </div>
          <div className="w-32 sm:w-40 rounded-2xl overflow-hidden shadow-lg border border-border bg-card -mb-2">
            <img src={mobileMockup2} alt="Utility Plus work order form" className="w-full h-auto" />
          </div>
        </div>

        {/* Download CTAs */}
        <div className="p-5 bg-card border-t border-border flex flex-col sm:flex-row gap-3">
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)" }}
          >
            <Apple size={20} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-normal text-white/60">Download on the</span>
              <span>App Store</span>
            </div>
          </a>
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-white text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #2E5AAC 0%, #6FA8FF 100%)" }}
          >
            <Play size={20} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-normal text-white/60">Get it on</span>
              <span>Google Play</span>
            </div>
          </a>
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
