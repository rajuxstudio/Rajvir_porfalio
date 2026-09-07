import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Linkedin,
  FileWarning,
  Users,
  ShieldAlert,
  UserCog,
  Building2,
  Layers,
  BarChart3,
  ScrollText,
  Blocks,
} from "lucide-react";
import { Section, Card, IconBadge, type Accent } from "@/components/design/components/CaseStudyKit";
import MockupGallery from "@/components/design/components/MockupGallery";
import type { CaseStudyContentProps } from "@/components/design/projects/types";
import adminDashboard from "@/assets/carastone/mockup/1.1 Administrator Dashboard.png";
import adminProfile from "@/assets/carastone/mockup/Admin Profile.png";
import companyProfile from "@/assets/carastone/mockup/Company profile.png";
import edgarSearch from "@/assets/carastone/mockup/Edgar Search.png";
import loginScreen from "@/assets/carastone/mockup/Login (1).png";
import marketSummary from "@/assets/carastone/mockup/Sumarry.png";
import accountSelect from "@/assets/carastone/mockup/User Account SCreen.png";

/* CaraStone's brand color is a deep navy (#1B2B4B, matching the real logo and
   UI) — Tailwind's indigo family is the closest named match, and the Hero /
   Impact bands use the literal brand hex per the supplied spec. Structure
   comes from the shared kit, matching every other case study's layout and
   staying light/dark aware everywhere except those two intentionally-fixed
   navy bands. */
const ACCENT: Accent = {
  text: "text-indigo-700 dark:text-indigo-400",
  bg: "bg-indigo-700",
  softBg: "bg-indigo-500/10",
  border: "border-indigo-500",
};
/** The Hero and Impact bands are intentionally fixed navy per the supplied spec,
 *  not theme-adaptive like the rest of the page. */
const NAVY_SECTION = "!bg-[#1B2B4B] !text-white";

/* ---------- Data (sourced from the supplied case-study spec) ---------- */

const challenges = [
  { icon: FileWarning, title: "Cap Table Chaos", body: "Spreadsheet-based equity tracking breaks down across funding rounds, creating legal disputes and failed deals." },
  { icon: ScrollText, title: "SEC Compliance Burden", body: "Navigating government databases for due diligence wastes hours of billable time cross-referencing filings." },
  { icon: Users, title: "Disconnected Stakeholders", body: "Founders, investors, and legal teams juggle email chains and shared folders with no single source of truth." },
  { icon: ShieldAlert, title: "Governance Bottlenecks", body: "Shareholder votes and corporate actions lack proper tracking, notifications, and audit trails." },
];

const portals = [
  { icon: UserCog, title: "System Administrator", body: "Firm-wide analytics, contact CRM, organization management, user provisioning, vote tracking." },
  { icon: Building2, title: "Company Portal", body: "Live cap table, 409A valuation, convertible debt tracking, option grant management, preferred stock." },
  { icon: Users, title: "Investor Portal", body: "Portfolio holdings overview, per-company drill-down, total exposure tracking, vote participation." },
];

const flowSteps = ["Login", "Role Selection", "Role-Specific Dashboard", "Feature Modules"];

const screens: { src: string; alt: string; platform: "web" }[] = [
  { src: loginScreen, alt: "Cara Stone — login & authentication, split-screen layout", platform: "web" },
  { src: adminDashboard, alt: "Cara Stone — Administrator Dashboard with deal size and valuation charts", platform: "web" },
  { src: adminProfile, alt: "Cara Stone — Admin Profile Settings", platform: "web" },
  { src: companyProfile, alt: "Cara Stone — Manage Company Profile", platform: "web" },
  { src: accountSelect, alt: "Cara Stone — select user account type (Administrator, Investor, Company)", platform: "web" },
  { src: edgarSearch, alt: "Cara Stone — Edgar Search, SEC Form 1-SA filings", platform: "web" },
  { src: marketSummary, alt: "Cara Stone — public market summary analytics", platform: "web" },
];

const useCases = [
  { n: "01", title: "Closing a Seed Round", body: "Company admin navigates to Cap Table, creates a New Event Equity Issuance, adds each investor with share counts and prices. Dashboard instantly reflects updated totals." },
  { n: "02", title: "Board Vote on Option Pool", body: "Admin creates a new vote with effective date. Status tracks through Pending to Approved/Rejected. Investors see it in their Vote tab automatically." },
  { n: "03", title: "Investor Portfolio Check", body: "VC logs in, sees $13.3M total across 5 companies, clicks into any one for detail. No emails or spreadsheet requests needed." },
  { n: "04", title: "Due Diligence Research", body: "Lawyer uses Edgar Search to pull all Form 1-SA filings in Manufacturing from 2016-2023, instantly sees pre/post money valuations and multiples." },
  { n: "05", title: "Onboarding New Associate", body: "Admin goes to Manage Users, Internal User tab, Add New User. Invite system tracks creation date and expiration automatically." },
];

