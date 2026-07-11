import iconNewProject from "@/assets/icon-new-project.png";
import {
  ProjectDetailHero, TechStackSection, ConfidentialityNote, ProjectContentWrapper,
} from "./projectUI";

const techStack = ["React", "TypeScript", "Tailwind CSS"];

export default function NewProjectDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="New Project"
        subtitle="Coming Soon"
        category="In Development"
        description="This project is currently being documented. Check back soon for the full case study with details on the challenge, approach, and outcome."
        gradient="linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
        iconSrc={iconNewProject}
        metaChips={[
          { label: "Role", value: "Design + Code" },
          { label: "Platform", value: "Web" },
          { label: "Status", value: "In Progress" },
        ]}
      />

      <ProjectContentWrapper>
        <TechStackSection stack={techStack} />
        <ConfidentialityNote />
      </ProjectContentWrapper>
    </div>
  );
}
