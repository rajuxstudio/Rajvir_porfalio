import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Linkedin,
  FileWarning,
  ClipboardList,
  FileStack,
  CloudOff,
  Users,
  Building2,
  Globe2,
  Smartphone,
  Tablet as TabletIcon,
  CreditCard,
  Wrench,
  BadgeCheck,
  Compass,
  ShieldCheck,
  Headphones,
  MapPinned,
  ShieldAlert,
  DatabaseZap,
  Route,
  ScanLine,
  WifiOff,
} from "lucide-react";
import { Section, Card, Pill, IconBadge, StatBlock, CheckItem, type Accent } from "@/components/design/components/CaseStudyKit";
import MockupGallery from "@/components/design/components/MockupGallery";
import type { CaseStudyContentProps, DevicePlatform } from "@/components/design/projects/types";
import cpLogin from "@/assets/utility-plus/mockup/uts_cp_landing.png";
import cpServiceType from "@/assets/utility-plus/mockup/uts_cp_type.png";
import cpDashboard from "@/assets/utility-plus/mockup/uts_cp_landingpage_dashboard.png";
import cpLicenseList from "@/assets/utility-plus/mockup/uts_cp_landingpage_occupational_license.png";
import cpLicenseDetail from "@/assets/utility-plus/mockup/uts_cp_create_license.png";

/* UtilityPlus's brand accent — the blue used across its real wordmark and UI.
   Structure comes from the shared kit, so this matches every other case study's
   layout and is light/dark aware. */
const ACCENT: Accent = {
  text: "text-blue-600 dark:text-blue-400",
  bg: "bg-blue-600",
  softBg: "bg-blue-500/10",
  border: "border-blue-500",
};

/* ---------- Data ---------- */
/* Sourced directly from the supplied case-study documents (citizen portal,
   mobile app, and tablet app design files) plus the admin-panel module list
   provided directly. The Citizen Web Portal section below uses real product
   screenshots; Mobile and Tablet stay text-first until real screens for those
   apps are supplied. */

const ecosystem = [
  {
    icon: Building2,
    title: "Admin Panel",
    who: "Used by municipal clerks",
    body: "The back office: customer accounts, occupational licensing (OLTA), billing & payments, backflow preventer compliance, confirmation letters, work orders, meter reading & inventory, and reporting.",
  },
  {
    icon: Globe2,
    title: "Citizen Web Portal",
    who: "Used by residents & business owners",
    body: "Pay a utility bill, track usage, and manage occupational licenses from any browser — no office visit required.",
  },
  {
    icon: Smartphone,
    title: "MyUtilityPlus",
    who: "Used by residents & business owners",
    body: "The same core jobs as the web portal — pay a bill, renew a license, submit a work order request — built for a phone.",
  },
  {
    icon: TabletIcon,
    title: "UtilityPlus Meter Reader",
    who: "Used by field meter readers",
    body: "An offline-first field tool for meter reading, route data collection, and syncing readings back to the admin system.",
  },
];

const adminModules = [
  "Customer Management (accounts, queue, bad debt, final accounts)",
  "Occupational License Tax (OLTA) — apply, renew, generate certificates",
  "Billing & Payments — ACH, adjustments, online payment import",
  "Backflow Preventer Compliance Tracking",
  "Confirmation Letter Processing",
  "Work Order System",
  "Municipal License Tax (insurance agencies)",
  "Meter Reading & Inventory",
  "Roles, Permissions & User Management",
  "Reports (PDF / Excel export)",
];

const challenges = [
  { icon: FileWarning, title: "Fragmented Services", body: "Residents were forced to visit physical offices during limited hours just to pay a utility bill, submit a service request, or register a local license." },
  { icon: ClipboardList, title: "Manual Work Order Tracking", body: "Service and maintenance requests were processed via paper trails and internal spreadsheets — citizens had zero visibility into status." },
  { icon: FileStack, title: "Paper-Heavy Licensing", body: "Occupational license filing was completely offline, managing 3,600+ physical local tax and business records manually in folders." },
  { icon: CloudOff, title: "No Online Billing", body: "Water district customers had no way to view historical usage, sign up for paperless billing, or make a convenient online payment." },
];

