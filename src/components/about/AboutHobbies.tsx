import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Cpu, Palette, Server, Dumbbell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const hobbies = [
  {
    icon: Cpu,
    title: "Exploring AI & Emerging Tech",
    desc: "Staying ahead of the curve with generative AI, LLMs, and automation tools.",
  },
  {
    icon: Palette,
    title: "UI Exploration & Trends",
    desc: "Studying cutting-edge interfaces, micro-interactions, and visual storytelling.",
  },
  {
    icon: Server,
    title: "Learning System Architecture",
    desc: "Understanding scalable systems, APIs, and cloud infrastructure patterns.",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Discipline",
    desc: "Building mental clarity and consistency through physical training.",
  },
];

export default function AboutHobbies() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 text-center"
          style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          Beyond Work
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          What Keeps Me Going
        </h2>

        <TooltipProvider delayDuration={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hobbies.map((h, i) => {
              const Icon = h.icon;
              return (
                <Tooltip key={h.title}>
                  <TooltipTrigger asChild>
                    <div
                      className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4 cursor-default hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(16px)",
                        transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-accent" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{h.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[220px] text-center">
                    <p className="text-xs">{h.desc}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
