import { useScrollReveal } from "@/hooks/useScrollReveal";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Modi Institute of Management & Technology, Kota",
    period: "Jun 2024 – Jun 2026",
    skills: ["Programming", "DSA", "Cloud", "SQL", "AI/ML"],
  },
  {
    degree: "Master of Commerce (MCom)",
    institution: "Birla College, Kalyan",
    period: "Dec 2020 – May 2022",
    skills: [],
  },
  {
    degree: "Bachelor of Commerce (BCom)",
    institution: "Govt. Commerce College, Kota",
    period: "Apr 2017 – Apr 2020",
    skills: [],
  },
];

function EducationCard({ edu, index }: { edu: typeof education[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
        backdropFilter: "blur(8px)",
      }}
    >
      <span className="text-xs font-semibold text-accent tracking-wide uppercase">{edu.period}</span>
      <h3 className="text-lg font-bold text-foreground mt-2 mb-1">{edu.degree}</h3>
      <p className="text-sm text-muted-foreground">{edu.institution}</p>
      {edu.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {edu.skills.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-border bg-secondary text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AboutEducation() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 text-center"
          style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          Education
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Academic Background
        </h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <EducationCard key={edu.degree} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
