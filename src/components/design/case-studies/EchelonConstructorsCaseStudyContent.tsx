import type { ElementType, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  FileSpreadsheet,
  Mail,
  Target,
  Users,
  LayoutDashboard,
  ListChecks,
  SlidersHorizontal,
  KeyRound,
  Check,
  Minus,
  Quote,
  Compass,
  Linkedin,
} from "lucide-react";
import iconEchelon from "@/assets/project-logos/echelon-constructors.svg";
import MockupGallery from "@/components/design/components/MockupGallery";
import screenLogin from "@/assets/echelon-constructors/mockup/login.png";
import screenDashboard from "@/assets/echelon-constructors/mockup/dashboard.png";
import screenJobsList from "@/assets/echelon-constructors/mockup/jobs-list.png";
import screenJobDetail from "@/assets/echelon-constructors/mockup/job-detail.png";
import screenJobDetailAddItem from "@/assets/echelon-constructors/mockup/job-detail-add-item.png";
import screenLookup from "@/assets/echelon-constructors/mockup/lookup.png";
import screenUserManagement from "@/assets/echelon-constructors/mockup/user-management.png";
import screenRoleManagement from "@/assets/echelon-constructors/mockup/role-management.png";
import screenProfile from "@/assets/echelon-constructors/mockup/profile.png";
import type { CaseStudyContentProps } from "@/components/design/projects/types";

/* ---------- Palette ---------- */
const NAVY = "#071329";
const DARK_NAVY = "#0B1730";
const BLUE = "#2F80ED";
const LIGHT_BLUE = "#EAF3FF";
const WHITE = "#FFFFFF";
const GRAY_BG = "#F7F8FA";
const SOFT_GRAY = "#F1F3F5";
const TEXT = "#111827";
const TEXT_SECONDARY = "#667085";
const TEXT_MUTED = "#98A2B3";
const BORDER = "#E5E7EB";
const SUCCESS = "#22A06B";
const WARNING = "#F59E0B";

/* ---------- Shared building blocks (same pattern as the Bumper Mandi case study) ---------- */

function SectionNumber({ n }: { n: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-sm font-bold" style={{ color: BLUE }}>{n}</span>
      <span className="h-px flex-1 max-w-[48px]" style={{ background: BORDER }} />
    </div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className="text-[11px] font-bold uppercase tracking-[0.25em]"
      style={{ color: dark ? "rgba(255,255,255,0.6)" : TEXT_MUTED }}
    >
      {children}
    </p>
  );
}

type SectionBg = "white" | "gray" | "navy" | "lightblue";

function Section({ id, label, bg = "white", children }: { id: string; label?: string; bg?: SectionBg; children: ReactNode }) {
  const bgStyle =
    bg === "navy" ? { background: NAVY, color: WHITE }
      : bg === "gray" ? { background: GRAY_BG, color: TEXT }
        : bg === "lightblue" ? { background: LIGHT_BLUE, color: TEXT }
          : { background: WHITE, color: TEXT };
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28" style={bgStyle}>
      <div id={id} {...(label ? { "data-nav-section": true, "data-nav-label": label } : {})} className="mx-auto max-w-6xl scroll-mt-24">
        {children}
      </div>
    </section>
  );
}

function Card({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-7 ${className}`}
      style={{
        background: dark ? DARK_NAVY : WHITE,
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : BORDER}`,
      }}
    >
      {children}
    </div>
  );
}

function Pill({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "blue" }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
      style={
        tone === "blue"
          ? { background: LIGHT_BLUE, color: BLUE }
          : { background: WHITE, color: TEXT, border: `1px solid ${BORDER}` }
      }
    >
      {children}
    </span>
  );
}

function IconBadge({ icon: Icon, dark = false }: { icon: ElementType; dark?: boolean }) {
  return (
    <div
      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
      style={{ background: dark ? "rgba(47,128,237,0.16)" : LIGHT_BLUE, color: BLUE }}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[44px] font-bold leading-none sm:text-[52px]" style={{ color: BLUE }}>{value}</div>
      <div className="mt-3 text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>{label}</div>
    </div>
  );
}

/* ---------- Data ---------- */

const heroMeta = [
  { label: "ROLE", value: "Product Designer" },
  { label: "DURATION", value: "2 Weeks" },
  { label: "TOOLS", value: "Figma, FigJam" },
  { label: "PLATFORM", value: "Web — Desktop" },
];