const citizenSolutions = [
  { icon: CreditCard, title: "Manage & Pay Utilities", body: "Full visibility over bills, consumption trends, paperless billing settings, and automated payment gateways." },
  { icon: Wrench, title: "Create & Track Work Orders", body: "Report a local issue instantly. Citizen submissions are mapped and piped directly into municipal dispatch systems." },
  { icon: BadgeCheck, title: "Occupational Licensing", body: "End-to-end digital processing for businesses, with real-time tax calculation, renewals, and payment validation." },
];

const webScreens: { src: string; alt: string; platform: "web" }[] = [
  { src: cpLogin, alt: "UtilityPlus Citizen Service Center — customer login and Quick Pay", platform: "web" },
  { src: cpServiceType, alt: "UtilityPlus — Ward Two Water District service selector (work orders, billing, occupational license)", platform: "web" },
  { src: cpDashboard, alt: "UtilityPlus — citizen account dashboard with balance, usage, and billing charts", platform: "web" },
  { src: cpLicenseList, alt: "UtilityPlus — occupational license search and credentials table", platform: "web" },
  { src: cpLicenseDetail, alt: "UtilityPlus — business license detail view", platform: "web" },
];

const billingFeatures = [
  "Account dashboard with live balances",
  "Usage analytics and historical line charts",
  "Direct ACH and scheduled automatic payments",
  "Paperless e-billing enrollment",
];

const workOrderStages = ["Draft", "Submitted", "Assigned", "Investigate", "In Progress", "Planning", "On Hold", "Completed", "Rejected", "Closed"];

const adminConnections = [
  { title: "Payments →", body: "Online payments and ACH sign-ups land directly in the admin Billing & Payments and iPay/MARKS import queues clerks already work from." },
  { title: "Work Orders →", body: "A citizen's submitted request enters the same Work Order System queue used by dispatch and field crews, with status changes visible back to the citizen." },
  { title: "License Renewals →", body: "Applications and renewals flow into the OLTA workflow — clerks review, generate certificates, and issue confirmation letters from the same case." },
];

const designDecisions = [
  { icon: Compass, title: "Unified Navigation", body: "Three permanent hub buttons ensure citizens are never more than a single tap away from core municipal features." },
  { icon: ShieldCheck, title: "Role-Based Access", body: "Tailored workspaces for residents, business owners, and clerks/admins, with secure sign-on for each." },
  { icon: Headphones, title: "Accessible Support", body: "Always-visible contact hotlines, localized office address, and district office operating hours." },
];

const webImpact = [
  { value: "24/7", label: "Self-service access" },
  { value: "3.6k+", label: "Business licenses online" },
  { value: "10", label: "Work order stages tracked" },
  { value: "3-in-1", label: "Unified municipal services" },
];

const mobileChallenges = [
  { icon: FileWarning, title: "Archaic In-Person Payments", body: "Residents were required to mail paper checks or physically visit the courthouse for standard water and gas bill payments, leading to severe collection delays." },
  { icon: ClipboardList, title: "Fragmented Work Orders", body: "Infrastructure complaints like gas leaks or broken public signs relied on phone calls. Citizens never received tracking numbers, ticket progress, or confirmation." },
  { icon: FileStack, title: "Bureaucratic License Renewals", body: "Local business operators had to print complex PDF forms, buy physical money orders, and hand-deliver documents yearly to maintain occupational licenses." },
];

const mobileSolutions = [
  { icon: CreditCard, title: "Instant Digital Access", body: "Secure credit, debit, or bank draft payments directly from the mobile app reduce default rates and courthouse foot traffic." },
  { icon: MapPinned, title: "Mobile-First Geo Tagging", body: "Residents snap a photo of a street issue and auto-locate it with device GPS, instantly routing the task to the correct field team." },
];

