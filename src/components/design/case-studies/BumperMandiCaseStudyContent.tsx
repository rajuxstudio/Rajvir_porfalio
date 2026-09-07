import type { ElementType, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Smartphone,
  Monitor,
  TrendingUp,
  FileWarning,
  EyeOff,
  Clock,
  Landmark,
  Truck,
  Radio,
  Gavel,
  ClipboardList,
  Eye,
  Target,
  Globe2,
  Wifi,
  Quote,
  Kanban,
  Smile,
  Zap,
  Linkedin,
  Dribbble,
  Twitter,
  Mail,
} from "lucide-react";
import MockupGallery from "@/components/design/components/MockupGallery";
// TODO: add the splash/loading screen and prepend it as the first "mobile" entry below once available.
import mobileLanding from "@/assets/bumper-mandi/mobile/landing.png";
import mobileAccount from "@/assets/bumper-mandi/mobile/account-creation.png";
import mobileProcessFlow from "@/assets/bumper-mandi/mobile/process-flow.png";
import mobileVisits from "@/assets/bumper-mandi/mobile/visits.png";
import mobileScheduleVisit from "@/assets/bumper-mandi/mobile/schedule-visit.png";
import webLanding from "@/assets/bumper-mandi/web/login.png";
import webProcessFlow from "@/assets/bumper-mandi/web/process-flow.png";
import webGroupByStatus from "@/assets/bumper-mandi/web/process-flow-grouped.png";
import webLotDetail from "@/assets/bumper-mandi/web/lot-detail.png";
import type { CaseStudyContentProps } from "@/components/design/projects/types";

const ORANGE = "#F97316";
const AMBER = "#F59E0B";
const CREAM = "#FFF8F0";
const CHARCOAL = "#1A1A1A";
const NAVY = "#141E55";
const RED = "#EF4444";
const GREY = "#64748B";
const GRADIENT = `linear-gradient(135deg, ${ORANGE}, ${AMBER})`;

/* ---------- Shared building blocks ---------- */

function FadedNumber({ n }: { n: string }) {
  return (
    <div
      className="select-none text-[64px] font-black leading-none sm:text-[100px]"
      style={{ color: "rgba(249,115,22,0.14)" }}
    >
      {n}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-black/5 sm:text-sm"
      style={{ color: CHARCOAL }}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}

function IconBadge({ icon: Icon }: { icon: ElementType }) {
  return (
    <div
      className="mb-4 flex h-11 w-11 items-center justify-center rounded-full text-white"
      style={{ background: GRADIENT }}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

type SectionBg = "cream" | "white" | "navy";

function Section({
  id,
  label,
  bg = "cream",
  children,
}: {
  id: string;
  /** Omit for closing/footer-style sections that shouldn't show up in the bottom nav. */
  label?: string;
  bg?: SectionBg;
  children: ReactNode;
}) {
  const bgStyle =
    bg === "navy"
      ? { background: NAVY, color: "#fff" }
      : bg === "white"
        ? { background: "#fff", color: CHARCOAL }
        : { background: CREAM, color: CHARCOAL };
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28" style={bgStyle}>
      <div id={id} {...(label ? { "data-nav-section": true, "data-nav-label": label } : {})} className="mx-auto max-w-6xl scroll-mt-24">
        {children}
      </div>
    </section>
  );
}

function WireframeCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-4">
      <div className="mb-3 h-3 w-2/3 rounded bg-gray-300" />
      <div className="space-y-2">
        <div className="h-16 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-300" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
      </div>
      <div className="mt-4 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </div>
    </div>
  );
}

