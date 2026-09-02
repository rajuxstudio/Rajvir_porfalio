import type { Project } from "./types";
import iconEchelonConstructors from "@/assets/project-logos/echelon-constructors.svg";
import mockupEchelonHero from "@/assets/echelon-constructors/mockup/hero.png";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import { Layers, Clock3, Users2, ShieldCheck } from "lucide-react";
import EchelonConstructorsCaseStudyContent from "@/components/design/case-studies/EchelonConstructorsCaseStudyContent";

const echelonConstructors: Project = {
  slug: "A premium editorial case study for a construction project management platform.",
  title: "Echelon Constructors",
  date: "Construction · SaaS · 2024",
  tag: "UX",
  role: "Product Designer",
  image: mockupEchelonHero,
  logo: iconEchelonConstructors,
  customContent: EchelonConstructorsCaseStudyContent,
  info: {
    what: "A construction project management platform that centralizes job cost tracking, automates approval routing, and gives project managers and superintendents real-time visibility into every job — replacing spreadsheets, email chains, and phone calls.",
    floatingStats: [
      { icon: "trending-up", label: "Faster approvals", value: "60%" },
      { icon: "clock", label: "Saved per PM / week", value: "3.5 hrs" },
      { icon: "users", label: "Regional office adoption", value: "100%" },
      { icon: "check", label: "Fewer data-entry errors", value: "42%" },
    ],
    howItWorks: [
      "Superintendents add job line items on-site, categorized by cost type and quantity",
      "Job drafts route automatically to the assigned Project Manager for approval",
      "PMs approve or reject with one click — status updates propagate across the dashboard in real time",
      "Role-based access controls what each team member can see and edit across jobs, line items, and users",
      "Report dashboards surface job-health, cost trends, and approval throughput at a glance",
    ],
    codeExplanation: [
      "Lightweight design system — buttons, inputs, tables, and status badges — reused across 15+ screens",
      "Enterprise data-table pattern with inline editing, pagination, and configurable columns",
      "Permission-matrix-driven access control spanning 5 roles and 4 core resources",
    ],
    howToRun: [
      "This is a UI/UX case study — there's no live codebase to run.",
      "The full interactive prototype and design system live in Figma (available on request).",
    ],
    howToTry: [
      "Walk through the job cost tracking flow and the approval workflow in the Figma prototype.",
    ],
    techStack: [{ name: "Figma", icon: FigmaIcon }, "FigJam"],
    platforms: ["web"],
    mockups: [
      { src: mockupEchelonHero, alt: "Echelon Constructors — login, profile, and jobs list", platform: "web" },
    ],
    link: [],
    Reflection: [
      "Visiting job sites and shadowing superintendents gave me context no interview could — I designed better filter logic because I watched them search.",
      "Working with a small dev team meant ruthless scope: every component had to serve at least 3 screens, no one-off designs.",
      "Iterated on column hierarchy, row density, and inline editing five times before landing on a version that worked for both PMs and superintendents.",
    ],
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Duration", value: "2 Weeks" },
      { label: "Platform", value: "Web — Desktop" },
    ],
    impacts: [
      { value: "60%", label: "Faster approvals", body: "Reduction in approval turnaround time." },
      { value: "3.5 hrs", label: "Saved weekly", body: "Per PM, on manual cost tracking." },
      { value: "100%", label: "Full adoption", body: "Across 3 regional offices in 2 months." },
      { value: "42%", label: "Fewer errors", body: "In data entry vs. the old spreadsheet workflow." },
    ],
    challenges: [
      { icon: Layers, title: "Fragmented job cost tracking", body: "Spreadsheets, email chains, and phone calls led to duplicated data, version conflicts, and costly errors." },
      { icon: Clock3, title: "Manual approval bottlenecks", body: "Job draft approvals averaged 2–3 weeks per job, routed entirely through email." },
      { icon: Users2, title: "Poor cross-job visibility", body: "PMs had no way to compare costs across jobs, locations, or categories." },
      { icon: ShieldCheck, title: "No granular access control", body: "Every team member saw the same data, regardless of role or need-to-know." },
    ],
  },
  avatar: "",
};

export default echelonConstructors;
