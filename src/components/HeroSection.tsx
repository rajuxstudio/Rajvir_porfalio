import { Button } from "./ui/button";
import heroPhoto from "@/assets/hero-photo.png";
import { useEffect, useState } from "react";
import {
  Code2,
  Figma,
  LayoutDashboard,
  Database,
  Globe,
  Layers,
  Cpu,
  PenTool,
} from "lucide-react";

// Colored icons for outer orbit
const orbitIcons = [
  { Icon: Code2,          color: "#61DAFB", label: "01" },
  { Icon: Figma,          color: "#F24E1E", label: "02" },
  { Icon: LayoutDashboard,color: "#6366F1", label: "03" },
  { Icon: Database,       color: "#38BDF8", label: "04" },
  { Icon: Globe,          color: "#34D399", label: "05" },
  { Icon: Layers,         color: "#FBBF24", label: "06" },
  { Icon: Cpu,            color: "#F472B6", label: "07" },
  { Icon: PenTool,        color: "#A78BFA", label: "08" },
];

const words = ["Website", "Application", "Dashboard", "Platform", "Experience"];

const TypingWord = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting && subIndex === words[index].length) {
      setTimeout(() => setDeleting(true), 1200);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <span
      className="select-none pointer-events-none font-black uppercase text-foreground"
      style={{
        fontFamily: "'Warbler Text', 'Caveat', cursive",
        fontSize: "clamp(56px, 10vw, 200px)",
        letterSpacing: "0.06em",
        lineHeight: 1,
        opacity: 0.055,
        maxWidth: "100%",
        overflow: "hidden",
        display: "block",
        whiteSpace: "nowrap",
      }}
    >
      {words[index].substring(0, subIndex)}
    </span>
  );
};

// Header component
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 h-16 bg-background/80 backdrop-blur-md border-b border-border">
    <span
      className="font-black tracking-tight text-foreground text-lg"
      style={{ fontFamily: "'Warbler Text', 'Caveat', cursive" }}
    >
      Rajvir
    </span>
    <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
      <a href="#about" className="hover:text-foreground transition-colors">About</a>
      <a href="#work"  className="hover:text-foreground transition-colors">Work</a>
      <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
    </nav>
  </header>
);

export default function HeroSection() {
  // Name font size synced with portrait watermark
  const nameFontSize = "clamp(64px, 11vw, 190px)";

  return (
    <>
      <Header />

      <section
        className="relative overflow-hidden bg-background text-foreground"
        style={{ height: "100vh", maxHeight: "100vh" }}
      >
        {/* Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/60 pointer-events-none" />

        {/* TOP CONTENT */}
        <div className="relative z-20 pt-28 sm:pt-32 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <p className="text-[10px] sm:text-xs tracking-[0.22em] text-muted-foreground mb-5 uppercase font-medium">
            UX | UI &nbsp;•&nbsp; PRODUCT DESIGNER &nbsp;•&nbsp; DEVELOPER
          </p>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.6rem] font-bold leading-snug sm:leading-tight mb-8 max-w-4xl mx-auto px-2">
            Over{" "}
            <span
              className="font-semibold italic"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.15em",
                color: "hsl(var(--hero-accent-blue))",
              }}
            >
              3+ years
            </span>{" "}
            of experience designing SaaS and enterprise platforms that simplify complex workflows and{" "}
            <span
              className="font-semibold italic"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.15em",
                color: "hsl(var(--hero-accent-blue))",
              }}
            >
              improve productivity.
            </span>
          </h1>

          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <Button
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-md"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              <span className="mr-1.5">✦</span> Let's Talk
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold"
            >
              <span className="mr-1.5">⊕</span> Schedule a Meeting
            </Button>
          </div>
        </div>

        {/* VISUAL AREA — fills remaining VH */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center" style={{ top: "340px" }}>
          {/* Typing word watermark — constrained to container */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-[3] overflow-hidden"
            style={{ maxWidth: "100vw", width: "100%" }}
          >
            <div className="flex justify-center">
              <TypingWord />
            </div>
          </div>

          {/* Outer orbit — 6px border */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-[6] pointer-events-none"
            style={{ width: "min(600px, 78vw)", height: "min(600px, 78vw)" }}
          >
            <div
              className="absolute inset-0 rounded-full orbit-ring-outer"
              style={{ border: "6px dashed hsl(var(--border))" }}
            >
              {orbitIcons.map(({ Icon, color }, i) => {
                const angle = (i / orbitIcons.length) * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(300px, 39vw)) rotate(-${angle}deg)`,
                      marginLeft: "-24px",
                      marginTop: "-24px",
                    }}
                  >
                    <div
                      className="orbit-icon-counter flex items-center justify-center rounded-full shadow-sm w-12 h-12"
                      style={{ background: "hsl(var(--card))", border: "6px solid hsl(var(--border))" }}
                    >
                      <Icon style={{ color }} className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inner orbit — 4px border, white icons */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-[7] pointer-events-none"
            style={{ width: "min(400px, 52vw)", height: "min(400px, 52vw)" }}
          >
            <div
              className="absolute inset-0 rounded-full orbit-ring-inner"
              style={{ border: "4px solid hsl(var(--border))" }}
            >
              {orbitIcons.map(({ label }, i) => {
                const angle = (i / orbitIcons.length) * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(200px, 26vw)) rotate(-${angle}deg)`,
                      marginLeft: "-14px",
                      marginTop: "-14px",
                    }}
                  >
                    <div
                      className="orbit-label-counter flex items-center justify-center rounded-full shadow-sm w-7 h-7 text-[10px] font-semibold"
                      style={{
                        background: "hsl(var(--foreground))",
                        border: "4px solid hsl(var(--border))",
                        color: "hsl(var(--background))",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Name behind photo */}
          <span
            className="absolute bottom-8 left-1/2 -translate-x-1/2 select-none pointer-events-none font-black uppercase z-[5]"
            style={{
              fontFamily: "'Warbler Text', serif",
              fontSize: nameFontSize,
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "hsl(var(--border))",
              whiteSpace: "nowrap",
            }}
          >
            RAJVIR
          </span>

          {/* Portrait — responsive width, fills visual area height */}
          <img
            src={heroPhoto}
            alt="Rajvir – UX/UI Designer & Developer"
            className="relative z-[10] object-contain select-none mt-auto"
            style={{
              height: "100%",
              maxHeight: "calc(100vh - 340px)",
              width: "auto",
              maxWidth: "min(420px, 55vw)",
              filter: "drop-shadow(0 16px 48px hsl(220 30% 15% / 0.10))",
            }}
            draggable={false}
          />

          {/* Name outline in front */}
          <span
            className="absolute bottom-8 left-1/2 -translate-x-1/2 select-none pointer-events-none font-black uppercase z-[15]"
            style={{
              fontFamily: "'Warbler Text', serif",
              fontSize: nameFontSize,
              WebkitTextStroke: "1.5px hsl(var(--border))",
              color: "transparent",
              letterSpacing: "0.06em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            RAJVIR
          </span>

          {/* Bottom fade */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[12]" />
        </div>

        {/* Open to Work badge */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 shadow-sm text-sm font-medium text-foreground">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: "hsl(var(--hero-badge-green))",
                boxShadow: "0 0 0 3px hsl(142 71% 45% / 0.2)",
              }}
            />
            <span>🏢</span>
            Open to Work
          </div>
        </div>
      </section>
    </>
  );
}