function ChaosIllustration() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-10" style={{ background: `linear-gradient(135deg, ${NAVY}, #24316e)` }}>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Truck
            key={i}
            className="h-8 w-8 text-white/40"
            style={{ transform: `rotate(${(i % 2 ? -1 : 1) * (4 + i * 2)}deg)` }}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <FileWarning
            key={i}
            className="h-5 w-5 text-white/25"
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (6 + i * 3)}deg)` }}
          />
        ))}
      </div>
      <p className="relative z-10 mt-6 text-center text-sm text-white/70">
        Crowded gates. Paper everywhere. No visibility.
      </p>
    </div>
  );
}

/* ---------- Data ---------- */

const problems = [
  { icon: FileWarning, title: "Paper-Based Processes", body: "All commodity intake, quality testing, and weighing records manually maintained on paper slips, leading to data loss, errors, and payment disputes." },
  { icon: EyeOff, title: "No Real-Time Visibility", body: "Mandi operators have zero transparency on where trucks/crop lots are after gate entry, relying on phone calls." },
  { icon: Clock, title: "Intake Scheduling Chaos", body: "Farmers arrive spontaneously causing 8-hour gate wait times." },
  { icon: Landmark, title: "Payment Settlement Delays", body: "Financial clearance takes days due to manual tax slips, weight reports, and paper audit trails." },
];

const legacyFlow = [
  { icon: Truck, label: "Arrival", pain: "No queue control" },
  { icon: ClipboardList, label: "Gate Pass", pain: "Handwritten slip" },
  { icon: Landmark, label: "Weighing", pain: "Manual logging" },
  { icon: Eye, label: "Sampling", pain: "Arbitrary visual check" },
  { icon: Gavel, label: "Auction", pain: "Verbal bids" },
  { icon: Clock, label: "Settlement", pain: "3–5 day delay" },
];

const opportunities = [
  { n: "01", title: "Continuous Real-Time Tracking", body: "End-to-end trace visibility eliminates operational blind spots." },
  { n: "02", title: "Immutable Digital Records", body: "Transparent verifiable ledger eliminates disputes by up to 80%." },
  { n: "03", title: "Intelligent Scheduled Slots", body: "Mobile appointment calendar smooths peak arrivals into optimized queues." },
];

const designPrinciples = [
  { icon: Radio, label: "Real-time Transparency" },
  { icon: Smartphone, label: "Mobile-First Field Usability" },
  { icon: Monitor, label: "Desktop Operational Dashboard" },
  { icon: Globe2, label: "Bilingual (Hindi + English)" },
  { icon: Wifi, label: "Works in low-bandwidth zones" },
];

const legacyStages = [
  { title: "Gate Entry", body: "Unplanned truck arrivals create bottleneck gridlocks outside." },
  { title: "Weighbridge", body: "Operators transcribe raw measurements onto vulnerable paper pads." },
  { title: "Sampling Lab", body: "Grading rests on manual inspection and subjective estimation." },
  { title: "Bidding Yard", body: "Buyers shout pricing bids verbally, creating high margin leaks." },
];

const designDecisions = [
  { icon: Kanban, title: "Kanban over Table View", body: "Kanban columns mapped to physical mandi stages (Pre-Gate → Gate → WeighBridge → Sampling → Lab-Test) because operators think in spatial/stage terms." },
  { icon: Smartphone, title: "Mobile-First for Farmers", body: "Large touch targets, high contrast for sunlight, offline-capable forms for outdoor use." },
  { icon: Globe2, title: "Bilingual Toggle", body: "Real-time English ↔ Hindi toggle at every screen level." },
];

const interactionDecisions = [
  "Color-coded status badges for instant vehicle stage identification.",
  "Time-slot grouping in Kanban columns mirrors physical mandi daily schedules.",
  "Swipe-to-action on mobile cards for rapid field operators' gate approvals.",
];

const impactStats = [
  { value: "30+", label: "Screens", body: "Designed across mobile & web" },
  { value: "7", label: "Process Stages", body: "Fully digitized end-to-end" },
  { value: "85%", label: "Faster", body: "Gate processing time reduced" },
  { value: "2", label: "Platforms", body: "Android App + Web Dashboard" },
];

const improvements = [
  "Farmers now schedule slots via app, bypassing 6-hour highway queues.",
  "Mandi management gains granular live tracking from admission to exit.",
  "Financial settlements that lagged over a week now clear in under 24 hours.",
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rajuxstudio/" },
  { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Mail, label: "Email", href: "mailto:raju@xstudio.com" },
];

/* ---------- Content (sections 01-10 + closing) ---------- */
/* Reused by both the standalone case-study page and the project bottom sheet,
   so the two entry points stay in sync automatically. */

export default function BumperMandiCaseStudyContent({ activePlatform, onPlatformChange }: CaseStudyContentProps = {}) {
  return (
    <div style={{ background: CREAM, color: CHARCOAL, fontFamily: "'Inter', sans-serif" }}>
      {/* Condensed intro strip — the outer shell (ProjectHero / page header) already shows icon + title */}
      <div className="px-6 pb-4 pt-10 text-center sm:px-10">
        <p className="mx-auto max-w-xl text-sm sm:text-base" style={{ color: GREY }}>
          Digitizing India's agricultural marketplace — bringing transparency, speed, and trust to
          agri-trade, across Mobile (Android) and a Web Desktop Dashboard.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Pill>UI/UX Design</Pill>
          <Pill>Mobile & Web</Pill>
          <Pill>2025 Release</Pill>
          <Pill>6 Months Timeline</Pill>
          <Pill>Lead Designer</Pill>
        </div>
      </div>

      {/* 01 — The Product */}
      <Section id="product" label="Product" bg="cream">
        <FadedNumber n="01" />
        <div className="mt-2 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">The Product</h2>
            <p className="mt-3 text-lg font-bold" style={{ color: ORANGE }}>
              Transforming how India's agricultural mandis operate by digitizing manual agri-trade.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: GREY }}>
              Bumper Mandi is a comprehensive digital platform that replaces manual, paper-heavy
              commodity trading with a secure, real-time ecosystem. By connecting farmers,
              operators, and buyers under a single unified dashboard, we remove friction points at
              every stage — from appointment creation to terminal payment.
            </p>
          </div>
          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2 text-sm font-bold"><Users className="h-4 w-4" style={{ color: ORANGE }} /> Who Uses It?</div>
              <p className="mt-2 text-sm" style={{ color: GREY }}>
                Farmers, Commission Agents (Sellers), Mandi Operators, Quality Lab Analysts, Corporate Buyers.
              </p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 text-sm font-bold"><Smartphone className="h-4 w-4" style={{ color: ORANGE }} /> Integrated Platforms</div>
              <p className="mt-2 text-sm" style={{ color: GREY }}>
                Lightweight Mobile App (Android) for field staff, paired with a robust Desktop Web Dashboard for central management.
              </p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 text-sm font-bold"><TrendingUp className="h-4 w-4" style={{ color: ORANGE }} /> Business Context</div>
              <p className="mt-2 text-sm" style={{ color: GREY }}>
                India's mandi network channels billions in harvest crops daily, yet 95% of records remain manual.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* 02 — The Problem */}
      <Section id="problem" label="Problem" bg="white">
        <FadedNumber n="02" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">The Problem</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {problems.map((p) => (
            <Card key={p.title}>
              <IconBadge icon={p.icon} />
              <h3 className="text-base font-bold">{p.title}</h3>
              <p className="mt-2 text-sm" style={{ color: GREY }}>{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Understanding the Problem */}
      <Section id="research" label="Research" bg="cream">
        <FadedNumber n="03" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Understanding the Problem</h2>
        <p className="mt-4 max-w-2xl" style={{ color: GREY }}>
          Field research in 3 major mandis across Rajasthan (Kota, Baran & Bundi), shadowing
          farmers, weighbridge operators, and commission agents.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Card className="relative">
            <Quote className="h-6 w-6" style={{ color: ORANGE }} />
            <p className="mt-3 italic" style={{ color: CHARCOAL }}>
              "I drive 40km with my crop only to find a 200-truck queue at the gate. I end up
              waiting 6 hours under the sun."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: GRADIENT }}>R</div>
              <div>
                <div className="text-sm font-bold">Ramesh K.</div>
                <div className="text-xs" style={{ color: GREY }}>Farmer, Kota Mandi Seller</div>
              </div>
            </div>
          </Card>
          <Card className="relative">
            <Quote className="h-6 w-6" style={{ color: ORANGE }} />
            <p className="mt-3 italic" style={{ color: CHARCOAL }}>
              "Once a truck enters the auction yard, we lose trace of it. If a buyer contests
              quality, we spend hours searching for physical paper test reports."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: GRADIENT }}>M</div>
              <div>
                <div className="text-sm font-bold">Maan Singh</div>
                <div className="text-xs" style={{ color: GREY }}>Mandi Agent, Agri-Trade Seller</div>
              </div>
            </div>
          </Card>
        </div>

        <h3 className="mt-12 text-sm font-bold uppercase tracking-wider" style={{ color: GREY }}>
          Existing Physical Workflow & Pain Points
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {legacyFlow.map((step, i) => (
            <div key={step.label} className="relative rounded-2xl bg-white p-4 text-center shadow-sm">
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: RED }} />
              <step.icon className="mx-auto h-5 w-5" style={{ color: ORANGE }} />
              <div className="mt-2 text-xs font-bold">{i + 1}. {step.label}</div>
              <div className="mt-1 text-[11px]" style={{ color: GREY }}>{step.pain}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — Defining the Opportunity */}
      <Section id="opportunity" label="Opportunity" bg="white">
        <FadedNumber n="04" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Defining the Opportunity</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {opportunities.map((o) => (
            <Card key={o.n}>
              <div className="text-3xl font-black" style={{ color: `${ORANGE}33` }}>{o.n}</div>
              <h3 className="mt-2 text-base font-bold">{o.title}</h3>
              <p className="mt-2 text-sm" style={{ color: GREY }}>{o.body}</p>
            </Card>
          ))}
        </div>

        <h3 className="mt-12 text-sm font-bold uppercase tracking-wider" style={{ color: GREY }}>
          Core Design Principles
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {designPrinciples.map((p) => (
            <Pill key={p.label}>
              <p.icon className="h-3.5 w-3.5" style={{ color: ORANGE }} />
              {p.label}
            </Pill>
          ))}
        </div>
      </Section>

      {/* 05 — The Existing Experience */}
      <Section id="legacy" label="Before" bg="cream">
        <FadedNumber n="05" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">The Existing Experience — Before</h2>
        <div className="mt-8">
          <ChaosIllustration />
        </div>

        <h3 className="mt-12 text-sm font-bold uppercase tracking-wider" style={{ color: GREY }}>
          Key Pain Points in the Manual Flow
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {legacyStages.map((s) => (
            <Card key={s.title}>
              <h4 className="text-sm font-bold">{s.title}</h4>
              <p className="mt-2 text-xs" style={{ color: GREY }}>{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 06 — Design Exploration */}
      <Section id="exploration" label="Exploration" bg="white">
        <FadedNumber n="06" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Design Exploration</h2>
        <p className="mt-3 font-bold" style={{ color: ORANGE }}>Wireframes & Iterations</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <WireframeCard title="Lo-fi Mobile Home Screen" />
          <WireframeCard title="Lo-fi Desktop Kanban Board" />
          <WireframeCard title="Lo-fi Appointment Scheduler" />
        </div>

        <h3 className="mt-12 text-sm font-bold uppercase tracking-wider" style={{ color: GREY }}>
          Key Design Decisions
        </h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {designDecisions.map((d) => (
            <Card key={d.title}>
              <IconBadge icon={d.icon} />
              <h4 className="text-sm font-bold">{d.title}</h4>
              <p className="mt-2 text-xs" style={{ color: GREY }}>{d.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 07 — The Solution (hero) */}
      <Section id="solution" label="Solution" bg="cream">
        <FadedNumber n="07" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">The Solution</h2>
        <p className="mt-3 font-bold" style={{ color: ORANGE }}>Mobile App — Web & Mobile</p>

        {/* App screens — switch between Mobile / Web (add a "tablet" entry here if the app ships one). */}
        {/* TODO: prepend the splash/loading screen to the "mobile" list once that screenshot is added. */}
        <div className="mt-10">
          <MockupGallery
            mockups={[
              { src: mobileLanding, alt: "Bumper Mandi mobile — Get Started, join the seller community", platform: "mobile" },
              { src: mobileAccount, alt: "Bumper Mandi mobile — create account / login to schedule a visit", platform: "mobile" },
              { src: mobileProcessFlow, alt: "Bumper Mandi mobile — process flow (Pre-Gate, Gate, WeighBridge…)", platform: "mobile" },
              { src: mobileVisits, alt: "Bumper Mandi mobile — visits list", platform: "mobile" },
              { src: mobileScheduleVisit, alt: "Bumper Mandi mobile — schedule a visit", platform: "mobile" },
              { src: webLanding, alt: "Bumper Mandi web — login / landing screen", platform: "web" },
              { src: webProcessFlow, alt: "Bumper Mandi web — process flow, time-slot Kanban columns", platform: "web" },
              { src: webGroupByStatus, alt: "Bumper Mandi web — process flow grouped by status", platform: "web" },
              { src: webLotDetail, alt: "Bumper Mandi web — lot detail & gate pass panel", platform: "web" },
            ]}
            activePlatform={activePlatform}
            onPlatformChange={onPlatformChange}
          />
        </div>

        <h3 className="mt-14 text-sm font-bold uppercase tracking-wider" style={{ color: GREY }}>
          Key Interaction Decisions
        </h3>
        <ol className="mt-4 space-y-3">
          {interactionDecisions.map((d, i) => (
            <li key={d} className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm shadow-sm">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: GRADIENT }}
              >
                {i + 1}
              </span>
              <span style={{ color: CHARCOAL }}>{d}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* 08 — Outcome & Impact */}
      <Section id="impact" label="Impact" bg="cream">
        <FadedNumber n="08" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Outcome & Impact</h2>
        <p className="mt-3 font-bold" style={{ color: ORANGE }}>Tangible results from digitization</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((s) => (
            <Card key={s.label} className="text-center">
              <div className="text-4xl font-black" style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </div>
              <div className="mt-2 text-sm font-bold">{s.label}</div>
              <div className="mt-1 text-xs" style={{ color: GREY }}>{s.body}</div>
            </Card>
          ))}
        </div>

        <h3 className="mt-12 text-sm font-bold uppercase tracking-wider" style={{ color: GREY }}>
          What Improved
        </h3>
        <div className="mt-4 space-y-3">
          {improvements.map((imp) => (
            <div key={imp} className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm shadow-sm">
              <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} />
              <span style={{ color: CHARCOAL }}>{imp}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 09 — Reflection */}
      <Section id="reflection" label="Reflection" bg="white">
        <FadedNumber n="09" />
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Reflection</h2>
        <p className="mt-3 font-bold" style={{ color: ORANGE }}>Key takeaways and next steps</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Card>
            <div className="flex items-center gap-2 text-sm font-bold"><Smile className="h-4 w-4" style={{ color: ORANGE }} /> What I Learned</div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: GREY }}>
              Designing for India's agricultural sector required deep empathy beyond desk research.
              Understanding extreme sun glare, ambient noise, and crop dust drove our high-contrast,
              large-tap-target mobile design. Technology succeeds only when it honors operators'
              natural mental maps.
            </p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 text-sm font-bold"><Target className="h-4 w-4" style={{ color: ORANGE }} /> What I'd Improve</div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: GREY }}>
              An offline-first synchronized architecture for remote sub-mandis, plus simplified
              voice-input logging in regional dialects for elderly or low-literacy farmers.
            </p>
          </Card>
        </div>
      </Section>

      {/* Thank you / navy close */}
      <Section id="thanks" bg="navy">
        <div className="py-10 text-center">
          <h2 className="text-4xl font-black sm:text-6xl">Thank You</h2>
          <p className="mt-4 text-sm text-white/60">Designed by Rajveer · Case Study Lead Designer · Release 2025</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <s.icon className="h-4.5 w-4.5" strokeWidth={2} />
              </a>
            ))}
          </div>
          <Link
            to="/design"
            className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
            style={{ background: GRADIENT }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Design Projects
          </Link>
        </div>
      </Section>
    </div>
  );
}
