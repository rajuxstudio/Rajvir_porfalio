import { Calendar, DollarSign, Users, FileText, TrendingUp } from "lucide-react";
import iconEchelon from "@/assets/icon-echelon.png";
import mockupEchelon1 from "@/assets/mockup-echelon-1.jpg";
import {
  ProjectDetailHero, ChallengeSolution, FeatureGrid,
  TechStackSection, ProjectContentWrapper, MockupGallery,
} from "./projectUI";

const modules = [
  { icon: <Calendar size={16} />, label: "Planning & Gantt Charts" },
  { icon: <Users size={16} />, label: "Resource Allocation" },
  { icon: <DollarSign size={16} />, label: "Budget Forecasting" },
  { icon: <FileText size={16} />, label: "Subcontractor Mgmt" },
  { icon: <TrendingUp size={16} />, label: "Progress Reporting" },
];

const techStack = ["React", "Node.js", "MongoDB", "Material UI", "Azure"];

const mockups = [
  { src: mockupEchelon1, alt: "Echelon Constructors - Project Management Dashboard" },
];

export default function EchelonConstructorsDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="Echelon Constructors"
        subtitle="Construction Project Management Software"
        category="Enterprise Resource Planning (ERP)"
        description="End-to-end project management from bidding to completion, enabling real-time visibility into budgets, timelines, and resources for construction firms."
        gradient="linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)"
        iconSrc={iconEchelon}
        metaChips={[
          { label: "Role", value: "UX/UI Designer" },
          { label: "Platform", value: "Web" },
          { label: "Focus", value: "Project Planning" },
        ]}
      />

      <ProjectContentWrapper>
        <ChallengeSolution
          challenge="Scattered spreadsheets and disconnected tools causing cost overruns and missed deadlines."
          solution="Centralized ERP with real-time visibility into budgets, timelines, and resources."
          gradient="linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)"
        />
        <FeatureGrid title="Core Modules" features={modules} />
        <MockupGallery mockups={mockups} />
        <TechStackSection stack={techStack} />
      </ProjectContentWrapper>
    </div>
  );
}
