import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutNarrative() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left — Summary */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            About
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-6">
            Designing product systems that drive measurable outcomes.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            I focus on the intersection of user experience, business strategy, and engineering feasibility. 
            Over 4 years I've shipped SaaS platforms and enterprise tools — reducing friction, 
            increasing conversion, and enabling dev teams to build faster with scalable design systems.
          </p>
        </div>

        {/* Right — Stacked mockup cards */}
        <div
          className="relative h-[320px] sm:h-[380px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-xl border border-border bg-card shadow-lg"
              style={{
                width: `${90 - i * 8}%`,
                height: `${85 - i * 10}%`,
                top: `${i * 24}px`,
                left: `${i * 16}px`,
                zIndex: 3 - i,
              }}
            >
              {/* Faux UI elements */}
              <div className="p-5">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/40" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-2.5 rounded bg-muted" style={{ width: `${70 - i * 10}%` }} />
                  <div className="h-2.5 rounded bg-muted" style={{ width: `${55 - i * 5}%` }} />
                  <div className="h-2.5 rounded bg-muted" style={{ width: `${40 + i * 5}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
