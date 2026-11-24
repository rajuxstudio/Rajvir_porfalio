// "About Me" bottom sheet, written as a personal section: a warm intro (photo, greeting, first-person
// bio, where I'm based and what I'm doing now), my journey from commerce into design and code
// (built from the education + experience data), what I do (design / code skills), the work
// history timeline (shared with the Experience sheet), and a closing "let's work together" note.
import { useMemo } from "react";
import { ArrowUpRight, Briefcase, Clock, Code2, GraduationCap, Linkedin, Mail, MapPin, Palette, Sparkles } from "lucide-react";
import { experiences } from "@/components/about/AboutExperience";
import { education } from "@/components/about/AboutEducation";
import { PROFILE } from "@/components/Profile/IdCard";
import { shortCo } from "@/components/newProfileUI/stats";
import photo from "@/assets/rajvir/Profile.png";
import { SectionLabel, SkillChips, isOngoing, parseWhen, splitPeriod } from "./SheetParts";
import { WorkHistory } from "./ExperienceSheet";

const LINKEDIN = "https://www.linkedin.com/in/rajuxstudio/";
const SERIF = "'DM Serif Display', Georgia, serif";
const abbrOf = (degree: string) => /\(([^)]+)\)/.exec(degree)?.[1] ?? degree;
const startOf = (period: string) => parseWhen(splitPeriod(period)[0]);
const isDev = (title: string) => /developer|engineer/i.test(title);

type Milestone = { when: Date; year: string; kind: "study" | "work" | "code" | "now"; headline: string; sub: string };

export default function AboutSheet() {
  // current role(s) first, then newest first by start date
  const roles = useMemo(
    () =>
      [...experiences].sort(
        (a, b) => Number(isOngoing(b.period)) - Number(isOngoing(a.period)) || startOf(b.period).getTime() - startOf(a.period).getTime(),
      ),
    [],
  );
  const companies = new Set(experiences.map((e) => e.company)).size;
  const years = PROFILE.experience.replace(" years", "");
  const current = roles.find((r) => isOngoing(r.period));

  // journey: every degree, plus the turning points in my work (first design work, first full-time
  // role, first developer role, what I'm doing now)
  const journey = useMemo<Milestone[]>(() => {
    const byStart = [...experiences].sort((a, b) => startOf(a.period).getTime() - startOf(b.period).getTime());
    const first = byStart[0];
    const fullTime = byStart.find((r) => /full-time/i.test(r.type));
    const dev = byStart.find((r) => isDev(r.title));
    const now = byStart.find((r) => isOngoing(r.period));
    const m: Milestone[] = education.map((e) => ({
      when: startOf(e.period),
      year: String(startOf(e.period).getFullYear()),
      kind: "study",
      headline: abbrOf(e.degree),
      sub: e.institution.split(",")[0],
    }));
    const add = (r: (typeof experiences)[number] | undefined, kind: Milestone["kind"], headline: string, sub: string) => {
      if (r) m.push({ when: startOf(r.period), year: String(startOf(r.period).getFullYear()), kind, headline, sub });
    };
    // first design work and first full-time role share a card when they fall in the same year
    const sameYear = fullTime && first && fullTime !== first && startOf(fullTime.period).getFullYear() === startOf(first.period).getFullYear();
    add(first, "work", "Started designing", sameYear ? `${first.type}, then full-time at ${shortCo(fullTime.company)}` : (first?.title ?? ""));
    if (fullTime && fullTime !== first && !sameYear) add(fullTime, "work", `Joined ${shortCo(fullTime.company)}`, fullTime.title);
    if (now && now !== first) add(now, "now", "Freelancing", now.points[0] ?? now.title);
    if (dev) add(dev, "code", "Shipping code", `${dev.title} · ${shortCo(dev.company)}`);
    return m.sort((a, b) => a.when.getTime() - b.when.getTime());
  }, []);

  const skills = useMemo(() => {
    const pick = (dev: boolean) => [...new Set(experiences.filter((r) => isDev(r.title) === dev).flatMap((r) => r.skills))];
    return { design: pick(false), code: pick(true) };
  }, []);

  const KIND = {
    study: { Icon: GraduationCap, tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
    work: { Icon: Briefcase, tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
    code: { Icon: Code2, tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    now: { Icon: Sparkles, tint: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  } as const;

  return (
    <div>
      {/* ── intro ── */}
      <section className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl" aria-hidden />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative w-28 shrink-0 sm:w-36">
            <img
              src={photo}
              alt={`Portrait of ${PROFILE.name}`}
              className="aspect-[4/5] w-full -rotate-3 rounded-[22px] object-cover object-[50%_25%] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.45)] ring-4 ring-background"
            />
            <span className="absolute -bottom-2 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-background text-xl shadow-md" aria-hidden>
              👋
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[32px] leading-tight text-foreground sm:text-[40px]" style={{ fontFamily: SERIF }}>
              Hi, I'm <span className="italic text-primary">{PROFILE.name}.</span>
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {PROFILE.role.replace(" | ", " & ")} from {PROFILE.location}
            </p>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/80">
              <p>
                For the last {years} years I've been designing calm, considered product interfaces, and these days I build them too.
              </p>
              <p>
                I started out studying commerce, moved into design in {journey.find((m) => m.kind === "work")?.year}, and went back to study computer
                applications so I could ship what I design.
                {current && ` Right now I'm freelancing: ${current.points[0]?.toLowerCase()}.`}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-foreground/80">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {PROFILE.location}
              </span>
              {current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-700 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open to freelance work
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {PROFILE.experience}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground" /> {experiences.length} roles · {companies} companies
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                <Mail className="h-4 w-4" /> Email me
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-foreground/40"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── journey ── */}
      <SectionLabel>My journey</SectionLabel>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {journey.map((m, i) => {
          const { Icon, tint } = KIND[m.kind];
          return (
            <li key={m.headline + m.year} className="relative rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tint}`}>
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {m.year}
                </span>
              </div>
              <p className="mt-3 flex items-center gap-2 text-[15px] font-semibold leading-tight text-foreground">
                {m.headline}
                {m.kind === "now" && (
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Now
                  </span>
                )}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">{m.sub}</p>
            </li>
          );
        })}
      </ol>

      {/* ── what I do ── */}
      <SectionLabel>What I do</SectionLabel>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { Icon: Palette, title: "Design", line: "Product interfaces, user flows and design systems that feel calm to use.", skills: skills.design },
          { Icon: Code2, title: "Code", line: "Building those interfaces for real, from React front ends to Python back ends.", skills: skills.code },
        ].map(({ Icon, title, line, skills: list }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <h4 className="text-base font-semibold text-foreground">{title}</h4>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{line}</p>
            <div className="mt-4">
              <SkillChips skills={list} />
            </div>
          </div>
        ))}
      </div>

      {/* ── work history ── */}
      <SectionLabel>Where I've worked</SectionLabel>
      <WorkHistory />

      {/* ── closing note ── */}
      <section className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[24px] bg-foreground p-6 text-background sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-2xl leading-tight" style={{ fontFamily: SERIF }}>
            Let's work together.
          </p>
          <p className="mt-1 text-sm opacity-70">Have a product that needs a designer who can also build it? I'd love to hear about it.</p>
        </div>
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
        >
          <Mail className="h-4 w-4" /> Say hello
        </a>
      </section>
    </div>
  );
}
