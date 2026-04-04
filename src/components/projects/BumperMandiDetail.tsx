import { useState } from "react";
import { Monitor, Smartphone, Gavel, TrendingUp, CreditCard, Award, Truck } from "lucide-react";
import MobileAppDownload from "@/components/projects/shared/MobileAppDownload";
import ProjectDetailHero from "@/components/projects/shared/ProjectDetailHero";

const tabs = [
  { id: "overview", label: "Overview", icon: <Monitor size={14} /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone size={14} /> },
] as const;

type TabId = (typeof tabs)[number]["id"];

const webFeatures = [
  { icon: <Gavel size={16} />, label: "Live Auction & Bidding" },
  { icon: <TrendingUp size={16} />, label: "Price Discovery" },
  { icon: <CreditCard size={16} />, label: "Secure Payments" },
  { icon: <Award size={16} />, label: "Quality Grading" },
  { icon: <Truck size={16} />, label: "Logistics Coordination" },
];

const techStack = ["React Native", "Node.js", "Firebase", "Google Maps API"];

export default function BumperMandiDetail() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="Bumper Mandi"
        category="AgriTech"
        industryDomain="Agriculture"
        gradient="linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)"
        applications={["mobile", "web"]}
        role="Design + Code"
      />

      <div className="px-6 sm:px-8 pb-8 flex flex-col gap-6 mt-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bumper Mandi connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing through transparent bidding.
        </p>

        {/* Impact highlight */}
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)" }}>
          <p className="text-4xl font-black text-white">20-30%</p>
          <p className="text-sm text-white/80 mt-1">More earnings for farmers</p>
        </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl p-5 bg-muted border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Challenge</h4>
                  <p className="text-sm text-foreground">Farmers exploited by middlemen, receiving a fraction of market price.</p>
                </div>
                <div className="rounded-xl p-5 bg-muted border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Solution</h4>
                  <p className="text-sm text-foreground">Transparent digital marketplace with real-time bidding for direct farmer-to-buyer sales.</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {webFeatures.map((f) => (
                    <span key={f.label} className="flex items-center gap-2 text-xs font-medium px-4 py-3 rounded-xl bg-muted text-foreground border border-border">
                      {f.icon} {f.label}
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
            </>
          )}

          {activeTab === "mobile" && (
            <MobileAppDownload
              headline="Farm-to-buyer trading, right from your phone"
              features={[
                { title: "Live Bidding", desc: "Participate in real-time auctions and place bids from anywhere." },
                { title: "Price Alerts", desc: "Get notified when market prices hit your target range." },
                { title: "Quality Upload", desc: "Capture and upload produce photos for quality grading." },
                { title: "Payment Tracking", desc: "Track payments and transaction history on the go." },
              ]}
              contributions={[
                "Mobile-first marketplace design",
                "Bidding flow UX optimization",
                "Farmer onboarding experience",
                "Multilingual interface support",
              ]}
              uxFocus={["Simple for rural users", "Low-bandwidth optimized", "Trust-driven UI", "Vernacular language support"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
