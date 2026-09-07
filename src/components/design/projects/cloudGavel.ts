import type { Project } from "./types";
import cgLogo from "@/assets/cloud-gavel/logo.svg";
import cgmockup from "@/assets/cloud-gavel/mockup.png";
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
import CloudGavelCaseStudyContent from "@/components/design/case-studies/CloudGavelCaseStudyContent";

const cloudGavel: Project = {
  slug: "Modernizing operational UX for a digital warrant platform.",
  title: "Cloud Gavel",
  date: "GovTech · Enterprise SaaS",
  tag: "UX",
  role: "Lead Product Designer",
  image: cgmockup,
  logo: cgLogo,
  customContent: CloudGavelCaseStudyContent,
  info: {
    what: "CloudGavel is an enterprise-grade criminal justice management platform used by law enforcement agencies, courts, and legal professionals across multiple jurisdictions — digitizing the full lifecycle of warrants, case management, inter-agency coordination, and court documents.",
    floatingStats: [
        { icon: "layers", label: "Production Screens", value: "900+" },
        { icon: "workflow", label: "Integrated Modules", value: "15+" },
        { icon: "shield", label: "Compliance", value: "CJIS compliant" },
        { icon: "monitor", label: "Platforms", value: "Web + Mobile" },
      ],
    howItWorks: [
      "Submit or review a warrant through a role-based portal (judge, detective, or operator)",
      "Digital signature and CJIS-compliant audit trail capture at every step",
      "Warrants route automatically across agencies via the workflow engine",
      "Real-time status tracking and notifications keep every party in sync",
    ],
    codeExplanation: [
      "Angular + MUI component system shared across web and mobile",
      "264+ shared components supporting a consistent design language",
      "Role-based access control and CJIS security layer enforced end-to-end",
    ],
    howToRun: [
      "This is a UI/UX case study for an enterprise GovTech platform — there's no public codebase to run.",
      "The full design system and prototypes live in Figma (available on request).",
    ],
    howToTry: [
      "Walk through the warrant lifecycle — submission, judicial review, and multi-agency routing — in the Figma prototype.",
    ],
    techStack: [
      { name: "Figma", icon: FigmaIcon },
      { name: "Angular", icon: AngularIcon },
      { name: "MUI", icon: MUIIcon },
    ],
    platforms: ["web", "mobile"],
    mockups: [
      { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", platform: "web" },
      { src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800", platform: "mobile" },
      { src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800", platform: "web" },
    ],
    link: [
      { name: "web", link: "https://cloudgavel.com/" },
      { name: "iOS App (App Store)", link: "https://apps.apple.com/us/app/cloudgavel-365/id1517564015" },
      { name: "Android App (Google Play)", link: "https://play.google.com/store/apps/details?id=com.fusionstak.CloudGavel365&hl=en_IN" },
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
        value: "Lead Product Designer",
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
        label: "Faster warrant processing",
        body: "Avg. warrant cycle dropped from 38m to 14m.",
      },

      {
        value: "3x",
        label: "Reduction in paper documents",
        body: "Replaced fragmented, paper-heavy agency workflows.",
      },

      {
        value: "94%",
        label: "User task completion rate",
        body: "Up from 71% in usability testing.",
      },

      {
        value: "4.7/5",
        label: "Satisfaction from field officers",
        body: "Across judges, detectives, and operators.",
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
