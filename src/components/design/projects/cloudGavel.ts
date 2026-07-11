import type { Project } from "./project_design";
import cgLogo from "@/assets/cloudGavel/cgLogo.svg";
import cgmockup from "@/assets/cloudGavel/cgmockup.png";
import AngularIcon from "@/assets/buildIcon/angular.svg";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import MUIIcon from "@/assets/buildIcon/MUI.png";
import {
  AlertTriangle,
  Users,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";

const cloudGavel: Project = {
  slug: "Modernizing operational UX for a digital warrant platform.",
  title: "Cloud Gavel",
  date: "GovTech · Enterprise SaaS",
  tag: "UX",
  role: "UX Designer",
  image: cgmockup,
  logo: cgLogo,
  // hoverHeadline: "Modernizing operational UX for a digital warrant platform.",
  info: {
    what: "A financial storytelling platform that transforms complex market data into engaging, visual narratives for investors and analysts.",
    floatingStats: [
        { icon: "building", label: "Agencies", value: "500+" },
        { icon: "users", label: "Roles", value: "Multi-role workflows" },
        { icon: "shield", label: "Compliance", value: "CJIS compliant" },
        { icon: "zap", label: "Approvals", value: "Real-time" },
      ],
    howItWorks: [
      "Connect financial data sources via API",
      "AI generates narrative summaries",
      "Interactive charts visualize trends",
      "Share reports with stakeholders",
    ],
    codeExplanation: [
      "React with D3.js for data visualization",
      "OpenAI API for narrative generation",
      "Express.js backend for data aggregation",
    ],
    howToRun: [
      "git clone https://github.com/example/cloud-gavel",
      "npm install",
      "npm run dev",
    ],
    howToTry: [
      "Visit cloud-gavel.app and connect a demo data source to see AI-generated market stories.",
    ],
    techStack: [
      { name: "Figma", icon: FigmaIcon },
      { name: "Angular", icon: AngularIcon },
      { name: "MUI", icon: MUIIcon },
    ],
    mockups: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    ],
    link: [
      { name: "web", link: "https://cloudgavel.com/" },
      { name: "mobile", link: "https://apps.apple.com/us/app/cloudgavel-365/id1517564015" },
    ],
    Reflection: [
      "Designing for enterprise systems means earning trust before chasing novelty.",
      "Operational UX is rhythm — every screen has to keep the user moving.",
      "High-pressure workflows reward restraint; the boring choice is often the right one.",
      "Government products live and die by compliance. Wrap rules in the UI, don't expose them.",
      "Usability and compliance aren't trade-offs — they're the same north star, named differently.",
    ],
    meta: [
      {
        label: "Role",
        value: "Lead UX/UI Designer",
      },
      {
        label: "Timeline",
        value: "9 months",
      },
      {
        label: "Industry",
        value: "GovTech",
      },
    ],
    impacts: [
      {
        value: "62%",
        label: "Faster workflow completion",
        body: "Avg. warrant cycle dropped from 38m to 14m.",
      },

      {
        value: "−47%",
        label: "Fewer support tickets",
        body: "Reduced confusion-driven tickets.",
      },

      {
        value: "94%",
        label: "Task success rate",
        body: "Up from 71% in usability testing.",
      },

      {
        value: "4.7/5",
        label: "Operator satisfaction",
        body: "Across officers and prosecutors.",
      },
    ],
    challenges: [
      { icon: AlertTriangle, title: "High-stakes operational environment", body: "Mistakes have legal consequences. The interface had to make the safe path the easy path." },
      { icon: Users, title: "Multi-user, multi-role workflows", body: "Three personas with different mental models needed a single product surface." },
      { icon: Zap, title: "Speed-critical tasks", body: "Some warrants must be approved in under 10 minutes. Every screen had to be optimized for time-to-action." },
      { icon: ShieldCheck, title: "Compliance-driven constraints", body: "CJIS rules dictate fields, audit trails and retention. Design had to absorb the rules invisibly." },
      { icon: Layers, title: "Information-heavy dashboards", body: "30+ data points per case had to remain scannable, not noisy." },
    ],
  },
  avatar: ""
};

export default cloudGavel;
