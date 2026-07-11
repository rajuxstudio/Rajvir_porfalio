import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import LogoCarouselSection from "@/components/home/LogoCarouselSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import QuickActionPanel from "@/components/newUI/QuickActionPanel";
import Header from "@/components/newUI/header";
import PageSkeleton from "@/components/ui/PageSkeleton";



const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <>
      <QuickActionPanel />
      <main>
        <Header />
        <HeroSection />
        {/* <LogoCarouselSection /> */}
        <ProjectsCarousel />
        <TestimonialsSection />
      </main>
    </>
  );
};

export default Index;

