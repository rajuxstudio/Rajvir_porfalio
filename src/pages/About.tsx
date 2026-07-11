import QuickActionPanel from "@/components/newUI/QuickActionPanel";
import Header from "@/components/newUI/header";
import AboutHero from "@/components/about/AboutHero";
import AboutEducation from "@/components/about/AboutEducation";
import AboutExperience from "@/components/about/AboutExperience";
import AboutCertifications from "@/components/about/AboutCertifications";
import Footer from "@/components/newUI/footer";
import Detail from "@/components/me/Detail";


const SectionDivider = () => (
  <div className="flex items-center justify-center py-4">
    <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  </div>
);
  
const About = () => {
  return (
    <>
      <Header />
      <QuickActionPanel />

      <main className="min-h-screen bg-background text-foreground">
        <Detail />
        <AboutHero />
        <AboutExperience />
        <AboutEducation />
        <AboutCertifications />
        <Footer />
      </main>
    </>
  );
};

export default About;