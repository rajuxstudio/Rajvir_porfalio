import QuickActionPanel from "@/components/newUI/QuickActionPanel";
import Header from "@/components/newUI/header";
import DevProject from "@/components/development/devProject";

const devPage = () => {
  return (
    <>
      <Header />
      <QuickActionPanel />

      <main>
        <DevProject />
      </main>
    </>
  );
};

export default devPage;