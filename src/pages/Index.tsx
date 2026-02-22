import HeroSection from "@/components/HeroSection";
import LogoCarouselSection from "@/components/LogoCarouselSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import QuickActionPanel from "@/components/QuickActionPanel";

const Index = () => {
  return (
    <>
      <QuickActionPanel />
      <main>
        <HeroSection />
        <LogoCarouselSection />
        <ProjectsCarousel />
      </main>
    </>
  );
};

export default Index;

