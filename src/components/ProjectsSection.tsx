const projects = [
  {
    title: "Brand Identity — Starter Kit",
    description: "Complete brand system with logo, colors, and typography guidelines.",
    tags: ["Branding", "Design System"],
  },
  {
    title: "E-Commerce Dashboard",
    description: "Analytics-first dashboard for a modern DTC fashion brand.",
    tags: ["UI/UX", "Web App"],
  },
  {
    title: "Portfolio — Photographer",
    description: "Minimal gallery site with smooth transitions and lightbox.",
    tags: ["Web Design", "Photography"],
  },
  {
    title: "SaaS Landing Page",
    description: "High-converting landing page with interactive product demos.",
    tags: ["Landing Page", "SaaS"],
  },
];

export default function ProjectsSection() {
  return (
    <section className="w-full py-14 md:py-20" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-2"
          style={{ color: "hsl(var(--foreground))" }}
        >
          Projects
        </h2>
        <p
          className="text-sm mb-10"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          A selection of recent work across branding, web, and product design.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              {/* Placeholder thumbnail */}
              <div
                className="w-full h-40 rounded-xl mb-4"
                style={{ background: "hsl(var(--muted))" }}
              />
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: "hsl(var(--accent) / 0.1)",
                      color: "hsl(var(--accent))",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
