import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import rLogo from "@/assets/r-logo.png";

interface Project {
  id: number;
  title: string;
  category: string;
  industryDomain?: string;
  applications?: ("web" | "mobile" | "tablet")[];
  description: string;
  color: string;
  link: string;
  isViewAll?: boolean;
}

const googleColors = [
  "linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)",
  "linear-gradient(135deg, #FFA24C 0%, #E56A2E 100%)",
  "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)",
  "linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)",
  "linear-gradient(135deg, #0F2A44 0%, #5F87A8 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)",
];

const projects: Project[] = [
  {
    id: 1, title: "Utility Plus", category: "SaaS",
    industryDomain: "Public Utilities / Government", applications: ["web", "mobile", "tablet"],
    description: "Help agencies manage billing, track records, and streamline user data efficiently.",
    color: googleColors[2], link: "#",
  },
  {
    id: 2, title: "CloudGavel", category: "SaaS",
    industryDomain: "Law Enforcement / Justice", applications: ["web", "mobile"],
    description: "An innovative eWarrant solution that streamlines the warrant approval process.",
    color: googleColors[1], link: "#",
  },
  {
    id: 3, title: "Echelon Constructors", category: "ERP",
    industryDomain: "Construction", applications: ["web"],
    description: "Construction Project Management Software for planning, scheduling, and resource management.",
    color: googleColors[0], link: "#",
  },
  {
    id: 4, title: "Captable", category: "Fintech",
    industryDomain: "Finance / Investment", applications: ["web"],
    description: "Manage equity, track cap tables, and streamline investment workflows.",
    color: googleColors[4], link: "#",
  },
  {
    id: 5, title: "Bumper Mandi", category: "AgriTech",
    industryDomain: "Agriculture", applications: ["mobile", "web"],
    description: "A digital mandi app that helps farmers sell grain securely and transparently.",
    color: googleColors[3], link: "#",
  },
  {
    id: 6, title: "React Portfolio", category: "Web Development",
    industryDomain: "Personal / Creative", applications: ["web"],
    description: "A modern, responsive portfolio website using React with smooth navigation and clean UI.",
    color: googleColors[5], link: "#",
  },
  {
    id: 7, title: "View All Projects", category: "Projects",
    description: "Explore my complete collection of design and development work.",
    color: "linear-gradient(135deg, hsl(var(--accent)), hsl(280 80% 60%))", link: "/projects",
    isViewAll: true,
  },
];

