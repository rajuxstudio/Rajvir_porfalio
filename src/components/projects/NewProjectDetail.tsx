import {
  ProjectDetailHero, TechStackSection, ConfidentialityNote, ProjectContentWrapper,
} from "./projectUI";

const techStack = ["React", "TypeScript", "Tailwind CSS"];

export default function NewProjectDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="New Project"
        category="Coming Soon"
        industryDomain="TBD"
        gradient="linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
        applications={["web"]}
        role="Design + Code"
        duration="TBD"
      />

      <ProjectContentWrapper>
        <div className="rounded-xl p-8 bg-muted border border-border text-center">
          <p className="text-sm text-muted-foreground">
            This project is currently being documented. Check back soon for the full case study with details on the challenge, approach, and outcome.
          </p>
        </div>
        <TechStackSection stack={techStack} />
        <ConfidentialityNote />
      </ProjectContentWrapper>
    </div>
  );
}
