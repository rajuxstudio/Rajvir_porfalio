import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getProjectBySlug, projects } from "../data/projects";
import ProjectHero from "../devComponent/ProjectHero";
import ProjectStickyHeader from "../devComponent/ProjectStickyHeader";
import ProjectContentSections from "../devComponent/ProjectContentSections";
import ProjectCarousel from "../devComponent/ProjectCarousel";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        setIsSticky(headerRef.current.getBoundingClientRect().top <= 0);
      }
    };
    window.addEventListener("scroll", onScroll);
    window.scrollTo(0, 0);
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Project not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline text-sm">
            ← Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Close / back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-lg"
      >
        <X className="w-4 h-4" />
      </button>

      <ProjectHero image={project.image} title={project.title} />
      <ProjectStickyHeader
        title={project.title}
        techStack={project.info.techStack}
        isSticky={isSticky}
        headerRef={headerRef}
      />
      <div className="bg-background">
        <ProjectContentSections tag={project.tag} role={project.role} info={project.info} />
        <ProjectCarousel projects={otherProjects} />
      </div>
    </div>
  );
};

export default ProjectPage;