const overviewCards = [
  {
    icon: FileSpreadsheet,
    label: "THE CHALLENGE",
    body: "Construction companies struggled with fragmented job cost tracking, manual approval workflows, and poor visibility into project status — spreadsheets, email chains, and phone calls led to duplicated data, version conflicts, and costly errors.",
  },
  {
    icon: Target,
    label: "THE GOAL",
    body: "Design an intuitive web platform that centralizes job management, automates approval routing, and provides real-time dashboards — replacing spreadsheets, automating approvals, improving visibility, and reducing approval bottlenecks.",
  },
  {
    icon: Compass,
    label: "MY ROLE",
    body: "Led end-to-end product design — user research, information architecture, interaction design, visual design, and design system creation. Sole designer embedded with engineering.",
  },
  {
    icon: Users,
    label: "THE TEAM",
    body: "1 Product Designer · 1 Project Manager · 2 Frontend Developers · 1 Backend Developer",
  },
];

const researchMethods = [
  "Stakeholder Interviews — 8",
  "Contextual Inquiry — 3 job sites",
  "Competitive Analysis — 5 tools",
  "Survey — 42 responses",
];

const insights = [
  { n: "01", stat: "78%", title: "Spreadsheet Dependency", body: "78% of superintendents tracked line items in spreadsheets, leading to version conflicts and cost overruns." },
  { n: "02", stat: "2–3 weeks", title: "Approval Bottlenecks", body: "Approval delays averaged 2–3 weeks per job draft, routed entirely through email." },
  { n: "03", stat: "Cross-job", title: "Need for Comparative Data", body: "PMs needed cross-job search to compare costs across locations and categories." },
  { n: "04", stat: "Role-based", title: "Granular Access Levels", body: "Different team members needed different levels of data visibility." },
];

const personas = [
  {
    n: "01",
    name: "Mike Reynolds",
    role: "Project Manager",
    age: "45",
    needs: ["Bird's-eye view of active jobs", "Quick cost reports", "Approval queue management"],
    quote: "I spend 2 hours a day chasing down line item approvals across email threads.",
  },
  {
    n: "02",
    name: "Sarah Chen",
    role: "Superintendent",
    age: "38",
    needs: ["Quickly add line items on-site", "Track permit costs by category", "Get notified on approvals"],
    quote: "By the time my spreadsheet reaches the PM, the numbers are already outdated.",
  },
];

const processSteps = [
  { label: "DISCOVER", body: "User interviews & site visits", emphasized: false },
  { label: "DEFINE", body: "Mapping core bottlenecks", emphasized: false },
  { label: "IDEATE", body: "Co-designing workflows", emphasized: false },
  { label: "DESIGN", body: "High-fidelity prototyping", emphasized: true },
  { label: "TEST", body: "Usability testing with PMs", emphasized: true },
  { label: "ITERATE", body: "Refining tabular density", emphasized: false },
];

const features = [
  {
    n: "01",
    icon: LayoutDashboard,
    title: "Report Dashboard",
    body: "Total jobs, approvals, on-going and completed work — with trend indicators and flexible date-range filtering across monthly, quarterly, and yearly views. The dashboard gives instant project-health visibility the moment a PM logs in.",
  },
  {
    n: "02",
    icon: ListChecks,
    title: "Job Detail & Line Items",
    body: "Job name, location, dates, costs, building specs, and the assigned PM and Superintendent — all above an enterprise-grade line-item table with quantity, price, status, and inline editing.",
  },
  {
    n: "03",
    icon: SlidersHorizontal,
    title: "Advanced Search & Filtering",
    body: "Filter by category, item, quantity range, location, job type, and date — with exportable results and configurable columns, so PMs can compare costs across projects in seconds instead of hunting through spreadsheets.",
  },
  {
    n: "04",
    icon: KeyRound,
    title: "Role-Based Access Control",
    body: "Five roles, four core resources, one permission matrix. Every screen respects it — from what a Superintendent can edit on-site to what only an Administrator can touch.",
  },
];

const permissionRows = ["Jobs", "Line Items", "User Management", "Role Management"];
const permissionCols = ["Administrator", "Super Admin", "Manager", "Project Manager", "Superintendent"];
// true = full access, "partial" = view/limited edit, false = no access
const permissionMatrix: (boolean | "partial")[][] = [
  [true, true, true, "partial", "partial"],
  [true, true, "partial", "partial", true],
  [true, true, false, false, false],
  [true, "partial", false, false, false],
];

const workflowStages = ["Draft", "Send for Approval", "Review", "Approved", "On-Going", "Completed"];

