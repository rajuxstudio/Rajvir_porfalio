import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  Figma,
  Palette,
  Image as ImageIcon,
  PenTool,
  Layers,
  Globe,
} from "lucide-react";
import { PROFILE } from "./IdCard";

type Experience = {
  period: string;
  title: string;
  company: string;
  type: string;
  location?: string;
  points: string[];
  skills: string[];
};

const experiences: Experience[] = [
  {
    period: "Mar 2025 – Present",
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    type: "Freelance",
    points: [
      "Designing product interfaces for startups",
      "Building scalable design systems",
      "Creating user flows and interaction patterns",
    ],
    skills: ["Figma", "Design Systems", "User Flows", "Prototyping"],
  },
  {
    period: "Aug 2025 – Sep 2025",
    title: "UX/UI Designer",
    company: "HummingWave Technologies Pvt. Ltd.",
    type: "Part-time",
    location: "Bangalore",
    points: [
      "UX improvements for product interfaces",
      "Interface execution and design QA",
      "Cross-functional collaboration with engineering",
    ],
    skills: ["UX Research", "Interface Design", "Collaboration"],
  },
  {
    period: "May 2022 – Mar 2025",
    title: "UX/UI Designer",
    company: "FusionStack LLC",
    type: "Full-time",
    location: "Hybrid · Pune",
    points: [
      "Enterprise SaaS interface design",
      "Built interaction systems and component libraries",
      "Designed scalable product experiences",
      "Worked closely with engineering teams",
    ],
    skills: ["SaaS", "Enterprise", "Design Systems", "Product Design"],
  },
  {
    period: "Jan 2022 – May 2022",
    title: "Freelance UX/UI Designer",
    company: "Self-employed",
    type: "Freelance",
    points: [
      "Designed interfaces for early-stage startups",
      "Rapid prototyping and user testing",
    ],
    skills: ["Startup Design", "Prototyping", "UI Design"],
  },
];

const TOOL_ICONS = [Figma, Palette, ImageIcon, PenTool, Layers, Globe];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseMonth(raw: string): Date {
  const s = raw.trim();
  if (/present/i.test(s)) return new Date();
  const [mon, year] = s.split(" ");
  return new Date(Number(year), Math.max(MONTHS.indexOf(mon), 0), 1);
}

function getDuration(period: string): string {
  const [startStr, endStr] = period.split("–");
  const start = parseMonth(startStr);
  const end = parseMonth(endStr);
  const totalMonths = Math.max(
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()),
    1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function ExperienceCard({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.li
      variants={item}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="flex items-center justify-center gap-2 bg-accent px-4 py-4">
        {TOOL_ICONS.map((Icon, i) => (
          <span
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white"
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
              <Briefcase className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground sm:text-lg">{exp.title}</h4>
              <p className="text-sm text-muted-foreground">
                {exp.company} · {exp.type}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            {open ? "Hide" : "Show"}
            {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {exp.period}
          </span>
          <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            {getDuration(exp.period)}
          </span>
          {exp.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {exp.location}
            </span>
          )}
        </div>

        {open && (
          <>
            <div className="mt-4 rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-accent" />
                Impact & Responsibilities
              </div>
              <ul className="space-y-1.5">
                {exp.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-muted px-2 py-[3px] text-[10px] font-medium text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.li>
  );
}

export default function AboutMe() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-6 sm:py-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Hi, I'm <span className="italic text-primary">{PROFILE.name}.</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {PROFILE.role} based in {PROFILE.location}. Over the last{" "}
          {PROFILE.experience.replace(" years", "")} years I've been designing
          calm, considered product interfaces and shipping the code behind them.
        </p>
      </div>

      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Experience
      </h3>

      <motion.ul variants={container} initial="hidden" animate="show" className="space-y-5">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.period + exp.company} exp={exp} />
        ))}
      </motion.ul>
    </section>
  );
}
