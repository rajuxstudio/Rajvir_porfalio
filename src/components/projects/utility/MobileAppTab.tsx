import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Apple, Brush, Eye, Layers, Play, Smartphone, Sparkles } from "lucide-react";
import mobileMockup1 from "@/assets/utility-mobile-mockup-1.png";
import mobileMockup2 from "@/assets/utility-mobile-mockup-2.png";

const features = [
  { title: "Bill Payment", desc: "Minimal steps, mobile optimized, clear confirmation and receipt generation." },
  { title: "Payment Tracking", desc: "Transaction history & property overview with filterable records." },
  { title: "Work Order via Photo", desc: "Users can capture and upload images while reporting issues in their area." },
  { title: "Property & Utility Overview", desc: "Clean dashboard for bill visibility and account management." },
];

const contributions = [
  "Complete UI redesign",
  "Defined color system",
  "Typography scale",
  "Component hierarchy",
  "Design consistency",
];

export default function MobileAppTab() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero: Download Section */}
      <div className="flex flex-col items-center text-center gap-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Download Now
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug max-w-md">
          Utility payments & issue reporting, simplified
        </h3>

        {/* Store badges — small, inline */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-foreground text-background transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <Apple size={16} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-normal opacity-60">Download on the</span>
              <span className="text-[11px]">App Store</span>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <Play size={16} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-normal opacity-60">Get it on</span>
              <span className="text-[11px]">Google Play</span>
            </div>
          </a>
        </div>
      </div>

      {/* Phone Mockups — fan display */}
      <div className="relative flex items-end justify-center py-6 overflow-hidden rounded-2xl bg-muted/60 border border-border">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at center bottom, hsl(var(--primary) / 0.15), transparent 70%)",
          }}
        />
        <div className="relative flex items-end justify-center gap-4 sm:gap-8 px-4">
          <div className="w-32 sm:w-40 rounded-2xl overflow-hidden shadow-xl border border-border bg-card transform -rotate-3 translate-y-2">
            <img src={mobileMockup1} alt="Utility Plus mobile dashboard" className="w-full h-auto" />
          </div>
          <div className="w-36 sm:w-44 rounded-2xl overflow-hidden shadow-2xl border border-border bg-card z-10">
            <img src={mobileMockup2} alt="Utility Plus work order form" className="w-full h-auto" />
          </div>
        </div>
      </div>

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

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Smartphone size={14} className="text-primary" />
                </span>
                <h4 className="text-sm font-bold text-foreground">Project Stage</h4>
              </div>
              <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2" />
                  App was in early structural stage when joined
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2" />
                  No defined design system
                </li>
              </ul>
            </div>
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
              {["Reduced cognitive load", "Fast mobile interactions", "Trust-driven UI", "Cross-platform consistency"].map((item) => (
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