const allScreens: { src: string; alt: string; platform: "web" }[] = [
  { src: screenLogin, alt: "Echelon Constructors — login screen", platform: "web" },
  { src: screenDashboard, alt: "Echelon Constructors — report dashboard", platform: "web" },
  { src: screenJobsList, alt: "Echelon Constructors — jobs list with status filters", platform: "web" },
  { src: screenJobDetail, alt: "Echelon Constructors — job detail and line items", platform: "web" },
  { src: screenJobDetailAddItem, alt: "Echelon Constructors — adding a line item inline", platform: "web" },
  { src: screenLookup, alt: "Echelon Constructors — state/city look-up", platform: "web" },
  { src: screenRoleManagement, alt: "Echelon Constructors — role management", platform: "web" },
  { src: screenUserManagement, alt: "Echelon Constructors — user management table", platform: "web" },
  { src: screenProfile, alt: "Echelon Constructors — profile & change password", platform: "web" },
];

const resultsMetrics = [
  { value: "60%", label: "Reduction in approval turnaround time" },
  { value: "3.5 hrs", label: "Saved per PM per week on cost tracking" },
  { value: "100%", label: "Adoption across 3 regional offices in 2 months" },
  { value: "42%", label: "Fewer data entry errors vs. spreadsheet workflow" },
];

const reflections = [
  { n: "01", title: "Domain Immersion Pays Off", body: "Visiting job sites and shadowing superintendents gave me context no interview could. I designed better filter logic because I watched them search." },
  { n: "02", title: "Constraint-Driven Design", body: "Working with a small dev team meant ruthless scope. Every component served at least 3 screens — no one-off designs." },
  { n: "03", title: "Data Tables Need Love", body: "Iterated on column hierarchy, row density, and inline editing 5 times before landing on a version that worked for both PMs and Superintendents." },
];

/* ---------- Content ---------- */
/* Reused by both the standalone case-study page and the project bottom sheet,
   so the two entry points stay in sync automatically. */

