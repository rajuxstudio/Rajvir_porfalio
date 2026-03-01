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
  PenTool } from
"lucide-react";
import ThemeToggle from "./ThemeToggle";

// Colored icons for outer orbit
const orbitIcons = [
{ Icon: Code2, color: "#61DAFB", label: "01" },
{ Icon: Figma, color: "#F24E1E", label: "02" },
{ Icon: LayoutDashboard, color: "#6366F1", label: "03" },
{ Icon: Database, color: "#38BDF8", label: "04" },
{ Icon: Globe, color: "#34D399", label: "05" },
{ Icon: Layers, color: "#FBBF24", label: "06" },
{ Icon: Cpu, color: "#F472B6", label: "07" },
{ Icon: PenTool, color: "#A78BFA", label: "08" }];


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
<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Rajvir logo">
    <path d="M4 4.16663V4.16663C28.3005 4.16663 48 23.8661 48 48.1666V95.8333H4V4.16663Z" fill="currentColor" />
    <path d="M74 3.87031C69.6312 3.90687 65.3711 5.23576 61.7563 7.68951C58.1415 10.1433 55.334 13.6121 53.6874 17.6588C52.0408 21.7056 51.6289 26.1492 52.5036 30.4296C53.3783 34.7101 55.5004 38.6359 58.6025 41.7122C61.7046 44.7886 65.648 46.878 69.9356 47.7169C74.2232 48.5559 78.6632 48.107 82.696 46.4267C86.7289 44.7465 90.1742 41.9101 92.5978 38.275C95.0213 34.64 96.3147 30.3688 96.3148 25.9999C96.3027 23.0817 95.7159 20.1944 94.5879 17.5029C93.4599 14.8114 91.8128 12.3685 89.7407 10.3135C87.6685 8.25859 85.2119 6.63192 82.5112 5.52639C79.8104 4.42086 76.9183 3.85813 74 3.87031ZM53.3611 25.9999C53.3585 24.1208 53.6203 22.2506 54.1389 20.4444C54.3295 20.4043 54.5156 20.3454 54.6944 20.2685C55.1204 20.0833 55.4444 19.6666 55.8426 19.4999C56.8889 19.0833 57.1852 20.2222 57.3426 20.9907C58.0278 21.2962 58.7315 20.9907 59.1944 21.7499C59.6574 22.5092 59.3056 23.6018 60.1944 24.0092C61.0833 24.4166 61.8519 24.1481 61.963 25.4166C62.0005 26.3458 61.9447 27.2764 61.7963 28.1944C61.6759 29.3611 62.2037 29.8055 63.1574 30.3425C64.145 30.7682 64.9537 31.5245 65.4444 32.4814C65.9352 33.6944 65.5556 34.9259 65.8333 36.1851C66.0463 37.1666 66.537 37.9722 66.6759 39.0277C66.8333 40.2592 66.9907 41.8055 68.1482 42.6481C68.3237 42.7802 68.5366 42.8532 68.7562 42.8566C68.9759 42.8599 69.191 42.7934 69.3704 42.6666C69.6944 42.4166 69.5926 41.8796 69.5741 41.4999C69.5185 40.5092 69.3611 40.3425 70.2407 39.7499C70.6545 39.4668 71.0037 39.0993 71.2654 38.6716C71.5271 38.2439 71.6954 37.7658 71.7593 37.2685C71.7939 36.8673 71.9174 36.4788 72.1207 36.1313C72.3241 35.7837 72.6024 35.4858 72.9352 35.2592C73.5897 34.9202 74.0899 34.3438 74.3333 33.6481C74.6296 32.861 75.3982 32.4073 75.9537 31.7962C76.5326 31.0996 76.8269 30.2099 76.7778 29.3055C76.8082 28.7522 76.6375 28.2065 76.2972 27.7691C75.9568 27.3318 75.4698 27.0323 74.9259 26.9259C74.1852 26.7314 73.4537 26.9259 72.7315 26.7407C72.4356 26.6539 72.1643 26.499 71.9391 26.2883C71.714 26.0776 71.5414 25.8172 71.4352 25.5277C71.3018 25.1865 71.1023 24.875 70.848 24.6112C70.5937 24.3474 70.2898 24.1365 69.9537 23.9907C69.6526 23.8383 69.3436 23.7023 69.0278 23.5833C68.5833 23.3796 68.3704 22.9166 67.9722 22.6573C67.1636 22.3121 66.2598 22.2597 65.4167 22.5092C64.6759 22.6018 64.0093 22.4073 63.2685 22.4444C62.7685 22.4444 62.0185 22.6851 61.5833 22.3425C61.1482 21.9999 61.287 21.1573 60.8796 20.6851C60.4722 20.2129 59.1852 20.1481 58.8148 19.324C58.723 18.9544 58.7232 18.5678 58.8152 18.1982C58.9072 17.8286 59.0882 17.4872 59.3426 17.2036C60.0556 16.3981 60.8426 16.6203 61.8519 16.4351C63.0741 16.2222 63.4074 15.5833 64.2222 14.8055C64.8333 14.2222 65.5463 14.2314 66.25 13.8333C66.9537 13.4351 67.1111 13.037 67.7963 12.9073C68.037 12.537 68.6296 12.7129 69.0093 12.6388C69.6759 12.5092 69.4722 12.3425 69.8056 12.0092C70.3796 11.4259 71.3704 11.8518 72.0648 11.2962C72.9074 10.6203 72.1111 10.1018 71.287 10.0833C70.463 10.0648 69.6111 10.5277 68.6944 10.5277C68.2157 10.5386 67.7475 10.3871 67.3658 10.0979C66.9842 9.80874 66.7117 9.39891 66.5926 8.93513C66.5771 8.68971 66.6359 8.44532 66.7614 8.23387C66.887 8.02243 67.0734 7.85377 67.2963 7.74994C67.8982 7.40735 68.1111 7.74994 68.5556 8.12957C69.3982 8.82401 70.1019 8.41661 70.8241 7.78698C71.0427 7.52125 71.3267 7.31702 71.6482 7.19439C72.0382 7.10267 72.4482 7.15296 72.8046 7.33622C73.1609 7.51949 73.4403 7.82374 73.5926 8.19439C73.7222 8.8055 73.4259 9.27772 74.1574 9.66661C74.4083 9.77919 74.6789 9.84122 74.9537 9.84917C75.2286 9.85711 75.5023 9.81081 75.7593 9.7129C76.75 9.11105 76.6852 7.54624 78.0278 7.14809C79.0741 6.83327 80.2407 7.72216 81.1759 8.07401C81.7158 8.17333 82.2258 8.39505 82.6667 8.72216C83.0767 9.24626 83.3417 9.86892 83.4352 10.5277C83.4352 11.4536 82.3056 12.1296 82.7407 13.3055C82.9722 13.9259 83.5741 14.0925 83.9815 13.6481C84.3889 13.2036 84.4722 12.7222 84.8056 12.3796C84.9763 12.1824 85.1689 12.0054 85.3796 11.8518C85.8148 11.6944 85.8148 11.9814 86.1944 12.2777C86.8519 12.7777 87.713 12.9629 88.3426 13.5185C89.1204 14.2036 89.9259 15.9722 88.3889 16.1203C87.1296 16.2407 85.6759 15.7592 84.463 16.0648C84.0543 16.2169 83.6831 16.4552 83.3747 16.7636C83.0664 17.0719 82.828 17.4431 82.6759 17.8518C82.4352 18.7777 83.1389 19.8518 83.2037 20.824C83.2037 21.3981 83.0278 22.2685 83.4167 22.7314C83.8056 23.1944 84.7778 23.2314 85.3611 23.4999C85.9444 23.7685 86.6389 24.7314 87.4907 24.4259C88.1759 24.1759 88.3519 23.4999 89.2315 23.6573C89.958 23.8634 90.6041 24.2867 91.0833 24.8703C91.2685 25.2962 91.0833 26.0092 91.25 26.4907C91.4259 27.1296 91.25 27.8333 91.4074 28.4814C91.4815 28.787 91.7407 29.3425 91.5833 29.6573C91.4259 29.9722 91.1019 29.9722 90.9352 30.1481C90.7685 30.324 90.6296 30.6759 90.4259 30.8796C90.2222 31.0833 89.5833 31.3425 89.2407 31.6296C88.2407 32.4444 88.6759 33.8796 89.0093 34.9536C89.2454 35.9741 89.2454 37.035 89.0093 38.0555C88.9847 38.6553 88.9166 39.2526 88.8056 39.8425C88.7473 40.0553 88.7039 40.2719 88.6759 40.4907C85.7949 43.3855 82.1207 45.3618 78.1172 46.17C74.1138 46.9782 69.9607 46.5821 66.1822 45.0317C62.4038 43.4813 59.1694 40.846 56.8875 37.4588C54.6056 34.0715 53.3785 30.0841 53.3611 25.9999Z" fill="currentColor" />
  </svg>;


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
              style={{ border: "6px dashed hsl(var(--border))" }}>

              {orbitIcons.map(({ Icon, color }, i) => {
                const angle = i / orbitIcons.length * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(300px, 39vw)) rotate(-${angle}deg)`,
                      marginLeft: "-24px",
                      marginTop: "-24px"
                    }}>

                    <div
                      className="orbit-icon-counter flex items-center justify-center rounded-full shadow-sm w-12 h-12"
                      style={{ background: "hsl(var(--card))" }}>

                      <Icon style={{ color }} className="w-5 h-5" strokeWidth={1.8} />
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
              style={{ border: "4px solid hsl(var(--border))" }}>

              {orbitIcons.map(({ label }, i) => {
                const angle = i / orbitIcons.length * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(min(200px, 26vw)) rotate(-${angle}deg)`,
                      marginLeft: "-14px",
                      marginTop: "-14px"
                    }}>

                    <div
                      className="orbit-label-counter flex items-center justify-center rounded-full shadow-sm w-7 h-7 text-[10px] font-semibold"
                      style={{
                        background: "hsl(var(--foreground))",
                        color: "hsl(var(--background))"
                      }}>

                      {label}
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