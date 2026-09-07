import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Linkedin,
  FileWarning,
  ShieldCheck,
  Users,
  Gavel,
  Search,
  Network,
  UserCog,
  LayoutDashboard,
  FileText,
  ClipboardList,
  Building2,
  Video,
  PenTool,
  Share2,
  Images,
  AlertTriangle,
  Workflow,
  MessageSquare,
  Type as TypeIcon,
  Palette,
  MousePointerClick,
  LayoutGrid,
  Compass as NavIcon,
  KeyRound,
  Smartphone,
  Globe2,
  Lock,
} from "lucide-react";
import MockupGallery from "@/components/design/components/MockupGallery";
import { Section, Card, Pill, IconBadge, StatBlock, CheckItem, type Accent } from "@/components/design/components/CaseStudyKit";
import type { CaseStudyContentProps } from "@/components/design/projects/types";
import mobileLogin from "@/assets/cloud-gavel/mockup/cg_mobile_login.png";
import mobileDashboard from "@/assets/cloud-gavel/mockup/cg_mobile_dashboard.png";
import mobileAssigned from "@/assets/cloud-gavel/mockup/cg_mobile_assigned.png";
import mobileType from "@/assets/cloud-gavel/mockup/cg_mobile_type.png";
import mobileEmpty from "@/assets/cloud-gavel/mockup/ch_mobile_empty.png";
import mobileProfile from "@/assets/cloud-gavel/mockup/cg_mobile_profile.png";

/* CloudGavel's brand accent — orange, its primary brand color, plus the two
   secondary badge colors used on the hero pills. Structure (Section/Card/
   Pill/...) comes from the shared kit, so every case study shares the same
   layout and is light/dark aware. */
const ACCENT: Accent = {
  text: "text-orange-600 dark:text-orange-400",
  bg: "bg-orange-500",
  softBg: "bg-orange-500/10",
  border: "border-orange-500",
};
const BLUE_ACCENT: Accent = {
  text: "text-blue-600 dark:text-blue-400",
  bg: "bg-blue-500",
  softBg: "bg-blue-500/10",
  border: "border-blue-500",
};
const TEAL_ACCENT: Accent = {
  text: "text-teal-600 dark:text-teal-400",
  bg: "bg-teal-500",
  softBg: "bg-teal-500/10",
  border: "border-teal-500",
};

/* ---------- Data (sourced directly from the supplied CloudGavel case-study spec) ---------- */

const heroStats = [
  { value: "900+", label: "Production Screens" },
  { value: "15+", label: "Integrated Modules" },
  { value: "2", label: "Platform Applications (Web + Mobile)" },
];

const projectMeta = [
  { label: "ROLE", value: "Lead Product Designer" },
  { label: "TIMELINE", value: "9 Months" },
  { label: "PLATFORMS", value: "iOS, Android & Web" },
  { label: "TEAM", value: "3 Designers, 8 Engineers" },
  { label: "TOOLS", value: "Figma, Angular, MUI" },
];

const challenges = [
  { icon: FileWarning, title: "Legacy & Paper-Heavy", body: "Law enforcement agencies relied on fragmented, paper-heavy processes. Information was siloed across departments, leading to delays, data inconsistencies, and critical compliance risks." },
  { icon: ShieldCheck, title: "CJIS Compliance", body: "Every interaction must meet strict federal security standards (CJIS) for criminal justice information handling, constraining every design decision." },
  { icon: Users, title: "Multi-Role Complexity", body: "Judges, detectives, operators, and admins each need distinct workflows. The platform must serve multiple states, regions, and agencies with unique local laws." },
];

const infraStrip = ["264+ Shared Components", "Role-Based Access Control", "Real-time Data Sync", "CJIS Security Layer"];

