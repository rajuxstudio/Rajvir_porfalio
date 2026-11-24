import QuickActionPanel from "@/components/newUI/QuickActionPanel";
import Header from "@/components/newUI/header";
import ProfileViewSwitch from "@/components/newUI/ProfileViewSwitch";
import AboutHero from "@/components/about/AboutHero";
import AboutEducation from "@/components/about/AboutEducation";
import AboutExperience from "@/components/about/AboutExperience";
import AboutCertifications from "@/components/about/AboutCertifications";
import Footer from "@/components/newUI/footer";
// The Profile page now uses the new 6-card design. The previous layout (components/me/Detail.tsx)
// is kept in the repo for reference but is no longer rendered.
import NewProfileUIDetail from "@/components/newProfileUI/NewProfileUIDetail";


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
      <ProfileViewSwitch current="page" />

      <main className="min-h-screen bg-background text-foreground">
        <NewProfileUIDetail />
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default About;