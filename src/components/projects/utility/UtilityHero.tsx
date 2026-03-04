import { Monitor, Smartphone, Shield } from "lucide-react";
import utilityLogo from "@/assets/utility-plus-logo.png";

export default function UtilityHero() {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      {/* Gradient header */}
      <div
        className="relative p-8 pb-6"
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

        <div className="relative flex flex-col items-center text-center gap-4">
          <img
            src={utilityLogo}
            alt="Utility Plus logo"
            className="w-16 h-16 rounded-2xl object-contain bg-card border border-border p-2 shadow-sm"
          />
          <div>
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
              UtilityPlus
            </h3>
            <p className="text-sm font-medium text-accent mt-1">
              Government Utility Billing Application
            </p>
            <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent">
              Software as a Service (SaaS)
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            A unified government utility management ecosystem enabling bill
            payments, work order tracking, and occupational license management
            across Web, Admin, and Mobile platforms.
          </p>

          {/* Meta tags */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {[
              { label: "Role", value: "UX/UI Designer" },
              { label: "Platform", value: "Web, Admin, Mobile" },
              { label: "Focus", value: "Workflow Simplification" },
            ].map((m) => (
              <div
                key={m.label}
                className="text-xs px-3 py-1.5 rounded-lg bg-card/80 border border-border"
              >
                <span className="font-semibold text-foreground">{m.label}:</span>{" "}
                <span className="text-muted-foreground">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini mockup strip */}
      <div className="flex items-center justify-center gap-4 py-4 bg-card border-t border-border">
        {[
          { icon: <Monitor size={14} />, label: "Web Portal" },
          { icon: <Shield size={14} />, label: "Admin Portal" },
          { icon: <Smartphone size={14} />, label: "Mobile App" },
        ].map((p) => (
          <span
            key={p.label}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border"
          >
            {p.icon} {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}