export default function EchelonConstructorsCaseStudyContent({ activePlatform, onPlatformChange }: CaseStudyContentProps = {}) {
  return (
    <div style={{ background: WHITE, color: TEXT, fontFamily: "'Inter', sans-serif" }}>
      {/* 01 — Hero */}
      <section className="px-6 pb-16 pt-16 sm:px-10 sm:pt-20" style={{ background: NAVY, color: WHITE }}>
        <div className="mx-auto max-w-6xl">
          <Eyebrow dark>Product Design Case Study</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Echelon Constructors
          </h1>
          <p className="mt-3 text-lg font-semibold sm:text-xl" style={{ color: "rgba(255,255,255,0.7)" }}>
            Construction Project Management Platform
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            Streamlining job cost tracking, approval workflows, and team management for construction companies.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0">
            {heroMeta.map((m, i) => (
              <div
                key={m.label}
                className="sm:px-6"
                style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.12)" } : undefined}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</p>
                <p className="mt-1.5 text-sm font-semibold sm:text-base">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Project Overview */}
      <Section id="overview" label="Overview" bg="gray">
        <SectionNumber n="02" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: TEXT }}>Project Overview</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {overviewCards.map((c) => (
            <Card key={c.label}>
              <IconBadge icon={c.icon} />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>{c.label}</p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: TEXT_SECONDARY }}>{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Research & Discovery */}
      <Section id="research" label="Research" bg="white">
        <SectionNumber n="03" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Research &amp; Discovery</h2>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {researchMethods.map((m) => (
            <Pill key={m} tone="blue"><Search className="h-3.5 w-3.5" />{m}</Pill>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {insights.map((ins) => (
            <Card key={ins.n}>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>Insight {ins.n}</p>
              <div className="mt-3 text-4xl font-bold sm:text-5xl" style={{ color: BLUE }}>{ins.stat}</div>
              <h3 className="mt-3 text-base font-semibold">{ins.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>{ins.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 04 — User Personas */}
      <Section id="personas" label="Personas" bg="gray">
        <SectionNumber n="04" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">User Personas</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {personas.map((p) => (
            <Card key={p.n}>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>Persona {p.n}</p>
                <Pill tone="blue">{p.role}</Pill>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: LIGHT_BLUE, color: BLUE }}
                >
                  {p.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <p className="text-lg font-bold">{p.name}</p>
                  <p className="text-sm" style={{ color: TEXT_SECONDARY }}>{p.role} · Age {p.age}</p>
                </div>
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>Needs</p>
              <ul className="mt-2 space-y-1.5">
                {p.needs.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm" style={{ color: TEXT_SECONDARY }}>
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: BLUE }} />
                    {n}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl p-4" style={{ background: SOFT_GRAY }}>
                <Quote className="h-4 w-4" style={{ color: BLUE }} />
                <p className="mt-2 text-sm italic leading-relaxed" style={{ color: TEXT }}>&ldquo;{p.quote}&rdquo;</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — Design Process */}
      <Section id="process" label="Process" bg="white">
        <SectionNumber n="05" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Design Process</h2>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {processSteps.map((step, i) => (
            <div key={step.label} className="relative">
              <div className="mb-4 hidden h-px lg:block" style={{ background: i === 0 ? "transparent" : BORDER }} />
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: step.emphasized ? BLUE : WHITE,
                  color: step.emphasized ? WHITE : TEXT_SECONDARY,
                  border: `1.5px solid ${step.emphasized ? BLUE : BORDER}`,
                }}
              >
                {i + 1}
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em]" style={{ color: step.emphasized ? BLUE : TEXT }}>{step.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: TEXT_SECONDARY }}>{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 06 — Key Features & Solutions */}
      <Section id="features" label="Features" bg="gray">
        <SectionNumber n="06" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Features &amp; Solutions</h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.n}>
              <IconBadge icon={f.icon} />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>{f.n} · {f.title}</p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: TEXT_SECONDARY }}>{f.body}</p>
            </Card>
          ))}
        </div>

        {/* Role-based access control — permission matrix */}
        <div className="mt-8">
          <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${BORDER}` }}>
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr style={{ background: SOFT_GRAY }}>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: TEXT_MUTED }}>Resource</th>
                  {permissionCols.map((c) => (
                    <th key={c} className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider" style={{ color: TEXT_MUTED }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionRows.map((row, ri) => (
                  <tr key={row} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td className="px-4 py-3 text-sm font-semibold" style={{ color: TEXT }}>{row}</td>
                    {permissionMatrix[ri].map((state, ci) => (
                      <td key={ci} className="px-3 py-3 text-center">
                        {state === true ? (
                          <Check className="mx-auto h-4 w-4" style={{ color: SUCCESS }} strokeWidth={3} />
                        ) : state === "partial" ? (
                          <Minus className="mx-auto h-4 w-4" style={{ color: WARNING }} strokeWidth={3} />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 opacity-20" style={{ color: TEXT_MUTED }} strokeWidth={3} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product UI showcase — every screen, browsable */}
        <div className="mt-16">
          <MockupGallery mockups={allScreens} activePlatform={activePlatform} onPlatformChange={onPlatformChange} />
        </div>
      </Section>

      {/* 07 — Approval Workflow */}
      <Section id="workflow" label="Workflow" bg="navy">
        <SectionNumber n="07" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Approval Workflow</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
          Replaced email-based approvals with an in-app workflow. Job drafts are submitted, PMs approve with one
          click, and status updates propagate across the dashboard in real time.
        </p>

        <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
          {workflowStages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3 lg:flex-1">
              <div
                className="flex-1 rounded-xl px-4 py-3.5 text-center text-sm font-semibold"
                style={
                  stage === "Approved"
                    ? { background: BLUE, color: WHITE }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)" }
                }
              >
                {stage}
              </div>
              {i < workflowStages.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 lg:block" style={{ color: "rgba(255,255,255,0.25)" }} />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 08 — Results & Impact */}
      <Section id="impact" label="Impact" bg="gray">
        <SectionNumber n="08" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Results &amp; Impact</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resultsMetrics.map((m) => (
            <Card key={m.label}>
              <StatBlock value={m.value} label={m.label} />
            </Card>
          ))}
        </div>

        <Card dark className="mt-8">
          <Quote className="h-6 w-6" style={{ color: BLUE }} />
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white sm:text-xl">
            &ldquo;This tool transformed how we manage job costs. What used to take days of back-and-forth now
            happens in minutes.&rdquo;
          </p>
          <p className="mt-5 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
            VP of Operations
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Echelon Constructors LLC</p>
        </Card>
      </Section>

      {/* 09 — Reflections & Learnings */}
      <Section id="reflections" label="Reflections" bg="white">
        <SectionNumber n="09" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Reflections &amp; Learnings</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {reflections.map((r) => (
            <div key={r.n}>
              <p className="text-3xl font-bold" style={{ color: "rgba(47,128,237,0.18)" }}>{r.n}</p>
              <h3 className="mt-2 text-base font-bold">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 11 — Footer / Contact */}
      <section className="px-6 py-16 sm:px-10" style={{ background: NAVY, color: WHITE }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <img src={iconEchelon} alt="" className="h-10 w-10" />
          <div>
            <p className="text-lg font-bold">Echelon Constructors</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Construction Project Management Platform</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/design"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ background: BLUE, color: WHITE }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Design Projects
            </Link>
            <a
              href="https://www.linkedin.com/in/rajuxstudio/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Linkedin className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="mailto:raju@xstudio.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>© 2024 Designed with care.</p>
        </div>
      </section>
    </div>
  );
}