const personas = [
  { icon: Gavel, role: "Judge", items: ["Review & approve warrants", "Video conferencing for hearings", "Digital signature capture", "Case history & audit trail"] },
  { icon: Search, role: "Detective / LEO", items: ["Submit warrant requests", "Track approval status", "Manage assigned cases", "Field document access"] },
  { icon: Network, role: "Operator", items: ["Route warrants to agencies", "Monitor system-wide status", "Inter-agency coordination", "Compliance reporting"] },
  { icon: UserCog, role: "System Admin", items: ["Multi-agency configuration", "User & group management", "Workflow engine setup", "Audit log dashboards"] },
];

const processSteps = [
  { n: "01", title: "Research", body: "Stakeholder interviews with judges, detectives, and operators." },
  { n: "02", title: "Information Architecture", body: "Role-based navigation and permission mapping." },
  { n: "03", title: "Wireframing", body: "Low-fi flows for all three user roles." },
  { n: "04", title: "Visual Design", body: "High-fidelity screens with CJIS-compliant patterns." },
  { n: "05", title: "Field Testing", body: "Usability testing with active law enforcement." },
];

const ecosystem = [
  {
    title: "Web Portal",
    label: "ENTERPRISE ADMINISTRATION & OPERATIONS",
    items: [
      "Full admin & detective role-based portals",
      "900+ responsive screens across 12 modules",
      "Agency management & hierarchical configuration",
      "Document template designer & workflow engine",
      "Configurable data grids & advanced search",
      "Audit trails & compliance dashboards",
    ],
  },
  {
    title: "Mobile App",
    label: "FIELD-READY WARRANT MANAGEMENT",
    items: [
      "iOS & Android native experience",
      "Real-time warrant processing & status tracking",
      "Digital signature capture with geo-stamping",
      "Video conferencing for judicial hearings",
      "Push notifications & multi-agency alerts",
      "Built for field officers & judges on the go",
    ],
  },
];

// Real mobile product screenshots. No real web screenshots exist yet — rather than
// pass off stock photos as CloudGavel's web UI, the Web tab shows an honest
// "available on request" state instead (see the Screens section below).
const mobileScreens: { src: string; alt: string; platform: "mobile" }[] = [
  { src: mobileLogin, alt: "CloudGavel mobile — login screen", platform: "mobile" },
  { src: mobileDashboard, alt: "CloudGavel mobile — dashboard with warrant services and investigation tools", platform: "mobile" },
  { src: mobileAssigned, alt: "CloudGavel mobile — assigned warrant documents list", platform: "mobile" },
  { src: mobileType, alt: "CloudGavel mobile — warrant type selection (Assigned, Map Search, Search Warrant)", platform: "mobile" },
  { src: mobileEmpty, alt: "CloudGavel mobile — empty state when no warrants are found", platform: "mobile" },
  { src: mobileProfile, alt: "CloudGavel mobile — profile with biometric authentication settings", platform: "mobile" },
];

const detectiveNav = [
  "Dashboard & Dynamic Task Lists",
  "Warrant Creation & Rapid Lifecycle Service",
  "Document Archive & Global Search",
  "CloudDocket (E-Court Coordination)",
  "CloudSign (Multi-Agency Digital Signatures)",
  "Structured Secure Inter-Agency Data Exchange",
];

const adminNav = [
  "Hierarchical Multi-Agency Configuration",
  "Granular User & Group Access Management",
  "Dynamic Document Flow & Workflow Engines",
  "Multi-state Configuration & Localization Rules",
  "Interactive User Onboarding & Training Centers",
  "Audit Log & Compliance Reporting Dashboards",
];