const impact = [
  { value: "3 Portals", label: "Unified under one platform" },
  { value: "178+", label: "Screens — comprehensive design system" },
  { value: "5 Offices", label: "New Orleans, Chicago, LA, Spokane, Lafayette" },
  { value: "10,000+", label: "SEC filings searchable" },
];

const whyItWorks = [
  { icon: Layers, title: "One Platform, Three Experiences", body: "A single authentication flow routes to role-specific dashboards sharing a unified data layer — no separate apps to maintain or sync." },
  { icon: BarChart3, title: "Financial Data Made Visual", body: "Bar charts for deals-per-year, line charts for valuation trends, and prominent KPI cards turn raw financial numbers into actionable decisions." },
  { icon: ShieldAlert, title: "Legal Compliance Built In", body: "Terms of Use, Disclaimers, and Edgar integration are designed into the product from day one, not bolted on as afterthoughts." },
  { icon: Blocks, title: "Scales From Simple to Complex", body: "An early-stage startup with 3 shareholders uses the same tool as a later-stage company with multiple cap events, convertible debt, warrants, and preferred stock." },
];

export default function CaraStoneCaseStudyContent(_props: CaseStudyContentProps = {}) {
  return (
    <div className="font-['Inter',sans-serif]">
      {/* 1. Hero */}
      <Section id="overview" label="Overview" className={NAVY_SECTION}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
          UX/UI Design • Product Design • Case Study
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Cara Stone</h1>
        <p className="mt-3 text-lg font-semibold text-white/70 sm:text-xl">
          Streamlining Capital Markets &amp; Corporate Financing
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          A unified platform connecting law firms, startups, and investors through intelligent cap table management,
          SEC filing search, and corporate governance tools.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          {[
            { label: "PLATFORM", value: "Web Application" },
            { label: "INDUSTRY", value: "Legal Tech / FinTech" },
            { label: "USERS", value: "Law Firms, Startups, Investors" },
          ].map((m, i) => (
            <div key={m.label} className={`${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""}`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{m.label}</p>
              <p className="mt-1.5 text-sm font-semibold sm:text-base">{m.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 2. The Challenge */}
      <Section id="challenge" label="Challenge" bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Challenge</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {challenges.map((c) => (
            <Card key={c.title} className="bg-card">
              <IconBadge icon={c.icon} accent={ACCENT} />
              <h3 className="text-base font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. The Solution */}
      <Section id="solution" label="Solution">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One Platform, Three Experiences</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Rather than building three separate applications, Cara Stone routes users through a single authentication
          flow into role-specific dashboards — each tailored to what that stakeholder needs, while sharing a unified
          data layer underneath.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {portals.map((p) => (
            <Card key={p.title}>
              <IconBadge icon={p.icon} accent={ACCENT} />
              <h3 className="text-base font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. User Flow */}
      <Section id="user-flow" label="User Flow" bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">User Journey</h2>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2 sm:contents">
              <div className="flex-1 rounded-xl border border-border bg-card px-5 py-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Step {i + 1}</p>
                <p className="mt-1 text-sm font-bold">{step}</p>
                {step === "Role Selection" && (
                  <p className="mt-1 text-xs text-muted-foreground">Admin / Company / Investor</p>
                )}
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight className={`hidden h-5 w-5 shrink-0 sm:block ${ACCENT.text}`} />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Key Screens */}
      <Section id="key-screens" label="Screens">
        <MockupGallery mockups={screens} />
      </Section>

      {/* 6. Real-World Use Cases */}
      <Section id="use-cases" label="Use Cases" bg="muted">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Real-World Use Cases</h2>
        <div className="mt-10 space-y-4">
          {useCases.map((u) => (
            <Card key={u.n} className="flex items-start gap-5">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${ACCENT.softBg} ${ACCENT.text}`}>
                {u.n}
              </span>
              <div>
                <h3 className="text-sm font-bold sm:text-base">{u.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{u.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7. Impact */}
      <Section id="impact" label="Impact" className={NAVY_SECTION}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Impact</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-bold sm:text-4xl">{s.value}</div>
              <div className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Why This Design Works */}
      <Section id="why-it-works" label="Why It Works">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why This Design Works</h2>
        <div className="mt-10 space-y-6">
          {whyItWorks.map((w) => (
            <div key={w.title} className="flex items-start gap-5 border-b border-border pb-6 last:border-0">
              <IconBadge icon={w.icon} accent={ACCENT} />
              <div>
                <h3 className="text-base font-bold">{w.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <section className="border-t border-border bg-card px-6 py-16 text-foreground sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <div>
            <p className="text-lg font-bold">Cara Stone — Product Design Case Study</p>
            <p className="text-sm text-muted-foreground">Streamlining Capital Markets &amp; Corporate Financing</p>
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
