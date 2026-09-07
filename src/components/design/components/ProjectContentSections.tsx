import { motion } from "framer-motion";
import type { ProjectInfo } from "../projects/types";
import { Reveal } from "./Reveal";
import { Sparkles } from "lucide-react";
import MockupGallery from "./MockupGallery";


interface ProjectContentSectionsProps {
  tag: string;
  role: string;
  info: ProjectInfo;
  meta: { label: string; value: string }[];
  Reflection: string[];
  impacts: { value: string; label: string; body: string }[];
  /** Controlled platform for the mockup gallery's device switch — driven by
   *  the bottom sheet's section nav bar. Omit to let the gallery self-manage. */
  activePlatform?: import("./MockupGallery").MockupPlatform;
  onPlatformChange?: (platform: import("./MockupGallery").MockupPlatform) => void;
}
/* ---------- Reusable bits ---------- */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {children}
    </div>
  );
}

const ProjectContentSections = ({ tag, role, info, activePlatform, onPlatformChange }: ProjectContentSectionsProps) => (
  <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 space-y-10">
    {/* Overview */}
    <div id="overview" data-nav-section data-nav-label="Overview" className="scroll-mt-24 space-y-6">
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
    </div>

    {/* How It Works */}
    <div id="how-it-works" data-nav-section data-nav-label="How It Works" className="scroll-mt-24">
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
    {info.codeExplanation && info.codeExplanation.length > 0 && (
      <div id="code-highlights" data-nav-section data-nav-label="Code" className="scroll-mt-24">
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
    )}

    {/* How to Run */}
    {info.howToRun && info.howToRun.length > 0 && (
      <div id="how-to-run" data-nav-section data-nav-label="Run" className="scroll-mt-24">
        <h3 className="text-lg font-bold tracking-tight text-foreground mb-4">How to Run</h3>
        <div className="bg-muted/50 rounded-xl p-5 border border-border/50 space-y-2">
          {info.howToRun.map((step, i) => (
            <p key={i} className="text-sm text-muted-foreground font-mono">
              <span className="text-primary smr-2">$</span>
              {step}
            </p>
          ))}
        </div>
      </div>
    )}

    {/* Tech Stack */}
    <div id="tech-stack" data-nav-section data-nav-label="Stack" className="scroll-mt-24 pt-4 border-t border-border/50">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
        Tech Stack
      </p>
      <div className="flex gap-2 flex-wrap">
        {info.techStack.map((tech) => {
          const isString = typeof tech === "string";
          const label = isString ? tech : tech.name;

          return (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border/50"
            >
              {!isString && (
                <img src={tech.icon} alt={`${tech.name} icon`} className="w-4 h-4" />
              )}
              {label}
            </span>
          );
        })}
      </div>
    </div>

    {/* Mockups */}
    {info.mockups && info.mockups.length > 0 && (
      <div id="mockups" data-nav-section data-nav-label="Mockups" className="scroll-mt-24">
        <MockupGallery mockups={info.mockups} activePlatform={activePlatform} onPlatformChange={onPlatformChange} />
      </div>
    )}

    {/* IMPACT */}
    <section id="impact" data-nav-section data-nav-label="Impact" className="scroll-mt-24 border-b border-border bg-surface-muted px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Impact</SectionLabel>
          <h2 className="max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            Measurable outcomes, in the field.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {info.impacts.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-background p-7 shadow-soft">
                <div className="font-display text-5xl tracking-tight text-foreground">{s.value}</div>
                <div className="mt-3 text-sm font-semibold text-foreground">{s.label}</div>
                <div className="mt-1.5 text-xs text-muted-foreground">{s.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Reflection */}
    <section id="reflection" data-nav-section data-nav-label="Reflection" className="scroll-mt-24 border-b border-border px-6 py-24">

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">

        <Reveal className="lg:col-span-5">
          <div >
            <SectionLabel>Reflection</SectionLabel>
          </div>
          <h2 className="font-display text-5xl tracking-tight">
            What I'm taking forward.
          </h2>

        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">

          <ul className="space-y-4">

            {info.Reflection.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  {index + 1}
                </span>

                <p className="text-sm text-foreground">
                  {item}
                </p>

              </li>
            ))}

          </ul>

        </Reveal>

      </div>
    </section>
  </div>
);

export default ProjectContentSections;