const modules = [
  { icon: LayoutDashboard, name: "Dashboard & Document Hub", body: "Central command center with configurable data grids, quick task queues, and fast global search for active documents.", count: "35+ Screens" },
  { icon: Gavel, name: "Warrant Services", body: "Full-lifecycle warrant capture, automated regional routing, and immediate digital judge dispatch protocols.", count: "80+ Screens" },
  { icon: ClipboardList, name: "Case Management", body: "Deep multi-tab environment handling suspect physical profiles, offense charges, vehicles, and evidence tracking.", count: "76+ Screens" },
  { icon: FileText, name: "Document Management", body: "Enterprise visual template designer, static schema configuration, and dynamic county-level field access control.", count: "86+ Screens" },
  { icon: Building2, name: "Agency Management", body: "Multi-step onboarding flow supporting deep structural mapping of units, local groups, and strict operational overrides.", count: "21 Screens" },
  { icon: Video, name: "Cloud Docket", body: "Direct connection to courtroom queues, supporting digital docket creation, in-session scheduling, and print flows.", count: "20 Screens" },
  { icon: PenTool, name: "CloudSign", body: "Custom digital document signing flow carrying iron-clad cryptographic trails, geo-stamping, and fast identity verification." },
  { icon: Share2, name: "Data Exchange", body: "Cross-agency payload sharing with universal search indexes, automated state reporting, and audit trail generation." },
  { icon: Images, name: "Photo Lineup", body: "Structured photo lineup generator with demographic filtering, automatic position scrambling, and witness log recording." },
  { icon: AlertTriangle, name: "Suspicious Activity Reports", body: "Multi-step narrative intelligence composer featuring structured civilian profiles, vehicle catalogs, and integrated maps.", count: "25+ Screens" },
  { icon: Workflow, name: "Workflow Engine", body: "State-machine engine supporting custom transition permissions, mandatory data-checks, and automated escalation notifications.", count: "48 Screens" },
  { icon: MessageSquare, name: "Collaboration Board", body: "Encrypted workspace context sharing, enabling secure multi-agency discussion rooms, pinning of evidence, and action logs." },
];

const webChallenges = [
  { n: "01", title: "Taming High Complexity", body: "Transformed dense, regulation-heavy paper documents into clean progressive disclosure interfaces. Users see what they need, exactly when they need it." },
  { n: "02", title: "Cascading Hierarchies", body: "Engineered robust selector components to handle complex nested entity logic: State → Region → Agency → Group → User, avoiding UI dead-ends." },
  { n: "03", title: "Configurable Data Grids", body: "Created customizable search tables allowing users to build private view profiles, configure columns, and set advanced data filters easily." },
  { n: "04", title: "Multi-Jurisdictional Scale", body: "Designed modular themes and dynamic layout frameworks. This allowed the platform to scale easily across local municipal and complex state-wide laws." },
];

const componentLibrary = [
  { icon: TypeIcon, title: "Foundations", items: ["Accessible Typography scale (Helvetica Neue)", "Primary/Status Color System", "Interactive Button matrices & States"] },
  { icon: MousePointerClick, title: "Form Inputs", items: ["Standardized text & numbers", "Cascading search select lists", "Localized date/time pickers", "Toggle switches"] },
  { icon: LayoutGrid, title: "Data Display", items: ["Custom configurable grids", "Density presets (Compact/Default)", "Multi-status badges", "Dynamic breadcrumbs"] },
  { icon: NavIcon, title: "Navigation", items: ["Dual-theme collapsible sidebar", "Unified app bar", "Multi-page pickers", "Contextual tabs"] },
  { icon: KeyRound, title: "Domain-Specific", items: ["Smart warrant selectors", "Dynamic Criminal Charge pickers", "Local ordinance search modules"] },
  { icon: Palette, title: "Feedback & Actions", items: ["Multi-stage process charts", "Destructive confirmation dialogues", "Real-time task delegation menus"] },
];

const webImpact = [
  { value: "900+", label: "Responsive Screens Documented" },
  { value: "264", label: "Modular Component Sets" },
  { value: "15+", label: "Active System Modules" },
  { value: "34", label: "Major Core Portal Sections" },
  { value: "2", label: "Separate Role-Based Portals" },
  { value: "100%", label: "Multi-Agency Deployment Readiness" },
];

const mobileTags = ["Mobile App", "Multi-Role", "CJIS Compliant", "Gov-Tech", "iOS & Android"];

