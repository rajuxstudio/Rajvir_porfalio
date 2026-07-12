import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import IdCard from "@/components/Profile/IdCard";
import Dice3D from "@/components/Profile/Dice3D";
import CertificatesPocket from "@/components/Profile/CertificatesPocket";
import QualificationCard from "@/components/Profile/QualificationCard";
import BeyondWorkPocket from "@/components/Profile/BeyondWorkPocket";
import AboutMe from "@/components/Profile/AboutMe";
import Certifications from "@/components/Profile/Certifications";
import QualificationDetail from "@/components/Profile/QualificationDetail";

type Sheet = "certs" | "qualification" | "about";

const SHEET_META: Record<Sheet, { title: string; description: string }> = {
  certs: { title: "Certifications", description: "Full list of certifications and credentials." },
  qualification: { title: "Education", description: "Complete academic history and qualifications." },
  about: { title: "About Me", description: "Background, experience and work history." },
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
    "cursor-pointer rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600";

  return (
    <>
      <section
        className="relative flex h-screen w-screen flex-col justify-center overflow-hidden px-4 py-12 sm:px-10 sm:py-20 lg:py-28"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* Corner A — ID card (opens About) */}
        <div className="absolute left-6 top-6 z-10 hidden lg:block">
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
        <div className="absolute right-6 top-6 z-10 hidden lg:block">
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
        <div className="relative z-0 flex flex-col items-center text-center">
          <button
            onClick={rollDice}
            onMouseEnter={rollDice}
            onTouchStart={rollDice}
            aria-label="Roll dice"
            className={`mb-6 inline-flex items-center justify-center rounded-2xl p-2 transition-transform duration-500 hover:-translate-y-2 sm:mb-8 ${
              rolling ? "animate-bounce" : ""
            }`}
          >
            <Dice3D value={dice} hoverSpin={hoverSpin} scrollTilt={scrollTilt} />
          </button>

          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Designing products
            <br />
            <span className="text-neutral-400">people actually love.</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm text-neutral-600 sm:mt-5 sm:text-base">
            I'm a product & UX designer helping teams turn messy problems into calm,
            considered interfaces. Currently taking on Q3 projects.
          </p>

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

        {/* Corner B — Certificates */}
        <div className="absolute bottom-6 left-6 z-10 hidden lg:block">
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
        <div className="absolute bottom-6 right-6 z-10 hidden lg:block">
          <BeyondWorkPocket />
        </div>

        {/* Mobile / tablet stacked cards */}
        <div className="mt-12 grid gap-6 place-items-center sm:mt-16 sm:grid-cols-2 lg:hidden">
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
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{sheet ? SHEET_META[sheet].title : ""}</DrawerTitle>
            <DrawerDescription>{sheet ? SHEET_META[sheet].description : ""}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-2 pb-8">
            {sheet === "certs" && <Certifications />}
            {sheet === "qualification" && <QualificationDetail />}
            {sheet === "about" && <AboutMe />}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}