import { useState } from "react";
import {
  Calendar,
  Download,
  Mail,
  MapPin,
  Briefcase,
  Linkedin,
  FileText,
  GraduationCap,
  Layers,
  PenTool,
  Sparkles,
  BookOpen,
  Award,
  School,
} from "lucide-react";
const avatar = "https://api.dicebear.com/9.x/avataaars/svg?seed=Rajvir";
const diceSound = "";
import Certifications, { certificates as CERTS } from "@/components/about/AboutCertifications";
import ProjectBottomSheet from "@/components/development/ProjectBottomSheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import QualificationDetail from "@/components/about/QualificationDetail";
import Dice from "@/components/me/Dice";

function Index() {
  const [sheet, setSheet] = useState<null | "certs" | "qualification">(null);

  return (
    <>
      {/* Hero — full viewport, no box wrapper */}
      <section
        className="relative flex h-screen w-screen flex-col justify-center overflow-hidden px-4 py-12 sm:px-10 sm:py-20 lg:px-[8vw] lg:py-[8vh]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* Center content */}
        <div className="relative z-0 flex flex-col items-center text-center">
          <Dice className="mb-6 sm:mb-8" soundSrc={diceSound} />

          <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Let's build something{" "}
            <span className="font-bold">together</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-neutral-600 sm:mt-5 sm:text-base">
            Open to freelance, collaborations, and interesting challenges.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-5">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200">
              UI/UX Design
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200">
              Frontend
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-200">
              Branding
            </span>
          </div>

          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 sm:mt-8 sm:px-6 sm:py-3"
          >
            <Calendar className="h-4 w-4" />
            Schedule a meeting
          </a>
        </div>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 sm:mt-16 place-items-center lg:grid-cols-1 lg:mt-0">
          <div className="lg:absolute lg:left-6 lg:top-6 lg:w-[240px] lg:scale-[1.15]">
            <IdCard />
          </div>

          <div className="lg:absolute lg:right-6 lg:top-6 lg:w-[290px] lg:scale-[1.15]">
            <button
              type="button"
              onClick={() => setSheet("qualification")}
              aria-label="View education details"
              className="cursor-pointer rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <QualificationCard />
            </button>
          </div>

          <div className="lg:absolute lg:bottom-6 lg:left-6 lg:w-[260px] lg:scale-[1.15]">
            <button
              type="button"
              onClick={() => setSheet("certs")}
              aria-label="View all certificates"
              className="cursor-pointer rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <CertificatesPocket />
            </button>
          </div>

          <div className="lg:absolute lg:bottom-6 lg:right-6 lg:w-[260px] lg:scale-[1.15]">
            <BeyondWorkPocket />
          </div>
        </div>
      </section>

      <Drawer open={sheet !== null} onOpenChange={(o) => !o && setSheet(null)}>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>
              {sheet === "certs" ? "Certifications" : "Education"}
            </DrawerTitle>
            <DrawerDescription>
              {sheet === "certs"
                ? "Full list of certifications and credentials."
                : "Complete academic history and qualifications."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-2 pb-8">
            {sheet === "certs" && <Certifications />}
            {sheet === "qualification" && <QualificationDetail />}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Index;

type CertificatePocketCard = {
  name: string;
  meta: string;
  gradient: string;
  icon: React.ReactNode;
};

const CERTIFICATE_POCKET_CARDS: CertificatePocketCard[] = CERTS.slice(0, 3).map((cert, index) => ({
  name: cert.title,
  meta: `${cert.issuer} · ${cert.issued}`,
  gradient:
    index === 0
      ? "from-sky-400 via-indigo-500 to-purple-600"
      : index === 1
        ? "from-emerald-400 via-teal-500 to-cyan-600"
        : "from-amber-400 via-orange-500 to-rose-500",
  icon: <Award className="h-4 w-4 text-white" />,
}));

function IdCard() {
  return (
    <div className="group relative w-[240px] [perspective:1200px]">
      {/* Lanyard clip */}
      <div className="relative mx-auto h-6 w-16">
        <div className="absolute left-1/2 top-0 h-4 w-10 -translate-x-1/2 rounded-t-md bg-neutral-400 shadow-inner" />
        <div className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-neutral-500 bg-white" />
      </div>
      {/* String */}
      <div className="mx-auto h-4 w-0.5 bg-gradient-to-b from-blue-600 to-blue-700" />

      {/* Card */}
      <div className="relative origin-top rotate-[-4deg] rounded-2xl bg-white shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200 transition-transform duration-500 ease-out group-hover:rotate-[2deg] group-hover:-translate-y-1">
        {/* Header band */}
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-white/90">Design ID</span>
          <span className="text-[9px] font-mono text-white/80">#AM-2019</span>
        </div>

        <div className="flex gap-3 p-3">
          <div className="relative">
            <img
              src={avatar}
              alt="Aarav Mehta"
              className="h-20 w-16 rounded-md object-cover ring-2 ring-neutral-100"
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="flex-1 space-y-1">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-400">Name</div>
              <div className="text-xs font-semibold text-neutral-900 leading-tight">Aarav Mehta</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-400">Role</div>
              <div className="text-[11px] text-neutral-700 leading-tight">Product & UX Designer</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-dashed border-neutral-200 px-3 py-2 text-[10px]">
          <div>
            <div className="text-neutral-400">Location</div>
            <div className="flex items-center gap-1 text-neutral-800">
              <MapPin className="h-2.5 w-2.5" /> Bengaluru
            </div>
          </div>
          <div>
            <div className="text-neutral-400">Experience</div>
            <div className="text-neutral-800">6+ years</div>
          </div>
          <div>
            <div className="text-neutral-400">Email</div>
            <div className="truncate text-neutral-800">hi@aarav.design</div>
          </div>
          <div>
            <div className="text-neutral-400">Status</div>
            <div className="text-emerald-600">Available</div>
          </div>
        </div>

        {/* Barcode */}
        <div className="flex items-center gap-[2px] rounded-b-2xl border-t border-neutral-100 bg-neutral-50 px-3 py-2">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-900"
              style={{
                width: `${1 + (i % 3)}px`,
                height: "18px",
                opacity: i % 4 === 0 ? 1 : 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificatesPocket() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-[230px] w-[260px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pocket back panel (behind everything) */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[150px] rounded-[22px] bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_25px_50px_-20px_rgba(234,88,12,0.55)] ring-1 ring-orange-700/20 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      />

      {/* Certificate cards — peeking out of pocket at rest, popping on hover */}
      {CERTIFICATE_POCKET_CARDS.map((f, i) => {
        const offset = i - (CERTIFICATE_POCKET_CARDS.length - 1) / 2;
        const rest = { x: offset * 12, y: 0, r: offset * 4, s: 0.95 };
        const hover = {
          x: offset * 78,
          y: -110 - Math.abs(offset) * 6,
          r: offset * 14,
          s: 1.04,
        };
        const t = hovered ? hover : rest;
        return (
          <div
            key={f.name}
            className="absolute bottom-[40px] left-1/2 -ml-12 h-32 w-24 origin-bottom rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${t.s})`,
              zIndex: hovered ? 30 + i : 10 + i,
              transitionDelay: `${hovered ? i * 60 : (CERTIFICATE_POCKET_CARDS.length - i) * 30}ms`,
            }}
          >
            <div
              className={`flex h-full w-full flex-col justify-between rounded-xl bg-gradient-to-br ${f.gradient} p-2.5`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/25 backdrop-blur-sm">
                {f.icon}
              </div>
              <div>
                <div className="text-[11px] font-semibold leading-tight text-white">
                  {f.name}
                </div>
                <div className="text-[9px] text-white/80">{f.meta}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pocket front face — hides bottom of cards, holds label */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 h-[110px] rounded-b-[22px] rounded-t-lg bg-gradient-to-br from-orange-500 to-orange-600 p-4 shadow-[0_-8px_20px_-15px_rgba(0,0,0,0.25)] ring-1 ring-orange-700/20 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-1.5 rounded-[14px] border border-dashed border-white/40" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90">
            <Award className="h-3.5 w-3.5" /> Recent certificates
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold leading-none text-white">
                {CERTIFICATE_POCKET_CARDS.length}
              </div>
              <div className="text-[10px] text-white/80">Certificates</div>
            </div>
            <div className="text-[10px] text-white/80">Hover to peek</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * QualificationCard
 * ----------------------------------------------------------------
 * Small "corner D" card that showcases academic history. Renders a
 * graduation-cap icon peeking out of a white panel that holds a
 * timeline-style list of degrees (most recent first).
 */
type Qualification = {
  degree: string;
  field: string;
  years: string;
  icon: typeof GraduationCap;
  current?: boolean;
};

// Education timeline — newest first; `current` gets a live badge.
const QUALIFICATIONS: Qualification[] = [
  { degree: "MCA", field: "Master of Computer Apps", years: "2024 – 26", icon: GraduationCap, current: true },
  { degree: "M.Com", field: "Master of Commerce", years: "2020 – 22", icon: Award },
  { degree: "B.Com", field: "Bachelor of Commerce", years: "2017 – 20", icon: BookOpen },
  { degree: "12th", field: "Higher Secondary", years: "2017", icon: School },
];

function QualificationCard() {
  return (
    // Slightly wider container gives room for the redesigned rows.
    <div className="group relative h-[270px] w-[290px]">
      {/* Back panel — the "paper" that holds the qualification list */}
      <div className="absolute right-0 top-3 w-[248px] overflow-hidden rounded-2xl bg-white shadow-[0_25px_50px_-20px_rgba(0,0,0,0.28)] ring-1 ring-neutral-200/70 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-1">
        {/* Gradient header strip — sets the "diploma" tone */}
        <div className="relative flex items-center justify-between bg-gradient-to-br from-blue-600 to-blue-800 px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-white" strokeWidth={2.25} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
              Education
            </span>
          </div>
          {/* Total-count pill on the right */}
          <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-medium text-white ring-1 ring-white/20">
            {QUALIFICATIONS.length} degrees
          </span>
        </div>

        {/* Body: stacked qualification rows */}
        <ul className="divide-y divide-neutral-100 px-3 py-2">
          {QUALIFICATIONS.map((q) => {
            const Icon = q.icon;
            return (
              <li key={q.degree} className="flex items-center gap-2.5 py-1.5">
                {/* Icon tile — per-degree symbol */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </div>

                {/* Degree name + field */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-neutral-900 leading-tight">
                      {q.degree}
                    </span>
                    {/* Live indicator on the ongoing degree */}
                    {q.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                        Now
                      </span>
                    )}
                  </div>
                  <div className="truncate text-[9.5px] text-neutral-500 leading-tight">
                    {q.field}
                  </div>
                </div>

                {/* Years — right-aligned, tabular for clean column */}
                <span className="shrink-0 tabular-nums text-[10px] font-medium text-neutral-500">
                  {q.years}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Front icon card — floating grad-cap badge that lifts on hover */}
      <div className="absolute left-0 top-0 z-10 flex h-16 w-16 -rotate-6 items-center justify-center rounded-2xl bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] ring-1 ring-neutral-100 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-3">
        <GraduationCap className="h-7 w-7 text-neutral-900" strokeWidth={1.75} />
      </div>
    </div>
  );
}

type BeyondItem = {
  name: string;
  meta: string;
  gradient: string;
  emoji: string;
};

const BEYOND_ITEMS: BeyondItem[] = [
  {
    name: "Photography",
    meta: "Street & film",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    emoji: "📷",
  },
  {
    name: "Sports",
    meta: "Football weekly",
    gradient: "from-lime-400 via-emerald-500 to-teal-600",
    emoji: "⚽",
  },
  {
    name: "Travel",
    meta: "12 countries",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    emoji: "✈️",
  },
];

function BeyondWorkPocket() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-[240px] w-[260px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Folder tab */}
      <div
        className={`absolute bottom-[140px] left-4 h-6 w-24 rounded-t-lg bg-gradient-to-b from-amber-300 to-amber-400 shadow-[0_-4px_10px_-6px_rgba(0,0,0,0.25)] ring-1 ring-amber-500/40 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      />

      {/* Folder back panel (behind items) */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[150px] rounded-[14px] rounded-tl-none bg-gradient-to-br from-amber-300 to-amber-400 shadow-[0_25px_50px_-20px_rgba(217,119,6,0.55)] ring-1 ring-amber-500/40 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      />

      {/* Beyond-work items — peeking above folder rim, popping on hover */}
      {BEYOND_ITEMS.map((item, i) => {
        const offset = i - (BEYOND_ITEMS.length - 1) / 2;
        const rest = { x: offset * 12, y: 0, r: offset * 4, s: 0.95 };
        const hover = {
          x: offset * 80,
          y: -110 - Math.abs(offset) * 6,
          r: offset * 12,
          s: 1.05,
        };
        const t = hovered ? hover : rest;
        return (
          <div
            key={item.name}
            className="absolute bottom-[45px] left-1/2 -ml-12 h-32 w-24 origin-bottom rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${t.s})`,
              zIndex: hovered ? 30 + i : 10 + i,
              transitionDelay: `${hovered ? i * 60 : (BEYOND_ITEMS.length - i) * 30}ms`,
            }}
          >
            <div
              className={`flex h-full w-full flex-col items-center justify-between rounded-2xl bg-gradient-to-br ${item.gradient} p-2.5`}
            >
              <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/30 text-2xl shadow-[inset_0_-4px_8px_rgba(0,0,0,0.15),0_6px_14px_-6px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">
                  {item.emoji}
                </span>
              </div>
              <div className="text-center">
                <div className="text-[11px] font-semibold leading-tight text-white">
                  {item.name}
                </div>
                <div className="text-[9px] text-white/80">{item.meta}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Folder front cover — hides bottom of items, holds label */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 h-[115px] rounded-b-[14px] rounded-t-md bg-gradient-to-br from-amber-400 to-amber-500 p-4 shadow-[0_-8px_20px_-15px_rgba(0,0,0,0.25)] ring-1 ring-amber-600/40 transition-transform duration-500 ${
          hovered ? "-translate-y-1" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-1.5 rounded-[10px] border border-dashed border-amber-900/25" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-950">
            <Sparkles className="h-3.5 w-3.5" /> Beyond work
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold leading-none text-amber-950">
                {BEYOND_ITEMS.length}
              </div>
              <div className="text-[10px] text-amber-900/80">Passions</div>
            </div>
            <div className="text-[10px] text-amber-900/80">Hover to peek</div>
          </div>
        </div>
      </div>
    </div>
  );
}
