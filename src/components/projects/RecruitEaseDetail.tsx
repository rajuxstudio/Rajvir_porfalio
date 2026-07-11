import { useState } from "react";
import {
  Monitor, Smartphone, Users, Search, Calendar, CreditCard, BarChart3,
  Layers, Target, Zap, Image,
} from "lucide-react";
import iconRecruitease from "@/assets/icon-recruitease.png";
import mockupRecruitease1 from "@/assets/mockup-recruitease-1.jpg";
import {
  ProjectDetailHero, SegmentedTabs, ChallengeSolution, StatsRow,
  FeatureGrid, DesignProcessGrid, OutcomeSection, TechStackSection,
  ConfidentialityNote, MobileAppDownload, ProjectContentWrapper, MockupGallery,
} from "./projectUI";

const tabs = [
  { id: "overview", label: "Overview", icon: <Monitor size={14} /> },
  { id: "mobile", label: "Mobile App", icon: <Smartphone size={14} /> },
  { id: "mockups", label: "Mockups", icon: <Image size={14} /> },
];

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

const stats = [
  { val: "40%", label: "Faster Hiring" },
  { val: "3x", label: "Match Rate" },
  { val: "85%", label: "User Retention" },
];

const techStack = ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe"];

const mockups = [
  { src: mockupRecruitease1, alt: "RecruitEase - Recruitment Dashboard" },
];

export default function RecruitEaseDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="RecruitEase"
        subtitle="Recruitment Marketplace Platform"
        category="E-commerce / HR Tech"
        description="A marketplace-style recruitment platform where employers browse, shortlist, and hire candidates — while job seekers showcase profiles like storefronts."
        gradient="linear-gradient(135deg, #F97316 0%, #DC2626 100%)"
        iconSrc={iconRecruitease}
        metaChips={[
          { label: "Role", value: "Design + Code" },
          { label: "Platform", value: "Web, Mobile" },
          { label: "Focus", value: "Smart Matching" },
        ]}
      />

      <ProjectContentWrapper>
        <SegmentedTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "overview" && (
            <>
              <ChallengeSolution
                challenge="Traditional job boards are cluttered and impersonal, leading to poor candidate-employer matches and high drop-off rates."
                solution="Built a marketplace-style platform with curated profiles, smart matching, and a streamlined pipeline — reducing time-to-hire by 40%."
              />
              <div className="mt-6" />
              <StatsRow stats={stats} />
              <div className="mt-6" />
              <FeatureGrid features={features} />
              <div className="mt-6" />
              <DesignProcessGrid title="Design Process" steps={designProcess} />
              <div className="mt-6" />
              <OutcomeSection outcomes={outcomes} />
              <div className="mt-6" />
              <TechStackSection stack={techStack} />
              <div className="mt-6" />
              <ConfidentialityNote />
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
          {activeTab === "mockups" && <MockupGallery mockups={mockups} />}
        </div>
      </ProjectContentWrapper>
    </div>
  );
}
