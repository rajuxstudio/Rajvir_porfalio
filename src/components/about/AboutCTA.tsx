import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div
        className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-card p-10 sm:p-14 shadow-sm"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Let's build meaningful products.
        </h2>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-md mx-auto">
          Always open to conversations about product design, systems thinking, or collaboration opportunities.
        </p>
        <Button
          className="rounded-full px-8 py-6 text-base font-semibold shadow-md hover:scale-[1.03] transition-transform duration-200"
          style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
        >
          Schedule a Conversation
        </Button>
      </div>
    </section>
  );
}
