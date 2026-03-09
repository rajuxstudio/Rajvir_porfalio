import { Button } from "./ui/button";
import heroPhoto from "@/assets/hero-photo.png";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

// Tool/platform SVG icons for outer orbit
const outerIcons: { svg: React.ReactNode; label: string }[] = [
  { label: "Figma", svg: <svg viewBox="0 0 32 32" width="18" height="18"><path d="M10.5 28c2.5 0 4.5-2 4.5-4.5V19h-4.5C8 19 6 21 6 23.5S8 28 10.5 28z" fill="#0ACF83"/><path d="M6 14.5C6 12 8 10 10.5 10H15v9h-4.5C8 19 6 17 6 14.5z" fill="#A259FF"/><path d="M6 5.5C6 3 8 1 10.5 1H15v9h-4.5C8 10 6 8 6 5.5z" fill="#F24E1E"/><path d="M15 1h4.5C22 1 24 3 24 5.5S22 10 19.5 10H15V1z" fill="#FF7262"/><path d="M24 14.5c0 2.5-2 4.5-4.5 4.5S15 17 15 14.5 17 10 19.5 10 24 12 24 14.5z" fill="#1ABCFE"/></svg> },
  { label: "VS Code", svg: <svg viewBox="0 0 32 32" width="18" height="18"><path d="M23.5 2L10 14 4.5 9.5 2 11l8 5-8 5 2.5 1.5L10 18l13.5 12 4.5-2V4z" fill="#007ACC"/><path d="M23.5 2L10 14 4.5 9.5 2 11l8 5-8 5 2.5 1.5L10 18l13.5 12 4.5-2V4z" fill="#007ACC" opacity="0.8"/></svg> },
  { label: "Framer", svg: <svg viewBox="0 0 32 32" width="18" height="18"><path d="M6 1h20v10H16L6 1z" fill="#05F"/><path d="M6 11h10l10 10H6z" fill="#05F" opacity="0.7"/><path d="M6 21h10v10z" fill="#05F" opacity="0.5"/></svg> },
  { label: "WordPress", svg: <svg viewBox="0 0 32 32" width="18" height="18"><circle cx="16" cy="16" r="14" fill="#21759B"/><path d="M3.5 16c0 4.6 2.7 8.6 6.6 10.5L4.4 11.3C3.8 12.8 3.5 14.3 3.5 16zm21.1-1.6c0-1.4-.5-2.4-1-3.2-.6-1-1.2-1.8-1.2-2.8 0-1.1.8-2.1 2-2.1h.2c-2.2-2-5-3.2-8.2-3.2-4.2 0-7.9 2.2-10 5.4h.8c1.3 0 3.2-.2 3.2-.2.7 0 .7 1 .1 1 0 0-.7.1-1.4.1L14 24l3-9-2.1-5.8c-.7 0-1.3-.1-1.3-.1-.7 0-.6-1 0-1 0 0 2 .2 3.2.2 1.3 0 3.2-.2 3.2-.2.7 0 .7 1 .1 1 0 0-.7.1-1.4.1l4.7 14 1.3-4.3c.6-1.8 1-3.1 1-4.2z" fill="#fff"/></svg> },
  { label: "Notion", svg: <svg viewBox="0 0 32 32" width="18" height="18"><path d="M5.5 4.2l14-1c1.7-.1 2.2 0 3.2.7l4.5 3.2c.7.5 1 .7 1 1.3v17.3c0 1-.4 1.6-1.7 1.7l-16.3 1c-1 0-1.5-.1-2-.8L4.3 22c-.7-1-.9-1.4-.9-2.3V5.9c0-1.1.4-1.6 2.1-1.7z" fill="#fff" stroke="#000" strokeWidth="1.5"/><path d="M18 5l-10.5.7v18l3.5 4.8 14-1V8.5L21.5 6z" fill="#000" fillOpacity="0.06"/><line x1="12" y1="11" x2="22" y2="10.5" stroke="#000" strokeWidth="1.2"/><line x1="12" y1="15" x2="22" y2="14.5" stroke="#000" strokeWidth="1.2"/><line x1="12" y1="19" x2="18" y2="18.7" stroke="#000" strokeWidth="1.2"/></svg> },
  { label: "Jira", svg: <svg viewBox="0 0 32 32" width="18" height="18"><path d="M27.1 15L17 4.9 16 4l-8.4 8.4-3.5 3.5c-.4.4-.4 1 0 1.4L12 25.1l4 4 8.4-8.4.7-.7zm-11.1 4L19.6 16 16 12.4 12.4 16z" fill="#2684FF"/><path d="M16 12.4A5.4 5.4 0 0112 4l-7.9 7.9 5.6 5.6z" fill="url(#jira-a)" opacity="0.8"/><path d="M19.6 16L16 19.6a5.4 5.4 0 010-7.6l3.6 4z" fill="url(#jira-b)" opacity="0.8"/><defs><linearGradient id="jira-a" x1="12" y1="9" x2="7" y2="14"><stop stopColor="#0052CC"/><stop offset="1" stopColor="#2684FF"/></linearGradient><linearGradient id="jira-b" x1="16" y1="17" x2="21" y2="12"><stop stopColor="#0052CC"/><stop offset="1" stopColor="#2684FF"/></linearGradient></defs></svg> },
  { label: "GitHub", svg: <svg viewBox="0 0 32 32" width="18" height="18"><path d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.5 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3.1-.4-6.3-1.5-6.3-6.9 0-1.5.5-2.8 1.4-3.7-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.8 1.4 1.1-.3 2.3-.5 3.5-.5s2.4.2 3.5.5c2.6-1.8 3.8-1.4 3.8-1.4.8 1.9.3 3.3.1 3.7.9 1 1.4 2.2 1.4 3.7 0 5.4-3.3 6.5-6.4 6.9.5.4 1 1.3 1 2.6v3.9c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z" fill="currentColor"/></svg> },
  { label: "Canva", svg: <svg viewBox="0 0 32 32" width="18" height="18"><circle cx="16" cy="16" r="14" fill="#00C4CC"/><circle cx="16" cy="16" r="5" fill="#fff"/><circle cx="16" cy="16" r="2.5" fill="#00C4CC"/></svg> },
];

// Brand SVG icons for inner ring
const brandIcons: { svg: React.ReactNode; color: string }[] = [
  { color: "#E44D26", svg: <svg viewBox="0 0 32 32" width="16" height="16"><path d="M6 3l2.4 26L16 32l7.6-3L26 3z" fill="#E44D26"/><path d="M16 5v24.5l6.1-2.4L24 5z" fill="#F16529"/><path d="M11.5 10h9l-.3 3H12l.3 3h7.5l-.5 6-3.3 1-3.3-1-.2-2.5h3l.1 1.2 1.4.4 1.4-.4.2-2.2H11.8z" fill="#fff"/></svg> },
  { color: "#264DE4", svg: <svg viewBox="0 0 32 32" width="16" height="16"><path d="M6 3l2.4 26L16 32l7.6-3L26 3z" fill="#264DE4"/><path d="M16 5v24.5l6.1-2.4L24 5z" fill="#2965F1"/><path d="M11.5 10h9l-.1 3H12l.3 3h7.5l-.5 6-3.3 1-3.3-1-.2-2.5h3l.1 1.2 1.4.4 1.4-.4.2-2.2H11.8z" fill="#fff"/></svg> },
  { color: "#DD0031", svg: <svg viewBox="0 0 32 32" width="16" height="16"><path d="M16 2L3 7l2 18 11 6 11-6 2-18z" fill="#DD0031"/><path d="M16 2v28l11-6 2-18z" fill="#C3002F"/><path d="M16 5.7l-8 17.8h3l1.6-4h6.8l1.6 4h3zm2.3 11H13.7L16 10.3z" fill="#fff"/></svg> },
  { color: "#61DAFB", svg: <svg viewBox="0 0 32 32" width="16" height="16"><circle cx="16" cy="16" r="2.8" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1"/><ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 16 16)"/></svg> },
  { color: "#38BDF8", svg: <svg viewBox="0 0 32 32" width="16" height="16"><path d="M16 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.8-2.5 4.6-2 1 .3 1.7 1 2.5 1.9 1.3 1.3 2.7 2.7 5.9 2.7 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.8 2.5-4.6 2-1-.3-1.7-1-2.5-1.9C20.6 7.4 19.2 6 16 6zm-6.6 8C5.8 14 3.6 15.8 2.8 19.4c1.3-1.8 2.8-2.5 4.6-2 1 .3 1.7 1 2.5 1.9C11.2 20.6 12.6 22 15.8 22c3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.8 2.5-4.6 2-1-.3-1.7-1-2.5-1.9-1.3-1.3-2.7-2.7-5.9-2.7z" fill="#38BDF8"/></svg> },
  { color: "#3776AB", svg: <svg viewBox="0 0 32 32" width="16" height="16"><path d="M15.9 4c-3.2 0-6 .6-6 3.2v2.4h6v.8H7.7C5.2 10.4 3 12 3 15.8s2.2 5.2 5.1 5.2h2v-2.6c0-2.6 2.2-4.8 4.8-4.8h6c2.2 0 4-1.8 4-4V7.2C24.9 5 23 4 20 4zm-3.4 1.8c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4z" fill="#3776AB"/><path d="M16.1 28c3.2 0 6-.6 6-3.2v-2.4h-6v-.8h8.2c2.5 0 4.7-1.6 4.7-5.4s-2.2-5.2-5.1-5.2h-2v2.6c0 2.6-2.2 4.8-4.8 4.8h-6c-2.2 0-4 1.8-4 4v4.4c0 2.2 1.9 3.2 4.9 3.2zm3.4-1.8c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4z" fill="#FFD43B"/></svg> },
  { color: "#4479A1", svg: <svg viewBox="0 0 32 32" width="16" height="16"><ellipse cx="16" cy="16" rx="10" ry="5" fill="none" stroke="#4479A1" strokeWidth="2"/><ellipse cx="16" cy="10" rx="10" ry="5" fill="none" stroke="#4479A1" strokeWidth="2"/><path d="M6 10v12c0 2.8 4.5 5 10 5s10-2.2 10-5V10" fill="none" stroke="#4479A1" strokeWidth="2"/><ellipse cx="16" cy="22" rx="10" ry="5" fill="none" stroke="#4479A1" strokeWidth="1"/></svg> },
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
        whiteSpace: "nowrap"
      }}>

      {words[index].substring(0, subIndex)}
    </span>);

};

