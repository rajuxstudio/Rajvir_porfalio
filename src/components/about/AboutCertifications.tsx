import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award } from "lucide-react";

const certifications = [
  { title: "Google UX Design", org: "Google · Coursera", year: "2023" },
  { title: "Interaction Design Specialization", org: "UC San Diego · Coursera", year: "2023" },
  { title: "Advanced UI/UX Design", org: "Design Academy", year: "2022" },
  { title: "Responsive Web Design", org: "freeCodeCamp", year: "2022" },
];

function CertCard({ cert, index, isVisible }: { cert: typeof certifications[0]; index: number; isVisible: boolean }) {
  return (
    <div
      className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      {/* Subtle gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsl(var(--accent) / 0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
          <Award size={18} className="text-accent" />
        </div>
        <h3 className="text-sm font-bold text-foreground mb-1">{cert.title}</h3>
        <p className="text-xs text-muted-foreground">{cert.org}</p>
        <span className="inline-block mt-3 text-[11px] font-semibold text-accent tracking-wide">{cert.year}</span>
      </div>
    </div>
  );
}

export default function AboutCertifications() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 text-center"
          style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          Certifications
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Credentials & Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