const mobileImpact = [
  { value: "54+", label: "Screens designed & spec'd" },
  { value: "6", label: "Modules fully digitized" },
  { value: "85%", label: "Faster processing time" },
];

const tabletChallenges = [
  { icon: FileStack, title: "Manual Paper Slips", body: "Intake entries, route checklists, and current reads were compiled manually, causing administrative data loss and physical damage." },
  { icon: ShieldAlert, title: "Constant Reading Errors", body: "Legacy manual transcription induced visual mismatches. Readers often mixed decimal points, driving false bills and customer disputes." },
  { icon: Route, title: "No Real-Time Route Aid", body: "Meter readers navigated with paper maps and zero live tracking, leading to double-backed trips and major delays." },
  { icon: WifiOff, title: "Zero Sync Capability", body: "Lost cellular coverage halted field logging entirely — workers had to wait until returning to the office to upload their shift." },
];

const tabletSolutions = [
  { icon: MapPinned, title: "Map-Driven Layouts", body: "Embedding visual, spatial meter routes directly on the screen eliminates paper maps and reduces travel distance by over 35%." },
  { icon: ScanLine, title: "Strict Error Gates", body: "Smart logical thresholds prevent readers from entering improbable readings, forcing an on-site re-read immediately." },
  { icon: DatabaseZap, title: "Local SQLite Sync", body: "A background database queue holds complete records locally. Once a network is reached, they sync in one click." },
];

const tabletImpact = [
  { value: "13", label: "iPadOS screens designed" },
  { value: "40%", label: "Faster intake & reading" },
  { value: "100%", label: "Offline data persistence" },
];

const takeaways = [
  { n: "01", body: "Designing public-sector tools means designing for user realities, not commercial polish — glare, gloves, and rushed shifts change every decision." },
  { n: "02", body: "One shared data model across four surfaces (admin, web, mobile, tablet) keeps clerks, citizens, and field crews looking at the same truth." },
  { n: "03", body: "Offline-first isn't a fallback for field tools — assume the network will drop, and design the happy path around that." },
  { n: "04", body: "Field research (surveying 120 residents, shadowing 4 meter readers) surfaced friction no workshop could — 92% of field errors happened under sun glare or rain." },
];

/* ---------- Content ---------- */
/* Reused by both the standalone case-study page and the project bottom sheet. */