export default function ProjectsCarousel() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);

  const itemCount = projects.length;
  const anglePerItem = 360 / itemCount;
  const radius = 380;

  const nextSlide = useCallback(() => {
    setRotation((prev) => prev - anglePerItem);
  }, [anglePerItem]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragRotation(rotation);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = (clientX - startX) * 0.3;
    setRotation(dragRotation + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const snappedRotation = Math.round(rotation / anglePerItem) * anglePerItem;
    setRotation(snappedRotation);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const getActiveIndex = () => {
    const normalized = (((-rotation % 360) + 360) % 360);
    return Math.round(normalized / anglePerItem) % itemCount;
  };

  const activeIndex = getActiveIndex();
  const isAnyHovered = hoveredIndex !== null;

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "hsl(var(--accent))" }}
        />
      </div>

      {/* Carousel */}
      <div
        className="relative mx-auto select-none"
        style={{ height: 460, perspective: "1200px" }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => {
          handleDragEnd();
          setIsAutoPlaying(true);
          setHoveredIndex(null);
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: 260,
              height: 360,
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {projects.map((project, index) => {
              const angle = index * anglePerItem;
              const isActive = index === activeIndex;
              const isHovered = hoveredIndex === index;

              const relativeAngle = ((angle + rotation) % 360 + 360) % 360;
              const isBackSide = relativeAngle > 90 && relativeAngle < 270;
              const baseOpacity = isBackSide ? 0.4 : 1;
              const scale = isBackSide ? 0.85 : 1;
              const shouldBlur = isAnyHovered && !isHovered;
              const opacity = shouldBlur ? 0.3 : baseOpacity;

              return (
                <div
                  key={project.id}
                  className="absolute inset-0 cursor-pointer"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
                    opacity,
                    filter: shouldBlur ? "blur(3px)" : "none",
                    transition: "opacity 0.4s, filter 0.4s, transform 0.6s cubic-bezier(0.25,1,0.5,1)",
                  }}
                  onClick={() => {
                    if (isActive) {
                      if (project.isViewAll) navigate(project.link);
                      else window.open(project.link, "_blank");
                    } else {
                      setRotation(-index * anglePerItem);
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card */}
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col"
                    style={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: isActive
                        ? `0 25px 50px -12px hsl(var(--foreground) / 0.25),
                           0 12px 24px -8px hsl(var(--foreground) / 0.1),
                           inset 0 1px 0 hsl(var(--background) / 0.4),
                           inset 0 -1px 0 hsl(var(--foreground) / 0.05)`
                        : `0 10px 30px -8px hsl(var(--foreground) / 0.12),
                           0 4px 12px -4px hsl(var(--foreground) / 0.06),
                           inset 0 1px 0 hsl(var(--background) / 0.3),
                           inset 0 -1px 0 hsl(var(--foreground) / 0.03)`,
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* Glass reflection shine */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: `linear-gradient(
                          135deg,
                          hsl(var(--background) / 0.15) 0%,
                          transparent 40%,
                          transparent 60%,
                          hsl(var(--background) / 0.05) 100%
                        )`,
                      }}
                    />
                    {/* Top edge highlight */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10"
                      style={{ background: "linear-gradient(90deg, transparent, hsl(var(--background) / 0.5), transparent)" }}
                    />

                    {/* Color header */}
                    {project.isViewAll ? (
                      <div
                        className="h-[140px] flex items-center justify-center relative"
                        style={{ background: project.color }}
                      >
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <ArrowRight size={28} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-[140px] relative overflow-hidden" style={{ background: project.color }}>
                        {/* Decorative circles */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-white" />
                          <div className="absolute bottom-2 left-4 w-10 h-10 rounded-full border border-white" />
                          <div className="absolute top-6 left-1/2 w-6 h-6 rounded-full bg-white/30" />
                        </div>

                        {/* Category + Platform badges */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {project.category}
                          </span>
                          <div className="flex gap-1">
                            {project.applications?.includes("web") && (
                              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Monitor size={10} className="text-white" />
                              </span>
                            )}
                            {project.applications?.includes("mobile") && (
                              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Smartphone size={10} className="text-white" />
                              </span>
                            )}
                            {project.applications?.includes("tablet") && (
                              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Tablet size={10} className="text-white" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content — fades on hover */}
                    <div
                      className="flex-1 p-4 flex flex-col gap-1.5 transition-opacity duration-300"
                      style={{ opacity: isHovered ? 0 : 1 }}
                    >
                      <h3 className="text-sm font-bold leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                        {project.title}
                      </h3>
                      {project.industryDomain && (
                        <span className="text-[10px] font-medium" style={{ color: "hsl(var(--accent))" }}>
                          {project.industryDomain}
                        </span>
                      )}
                      <p className="text-[11px] leading-relaxed line-clamp-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl transition-opacity duration-300 z-20"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        pointerEvents: isHovered ? "auto" : "none",
                        background: "hsl(var(--card) / 0.92)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>
                        {project.title}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "hsl(var(--accent))" }}>
                        {project.isViewAll ? "Explore All" : "View Project"}
                      </span>
                      <ExternalLink size={18} style={{ color: "hsl(var(--muted-foreground))" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setRotation(-i * anglePerItem)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === activeIndex ? "hsl(var(--accent))" : "hsl(var(--border))",
              transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
