// Profile page (route /about, rendered by pages/About.tsx): 6 bold colour cards that fit one
// screen on desktop (no scrolling). Each fact appears in exactly one card:
//   Hello → who + profile details (years, roles, skills, location) · Experience → companies + timeline
//   Education → degrees · Certificates → credentials · Find me → links + 3D room · Let's talk → mailbox → contact form
// Content comes from the About-page data; cards open the About / Education / Certificates sheets,
// the contact form or the 3D room. (The previous layout, components/me/Detail.tsx, is no longer used.)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import ContactFormDialog from "@/components/home/ContactFormDialog";
import { PROFILE } from "@/components/Profile/IdCard";
import { CERTS } from "@/lib/certificates";
import { education } from "@/components/about/AboutEducation";
import AboutSheet from "@/components/Profile/sheets/AboutSheet";
import ExperienceSheet from "@/components/Profile/sheets/ExperienceSheet";
import EducationSheet from "@/components/Profile/sheets/EducationSheet";
import CertificatesSheet from "@/components/Profile/sheets/CertificatesSheet";
import { isOngoing } from "@/components/Profile/sheets/SheetParts";
import { shortCo, useProfileStats } from "./stats";
import LetsTalkCard from "./bento/LetsTalkCard";
import FindMeCard from "./bento/FindMeCard";
import CertificatesCard from "./bento/CertificatesCard";
import IdBadges from "./bento/IdBadges";
import DiplomaWall from "./bento/Diploma3D";
import ProfileCard from "./bento/ProfileCard";

type Sheet = "certs" | "qualification" | "about" | "experience";
const SHEET_META: Record<Sheet, { eyebrow: string; title: string; description: string }> = {
  certs: { eyebrow: "Certifications", title: "Always learning", description: "Courses and credentials in design and development." },
  qualification: { eyebrow: "Education", title: "Academic history", description: "Degrees and qualifications, newest first." },
  about: { eyebrow: "About", title: "Background & experience", description: "Who I am and where I've worked." },
  experience: { eyebrow: "Experience", title: "Where I've worked", description: "Roles and companies, current role first." },
};

const PHOTO = `${import.meta.env.BASE_URL}profile-icon.png`;
const SERIF = "'DM Serif Display', Georgia, 'Times New Roman', serif";
const abbrOf = (degree: string) => /\(([^)]+)\)/.exec(degree)?.[1] ?? degree;

/* ───────────── card shell ───────────── */

type CardProps = {
  bg: string;
  ink: string;
  text?: string;
  title: string;
  desc: React.ReactNode;
  textAt?: "top" | "bottom";
  onOpen?: () => void;
  className?: string;
  art?: React.ReactNode; // the object; positioned by artClass, bleeds off the card
  artClass?: string;
  children?: React.ReactNode;
};

