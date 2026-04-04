import { Monitor, Smartphone, Tablet } from "lucide-react";

interface ProjectDetailHeroProps {
  title: string;
  category: string;
  industryDomain?: string;
  gradient: string;
  applications?: ("web" | "mobile" | "tablet")[];
  role?: string;
  duration?: string;
  mockupSrc?: string;
}

export default function ProjectDetailHero({
  title,
  category,
  industryDomain,
  gradient,
  applications,
  role,
  duration,
  mockupSrc,
}: ProjectDetailHeroProps) {
  const platformIcons = {
    web: <Monitor size={12} />,
    mobile: <Smartphone size={12} />,
    tablet: <Tablet size={12} />,
  };

  return (
    <div className="relative -mx-6 sm:-mx-8 -mt-4 mb-2">
      {/* Gradient banner */}
      <div
        className="relative h-44 sm:h-56 overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px, 60px 60px",
          }}
        />
        {/* Mockup image */}
        {mockupSrc && mockupSrc !== "/placeholder.svg" && (
          <img
            src={mockupSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        )}
        {/* Fade to card */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content overlay at bottom of banner */}
      <div className="relative -mt-20 px-6 sm:px-8 z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md leading-tight">
          {title}
        </h2>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
            {category}
          </span>
          {industryDomain && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
              {industryDomain}
            </span>
          )}
        </div>

        {/* Meta chips row */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {applications && applications.length > 0 && (
            <div className="flex items-center gap-1.5">
              {applications.map((app) => (
                <span
                  key={app}
                  className="w-7 h-7 rounded-lg bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground border border-border/50"
                >
                  {platformIcons[app]}
                </span>
              ))}
            </div>
          )}
          {role && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary/80 text-foreground border border-border/50">
              {role}
            </span>
          )}
          {duration && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary/80 text-muted-foreground border border-border/50">
              {duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
