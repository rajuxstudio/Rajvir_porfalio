import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/Pages/hero-photo.png";
import { useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ThemeToggle from "@/components/newUI/ThemeToggle";
const Globe3D = lazy(() => import("@/components/newUI/Globe3D"));

// Real design-tool icons — same set as RotatingToolsPill's canonical tool list
import framerIcon from "@/assets/designIcon/framer.svg";
import canvaIcon from "@/assets/designIcon/canva.svg";
import figmaIcon from "@/assets/designIcon/figma.svg";
import wordpressIcon from "@/assets/designIcon/wordpress.svg";
import photoshopIcon from "@/assets/designIcon/photoshop.svg";
import miroIcon from "@/assets/designIcon/miro.svg";

// Real build/dev-tool icons — same set as RotatingToolsPill's canonical tool list
import githubIcon from "@/assets/buildIcon/github.svg";
import mysqlIcon from "@/assets/buildIcon/mysql.svg";
import pythonIcon from "@/assets/buildIcon/python.svg";
import javascriptIcon from "@/assets/buildIcon/javascript.svg";
import reactIcon from "@/assets/buildIcon/react.svg";
import angularIcon from "@/assets/buildIcon/angular.svg";

// Design tools for outer orbit
const outerIcons: { icon: string; label: string }[] = [
  { label: "Figma", icon: figmaIcon },
  { label: "Framer", icon: framerIcon },
  { label: "Canva", icon: canvaIcon },
  { label: "Photoshop", icon: photoshopIcon },
  { label: "WordPress", icon: wordpressIcon },
  { label: "Miro", icon: miroIcon },
];

// Dev/build tools for inner ring
const brandIcons: { icon: string; label: string }[] = [
  { label: "React", icon: reactIcon },
  { label: "JavaScript", icon: javascriptIcon },
  { label: "Python", icon: pythonIcon },
  { label: "Angular", icon: angularIcon },
  { label: "MySQL", icon: mysqlIcon },
  { label: "GitHub", icon: githubIcon },
];


/**
 * Each word gets its own entrance, and an exit that continues the same idea
 * rather than a generic fade — the word leaves the way it arrived.
 */
type WordAnimation = {
  word: string;
  /** Applied to the word as a whole. */
  container: Variants;
  /** Optional per-character motion, driven by the container's stagger. */
  char?: Variants;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const WORDS: WordAnimation[] = [
  {
    // Typed in left to right, backspaced right to left.
    word: "Website",
    container: {
      initial: {},
      animate: { transition: { staggerChildren: 0.07 } },
      exit: { transition: { staggerChildren: 0.045, staggerDirection: -1 } },
    },
    char: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.01 } },
      exit: { opacity: 0, transition: { duration: 0.01 } },
    },
  },
  {
    // Rises into place, then keeps rising on the way out.
    word: "Application",
    container: {
      initial: { y: "0.45em", opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE_OUT } },
      exit: { y: "-0.45em", opacity: 0, transition: { duration: 0.45, ease: "easeIn" } },
    },
  },
  {
    // Letters drop in like panels loading, then drop away in the same order.
    word: "Dashboard",
    container: {
      initial: {},
      animate: { transition: { staggerChildren: 0.05 } },
      exit: { transition: { staggerChildren: 0.035 } },
    },
    char: {
      initial: { y: "-0.6em", opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
      exit: { y: "0.6em", opacity: 0, transition: { duration: 0.35, ease: "easeIn" } },
    },
  },
  {
    // Spreads out wide, then contracts back in.
    word: "Platform",
    container: {
      initial: { letterSpacing: "-0.04em", scaleX: 0.92, opacity: 0 },
      animate: {
        letterSpacing: "0.12em",
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.7, ease: EASE_OUT },
      },
      exit: {
        letterSpacing: "-0.04em",
        scaleX: 0.92,
        opacity: 0,
        transition: { duration: 0.45, ease: "easeIn" },
      },
    },
  },
  {
    // Resolves out of soft focus, dissolves back into it.
    word: "Experience",
    container: {
      initial: { filter: "blur(16px)", opacity: 0, scale: 1.06 },
      animate: {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
      },
      exit: {
        filter: "blur(16px)",
        opacity: 0,
        scale: 1.06,
        transition: { duration: 0.5, ease: "easeIn" },
      },
    },
  },
];

const TypingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % WORDS.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const { word, container, char } = WORDS[index];

  return (
    <div
      className="select-none pointer-events-none font-black uppercase text-foreground"
      style={{
        fontFamily: "'Warbler Text', 'Caveat', cursive",
        fontSize: "clamp(56px, 10vw, 200px)",
        letterSpacing: "0.06em",
        lineHeight: 1,
        opacity: 0.055,
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ display: "inline-block" }}
        >
          {char
            ? word.split("").map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  variants={char}
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))
            : word}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function HeroSection() {
  // Name font size synced with portrait watermark
  const nameFontSize = "clamp(64px, 11vw, 190px)";

  return (
    <>
      <section className="relative flex flex-col h-[92vh] md:h-screen overflow-hidden bg-background text-foreground">
        {/* Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/60 pointer-events-none" />

        {/* TOP CONTENT (REDUCED HEIGHT) */}
        <div className="relative z-20 pt-16 sm:pt-20 text-center px-4 max-w-5xl mx-auto sm:px-[55px] pb-6">
          <p className="text-[10px] sm:text-xs tracking-[0.22em] text-muted-foreground mb-3 uppercase font-medium">
            UX | UI • PRODUCT DESIGNER • DEVELOPER
          </p>

          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[1.8rem] xl:text-[2.2rem] font-bold leading-snug mb-4 max-w-4xl mx-auto">
            Over{" "}
            <span
              className="font-semibold italic"
              style={{
                fontFamily: "'Caveat', cursive",
                color: "hsl(var(--hero-accent-blue))"
              }}
            >
              4+ years
            </span>{" "}
            of experience designing SaaS and enterprise platforms that simplify workflows and{" "}
            <span
              className="font-semibold italic"
              style={{
                fontFamily: "'Caveat', cursive",
                color: "hsl(var(--hero-accent-blue))"
              }}
            >
              improve productivity.
            </span>
          </h1>
        </div>

        {/* VISUAL AREA (AUTO HEIGHT) */}
        <div className="relative flex-1 flex items-end justify-center">

          {/* Typing word */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[3] w-full flex justify-center">
            <TypingWord />
          </div>

          {/* OUTER ORBIT (back) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-[2] pointer-events-none"
            style={{ width: "min(600px, 78vw)", height: "min(600px, 78vw)" }}
          >
            <div
              className="absolute inset-0 rounded-full orbit-ring-outer"
              style={{ border: "2px solid hsl(var(--border))" }}
            >
              {outerIcons.map(({ icon, label }, i) => {
                const angle = (i / outerIcons.length) * 360;
                return (
                  <div
                    key={label}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(300px, 39vw)) rotate(-${angle}deg)`,
                      marginLeft: "-22px",
                      marginTop: "-22px"
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full w-11 h-11 border border-border shadow-md backdrop-blur-sm"
                      style={{ background: "hsl(var(--card) / 0.9)" }}
                    >
                      <img src={icon} alt={label} className="w-[18px] h-[18px] object-contain" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* INNER ORBIT */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-[3] pointer-events-none"
            style={{ width: "min(400px, 52vw)", height: "min(400px, 52vw)" }}
          >
            <div
              className="absolute inset-0 rounded-full orbit-ring-inner"
              style={{ border: "1.5px solid hsl(var(--border) / 0.6)" }}
            >
              {brandIcons.map(({ icon, label }, i) => {
                const angle = (i / brandIcons.length) * 360;
                return (
                  <div
                    key={label}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(200px, 26vw)) rotate(-${angle}deg)`,
                      marginLeft: "-18px",
                      marginTop: "-18px"
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full w-9 h-9 border border-border/50 shadow-md backdrop-blur-sm"
                      style={{ background: "hsl(var(--card) / 0.9)" }}
                    >
                      <img src={icon} alt={label} className="w-4 h-4 object-contain" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NAME BACK */}
          <span
            className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-[10] font-black uppercase"
            style={{
              fontFamily: "'Nevera', serif",
              fontSize: "clamp(80px, 11vw, 190px)",
              color: "hsl(var(--rajvir-text))"
            }}
          >
            RAJVIR
          </span>

          {/* IMAGE */}
          <img
            src={heroPhoto}
            alt="Rajvir"
            className="relative z-[20]"
            style={{
              maxHeight: "calc(100vh - 260px)",
              maxWidth: "min(420px, 82vw)"
            }}
          />

          {/* NAME FRONT */}
          <span
            className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-[30] font-black uppercase"
            style={{
              fontFamily: "'Nevera', serif",
              fontSize: "clamp(80px, 11vw, 190px)",
              WebkitTextStroke: "1.5px hsl(var(--rajvir-text))",
              color: "transparent"
            }}
          >
            RAJVIR
          </span>

          {/* Fade */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[25]" />
        </div>

        {/* ✅ TICKER INSIDE HERO (PERFECTLY PINNED) */}
        <div className="relative z-[40] w-full overflow-hidden border-t h-[48px] flex items-center bg-background">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {[...Array(3)].flatMap((_, loop) =>
              ["Agriculture", "Government & Civic Services", "Education", "Healthcare (mHealth)", "FinTech", "mCommerce", "Retail", "Real Estate"].map((word, i) => (
                <span key={`${loop}-${word}`} className="flex items-center gap-4">
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase px-8 text-muted-foreground">
                    {word}
                  </span>
                  <span className="text-[10px] text-border">✦</span>
                </span>
              ))
            )}
          </div>
        </div>

      </section>
    </>);

}