import { useState } from "react";
import { Monitor, Smartphone, Gavel, TrendingUp, CreditCard, Award, Truck } from "lucide-react";
import {
  ProjectDetailHero, SegmentedTabs, ChallengeSolution, FeatureGrid,
  TechStackSection, ImpactBanner, MobileAppDownload, ProjectContentWrapper,
} from "./projectUI";

const tabs = [
  { id: "overview", label: "Overview", icon: <Monitor size={14} /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone size={14} /> },
];

const webFeatures = [
  { icon: <Gavel size={16} />, label: "Live Auction & Bidding" },
  { icon: <TrendingUp size={16} />, label: "Price Discovery" },
  { icon: <CreditCard size={16} />, label: "Secure Payments" },
  { icon: <Award size={16} />, label: "Quality Grading" },
  { icon: <Truck size={16} />, label: "Logistics Coordination" },
];

const techStack = ["React Native", "Node.js", "Firebase", "Google Maps API"];

export default function BumperMandiDetail() {
  const [activeTab, setActiveTab] = useState("overview");

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

      <ProjectContentWrapper description="Bumper Mandi connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing through transparent bidding.">
        <ImpactBanner
          value="20-30%"
          label="More earnings for farmers"
          gradient="linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)"
        />

        <SegmentedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div key={activeTab} className="animate-fade-in">
          {activeTab === "overview" && (
            <>
              <ChallengeSolution
                challenge="Farmers exploited by middlemen, receiving a fraction of market price."
                solution="Transparent digital marketplace with real-time bidding for direct farmer-to-buyer sales."
              />
              <div className="mt-6" />
              <FeatureGrid features={webFeatures} />
              <div className="mt-6" />
              <TechStackSection stack={techStack} />
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
      </ProjectContentWrapper>
    </div>
  );
}