const mobilePersonas = [
  { icon: Gavel, role: "Judge", items: ["Review & approve warrants", "Video conferencing for hearings", "Digital signature capture", "Case history & audit trail"] },
  { icon: Search, role: "Detective", items: ["Submit warrant requests", "Track approval status", "Manage assigned cases", "Upload evidence documents"] },
  { icon: Network, role: "Operator", items: ["Route warrants to agencies", "Monitor system-wide status", "Handle inter-agency coordination", "Generate compliance reports"] },
];

const mobileImpact = [
  { value: "62%", label: "Faster warrant processing" },
  { value: "3x", label: "Reduction in paper documents" },
  { value: "94%", label: "User task completion rate" },
  { value: "4.7/5", label: "Satisfaction from field officers" },
];

const takeaways = [
  { n: "01", body: "Compliance as a design constraint forced clearer, more purposeful UX decisions." },
  { n: "02", body: "Multi-role systems benefit from shared components with role-specific configurations." },
  { n: "03", body: "Field testing with real officers revealed workflow gaps that lab testing missed." },
];

/* ---------- Content ---------- */
/* Reused by both the standalone case-study page and the project bottom sheet,
   so the two entry points stay in sync automatically.

   Source spec was three separate pages (a common intro, a Web deep-dive, and a
   Mobile deep-dive) that intentionally repeat some framing copy. Folded here into
   one continuous scroll — the site's established pattern for every project — with
   the repeated Overview/Challenge/Process material told once, up front. */

