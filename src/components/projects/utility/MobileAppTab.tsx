import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Apple, Brush, Eye, Layers, Play, Smartphone } from "lucide-react";
import mobileMockup1 from "@/assets/utility-mobile-mockup-1.png";
import mobileMockup2 from "@/assets/utility-mobile-mockup-2.png";

const features = [
  { title: "Bill Payment", desc: "Minimal steps, mobile optimized, clear confirmation and receipt generation." },
  { title: "Payment Tracking", desc: "Transaction history & property overview with filterable records." },
  { title: "Work Order via Photo", desc: "Users can capture and upload images while reporting issues in their area." },
  { title: "Property & Utility Overview", desc: "Clean dashboard for bill visibility and account management." },
];

export default function MobileAppTab() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Citizen mobile application for utility payments and issue reporting.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Stage */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Smartphone size={14} className="text-emerald-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Project Stage</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0 mt-2" />
              App was in early structural stage when joined
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0 mt-2" />
              No defined design system
            </li>
          </ul>
        </div>

        {/* My Contribution */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Brush size={14} className="text-emerald-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">My Contribution</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {["Complete UI redesign", "Defined color system", "Typography scale", "Component hierarchy", "Design consistency"].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Core Features */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Layers size={14} className="text-emerald-500" />
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

        {/* UX Focus */}
        <div className="rounded-2xl p-5 bg-emerald-500/5 border border-emerald-500/15">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Eye size={14} className="text-emerald-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">UX Focus</h4>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {["Reduced cognitive load", "Fast mobile interactions", "Trust-driven UI", "Cross-platform consistency"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mockups + CTAs */}
      <div className="rounded-2xl overflow-hidden border border-border">
        <div className="bg-muted/50 px-6 py-8 flex items-end justify-center gap-6">
          <div className="w-36 sm:w-44 rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
            <img src={mobileMockup1} alt="Utility Plus mobile dashboard" className="w-full h-auto" />
          </div>
          <div className="w-32 sm:w-40 rounded-2xl overflow-hidden shadow-lg border border-border bg-card -mb-2">
            <img src={mobileMockup2} alt="Utility Plus work order form" className="w-full h-auto" />
          </div>
        </div>
        <div className="p-4 bg-card border-t border-border flex flex-col sm:flex-row gap-3">
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold bg-foreground text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Apple size={20} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-normal opacity-60">Download on the</span>
              <span>App Store</span>
            </div>
          </a>
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold bg-accent text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play size={20} />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-normal opacity-60">Get it on</span>
              <span>Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