export default function UtilityPlusCaseStudyContent({ activePlatform, onPlatformChange }: CaseStudyContentProps = {}) {
  const selectedPlatform: DevicePlatform = activePlatform === "mobile" || activePlatform === "tablet" ? activePlatform : "web";

  const switchOptions: { key: DevicePlatform; label: string; icon: typeof Globe2 }[] = [
    { key: "web", label: "Citizen Web Portal", icon: Globe2 },
    { key: "mobile", label: "MyUtilityPlus", icon: Smartphone },
    { key: "tablet", label: "UtilityPlus Meter Reader", icon: TabletIcon },
  ];

  return (
    <div className="font-['Inter',sans-serif]">
      {/* Overview */}
      <Section id="overview" label="Overview">
        <Pill accent={ACCENT}>Case Study</Pill>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">UtilityPlus</h1>
        <p className="mt-3 text-lg font-semibold text-muted-foreground sm:text-xl">
          A unified municipal platform connecting citizens, clerks, and field crews
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          UtilityPlus consolidates utility billing, work order management, and occupational licensing across four
          purpose-built experiences — an admin back office for clerks, a citizen web portal, a citizen mobile app,
          and an offline-first tablet app for meter readers — all reading and writing the same underlying records.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: "CLIENT", value: "Ward Two Water District / St. James Parish" },
            { label: "ROLE", value: "UX/UI Design & Strategy" },
            { label: "TECHNOLOGY PARTNER", value: "Fusionstak LLC" },
          ].map((m, i) => (
            <div key={m.label} className={`${i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""}`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{m.label}</p>
              <p className="mt-1.5 text-sm font-semibold sm:text-base">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatBlock value="24/7" label="Self-service access" accent={ACCENT} />
          <StatBlock value="3.6k+" label="Licenses digitized" accent={ACCENT} />
          <StatBlock value="85%" label="Faster processing" accent={ACCENT} />
          <StatBlock value="100%" label="Offline field-ready" accent={ACCENT} />
        </div>

        {/* The Challenge */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Challenge</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Before UtilityPlus, residents faced fragmented services, relying on manual processes and physical office
            visits for everyday municipal needs.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map((c) => (
              <Card key={c.title}>
                <IconBadge icon={c.icon} accent={ACCENT} />
                <h3 className="text-sm font-bold">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Ecosystem */}
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Four Surfaces, One System</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every application reads and writes the same customer, billing, and licensing records.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map((e) => (
              <Card key={e.title}>
                <IconBadge icon={e.icon} accent={ACCENT} />
                <h3 className="text-base font-bold">{e.title}</h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{e.who}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.body}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-7">
            <h3 className="text-sm font-bold">What clerks manage in the Admin Panel</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {adminModules.map((m) => (
                <CheckItem key={m} accent={ACCENT}>{m}</CheckItem>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Device switch */}
      <div className="bg-muted/40 px-6 py-12 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Explore the Case Study</p>
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card p-1">
            {switchOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => onPlatformChange?.(opt.key)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  selectedPlatform === opt.key ? `${ACCENT.bg} text-white` : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="h-4 w-4" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== WEB — Citizen Portal ===== */}
      <Section id="citizen-portal" label="Citizen Portal" platform="web" hidden={selectedPlatform !== "web"}>
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${ACCENT.text}`}>Web / Citizen Portal</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The Unified Citizen Portal</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          UtilityPlus consolidates three core municipal services — utility billing, work order management, and
          occupational licensing — into a single self-service portal available 24/7.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {citizenSolutions.map((s) => (
            <Card key={s.title}>
              <IconBadge icon={s.icon} accent={ACCENT} />
              <h3 className="text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <MockupGallery mockups={webScreens} hidePlatformSwitch />
        </div>
      </Section>

      <Section id="billing" label="Billing" platform="web" hidden={selectedPlatform !== "web"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Real-Time Consumption &amp; Flexible Payments</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We redesigned the billing experience from the ground up — letting citizens visualize active water and
          electricity usage, view historical data, enroll in automatic ACH payments, and sign up for paperless
          e-billing seamlessly.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {billingFeatures.map((f) => (
            <CheckItem key={f} accent={ACCENT}>{f}</CheckItem>
          ))}
        </ul>
      </Section>

      <Section id="work-orders" label="Work Orders" platform="web" hidden={selectedPlatform !== "web"}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">10-Stage Service Request Pipeline</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A continuous pipeline keeps citizens updated automatically at every phase of a public works repair order —
          no more mystery paper slips.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {workOrderStages.map((stage, i) => (
            <div key={stage} className="rounded-xl border border-border bg-card px-3 py-3 text-center">
              <p className={`text-[10px] font-bold ${ACCENT.text}`}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-xs font-semibold">{stage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="licensing" label="Licensing" platform="web" hidden={selectedPlatform !== "web"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Digitizing 3,600+ Local Business Records</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          UtilityPlus replaces slow offline filings with an intuitive step-by-step registration wizard. Business
          owners can complete tax documents and pay occupational fees in minutes instead of mailing paperwork.
        </p>
      </Section>

      <Section id="admin-connect" label="Admin Connection" platform="web" hidden={selectedPlatform !== "web"}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How the Portal Connects to the Admin Panel</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The citizen portal isn't a separate silo — everything a resident submits routes straight into the same
          back office clerks already use.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {adminConnections.map((c) => (
            <Card key={c.title}>
              <h3 className="text-sm font-bold">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold">Engineered for Accessibility &amp; Speed</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {designDecisions.map((d) => (
              <Card key={d.title}>
                <IconBadge icon={d.icon} accent={ACCENT} />
                <h4 className="text-sm font-bold">{d.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section id="web-impact" label="Web Impact" platform="web" hidden={selectedPlatform !== "web"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transforming Municipal Operations</h2>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {webImpact.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} accent={ACCENT} />
          ))}
        </div>
      </Section>

      {/* ===== MOBILE — MyUtilityPlus ===== */}
      <Section id="mobile-app" label="MyUtilityPlus" platform="mobile" hidden={selectedPlatform !== "mobile"}>
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${ACCENT.text}`}>Mobile App — MyUtilityPlus</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Utility Tasks, Built for a Phone</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          MyUtilityPlus carries the same core jobs as the web portal — pay a bill, submit a work order, renew an
          occupational license — redesigned for quick, on-the-go use.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {mobileChallenges.map((c) => (
            <Card key={c.title}>
              <IconBadge icon={c.icon} accent={ACCENT} />
              <h3 className="text-sm font-bold">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {mobileSolutions.map((s) => (
            <Card key={s.title}>
              <IconBadge icon={s.icon} accent={ACCENT} />
              <h3 className="text-sm font-bold">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            "I work a regular shift job. I can't take an afternoon off just to go stand in courthouse lines to renew
            my business license or drop off a utility check."
          </p>
          <p className="mt-3 text-xs font-semibold">Sarah J. — Business Owner, Citizen App User</p>
        </Card>
      </Section>

      <Section id="mobile-impact" label="Mobile Impact" platform="mobile" hidden={selectedPlatform !== "mobile"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Impact</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {mobileImpact.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} accent={ACCENT} />
          ))}
        </div>
      </Section>

      {/* ===== TABLET — UtilityPlus Meter Reader ===== */}
      <Section id="tablet-app" label="UtilityPlus Meter Reader" platform="tablet" hidden={selectedPlatform !== "tablet"}>
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${ACCENT.text}`}>Tablet App — UtilityPlus Meter Reader</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Seamless Offline-First Field Data Collection
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          UtilityPlus Meter Reader replaces legacy clipboard operations with a high-contrast, offline-first
          environment engineered for rough outdoor conditions — meter reading, route data, and single-tap sync
          back to the admin system.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tabletChallenges.map((c) => (
            <Card key={c.title}>
              <IconBadge icon={c.icon} accent={ACCENT} />
              <h3 className="text-sm font-bold">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {tabletSolutions.map((s) => (
            <Card key={s.title}>
              <IconBadge icon={s.icon} accent={ACCENT} />
              <h3 className="text-sm font-bold">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            "We drive out to long country roads. If a storm hits, the print logs get soaked. Once dry, they're
            barely legible. Having an iPad with simple touch boxes changes everything."
          </p>
          <p className="mt-3 text-xs font-semibold">Albert D. — Lead Reader, St. James Utility Division</p>
        </Card>
      </Section>

      <Section id="tablet-impact" label="Tablet Impact" platform="tablet" hidden={selectedPlatform !== "tablet"} bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Impact</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Field research surveyed 120 residents and shadowed 4 parish meter readers across their summer field
          shifts — 92% of legacy reading errors happened under high-temperature sun glare or heavy rainfall.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {tabletImpact.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} accent={ACCENT} />
          ))}
        </div>
      </Section>

      {/* Key Takeaways */}
      <Section id="takeaways" label="Takeaways" bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Takeaways</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          What building four connected surfaces for one municipal system taught us.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {takeaways.map((t) => (
            <div key={t.n}>
              <p className={`text-3xl font-bold opacity-30 ${ACCENT.text}`}>{t.n}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <section className="border-t border-border bg-card px-6 py-16 text-foreground sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <div>
            <p className="text-lg font-bold">UtilityPlus — Product Design Case Study</p>
            <p className="text-sm text-muted-foreground">Built for Ward Two Water District / St. James Parish</p>
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
