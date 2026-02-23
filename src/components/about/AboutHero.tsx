import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutHero() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-background overflow-hidden"
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

      <div
        className="relative z-10 text-center max-w-4xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Status chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Open to Work
          </span>
        </div>

        <h1
          className="font-black uppercase tracking-[0.08em] text-foreground leading-none mb-6"
          style={{ fontSize: "clamp(64px, 14vw, 180px)" }}
        >
          RAJVEER
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Product UX/UI Designer &nbsp;·&nbsp; 4 Years Experience &nbsp;·&nbsp; SaaS Systems
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: isVisible ? 0.4 : 0,
          transition: "opacity 1.2s ease 0.6s",
        }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-border" />
      </div>
    </section>
  );
}
