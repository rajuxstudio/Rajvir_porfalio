import HeroSection from "@/components/HeroSection";
import LogoCarouselSection from "@/components/LogoCarouselSection";
import StatsSection from "@/components/StatsSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import QuickActionPanel from "@/components/QuickActionPanel";

const Index = () => {
  return (
    <>
      <QuickActionPanel />
      <main>
        <HeroSection />
        <LogoCarouselSection />
        <StatsSection />
        <ProjectsCarousel />
      </main>
    </>
  );
};

export default Index;

