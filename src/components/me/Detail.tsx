import { useEffect, useRef, useState } from "react";
import { Calendar, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import IdCard from "@/components/Profile/IdCard";
import Dice3D from "@/components/Profile/Dice3D";
import CertificatesPocket from "@/components/Profile/CertificatesPocket";
import QualificationCard from "@/components/Profile/QualificationCard";
import BeyondWorkPocket from "@/components/Profile/BeyondWorkPocket";
import HeroAurora from "@/components/Profile/HeroAurora";
import AboutSheet from "@/components/Profile/sheets/AboutSheet";
import EducationSheet from "@/components/Profile/sheets/EducationSheet";
import CertificatesSheet from "@/components/Profile/sheets/CertificatesSheet";

type Sheet = "certs" | "qualification" | "about";

const SHEET_META: Record<Sheet, { eyebrow: string; title: string; description: string }> = {
  certs: { eyebrow: "Certifications", title: "Always learning", description: "Courses and credentials in design and development." },
  qualification: { eyebrow: "Education", title: "Academic history", description: "Degrees and qualifications, newest first." },
  about: { eyebrow: "About", title: "Background & experience", description: "Who I am and where I've worked." },
};

export default function Detail() {
  const [dice, setDice] = useState(2);
  const [rolling, setRolling] = useState(false);
  const [hoverSpin, setHoverSpin] = useState(0);
  const [scrollTilt, setScrollTilt] = useState(0);
  const [sheet, setSheet] = useState<Sheet | null>(null);

  useEffect(() => {
    const onScroll = () => setScrollTilt(window.scrollY * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rollAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const a = new Audio("");
    a.preload = "auto";
    a.volume = 0.9;
    rollAudioRef.current = a;
  }, []);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    try {
      const a = rollAudioRef.current;
      if (a) {
        a.currentTime = 0;
        void a.play();
      }
    } catch {
      // ignore audio errors
    }
    let next = dice;
    while (next === dice) next = Math.floor(Math.random() * 6) + 1;
    setDice(next);
    setHoverSpin((s) => s + 360);
    setTimeout(() => setRolling(false), 900);
  };

  const openBtn =
    "cursor-pointer rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400";

  return (
    <>
      <section className="relative flex h-screen w-screen flex-col justify-center overflow-hidden bg-background px-4 py-12 sm:px-10 sm:py-20 lg:py-28">
        <HeroAurora />

        {/* Corner A — ID card (opens About) */}
        <div className="absolute left-[8vw] top-[8vh] z-10 hidden lg:block">
          <button
            type="button"
            onClick={() => setSheet("about")}
            aria-label="View about me"
            className={openBtn}
          >
            <IdCard />
          </button>
        </div>

        {/* Corner D — Qualification */}
        <div className="absolute right-[8vw] top-[8vh] z-10 hidden lg:block">
          <button
            type="button"
            onClick={() => setSheet("qualification")}
            aria-label="View education details"
            className={openBtn}
          >
            <QualificationCard />
          </button>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <button
            onClick={rollDice}
            onMouseEnter={rollDice}
            onTouchStart={rollDice}
            aria-label="Roll dice"
            className={`mb-6 inline-flex items-center justify-center rounded-2xl p-2 transition-transform duration-500 hover:-translate-y-2 sm:mb-8 ${rolling ? "animate-bounce" : ""
              }`}
          >
            <Dice3D value={dice} hoverSpin={hoverSpin} scrollTilt={scrollTilt} />
          </button>

          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-6xl">
            Designing products
            <br />
            <span className="text-neutral-400 dark:text-neutral-500">
              people actually love.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-neutral-600 dark:text-neutral-400 sm:mt-5 sm:text-base">
            I'm a product & UX designer helping teams turn messy problems into calm,
            considered interfaces. Currently taking on Q3 projects.
          </p>

          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 dark:bg-blue-500 dark:shadow-blue-500/20 dark:hover:bg-blue-400 sm:mt-8 sm:px-6 sm:py-3"
          >
            <Calendar className="h-4 w-4" />
            Schedule a meeting
          </a>
        </div>

        {/* Corner B — Certificates */}
        <div className="absolute left-[8vw] bottom-[8vh] z-10 hidden lg:block">
          <button
            type="button"
            onClick={() => setSheet("certs")}
            aria-label="View all certificates"
            className={openBtn}
          >
            <CertificatesPocket />
          </button>
        </div>

        {/* Corner C — Beyond Work */}
        <div className="absolute right-[8vw] bottom-[8vh] z-10 hidden lg:block">
          <BeyondWorkPocket />
        </div>

        {/* Mobile / tablet stacked cards */}
        <div className="relative z-10 mt-12 grid place-items-center gap-6 sm:mt-16 sm:grid-cols-2 lg:hidden">
          <button type="button" onClick={() => setSheet("about")} className={openBtn}>
            <IdCard />
          </button>
          <button type="button" onClick={() => setSheet("qualification")} className={openBtn}>
            <QualificationCard />
          </button>
          <button type="button" onClick={() => setSheet("certs")} className={openBtn}>
            <CertificatesPocket />
          </button>
          <BeyondWorkPocket />
        </div>
      </section>

      <Drawer open={sheet !== null} onOpenChange={(o) => !o && setSheet(null)}>
        <DrawerContent className="max-h-[92vh] dark:border-neutral-800 dark:bg-neutral-950">
          {/* shared header: stays put while the content scrolls */}
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
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}