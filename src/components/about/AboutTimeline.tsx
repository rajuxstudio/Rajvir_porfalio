import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { title: "Discover", desc: "Research, interviews, and competitive analysis to uncover real user needs." },
  { title: "Define", desc: "Synthesize insights into clear problem statements and strategic priorities." },
  { title: "Design", desc: "Rapid prototyping with high-fidelity systems, tested and iterated." },
  { title: "Validate", desc: "Usability testing, A/B experiments, and data-driven refinements." },
  { title: "Scale", desc: "Design systems and documentation that empower teams to ship faster." },
];

function TimelineStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div ref={ref} className="flex gap-6 sm:gap-8">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-500"
          style={{
            borderColor: isVisible ? "hsl(var(--accent))" : "hsl(var(--border))",
            color: isVisible ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
            background: isVisible ? "hsl(var(--accent) / 0.08)" : "transparent",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {index < steps.length - 1 && (
          <div
            className="w-px flex-1 min-h-[48px] transition-colors duration-700"
            style={{
              background: isVisible ? "hsl(var(--accent) / 0.3)" : "hsl(var(--border))",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="pb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
      </div>
    </div>
  );
}

export default function AboutTimeline() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          Process
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          How I work
        </h2>
        <div>
          {steps.map((step, i) => (
            <TimelineStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