function Card({ bg, ink, text, title, desc, textAt = "top", onOpen, className = "", art, artClass = "", children }: CardProps) {
  const Comp = onOpen ? "button" : "div";
  return (
    <Comp
      type={onOpen ? "button" : undefined}
      onClick={onOpen}
      className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] p-6 text-left transition duration-300 md:min-h-0 lg:p-7 ${
        textAt === "bottom" ? "justify-end" : "justify-start"
      } ${onOpen ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20" : ""} ${className}`}
      style={{ background: bg }}
    >
      {art && <div className={`pointer-events-none absolute z-0 transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg] ${artClass}`}>{art}</div>}
      <div className="relative z-10 max-w-[30ch]">
        <h3 className="text-[clamp(24px,3.4vh,34px)] leading-tight" style={{ fontFamily: SERIF, color: ink }}>
          {title}
        </h3>
        <p className="mt-2 text-[clamp(13px,1.7vh,15px)] leading-relaxed" style={{ color: text ?? ink }}>
          {desc}
        </p>
      </div>
      {children}
      {onOpen && (
        <span className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 opacity-0 transition group-hover:opacity-100" style={{ color: ink }} aria-hidden>
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </Comp>
  );
}

/* ───────────── page ───────────── */

export default function NewProfileUIDetail() {
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [contact, setContact] = useState(false);
  const navigate = useNavigate();
  const s = useProfileStats();
  const deg = s.latestDegree;
  const latestAbbr = abbrOf(deg.degree);
  const firstAbbr = abbrOf(education[education.length - 1].degree);
  const yrs = PROFILE.experience.replace(" years", "");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" />

      {/* desktop: exactly one screen (header ≈ 64px above); phones: stacked + scroll */}
      <section className="min-h-screen bg-[#fbf8f1] px-4 pb-28 pt-20 dark:bg-[#121212] sm:px-6 md:h-[100dvh] md:min-h-0 md:overflow-hidden md:pb-5 md:pl-24 md:pt-[72px]">
        <div className="mx-auto grid h-full max-w-[1180px] gap-4 md:grid-cols-3 md:grid-rows-3">
          {/* 1 — profile card: portrait, name, bio, stats (tall) */}
          <ProfileCard
            name={PROFILE.name}
            bio={`${PROFILE.role.replace(" | ", " & ")} based in ${PROFILE.location}, focused on calm, usable interfaces.`}
            stats={{ years: `${yrs} yrs`, roles: s.roles.length, location: PROFILE.location }}
            onOpen={() => setSheet("about")}
            className="min-h-[520px] md:row-span-2 md:min-h-0"
          />

          {/* 2 — experience + career timeline (wide) */}
          <Card
            bg="#f5a26f"
            ink="#4a2208"
            title="Experience"
            desc={`Where I've worked across ${s.companies} companies — newest first. Tap for the full story.`}
            textAt="bottom"
            onOpen={() => setSheet("experience")}
            className="md:col-span-2"
            art={
              <IdBadges
                photo={PHOTO}
                roles={[...s.chrono].reverse().map((r) => ({ company: shortCo(r.company), title: r.title, period: r.period, now: isOngoing(r.period) }))}
              />
            }
            artClass="inset-x-4 top-0 sm:left-[40%] sm:right-8"
          />

          {/* 3 — education */}
          <Card
            bg="#c4d98a"
            ink="#23380e"
            title="Education"
            desc={`${s.degrees} degrees, from ${firstAbbr} to ${latestAbbr}.`}
            textAt="bottom"
            onOpen={() => setSheet("qualification")}
            art={
              <DiplomaWall
                degrees={education.map((e) => ({ abbr: abbrOf(e.degree), title: e.degree.replace(/\s*\([^)]*\)\s*$/, ""), institution: e.institution, period: e.period }))}
              />
            }
            artClass="inset-x-3 top-[3%] sm:inset-x-4"
          />

          {/* 4 — certificates: a stack of certificate sheets that fans out */}
          <CertificatesCard
            orgs={CERTS.map((c) => c.issuer)}
            count={s.certs}
            verified={s.verified}
            onOpen={() => setSheet("certs")}
            className="min-h-[260px] md:min-h-0 lg:p-7"
            headingClass="text-[clamp(28px,4.2vh,42px)]"
            artClass="w-32 md:w-[clamp(110px,17vh,160px)]"
          />

          {/* bottom row: let's talk + find me, equal halves */}
          <div className="grid gap-4 md:col-span-3 md:min-h-0 md:grid-cols-2">
          {/* 5 — let's talk: drop a letter in the mailbox → contact form */}
          <LetsTalkCard
            onOpen={() => setContact(true)}
            className="min-h-[260px] md:min-h-0 lg:p-7"
            headingClass="text-[clamp(28px,4.2vh,42px)]"
            mailboxClass="w-[clamp(120px,19vh,176px)]"
          />

          {/* 6 — find me: a door into my room → 3D room, plus LinkedIn / GitHub */}
          <FindMeCard
            onRoom={() => navigate("/room")}
            className="min-h-[260px] md:min-h-0 lg:p-7"
            headingClass="text-[clamp(28px,4.2vh,42px)]"
            artClass="w-28 md:w-[clamp(96px,15vh,136px)]"
          />
          </div>
        </div>
      </section>

      <ContactFormDialog open={contact} onClose={() => setContact(false)} />

      <Drawer open={sheet !== null} onOpenChange={(o) => !o && setSheet(null)}>
        <DrawerContent className="max-h-[92vh] dark:border-neutral-800 dark:bg-neutral-950">
          <div className="border-b border-border/60">
            <div className="mx-auto flex w-full max-w-3xl items-start justify-between gap-4 px-6 pb-4 pt-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">{sheet ? SHEET_META[sheet].eyebrow : ""}</p>
                <DrawerTitle className="mt-1 text-2xl font-bold tracking-tight text-foreground">{sheet ? SHEET_META[sheet].title : ""}</DrawerTitle>
                <DrawerDescription className="mt-1 text-sm text-muted-foreground">{sheet ? SHEET_META[sheet].description : ""}</DrawerDescription>
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </DrawerClose>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-6 pb-12 pt-6">
              {sheet === "certs" && <CertificatesSheet />}
              {sheet === "qualification" && <EducationSheet />}
              {sheet === "about" && <AboutSheet />}
              {sheet === "experience" && <ExperienceSheet />}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
