import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectInfo } from "../data/projects/project";

interface ProjectContentSectionsProps {
  tag: string;
  role: string;
  info: ProjectInfo;
}

const MockupGallery = ({ mockups }: { mockups: string[] }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="pt-4 border-t border-border/50">
      <h3 className="text-lg font-bold tracking-tight text-foreground mb-4">Mockups</h3>

      {/* Main image */}
      <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/30 aspect-video relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={mockups[active]}
            alt={`Mockup ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {mockups.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              i === active
                ? "border-primary shadow-md"
                : "border-border/50 opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProjectContentSections = ({ tag, role, info }: ProjectContentSectionsProps) => (
  <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 space-y-10">
    {/* Tags */}
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-primary px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
        {tag}
      </span>
      <span className="text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-muted/50">
        {role}
      </span>
    </div>

    {/* Description */}
    <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
      {info.what}
    </p>

    {/* How It Works */}
    <div>
      <h3 className="text-lg font-bold tracking-tight text-foreground mb-4">How It Works</h3>
      <div className="space-y-3">
        {info.howItWorks.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            className="flex items-start gap-4 bg-muted/50 rounded-xl px-5 py-4 border border-border/50"
          >
            <span className="text-xl font-bold text-primary/40 tabular-nums leading-tight mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {step.split(" ").slice(0, 3).join(" ")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{step}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Code Explanation */}
    <div>
      <h3 className="text-lg font-bold tracking-tight text-foreground mb-4">Code Highlights</h3>
      <ul className="space-y-2">
        {info.codeExplanation.map((point, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* How to Run */}
    <div>
      <h3 className="text-lg font-bold tracking-tight text-foreground mb-4">How to Run</h3>
      <div className="bg-muted/50 rounded-xl p-5 border border-border/50 space-y-2">
        {info.howToRun.map((step, i) => (
          <p key={i} className="text-sm text-muted-foreground font-mono">
            <span className="text-primary mr-2">$</span>
            {step}
          </p>
        ))}
      </div>
    </div>

    {/* Tech Stack */}
    <div className="pt-4 border-t border-border/50">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
        Tech Stack
      </p>
      <div className="flex gap-2 flex-wrap">
        {info.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border/50"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Mockups */}
    {info.mockups && info.mockups.length > 0 && (
      <MockupGallery mockups={info.mockups} />
    )}
  </div>
);

export default ProjectContentSections;