export default function CloudGavelCaseStudyContent({ activePlatform, onPlatformChange }: CaseStudyContentProps = {}) {
  // CloudGavel only ships Web + Mobile deep-dives, so anything but an explicit
  // "mobile" selection (including no selection yet, or "tablet") reads as "web".
  const selectedPlatform: "web" | "mobile" = activePlatform === "mobile" ? "mobile" : "web";

  return (
    <div className="font-['Inter',sans-serif]">
      {/* Overview — hero, challenge, roles, process, and ecosystem all read as one
          continuous block, so they share a single nav entry. */}
      <Section id="overview" label="Overview">
        <div className="flex flex-wrap items-center gap-2.5">
          <Pill accent={BLUE_ACCENT}>Enterprise UX</Pill>
          <Pill accent={TEAL_ACCENT}>B2G Platform</Pill>
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">CloudGavel</h1>
        <p className="mt-3 text-lg font-semibold text-muted-foreground sm:text-xl">
          Criminal Justice &amp; Warrant Management Platform
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          CloudGavel is an enterprise-grade criminal justice management platform used by law enforcement agencies,
          courts, and legal professionals across multiple jurisdictions. The platform digitizes and streamlines the
          full lifecycle of warrants, case management, inter-agency coordination, and court documents.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-0">
          {projectMeta.map((m, i) => (
            <div key={m.label} className={`sm:px-6 ${i > 0 ? "sm:border-l sm:border-border" : ""}`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{m.label}</p>
              <p className="mt-1.5 text-sm font-semibold sm:text-base">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {heroStats.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} accent={ACCENT} />
          ))}
        </div>

        {/* The Challenge */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Challenge</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Replacing fragmented, paper-heavy processes across law enforcement agencies.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {challenges.map((c) => (
              <Card key={c.title}>
                <IconBadge icon={c.icon} accent={ACCENT} />
                <h3 className="text-base font-bold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {infraStrip.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </div>

        {/* Role-Based Experience */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Role-Based Experience</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Optimized flows for four distinct user personas.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map((p) => (
              <Card key={p.role}>
                <IconBadge icon={p.icon} accent={ACCENT} />
                <h3 className="text-base font-bold">{p.role}</h3>
                <ul className="mt-4 space-y-2">
                  {p.items.map((item) => (
                    <CheckItem key={item} accent={ACCENT}>{item}</CheckItem>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* My Role & Design Process */}
        <div className="mt-20 border-t border-border pt-16">
          <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${ACCENT.text}`}>05 / Behind the Design</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">My Role &amp; Design Process</h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className={`border-l-2 pl-5 ${ACCENT.border}`}>
              <h3 className="text-lg font-bold">Lead Product Designer</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                UX Research, Information Architecture, Interaction Design, UI Design, Component System, and Developer
                Handoff. I owned the end-to-end design strategy, coordinating directly with engineering leads and
                government stakeholders to navigate CJIS compliance and highly regulated environments.
              </p>
            </div>

            <div className="space-y-5">
              {processSteps.map((s) => (
                <div key={s.n} className="flex items-start gap-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-bold ${ACCENT.text}`}
                  >
                    {s.n}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{s.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Ecosystem */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Platform Ecosystem</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Two platforms, one unified system.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ecosystem.map((e) => (
              <Card key={e.title}>
                <IconBadge icon={e.title === "Web Portal" ? Globe2 : Smartphone} accent={ACCENT} />
                <h3 className="text-lg font-bold">{e.title}</h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{e.label}</p>
                <ul className="mt-4 space-y-2">
                  {e.items.map((item) => (
                    <CheckItem key={item} accent={ACCENT}>{item}</CheckItem>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Device switch — governs both the screens below and which deep-dive (Web/Mobile) shows */}
      <div className="bg-muted/40 px-6 py-12 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Explore the Case Study
          </p>
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => onPlatformChange?.("web")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                selectedPlatform === "web" ? `${ACCENT.bg} text-white` : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe2 className="h-4 w-4" />
              Web Application
            </button>
            <button
              type="button"
              onClick={() => onPlatformChange?.("mobile")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                selectedPlatform === "mobile" ? `${ACCENT.bg} text-white` : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Mobile Application
            </button>
          </div>
        </div>
      </div>

      {/* Screens — reflects whichever device is selected above */}
      <Section id="screens" label="Screens" bg="muted">
        {selectedPlatform === "mobile" ? (
          <MockupGallery mockups={mobileScreens} hidePlatformSwitch />
        ) : (
          <div>
            <h3 className="text-lg font-bold tracking-tight">Product UI Showcase</h3>
            <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border p-10 text-center sm:p-14">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${ACCENT.softBg}`}>
                <Lock className={`h-5 w-5 ${ACCENT.text}`} />
              </div>
              <div>
                <p className="text-sm font-semibold">Web application screens available on request</p>
                <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
                  CloudGavel's web portal handles CJIS-sensitive workflows, so the full screen walkthrough is shared
                  privately rather than posted publicly — reach out for a design request.
                </p>
              </div>
              <a
                href="mailto:raju@xstudio.com?subject=CloudGavel%20Web%20UI%20Design%20Request"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 ${ACCENT.bg}`}
              >
                <Mail className="h-3.5 w-3.5" />
                Request the Design Walkthrough
              </a>
            </div>
          </div>
        )}
      </Section>

      {/* 01 — Web Application Case Study : Role-Based Navigation */}
      <Section id="web-nav" label="Web Nav" platform="web" hidden={selectedPlatform !== "web"}>
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${ACCENT.text}`}>01 / Web Application Case Study</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Role-Based Navigation</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A central product tenant must serve distinctly different operator paradigms. I designed two distinct
          application experiences — a Detective/LEO view optimized for field urgency and daily casework, and an
          Admin view engineered for absolute governance and metadata configurations.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold">Detective &amp; Field Officer View</h3>
            <ul className="mt-4 space-y-2.5">
              {detectiveNav.map((item) => (
                <CheckItem key={item} accent={ACCENT}>{item}</CheckItem>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-base font-bold">System &amp; Agency Admin View</h3>
            <ul className="mt-4 space-y-2.5">
              {adminNav.map((item) => (
                <CheckItem key={item} accent={ACCENT}>{item}</CheckItem>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Core Modules */}
      <Section id="web-modules" label="Modules" platform="web" hidden={selectedPlatform !== "web"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core Modules I Designed</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          I planned, wireframed, styled, and delivered functional UI for 12 deep business modules, accounting for
          robust localized rulesets and accessibility specifications.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Card key={m.name}>
              <IconBadge icon={m.icon} accent={ACCENT} />
              <h3 className="text-sm font-bold">{m.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.body}</p>
              {m.count && (
                <p className={`mt-3 text-[10px] font-bold uppercase tracking-[0.15em] ${ACCENT.text}`}>{m.count}</p>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Design Challenges Solved */}
      <Section id="web-challenges" label="Web Challenges" platform="web" hidden={selectedPlatform !== "web"}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Design Challenges Solved</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Designing for government and public safety presents unique interaction patterns. Focus was placed on
          minimizing high cognitive load during critical real-time scenarios.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {webChallenges.map((c) => (
            <Card key={c.n}>
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${ACCENT.text}`}>Challenge {c.n}</p>
              <h3 className="mt-2 text-base font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Component Library */}
      <Section id="components" label="Components" platform="web" hidden={selectedPlatform !== "web"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">System &amp; Component Library</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          264 components powering a consistent design language. This system supports fast engineering handoffs and
          simplifies the integration of new modules.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {componentLibrary.map((c) => (
            <Card key={c.title}>
              <IconBadge icon={c.icon} accent={ACCENT} />
              <h3 className="text-sm font-bold">{c.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {c.items.map((item) => (
                  <CheckItem key={item} accent={ACCENT}>{item}</CheckItem>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Web Impact & Production Scale */}
      <Section id="web-impact" label="Web Impact" platform="web" hidden={selectedPlatform !== "web"}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Impact &amp; Production Scale</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The redesign successfully replaced outdated software across hundreds of departments. This resulted in
          measurable improvements, including accelerated warrant review cycles and reduced data-entry errors.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {webImpact.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} accent={ACCENT} />
          ))}
        </div>
      </Section>

      {/* 02 — Mobile Application Case Study : Role-Based Experience */}
      <Section id="mobile-roles" label="Mobile Roles" platform="mobile" hidden={selectedPlatform !== "mobile"} bg="muted">
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${ACCENT.text}`}>02 / Mobile Application Case Study</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Role-Based Experience</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Providing optimized flows for three distinct personas, in the field.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {mobileTags.map((t) => (
            <Pill key={t} accent={ACCENT}>{t}</Pill>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {mobilePersonas.map((p) => (
            <Card key={p.role}>
              <IconBadge icon={p.icon} accent={ACCENT} />
              <h3 className="text-base font-bold">{p.role}</h3>
              <ul className="mt-4 space-y-2">
                {p.items.map((item) => (
                  <CheckItem key={item} accent={ACCENT}>{item}</CheckItem>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Mobile Impact */}
      <Section id="mobile-impact" label="Mobile Impact" platform="mobile" hidden={selectedPlatform !== "mobile"}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Impact</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Real-world results delivered to the field.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {mobileImpact.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} accent={ACCENT} />
          ))}
        </div>
      </Section>

      {/* Key Takeaways */}
      <Section id="takeaways" label="Takeaways" bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Takeaways</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          What we learned designing in a highly regulated government sector.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {takeaways.map((t) => (
            <div key={t.n}>
              <p className={`text-3xl font-bold opacity-30 ${ACCENT.text}`}>{t.n}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer / Contact */}
      <section className="border-t border-border bg-card px-6 py-16 text-foreground sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <div>
            <p className="text-lg font-bold">CloudGavel — Product Design Case Study</p>
            <p className="text-sm text-muted-foreground">Lead UX/UI Designer</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/design"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 ${ACCENT.bg}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Design Projects
            </Link>
            <a
              href="https://www.linkedin.com/in/rajuxstudio/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
            >
              <Linkedin className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="mailto:raju@xstudio.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Designed with care.</p>
        </div>
      </section>
    </div>
  );
}
