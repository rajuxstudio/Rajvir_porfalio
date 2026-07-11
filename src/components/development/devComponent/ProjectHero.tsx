import type { Project } from "../data/projects/project";

interface ProjectHeroProps {
  image: string;
  title: string;
}

const ProjectHero = ({ image, title }: ProjectHeroProps) => (
  <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
  </div>
);

export default ProjectHero;
