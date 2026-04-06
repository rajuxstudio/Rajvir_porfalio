import { Palette, Zap, Moon, Smartphone as Responsive, Mail } from "lucide-react";
import iconPortfolio from "@/assets/icon-portfolio.png";
import mockupPortfolio1 from "@/assets/mockup-portfolio-1.jpg";
import {
  ProjectDetailHero, FeatureGrid, TechStackSection,
  HighlightBanner, ProjectContentWrapper, MockupGallery,
} from "./projectUI";

const highlights = [
  { icon: <Palette size={16} />, label: "3D Carousel" },
  { icon: <Zap size={16} />, label: "Smooth Animations" },
  { icon: <Moon size={16} />, label: "Dark/Light Theme" },
  { icon: <Responsive size={16} />, label: "Responsive" },
  { icon: <Mail size={16} />, label: "Contact Form" },
];

const techStack = ["React", "TypeScript", "Tailwind CSS", "Framer Motion"];

const mockups = [
  { src: mockupPortfolio1, alt: "React Portfolio - Homepage" },
];

export default function ReactPortfolioDetail() {
  return (
    <div className="flex flex-col">
      <ProjectDetailHero
        title="React Portfolio"
        subtitle="Developer Portfolio Website"
        category="Web Development"
        description="A beautifully crafted developer portfolio showcasing projects, skills, and experience with smooth animations, interactive 3D carousel, and responsive design."
        gradient="linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)"
        iconSrc={iconPortfolio}
        metaChips={[
          { label: "Role", value: "Developer" },
          { label: "Platform", value: "Web" },
          { label: "Focus", value: "Visual Identity" },
        ]}
      />

      <ProjectContentWrapper>
        <HighlightBanner
          title="Custom-Built, Not Templated"
          subtitle="Every element hand-crafted for a unique developer identity."
          gradient="linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)"
        />
        <FeatureGrid title="Highlights" features={highlights} />
        <MockupGallery mockups={mockups} />
        <TechStackSection stack={techStack} />
      </ProjectContentWrapper>
    </div>
  );
}
