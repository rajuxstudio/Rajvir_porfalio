import { PieChart, TrendingUp, FileText, Users, Calculator } from "lucide-react";
import iconCaptable from "@/assets/icon-captable.png";
import {
  ProjectDetailHero, FeatureGrid, TechStackSection, ProjectContentWrapper,
} from "./projectUI";

const features = [
  { icon: <PieChart size={18} />, title: "Cap Table Visualization", desc: "Interactive ownership charts with drill-down" },
  { icon: <TrendingUp size={18} />, title: "Funding Round Modeling", desc: "Simulate dilution across multiple scenarios" },
  { icon: <FileText size={18} />, title: "Equity Grants", desc: "Track options, RSUs, and vesting schedules" },
  { icon: <Users size={18} />, title: "Investor Reporting", desc: "Automated reports for all stakeholders" },
  { icon: <Calculator size={18} />, title: "409A Support", desc: "Valuation-ready data export" },
];

const techStack = ["React", "TypeScript", "Supabase", "Tailwind CSS"];

export default function CaptableDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="Captable"
        subtitle="Equity Management Platform"
        category="Fintech"
        description="Simplifies equity management for startups and investors, providing clear visibility into ownership structures, funding rounds, and cap table calculations."
        gradient="linear-gradient(135deg, #0F2A44 0%, #5F87A8 100%)"
        iconSrc={iconCaptable}
        metaChips={[
          { label: "Role", value: "Design + Code" },
          { label: "Platform", value: "Web" },
          { label: "Focus", value: "Data Visualization" },
        ]}
      />

      <ProjectContentWrapper>
        <FeatureGrid
          features={features}
          columns={2}
          gradient="linear-gradient(135deg, #0F2A44 0%, #5F87A8 100%)"
        />
        <TechStackSection stack={techStack} />
      </ProjectContentWrapper>
    </div>
  );
}
