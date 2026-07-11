import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../data/projects/project";

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick?: (slug: string) => void;
}

const ProjectCarousel = ({ projects, onProjectClick }: ProjectCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <div className="border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold tracking-tight text-foreground">More Projects</h3>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel(-1)}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel(1)}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 w-64 cursor-pointer snap-start group"
              onClick={() => onProjectClick?.(p.slug)}
            >
              <div className="rounded-2xl overflow-hidden border border-border bg-background transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={p.title}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} className="w-7 h-7 rounded-full border border-border" alt="" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{p.title}</h4>
                      <p className="text-[10px] text-muted-foreground">{p.tag}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Coming Soon card */}
          <div className="flex-shrink-0 w-64 snap-start">
            <div className="rounded-2xl overflow-hidden border border-dashed border-border bg-muted/30 h-full flex flex-col">
              <div className="aspect-[16/10] flex items-center justify-center bg-muted/50">
                <span className="text-3xl">🚀</span>
              </div>
              <div className="p-4 flex-1 flex items-center">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">New Project</h4>
                  <p className="text-[10px] text-muted-foreground">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
