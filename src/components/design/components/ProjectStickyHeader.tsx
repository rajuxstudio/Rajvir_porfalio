import { ChevronDown, ExternalLink, Github, Globe, Link2, Monitor, Smartphone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import type { TechStackItem } from "../projects/types";

interface ProjectStickyHeaderProps {
  title: string;
  role?: string;
  date?: string;
  logo: string;
  techStack: TechStackItem[];
  link: { name: string; link: string }[];
  isSticky: boolean;
  scrollProgress?: number;
  headerRef: React.RefObject<HTMLDivElement>;
}

type PlatformSlot = {
  key: string;
  label: string;
  icon: LucideIcon;
  match: RegExp;
};

type VisitEntry = {
  key: string;
  label: string;
  icon: LucideIcon;
  url?: string;
};

const PLATFORM_SLOTS: PlatformSlot[] = [
  { key: "portal", label: "Web Portal", icon: Monitor, match: /portal|dashboard|admin/i },
  { key: "web", label: "Website", icon: Globe, match: /^web(site)?$|\bsite\b|www/i },
  { key: "mobile", label: "Mobile App", icon: Smartphone, match: /mobile|android|ios|app store|play store|apple|play|^app$/i },
];

const getLinkIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (/github/.test(lowerName)) return Github;
  if (/figma/.test(lowerName)) return Link2;
  return ExternalLink;
};

const ProjectStickyHeader = ({
  title,
  role,
  date,
  logo,
  techStack,
  link,
  isSticky,
  scrollProgress = 0,
  headerRef,
}: ProjectStickyHeaderProps) => {
  const isMobile = useIsMobile();
  const subtitle = [role, date].filter(Boolean).join(" · ");

  const matchedNames = new Set<string>();
  const platforms = PLATFORM_SLOTS.map((slot) => {
    const found = link.find((item) => slot.match.test(item.name));
    if (found) matchedNames.add(found.name);
    return { ...slot, url: found?.link };
  });
  const otherLinks = link.filter((item) => !matchedNames.has(item.name));

  const visitEntries: VisitEntry[] = [
    ...platforms.map((p) => ({ key: p.key, label: p.label, icon: p.icon, url: p.url })),
    ...otherLinks.map((item) => ({ key: item.name, label: item.name, icon: getLinkIcon(item.name), url: item.link })),
  ];
  const hasAnyLink = visitEntries.some((e) => e.url);

  const VisitTriggerButton = (
    <Button variant="default" size="sm" className="rounded-full px-4">
      Visit
      <ChevronDown className="ml-1 h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${isSticky
        ? "bg-card/95 backdrop-blur-md shadow-lg shadow-black/5"
        : "bg-card"
        }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 min-w-0">
          <img src={logo} alt={title} className="w-16 h-16 rounded-full" />
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-bold text-foreground truncate">{title}</h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {/* Tools used to build */}
          {techStack.length > 0 && (
            <div className="flex items-center gap-1.5">
              {techStack.map((tech) => {
                const label = typeof tech === "string" ? tech : tech.name;
                return typeof tech !== "string" ? (
                  <span
                    key={label}
                    title={label}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <img src={tech.icon} alt={`${tech.name} icon`} className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span
                    key={label}
                    className="h-9 rounded-full border border-border px-2.5 text-[10px] font-semibold uppercase leading-9 tracking-wide text-muted-foreground"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Visit — every link to the live app. Dropdown on desktop, bottom sheet on mobile. Hidden entirely when there's nothing to link to. */}
          {!hasAnyLink ? null : isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>{VisitTriggerButton}</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Visit the app</DrawerTitle>
                  <DrawerDescription>Jump straight to {title}'s live platforms.</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-2 px-4 pb-8">
                  {visitEntries.map((entry) =>
                    entry.url ? (
                      <a
                        key={entry.key}
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-border px-4 py-3.5 text-sm font-medium text-foreground transition hover:bg-muted"
                      >
                        <entry.icon className="h-4 w-4 text-primary" />
                        {entry.label}
                      </a>
                    ) : (
                      <div
                        key={entry.key}
                        className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3.5 text-sm text-muted-foreground/50"
                      >
                        <entry.icon className="h-4 w-4" />
                        {entry.label}
                        <span className="ml-auto text-[10px] uppercase tracking-wide">Soon</span>
                      </div>
                    ),
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>{VisitTriggerButton}</DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Visit the app</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {visitEntries.map((entry) =>
                  entry.url ? (
                    <DropdownMenuItem key={entry.key} asChild>
                      <a href={entry.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 cursor-pointer">
                        <entry.icon className="h-4 w-4 text-primary" />
                        {entry.label}
                      </a>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={entry.key} disabled className="flex items-center gap-2">
                      <entry.icon className="h-4 w-4" />
                      {entry.label}
                      <span className="ml-auto text-[10px] uppercase tracking-wide">Soon</span>
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="h-[3px] w-full bg-border/50">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProjectStickyHeader;
