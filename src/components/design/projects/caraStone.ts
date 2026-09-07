import type { Project } from "./types";
import caraStoneLogo from "@/assets/carastone/carastone_logo_icon.svg";
import caraStoneCover from "@/assets/carastone/carastone_cover.png";
import FigmaIcon from "@/assets/designIcon/figma.svg";
import {
  FileWarning,
  ScrollText,
  Users,
  ShieldAlert,
} from "lucide-react";
import CaraStoneCaseStudyContent from "@/components/design/case-studies/CaraStoneCaseStudyContent";

const caraStone: Project = {
  slug: "A unified platform connecting law firms, startups, and investors through cap table management.",
  title: "Cara Stone",
  date: "Legal Tech / FinTech · Capital Markets",
  tag: "UX",
  role: "UX/UI Design",
  image: caraStoneCover,
  logo: caraStoneLogo,
  customContent: CaraStoneCaseStudyContent,
  info: {
    what: "Cara Stone is a legal-tech SaaS platform for venture capital and private equity financing — a unified platform connecting law firms, startups, and investors through intelligent cap table management, SEC filing search, and corporate governance tools, routed through three role-specific portals (System Administrator, Company, Investor) sharing one data layer.",
    howItWorks: [
      "Users authenticate once, then are routed into a role-specific dashboard — System Administrator, Company, or Investor",
      "Companies manage their live cap table, 409A valuation, convertible debt, and preferred stock from the Company Portal",
      "Investors see portfolio holdings and per-company exposure without emailing anyone for updates",
      "Anyone can research SEC Form 1-SA filings via EDGAR-sourced search before ever signing up",
    ],
    codeExplanation: [
      "Three role-based portals (Admin / Company / Investor) sharing one authentication flow and data layer",
      "178+ screens across the full application, backed by a comprehensive shared design system",
      "Cap table events (equity issuance, option grants, vesting, convertible debt) tracked over time",
    ],
    howToRun: [
      "This is a UI/UX case study for a legal-tech capital markets platform — there's no public codebase to run.",
      "Design files and prototypes are available on request.",
    ],
    howToTry: [
      "Walk through closing a seed round in the Company Portal, then an investor's portfolio view, then an EDGAR due-diligence search.",
    ],
    techStack: [{ name: "Figma", icon: FigmaIcon }],
    platforms: ["web"],
    mockups: [],
    link: [],
    Reflection: [
      "Cap tables are dense, numbers-heavy data — the real design work was building a hierarchy that stays scannable at 3 shareholders or 300.",
      "Three portals sharing one data layer meant designing one system flexible enough for very different jobs-to-be-done.",
      "A comprehensive shared component library across 178+ screens kept the whole application visually and behaviorally consistent as it grew.",
      "Letting investors and lawyers research public filings before ever signing up builds trust earlier in the funnel.",
    ],
    meta: [
      { label: "Role", value: "UX/UI Design" },
      { label: "Industry", value: "Legal Tech / FinTech" },
      { label: "Screens", value: "178+" },
    ],
    impacts: [
      { value: "3 Portals", label: "Unified under one platform", body: "System Administrator, Company, and Investor — one authentication flow, one data layer." },
      { value: "178+", label: "Screens", body: "A comprehensive design system across the full application." },
      { value: "5 Offices", label: "New Orleans, Chicago, LA, Spokane, Lafayette", body: "Real firm locations served by the platform." },
      { value: "10,000+", label: "SEC filings searchable", body: "EDGAR-sourced crowdfunding offering data, searchable before signup." },
    ],
    challenges: [
      { icon: FileWarning, title: "Cap Table Chaos", body: "Spreadsheet-based equity tracking breaks down across funding rounds, creating legal disputes and failed deals." },
      { icon: ScrollText, title: "SEC Compliance Burden", body: "Navigating government databases for due diligence wastes hours of billable time cross-referencing filings." },
      { icon: Users, title: "Disconnected Stakeholders", body: "Founders, investors, and legal teams juggle email chains and shared folders with no single source of truth." },
      { icon: ShieldAlert, title: "Governance Bottlenecks", body: "Shareholder votes and corporate actions lack proper tracking, notifications, and audit trails." },
    ],
  },
  avatar: "",
};

export default caraStone;
