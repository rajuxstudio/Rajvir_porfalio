interface ProjectDetailHeroProps {
  title: string;
  subtitle?: string;
  category: string;
  description?: string;
  gradient: string;
  iconSrc?: string;
  metaChips?: { label: string; value: string }[];
}

export default function ProjectDetailHero({
  title,
  subtitle,
  category,
  description,
  gradient,
  iconSrc,
  metaChips,
}: ProjectDetailHeroProps) {
  return (
    <div
      className="relative -mx-6 sm:-mx-8 -mt-4 mb-2"
      style={{
        background: `linear-gradient(180deg, ${gradient.includes("linear-gradient") ? gradient.replace("linear-gradient(135deg, ", "").replace(")", "").split(",")[0].trim() : "hsl(var(--muted))"}15 0%, transparent 100%)`,
      }}
    >
      <div className="flex flex-col items-center text-center px-6 sm:px-8 pt-10 pb-8 gap-5">
        {/* App Icon */}
        {iconSrc && (
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-border/30">
            <img src={iconSrc} alt={title} className="w-full h-full object-cover" width={64} height={64} />
          </div>
        )}

        {/* Title */}
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm font-medium" style={{ color: gradient.includes("linear-gradient") ? gradient.replace("linear-gradient(135deg, ", "").replace(")", "").split(",")[0].trim() : "hsl(var(--accent))" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Badge */}
        <span className="text-xs font-semibold px-4 py-1.5 rounded-full border border-border bg-background text-foreground">
          {category}
        </span>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            {description}
          </p>
        )}

        {/* Meta Chips */}
        {metaChips && metaChips.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
            {metaChips.map((chip) => (
              <span
                key={chip.label}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground"
              >
                <span className="font-bold text-foreground">{chip.label}:</span>{" "}
                {chip.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
