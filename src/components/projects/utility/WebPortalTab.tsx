import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Compass, Sparkles, TrendingUp } from "lucide-react";

const improvements = [
  {
    title: "Hero & Landing Redesign",
    desc: "Clean entry hierarchy, structured login/signup, trust-focused UI with clear value proposition.",
  },
  {
    title: "Bill Payment Flow",
    desc: "Reduced steps, improved breakdown clarity, better confirmation states and error handling.",
  },
  {
    title: "Work Order Creation",
    desc: "Simplified complaint submission, improved tracking visibility and status updates.",
  },
  {
    title: "Multi-Property Management",
    desc: "Clear mapping of accounts and properties with intuitive switching.",
  },
];

const impacts = [
  "Improved self-service completion rate",
  "Reduced user confusion",
  "Increased usability and trust",
  "Reduced support dependency",
];

export default function WebPortalTab() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Citizen-facing utility portal for bill payments, property management, and complaint registration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle size={14} className="text-destructive" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Problem</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {["Complex UI", "Multi-step bill payments", "Confusing multi-account handling", "High dependency on support"].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-destructive shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* My Approach */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <Compass size={14} className="text-accent" />
            </span>
            <h4 className="text-sm font-bold text-foreground">My Approach</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {[
              "Conducted system understanding and UX research",
              "Simplified login & multi-account structure",
              "Redesigned hero section & landing experience",
              "Reduced steps in bill payment flow",
              "Improved complaint/work order submission clarity",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Improvements */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles size={14} className="text-accent" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Key Improvements</h4>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {improvements.map((item, i) => (
              <AccordionItem key={i} value={`web-imp-${i}`} className="border-border/50">
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

        {/* Impact */}
        <div className="rounded-2xl p-5 bg-accent/5 border border-accent/15">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp size={14} className="text-accent" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Impact</h4>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {impacts.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