// R Logo SVG (inline)
const RLogo = () =>
<div className="flex items-center gap-2" aria-label="Website logo">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4.16663V4.16663C28.3005 4.16663 48 23.8661 48 48.1666V95.8333H4V4.16663Z" fill="currentColor" />
      <g style={{ transformOrigin: "74px 26px" }}>
        <text x="74" y="34" textAnchor="middle" fontSize="36" style={{ animation: "spin-globe 12s linear infinite", transformOrigin: "74px 26px" }}>🌎</text>
      </g>
    </svg>
  </div>;


// Header component
const Header = () =>
<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3">
    <RLogo />
    <ThemeToggle />
  </header>;


export default function HeroSection() {
  // Name font size synced with portrait watermark
  const nameFontSize = "clamp(64px, 11vw, 190px)";

  return (
    <>
      <Header />

      <section
        className="relative overflow-hidden bg-background text-foreground"
        style={{ height: "100vh", maxHeight: "100vh" }}>

        {/* Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/60 pointer-events-none" />

        {/* TOP CONTENT */}
        <div className="relative z-20 pt-28 sm:pt-32 text-center px-4 max-w-5xl mx-auto sm:px-[55px] py-[64px]">
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
                color: "hsl(var(--hero-accent-blue))"
              }}>

              3+ years
            </span>{" "}
            of experience designing SaaS and enterprise platforms that simplify complex workflows and{" "}
            <span
              className="font-semibold italic"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.15em",
                color: "hsl(var(--hero-accent-blue))"
              }}>

              improve productivity.
            </span>
          </h1>

          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <Button
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-md"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>

              <span className="mr-1.5">✦</span> Let's Talk
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold">

              <span className="mr-1.5">⊕</span> Schedule a Meeting
            </Button>
          </div>
        </div>

        {/* VISUAL AREA — fills remaining VH */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center" style={{ top: "340px" }}>
          {/* Typing word watermark — constrained to container */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-[3] overflow-hidden"
            style={{ maxWidth: "100vw", width: "100%" }}>

            <div className="flex justify-center">
              <TypingWord />
            </div>
          </div>

          {/* Outer orbit — 6px border */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-[6] pointer-events-none"
            style={{ width: "min(600px, 78vw)", height: "min(600px, 78vw)" }}>

            <div
              className="absolute inset-0 rounded-full orbit-ring-outer"
              style={{ border: "2px solid hsl(var(--border))" }}>

              {outerIcons.map(({ svg, label }, i) => {
                const angle = i / outerIcons.length * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(300px, 39vw)) rotate(-${angle}deg)`,
                      marginLeft: "-22px",
                      marginTop: "-22px"
                    }}>

                    <div
                      className="orbit-icon-counter flex items-center justify-center rounded-full w-11 h-11 border border-border shadow-md backdrop-blur-sm"
                      style={{ background: "hsl(var(--card) / 0.9)" }}>
                      {svg}
                    </div>
                  </div>);

              })}
            </div>
          </div>

          {/* Inner orbit — 4px border, white icons */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] z-[7] pointer-events-none"
            style={{ width: "min(400px, 52vw)", height: "min(400px, 52vw)" }}>

            <div
              className="absolute inset-0 rounded-full orbit-ring-inner"
              style={{ border: "1.5px solid hsl(var(--border) / 0.6)" }}>

              {brandIcons.map(({ svg }, i) => {
                const angle = i / brandIcons.length * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(200px, 26vw)) rotate(-${angle}deg)`,
                      marginLeft: "-18px",
                      marginTop: "-18px"
                    }}>

                    <div
                      className="orbit-label-counter flex items-center justify-center rounded-full w-9 h-9 border border-border/50 shadow-md backdrop-blur-sm"
                      style={{ background: "hsl(var(--card) / 0.9)" }}>
                      {svg}
                    </div>
                  </div>);

              })}
            </div>
          </div>

          {/* Name behind photo */}
          <span
            className="absolute bottom-[48px] left-1/2 -translate-x-1/2 select-none pointer-events-none font-black uppercase z-[5]"
            style={{
              fontFamily: "'Nevera', 'Warbler Text', serif",
              fontSize: nameFontSize,
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "hsl(var(--rajvir-text))",
              whiteSpace: "nowrap"
            }}>

            RAJVIR
          </span>

          {/* Portrait — pinned to bottom of visual area */}
          <img
            src={heroPhoto}
            alt="Rajvir – UX/UI Designer & Developer"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[10] object-contain select-none"
            style={{
              height: "auto",
              maxHeight: "calc(100vh - 280px)",
              width: "auto",
              maxWidth: "min(420px, 82vw)",
              filter: "drop-shadow(0 16px 48px hsl(220 30% 15% / 0.10))"
            }}
            draggable={false} />


          {/* Name outline in front */}
          <span
            className="absolute bottom-[48px] left-1/2 -translate-x-1/2 select-none pointer-events-none font-black uppercase z-[15]"
            style={{
              fontFamily: "'Nevera', 'Warbler Text', serif",
              fontSize: nameFontSize,
              WebkitTextStroke: "1.5px hsl(var(--rajvir-text))",
              color: "transparent",
              letterSpacing: "0.06em",
              lineHeight: 1,
              whiteSpace: "nowrap"
            }}>

            RAJVIR
          </span>

          {/* Bottom fade */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-[12]" />
        </div>

      </section>

      {/* Industry ticker strip */}
      <div
        className="w-full overflow-hidden border-y flex items-center"
        style={{
          height: "48px",
          borderColor: "hsl(var(--border))",
          background: "hsl(var(--background))"
        }}>

        <div className="flex items-center animate-marquee whitespace-nowrap">
          {[...Array(3)].flatMap(() =>
          ["Agriculture", "Government & Civic Services", "Education", "Healthcare (mHealth)", "FinTech", "mCommerce", "Retail", "Real Estate"].map((word, i) =>
          <span key={word + i} className="flex items-center gap-4">
                <span
              className="text-xs font-semibold tracking-[0.18em] uppercase px-8"
              style={{ color: "hsl(var(--muted-foreground))" }}>

                  {word}
                </span>
                <span style={{ color: "hsl(var(--border))", fontSize: "10px" }}>✦</span>
              </span>
          )
          )}
        </div>
      </div>
    </>);

}