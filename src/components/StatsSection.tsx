const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "11", label: "Happy Clients" },
  { value: "12", label: "Projects Completed" },
  { value: "100+", label: "Templates Created" },
];

export default function StatsSection() {
  return (
    <section className="w-full py-10 md:py-14" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span
              className="text-4xl md:text-5xl font-extrabold"
              style={{ color: "hsl(var(--accent))" }}
            >
              {s.value}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
