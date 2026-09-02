import type { Project } from "./types";
import iconBumperMandi from "@/assets/project-logos/bumper-mandi.svg";
import bumperMandiAppMockup from "@/assets/bumper-mandi/mockup/bumper-mandi-app-mockup.png";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import { FileWarning, EyeOff, Clock, Landmark } from "lucide-react";
import BumperMandiCaseStudyContent from "@/components/design/case-studies/BumperMandiCaseStudyContent";

const bumperMandi: Project = {
  slug: "Digitizing India's agricultural marketplace with speed, transparency & trust.",
  title: "Bumper Mandi",
  date: "AgriTech · 2025",
  tag: "UX",
  role: "Lead UX/UI Designer",
  image: bumperMandiAppMockup,
  logo: iconBumperMandi,
  customContent: BumperMandiCaseStudyContent,
  info: {
    what: "A comprehensive digital platform that replaces manual, paper-heavy commodity trading with a secure, real-time ecosystem — connecting farmers, mandi operators, quality lab analysts and registered buyers under one unified dashboard, from appointment booking to terminal payment.",
    floatingStats: [
      { icon: "layers", label: "Process Stages", value: "7" },
      { icon: "users", label: "User Roles", value: "5" },
      { icon: "zap", label: "Faster Gate Processing", value: "85%" },
      { icon: "smartphone", label: "Platforms", value: "Android + Web" },
    ],
    howItWorks: [
      "Farmers schedule a check-in slot through the mobile appointment calendar",
      "Trucks clear a digital gate pass, eliminating queue chaos at entry",
      "Weighbridge and quality-lab results are logged as immutable digital records",
      "Mandi operators track every load in real time on a Kanban command-center dashboard",
      "Buyers bid transparently and payments settle digitally in under 24 hours",
    ],
    codeExplanation: [
      "Atomic design system — buttons, status badges, Kanban cards and form inputs built as reusable components",
      "50+ modular variant states across responsive breakpoints (360px mobile, 1440px web)",
      "Real-time bilingual toggle (English ↔ Hindi) built into every screen for field accessibility",
    ],
    howToRun: [
      "This is a UI/UX case study — there's no live codebase to run.",
      "The full interactive prototype and design system live in Figma (available on request).",
    ],
    howToTry: [
      "Walk through the mobile appointment scheduler and the Kanban process-flow dashboard in the Figma prototype.",
    ],
    techStack: [{ name: "Figma", icon: FigmaIcon }],
    platforms: ["mobile", "web"],
    mockups: [{ src: bumperMandiAppMockup, alt: "Bumper Mandi app mockup", platform: "mobile" }],
    link: [],
    Reflection: [
      "Designing for India's agricultural sector required empathy beyond desk research — extreme sun glare, ambient noise and crop dust directly shaped the high-contrast, large-tap-target mobile UI.",
      "New technology only succeeds if it honors the mental models operators already use in the field — Kanban stages mirrored the physical mandi flow instead of replacing it.",
      "Bilingual, low-bandwidth support isn't a nice-to-have for rural users — it's the baseline for adoption.",
      "With more iteration, I'd build an offline-first sync architecture for sub-mandis with spotty signal.",
      "Voice-input logging in regional dialects would close real gaps for elderly or low-literacy farmers.",
    ],
    meta: [
      { label: "Role", value: "Lead UX/UI Designer" },
      { label: "Timeline", value: "6 months" },
      { label: "Industry", value: "AgriTech" },
    ],
    impacts: [
      { value: "30+", label: "Screens designed", body: "Across mobile & web platforms." },
      { value: "7", label: "Process stages", body: "Fully digitized, end-to-end." },
      { value: "85%", label: "Faster gate processing", body: "Down from up to 8-hour queues." },
      { value: "2", label: "Platforms shipped", body: "Android app + web dashboard." },
    ],
    challenges: [
      { icon: FileWarning, title: "Paper-based processes", body: "Intake, quality testing and weighing records were kept on raw paper slips — frequent data loss, transcription errors and payment disputes." },
      { icon: EyeOff, title: "No real-time visibility", body: "Operators had zero transparency on where a truck or crop lot was once it cleared the gate, relying on constant manual phone coordination." },
      { icon: Clock, title: "Intake scheduling chaos", body: "Farmers arrived spontaneously with no structured appointment windows, creating gateway congestion and up to 8-hour wait times." },
      { icon: Landmark, title: "Payment settlement delays", body: "Financial clearance between buyers, agents and farmers took days due to manually tabulated tax slips and weight reports." },
    ],
  },
  avatar: "",
};

export default bumperMandi;
