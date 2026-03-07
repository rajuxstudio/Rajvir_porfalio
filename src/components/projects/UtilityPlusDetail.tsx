import { useState } from "react";
import { Search, Workflow, Layers, Map, CheckCircle2, Lock, Monitor, Shield, Smartphone } from "lucide-react";
import UtilityHero from "./utility/UtilityHero";
import WebPortalTab from "./utility/WebPortalTab";
import AdminPortalTab from "./utility/AdminPortalTab";
import MobileAppTab from "./utility/MobileAppTab";

const tabs = [
  { id: "web", label: "Web Portal", icon: <Monitor size={14} /> },
  { id: "admin", label: "Admin Portal", icon: <Shield size={14} /> },
  { id: "mobile", label: "Mobile Application", icon: <Smartphone size={14} /> },
] as const;

const designProcess = [
  { icon: <Search size={18} />, title: "Research & System Understanding" },
  { icon: <Workflow size={18} />, title: "Workflow Simplification" },
  { icon: <Layers size={18} />, title: "Cross-Platform Consistency" },
  { icon: <Map size={18} />, title: "Future Scalability & Journey Mapping" },
];

const outcomes = [
  "Improved usability across all platforms",
  "Reduced workflow complexity",
  "Established scalable SaaS design system",
  "Unified Web + Admin + Mobile ecosystem",
];

type TabId = (typeof tabs)[number]["id"];

export default function UtilityPlusDetail() {
  const [activeTab, setActiveTab] = useState<TabId>("web");

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <UtilityHero />

      {/* Segmented Switch */}
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
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div key={activeTab} className="animate-fade-in">
        {activeTab === "web" && <WebPortalTab />}
        {activeTab === "admin" && <AdminPortalTab />}
        {activeTab === "mobile" && <MobileAppTab />}
      </div>

      {/* Design Process */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Design Thinking Approach</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {designProcess.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-muted border border-border"
            >
              <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                {item.icon}
              </span>
              <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="rounded-2xl p-6 text-center" style={{
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

      {/* Confidentiality */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-xl p-4 border border-border">
        <Lock size={12} className="shrink-0 mt-0.5" />
        <p>
          This case study presents design contributions and workflow improvements. Specific
          operational data and proprietary information have been omitted for confidentiality
          purposes.
        </p>
      </div>
    </div>
  );
}
