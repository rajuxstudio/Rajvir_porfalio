import type { Project } from "./types";
import utsLogo from "@/assets/utility-plus/uts_logo.png";
import utsCover from "@/assets/utility-plus/uts_cover.png";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import {
  FileWarning,
  ClipboardList,
  Users,
  CloudOff,
} from "lucide-react";
import UtilityPlusCaseStudyContent from "@/components/design/case-studies/UtilityPlusCaseStudyContent";

const utilityPlus: Project = {
  slug: "A unified municipal platform connecting citizens, clerks, and field crews.",
  title: "UtilityPlus",
  date: "GovTech · Municipal Utilities",
  tag: "UX",
  role: "UX/UI Design & Strategy",
  image: utsCover,
  logo: utsLogo,
  customContent: UtilityPlusCaseStudyContent,
  info: {
    what: "UtilityPlus is a municipal utility platform for Ward Two Water District / St. James Parish — an admin back office for clerks, a citizen web portal, a citizen mobile app, and an offline-first tablet app for meter readers, all built around the same utility billing, work order, and occupational licensing workflows.",
    howItWorks: [
      "Clerks manage customer accounts, billing, licensing, and work orders from the admin panel",
      "Citizens pay bills, renew licenses, and submit work orders from the web portal or mobile app",
      "Field meter readers log readings offline on tablets; data syncs to the admin system once connected",
      "Every channel — admin, web, mobile, tablet — writes back to the same customer and billing records",
    ],
    codeExplanation: [
      "Dual-experience architecture: one back office (admin), three citizen/field-facing surfaces (web, mobile, tablet)",
      "Offline-first local sync queue for the tablet app, so field connectivity never blocks data collection",
      "Shared billing, work-order, and licensing data model across every application",
    ],
    howToRun: [
      "This is a UI/UX case study for a municipal GovTech platform — there's no public codebase to run.",
      "Design files and prototypes are available on request.",
    ],
    howToTry: [
      "Walk through paying a bill, filing a work order, and renewing a license across the web, mobile, and tablet experiences.",
    ],
    techStack: [{ name: "Figma", icon: FigmaIcon }],
    platforms: ["web", "mobile", "tablet"],
    mockups: [],
    link: [
      { name: "MyUtilityPlus (Google Play)", link: "https://play.google.com/store/apps/details?id=com.fusionstak.uplus&hl=en_IN" },
      { name: "UtilityPlus Meter Reader (Google Play)", link: "https://play.google.com/store/apps/details?id=mr.utilityplus.com&hl=en_IN" },
    ],
    Reflection: [
      "Designing public-sector tools means designing for user realities, not commercial polish — glare, gloves, and rushed shifts change every decision.",
      "One shared data model across four surfaces (admin, web, mobile, tablet) keeps clerks, citizens, and field crews looking at the same truth.",
      "Offline-first isn't a fallback for field tools — assume the network will drop, and design the happy path around that.",
      "Progressive digitization of paper workflows (3,600+ licenses, manual meter books) is where the real time savings live.",
    ],
    meta: [
      { label: "Role", value: "UX/UI Design & Strategy" },
      { label: "Client", value: "Ward Two Water District / St. James Parish" },
      { label: "Technology Partner", value: "Fusionstak LLC" },
    ],
    impacts: [
      { value: "24/7", label: "Self-service access", body: "Citizens pay bills and file requests any time, no office visit required." },
      { value: "3.6k+", label: "Business licenses digitized", body: "Occupational license records moved from paper folders to online filing." },
      { value: "85%", label: "Faster processing", body: "Across billing, licensing, and work order intake." },
      { value: "100%", label: "Offline field persistence", body: "Meter readers keep working with zero signal; data syncs once reconnected." },
    ],
    challenges: [
      { icon: FileWarning, title: "Paper-heavy licensing", body: "3,600+ occupational business licenses were tracked entirely offline through physical folders and manual filing." },
      { icon: ClipboardList, title: "No online billing or work orders", body: "Residents had to visit a physical office to pay bills, submit work orders, or check status — with zero visibility once submitted." },
      { icon: Users, title: "Four very different users", body: "Clerks, citizens, business owners, and field meter readers each needed a purpose-built experience on the same underlying data." },
      { icon: CloudOff, title: "Field conditions break paper and signal", body: "Meter readers work in bright sun, rain, and mud with unreliable cellular coverage — carbon-copy books and normal apps both fail here." },
    ],
  },
  avatar: "",
};

export default utilityPlus;
