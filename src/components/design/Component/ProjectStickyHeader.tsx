import { Apple, ArrowUpRight, Github, Link2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TechStackItem } from "../projects/project_design";

interface ProjectStickyHeaderProps {
  title: string;
  logo: string;
  techStack: TechStackItem[];
  link: { name: string; link: string }[];
  isSticky: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

const ProjectStickyHeader = ({ title, logo, techStack, link, isSticky, headerRef }: ProjectStickyHeaderProps) => {
  const websiteLink = link.find((item) => /web|website/i.test(item.name))?.link;
  const appStoreLink = link.find((item) => /app store|ios|apple|appstore/i.test(item.name))?.link;
  const playStoreLink = link.find((item) => /play store|google play|android|play/i.test(item.name))?.link;
  const fallbackAppLink = link.find((item) => /app|mobile|tablet/i.test(item.name) && !/app store|ios|apple|appstore|play store|google play|android|play/i.test(item.name))?.link;
  const otherLinks = link.filter(
    (item) => !/web|website|app store|ios|apple|appstore|play store|google play|android|play|app|mobile|tablet/i.test(item.name)
  );

  const getLinkIcon = (name: string) => {
    const lowerName = name.toLowerCase();

    if (/github/.test(lowerName)) return Github;
    if (/figma/.test(lowerName)) return Link2;
    if (/web|website|site|www/.test(lowerName)) return ArrowUpRight;
    if (/app store|appstore|ios|apple/.test(lowerName)) return Apple;
    if (/play store|google play|android|play/.test(lowerName)) return Play;
    return Link2;
  };

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${isSticky
        ? "bg-card/95 backdrop-blur-md shadow-md border-b border-border"
        : "bg-card border-b border-border"
        }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <img src={logo} alt={title} className="w-16 h-16 rounded-full" />
          <h2 className="text-lg md:text-xl font-bold text-foreground truncate">{title}</h2>

        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">
            {techStack.slice(0, 3).map((tech) => {
              const label = typeof tech === "string" ? tech : tech.name;

              return (
                <span
                  key={label}
                  className="hidden md:flex w-9 h-9 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {typeof tech !== "string" && (
                    <img src={tech.icon} alt={`${tech.name} icon`} className="w-3.5 h-3.5" />
                  )}
                  {/* {label} */}
                </span>
              );
            })}
          </div>

          {/* Secondary Button */}
          {websiteLink ? (
            <Button asChild variant="outline" size="sm" className="rounded-full px-4 text-primary border-primary hover:bg-primary/10">
              <a href={websiteLink} target="_blank" rel="noreferrer">
                <ArrowUpRight className="w-4 h-4 text-primary" />
                View
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="rounded-full px-4 text-primary border-primary hover:bg-primary/10">
              <ArrowUpRight className="w-4 h-4 text-primary" />
              View
            </Button>
          )}

          {/* Store Buttons */}
          <div className="flex items-center gap-2">
            {appStoreLink ? (
              <Button asChild variant="outline" size="sm" className="rounded-full px-3 text-primary border-primary hover:bg-primary/10">
                <a href={appStoreLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Apple className="w-4 h-4 text-primary" />
                  <span className="text-xs">App Store</span>
                </a>
              </Button>
            ) : null}

            {playStoreLink ? (
              <Button asChild variant="outline" size="sm" className="rounded-full px-3 text-primary border-primary hover:bg-primary/10">
                <a href={playStoreLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-xs">Play Store</span>
                </a>
              </Button>
            ) : null}

            {!appStoreLink && !playStoreLink && fallbackAppLink ? (
              <Button asChild variant="outline" size="sm" className="rounded-full px-3 text-primary border-primary hover:bg-primary/10">
                <a href={fallbackAppLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Apple className="w-4 h-4 text-primary" />
                  <span className="text-xs">App</span>
                </a>
              </Button>
            ) : null}

            {otherLinks.map((item) => {
              const Icon = getLinkIcon(item.name);
              return (
                <Button asChild variant="outline" size="sm" key={item.name} className="rounded-full px-3 text-primary border-primary hover:bg-primary/10">
                  <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs capitalize">{item.name}</span>
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStickyHeader;
