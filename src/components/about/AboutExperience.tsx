import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Experience {
  period: string;
  title: string;
  company: string;
  type: string;
  location?: string;
  points: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    period: "Mar 2025 – Present",
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    type: "Freelance",
    points: [
      "Designing product interfaces for startups",
      "Building scalable design systems",
      "Creating user flows and interaction patterns",
    ],
    skills: ["Figma", "Design Systems", "User Flows", "Prototyping"],
  },
  {
    period: "Aug 2025 – Sep 2025",
    title: "UX/UI Designer",
    company: "HummingWave Technologies Pvt. Ltd.",
    type: "Part-time",
    location: "Bangalore",
    points: [
      "UX improvements for product interfaces",
      "Interface execution and design QA",
      "Cross-functional collaboration with engineering",
    ],
    skills: ["UX Research", "Interface Design", "Collaboration"],
  },
  {
    period: "May 2022 – Mar 2025",
    title: "UX/UI Designer",
    company: "FusionStack LLC",
    type: "Full-time",
    location: "Hybrid · Pune",
    points: [
      "Enterprise SaaS interface design",
      "Built interaction systems and component libraries",
      "Designed scalable product experiences",
      "Worked closely with engineering teams",
    ],
    skills: ["SaaS", "Enterprise", "Design Systems", "Product Design"],
  },
  {
    period: "Jan 2022 – May 2022",
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    type: "Freelance",
    points: [
      "Designed interfaces for early-stage startups",
      "Rapid prototyping and user testing",
    ],
    skills: ["Startup Design", "Prototyping", "UI Design"],
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div ref={ref} className="flex gap-6 sm:gap-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-3 h-3 rounded-full border-2 mt-2 transition-all duration-500"
          style={{
            borderColor: isVisible ? "hsl(var(--accent))" : "hsl(var(--border))",
            background: isVisible ? "hsl(var(--accent))" : "transparent",
          }}
        />
        {index < experiences.length - 1 && (
          <div
            className="w-px flex-1 min-h-[48px] transition-colors duration-700"
            style={{
              background: isVisible ? "hsl(var(--accent) / 0.2)" : "hsl(var(--border))",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="pb-10 flex-1"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-accent tracking-wide uppercase">{exp.period}</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">{exp.type}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{exp.title}</h3>
          <p className="text-sm text-muted-foreground mb-1">
            {exp.company}
            {exp.location && <span className="ml-1">· {exp.location}</span>}
          </p>

          <ul className="mt-4 space-y-1.5">
            {exp.points.map((p) => (
              <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-border bg-secondary text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutExperience() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 text-center"
          style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          Experience
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Where I've Worked
        </h2>
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.period + exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
