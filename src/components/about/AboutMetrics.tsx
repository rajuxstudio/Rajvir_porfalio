import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";

const metrics = [
  { value: 32, suffix: "%", icon: "↑", label: "Conversion Growth", color: "hsl(var(--accent))" },
  { value: 25, suffix: "%", icon: "↓", label: "Reduced Drop-Off", color: "hsl(142 71% 45%)" },
  { value: 40, suffix: "%", icon: "⚡", label: "Dev Efficiency", color: "hsl(45 93% 58%)" },
];

function MetricCard({ metric, isVisible, delay }: { metric: typeof metrics[0]; isVisible: boolean; delay: number }) {
  const count = useCountUp(metric.value, isVisible);

  return (
    <div
      className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span className="text-2xl mb-2">{metric.icon}</span>
      <span
        className="text-5xl sm:text-6xl md:text-7xl font-black tabular-nums tracking-tight"
        style={{ color: metric.color }}
      >
        {count}{metric.suffix}
      </span>
      <span className="text-sm font-medium text-muted-foreground mt-3 tracking-wide uppercase">
        {metric.label}
      </span>
    </div>
  );
}

export default function AboutMetrics() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} metric={m} isVisible={isVisible} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}
