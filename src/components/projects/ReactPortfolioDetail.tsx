import { Palette, Zap, Moon, Smartphone as Responsive, Mail } from "lucide-react";
import {
  ProjectDetailHero, FeatureGrid, TechStackSection,
  HighlightBanner, ProjectContentWrapper,
} from "./projectUI";

const highlights = [
  { icon: <Palette size={16} />, label: "3D Carousel" },
  { icon: <Zap size={16} />, label: "Smooth Animations" },
  { icon: <Moon size={16} />, label: "Dark/Light Theme" },
  { icon: <Responsive size={16} />, label: "Responsive" },
  { icon: <Mail size={16} />, label: "Contact Form" },
];

const techStack = ["React", "TypeScript", "Tailwind CSS", "Framer Motion"];

export default function ReactPortfolioDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="React Portfolio"
        category="Web Development"
        industryDomain="Personal / Creative"
        gradient="linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)"
        applications={["web"]}
        role="Code"
      />

      <ProjectContentWrapper description="A beautifully crafted developer portfolio showcasing projects, skills, and experience with smooth animations and an interactive 3D carousel.">
        <HighlightBanner
          title="Custom-Built, Not Templated"
          subtitle="Every element hand-crafted for a unique developer identity."
          gradient="linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)"
        />
        <FeatureGrid title="Highlights" features={highlights} />
        <TechStackSection stack={techStack} />
      </ProjectContentWrapper>
    </div>
  );
}
