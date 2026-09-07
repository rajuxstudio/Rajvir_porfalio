import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Linkedin,
  Clock,
  Radio,
  AlertTriangle,
  Zap,
  Layers,
  ShieldCheck,
  Focus,
  Car,
  Search,
  ClipboardCheck,
  Gauge,
  History,
} from "lucide-react";
import iconLenss from "@/assets/lenss/lenss_logo_icon_badge.svg";
import MockupGallery from "@/components/design/components/MockupGallery";
import { Section, SectionNumber, Badge, Card, Pill, IconBadge, StatBlock, type Accent } from "@/components/design/components/CaseStudyKit";
import screenLogin from "@/assets/lenss/mockup/lenss_landing.png";
import screenHome from "@/assets/lenss/mockup/lenss_dashboard.png";
import screenActivityLog from "@/assets/lenss/mockup/lenss_activity.png";
import screenInvestigation from "@/assets/lenss/mockup/lenss_Investigation.png";
import screenDispatch from "@/assets/lenss/mockup/lenss_Dispatch.png";
import userFlowDiagram from "@/assets/lenss/mockup/user-flow.svg";
import type { CaseStudyContentProps } from "@/components/design/projects/types";

/* LENSS's brand accent — cyan, paired with a dark: variant so it stays legible
   in both themes. Structure (Section/Card/Pill/...) comes from the shared kit,
   so every case study shares the same layout and is light/dark aware. */
const ACCENT: Accent = {
  text: "text-cyan-600 dark:text-cyan-400",
  bg: "bg-cyan-500",
  softBg: "bg-cyan-500/10",
  border: "border-cyan-500",
};

/* ---------- Data (sourced directly from the LENSS case-study deck) ---------- */

const heroMeta = [
  { label: "MY ROLE", value: "Lead UI/UX Designer" },
  { label: "PLATFORM", value: "Mobile (iOS / Android)" },
  { label: "CLIENT", value: "Entrical / Public Safety" },
  { label: "DOMAIN", value: "CJIS Compliant / Security" },
];

const problems = [
  { icon: Clock, title: "Extremely Slow", body: "Average wait time per query exceeds 3+ minutes, leaving officers vulnerable on the side of active roads." },
  { icon: Radio, title: "Security Risks", body: "Sensitive civilian data and criminal records are spoken over unencrypted open radio channels." },
  { icon: AlertTriangle, title: "Human Error", body: "Verbal spelling of names and license strings routinely leads to transcript mistakes and missed warrants." },
];

const designGoals = [
  { n: "01", icon: Zap, title: "Speed", body: "Plate scan to results in under 10 seconds. Minimize time-to-safety on dangerous highway shoulders." },
  { n: "02", icon: Layers, title: "Clarity", body: "Complex raw state database fields must be organized and easily scannable on small devices." },
  { n: "03", icon: ShieldCheck, title: "Security", body: "Built-in support for biometric authorization and multi-factor compliance matching rigorous FBI standards." },
  { n: "04", icon: Focus, title: "No Distraction", body: "Interfaces must utilize high-contrast, large touch-targets so officers can act under high-stress field conditions." },
];

const personas = [
  { icon: Car, role: "Patrol", name: "Patrol Officers", body: "Needs quick vehicle and warrant checks with minimal taps during immediate roadside traffic stops." },
  { icon: Search, role: "Detective", name: "Detectives", body: "Performs deep searches investigating criminal history, prior addresses, and active prior investigations." },
  { icon: Radio, role: "Dispatch", name: "Dispatchers", body: "Runs batch queries on behalf of units in active pursuits, while managing the digital activity log." },
  { icon: ClipboardCheck, role: "Command", name: "Supervisors", body: "Reviews field stop logs, prints incident history files, and audits unit compliance logs." },
];

const decisions = [
  {
    n: "01",
    icon: Gauge,
    title: "Quick Tag as Default Home",
    body: "Recognizing the extreme prioritization of the roadside stop task, the interface eliminates complex sub-menus. The screen exposes immediate buttons for License Plate, Drivers License, and Query search vectors, reducing the initial setup phase to zero seconds.",
    kpiValue: "-95%",
    kpiLabel: "In average interaction steps to initiate query",
  },
  {
    n: "02",
    icon: History,
    title: "Investigation as a Living Timeline",
    body: "Field stops evolve dynamically. By treating the record as a living, persistent timeline, queries are automatically cataloged under a parent ticket. This allows multiple units to feed state details, photo matches, and prior local arrests into a single shared log as they happen.",
    kpiValue: "Real-Time",
    kpiLabel: "Sync speed across units and dispatch consoles",
  },
  {
    n: "03",
    icon: Layers,
    title: "Layered Data Hierarchy",
    body: "State databases often return over 25+ parameters on a single record. Progressive disclosure was utilized: primary indicators (Active Warrants, Arrest Status) receive bold, color-coded header space, while standard technical details (Vehicle Weight, DMV Class) fold into secondary scroll sections.",
    kpiValue: "Scannable",
    kpiLabel: "Information architecture resolved for glare and speed",
  },
];

const allScreens: { src: string; alt: string; platform: "mobile" }[] = [
  { src: screenLogin, alt: "LENSS — login with Face ID verification", platform: "mobile" },
  { src: screenHome, alt: "LENSS — Quick Tag home, create new investigation", platform: "mobile" },
  { src: screenDispatch, alt: "LENSS — Dispatch mode, run queries for a field officer", platform: "mobile" },
  { src: screenActivityLog, alt: "LENSS — activity log with filters", platform: "mobile" },
  { src: screenInvestigation, alt: "LENSS — investigation detail, traffic stop summary return", platform: "mobile" },
];

