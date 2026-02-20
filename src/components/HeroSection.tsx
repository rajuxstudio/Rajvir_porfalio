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

const orbitIcons = [
  { Icon: Code2, label: "01" },
  { Icon: Figma, label: "02" },
  { Icon: LayoutDashboard, label: "03" },
  { Icon: Database, label: "04" },
  { Icon: Globe, label: "05" },
  { Icon: Layers, label: "06" },
  { Icon: Cpu, label: "07" },
  { Icon: PenTool, label: "08" },
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
        fontSize: "clamp(72px, 13vw, 260px)",
        letterSpacing: "0.08em",
        lineHeight: 1,
        opacity: 0.04,
      }}
    >
      {words[index].substring(0, subIndex)}
    </span>
  );
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/60 pointer-events-none" />

      {/* TOP CONTENT */}
      <div className="relative z-20 pt-16 sm:pt-20 md:pt-28 text-center px-4 sm:px-6 max-w-5xl mx-auto">
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

      {/* VISUAL AREA */}
      <div className="relative mt-16 md:mt-20 flex flex-col items-center" style={{ minHeight: 540 }}>
        {/* Typing word watermark */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[3] whitespace-nowrap">
          <TypingWord />
        </div>

        {/* Outer orbit */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-[6] pointer-events-none"
          style={{ width: "min(680px, 84vw)", height: "min(680px, 84vw)" }}
        >
          <div
            className="absolute inset-0 rounded-full orbit-ring-outer"
            style={{ border: "1.5px dashed hsl(var(--border))" }}
          >
            {orbitIcons.map(({ Icon }, i) => {
              const angle = (i / orbitIcons.length) * 360;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(min(340px, 42vw)) rotate(-${angle}deg)`,
                    marginLeft: "-24px",
                    marginTop: "-24px",
                  }}
                >
                  <div className="orbit-icon-counter flex items-center justify-center rounded-full bg-card shadow-sm w-12 h-12 border border-border">
                    <Icon className="text-foreground w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inner orbit */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-[7] pointer-events-none"
          style={{ width: "min(480px, 60vw)", height: "min(480px, 60vw)" }}
        >
          <div
            className="absolute inset-0 rounded-full orbit-ring-inner"
            style={{ border: "1px solid hsl(var(--border))" }}
          >
            {orbitIcons.map(({ label }, i) => {
              const angle = (i / orbitIcons.length) * 360;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(min(240px, 30vw)) rotate(-${angle}deg)`,
                    marginLeft: "-14px",
                    marginTop: "-14px",
                  }}
                >
                  <div className="orbit-label-counter flex items-center justify-center rounded-full bg-card shadow-sm w-7 h-7 border border-border text-[10px] font-semibold text-muted-foreground">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Name behind photo */}
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none font-black uppercase z-[5]"
          style={{
            fontSize: "clamp(72px, 13vw, 190px)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            color: "hsl(var(--border))",
          }}
        >
          RAJVIR
        </span>

        {/* Portrait */}
        <img
          src={heroPhoto}
          alt="Rajvir – UX/UI Designer & Developer"
          className="relative z-[10] object-contain select-none mt-auto"
          style={{
            height: "clamp(360px, 48vw, 520px)",
            filter: "drop-shadow(0 16px 48px hsl(220 30% 15% / 0.10))",
          }}
          draggable={false}
        />

        {/* Name outline in front */}
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none font-black uppercase z-[15]"
          style={{
            fontSize: "clamp(72px, 13vw, 190px)",
            WebkitTextStroke: "1.5px hsl(var(--border))",
            color: "transparent",
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          RAJVIR
        </span>

        {/* Bottom fade */}
        <div className="absolute bottom-0 w-full h-36 bg-gradient-to-t from-background to-transparent z-[12]" />
      </div>

      {/* Open to Work badge */}
      <div className="relative z-20 flex justify-center -mt-2 pb-12">
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
  );
}
