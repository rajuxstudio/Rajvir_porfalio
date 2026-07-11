import { useState } from "react";
import { Monitor, Shield, Smartphone, Search, Workflow, Layers, Map, Image } from "lucide-react";
import iconUtilityPlus from "@/assets/icon-utility-plus.png";
import mockupUtility1 from "@/assets/mockup-utility-1.jpg";
import {
  ProjectDetailHero, SegmentedTabs, DesignProcessGrid,
  OutcomeSection, ConfidentialityNote, ProjectContentWrapper, MockupGallery,
} from "./projectUI";
import WebPortalTab from "./utility/WebPortalTab";
import AdminPortalTab from "./utility/AdminPortalTab";
import MobileAppTab from "./utility/MobileAppTab";

const tabs = [
  { id: "web", label: "Web Portal", icon: <Monitor size={14} /> },
  { id: "admin", label: "Admin Portal", icon: <Shield size={14} /> },
  { id: "mobile", label: "Mobile Application", icon: <Smartphone size={14} /> },
  { id: "mockups", label: "Mockups", icon: <Image size={14} /> },
];

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

const mockups = [
  { src: mockupUtility1, alt: "UtilityPlus Dashboard - Billing Overview" },
];

export default function UtilityPlusDetail() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="UtilityPlus"
        subtitle="Government Utility Billing Application"
        category="Software as a Service (SaaS)"
        description="A unified government utility management ecosystem enabling bill payments, work order tracking, and occupational license management across Web, Admin, and Mobile platforms."
        gradient="linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)"
        iconSrc={iconUtilityPlus}
        metaChips={[
          { label: "Role", value: "UX/UI Designer" },
          { label: "Platform", value: "Web, Admin, Mobile" },
          { label: "Focus", value: "Workflow Simplification" },
        ]}
      />

      <ProjectContentWrapper>
        <SegmentedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "web" && <WebPortalTab />}
          {activeTab === "admin" && <AdminPortalTab />}
          {activeTab === "mobile" && <MobileAppTab />}
          {activeTab === "mockups" && <MockupGallery mockups={mockups} />}
        </div>
        <DesignProcessGrid steps={designProcess} />
        <OutcomeSection outcomes={outcomes} />
        <ConfidentialityNote />
      </ProjectContentWrapper>
    </div>
  );
}
