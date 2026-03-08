import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Apple, Brush, Eye, Layers, Play, Smartphone, Sparkles } from "lucide-react";

export interface MobileAppDownloadProps {
  headline: string;
  mockups?: string[]; // 1 or 2 mockup image paths
  features: { title: string; desc: string }[];
  contributions: string[];
  projectStage?: string[];
  uxFocus?: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export default function MobileAppDownload({
  headline,
  mockups = [],
  features,
  contributions,
  projectStage,
  uxFocus = ["Reduced cognitive load", "Fast mobile interactions", "Trust-driven UI", "Cross-platform consistency"],
  appStoreUrl = "#",
  playStoreUrl = "#",
}: MobileAppDownloadProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero: Download Section */}
      <div className="flex flex-col items-center text-center gap-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Download Now
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug max-w-md">
          {headline}
        </h3>

        {/* Store badges */}
        <div className="flex items-center gap-3">
          <a
            href={appStoreUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "#000000" }}
          >
            <Apple size={16} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-normal opacity-60">Download on the</span>
              <span className="text-[11px]">App Store</span>
            </div>
          </a>
          <a
            href={playStoreUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "#01875f" }}
          >
            <Play size={16} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-normal opacity-60">Get it on</span>
              <span className="text-[11px]">Google Play</span>
            </div>
          </a>
        </div>
      </div>

      {/* Phone Mockups */}
      {mockups.length > 0 && (
        <div className="flex items-end justify-center gap-6 sm:gap-10 py-6">
          {mockups.length >= 2 ? (
            <>
              <img
                src={mockups[0]}
                alt="Mobile app screen 1"
                className="w-28 sm:w-36 -rotate-6 translate-y-3 drop-shadow-[0_20px_40px_hsl(var(--foreground)/0.15)]"
              />
              <img
                src={mockups[1]}
                alt="Mobile app screen 2"
                className="w-32 sm:w-40 z-10 rotate-2 drop-shadow-[0_25px_50px_hsl(var(--foreground)/0.2)]"
              />
            </>
          ) : (
            <img
              src={mockups[0]}
              alt="Mobile app screen"
              className="w-36 sm:w-44 drop-shadow-[0_25px_50px_hsl(var(--foreground)/0.2)]"
            />
          )}
        </div>
      )}

      {/* Features & Changes */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          Features & My Contributions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Core Features */}
          <div className="rounded-2xl p-5 bg-muted border border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers size={14} className="text-primary" />
              </span>
              <h4 className="text-sm font-bold text-foreground">Core Features</h4>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {features.map((item, i) => (
                <AccordionItem key={i} value={`mob-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-sm py-2.5 hover:no-underline text-foreground">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* My Contribution */}
          <div className="rounded-2xl p-5 bg-muted border border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brush size={14} className="text-primary" />
              </span>
              <h4 className="text-sm font-bold text-foreground">My Contribution</h4>
            </div>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {contributions.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>

            {projectStage && projectStage.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Smartphone size={14} className="text-primary" />
                  </span>
                  <h4 className="text-sm font-bold text-foreground">Project Stage</h4>
                </div>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {projectStage.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* UX Focus — full width */}
          <div className="rounded-2xl p-5 bg-primary/5 border border-primary/15 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye size={14} className="text-primary" />
              </span>
              <h4 className="text-sm font-bold text-foreground">UX Focus</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {uxFocus.map((item) => (
                <div key={item} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-background/60">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
