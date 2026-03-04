import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, FileText, LayoutDashboard, LogIn } from "lucide-react";

const licenseAccordion = [
  {
    title: "Problem",
    desc: "Too many screens, complex registration process, and operational friction slowing down license processing.",
  },
  {
    title: "Solution",
    desc: "Redesigned flow from scratch — reduced steps, grouped forms logically, and simplified review workflow.",
  },
  {
    title: "Result",
    desc: "Faster processing, clearer validation, and improved admin efficiency across all license types.",
  },
];

export default function AdminPortalTab() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Super Admin & Clerk dashboard for transaction supervision, license processing, and operational control.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* System Overview */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Database size={14} className="text-purple-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">System Overview</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {["Transaction monitoring", "License management", "Billing correction", "Administrative supervision"].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-purple-500 shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Occupational License Redesign */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FileText size={14} className="text-purple-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Occupational License Redesign</h4>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {licenseAccordion.map((item, i) => (
              <AccordionItem key={i} value={`lic-${i}`} className="border-border/50">
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

        {/* Dashboard Improvements */}
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <LayoutDashboard size={14} className="text-purple-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Dashboard Improvements</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {[
              "Improved data hierarchy",
              "Clear filtering & transaction states",
              "Structured record management",
              "Clean professional UI for government usage",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-purple-500 shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Landing & Hero UI */}
        <div className="rounded-2xl p-5 bg-purple-500/5 border border-purple-500/15">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <LogIn size={14} className="text-purple-500" />
            </span>
            <h4 className="text-sm font-bold text-foreground">Landing & Hero UI</h4>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {[
              "Designed admin login experience",
              "Professional structured layout",
              "Efficient navigation focus",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
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
