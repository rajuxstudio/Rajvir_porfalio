import { useState } from "react";
import { Monitor, Smartphone, Image } from "lucide-react";
import iconCloudgavel from "@/assets/icon-cloudgavel.png";
import mockupCloudgavel1 from "@/assets/mockup-cloudgavel-1.jpg";
import {
  ProjectDetailHero, SegmentedTabs, TimelineGrid,
  StatsRow, TechStackSection, MobileAppDownload, ProjectContentWrapper, MockupGallery,
} from "./projectUI";

const tabs = [
  { id: "overview", label: "Overview", icon: <Monitor size={14} /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone size={14} /> },
  { id: "mockups", label: "Mockups", icon: <Image size={14} /> },
];

const timeline = [
  { step: "01", title: "Create Warrant", desc: "Officers digitally fill warrant applications" },
  { step: "02", title: "Submit for Review", desc: "Automatically routed to available judges" },
  { step: "03", title: "Judicial Review", desc: "Real-time review with secure document access" },
  { step: "04", title: "Approval & Logging", desc: "Instant approval with full audit trail" },
];

const stats = [
  { val: "<15min", label: "Approval Time" },
  { val: "100%", label: "Digital Audit" },
  { val: "24/7", label: "Availability" },
];

const techStack = ["React", "Python", "Django", "PostgreSQL", "Docker"];

const mockups = [
  { src: mockupCloudgavel1, alt: "CloudGavel - Warrant Management Dashboard" },
];

export default function CloudGavelDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="CloudGavel"
        subtitle="eWarrant Management System"
        category="Software as a Service (SaaS)"
        description="CloudGavel digitizes the entire warrant lifecycle — from creation and submission to judicial review and approval — reducing turnaround from days to minutes."
        gradient="linear-gradient(135deg, #FFA24C 0%, #E56A2E 100%)"
        iconSrc={iconCloudgavel}
        metaChips={[
          { label: "Role", value: "UX/UI Designer" },
          { label: "Platform", value: "Web, Mobile" },
          { label: "Focus", value: "Digital Workflow" },
        ]}
      />

      <ProjectContentWrapper>
        <SegmentedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "overview" && (
            <>
              <TimelineGrid steps={timeline} />
              <div className="mt-6" />
              <StatsRow stats={stats} />
              <div className="mt-6" />
              <TechStackSection stack={techStack} />
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
          {activeTab === "mockups" && <MockupGallery mockups={mockups} />}
        </div>
      </ProjectContentWrapper>
    </div>
  );
}
