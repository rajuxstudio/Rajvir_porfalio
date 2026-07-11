import { Heart, Bookmark, CalendarDays } from "lucide-react";
import { toast } from "sonner";

interface ProjectStickyHeaderProps {
  title: string;
  techStack: string[];
  isSticky: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

const ProjectStickyHeader = ({ title, techStack, isSticky, headerRef }: ProjectStickyHeaderProps) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${
        isSticky
          ? "bg-card/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-card border-b border-border"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-foreground truncate">{title}</h2>
          <div className="hidden md:flex items-center gap-2">
            {techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/50 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleShare}
            className="hidden md:flex w-9 h-9 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button className="hidden md:flex w-9 h-9 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="hidden md:flex w-9 h-9 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <CalendarDays className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className="ml-1 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectStickyHeader;
