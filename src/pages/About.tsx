import AboutHero from "@/components/about/AboutHero";
import AboutMetrics from "@/components/about/AboutMetrics";
import AboutNarrative from "@/components/about/AboutNarrative";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutCTA from "@/components/about/AboutCTA";
import ThemeToggle from "@/components/ThemeToggle";

export default function About() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3 bg-transparent backdrop-blur-md">
        <a href="/" className="text-foreground font-bold text-lg tracking-tight">← Back</a>
        <ThemeToggle />
      </header>
      <main>
        <AboutHero />
        <AboutMetrics />
        <AboutNarrative />
        <AboutTimeline />
        <AboutPhilosophy />
        <AboutCTA />
      </main>
    </>
  );
}
