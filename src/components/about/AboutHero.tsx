import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroPhoto from "@/assets/hero-photo.png";

const skills = ["UX Design", "UI Design", "Design Systems", "Product Thinking", "AI & Cloud Basics"];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "25+", label: "Projects Delivered" },
  { value: "SaaS", label: "& Product Focus" },
];

export default function AboutHero() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center px-6 sm:px-10 bg-background overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-24">
        {/* Left — Text */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-6">
            Designing Scalable Digital Experiences.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            UX/UI Designer with 3+ years of experience designing SaaS and enterprise platforms. Currently pursuing MCA to strengthen technical expertise in cloud, AI, and systems.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mb-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${300 + i * 100}ms, transform 0.5s ease ${300 + i * 100}ms`,
                }}
              >
                <span className="text-2xl sm:text-3xl font-black text-accent">{s.value}</span>
                <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Photo + Chips */}
        <div
          className="flex flex-col items-center gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          <div className="relative">
            <img
              src={heroPhoto}
              alt="Rajveer — Product UX/UI Designer"
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl object-cover shadow-lg border border-border"
              loading="lazy"
            />
          </div>

          {/* Skill chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-200"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.4s ease ${400 + i * 80}ms, transform 0.4s ease ${400 + i * 80}ms`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
