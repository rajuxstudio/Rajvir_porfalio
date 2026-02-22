import HeroSection from "@/components/HeroSection";
import LogoCarouselSection from "@/components/LogoCarouselSection";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import QuickActionPanel from "@/components/QuickActionPanel";

const Index = () => {
  return (
    <>
      <QuickActionPanel />
      <main>
        <HeroSection />
        <LogoCarouselSection />
        <StatsSection />
        <ProjectsSection />
      </main>
    </>
  );
};

export default Index;

