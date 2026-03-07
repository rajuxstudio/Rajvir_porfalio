import utilityLogo from "@/assets/utility-plus-logo.png";

export default function UtilityHero() {
  return (
    <div
      className="relative -mx-8 -mt-10 px-8 py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--accent) / 0.06) 50%, hsl(var(--muted)) 100%)",
      }}
    >
      {/* Decorative dots */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative flex flex-col items-center text-center gap-5 max-w-xl mx-auto">
        <img
          src={utilityLogo}
          alt="Utility Plus logo"
          className="w-20 h-20 rounded-2xl object-contain bg-card border border-border p-2.5 shadow-sm"
        />
        <div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            UtilityPlus
          </h2>
          <p className="text-sm font-medium text-accent mt-1.5">
            Government Utility Billing Application
          </p>
          <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent">
            Software as a Service (SaaS)
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          A unified government utility management ecosystem enabling bill
          payments, work order tracking, and occupational license management
          across Web, Admin, and Mobile platforms.
        </p>

        {/* Meta tags */}
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          {[
            { label: "Role", value: "UX/UI Designer" },
            { label: "Platform", value: "Web, Admin, Mobile" },
            { label: "Focus", value: "Workflow Simplification" },
          ].map((m) => (
            <div
              key={m.label}
              className="text-xs px-3 py-1.5 rounded-lg bg-card/80 border border-border shadow-sm"
            >
              <span className="font-semibold text-foreground">{m.label}:</span>{" "}
              <span className="text-muted-foreground">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
