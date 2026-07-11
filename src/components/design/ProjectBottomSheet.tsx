import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../design/projects/project_design";
import { projects } from "../design/projects/index_design";
import ProjectHero from "./Component/ProjectHero";
import ProjectStickyHeader from "./Component/ProjectStickyHeader";
import ProjectContentSections from "./Component/ProjectContentSections";
import ProjectCarousel from "./Component/ProjectCarousel";

interface ProjectBottomSheetProps {
  project: Project | null;
  onClose: () => void;
  onProjectClick?: (slug: string) => void;
}

const ProjectBottomSheet = ({ project, onClose, onProjectClick }: ProjectBottomSheetProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const otherProjects = project
    ? projects.filter((p) => p.slug !== project.slug)
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Top space with close button */}
          <div
            className="relative flex items-center justify-center flex-shrink-0"
            style={{ height: "12vh" }}
          >
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-lg z-10"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Sheet content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative flex-1 bg-background rounded-t-3xl overflow-y-auto shadow-2xl border-t border-border"
          >
            <ProjectHero image={project.image} title={project.title} />
            <ProjectStickyHeader
              title={project.title}
              logo={project.logo}
              techStack={project.info.techStack}
              link={project.info.link}
              isSticky={false}
              headerRef={{ current: null } as React.RefObject<HTMLDivElement>}
            />
            <div className="bg-background">
              <ProjectContentSections
                tag={project.tag}
                role={project.role}
                info={project.info} meta={[]} Reflection={[]} impacts={project.info.impacts} />
              <ProjectCarousel projects={otherProjects} onProjectClick={onProjectClick} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectBottomSheet;