const outcomes = [
  { value: "<10s", label: "Average Query Speed", body: "Down from 3+ minutes during traditional vocal radio relays." },
  { value: "5x", label: "Simultaneous Support", body: "Dispatch can monitor multiple operations through non-blocking status updates." },
  { value: "42", label: "Designed Screens", body: "Fully optimized layouts for Face ID, MFA, dark-mode, and system settings." },
  { value: "100%", label: "CJIS Compliance", body: "Successfully certified by independent public safety compliance audits." },
];

const lessons = [
  { n: "01", title: "Domain Immersion is Non-Negotiable", body: "Designing for law enforcement means spending time sitting in cruisers. Observing officers navigate real field situations helped map user patterns that a standard workshop could never surface." },
  { n: "02", title: "Speed is Safety", body: "Every secondary screen, redundant tap, or unread notification counts as critical seconds that the officer is looking down at a device instead of surveying their physical surroundings." },
  { n: "03", title: "Data Hierarchy > Data Completeness", body: "Throwing every data column onto the screen overwhelms the user. Creating logical progressive disclosures provides immediate confidence and clean cognitive offloading." },
  { n: "04", title: "Design for the Worst Context", body: "Cruisers at night, glaring noon sunlight, handling weapons, wearing gloves, and working high-adrenaline conditions are all typical user spaces. High-contrast themes are requirements, not visual aesthetics." },
];

/* ---------- Content ---------- */
/* Reused by both the standalone case-study page and the project bottom sheet,
   so the two entry points stay in sync automatically. */

export default function LenssCaseStudyContent({ activePlatform, onPlatformChange }: CaseStudyContentProps = {}) {
  return (
    <div className="bg-background font-['Inter',sans-serif] text-foreground">
      {/* Hero */}
      <section className="bg-background px-6 pb-16 pt-16 text-foreground sm:px-10 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <Badge accent={ACCENT}>Case Study</Badge>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            LENSS
          </h1>
          <p className="mt-3 text-lg font-semibold text-muted-foreground sm:text-xl">
            Law Enforcement Network Search System
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Replacing slow, radio-based queries with instant, secure, real-time field intelligence.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-4 sm:gap-0 sm:p-8">
            {heroMeta.map((m, i) => (
              <div key={m.label} className={`sm:px-6 ${i > 0 ? "sm:border-l sm:border-border" : ""}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{m.label}</p>
                <p className="mt-1.5 text-sm font-semibold sm:text-base">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — The Problem */}
      <Section id="problem" label="Problem">
        <SectionNumber n="01" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Problem</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Law enforcement officers traditionally rely on radio dispatchers to run vehicle plates, driver's licenses,
          and warrant checks — a manual pipeline loaded with vulnerabilities.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {problems.map((p) => (
            <Card key={p.title}>
              <IconBadge icon={p.icon} accent={ACCENT} />
              <h3 className="text-base font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 02 — Design Goals */}
      <Section id="goals" label="Goals">
        <SectionNumber n="02" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Design Goals</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {designGoals.map((g) => (
            <Card key={g.n}>
              <IconBadge icon={g.icon} accent={ACCENT} />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{g.n} · {g.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Target User Profiles */}
      <Section id="personas" label="Personas">
        <SectionNumber n="03" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Target User Profiles</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <Card key={p.role}>
              <IconBadge icon={p.icon} accent={ACCENT} />
              <Pill accent={ACCENT}>{p.role}</Pill>
              <h3 className="mt-3 text-base font-bold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 04 — User Flow */}
      <Section id="flow" label="User Flow">
        <SectionNumber n="04" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">User Flow</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Five stages, from first login to the final intelligence return — the real screen-to-screen path an
          officer follows in the field.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card p-2 sm:p-4">
          <img src={userFlowDiagram} alt="LENSS user flow — five stages from login to intelligence return" className="w-full" />
        </div>
      </Section>

      {/* 05 — Key Design Decisions */}
      <Section id="decisions" label="Decisions">
        <SectionNumber n="05" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Design Decisions</h2>

        <div className="mt-10 space-y-5">
          {decisions.map((d) => (
            <Card key={d.n} className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <IconBadge icon={d.icon} accent={ACCENT} />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Decision {d.n}</p>
                <h3 className="mt-1 text-lg font-bold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{d.body}</p>
              </div>
              <div className="rounded-xl bg-cyan-500/10 px-5 py-4 text-center sm:min-w-[180px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">KPI Impact</p>
                <p className="mt-1 text-2xl font-bold text-cyan-600 dark:text-cyan-400">{d.kpiValue}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{d.kpiLabel}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Product UI showcase — every screen, browsable */}
        <div className="mt-16">
          <MockupGallery mockups={allScreens} activePlatform={activePlatform} onPlatformChange={onPlatformChange} />
        </div>
      </Section>

      {/* 06 — Outcomes & Impact */}
      <Section id="impact" label="Impact">
        <SectionNumber n="06" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Outcomes &amp; Impact</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <Card key={o.label}>
              <StatBlock value={o.value} label={o.label} accent={ACCENT} />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 07 — Lessons Learned */}
      <Section id="lessons" label="Lessons">
        <SectionNumber n="07" accent={ACCENT} />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lessons Learned</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {lessons.map((l) => (
            <Card key={l.n} className="flex gap-4">
              <span className="shrink-0 text-3xl font-bold text-cyan-500/25">{l.n}</span>
              <div>
                <h3 className="text-base font-bold">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Footer / Contact */}
      <section className="border-t border-border bg-card px-6 py-16 text-foreground sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <img src={iconLenss} alt="" className="h-10 w-10" />
          <div>
            <p className="text-lg font-bold">LENSS</p>
            <p className="text-sm text-muted-foreground">Law Enforcement Network Search System</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/design"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-400 dark:text-background dark:hover:bg-cyan-300"
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
