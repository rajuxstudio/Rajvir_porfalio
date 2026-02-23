import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutPhilosophy() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-32 sm:py-40 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            "I design systems that scale
            <span className="text-accent"> — </span>
            not just screens."
          </p>
        </blockquote>
      </div>
    </section>
  );
}
