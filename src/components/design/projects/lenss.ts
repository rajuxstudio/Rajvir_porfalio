import type { Project } from "./types";
import iconLenss from "@/assets/lenss/lenss_logo_icon_badge.svg";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import mockupLenss from "@/assets/lenss/mockup/cover.png";
import { Clock, Radio, AlertTriangle } from "lucide-react";
import LenssCaseStudyContent from "@/components/design/case-studies/LenssCaseStudyContent";

const lenss: Project = {
  slug: "A secure mobile workspace replacing radio-based field queries for law enforcement.",
  title: "LENSS",
  date: "Public Safety · 2024",
  tag: "UX",
  role: "Lead UI/UX Designer",
  image: mockupLenss,
  logo: iconLenss,
  customContent: LenssCaseStudyContent,
  info: {
    what: "LENSS (Law Enforcement Network Search System) is a secure mobile workspace that replaces slow, radio-based field queries with instant, encrypted, real-time access to vehicle, license, and warrant records — built for patrol officers, detectives, dispatchers, and command staff.",
    floatingStats: [
      { icon: "zap", label: "Faster queries", value: "<10s" },
      { icon: "users", label: "Simultaneous support", value: "5x" },
      { icon: "layers", label: "Designed screens", value: "42" },
      { icon: "shield", label: "CJIS compliance", value: "100%" },
    ],
    howItWorks: [
      "Officers open straight to Quick Tag — scan or enter a plate, license, or query with zero setup",
      "Results return in under 10 seconds, replacing 3+ minute radio relays",
      "Every field stop is logged as a living investigation timeline shared across units and dispatch",
      "Progressive disclosure surfaces warrants and arrest status first; secondary data folds into scroll sections",
      "Biometric authorization (Face ID / MFA) keeps sensitive civilian and criminal data CJIS-compliant",
    ],
    codeExplanation: [
      "High-contrast, large-touch-target UI designed for glare, gloves, and high-adrenaline field conditions",
      "42 fully optimized screens covering Face ID, MFA, dark mode, and system settings",
      "Progressive disclosure pattern separating primary indicators from secondary technical fields",
    ],
    howToRun: [
      "This is a UI/UX case study — there's no live codebase to run.",
      "The full interactive prototype and design system live in Figma (available on request).",
    ],
    howToTry: [
      "Walk through the Quick Tag flow and an investigation's living timeline in the Figma prototype.",
    ],
    techStack: [{ name: "Figma", icon: FigmaIcon }],
    platforms: ["mobile"],
    mockups: [
      { src: mockupLenss, alt: "LENSS — Login, Quick Tag, Investigation, Dispatch, and Activity Log screens", platform: "mobile" },
    ],
    link: [],
    Reflection: [
      "Designing for law enforcement meant spending time sitting in cruisers — observing officers navigate real field situations surfaced patterns no workshop could.",
      "Every secondary screen or redundant tap counts as critical seconds an officer is looking at a device instead of their surroundings — speed is safety.",
      "Progressive disclosure over data completeness: throwing every field onto the screen overwhelms; logical hierarchy builds confidence.",
      "Cruisers at night, glaring sunlight, and gloved hands are typical use conditions — high contrast is a requirement, not an aesthetic.",
    ],
    meta: [
      { label: "My Role", value: "Lead UI/UX Designer" },
      { label: "Platform", value: "Mobile (iOS / Android)" },
      { label: "Client", value: "Entrical / Public Safety" },
    ],
    impacts: [
      { value: "<10s", label: "Average query speed", body: "Down from 3+ minutes during traditional vocal radio relays." },
      { value: "5x", label: "Simultaneous support", body: "Dispatch can monitor multiple operations through non-blocking status updates." },
      { value: "42", label: "Designed screens", body: "Fully optimized layouts for Face ID, MFA, dark-mode, and system settings." },
      { value: "100%", label: "CJIS compliance", body: "Successfully certified by independent public safety compliance audits." },
    ],
    challenges: [
      { icon: Clock, title: "Extremely slow queries", body: "Average wait time per query exceeded 3+ minutes, leaving officers vulnerable on the side of active roads." },
      { icon: Radio, title: "Security risks", body: "Sensitive civilian data and criminal records were spoken over unencrypted open radio channels." },
      { icon: AlertTriangle, title: "Human error", body: "Verbal spelling of names and license strings routinely led to transcript mistakes and missed warrants." },
    ],
  },
  avatar: "",
};

export default lenss;
