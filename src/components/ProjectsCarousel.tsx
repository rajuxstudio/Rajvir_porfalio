import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import rLogo from "@/assets/r-logo.png";
import cloudgavelMockup from "@/assets/cloudgavel-mockup.png";

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
  mockup?: string;
}

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "11", label: "Happy Clients" },
  { value: "12", label: "Projects Completed" },
  { value: "100+", label: "Templates Created" },
];

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
    mockup: "/placeholder.svg",
  },
  {
    id: 2, title: "CloudGavel", category: "SaaS",
    industryDomain: "Law Enforcement / Justice", applications: ["web", "mobile"],
    description: "An innovative eWarrant solution that streamlines the warrant approval process.",
    color: googleColors[1], link: "#",
    mockup: cloudgavelMockup,
  },
  {
    id: 3, title: "Echelon Constructors", category: "ERP",
    industryDomain: "Construction", applications: ["web"],
    description: "Construction Project Management Software for planning, scheduling, and resource management.",
    color: googleColors[0], link: "#",
    mockup: "/placeholder.svg",
  },
  {
    id: 4, title: "Captable", category: "Fintech",
    industryDomain: "Finance / Investment", applications: ["web"],
    description: "Manage equity, track cap tables, and streamline investment workflows.",
    color: googleColors[4], link: "#",
    mockup: "/placeholder.svg",
  },
  {
    id: 5, title: "Bumper Mandi", category: "AgriTech",
    industryDomain: "Agriculture", applications: ["mobile", "web"],
    description: "A digital mandi app that helps farmers sell grain securely and transparently.",
    color: googleColors[3], link: "#",
    mockup: "/placeholder.svg",
  },
  {
    id: 6, title: "React Portfolio", category: "Web Development",
    industryDomain: "Personal / Creative", applications: ["web"],
    description: "A modern, responsive portfolio website using React with smooth navigation and clean UI.",
    color: googleColors[5], link: "#",
    mockup: "/placeholder.svg",
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const itemCount = projects.length;
  const anglePerItem = 360 / itemCount;
  const radius = isMobile ? 220 : isTablet ? 340 : 480;
  const cardWidth = isMobile ? 180 : isTablet ? 220 : 280;

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
  const displayProject = hoveredIndex !== null ? projects[hoveredIndex] : projects[activeIndex];

  return (
    <section className="relative w-full flex flex-col overflow-hidden" style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      {/* Section background mockup on hover */}
      {displayProject.mockup && (
        <>
          <img
            key={displayProject.id}
            src={displayProject.mockup}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: 0.25, zIndex: 1 }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 40%, hsl(var(--background) / 0.6) 100%)" }} />
        </>
      )}
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "hsl(var(--accent))" }}
        />
      </div>

      {/* Stats row */}
      <div className="relative z-10 w-full py-4 md:py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-5xl font-extrabold" style={{ color: "hsl(var(--accent))" }}>
                {s.value}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel — top portion */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="relative mx-auto select-none w-full"
          style={{ height: isMobile ? "280px" : "calc(100vh - (100vh / 1.618))", perspective: isMobile ? "800px" : "1400px", width: isMobile ? "100%" : "calc(100vw / 1.618)", margin: "0 auto" }}
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
                width: cardWidth,
                height: isMobile ? "280px" : "calc(100vh - (100vh / 1.618))",
                transformStyle: "preserve-3d",
                transform: `rotateX(-8deg) rotateY(${rotation}deg)`,
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
                      pointerEvents: isBackSide ? "none" : "auto",
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
                    <div
                      className="w-full h-full rounded-3xl overflow-hidden relative"
                      style={{
                        background: project.color,
                        border: "1px solid hsl(var(--foreground) / 0.08)",
                        boxShadow: isActive
                          ? `0 30px 60px -15px hsl(var(--foreground) / 0.35),
                             0 15px 30px -10px hsl(var(--foreground) / 0.15),
                             inset 0 1px 0 rgba(255,255,255,0.25),
                             inset 0 -1px 0 rgba(0,0,0,0.1)`
                          : `0 12px 35px -10px hsl(var(--foreground) / 0.15),
                             0 5px 15px -5px hsl(var(--foreground) / 0.08),
                             inset 0 1px 0 rgba(255,255,255,0.2),
                             inset 0 -1px 0 rgba(0,0,0,0.05)`,
                        transform: isHovered && !isMobile ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                        transition: "transform 0.4s ease, box-shadow 0.4s ease",
                      }}
                    >
                      {/* Glass overlays */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
                        style={{
                          background: `linear-gradient(145deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 30%, transparent 50%, transparent 70%, rgba(255,255,255,0.04) 100%)`,
                        }}
                      />
                      <div
                        className="absolute top-0 left-2 right-2 h-[1px] pointer-events-none z-10"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
                      />
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "rgba(255,255,255,0.3)" }} />
                        <div className="absolute bottom-10 -left-6 w-24 h-24 rounded-full opacity-15" style={{ background: "rgba(255,255,255,0.2)" }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full opacity-10" style={{ background: "rgba(255,255,255,0.4)" }} />
                      </div>

                      {/* Center logo */}
                      {project.isViewAll ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <ArrowRight size={30} className="text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <img src={rLogo} alt="Logo" className="w-16 h-16 object-contain opacity-40 drop-shadow-lg" />
                        </div>
                      )}

                      {/* Platform icons top-right */}
                      {project.applications && project.applications.length > 0 && (
                        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                          {project.applications.map((app) => (
                            <span key={app} className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              {app === "web" && <Monitor size={12} className="text-white" />}
                              {app === "mobile" && <Smartphone size={12} className="text-white" />}
                              {app === "tablet" && <Tablet size={12} className="text-white" />}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Card bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
                      >
                        <h3 className="text-sm font-bold text-white leading-tight drop-shadow-md">{project.title}</h3>
                        {!project.isViewAll && (
                          <span className="text-[10px] font-medium text-white/70">
                            {project.category}{project.industryDomain && ` · ${project.industryDomain}`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 py-4">
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

      {/* Project info panel — bottom portion */}
      <div className="px-4 md:px-16 pb-8 md:pb-12 pt-4 max-w-3xl mx-auto w-full">
        <div
          className="transition-all duration-400 ease-out"
          key={displayProject.id}
          style={{ animation: "fadeInUp 0.35s ease-out" }}
        >
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-center">
            {displayProject.description}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
