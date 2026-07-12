import { Briefcase, MapPin, Calendar } from "lucide-react";
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

export default function AboutMe() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">About</p>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Hi, I'm <span className="italic text-blue-600">{PROFILE.name}.</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
          {PROFILE.role} based in {PROFILE.location}. Over the last{" "}
          {PROFILE.experience.replace(" years", "")} years I've been designing
          calm, considered product interfaces and shipping the code behind them.
        </p>
      </div>

      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        Experience
      </h3>

      <ol className="relative border-l border-neutral-200 pl-6">
        {experiences.map((exp) => (
          <li key={exp.period + exp.company} className="mb-8 last:mb-0">
            <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
              <Briefcase className="h-4 w-4 text-blue-700" strokeWidth={2} />
            </span>

            <div className="flex flex-wrap items-baseline gap-x-3">
              <h4 className="text-lg font-semibold text-neutral-900">
                {exp.title}
              </h4>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
                {exp.type}
              </span>
            </div>

            <div className="mt-0.5 text-xs text-neutral-500">{exp.company}</div>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {exp.period}
              </span>
              {exp.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {exp.location}
                </span>
              )}
            </div>

            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-neutral-700 marker:text-neutral-300">
              {exp.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-neutral-100 px-2 py-[3px] text-[10px] font-medium text-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}