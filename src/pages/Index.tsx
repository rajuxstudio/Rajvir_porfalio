import HeroSection from "@/components/HeroSection";
import LogoCarouselSection from "@/components/LogoCarouselSection";
import QuickActionPanel from "@/components/QuickActionPanel";

const Index = () => {
  return (
    <>
      <QuickActionPanel />
      <main>
        <HeroSection />
        <LogoCarouselSection />
      </main>
    </>
  );
};

export default Index;

