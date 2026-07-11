import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Download,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* =========================
   📦 DATA
========================= */

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const services = ["UI/UX Design", "Frontend", "Branding"];

/* =========================
   🧩 COMPONENTS
========================= */

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: LucideIcon;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-2 rounded-lg bg-muted/40 transition-all duration-300 hover:bg-primary/10 hover:-translate-y-1"
    >
      <Icon
        size={18}
        className="transition-transform duration-300 group-hover:scale-110 group-hover:text-primary"
      />

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all duration-200 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

/* =========================
   🧱 MAIN FOOTER
========================= */

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden pt-20 pb-16">

      {/* 🌫️ BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-background" />

      {/* 💡 LIGHT */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">

        {/* 🧊 CARD */}
        <div className="relative mb-10 rounded-3xl border border-border bg-card/80 shadow-sm backdrop-blur-xl">

          {/* ✨ GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-40 blur-xl" />

          <div className="relative z-10 grid gap-12 px-6 py-10 md:grid-cols-2 md:px-10">

            {/* LEFT */}
            <div className="flex flex-col justify-between gap-8">

              <div>
                <h3 className="mb-3 font-display text-2xl md:text-3xl font-bold tracking-tight">
                  Let's build something{" "}
                  <span className="text-gradient text-shimmer text-3xl md:text-4xl animate-[shimmer_3s_linear_infinite]">
                    together
                  </span>
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Open to freelance, collaborations, and interesting challenges.
                </p>
              </div>

              {/* SERVICES (IMPROVED) */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {services.map((item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {item}
                    {i !== services.length - 1 && (
                      <span className="opacity-40">•</span>
                    )}
                  </span>
                ))}
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-between gap-10">

              {/* 🔥 MEETING (FIXED SPACING) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 border border-border bg-muted/60 backdrop-blur-md rounded-xl px-3 py-2">

                <input
                  type="text"
                  placeholder="Meeting topic..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />

                <Button className="w-full sm:w-auto h-8 px-4 text-sm rounded-lg">
                  1:1 Meeting
                </Button>

              </div>

              {/* SOCIAL + RESUME */}
              <div className="flex flex-wrap gap-3">

                {socialLinks.map((item, i) => (
                  <SocialIcon key={i} {...item} />
                ))}

                {/* RESUME ICON */}
                <a
                  href="/resume.pdf"
                  className="group relative p-2 rounded-lg bg-muted/40 transition-all duration-300 hover:bg-primary/10 hover:-translate-y-1"
                >
                  <Download
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:text-primary"
                  />

                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all duration-200 group-hover:opacity-100">
                    Download Resume
                  </span>
                </a>

              </div>

            </div>

          </div>
        </div>

        {/* 🔻 FOOTER */}
        <div className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 Rajvir. All rights reserved.
        </div>

      </div>
    </footer>
  );
}